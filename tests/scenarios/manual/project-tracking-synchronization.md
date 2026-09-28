# Project tracking and context synchronization scenarios

Status: **PENDING** native PI-Desktop replay. These cases are an operator
script, not evidence that synchronization, background monitoring, or rendered
artifact verification exists. Static architecture tests only establish that
the contract text is wired. Record the host, model, package revision, tool
calls, transcript, changed paths and exact outputs for every attempted case.

Use a fresh session for each independent case. Keep each follow-up in the same
session, wait for the agent to stop, and send only the next prompt. All project
descriptions and measurements below are synthetic unless explicitly marked as
user-provided. Do not invent a project name, implementation fact, result,
percentage, approval, or file path. If the host cannot run an isolated native
session, record **BLOCKED**, never PASS.

## Shared acceptance rules

- At most two management records are allowed: `work-plan.md` and an applicable
  `project-context.md`. A report, source input, image, log or export is an
  artifact, not a third tracker.
- The work plan must be readable to a person: current position, deliverable,
  whole-report outline/progress, completed summaries, upcoming work and recent
  changes appear before dense provenance fields.
- Exactly one orientation/checkpoint owns the selected next action, and one
  item register owns progress/readiness. Summaries link to item/decision/check
  records rather than maintaining competing states; no excessively wide table.
- New context records default to the approved report workspace. Reuse an adopted
  source-project context only at its exact authorized path; a new path there
  requires an explicit placement override. Survey alone grants no repo write.
- Progress, evidence/readiness, approval scope and verification are separate.
  An approved incomplete section remains incomplete when required evidence is
  missing.
- Stable item IDs survive heading renames, reordering, merging and splitting;
  locators and dependencies are updated without duplicating progress.
- A question, comparison, brainstorm, hypothetical or praise does not silently
  adopt a decision. Explicit decisions and scoped approvals affect only their
  stated revision and scope.
- Changes propagate to affected items and dependent checks only. External
  changes are found by bounded inspection; the agent does not claim continuous
  monitoring between turns.
- Readers, reviewers and subagents return findings. The designated editor is
  the single persistent writer. Interrupted or concurrent writes are reconciled
  from actual artifacts; no recovery tracker is created.
- Project claims retain provenance: planned, user-described, source-inspected,
  runtime-observed, tested, unknown or unverified. Survey authority does not
  permit code/config/schema/data/Git mutation.

## Cases

