import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Structural reachability only; a live Pi trace is needed to prove model behavior.
test('Pi startup is a bounded handoff to the installed router', async () => {
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  assert.ok(bootstrap.length <= 4096, `bootstrap is ${bootstrap.length} characters`);
  assert.ok(bootstrap.split(/\r?\n/).length <= 80);
  assert.match(bootstrap, /^<!-- workspace-superpowers:begin -->/);
  assert.match(bootstrap, /<!-- workspace-superpowers:pi-bootstrap:v\d+ -->/);
  assert.match(bootstrap, /<!-- workspace-superpowers:end -->\s*$/);
  assert.match(bootstrap, /local\.workspace-superpowers\/using-workspace-superpowers/);
  assert.match(bootstrap, /skills\/using-workspace-superpowers\/SKILL\.md/);
  assert.match(bootstrap, /adapters\/pi\/tools\.md/);
  assert.match(bootstrap, /actual catalog ID/);
  assert.match(bootstrap, /every\s+Workspace turn/i);
  assert.match(bootstrap, /specialist[\s\S]*before/i);
  assert.match(bootstrap, /Coding.*Simple Q&A.*Mixed/s);
  assert.match(bootstrap, /unavailable/i);
});

test('router handoff reaches the document gate and evidence owners', async () => {
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  const router = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  assert.match(bootstrap, /skills\/using-workspace-superpowers\/SKILL\.md/);
  for (const specialist of ['scoping-the-brief', 'planning-work', 'drafting-prose']) {
    assert.ok(router.includes(`invoke_skill("${specialist}")`), `router does not invoke ${specialist}`);
  }
  assert.match(router, /verifying-artifacts/);
  assert.match(router, /references\/criteria-writing-contract\.md/);
  assert.match(router, /references\/outline-structure\.md/);
  assert.match(router, /references\/work-tracking\.md/);
  const criteria = await readUtf8('references/criteria-writing-contract.md');
  assert.match(criteria, /## Criterion-level analysis and two stops/);
  assert.match(criteria, /complete drafted text[\s\S]*chat/i);
  const outline = await readUtf8('references/outline-structure.md');
  assert.match(outline, /verbatim/);
  assert.match(outline, /evidence_readiness/);
});
