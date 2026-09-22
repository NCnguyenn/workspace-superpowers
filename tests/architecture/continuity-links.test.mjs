import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { exists, readUtf8, skillFiles, walk } from './helpers.mjs';

// Reference reachability only. These checks do not evaluate model behavior.
function targets(file, text) {
  return [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1].split('#')[0])
    .filter((target) => target && !/^[a-z]+:/i.test(target))
    .map((target) => path.posix.normalize(path.posix.join(path.posix.dirname(file), target)));
}

test('every skill and bootstrap can reach the shared workflow contract directly', async () => {
  const reference = 'references/workflow-continuity.md';
  assert.equal(await exists(reference), true, `missing ${reference}`);
  for (const file of ['AGENTS.md', ...await skillFiles()]) {
    assert.ok(targets(file, await readUtf8(file)).includes(reference), `${file}: missing workflow handoff`);
  }
});

test('document continuity reaches input, authoring, review, and handoff consumers', async () => {
  const reference = 'references/document-continuity.md';
  assert.equal(await exists(reference), true, `missing ${reference}`);
  const skills = ['reading-artifacts', 'analyzing-artifacts', 'planning-work',
    'drafting-prose', 'editing-documents', 'writing-reports',
    'writing-academic-prose', 'reviewing-work'];
  const files = [...skills.map((name) => `skills/${name}/SKILL.md`),
    'agents/drafter.md', 'agents/reviewer-coherence.md', 'agents/reviewer-prose.md',
    'templates/brief.md', 'references/academic-writing-style.md'];
  for (const file of files) {
    assert.ok(targets(file, await readUtf8(file)).includes(reference), `${file}: missing continuity handoff`);
  }
});

test('local Markdown references across the distributed instruction pack resolve', async () => {
  const files = ['AGENTS.md', 'README.md', ...await walk('skills'),
    ...await walk('agents'), ...await walk('references'), ...await walk('templates')]
    .filter((file) => file.endsWith('.md'));
  for (const file of files) {
    for (const target of targets(file, await readUtf8(file))) {
      assert.ok(!target.startsWith('../') && !path.posix.isAbsolute(target), `${file}: nonportable ${target}`);
      assert.equal(await exists(target), true, `${file}: broken reference ${target}`);
    }
  }
});
