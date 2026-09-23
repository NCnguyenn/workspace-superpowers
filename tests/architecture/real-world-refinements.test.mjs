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
