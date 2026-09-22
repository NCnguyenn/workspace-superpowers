import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { exists, readUtf8 } from './helpers.mjs';

// Wiring only: behavior is checked with fresh-context scenarios separately.
function links(file, text) {
  return [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1].split('#')[0])
    .filter((target) => target && !/^[a-z]+:/i.test(target))
    .map((target) => path.posix.normalize(path.posix.join(path.posix.dirname(file), target)));
}

test('work tracking is reachable from startup, lifecycle, roles and existing contracts', async () => {
  const target = 'references/work-tracking.md';
  assert.equal(await exists(target), true);
  const files = [
    'AGENTS.md', 'adapters/pi/tools.md',
    'references/workflow-continuity.md', 'references/project-grounding.md',
    'references/criteria-writing-contract.md',
    ...['using-workspace-superpowers', 'scoping-the-brief', 'reading-artifacts',
      'analyzing-artifacts', 'planning-work', 'editing-documents', 'drafting-prose',
      'converting-artifacts', 'reviewing-work', 'verifying-artifacts',
      'packaging-deliverables'].map((name) => `skills/${name}/SKILL.md`),
    ...['inspector', 'drafter', 'reviewer-requirement', 'verifier', 'packager']
      .map((name) => `agents/${name}.md`),
    'templates/brief.md', 'templates/outline.md', 'templates/work-plan.md',
  ];
  for (const file of files) {
    assert.ok(links(file, await readUtf8(file)).includes(target), `${file}: missing tracking handoff`);
  }
  // Bootstrap is copied to arbitrary project roots; its locator must resolve
  // inside the installed package, not from that destination's relative path.
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  assert.ok(bootstrap.includes('`references/work-tracking.md`'));
  assert.ok(bootstrap.includes('inside the installed'));
});

test('tracking guidance resolves to existing owners and the single plan template', async () => {
  const file = 'references/work-tracking.md';
  const targets = links(file, await readUtf8(file));
  for (const target of ['templates/work-plan.md', 'references/workflow-continuity.md',
    'references/project-grounding.md', 'references/criteria-writing-contract.md',
    'skills/planning-work/SKILL.md', 'skills/editing-documents/SKILL.md',
    'skills/reading-artifacts/SKILL.md', 'skills/verifying-artifacts/SKILL.md']) {
    assert.ok(targets.includes(target), `missing owner/template: ${target}`);
    assert.equal(await exists(target), true, `broken target: ${target}`);
  }
});
