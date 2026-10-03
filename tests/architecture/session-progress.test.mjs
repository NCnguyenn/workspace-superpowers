import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { exists, readUtf8, ROOT } from './helpers.mjs';

// These tests prove the portable contract and the operator campaign are wired.
// They do not prove an agent followed the contract in a live multi-turn session.
const CONTRACT = 'references/session-progress.md';
const ROUTER = 'skills/using-workspace-superpowers/SKILL.md';
const CONTINUITY = 'references/workflow-continuity.md';
const TRACKING = 'references/work-tracking.md';
const CAMPAIGN = 'tests/scenarios/manual/session-checklist.md';
const EXPECTED_CASE_IDS = Array.from({ length: 10 }, (_, index) => `SCL${String(index + 1).padStart(2, '0')}`);
const REQUIRED_CASE_SECTIONS = [
  'Initial prompt',
  'Follow-up turns',
  'Acceptance criteria',
  'Forbidden defects',
  'Evidence record',
];
const ALLOWED_STATUS = new Set(['PENDING', 'PASS', 'FAIL', 'BLOCKED']);

async function text(file) {
  assert.equal(await exists(file), true, `${file} is missing`);
  return readUtf8(file);
}

function prose(source) {
  return source.replace(/\s+/g, ' ');
}

function campaignBlocks(source) {
  const matches = [...source.matchAll(/^## (SCL\d{2}):[^\n]*$/gm)];
  const ids = matches.map((match) => match[1]);
  assert.deepEqual(ids, EXPECTED_CASE_IDS, 'campaign IDs must be SCL01–SCL10 in order without duplicates');

  const blocks = new Map();
  for (let index = 0; index < matches.length; index += 1) {
    const start = matches[index].index;
    const next = index + 1 < matches.length ? matches[index + 1].index : source.length;
    blocks.set(matches[index][1], source.slice(start, next));
  }
  return blocks;
}

async function assertRetainedEvidence(caseId, block) {
  const match = block.match(/Retained evidence:\s*`?(tests\/scenarios\/reports\/[^\s)`]+)`?/i);
  assert.ok(match, `${caseId}: PASS requires a retained evidence path`);
  const rel = match[1];
  assert.doesNotMatch(rel, /tests\/scenarios\/reports\/report-/i,
    `${caseId}: PASS cannot rely on an ignored ad-hoc report dump`);
  assert.equal(await exists(rel), true, `${caseId}: retained evidence is missing: ${rel}`);

  const ignored = spawnSync('git', ['-C', ROOT, 'check-ignore', '-q', '--', rel], {
    encoding: 'utf8',
    windowsHide: true,
  });
  assert.equal(ignored.status, 1, `${caseId}: retained evidence must be committable: ${rel}`);
}

test('session progress contract defines a chat-managed, response-boundary MVP', async () => {
  const contract = await text(CONTRACT);
  const router = await text(ROUTER);

  assert.match(router, /session progress contract.*session-progress\.md/i);
  assert.match(contract, /MVP is chat-managed/i);
  assert.match(contract, /no background event listener.*state database.*native Todo service/i);
  assert.match(contract, /normal response|response boundaries/i);
  assert.match(contract, /realtime progress.*unexposed tool loop/i);
  assert.match(contract, /native host implementation.*event path/i);
  assert.match(contract, /Static contract checks.*not behavioral acceptance/i);
  assert.match(contract, /PENDING Phase 2 behavioral acceptance/i);
});

test('activation keeps simple work lean and requires meaningful multi-stage outcomes', async () => {
  const contract = prose(await text(CONTRACT));
  assert.match(contract, /routine save\/reopen.*does not.*activate|does not.*activate.*routine save\/reopen/i);
  assert.match(contract, /multiple loaded skills.*not sufficient|export.*not sufficient|verification call.*not sufficient/i);
  assert.match(contract, /three or more.*milestones|several meaningful results/i);
  assert.match(contract, /If uncertain.*start lean|uncertain.*create.*checklist/i);
});

test('checklists have stable transient identity and same-checklist dependencies', async () => {
  const contract = prose(await text(CONTRACT));

  for (const field of ['id: string', 'sessionId: string', 'currentTaskId: string | null', 'dependsOn?: string[]']) {
    assert.match(contract, new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `missing model field: ${field}`);
  }
  assert.match(contract, /checklist IDs are stable.*task IDs are stable/i);
  assert.match(contract, /currentTaskId.*task.*same checklist/i);
  assert.match(contract, /dependsOn.*only task IDs from the same checklist/i);
  assert.match(contract, /cannot contain a duplicate/i);
  assert.match(contract, /task's own ID/i);
  assert.match(contract, /missing ID/i);
  assert.match(contract, /or a cycle/i);
  assert.match(contract, /cancelled prerequisite.*not.*treated as completed/i);
  assert.match(contract, /replacement checklist.*distinct checklist ID.*distinct task IDs/i);
  assert.match(contract, /ephemeral.*not.*durable.*work-plan\.md|work-plan\.md.*ephemeral/i);
});

test('task evidence and derived counts distinguish completion from waiting, blocking, pause, and cancellation', async () => {
  const contract = prose(await text(CONTRACT));

  for (const state of ['pending', 'in_progress', 'completed', 'awaiting_user', 'blocked', 'paused', 'cancelled']) {
    assert.match(contract, new RegExp(`\\b${state}\\b`), `missing ${state}`);
  }
  assert.match(contract, /awaiting_user.*exact user input.*next action/i);
  assert.match(contract, /blocked.*known reason.*supporting evidence.*clearing action/i);
  assert.match(contract, /successful tool call.*not completion evidence/i);
  assert.match(contract, /completed.*only tasks.*completed/i);
  assert.match(contract, /remaining`? includes every task that is not `?completed`? or `?cancelled`?/i);
  assert.match(contract, /awaiting_user.*blocked.*paused/i);
  assert.match(contract, /cancelled.*separate.*never.*completed/i);
  assert.match(contract, /counts belong only to the selected checklist/i);
  assert.match(contract, /history is not merged into a new checklist's active count/i);
});

