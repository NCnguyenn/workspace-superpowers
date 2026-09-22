import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function testFiles(dir) {
  return readdirSync(dir)
    .filter((name) => name.endsWith('.test.mjs'))
    .map((name) => join(dir, name));
}

const files = [
  ...testFiles(join(root, 'tests', 'architecture')),
];
for (const host of readdirSync(join(root, 'adapters'))) {
  const dir = join(root, 'adapters', host);
  try {
    files.push(...testFiles(dir));
  } catch {
    // skip non-directory adapter entries
  }
}
files.sort();
if (files.length === 0) {
  process.stderr.write('No test files found.\n');
  process.exit(1);
}

const result = spawnSync(process.execPath, ['--test', ...files], {
  cwd: root,
  stdio: 'inherit',
});
process.exit(result.status ?? 1);
