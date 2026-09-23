import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const main = require(path.join(__dirname, 'main.cjs'));

test('main.cjs registers before_agent_start hook via onLoad and init', async () => {
  assert.equal(typeof main.onLoad, 'function');
  assert.equal(typeof main.onUnload, 'function');
  assert.equal(typeof main, 'function');

  let registeredEvent = null;
  let registeredHandler = null;
  const mockPi = {
    on(event, handler) {
      registeredEvent = event;
      registeredHandler = handler;
    },
  };

  await main.onLoad(mockPi);
  assert.equal(registeredEvent, 'before_agent_start');
  assert.equal(typeof registeredHandler, 'function');

  // Test prompt injection and in-place event mutation
  const eventObj = { systemPrompt: 'Base prompt.' };
  const result = await registeredHandler(eventObj);
  assert.ok(result && typeof result.systemPrompt === 'string');
  assert.match(result.systemPrompt, /^Base prompt\.\n\n/);
  assert.match(result.systemPrompt, /## Workspace Superpowers/);
  assert.equal(eventObj.systemPrompt, result.systemPrompt);

  // Test protection when event.systemPrompt is a getter-only property
  const getterEvent = {
    get systemPrompt() {
      return 'Getter prompt.';
    },
  };
  const getterResult = await registeredHandler(getterEvent);
  assert.ok(getterResult && typeof getterResult.systemPrompt === 'string');
  assert.match(getterResult.systemPrompt, /^Getter prompt\.\n\n/);

  // Test idempotency when already injected
  const alreadyInjectedResult = await registeredHandler({
    systemPrompt: result.systemPrompt,
  });
  assert.equal(alreadyInjectedResult, undefined);

  // Test with empty base prompt
  const emptyResult = await registeredHandler({ systemPrompt: '' });
  assert.ok(emptyResult && typeof emptyResult.systemPrompt === 'string');
  assert.match(emptyResult.systemPrompt, /## Workspace Superpowers/);
});

async function runtimeHook() {
  let hook;
  await main.onLoad({ on(event, handler) { hook = handler; } });
  return hook;
}

function assertStageCalls(prompt) {
  for (const name of ['scoping-the-brief', 'analyzing-artifacts', 'planning-work',
    'drafting-prose', 'writing-reports', 'reviewing-work']) {
    assert.ok(prompt.includes(`id: "local.workspace-superpowers/${name}"`), name);
  }
  assert.match(prompt, /MUST call the `Skill` tool/);
  assert.match(prompt, /FORBIDDEN:.*NEVER draft section prose/);
  assert.match(prompt, /does NOT authorize writing prose directly/);
  assert.match(prompt, /academic-writing-style\.md/);
  for (const rule of ['S1', 'F1', 'R4']) assert.ok(prompt.includes(rule), rule);
  assert.match(prompt, /before delivering/i);
  assert.ok(prompt.includes('1 → 1.x → 1.x.x'));
  assert.match(prompt, /verbatim/);
  assert.match(prompt, /before preparing the outline/);
  for (const marker of ['PEEL', '65%', '## References', 'local.workspace-superpowers/citing-sources']) {
    assert.ok(prompt.includes(marker), `runtime refinements missing ${marker}`);
  }
  assert.match(prompt, /before (?:finalizing|presenting) the requirement analysis/i);
}

test('each fresh turn receives mandatory native stage calls and style binding', async () => {
  const hook = await runtimeHook();
  for (const base of ['Initial task.', 'Analysis approved.', 'Outline approved; write now.']) {
    const event = { systemPrompt: base };
    const result = await hook(event);
    assertStageCalls(result.systemPrompt);
    assert.equal(event.systemPrompt, result.systemPrompt);
    assert.equal(await hook(event), undefined, 'current instructions must not duplicate');
  }
});

test('legacy bootstrap markers and headings cannot suppress mandatory stage calls', async () => {
  const hook = await runtimeHook();
  for (const legacy of [
    '<!-- workspace-superpowers:begin -->\nOld routing.\n<!-- workspace-superpowers:end -->',
    '## Workspace Superpowers\nCustom development plugin path: D:/plugins/workspace.',
  ]) {
    const original = `Project instructions.\n${legacy}\nKeep project constraints.`;
    const result = await hook({ systemPrompt: original });
    assert.ok(result, 'legacy instructions need the current invocation contract');
    assert.ok(result.systemPrompt.startsWith(original), 'preserve existing project instructions');
    assertStageCalls(result.systemPrompt);
    assert.equal(await hook({ systemPrompt: result.systemPrompt }), undefined);
  }
});

test('stale invocation contract is refreshed without duplicating it or changing surrounding text', async () => {
  const hook = await runtimeHook();
  const stale = 'Project prefix.\n## Workspace Superpowers\n'
    + '<!-- workspace-superpowers:skill-invocation:begin -->\nOld invocation rules.\n'
    + '<!-- workspace-superpowers:skill-invocation:end -->\nProject suffix.';
  const result = await hook({ systemPrompt: stale });
  assert.ok(result);
  assertStageCalls(result.systemPrompt);
  assert.ok(result.systemPrompt.startsWith('Project prefix.\n## Workspace Superpowers\n'));
  assert.ok(result.systemPrompt.endsWith('\nProject suffix.'));
  assert.ok(!result.systemPrompt.includes('Old invocation rules.'));
  assert.equal(result.systemPrompt.split('<!-- workspace-superpowers:skill-invocation:begin -->').length, 2);
  assert.equal(await hook({ systemPrompt: result.systemPrompt }), undefined);
});

test('main.cjs registers hook via pi.events if pi.on is absent', async () => {
  let registeredEvent = null;
  let registeredHandler = null;
  const mockPi = {
    events: {
      on(event, handler) {
        registeredEvent = event;
        registeredHandler = handler;
      },
    },
  };

  main(mockPi);
  assert.equal(registeredEvent, 'before_agent_start');
  assert.equal(typeof registeredHandler, 'function');
});

test('main.cjs handles context with nested .pi property and prevents duplicate registration', async () => {
  let calls = 0;
  const mockPi = {
    on(event, handler) {
      calls++;
    },
  };

  await main.onLoad({ pi: mockPi });
  assert.equal(calls, 1);

  // Subsequent call on same pi instance is idempotent
  await main.onLoad(mockPi);
  main(mockPi);
  assert.equal(calls, 1);
});

const routingStart = '<!-- workspace-superpowers:routing:begin -->';
const routingEnd = '<!-- workspace-superpowers:routing:end -->';
const invocationStart = '<!-- workspace-superpowers:skill-invocation:begin -->';

function assertRouting(prompt) {
  assert.equal(prompt.split(routingStart).length, 2, 'one managed routing block');
  const routing = prompt.split(routingStart)[1].split(routingEnd)[0];
  assert.match(routing, /every (new )?(user )?(message|turn)/i);
  assert.ok(routing.includes('id: "local.workspace-superpowers/using-workspace-superpowers"'));
  for (const need of ['Simple Q&A', 'pending', 'current request', 'catalog', 'Skill']) {
    assert.ok(routing.includes(need), `routing covers ${need}`);
  }
}

test('every turn receives routing even when legacy stage instructions are already current', async () => {
  const hook = await runtimeHook();
  const initial = await hook({ systemPrompt: 'Project rules.' });
  const stage = initial.systemPrompt.slice(initial.systemPrompt.indexOf(invocationStart),
    initial.systemPrompt.indexOf('<!-- workspace-superpowers:skill-invocation:end -->')
      + '<!-- workspace-superpowers:skill-invocation:end -->'.length);
  for (const header of ['## Workspace Superpowers\n', '']) {
    const base = `${header}Custom path: D:/custom/plugin.\n${stage}\nKeep this suffix.`;
    const result = await hook({ systemPrompt: base });
    assert.ok(result, 'current stage block alone must not suppress routing');
    assertRouting(result.systemPrompt);
    assertStageCalls(result.systemPrompt);
    assert.ok(result.systemPrompt.includes('Custom path: D:/custom/plugin.'));
    assert.ok(result.systemPrompt.endsWith('Keep this suffix.'));
    assert.equal(await hook({ systemPrompt: result.systemPrompt }), undefined);
  }
});

test('stale routing refreshes independently of current stage rules', async () => {
  const hook = await runtimeHook();
  const initial = await hook({ systemPrompt: 'Prefix with $& and custom constraints.' });
  assertRouting(initial.systemPrompt);
  const stale = initial.systemPrompt.replace(
    /<!-- workspace-superpowers:routing:begin -->[\s\S]*?<!-- workspace-superpowers:routing:end -->/,
    `${routingStart}\nAlways continue the previous stage.\n${routingEnd}`,
  );
  const result = await hook({ systemPrompt: `${stale}\nProject suffix.` });
  assertRouting(result.systemPrompt);
  assertStageCalls(result.systemPrompt);
  assert.ok(!result.systemPrompt.includes('Always continue the previous stage.'));
  assert.ok(result.systemPrompt.startsWith('Prefix with $& and custom constraints.'));
  assert.ok(result.systemPrompt.endsWith('Project suffix.'));
  assert.equal(await hook({ systemPrompt: result.systemPrompt }), undefined);
});

test('unchanged base on later turns still gets current routing without persistent hook state', async () => {
  const hook = await runtimeHook();
  for (let turn = 0; turn < 3; turn++) {
    const result = await hook({ systemPrompt: 'Base restored by host.' });
    assertRouting(result.systemPrompt);
    assert.equal(result.systemPrompt.split(invocationStart).length, 2);
  }
});

test('hosts exposing on and events.on register only one turn handler', () => {
  const registered = [];
  main({
    on(event, handler) { registered.push({ event, handler }); },
    events: { on(event, handler) { registered.push({ event, handler }); } },
  });
  assert.equal(registered.length, 1);
  assert.equal(registered[0].event, 'before_agent_start');
});
