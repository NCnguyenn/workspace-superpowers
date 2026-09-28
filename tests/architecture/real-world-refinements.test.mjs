import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Structural guards for the runtime audit; these do not prove live PI behavior.
test('evidence interviews are conditional on the current requirement, not every section', async () => {
  for (const file of ['references/criteria-writing-contract.md', 'skills/scoping-the-brief/SKILL.md', 'adapters/pi/bootstrap.md']) {
    const text = await readUtf8(file);
    assert.match(text, /not a mandatory interview for every section/i, file);
    assert.match(text, /later section/i, file);
    assert.match(text, /theoretical[\s\S]*not_required/i, file);
  }
});

test('missing scenario metrics require an interview before completed analysis', async () => {
  for (const file of ['references/criteria-writing-contract.md', 'skills/scoping-the-brief/SKILL.md']) {
    const text = await readUtf8(file);
    assert.match(text, /before (?:finalizing|presenting) the requirement analysis/i, file);
    assert.match(text, /real data[\s\S]*illustrative/i, file);
    assert.match(text, /preselected[\s\S]*pending/i, file);
    assert.match(text, /not.*(?:standard|benchmark).*BTEC|not.*BTEC.*(?:standard|benchmark)/i, file);
    assert.match(text, /gap diagnosis and targeted questions, not a completed analysis for approval/i, file);
  }
});

test('academic prose requires PEEL development and a scoped prose floor', async () => {
  const text = await readUtf8('references/academic-writing-style.md');
  assert.match(text, /PEEL/);
  assert.match(text, /4[–-]5 sentences/);
  assert.match(text, /65%/);
  assert.match(text, /denominator/i);
  assert.match(text, /adjacent subsections/i);
  assert.match(text, /em.dash/i);
  assert.doesNotMatch(text, /There is no list percentage/);
  const specialist = await readUtf8('skills/writing-academic-prose/SKILL.md');
  for (const marker of ['PEEL', '65%', 'citing-sources']) assert.ok(specialist.includes(marker), marker);
  const reviewer = await readUtf8('agents/reviewer-prose.md');
  assert.match(reviewer, /65%/);
  assert.doesNotMatch(reviewer, /or impose a list quota/);
});

