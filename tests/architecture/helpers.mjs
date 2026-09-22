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

export const CORE_LIFECYCLE_SKILLS = [
  'using-workspace-superpowers',
  'scoping-the-brief',
  'reading-artifacts',
  'analyzing-artifacts',
  'planning-work',
  'editing-documents',
  'reviewing-work',
  'verifying-artifacts',
  'packaging-deliverables',
];

export const RESEARCH_SKILLS = [
  'researching-sources',
  'citing-sources',
];

export const OFFICE_SPECIALIST_SKILLS = [
  'working-with-pdf',
  'working-with-spreadsheets',
  'auditing-formulas',
];

export const DOCUMENT_SPECIALIST_SKILLS = [
  'formatting-layout',
];

export const TRANSFORM_SPECIALIST_SKILLS = [
  'converting-artifacts',
];

export const PRESENTATION_SPECIALIST_SKILLS = [
  'working-with-presentations',
  'storyboarding-slides',
];

export const VISUAL_SPECIALIST_SKILLS = [
  'working-with-visuals',
];

export const PROSE_SKILLS = [
  'drafting-prose',
  'writing-reports',
  'writing-academic-prose',
];

export const SHIPPED_SKILLS = [
  ...CORE_LIFECYCLE_SKILLS,
  ...RESEARCH_SKILLS,
  ...OFFICE_SPECIALIST_SKILLS,
  ...DOCUMENT_SPECIALIST_SKILLS,
  ...TRANSFORM_SPECIALIST_SKILLS,
  ...PRESENTATION_SPECIALIST_SKILLS,
  ...VISUAL_SPECIALIST_SKILLS,
  ...PROSE_SKILLS,
  'working-with-mathematics',
];

/** Substrings forbidden anywhere under skills/. Plan list plus extra harness APIs. */
export const HARNESS_LEAK = [
  'agent.prompt.inject',
  'agent.tool.register',
  'mcp_',
  'plugin_pi_',
  'TodoWrite',
];

/** Abstract capability identifiers from design §11. Skills and roles may name only these. */
export const CAPABILITY_NAMES = [
  'invoke_skill',
  'delegate',
  'inspect_document',
  'inspect_pdf',
  'edit_document',
  'extract_pdf_text',
  'render_document',
  'extract_pdf_tables',
  'extract_pdf_images',
  'ocr_scanned_document',
  'annotate_pdf',
  'merge_pdfs',
  'split_pdf',
  'inspect_presentation',
  'edit_presentation',
  'render_presentation',
  'inspect_spreadsheet',
  'edit_spreadsheet',
  'recalculate_spreadsheet',
  'audit_spreadsheet',
  'create_chart_spreadsheet',
  'inspect_image',
  'edit_image',
  'inspect_layered_image',
  'edit_layered_image',
  'render_image',
  'search_web',
  'search_academic',
  'read_reference_documentation',
  'export_artifact',
  'convert_artifact',
  'verify_artifact',
  'list_files',
  'read_file',
  'write_file',
  'evaluate_math',
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

export async function agentFiles() {
  return (await walk('agents')).filter((f) => /\.md$/i.test(f));
}

export async function templateFiles() {
  return (await walk('templates')).filter((f) => /\.md$/i.test(f));
}
