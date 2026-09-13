import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const WAVE1_SKILLS = [
  'using-workspace-superpowers',
  'reading-artifacts',
  'analyzing-artifacts',
  'editing-documents',
  'verifying-artifacts',
];

export const HARNESS_LEAK = [
  /\bagent\.prompt\.inject\b/,
  /\bagent\.tool\.register\b/,
  /\bmcp_[a-z][a-z0-9_]*/i,
  /\bplugin_pi_[a-z0-9_]+/i,
  /\bTodoWrite\b/,
];

export async function walk(relDir, acc = []) {
  const abs = path.join(ROOT, relDir);
  let entries;
  try {
    entries = await readdir(abs, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return acc;
    throw err;
  }
  for (const entry of entries) {
    const rel = path.join(relDir, entry.name);
    if (entry.isDirectory()) await walk(rel, acc);
    else acc.push(rel.split(path.sep).join('/'));
  }
  return acc;
}

export async function readUtf8(rel) {
  return readFile(path.join(ROOT, rel), 'utf8');
}

export async function exists(rel) {
  try {
    await stat(path.join(ROOT, rel));
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}

export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  const body = text.slice(match[0].length);
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { fm, body, raw: match[1], totalChars: match[1].length };
}

export async function skillFiles() {
  return (await walk('skills')).filter((f) => f.endsWith('/SKILL.md'));
}
