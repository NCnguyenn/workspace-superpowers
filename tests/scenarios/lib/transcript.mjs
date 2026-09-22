// Schema v2. The trusted broker records paired tool events; the model cannot.
import path from 'node:path';
export const SCHEMA_VERSION = 2;
export function argToString(v) { return typeof v === 'string' ? v : JSON.stringify(v); }
export function normalizePath(v) { return path.posix.normalize(String(v).replaceAll('\\', '/')).replace(/^\.\//, ''); }
export function argsMatch(actual, pattern) {
  return Object.entries(pattern || {}).every(([key, want]) => {
    const have = actual?.[key];
    if (have === undefined) return false;
    if (want && typeof want === 'object' && want.regex) return new RegExp(want.regex, want.flags || '').test(argToString(have));
    if (['path', 'input', 'output', 'src', 'out', 'file'].includes(key)) {
      const identity = p => process.platform === 'win32' ? normalizePath(p).toLowerCase() : normalizePath(p);
      return identity(have) === identity(want);
    }
    return argToString(have) === argToString(want);
  });
}
export function isToolCall(e, spec) { return e?.type === 'tool_call' && e.tool === spec.tool && argsMatch(e.args, spec.args); }
export function validateTranscript(t) {
  if (t?.schemaVersion !== SCHEMA_VERSION) return 'unsupported transcript schema';
  if (t.status !== 'completed') return `executor status=${t.status}: ${t.error || 'incomplete'}`;
  if (!Array.isArray(t.events) || !t.events.length) return 'no events';
  const calls = new Map(), results = new Set();
  let finalized = false;
  for (const e of t.events) {
    if (!e || finalized) return 'events after final or invalid event';
    if (e.type === 'tool_call') {
      if (typeof e.id !== 'string' || !e.id || calls.has(e.id) || typeof e.tool !== 'string' || !e.args || typeof e.args !== 'object') return 'invalid/duplicate tool call';
      calls.set(e.id, e);
    } else if (e.type === 'tool_result') {
      if (!calls.has(e.id) || results.has(e.id) || calls.get(e.id).tool !== e.tool || typeof e.ok !== 'boolean'
        || !e.result || typeof e.result !== 'object' || Array.isArray(e.result)) return 'unpaired/invalid tool result';
      results.add(e.id);
    } else if (e.type === 'final') {
      if (typeof e.text !== 'string' || !e.text.trim()) return 'missing final text';
      finalized = true;
    } else if (e.type !== 'message') return 'unknown event type';
  }
  if (calls.size !== results.size) return 'incomplete tool evidence';
  return finalized ? null : 'missing final event';
}
export function successfulCalls(events, spec) {
  return events.flatMap((e, index) => {
    if (!isToolCall(e, spec)) return [];
    const resultIndex = events.findIndex((r, i) => i > index && r.type === 'tool_result' && r.id === e.id && r.tool === e.tool && r.ok === true);
    return resultIndex < 0 ? [] : [{ ...e, index, resultIndex, result: events[resultIndex].result }];
  });
}
export function toolCalled(events, spec) { return successfulCalls(events, spec).length > 0; }
export function ordered(events, first, then) {
  return successfulCalls(events, first).some(a => successfulCalls(events, then).some(b => a.resultIndex < b.index));
}
export function finalText(events) { return events.findLast(e => e.type === 'final')?.text || ''; }
export function countToolCalls(events, spec) { return events.filter(e => isToolCall(e, spec)).length; }
export function editLifecycle(events, input, output) {
  const reads = successfulCalls(events, { tool: 'read_file', args: { path: input } });
  const writes = successfulCalls(events, { tool: 'write_file', args: { path: output } });
  const verifies = successfulCalls(events, { tool: 'read_file', args: { path: output } });
  return writes.length > 0 && reads.some(r => r.resultIndex < writes[0].index)
    && verifies.some(v => v.index > writes.at(-1).resultIndex);
}
