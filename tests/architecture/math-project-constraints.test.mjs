import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readUtf8, SHIPPED_SKILLS, CAPABILITY_NAMES } from './helpers.mjs';

// Contract/reachability checks only; behavioral and Word runtime evidence is separate.
function links(file, text) {
  return [...text.matchAll(/\[[^\]]+\]\(([^)#]+)(?:#[^)]*)?\)/g)]
    .filter((m) => !/^[a-z]+:/i.test(m[1]))
    .map((m) => path.posix.normalize(path.posix.join(path.posix.dirname(file), m[1])));
}
async function reaches(files, target) {
  for (const file of files) {
    assert.ok(links(file, await readUtf8(file)).includes(target), `${file} must reach ${target}`);
  }
}
const skills = (names) => names.map((n) => `skills/${n}/SKILL.md`);

test('all Word entry and delivery paths reach the same Equation contract', async () => {
  await reaches(skills(['using-workspace-superpowers', 'reading-artifacts', 'drafting-prose',
    'editing-documents', 'formatting-layout', 'converting-artifacts', 'reviewing-work',
    'verifying-artifacts', 'packaging-deliverables']), 'references/math-in-documents.md');
  await reaches(['skills/analyzing-artifacts/references/artifact-inspection.md',
    'skills/verifying-artifacts/references/artifact-verification.md', 'agents/verifier.md'],
  'references/math-in-documents.md');
});

test('native Equation contract rejects visual-only and unavailable round-trip success', async () => {
  const text = await readUtf8('references/math-in-documents.md');
  for (const term of ['paste', 'author', 'edit', 'export', 'oMath', 'OMML',
    'save/reopen', 'mathematical content', 'limited handoff', 'explicit acceptance',
    'unverified', 'Word environment']) assert.ok(text.includes(term), `missing ${term}`);
  assert.match(text, /count.*(?:not|insufficient)|(?:not|insufficient).*count/i);
  assert.match(text, /(?:must not|do not|never)[^.!?]*complete/is);
  assert.match(text, /latest.*(?:revision|Word)|(?:revision|Word).*latest/i);
});

test('project acquisition, continuity, planning and review share survey boundaries', async () => {
  await reaches(skills(['using-workspace-superpowers', 'reading-artifacts', 'analyzing-artifacts',
    'scoping-the-brief', 'planning-work', 'writing-reports', 'packaging-deliverables']),
  'references/project-grounding.md');
  await reaches(['references/workflow-continuity.md', 'references/document-continuity.md',
    'templates/brief.md', 'templates/outline.md', 'agents/reviewer-citation.md'],
  'references/project-grounding.md');
});

test('survey contract bounds side effects and records original evidence separately', async () => {
  const text = await readUtf8('references/project-grounding.md');
  for (const term of ['one', 'context_file', 'derived', 'original', 'relevant slice',
    'tests', 'builds', 'migrations', 'Git', 'explicit', 'screenshots',
    'outside', 'nonsoftware', 'uninspected', 'conflicts']) {
    assert.ok(text.includes(term), `missing ${term}`);
  }
  assert.match(text, /(?:reuse|Reuse).*context/);
  assert.match(text, /(?:opening|startup|start).*?(?:write|prohibited|mutation)/s);
  assert.match(text, /(?:handoff|handover)/i);
  assert.match(text, /(?:not|never).*?(?:override|overwrite)/s);
});

test('project structure maps onto applicable outline without forcing folder chapters', async () => {
  const text = await readUtf8('skills/planning-work/SKILL.md');
  assert.match(text, /Project.directory.mapped/i);
  assert.match(text, /structure_map/);
  const contract = await readUtf8('references/project-grounding.md');
  assert.match(contract, /rubric/);
  assert.match(contract, /existing.*outline|outline.*existing/);
  assert.match(contract, /not.*(?:chapter|heading)/);
});

test('one context record has an explicit creation and update owner', async () => {
  const editor = await readUtf8('skills/editing-documents/SKILL.md');
  assert.match(editor, /context_file/);
  assert.match(editor, /creat(?:e|ion).*updat|updat.*creat/is);
  await reaches(skills(['editing-documents']), 'references/project-grounding.md');
  const router = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  assert.match(router, /context.*editing-documents|editing-documents.*context/is);
  const contract = await readUtf8('references/project-grounding.md');
  assert.match(contract, /editing-documents/);
});

test('math support and independent review are discoverable without hijacking prose', async () => {
  assert.ok(SHIPPED_SKILLS.includes('working-with-mathematics'));
  assert.ok(CAPABILITY_NAMES.includes('evaluate_math'));
  const draft = await readUtf8('skills/drafting-prose/SKILL.md');
  assert.match(draft, /optional.*(?:support|mathematics)|(?:support|mathematics).*optional/i);
  assert.match(draft, /working-with-mathematics/);
  const review = await readUtf8('skills/reviewing-work/SKILL.md');
  assert.match(review, /reviewer-mathematics/);
  const role = await readUtf8('agents/reviewer-mathematics.md');
  assert.match(role, /Critical/);
  assert.match(role, /assumptions/);
  assert.match(role, /independent|separate/i);
});

test('math check records preserve scope and distinguish samples from proof', async () => {
  const text = await readUtf8('references/mathematics-checks.md');
  for (const term of ['check_id', 'claim_id', 'assumptions', 'method', 'result',
    'evidence', 'limitations', 'unverified', 'numerical', 'proof']) {
    assert.ok(text.includes(term), `missing ${term}`);
  }
  assert.match(text, /(?:sample|examples).*?(?:not|never).*?proof/s);
  const brief = await readUtf8('templates/brief.md');
  for (const term of ['math_checks', 'context_file', 'structure_map']) assert.ok(brief.includes(term));
});

test('math activation follows intent and context across authoring and follow-ups', async () => {
  const router = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  for (const term of ['Mathematics activation', 'proof', 'recurrence', 'Equation',
    'auditing-formulas', 'retained context', 'word alone', 'working-with-mathematics']) {
    assert.ok(router.includes(term), `missing routing signal: ${term}`);
  }
  const math = await readUtf8('skills/working-with-mathematics/SKILL.md');
  assert.match(math, /without.*nam(?:e|ing).*skill/is);
  assert.match(math, /chứng minh/);
  assert.match(math, /tính toán/);
  assert.match(math, /mixed.*project|project.*mixed/is);
  const scenarios = await readUtf8('tests/scenarios/manual/math-project-constraints.md');
  for (let i = 13; i <= 16; i++) assert.ok(scenarios.includes(`MP${i}`));
});

test('acceptance campaign includes positive, negative and regression scenarios', async () => {
  const text = await readUtf8('tests/scenarios/manual/math-project-constraints.md');
  for (let i = 1; i <= 12; i++) assert.ok(text.includes(`MP${String(i).padStart(2, '0')}`));
  assert.match(text, /runtime/i);
  assert.match(text, /response.level/i);
  assert.match(text, /PENDING/);
  assert.match(text, /auditing-formulas/);
});
