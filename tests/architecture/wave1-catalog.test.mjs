import test from 'node:test';
import assert from 'node:assert/strict';
import { WAVE1_SKILLS, allowPartial, exists, skillDirs } from './helpers.mjs';

test(
  'wave 1 ships exactly the 5 named skills',
  { skip: allowPartial() },
  async () => {
    const dirs = await skillDirs();
    assert.deepEqual(dirs, [...WAVE1_SKILLS].sort());
    for (const name of WAVE1_SKILLS) {
      assert.equal(await exists(`skills/${name}/SKILL.md`), true);
    }
  },
);
