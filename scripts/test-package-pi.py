"""Integration checks for the real PI package, using only the standard library."""
import json
import re
import shutil
import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class PackageTests(unittest.TestCase):
    def test_oversized_description_is_rejected_instead_of_changing_skill_trigger(self):
        with tempfile.TemporaryDirectory() as temp:
            source = Path(temp) / 'source'
            source.mkdir()
            for folder in ('skills', 'agents', 'references', 'templates', 'adapters'):
                shutil.copytree(ROOT / folder, source / folder)
            for name in ('package.json', 'LICENSE'):
                shutil.copy2(ROOT / name, source / name)
            target = source / 'skills/reading-artifacts/SKILL.md'
            contents = target.read_text(encoding='utf-8')
            target.write_text(re.sub(r'^description:.*$', 'description: Use when ' + 'x' * 240,
                                     contents, count=1, flags=re.M), encoding='utf-8')
            output = Path(temp) / 'output'
            result = self.build(output, source)
            self.assertNotEqual(result.returncode, 0, 'catalog triggers must not be silently truncated')
            self.assertIn('description exceeds', result.stderr)
            self.assertFalse(output.exists())

    def test_packaged_native_extension_injects_thin_bootstrap_with_legacy_project_instructions(self):
        with tempfile.TemporaryDirectory() as temp:
            out = Path(temp) / 'output'
            result = self.build(out)
            self.assertEqual(result.returncode, 0, result.stderr)
            plugin = out / 'local.workspace-superpowers'
            probe = r'''
const assert = require('node:assert/strict');
const extension = require(process.argv[1]);
assert.equal(extension.default, extension, 'sidecar loader requires the default export');
let hook;
extension({ on(event, handler) { assert.ok(['before_agent_start', 'tool_call'].includes(event)); if (event === 'before_agent_start') hook = handler; } });
(async () => {
  const result = await hook({ systemPrompt: '## Workspace Superpowers\nLegacy project rules.' });
  assert.ok(result, 'legacy heading must not suppress current routing');
  assert.ok(result.systemPrompt.startsWith('## Workspace Superpowers\nLegacy project rules.'));
  assert.ok(result.systemPrompt.includes('local.workspace-superpowers/using-workspace-superpowers'));
  assert.ok(result.systemPrompt.includes(process.argv[2]), 'actual package root must be present');
  assert.ok(result.systemPrompt.length < 6000, 'workflow details load from specialists');
  assert.equal(await hook({ systemPrompt: result.systemPrompt }), undefined);
  const afterCompact = await hook({ systemPrompt: 'Restored base after compact.' });
  assert.ok(afterCompact.systemPrompt.includes('local.workspace-superpowers/using-workspace-superpowers'));
})().catch(error => { console.error(error); process.exitCode = 1; });
'''
            manifest = json.loads((plugin / 'manifest.json').read_text(encoding='utf-8'))
            self.assertEqual(manifest['contributes']['agentExtensions'], ['adapters/pi/agent-extension.js'])
            runtime = subprocess.run(['node', '-e', probe,
                                      str(plugin / manifest['contributes']['agentExtensions'][0]), str(plugin)],
                                     text=True, capture_output=True, check=False)
            self.assertEqual(runtime.returncode, 0, runtime.stderr)
            drafting = (plugin / 'skills/drafting-prose/SKILL.md').read_text(encoding='utf-8')
            self.assertIn('invoke_skill("reviewing-work")', drafting)
            for name in ['scoping-the-brief', 'planning-work', 'drafting-prose', 'reviewing-work']:
                skill = (plugin / 'skills' / name / 'SKILL.md').read_text(encoding='utf-8')
                self.assertIn('`Skill` tool', skill)
                self.assertIn(f'local.workspace-superpowers/{name}', skill)

    def build(self, destination, source=ROOT):
        return subprocess.run(
            [sys.executable, str(ROOT / 'scripts/package-pi.py'), '--source', str(source), '--out', str(destination)],
            text=True, capture_output=True, check=False,
        )

    def test_installable_archive_and_portable_dependencies(self):
        with tempfile.TemporaryDirectory() as temp:
            out = Path(temp) / 'output'
            result = self.build(out)
            self.assertEqual(result.returncode, 0, result.stderr)
            archive = next(out.glob('*.piplug'))
            with zipfile.ZipFile(archive) as package:
                self.assertIsNone(package.testzip())
                names = set(package.namelist())
                self.assertIn('references/guided-questions.md', names)
                self.assertIn('references/outline-structure.md', names)
                self.assertIn('adapters/pi/revision-export-route.cjs', names)
                self.assertIn('adapters/pi/native-checklist.cjs', names)
                self.assertIn('adapters/pi/project-survey.mjs', names)
                if (ROOT / 'adapters/pi/tracking-checkpoint.mjs').is_file():
                    self.assertIn('adapters/pi/tracking-checkpoint.mjs', names)
                self.assertEqual(package.read('dogfood/criterion-trial.md'),
                                 package.read('adapters/pi/criterion-trial.md'))
                self.assertEqual(package.read('dogfood/routing-trial.md'),
                                 package.read('adapters/pi/routing-trial.md'))
                self.assertTrue(all(i.compress_type == zipfile.ZIP_STORED for i in package.infolist()))
                manifest = json.loads(package.read('manifest.json'))
                plugin = out / manifest['id']
                self.assertEqual(manifest['id'], 'local.workspace-superpowers')
                self.assertEqual(manifest['permissions'], ['agent.prompt.inject', 'agent.extension', 'agent.tool.register', 'ui.panel', 'session.read'])
                self.assertIn('adapters/pi/checklist-bridge.cjs', names)
                self.assertIn('adapters/pi/checklist-panel.html', names)
                self.assertIn('adapters/pi/checklist-panel.js', names)
                self.assertEqual(manifest['ui']['panel'], 'adapters/pi/checklist-panel.html')
                skills = manifest['contributes']['skills']
                self.assertEqual(len(skills), 24)
                self.assertEqual(len({s['id'] for s in skills}), 24)
                router = next(s for s in skills if s['id'] == 'using-workspace-superpowers')
                for trigger in ['continues', 'changes', 'approves', 'resumes']:
                    self.assertIn(trigger, router['description'])
                self.assertEqual(json.loads(package.read('package.json'))['type'], 'commonjs')
                for skill in skills:
                    self.assertIn(skill['path'], names)
                    self.assertLessEqual(len(package.read(skill['path'])), 128 * 1024)
                    self.assertLessEqual(len(skill['description']), 240)
                for folder in ('skills', 'agents', 'references', 'templates'):
                    for source in (ROOT / folder).rglob('*.md'):
                        relative = source.relative_to(ROOT).as_posix()
                        self.assertIn(relative, names)
                        self.assertTrue(package.read(relative).startswith(source.read_bytes()), relative)
                for name in names:
                    self.assertFalse(any(part in {'.git', '.tmp', 'tests', 'node_modules', '__pycache__'} for part in Path(name).parts))
                    self.assertNotIn('..', Path(name).parts)
                    self.assertEqual(package.read(name), (out / manifest['id'] / name).read_bytes())
                route_probe = r'''
const assert = require('node:assert/strict');
const { routeRevisionExport } = require(process.argv[2]);
(async () => {
  const revisions = new Map([
    ['approved-r1', { revisionId: 'approved-r1', status: 'approved' }],
    ['working-r2', { revisionId: 'working-r2', status: 'working/unapproved' }],
  ]);
  const result = await routeRevisionExport({ requestedRevisionId: 'working-r2' }, {
    resolveRevision(id) { return revisions.get(id); },
    async exportRevision(revision) {
      return { outputId: 'working-r2.docx', sourceRevisionId: revision.revisionId, sourceStatus: revision.status };
    },
    async verifyExport(output, expected) {
      return { verified: true, outputId: output.outputId,
        sourceRevisionId: expected.revisionId, sourceStatus: expected.status };
    },
  });
  assert.deepEqual(result, { requestedRevisionId: 'working-r2', requestedStatus: 'working/unapproved', outputId: 'working-r2.docx', verified: true });
})().catch((error) => { console.error(error); process.exitCode = 1; });
'''
                route_probe_path = Path(temp) / 'route-probe.cjs'
                route_probe_path.write_text(route_probe, encoding='utf-8')
                runtime = subprocess.run(['node', str(route_probe_path), str(plugin / 'adapters/pi/revision-export-route.cjs')],
                                         text=True, capture_output=True, check=False)
                self.assertEqual(runtime.returncode, 0, runtime.stderr)
                for name in names:
                    if not name.endswith('.md'):
                        continue
                    for target in re.findall(r'\[[^\]]*\]\(([^\s)]+)(?:[^)]*)\)', package.read(name).decode('utf-8')):
                        if target.startswith(('#', 'http:', 'https:', 'mailto:')):
                            continue
                        target = target.split('#')[0]
                        if not target:
                            continue
                        from posixpath import normpath, join, dirname
                        resolved = normpath(join(dirname(name), target))
                        self.assertIn(resolved, names, f'{name} -> {target}')

    def test_reproducible_build(self):
        with tempfile.TemporaryDirectory() as temp:
            outputs = [Path(temp) / 'first', Path(temp) / 'second']
            for out in outputs:
                result = self.build(out)
                self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(next(outputs[0].glob('*.piplug')).read_bytes(), next(outputs[1].glob('*.piplug')).read_bytes())

    def test_refuses_existing_output_without_modification(self):
        with tempfile.TemporaryDirectory() as temp:
            out = Path(temp) / 'existing'
            out.mkdir()
            sentinel = out / 'keep.txt'
            sentinel.write_text('keep me', encoding='utf-8')
            result = self.build(out)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('already exists', result.stderr)
            self.assertEqual(sentinel.read_text(), 'keep me')
            self.assertEqual(list(out.iterdir()), [sentinel])

    def test_incomplete_source_does_not_leave_installable_output(self):
        with tempfile.TemporaryDirectory() as temp:
            source = Path(temp) / 'source'
            source.mkdir()
            (source / 'package.json').write_text('{"version":"0.1.0"}', encoding='utf-8')
            out = Path(temp) / 'output'
            result = self.build(out, source)
            self.assertNotEqual(result.returncode, 0)
            self.assertFalse(out.exists())


if __name__ == '__main__':
    unittest.main(verbosity=2)
