"""Integration checks for the real PI package, using only the standard library."""
import json
import re
import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class PackageTests(unittest.TestCase):
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
                self.assertTrue(all(i.compress_type == zipfile.ZIP_STORED for i in package.infolist()))
                manifest = json.loads(package.read('manifest.json'))
                self.assertEqual(manifest['id'], 'local.workspace-superpowers')
                self.assertEqual(manifest['permissions'], ['agent.prompt.inject'])
                skills = manifest['contributes']['skills']
                self.assertEqual(len(skills), 23)
                self.assertEqual(len({s['id'] for s in skills}), 23)
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
