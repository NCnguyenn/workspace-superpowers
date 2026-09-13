import test from 'node:test';
import assert from 'node:assert/strict';
import { HARNESS_LEAK, readUtf8, walk } from './helpers.mjs';

test('skill pack files do not name harness tools, MCP servers, or permission strings', async () => {
  const leaks = [];
  for (const rel of await walk('skills')) {
    if (!/\.(md|txt|yml|yaml)$/i.test(rel)) continue;
    const text = await readUtf8(rel);
    for (const re of HARNESS_LEAK) {
      if (re.test(text)) leaks.push(`${rel} matches ${re}`);
    }
  }
  assert.deepEqual(leaks, []);
});
