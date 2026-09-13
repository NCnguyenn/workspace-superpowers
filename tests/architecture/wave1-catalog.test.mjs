import test from 'node:test';
import assert from 'node:assert/strict';
import { WAVE1_SKILLS, exists, skillFiles } from './helpers.mjs';

test(
  'wave 1 ships exactly the 5 named skills',
  { skip: process.env.WS_ALLOW_PARTIAL === '1' },
  async () => {
    const files = await skillFiles();
    const names = files.map((f) => f.split('/')[1]).sort();
    assert.deepEqual(names, [...WAVE1_SKILLS].sort());
    for (const name of WAVE1_SKILLS) {
      assert.equal(await exists(`skills/${name}/SKILL.md`), true);
    }
  },
);
