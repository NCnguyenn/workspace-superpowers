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

test('desktop plugin lifecycle does not register an ineffective notification hook', async () => {
  const registrations = [];
  await main.onLoad({ events: { on(name) { registrations.push(name); } } });
  assert.deepEqual(registrations, []);
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
  assert.ok(result.systemPrompt.length < 6000, 'only the thin bootstrap is injected');
  assert.equal(event.systemPrompt, 'Project custom constraints.');
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
