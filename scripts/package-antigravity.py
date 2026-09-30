"""Build a directory-form Antigravity plugin. Does not install it."""
import argparse
import hashlib
import json
import os
import posixpath
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLUGIN_NAME = 'workspace-superpowers'
AGY_CANDIDATE = Path(os.environ.get('LOCALAPPDATA', '')) / 'agy' / 'bin' / 'agy.exe'


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
            '\n\n## Antigravity adapter (generated)\n\n'
            f'This copy is the `{PLUGIN_NAME}` plugin. Do not call PI-Desktop `Skill` '
            f'or use `local.workspace-superpowers/{name}`.\n'
            'Read sibling skills from `skills/<name>/SKILL.md` in this plugin root. '
            'Role prompts are in `roles/`, not in `agents/`.\n'
            'Read [the host mapping](../../adapters/antigravity/tools.md). '
            'Resolve links from this file, not from the user project.\n'
        )
        files[path] += footer.encode('utf-8')
    if len(skills) != 24 or 'using-workspace-superpowers' not in skills:
        raise ValueError('Expected 24 skills, including the router')
    for relative in ('bootstrap.md', 'tools.md', 'capabilities.md', 'install.md'):
        files[f'adapters/antigravity/{relative}'] = source_bytes(root, f'adapters/antigravity/{relative}')
    rules = files['adapters/antigravity/bootstrap.md']
    if rules.startswith(b'\xef\xbb\xbf') or rules.startswith(b'---') or len(rules) > 24000:
        raise ValueError('Antigravity bootstrap must be a short rule without frontmatter or a BOM')
    files['rules/AGENTS.md'] = rules
    plugin = {
        'name': PLUGIN_NAME,
        'description': 'Workspace skill pack for documents, research, and office artifacts. Built for validation; not installed by the build.',
        'version': version,
        'disabled': True,
    }
    files['plugin.json'] = json_bytes(plugin)
    files['LICENSE'] = source_bytes(root, 'LICENSE')
    files['README.md'] = (
        f'# Workspace Superpowers {version} (Antigravity directory)\n\n'
        'Generated plugin directory. Building this directory does not install it.\n\n'
        'See [installation notes](adapters/antigravity/install.md), '
        '[host mapping](adapters/antigravity/tools.md), and '
        '[the detection record](adapters/antigravity/capabilities.md).\n\n'
        'Edit the source skill pack and rebuild. This directory is not the source of truth.\n'
    ).encode('utf-8')
    validate_links(files)
    if 'agents/' in {posixpath.dirname(name) + '/' for name in files} or any(name.startswith('agents/') for name in files):
        raise ValueError('Package must not ship an agents directory')
    return plugin, files


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


def agy_executable():
    found = shutil.which('agy')
    if found:
        return found
    if AGY_CANDIDATE.is_file():
        return str(AGY_CANDIDATE)
    raise ValueError('agy executable not found; refusing to claim a validated package')


def validate_plugin(plugin_dir):
    result = subprocess.run(
        [agy_executable(), 'plugin', 'validate', str(plugin_dir)],
        text=True, capture_output=True, check=False,
    )
    output = f'{result.stdout}\n{result.stderr}'
    if result.returncode != 0 or '[ok]' not in result.stdout:
        raise ValueError(f'agy plugin validate failed:\n{output}')
    if 'skills      : 24 processed' not in result.stdout:
        raise ValueError(f'Validate did not process 24 skills:\n{output}')
    if 'agents      : skipped (not found)' not in result.stdout:
        raise ValueError(f'Validate treated role files as agents:\n{output}')
    if 'install' in result.args:
        raise ValueError('Validate invocation must not install')
    return result.stdout


def build(root, output):
    if output.exists() or output.is_symlink():
        raise ValueError(f'Output already exists; choose a fresh --out directory: {output}')
    plugin, files = collect(root)
    output.mkdir(parents=True, exist_ok=False)
    folder = output / PLUGIN_NAME
    folder.mkdir()
    for name, data in sorted(files.items()):
        destination = folder / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
    filename = f'{PLUGIN_NAME}-{plugin["version"]}.zip'
    archive = output / filename
    with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_STORED, allowZip64=False) as package:
        for name, data in sorted(files.items()):
            info = zipfile.ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_STORED
            info.create_system = 0
            info.external_attr = 0x20
            package.writestr(info, data)
    with zipfile.ZipFile(archive) as package:
        if package.testzip() is not None or set(package.namelist()) != set(files):
            raise ValueError('Archive failed integrity verification')
        for name, data in files.items():
            if package.read(name) != data or (folder / name).read_bytes() != data:
                raise ValueError(f'Package readback mismatch: {name}')
    validation = validate_plugin(folder)
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    (output / f'{filename}.sha256').write_text(f'{digest}  {filename}\n', encoding='utf-8')
    record = {
        'pluginName': PLUGIN_NAME,
        'version': plugin['version'],
        'directory': PLUGIN_NAME,
        'archive': filename,
        'sha256': digest,
        'skillCount': 24,
        'fileCount': len(files),
        'installed': False,
        'validation': 'agy plugin validate passed on the built directory. Install was not run.',
        'validateOutput': validation,
        'files': {name: hashlib.sha256(data).hexdigest() for name, data in sorted(files.items())},
    }
    (output / 'build-record.json').write_bytes(json_bytes(record))
    return record


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=ROOT)
    parser.add_argument('--out', type=Path, default=ROOT / 'dist/antigravity')
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
