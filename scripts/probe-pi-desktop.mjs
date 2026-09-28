#!/usr/bin/env node
// Explicit, offline host-boundary probe. Never installs or grants permissions.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, writeFile, cp, rm, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const PINNED_SHA256 = 'a8925db0a896cc231a22dd515775d4187904e7c80c80ad526880139a4cc520eb';
const START = '<!-- workspace-superpowers:runtime:begin -->';
const END = '<!-- workspace-superpowers:runtime:end -->';
const ROUTER = 'local.workspace-superpowers/using-workspace-superpowers';
const hash = (data) => createHash('sha256').update(data).digest('hex');
let temporary;
try {
  const options = Object.fromEntries(process.argv.slice(2).map((arg) => {
    const match = /^--(sidecar|plugin)=(.+)$/.exec(arg);
    assert.ok(match, 'Usage: --sidecar=<absolute sidecar.js> --plugin=<candidate folder>');
    return [match[1], match[2]];
  }));
  assert.ok(options.sidecar && options.plugin, 'Both --sidecar and --plugin are required');
  assert.ok(isAbsolute(options.sidecar), '--sidecar must be absolute');
  const plugin = resolve(options.plugin);
  const bytes = await readFile(options.sidecar);
  const sidecarHash = hash(bytes);
  assert.equal(sidecarHash, PINNED_SHA256, 'Unrecognized sidecar: refusing dynamic execution');
  const manifest = JSON.parse(await readFile(join(plugin, 'manifest.json'), 'utf8'));
  assert.ok(manifest.permissions?.includes('agent.extension'), 'agent.extension must be declared');
  const entries = manifest.contributes?.agentExtensions;
  assert.deepEqual(entries, ['adapters/pi/agent-extension.js']);
  const entry = resolve(plugin, entries[0]);
  assert.ok(!relative(plugin, entry).startsWith('..') && !isAbsolute(relative(plugin, entry)));
  const bootstrap = await readFile(join(dirname(entry), 'bootstrap.md'));
  assert.ok(bootstrap.toString('utf8').trim(), 'Candidate bootstrap is empty');

  temporary = await mkdtemp(join(tmpdir(), 'workspace-pi-native-probe-'));
  const nativePath = join(temporary, 'sidecar-probe.mjs');
  await writeFile(nativePath, Buffer.concat([bytes, Buffer.from('\nexport {LZ, Gbt, kae};\n')]));
  const { LZ, Gbt, kae } = await import(pathToFileURL(nativePath).href);
  assert.equal(typeof await Gbt(entry, {}), 'function');
  function makeRunner(root, target) {
    return new LZ({
      specs: [{ id: target, entry: target, label: manifest.name, source: 'plugin', root }],
      reservedToolNames: () => [],
      bridge: { cwd: temporary, sessionId: 'offline-host-probe', publishCommands() {},
        publishDiagnostics() {}, getModel() { return {}; }, isIdle() { return true; } },
    });
  }
  const runner = makeRunner(plugin, entry);
  const cases = [];
  try {
    await runner.load();
    assert.equal(runner.getLoadReports()[0]?.state, 'loaded');
    const runtime = Object.create(kae.prototype);
    runtime.extensionRunner = runner;
    let applied;
    runtime.setAgentSystemPrompt = (value) => { applied = value; };
    for (const [name, base] of [
      ['fresh', 'UNRELATED_HOST_PREFIX'],
      ['repeated', null],
      ['compacted-base', 'UNRELATED_COMPACTED_PREFIX'],
    ]) {
      const input = base ?? applied;
      runtime.composeSystemPrompt = () => input;
      await runtime.extensionBeforeAgentStart('offline test');
      assert.ok(applied.startsWith(input.split('\n')[0]));
      assert.ok(applied.includes(ROUTER));
      assert.equal(applied.split(START).length - 1, 1);
      assert.equal(applied.split(END).length - 1, 1);
      if (name === 'repeated') assert.equal(applied, input);
      cases.push(name);
    }
    assert.deepEqual(runner.getDiagnostics(), []);
  } finally {
    await runner.dispose();
  }
  for (const fault of ['missing', 'empty']) {
    const root = join(temporary, fault);
    await cp(plugin, root, { recursive: true });
    const badBootstrap = join(root, 'adapters/pi/bootstrap.md');
    if (fault === 'missing') await rm(badBootstrap);
    else await writeFile(badBootstrap, '   \n');
    const broken = makeRunner(root, join(root, entries[0]));
    try {
      await broken.load();
      assert.equal(broken.getLoadReports()[0]?.state, 'error');
      assert.ok(broken.getDiagnostics().some((item) => item.kind === 'factory_error'));
      cases.push(`${fault}-bootstrap-visible-error`);
    } finally {
      await broken.dispose();
    }
  }
  console.log(JSON.stringify({ piDesktopVersion: '0.15.9', sidecarHash,
    pluginVersion: manifest.version, bootstrapHash: hash(bootstrap),
    hostBoundary: 'PASS', modelAcceptance: 'PENDING', cases }));
} catch (error) {
  console.error(JSON.stringify({ hostBoundary: 'FAIL', error: error.message }));
  process.exitCode = 1;
} finally {
  if (temporary) {
    const target = await realpath(temporary);
    const tempRoot = await realpath(tmpdir());
    assert.equal(dirname(target), tempRoot, 'Cleanup target must stay inside the temp root');
    assert.ok(basename(target).startsWith('workspace-pi-native-probe-'));
    await rm(target, { recursive: true, force: true });
  }
  // Imported sidecar owns an stdin listener. This standalone probe has no RPC session.
  process.stdin.pause();
}
