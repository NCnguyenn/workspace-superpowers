import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Static cross-contract regressions; these checks do not run an AI or a native host.
function between(text, start, end) {
  const begin = text.indexOf(start);
  assert.notEqual(begin, -1, `missing section: ${start}`);
  const finish = text.indexOf(end, begin + start.length);
  assert.notEqual(finish, -1, `missing section boundary: ${end}`);
  return text.slice(begin, finish);
}

test('drafting keeps authorized incomplete work distinct from evidence-ready work', async () => {
  const draft = await readUtf8('skills/drafting-prose/SKILL.md');
  const prerequisite = between(draft, '## Prerequisite check', '## Select the writing specialist');
  const pendingCases = prerequisite.split('\n').filter((line) => /^\|\s*`pending`\s*\|/.test(line));
  assert.equal(pendingCases.length, 2, 'pending evidence needs an authorized-draft case and a blocking case');
  const allowed = pendingCases.find((line) => /draft_incomplete/.test(line));
  assert.ok(allowed, 'authorized incomplete work must retain its delivery status');
  assert.match(allowed, /approved.*outline|outline.*approved/i);
  assert.match(allowed, /explicit.*incomplete|incomplete.*explicit/i);
  assert.match(allowed, /neutral.*placeholder/i);
  assert.ok(pendingCases.some((line) => /hold|block|return/i.test(line)), 'other pending work must remain blocked');
  assert.match(await readUtf8('references/criteria-writing-contract.md'), /already approved outline/);
});

test('the drafting-stage prerequisite preserves an explicit outline waiver', async () => {
  const contract = await readUtf8('references/criteria-writing-contract.md');
  const stage = between(contract, '**Third stage', '- **Strictly grounded');
  assert.match(stage, /outline.*(?:approved|approval)/i);
  assert.match(stage, /waiv/i, 'the first drafting instruction must preserve the waiver transition');
  assert.match(await readUtf8('AGENTS.md'), /outline decision \(or explicit waiver\)/);
});

test('an outline waiver survives composition, role handoffs, and catalog selection', async () => {
  const draft = await readUtf8('skills/drafting-prose/SKILL.md');
  const visuals = between(draft, '## Visuals, citations, and Word content', '## Required capabilities');
  assert.match(visuals, /waiv|not required/i, 'visual restrictions must distinguish applicable outlines from waived outlines');
  for (const file of ['agents/drafter.md', 'agents/reviewer-requirement.md']) {
    const role = await readUtf8(file);
    const procedure = between(role, '## Job', '## Hard Limits');
    assert.match(procedure, /(?:waiv|not required)[^.\n]*(?:brief|structure)|(?:brief|structure)[^.\n]*(?:waiv|not required)/i, file);
  }
  const catalog = await readUtf8('SKILLS.md');
  const entry = catalog.split('\n').find((line) => line.startsWith('| [`drafting-prose`]'));
  assert.ok(entry, 'drafting-prose must remain in the catalog');
  assert.match(entry, /waiv/i, 'catalog dispatch must not omit the authorized waiver route');
});

test('both writing specialists consume the same authorized structure as drafting-prose', async () => {
  for (const [name, nextSection] of [['writing-reports', '## Procedure'], ['writing-academic-prose', '## Core writing method']]) {
    const writer = await readUtf8(`skills/${name}/SKILL.md`);
    const input = between(writer, '## Inputs and output', nextSection);
    assert.match(input, /approved.*outline/i, name);
    assert.match(input, /waiv/i, `${name} must retain the explicit waiver route`);
    assert.match(input, /authorized brief.*structure/i, name);
    const completion = between(writer, '## Completion and fallback', '## Common mistakes');
    assert.doesNotMatch(completion, /only within the approved outline|stays within the approved outline/i, name);
    assert.match(completion, /draft_incomplete/, `${name} must preserve an authorized incomplete handoff`);
  }
});

test('reasoning completion is not restricted to machine-checked proof certificates', async () => {
  const role = await readUtf8('agents/reviewer-mathematics.md');
  assert.doesNotMatch(role, /proof formal or complete without[^.\n]*certificate/i);
  assert.match(role, /complete reasoning proof/i);
  assert.match(role, /formal[^.\n]*(?:certificate|script)/i);
  const contract = await readUtf8('references/mathematics-checks.md');
  assert.match(contract, /Reasoning review/);
  assert.match(contract, /Formal proof check/);
});

for (const file of ['skills/converting-artifacts/SKILL.md', 'skills/working-with-mathematics/SKILL.md']) {
  test(`accepting a limited handoff never satisfies native Equation fidelity: ${file}`, async () => {
    const text = await readUtf8(file);
    assert.doesNotMatch(text, /not a successful native Equation conversion unless/i, file);
    assert.doesNotMatch(text, /not a completed Equation requirement without/i, file);
    assert.match(text, /limited[- ]handoff/i, file);
    assert.match(text, /(?:does not|cannot|never)[^.\n]*(?:satisfy|pass|complete)[^.\n]*native Equation/i, file);
  });
}

test('review findings use the shared severity owner and permit justified Important deferral', async () => {
  const template = await readUtf8('templates/review-findings.md');
  assert.match(template, /reviewing-work\/SKILL\.md#severity-contract/);
  assert.match(template, /\*\*Important\*\*[^.\n]*justification[^.\n]*deferral/i);
  assert.doesNotMatch(template, /\*\*Important\*\* requires correction before acceptance/i);
  const owner = await readUtf8('skills/reviewing-work/SKILL.md');
  assert.match(owner, /\*\*Important:\*\*[^.\n]*justification[^.\n]*deferral/i);
});

test('the review template represents every reviewer output dimension', async () => {
  const template = await readUtf8('templates/review-findings.md');
  const declared = template.match(/\*\*Review Dimension:\*\* \[([^\]]+)\]/);
  assert.ok(declared, 'review dimension options are required');
  const dimensions = declared[1].split('|').map((item) => item.trim());
  for (const name of ['requirement', 'coherence', 'citation', 'prose', 'mathematics', 'visual']) {
    const role = await readUtf8(`agents/reviewer-${name}.md`);
    const output = role.match(/\*\*Dimension:\*\*\s*([a-z]+)/i);
    assert.ok(output, `reviewer-${name} must identify its primary dimension`);
    assert.ok(dimensions.includes(output[1]), `template cannot represent reviewer-${name}: ${output[1]}`);
  }
});

test('the work-plan template uses the progress values defined by its contract', async () => {
  const owner = await readUtf8('references/work-tracking.md');
  const definition = owner.match(/content progress:\s*([^\n]+)/i);
  assert.ok(definition, 'the progress owner must declare its values');
  const canonical = [...definition[1].matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  assert.ok(canonical.length > 0, 'canonical progress values must be explicit');
  const template = await readUtf8('templates/work-plan.md');
  const field = template.match(/- Progress: <([^>]+)>/);
  assert.ok(field, 'the item record needs a progress field');
  assert.deepEqual(field[1].split('/').map((value) => value.trim()), canonical);
});
