import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.tmp']);
const SECRET_NAME = /(?:^|\/)(?:\.env|.*secret.*|\.pem|\.key)$/i;

function walk(dir, root, files, skipped) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const rel = relative(root, abs).replaceAll('\\', '/');
    const st = statSync(abs);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) {
        skipped.push(rel);
        continue;
      }
      walk(abs, root, files, skipped);
      continue;
    }
    files.push(rel);
  }
}

function isSecret(rel) {
  return SECRET_NAME.test(rel);
}

export function surveyProject({ root, runTests = false, contextName = 'project-context.md' } = {}) {
  if (!root) return { ok: false, error: 'root is required' };
  if (runTests) {
    return {
      ok: false,
      error: 'Running tests is not authorized during project survey without explicit permission.',
    };
  }
  if (!existsSync(root)) return { ok: false, error: `project root not found: ${root}` };

  const files = [];
  const skipped = [];
  walk(root, root, files, skipped);

  const filesRead = [];
  const excerpts = [];
  for (const rel of files) {
    if (rel === contextName || isSecret(rel)) continue;
    const abs = join(root, rel);
    const text = readFileSync(abs, 'utf8');
    filesRead.push(rel);
    excerpts.push({ path: rel, bytes: text.length, preview: text.slice(0, 240) });
  }

  const secretPaths = files.filter((rel) => isSecret(rel));
  const contextFile = join(root, contextName);
  const now = new Date().toISOString();
  const lines = [
    '# Derived project context',
    '',
    'This file is derived survey memory, not original project evidence. Claims must keep locators to inspected sources.',
    '',
    `Recorded: ${now}`,
    '',
    '## Inspected files',
    ...filesRead.map((rel) => `- \`${rel}\``),
    '',
    '## Skipped / uninspected',
    ...skipped.map((rel) => `- \`${rel}\` (dependency or generated tree; not fully inspected)`),
    ...secretPaths.map((rel) => `- \`${rel}\` (secret-like filename; contents not copied)`),
    '',
    '## Source excerpts (non-secret)',
    ...excerpts.flatMap((item) => [
      `### ${item.path}`,
      '',
      '```',
      item.preview.trimEnd(),
      '```',
      '',
    ]),
    '## Conflicts',
    '',
    'README and source must be compared separately. A README claim is not proof of implementation.',
    '',
  ];
  writeFileSync(contextFile, lines.join('\n'), 'utf8');

  return {
    ok: true,
    contextFile,
    filesRead,
    skipped: [...skipped, ...secretPaths],
    wrote: [contextName],
  };
}

function parseArgs(argv) {
  const out = { root: null, runTests: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--root') out.root = argv[++i];
    else if (argv[i] === '--run-tests') out.runTests = true;
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1].replaceAll('\\', '/')}` || process.argv[1]?.endsWith('project-survey.mjs')) {
  const args = parseArgs(process.argv.slice(2));
  const result = surveyProject(args);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(result.ok ? 0 : 2);
}
