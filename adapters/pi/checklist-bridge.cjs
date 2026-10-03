'use strict';

const { randomUUID, createHash } = require('node:crypto');
const TOOL_NAME = 'workspace_checklist';
const HOST_TOOL_NAME = 'plugin_local_workspace_superpowers_workspace_checklist';
const BRIDGE = 'workspace-superpowers.checklist';
const STATUSES = new Set(['pending', 'in_progress', 'completed', 'awaiting_user', 'blocked', 'cancelled']);
const ACTIONS = ['create', 'status', 'update', 'show', 'hide', 'pause', 'resume', 'cancel', 'replace', 'reopen', 'omit', 'trace'];
const clone = value => structuredClone(value);
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
function text(value, field, max = 2000) {
  if (typeof value !== 'string' || !value.trim() || Array.from(value).length > max) {
    throw new Error(`${field} must be a non-empty string of at most ${max} characters`);
  }
  return value.trim();
}
function identity(ctx) {
  return { sessionId: text(ctx?.sessionId, 'Host session identity', 256), turnId: text(ctx?.turnId, 'Host turn identity', 256) };
}
function counts(tasks) {
  const completed = tasks.filter(t => t.status === 'completed').length;
  const cancelled = tasks.filter(t => t.status === 'cancelled').length;
  return { completed, cancelled, remaining: tasks.length - completed - cancelled, total: tasks.length };
}
function eligible(task, tasks) {
  return task.dependsOn.every(id => tasks.find(t => t.id === id)?.status === 'completed');
}
function validateTasks(tasks) {
  if (!Array.isArray(tasks) || tasks.length < 2 || tasks.length > 50) throw new Error('Checklist needs 2 to 50 tasks');
  const ids = new Set();
  for (const task of tasks) {
    text(task.id, 'Task ID', 256);
    text(task.title, 'Task title', 500);
    if (ids.has(task.id)) throw new Error('Duplicate task ID');
    ids.add(task.id);
    if (!STATUSES.has(task.status)) throw new Error('Unsupported task status');
    if (!Array.isArray(task.dependsOn)) throw new Error('Task dependencies must be an array');
    if (task.status === 'completed') text(task.evidence, 'Completion evidence');
    if (['pending', 'in_progress', 'completed'].includes(task.status)) {
      if (task.requiresApproval) text(task.approvalEvidence, 'Explicit user approval evidence');
      if (task.requiresResolution) text(task.resolutionEvidence, 'Blocker resolution evidence');
    }
    if (['blocked', 'awaiting_user'].includes(task.status)) {
      text(task.reason, 'Blocker or approval reason'); text(task.nextAction, 'Next action');
    }
  }
  if (tasks.filter(t => t.status === 'in_progress').length > 1) throw new Error('At most one task can be in_progress');
  for (const task of tasks) {
    if (task.dependsOn.some(id => !ids.has(id) || id === task.id)) throw new Error('Invalid task dependency');
    if (['in_progress', 'completed'].includes(task.status) && !eligible(task, tasks)) throw new Error('Unresolved task dependency');
  }
  const visited = new Set(), visiting = new Set();
  function visit(task) {
    if (visiting.has(task.id)) throw new Error('Cyclic task dependency');
    if (visited.has(task.id)) return;
    visiting.add(task.id);
    task.dependsOn.forEach(id => visit(tasks.find(t => t.id === id)));
    visiting.delete(task.id); visited.add(task.id);
  }
  tasks.forEach(visit);
}
function derive(state) {
  validateTasks(state.tasks);
  state.counts = counts(state.tasks);
  if (state.lifecycle === 'active' && state.counts.remaining === 0) state.lifecycle = 'completed';
  if (state.lifecycle !== 'paused') {
    const task = state.tasks.find(t => t.status === 'in_progress')
      ?? state.tasks.find(t => t.status === 'pending' && eligible(t, state.tasks))
      ?? state.tasks.find(t => ['awaiting_user', 'blocked'].includes(t.status));
    state.currentTaskId = task?.id ?? null;
  }
  return state;
}
function newState(ctx, args) {
  if (!Array.isArray(args.tasks)) throw new Error('Task plan is required');
  if (args.tasks.length < 2 || args.tasks.length > 50) throw new Error('Checklist needs 2 to 50 tasks');
  const definitions = args.tasks.map(t => ({ ...t, key: text(t.key, 'Task key', 100),
    dependsOn: (t.dependsOn ?? []).map(key => text(key, 'Dependency key', 100)) }));
  const keys = new Map();
  for (const definition of definitions) {
    const key = text(definition.key, 'Task key', 100);
    if (keys.has(key)) throw new Error('Duplicate task key');
    keys.set(key, `task-${randomUUID()}`);
  }
  const state = {
    schemaVersion: 1, sessionId: ctx.sessionId, requestId: `request-${randomUUID()}`,
    checklistId: `checklist-${randomUUID()}`, originTurnId: ctx.turnId,
    title: text(args.title, 'Checklist title', 200), revision: 1,
    lifecycle: 'active', visible: true, currentTaskId: null,
    tasks: definitions.map(t => ({ id: keys.get(t.key), key: t.key,
      title: text(t.title, 'Task title', 500), status: t.status ?? 'pending',
      dependsOn: (t.dependsOn ?? []).map(key => keys.get(key) ?? key),
      ...(t.reason ? { reason: text(t.reason, 'Reason') } : {}),
      ...(t.nextAction ? { nextAction: text(t.nextAction, 'Next action') } : {}),
      ...(t.evidence ? { evidence: text(t.evidence, 'Evidence') } : {}),
      ...(t.status === 'awaiting_user' ? { requiresApproval: true } : {}),
      ...(t.status === 'blocked' ? { requiresResolution: true } : {}),
    })),
  };
  return derive(state);
}
function selectTasks(state, ids) {
  if (!Array.isArray(ids) || !ids.length || new Set(ids).size !== ids.length) throw new Error('Non-empty unique task IDs required');
  return ids.map(id => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) throw new Error('Task ID does not belong to this checklist');
    return task;
  });
}

