import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Instruction contracts, not proof of a model's live Pi tool use.
test('router requires actual tool execution for each criteria stage', async () => {
  const router = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  const modes = new Map([...router.matchAll(/^\| `(analyze|outline|draft|revise)` \| (.+) \|$/gm)]
    .map((match) => [match[1], match[2]]));
  for (const [mode, skill] of [['analyze', 'scoping-the-brief'], ['outline', 'planning-work'],
    ['draft', 'drafting-prose']]) {
    assert.ok(modes.get(mode)?.includes(`invoke_skill("${skill}")`), `${mode}: actual invocation required`);
    assert.match(modes.get(mode), /MUST/);
  }
  assert.match(router, /FORBIDDEN:.*NEVER draft section prose/);
  assert.match(router, /actual tool call/i);
  assert.match(router, /every stage transition/i);
  assert.match(router, /does NOT authorize writing prose directly/);
  assert.match(router, /before delivering/i);
});

test('drafting loads the style guide and specialist, then reviews before chat delivery', async () => {
  const drafting = await readUtf8('skills/drafting-prose/SKILL.md');
  assert.match(drafting, /MUST.*read_file.*academic-writing-style\.md/);
  assert.match(drafting, /MUST.*invoke_skill/);
  for (const rule of ['S1', 'F1', 'R4']) assert.ok(drafting.includes(rule), rule);
  const procedure = drafting.split('## Procedure')[1].split('\n## ')[0];
  const review = procedure.indexOf('invoke_skill("reviewing-work")');
  const delivery = procedure.indexOf('Output the complete drafted text');
  assert.ok(review >= 0 && delivery > review, 'review must precede delivery');
  assert.match(procedure, /recheck/i);
  assert.doesNotMatch(drafting, /If a specialist cannot be loaded, apply its rules/);
});

test('review fallback requires loading prose and coherence role instructions', async () => {
  const review = await readUtf8('skills/reviewing-work/SKILL.md');
  assert.match(review, /read_file.*agents\/reviewer-prose\.md/);
  assert.match(review, /read_file.*agents\/reviewer-coherence\.md/);
  assert.match(review, /before.*deliver/i);
});

test('downstream report and Pi mapping instructions preserve stage calls and review order', async () => {
  const reports = await readUtf8('skills/writing-reports/SKILL.md');
  const handoff = reports.split('## Procedure')[1].split('\n## ')[0];
  assert.match(handoff, /before.*deliver/i);
  assert.doesNotMatch(handoff, /Deliver complete drafted section text.*Return the section/);
  const mapping = await readUtf8('adapters/pi/tools.md');
  const invocation = mapping.split(/\r?\n/).find((line) => line.startsWith('| `invoke_skill(name)`'));
  assert.match(invocation, /MUST.*every stage transition/);
  assert.doesNotMatch(invocation, /Reuse an already loaded applicable skill/);
});
