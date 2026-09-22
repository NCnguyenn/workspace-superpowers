import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import * as helpers from './helpers.mjs';
import {
  CAPABILITY_NAMES,
  CORE_LIFECYCLE_SKILLS,
  HARNESS_LEAK,
  RESEARCH_SKILLS,
  SHIPPED_SKILLS,
  exists,
  parseFrontmatter,
  readUtf8,
} from './helpers.mjs';

const EXPECTED_PROSE = ['drafting-prose', 'writing-reports', 'writing-academic-prose'];
const REQUIRED_REFS = [
  'criteria-writing-contract.md',
  'academic-writing-style.md',
  'language-policy.md',
];
const CALL = /`([a-z][a-z0-9_]*)\(/g;
const MD_LINK = /\[[^\]]+\]\(([^)]+)\)/g;
const allowedCapabilities = new Set(CAPABILITY_NAMES);

function skillPath(name) {
  return `skills/${name}/SKILL.md`;
}

function hrefTarget(href) {
  const trimmed = href.trim().replace(/^<|>$/g, '');
  const withoutTitle = trimmed.replace(/\s+".*"$/, '');
  return withoutTitle.split('#')[0];
}

test('helpers export PROSE_SKILLS and ship them without dropping prior groups', () => {
  assert.deepEqual(helpers.PROSE_SKILLS, EXPECTED_PROSE);
  for (const name of EXPECTED_PROSE) {
    assert.equal(SHIPPED_SKILLS.includes(name), true, `${name} missing from SHIPPED_SKILLS`);
  }
  for (const name of [...CORE_LIFECYCLE_SKILLS, ...RESEARCH_SKILLS]) {
    assert.equal(SHIPPED_SKILLS.includes(name), true, `prior skill ${name} dropped from SHIPPED_SKILLS`);
  }
});

test('three prose skills exist with Use-when frontmatter matching the folder name', async () => {
  for (const name of EXPECTED_PROSE) {
    const rel = skillPath(name);
    assert.equal(await exists(rel), true, `${rel} missing`);
    const parsed = parseFrontmatter(await readUtf8(rel));
    assert.ok(parsed, `${rel} missing YAML frontmatter`);
    assert.ok(Buffer.byteLength(parsed.raw, 'utf8') < 1024, `${rel} frontmatter >= 1024 bytes`);
    assert.equal(parsed.fm.name, name);
    assert.equal(rel, `skills/${parsed.fm.name}/SKILL.md`);
    assert.equal(typeof parsed.fm.description, 'string', `${rel} missing description`);
    assert.ok(
      parsed.fm.description.startsWith('Use when'),
      `${rel} description must start with "Use when"`,
    );
  }
});

// These are structural contracts, not proof of multi-turn agent behavior.
const LIFECYCLE_FILES = [
  skillPath('using-workspace-superpowers'),
  skillPath('scoping-the-brief'),
  skillPath('planning-work'),
  skillPath('editing-documents'),
  skillPath('drafting-prose'),
  'agents/drafter.md',
];

function section(text, heading) {
  const body = text.split(`## ${heading}`)[1];
  assert.ok(body, `missing section: ${heading}`);
  return body.split(/\r?\n## /)[0];
}

test('criteria lifecycle participants link to the same shared contract', async () => {
  for (const rel of LIFECYCLE_FILES) {
    const text = await readUtf8(rel);
    const targets = [...text.matchAll(MD_LINK)].map((m) =>
      path.posix.normalize(path.posix.join(path.posix.dirname(rel), hrefTarget(m[1]))));
    assert.ok(targets.includes('references/criteria-writing-contract.md'), `${rel}: missing shared contract`);
  }
});

test('skip-gate waiver is not a language override and forbids invented SLAs', async () => {
  const contract = await readUtf8('references/criteria-writing-contract.md');
  const drafting = await readUtf8(skillPath('drafting-prose'));
  const router = await readUtf8(skillPath('using-workspace-superpowers'));
  assert.match(contract, /not a language (override|instruction|request)/i);
  assert.match(contract, /\bSLAs?\b/);
  assert.match(contract, /supplied (facts|fixture|prompt)/i);
  assert.match(drafting, /not a language (override|instruction|request)/i);
  assert.match(drafting, /\bSLAs?\b/);
  assert.match(router, /not an explicit language request/i);
});

