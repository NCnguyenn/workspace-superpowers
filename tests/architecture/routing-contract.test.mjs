import test from 'node:test';
import assert from 'node:assert/strict';
import { allowPartial, exists, readUtf8 } from './helpers.mjs';

const skip = allowPartial();

async function readSkill(name) {
  const rel = `skills/${name}/SKILL.md`;
  assert.equal(await exists(rel), true, `${rel} is missing — routing contract cannot be checked`);
  return readUtf8(rel);
}

test(
  'router names the four wave-1 specialists',
  { skip },
  async () => {
    const text = await readSkill('using-workspace-superpowers');
    for (const name of [
      'reading-artifacts',
      'analyzing-artifacts',
      'editing-documents',
      'verifying-artifacts',
    ]) {
      assert.equal(text.includes(name), true, `router missing ${name}`);
    }
  },
);

test(
  'editing-documents depends on read, analyze, and verify',
  { skip },
  async () => {
    const text = await readSkill('editing-documents');
    for (const name of ['reading-artifacts', 'analyzing-artifacts', 'verifying-artifacts']) {
      assert.equal(text.includes(name), true, `editing-documents missing ${name}`);
    }
  },
);

test(
  'verifying-artifacts states command success is not artifact success',
  { skip },
  async () => {
    const text = await readSkill('verifying-artifacts');
    assert.equal(
      text.includes('Command success is not artifact success.'),
      true,
      'verifying-artifacts missing the exact sentence "Command success is not artifact success."',
    );
  },
);

test(
  'verifying-artifacts states a later conversion invalidates prior inspection',
  { skip },
  async () => {
    const text = await readSkill('verifying-artifacts');
    assert.equal(
      text.includes('A check on an earlier generation is stale after another write or conversion.'),
      true,
      'verifying-artifacts must say a later write/conversion makes a prior check stale',
    );
  },
);

test(
  'packaging-deliverables depends on verifying-artifacts',
  { skip },
  async () => {
    const text = await readSkill('packaging-deliverables');
    assert.equal(
      text.includes('verifying-artifacts'),
      true,
      'packaging-deliverables must declare dependency on verifying-artifacts',
    );
  },
);

test(
  'router references all core lifecycle skills',
  { skip },
  async () => {
    const text = await readSkill('using-workspace-superpowers');
    for (const name of [
      'scoping-the-brief',
      'reading-artifacts',
      'analyzing-artifacts',
      'planning-work',
      'editing-documents',
      'reviewing-work',
      'verifying-artifacts',
      'packaging-deliverables',
    ]) {
      assert.equal(text.includes(name), true, `router missing core lifecycle reference ${name}`);
    }
  },
);

test(
  'reviewing-work is a review router and does not rewrite wholesale',
  { skip },
  async () => {
    const text = await readSkill('reviewing-work');
    assert.equal(
      text.includes('review router'),
      true,
      'reviewing-work must declare itself a review router',
    );
    assert.equal(
      /never silently rewrite/i.test(text),
      true,
      'reviewing-work must forbid silently rewriting the deliverable',
    );
  },
);

test(
  'scoping-the-brief does not hardcode a citation style',
  { skip },
  async () => {
    const text = await readSkill('scoping-the-brief');
    assert.equal(
      /APA\/IEEE/.test(text),
      false,
      'scoping-the-brief must not hardcode APA/IEEE as the package default',
    );
  },
);

test(
  'citing-sources sets Harvard Style as the default when unspecified',
  { skip },
  async () => {
    const text = await readSkill('citing-sources');
    assert.equal(
      /Harvard Style is the package default/i.test(text),
      true,
      'citing-sources must declare Harvard Style as the package default when unspecified',
    );
  },
);

test(
  'research stays requested while citation repair also covers required or existing citations',
  { skip },
  async () => {
    const researchText = await readSkill('researching-sources');
    const citingText = await readSkill('citing-sources');

    assert.equal(
      /explicitly requests/i.test(researchText),
      true,
      'researching-sources must state it requires an explicit user request',
    );
    assert.equal(
      /explicitly requests/i.test(citingText),
      true,
      'citing-sources must retain explicit user requests as a trigger',
    );
    assert.match(citingText, /already contains formal citations/i);
    assert.match(citingText, /brief\/template\/rubric requires/i);
  },
);

test(
  'working-with-pdf establishes source priority rule',
  { skip },
  async () => {
    const text = await readSkill('working-with-pdf');
    assert.equal(
      /prefer editing the source over patching the pdf/i.test(text),
      true,
      'working-with-pdf must state "Prefer editing the source over patching the PDF"',
    );
  },
);

test(
  'working-with-spreadsheets establishes formula preservation rule',
  { skip },
  async () => {
    const text = await readSkill('working-with-spreadsheets');
    assert.equal(
      /never overwrite .*formulas with static values/i.test(text),
      true,
      'working-with-spreadsheets must forbid overwriting formulas with static numbers',
    );
  },
);

