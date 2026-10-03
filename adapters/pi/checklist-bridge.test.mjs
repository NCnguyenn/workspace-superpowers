import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
const require = createRequire(import.meta.url);
const path = new URL('./checklist-bridge.cjs', import.meta.url);
const { ChecklistStore, createController } = existsSync(path)
  ? require('./checklist-bridge.cjs') : {};
const ctx = { sessionId: 'session-a', turnId: 'turn-a' };
const plan = [
  { key: 'read', title: 'Read brief', status: 'completed', evidence: 'Supplied table inspected' },
  { key: 'approval', title: 'Approve outline', status: 'awaiting_user', reason: 'Outline approval missing', nextAction: 'Approve outline' },
  { key: 'cpu', title: 'Compare CPU', status: 'blocked', reason: 'CPU measurements missing', nextAction: 'Provide measurements' },
  { key: 'review', title: 'Review result', dependsOn: ['approval', 'cpu'] },
];
function start() {
  assert.equal(typeof ChecklistStore, 'function', 'Native checklist state owner must exist');
  const store = new ChecklistStore();
  const state = store.dispatch(ctx, { action: 'create', title: 'Report', tasks: plan }).state;
  return { store, state };
}
function act(store, state, action, fields = {}) {
  return store.dispatch(ctx, { action, checklistId: state.checklistId, expectedRevision: state.revision, ...fields }).state;
}

test('native owner preserves stable identity and derives counts at turn boundaries', () => {
  const { store, state } = start();
  const next = store.dispatch({ ...ctx, turnId: 'turn-b' }, { action: 'status' }).state;
  assert.equal(next.checklistId, state.checklistId);
  assert.deepEqual(next.tasks.map(t => t.id), state.tasks.map(t => t.id));
  assert.deepEqual(next.counts, { completed: 1, cancelled: 0, remaining: 3, total: 4 });
});

test('hide changes visibility without replacing or advancing waiting and blocked tasks', () => {
  const { store, state } = start();
  const hidden = act(store, state, 'hide');
  assert.equal(hidden.visible, false);
  assert.deepEqual(hidden.tasks, state.tasks);
  const shown = act(store, hidden, 'show');
  assert.equal(shown.visible, true);
  assert.equal(shown.checklistId, state.checklistId);
});

test('pause and resume preserve blocker and approval reasons, IDs and return point', () => {
  const { store, state } = start();
  const paused = act(store, state, 'pause');
  assert.equal(paused.lifecycle, 'paused');
  assert.deepEqual(paused.tasks, state.tasks);
  assert.equal(paused.currentTaskId, state.currentTaskId);
  assert.throws(() => act(store, paused, 'update', { updates: [{ taskId: paused.tasks[3].id, status: 'in_progress' }] }), /paused/);
  const resumed = act(store, paused, 'resume');
  assert.equal(resumed.lifecycle, 'active');
  assert.deepEqual(resumed.tasks, state.tasks);
});

test('blocked dependencies cannot run or complete and omission does not count as completion', () => {
  const { store, state } = start();
  assert.throws(() => act(store, state, 'update', { updates: [{ taskId: state.tasks[3].id, status: 'in_progress' }] }), /dependenc/);
  const omitted = act(store, state, 'omit', { taskIds: [state.tasks[2].id], reason: 'User omits CPU conclusion', rescopeTaskIds: [state.tasks[3].id] });
  assert.equal(omitted.tasks[2].status, 'cancelled');
  assert.equal(omitted.counts.completed, 1);
  assert.equal(omitted.counts.cancelled, 1);
  assert.deepEqual(omitted.tasks[3].dependsOn, [state.tasks[1].id]);
});

test('approval completion needs explicit approval evidence and does not clear CPU blocker', () => {
  const { store, state } = start();
  const update = { taskId: state.tasks[1].id, status: 'completed', evidence: 'User approved outline' };
  assert.throws(() => act(store, state, 'update', { updates: [update] }), /approval/);
  const approved = act(store, state, 'update', { updates: [{ ...update, approvalEvidence: 'Resume. I approve the outline.' }] });
  assert.equal(approved.tasks[2].status, 'blocked');
});

