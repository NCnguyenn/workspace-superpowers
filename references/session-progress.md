# Session Checklist and Ephemeral Progress

Use this contract when a Workspace request has several meaningful, user-visible stages. The checklist is an execution view for one request in the current conversation. It is not a third tracking record and does not replace `work-plan.md`.

## MVP mechanism

The MVP is chat-managed:

- The agent owns transient checklist state in retained conversation context.
- The agent creates and updates milestones at meaningful workflow boundaries.
- The agent renders Markdown/plain text in its normal response.
- There is no background event listener, state database, MCP write, native Todo service, or host panel in this contract.
- Updates are visible only at assistant response boundaries; the MVP does not promise realtime progress while a host runs an unexposed tool loop.
- If the transient state cannot be reconstructed confidently, preserve only evidence-supported progress or hide the checklist. Never invent completed work.

A native host implementation is a separate future capability. It must prove the event path, state owner, renderer, user-action return path, request scoping, and live lifecycle acceptance before it is documented as supported.

Static contract checks and authored operator scenarios prove only that the rules are documented and wired. They are not behavioral acceptance. Behavioral acceptance requires a separate sequential conversation with retained prompts, responses, and reviewable evidence.

## Activation precedence

Keep the checklist hidden for a short question, one small file read followed by an answer, a typo or wording correction, a small isolated formatting change, or one self-contained result. A routine save/reopen or integrity check does not by itself activate a checklist. Multiple loaded skills, an export, or a verification call alone are not sufficient.

Create one checklist for the current request when the requested outcome genuinely contains several meaningful results or dependencies, such as:

- three or more independent outcome-bearing milestones;
- substantive work across multiple artifact types;
- a read → analyse → draft → review → export → verify sequence;
- an approval gate controlling a later stage;
- several coordinated deliverables or sections;
- work likely to span turns or contain a material blocker.

When signals conflict, use this order:

1. An explicit request to show or hide progress controls display for the current checklist.
2. A clearly simple operation stays lean, even if routine verification or several skills are involved.
3. A genuinely multi-stage or approval-dependent outcome gets a checklist.
4. If uncertain, start lean and create a checklist only when a second meaningful milestone or dependency becomes real.

## Checklist scope and lifecycle

Each multi-stage user request has its own checklist. A short side question preserves the active checklist and does not create a new one. An unrelated multi-stage request creates a separate checklist. A request that replaces the active scope closes the old checklist as `replaced` before creating a new one.

A checklist lifecycle is `active`, `paused`, `completed`, `cancelled`, or `replaced`. Finishing one assistant response does not finish a checklist. A checklist is `completed` only when every non-cancelled task is complete and no affected approval or verification remains open. A whole-request cancellation retains completed history but marks the checklist `cancelled`.

The display preference is per checklist:

- `auto`: render when activation rules are met;
- `visible`: the user explicitly requested progress;
- `hidden`: suppress routine blocks without stopping work or erasing state.

On resume, re-check stale inputs, approvals, and artifact revisions before continuing. If a completed result is revised or invalidated, reopen that task and dependent review, export, or verification tasks as needed.

### Identity and dependency model

The MVP uses this conceptual transient shape; it is a state contract, not a host API or a persistence schema:

```text
Checklist {
  id: string,
  sessionId: string,
  title: string,
  lifecycle: active | paused | completed | cancelled | replaced,
  display: auto | hidden | visible,
  tasks: SessionTask[],
  currentTaskId: string | null,
  loadedSkills: LoadedSkill[]
}

SessionTask {
  id: string,
  title: string,
  status: pending | in_progress | completed | awaiting_user | blocked | paused | cancelled,
  resultSummary?: string,
  nextAction?: string,
  blocker?: string,
  blockerEvidence?: string,
  clearAction?: string,
  pausedFrom?: string,
  dependsOn?: string[]
}
```

The following identity and dependency rules apply:

- checklist IDs are stable for the lifetime of a checklist; task IDs are stable for the lifetime of that checklist and survive task wording, ordering, pause, resume, and state updates;
- `currentTaskId` is either `null` or the ID of a task in the same checklist; the default text presentation has at most one current `in_progress` task;
- `dependsOn` contains only task IDs from the same checklist. It cannot contain a duplicate, the task's own ID, a missing ID, or a cycle. Dependencies are not inferred from list position or skill names;
- a dependent task is not eligible until its dependencies are complete. A cancelled prerequisite is not silently treated as completed; the dependent task remains unresolved until it is explicitly re-scoped or cancelled;
- a replacement checklist receives a distinct checklist ID and distinct task IDs. Checklist IDs and task IDs are ephemeral and must not be confused with durable `work-plan.md` or `work_id` identities;
- identity and dependency changes are deliberate state transitions. They must not be reconstructed from an unstable title or a stale list index.

