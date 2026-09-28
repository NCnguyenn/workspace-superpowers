import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import extension from '../../.pi/extensions/superpowers.ts';

const packageRoot = resolve(import.meta.dirname, '../..');
const packageJson = JSON.parse(await readFile(resolve(packageRoot, 'package.json'), 'utf8'));
const BEGIN = '<!-- workspace-superpowers:pi-cli-bootstrap:begin -->';
const END = '<!-- workspace-superpowers:pi-cli-bootstrap:end -->';
const MARKER = '<!-- workspace-superpowers:pi-bootstrap:v1 -->';

function startExtension() {
  const hooks = new Map();
  extension({ on(name, handler) { hooks.set(name, handler); } });
  return hooks;
}

async function prompt(hooks, systemPrompt = 'Project rules stay here.') {
  return hooks.get('before_agent_start')({ systemPrompt }, { cwd: '/unrelated-project' });
}

test('package registers the Pi extension and native skill directory', () => {
  assert.deepEqual(packageJson.pi?.extensions, ['./.pi/extensions/superpowers.ts']);
  assert.deepEqual(packageJson.pi?.skills, ['./skills']);
});

test('discovery resolves skills from the installed package, independent of cwd', async () => {
  const hooks = startExtension();
  const result = await hooks.get('resources_discover')({}, { cwd: '/unrelated-project' });
  assert.deepEqual(result.skillPaths, [resolve(packageRoot, 'skills')]);
});

test('new session prepends bootstrap and keeps existing system instructions', async () => {
  const hooks = startExtension();
  await hooks.get('session_start')({});
  const result = await prompt(hooks);
  assert.ok(result.systemPrompt.startsWith(BEGIN));
  assert.ok(result.systemPrompt.includes(MARKER));
  assert.match(result.systemPrompt, /Project rules stay here\./);
  assert.ok(result.systemPrompt.includes(resolve(packageRoot, 'skills', 'using-workspace-superpowers', 'SKILL.md')));
});

test('next turn and repeated hook calls do not duplicate bootstrap', async () => {
  const hooks = startExtension();
  const first = await prompt(hooks);
  const again = await prompt(hooks, first.systemPrompt);
  assert.equal(again, undefined);
  const rebuilt = await prompt(hooks);
  assert.equal(rebuilt.systemPrompt, first.systemPrompt);
});

test('compaction rebuild restores bootstrap once', async () => {
  const hooks = startExtension();
  await prompt(hooks);
  await hooks.get('session_compact')({});
  const restored = await prompt(hooks, 'Compacted project instructions.');
  assert.equal(restored.systemPrompt.match(/pi-cli-bootstrap:begin/g).length, 1);
  assert.match(restored.systemPrompt, /Compacted project instructions\./);
});

test('quoted marker in user input cannot suppress bootstrap', async () => {
  const hooks = startExtension();
  const result = await hooks.get('before_agent_start')({
    systemPrompt: 'Project rules stay here.',
    prompt: 'Please quote <!-- workspace-superpowers:pi-bootstrap:v1 -->',
    messages: [{ role: 'user', content: '<!-- workspace-superpowers:pi-bootstrap:v1 -->' }],
  });
  assert.ok(result.systemPrompt.startsWith(BEGIN));
});

test('missing system prompt still receives the bootstrap', async () => {
  const hooks = startExtension();
  const result = await hooks.get('before_agent_start')({});
  assert.ok(result.systemPrompt.startsWith(BEGIN));
});

test('missing bootstrap is reported in the system prompt', async () => {
  const { createPiLifecycle } = await import('../../adapters/pi-cli/lifecycle.mjs');
  const hooks = new Map();
  createPiLifecycle({ on(name, handler) { hooks.set(name, handler); } }, {
    packageRoot,
    readBootstrap() { throw new Error('missing file'); },
  });
  const result = await prompt(hooks);
  assert.match(result.systemPrompt, /Workspace Superpowers bootstrap unavailable/);
  assert.match(result.systemPrompt, /Project rules stay here\./);
});

test('separate Pi instances do not share session state', async () => {
  const a = startExtension();
  const b = startExtension();
  await a.get('session_compact')({});
  const [first, second] = await Promise.all([prompt(a), prompt(b)]);
  assert.equal(first.systemPrompt, second.systemPrompt);
});

test('standalone marker in project instructions cannot suppress injection', async () => {
  const hooks = startExtension();
  const projectRules = `Quote for later:\n${MARKER}\nKeep my constraint.`;
  const result = await prompt(hooks, projectRules);
  assert.ok(result.systemPrompt.includes(BEGIN));
  assert.ok(result.systemPrompt.includes(END));
  assert.ok(result.systemPrompt.endsWith(projectRules));
});

test('stale owned bootstrap is replaced while project instructions survive', async () => {
  const hooks = startExtension();
  const old = `${BEGIN}\n${MARKER}\nOutdated route\n${END}\n\nKeep my constraint.`;
  const result = await prompt(hooks, old);
  assert.equal(result.systemPrompt.includes('Outdated route'), false);
  assert.equal(result.systemPrompt.match(/pi-cli-bootstrap:begin/g).length, 1);
  assert.ok(result.systemPrompt.endsWith('Keep my constraint.'));
  assert.ok(result.systemPrompt.includes(resolve(packageRoot, 'skills', 'using-workspace-superpowers', 'SKILL.md')));
});

test('owned bootstrap from another install path is refreshed', async () => {
  const hooks = startExtension();
  const otherRoot = resolve(packageRoot, '../older-install');
  const old = `${BEGIN}\n${MARKER}\nRead ${resolve(otherRoot, 'skills/using-workspace-superpowers/SKILL.md')}\n${END}\n\nKeep my constraint.`;
  const result = await prompt(hooks, old);
  assert.equal(result.systemPrompt.includes(otherRoot), false);
  assert.ok(result.systemPrompt.includes(packageRoot));
  assert.ok(result.systemPrompt.endsWith('Keep my constraint.'));
});

test('owned block missing its internal marker is refreshed', async () => {
  const hooks = startExtension();
  const incomplete = `${BEGIN}\nStale content without marker\n${END}\n\nKeep my constraint.`;
  const result = await prompt(hooks, incomplete);
  assert.equal(result.systemPrompt.includes('Stale content without marker'), false);
  assert.equal(result.systemPrompt.match(/pi-cli-bootstrap:begin/g).length, 1);
  assert.ok(result.systemPrompt.includes(MARKER));
});

test('registration is idempotent for the same Pi instance', async () => {
  const { createPiLifecycle } = await import('../../adapters/pi-cli/lifecycle.mjs');
  const registrations = [];
  const pi = { on(name, handler) { registrations.push({ name, handler }); } };
  createPiLifecycle(pi, { packageRoot });
  createPiLifecycle(pi, { packageRoot });
  assert.equal(registrations.length, 4);
  assert.equal(registrations.filter(entry => entry.name === 'before_agent_start').length, 1);
});
