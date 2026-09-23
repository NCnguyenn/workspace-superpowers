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