## Task states and counting

Use outcome-based rows, not individual tool calls:

- `pending` — not started;
- `in_progress` — the current meaningful stage;
- `completed` — the user-visible result or agreed acceptance condition is available;
- `awaiting_user` — a specific approval, decision, source, or answer is required;
- `blocked` — a real missing capability, input, or contradiction prevents progress;
- `paused` — work is intentionally stopped;
- `cancelled` — the user or workflow deliberately omits the task.

Required state evidence:

- `completed` requires an available outcome or explicit acceptance condition; a successful tool call, plan entry, or intention is not completion evidence;
- `awaiting_user` must name the exact user input, decision, or approval required and the dependent next action that will follow it. A merely pending task is not automatically awaiting the user;
- `blocked` must include a known reason. When available, show the supporting evidence or source locator and the action or input that would clear the blocker. Do not hide a known blocker behind a generic pending label;
- `paused` means work is intentionally stopped and is not counted as completed. Preserve a resumable prior status when one is needed;
- `cancelled` is the single terminal state for a step the user or workflow deliberately omits. It is not counted as completed;
- task titles remain understandable without knowing skill or tool names.

Derive counts from the current task states every time the checklist is rendered; never reuse stale totals:

- `completed` counts only tasks whose current status is `completed`;
- `cancelled` is shown separately and never included in `completed`;
- `remaining` includes every task that is not `completed` or `cancelled`, including `pending`, `in_progress`, `awaiting_user`, `blocked`, and `paused`;
- counts belong only to the selected checklist. Replaced or cancelled checklist history is not merged into a new checklist's active count.

A compact count may therefore say `3 completed, 1 cancelled, 2 remaining`. `paused`, `awaiting_user`, and `blocked` remain unfinished.

## Loaded skills

The MVP may show **Loaded skills** only after the relevant skill instruction has actually been loaded. Loading a skill body is the observable fact available here; it does not prove that the skill is currently running or completed. Do not use labels such as active or completed skill without a verified runtime event source.

## Transitions and evidence

The following conceptual transitions describe agent-managed state; they are not a host API:

```text
create, start, complete, wait_for_user, block,
pause, resume, cancel, replace, reopen, load_skill, show, hide
```

Before any checklist transition or rendering decision, the router must read the current body of this contract. A link, filename, remembered summary, or earlier turn does not substitute for that read.

Use a transition only with an observable basis:

| Transition | Basis |
|---|---|
| `create` | The request has several meaningful stages. |
| `start` | The agent is beginning the named milestone. |
| `complete` | The milestone result or acceptance condition is actually available. |
| `wait_for_user` | A specific user decision or input, plus the dependent next action, is required. |
| `block` | A real missing input, capability, or contradiction prevents the task; show the known reason. |
| `pause`, `resume`, `cancel`, `replace` | The user explicitly directs the change or unambiguously replaces scope. |
| `reopen` | A completed result changed, became stale, or needs dependent verification again; record the reason. |
| `load_skill` | The skill instruction was actually loaded. |
| `show`, `hide` | The user requests the display change. |

## Rendering and interaction

Render a compact block after creation and at meaningful transitions, approval or blocker changes, explicit status requests, and useful final completion. Do not repeat an unchanged block after every low-level operation.

Recommended markers:

- `✓` completed;
- `→` in progress;
- `○` pending;
- `?` awaiting user;
- `!` blocked;
- `‖` paused;
- `–` cancelled.

Example:

```text
Session progress — 2 completed, 0 cancelled, 4 remaining

✓ Read requirements and source material
✓ Analyse text, images, and table data
? Review the requirement analysis — awaiting approval before the detailed outline
○ Prepare the detailed outline
○ Draft the approved outline
○ Review and verify the final artifact

Current stage: Awaiting analysis approval
Loaded skills: reading-artifacts, analyzing-artifacts, working-with-visuals
```

The checklist is not approval. Reading it or asking to show it never counts as approval, verification, evidence readiness, or completion.

