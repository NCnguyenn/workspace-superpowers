// Aggregates per-run grades into a JSON + Markdown report.
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { REPORTS_DIR, ensureDir, nowStamp, writeJSON, writeFileEnsured } from './fsx.mjs';

export function tally(results) {
  const t = { total: results.length, PASS: 0, FAIL: 0, BLOCKED: 0 };
  for (const r of results) t[r.status] = (t[r.status] || 0) + 1;
  return t;
}

function pad(s, n) {
  const str = String(s);
  return str.length >= n ? str : str + ' '.repeat(n - str.length);
}

export async function writeReport({ results, invocation, executorName, mockProfile }) {
  await ensureDir(REPORTS_DIR);
  const stamp = `${nowStamp()}-${randomUUID()}`;
  const t = tally(results);
  const isMock = executorName === 'mock';

  const json = {
    generatedAt: new Date().toISOString(),
    executor: executorName,
    mockProfile: mockProfile || null,
    evidenceClass: isMock
      ? 'HARNESS SELF-TEST (mock). Validates runner+grader mechanics ONLY. NOT behavioral evidence about a real agent or the skill pack.'
      : results.some(r=>r.evidenceClass==='real-api' && r.executionStatus==='completed')
        ? 'REAL API observations; grades may await independent review. Inspect each run status.'
        : 'NO completed behavioral evidence (infrastructure/configuration blocked).',
    invocation,
    tally: t,
    runs: results.map((r) => ({
      runId: r.runId,
      scenarioId: r.scenarioId,
      condition: r.condition,
      executor: r.executor,
      status: r.status,
      reason: r.reason,
      summary: r.summary,
      model: r.model,
      evidenceClass:r.evidenceClass,
      executionStatus:r.executionStatus,
      repeatIndex:r.repeatIndex,
      effort:r.effort,
      protocolSha256:r.protocolSha256,
      inputSha256:r.inputSha256,
      promptSha256:r.promptSha256,
      packSha256:r.packSha256,
      toolsSha256:r.toolsSha256,
      endpointSha256:r.endpointSha256,
      providerModelsSha256:r.providerModelsSha256,
      reviewed:r.reviewed,
      runDir: path.relative(process.cwd(), r.runDir).split(path.sep).join('/'),
    })),
  };
  const jsonPath = path.join(REPORTS_DIR, `report-${stamp}-${executorName}.json`);
  await writeJSON(jsonPath, json);

  const lines = [];
  lines.push(`# Behavioral scenario report — ${executorName.toUpperCase()}`);
  lines.push('');
  lines.push(`- Generated: ${json.generatedAt}`);
  lines.push(`- Executor: **${executorName}**${mockProfile ? ` (profile: ${mockProfile})` : ''}`);
  lines.push(`- Evidence class: ${json.evidenceClass}`);
  lines.push(`- Invocation: \`${invocation}\``);
  lines.push(`- Tally: PASS ${t.PASS} · FAIL ${t.FAIL} · BLOCKED ${t.BLOCKED} · total ${t.total}`);
  lines.push('');
  if (isMock) {
    lines.push('> ⚠️ MOCK RUN. These PASS/FAIL results prove the harness grades correctly;');
    lines.push('> they say NOTHING about whether a real agent, with or without the pack,');
    lines.push('> actually behaves this way. Real baseline/treatment evidence requires the');
    lines.push('> `real` executor against an isolated agent runner (see README).');
    lines.push('');
  }
  lines.push('| Scenario | Condition | Executor | Status | Required pass/total | Reason |');
  lines.push('|---|---|---|---|---|---|');
  for (const r of results) {
    const s = r.summary || {};
    lines.push(`| ${r.scenarioId} | ${r.condition} | ${r.executor} | ${r.status} | ${s.passed ?? 0}/${s.required ?? 0} | ${escapePipe(r.reason || '')} |`);
  }
  lines.push('');
  lines.push('## Per-run criterion detail');
  for (const r of results) {
    lines.push('');
    lines.push(`### ${r.scenarioId} · ${r.condition} · ${r.executor} → ${r.status}`);
    lines.push(`- runId: \`${r.runId}\``);
    if (r.model) lines.push(`- model: ${r.model}`);
    if (r.reason) lines.push(`- reason: ${r.reason}`);
    if (r.criteria && r.criteria.length) {
      lines.push('');
      lines.push('| # | Criterion | Required | Passed | Detail |');
      lines.push('|---|---|---|---|---|');
      r.criteria.forEach((c, i) => {
        lines.push(`| ${i + 1} | ${c.type}${c.id ? ` (${c.id})` : ''} | ${c.required ? 'yes' : 'no'} | ${c.passed ? '✅' : '❌'} | ${escapePipe(c.detail || '')} |`);
      });
    }
  }
  const mdPath = path.join(REPORTS_DIR, `report-${stamp}-${executorName}.md`);
  await writeFileEnsured(mdPath, lines.join('\n') + '\n');

  return { jsonPath, mdPath, tally: t, isMock };
}

function escapePipe(s) {
  return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

export { pad };
