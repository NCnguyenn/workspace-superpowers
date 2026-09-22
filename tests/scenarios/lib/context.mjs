// Builds the per-run instruction context for each experimental condition.
//
//   baseline  -> NO workspace pack. Neutral bootstrap only. Used to observe the
//                failure the pack is meant to prevent.
//   treatment -> the REAL repo AGENTS.md bootstrap + the REAL skills/ catalog,
//                snapshotted into the run dir for reproducibility.
//
// Isolation rule (task §3): a baseline must not silently inherit the pack from
// AGENTS.md, global skills, or session history. This module records the git HEAD
// and working-tree state so a real harness can prove what was and was not loaded,
// and flags any background instruction that cannot be removed here.
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import {
  AGENTS_MD, SKILLS_DIR, copyTree, ensureDir, listFilesRecursive,
  readFileSafe, sha256, writeJSON, writeFileEnsured,
} from './fsx.mjs';

function parseFrontmatter(text) {
  const normalized = (text || '').replace(/^\uFEFF/, '');
  const m = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return fm;
}

function git(args) {
  try {
    return execFileSync('git', args, { cwd: path.resolve(SKILLS_DIR, '..'), encoding: 'utf8', stdio:['ignore','pipe','pipe'] }).trim();
  } catch {
    return null;
  }
}

export function repoFingerprint() {
  const head = git(['rev-parse', 'HEAD']);
  const dirty = git(['status', '--porcelain']);
  return {
    head: head || 'unknown',
    dirtyFiles: dirty ? dirty.split('\n').filter(Boolean) : [],
  };
}

async function snapshotSkills(contextDir) {
  const dest = path.join(contextDir, 'skills');
  await copyTree(SKILLS_DIR, dest);
  const files = await listFilesRecursive(dest, dest);
  const catalog = [];
  for (const rel of files) {
    const abs = path.join(dest, rel);
    const text = await readFileSafe(abs, 'utf8');
    const fm = parseFrontmatter(text);
    catalog.push({
      name: fm.name || rel,
      description: fm.description || '',
      path: `context/skills/${rel}`,
      sha256: sha256(text || ''),
    });
  }
  catalog.sort((a, b) => a.name.localeCompare(b.name));
  return catalog;
}

const BASELINE_BOOTSTRAP = 'Complete the user request using the tools provided.\n';

// Build the context for one run. Returns metadata for the run record.
export async function buildContext(condition, contextDir) {
  await ensureDir(contextDir);
  const fp = repoFingerprint();

  if (condition === 'baseline') {
    await writeFileEnsured(path.join(contextDir, 'bootstrap.md'), BASELINE_BOOTSTRAP);
    await writeJSON(path.join(contextDir, 'catalog.json'), { condition, skills: [] });
    return {
      condition,
      skills: [],
      bootstrap: 'context/bootstrap.md (neutral, no pack)',
      repoHead: fp.head,
      repoDirtyFiles: fp.dirtyFiles,
      isolationWarning:
        'A real baseline must also disable the harness GLOBAL AGENTS.md and any globally '
        + 'installed workspace-superpowers skills, and start a fresh session with no history. '
        + 'This harness cannot disable those from inside the repo; if the real executor cannot '
        + 'guarantee it, the baseline run is contaminated and must be reported as BLOCKED.',
      unremovableBackgroundInstructions:
        'Unknown until executed in a real isolated harness. Record here: global AGENTS.md, '
        + 'global skill catalog, system prompt, prior session history.',
    };
  }

  if (condition !== 'treatment') throw new Error(`unknown condition: ${condition}`);
  // treatment
  const agents = await readFileSafe(AGENTS_MD, 'utf8');
  if (!agents) throw new Error('required AGENTS.md missing');
  await writeFileEnsured(path.join(contextDir, 'bootstrap.md'), agents);
  const catalog = await snapshotSkills(contextDir);
  await writeJSON(path.join(contextDir, 'catalog.json'), { condition, skills: catalog });
  return {
    condition,
    skills: catalog.map((s) => ({ name: s.name, path: s.path, sha256: s.sha256 })),
    bootstrapSha256: sha256(agents),
    snapshotSha256: sha256(JSON.stringify(catalog)),
    bootstrap: 'context/bootstrap.md (repo AGENTS.md)',
    repoHead: fp.head,
    repoDirtyFiles: fp.dirtyFiles,
    note: 'Treatment snapshots the real skills/ tree; skill bodies are loadable from context/skills/.',
  };
}
