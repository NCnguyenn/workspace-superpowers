import { existsSync, lstatSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, isAbsolute, join, relative, resolve } from 'node:path';

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.tmp', '.venv', 'vendor', '__pycache__']);
const SECRET_NAME = /(?:^|\/)(?:\.env(?:\..+)?|.+\.(?:pem|key|p12|pfx)|id_rsa(?:\.[^/]+)?|.*(?:secret|credential|password).*)$/i;
const CONTEXT_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*\.md$/;
const LIMITS = {
  maxFiles: 400,
  maxFileBytes: 256 * 1024,
  maxDepth: 8,
  preview: 240,
};

function walk(dir, root, files, skipped, depth = 0) {
  if (depth > LIMITS.maxDepth) {
    skipped.push(relative(root, dir).replaceAll('\\', '/') || '.');
    return;
  }
  let names;
  try {
    names = readdirSync(dir);
  } catch {
    skipped.push(relative(root, dir).replaceAll('\\', '/') || '.');
    return;
  }
  for (const name of names) {
    const abs = join(dir, name);
    const rel = relative(root, abs).replaceAll('\\', '/');
    let st;
    try {
      st = lstatSync(abs);
    } catch {
      skipped.push(rel);
      continue;
    }
    if (st.isSymbolicLink()) {
      skipped.push(rel);
      continue;
    }
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) {
        skipped.push(rel);
        continue;
      }
      walk(abs, root, files, skipped, depth + 1);
      continue;
    }
    files.push(rel);
  }
}

function isSecret(rel) {
  return SECRET_NAME.test(rel);
}

function isWithin(parent, target) {
  const rel = relative(resolve(parent), resolve(target));
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel));
}

function validateContextName(contextName) {
  return typeof contextName === 'string'
    && basename(contextName) === contextName
    && CONTEXT_NAME.test(contextName);
}

function resolvePersistence({
  root,
  authorizedContextFile,
  authorizedOutputRoot,
  adoptedContextFile,
  placementAuthorization,
  contextName,
}) {
  if (!validateContextName(contextName)) {
    return { ok: false, error: 'contextName must be a safe Markdown basename without path separators.' };
  }
  if (adoptedContextFile) {
    const target = resolve(adoptedContextFile);
    if (!existsSync(target)) {
      return { ok: false, error: `adopted context not found: ${target}` };
    }
    if (!authorizedContextFile || resolve(authorizedContextFile) !== target) {
      return { ok: false, error: 'An adopted context requires the exact authorized context path.' };
    }
    if (!['source-project', 'report-workspace'].includes(placementAuthorization)) {
      return { ok: false, error: 'An adopted context requires explicit placement authorization.' };
    }
    if (placementAuthorization === 'source-project' && !isWithin(root, target)) {
      return { ok: false, error: 'The adopted source-project context must remain at its exact authorized path.' };
    }
    return { ok: true, mode: 'editor-handoff', target, placement: placementAuthorization };
  }
  if (authorizedContextFile && authorizedOutputRoot) {
    return { ok: false, error: 'Choose one exact authorized context file or one authorized output root.' };
  }
  if (authorizedContextFile) {
    const target = resolve(authorizedContextFile);
    if (placementAuthorization !== 'source-project' && placementAuthorization !== 'disposable-fixture') {
      return { ok: false, error: 'An exact new context file requires explicit source-project or disposable-fixture placement authorization.' };
    }
    if (existsSync(target)) {
      return { ok: false, error: 'The raw survey writer cannot refresh an existing or adopted context; use the editor handoff.' };
    }
    if (placementAuthorization === 'source-project' && !isWithin(root, target)) {
      return { ok: false, error: 'The authorized source-project context path must be inside the surveyed source project.' };
    }
    return { ok: true, mode: 'create', target, placement: placementAuthorization };
  }
  if (authorizedOutputRoot) {
    if (placementAuthorization !== 'report-workspace') {
      return { ok: false, error: 'An output root requires explicit report-workspace placement authorization.' };
    }
    const outputRoot = resolve(authorizedOutputRoot);
    if (isWithin(root, outputRoot)) {
      return { ok: false, error: 'A report-workspace output root cannot default a context inside the source project.' };
    }
    const target = join(outputRoot, contextName);
    if (existsSync(target)) {
      return { ok: false, error: 'The raw survey writer cannot refresh an existing or adopted context; use the editor handoff.' };
    }
    return { ok: true, mode: 'create', target, placement: placementAuthorization };
  }
  return { ok: true, mode: 'read-only', target: null };
}

