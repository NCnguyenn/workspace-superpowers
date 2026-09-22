import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { exists, readUtf8 } from './helpers.mjs';

test('language policy is reachable from bootstrap, router, scoping, brief, and writing references', async () => {
  assert.equal(await exists('references/language-policy.md'), true, 'shared language policy missing');
  for (const file of ['AGENTS.md', 'skills/using-workspace-superpowers/SKILL.md', 'skills/scoping-the-brief/SKILL.md', 'templates/brief.md', 'references/academic-writing-style.md', 'references/criteria-writing-contract.md']) {
    const text = await readUtf8(file);
    const link = [...text.matchAll(/\[[^\]]+\]\(([^)]*language-policy\.md)\)/g)][0];
    assert.ok(link, file + ': missing shared language-policy link');
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), link[1]));
    assert.equal(resolved, 'references/language-policy.md', file + ': incorrect policy target');
    assert.equal(await exists(resolved), true);
  }
});

test('active design and scoping rules no longer contradict the English default', async () => {
  const design = await readUtf8('docs/workspace-superpowers-design.md');
  const scoping = await readUtf8('skills/scoping-the-brief/SKILL.md');
  const brief = await readUtf8('templates/brief.md');
  assert.doesNotMatch(design, /No default language|without assuming English/);
  assert.doesNotMatch(scoping, /Do not hardcode a citation style or language as the package default/);
  assert.match(brief, /Deliverable Language:.*English/i);
  assert.doesNotMatch(brief, /resolved per the brief\/rubric\/source/);
});

test('default outline labels and missing-evidence example are English', async () => {
  const outline = await readUtf8('templates/outline.md');
  const contract = await readUtf8('references/criteria-writing-contract.md');
  assert.match(outline, /Planned Tables \/ Figures/);
  assert.doesNotMatch(outline, /Dự kiến|Không cần/);
  assert.ok(contract.includes('[Before/after CPU measurements under the same test conditions are required; the direction and magnitude of change are not yet established.]'));
});
