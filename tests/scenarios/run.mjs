#!/usr/bin/env node
// Behavioral scenario runner.
//
//   node tests/scenarios/run.mjs [--executor=real|mock] [--scenario=id]
//        [--condition=baseline|treatment|both] [--repeat=N]
//        [--mock-profile=compliant|noncompliant|error] [--model=ID] [--effort=X]
//
// Default executor is `real`: with no isolated agent runner configured
// (WS_AGENT_CMD unset) every run is graded BLOCKED — never PASS. Use
// `--executor=mock` ONLY to exercise the harness itself (see README + selftest).
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { getExecutor } from './lib/executor.mjs';
import { grade } from './lib/grader.mjs';
import { writeReport } from './lib/report.mjs';
import { loadAllScenarios, loadScenario, prepareRun, treeHash } from './lib/scenario.mjs';
import { rel, writeFileEnsured, sha256 } from './lib/fsx.mjs';

function parseArgs(argv) {
  const opts = {
    executor: 'real',
    scenarios: [],
    condition: 'both',
    repeat: 1,
    mockProfile: 'compliant',
    model: process.env.WS_MODEL || 'unknown',
    effort: process.env.WS_EFFORT || 'unknown',
  };
  for (const arg of argv) {
    const equals=arg.indexOf('=');
    const [k, v] = arg.startsWith('--') ? [arg.slice(2,equals<0?undefined:equals),equals<0?undefined:arg.slice(equals+1)] : [null, null];
    switch (k) {
      case 'executor': opts.executor = v; break;
      case 'scenario': opts.scenarios.push(...String(v).split(',').map((s) => s.trim()).filter(Boolean)); break;
      case 'condition': opts.condition = v; break;
      case 'repeat': opts.repeat = Math.max(1, parseInt(v, 10) || 1); break;
      case 'mock-profile': opts.mockProfile = v; break;
      case 'model': opts.model = v; break;
      case 'effort': opts.effort = v; break;
      default: break;
    }
  }
  return opts;
}

