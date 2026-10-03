import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { toTodoWriteArgs } = require('./native-checklist.cjs');

test('maps portable checklist states to the native TodoWrite schema in order', () => {
  const result = toTodoWriteArgs([
    { title: 'Read the brief', status: 'pending', priority: 'high' },
    { title: 'Implement the adapter', status: 'in_progress' },
    { title: 'Verify the package', status: 'completed', priority: 'medium' },
    { title: 'Optional follow-up', status: 'cancelled' },
  ]);

  assert.deepEqual(result, {
    todos: [
      { content: 'Read the brief', status: 'pending', priority: 'high' },
      { content: 'Implement the adapter', status: 'in_progress' },
      { content: 'Verify the package', status: 'completed', priority: 'medium' },
      { content: 'Optional follow-up', status: 'cancelled' },
    ],
  });
});

test('preserves lossy portable states in content while exposing one native active row', () => {
  const result = toTodoWriteArgs([
    { title: 'Waiting for approval', status: 'awaiting_user' },
    { title: 'Missing host trace', status: 'blocked' },
    { title: 'Paused follow-up', status: 'paused' },
  ]);

  assert.deepEqual(result.todos.map(({ content, status }) => ({ content, status })), [
    { content: '[awaiting_user] Waiting for approval', status: 'in_progress' },
    { content: '[blocked] Missing host trace', status: 'pending' },
    { content: '[paused] Paused follow-up', status: 'pending' },
  ]);
});

test('keeps a portable in-progress row authoritative over lossy states', () => {
  const result = toTodoWriteArgs([
    { title: 'Current work', status: 'in_progress' },
    { title: 'Needs a decision', status: 'awaiting_user' },
    { title: 'Known blocker', status: 'blocked' },
  ]);

  assert.equal(result.todos[0].status, 'in_progress');
  assert.equal(result.todos[1].status, 'pending');
  assert.equal(result.todos[2].status, 'pending');
  assert.match(result.todos[1].content, /^\[awaiting_user\]/);
  assert.match(result.todos[2].content, /^\[blocked\]/);
});

test('bounds native content to 500 Unicode characters', () => {
  const longTitle = '🙂'.repeat(501);
  const result = toTodoWriteArgs([{ title: longTitle, status: 'pending' }]);
  assert.ok(Array.from(result.todos[0].content).length <= 500);
  assert.ok(result.todos[0].content.endsWith('…'));
});

test('rejects invalid native TodoWrite cardinality and conflicting active rows', () => {
  assert.throws(
    () => toTodoWriteArgs([
      { title: 'One', status: 'in_progress' },
      { title: 'Two', status: 'in_progress' },
    ]),
    /at most one in_progress/
  );

  assert.throws(
    () => toTodoWriteArgs(Array.from({ length: 51 }, (_, index) => ({
      title: `Task ${index + 1}`,
      status: 'pending',
    }))),
    /at most 50/
  );
});
