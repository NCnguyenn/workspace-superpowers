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

test('PI refreshable stage contract carries heading and evidence prerequisites', async () => {
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  const managed = bootstrap.match(/<!-- workspace-superpowers:skill-invocation:begin -->([\s\S]*?)<!-- workspace-superpowers:skill-invocation:end -->/)[1];
  assert.match(managed, /1 → 1\.x → 1\.x\.x/);
  assert.match(managed, /verbatim/);
  assert.match(managed, /before (?:preparing|generating) the outline/);
  assert.match(managed, /explicit.*(?:permission|authorization)/i);
});
