import test from 'node:test';
import assert from 'node:assert/strict';
import { SHIPPED_SKILLS, WAVE1_SKILLS, allowPartial, exists, skillDirs } from './helpers.mjs';

test(
  'catalog ships exactly the approved workspace skills',
  { skip: allowPartial() },
  async () => {
    const dirs = await skillDirs();
    assert.deepEqual(dirs, [...SHIPPED_SKILLS].sort());
    for (const name of SHIPPED_SKILLS) {
      assert.equal(await exists(`skills/${name}/SKILL.md`), true, `skills/${name}/SKILL.md does not exist`);
    }
    // Verify Wave 1 foundation remains present
    for (const name of WAVE1_SKILLS) {
      assert.equal(SHIPPED_SKILLS.includes(name), true, `Wave 1 skill ${name} is missing from catalog`);
    }
  },
);
