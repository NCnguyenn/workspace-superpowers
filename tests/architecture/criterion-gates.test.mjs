import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Structural guards only. Live multi-turn acceptance is recorded separately.
test('criterion contract separates analysis approval from detailed outline approval', async () => {
  const text = await readUtf8('references/criteria-writing-contract.md');
  assert.match(text, /## Criterion-level analysis and two stops/);
  assert.match(text, /master outline/i);
  assert.match(text, /Do not include the detailed outline in the analysis-approval response/);
  assert.match(text, /source instructions.*not.*user approval/i);
  for (const verb of ['describe', 'explain', 'compare', 'analyze', 'evaluate', 'critically']) {
    assert.ok(text.toLowerCase().includes(verb), `Missing command-verb guidance: ${verb}`);
  }
});

test('every authoring entry point checks criterion-specific gate coverage', async () => {
  for (const name of ['using-workspace-superpowers', 'scoping-the-brief', 'planning-work', 'drafting-prose']) {
    const text = await readUtf8(`skills/${name}/SKILL.md`);
    assert.match(text, /criterion-level analysis and two stops/i, name);
  }
  const brief = await readUtf8('templates/brief.md');
  assert.match(brief, /Command Verbs and Required Depth/);
  assert.match(brief, /Analysis Version/);
  const outline = await readUtf8('templates/outline.md');
  assert.match(outline, /master outline/i);
});

test('guided questions are discoverable at both gates and mapped in Pi', async () => {
  for (const name of ['scoping-the-brief', 'planning-work']) {
    assert.match(await readUtf8(`skills/${name}/SKILL.md`), /guided-questions\.md/);
  }
  const guide = await readUtf8('references/guided-questions.md');
  assert.match(guide, /one decision at a time/i);
  assert.match(guide, /preselected.*not.*approval/i);
  assert.match(guide, /unavailable/i);
  assert.match(await readUtf8('adapters/pi/tools.md'), /structured question/i);
  assert.match(await readUtf8('adapters/pi/bootstrap.md'), /analysis.*approval/i);
});

test('prose contract rejects list-shaped reasoning without banning useful lists', async () => {
  const style = await readUtf8('references/academic-writing-style.md');
  assert.match(style, /L6/);
  assert.match(style, /paragraphs by default/i);
  assert.match(style, /no.*(?:percentage|quota)/i);
  assert.match(await readUtf8('agents/reviewer-prose.md'), /L6/);
  assert.match(await readUtf8('skills/writing-reports/SKILL.md'), /paragraphs by default/i);
});

test('Pi includes a natural multi-turn criterion regression trial', async () => {
  const text = await readUtf8('adapters/pi/criterion-trial.md');
  for (const marker of ['Master outline', 'Analysis approval', 'Outline approval', 'Unrelated reply', 'Explicit waiver', 'Source instructions', 'Question UI']) {
    assert.ok(text.includes(marker), `Missing trial: ${marker}`);
  }
  assert.match(text, /PENDING/);
});

test('Pi question examples match the inspected asktool schema and separate decisions', async () => {
  const text = await readUtf8('adapters/pi/tools.md');
  assert.match(text, /`asktool`/);
  const examples = [...text.matchAll(/```json\s*([\s\S]*?)```/g)].map((m) => JSON.parse(m[1]));
  assert.equal(examples.length, 2, 'one example for each separate gate');
  for (const example of examples) {
    assert.equal(example.questions.length, 1);
    const question = example.questions[0];
    assert.equal(typeof question.question, 'string');
    assert.equal(question.multiSelect, false);
    assert.ok(question.options.length >= 2);
    assert.ok(question.options.every((option) => typeof option === 'string' && option.trim()));
    assert.equal(new Set(question.options).size, question.options.length);
    assert.ok(question.options.every((option) => !/other|another answer/i.test(option)));
  }
  assert.match(examples[0].questions[0].question, /analysis/i);
  assert.match(examples[1].questions[0].question, /outline/i);
  assert.match(text, /Skip.*Decline all.*not.*approval/i);
  assert.match(await readUtf8('adapters/pi/bootstrap.md'), /`asktool`/);
});

test('available structured questions must be invoked rather than imitated in prose', async () => {
  const guide = await readUtf8('references/guided-questions.md');
  assert.match(guide, /invoke it/i);
  assert.match(guide, /Writing choices in prose.*not.*substitute/i);
});
