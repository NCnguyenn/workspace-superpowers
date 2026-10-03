/** Execute a built package through the pinned, installed PI-Desktop SDK loader.
 * The embedding IPC peer is simulated: this is NOT a live renderer/grant probe.
 * No installed configuration, session database, credentials or network is used.
 */
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, unlink, rmdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash, randomUUID } from 'node:crypto';
import { fork } from 'node:child_process';

const options = Object.fromEntries(process.argv.slice(2).map(arg => {
  const match = /^--([^=]+)=(.+)$/.exec(arg);
  if (!match) throw new Error('Use --asar=PATH --plugin=PATH [--out=PATH]');
  return [match[1], match[2]];
}));
assert(options.asar && options.plugin, 'Use --asar=PATH --plugin=PATH [--out=PATH]');
const PIN = '17a2993bd28737edf74489ccb444d5ae403eb3b3c65ef10d6dd638ec0d3db2ef';
const archive = await readFile(resolve(options.asar));
assert.equal(createHash('sha256').update(archive).digest('hex'), PIN, 'Unknown PI-Desktop ASAR; inspect SDK before probing');
const header = JSON.parse(archive.subarray(16, 16 + archive.readUInt32LE(12)).toString('utf8'));
const base = 8 + archive.readUInt32LE(4);
let entry = header;
for (const part of 'out/main/plugin-host-process.js'.split('/')) entry = entry.files[part];
const sdkSource = archive.subarray(base + Number(entry.offset), base + Number(entry.offset) + entry.size);
const manifest = JSON.parse(await readFile(join(resolve(options.plugin), 'manifest.json'), 'utf8'));
assert.equal(manifest.id, 'local.workspace-superpowers');
assert.equal(manifest.ui.panel, 'adapters/pi/checklist-panel.html');
await readFile(join(resolve(options.plugin), manifest.ui.panel));
const temp = await mkdtemp(join(tmpdir(), 'workspace-checklist-sdk-'));
const sdkFile = join(temp, 'native-plugin-host.mjs');
await writeFile(sdkFile, sdkSource, { flag: 'wx' });
const records = [], checks = [];
const contexts = new Map(), toolReceipts = new Map();
const children = new Set();
const HOST_TOOL = 'plugin_local_workspace_superpowers_workspace_checklist';
function checked(name, verify) { verify(); checks.push({ name, passed: true }); }

