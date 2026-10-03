"""Inspect local Antigravity Desktop and CLI evidence without changing configuration."""
import argparse
import json
import os
import subprocess
import sys
from pathlib import Path


def read_version_from_uninstall_key():
    try:
        import winreg
    except ImportError:
        return []
    records = []
    roots = (winreg.HKEY_CURRENT_USER, winreg.HKEY_LOCAL_MACHINE)
    subkey = r'Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall'
    for root in roots:
        try:
            with winreg.OpenKey(root, subkey) as parent:
                for index in range(winreg.QueryInfoKey(parent)[0]):
                    try:
                        with winreg.OpenKey(parent, winreg.EnumKey(parent, index)) as key:
                            name = winreg.QueryValueEx(key, 'DisplayName')[0]
                            if 'Antigravity' not in name:
                                continue
                            try:
                                display_icon = winreg.QueryValueEx(key, 'DisplayIcon')[0]
                            except OSError:
                                display_icon = None
                            records.append({
                                'displayName': name,
                                'displayVersion': winreg.QueryValueEx(key, 'DisplayVersion')[0],
                                'displayIcon': display_icon,
                            })
                    except OSError:
                        continue
        except OSError:
            continue
    return records


def run(command):
    result = subprocess.run(command, text=True, capture_output=True, check=False)
    return {'command': command, 'exitCode': result.returncode, 'stdout': result.stdout, 'stderr': result.stderr}


def probe():
    local = Path(os.environ.get('LOCALAPPDATA', ''))
    agy = local / 'agy' / 'bin' / 'agy.exe'
    docs_candidates = [
        local / 'gemini' / 'antigravity' / 'builtin' / 'skills' / 'agy-customizations' / 'docs',
        Path.home() / '.gemini' / 'antigravity' / 'builtin' / 'skills' / 'agy-customizations' / 'docs',
    ]
    docs = next((candidate for candidate in docs_candidates if candidate.is_dir()), docs_candidates[0])
    report = {
        'targetDesktopVersion': '2.19.1',
        'desktopInstallations': read_version_from_uninstall_key(),
        'agyExecutable': str(agy),
        'agyPresent': agy.is_file(),
        'pluginDocs': {},
        'classification': 'unverified',
    }
    if agy.is_file():
        report['agyVersion'] = run([str(agy), '--version'])
        report['agyPluginHelp'] = run([str(agy), 'plugin', '--help'])
    for name in ('plugins.md', 'skills.md', 'rules.md'):
        path = docs / name
        report['pluginDocs'][name] = {'path': str(path), 'present': path.is_file()}
    if any(item.get('displayVersion') == '2.19.1' for item in report['desktopInstallations']):
        report['classification'] = 'target version detected; package activation remains untested'
    elif report['desktopInstallations']:
        report['classification'] = 'different Desktop version detected; do not claim 2.19.1 compatibility'
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', type=Path)
    args = parser.parse_args()
    report = probe()
    data = json.dumps(report, ensure_ascii=False, indent=2) + '\n'
    if args.out:
        if args.out.exists() or args.out.is_symlink():
            print(f'Probe failed: output already exists: {args.out}', file=sys.stderr)
            return 1
        args.out.write_text(data, encoding='utf-8')
    print(data, end='')
    return 0


if __name__ == '__main__':
    sys.exit(main())
