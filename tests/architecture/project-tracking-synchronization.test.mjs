import test from 'node:test';
import assert from 'node:assert/strict';
import { exists, readUtf8 } from './helpers.mjs';

// These checks guard the shared tracking contract.  They inspect instruction
// text and synthetic state pairs only; they do not claim that a host performs
// live synchronization or background monitoring.

const TRACKING = 'references/work-tracking.md';
const CONTINUITY = 'references/workflow-continuity.md';
const GROUNDING = 'references/project-grounding.md';

async function text(file) {
  assert.equal(await exists(file), true, `missing ${file}`);
  return readUtf8(file);
}

function prose(source) {
  return source.replace(/\s+/g, ' ');
}

function ordered(textValue, patterns, label) {
  let previous = -1;
  for (const pattern of patterns) {
    const match = textValue.match(pattern);
    assert.ok(match, `${label}: missing ${pattern}`);
    const at = match.index;
    assert.ok(at > previous, `${label}: ${pattern} is out of order`);
    previous = at;
  }
}

test('tracking has a canonical two-record boundary and distinct ownership', async () => {
  const source = await text(TRACKING);
  assert.match(source, /(?:canonical )?two[- ]record model|at most two management (?:Markdown )?(?:files|records)/i);
  assert.match(source, /work-plan\.md[\s\S]{0,500}(?:whole[- ]report|progress|outline)/i);
  assert.match(source, /project-context\.md[\s\S]{0,500}(?:project identity|project evidence|observed)/i);
  assert.match(source, /(?:do not|never) (?:create|maintain)(?: or (?:create|maintain))*[\s\S]{0,40}(?:third|extra|parallel).*tracker/i);
  assert.match(source, /(?:report|work)[\s-]+plan.*(?:must not|does not become).*project|project[- ]context.*(?:must not|does not become).*progress/i);
});

test('record placement and reuse are explicit and do not duplicate context', async () => {
  const source = await text(TRACKING);
  assert.match(source, /dedicated common project (?:directory|folder)/i);
  assert.match(source, /(?:context(?:_file)?|project[- ]context).*?(?:report workspace|authorized output|source project placement|placement decision)/i);
  assert.match(source, /reuse (?:the )?(?:adopted|designated|existing).*context|designated context.*reuse/i);
  assert.match(source, /(?:do not|never) (?:create|keep|maintain).*duplicate.*context/i);
  assert.match(source, /without (?:a )?concrete project[\s\S]{0,180}(?:only.*work[- ]plan|do not create.*context)/i);
  const grounding = prose(await text(GROUNDING));
  assert.match(grounding, /new.*context.*report workspace|report workspace.*new.*context/i);
  assert.match(grounding, /existing.*adopted.*context.*source project|source project.*existing.*adopted.*context/i);
  assert.match(grounding, /explicit(?:ly)? authorized.*source project|source project.*explicit(?:ly)? authorized/i);
  assert.match(grounding, /must not.*choose.*new.*path.*inside.*source project|do not.*choose.*new.*path.*inside.*source project/i);
  assert.doesNotMatch(grounding, /Survey authority (?:permits|includes) creating or updating.{0,100}inside the (?:supplied|source) project/i);
  const tools = prose(await text('adapters/pi/tools.md'));
  assert.match(tools, /project-survey\.mjs.*disposable.*fixture/i);
  assert.match(tools, /source-project path explicitly authorized for that exact write/i);
});

test('governance names work-plan as the only progress record and capability guidance matches executable survey behavior', async () => {
  for (const file of ['AGENTS.md', 'adapters/pi/bootstrap.md', TRACKING]) {
    const source = await text(file);
    assert.doesNotMatch(source, /tracking (?:markdown )?files? \(`work-plan\.md`, `progress\.md`\)/i, `${file}: progress.md remains as a canonical tracker`);
  }
  const capabilities = prose(await text('adapters/pi/capabilities.md'));
  assert.match(capabilities, /read-only.*default|default.*read-only/i);
  assert.match(capabilities, /authorized report workspace/i);
  assert.match(capabilities, /adopted.*editor.*handoff|editor.*handoff.*adopted/i);
  assert.match(capabilities, /conflict.*before every write|before every write.*conflict/i);
  assert.match(capabilities, /partial[- ]save.*recovery|recovery.*partial[- ]save/i);
  const template = await text('templates/work-plan.md');
  assert.match(template, /context_file:/i);
  assert.match(template, /placement_authority:/i);
});