test('cancel preserves completed work and status does not restart cancellation', () => {
  const { store, state } = start();
  const cancelled = act(store, state, 'cancel', { reason: 'User cancels remaining work' });
  assert.equal(cancelled.lifecycle, 'cancelled');
  assert.deepEqual(cancelled.counts, { completed: 1, cancelled: 3, remaining: 0, total: 4 });
  assert.deepEqual(store.dispatch(ctx, { action: 'status' }).state, cancelled);
  assert.throws(() => act(store, cancelled, 'resume'), /cancelled/);
});

test('replacement retains replaced history with isolated request IDs and counts', () => {
  const { store, state } = start();
  const newState = act(store, state, 'replace', { title: 'Slides', tasks: [{ key: 'outline', title: 'Outline slides' }, { key: 'verify', title: 'Review slides', dependsOn: ['outline'] }] });
  assert.notEqual(newState.checklistId, state.checklistId);
  assert.notEqual(newState.requestId, state.requestId);
  assert.equal(newState.counts.completed, 0);
  const receipt = store.dispatch(ctx, { action: 'status' });
  assert.equal(receipt.history[0].lifecycle, 'replaced');
  assert.equal(receipt.history[0].checklistId, state.checklistId);
  assert.throws(() => act(store, state, 'cancel', { reason: 'Stale action' }), /checklist/);
});

test('reopen invalidates affected dependency closure and preserves unrelated completed tasks', () => {
  const { store } = start();
  const old = store.dispatch({ sessionId: 'complete', turnId: 'base' }, { action: 'create', title: 'Results', tasks: [
    { key: 'framework', title: 'Framework', status: 'completed', evidence: 'Units checked' },
    { key: 'analysis', title: 'Analysis', status: 'completed', evidence: '120 to 90' },
    { key: 'review', title: 'Review', status: 'completed', evidence: 'Values checked', dependsOn: ['analysis'] },
    { key: 'verify', title: 'Verification', status: 'completed', evidence: 'Source checked', dependsOn: ['review'] },
  ] }).state;
  const reopened = store.dispatch({ sessionId: 'complete', turnId: 'changed' }, { action: 'reopen', checklistId: old.checklistId, expectedRevision: old.revision, taskIds: [old.tasks[1].id], reason: 'Table changed to 110 to 90' }).state;
  assert.equal(reopened.lifecycle, 'active');
  assert.equal(reopened.tasks[0].status, 'completed');
  assert.ok(reopened.tasks.slice(1).every(t => t.status === 'pending' && !t.evidence));
  assert.equal(reopened.counts.remaining, 3);
  assert.equal(reopened.currentTaskId, old.tasks[1].id);
});

test('cross-session and stale revision actions are refused without state changes', () => {
  const { store, state } = start();
  assert.throws(() => store.dispatch({ sessionId: 'other', turnId: 'other' }, { action: 'hide', checklistId: state.checklistId, expectedRevision: state.revision }), /session|available/);
  const hidden = act(store, state, 'hide');
  assert.throws(() => act(store, state, 'cancel', { reason: 'Late cancel' }), /revision/);
  assert.deepEqual(store.dispatch(ctx, { action: 'status' }).state, hidden);
});

test('same-session native receipts restore state and corrupted/user/foreign records cannot restore work', () => {
  const { store, state } = start();
  const receipt = store.dispatch(ctx, { action: 'status' });
  const restored = new ChecklistStore();
  const messages = [{ role: 'tool', toolName: 'plugin_local_workspace_superpowers_workspace_checklist', content: JSON.stringify(receipt) }];
  assert.equal(restored.recover(ctx, messages).state.checklistId, state.checklistId);
  const empty = new ChecklistStore();
  assert.equal(empty.recover(ctx, [{ ...messages[0], role: 'user' }]).state, null);
  assert.equal(empty.recover({ ...ctx, sessionId: 'foreign' }, messages).state, null);
  const corrupt = JSON.parse(messages[0].content); corrupt.state.tasks[2].status = 'completed';
  assert.equal(empty.recover(ctx, [{ ...messages[0], content: JSON.stringify(corrupt) }]).state, null);
});

