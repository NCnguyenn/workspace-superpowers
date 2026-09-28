import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { routeRevisionExport } = require('./revision-export-route.cjs');

const revisions = new Map([
  ['approved-r1', { revisionId: 'approved-r1', status: 'approved', cells: ['Approved metric', '41'], mediaId: 'approved-pixels' }],
  ['working-r2', { revisionId: 'working-r2', status: 'working/unapproved', cells: ['Working metric', '73'], mediaId: 'working-pixels' }],
]);

test('approved and working revision requests keep independent identity and status through export verification', async () => {
  const events = [];
  const dependencies = {
    resolveRevision(id) { return revisions.get(id); },
    async exportRevision(revision) {
      events.push(['export', revision.revisionId, revision.status, revision.cells[0], revision.mediaId]);
      return { outputId: `${revision.revisionId}.docx`, sourceRevisionId: revision.revisionId,
        sourceStatus: revision.status, cells: revision.cells, mediaId: revision.mediaId };
    },
    async verifyExport(output, expected) {
      events.push(['verify', expected.revisionId, output.sourceRevisionId, output.sourceStatus]);
      assert.equal(output.sourceRevisionId, expected.revisionId);
      assert.equal(output.sourceStatus, expected.status);
      assert.deepEqual(output.cells, expected.cells);
      assert.equal(output.mediaId, expected.mediaId);
      return { verified: true, outputId: output.outputId,
        sourceRevisionId: expected.revisionId, sourceStatus: expected.status };
    },
  };

  const approved = await routeRevisionExport({ requestedRevisionId: 'approved-r1' }, dependencies);
  const working = await routeRevisionExport({ requestedRevisionId: 'working-r2' }, dependencies);

  assert.deepEqual(approved, { requestedRevisionId: 'approved-r1', requestedStatus: 'approved',
    outputId: 'approved-r1.docx', verified: true });
  assert.deepEqual(working, { requestedRevisionId: 'working-r2', requestedStatus: 'working/unapproved',
    outputId: 'working-r2.docx', verified: true });
  assert.deepEqual(events.map((event) => event.slice(0, 3)), [
    ['export', 'approved-r1', 'approved'], ['verify', 'approved-r1', 'approved-r1'],
    ['export', 'working-r2', 'working/unapproved'], ['verify', 'working-r2', 'working-r2'],
  ]);
});

test('route rejects an adapter that substitutes the approved export for a working request', async () => {
  await assert.rejects(() => routeRevisionExport({ requestedRevisionId: 'working-r2' }, {
    resolveRevision(id) { return revisions.get(id); },
    async exportRevision() {
      return { outputId: 'approved-r1.docx', sourceRevisionId: 'approved-r1', sourceStatus: 'approved' };
    },
    async verifyExport() { return { verified: true, outputId: 'approved-r1.docx' }; },
  }), /substituted requested revision/);
});

test('route rejects a verifier result that loses requested status or identity', async () => {
  await assert.rejects(() => routeRevisionExport({ requestedRevisionId: 'working-r2' }, {
    resolveRevision(id) { return revisions.get(id); },
    async exportRevision(revision) {
      return { outputId: 'working-r2.docx', sourceRevisionId: revision.revisionId,
        sourceStatus: revision.status };
    },
    async verifyExport() {
      return { verified: true, outputId: 'working-r2.docx', sourceStatus: 'approved', sourceRevisionId: 'working-r2' };
    },
  }), /verification result lost requested revision identity or status/);
});

test('route freezes the expected revision before handing it to a mutating exporter', async () => {
  await assert.rejects(() => routeRevisionExport({ requestedRevisionId: 'working-r2' }, {
    resolveRevision(id) { return revisions.get(id); },
    async exportRevision(revision) {
      assert.throws(() => { revision.revisionId = 'approved-r1'; }, TypeError);
      return { outputId: 'approved-r1.docx', sourceRevisionId: 'approved-r1', sourceStatus: 'approved' };
    },
    async verifyExport(output, expected) {
      return { verified: true, outputId: output.outputId,
        sourceRevisionId: expected.revisionId, sourceStatus: expected.status };
    },
  }), /substituted requested revision/);
});

test('adapter route drives both revision fixtures through Python export and reopened OOXML verification', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const temp = mkdtempSync(path.join(tmpdir(), 's3-revision-route-'));
  try {
    for (const revision of ['approved-r1', 'working-r2']) {
      const target = path.join(temp, `${revision}.docx`);
      execFileSync('python', [path.join(root, 'tests/fixtures/word-native-visuals/build_fixture.py'),
        '--revision', revision, target], { cwd: root, stdio: 'pipe' });
      const output = execFileSync('python', ['-B', path.join(root, 'tests/architecture/word-visual-fidelity.test.py'),
        '--check', target, '--revision', revision], { cwd: root, encoding: 'utf8' });
      assert.match(output, new RegExp(`verified .*\\(${revision}\\)`));
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
