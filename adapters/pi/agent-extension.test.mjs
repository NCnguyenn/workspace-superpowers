import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
const require = createRequire(import.meta.url);
const main = require('./main.cjs');
const manifest = JSON.parse(readFileSync(new URL('./manifest.json', import.meta.url), 'utf8'));
const extensionPath = new URL('./agent-extension.cjs', import.meta.url);
const extension = existsSync(extensionPath) ? require('./agent-extension.cjs') : main;
const { toTodoWriteArgs } = require('./native-checklist.cjs');

function host() {
  const handlers = new Map();
  const api = { on(name, handler) {
    assert.ok(!handlers.has(name), `duplicate ${name}`);
    handlers.set(name, handler);
  }};
  return { api, handlers };
}

test('desktop manifest uses the actual native agent extension permission and entry', () => {
  assert.deepEqual(manifest.permissions, ['agent.prompt.inject', 'agent.extension']);
  assert.deepEqual(manifest.contributes?.agentExtensions, ['adapters/pi/agent-extension.js']);
  assert.equal(manifest.ui, undefined, 'the built-in checklist needs no plugin panel');
});

test('native agent extension exposes a default export for the desktop sidecar loader', () => {
  assert.equal(extension.default, extension);
});

test('desktop plugin lifecycle does not register an ineffective notification hook', async () => {
  const registrations = [];
  await main.onLoad({ events: { on(name) { registrations.push(name); } },
    agent: { async registerTool() {}, async unregisterTool() {} },
    commands: { async register() {}, async unregister() {} },
    ui: { async openPanel() {}, async closePanel() {} },
    session: { async getLlmContext() { return { messages: [] }; } },
  });
  assert.deepEqual(registrations, []);
  await main.onUnload();
});

test('default plugin lifecycle leaves tools, commands, panels and session state to the host', async () => {
  const calls = [];
  const record = (name) => async () => { calls.push(name); };
  await main.onLoad({
    agent: { registerTool: record('registerTool'), unregisterTool: record('unregisterTool') },
    commands: { register: record('registerCommand'), unregister: record('unregisterCommand') },
    ui: { openPanel: record('openPanel'), closePanel: record('closePanel') },
    session: { getLlmContext: record('getLlmContext') },
  });
  await main.onUnload();
  assert.deepEqual(calls, []);
  assert.equal(main.onPanelInvoke, undefined, 'no competing renderer callback is exposed');
});

test('default plugin loads without checklist SDK permissions or capabilities', async () => {
  await assert.doesNotReject(async () => {
    await main.onLoad({});
    await main.onUnload();
  });
});

test('native agent extension returns a prompt without mutating the host event', async () => {
  const { api, handlers } = host();
  extension(api);
  extension(api);
  assert.equal(handlers.size, 1);
  const event = Object.freeze({ systemPrompt: 'Project custom constraints.' });
  const result = await handlers.get('before_agent_start')(event);
  assert.ok(result.systemPrompt.startsWith(event.systemPrompt));
  assert.ok(result.systemPrompt.includes('local.workspace-superpowers/using-workspace-superpowers'));
  assert.match(result.systemPrompt, /Package root: .*[\\/]workspace-superpowers/);
  assert.ok(result.systemPrompt.length < 6000, 'only the bounded bootstrap is injected');
  assert.equal(event.systemPrompt, 'Project custom constraints.');
});

test('TodoWrite remains unblocked even with the retired plugin checklist in the catalog', async () => {
  const input = toTodoWriteArgs([
    { title: 'Read supplied source', status: 'completed' },
    { title: 'Approve supported result', status: 'awaiting_user' },
    { title: 'Supply missing input', status: 'blocked' },
    { title: 'Paused follow-up', status: 'paused' },
    { title: 'Omitted export', status: 'cancelled' },
    { title: 'Reopened review', status: 'pending' },
  ]);
  for (const competingTool of [true, false]) {
    const { api, handlers } = host();
    api.getAllTools = () => [
      { name: 'TodoWrite' },
      ...(competingTool ? [{ name: 'plugin_local_workspace_superpowers_workspace_checklist' }] : []),
    ];
    extension(api);
    const original = structuredClone(input);
    const result = await handlers.get('tool_call')?.({ toolName: 'TodoWrite', input });
    assert.notEqual(result?.block, true);
    assert.deepEqual(input, original, 'the extension must not rewrite host checklist arguments');
    assert.equal(handlers.has('tool_call'), false, 'bootstrap must not intercept TodoWrite');
  }
});

