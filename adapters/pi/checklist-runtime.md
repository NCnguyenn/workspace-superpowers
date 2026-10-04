# PI-Desktop built-in checklist protocol

Use the host's built-in `TodoWrite` for a checklist activated by
`references/session-progress.md`, when TodoWrite is in the current agent catalog.
Read that portable contract before transitions. It owns activation, request
scope, stable portable identities, dependencies, approvals, blockers and counts.
This adapter maps its portable rendering guidance to the built-in chat UI.
No checklist for a direct question or isolated edit. The host executes TodoWrite
and renders its existing checklist in chat. Do not register a plugin checklist
tool, panel, custom renderer, command or separate state store.

## Host schema and mapping

Every call replaces the full list in display order:

```json
{
  "todos": [
    { "content": "Inspect the supplied source", "status": "completed" },
    { "content": "[awaiting_user] Approve the supported outline", "status": "in_progress", "priority": "high" },
    { "content": "[blocked] Supply missing measurements", "status": "pending" },
    { "content": "Optional export", "status": "cancelled" }
  ]
}
```

The actual inspected host schema accepts only `todos[]`, nonempty `content`,
`status` in `pending|in_progress|completed|cancelled`, and optional `priority` in
`high|medium|low`. Maximum 50 rows; the host description allows at most one
`in_progress` row and truncates content beyond 500 Unicode characters. Use
bounded, meaningful milestones without silently dropping scope. Do not send
portable IDs, dependencies, gate evidence or lifecycle actions as host fields.
Inspect the current catalog schema if the host changes.

`native-checklist.cjs` supplies the pure `toTodoWriteArgs(tasks)` mapping, with
Unicode truncation, cardinality and active-row checks. It owns no state and makes
no host call. Use its mapping when constructing TodoWrite arguments: preserve
the four supported statuses; prefix `awaiting_user`, `blocked` and `paused` in
content. When no ordinary row is active, map the first such row to `in_progress`
and the other such rows to `pending`. With an ordinary active row, all prefixed
rows remain `pending`. A prefixed row is unfinished even when it appears as
native `in_progress`; that display does not make work authorized or running.

## Portable lifecycle and evidence

Keep portable request/checklist/task IDs, dependency edges, gate reasons,
required next actions and evidence in retained conversation context. They are
not extra native fields. Do not print a second routine Markdown checklist while
TodoWrite is available; explain approvals, blockers and limitations in ordinary
chat as needed. Derive portable counts from current statuses, with cancelled
work separate from completed work. Never describe a native counter as displaying
those portable totals unless that UI was actually observed.

Mark completion only when the outcome or agreed acceptance condition is
verified. A successful tool call, skill load or assistant summary is insufficient.
Leaving `awaiting_user` requires explicit user approval or the exact requested
input. A side question, showing progress or a general resume does not approve
work. Leaving `blocked` requires actual resolution evidence: inspect the supplied
input, restored capability or explicitly authorized scope omission. Keep the
unresolved reason and next action; do not relabel it as completed.

Pause preserves the return point and pending approval/blocker states. Resume
rechecks prerequisites and stale revisions; it does not approve work or clear a
blocker. Cancellation retains completed outcomes and marks unfinished scope
`cancelled`, not completed. Omission needs an explicit reason and review of
dependent scope before those tasks may proceed.

Replacement retains the old request in conversation history, creates distinct
portable identities, and replaces only the selected current native list; do not
merge old counts into it. Reopen only changed completed outcomes and their
affected dependent review/export/verification, preserving unrelated results and
cancelled omissions. Invalidate stale gate evidence on affected completed approval
or evidence tasks; unfinished gates still need their original missing support.
Rewrite the full native list at meaningful authorized transitions, including
cancel, replace and reopen, so stale completed rows do not remain displayed.

## Visibility and recovery boundaries

TodoWrite has no show/hide API or pause/resume/reopen action fields. These are
portable conversation controls, not SDK calls. Showing progress republishes the
evidence-supported current list. A hide request suppresses routine progress
publication until show is requested; it cannot promise to close an existing host
card. Explain that limitation. Do not send an empty list to claim successful
hiding or cancellation; retain the actual task states in conversation context.

After compaction or restart, reuse only retained evidence-supported state and
read back available source/tool results. Do not invent host read APIs, recover
completed work from unsupported prose, or assume that rendered rows prove
portable approval/evidence. If identities, outcomes or gates are uncertain,
ask the minimum confirmation before advancing or republishing uncertain state.
Do not call the host's internal `tools.execute` route or read/write its database.

If TodoWrite is unavailable or its call fails, report the exact limitation and
use the portable Markdown fallback, respecting the current display preference.
Markdown is not native UI. Only actual host
tool results and user-observed built-in checklist behavior can support claims
about live execution or presentation; local tests and simulated SDK probes cannot.
