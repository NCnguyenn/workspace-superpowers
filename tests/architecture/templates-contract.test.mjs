import test from 'node:test';
import assert from 'node:assert/strict';
import { allowPartial, exists, templateFiles } from './helpers.mjs';

const EXPECTED_TEMPLATES = [
  'brief.md',
  'outline.md',
  'deliverable-contract.md',
  'review-findings.md',
  'final-report.md',
];

test('all required standard templates exist under templates/', async (t) => {
  const files = await templateFiles();
  t.diagnostic(`checked ${files.length} template file(s) under templates/`);

  for (const name of EXPECTED_TEMPLATES) {
    const rel = `templates/${name}`;
    assert.equal(await exists(rel), true, `${rel} does not exist`);
  }
});