test('hypothetical conclusions must not reuse illustration numbers as operational proof', async () => {
  const contract = await readUtf8('references/criteria-writing-contract.md');
  const drafting = await readUtf8(skillPath('drafting-prose'));
  const reports = await readUtf8(skillPath('writing-reports'));
  assert.match(contract, /operational(?: proof| result)/i);
  assert.match(contract, /conclusion/i);
  assert.match(drafting, /operational proof/i);
  assert.match(reports, /operational proof/i);
});

test('router selects prose skills by operation and preserves stopping boundaries', async () => {
  const text = await readUtf8(skillPath('using-workspace-superpowers'));
  for (const name of EXPECTED_PROSE) assert.ok(text.includes(name), `router missing ${name}`);
  const modes = new Map([...text.matchAll(/^\| `(analyze|outline|draft|revise)` \| (.+) \|$/gm)]
    .map((m) => [m[1], m[2]]));
  assert.equal(modes.size, 4, 'all four operation routes required');
  assert.match(modes.get('analyze'), /scoping-the-brief.*[Ss]top/);
  assert.doesNotMatch(modes.get('analyze'), /drafting-prose/);
  assert.match(modes.get('outline'), /planning-work.*[Ss]top/);
  assert.match(modes.get('draft'), /drafting-prose.*reviewing-work/);
  assert.match(modes.get('revise'), /editing-documents.*drafting-prose/);
  assert.match(modes.get('revise'), /formatting-layout/);
  const capabilities = section(text, 'Allowed Router Capabilities');
  assert.deepEqual([...capabilities.matchAll(CALL)].map((m) => m[1]).sort(),
    ['delegate', 'invoke_skill', 'list_files'], 'router must remain coordination-only');
});

test('scoping separates clarification from applicable scope confirmation', async () => {
  const text = await readUtf8(skillPath('scoping-the-brief'));
  const criteria = section(text, 'Criteria-based writing');
  for (const field of ['task_mode', 'criteria', 'scope', 'scope_status', 'approval_record', 'evidence_register', 'blocking_gaps']) {
    assert.ok(criteria.includes(field), `scoping missing ${field}`);
  }
  assert.match(criteria, /chat/i);
  assert.match(criteria, /confirmed.*waived/);
  assert.match(criteria, /[Ss]ilence.*not.*approval/);
  assert.match(criteria, /Missing Evidence Protocol/);
  assert.match(section(text, 'Fallback'), /criteria-writing contract/);
});

test('planning owns versioned outline decisions and supports small chat outlines', async () => {
  const text = await readUtf8(skillPath('planning-work'));
  const criteria = section(text, 'Criteria-based outline');
  for (const field of ['outline_status', 'outline_version', 'approval_record', 'criterion', 'evidence', 'length', 'Not needed']) {
    assert.ok(criteria.includes(field), `planning missing ${field}`);
  }
  for (const field of ['name/type', 'purpose', 'position', 'source/data', 'preparer', 'status']) {
    assert.ok(criteria.includes(field), `visual decision missing ${field}`);
  }
  assert.match(criteria, /chat/i);
  assert.match(criteria, /outline-only.*[Ss]top/);
  assert.match(criteria, /approval.*does not authorize drafting/i);
  assert.match(criteria, /revision_requested/);
});

test('editing routes substantive prose through prerequisites but keeps mechanical edits light', async () => {
  const text = await readUtf8(skillPath('editing-documents'));
  const rows = text.split(/\r?\n/).filter((line) => line.startsWith('|'));
  const substantive = rows.find((line) => /Substantive.*(rewrite|argument)/i.test(line));
  assert.ok(substantive, 'missing substantive rewrite route');
  for (const name of EXPECTED_PROSE) assert.ok(substantive.includes(name), `substantive route missing ${name}`);
  const mechanical = rows.find((line) => /Typo.*wording-only/i.test(line));
  assert.ok(mechanical, 'missing bounded mechanical route');
  assert.match(mechanical, /no.*(approval|gate)/i);
  assert.doesNotMatch(mechanical, /drafting-prose/);
  assert.match(text, /analyzing-artifacts.*non-trivial/);
  assert.match(text, /[Ii]nspect (?:the )?supplied text directly/,
    'pasted-text edits must not require an existing file');
});

