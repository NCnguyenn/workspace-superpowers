import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Contracts and synthetic corpus only: no model runs or native PI certification.
const FIXTURES = 'tests/fixtures/document-continuity';
const MANUAL = 'tests/scenarios/manual/document-continuity-consistency.md';
const compact = text => text.replace(/\s+/g, ' ').trim();
const read = async file => compact(await readUtf8(file));
const corpus = async () => JSON.parse(await readUtf8(`${FIXTURES}/cases.json`));
const caseMap = async () => new Map((await corpus()).cases.map(item => [item.id, item]));
const finding = (item, rule) => item.expected.find(entry => entry.rule === rule);

function section(text, title) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(line => line === `## ${title}`);
  assert.ok(start >= 0, `missing source heading: ${title}`);
  let end = lines.findIndex((line, i) => i > start && /^## /.test(line));
  if (end < 0) end = lines.length;
  return compact(lines.slice(start + 1, end).join('\n'));
}

test('continuation reads source and adjacent dependencies before composing', async () => {
  const [contract, reading, analyzing, drafting] = await Promise.all([
    read('references/document-continuity.md'), read('skills/reading-artifacts/SKILL.md'),
    read('skills/analyzing-artifacts/SKILL.md'), read('skills/drafting-prose/SKILL.md'),
  ]);
  assert.match(contract, /Use `reading-artifacts` for files and `analyzing-artifacts` for interpretation/);
  for (const dependency of ['immediately preceding passage', 'following passage if inserting',
    'referenced definitions', 'record coverage', 'fresh read']) {
    assert.ok(contract.includes(dependency), `missing source dependency: ${dependency}`);
  }
  assert.match(reading, /For continuation or substantive revision.*document\/version/);
  assert.match(reading, /actual excerpts and coverage limits to analysis/);
  assert.match(analyzing, /never analyze an unread file/i);
  assert.match(drafting, /source profile, insertion point, adjacent excerpts, and evidence before composing/i);
  assert.match(drafting, /Use reading\/analysis for missing context/i);
});

test('existing continuity profile captures sourced voice, scenario, state and boundaries', async () => {
  const raw = await readUtf8('references/document-continuity.md');
  const rows = new Map(raw.split(/\r?\n/).filter(line => /^\| [A-Z]/.test(line))
    .map(line => line.split('|').slice(1, -1).map(cell => compact(cell))));
  for (const [dimension, fields] of [
    ['Argument and placement', ['purpose', 'criterion', 'preceding', 'add']],
    ['Project context', ['system', 'actors', 'dataset', 'limits', 'planned work']],
    ['Evidence', ['sources/locators', 'units', 'conditions', 'uncertainty', 'contradictions']],
    ['Terminology', ['names', 'abbreviations', 'must not be interchanged']],
    ['Voice and register', ['Formality', 'narrative person', 'tense by function', 'certainty',
      'paragraph development', 'technical detail', 'actual surrounding prose']],
    ['Presentation', ['Heading', 'numbering', 'list', 'table', 'captions', 'citation', 'cross-references']],
    ['Boundaries', ['preserve-list', 'requested change-list', 'language', 'source coverage', 'unresolved conflicts']],
  ]) {
    assert.ok(rows.has(dimension), `profile dimension missing: ${dimension}`);
    for (const field of fields) assert.ok(rows.get(dimension).includes(field), `${dimension}: ${field}`);
  }
  const text = compact(raw);
  assert.match(text, /inspected document\/version, requested insertion point/i);
  assert.match(text, /source locators and (?:short representative excerpts|coverage limits)/i);
  assert.match(text, /profile.*separate from `scope_status`, `outline_status`, `approval_record`, and `evidence_register`/i);
  assert.match(text, /does not prove that a section is approved, a claim is verified, or a project result was measured/i);
  assert.match(text, /does not create a parallel voice database or approval record/i);
});

test('terminology locks identify same roles and preserve semantic exceptions', async () => {
  const contract = await read('references/document-continuity.md');
  assert.match(contract, /Lock terminology only when.*same role or concept/i);
  assert.match(contract, /preserve the adopted term.*do not silently swap/i);
  for (const exception of ['distinct roles', 'quoted text', 'citations', 'references', 'source terminology']) {
    assert.ok(contract.includes(exception), `missing terminology exception: ${exception}`);
  }
  assert.match(contract, /report a material inconsistency.*same role/i);
  const analyzing = await read('skills/analyzing-artifacts/SKILL.md');
  assert.match(analyzing, /Lock terminology only for the same established role or concept/i);
  assert.match(analyzing, /preserve distinct roles, quotations, citations and source terminology/i);
});

