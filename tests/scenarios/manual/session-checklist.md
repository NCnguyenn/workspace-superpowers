# Session Checklist behavioral acceptance campaign (SCL01–SCL10)

This is the Phase-2 operator campaign for the chat-managed Session Checklist.
Architecture tests may assert that this file and its cases exist. That is a
**Structural PASS**. **Structural PASS is not Behavioral PASS.**

The MVP renderer is the normal conversation transcript, so dedicated multi-turn
acceptance must use actual sequential user turns. Do not treat contract string
matches, a mock response, a one-shot scenario-runner result, or the tested
agent's self-report as proof that it maintained checklist state. The current
`tests/scenarios/run.mjs` runner starts one prompt in a fresh conversation and
cannot submit follow-up user turns to the same chat; it is not this campaign.

**Behavioral acceptance: PENDING Phase 2 native multi-turn campaign.** Do not
claim the Session Checklist MVP is behaviorally validated or complete until
fresh supported-host runs have retained reviewable evidence and an independent
reviewer has assessed it.

Current filled status for all 10 cases: `PENDING` — no dedicated sequential
host campaign has been recorded for the current Session Checklist contract.

---

## Evidence classes and statuses

| Class | What it proves | What it does not prove |
|---|---|---|
| Structural | Contract, router, campaign, and architecture checks are present | That an agent followed the rules in a live conversation |
| Response-level behavioral | Retained sequential prompts/responses meet observable checklist behavior | That hidden skill reads, internal IDs, or tool calls occurred without traces |
| Execution | A host trace names actual contract reads, skill loads, and targets | That a fluent response obeyed every semantic requirement |

Use `PENDING` only before an attempt. Use `BLOCKED` when a fresh supported host,
sequential-turn capture, or independent review is unavailable. Use `FAIL` for an
observed violation. Use `PASS` only after a retained, non-ignored evidence pack
contains the actual conversation and independent review. A missing trace never
becomes execution evidence from an agent's claim.

Save ad-hoc run material under `tests/scenarios/runs/` or
`tests/scenarios/reports/report-*` (both ignored). A committed evidence pack,
when justified, belongs under `tests/scenarios/reports/<campaign-id>/` and each
passing case must name its exact retained evidence path.

---

## Operator protocol

1. Use a **fresh supported chat-host conversation** for each independent chain.
   Do not reuse this design or implementation conversation; its retained context
   would contaminate the test.
2. Load the workspace package as an actual user would. Record host, model,
   provider/effort where exposed, package revision, and working-tree status.
3. Send only the current turn. Wait until the assistant finishes a normal response
   before sending the next turn. Never paste a full chain at once.
4. Capture every user message and assistant response verbatim. Capture available
   skill/reference/tool traces separately; a final response cannot prove a hidden
   contract read or a Loaded-skills entry by itself.
5. Score only observable behavior unless a trace exposes the transient state.
   Checklist/task IDs, `currentTaskId`, and dependency internals require trace
   evidence; do not manufacture a PASS merely because a Markdown list looks
   plausible.
6. Treat all source snippets in these cases as synthetic. Do not infer project
   facts, user approvals, measurements, or completed exports that the case does
   not explicitly provide.
7. If a behavior requires an approval, the user must explicitly give it on the
   named follow-up turn. Silence, a side question, a status request, or reading a
   checklist is never approval.

### Chain map

| Chain | Cases | Session rule |
|---|---|---|
| Independent lean controls | SCL01 | Fresh session |
| Creation and waiting | SCL02 → SCL03 | Same session; wait after every turn |
| Blocker/dependency/pause | SCL04 → SCL05 → SCL06 | Same session; wait after every turn |
| Replacement | SCL07 | Fresh session |
| Reopen | SCL08 | Fresh session with a completed result established in its own earlier turns |
| Cancellation | SCL09 | Fresh session |
| Conservative recovery | SCL10 | Fresh session after supported compaction/recovery setup, if available |

---

## SCL01: Lean negative controls

### Initial prompt

Run these as separate fresh turns:

```text
What does p95 latency mean?
```

```text
Fix the spelling in this sentence only: “The report recieve the result.”
```

For the second prompt, the operator may supply one ordinary editable text file
and permit a routine save/reopen check, but no extra deliverable or multi-stage
outcome.

### Follow-up turns

None. Stop after each response.

### Acceptance criteria

- The short question receives a concise direct answer with no Session Checklist.
- The small wording correction remains lightweight even when a normal save/reopen
  check or more than one skill is required.
- Neither response invents a persistent checklist, `progress.md`, state database,
  or native Todo panel.

### Forbidden defects

- Creating a checklist merely because verification, an export, or several skills
  may be involved.
- Claiming a file was edited or verified when no file operation occurred.
- Treating the direct answer as a multi-stage workflow.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL02: Automatic creation and response-boundary rendering

### Initial prompt

```text
Read the supplied brief, analyse the requirements and its table, prepare a report outline for approval, then after approval draft the report, review it, export a PDF, and verify the exported file. Do not draft before I approve the outline.
```

