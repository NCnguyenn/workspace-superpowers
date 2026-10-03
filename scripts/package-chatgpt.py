"""Build a deterministic ChatGPT Desktop local-marketplace plugin. Does not install it."""
import argparse
import hashlib
import json
import os
import posixpath
import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLUGIN_NAME = 'workspace-superpowers'
PLUGIN_SCHEMA = 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json'
MCP_SCHEMA = 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json'


def json_bytes(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode('utf-8')


def source_bytes(root, relative):
    path = root / relative
    if not path.is_file() or path.is_symlink():
        raise ValueError(f'Missing or linked package source: {relative}')
    for parent in path.parents:
        if parent == root:
            break
        if parent.is_symlink():
            raise ValueError(f'Linked package source directory: {relative}')
    return path.read_bytes()


def copy_markdown(root, folder, files, destination=None):
    base = root / folder
    if not base.is_dir():
        raise ValueError(f'Missing package directory: {folder}')
    for directory, dirs, names in os.walk(base, followlinks=False):
        for name in dirs + names:
            path = Path(directory) / name
            if path.is_symlink() or bool(getattr(path, 'is_junction', lambda: False)()):
                raise ValueError(f'Linked package source: {path.relative_to(root)}')
        for name in names:
            if name.endswith('.md'):
                source = (Path(directory) / name).relative_to(root).as_posix()
                target = source if destination is None else posixpath.join(
                    destination, posixpath.relpath(source, folder))
                files[target] = source_bytes(root, source)


def retarget_roles(data):
    text = data.decode('utf-8-sig')
    text = text.replace('../../agents/', '../../roles/')
    text = text.replace('../agents/', '../roles/')
    return text.encode('utf-8')


def validate_links(files):
    for name, data in files.items():
        if not name.endswith('.md'):
            continue
        for target in re.findall(r'\[[^\]]*\]\(([^)\s]+)(?:\s[^)]*)?\)', data.decode('utf-8-sig')):
            if target.startswith(('#', 'http:', 'https:', 'mailto:')):
                continue
            target = target.split('#')[0]
            if not target:
                continue
            resolved = posixpath.normpath(posixpath.join(posixpath.dirname(name), target))
            if resolved not in files:
                raise ValueError(f'Unresolved package reference: {name} -> {target}')


def collect(root):
    version = json.loads(source_bytes(root, 'package.json'))['version']
    if not re.fullmatch(r'[0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z0-9.-]+)?', version):
        raise ValueError('Package version must be a safe semantic version')
    files = {}
    for folder in ('skills', 'references', 'templates'):
        copy_markdown(root, folder, files)
    copy_markdown(root, 'agents', files, destination='roles')
    for name in list(files):
        files[name] = retarget_roles(files[name])
    skills = []
    for path in sorted(files):
        if not re.fullmatch(r'skills/[^/]+/SKILL\.md', path):
            continue
        text = files[path].decode('utf-8-sig')
        match = re.match(r'---\r?\n(.*?)\r?\n---\r?\n', text, re.S)
        if not match:
            raise ValueError(f'Missing frontmatter: {path}')
        metadata = dict(re.findall(r'^(name|description):\s*(.+)$', match[1], re.M))
        name = path.split('/')[1]
        if metadata.get('name', '').strip() != name or not metadata.get('description', '').strip():
            raise ValueError(f'Invalid skill metadata: {path}')
        skills.append(name)
        footer = (
            '\n\n## ChatGPT adapter (generated)\n\n'
            f'This copy is the `{PLUGIN_NAME}` ChatGPT Desktop plugin. '
            'Retrieve sibling skills through the read-only Workspace Superpowers MCP service or '
            'read `skills/<name>/SKILL.md` from this plugin root when the host exposes package files. '
            'Role prompts are in `roles/`, not `agents/`. '
            'Read [the host mapping](../../adapters/chatgpt/tools.md). '
            'Resolve links from this file, not from the user project.\n'
        )
        files[path] += footer.encode('utf-8')
    if len(skills) != 24 or 'using-workspace-superpowers' not in skills:
        raise ValueError('Expected 24 skills, including the router')
    for name in ('bootstrap.md', 'tools.md', 'install.md', 'acceptance.md'):
        files[f'adapters/chatgpt/{name}'] = source_bytes(root, f'adapters/chatgpt/{name}')
    manifest = json.loads(source_bytes(root, 'adapters/chatgpt/plugin.json'))
    if manifest.get('name') != PLUGIN_NAME:
        raise ValueError('Unexpected ChatGPT plugin name')
    if manifest.get('$schema') != PLUGIN_SCHEMA:
        raise ValueError('ChatGPT plugin manifest must declare the Agent Plugins schema')
    manifest['version'] = version
    files['plugin.json'] = json_bytes(manifest)
    mcp = json.loads(source_bytes(root, 'adapters/chatgpt/mcp.json'))
    if mcp.get('$schema') != MCP_SCHEMA:
        raise ValueError('ChatGPT MCP manifest must declare the Agent Plugins schema')
    endpoint = mcp.get('mcpServers', {}).get(PLUGIN_NAME, {}).get('url', '')
    if not endpoint.startswith('https://REPLACE_WITH_AUTHORIZED_HTTPS_ENDPOINT/'):
        raise ValueError('ChatGPT package must not embed a real endpoint or secret')
    files['mcp.json'] = json_bytes(mcp)
    files['rules/AGENTS.md'] = source_bytes(root, 'adapters/chatgpt/bootstrap.md')
    files['adapters/mcp/catalog.mjs'] = source_bytes(root, 'adapters/mcp/catalog.mjs')
    files['adapters/mcp/server.mjs'] = source_bytes(root, 'adapters/mcp/server.mjs')
    files['LICENSE'] = source_bytes(root, 'LICENSE')
    files['README.md'] = (
        f'# Workspace Superpowers {version} (ChatGPT Desktop plugin)\n\n'
        'Generated local-marketplace plugin. Building does not install, enable, or connect it.\n\n'
        'See [installation notes](adapters/chatgpt/install.md), '
        '[host mapping](adapters/chatgpt/tools.md), and '
        '[acceptance matrix](adapters/chatgpt/acceptance.md).\n'
    ).encode('utf-8')
    validate_links(files)
    if any(name.startswith('agents/') for name in files):
        raise ValueError('Package must not ship an agents directory')
    return manifest, files


def build(root, output):
    if output.exists() or output.is_symlink():
        raise ValueError(f'Output already exists; choose a fresh --out directory: {output}')
    manifest, files = collect(root)
    output.mkdir(parents=True, exist_ok=False)
    plugin_dir = output / 'plugins' / PLUGIN_NAME
    plugin_dir.mkdir(parents=True)
    for name, data in sorted(files.items()):
        destination = plugin_dir / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
    marketplace = {
        'name': 'workspace-superpowers-local',
        'interface': {
            'displayName': 'Workspace Superpowers (Local)',
        },
        'plugins': [{
            'name': PLUGIN_NAME,
            'source': {
                'source': 'local',
                'path': f'./plugins/{PLUGIN_NAME}',
            },
            'policy': {
                'installation': 'AVAILABLE',
                'authentication': 'ON_INSTALL',
            },
            'category': 'Productivity',
        }],
    }
    (output / 'marketplace.json').write_bytes(json_bytes(marketplace))
    archive_name = f'{PLUGIN_NAME}-{manifest["version"]}.zip'
    archive = output / archive_name
    archive_files = dict(files)
    with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_STORED, allowZip64=False) as package:
        for name, data in sorted(archive_files.items()):
            info = zipfile.ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_STORED
            info.create_system = 0
            info.external_attr = 0x20
            package.writestr(info, data)
    with zipfile.ZipFile(archive) as package:
        if package.testzip() is not None or set(package.namelist()) != set(archive_files):
            raise ValueError('Archive failed integrity verification')
        for name, data in archive_files.items():
            if package.read(name) != data:
                raise ValueError(f'Package readback mismatch: {name}')
    for name, data in files.items():
        if (plugin_dir / name).read_bytes() != data:
            raise ValueError(f'Directory readback mismatch: {name}')
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    (output / f'{archive_name}.sha256').write_text(f'{digest}  {archive_name}\n', encoding='utf-8')
    record = {
        'pluginName': PLUGIN_NAME,
        'version': manifest['version'],
        'marketplace': 'marketplace.json',
        'directory': f'plugins/{PLUGIN_NAME}',
        'archive': archive_name,
        'sha256': digest,
        'skillCount': len([name for name in files if re.fullmatch(r'skills/[^/]+/SKILL\.md', name)]),
        'fileCount': len(files),
        'installed': False,
        'mcpConnection': 'not started or configured by the build',
        'validation': 'Archive and directory bytes reopened and checked; ChatGPT installation and mode acceptance pending.',
        'files': {name: hashlib.sha256(data).hexdigest() for name, data in sorted(files.items())},
    }
    (output / 'build-record.json').write_bytes(json_bytes(record))
    return record


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=ROOT)
    parser.add_argument('--out', type=Path, default=ROOT / 'dist/chatgpt')
    args = parser.parse_args()
    try:
        result = build(args.source.resolve(), args.out.absolute())
    except (OSError, ValueError, KeyError, zipfile.BadZipFile) as error:
        print(f'Packaging failed: {error}', file=sys.stderr)
        return 1
    print(json.dumps({key: value for key, value in result.items() if key != 'files'}, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
