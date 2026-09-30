import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Structural reachability only. A retained PI trace is still required for behavior.
test('visual evidence boundary is owned and reached before image or read-back claims', async () => {
  const boundary = await readUtf8('references/visual-evidence-boundary.md');
  for (const marker of [
    'document-stated', 'visually-observed', 'source-inspected', 'runtime-observed', 'unverified',
    'visible pixels', 'r:embed', 'not a relationship ID', 'ellipsis',
    'media opened', 'original image legible', 'rendered document legible',
    'supports a claim', 'criterion satisfied', 'DPR', 'unedited tool result',
    'counting scope', '0-based', '1183', 'partly covered', 'breakpoint',
  ]) {
    assert.ok(boundary.toLowerCase().includes(marker.toLowerCase()), `missing ${marker}`);
  }
  assert.match(boundary, /not a CSS viewport/i);
  assert.match(boundary, /render each caption once/i);

  for (const file of [
    'skills/working-with-visuals/SKILL.md',
    'skills/reading-artifacts/SKILL.md',
    'skills/analyzing-artifacts/SKILL.md',
    'skills/verifying-artifacts/SKILL.md',
    'skills/using-workspace-superpowers/SKILL.md',
    'references/visual-assets-and-word-fidelity.md',
    'adapters/pi/bootstrap.md',
    'AGENTS.md',
  ]) {
    assert.match(await readUtf8(file), /visual-evidence-boundary\.md/, file);
  }

  const visual = await readUtf8('skills/working-with-visuals/SKILL.md');
  assert.match(visual, /not a relationship ID/i);
  assert.match(visual, /Do not convert a PNG width into a CSS viewport/i);
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  assert.match(bootstrap, /working-with-visuals/);
  assert.ok(bootstrap.length <= 4096);
  assert.ok(bootstrap.split(/\r?\n/).length <= 80);
});