test('drafter receives bounded decisions and evidence without approval authority', async () => {
  const text = await readUtf8('agents/drafter.md');
  const context = section(text, 'Context Supplied');
  for (const field of ['task_mode', 'scope_status', 'outline_status', 'outline_version', 'approval_record', 'evidence_register', 'blocking_gaps']) {
    assert.ok(context.includes(field), `drafter context missing ${field}`);
  }
  assert.match(context, /Never supplied with orchestrator session history/);
  assert.match(section(text, 'Hard Limits'), /(?:not|never).*(?:infer|create|waive).*approval/i);
  assert.match(section(text, 'Output Shape'), /draft_incomplete/);
});

test('all lifecycle Markdown links resolve inside the portable package', async () => {
  for (const rel of LIFECYCLE_FILES) {
    const text = await readUtf8(rel);
    for (const [, href] of text.matchAll(MD_LINK)) {
      const target = hrefTarget(href);
      if (!target || /^[a-z]+:\/\//i.test(target)) continue;
      assert.ok(!path.isAbsolute(target) && !/^[A-Za-z]:/.test(target), `${rel}: machine path ${href}`);
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(rel), target));
      assert.ok(!resolved.startsWith('../'), `${rel}: path escapes package ${href}`);
      assert.equal(await exists(resolved), true, `${rel}: broken link ${href}`);
    }
  }
});

test('prose skills name only §11 capabilities and contain no harness leaks', async () => {
  const leaks = [];
  for (const name of EXPECTED_PROSE) {
    const rel = skillPath(name);
    assert.equal(await exists(rel), true, `${rel} missing`);
    const text = await readUtf8(rel);
    for (const needle of HARNESS_LEAK) {
      if (text.includes(needle)) leaks.push(`${rel} contains ${needle}`);
    }
    for (const match of text.matchAll(CALL)) {
      const cap = match[1];
      if (!allowedCapabilities.has(cap)) leaks.push(`${rel} names ${cap}()`);
    }
  }
  assert.deepEqual(leaks, []);
});

test('prose skill relative links resolve to real reference files', async () => {
  for (const name of EXPECTED_PROSE) {
    const rel = skillPath(name);
    assert.equal(await exists(rel), true, `${rel} missing`);
    const text = await readUtf8(rel);
    const hrefs = [...text.matchAll(MD_LINK)].map((m) => m[1]);
    const resolvedRefs = new Set();
    for (const href of hrefs) {
      const target = hrefTarget(href);
      if (!target || /^[a-z]+:/i.test(target)) continue;
      assert.ok(
        !path.isAbsolute(target) && !/^[A-Za-z]:/.test(target),
        `${rel} uses a machine path: ${href}`,
      );
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(rel), target));
      assert.equal(await exists(resolved), true, `${rel} broken link ${href} -> ${resolved}`);
      const base = path.posix.basename(resolved);
      if (REQUIRED_REFS.includes(base)) {
        assert.match(
          target,
          /^\.\.\/\.\.\/references\//,
          `${rel} must reference ${base} via ../../references/`,
        );
        resolvedRefs.add(base);
      }
    }
    for (const ref of REQUIRED_REFS) {
      assert.equal(
        resolvedRefs.has(ref),
        true,
        `${rel} missing relative link to ../../references/${ref}`,
      );
    }
  }
});