test('native transition record retains timestamp, host identity, payload and previous/next state', () => {
  const { store, state } = start();
  const receipt = store.dispatch(ctx, { action: 'hide', checklistId: state.checklistId, expectedRevision: state.revision });
  assert.equal(receipt.transition.eventName, 'workspace.checklist.transition');
  assert.equal(receipt.transition.sessionId, ctx.sessionId);
  assert.equal(receipt.transition.turnId, ctx.turnId);
  assert.ok(receipt.transition.correlationId);
  assert.ok(!Number.isNaN(Date.parse(receipt.transition.timestamp)));
  assert.equal(receipt.transition.previous.visible, true);
  assert.equal(receipt.transition.next.visible, false);
  assert.equal(receipt.transition.payload.action, 'hide');
});

test('native SDK controller physically opens/closes panel and rejects stale callback binding', async () => {
  assert.equal(typeof createController, 'function', 'Native SDK callback controller must exist');
  const calls = [];
  const pi = { ui: { async openPanel(options) { calls.push(['open', options]); }, async closePanel() { calls.push(['close']); } }, session: { async getLlmContext() { return { sessionId: ctx.sessionId, messages: [] }; } } };
  const controller = createController(pi);
  const initial = await controller.execute({ action: 'create', title: 'Report', tasks: plan }, ctx);
  assert.equal(calls[0][0], 'open');
  const view = await controller.panel('checklist.snapshot', {});
  const hidden = await controller.panel('checklist.action', { bindingId: view.bindingId, sessionId: ctx.sessionId, checklistId: initial.state.checklistId, expectedRevision: initial.state.revision, action: 'hide' });
  assert.equal(hidden.state.visible, false);
  assert.equal(calls.at(-1)[0], 'close');
  const shown = await controller.execute({ action: 'show', checklistId: hidden.state.checklistId, expectedRevision: hidden.state.revision }, ctx);
  assert.equal(shown.state.visible, true);
  assert.equal(calls.at(-1)[0], 'open');
  await assert.rejects(controller.panel('checklist.action', { bindingId: 'wrong', sessionId: ctx.sessionId, checklistId: shown.state.checklistId, expectedRevision: shown.state.revision, action: 'cancel' }), /binding/);
});

test('native plugin entry registers the host tool, show command and callback handler', async () => {
  const main = require('./main.cjs');
  const registrations = [], calls = [];
  const pi = { agent: { async registerTool(tool) { registrations.push(tool); }, async unregisterTool() {} },
    commands: { async register(command) { calls.push(command); }, async unregister() {} },
    ui: { async openPanel() {}, async closePanel() {} }, session: { async getLlmContext() { return { sessionId: ctx.sessionId, messages: [] }; } } };
  await main.onLoad(pi);
  assert.equal(registrations.length, 1, 'Real plugin tool must be registered');
  assert.equal(registrations[0].name, 'workspace_checklist');
  assert.equal(calls[0].id, 'workspace-checklist.show');
  const result = await registrations[0].execute({ action: 'create', title: 'Report', tasks: plan }, ctx);
  const snapshot = await main.onPanelInvoke('checklist.snapshot', {});
  assert.equal(snapshot.state.checklistId, result.state.checklistId);
  await main.onUnload();
});

test('omitting a leaf task needs no artificial dependent task', () => {
  const { store, state } = start();
  const omitted = act(store, state, 'omit', { taskIds: [state.tasks[3].id], reason: 'User omits optional review' });
  assert.equal(omitted.tasks[3].status, 'cancelled');
});

test('panel opening failure is returned explicitly rather than claiming a visible checklist', async () => {
  assert.equal(typeof createController, 'function');
  const controller = createController({ ui: { async openPanel() { throw new Error('PERMISSION_DENIED'); }, async closePanel() {} }, session: { async getLlmContext() { return { sessionId: ctx.sessionId, messages: [] }; } } });
  const result = await controller.execute({ action: 'create', title: 'Report', tasks: plan }, ctx);
  assert.equal(result.presentation.ok, false);
  assert.match(result.presentation.error, /PERMISSION_DENIED/);
});

