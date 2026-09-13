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

/** Substrings forbidden anywhere under skills/. Plan list plus extra harness APIs. */
export const HARNESS_LEAK = [
  'agent.prompt.inject',
  'agent.tool.register',
  'mcp_',
  'plugin_pi_',
  'TodoWrite',
];

export function allowPartial() {
  return process.env.WS_ALLOW_PARTIAL === '1';
}

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

export async function skillDirs() {
  const abs = path.join(ROOT, 'skills');
  let entries;
  try {
    entries = await readdir(abs, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

export function parseFrontmatter(text) {
  const normalized = text.replace(/^\uFEFF/, '');
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  const body = normalized.slice(match[0].length);
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { fm, body, raw: match[1], totalChars: match[1].length };
}

export async function skillFiles() {
  return (await walk('skills')).filter((f) => /\/SKILL\.md$/i.test(f));
}
