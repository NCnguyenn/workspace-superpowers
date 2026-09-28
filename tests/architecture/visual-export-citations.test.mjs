import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { exists, readUtf8 } from './helpers.mjs';

const SHARED = 'references/visual-assets-and-word-fidelity.md';
const MD_LINK = /\[[^\]]+\]\(([^)]+)\)/g;

function links(text, rel) {
  return [...text.matchAll(MD_LINK)]
    .map(([, href]) => href.split('#')[0])
    .filter(Boolean)
    .map((href) => path.posix.normalize(path.posix.join(path.posix.dirname(rel), href)));
}

test('shared visual and Word fidelity contract exists and is reachable', async () => {
  assert.equal(await exists(SHARED), true, `${SHARED} missing`);
  const consumers = [
    'references/criteria-writing-contract.md',
    'references/outline-structure.md',
    'skills/working-with-visuals/SKILL.md',
    'skills/planning-work/SKILL.md',
    'skills/drafting-prose/SKILL.md',
    'skills/editing-documents/SKILL.md',
    'skills/citing-sources/SKILL.md',
    'skills/researching-sources/SKILL.md',
    'skills/converting-artifacts/SKILL.md',
    'skills/formatting-layout/SKILL.md',
    'skills/verifying-artifacts/SKILL.md',
    'skills/verifying-artifacts/references/artifact-verification.md',
    'adapters/pi/tools.md',
    'templates/brief.md',
    'templates/outline.md',
    'templates/deliverable-contract.md',
  ];
  for (const rel of consumers) {
    const text = await readUtf8(rel);
    assert.ok(links(text, rel).includes(SHARED), `${rel} must link the shared contract`);
  }
});

test('visual decisions are conditional and preserve provenance states', async () => {
  const contract = (await readUtf8(SHARED)).replace(/\s+/g, ' ');
  for (const marker of [
    'Not needed',
    'rubric',
    'explanatory value',
    'external theoretical',
    'original explanatory',
    'adapted',
    'user project screenshot',
    'illustrative placeholder',
    'proposed',
    'verified',
    'blocked',
    'host display',
    'do not fabricate',
  ]) assert.match(contract, new RegExp(marker, 'i'), marker);
  assert.match(contract, /preview[\s\S]*unavailable|unavailable[\s\S]*preview/i);
  assert.match(contract, /permission|reuse condition|license/i);
  assert.match(contract, /30[–-]40%[\s\S]*asset quota|asset quota[\s\S]*30[–-]40%/i);
});

test('citation and Word contracts distinguish source states and verification layers', async () => {
  const contract = (await readUtf8(SHARED)).replace(/\s+/g, ' ');
  for (const marker of [
    'proposed source',
    'verified source',
    'actually cited',
    'claim–source',
    'native Word table',
    'image relationship',
    'caption',
    'placement',
    'template',
    'render',
    'native PI-Desktop',
  ]) assert.match(contract, new RegExp(marker, 'i'), marker);
  assert.match(contract, /wp:inline/);
  assert.match(contract, /working revision does not require new content approval/);
  assert.match(contract, /after the explanatory paragraph only when that position is specified/);
  assert.match(contract, /Analysis approval and detailed-outline approval remain separate/);
  assert.match(contract, /Deliver the full draft[\s\S]*ask for review[\s\S]*wait before the next section/);

  const citing = await readUtf8('skills/citing-sources/SKILL.md');
  assert.match(citing, /Harvard[\s\S]*fallback/i);
  assert.match(citing, /proposed[\s\S]*verified[\s\S]*cited/i);
  assert.match(citing, /figure|table[\s\S]*attribution/i);
  assert.match(citing, /license|reuse/i);

  const converting = await readUtf8('skills/converting-artifacts/SKILL.md');
  assert.match(converting, /w:tbl|native Word table/i);
  assert.match(converting, /image relationship|media/i);
  assert.match(converting, /wp:inline|inline drawing/i);
  assert.match(converting, /placement|position/i);
  assert.match(converting, /template|rubric/i);

  const verifying = await readUtf8('skills/verifying-artifacts/references/artifact-verification.md');
  const verifyingNormalized = verifying.replace(/\s+/g, ' ');
  assert.match(verifying, /w:tbl|table cells/i);
  assert.match(verifying, /image relationship|media/i);
  assert.match(verifying, /render/i);
  assert.match(verifying, /native PI|runtime/i);
  assert.doesNotMatch(verifying, /\bapproved order\b/i);
  assert.match(verifyingNormalized, /selected revision.*working\/approved status.*requested order\/placement/i);
  assert.match(verifyingNormalized, /working revision may be exported and verified without fabricating or granting approval/i);
});