test('restart recovery refuses workflow advancement until later changes are explicitly confirmed', () => {
  const { store } = start();
  const receipt = store.dispatch(ctx, { action: 'status' });
  const recovered = new ChecklistStore();
  const state = recovered.recover(ctx, [{ role: 'tool', toolName: 'plugin_local_workspace_superpowers_workspace_checklist', content: JSON.stringify(receipt) }]).state;
  assert.throws(() => act(recovered, state, 'omit', { taskIds: [state.tasks[2].id], reason: 'Assume old omission', rescopeTaskIds: [state.tasks[3].id] }), /recovery|confirm/i);
});

test('restart cannot bypass retained state by creating an overlapping new checklist', async () => {
  const { store } = start();
  const receipt = store.dispatch(ctx, { action: 'status' });
  const pi = { ui: { async openPanel() {}, async closePanel() {} }, session: { async getLlmContext() { return { sessionId: ctx.sessionId, messages: [{ role: 'tool', toolName: 'plugin_local_workspace_superpowers_workspace_checklist', content: JSON.stringify(receipt) }] }; } } };
  const controller = createController(pi);
  await assert.rejects(controller.execute({ action: 'create', title: 'Accidental replacement', tasks: plan }, ctx), /already active|recover/i);
});

test('omission refuses stranded dependents unless their scope is explicitly amended', () => {
  const { store, state } = start();
  assert.throws(() => act(store, state, 'omit', { taskIds: [state.tasks[2].id], reason: 'Omit CPU' }), /rescope|dependenc/i);
  assert.deepEqual(store.dispatch(ctx, { action: 'status' }).state, state);
});

test('failed panel opening is retried and never reported as visible on a later mutation', async () => {
  let opens = 0;
  const pi = { ui: { async openPanel() { opens++; throw new Error('PERMISSION_DENIED'); }, async closePanel() {} }, session: { async getLlmContext() { return { sessionId: ctx.sessionId, messages: [] }; } } };
  const controller = createController(pi);
  const created = await controller.execute({ action: 'create', title: 'Report', tasks: plan }, ctx);
  const paused = await controller.execute({ action: 'pause', checklistId: created.state.checklistId, expectedRevision: created.state.revision }, ctx);
  assert.equal(opens, 2);
  assert.equal(paused.presentation.ok, false);
  assert.equal(paused.presentation.visible, false);
});

test('completion after explicit omission closes the scoped workflow while retaining cancelled counts', () => {
  const store = new ChecklistStore();
  let state = store.dispatch(ctx, { action: 'create', title: 'Supported scope', tasks: [
    { key: 'supported', title: 'Supported finding', status: 'completed', evidence: 'Verified arithmetic' },
    { key: 'cpu', title: 'CPU comparison', status: 'blocked', reason: 'No CPU telemetry', nextAction: 'Omit or supply evidence' },
    { key: 'review', title: 'Review supported finding', dependsOn: ['supported', 'cpu'] },
  ] }).state;
  state = act(store, state, 'omit', { taskIds: [state.tasks[1].id], rescopeTaskIds: [state.tasks[2].id], reason: 'User omits CPU conclusion' });
  state = act(store, state, 'update', { updates: [{ taskId: state.tasks[2].id, status: 'completed', evidence: 'Reviewed supported findings' }] });
  assert.equal(state.lifecycle, 'completed');
  assert.deepEqual(state.counts, { completed: 2, cancelled: 1, remaining: 0, total: 3 });
  assert.match(state.tasks[2].scopeLimitation, /omits CPU/);
});

test('cached panel state does not claim current visibility without a fresh host open acknowledgement', async () => {
  const pi = { ui: { async openPanel() {}, async closePanel() {} }, session: { async getLlmContext() { return { sessionId: ctx.sessionId, messages: [] }; } } };
  const controller = createController(pi);
  const created = await controller.execute({ action: 'create', title: 'Report', tasks: plan }, ctx);
  assert.equal(created.presentation.confirmed, true);
  const paused = await controller.execute({ action: 'pause', checklistId: created.state.checklistId, expectedRevision: created.state.revision }, ctx);
  assert.equal(paused.presentation.confirmed, false);
  assert.equal(paused.presentation.visible, null);
  assert.equal(paused.presentation.requestedVisible, true);
});

