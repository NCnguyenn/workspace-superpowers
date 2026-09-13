import test from 'node:test';
import assert from 'node:assert/strict';
import { allowPartial, exists, readUtf8 } from './helpers.mjs';

const skip = allowPartial();

async function readSkill(name) {
  const rel = `skills/${name}/SKILL.md`;
  assert.equal(await exists(rel), true, `${rel} is missing — routing contract cannot be checked`);
  return readUtf8(rel);
}

test(
  'router names the four wave-1 specialists',
  { skip },
  async () => {
    const text = await readSkill('using-workspace-superpowers');
    for (const name of [
      'reading-artifacts',
      'analyzing-artifacts',
      'editing-documents',
      'verifying-artifacts',
    ]) {
      assert.equal(text.includes(name), true, `router missing ${name}`);
    }
  },
);

test(
  'editing-documents depends on read, analyze, and verify',
  { skip },
  async () => {
    const text = await readSkill('editing-documents');
    for (const name of ['reading-artifacts', 'analyzing-artifacts', 'verifying-artifacts']) {
      assert.equal(text.includes(name), true, `editing-documents missing ${name}`);
    }
  },
);

test(
  'verifying-artifacts states command success is not artifact success',
  { skip },
  async () => {
    const text = await readSkill('verifying-artifacts');
    assert.equal(
      text.includes('Command success is not artifact success.'),
      true,
      'verifying-artifacts missing the exact sentence "Command success is not artifact success."',
    );
  },
);
