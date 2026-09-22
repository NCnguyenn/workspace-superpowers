import test from 'node:test';
import assert from 'node:assert/strict';
import { WAVE1_SKILLS, allowPartial, parseFrontmatter, readUtf8, skillFiles } from './helpers.mjs';

test('every SKILL.md has Use-when description and valid frontmatter', async (t) => {
  const files = await skillFiles();
  t.diagnostic(`checked ${files.length} SKILL.md file(s) under skills/`);
  if (!allowPartial()) {
    assert.ok(
      files.length >= WAVE1_SKILLS.length,
      `expected at least ${WAVE1_SKILLS.length} SKILL.md files, found ${files.length} — nothing would be checked`,
    );
  }
  for (const rel of files) {
    const parsed = parseFrontmatter(await readUtf8(rel));
    assert.ok(
      parsed,
      `${rel} missing YAML frontmatter: file must begin with a --- line (no BOM, no leading blank line)`,
    );
    assert.ok(parsed.totalChars <= 1024, `${rel} frontmatter > 1024 chars`);
    assert.equal(typeof parsed.fm.name, 'string', `${rel} frontmatter has no name field`);
    assert.match(
      parsed.fm.name,
      /^[a-z0-9-]+$/,
      `${rel} name must be lowercase letters, digits and dashes only`,
    );
    assert.equal(rel, `skills/${parsed.fm.name}/SKILL.md`, `${rel} name does not match its folder`);
    assert.equal(
      typeof parsed.fm.description,
      'string',
      `${rel} frontmatter has no single-line description field`,
    );
    assert.ok(
      parsed.fm.description.startsWith('Use when'),
      `${rel} description must be a single-line plain scalar starting with "Use when" — no quotes, no folded/block scalar. Got: ${JSON.stringify(parsed.fm.description)}`,
    );
    assert.ok(
      !/first, then|step 1|the procedure is/i.test(parsed.fm.description),
      `${rel} description summarises the workflow instead of stating triggers`,
    );
  }
});
