// RUNNER SELF-TEST (node:test) — validates the harness mechanics ONLY.
//
// ⚠️ NOT BEHAVIORAL EVIDENCE. These tests drive the MOCK executor, whose
// transcripts are self-written by this repo. They prove that:
//   - isolation produces a fresh input/ + empty output/ per run,
//   - the grader returns PASS for a compliant transcript + correct artifacts,
//   - the grader returns FAIL for a non-compliant transcript (it is not a
//     rubber stamp),
//   - infrastructure problems (executor error / no real runner) are BLOCKED,
//     never a false PASS.
// They say NOTHING about whether a real agent, with or without the skill pack,
// actually behaves this way. Real baseline/treatment evidence requires the
// `real` executor against an isolated agent runner (WS_AGENT_CMD). See README.
import test from 'node:test';
import assert from 'node:assert/strict';
import { runScenarios } from '../run.mjs';

const COMMON = { condition: 'treatment', repeat: 1, scenarios: [], model: 'mock', effort: 'n/a' };
const SCENARIO_COUNT = 5;

test('mock/compliant: grader PASSes every scenario (runner + grader work end to end)', async () => {
  const { results } = await runScenarios({ ...COMMON, executor: 'mock', mockProfile: 'compliant' });
  assert.equal(results.length, SCENARIO_COUNT, 'expected one run per scenario');
  for (const r of results) {
    assert.equal(r.status, 'PASS', `${r.scenarioId} should PASS under compliant mock — ${r.reason}`);
  }
});

test('mock/noncompliant: grader FAILs every scenario (not a rubber stamp)', async () => {
  const { results } = await runScenarios({ ...COMMON, executor: 'mock', mockProfile: 'noncompliant' });
  assert.equal(results.length, SCENARIO_COUNT);
  for (const r of results) {
    assert.equal(r.status, 'FAIL', `${r.scenarioId} should FAIL under non-compliant mock — got ${r.status}`);
    assert.ok(r.summary.failed >= 1, `${r.scenarioId} FAIL must cite at least one failed required criterion`);
  }
});

test('mock/error: infrastructure failure is BLOCKED, never PASS or FAIL', async () => {
  const { results } = await runScenarios({ ...COMMON, executor: 'mock', mockProfile: 'error' });
  for (const r of results) {
    assert.equal(r.status, 'BLOCKED', `${r.scenarioId} should be BLOCKED on executor error`);
  }
});

test('real executor with no endpoint: every run is BLOCKED (no fabricated real-model result)', async (t) => {
  const original=process.env.WS_BASE_URL;
  delete process.env.WS_BASE_URL;
  t.after(()=>{ if(original===undefined) delete process.env.WS_BASE_URL; else process.env.WS_BASE_URL=original; });
  const { results } = await runScenarios({
    executor: 'real', condition: 'both', repeat: 1, scenarios: [], model: 'unknown', effort: 'unknown',
  });
  assert.equal(results.length, SCENARIO_COUNT * 2, 'baseline + treatment per scenario');
  for (const r of results) {
    assert.equal(r.status, 'BLOCKED', `${r.scenarioId}/${r.condition} must be BLOCKED without a real runner`);
    assert.match(r.reason, /unavailable|WS_BASE_URL/i);
  }
});

test('isolation: prepared runs start empty; baseline lacks skills and treatment snapshots references', async () => {
  const {loadScenario,prepareRun}=await import('../lib/scenario.mjs');
  const {readdir,readFile}=await import('node:fs/promises');
  const scenario=await loadScenario('edit-paragraph');
  const baseline=await prepareRun({scenario,condition:'baseline',repeatIndex:1,executorName:'mock'});
  const treatment=await prepareRun({scenario,condition:'treatment',repeatIndex:1,executorName:'mock'});
  const runDir = baseline.runDir;
  const { pathExists } = await import('../lib/fsx.mjs');
  const path = (await import('node:path')).default;
  assert.ok(await pathExists(path.join(runDir, 'input', 'report.md')), 'fixture copied into isolated input/');
  assert.deepEqual(await readdir(baseline.outputDir),[]);
  assert.deepEqual(await readdir(treatment.outputDir),[]);
  assert.notEqual(baseline.runDir,treatment.runDir);
  assert.equal(await pathExists(path.join(baseline.contextDir,'skills')),false);
  assert.ok(await pathExists(path.join(treatment.contextDir,'skills/analyzing-artifacts/references/artifact-inspection.md')));
  assert.ok(await pathExists(path.join(runDir, 'context', 'bootstrap.md')), 'condition context recorded');
  const bootstrap=await readFile(path.join(baseline.contextDir,'bootstrap.md'),'utf8');
  assert.doesNotMatch(bootstrap,/superpowers|read\/analyze|verify/i);
  assert.equal(baseline.runMeta.packSha256,treatment.runMeta.packSha256);
  assert.equal(baseline.runMeta.inputSha256,treatment.runMeta.inputSha256);
});