### Waiting, pausing, hiding, and cancellation

When the workflow requires approval, the active task becomes `awaiting_user`; retain its explicit request and next action in the rendered state.

When the user says “Pause here,” set the checklist lifecycle to `paused` and retain `currentTaskId`, completed results, pending tasks, and the return point. If the current task is already `awaiting_user` or `blocked`, do **not** overwrite that task status with `paused`; preserve its approval request or blocker reason, evidence, and clearing action while the checklist lifecycle is paused. Ordinary `in_progress` work may become `paused` with `pausedFrom: in_progress`. A side question must not advance paused work.

When the user asks to hide progress, set `display: hidden` for that checklist. Continue maintaining its state silently at meaningful boundaries, but do not print routine checklist blocks until the user asks to show progress again. Hiding is a presentation preference, not cancellation or completion.

When the user asks to omit a remaining step, use `cancelled` for that task, retain the reason, and explain any consequence. Do not use `skipped` in the MVP. Cancelled tasks are excluded from the completed count and shown separately when relevant.

When the user resumes, set the checklist lifecycle back to `active`, restore the next authorised task, and re-check any stale input, approval, or artifact revision. An awaiting or blocked task remains awaiting or blocked until its required input arrives or the blocker is actually cleared.

### Replacement history

When a request replaces the active scope, first mark the old checklist `replaced` and retain its checklist ID, task IDs, completed result summaries, unresolved states, and replacement reason as conversation history. Then create a new checklist with distinct IDs. Render and count only the selected new checklist by default; never transfer old unresolved tasks or old completed/cancelled totals into the new checklist's `completed`, `cancelled`, or `remaining` counts. Older history is shown only when the user asks or when explaining the replacement.

### Completion and reopening

A checklist reaches lifecycle `completed` only when every non-cancelled task has been completed and no affected verification or approval remains open. A checklist with a task that is awaiting user input, blocked, paused, pending, or in progress is not completed.

Reopening requires an explicit request or a verified revision/invalidation that makes a completed result stale; a casual mention does not reopen work. When reopening:

1. preserve the earlier result summary and completion history, and record why the result needs revision or re-verification;
2. reopen only the changed task and affected dependent review, export, or verification descendants identified through `dependsOn`;
3. change a previously `completed` checklist lifecycle to `active` unless the user explicitly pauses it again;
4. set `currentTaskId` to the next actionable affected task (or to the awaiting/blocked task when that is the next dependency);
5. recalculate `completed`, `cancelled`, and `remaining` from current task states. Reopened tasks no longer count as completed until their new acceptance condition is available.

A whole-request cancellation retains completed history but marks the checklist `cancelled`; it does not convert cancelled work into completed work.

Conversational controls apply to the active checklist only:

- “Show progress.” sets display to `visible`.
- “Hide the checklist.” sets display to `hidden` without stopping work.
- “Pause here.” pauses the checklist while preserving the waiting/blocker semantics above.
- “Resume.” revalidates prerequisites and resumes the next authorised task.
- “Cancel the remaining work.” cancels the affected remaining tasks and checklist.
- “Omit the export step.” cancels that task, explains the consequence, and continues only if dependencies permit.
- “What is blocking this step?” or “What has been completed?” reports the current evidence-supported state.

If the target checklist is ambiguous, ask one focused question. Native buttons or panels, if supported later, must preserve these semantics.

## Relationship to durable tracking

| Record | Lifetime | Purpose |
|---|---|---|
| Session Checklist | One multi-stage request in the current conversation | Immediate operational transparency |
| `work-plan.md` | Sustained assignment/project | Durable outline, decisions, dependencies, progress, and next action |
| `project-context.md` | Authorised project context | Observed project facts and evidence |

Do not create `progress.md`, a checklist file, a recovery tracker, a session database, or a private parallel progress record. The checklist may reflect a current work-plan item, but it must not silently create, rewrite, or duplicate the work plan. Progress, readiness, approval, and verification remain separate states.

## Behavioral acceptance boundary

The contract and architecture tests can verify wording, links, schemas, and campaign structure only. They cannot establish that an agent created or maintained this state in a live conversation. The tracked manual campaign at `tests/scenarios/manual/session-checklist.md` remains **PENDING Phase 2 behavioral acceptance** until fresh sequential sessions produce retained evidence and independent review.
