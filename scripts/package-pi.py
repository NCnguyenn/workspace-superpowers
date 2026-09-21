"""Build a deterministic, store-only PI-Desktop skill-pack archive."""
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
PLUGIN_ID = 'local.workspace-superpowers'


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


def collect(root):
    version = json.loads(source_bytes(root, 'package.json'))['version']
    if not re.fullmatch(r'[0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z0-9.-]+)?', version):
        raise ValueError('Package version must be a safe semantic version')
    files = {}
    for folder in ('skills', 'agents', 'references', 'templates'):
        if not (root / folder).is_dir():
            raise ValueError(f'Missing package directory: {folder}')
        for directory, dirs, names in os.walk(root / folder, followlinks=False):
            for name in dirs + names:
                path = Path(directory) / name
                if path.is_symlink() or bool(getattr(path, 'is_junction', lambda: False)()):
                    raise ValueError(f'Linked package source: {path.relative_to(root)}')
            for name in names:
                if name.endswith('.md'):
                    relative = (Path(directory) / name).relative_to(root).as_posix()
                    files[relative] = source_bytes(root, relative)
    manifest = json.loads(source_bytes(root, 'adapters/pi/manifest.json'))
    if manifest['id'] != PLUGIN_ID or manifest['permissions'] != ['agent.prompt.inject']:
        raise ValueError('Unexpected plugin identity or permissions')
    manifest['version'] = version
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
        skills.append({'id': name, 'path': path, 'name': name,
                       'description': metadata['description'].strip().strip('\"\'')[:240]})
        footer = (
            '\n\n## PI-Desktop adapter (generated)\n\n'
            f'This skill is `{PLUGIN_ID}/{name}`. Invoke sibling skills with the native '
            f'`Skill` tool using `{PLUGIN_ID}/<skill-name>` as `id`.\n'
            f'The normal installed package root is `~/.pi-desktop/plugins/installed/{PLUGIN_ID}/`. '
            f'This document is `{path}` within it. Expand `~` to the user home directory. '
            'For a development-directory load, use the actual plugin path configured in the project bootstrap. '
            'Resolve relative links from this document, not the working project. '
            'Read [the host mapping](../../adapters/pi/tools.md) when mapping conceptual capabilities.\n'
        )
        files[path] += footer.encode('utf-8')
    if not 1 <= len(skills) <= 32 or not any(s['id'] == 'using-workspace-superpowers' for s in skills):
        raise ValueError('Expected a router and 1–32 skills')
    if any(len(files[s['path']]) > 128 * 1024 for s in skills):
        raise ValueError('Skill exceeds the PI-Desktop size limit')
    manifest['contributes'] = {'skills': skills}
    files['manifest.json'] = json_bytes(manifest)
    files['package.json'] = json_bytes({'name': 'workspace-superpowers-pi', 'version': version,
                                       'private': True, 'type': 'commonjs'})
    files['main.js'] = source_bytes(root, 'adapters/pi/main.cjs')
    files['LICENSE'] = source_bytes(root, 'LICENSE')
    for name in ('bootstrap.md', 'tools.md', 'install.md', 'dogfood.md'):
        files[f'adapters/pi/{name}'] = source_bytes(root, f'adapters/pi/{name}')
    files['dogfood/AGENTS.md'] = files['adapters/pi/bootstrap.md']
    files['dogfood/README.md'] = source_bytes(root, 'adapters/pi/dogfood.md')
    files['README.md'] = (
        f'# Workspace Superpowers {version}\n\n'
        'Local PI-Desktop preview. See [installation instructions](adapters/pi/install.md), '
        '[host mappings](adapters/pi/tools.md), and [the real-world trial](dogfood/README.md).\n'
        '\nEdit the source skill pack and rebuild; generated copies are not the source of truth.\n'
    ).encode('utf-8')
    validate_links(files)
    if len(files) > 2000 or sum(map(len, files.values())) > 50 * 1024 * 1024:
        raise ValueError('Package exceeds the PI-Desktop file or byte limit')
    return manifest, files


def validate_links(files):
    for name, data in files.items():
        if not name.endswith('.md'):
            continue
        for target in re.findall(r'\[[^\]]*\]\(([^\s)]+)(?:[^)]*)\)', data.decode('utf-8-sig')):
            if target.startswith(('#', 'http:', 'https:', 'mailto:')):
                continue
            target = target.split('#')[0]
            if not target:
                continue
            resolved = posixpath.normpath(posixpath.join(posixpath.dirname(name), target))
            if resolved not in files:
                raise ValueError(f'Unresolved package reference: {name} -> {target}')


def build(root, output):
    if output.exists() or output.is_symlink():
        raise ValueError(f'Output already exists; choose a fresh --out directory: {output}')
    manifest, files = collect(root)
    # Validate all source content before writing any output. Never delete an old build.
    output.mkdir(parents=True, exist_ok=False)
    folder = output / PLUGIN_ID
    folder.mkdir()
    for name, data in sorted(files.items()):
        destination = folder / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
    filename = f'{PLUGIN_ID}-{manifest["version"]}.piplug'
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
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    (output / f'{filename}.sha256').write_text(f'{digest}  {filename}\n', encoding='utf-8')
    record = {'pluginId': PLUGIN_ID, 'version': manifest['version'], 'archive': filename,
              'sha256': digest, 'skillCount': len(manifest['contributes']['skills']),
              'fileCount': len(files), 'archiveBytes': archive.stat().st_size,
              'validation': 'Archive CRC and all file bytes reopened and checked; runtime dogfooding pending.',
              'files': {name: hashlib.sha256(data).hexdigest() for name, data in sorted(files.items())}}
    (output / 'build-record.json').write_bytes(json_bytes(record))
    return record


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=ROOT)
    parser.add_argument('--out', type=Path, default=ROOT / 'dist/pi')
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
