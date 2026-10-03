import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Structural regression checks only; native PI model behavior needs a retained trace.
test('outline template provides numbered parent, main-point and subpoint headings', async () => {
  const outline = await readUtf8('templates/outline.md');
  assert.match(outline, /^# 1 \[Exact source criterion or requirement title\]$/m);
  assert.match(outline, /^## 1\.1 \[Main point\]$/m);
  assert.match(outline, /^### 1\.1\.1 \[Supporting subpoint\]$/m);
  assert.doesNotMatch(outline, /^### Section [12]:/m);
});

test('outline owners share title fidelity and evidence-before-outline requirements', async () => {
  for (const file of ['skills/scoping-the-brief/SKILL.md', 'skills/planning-work/SKILL.md',
    'skills/using-workspace-superpowers/SKILL.md', 'templates/outline.md',
    'references/criteria-writing-contract.md', 'agents/reviewer-requirement.md']) {
    assert.match(await readUtf8(file), /outline-structure\.md/, file);
  }
  const contract = await readUtf8('references/outline-structure.md');
  for (const marker of ['1.x.x', 'verbatim', 'source_title', 'evidence_readiness',
    'illustrative_authorized', 'scoping-the-brief', 'before preparing the outline']) {
    assert.ok(contract.includes(marker), `missing ${marker}`);
  }
  assert.match(contract, /explicit.*(?:format|structure)/i);
  assert.match(contract, /not.*(?:measured|empirical)/i);
});

test('outline owner carries heading and evidence prerequisites', async () => {
  const managed = await readUtf8('references/outline-structure.md');
  assert.match(managed, /1\.x\.x/);
  assert.match(managed, /verbatim/);
  assert.match(managed, /before preparing the outline/);
  assert.match(managed, /explicit.*(?:permission|authorization)/i);
});

test('outline depth previews content without becoming a word quota', async () => {
  for (const file of ['references/outline-structure.md', 'skills/planning-work/SKILL.md']) {
    const text = await readUtf8(file);
    assert.match(text, /40–50%/, file);
    assert.match(text, /50–60%/, file);
    assert.match(text, /do not reverse/i, file);
    assert.match(text, /word-count quota/i, file);
    assert.match(text, /brainstorming/, file);
    assert.match(text, /user chooses/i, file);
  }
});

test('outline points use argument slots and a shown asset or Not needed', async () => {
  const structure = await readUtf8('references/outline-structure.md');
  assert.match(structure, /Claim:/);
  assert.match(structure, /Reason:/);
  assert.match(structure, /Limit:/);
  assert.match(structure, /Do not print Claim/);
  assert.match(structure, /direct HTTPS image URL/);
  assert.match(structure, /long base64/);
  assert.match(structure, /same blocks/);
  assert.match(structure, /file path/);
  assert.match(structure, /topic label is not an outline point/i);
  assert.match(structure, /same message/);
  assert.match(structure, /Not needed/);
  assert.match(structure, /unstated technology/);
  assert.match(structure, /Ask the user and wait/);
  assert.match(structure, /Silence is not permission/);

  for (const file of ['skills/planning-work/SKILL.md', 'templates/outline.md',
    'references/criteria-writing-contract.md', 'AGENTS.md']) {
    const text = await readUtf8(file);
    assert.match(text, /same message/, file);
    assert.match(text, /Not needed/, file);
    assert.doesNotMatch(text, /Visuals and tables specification/i, file);
    assert.doesNotMatch(text, /asset specification/i, file);
  }

  for (const file of ['skills/planning-work/SKILL.md',
    'skills/using-workspace-superpowers/SKILL.md',
    'references/criteria-writing-contract.md', 'AGENTS.md']) {
    const text = await readUtf8(file);
    assert.match(text, /làm dàn ý/, file);
    assert.match(text, /not analysis approval/i, file);
  }

  const visual = await readUtf8('references/visual-assets-and-word-fidelity.md');
  assert.match(visual, /download an existing public image/);
  assert.match(visual, /source citation/);
  assert.match(visual, /Do not create, generate, or code-draw/);
  assert.doesNotMatch(visual, /Do not download a web image/);
});

test('outline display rules reject one paragraph per heading, link-only images, and invented rubrics', async () => {
  const structure = await readUtf8('references/outline-structure.md');
  assert.match(structure, /one paragraph per heading/i);
  assert.match(structure, /50–60%/);
  assert.match(structure, /source line without/);
  assert.match(structure, /upload\.wikimedia\.org/);
  assert.match(structure, /parallel items/);
  assert.match(structure, /did not write/);
  assert.doesNotMatch(structure, /two or three academic sentences/i);
  assert.doesNotMatch(structure, /data:image\/png;base64/);

  const planning = await readUtf8('skills/planning-work/SKILL.md');
  assert.match(planning, /one paragraph per heading/i);
  assert.match(planning, /50–60%/);
  assert.match(planning, /source line without/);

  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  assert.match(bootstrap, /one paragraph per heading/i);
  assert.match(bootstrap, /image bytes/);
  assert.match(bootstrap, /did not write/);
  assert.match(bootstrap, /question option/);
  assert.doesNotMatch(bootstrap, /data:image\/png;base64/);
  assert.ok(bootstrap.length <= 4096, `bootstrap is ${bootstrap.length} characters`);

  const agents = await readUtf8('AGENTS.md');
  assert.match(agents, /one paragraph per heading/i);
  assert.match(agents, /did not write/);
});