test('authorial person is source-established and quotation is not drift', async () => {
  const contract = await read('references/document-continuity.md');
  assert.match(contract, /narrative person only when the inspected document establishes/i);
  for (const voice of ['objective voice', '`the author`', '`I`', '`we`']) {
    assert.ok(contract.includes(voice), `missing preserved voice: ${voice}`);
  }
  assert.match(contract, /mixed person in the relevant authored prose.*review finding.*surface/i);
  assert.match(contract, /verbatim quotation.*explicitly attributed to another person\/source/i);
  assert.match(contract, /author's own sentence remains in scope.*in-text citation/i);
  assert.match(await read('skills/analyzing-artifacts/SKILL.md'),
    /Lock narrative person only when established and surface scoped authorial drift/i);
});

test('later criteria inherit project facts and retain contradictions and evidence status', async () => {
  const contract = await read('references/document-continuity.md');
  assert.match(contract, /Later criteria inherit the established project\/scenario identity, actors, scope, technology, data, constraints, metrics, and decisions/i);
  assert.match(contract, /(?:Never|Do not) invent a project name, module, role, technology, budget, timeline, metric, result, or test case/i);
  for (const status of ['implemented behavior', 'planned work', 'observation', 'interpretation', 'illustrative material']) {
    assert.ok(contract.includes(status), `evidence distinction missing: ${status}`);
  }
  assert.match(contract, /multiple scenarios or a material contradiction.*preserve the conflict with its locators/i);
  assert.match(contract, /block silent reconciliation until the user or source resolves it/i);
  assert.match(contract, /explicit, scoped user correction can resolve a source contradiction for the authorized continuation/i);
  assert.match(contract, /record that decision and retain the original locator/i);
  assert.match(contract, /do not turn an earlier tentative observation into a confirmed or production-wide result/i);
});

test('analysis and outline require actual-seam linkage while retaining two approvals', async () => {
  const [contract, criteria] = await Promise.all([
    read('references/document-continuity.md'), read('references/criteria-writing-contract.md'),
  ]);
  assert.match(criteria, /requirement analysis must state.*continuity profile, preserve-list, adjacent argument, evidence needs.*unresolved terminology\/person\/scenario conflict/i);
  assert.match(criteria, /Continuity bridge.*bridge from the immediately preceding content/i);
  assert.match(criteria, /inherited project\/terminology decisions.*evidence that supports the new contribution/i);
  assert.match(contract, /explicit bridge at the actual seam.*immediately preceding argument/i);
  assert.match(criteria, /analysis and detailed-outline approval/i);
  assert.match(criteria, /add no approval gates/i);
  assert.match(criteria, /Do not include the detailed outline in the analysis-approval response/i);
  assert.match(criteria, /Keep internal labels out of questions and options/i);
});

test('review precedes complete chat delivery and the draft still waits for user review', async () => {
  const procedure = section(await readUtf8('skills/drafting-prose/SKILL.md'), 'Procedure');
  const review = procedure.indexOf('invoke_skill("reviewing-work")');
  const delivery = procedure.indexOf('Output the complete drafted text');
  assert.ok(review >= 0 && delivery > review, 'review must precede full chat delivery');
  assert.match(procedure, /Fix blocking findings within the approved scope and recheck/i);
  assert.match(procedure, /including chat-only prose/i);
  assert.match(procedure, /Ask whether the delivered section is approved/i);
  assert.match(procedure, /Do not start the next section or criterion in the same turn/i);
  assert.match(await read('references/criteria-writing-contract.md'),
    /existing post-draft review.*complete section in chat.*wait before proceeding to the next section/i);
});

test('existing review and final verification own continuity and reuse Word fidelity checks', async () => {
  const [review, coherence, prose, verify] = await Promise.all([
    read('skills/reviewing-work/SKILL.md'), read('agents/reviewer-coherence.md'),
    read('agents/reviewer-prose.md'), read('skills/verifying-artifacts/SKILL.md'),
  ]);
  assert.match(review, /relevant profile, adjacent excerpts, and evidence locators/i);
  assert.match(review, /continuity defects to coherence, prose, requirement, or evidence review by their cause/i);
  assert.match(review, /Return Critical and Important findings.*Recheck affected passages/i);
  assert.match(review, /never silently rewrite the deliverable wholesale/i);
  assert.match(coherence, /actual adjacent excerpts.*insertion boundary/i);
  assert.match(coherence, /source locations for both sides of a mismatch/i);
  assert.match(prose, /register, person, tense by function, terminology, paragraph\/list conventions/i);
  assert.match(verify, /references\/document-continuity\.md/);
  for (const field of ['actual seam', 'role names', 'narrative person', 'tense by function',
    'technical decisions', 'evidence status', 'citations', 'lead-and-list', 'cross-references']) {
    assert.ok(verify.includes(field), `verification omission: ${field}`);
  }
  assert.match(verify, /do not silently rewrite unrelated earlier sections/i);
  assert.match(verify, /visual-assets-and-word-fidelity\.md/);
  assert.match(verify, /Separate structural and rendered checks/i);
  assert.match(verify, /cannot establish native PI-Desktop acceptance/i);
});

test('PEEL and lead-and-list checks remain qualitative and scoped', async () => {
  const [style, prose, criteria] = await Promise.all([
    read('references/academic-writing-style.md'), read('agents/reviewer-prose.md'),
    read('references/criteria-writing-contract.md'),
  ]);
  assert.match(style, /4[–-]5 sentences.*not rendered lines or a mechanical quota/i);
  assert.match(style, /short definition or transition may remain short when complete/i);
  assert.match(style, /one lead sentence followed by a bullet or numbered list/i);
  assert.match(style, /Bullets and numbered lists remain allowed for genuinely parallel items, parameters, or sequence/i);
  assert.match(style, /does not apply to analysis\/outline approval cards, checklists, appendices, or source-preserving mechanical edits/i);
  assert.match(prose, /Four to five sentences is guidance, not a quota/i);
  assert.match(criteria, /PEEL and lead-and-list checks remain qualitative/i);
  assert.match(criteria, /not a sentence-count quota/i);
});

test('completed-work read-back does not trigger voice enforcement or continuation drafting', async () => {
  const [reading, analysis, bootstrap] = await Promise.all([
    read('skills/reading-artifacts/SKILL.md'), read('skills/analyzing-artifacts/SKILL.md'),
    readUtf8('adapters/pi/bootstrap.md'),
  ]);
  assert.match(reading, /For a completed assignment\/report read-back.*actual major headings.*arguments and conclusions/i);
  assert.match(reading, /extraction handoff, not permission.*interpret or rewrite/i);
  assert.match(analysis, /completed-work read-back remains a read-back.*do not trigger drafting, style enforcement, or a new intake map merely because the artifact was read/i);
  const routing = bootstrap.match(/<!-- workspace-superpowers:routing:begin -->([\s\S]*?)<!-- workspace-superpowers:routing:end -->/)?.[1];
  assert.ok(routing, 'refreshable PI routing block missing');
  const specific = routing.indexOf('Completed assignment or report to read or remember');
  assert.ok(specific >= 0 && specific < routing.indexOf('Open or inspect a supplied file'),
    'specific read-back must precede generic inspection');
  assert.match(compact(routing), /read-back.*does not use the intake map/i);
});

test('PI continuation exposes source inspection, profile, seam and approval reuse', async () => {
  const bootstrap = await read('adapters/pi/bootstrap.md');
  const route = bootstrap.match(/<!-- workspace-superpowers:routing:begin -->(.*?)<!-- workspace-superpowers:routing:end -->/)?.[1];
  assert.ok(route, 'refreshable PI routing block missing');
  assert.match(route, /continuation|substantive revision/i);
  assert.match(route, /continuity profile/i);
  assert.match(route, /reading-artifacts.*analyzing-artifacts/i);
  assert.match(route, /seam|bridge/i);
  assert.match(route, /reuse.*approval|existing.*approval/i);
});

test('synthetic corpus locators resolve to real source and candidate passages', async () => {
  const data = await corpus();
  assert.equal(data.evidenceClass, 'synthetic-contract-fixtures');
  assert.equal(data.nativeStatus, 'PENDING');
  const sources = new Map(await Promise.all(data.sources.map(async file =>
    [file, await readUtf8(`${FIXTURES}/${file}`)])));
  assert.equal(new Set(data.cases.map(item => item.id)).size, data.cases.length);
  for (const item of data.cases) {
    assert.ok(item.request.trim() && item.candidate.trim(), `${item.id}: empty request/candidate`);
    assert.ok(['review', 'analyze', 'read-back'].includes(item.operation), item.id);
    assert.ok(item.expected.length > 0, `${item.id}: no review expectations`);
    for (const expected of item.expected) {
      assert.ok(['flag', 'preserve', 'stop'].includes(expected.disposition), item.id);
      assert.ok(expected.explanation.trim(), `${item.id}: unexplained expectation`);
      assert.ok(compact(item.candidate).includes(compact(expected.candidateEvidence)),
        `${item.id}: stale candidate locator: ${expected.candidateEvidence}`);
      assert.ok(expected.sourceEvidence.length, `${item.id}: no source locator`);
      for (const locator of expected.sourceEvidence) {
        assert.ok(sources.has(locator.file), `${item.id}: unknown source ${locator.file}`);
        assert.ok(section(sources.get(locator.file), locator.heading).includes(compact(locator.quote)),
          `${item.id}: stale source locator: ${locator.file} / ${locator.heading} / ${locator.quote}`);
      }
    }
  }
});

test('role corpus isolates same-actor substitution and distinct-role/source exceptions', async () => {
  const items = await caseMap();
  const changed = items.get('DC01'), retained = items.get('DC02'), exceptions = items.get('DC03');
  assert.equal(changed.candidate.replace('professor', 'lecturer'), retained.candidate,
    'minimal pair must isolate role substitution');
  assert.deepEqual(changed.expected[0].sourceEvidence, retained.expected[0].sourceEvidence);
  assert.equal(changed.expected[0].disposition, 'flag');
  assert.equal(retained.expected[0].disposition, 'preserve');
  assert.deepEqual(exceptions.expected.map(item => item.rule).sort(),
    ['distinct-roles', 'quoted-source-terms', 'reference-terms']);
  assert.ok(exceptions.expected.every(item => item.disposition === 'preserve'));
  const actors = finding(exceptions, 'distinct-roles').sourceEvidence;
  assert.equal(actors.length, 3, 'each role needs its own source identity');
  assert.equal(new Set(actors.map(item => item.quote)).size, 3);
  for (const word of ['teacher', 'lecturer', 'professor']) {
    assert.match(exceptions.candidate, new RegExp(`\\b${word}\\b`, 'i'));
  }
});

test('person, scenario and status corpus provides source-bound counterexamples', async () => {
  const items = await caseMap();
  const individual = items.get('DC04'), group = items.get('DC05');
  assert.equal(individual.candidate.replace('We', 'I'), group.candidate);
  assert.notEqual(individual.expected[0].sourceEvidence[0].file, group.expected[0].sourceEvidence[0].file);
  assert.equal(individual.expected[0].disposition, 'flag');
  assert.equal(group.expected[0].disposition, 'flag');
  assert.equal(finding(items.get('DC03'), 'quoted-source-terms').disposition, 'preserve');
  assert.deepEqual(items.get('DC06').expected.map(item => item.rule).sort(),
    ['evidence-status', 'project-scenario', 'terminology']);
  assert.equal(finding(items.get('DC13'), 'illustrative-status').disposition, 'flag');
  assert.equal(finding(items.get('DC14'), 'tense-function').disposition, 'preserve');
  assert.equal(finding(items.get('DC15'), 'narrative-person-citation').disposition, 'flag');
  assert.match(items.get('DC15').candidate, /\(N1\)/);
});

test('conflict and seam corpus defeats connector and sentence-count shortcuts', async () => {
  const items = await caseMap();
  const conflict = finding(items.get('DC07'), 'material-conflict');
  assert.equal(new Set(conflict.sourceEvidence.map(item => item.file)).size, 2);
  const bad = finding(items.get('DC08'), 'seam-bridge');
  const good = finding(items.get('DC09'), 'seam-bridge');
  assert.equal(bad.disposition, 'flag');
  assert.equal(good.disposition, 'preserve');
  assert.equal(bad.sourceEvidence[0].heading, good.sourceEvidence[0].heading);
  assert.match(items.get('DC08').candidate, /Furthermore/);
  assert.equal(finding(items.get('DC09'), 'qualitative-peel').disposition, 'preserve');
  assert.equal(finding(items.get('DC10'), 'qualitative-peel').disposition, 'flag');
  assert.match(items.get('DC09').request, /two-sentence opening transition/);
  assert.match(items.get('DC10').request, /complete analytical subsection, not as an outline/);
  assert.match(items.get('DC10').candidate, /\n\n- CPU usage\.\n- p95 latency\./);
});

test('manual cases retain scope, pending approvals and separate execution evidence', async () => {
  const data = await corpus();
  const items = new Map(data.cases.map(item => [item.id, item]));
  assert.equal(items.get('DC11').operation, 'read-back');
  assert.equal(items.get('DC11').expected[0].disposition, 'stop');
  assert.match(items.get('DC11').request, /do not continue or revise/);
  assert.equal(items.get('DC12').expected[0].rule, 'state-separation');
  assert.match(items.get('DC12').request, /not approved its analysis or outline/);
  const manual = await readUtf8(MANUAL);
  for (const item of data.cases) {
    assert.match(manual, new RegExp(`\\| ${item.id} \\|[^\\n]*\\| PENDING \\|`), item.id);
  }
  for (const requirement of [
    /not.*Behavioral PASS/i, /actual.*tool.*trace/i, /rendered DOCX/i,
    /analysis approval/i, /detailed-outline approval/i, /post-draft review/i,
    /not a new approval gate/i, /do not edit.*earlier/i,
  ]) assert.match(compact(manual), requirement);
});