function boot() {
  const child = fork(sdkFile, [], { stdio: ['ignore', 'pipe', 'pipe', 'ipc'] });
  children.add(child);
  const pending = new Map(), invocations = new Map();
  child.stderr.on('data', chunk => records.push({ type: 'sdk-stderr', text: String(chunk) }));
  child.on('message', message => {
    if (message.t === 'res') {
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id); clearTimeout(request.timeout);
      if (message.ok) request.resolve(message.value);
      else request.reject(Object.assign(new Error(message.error.message), { code: message.error.code }));
    } else if (message.t === 'log') records.push({ type: 'native-sdk-log', ...message });
    else if (message.t === 'call') {
      records.push({ type: 'sdk-api-call', ...message });
      let value = { ok: true };
      try {
        const required = {
          'agent.registerTool': 'agent.tool.register', 'agent.unregisterTool': 'agent.tool.register',
          'ui.openPanel': 'ui.panel', 'ui.closePanel': 'ui.panel', 'session.getLlmContext': 'session.read',
        }[message.api];
        if (required) assert(manifest.permissions.includes(required), `Missing declared ${required}`);
        assert(['agent.registerTool', 'agent.unregisterTool', 'commands.register', 'commands.unregister',
          'ui.openPanel', 'ui.closePanel', 'session.getLlmContext'].includes(message.api), `Unexpected API ${message.api}`);
        if (message.api === 'session.getLlmContext') {
          const context = invocations.get(message.invocationId);
          assert(context, 'Context read must carry a live native invocation ID');
          value = contexts.get(context.sessionId) ?? { sessionId: context.sessionId,
            modelKey: 'sdk-probe', messages: (toolReceipts.get(context.sessionId) ?? []).map(m => ({ ...m, content: m.content.slice(0, 8000) })), truncated: false };
        }
        child.send({ t: 'res', id: message.id, ok: true, value });
      } catch (error) { child.send({ t: 'res', id: message.id, ok: false, error: { code: 'PROBE_REFUSED', message: error.message } }); }
    }
  });
  child.on('exit', () => {
    children.delete(child);
    for (const request of pending.values()) { clearTimeout(request.timeout); request.reject(new Error('Native SDK process exited')); }
    pending.clear();
  });
  function request(frame) {
    const id = `probe-${randomUUID()}`;
    return new Promise((resolveRequest, reject) => {
      const timeout = setTimeout(() => { pending.delete(id); reject(new Error('Native SDK IPC timed out')); }, 10000);
      pending.set(id, { resolve: resolveRequest, reject, timeout });
      child.send({ ...frame, id });
    });
  }
  return {
    init: () => request({ t: 'init', pluginId: manifest.id, pluginPath: resolve(options.plugin), manifest, main: manifest.main }),
    async tool(action, sessionId = 'probe-session-A', turnId = `probe-turn-${randomUUID()}`) {
      const invocationId = `invocation-${randomUUID()}`;
      invocations.set(invocationId, { sessionId, turnId });
      try {
        const receipt = await request({ t: 'call', method: 'tool.execute', invocationId,
          payload: { name: 'workspace_checklist', args: action, sessionId, turnId, mode: 'agent', modelKey: 'sdk-probe' } });
        const messages = toolReceipts.get(sessionId) ?? [];
        messages.push({ role: 'tool', toolName: HOST_TOOL, content: JSON.stringify(receipt) });
        toolReceipts.set(sessionId, messages);
        records.push({ type: 'native-tool-result', sessionId, turnId, receipt });
        return receipt;
      } finally { invocations.delete(invocationId); }
    },
    panel: (channel, payload = {}) => request({ t: 'call', method: 'panel.invoke', payload: { channel, payload } }),
    command: () => request({ t: 'call', method: 'command.run', payload: { id: 'workspace-checklist.show' } }),
    async close() { await request({ t: 'call', method: 'lifecycle.unload', payload: {} }); child.disconnect(); child.kill(); },
  };
}
const plan = {
  action: 'create', title: 'Native SDK checklist probe', tasks: [
    { key: 'scope', title: 'Scope analysis', status: 'completed', evidence: 'Probe source: 120 ms before, 90 ms after' },
    { key: 'outline', title: 'Outline approval', status: 'awaiting_user', reason: 'Approval pending', nextAction: 'User approves outline', dependsOn: ['scope'] },
    { key: 'cpu', title: 'Required CPU evidence', status: 'blocked', reason: 'No CPU telemetry', nextAction: 'Provide measurements or omit CPU conclusion' },
    { key: 'review', title: 'Dependent final review', dependsOn: ['outline', 'cpu'] },
  ],
};
let peer;
try {
  peer = boot(); await peer.init();
  checked('Actual SDK onLoad registers tool and command from packed main.js', () => {
    assert(records.some(r => r.api === 'agent.registerTool' && r.args[0].name === 'workspace_checklist'));
    assert(records.some(r => r.api === 'commands.register' && r.args[0].id === 'workspace-checklist.show'));
  });
  let receipt = await peer.tool(plan);
  const initial = receipt.state;
  checked('Host execution identity, schema, rows, counts and native openPanel', () => {
    assert.equal(initial.sessionId, 'probe-session-A'); assert.equal(receipt.transition.source, 'native-tool');
    assert.deepEqual(initial.counts, { completed: 1, cancelled: 0, remaining: 3, total: 4 });
    assert(receipt.presentation.ok && receipt.presentation.visible);
  });
  const snapshot = () => peer.panel('checklist.snapshot');
  const nativeAction = async (action, extra = {}) => {
    const view = await snapshot();
    return peer.panel('checklist.action', { action, bindingId: view.bindingId, sessionId: view.sessionId,
      checklistId: view.checklistId, expectedRevision: view.state.revision, ...extra });
  };
  receipt = await nativeAction('hide');
  checked('Native panel hide callback closes panel without changing task state', () => {
    assert.equal(receipt.transition.source, 'native-panel-action'); assert.equal(receipt.state.visible, false);
    assert.deepEqual(receipt.state.tasks, initial.tasks);
    assert(records.some(r => r.api === 'ui.closePanel'));
  });
  await peer.command(); receipt = await snapshot();
  checked('Native command show preserves stable identities', () => {
    assert.equal(receipt.state.visible, true); assert.equal(receipt.state.checklistId, initial.checklistId);
  });
  await nativeAction('pause'); receipt = await peer.tool({ action: 'status' });
  checked('Pause survives a subsequent native tool turn with approvals/blockers retained', () => {
    assert.equal(receipt.state.lifecycle, 'paused'); assert.deepEqual(receipt.state.tasks, initial.tasks);
  });
  receipt = await peer.tool({ action: 'resume', checklistId: initial.checklistId, expectedRevision: receipt.state.revision });
  await assert.rejects(peer.tool({ action: 'update', checklistId: initial.checklistId,
    expectedRevision: receipt.state.revision, updates: [{ taskId: initial.tasks[3].id, status: 'completed', evidence: 'Premature review' }] }), /Unresolved task dependency/);
  checks.push({ name: 'Dependent review cannot run before approval and evidence resolution', passed: true });
  await assert.rejects(peer.panel('checklist.action', { action: 'cancel', bindingId: 'foreign', sessionId: 'foreign', checklistId: initial.checklistId, expectedRevision: 1, reason: 'Foreign callback' }), /Stale or foreign/);
  checks.push({ name: 'Native panel rejects cross-session and stale binding', passed: true });
  const other = await peer.tool({ ...plan, title: 'Independent second session' }, 'probe-session-B');
  checked('Separate host sessions never share checklist/task identities', () => {
    assert.notEqual(other.state.checklistId, initial.checklistId); assert.notEqual(other.state.tasks[0].id, initial.tasks[0].id);
  });
  contexts.set('mismatch', { sessionId: 'foreign', messages: [] });
  await assert.rejects(peer.tool({ action: 'status' }, 'mismatch'), /Host context session mismatch/);
  checks.push({ name: 'Recovery rejects a host context identity mismatch', passed: true });
  await peer.close(); peer = boot(); await peer.init();
  receipt = await peer.tool({ action: 'status' });
  checked('Actual SDK process restart recovers only same-session exact tool receipt', () => {
    assert.equal(receipt.state.checklistId, initial.checklistId); assert.equal(receipt.recovery.requiresConfirmation, true);
    assert.equal(receipt.recovery.certainty, 'last-retained-snapshot');
  });
  await assert.rejects(peer.tool(plan), /Explicit user recovery confirmation/);
  checks.push({ name: 'Restart cannot silently overwrite or advance recovered work', passed: true });
  receipt = await peer.tool({ action: 'omit', checklistId: receipt.state.checklistId,
    expectedRevision: receipt.state.revision, taskIds: [receipt.state.tasks[2].id], rescopeTaskIds: [receipt.state.tasks[3].id],
    reason: 'Explicitly omit CPU conclusion; retain limitation', recoveryConfirmation: 'Probe operator confirms no later changes' });
  checked('Explicit CPU omission is recorded without completing evidence work', () => {
    assert.equal(receipt.state.tasks[2].status, 'cancelled'); assert(receipt.state.tasks[3].scopeLimitation.includes('CPU'));
  });
  receipt = await peer.tool({ action: 'update', checklistId: receipt.state.checklistId, expectedRevision: receipt.state.revision,
    updates: [{ taskId: receipt.state.tasks[1].id, status: 'completed', approvalEvidence: 'Probe operator approves outline', evidence: 'Approved supported outline' },
      { taskId: receipt.state.tasks[3].id, status: 'completed', evidence: 'Verified supported arithmetic: (120-90)/120 = 25%' }] });
  checked('Scoped supported completion retains cancellation and limitation', () => {
    assert.deepEqual(receipt.state.counts, { completed: 3, cancelled: 1, remaining: 0, total: 4 });
    assert.equal(receipt.state.lifecycle, 'completed');
  });
  receipt = await peer.tool({ action: 'replace', checklistId: receipt.state.checklistId, expectedRevision: receipt.state.revision,
    reason: 'Replace report with slide-outline task', title: 'Three-stage slide task',
    tasks: [{ key: 'analysis', title: 'Analyse supplied brief', status: 'completed', evidence: 'Brief analysed' },
      { key: 'outline', title: 'Produce slide outline', dependsOn: ['analysis'] },
      { key: 'review', title: 'Review slide outline', dependsOn: ['outline'] }] });
  const replacement = receipt.state.checklistId;
  checked('Replacement archives old request and resets IDs/counts', () => {
    assert.notEqual(replacement, initial.checklistId); assert.equal(receipt.history.at(-1).lifecycle, 'replaced');
    assert.equal(receipt.state.counts.completed, 1);
  });
  receipt = await peer.tool({ action: 'update', checklistId: replacement, expectedRevision: receipt.state.revision,
    updates: receipt.state.tasks.slice(1).map(t => ({ taskId: t.id, status: 'completed', evidence: 'Probe verified slide outline' })) });
  receipt = await peer.tool({ action: 'reopen', checklistId: replacement, expectedRevision: receipt.state.revision,
    taskIds: [receipt.state.tasks[1].id], reason: 'Source table changed after review' });
  checked('Reopen invalidates dependent review while preserving unaffected completed analysis', () => {
    assert.deepEqual(receipt.state.tasks.map(t => t.status), ['completed', 'pending', 'pending']);
    assert.equal(receipt.state.tasks[2].evidence, undefined);
  });
  receipt = await peer.tool({ action: 'cancel', checklistId: replacement, expectedRevision: receipt.state.revision, reason: 'Probe operator cancels unfinished work' });
  checked('Cancellation preserves completed work and terminal cancelled counts', () => {
    assert.equal(receipt.state.lifecycle, 'cancelled');
    assert.deepEqual(receipt.state.counts, { completed: 1, cancelled: 2, remaining: 0, total: 3 });
  });
  const trace = await peer.tool({ action: 'trace' });
  checked('Native transition records contain payloads, timestamps and correlation identities', () => {
    assert(trace.traces.length >= 6);
    for (const t of trace.traces) { assert(t.timestamp && t.correlationId && t.sessionId && t.turnId && t.payload && t.next); }
  });
  await peer.tool({ action: 'create', title: 'Native projection limit', tasks: Array.from({ length: 12 }, (_, index) =>
    ({ key: `large-${index}`, title: `${index}: ${'x'.repeat(440)}` })) }, 'probe-session-large');
  await peer.close(); peer = boot(); await peer.init();
  const unavailable = await peer.tool({ action: 'status' }, 'probe-session-large');
  checked('Native 8,000-character tool projection loss never reconstructs completed work', () => {
    assert.equal(unavailable.state, null); assert.match(unavailable.limitation, /No retained checklist state/);
  });
  await peer.close(); peer = null;
  const report = { status: 'PASS', boundary: 'Actual PI-Desktop 0.16.0 SDK loader; simulated embedding IPC peer. No live UI or permission grants are claimed.',
    timestamp: new Date().toISOString(), asarSha256: PIN, sdkSha256: createHash('sha256').update(sdkSource).digest('hex'),
    packageVersion: manifest.version, checks, records };
  if (options.out) await writeFile(resolve(options.out), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify({ status: report.status, boundary: report.boundary, checks: checks.length, packageVersion: manifest.version, out: options.out ?? null }));
} finally {
  for (const child of children) { if (child.connected) child.disconnect(); child.kill(); }
  await unlink(sdkFile); await rmdir(temp);
}
