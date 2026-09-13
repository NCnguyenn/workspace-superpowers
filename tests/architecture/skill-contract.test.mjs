import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, readUtf8, skillFiles } from './helpers.mjs';

test('every SKILL.md has Use-when description and valid frontmatter', async () => {
  const files = await skillFiles();
  for (const rel of files) {
    const parsed = parseFrontmatter(await readUtf8(rel));
    assert.ok(parsed, `${rel} missing YAML frontmatter`);
    assert.ok(parsed.totalChars <= 1024, `${rel} frontmatter > 1024 chars`);
    assert.match(parsed.fm.name, /^[a-z0-9-]+$/);
    assert.equal(rel, `skills/${parsed.fm.name}/SKILL.md`);
    assert.ok(
      parsed.fm.description.startsWith('Use when'),
      `${rel} description must start with Use when`,
    );
    assert.ok(
      !/first, then|step 1|the procedure is/i.test(parsed.fm.description),
      `${rel} description summarises workflow`,
    );
  }
});