export async function runScenarios(opts) {
  if(!['baseline','treatment','both'].includes(opts.condition)) throw new Error('invalid condition');
  if(!Number.isInteger(opts.repeat) || opts.repeat<1 || opts.repeat>20) throw new Error('repeat must be 1..20');
  const executor = getExecutor(opts.executor);
  const conditions = opts.condition === 'both' ? ['baseline', 'treatment'] : [opts.condition];

  const all = opts.scenarios.length
    ? await Promise.all(opts.scenarios.map((id) => loadScenario(id)))
    : await loadAllScenarios();

  const results = [];
  for (const scenario of all) {
    for (let r = 1; r <= opts.repeat; r += 1) {
      for (const condition of r % 2 ? conditions : [...conditions].reverse()) {
        const prepared = await prepareRun({
          scenario,
          condition,
          repeatIndex: r,
          executorName: executor.name,
          modelConfig: { model: opts.model, effort: opts.effort },
        });

        const logLines = [];
        const log = (msg) => logLines.push(`[${new Date().toISOString()}] ${msg}`);
        log(`run ${prepared.runId} scenario=${scenario.id} condition=${condition} executor=${executor.name} repeat=${r}`);

        let transcript;
        try {
          transcript = await executor.run({
            scenario,
            runDir: prepared.runDir,
            inputDir: prepared.inputDir,
            outputDir: prepared.outputDir,
            contextDir: prepared.contextDir,
            condition,
            mockProfile: opts.mockProfile,
            modelConfig: { model: opts.model, effort: opts.effort },
          });
        } catch (err) {
          transcript = { executor: executor.name, status: 'error', error: `executor threw: ${err.message}`, events: [] };
        }
        log(`executor status=${transcript.status}${transcript.error ? ` error=${transcript.error}` : ''}`);

        transcript.artifactSha256=await treeHash(prepared.outputDir);
        transcript.inputSha256=await treeHash(prepared.inputDir);
        transcript.contextSha256=await treeHash(prepared.contextDir);
        await writeFileEnsured(path.join(prepared.runDir, 'transcript.json'), JSON.stringify(transcript, null, 2) + '\n');

        // Synthetic adjudication is permitted ONLY for explicitly labeled mock
        // self-tests. Genuine final reports require independent review later.
        const review=executor.name==='mock'?{
          reviewer:'mock-fixture (NOT real adjudication)',transcriptSha256:sha256(JSON.stringify(transcript)),rubricSha256:sha256(JSON.stringify(scenario.rubric)),
          criteria:Object.fromEntries(scenario.rubric.criteria.filter(c=>c.type==='final_review').map(c=>[c.id,{passed:opts.mockProfile!=='noncompliant',evidence:'Synthetic verdict for deterministic mock profile only.'}]))
        }:undefined;
        await writeFileEnsured(path.join(prepared.runDir,'rubric.json'),JSON.stringify(scenario.rubric,null,2)+'\n');
        const graded = await grade(scenario.rubric, { runDir: prepared.runDir, transcript, review });
        log(`grade status=${graded.status} reason=${graded.reason}`);
        await writeFileEnsured(path.join(prepared.runDir, 'grade.json'), JSON.stringify(graded, null, 2) + '\n');
        await writeFileEnsured(path.join(prepared.runDir, 'run.log'), logLines.join('\n') + '\n');

        results.push({
          runId: prepared.runId,
          runDir: prepared.runDir,
          scenarioId: scenario.id,
          condition,
          executor: executor.name,
          status: graded.status,
          reason: graded.reason,
          summary: graded.summary,
          criteria: graded.criteria,
          model: transcript.model || opts.model,
          evidenceClass:transcript.evidenceClass || 'no-behavioral-evidence',
          executionStatus:transcript.status,
          repeatIndex:r,
          effort:transcript.effort || opts.effort,
          protocolSha256:prepared.runMeta.protocolSha256,
          inputSha256:prepared.runMeta.inputSha256,
          promptSha256:prepared.runMeta.promptSha256,
          packSha256:prepared.runMeta.packSha256,
          toolsSha256:transcript.isolation?.toolsSha256,
          endpointSha256:transcript.endpointSha256,
          providerModelsSha256:sha256(JSON.stringify(transcript.providerModels || [])),
          reviewed:executor.name==='mock',
        });
        const flag = graded.status === 'PASS' ? '✅' : graded.status === 'FAIL' ? '❌' : '⛔';
        console.log(`${flag} ${scenario.id} · ${condition} · ${executor.name} → ${graded.status} (${graded.summary?.passed ?? 0}/${graded.summary?.required ?? 0}) ${graded.status !== 'PASS' ? `— ${graded.reason}` : ''}`);
      }
    }
  }

  const invocation = `node ${rel(fileURLToPath(import.meta.url))} ${process.argv.slice(2).join(' ')}`.trim();
  const report = await writeReport({ results, invocation, executorName: executor.name, mockProfile: opts.executor === 'mock' ? opts.mockProfile : null });
  return { results, report };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const { results, report } = await runScenarios(opts);
  const t = report.tally;
  console.log('');
  console.log(`Report: ${rel(report.mdPath)}`);
  console.log(`Tally: PASS ${t.PASS} · FAIL ${t.FAIL} · BLOCKED ${t.BLOCKED} · total ${t.total}`);
  if (report.isMock) {
    console.log('NOTE: mock executor — harness self-test only, NOT behavioral evidence.');
  } else if (t.BLOCKED > 0 && t.PASS === 0 && t.FAIL === 0) {
    console.log('NOTE: runs are BLOCKED; inspect individual reasons (configuration, infrastructure or pending review).');
  }
  // Non-zero exit only on genuine behavioral FAIL; BLOCKED is inconclusive, not failure.
  process.exitCode = t.BLOCKED > 0 ? 2 : t.FAIL > 0 ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 2;
  });
}
