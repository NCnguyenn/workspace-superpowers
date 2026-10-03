import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_PACKAGE_ROOT = resolve(here, '..', '..');
const SKILL_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const READABLE_AREAS = new Set(['references', 'templates']);

function packagePath(packageRoot, ...parts) {
  const root = resolve(packageRoot);
  const candidate = resolve(root, ...parts);
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
    throw new Error('Requested path escapes the package root');
  }
  return candidate;
}

function readRegularFile(path) {
  const stat = lstatSync(path);
  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw new Error('Requested content is not a regular package file');
  }
  return readFileSync(path, 'utf8');
}

function pathKey(path) {
  return process.platform === 'win32' ? path.toLowerCase() : path;
}

function safeResourcePath(root, candidate) {
  const lexicalRoot = resolve(root);
  const lexicalCandidate = resolve(candidate);
  const realRoot = realpathSync(lexicalRoot);
  const realCandidate = realpathSync(lexicalCandidate);
  const realRelative = relative(realRoot, realCandidate);
  if (realRelative === '..' || realRelative.startsWith(`..${sep}`)) {
    throw new Error('Requested path escapes package area through a symbolic link');
  }
  if (pathKey(lexicalCandidate) !== pathKey(realCandidate)) {
    throw new Error('Requested path uses a symbolic link or reparse point');
  }
  return realCandidate;
}

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

function parseSkill(text, id) {
  const match = text.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error(`Skill ${id} has no frontmatter`);
  const fields = Object.fromEntries(match[1].split(/\r?\n/).flatMap((line) => {
    const index = line.indexOf(':');
    return index === -1 ? [] : [[line.slice(0, index).trim(), line.slice(index + 1).trim()]];
  }));
  if (fields.name !== id || !fields.description) {
    throw new Error(`Skill ${id} has invalid metadata`);
  }
  return { description: fields.description.replace(/^['"]|['"]$/g, '') };
}

export function listSkills(packageRoot = DEFAULT_PACKAGE_ROOT) {
  const root = packagePath(packageRoot, 'skills');
  const skills = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || !SKILL_ID.test(entry.name)) continue;
    const text = readRegularFile(packagePath(packageRoot, 'skills', entry.name, 'SKILL.md'));
    const metadata = parseSkill(text, entry.name);
    skills.push({ id: entry.name, description: metadata.description, sha256: sha256(text) });
  }
  return skills.sort((left, right) => left.id.localeCompare(right.id));
}

export function getSkill(id, packageRoot = DEFAULT_PACKAGE_ROOT) {
  if (!SKILL_ID.test(id) || !listSkills(packageRoot).some((skill) => skill.id === id)) {
    throw new Error('Unknown skill ID');
  }
  const text = readRegularFile(packagePath(packageRoot, 'skills', id, 'SKILL.md'));
  const metadata = parseSkill(text, id);
  return { id, description: metadata.description, sha256: sha256(text), text };
}

export function getStaticContent(area, path, packageRoot = DEFAULT_PACKAGE_ROOT) {
  if (!READABLE_AREAS.has(area) || typeof path !== 'string' || !path.endsWith('.md')) {
    throw new Error('Unknown read-only package resource');
  }
  const normalized = path.replace(/\\/g, '/');
  if (!normalized || normalized.split('/').some((part) => !part || part === '.' || part === '..')) {
    throw new Error('Invalid package resource path');
  }
  const file = packagePath(packageRoot, area, ...normalized.split('/'));
  const root = packagePath(packageRoot, area);
  if (relative(root, file).startsWith('..')) throw new Error('Requested path escapes package area');
  safeResourcePath(root, file);
  const text = readRegularFile(file);
  return { area, path: normalized, sha256: sha256(text), text };
}

export function capabilityRecord(packageRoot = DEFAULT_PACKAGE_ROOT) {
  const skills = listSkills(packageRoot);
  return {
    package: 'workspace-superpowers',
    skillCount: skills.length,
    contentAccess: 'read-only packaged skills, references, and templates',
    unavailable: [
      'arbitrary filesystem access',
      'filesystem writes',
      'shell execution',
      'network access',
      'credentials',
      'office automation',
    ],
  };
}
