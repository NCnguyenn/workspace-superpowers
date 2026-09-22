import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(fileURLToPath(new URL('../..', import.meta.url)));
const modulePath = join(root, 'adapters', 'pi', 'project-survey.mjs');
const fixture = join(root, 'tests', 'fixtures', 'project-survey-sample');

function copyFixture() {
  mkdirSync(join(root, '.tmp', 'tests'), { recursive: true });
  const dest = mkdtempSync(join(root, '.tmp', 'tests', 'survey-'));
  cpSync(fixture, dest, { recursive: true });
  const vendor = join(dest, 'node_modules', 'pkg');
  mkdirSync(vendor, { recursive: true });
  writeFileSync(join(vendor, 'index.js'), 'module.exports = {};\n');
  return dest;
}
function listRelative(dir, acc = [], prefix = '') {
  for (const name of readdirSync(dir)) {
    const rel = prefix ? `${prefix}/${name}` : name;
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) listRelative(abs, acc, rel);
    else acc.push(rel.replaceAll('\\', '/'));
  }
  return acc.sort();
}

test('project survey writes only one derived context file and refuses tests', async () => {
  assert.equal(existsSync(modulePath), true, 'adapters/pi/project-survey.mjs must exist');
  const { surveyProject } = await import(pathToFileURL(modulePath).href);
  const project = copyFixture();
  const before = listRelative(project);
  try {
    const refused = surveyProject({ root: project, runTests: true });
    assert.equal(refused.ok, false);
    assert.match(refused.error, /not authorized|permission|refused/i);
    assert.deepEqual(listRelative(project), before);

    const result = surveyProject({ root: project });
    assert.equal(result.ok, true);
    assert.equal(result.contextFile.replaceAll('\\', '/').endsWith('project-context.md'), true);
    const after = listRelative(project);
    assert.deepEqual(after.filter((p) => p !== 'project-context.md'), before);
    assert.ok(after.includes('project-context.md'));

    const text = readFileSync(join(project, 'project-context.md'), 'utf8');
    assert.match(text, /derived/i);
    assert.match(text, /src\/app\.js/);
    assert.match(text, /README\.md/);
    assert.doesNotMatch(text, /SUPERSECRET/);
    assert.match(text, /node_modules/);
    assert.match(text, /uninspected|skipped/i);
    assert.ok(result.filesRead.some((p) => p.replaceAll('\\', '/').endsWith('src/app.js')));
    assert.ok(result.skipped.some((p) => p.replaceAll('\\', '/').includes('node_modules')));

    writeFileSync(join(project, 'src/app.js'), 'tampered');
    const again = surveyProject({ root: project });
    assert.equal(again.ok, true);
    assert.equal(readFileSync(join(project, 'src/app.js'), 'utf8'), 'tampered');
    assert.deepEqual(
      listRelative(project).filter((p) => p !== 'project-context.md' && p !== 'src/app.js'),
      after.filter((p) => p !== 'project-context.md' && p !== 'src/app.js'),
    );
  } finally {
    rmSync(project, { recursive: true, force: true });
  }
});

test('project survey CLI refuses --run-tests without writing', () => {
  assert.equal(existsSync(modulePath), true);
  const project = copyFixture();
  const before = listRelative(project);
  try {
    const child = spawnSync(process.execPath, [modulePath, '--root', project, '--run-tests'], {
      encoding: 'utf8', timeout: 10_000,
    });
    assert.notEqual(child.status, 0);
    assert.deepEqual(listRelative(project), before);
  } finally {
    rmSync(project, { recursive: true, force: true });
  }
});

test('project survey skips ordinary key, env, and credential filenames', async () => {
  const { surveyProject } = await import(pathToFileURL(modulePath).href);
  const project = copyFixture();
  try {
    writeFileSync(join(project, 'private.key'), 'BEGIN PRIVATE KEY leaked');
    writeFileSync(join(project, '.env.local'), 'TOKEN=leaked-env');
    writeFileSync(join(project, 'credentials.json'), '{"token":"leaked-json"}');
    mkdirSync(join(project, '.venv'), { recursive: true });
    writeFileSync(join(project, '.venv', 'pyvenv.cfg'), 'home = leaked-venv');
    const result = surveyProject({ root: project });
    assert.equal(result.ok, true);
    const text = readFileSync(join(project, 'project-context.md'), 'utf8');
    assert.doesNotMatch(text, /leaked/);
    assert.ok(result.skipped.some((p) => p.replaceAll('\\', '/').endsWith('private.key')));
    assert.ok(result.skipped.some((p) => p.replaceAll('\\', '/').endsWith('.env.local')));
    assert.ok(result.skipped.some((p) => p.replaceAll('\\', '/').endsWith('credentials.json')));
    assert.ok(result.skipped.some((p) => p.replaceAll('\\', '/').includes('.venv')));
  } finally {
    rmSync(project, { recursive: true, force: true });
  }
});
