// Rubric engine. Grades a completed run on ACTIONS (transcript events) and
// ARTIFACTS (real files in the run's output/input dirs) — never on the agent's
// prose claim that it "did the steps".
//
// Overall status:
//   BLOCKED — executor unavailable / errored, or transcript too incomplete to
//             grade. An infrastructure problem is never a PASS and never a FAIL.
//   PASS    — every required criterion is satisfied.
//   FAIL    — transcript is gradeable and at least one required criterion fails.
import path from 'node:path';
import { pathExists, readFileSafe } from './fsx.mjs';
import { finalText as getFinalText, ordered, toolCalled, countToolCalls, editLifecycle, successfulCalls, validateTranscript } from './transcript.mjs';
import { sha256 } from './fsx.mjs';

function re(regex, flags) {
  return new RegExp(regex, flags || '');
}

async function readRun(runDir, relPath) {
  return readFileSafe(path.join(runDir, relPath), 'utf8');
}

async function readRunLatin1(runDir, relPath) {
  return readFileSafe(path.join(runDir, relPath), 'latin1');
}

// Each evaluator returns { passed:boolean, detail:string }.
const EVALUATORS = {
  async artifact_exists(c, ctx) {
    const ok = await pathExists(path.join(ctx.runDir, c.path));
    return { passed: ok, detail: ok ? `found ${c.path}` : `missing ${c.path}` };
  },
  async artifact_absent(c, ctx) {
    const ok = !(await pathExists(path.join(ctx.runDir, c.path)));
    return { passed: ok, detail: ok ? `absent ${c.path}` : `unexpected file ${c.path}` };
  },
  async artifact_matches(c, ctx) {
    const text = c.encoding === 'latin1'
      ? await readRunLatin1(ctx.runDir, c.path)
      : await readRun(ctx.runDir, c.path);
    if (text == null) return { passed: false, detail: `cannot read ${c.path}` };
    const ok = re(c.regex, c.flags).test(text);
    return { passed: ok, detail: ok ? `${c.path} matches /${c.regex}/` : `${c.path} does not match /${c.regex}/` };
  },
  async artifact_not_matches(c, ctx) {
    const text = c.encoding === 'latin1'
      ? await readRunLatin1(ctx.runDir, c.path)
      : await readRun(ctx.runDir, c.path);
    if (text == null) return { passed: false, detail: `cannot read ${c.path}` };
    const ok = !re(c.regex, c.flags).test(text);
    return { passed: ok, detail: ok ? `${c.path} avoids /${c.regex}/` : `${c.path} still matches /${c.regex}/` };
  },
  // A literal string that must survive verbatim in BOTH input and output.
  async text_preserved(c, ctx) {
    const inp = await readRun(ctx.runDir, c.input);
    const out = await readRun(ctx.runDir, c.output);
    if (inp == null) return { passed: false, detail: `cannot read input ${c.input}` };
    if (out == null) return { passed: false, detail: `cannot read output ${c.output}` };
    const inHas = inp.includes(c.needle);
    const outHas = out.includes(c.needle);
    const ok = inHas && outHas;
    return {
      passed: ok,
      detail: ok
        ? `preserved "${truncate(c.needle)}"`
        : `not preserved (input:${inHas} output:${outHas}) "${truncate(c.needle)}"`,
    };
  },
  // The targeted region changed: old text gone from output, new marker present.
  async region_changed(c, ctx) {
    const inp = await readRun(ctx.runDir, c.input);
    const out = await readRun(ctx.runDir, c.output);
    if (inp == null) return { passed: false, detail: `cannot read input ${c.input}` };
    if (out == null) return { passed: false, detail: `cannot read output ${c.output}` };
    const absentOk = !out.includes(c.must_absent);
    const containOk = c.must_contain == null ? true : out.includes(c.must_contain);
    const wasPresent = inp.includes(c.must_absent);
    const ok = absentOk && containOk && wasPresent;
    return {
      passed: ok,
      detail: ok
        ? `region changed (old gone, "${truncate(c.must_contain || '')}" present)`
        : `region not properly changed (oldAbsent:${absentOk} newPresent:${containOk} wasInInput:${wasPresent})`,
    };
  },
  async tool_called(c, ctx) {
    const ok = toolCalled(ctx.events, { tool: c.tool, args: c.args });
    return { passed: ok, detail: ok ? `called ${c.tool}` : `never called ${c.tool} ${fmtArgs(c.args)}` };
  },
  async tool_not_called(c, ctx) {
    const ok = countToolCalls(ctx.events, { tool: c.tool, args: c.args }) === 0;
    return { passed: ok, detail: ok ? `did not call ${c.tool}` : `unexpectedly called ${c.tool} ${fmtArgs(c.args)}` };
  },
  async ordered(c, ctx) {
    const ok = ordered(ctx.events, c.first, c.then);
    return {
      passed: ok,
      detail: ok
        ? `${c.first.tool} before ${c.then.tool}`
        : `expected ${c.first.tool} ${fmtArgs(c.first.args)} before ${c.then.tool} ${fmtArgs(c.then.args)}`,
    };
  },
  async edit_lifecycle(c, ctx) {
    const passed = editLifecycle(ctx.events, c.input, c.output);
    return { passed, detail: passed ? 'read completed before first write; reopen after last write' : 'missing successful read -> write -> final reopen sequence' };
  },
  async exact_edit(c, ctx) {
    const input = await readRun(ctx.runDir, c.input);
    const output = await readRun(ctx.runDir, c.output);
    const passed = input != null && output != null && input.includes(c.before) && output === input.replace(c.before, c.after);
    return { passed, detail: passed ? 'exact requested replacement; all other bytes preserved' : 'edit differs from requested replacement' };
  },
  async paragraph_edit(c, ctx) {
    const input = await readRun(ctx.runDir, c.input), output = await readRun(ctx.runDir, c.output);
    const pattern = /(^Đoạn 3: )([^\r\n]+)/m;
    const original = input?.match(pattern), changed = output?.match(pattern);
    const passed = !!original && !!changed && original[2] !== changed[2] && changed[2].trim().length > 0
      && input.replace(pattern, '$1<target>') === output.replace(pattern, '$1<target>');
    return { passed, detail: passed ? 'only paragraph 3 changed' : 'target unchanged or collateral modification' };
  },
  async pdf_inspected(c, ctx) {
    const conversions = successfulCalls(ctx.events, { tool: 'convert_artifact', args: { out: c.path } });
    const inspections = successfulCalls(ctx.events, { tool: 'inspect_pdf', args: { path: c.path } });
    const lastConversion = conversions.at(-1);
    const passed = !!lastConversion && inspections.some(i => i.index > lastConversion.resultIndex && i.result?.valid === false);
    return { passed, detail: passed ? 'produced PDF reopened and validator returned invalid' : 'no invalid-PDF inspection after conversion' };
  },
  async final_review(c, ctx) {
    const review = ctx.review, verdict = review?.criteria?.[c.id];
    if (!review || review.transcriptSha256 !== ctx.transcriptHash || review.rubricSha256 !== ctx.rubricHash
      || !review.reviewer || !verdict || typeof verdict.passed !== 'boolean' || !verdict.evidence?.trim()) {
      return { passed: false, pending: true, detail: 'independent final-report review required (bound to transcript and rubric hashes)' };
    }
    return { passed: verdict.passed, detail: verdict.evidence };
  },
};

