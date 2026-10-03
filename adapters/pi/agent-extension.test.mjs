import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
const require = createRequire(import.meta.url);
const main = require('./main.cjs');
const manifest = JSON.parse(readFileSync(new URL('./manifest.json', import.meta.url), 'utf8'));
const extensionPath = new URL('./agent-extension.cjs', import.meta.url);
const extension = existsSync(extensionPath) ? require('./agent-extension.cjs') : main;

function host() {
  const handlers = new Map();
  const api = { on(name, handler) {
    assert.ok(!handlers.has(name), `duplicate ${name}`);
    handlers.set(name, handler);
  }};
  return { api, handlers };
}

test('desktop manifest uses the actual native agent extension permission and entry', () => {
  assert.ok(manifest.permissions.includes('agent.extension'));
  assert.deepEqual(manifest.contributes?.agentExtensions, ['adapters/pi/agent-extension.js']);
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

test('native agent extension returns a prompt without mutating the host event', async () => {
  const { api, handlers } = host();
  extension(api);
  extension(api);
  assert.equal(handlers.size, 2);
  const event = Object.freeze({ systemPrompt: 'Project custom constraints.' });
  const result = await handlers.get('before_agent_start')(event);
  assert.ok(result.systemPrompt.startsWith(event.systemPrompt));
  assert.ok(result.systemPrompt.includes('local.workspace-superpowers/using-workspace-superpowers'));
  assert.match(result.systemPrompt, /Package root: .*[\\/]workspace-superpowers/);
  assert.ok(result.systemPrompt.length < 6000, 'only the bounded bootstrap is injected');
  assert.equal(event.systemPrompt, 'Project custom constraints.');
});

test('native owner prevents the model from creating a competing TodoWrite mirror', async () => {
  const { api, handlers } = host();
  api.getAllTools = () => [{ name: 'plugin_local_workspace_superpowers_workspace_checklist' }];
  extension(api);
  assert.equal(typeof handlers.get('tool_call'), 'function');
  const result = await handlers.get('tool_call')({ toolName: 'TodoWrite', input: { todos: [] } });
  assert.equal(result.block, true);
  assert.match(result.reason, /workspace_checklist/);
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

test('native bootstrap documents the PI-Desktop TodoWrite checklist mirror boundary', async () => {
  const { api, handlers } = host();
  extension(api);
  const result = await handlers.get('before_agent_start')({ systemPrompt: 'Base' });
  assert.match(result.systemPrompt, /TodoWrite/);
  assert.match(result.systemPrompt, /replaces the full list/i);
  assert.match(result.systemPrompt, /at most one item may be in_progress/i);
  assert.match(result.systemPrompt, /awaiting_user|blocked|paused/);
  assert.match(result.systemPrompt, /Markdown fallback/i);
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