test('native bootstrap requires minimal meaning-preserving edits for only requests', async () => {
  const { api, handlers } = host();
  extension(api);
  const result = await handlers.get('before_agent_start')({ systemPrompt: 'Base' });
  assert.match(result.systemPrompt, /minimal meaning-preserving edit/);
  assert.match(result.systemPrompt, /preserve\s+grammar,\s+tense,\s+number,\s+and\s+punctuation/);
  assert.match(result.systemPrompt, /return\s+only\s+edited\s+text/);
  assert.match(result.systemPrompt, /do not relabel supplied values/);
});

test('injected bootstrap selects the built-in checklist and preserves its schema boundary', async () => {
  const { api, handlers } = host();
  extension(api);
  const result = await handlers.get('before_agent_start')({ systemPrompt: 'Base' });
  assert.match(result.systemPrompt, /host's built-in `TodoWrite`/);
  assert.match(result.systemPrompt, /replaces the full list/i);
  assert.match(result.systemPrompt, /at most one item may be in_progress/i);
  assert.match(result.systemPrompt, /awaiting_user|blocked|paused/);
  assert.match(result.systemPrompt, /Markdown fallback/i);
  assert.doesNotMatch(result.systemPrompt, /plugin_local_workspace_superpowers_workspace_checklist|Legacy TodoWrite|native panel owns/);
  assert.match(result.systemPrompt, /do not print a second.*Markdown checklist/i);
});

test('checklist runtime uses the host tool without inventing lifecycle or visibility APIs', () => {
  const runtime = readFileSync(new URL('./checklist-runtime.md', import.meta.url), 'utf8');
  assert.match(runtime, /host's built-in `TodoWrite`/);
  assert.match(runtime, /approvalEvidence|explicit user approval/i);
  assert.match(runtime, /resolution evidence/i);
  assert.match(runtime, /cancelled.*not.*completed/i);
  assert.match(runtime, /reopen[\s\S]{0,120}dependen/i);
  assert.match(runtime, /no.*show.*hide.*API/i);
  assert.match(runtime, /Markdown.*not.*native UI/i);
  assert.doesNotMatch(runtime, /plugin_local_workspace_superpowers_workspace_checklist|checklistId.*expectedRevision|pluginBridge|openPanel/);
});

test('refreshing a stale managed bootstrap removes TodoWrite suppression', async () => {
  const { api, handlers } = host();
  extension(api);
  const stale = 'Keep project rules.\n<!-- workspace-superpowers:runtime:begin -->\n'
    + 'Use plugin_local_workspace_superpowers_workspace_checklist instead of TodoWrite.\n'
    + '<!-- workspace-superpowers:runtime:end -->';
  const result = await handlers.get('before_agent_start')({ systemPrompt: stale });
  assert.ok(result.systemPrompt.startsWith('Keep project rules.'));
  assert.doesNotMatch(result.systemPrompt, /plugin_local_workspace_superpowers_workspace_checklist/);
  assert.match(result.systemPrompt, /host's built-in `TodoWrite`/);
});

test('each rebuilt native system prompt receives bootstrap, including after compaction', async () => {
  const { api, handlers } = host();
  extension(api);
  const hook = handlers.get('before_agent_start');
  const first = await hook({ systemPrompt: 'Base' });
  const next = await hook({ systemPrompt: 'Base' });
  assert.equal(next.systemPrompt, first.systemPrompt);
  assert.equal(await hook({ systemPrompt: first.systemPrompt }), undefined);
  const restored = await hook({ systemPrompt: 'Compacted base' });
  assert.ok(restored.systemPrompt.includes('local.workspace-superpowers/using-workspace-superpowers'));
});

test('a legacy heading or quoted marker does not suppress native bootstrap', async () => {
  const { api, handlers } = host();
  extension(api);
  const base = '## Workspace Superpowers\nCustom plugin path: D:/user/plugin.\n'
    + 'Example marker: <!-- workspace-superpowers:pi-bootstrap:v2 -->';
  const result = await handlers.get('before_agent_start')({ systemPrompt: base });
  assert.ok(result.systemPrompt.startsWith(base));
  assert.ok(result.systemPrompt.includes('local.workspace-superpowers/using-workspace-superpowers'));
});

test('managed runtime block refresh preserves surrounding project instructions', async () => {
  const { api, handlers } = host();
  extension(api);
  const stale = 'Keep prefix $&\n<!-- workspace-superpowers:runtime:begin -->\nOld rules\n'
    + '<!-- workspace-superpowers:runtime:end -->\nKeep suffix.';
  const result = await handlers.get('before_agent_start')({ systemPrompt: stale });
  assert.ok(!result.systemPrompt.includes('Old rules'));
  assert.ok(result.systemPrompt.startsWith('Keep prefix $&\n'));
  assert.ok(result.systemPrompt.endsWith('\nKeep suffix.'));
  assert.equal(result.systemPrompt.split('<!-- workspace-superpowers:runtime:begin -->').length, 2);
});