test('pause, replacement, and reopening preserve the required state boundaries', async () => {
  const contract = prose(await text(CONTRACT));

  assert.match(contract, /If the current task is already `awaiting_user` or `blocked`/i);
  assert.match(contract, /do \*\*not\*\* overwrite that task status with `paused`/i);
  assert.match(contract, /preserve.*approval request.*blocker reason.*clearing action/i);
  assert.match(contract, /side question.*must not advance paused work/i);
  assert.match(contract, /old checklist.*replaced.*retain.*checklist ID.*task IDs.*completed result summaries.*unresolved states/i);
  assert.match(contract, /distinct IDs.*never transfer old unresolved tasks.*new checklist.*counts/i);
  assert.match(contract, /reopening requires.*explicit request|verified revision.*invalidation/i);
  assert.match(contract, /previously `?completed`?.*`?active`?/i);
  assert.match(contract, /set `currentTaskId` to the next actionable affected task/i);
  assert.match(contract, /recalculate.*completed.*cancelled.*remaining/i);
  assert.match(contract, /affected dependent review.*export.*verification/i);
});

test('router must read the actual session-progress contract before checklist decisions', async () => {
  const router = prose(await text(ROUTER));

  assert.match(router, /first read the complete portable.*session progress contract/i);
  assert.match(router, /before evaluating activation.*creating.*mutating.*resuming.*replacing.*reopening/i);
  assert.match(router, /link.*filename.*remembered summary.*earlier router load.*not a contract read/i);
  assert.match(router, /cannot be read.*do not claim checklist-contract conformance/i);
  assert.match(router, /read_file\(path\).*Session Checklist contract/i);
});

test('Loaded skills and checklist visibility do not overstate execution, approval, or verification', async () => {
  const contract = prose(await text(CONTRACT));
  const router = prose(await text(ROUTER));

  assert.match(contract, /Loaded skills.*actually been loaded/i);
  assert.match(contract, /does not prove.*running or completed|not.*running.*completed/i);
  assert.match(contract, /checklist is not approval|never counts as approval/i);
  assert.match(router, /Loaded skills/i);
  assert.match(router, /visibility.*never.*approval|not.*approval/i);
});

