/* global pluginBridge */
'use strict';
(() => {
  let view;
  let busy = false;
  const $ = id => document.getElementById(id);
  const selected = new Set();
  const error = value => { $('error').textContent = value ? String(value.message ?? value) : ''; };
  const invoke = (channel, payload = {}) => {
    if (!window.pluginBridge?.invoke) return Promise.reject(new Error('PI-Desktop native panel bridge unavailable'));
    return pluginBridge.invoke(channel, payload);
  };
  function render(next) {
    view = next;
    if (!next.state) { $('counts').textContent = 'No retained checklist. Open a multi-stage task in the agent.'; return; }
    const state = next.state;
    $('title').textContent = state.title;
    const counts = state.counts;
    $('counts').textContent = `${counts.completed} completed · ${counts.cancelled} cancelled · ${counts.remaining} remaining`;
    $('lifecycle').textContent = `Workflow: ${state.lifecycle}`;
    $('limitation').hidden = !next.recovery?.limitation;
    $('limitation').textContent = next.recovery?.limitation ?? '';
    $('session').replaceChildren(...(next.sessions ?? [{ sessionId: state.sessionId, title: state.title }]).map(session => {
      const option = document.createElement('option'); option.value = session.sessionId;
      option.textContent = `${session.title} · ${session.sessionId}`; option.selected = session.sessionId === state.sessionId; return option;
    }));
    $('tasks').replaceChildren(...state.tasks.map(task => {
      const row = document.createElement('li'); row.dataset.status = task.status;
      const label = document.createElement('label'); label.className = 'task';
      const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.checked = selected.has(task.id);
      checkbox.addEventListener('change', () => { checkbox.checked ? selected.add(task.id) : selected.delete(task.id); });
      const title = document.createElement('span'); title.textContent = task.title;
      label.append(checkbox, title); row.append(label);
      const status = document.createElement('small'); status.textContent = task.status.replaceAll('_', ' '); row.append(status);
      for (const value of [task.reason, task.nextAction && `Next: ${task.nextAction}`, task.scopeLimitation]) {
        if (!value) continue; const note = document.createElement('small'); note.textContent = value; row.append(note);
      }
      return row;
    }));
    $('history').replaceChildren(...(next.history ?? []).map(state => {
      const entry = document.createElement('p'); entry.textContent = `${state.title}: ${state.lifecycle} — ${state.archivedReason ?? state.replacedReason ?? ''}`; return entry;
    }));
    document.querySelector('[data-action="pause"]').disabled = state.lifecycle !== 'active';
    document.querySelector('[data-action="resume"]').disabled = state.lifecycle !== 'paused';
    document.querySelector('[data-action="cancel"]').disabled = !['active', 'paused'].includes(state.lifecycle);
  }
  async function refresh() {
    if (busy) return;
    try { render(await invoke('checklist.snapshot')); } catch (e) { error(e); }
  }
  async function action(name) {
    if (busy || !view?.state) return;
    busy = true; error();
    try {
      const state = view.state;
      const payload = { action: name, bindingId: view.bindingId, sessionId: state.sessionId,
        checklistId: state.checklistId, expectedRevision: state.revision };
      if (['cancel', 'replace', 'reopen'].includes(name)) payload.reason = $('reason').value.trim();
      if (name === 'reopen') payload.taskIds = [...selected];
      if (name === 'replace') {
        payload.title = $('replacement-title').value.trim();
        payload.tasks = $('replacement-tasks').value.split('\n').map(s => s.trim()).filter(Boolean).map((title, index) => ({ key: `stage-${index + 1}`, title }));
      }
      const receipt = await invoke('checklist.action', payload);
      if (receipt.presentation?.ok === false) throw new Error(receipt.presentation.error);
      selected.clear();
    } catch (e) { error(e); }
    finally { busy = false; await refresh(); }
  }
  document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => action(button.dataset.action)));
  $('session').addEventListener('change', async () => {
    try { selected.clear(); render(await invoke('checklist.select', { sessionId: $('session').value })); } catch (e) { error(e); }
  });
  $('trace').addEventListener('click', async () => {
    if (!view?.state) return;
    try {
      const receipt = await invoke('checklist.trace', { bindingId: view.bindingId, sessionId: view.state.sessionId, checklistId: view.state.checklistId });
      const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const link = document.createElement('a');
      link.href = url; link.download = `${view.state.checklistId}-trace.json`; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) { error(e); }
  });
  refresh();
  setInterval(refresh, 1000);
})();
