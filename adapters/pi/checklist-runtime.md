# PI-Desktop native checklist protocol

When `plugin_local_workspace_superpowers_workspace_checklist` is in the catalog,
use it instead of `TodoWrite` for meaningful multi-stage work. It owns native
state and its panel; Markdown is a readable projection, not a second state store.
Do not activate it for a direct question or spelling-only edit. Call `create`
with a title and task plan: unique `key`, `title`, optional `dependsOn` keys.
Include approval/evidence tasks instead of treating missing evidence as complete.
Read `status` at continuations; use the returned checklistId, expectedRevision
and stable task IDs for all mutations. Never invent IDs, counts or transitions.

Use `update` only for verified outcomes. Completion requires `evidence`;
awaiting_user/blocked require `reason` and `nextAction`. Leaving awaiting_user
requires `approvalEvidence` quoting the user's actual approval; leaving blocked
requires `resolutionEvidence` identifying supplied evidence. A side question
does not approve or advance work. Do not call status-only skills execution.

Use explicit actions: `hide`, `show`, `pause`, `resume`, `cancel`, `replace`,
`reopen`, `omit`. Read status first. Pause changes lifecycle only; resume does
not approve or resolve blockers. Cancel requires a reason. Replace supplies a
new title/plan and retains history. Omit needs taskIds/reason and explicit
rescopeTaskIds for dependents that may proceed. Reopen needs taskIds/reason and
automatically invalidates dependent results without reopening unrelated work.
Use already supplied updated source values; do not ask for them again.
Reopen roots must be completed tasks. Unfinished approval/blocker gates remain
unresolved and omitted tasks stay cancelled. Reopening a completed approval or
evidence task invalidates its old gate evidence and requires renewed support.

Read the tool's actual receipt before describing state or presentation. A
presentation failure is a host capability error, not successful hiding/rendering.
`state.visible` records requested visibility. Only a presentation receipt with
`confirmed: true` acknowledges a fresh host open/close operation; cached state
cannot prove that a window stayed open after a titlebar close. Use explicit show
to reopen a closed panel.
Status is authoritative across turns and compaction. After process restart,
recovery accepts only same-session native tool receipts; if it reports a recovery
limitation, ask the minimum confirmation and supply recoveryConfirmation from
the user's answer before advancing. Never rebuild completion from prose alone.
The native panel has lifecycle buttons and a trace download for transition IDs,
timestamps, action payloads and previous/next state.
The 0.16.0 host projects each retained tool result to at most 8,000 characters.
Long or history-rich receipts may therefore be unavailable after restart even
when the conversation remains present. Report that loss; do not reconstruct
completion from a truncated receipt or the assistant's explanation.