test('reviewer-prose exists with the role contract and a relative style-guide link', async () => {
  const rel = 'agents/reviewer-prose.md';
  assert.equal(await exists(rel), true, `${rel} missing`);
  const text = await readUtf8(rel);
  for (const heading of [
    '## Context Supplied',
    '## Job',
    '## Hard Limits',
    '## Required Capabilities',
    '## Output Shape',
  ]) {
    assert.ok(text.includes(heading), `${rel} missing ${heading} per role prompt contract (§9.4)`);
  }
  assert.ok(
    text.includes('Never supplied with orchestrator session history'),
    `${rel} must refuse orchestrator session history`,
  );
  assert.ok(
    text.includes('references/academic-writing-style.md'),
    `${rel} missing relative link to the academic writing style guide`,
  );
  const reviewFiles = [
    skillPath('reviewing-work'),
    ...['prose', 'citation', 'requirement', 'coherence'].map((role) => `agents/reviewer-${role}.md`),
  ];
  const permitted = new Set(['read_file', 'inspect_document', 'invoke_skill', 'delegate']);
  for (const file of reviewFiles) {
    const contents = await readUtf8(file);
    for (const [, capability] of contents.matchAll(CALL)) {
      assert.ok(permitted.has(capability), `${file}: capability outside T5 review constraint: ${capability}`);
    }
    assert.doesNotMatch(contents, /mcp_|plugin_pi_|sandbox_permissions|require_escalated|--dangerously-skip-permissions/);
    for (const [, href] of contents.matchAll(MD_LINK)) {
      const target = hrefTarget(href);
      assert.ok(!path.isAbsolute(target) && !/^[a-z]+:/i.test(target), `${file}: non-portable link ${href}`);
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), target));
      assert.equal(await exists(resolved), true, `${file}: broken link ${href}`);
    }
  }
  const guide = await readUtf8('references/academic-writing-style.md');
  for (const [, first, last] of text.matchAll(/\b([PLRSCFVI]\d)[–-]([PLRSCFVI]\d)\b/g)) {
    for (const id of [first, last]) assert.ok(guide.includes(id), `unknown style rule ${id}`);
  }
  assert.match(text, /\[language-policy\.md\]\(\.\.\/references\/language-policy\.md\)/);
});

test('reviewing-work dispatches reviewer-prose and treats fabricated evidence as blocking', async () => {
  const text = await readUtf8(skillPath('reviewing-work'));
  for (const role of [
    'reviewer-requirement',
    'reviewer-coherence',
    'reviewer-citation',
    'reviewer-visual',
    'reviewer-prose',
  ]) {
    assert.ok(text.includes(role), `reviewing-work must dispatch ${role}`);
  }
  assert.match(text, /\bprose\b/);
  assert.match(text, /Severity · Location · Problem · Suggested Fix/);
  assert.match(text, /draft_incomplete/);
  assert.match(text, /[Cc]ritical/);
  assert.match(text, /fabricat/i);
  assert.doesNotMatch(text, /reviewer-argument/);
  assert.match(text, /argument\/coherence \(`reviewer-coherence`\)/);
  assert.match(text, /\[criteria-writing contract\]\(\.\.\/\.\.\/references\/criteria-writing-contract\.md\)/);
  const parsed = parseFrontmatter(text);
  assert.ok(Buffer.byteLength(parsed.raw, 'utf8') < 1024);
  assert.match(text, /[Rr]echeck.*affected/);
  assert.match(text, /chat-only/i);
});

test('four review dimensions stay distinct and citation accepts internal evidence', async () => {
  const requirement = await readUtf8('agents/reviewer-requirement.md');
  assert.match(requirement, /outline/i);
  assert.match(requirement, /scope/i);
  assert.match(requirement, /Suggestion, not a Critical/);

  const coherence = await readUtf8('agents/reviewer-coherence.md');
  assert.match(coherence, /argument/i);
  assert.match(coherence, /reviewer-prose/);
  assert.match(coherence, /does not transfer/i);
  assert.doesNotMatch(coherence, /unclear phrasing/i);

  const citation = await readUtf8('agents/reviewer-citation.md');
  assert.match(citation, /internal/i);
  assert.match(citation, /\bN\/A\b/);
  assert.match(citation, /log/i);
  assert.match(citation, /[Cc]ritical/);

  const prose = await readUtf8('agents/reviewer-prose.md');
  assert.match(prose, /\*\*Dimension:\*\* prose/);
  assert.match(prose, /\bP1\b|\bP2\b/);
  assert.match(prose, /Does not rewrite|does not rewrite|not rewrite/i);
  for (const [name, contents] of Object.entries({ requirement, coherence, citation, prose })) {
    assert.match(contents, /\| Severity \| Location \| Problem \| Suggested Fix \|/,
      `${name}: findings must have a real table structure`);
    assert.match(contents, /\.\.\/templates\/review-findings\.md/,
      `${name}: role needs a resolvable findings-template link`);
  }
  assert.match(citation, /evidence_register/);
  assert.match(requirement, /approval_record/);
});

