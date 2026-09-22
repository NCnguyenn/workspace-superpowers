import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, symlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
let createBroker;
try { ({ createBroker } = await import('../lib/broker.mjs')); } catch (e) { if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e; }
async function setup() {
  assert.equal(typeof createBroker, 'function', 'broker implementation required');
  const runDir = await mkdtemp(path.join(os.tmpdir(), 'ws-broker-test-'));
  await mkdir(path.join(runDir, 'input')); await mkdir(path.join(runDir, 'output')); await mkdir(path.join(runDir, 'context/skills'), {recursive:true});
  await writeFile(path.join(runDir, 'input/source.md'), 'Ordinary document.');
  await writeFile(path.join(runDir, 'run-meta.json'), 'hidden rubric title');
  const broker = createBroker({ runDir, condition: 'baseline' });
  return { runDir, broker };
}
test('broker exposes paired host-recorded results for successful read/write', async () => {
  const {broker,runDir}=await setup();
  assert.equal((await broker.call('read_file',{path:'input\\source.md'})).ok,true);
  assert.equal((await broker.call('write_file',{path:'output/a.md',content:'new'})).ok,true);
  assert.equal(await readFile(path.join(runDir,'output/a.md'),'utf8'),'new');
  assert.equal(broker.events.length,4); assert.equal(broker.events[0].id,broker.events[1].id);
});
test('broker rejects traversal, host paths, metadata, baseline skills and input writes', async () => {
  const {broker}=await setup();
  for(const file of ['../AGENTS.md','run-meta.json','input/../../rubric.json','C:/Windows/win.ini','context/skills/a.md','input/../run-meta.json']) {
    assert.equal((await broker.call('read_file',{path:file})).ok,false,file);
  }
  assert.equal((await broker.call('write_file',{path:'input/source.md',content:'mutate'})).ok,false);
  assert.equal((await broker.call('write_file',{path:'output/notes.png',content:'fake'})).ok,false);
});
test('broker prevents symlink/junction escape', async () => {
  const {broker,runDir}=await setup();
  await symlink(path.dirname(runDir),path.join(runDir,'input/escape'),'junction');
  assert.equal((await broker.call('read_file',{path:'input/escape/secret.md'})).ok,false);
});
test('converter source and shell are unavailable; invalid PDF is observed through inspection', async () => {
  const {broker}=await setup();
  assert.equal((await broker.call('read_file',{path:'input/fake-convert.mjs'})).ok,false);
  assert.equal((await broker.call('shell',{command:'type run-meta.json'})).ok,false);
  const converted=await broker.call('convert_artifact',{src:'input/source.md',out:'output/report.pdf'});
  assert.equal(converted.ok,true); assert.equal(converted.result.exitCode,0);
  const inspected=await broker.call('inspect_pdf',{path:'output/report.pdf'});
  assert.equal(inspected.ok,true); assert.equal(inspected.result.valid,false);
});
test('render and arbitrary execution cannot be used as missing-tool bypass', async () => {
  const {broker}=await setup();
  for(const tool of ['render_image','screenshot','exec','evaluate','fetch']) assert.equal((await broker.call(tool,{})).ok,false);
  assert.ok(!broker.tools.some(t=>['render_image','shell'].includes(t.name)));
});