class ChecklistStore {
  constructor() { this.sessions = new Map(); }
  receipt(sessionId, transition = null) {
    const entry = this.sessions.get(sessionId);
    const record = { bridge: BRIDGE, schemaVersion: 1, sessionId,
      state: entry ? clone(entry.state) : null, history: entry ? clone(entry.history) : [],
      recovery: entry?.recovery ?? null };
    record.snapshotHash = digest(record);
    return { ...record, transition: transition ? clone(transition) : null,
      ...entry ? {} : { limitation: 'No retained checklist state. Confirm the task and unresolved milestones; no completion has been reconstructed.' } };
  }
  recover(context, messages) {
    const ctx = identity(context);
    if (this.sessions.has(ctx.sessionId)) return this.receipt(ctx.sessionId);
    // Only tool-role receipts produced by this exact host tool are admissible.
    // Assistant summaries, user text and other sessions are never state input.
    for (const message of [...(messages ?? [])].reverse()) {
      if (message.role !== 'tool' || message.toolName !== HOST_TOOL_NAME) continue;
      try {
        let value = JSON.parse(message.content);
        // Host tool results may wrap plugin results inside text content.
        if (Array.isArray(value.content)) value = JSON.parse(value.content.find(c => c.type === 'text')?.text ?? '');
        const record = { bridge: value.bridge, schemaVersion: value.schemaVersion, sessionId: value.sessionId,
          state: value.state, history: value.history, recovery: value.recovery ?? null };
        if (record.bridge !== BRIDGE || record.schemaVersion !== 1 || record.sessionId !== ctx.sessionId || digest(record) !== value.snapshotHash) continue;
        const states = [record.state, ...record.history];
        if (!record.state || !Array.isArray(record.history)) continue;
        for (const state of states) {
          if (state.sessionId !== ctx.sessionId || state.schemaVersion !== 1 || !Number.isSafeInteger(state.revision) || state.revision < 1
            || !['active', 'paused', 'completed', 'cancelled', 'replaced'].includes(state.lifecycle) || typeof state.visible !== 'boolean') throw new Error('Invalid recovered state');
          text(state.checklistId, 'Recovered checklist identity', 256); text(state.requestId, 'Recovered request identity', 256);
          validateTasks(state.tasks);
          if (JSON.stringify(counts(state.tasks)) !== JSON.stringify(state.counts)) throw new Error('Invalid recovered counts');
        }
        this.sessions.set(ctx.sessionId, { state: clone(record.state), history: clone(record.history), traces: [],
          recovery: { source: 'same-session native tool receipt', certainty: 'last-retained-snapshot', requiresConfirmation: true,
            limitation: 'Panel actions after this receipt may be missing after process restart. Confirm any later changes before advancing work.' } });
        return this.receipt(ctx.sessionId);
      } catch { /* A truncated/corrupt receipt is unavailable, never inferred. */ }
    }
    return this.receipt(ctx.sessionId);
  }
  dispatch(context, args) {
    const ctx = identity(context);
    if (!args || !ACTIONS.includes(args.action)) throw new Error('Unknown checklist action');
    const existing = this.sessions.get(ctx.sessionId);
    if (args.action === 'status') return this.receipt(ctx.sessionId);
    if (args.action === 'trace') return { ...this.receipt(ctx.sessionId), traces: clone(existing?.traces ?? []), droppedTraceCount: existing?.droppedTraceCount ?? 0 };
    const previous = existing ? clone(existing.state) : null;
    let entry = existing ? clone(existing) : { history: [], traces: [] };
    if (entry.recovery?.requiresConfirmation && !['show', 'hide'].includes(args.action)) {
      text(args.recoveryConfirmation, 'Explicit user recovery confirmation');
      entry.recovery.requiresConfirmation = false;
      entry.recovery.confirmation = args.recoveryConfirmation;
    }
    if (args.action === 'create') {
      if (existing && ['active', 'paused'].includes(existing.state.lifecycle)) throw new Error('Checklist already active; use replace explicitly');
      if (existing) entry.history.push(clone(existing.state));
      entry.state = newState(ctx, args);
    } else {
      if (!existing) throw new Error('No checklist available for this session');
      if (args.checklistId !== entry.state.checklistId) throw new Error('Stale or foreign checklist identity');
      if (args.expectedRevision !== entry.state.revision) throw new Error('Stale checklist revision; read status before retrying');
      const state = entry.state;
      if (args.action === 'replace') {
        text(args.reason ?? 'User requested replacement', 'Replacement reason');
        state.lifecycle = 'replaced'; state.replacedReason = args.reason ?? 'User requested replacement';
        entry.history.push(clone(state)); entry.state = newState(ctx, args);
      } else if (args.action === 'show' || args.action === 'hide') {
        state.visible = args.action === 'show';
      } else if (args.action === 'pause') {
        if (state.lifecycle !== 'active') throw new Error(`Cannot pause ${state.lifecycle} checklist`);
        state.lifecycle = 'paused';
      } else if (args.action === 'resume') {
        if (state.lifecycle !== 'paused') throw new Error(`Cannot resume ${state.lifecycle} checklist`);
        state.lifecycle = 'active';
      } else if (args.action === 'cancel') {
        if (!['active', 'paused'].includes(state.lifecycle)) throw new Error(`Cannot cancel ${state.lifecycle} checklist`);
        const reason = text(args.reason, 'Cancellation reason');
        state.tasks.forEach(t => { if (!['completed', 'cancelled'].includes(t.status)) { t.status = 'cancelled'; t.reason = reason; delete t.nextAction; } });
        state.lifecycle = 'cancelled'; state.currentTaskId = null;
      } else if (args.action === 'reopen') {
        if (['cancelled', 'replaced'].includes(state.lifecycle)) throw new Error(`Cannot reopen ${state.lifecycle} checklist; create a new request`);
        const reason = text(args.reason, 'Reopening reason');
        const roots = selectTasks(state, args.taskIds);
        if (roots.some(t => t.status !== 'completed')) throw new Error('Reopen only completed tasks; unfinished approval/blocker gates cannot be reset and cancelled work remains omitted');
        const affected = new Set(roots.map(t => t.id));
        let changed = true;
        while (changed) { changed = false; for (const task of state.tasks) if (task.status !== 'cancelled' && !affected.has(task.id) && task.dependsOn.some(id => affected.has(id))) { affected.add(task.id); changed = true; } }
        entry.history.push({ ...clone(state), archivedReason: reason });
        state.tasks.forEach(task => {
          if (!affected.has(task.id)) return;
          // Source changes do not resolve unfinished gates or restore omitted scope.
          if (['awaiting_user', 'blocked'].includes(task.status)) return;
          task.status = 'pending'; task.reason = reason; delete task.evidence; delete task.nextAction;
          if (task.requiresApproval) { delete task.approvalEvidence; task.status = 'awaiting_user';
            task.reason = `Approval invalidated: ${reason}`; task.nextAction = 'Approve the revised task before advancing'; }
          if (task.requiresResolution) { delete task.resolutionEvidence;
            if (task.status !== 'awaiting_user') { task.status = 'blocked'; task.reason = `Evidence invalidated: ${reason}`; }
            task.nextAction = task.requiresApproval ? 'Approve the revised task and supply or revalidate its required evidence' : 'Supply or revalidate evidence for the revised input'; }
        });
        if (state.lifecycle !== 'paused') state.lifecycle = 'active';
        state.reopeningReason = reason;
      } else if (args.action === 'omit') {
        if (state.lifecycle !== 'active') throw new Error(`Cannot omit work in ${state.lifecycle} checklist`);
        const reason = text(args.reason, 'Explicit omission reason');
        const omitted = selectTasks(state, args.taskIds);
        const ids = new Set(omitted.map(t => t.id));
        const rescoped = args.rescopeTaskIds?.length ? selectTasks(state, args.rescopeTaskIds) : [];
        const rescopeIds = new Set(rescoped.map(t => t.id));
        for (const task of state.tasks) {
          if (!ids.has(task.id) && task.status !== 'cancelled' && task.dependsOn.some(id => ids.has(id)) && !rescopeIds.has(task.id)) {
            throw new Error('Omitted prerequisite requires explicit dependency rescope for every affected live task');
          }
        }
        omitted.forEach(task => { if (task.status === 'completed') throw new Error('Cannot omit completed work'); task.status = 'cancelled'; task.reason = reason; delete task.nextAction; });
        rescoped.forEach(task => { task.dependsOn = task.dependsOn.filter(id => !ids.has(id)); task.scopeLimitation = reason; });
      } else if (args.action === 'update') {
        if (state.lifecycle !== 'active') throw new Error(`Cannot update work in ${state.lifecycle} checklist`);
        if (!Array.isArray(args.updates) || !args.updates.length) throw new Error('Task updates required');
        const updateIds = args.updates.map(u => u.taskId);
        selectTasks(state, updateIds);
        for (const update of args.updates) {
          const task = state.tasks.find(t => t.id === update.taskId);
          if (task.status === 'cancelled' || (task.status === 'completed' && update.status !== 'completed')) throw new Error('Use explicit reopen or a new request for terminal tasks');
          if (update.status === 'cancelled') throw new Error('Use explicit cancel/omit for cancellation');
          if (!STATUSES.has(update.status)) throw new Error('Unsupported update status');
          if (task.status === 'awaiting_user' && update.status !== 'awaiting_user') text(update.approvalEvidence, 'Explicit user approval evidence');
          if (task.status === 'blocked' && update.status !== 'blocked') text(update.resolutionEvidence, 'Blocker resolution evidence');
          for (const field of ['approvalEvidence', 'resolutionEvidence']) if (update[field]) task[field] = text(update[field], field);
          if (update.status === 'awaiting_user') { task.requiresApproval = true; delete task.approvalEvidence; }
          if (update.status === 'blocked') { task.requiresResolution = true; delete task.resolutionEvidence; }
          task.status = update.status;
          delete task.reason; delete task.nextAction; delete task.evidence;
          for (const field of ['reason', 'nextAction', 'evidence']) if (update[field]) task[field] = text(update[field], field);
        }
      }
      if (args.action !== 'replace') entry.state.revision += 1;
    }
    derive(entry.state);
    const transition = { schemaVersion: 1, eventName: 'workspace.checklist.transition',
      timestamp: new Date().toISOString(), correlationId: randomUUID(), ...ctx,
      requestId: entry.state.requestId, checklistId: entry.state.checklistId,
      source: context.source ?? 'native-tool', payload: clone(args), previous, next: clone(entry.state) };
    entry.traces.push(transition);
    if (entry.traces.length > 256) { entry.traces.shift(); entry.droppedTraceCount = (entry.droppedTraceCount ?? 0) + 1; }
    this.sessions.set(ctx.sessionId, entry);
    return this.receipt(ctx.sessionId, transition);
  }
}

