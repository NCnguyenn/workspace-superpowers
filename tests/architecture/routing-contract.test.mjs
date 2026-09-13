import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

const skip = process.env.WS_ALLOW_PARTIAL === '1';

test(
  'router names the four wave-1 specialists',
  { skip },
  async () => {
    const text = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
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
    const text = await readUtf8('skills/editing-documents/SKILL.md');
    for (const name of ['reading-artifacts', 'analyzing-artifacts', 'verifying-artifacts']) {
      assert.equal(text.includes(name), true, `editing-documents missing ${name}`);
    }
  },
);

test(
  'verifying-artifacts states command success is not artifact success',
  { skip },
  async () => {
    const text = await readUtf8('skills/verifying-artifacts/SKILL.md');
    assert.equal(text.includes('Command success is not artifact success.'), true);
  },
);