test('work-plan has one authoritative orientation and item-progress register', async () => {
  const source = await text('templates/work-plan.md');
  const headingCount = heading => (source.match(new RegExp(`^##\\s+${heading}$`, 'gmi')) || []).length;
  assert.equal(headingCount('Where We Are / Resume Here'), 1);
  assert.equal(headingCount('Resume Here'), 0);
  assert.equal(headingCount('Outline / Work Items'), 0);
  assert.equal(headingCount('Whole-Report Outline and Progress'), 1);
  assert.match(source, /Where We Are \/ Resume Here[\s\S]*Completion condition[\s\S]*Read next/i);
  const items = source.split('## Whole-Report Outline and Progress')[1].split('\n## ')[0];
  for (const field of ['Progress', 'Evidence readiness', 'Content locator', 'Remaining work / dependencies', 'Approval references', 'Verification references']) {
    assert.ok(items.includes(field), `missing item field: ${field}`);
  }
  assert.equal((source.match(/^- Next action:/gm) || []).length, 1, 'one editable next-action checkpoint');
  assert.equal((source.match(/^- Progress:/gm) || []).length, 1, 'one repeatable item-progress block');
  for (const line of source.split(/\r?\n/).filter(line => line.startsWith('|'))) {
    assert.ok(line.split('|').length - 2 <= 6, 'template tables must remain readable');
  }
  assert.match(prose(await text(TRACKING)), /one authoritative orientation\/checkpoint/i);
});

test('the work-plan template leads with readable orientation and whole-report progress', async () => {
  const source = await text('templates/work-plan.md');
  ordered(source, [
    /^##\s+(?:Where We Are|Current Position)/im,
    /^##\s+(?:What This Work Must Deliver|Deliverable and Scope)/im,
    /^##\s+(?:Whole[- ]Report Outline and Progress|Outline and Progress)/im,
    /^##\s+(?:Completed(?:-Content)? Summaries|Completed Work)/im,
    /^##\s+(?:Upcoming Work and Dependencies|Upcoming Work)/im,
    /^##\s+(?:Recent Changes and Unresolved Decisions|Recent Changes)/im,
  ], 'work-plan readable order');
  assert.match(source, /current (?:section|position|target)[\s\S]{0,250}(?:next action|blocker)/i);
  assert.match(source, /whole[- ]report.*(?:outline|progress)/i);
});

test('progress, readiness, approval and verification remain separate states', async () => {
  const source = await text(TRACKING);
  assert.match(source, /progress and readiness (?:must remain|are) separate|keep .*progress.*readiness separate/i);
  assert.match(source, /approved.*(?:incomplete|evidence gap|verification limit)[\s\S]{0,180}(?:not|cannot).*?(?:complete|ready)/i);
  assert.match(source, /approval.*(?:version|scope)[\s\S]{0,180}(?:verification|check)/i);

  const complete = { progress: 'approved', readiness: 'ready', verification: 'passed' };
  const approvedGap = { progress: 'approved', readiness: 'evidence_gap', verification: 'pending' };
  const isComplete = (item) => item.progress === 'approved'
    && item.readiness === 'ready' && item.verification === 'passed';
  assert.equal(isComplete(complete), true, 'positive state should be complete');
  assert.equal(isComplete(approvedGap), false, 'approval with an evidence gap is incomplete');
});

test('stable item identity survives heading changes and locator migration', async () => {
  const source = await text(TRACKING);
  assert.match(source, /stable item identit(?:y|ies)/i);
  assert.match(source, /rename|reorder|merge|split/i);
  assert.match(source, /mapping from old (?:items|locations) to new (?:items|locations|locators)|old-to-new (?:item\/locator|item).*mapping|stable .*locator/i);
  assert.match(source, /criterion (?:ID|mapping)[\s\S]{0,120}(?:preserve|stable|authoritative)/i);
});

test('approval is scoped to a revision and reopening preserves the prior approval', async () => {
  const source = await text(TRACKING);
  assert.match(source, /approval refers to the identified (?:version|revision) and scope/i);
  assert.match(source, /approval is (?:revision[- ]scoped|scope[- ]scoped)|(?:revision[- ]scoped|scope[- ]scoped) approval/i);
  assert.match(source, /reopen(?:ed|ing).*?(?:section|item).*?(?:old|previous).*approval|preserve.*previous.*approval.*(?:revision|version)/i);
  assert.match(source, /newly (?:saved|verified).*does not replace.*approved/i);
});

test('prompt intent distinguishes discussion from adoption and authorization', async () => {
  const source = await text(CONTINUITY);
  for (const intent of ['question', 'comparison', 'brainstorming', 'hypothetical', 'decision',
    'revision', 'order', 'new file', 'approval', 'praise', 'cancellation', 'unrelated']) {
    assert.match(source, new RegExp(intent, 'i'), `missing intent: ${intent}`);
  }
  assert.match(source, /recommendation (?:is|does not become|is not).*adopt|recommend.*(?:not|does not).*approval/i);
  assert.match(source, /praise.*(?:not|does not).*?(?:approval|instruction|decision)/i);
  assert.match(source, /change of order.*(?:next task|overall outline|approved structure)/i);

  const effects = {
    question: false,
    comparison: false,
    brainstorming: false,
    hypothetical: false,
    decision: true,
    revision: true,
    approval: true,
    praise: false,
  };
  assert.equal(effects.question, false);
  assert.equal(effects.brainstorming, false);
  assert.equal(effects.decision, true);
  assert.equal(effects.praise, false);
});