test('citation completion triggers for existing citations and covers each delivery surface', async () => {
  const citations = await readUtf8('skills/citing-sources/SKILL.md');
  assert.match(citations, /already contains formal citations/i);
  assert.match(citations, /## References/);
  assert.match(citations, /chat[\s\S]*saved/i);
  assert.match(citations, /narrative[\s\S]*corporate[\s\S]*numeric/i);
  assert.match(citations, /metadata/i);
  assert.match(citations, /cumulative/i);
  const drafting = await readUtf8('skills/drafting-prose/SKILL.md');
  assert.match(drafting, /invoke_skill\("citing-sources"\)/);
  assert.match(drafting, /## References/);
  assert.match(drafting, /65%/);
  const router = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  assert.match(router, /citing-sources[^\n]*citations already present/i);
  assert.doesNotMatch(router, /researching-sources` and `citing-sources` only when the user explicitly requests/);
});

test('PI refreshable instructions carry evidence interview and draft checks', async () => {
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  const managed = bootstrap.match(/<!-- workspace-superpowers:skill-invocation:begin -->([\s\S]*?)<!-- workspace-superpowers:skill-invocation:end -->/)[1];
  for (const marker of ['asktool', 'PEEL', '65%', '## References', 'local.workspace-superpowers/citing-sources']) {
    assert.ok(managed.includes(marker), `refreshable contract missing ${marker}`);
  }
  assert.match(managed, /before (?:finalizing|presenting) the requirement analysis/i);
  assert.match(managed, /unavailable[\s\S]*chat/i);
});

 test('a supplied graded brief is mapped before any setup interview', async () => {
   const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
   const routing = bootstrap.match(/<!-- workspace-superpowers:routing:begin -->([\s\S]*?)<!-- workspace-superpowers:routing:end -->/)[1];
   assert.match(routing, /intake map/i);
   assert.match(routing, /reading-artifacts/);
   assert.match(routing, /analyzing-artifacts/);
   assert.match(routing, /glance table is not a complete read/i);
   assert.match(routing, /Do not ask grade target/i);
   assert.match(routing, /does not skip this supplied file/i);
   const scoping = await readUtf8('skills/scoping-the-brief/SKILL.md');
   assert.match(scoping, /intake map/i);
   assert.doesNotMatch(scoping, /Interview the user in chat to confirm project title, core problem statement/);
   const tracking = await readUtf8('references/work-tracking.md');
   assert.match(tracking, /intake map comes first/i);
 });

test('a new message selects its own skill instead of resuming the last workflow', async () => {
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  const routing = bootstrap.match(/<!-- workspace-superpowers:routing:begin -->([\s\S]*?)<!-- workspace-superpowers:routing:end -->/)[1];
  assert.match(routing, /Match this message, then call that skill/);
  assert.match(routing, /Do not start the writing pipeline/);
  assert.match(routing, /side question/i);
  const invocation = bootstrap.match(/<!-- workspace-superpowers:skill-invocation:begin -->([\s\S]*?)<!-- workspace-superpowers:skill-invocation:end -->/)[1];
  assert.match(invocation, /not a sequence to start/);
  const router = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  assert.match(router, /current message selects the operation/i);
  assert.match(router, /do not start the writing pipeline/i);
});

test('a one-percent skill match must be called before acting', async () => {
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  const routing = bootstrap.match(/<!-- workspace-superpowers:routing:begin -->([\s\S]*?)<!-- workspace-superpowers:routing:end -->/)[1];
  assert.match(routing, /1% chance/);
  assert.match(routing, /before any response, question, or file action/);
  assert.match(routing, /need not name the skill/);
  assert.match(routing, /remembered summary is not a call/i);
  const router = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  assert.match(router, /1% chance a skill might apply/);
  assert.match(router, /do not have a choice/i);
  assert.match(router, /I already know this skill/);
  const description = router.match(/^description: (.+)$/m)[1];
  assert.match(description, /before any response/i);
  assert.ok(description.length <= 240, `description length ${description.length}`);
});

test('an opening question about a supplied guide is an intake map, not simple Q&A', async () => {
  for (const file of ['adapters/pi/bootstrap.md', 'skills/using-workspace-superpowers/SKILL.md', 'skills/analyzing-artifacts/SKILL.md', 'skills/scoping-the-brief/SKILL.md']) {
    const text = await readUtf8(file);
    assert.match(text, /not Simple Q&A/i, file);
    assert.match(text, /not a narrower operation/i, file);
    assert.match(text, /parts, criteria, or structure/i, file);
  }
});

test('document brainstorming is wired and does not design software', async () => {
  const skill = await readUtf8('skills/brainstorming/SKILL.md');
  assert.match(skill, /not a software-design skill/i);
  assert.match(skill, /2–3/);
  assert.match(skill, /recommend one/i);
  assert.match(skill, /user chooses/i);
  for (const name of ['using-workspace-superpowers', 'scoping-the-brief', 'analyzing-artifacts', 'planning-work']) {
    assert.match(await readUtf8(`skills/${name}/SKILL.md`), /brainstorming/, name);
  }
});

test('manual acceptance keeps chat analysis language separate from deliverable language', async () => {
  const protocol = await readUtf8('tests/scenarios/manual/criteria-writing.md');
  assert.match(protocol, /requirement analysis shown in chat follows the language of the user's current\s+message/i);
  assert.match(protocol, /outlines, drafts, tables, figure labels, and placeholders[\s\S]{0,120}English/i);
  assert.doesNotMatch(protocol, /Authored analysis, outlines, drafts[^\n]*default to \*\*English\*\*/i);
  assert.doesNotMatch(protocol, /Authored analysis is English/i);
});

test('native PI trial targets the brainstorming release and defines its multi-turn acceptance', async () => {
  const routing = await readUtf8('adapters/pi/routing-trial.md');
  assert.match(routing, /Target: Workspace Superpowers 0\.1\.5-beta/);
  assert.match(routing, /actual skill catalog[\s\S]*tested package manifest/i);
  for (const caseName of [
    'R15 Brainstorming after sufficient evidence',
    'R16 Brainstorming correction and return',
    'R17 Settled approach skips brainstorming',
    'R18 Completed assignment read-back',
    'R19 Remaining criteria comparison',
  ]) assert.match(routing, new RegExp(caseName, 'i'));

  const refinement = await readUtf8('tests/scenarios/manual/real-world-refinements.md');
  for (const caseName of ['BR01', 'BR02', 'BR03', 'RB01', 'RB02']) {
    assert.match(refinement, new RegExp(`\\b${caseName}\\b`));
  }
  assert.match(refinement, /recommendation is not a selection/i);
  assert.match(refinement, /return to (?:the )?(?:calling|responsible) skill/i);
  assert.match(refinement, /completed assignment read-back/i);
  assert.match(refinement, /remaining criteria comparison/i);
});

test('23 September issue record has an evidence-bounded closure approval', async () => {
  const issue = await readUtf8('test-issues/2026-09-23-ghi-nhan-van-de.md');
  assert.match(issue, /Closure review[^\n]*APPROVED/i);
  assert.match(issue, /source and package/i);
  assert.match(issue, /Back control[^\n]*(?:host|limitation)/i);
  assert.match(issue, /native PI[^\n]*PENDING/i);
  assert.match(issue, /brainstorming[^\n]*(?:wired|routing|integration)/i);
});

test('a delivered section stops for approval and does not invent citation details', async () => {
  const drafting = await readUtf8('skills/drafting-prose/SKILL.md');
  assert.match(drafting, /do not start the next section/i);
  assert.match(drafting, /approved/i);
  const citing = await readUtf8('skills/citing-sources/SKILL.md');
  assert.match(citing, /page numbers, publishers/i);
  assert.match(citing, /do not start the next section/i);
});

test('completed assignments use a read-back route instead of assignment intake', async () => {
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  const routing = bootstrap.match(/<!-- workspace-superpowers:routing:begin -->([\s\S]*?)<!-- workspace-superpowers:routing:end -->/)[1];
  assert.match(routing, /completed assignment[\s\S]*read-back/i);
  assert.match(routing, /reading-artifacts[\s\S]*analyzing-artifacts/i);
  assert.match(routing, /does not use the intake map/i);
  assert.ok(
    routing.indexOf('Completed assignment or report to read or remember')
      < routing.indexOf('Open or inspect a supplied file'),
    'specific completed-work route must precede generic file inspection',
  );

  for (const file of ['skills/using-workspace-superpowers/SKILL.md', 'skills/scoping-the-brief/SKILL.md']) {
    const text = await readUtf8(file);
    assert.match(text, /completed assignment[\s\S]*read-back/i, file);
    assert.match(text, /remaining criteria[\s\S]*narrow comparison/i, file);
  }
});

test('read-back and later-guide comparison contracts preserve source-grounded content', async () => {
  const reading = await readUtf8('skills/reading-artifacts/SKILL.md');
  assert.match(reading, /headings[\s\S]*arguments[\s\S]*conclusions/i);
  assert.match(reading, /scenario transitions|project thread/i);

  const analysis = await readUtf8('skills/analyzing-artifacts/SKILL.md');
  for (const marker of [
    'three blocks',
    'criteria already present',
    'criteria still missing',
    'Do not invent learning outcomes',
    'Do not normalize names or dates',
    'turn projected',
    'optional wording such as `you can`',
    'invented figures or failed test cases',
  ]) {
    assert.match(analysis, new RegExp(marker, 'i'), marker);
  }
  assert.match(analysis, /P7[\s\S]*(?:already|present)/i);
  assert.match(analysis, /use completion percentages/i);
  assert.match(analysis, /grading-grid cell as written content/i);

  const inspection = await readUtf8('skills/analyzing-artifacts/references/artifact-inspection.md');
  assert.match(inspection, /content reading[\s\S]*headings[\s\S]*arguments/i);
  assert.match(inspection, /style[\s\S]*only when the user asks/i);
});

test('24 September issue record records an evidence-bounded closure', async () => {
  const issue = await readUtf8('test-issues/2026-09-24-doc-bai-da-lam.md');
  assert.match(issue, /Closure review[^\n]*APPROVED/i);
  assert.match(issue, /source and package/i);
  assert.match(issue, /native PI[^\n]*PENDING/i);
  assert.match(issue, /P5[\s\S]*P6[\s\S]*M4[\s\S]*D2[\s\S]*P7/i);
  assert.match(issue, /M5[\s\S]*D3/i);
});
