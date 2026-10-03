"""Checks the ChatGPT Desktop local-marketplace package. Does not install it."""
import json
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
            [sys.executable, str(ROOT / 'scripts/package-chatgpt.py'),
             '--source', str(source), '--out', str(destination)],
            text=True, capture_output=True, check=False,
        )

    def test_directory_and_archive_are_readback_verified(self):
        with tempfile.TemporaryDirectory() as temp:
            out = Path(temp) / 'output'
            result = self.build(out)
            self.assertEqual(result.returncode, 0, result.stderr)
            plugin = out / 'plugins' / 'workspace-superpowers'
            manifest = json.loads((plugin / 'plugin.json').read_text(encoding='utf-8'))
            self.assertEqual(manifest['$schema'], 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json')
            self.assertEqual(manifest['name'], 'workspace-superpowers')
            self.assertEqual(manifest['version'], '0.1.6-beta')
            self.assertEqual(len(list((plugin / 'skills').glob('*/SKILL.md'))), 24)
            self.assertTrue((plugin / 'mcp.json').is_file())
            mcp = json.loads((plugin / 'mcp.json').read_text(encoding='utf-8'))
            self.assertEqual(mcp['$schema'], 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json')
            self.assertTrue(mcp['mcpServers']['workspace-superpowers']['url'].startswith('https://REPLACE_'))
            marketplace = json.loads((out / 'marketplace.json').read_text(encoding='utf-8'))
            self.assertEqual(marketplace['interface']['displayName'], 'Workspace Superpowers (Local)')
            entry = marketplace['plugins'][0]
            self.assertEqual(entry['source']['source'], 'local')
            self.assertEqual(marketplace['plugins'][0]['source']['path'], './plugins/workspace-superpowers')
            self.assertEqual(entry['policy'], {
                'installation': 'AVAILABLE',
                'authentication': 'ON_INSTALL',
            })
            record = json.loads((out / 'build-record.json').read_text(encoding='utf-8'))
            self.assertFalse(record['installed'])
            self.assertEqual(record['skillCount'], 24)
            archive = out / 'workspace-superpowers-0.1.6-beta.zip'
            with zipfile.ZipFile(archive) as package:
                self.assertEqual(package.read('plugin.json'), (plugin / 'plugin.json').read_bytes())
                self.assertNotIn('marketplace.json', package.namelist())
                self.assertIn('adapters/mcp/server.mjs', package.namelist())

    def test_existing_output_is_refused(self):
        with tempfile.TemporaryDirectory() as temp:
            out = Path(temp) / 'output'
            out.mkdir()
            result = self.build(out)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('already exists', result.stderr)


if __name__ == '__main__':
    unittest.main()
