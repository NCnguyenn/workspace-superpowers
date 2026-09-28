import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(fileURLToPath(new URL('../..', import.meta.url)));
const modulePath = join(root, 'adapters', 'pi', 'project-survey.mjs');
const checkpointPath = join(root, 'adapters', 'pi', 'tracking-checkpoint.mjs');
const fixture = join(root, 'tests', 'fixtures', 'project-survey-sample');

function copyFixture() {
  mkdirSync(join(root, '.tmp', 'tests'), { recursive: true });
  const base = mkdtempSync(join(root, '.tmp', 'tests', 'survey-'));
  const project = join(base, 'source-project');
  const report = join(base, 'report-workspace');
  cpSync(fixture, project, { recursive: true });
  mkdirSync(report, { recursive: true });
  const vendor = join(project, 'node_modules', 'pkg');
  mkdirSync(vendor, { recursive: true });
  writeFileSync(join(vendor, 'index.js'), 'module.exports = {};\n');
  return { base, project, report };
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

function revision(path) {
  if (!existsSync(path)) return null;
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function writeTarget(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
  return { path, content, expectedRevision: revision(path) };
}

test('project survey is read-only when no persistence path is authorized', async () => {
  assert.equal(existsSync(modulePath), true, 'adapters/pi/project-survey.mjs must exist');
  const { surveyProject } = await import(pathToFileURL(modulePath).href);
  const { base, project } = copyFixture();
  const before = listRelative(project);
  try {
    const result = surveyProject({ root: project });
    assert.equal(result.ok, true);
    assert.deepEqual(result.wrote, []);
    assert.equal(result.contextFile, null);
    assert.deepEqual(listRelative(project), before);
    assert.ok(result.filesRead.some((p) => p.replaceAll('\\', '/').endsWith('src/app.js')));
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('project survey defaults a new context to an explicitly authorized report workspace', async () => {
  const { surveyProject } = await import(pathToFileURL(modulePath).href);
  const { base, project, report } = copyFixture();
  try {
    const result = surveyProject({
      root: project,
      authorizedOutputRoot: report,
      placementAuthorization: 'report-workspace',
    });
    const expected = join(report, 'project-context.md');
    assert.equal(result.ok, true);
    assert.equal(result.contextFile, expected);
    assert.deepEqual(result.wrote, [expected]);
    assert.equal(result.persistence.placement, 'report-workspace');
    assert.equal(existsSync(join(project, 'project-context.md')), false);
    assert.match(readFileSync(expected, 'utf8'), /src\/app\.js/);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('adopted exact source context is returned as an editor handoff and never overwritten', async () => {
  const { surveyProject } = await import(pathToFileURL(modulePath).href);
  const { base, project } = copyFixture();
  const adopted = join(project, 'project-context.md');
  const curated = '# Curated project context\n\nKeep this identity and note.\n';
  writeFileSync(adopted, curated, 'utf8');
  try {
    const result = surveyProject({
      root: project,
      adoptedContextFile: adopted,
      authorizedContextFile: adopted,
      placementAuthorization: 'source-project',
    });
    assert.equal(result.ok, true);
    assert.deepEqual(result.wrote, []);
    assert.equal(result.contextFile, adopted);
    assert.equal(result.persistence.mode, 'editor-handoff');
    assert.equal(result.persistence.placement, 'source-project');
    assert.match(result.persistence.content, /Derived project context/);
    assert.equal(readFileSync(adopted, 'utf8'), curated);

    const rawRefresh = surveyProject({
      root: project,
      authorizedContextFile: adopted,
      placementAuthorization: 'source-project',
    });
    assert.equal(rawRefresh.ok, false);
    assert.match(rawRefresh.error, /adopted|existing|editor/i);
    assert.equal(readFileSync(adopted, 'utf8'), curated);

    const wrongIdentity = surveyProject({
      root: project,
      adoptedContextFile: adopted,
      authorizedContextFile: join(project, 'other-context.md'),
      placementAuthorization: 'source-project',
    });
    assert.equal(wrongIdentity.ok, false);
    assert.match(wrongIdentity.error, /exact authorized context path/i);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('explicit placement authorization permits one exact new source-project context', async () => {
  const { surveyProject } = await import(pathToFileURL(modulePath).href);
  const { base, project } = copyFixture();
  const target = join(project, 'project-context.md');
  try {
    const result = surveyProject({
      root: project,
      authorizedContextFile: target,
      placementAuthorization: 'source-project',
    });
    assert.equal(result.ok, true);
    assert.equal(result.contextFile, target);
    assert.deepEqual(result.wrote, [target]);
    assert.equal(result.persistence.placement, 'source-project');
    assert.equal(existsSync(target), true);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('source-root defaults and unsafe context names are rejected without writing', async () => {
  const { surveyProject } = await import(pathToFileURL(modulePath).href);
  const { base, project, report } = copyFixture();
  const before = listRelative(project);
  try {
    const unauthorized = surveyProject({
      root: project,
      authorizedOutputRoot: project,
      placementAuthorization: 'report-workspace',
    });
    assert.equal(unauthorized.ok, false);
    assert.match(unauthorized.error, /source project|placement|authorized/i);

    const traversal = surveyProject({
      root: project,
      authorizedOutputRoot: report,
      placementAuthorization: 'report-workspace',
      contextName: '../project-context.md',
    });
    assert.equal(traversal.ok, false);
    assert.match(traversal.error, /contextName/i);
    assert.deepEqual(listRelative(project), before);
    assert.deepEqual(listRelative(report), []);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('project survey refuses tests and skips secret-like files', async () => {
  const { surveyProject } = await import(pathToFileURL(modulePath).href);
  const { base, project, report } = copyFixture();
  const before = listRelative(project);
  try {
    const refused = surveyProject({
      root: project,
      runTests: true,
      authorizedOutputRoot: report,
      placementAuthorization: 'report-workspace',
    });
    assert.equal(refused.ok, false);
    assert.match(refused.error, /not authorized|permission|refused/i);
    assert.deepEqual(listRelative(project), before);
    assert.deepEqual(listRelative(report), []);

    writeFileSync(join(project, 'private.key'), 'BEGIN PRIVATE KEY leaked');
    writeFileSync(join(project, '.env.local'), 'TOKEN=leaked-env');
    writeFileSync(join(project, 'credentials.json'), '{"token":"leaked-json"}');
    mkdirSync(join(project, '.venv'), { recursive: true });
    writeFileSync(join(project, '.venv', 'pyvenv.cfg'), 'home = leaked-venv');
    const result = surveyProject({
      root: project,
      authorizedOutputRoot: report,
      placementAuthorization: 'report-workspace',
    });
    assert.equal(result.ok, true);
    const text = readFileSync(join(report, 'project-context.md'), 'utf8');
    assert.doesNotMatch(text, /leaked/);
    assert.ok(result.skipped.some((p) => p.replaceAll('\\', '/').endsWith('private.key')));
    assert.ok(result.skipped.some((p) => p.replaceAll('\\', '/').includes('.venv')));
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('project survey CLI refuses --run-tests without writing', () => {
  const { base, project } = copyFixture();
  const before = listRelative(project);
  try {
    const child = spawnSync(process.execPath, [modulePath, '--root', project, '--run-tests'], {
      encoding: 'utf8', timeout: 10_000,
    });
    assert.notEqual(child.status, 0);
    assert.deepEqual(listRelative(project), before);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('checkpoint skips an absent or unaffected context without creating one', async () => {
  const { saveTrackingCheckpoint } = await import(pathToFileURL(checkpointPath).href);
  const { base, report } = copyFixture();
  const deliverable = writeTarget(join(report, 'report.md'), 'old report');
  const plan = writeTarget(join(report, 'work-plan.md'), 'old plan');
  const absent = join(report, 'project-context.md');
  try {
    const result = saveTrackingCheckpoint({
      deliverable: { ...deliverable, content: 'new report' },
      context: { path: absent, affected: false },
      plan: { ...plan, content: 'new plan' },
    });
    assert.equal(result.ok, true);
    assert.equal(existsSync(absent), false);
    assert.deepEqual(result.saved.map((item) => item.role), ['deliverable', 'plan']);
    assert.ok(result.saved.every((item) => item.reopened === true));
    assert.deepEqual(result.skipped, [{ role: 'context', reason: 'absent-or-unaffected' }]);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});

test('checkpoint detects a revision conflict immediately before every write', async (t) => {
  const { saveTrackingCheckpoint } = await import(pathToFileURL(checkpointPath).href);
  for (const conflictRole of ['deliverable', 'context', 'plan']) {
    await t.test(conflictRole, () => {
      const { base, report } = copyFixture();
      const deliverable = writeTarget(join(report, 'report.md'), 'report r1');
      const context = writeTarget(join(report, 'project-context.md'), 'context r1');
      const plan = writeTarget(join(report, 'work-plan.md'), 'plan r1');
      const targets = { deliverable, context, plan };
      writeFileSync(targets[conflictRole].path, `${conflictRole} changed externally`, 'utf8');
      try {
        const result = saveTrackingCheckpoint({
          deliverable: { ...deliverable, content: 'report r2' },
          context: { ...context, content: 'context r2', affected: true },
          plan: { ...plan, content: 'plan r2' },
        });
        assert.equal(result.ok, false);
        assert.equal(result.failedAt, conflictRole);
        assert.equal(result.reason, 'revision-conflict');
        const order = ['deliverable', 'context', 'plan'];
        assert.deepEqual(result.saved.map((item) => item.role), order.slice(0, order.indexOf(conflictRole)));
        assert.ok(result.saved.every((item) => item.reopened === true));
      } finally {
        rmSync(base, { recursive: true, force: true });
      }
    });
  }
});

for (const failedRole of ['deliverable', 'context', 'plan']) {
  test(`checkpoint reports exact ${failedRole} partial-save recovery state`, async () => {
    const { saveTrackingCheckpoint } = await import(pathToFileURL(checkpointPath).href);
    const { base, report } = copyFixture();
    const valid = {
      deliverable: writeTarget(join(report, 'report.md'), 'report r1'),
      context: writeTarget(join(report, 'project-context.md'), 'context r1'),
      plan: writeTarget(join(report, 'work-plan.md'), 'plan r1'),
    };
    const invalidPath = join(report, 'missing-parent', `${failedRole}.md`);
    valid[failedRole] = { path: invalidPath, content: `${failedRole} r2`, expectedRevision: null };
    try {
      const result = saveTrackingCheckpoint({
        deliverable: { ...valid.deliverable, content: 'report r2' },
        context: { ...valid.context, content: 'context r2', affected: true },
        plan: { ...valid.plan, content: 'plan r2' },
      });
      assert.equal(result.ok, false);
      assert.equal(result.failedAt, failedRole);
      assert.equal(result.reason, 'write-failed');
      const order = ['deliverable', 'context', 'plan'];
      const expectedSaved = order.slice(0, order.indexOf(failedRole));
      assert.deepEqual(result.saved.map((item) => item.role), expectedSaved);
      assert.deepEqual(result.unsaved.map((item) => item.role), order.slice(expectedSaved.length));
      assert.equal(result.recovery.createTracker, false);
      assert.match(result.recovery.action, /reconcile/i);
    } finally {
      rmSync(base, { recursive: true, force: true });
    }
  });
}