test('template formatting takes precedence and missing capabilities stay explicit', async () => {
  for (const rel of [
    'skills/formatting-layout/SKILL.md',
    'skills/converting-artifacts/SKILL.md',
    'skills/verifying-artifacts/SKILL.md',
    'adapters/pi/tools.md',
  ]) {
    const text = await readUtf8(rel);
    assert.match(text, /template|rubric/i, rel);
    assert.match(text, /unavailable|unsupported|unverified|blocked/i, rel);
  }
  const tools = await readUtf8('adapters/pi/tools.md');
  assert.match(tools, /discover|inspect.*capabilit/i);
  assert.match(tools, /do not hard-code|not assume|not.*proof/i);
});

test('completed-work routes remain ahead of generic inspection and are not reopened', async () => {
  const route = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  assert.match(route, /completed-assignment read-back/i);
  assert.match(route, /skip new intake\/scoping/i);

  const closure = await readUtf8('test-issues/2026-09-24-doc-bai-da-lam.md');
  assert.match(closure, /Closure review[^\n]*APPROVED/i);
  assert.match(closure, /native PI[^\n]*PENDING/i);
  assert.doesNotMatch(closure, /visuals.*APPROVED|Word.*APPROVED/i);
});

test('manual negative scenarios cover the requested regression boundaries', async () => {
  const rel = 'tests/scenarios/manual/visual-export-citations.md';
  assert.equal(await exists(rel), true, `${rel} missing`);
  const text = await readUtf8(rel);
  for (const id of ['VE01', 'VE02', 'VE03', 'VE04', 'VE05', 'VE06', 'VE07', 'VE08', 'VE09']) {
    assert.match(text, new RegExp(`\\b${id}\\b`), id);
  }
  const cases = new Map(text.split('\n').filter(line => /^\| VE\d+ \|/.test(line))
    .map(line => [line.split('|')[1].trim(), line]));
  for (const [id, expectation] of [
    ['VE01', /Not needed/],
    ['VE02', /required project screenshot.*absent.*blocked/i],
    ['VE03', /unavailable preview.*unapproved\/unverified/i],
    ['VE04', /never verified or cited.*exclude.*final References/i],
    ['VE05', /non-Harvard.*Preserve/i],
    ['VE06', /template.*conflicts.*authoritative.*do not impose defaults/i],
    ['VE07', /swaps.*loses.*Fail structural fidelity/i],
    ['VE08', /completed assignment.*narrow comparison/i],
    ['VE09', /working\/unapproved revision.*preserve.*status.*do not.*approval/i],
  ]) assert.match(cases.get(id), expectation, id);
  const workingCase = cases.get('VE09').split('|');
  assert.match(workingCase[2], /R23.*working\/unapproved revision.*different.*approved revision/i);
  for (const expectation of [
    /preserve the requested revision and its working\/approved status/i,
    /do not require or grant content approval/i,
    /table cells.*media identity.*inline drawing.*caption\/source.*placement.*template formatting/i,
    /missing capability limits only.*affected.*check/i,
  ]) assert.match(workingCase[3], expectation);
  assert.match(text, /Structural PASS\*\*, not Behavioral PASS/i);
  assert.match(text, /PENDING/i);
  const trial = await readUtf8('adapters/pi/routing-trial.md');
  for (const id of ['R20', 'R21', 'R22', 'R23']) {
    assert.match(trial, new RegExp(`\\| ${id} \\| PENDING \\|`), id);
  }
  const r23 = trial.split('\n').find(line => line.startsWith('| R23 DOCX'));
  assert.ok(r23, 'R23 routing case missing');
  const [, , setup, expected] = r23.split('|');
  assert.match(setup, /run both variants/i);
  assert.match(setup, /requested approved revision/i);
  assert.match(setup, /requested working\/unapproved revision/i);
  assert.doesNotMatch(setup, /Supply approved content/i);
  for (const expectation of [
    /preserve the requested revision/i,
    /preserve[^.;]*its working\/approved status/i,
    /do not (?:grant|auto-?grant|automatically grant) approval/i,
    /without requiring new content approval/i,
    /table cells|native Word tables/i,
    /media identity/i,
    /wp:inline|inline drawing/i,
    /caption.*source|source.*caption/i,
    /placement/i,
    /template formatting/i,
    /missing capability.*affected/i,
  ]) assert.match(expected, expectation);
});
