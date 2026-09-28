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
  for (const file of ['references/guided-questions.md']) {
    const text = await readUtf8(file);
    assert.match(text, /cannot see[\s\S]*redisplay[\s\S]*pending/i, file);
    assert.match(text, /not open another approval card/i, file);
    assert.match(text, /Stop 2[\s\S]*question.*option/i, file);
  }
});

test('visible delivery rules reach both approval owners', async () => {
  const guidance = await readUtf8('references/guided-questions.md');
  assert.match(guidance, /complete analysis or detailed outline[\s\S]*same chat response/i);
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
  for (const file of ['skills/scoping-the-brief/SKILL.md', 'skills/analyzing-artifacts/SKILL.md']) {
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

test('a question card has no Back control and its answer is not locked', async () => {
  for (const file of ['references/guided-questions.md', 'adapters/pi/tools.md', 'skills/scoping-the-brief/SKILL.md']) {
    const text = await readUtf8(file);
    assert.match(text, /no back parameter/i, file);
    assert.match(text, /host gap/i, file);
    assert.match(text, /do not invent a Back button/i, file);
    assert.match(text, /not locked until the user confirms/i, file);
    assert.match(text, /confirm or correct/i, file);
  }
});
