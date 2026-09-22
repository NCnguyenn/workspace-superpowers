// Scenario loading + per-run isolation.
//
// Each run gets a fresh, self-contained directory:
//   runs/<runId>/input/     copies of the scenario fixtures (read-only intent)
//   runs/<runId>/output/    the agent's produced artifacts (graded)
//   runs/<runId>/context/   baseline|treatment bootstrap + skill snapshot
//   runs/<runId>/prompt.txt exact prompt given to the agent (no rubric, no answers)
//   runs/<runId>/run-meta.json  reproducibility metadata
//   runs/<runId>/transcript.json, grade.json, run.log  written during/after the run
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { buildContext } from './context.mjs';
import {
  RUNS_DIR, SCENARIOS_DIR, copyTree, ensureDir, listFilesRecursive,
  nowStamp, pathExists, readJSON, readFileSafe, writeFileEnsured, sha256, ROOT, SKILLS_DIR, AGENTS_MD, SCENARIOS_ROOT,
} from './fsx.mjs';

// Environment preamble shared by every scenario. It states ONLY the filesystem
// layout of the sandbox — never the expected behavior, rubric, or answers.
const HARNESS_PREAMBLE = `Bạn có các công cụ được cung cấp trong phiên này.
- File đầu vào nằm trong thư mục \`input/\`.
- Ghi MỌI file kết quả vào thư mục \`output/\`.

YÊU CẦU CỦA NGƯỜI DÙNG:
`;

export async function loadScenario(id) {
  const dir = path.join(SCENARIOS_DIR, id);
  if (!(await pathExists(dir))) throw new Error(`scenario not found: ${id}`);
  const meta = await readJSON(path.join(dir, 'scenario.json'));
  if (!meta) throw new Error(`scenario.json missing for ${id}`);
  const request = await readFileSafe(path.join(dir, 'prompt.txt'), 'utf8');
  const rubric = await readJSON(path.join(dir, 'rubric.json'));
  if (!rubric) throw new Error(`rubric.json missing for ${id}`);
  return {
    id: meta.id || id,
    dir,
    meta,
    request: (request || '').trim(),
    prompt: HARNESS_PREAMBLE + (request || '').trim() + '\n',
    rubric,
  };
}

export async function loadAllScenarios() {
  const entries = await listFilesRecursive(SCENARIOS_DIR, SCENARIOS_DIR);
  const ids = [...new Set(entries.map((e) => e.split('/')[0]))].filter(Boolean).sort();
  const scenarios = [];
  for (const id of ids) {
    if (await pathExists(path.join(SCENARIOS_DIR, id, 'scenario.json'))) {
      scenarios.push(await loadScenario(id));
    }
  }
  return scenarios;
}

// Create the isolated run directory and everything the executor needs.
export async function prepareRun({ scenario, condition, repeatIndex, executorName, modelConfig }) {
  const runId = `${nowStamp()}-${randomUUID()}__${scenario.id}__${condition}__${executorName}`;
  const runDir = path.join(RUNS_DIR, runId);
  const inputDir = path.join(runDir, 'input');
  const outputDir = path.join(runDir, 'output');
  const contextDir = path.join(runDir, 'context');

  await ensureDir(inputDir);
  await ensureDir(outputDir);

  // Copy fixtures into the isolated input dir.
  const fixturesDir = path.join(scenario.dir, 'fixtures');
  if (await pathExists(fixturesDir)) {
    await copyTree(fixturesDir, inputDir);
  }

  // Exact prompt (no rubric / expected answers leak to the agent).
  await writeFileEnsured(path.join(runDir, 'prompt.txt'), scenario.prompt);

  // Condition context (baseline = no pack; treatment = real repo skills).
  const contextMeta = await buildContext(condition, contextDir);

  const runMeta = {
    runId,
    scenarioId: scenario.id,
    scenarioTitle: scenario.meta.title || scenario.id,
    condition,
    repeatIndex,
    executor: executorName,
    createdAt: new Date().toISOString(),
    modelConfig: modelConfig || {},
    context: contextMeta,
    inputFiles: await listFilesRecursive(inputDir, inputDir),
    inputSha256:await treeHash(inputDir),
    promptSha256:sha256(scenario.prompt),
    packSha256:sha256((await treeHash(SKILLS_DIR))+(await readFileSafe(AGENTS_MD,'utf8'))),
    protocolSha256:await protocolHash(),
  };
  await writeFileEnsured(path.join(runDir, 'run-meta.json'), JSON.stringify(runMeta, null, 2) + '\n');

  return { runId, runDir, inputDir, outputDir, contextDir, runMeta };
}

export async function treeHash(dir) {
  const entries=[];
  for(const rel of await listFilesRecursive(dir)) entries.push([rel,sha256(await readFileSafe(path.join(dir,rel),null))]);
  return sha256(JSON.stringify(entries));
}
export async function protocolHash() {
  return sha256((await treeHash(path.join(SCENARIOS_ROOT,'lib')))+(await readFileSafe(path.join(SCENARIOS_ROOT,'run.mjs'),'utf8'))+(await treeHash(SCENARIOS_DIR)));
}