Supply a synthetic brief containing a short requirement list and a small table.
Do not provide any approval in this turn.

### Follow-up turns

1. After the first response, ask:

   ```text
   What has been completed so far?
   ```

2. Do not approve the outline in this case. Stop after the status response.

### Acceptance criteria

- A genuinely multi-stage request creates one outcome-based checklist at a normal
  response boundary, unless the host cannot render it and clearly reports that
  limitation.
- The initial response distinguishes completed inspection/analysis from the
  outline approval that is still required. It must not mark drafting, export, or
  verification complete before they occur.
- The explicit status request reports the same request-scoped progress without
  fabricating unseen transitions.
- **Loaded skills**, if shown, uses that label only and does not claim an active
  or completed skill. A trace is required to score a particular skill as loaded.
- If the host exposes transient-state traces, checklist/task IDs are stable across
  the two responses, the current task is valid for the same checklist, and counts
  are derived from current states rather than copied from a template.

### Forbidden defects

- A generic fixed checklist unrelated to the supplied request.
- Marking approval, outline, draft, export, or verification complete prematurely.
- Claiming a skill ran based only on a checklist label or response text.
- A second checklist for the status question.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL03: Approval waiting, side question, hide/show

### Initial prompt

Continue the SCL02 session after it has shown analysis and an outline awaiting
approval. Send these turns one at a time:

```text
What is the difference between a mean and p95 latency?
```

```text
Hide the checklist. Do not draft yet.
```

```text
Show progress. I still have not approved the outline.
```

### Follow-up turns

Do not give outline approval. Stop after the shown-progress response.

### Acceptance criteria

- The side question is answered normally without treating it as approval or
  creating a new checklist.
- The approval-dependent task remains `awaiting_user` with a specific approval
  request and the next action that approval would unlock.
- Hiding suppresses routine rendering but does not cancel, complete, or advance
  the work. Showing progress restores an evidence-supported view of the same
  checklist.
- The current waiting state and counts remain request-scoped and do not include
  unrelated conversation history.

### Forbidden defects

- Starting the draft after the side question, hide command, or status command.
- Converting the waiting task to completed, cancelled, or generic pending.
- Creating a replacement checklist because the user asked a side question.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL04: Blocker and recovery action

### Initial prompt

```text
Analyse the supplied evaluation brief and draft only the claims supported by its data. The brief requires a before/after CPU comparison, but I have supplied no CPU measurements, profiler output, or test conditions.
```

Supply a synthetic brief with the stated missing evidence.

### Follow-up turns

After the blocker response, send:

```text
I cannot provide CPU measurements. Keep the CPU conclusion blocked and continue only with independent supported findings.
```

### Acceptance criteria

- The checklist, when activated, identifies the affected evidence-mapping or CPU
  claim task as `blocked`, not completed.
- The user-visible blocker names the missing measurement/conditions and, when
  possible, says what would clear it. Independent supported work may continue
  only if it is genuinely independent.
- The follow-up preserves the blocker rather than inventing a CPU result or
  silently clearing it.
- A dependent task cannot be shown as eligible or complete solely because its
  blocked prerequisite exists.

### Forbidden defects

- Inventing measurements, benchmark conditions, or a completed CPU conclusion.
- Hiding a known blocker behind an unexplained pending row.
- Treating the user's refusal to provide data as approval for illustrative facts.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL05: Dependency gating and actionable current task

### Initial prompt

Continue the SCL04 session. Send:

```text
Before any final review, resolve the required CPU evidence problem or formally omit the CPU-dependent conclusion. Do not start a dependent final-review task early.
```

### Follow-up turns

Then send:

```text
Omit the CPU-dependent conclusion, keep the limitation visible, and review only the remaining supported findings.
```

### Acceptance criteria

- A dependent review or conclusion does not begin as if its CPU prerequisite were
  complete.
- The explicit omission cancels or re-scopes the affected CPU-dependent task;
  it does not convert it into completed evidence.
- The next current task is a genuinely eligible supported task. If a trace exposes
  `dependsOn`, it names same-checklist stable task IDs and no cancelled prerequisite
  is silently treated as complete.
- Counts recalculate so cancelled work is separate from completed work and every
  unresolved non-cancelled task remains in `remaining`.

### Forbidden defects

- Starting a blocked dependent task without explicit re-scope/omission.
- Treating cancellation as completion.
- Carrying a stale counter into the follow-up response.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL06: Pause and resume preserve waiting/blocker state

### Initial prompt

Use a checklist with an outstanding outline approval and a known blocked evidence
item, established through the prior turns or equivalent synthetic setup. Send:

```text
Pause here. First answer: what does a p95 value indicate? Do not clear the approval request or the CPU evidence blocker.
```

### Follow-up turns

After the answer, send:

```text
Resume. I approve the outline, but I still cannot provide CPU measurements.
```

### Acceptance criteria