// Shared by native tool and panel callbacks. The SDK invocation context is the
// authority for tool session identity; model-provided session IDs are ignored.
function createController(pi) {
  const store = new ChecklistStore();
  let binding = null;
  let panelOpened = false;
  let tail = Promise.resolve();
  const serial = operation => { const next = tail.then(operation); tail = next.catch(() => {}); return next; };
  async function present(receipt, force = false) {
    if (!receipt.state) return receipt;
    const state = receipt.state;
    const own = binding?.sessionId === state.sessionId && binding?.checklistId === state.checklistId;
    if (!state.visible && !own) return { ...receipt, presentation: { ok: true, visible: null, requestedVisible: false, confirmed: false } };
    try {
      let confirmed = false;
      if (state.visible) {
        if (!own) binding = { bindingId: randomUUID(), sessionId: state.sessionId, checklistId: state.checklistId };
        if (!own || force || !panelOpened) { await pi.ui.openPanel({ title: 'Workspace Checklist' }); confirmed = true; }
        panelOpened = true;
      } else { await pi.ui.closePanel(); panelOpened = false; confirmed = true; }
      // The host does not notify this process about titlebar closes. A cached
      // open flag is a routing hint, never evidence of current window visibility.
      return { ...receipt, presentation: { ok: true, visible: confirmed ? state.visible : null,
        requestedVisible: state.visible, confirmed, component: 'workspace-checklist-panel', ...binding } };
    } catch (error) {
      panelOpened = false;
      return { ...receipt, presentation: { ok: false, visible: false, requestedVisible: state.visible, confirmed: false, error: String(error.message ?? error) } };
    }
  }
  async function execute(args, context) {
    return serial(async () => {
      const ctx = identity(context); context?.signal?.throwIfAborted();
      if (!store.sessions.has(ctx.sessionId)) {
        const retained = await pi.session.getLlmContext();
        if (retained.sessionId !== ctx.sessionId) throw new Error('Host context session mismatch');
        store.recover(ctx, retained.messages);
      }
      context?.signal?.throwIfAborted();
      const result = store.dispatch(ctx, args);
      if (result.transition) context?.log?.(JSON.stringify(result.transition));
      if (['status', 'trace'].includes(args.action)) return result;
      return present(result, args.action === 'show');
    });
  }
  async function panel(channel, payload = {}) {
    return serial(async () => {
      if (channel === 'checklist.snapshot') {
        if (!binding) return { state: null, sessions: [] };
        const receipt = store.receipt(binding.sessionId);
        return { ...receipt, ...binding, sessions: [...store.sessions.values()].map(e => ({ sessionId: e.state.sessionId, title: e.state.title })) };
      }
      if (channel === 'checklist.select') {
        const receipt = store.receipt(text(payload.sessionId, 'Selected session', 256));
        if (!receipt.state) throw new Error('Selected session has no checklist');
        binding = { bindingId: randomUUID(), sessionId: receipt.state.sessionId, checklistId: receipt.state.checklistId };
        return { ...receipt, ...binding };
      }
      if (!binding || payload.bindingId !== binding.bindingId || payload.sessionId !== binding.sessionId || payload.checklistId !== binding.checklistId) throw new Error('Stale or foreign panel binding');
      if (channel === 'checklist.trace') return store.dispatch({ sessionId: binding.sessionId, turnId: `panel-${randomUUID()}` }, { action: 'trace' });
      if (channel !== 'checklist.action') throw new Error('Unsupported panel operation');
      if (!['show', 'hide', 'pause', 'resume', 'cancel', 'replace', 'reopen', 'omit'].includes(payload.action)) throw new Error('Unsupported panel action');
      const { bindingId, sessionId, ...args } = payload;
      const receipt = store.dispatch({ sessionId, turnId: `panel-${randomUUID()}`, source: 'native-panel-action' }, args);
      return present(receipt, payload.action === 'show');
    });
  }
  return { execute, panel, async show() {
    return serial(async () => {
      if (!binding) return { limitation: 'No checklist selected yet' };
      const receipt = store.receipt(binding.sessionId);
      const state = receipt.state;
      return present(store.dispatch({ sessionId: state.sessionId, turnId: `command-${randomUUID()}`, source: 'native-command' },
        { action: 'show', checklistId: state.checklistId, expectedRevision: state.revision }), true);
    });
  } };
}

const string = { type: 'string', minLength: 1 };
const toolSchema = {
  type: 'object', additionalProperties: false, required: ['action'],
  properties: {
    action: { type: 'string', enum: ACTIONS }, checklistId: string, recoveryConfirmation: string,
    expectedRevision: { type: 'integer', minimum: 1 }, title: string, reason: string,
    taskIds: { type: 'array', items: string }, rescopeTaskIds: { type: 'array', items: string },
    tasks: { type: 'array', minItems: 2, maxItems: 50, items: { type: 'object', additionalProperties: false, required: ['key', 'title'], properties: {
      key: string, title: string, status: { type: 'string', enum: [...STATUSES] },
      dependsOn: { type: 'array', items: string }, reason: string, nextAction: string, evidence: string,
    } } },
    updates: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false, required: ['taskId', 'status'], properties: {
      taskId: string, status: { type: 'string', enum: [...STATUSES] }, reason: string, nextAction: string,
      evidence: string, approvalEvidence: string, resolutionEvidence: string,
    } } },
  },
};
module.exports = { ChecklistStore, createController, TOOL_NAME, HOST_TOOL_NAME, toolSchema };
