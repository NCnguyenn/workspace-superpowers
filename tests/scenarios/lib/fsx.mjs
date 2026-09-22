// Filesystem + path helpers for the behavioral scenario harness.
// Local-only test infrastructure (tests/ is gitignored). Not part of skills/.
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// tests/scenarios/lib/fsx.mjs -> repo root is three levels up.
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

export const SCENARIOS_ROOT = path.join(ROOT, 'tests', 'scenarios');
export const SCENARIOS_DIR = path.join(SCENARIOS_ROOT, 'scenarios');
export const RUNS_DIR = path.join(SCENARIOS_ROOT, 'runs');
export const REPORTS_DIR = path.join(SCENARIOS_ROOT, 'reports');
export const SKILLS_DIR = path.join(ROOT, 'skills');
export const AGENTS_MD = path.join(ROOT, 'AGENTS.md');

export function rel(p) {
  return path.relative(ROOT, p).split(path.sep).join('/');
}

export async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
  return dir;
}

export async function rmrf(target) {
  await rm(target, { recursive: true, force: true });
}

export async function pathExists(p) {
  try {
    await stat(p);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}

export async function readFileSafe(p, enc = 'utf8') {
  try {
    return await readFile(p, enc);
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

export async function writeFileEnsured(p, content) {
  await ensureDir(path.dirname(p));
  await writeFile(p, content);
}

export async function readJSON(p) {
  const text = await readFileSafe(p, 'utf8');
  return text == null ? null : JSON.parse(text);
}

export async function writeJSON(p, value) {
  await writeFileEnsured(p, JSON.stringify(value, null, 2) + '\n');
}

export async function copyTree(src, dest) {
  await ensureDir(dest);
  await cp(src, dest, { recursive: true });
}

export async function listFilesRecursive(dir, base = dir, acc = []) {
  if (!(await pathExists(dir))) return acc;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) await listFilesRecursive(abs, base, acc);
    else acc.push(path.relative(base, abs).split(path.sep).join('/'));
  }
  return acc.sort();
}

export function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

export function nowStamp(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
  );
}
