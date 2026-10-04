import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DEFAULT_PACKAGE_ROOT, getSkill, getStaticContent, listSkills } from './catalog.mjs';

const digest = (text) => createHash('sha256').update(text).digest('hex');

test('catalogue lists the source package skills with stable digests', () => {
  const skills = listSkills(DEFAULT_PACKAGE_ROOT);
  assert.equal(skills.length, 24);
  assert.equal(skills[0].id, 'analyzing-artifacts');
  assert.ok(skills.every((skill) => /^[a-f0-9]{64}$/.test(skill.sha256)));
});

test('skill retrieval returns the exact matched catalogue document', () => {
  const skill = getSkill('using-workspace-superpowers');
  assert.match(skill.text, /^---\r?\nname: using-workspace-superpowers/m);
  assert.equal(skill.sha256, digest(skill.text));
});

test('skill retrieval returns exact router and specialist documents', () => {
  for (const id of ['using-workspace-superpowers', 'verifying-artifacts']) {
    const skill = getSkill(id);
    assert.equal(skill.id, id);
    assert.equal(skill.sha256, digest(skill.text));
    assert.match(skill.text, new RegExp(`^---\\r?\\nname: ${id}\\r?\\n`));
  }
});

test('package-level contracts and templates use the static resource route', () => {
  for (const [area, path] of [
    ['references', 'criteria-writing-contract.md'],
    ['templates', 'outline.md'],
  ]) {
    const resource = getStaticContent(area, path);
    assert.equal(resource.area, area);
    assert.equal(resource.path, path);
    assert.equal(resource.sha256, digest(resource.text));
    assert.ok(resource.text.trim(), `${area}/${path} must not be empty`);
  }
});

test('unknown and traversal-like skill IDs are rejected', () => {
  assert.throws(() => getSkill('../package'), /Unknown skill ID/);
  assert.throws(() => getSkill('not-a-real-skill'), /Unknown skill ID/);
  assert.throws(() => getSkill(null), /Unknown skill ID/);
  assert.throws(() => getSkill(undefined), /Unknown skill ID/);
  assert.throws(() => getSkill(123), /Unknown skill ID/);
});


test('only Markdown references and templates can be served', () => {
  const reference = getStaticContent('references', 'work-tracking.md');
  assert.equal(reference.sha256, digest(reference.text));
  assert.throws(() => getStaticContent('skills', 'using-workspace-superpowers/SKILL.md'), /Unknown read-only package resource/);
  assert.throws(() => getStaticContent('skills', 'analyzing-artifacts/references/artifact-inspection.md'), /Unknown read-only package resource/);
  assert.throws(() => getStaticContent('unlisted', 'work-tracking.md'), /Unknown read-only package resource/);
  assert.throws(() => getStaticContent('references', '../package.json'), /Unknown read-only package resource/);
  assert.throws(() => getStaticContent('references', 'work-tracking.txt'), /Unknown read-only package resource/);
});

test('symlinked files are rejected by resource retrieval', async () => {
  const root = await mkdtemp(join(tmpdir(), 'workspace-superpowers-mcp-'));
  await mkdir(join(root, 'references'));
  await writeFile(join(root, 'secret.md'), 'secret');
  try {
    await symlink(join(root, 'secret.md'), join(root, 'references', 'linked.md'));
  } catch {
    return;
  }
  assert.throws(() => getStaticContent('references', 'linked.md', root), /not a regular package file/);
});

test('symlinked directories are rejected by resource retrieval', async () => {
  const root = await mkdtemp(join(tmpdir(), 'workspace-superpowers-mcp-dir-'));
  const outside = await mkdtemp(join(tmpdir(), 'workspace-superpowers-mcp-outside-'));
  await mkdir(join(root, 'references'));
  await writeFile(join(outside, 'secret.md'), 'secret');
  try {
    await symlink(outside, join(root, 'references', 'linked'), 'junction');
  } catch {
    return;
  }
  assert.throws(
    () => getStaticContent('references', 'linked/secret.md', root),
    /symbolic link|package area|escapes/,
  );
});