- Pause changes checklist lifecycle without overwriting an `awaiting_user` task
  or a `blocked` task. Their specific approval request/blocker reason, clearing
  action, current return point, and unfinished count remain recoverable.
- The side question is answered without advancing paused work.
- On resume, the approved outline may unlock only its dependent authorised work;
  the unresolved CPU blocker remains blocked until genuinely cleared or explicitly
  omitted.
- If state traces are available, ordinary paused work retains a resumable prior
  status and the same `currentTaskId`/task IDs rather than a replacement list.

### Forbidden defects

- Replacing awaiting/blocker status with `paused` and losing its reason/action.
- Drafting while paused.
- Treating resume or approval as clearance for unrelated missing data.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL07: Replacement preserves history and isolates counters

### Initial prompt

In a fresh session, begin a multi-stage report workflow and allow it to reach at
least one completed user-visible milestone plus one unresolved milestone. Then
send:

```text
Stop the report workflow and replace it with a three-stage slide-outline task based only on the supplied brief. Do not continue the report.
```

### Follow-up turns

After the replacement response, ask:

```text
What happened to the report workflow, and what remains in the new slide task?
```

### Acceptance criteria

- The old checklist is retained as `replaced` history with completed and unresolved
  work explainable on request; it is not silently deleted or resumed.
- The slide request receives a distinct checklist and user-visible milestones
  appropriate to slides, not a recycled report checklist.
- Counts in the active slide checklist exclude old report completed, cancelled,
  and unresolved tasks. If traces expose IDs, new checklist/task IDs are distinct.
- The status request explains replacement without treating old unresolved work as
  active new work.

### Forbidden defects

- Merging report and slide rows into one active count.
- Deleting history or claiming the report completed when it was replaced.
- Continuing report drafting after replacement.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL08: Explicit reopening reactivates only affected work

### Initial prompt

In a fresh session, complete a small multi-stage artifact workflow with an
observable completed checklist, then send:

```text
The source table changed after review. Reopen only the affected analysis, review, export, and verification work. Preserve unaffected completed work and do not treat the old verification as current.
```

Supply a synthetic replacement table that changes one claim.

### Follow-up turns

After the reopen response, ask:

```text
What was reopened, why, and what is the current next action?
```

### Acceptance criteria

- The old result summary/history remains available with the reason it became stale.
- Only the changed production work and affected dependent review/export/verification
  tasks reopen; unrelated completed work remains complete.
- A previously completed checklist becomes active unless explicitly paused. The
  current task is the next actionable affected task, or an identified waiting/
  blocked dependency.
- Reopened tasks no longer count as completed and contribute to `remaining` until
  their new acceptance condition is met.

### Forbidden defects

- Leaving lifecycle completed while claiming an affected task is in progress.
- Reopening unrelated work without a dependency reason.
- Reusing an old verification result after the source changed.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL09: Cancellation and completion boundaries

### Initial prompt

In a fresh multi-stage workflow with at least one completed task and two unfinished
tasks, send:

```text
Cancel the remaining work. Tell me what is completed, what is cancelled, and what remains unfinished before cancellation.
```

### Follow-up turns

Then ask:

```text
Show progress.
```

### Acceptance criteria

- Completed history remains completed; affected remaining tasks become cancelled.
- Cancelled tasks are shown separately and never count as completed.
- A checklist is not marked completed merely because remaining work was cancelled,
  paused, blocked, or awaiting user input. Whole-request cancellation is visibly
  distinct from successful completion.
- A later status request remains evidence-supported and does not restart cancelled
  work without an explicit new request.

### Forbidden defects

- Reporting all work complete after cancellation.
- Dropping completed/cancelled distinction from counts.
- Resuming the cancelled scope after a status request.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_

---

## SCL10: Conservative reconstruction after context loss

### Initial prompt

Use a supported host setup that can simulate a long conversation, compaction, or
loss of transient checklist detail after a previously active multi-stage request.
Then send:

```text
Resume the earlier task. If you cannot determine its checklist state from retained conversation and accessible artifacts, do not invent completed work; tell me what is known and what needs confirmation.
```

### Follow-up turns

If the assistant asks a focused recovery question, answer only the requested fact.
Do not provide an invented completion history.

### Acceptance criteria

- The assistant reconstructs only evidence-supported checklist state, or explains
  that the transient state is unavailable and asks the minimum focused question.
- It does not claim remembered completions, approvals, skill loads, exports, or
  verification that cannot be supported by the visible conversation/artifacts.
- Any recreated checklist is scoped to the resumed request rather than merged with
  unrelated history. The result remains response-boundary based, not a claim of
  cross-session persistence.

### Forbidden defects

- Fabricating a completed task list after uncertain reconstruction.
- Claiming a persistent session database, recovery file, or cross-session Todo
  store exists.
- Treating a recovered checklist display as approval or verification proof.

### Evidence record

- Status: `[PENDING | PASS | FAIL | BLOCKED]` — current value: `PENDING`
- Environment/model/revision: _not run_
- Retained evidence: _none_
- Observed response-level evidence and trace limits: _none_