function renderContext(filesRead, skipped, secretPaths, unread, excerpts) {
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
    ...unread.map((rel) => `- \`${rel}\` (unread: size, binary, limit, or read error)`),
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
  return lines.join('\n');
}

export function surveyProject({
  root,
  runTests = false,
  contextName = 'project-context.md',
  authorizedContextFile = null,
  authorizedOutputRoot = null,
  adoptedContextFile = null,
  placementAuthorization = null,
} = {}) {
  if (!root) return { ok: false, error: 'root is required' };
  if (runTests) {
    return {
      ok: false,
      error: 'Running tests is not authorized during project survey without explicit permission.',
    };
  }
  const sourceRoot = resolve(root);
  if (!existsSync(sourceRoot)) return { ok: false, error: `project root not found: ${sourceRoot}` };

  const persistence = resolvePersistence({
    root: sourceRoot,
    authorizedContextFile,
    authorizedOutputRoot,
    adoptedContextFile,
    placementAuthorization,
    contextName,
  });
  if (!persistence.ok) return persistence;

  try {
    const files = [];
    const skipped = [];
    walk(sourceRoot, sourceRoot, files, skipped);

    const excludedContext = persistence.target && isWithin(sourceRoot, persistence.target)
      ? relative(sourceRoot, persistence.target).replaceAll('\\', '/')
      : null;
    const filesRead = [];
    const excerpts = [];
    const unread = [];
    for (const rel of files) {
      if (rel === excludedContext || isSecret(rel)) continue;
      if (filesRead.length >= LIMITS.maxFiles) {
        unread.push(rel);
        continue;
      }
      const abs = join(sourceRoot, rel);
      let st;
      try {
        st = statSync(abs);
      } catch {
        unread.push(rel);
        continue;
      }
      if (st.size > LIMITS.maxFileBytes) {
        unread.push(rel);
        continue;
      }
      try {
        const buf = readFileSync(abs);
        if (buf.includes(0)) {
          unread.push(rel);
          continue;
        }
        const text = buf.toString('utf8');
        filesRead.push(rel);
        excerpts.push({ path: rel, bytes: text.length, preview: text.slice(0, LIMITS.preview) });
      } catch {
        unread.push(rel);
      }
    }

    const secretPaths = files.filter((rel) => isSecret(rel));
    const content = renderContext(filesRead, skipped, secretPaths, unread, excerpts);
    const result = {
      ok: true,
      contextFile: persistence.target,
      filesRead,
      skipped: [...skipped, ...secretPaths, ...unread],
      wrote: [],
      persistence: { mode: persistence.mode, placement: persistence.placement ?? null },
    };
    if (persistence.mode === 'create') {
      writeFileSync(persistence.target, content, { encoding: 'utf8', flag: 'wx' });
      result.wrote.push(persistence.target);
    } else if (persistence.mode === 'editor-handoff') {
      result.persistence.content = content;
      result.persistence.target = persistence.target;
    }
    return result;
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

function parseArgs(argv) {
  const out = { root: null, runTests: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--root') out.root = argv[++i];
    else if (argv[i] === '--run-tests') out.runTests = true;
    else if (argv[i] === '--context-file') out.authorizedContextFile = argv[++i];
    else if (argv[i] === '--output-root') out.authorizedOutputRoot = argv[++i];
    else if (argv[i] === '--adopted-context') out.adoptedContextFile = argv[++i];
    else if (argv[i] === '--placement') out.placementAuthorization = argv[++i];
    else if (argv[i] === '--context-name') out.contextName = argv[++i];
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1].replaceAll('\\', '/')}` || process.argv[1]?.endsWith('project-survey.mjs')) {
  const args = parseArgs(process.argv.slice(2));
  const result = surveyProject(args);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(result.ok ? 0 : 2);
}