test('synchronization propagates only to affected items and dependencies', async () => {
  const source = await text(CONTINUITY);
  assert.match(source, /propagat(?:e|ion).*only.*affected|affected.*(?:items|dependencies).*propagat/i);
  assert.match(source, /(?:do not|never).*rewrite.*unrelated|unrelated.*(?:remain|stay).*unchanged/i);
  assert.match(source, /change.*(?:origin|source).*?(?:report|outline|project).*?(?:effect|impact)/i);
  assert.match(source, /pending decision blocks only its dependent action/i);
});

test('external changes are detected only through bounded inspection', async () => {
  const source = await text(GROUNDING);
  assert.match(source, /detect(?:s|ing)? external changes.*(?:access|inspect)|external changes.*(?:when|if).*accessible/i);
  assert.match(source, /(?:no|not|does not provide)[\s\S]{0,30}(?:continuous|background|between[- ]turn) monitoring/i);
  assert.match(source, /commit.*(?:alone|identifier).*does not.*(?:identify|prove).*uncommitted|uncommitted.*(?:changes|differences)/i);
  assert.match(source, /record.*(?:last checked|inspection).*?(?:revision|coverage)/i);
});

test('single-writer checkpoints reconcile concurrent edits and interrupted saves', async () => {
  const source = await text(TRACKING);
  assert.match(source, /(?:sole|single) persistent\s+writer/i);
  assert.match(source, /concurrent.*(?:change|write).*reconcil|reconcil.*concurrent/i);
  assert.match(source, /artifact saving succeeds.*plan updating fails|split result/i);
  assert.match(source, /recoverable sequence|interrupted update|saved and unsaved parts/i);
  assert.match(source, /do not (?:generate|create).*third.*(?:tracker|recovery)/i);
});

test('checkpoint transactions include affected context before the plan and verify every touched record', async () => {
  const source = prose((await text(TRACKING)).split('## Checkpoint transaction and handoff')[1]);
  ordered(source, [/2\. Save.*deliverable/i, /3\. Update.*context/i, /4\. Update.*plan/i, /5\. Re-read every.*record/i], 'checkpoint save order');
  assert.match(source, /before each write.*(?:revision|concurrent)/i);
  assert.match(source, /context.*(?:absent|unaffected).*skip|(?:absent|unaffected).*context.*skip/i);
  assert.match(source, /do not create.*context.*transaction/i);
  assert.match(source, /same change.*source\/output revision/i);
  assert.match(source, /context.*(?:save|updat).*fails.*(?:partial|split|unsaved)/i);
  assert.match(source, /context.*(?:save|updat).*succeed.*plan.*fails/i);
  for (const file of ['skills/editing-documents/SKILL.md', 'skills/verifying-artifacts/SKILL.md', 'agents/verifier.md']) {
    assert.match(prose(await text(file)), /affected.*context.*(?:reopen|re-read|recheck)|(?:reopen|re-read|recheck).*affected.*context/i, `${file}: context readback missing`);
  }
});

test('project grounding labels provenance, readiness and survey boundaries', async () => {
  const source = await text(GROUNDING);
  for (const marker of [
    /planned|intended/i,
    /user[- ](?:provided|described|statement)/i,
    /source[- ]inspected|inspected source/i,
    /runtime[- ]observed|observed runtime/i,
    /tested|test evidence/i,
    /unknown|unverified|evidence gap/i,
  ]) assert.match(source, marker, `missing provenance state ${marker}`);
  assert.match(source, /readiness.*(?:ready|gap|blocked|unknown)/i);
  assert.match(source, /survey[\s\S]{0,300}(?:does\s+\*\*not\*\* permit|does not permit|does not allow)[\s\S]{0,100}(?:changes to )?(?:code|configuration|schema|Git state|data)/i);
});

test('lifecycle consumers and PI routing expose the shared handoff without claiming native monitoring', async () => {
  const consumers = [
    'skills/using-workspace-superpowers/SKILL.md',
    'skills/scoping-the-brief/SKILL.md',
    'skills/reading-artifacts/SKILL.md',
    'skills/analyzing-artifacts/SKILL.md',
    'skills/planning-work/SKILL.md',
    'skills/editing-documents/SKILL.md',
    'skills/reviewing-work/SKILL.md',
    'skills/verifying-artifacts/SKILL.md',
  ];
  for (const file of consumers) {
    const source = await text(file);
    assert.match(source, /work-tracking\.md/i, `${file}: missing tracking handoff`);
    assert.match(source, /workflow-continuity\.md/i, `${file}: missing continuity handoff`);
  }
  const router = await text('skills/using-workspace-superpowers/SKILL.md');
  assert.match(router, /checkpoint rules/i);
  const tracking = await text(TRACKING);
  assert.match(tracking, /external write/i);
  assert.match(tracking, /One writer owns each checkpoint/i);
  assert.match(tracking, /recoverable sequence for interrupted updates/i);
  const trial = await text('adapters/pi/routing-trial.md');
  assert.match(trial, /SYNC-0?1|project-tracking-synchronization|tracking synchronization/i);
  assert.match(trial, /PENDING|not (?:executed|verified)/i);
});