function truncate(s, n = 40) {
  const str = String(s == null ? '' : s);
  return str.length > n ? `${str.slice(0, n)}…` : str;
}

function fmtArgs(args) {
  return args ? JSON.stringify(args) : '';
}

// transcript: { executor, status, events, error, ... } produced by an executor.
export async function grade(rubric, { runDir, transcript, review }) {
  const criteria = [];
  const execStatus = transcript && transcript.status;

  // Infrastructure gate: never grade behavior we do not actually have.
  const validation = validateTranscript(transcript);
  if (validation || !Array.isArray(rubric?.criteria) || !rubric.criteria.some(c => c.required !== false)) {
    return {
      status: 'BLOCKED',
      reason: validation || 'empty required rubric',
      criteria: [],
      summary: { required: 0, passed: 0, failed: 0, optionalFailed: 0 },
    };
  }

  const events = Array.isArray(transcript.events) ? transcript.events : [];
  if (events.length === 0) {
    return {
      status: 'BLOCKED',
      reason: 'transcript has no events — behavior cannot be graded',
      criteria: [],
      summary: { required: 0, passed: 0, failed: 0, optionalFailed: 0 },
    };
  }

  const ctx = { runDir, events, finalText: getFinalText(events), review,
    transcriptHash: sha256(JSON.stringify(transcript)), rubricHash: sha256(JSON.stringify(rubric)) };

  for (const c of rubric.criteria || []) {
    const evalFn = EVALUATORS[c.type];
    const required = c.required !== false;
    if (!evalFn) {
      criteria.push({
        id: c.id, type: c.type, required, passed: false,
        detail: `unknown criterion type "${c.type}"`, error: true,
      });
      continue;
    }
    let result;
    try {
      result = await evalFn(c, ctx);
    } catch (err) {
      criteria.push({ id: c.id, type: c.type, required, passed: false, detail: `evaluator threw: ${err.message}`, error: true });
      continue;
    }
    criteria.push({ id: c.id, type: c.type, required, passed: !!result.passed, detail: result.detail, pending: !!result.pending });
  }

  const requiredCriteria = criteria.filter((c) => c.required);
  const failedRequired = requiredCriteria.filter((c) => !c.passed);
  const optionalFailed = criteria.filter((c) => !c.required && !c.passed);

  // An evaluator that threw is an infrastructure defect -> BLOCKED, not FAIL.
  if (criteria.some((c) => c.error)) {
    return {
      status: 'BLOCKED',
      reason: 'one or more rubric evaluators errored (harness defect, not agent behavior)',
      criteria,
      summary: summarize(requiredCriteria, failedRequired, optionalFailed),
    };
  }

  if (criteria.some(c => c.required && c.pending)) {
    return { status: 'BLOCKED', reason: 'independent review pending', criteria,
      summary: summarize(requiredCriteria, failedRequired, optionalFailed), finalText: ctx.finalText };
  }
  const status = failedRequired.length === 0 ? 'PASS' : 'FAIL';
  return {
    status,
    reason: status === 'PASS' ? 'all required criteria satisfied' : `${failedRequired.length} required criterion/criteria failed`,
    criteria,
    finalText: ctx.finalText,
    summary: summarize(requiredCriteria, failedRequired, optionalFailed),
  };
}

function summarize(requiredCriteria, failedRequired, optionalFailed) {
  return {
    required: requiredCriteria.length,
    passed: requiredCriteria.length - failedRequired.length,
    failed: failedRequired.length,
    optionalFailed: optionalFailed.length,
  };
}
