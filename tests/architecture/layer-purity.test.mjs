import test from 'node:test';
import assert from 'node:assert/strict';
import { HARNESS_LEAK, allowPartial, readUtf8, walk } from './helpers.mjs';

test('skill pack files do not name harness tools, MCP servers, or permission strings', async (t) => {
  const all = await walk('skills');
  t.diagnostic(`scanned ${all.length} file(s) under skills/ for ${HARNESS_LEAK.length} forbidden strings`);
  if (!allowPartial()) {
    assert.ok(all.length > 0, 'skills/ contains no files — layer purity would not be checked');
  }
  const leaks = [];
  for (const rel of all) {
    const text = await readUtf8(rel);
    for (const needle of HARNESS_LEAK) {
      if (text.includes(needle)) leaks.push(`${rel} contains ${needle}`);
    }
  }
  assert.deepEqual(leaks, []);
});
