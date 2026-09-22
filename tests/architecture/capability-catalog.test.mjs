import test from 'node:test';
import assert from 'node:assert/strict';
import { CAPABILITY_NAMES, agentFiles, readUtf8, skillFiles } from './helpers.mjs';

const CALL = /`([a-z][a-z0-9_]*)\(/g;
const allowed = new Set(CAPABILITY_NAMES);

test('skills and agent roles name only §11 capability identifiers', async (t) => {
  const files = [...(await skillFiles()), ...(await agentFiles())];
  t.diagnostic(`scanned ${files.length} skill/role file(s) against ${CAPABILITY_NAMES.length} allowed capability names`);
  const leaks = [];
  for (const rel of files) {
    const text = await readUtf8(rel);
    for (const match of text.matchAll(CALL)) {
      const name = match[1];
      if (!allowed.has(name)) leaks.push(`${rel} names ${name}()`);
    }
  }
  assert.deepEqual(leaks, []);
});