test('portable contract keeps session progress non-persistent and preserves durable tracking boundaries', async () => {
  const contract = await text(CONTRACT);
  const tracking = prose(await text(TRACKING));
  const continuity = prose(await text(CONTINUITY));

  assert.doesNotMatch(contract, /TodoWrite|agent\.prompt\.inject|plugin_pi_|\bmcp_/i);
  assert.match(contract, /Do not create.*progress\.md|no file.*database.*durable progress/i);
  assert.match(tracking, /Session Checklist.*transient|non-persistent execution view/i);
  assert.match(tracking, /no file.*database.*durable progress|third.*tracker/i);
  assert.match(continuity, /Session Checklist.*scoped to that request/i);
  assert.match(continuity, /side question preserves/i);
  assert.match(continuity, /replacement closes/i);
});

test('manual campaign is a pending multi-turn behavioral protocol, not claimed evidence', async () => {
  const campaign = await text(CAMPAIGN);
  const blocks = campaignBlocks(campaign);

  const campaignIgnored = spawnSync('git', ['-C', ROOT, 'check-ignore', '-q', '--', CAMPAIGN], {
    encoding: 'utf8',
    windowsHide: true,
  });
  assert.equal(campaignIgnored.status, 1, 'manual campaign must be committable');

  assert.match(campaign, /Structural PASS is not Behavioral PASS/i);
  assert.match(campaign, /Behavioral acceptance:\s*PENDING Phase 2 native multi-turn campaign/i);
  assert.match(campaign, /Send only the current turn.*Wait until the assistant finishes/i);
  assert.match(campaign, /fresh supported chat-host conversation/i);
  assert.match(campaign, /runner starts one prompt in a fresh conversation/i);
  assert.match(campaign, /cannot submit follow-up user turns/i);
  assert.doesNotMatch(campaign, /10\/10.*Behavioral PASS|all 10.*Behavioral PASS/i);

  const statuses = [];
  for (const [caseId, block] of blocks) {
    let previous = -1;
    for (const heading of REQUIRED_CASE_SECTIONS) {
      const match = block.match(new RegExp(`^### ${heading}\\r?$`, 'm'));
      assert.ok(match, `${caseId}: missing ${heading}`);
      assert.ok(match.index > previous, `${caseId}: ${heading} is out of order`);
      previous = match.index;
    }
    const status = block.match(/current value:\s*`([A-Z]+)`/i)?.[1];
    assert.ok(status, `${caseId}: missing current status`);
    assert.equal(ALLOWED_STATUS.has(status), true, `${caseId}: invalid status ${status}`);
    statuses.push([caseId, status, block]);
  }

  const passes = statuses.filter(([, status]) => status === 'PASS');
  if (passes.length === 0) {
    assert.ok(statuses.every(([, status]) => status === 'PENDING'),
      'unattempted campaign must keep every case PENDING');
    assert.match(campaign, /Current filled status for all 10 cases: `PENDING`/);
  } else {
    for (const [caseId, , block] of passes) await assertRetainedEvidence(caseId, block);
  }
});

test('manual campaign covers the reported lifecycle acceptance gaps', async () => {
  const campaign = prose(await text(CAMPAIGN));

  for (const marker of [
    /SCL01.*Lean negative controls/i,
    /SCL02.*Automatic creation and response-boundary rendering/i,
    /SCL03.*Approval waiting, side question, hide\/show/i,
    /SCL04.*Blocker and recovery action/i,
    /SCL05.*Dependency gating and actionable current task/i,
    /SCL06.*Pause and resume preserve waiting\/blocker state/i,
    /SCL07.*Replacement preserves history and isolates counters/i,
    /SCL08.*Explicit reopening reactivates only affected work/i,
    /SCL09.*Cancellation and completion boundaries/i,
    /SCL10.*Conservative reconstruction after context loss/i,
  ]) assert.match(campaign, marker);

  assert.match(campaign, /specific approval request.*next action/i);
  assert.match(campaign, /blocker names.*missing measurement.*clear/i);
  assert.match(campaign, /status.*`awaiting_user`.*or.*`blocked`.*preserve/i);
  assert.match(campaign, /approval request\/blocker reason.*clearing action/i);
  assert.match(campaign, /old report completed.*cancelled.*unresolved.*new checklist/i);
  assert.match(campaign, /previously completed checklist becomes active/i);
  assert.match(campaign, /not.*cross-session persistence/i);
});
