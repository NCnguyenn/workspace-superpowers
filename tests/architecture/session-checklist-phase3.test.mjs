import test from 'node:test';
import assert from 'node:assert/strict';
import { exists, readUtf8 } from './helpers.mjs';

// These assertions preserve Phase 3's evidence boundary. They do not establish
// that a host rendered a checklist, returned a user action, or ran a live model.
const MATRIX = 'docs/verification/session-checklist-phase3-capability-matrix.md';
const PHASE2_BLOCKER = 'tests/scenarios/reports/session-checklist-phase2-20261002/blocker.md';

async function matrix() {
  assert.equal(await exists(MATRIX), true, `${MATRIX} is missing`);
  return readUtf8(MATRIX);
}

function row(source, host) {
  const match = source.match(new RegExp(`^\\| \\*\\*${host}[^\\n]*$`, 'm'));
  assert.ok(match, `missing ${host} host matrix row`);
  return match[0];
}

test('Phase 3 capability matrix is discovery-only and preserves the text fallback', async () => {
  const source = await matrix();

  assert.match(source, /native-host discovery and design only/i);
  assert.match(source, /chat-managed Markdown\/plain-text fallback/i);
  assert.match(source, /does not add a native panel.*runtime event bridge.*database.*MCP write surface/i);
  assert.match(source, /No host is admitted to Phase 4/i);
  assert.match(source, /package validation.*static architecture tests.*bootstrap injection.*controlled lifecycle hook.*question card.*read-only MCP catalogue.*not native Session Checklist acceptance/i);
});

test('matrix preserves the Phase 2 blocker and leaves every SCL case non-PASS', async () => {
  const source = await matrix();

  assert.equal(await exists(PHASE2_BLOCKER), true, `${PHASE2_BLOCKER} is missing`);
  assert.match(source, /The Phase 2 campaign remains blocked/i);
  const cases = [...source.matchAll(/^\| (SCL\d{2}) \| `([A-Z]+)` \|/gm)];
  assert.equal(cases.length, 10, 'matrix must retain exactly ten SCL rows');
  assert.deepEqual(cases.map((match) => match[1]), Array.from({ length: 10 }, (_, index) => `SCL${String(index + 1).padStart(2, '0')}`));
  assert.ok(cases.every((match) => match[2] !== 'PASS'), 'Phase 3 must not promote SCL cases to PASS');
  assert.ok(cases.every((match) => match[2] === 'BLOCKED'), 'Phase 3 must preserve the recorded Phase 2 blocker status');
});

test('matrix evaluates all scoped hosts across the native bridge evidence categories', async () => {
  const source = await matrix();

  for (const host of [
    'Pi Desktop',
    'Pi CLI',
    'ChatGPT Desktop / local marketplace plugin / read-only MCP',
    'Antigravity Desktop / directory plugin',
  ]) {
    const hostRow = row(source, host);
    assert.match(hostRow, /`(?:verified|documented but unverified|unavailable|unknown)`/i, `${host} needs an evidence classification`);
  }

  for (const heading of [
    'Event mechanism for checklist transitions',
    'Transient state owner and compaction/restart',
    'Native display surface',
    'User-action return path',
    'Request scoping and lifecycle viability',
    'Evidence quality and Phase 3 conclusion',
  ]) assert.match(source, new RegExp(heading, 'i'));
});

test('matrix cites the host evidence and rejects misleading substitutes', async () => {
  const source = await matrix();

  for (const locator of [
    'docs/verification/pi-desktop-0.15.9-host-contract.md',
    'adapters/pi/tools.md',
    'adapters/pi-cli/lifecycle.mjs',
    'adapters/pi-cli/README.md',
    'adapters/chatgpt/acceptance.md',
    'adapters/chatgpt/tools.md',
    'adapters/mcp/catalog.mjs',
    'adapters/antigravity/capabilities.md',
    'adapters/antigravity/tools.md',
    'adapters/antigravity/install.md',
  ]) assert.match(source, new RegExp(locator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

  assert.match(source, /hostBoundary: PASS.*modelAcceptance: PENDING/i);
  assert.match(source, /asktool.*not evidence of a progress\/todo renderer/i);
  assert.match(source, /controlled registration.*not a live model or checklist event trace/i);
  assert.match(source, /read-only packaged content and no state\/write capability/i);
  assert.match(source, /validation does not enable a plugin/i);
});

test('Phase 4 is blocked until every native bridge prerequisite has retained evidence', async () => {
  const source = await matrix();

  assert.match(source, /Phase 4 admission gate[\s\S]*Status: BLOCKED for all hosts/i);
  for (const requirement of [
    'checklist-specific native event or extension input',
    'transient state owner',
    'native renderer/panel',
    'user-action payload',
    'request/session scoping',
    'Permission and installation evidence',
    'live lifecycle acceptance',
    'portable state model, Phase 2 campaign semantics, and read-only MCP boundary',
  ]) assert.match(source, new RegExp(requirement, 'i'));

  assert.match(source, /No host was installed, enabled, mutated, or driven through a live checklist campaign/i);
});