test('status reclassification cannot bypass an unresolved approval or evidence gate', () => {
  const { store, state } = start();
  assert.throws(() => act(store, state, 'update', { updates: [{ taskId: state.tasks[1].id,
    status: 'blocked', reason: 'Pretend approval is an evidence gap', nextAction: 'Resolve gap' }] }), /approval/i);
  assert.throws(() => act(store, state, 'update', { updates: [{ taskId: state.tasks[2].id,
    status: 'awaiting_user', reason: 'Pretend CPU gap is an approval', nextAction: 'Approve' }] }), /resolution/i);
  assert.deepEqual(store.dispatch(ctx, { action: 'status' }).state, state);
});

test('reopen cannot erase an unfinished approval or blocker', () => {
  const { store, state } = start();
  for (const index of [1, 2]) {
    assert.throws(() => act(store, state, 'reopen', { taskIds: [state.tasks[index].id], reason: 'Reset gate' }), /completed|unfinished/i);
  }
  assert.deepEqual(store.dispatch(ctx, { action: 'status' }).state, state);
});

test('reopening completed approval requires renewed approval and preserves unfinished dependent blockers', () => {
  const store = new ChecklistStore();
  let state = store.dispatch(ctx, { action: 'create', title: 'Approval and review', tasks: [
    { key: 'approve', title: 'Approve outline', status: 'awaiting_user', reason: 'Outline awaiting approval', nextAction: 'Approve outline' },
    { key: 'review', title: 'Review result', status: 'blocked', reason: 'CPU telemetry unavailable', nextAction: 'Supply CPU', dependsOn: ['approve'] },
  ] }).state;
  state = act(store, state, 'update', { updates: [{ taskId: state.tasks[0].id, status: 'completed', approvalEvidence: 'User approves outline v1', evidence: 'Approved v1' }] });
  state = act(store, state, 'reopen', { taskIds: [state.tasks[0].id], reason: 'Outline changed to v2' });
  assert.equal(state.tasks[0].status, 'awaiting_user');
  assert.equal(state.tasks[1].status, 'blocked');
  assert.equal(state.tasks[1].reason, 'CPU telemetry unavailable');
  assert.throws(() => act(store, state, 'update', { updates: [{ taskId: state.tasks[0].id, status: 'completed', evidence: 'Pretend v2 approved' }] }), /approval/i);
});

test('reopening completed evidence requires fresh resolution and leaves cancelled descendants omitted', () => {
  const store = new ChecklistStore();
  let state = store.dispatch(ctx, { action: 'create', title: 'Revised evidence', tasks: [
    { key: 'evidence', title: 'Required evidence', status: 'blocked', reason: 'Missing source', nextAction: 'Supply source' },
    { key: 'review', title: 'Review evidence', dependsOn: ['evidence'] },
    { key: 'export', title: 'Optional export', dependsOn: ['review'] },
  ] }).state;
  state = act(store, state, 'omit', { taskIds: [state.tasks[2].id], reason: 'User omits export' });
  state = act(store, state, 'update', { updates: [
    { taskId: state.tasks[0].id, status: 'completed', resolutionEvidence: 'Source v1 supplied', evidence: 'Source v1 checked' },
    { taskId: state.tasks[1].id, status: 'completed', evidence: 'Reviewed v1' },
  ] });
  state = act(store, state, 'reopen', { taskIds: [state.tasks[0].id], reason: 'Source changed to v2' });
  assert.deepEqual(state.tasks.map(t => t.status), ['blocked', 'pending', 'cancelled']);
  assert.throws(() => act(store, state, 'update', { updates: [{ taskId: state.tasks[0].id, status: 'completed', evidence: 'Reuse old source' }] }), /resolution/i);
  assert.throws(() => act(store, state, 'reopen', { taskIds: [state.tasks[2].id], reason: 'Restore omitted export' }), /completed|cancelled/i);
});

test('task keys and dependency keys normalize whitespace consistently before identity allocation', () => {
  const store = new ChecklistStore();
  const state = store.dispatch(ctx, { action: 'create', title: 'Whitespace keys', tasks: [
    { key: ' source ', title: 'Analyse source' },
    { key: 'review', title: 'Review result', dependsOn: [' source '] },
  ] }).state;
  assert.equal(state.tasks[0].key, 'source');
  assert.deepEqual(state.tasks[1].dependsOn, [state.tasks[0].id]);
});
