import test from 'node:test';
import assert from 'node:assert/strict';
import { readUtf8 } from './helpers.mjs';

// Structural guards only; native PI display and model behavior require traces.
test('shared question guidance separates missing facts from approval of visible content', async () => {
  const text = await readUtf8('references/guided-questions.md');
  assert.match(text, /complete analysis or detailed outline[\s\S]*same chat response/i);
  assert.match(text, /internal reasoning[\s\S]*file path[\s\S]*not.*display/i);
  assert.match(text, /one focused question/i);
  assert.match(text, /evidence card.*does not.*approval card/i);
});

test('an unseen proposal is redisplayed without treating a visibility complaint as approval', async () => {
  for (const file of ['references/guided-questions.md', 'adapters/pi/bootstrap.md']) {
    const text = await readUtf8(file);
    assert.match(text, /cannot see[\s\S]*redisplay[\s\S]*pending/i, file);
    assert.match(text, /not open another approval card/i, file);
    assert.match(text, /Stop 2[\s\S]*question.*option/i, file);
  }
});

test('visible delivery rules reach refreshed PI instructions and both approval owners', async () => {
  const bootstrap = await readUtf8('adapters/pi/bootstrap.md');
  const managed = bootstrap.match(/<!-- workspace-superpowers:skill-invocation:begin -->([\s\S]*?)<!-- workspace-superpowers:skill-invocation:end -->/)[1];
  assert.match(managed, /complete analysis or detailed outline[\s\S]*same chat response/i);
  for (const file of ['skills/scoping-the-brief/SKILL.md', 'skills/planning-work/SKILL.md', 'references/criteria-writing-contract.md']) {
    const text = await readUtf8(file);
    assert.match(text, /guided-questions\.md/);
    assert.match(text, /visible delivery and recovery/i, file);
  }
});

test('operation routing permits dependencies without forcing a complete lifecycle', async () => {
  const router = await readUtf8('skills/using-workspace-superpowers/SKILL.md');
  assert.doesNotMatch(router, /call the one specialist|substantial tasks execute the full sequence/i);
  assert.match(router, /additional skills.*dependencies/i);
  assert.doesNotMatch(router, /`scoping-the-brief → reading-artifacts → analyzing-artifacts/);
});

test('a supplied guide does not force repeated intake on a named-section continuation', async () => {
  for (const file of ['skills/scoping-the-brief/SKILL.md', 'skills/analyzing-artifacts/SKILL.md', 'adapters/pi/bootstrap.md']) {
    const text = await readUtf8(file);
    assert.match(text, /no named section/i, file);
    assert.match(text, /reuse.*intake map/i, file);
  }
});

test('approval-card exceptions agree across shared and PI guidance', async () => {
  const guide = await readUtf8('references/guided-questions.md');
  const adapter = await readUtf8('adapters/pi/tools.md');
  assert.match(guide, /approval[\s\S]*only when the user explicitly requests/i);
  assert.match(guide, /host cannot show that message[\s\S]*chat question and end the turn/i);
  assert.match(guide, /never prepared[\s\S]*prepare it first/i);
  assert.match(adapter, /approval cards require an\s+explicit user request/i);
  assert.match(adapter, /host cannot[\s\S]*end with the proposal and review question/i);
});