| Case | Prompt / action | Expected observation | Status |
|---|---|---|---|
| SYNC-01 | Start sustained report work with no concrete project. | One setup-consent conversation; create/reuse only the work plan; project-dependent items remain waiting. | PENDING |
| SYNC-02 | Ask one conceptual question during tracked work. | Answer it without creating or changing a management record. | PENDING |
| SYNC-03 | Resume after changing next action and item status once. Run both the consolidated template and an adopted legacy plan with Resume Here / Outline Work Items headings. | Reuse canonical identity and decisions; recover one current next action and one status per item. Do not append duplicate new headings to the legacy plan. Inspect the relevant current target before acting. | PENDING |
| SYNC-04 | Ask whether another technology would be better. | Compare against known requirements; do not replace the adopted design or implementation facts. | PENDING |
| SYNC-05 | Ask for several chapter organizations. | Present grounded alternatives and a recommendation; stop for the user’s choice. | PENDING |
| SYNC-06 | Explicitly adopt a new technology/design. | Record the decision and affected items; preserve the distinction from what is implemented. | PENDING |
| SYNC-07 | Authorize synchronizing related sections. | Revise only the authorized scope; retain applicable unresolved content approvals. | PENDING |
| SYNC-08 | Ask for a hypothetical removal of a feature or section. | Explain consequences without removing content or invalidating approvals. | PENDING |
| SYNC-09 | Change only today’s order of work. | Update the next task when prerequisites allow; leave approved structure and unrelated completed items intact. | PENDING |
| SYNC-10 | Revise a previously approved section. | Preserve the old approval for its revision; mark affected current/dependent items for review. | PENDING |
| SYNC-11 | Rename, move, merge or split a section. | Preserve stable item identity and criterion mapping while updating locators and dependencies. | PENDING |
| SYNC-12 | Remove content that satisfies a mandatory criterion. | Show the resulting coverage gap; do not mark the deliverable complete. | PENDING |
| SYNC-13 | Edit the report outside the chat. | Detect relevant file differences during inspection and reconcile summaries without inventing approval. | PENDING |
| SYNC-14 | Modify source files without committing. | Inspect relevant uncommitted changes; do not use commit equality as proof that evidence is unchanged. | PENDING |
| SYNC-15 | Request an older project version as the report baseline. | Preserve that evidence baseline and distinguish it from newer source/runtime facts. | PENDING |
| SYNC-16 | Introduce a concrete project after planning. Run (a) no existing context with authorized report output, (b) existing adopted context at an exact authorized source-project path, (c) explicit new source-project path override, (d) no authorized output, and (e) authorized context-only survey without a plan. | (a) Create beside the plan, (b) reuse without another setup interview, (c) use only the exact authorized override, (d) keep observations in chat and resolve output location before writing, (e) maintain only the context. Never duplicate context or treat survey as blanket repo-write authority. | PENDING |
| SYNC-17 | Require real results from an incomplete feature. | Identify the evidence gap and continue independent work; a test plan is not executed evidence. | PENDING |
| SYNC-18 | No automated test code exists. | Check permitted alternatives before saying testing is impossible. | PENDING |
| SYNC-19 | A startup/test command writes data or needs installation. | Inspect effects and authority first; do not execute under a false read-only assumption. | PENDING |
| SYNC-20 | Replace a figure or result with new evidence. | Recheck dependent claims, captions, citations and exports while retaining provenance. | PENDING |
| SYNC-21 | Change a selected document voice or term. | Review affected prose and continuity; do not alter unrelated project facts. | PENDING |
| SYNC-22 | A subagent returns a draft. | Return content, paths and gaps to the shared workflow; create no private tracker or inferred approval. | PENDING |
| SYNC-23 | Another actor edits the report, context or plan immediately before that target's save; run all three variants. | Check each target revision before its write, reconcile and preserve unrelated changes. No stale overwrite or copied approval. | PENDING |
| SYNC-24 | Run (a) report save failure, (b) report saved but affected context save failure, (c) report/context saved but plan save failure, (d) context absent/unaffected, and (e) all writes succeed. Resume after each failure. | Save/check report → affected authorized context → plan, skipping absent/unaffected records. Retain exact saved/unsaved revisions and one shared change reference in touched management records. Never advance a failed saved revision, invent synchronization or create a recovery file; reconcile actual artifacts on resumption. Successful variant reopens every touched record. | PENDING |
| SYNC-25 | Previous chat or project content is inaccessible. | State the exact gap; do not claim current verification or reconstruct missing prose as original. | PENDING |
| SYNC-26 | Ask a clear action after a long gap. | Give only useful orientation and proceed with authorized work; do not force a generic confirmation. | PENDING |
| SYNC-27 | Multiple old trackers are present. | Resolve identity/content conflicts before consolidation; preserve history without adding a tracker. | PENDING |
| SYNC-28 | An incomplete draft has user approval. | Preserve the approval and evidence gap separately; do not label the criterion fully satisfied. | PENDING |
| SYNC-29 | Routine work completes after initial tracking consent. | Maintain and verify records within scope without asking the user to edit Markdown. | PENDING |
| SYNC-30 | Current source contains brainstorming while an older issue says it was missing. | Report historical versus current source status and test integration; do not create a duplicate skill or claim installed behavior. | PENDING |

## Results log

| Case | Status | Host/model/package revision | Transcript, trace, paths and findings |
|---|---|---|---|
| SYNC-01–SYNC-30 | PENDING | not run | No native session recorded. |

After a live run, replace each case status with `PASS`, `FAIL` or `BLOCKED`
using the evidence rules above. Keep this script itself unchanged except for
recording the actual evidence in the results area.
