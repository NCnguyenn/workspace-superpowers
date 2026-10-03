"""Checks for the Antigravity directory package. Does not install it."""
import json
import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERSION = json.loads((ROOT / 'package.json').read_text(encoding='utf-8'))['version']
CONFIG_PLUGIN = Path.home() / '.gemini' / 'config' / 'plugins' / 'workspace-superpowers'


class PackageTests(unittest.TestCase):
    def build(self, destination, source=ROOT):
        return subprocess.run(
            [sys.executable, str(ROOT / 'scripts/package-antigravity.py'),
             '--source', str(source), '--out', str(destination)],
            text=True, capture_output=True, check=False,
        )

    def test_directory_validates_without_installing(self):
        self.assertFalse(CONFIG_PLUGIN.exists(), 'refusing to test while a same-named plugin is already configured')
        with tempfile.TemporaryDirectory() as temp:
            out = Path(temp) / 'output'
            result = self.build(out)
            self.assertEqual(result.returncode, 0, result.stderr)
            plugin = out / 'workspace-superpowers'
            raw = (plugin / 'plugin.json').read_bytes()
            self.assertFalse(raw.startswith(b'\xef\xbb\xbf'))
            manifest = json.loads(raw)
            self.assertEqual(manifest['name'], 'workspace-superpowers')
            self.assertEqual(manifest['version'], VERSION)
            self.assertTrue(manifest['disabled'])
            skills = list(plugin.glob('skills/*/SKILL.md'))
            self.assertEqual(len(skills), 24)
            self.assertFalse((plugin / 'agents').exists())
            self.assertTrue((plugin / 'roles' / 'reviewer-prose.md').is_file())
            packaged = (plugin / 'skills' / 'reviewing-work' / 'SKILL.md').read_text(encoding='utf-8')
            self.assertIn('../../roles/reviewer-prose.md', packaged)
            self.assertNotIn('../../agents/reviewer-prose.md', packaged)
            self.assertIn('Do not call PI-Desktop `Skill`', packaged)
            source = (ROOT / 'skills' / 'reviewing-work' / 'SKILL.md').read_text(encoding='utf-8')
            self.assertIn('../../agents/reviewer-prose.md', source)
            rules = (plugin / 'rules' / 'AGENTS.md').read_bytes()
            self.assertLess(len(rules), 24000)
            self.assertFalse(rules.startswith(b'---'))
            record = json.loads((out / 'build-record.json').read_text(encoding='utf-8'))
            self.assertFalse(record['installed'])
            self.assertIn('skills      : 24 processed', record['validateOutput'])
            archive = out / f'workspace-superpowers-{VERSION}.zip'
            with zipfile.ZipFile(archive) as package:
                self.assertIn('plugin.json', package.namelist())
                self.assertEqual(package.read('plugin.json'), raw)
        self.assertFalse(CONFIG_PLUGIN.exists(), 'validation must not install the plugin')

    def test_existing_output_is_refused(self):
        with tempfile.TemporaryDirectory() as temp:
            out = Path(temp) / 'output'
            out.mkdir()
            result = self.build(out)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('already exists', result.stderr)


if __name__ == '__main__':
    unittest.main()