test(
  'auditing-formulas enforces zero calculation errors and circular reference detection',
  { skip },
  async () => {
    const text = await readSkill('auditing-formulas');
    assert.equal(
      /zero calculation errors/i.test(text),
      true,
      'auditing-formulas must enforce zero calculation errors',
    );
    assert.equal(
      /circular/i.test(text),
      true,
      'auditing-formulas must detect circular references',
    );
  },
);

test(
  'router references office specialist skills',
  { skip },
  async () => {
    const text = await readSkill('using-workspace-superpowers');
    for (const name of ['working-with-pdf', 'spreadsheets']) {
      assert.equal(text.includes(name), true, `router missing reference to ${name}`);
    }
  },
);

test(
  'formatting-layout depends on read, analyze, review, and verify',
  { skip },
  async () => {
    const text = await readSkill('formatting-layout');
    for (const name of ['reading-artifacts', 'analyzing-artifacts', 'reviewing-work', 'verifying-artifacts']) {
      assert.equal(text.includes(name), true, `formatting-layout missing ${name}`);
    }
  },
);

test(
  'formatting-layout preserves substantive content integrity',
  { skip },
  async () => {
    const text = await readSkill('formatting-layout');
    assert.equal(
      /never alter substantive (content|prose)/i.test(text),
      true,
      'formatting-layout must forbid altering substantive content/prose',
    );
  },
);

test(
  'editing-documents routes to formatting-layout and converting-artifacts',
  { skip },
  async () => {
    const text = await readSkill('editing-documents');
    assert.equal(
      text.includes('formatting-layout'),
      true,
      'editing-documents must route pure layout/style triggers to formatting-layout',
    );
    assert.equal(
      text.includes('converting-artifacts'),
      true,
      'editing-documents must route format conversion triggers to converting-artifacts',
    );
  },
);

test(
  'converting-artifacts establishes source priority rule',
  { skip },
  async () => {
    const text = await readSkill('converting-artifacts');
    assert.equal(
      /source priority/i.test(text),
      true,
      'converting-artifacts must establish source priority rule',
    );
  },
);

test(
  'converting-artifacts enforces post-conversion verification and stale check rule',
  { skip },
  async () => {
    const text = await readSkill('converting-artifacts');
    assert.equal(
      text.includes('verifying-artifacts'),
      true,
      'converting-artifacts must declare dependency on verifying-artifacts',
    );
    assert.equal(
      /stale/i.test(text),
      true,
      'converting-artifacts must state that prior checks are stale after conversion',
    );
    assert.equal(
      /corrupt/i.test(text),
      true,
      'converting-artifacts must forbid treating exit 0 as success when output is corrupt',
    );
  },
);

test(
  'router references formatting-layout under document skills and converting-artifacts under transform skills',
  { skip },
  async () => {
    const text = await readSkill('using-workspace-superpowers');
    for (const name of ['formatting-layout', 'converting-artifacts']) {
      assert.equal(text.includes(name), true, `router missing reference to ${name}`);
    }
  },
);

test(
  'working-with-presentations enforces fixed geometry and speaker notes separation',
  { skip },
  async () => {
    const text = await readSkill('working-with-presentations');
    assert.equal(
      /fixed (canvas|aspect ratio|geometry)/i.test(text),
      true,
      'working-with-presentations must enforce fixed geometry',
    );
    assert.equal(
      /speaker notes/i.test(text),
      true,
      'working-with-presentations must require speaker notes separation',
    );
    assert.equal(
      text.includes('verifying-artifacts'),
      true,
      'working-with-presentations must declare dependency on verifying-artifacts',
    );
  },
);

test(
  'storyboarding-slides produces action headlines and narrative progression',
  { skip },
  async () => {
    const text = await readSkill('storyboarding-slides');
    assert.equal(
      /action headline/i.test(text),
      true,
      'storyboarding-slides must enforce action headlines',
    );
    assert.equal(
      /narrative (arc|progression)/i.test(text),
      true,
      'storyboarding-slides must enforce narrative progression',
    );
    assert.equal(
      text.includes('working-with-presentations'),
      true,
      'storyboarding-slides must hand off to working-with-presentations',
    );
  },
);

test(
  'working-with-visuals preserves vector graphics and handles layered image limitations',
  { skip },
  async () => {
    const text = await readSkill('working-with-visuals');
    assert.equal(
      /rasteriz/i.test(text),
      true,
      'working-with-visuals must enforce vector preservation without unintended rasterization',
    );
    assert.equal(
      /layered/i.test(text) && /limitation/i.test(text),
      true,
      'working-with-visuals must handle layered image limitation reporting',
    );
    assert.equal(
      text.includes('verifying-artifacts'),
      true,
      'working-with-visuals must declare dependency on verifying-artifacts',
    );
  },
);

test(
  'router references presentation and visual specialist skills',
  { skip },
  async () => {
    const text = await readSkill('using-workspace-superpowers');
    for (const name of [
      'working-with-presentations',
      'storyboarding-slides',
      'working-with-visuals',
    ]) {
      assert.equal(text.includes(name), true, `router missing reference to ${name}`);
    }
  },
);
