import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { exists, readUtf8, ROOT } from './helpers.mjs';

function gitIgnored(rel) {
  const result = spawnSync('git', ['-C', ROOT, 'check-ignore', '-q', '--', rel], {
    encoding: 'utf8',
    windowsHide: true,
  });
  if (result.status === 0) return true;
  if (result.status === 1) return false;
  const detail = [result.stderr, result.stdout, result.error?.message].filter(Boolean).join(' ').trim();
  throw new Error(`git check-ignore ${rel}: status=${result.status} ${detail}`);
}

const PORTABLE = [
  'tests/architecture/helpers.mjs',
  'tests/architecture/skill-contract.test.mjs',
  'tests/architecture/evidence-portability.test.mjs',
  'tests/scenarios/manual/criteria-writing.md',
  'tests/scenarios/manual/workflow-continuity.md',
  'tests/scenarios/manual/long-form-office.md',
  'tests/scenarios/reports/continuity-live-20260920/report.md',
  'tests/scenarios/reports/continuity-live-20260920/independent-evaluation.md',
  'tests/scenarios/reports/continuity-live-20260920/transcripts-c01-c03.md',
  'tests/scenarios/reports/continuity-live-20260920/transcripts-c04-c06.md',
  'tests/scenarios/reports/continuity-live-20260920/transcripts-c07-c08.md',
  'tests/scenarios/reports/continuity-live-20260920/fixtures/report.md',
  'tests/scenarios/reports/continuity-live-20260920/fixtures/audit.xlsx',
];

const LOCAL_ONLY = [
  'tests/scenarios/runs/example-run/transcript.json',
  'tests/scenarios/reports/report-20260918-102736-acd8a284-a8ef-4ca3-bd46-4af4678f81a1-real.md',
];

const ALLOWED_STATUS = new Set(['PENDING', 'PASS', 'FAIL', 'BLOCKED']);

function isAdHocReportDump(rel) {
  return /tests\/scenarios\/reports\/report-/.test(rel);
}

async function assertRetainedEvidence(id, rel) {
  assert.ok(rel, `${id} PASS requires a retained transcript path`);
  assert.equal(isAdHocReportDump(rel), false, `${id} PASS must not use an ad-hoc report-* dump`);
  assert.equal(await exists(rel), true, `${id} missing evidence file ${rel}`);
  assert.equal(gitIgnored(rel), false, `${id} evidence must be committable`);
}

test('portable architecture tests, operator scripts, and retained evidence are not gitignored', async () => {
  for (const rel of PORTABLE) {
    assert.equal(await exists(rel), true, `${rel} missing`);
    assert.equal(gitIgnored(rel), false, `${rel} must be committable`);
  }
});

test('scenario run dumps and ad-hoc report dumps stay gitignored', () => {
  for (const rel of LOCAL_ONLY) {
    assert.equal(gitIgnored(rel), true, `${rel} must remain local-only`);
  }
});

test('long-form thesis/DOCX/PDF campaign exists as a pending operator script', async () => {
  const rel = 'tests/scenarios/manual/long-form-office.md';
  assert.equal(await exists(rel), true, `${rel} missing`);
  const text = await readUtf8(rel);
  assert.match(
    text,
    /Structural PASS is not Behavioral PASS/,
    'long-form script must keep structural vs behavioral evidence classes distinct',
  );
  const ids = [...text.matchAll(/^## (L\d{2})\b/gm)].map((match) => match[1]);
  assert.deepEqual(ids, ['L01', 'L02', 'L03', 'L04', 'L05', 'L06']);
  const caseStatuses = [...text.matchAll(/^Status: `([^`]+)`/gm)].map((match) => match[1]);
  assert.equal(caseStatuses.length, 6, 'each L01–L06 case must record Status');
  const passIds = [];
  for (const [index, status] of caseStatuses.entries()) {
    assert.equal(ALLOWED_STATUS.has(status), true, `${ids[index]} has invalid status ${status}`);
    if (status === 'PASS') passIds.push(ids[index]);
  }
  assert.doesNotMatch(text, /6\/6 ca behavioral PASS|6\/6 behavioral PASS/);
  if (passIds.length === 0) {
    assert.match(text, /Current filled status for all 6 cases: `PENDING`/);
    assert.ok(caseStatuses.every((status) => status === 'PENDING'));
  } else {
    for (const id of passIds) {
      const block = text.split(new RegExp(`^## ${id}\\b`, 'm'))[1]?.split(/^## /m)[0] ?? '';
      await assertRetainedEvidence(id, block.match(/tests\/scenarios\/reports\/[^\s)`]+/)?.[0]);
    }
  }
  assert.match(text, /thesis|chapter/i);
  assert.match(text, /\bDOCX\b/);
  assert.match(text, /\bPDF\b/);
  assert.match(text, /compact/i);
  assert.match(text, /skill\/tool log|execution trace/i);
});


test('B01–B16 remain pending unless a per-case evidence record exists', async () => {
  const text = await readUtf8('tests/scenarios/manual/criteria-writing.md');
  const statuses = [...text.matchAll(/giá trị hiện tại: `([^`]+)`/g)].map((match) => match[1]);
  assert.equal(statuses.length, 16, 'each B01–B16 case must record a current status');
  const passIds = [];
  for (const [index, status] of statuses.entries()) {
    assert.equal(ALLOWED_STATUS.has(status), true, `B${String(index + 1).padStart(2, '0')} has invalid status ${status}`);
    if (status === 'PASS') passIds.push(`B${String(index + 1).padStart(2, '0')}`);
  }
  assert.doesNotMatch(text, /16\/16 ca behavioral PASS/);
  if (passIds.length === 0) {
    assert.match(text, /Current filled status for all 16 cases: `PENDING`/);
    return;
  }
  for (const id of passIds) {
    const block = text.split(new RegExp(`^## ${id}\\b`, 'm'))[1]?.split(/^## /m)[0] ?? '';
    await assertRetainedEvidence(id, block.match(/tests\/scenarios\/reports\/[^\s)`]+/)?.[0]);
  }
});

test('continuity live report discloses missing skill/tool logs and pending campaigns', async () => {
  const report = await readUtf8('tests/scenarios/reports/continuity-live-20260920/report.md');
  assert.match(report, /tool-call logs are unavailable/i);
  assert.match(report, /B01–B16 campaign remains pending/);
  assert.match(report, /do not cover all 22 skills behaviorally/);
  assert.match(report, /response-level PASS with execution-evidence limits/i);
  assert.match(report, /does not independently prove which skill files or\s+tools were loaded/);
  const evaluation = await readUtf8(
    'tests/scenarios/reports/continuity-live-20260920/independent-evaluation.md',
  );
  assert.match(evaluation, /execution-evidence limits/);
  assert.match(evaluation, /do not prove hidden skill reads/);
});

test('workflow continuity script records C01–C08 and the execution-evidence rule', async () => {
  const text = await readUtf8('tests/scenarios/manual/workflow-continuity.md');
  const ids = [...text.matchAll(/^## (C0[1-8])\b/gm)].map((match) => match[1]);
  assert.deepEqual(ids, ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08']);
  assert.match(text, /Execution-evidence rule/);
  assert.match(
    text,
    /A response-level PASS may not infer that a named skill or tool ran/,
  );
  assert.match(text, /B01–B16 campaign remains pending/);
  assert.match(text, /hidden execution traces remain unavailable|skill\/tool traces are unavailable/);
});