const MANUAL_SCENARIO = 'tests/scenarios/manual/criteria-writing.md';
const REQUIRED_CASE_SECTIONS = [
  'Prompt khởi đầu',
  'Lượt phản hồi tiếp theo',
  'Tiêu chuẩn đạt',
  'Lỗi bị cấm',
  'Mục ghi nhận kết quả',
];
const EXPECTED_CASE_IDS = Array.from({ length: 16 }, (_, i) => `B${String(i + 1).padStart(2, '0')}`);

// Ignore headings inside quoted prompt/code fences while preserving offsets
// into the original text for field-body validation.
function scenarioHeadingText(text) {
  let fence = null;
  return text.replace(/^.*$/gm, (line) => {
    const marker = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fence) {
      if (marker && marker[1][0] === fence[0] &&
          marker[1].length >= fence.length && marker[2].trim() === '') fence = null;
      return ' '.repeat(line.length);
    }
    if (!marker) return line;
    fence = marker[1];
    return ' '.repeat(line.length);
  });
}

function scenarioCaseBlocks(text) {
  const headingText = scenarioHeadingText(text);
  const matches = [...headingText.matchAll(/^## (B\d{2})\b[^\n]*$/gm)];
  const ids = matches.map((match) => match[1]);
  assert.deepEqual(ids, EXPECTED_CASE_IDS,
    'scenario ids must be exactly B01–B16 in order without duplicates');
  const blocks = new Map();
  for (let i = 0; i < matches.length; i++) {
    const id = matches[i][1];
    const start = matches[i].index;
    const nextHeading = /^## /gm;
    nextHeading.lastIndex = start + matches[i][0].length;
    const end = nextHeading.exec(headingText)?.index ?? text.length;
    blocks.set(id, text.slice(start, end));
  }
  return blocks;
}

// Structural only: proves the operator script exists locally. It does
// not prove an LLM followed B01–B16 in a live multi-turn session.
test('manual criteria-writing scenario file exists', async () => {
  assert.equal(await exists(MANUAL_SCENARIO), true, `${MANUAL_SCENARIO} missing`);
});

test('manual criteria-writing scenarios define B01–B16 with required operator fields', async () => {
  const text = await readUtf8(MANUAL_SCENARIO);
  const blocks = scenarioCaseBlocks(text);
  assert.deepEqual([...blocks.keys()], EXPECTED_CASE_IDS, 'scenario ids must be B01–B16 in order, once each');
  for (const [id, block] of blocks) {
    const headings = [...scenarioHeadingText(block).matchAll(/^### ([^\r\n]+)\r?\n/gm)];
    const labels = headings.map((match) => match[1].replace(/\s+\([^()]*\)$/, '').trim());
    assert.deepEqual(labels, REQUIRED_CASE_SECTIONS,
      `${id}: required level-three headings must appear once each, in order`);
    const bodies = headings.map((heading, index) => {
      const end = index + 1 < headings.length ? headings[index + 1].index : block.length;
      return block.slice(heading.index + heading[0].length, end).trim();
    });
    for (let index = 0; index < headings.length; index++) {
      assert.ok(bodies[index].length > 0 && /[\p{L}\p{N}]/u.test(bodies[index]),
        `${id}: empty content for ${labels[index]}`);
    }
    assert.match(bodies[REQUIRED_CASE_SECTIONS.indexOf('Mục ghi nhận kết quả')],
      /\[PASS \| FAIL \| BLOCKED\]/, `${id} missing evidence status template in its evidence section`);
  }
  assert.match(
    text,
    /Structural PASS is not Behavioral PASS/,
    'operator script must keep structural vs behavioral evidence classes distinct',
  );
  assert.doesNotMatch(
    text,
    /16\/16 ca behavioral PASS/,
    'do not claim live behavioral pass inside the unchecked operator script',
  );
});
