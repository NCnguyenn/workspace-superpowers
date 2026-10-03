'use strict';

const NATIVE_STATUSES = new Set(['pending', 'in_progress', 'completed', 'cancelled']);
const PORTABLE_STATUSES = new Set([
  'pending',
  'in_progress',
  'completed',
  'awaiting_user',
  'blocked',
  'paused',
  'cancelled',
]);
const LOSSY_STATUSES = new Set(['awaiting_user', 'blocked', 'paused']);
const PRIORITIES = new Set(['high', 'medium', 'low']);
const MAX_ITEMS = 50;
const MAX_CONTENT_CHARACTERS = 500;

function truncateContent(content) {
  const characters = Array.from(content);
  if (characters.length <= MAX_CONTENT_CHARACTERS) return content;
  return `${characters.slice(0, MAX_CONTENT_CHARACTERS - 1).join('')}…`;
}

function taskContent(task, status) {
  const title = typeof task?.title === 'string' ? task.title : task?.content;
  if (typeof title !== 'string' || title.trim() === '') {
    throw new TypeError('Each checklist task requires a non-empty title or content.');
  }
  const trimmed = title.trim();
  return truncateContent(LOSSY_STATUSES.has(status) ? `[${status}] ${trimmed}` : trimmed);
}

function toTodoWriteArgs(tasks) {
  if (!Array.isArray(tasks)) throw new TypeError('Checklist tasks must be an array.');
  if (tasks.length > MAX_ITEMS) {
    throw new RangeError('Native TodoWrite supports at most 50 checklist items.');
  }

  const activeRows = tasks.filter((task) => task?.status === 'in_progress');
  if (activeRows.length > 1) {
    throw new Error('Portable checklist may contain at most one in_progress task.');
  }

  const fallbackActiveIndex = activeRows.length === 0
    ? tasks.findIndex((task) => LOSSY_STATUSES.has(task?.status))
    : -1;

  return {
    todos: tasks.map((task, index) => {
      const portableStatus = task?.status;
      if (!PORTABLE_STATUSES.has(portableStatus)) {
        throw new TypeError(`Unsupported portable checklist status: ${String(portableStatus)}.`);
      }

      let status;
      if (NATIVE_STATUSES.has(portableStatus)) {
        status = portableStatus;
      } else if (index === fallbackActiveIndex) {
        status = 'in_progress';
      } else {
        status = 'pending';
      }

      const nativeTask = {
        content: taskContent(task, portableStatus),
        status,
      };
      if (PRIORITIES.has(task?.priority)) nativeTask.priority = task.priority;
      return nativeTask;
    }),
  };
}

module.exports = {
  MAX_CONTENT_CHARACTERS,
  MAX_ITEMS,
  toTodoWriteArgs,
};
