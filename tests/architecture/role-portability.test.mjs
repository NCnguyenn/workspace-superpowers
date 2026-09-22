import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { agentFiles, allowPartial, readUtf8 } from './helpers.mjs';

const EXPECTED_ROLES = [
  'inspector',
  'researcher',
  'drafter',
  'formatter',
  'verifier',
  'packager',
  'reviewer-requirement',
  'reviewer-coherence',
  'reviewer-citation',
  'reviewer-visual',
  'reviewer-prose',
  'reviewer-mathematics',
];

test('every role file in agents/ adheres to the role prompt contract', async (t) => {
  const files = await agentFiles();
  t.diagnostic(`checked ${files.length} agent role file(s) under agents/`);

  if (!allowPartial()) {
    assert.ok(
      files.length >= EXPECTED_ROLES.length,
      `expected at least ${EXPECTED_ROLES.length} role files, found ${files.length}`,
    );
    const names = new Set(files.map((file) => path.basename(file, '.md')));
    for (const name of EXPECTED_ROLES) {
      assert.ok(names.has(name), `missing required role ${name}`);
    }
  }

  for (const rel of files) {
    const text = await readUtf8(rel);
    const basename = path.basename(rel, '.md');

    // Title matches role name
    assert.match(
      text,
      new RegExp(`^# Role: ${basename}`, 'm'),
      `${rel} must start with '# Role: ${basename}'`,
    );

    // Required contract sections (§9.4)
    const requiredSections = [
      '## Context Supplied',
      '## Job',
      '## Hard Limits',
      '## Required Capabilities',
      '## Output Shape',
    ];

    for (const section of requiredSections) {
      assert.ok(
        text.includes(section),
        `${rel} missing required section '${section}' per role prompt contract (§9.4)`,
      );
    }

    // Role portability: must not supply orchestrator session history
    assert.ok(
      text.includes("orchestrator session history"),
      `${rel} must explicitly state it is never supplied with orchestrator session history`,
    );
  }
});
