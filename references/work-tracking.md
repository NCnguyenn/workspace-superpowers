# Persistent work tracking

Use this contract when discovering, proposing, adopting or maintaining a durable
workspace plan. It extends [workflow continuity](workflow-continuity.md), not the
lifecycle or the user's authorization. Users work through chat; agents maintain
file identities, paths, checkpoints and version links. No new skill, role or
background service is required.

## Canonical records and ownership

Use a canonical two-record model with at most two management Markdown records
for a sustained deliverable: `work-plan.md` and, only when a concrete project
is selected and authorized, `project-context.md`. The work plan owns the
whole-report outline, progress, decisions, dependencies and next action. The
project context owns project identity, project evidence and observed source
state. The work plan must not become a project specification, and the project
context must not become a progress tracker. Do not create or maintain a third,
extra or parallel tracker, recovery log, migration register or private agent
progress file.
Do not create a third tracker or management record.

Keep new records in the approved dedicated common project directory or other
authorized output location by default. Record the context-file placement decision
in the plan under [project grounding](project-grounding.md): an existing adopted
context may remain in the source project when its exact path is explicitly
authorized; an explicitly authorized new path there is also a valid override.
Survey authority alone grants neither choice. Otherwise place a new context in
the report workspace/authorized output beside the plan. Reuse the
adopted or designated context identity and path; never create duplicate context
records. Without a concrete project, maintain only the work plan and leave
project-dependent items waiting; do not create an empty context.
The `context_file` placement decision records report workspace versus source
project placement and is reused on continuation.

The work plan has one authoritative orientation/checkpoint section named
`Where We Are / Resume Here` and one authoritative whole-report item register.
Do not maintain separate editable copies of current position, next action,
progress, readiness, approval or verification in the same plan. A compact
summary or index may point to those sections, but it is derived and must not be
treated as another source of state.
The checkpoint owns the selected next action; item records own progress,
readiness, remaining obligations and dependencies. Approval and verification
references resolve to the existing decision/check records for exact revision,
scope, result and limits rather than copying those facts into editable summaries.
For an adopted legacy plan, read its equivalent checkpoint and item register;
do not append the new sections alongside them. Consolidate only under existing
editing authority, preserve decisions/history/user notes, and resolve any
conflicting state before removing duplicates.

## Discovery and resumption

On the first Workspace turn of a new chat, after context loss, and on a request
to continue, discover the plan before asking for progress, planning anew or
reading a directory of substantive documents. The host must load the effective
workspace instructions and expose the same files; this is not an automatic UI
event or memory shared across inaccessible workspaces.

1. Use a supplied/adopted `plan_file` first. Otherwise list the current task root
   for `work-plan.md` and the declared output location. If absent, inspect only
   the conventional `work/*/work-plan.md` locations within that task root.
   Do not search the whole disk, vendor trees or unrelated projects.
2. Have [reading-artifacts](../skills/reading-artifacts/SKILL.md) read candidate
   identity and `Where We Are / Resume Here` sections (or the adopted equivalent).
   Exclude templates, examples and archives.
   With one matching record appropriate to the request, read its brief, decisions
   and target item. Explicit resumption of a paused task preserves that record's
   identity and decisions and returns its lifecycle to active when persisted.
   Completed/canceled work reopens only on an explicit request to do so;
   with several, match the user's target deliverable/work ID before choosing.
   If still ambiguous, ask one chat question naming the candidate work items.
   Never choose by newest timestamp or overwrite an ambiguous candidate.
3. Read the adopted plan before its linked artifacts. Recover the authorized
   operation, target revision, relevant decisions, next action and blockers.
   Simple Q&A and unrelated requests remain their own operations: the existence
   of a plan does not authorize resuming, editing or replacing that work.
4. Check existence and revision of the next action's target and relevant inputs.
   Read only the affected source passages, rubric obligations and adjacent prose
   required to perform that action. A plan cannot replace source inspection;
   do not read every document or project file merely to reconstruct progress.
5. Continue under recorded authorization. Ask only about an actual missing input,
   ambiguous target, changed requirement or unresolved applicable decision.
   Do not request re-upload of an accessible unchanged input or repeat an answer
   already recorded. A next-action note alone is not user authorization.

If an adopted path is broken, inspect the bounded locations above for matching
identity and content before asking. Repair an unambiguous moved-file link under
existing tracking authority and record the relocation. Conflicting IDs or copied
records with divergent content require resolution before writing. If no file
access exists, disclose that limitation and request the minimum record/input
needed; never claim cross-chat persistence or a saved update in that environment.

## When to propose persistence

| Observable work | Response |
|---|---|
| Simple Q&A, isolated wording fix, one-off formatting/export, or short self-contained deliverable | No new plan or tracking offer; use the normal route. |
| Existing adopted plan matching the requested task | Reuse it; no renewed setup consent. A small edit updates only the affected checkpoint. |
| Explicit tracking request or an already accepted persistence instruction | Create/reuse the appropriate record within authorized locations. |
| Sustained work with multiple sessions, dependent stages, pending inputs, review cycles or several related deliverables | Proactively offer a durable plan once, with a concrete purpose and proposed location. |
| Project survey alone | Follow the existing one-context-file rule; do not create a work plan as a survey side effect. |

Judge the operation, not keywords, page count or file type. A two-sentence thesis
edit is small; a short report awaiting several experiments may be sustained.
An uncertain case needs at most one material question about continuing over
multiple sessions. Explain the benefit in chat, not internal schema fields.

Offer: "I can keep the plan, decisions and current files together so we can
continue next session. I will create and update the record here; you only need
to review and answer in chat." Include an optional project context only when
project evidence is relevant. The user need not name files or create folders.

Record the answer and its scope. Consent authorizes creating and maintaining
the stated tracking files, not scope/outline/content approval, installations or
unrelated edits. Reuse prior consent; silence is not acceptance. A decline means
continue without persistence and do not repeat the offer unless the work changes
materially or the user asks. Keep the decline in available conversation state;
do not create a file solely to store a refusal. Do independent authorized work
while a proposal is pending. Honor explicit no-write instructions.

### Mandatory user interview and approval before creating tracking or project files

Never unilaterally or silently create the canonical tracking markdown file (`work-plan.md`) or project deliverable files (e.g. `report.md`, `brief.md`, `outline.md`) behind the user's back with unconfirmed assumptions, fabricated milestones, or invented facts while the user has not verified them. `progress.md` is not a parallel tracker; progress is maintained in the work plan's authoritative item register.
If a brief, rubric, or graded guide was supplied, the intake map comes first. This interview confirms only identity fields that map does not already settle. It does not replace the map or authorize skipping the read.

Before creating any tracking or project file:
1. **Interview only unsettled identity fields:** Ask for a project title, problem, objectives, scope boundary, or directory name only when the intake map or supplied brief does not already settle it.
2. **Present the proposal in chat:** Clearly present the proposed tracking structure, milestones, and deliverable file paths directly in chat for user inspection.
3. **STOP and await explicit approval:** Wait for the user to review, provide feedback, or explicitly approve in chat. Only after the user confirms may the AI proceed to create the folder and write the markdown files.

## Record ownership and placement

The active plan is the persisted view of the existing brief, outline, decisions
and checkpoint, not a second independently edited register. Use the
[work-plan template](../templates/work-plan.md) proportionally. If a brief or
outline already owns a decision, reference its exact record rather than copying
an approval status that could diverge. No extra brief/outline files are required.

- [planning-work](../skills/planning-work/SKILL.md) owns outline, item mapping and
  plan content. Scoping supplies requirements and scope decisions.
- [editing-documents](../skills/editing-documents/SKILL.md) is the sole persistent
  writer per checkpoint, including creation of an adopted plan. The router
  coordinates; it does not read or write substantive content itself.
- Specialists and agents receive `plan_file`, `work_id`, item ID, target revision,
  relevant criteria/decisions and source excerpts. They return results, changed
  paths, checks and gaps; they do not create private plans or approve their work.
- [verifying-artifacts](../skills/verifying-artifacts/SKILL.md) reinspects the
  actual artifacts, affected designated context and updated plan. Review checks
  requirement coverage first.

### Dedicated common project folder created by AI

When creating work-tracking files and project deliverable files, organize them into a **single dedicated common project directory created by the AI** (e.g. `<project_name>/` or `projects/<project_name>/`, such as `SmartFood_Delivery_Platform/`), rather than leaving `work-plan.md` scattered in the workspace root or placing deliverable files in arbitrary disconnected paths.

Both the tracking file (e.g. `<project_folder>/work-plan.md`) and the project deliverable files (e.g. `<project_folder>/report.md`, `<project_folder>/brief.md`) reside together in this shared project directory. The AI proposes the folder name and structure to the user for approval during the initial interview before creation.

Default to `<project_folder>/work-plan.md` in the authorized project root. For distinct
concurrent work, use `<project_folder>/work/<work-id>/work-plan.md` rather than overwrite an
existing record. Keep the canonical path in the working checkpoint. Existing
nonstandard named plans remain valid when adopted; do not rename or duplicate
them merely to conform. If no startup-visible location records that path,
offer a minimal locator in effective workspace instructions within authorized
scope; without it, do not promise automatic rediscovery next chat.

[Project grounding](project-grounding.md) permits a designated context write
inside the source project only for its explicitly authorized exact path; new
contexts default to the report workspace. Put plans, extracts and outputs in an
authorized output location. A tracking proposal may include explicit permission
for its named location inside the project; survey authority alone does not.
No hidden permission to run builds, tests, migrations or reorganize the project.

## Identity and selective project matching

The plan records `record_type: work_plan`, a stable `work_id`, title, `plan_file`,
task/output root, plan revision, lifecycle state and tracking consent. Resolve
relative paths against their containing record, not the shell's current folder.

`project_refs` is empty for work without project evidence. Otherwise each entry
records a `project_id`, source root, exact `context_file`, inspected revision and
the item IDs for which it is relevant. Store `record_type: project_context`,
`project_id` and the source root in the designated context when adopting it.
Reuse the designated context identity;
for a legacy context without an ID, verify its source root and inspected content
before assigning one under authorized persistence. Match path, ID and evidence,
not title or modification date alone. Multiple works may reference one project;
one work may reference several. Do not maintain duplicate progress tables in
project-context files or duplicate project descriptions in plans.

Project context is consulted when the current item needs it. The outline maps
each such item to the precise project claim and evidence locator. An item with
no project need says `project_refs: none`. Do not invent a "Project overview"
chapter or insert project descriptions into every section. An adopted rubric
and authorized outline govern inclusion; availability of a repository does not.

## Word, PDF and text intake

Use existing readers and format specialists; discover actual inspection/OCR
capabilities before promising extraction. Preserve original inputs and record
role (rubric, reference, draft, template), path, revision and inspected coverage.
Reading a binary stream or converting a file is not proof of complete reading.

- Word: inspect heading/paragraph/table structure, footnotes and relevant
  comments/tracked changes. Keep proposed edits separate from adopted rules.
  Prefer heading/table locators to unstable page numbers.
- PDF: inspect text and tables with page locators; distinguish PDF page index
  from printed page number. Check scans, reading order, symbols and critical
  rubric tables against page representations. Record OCR uncertainty/unread pages.
- Text: preserve encoding, hierarchy and exact mandatory wording where needed.

Map every identified obligation to a stable criterion ID, original source
locator/revision, required item(s), evidence and acceptance check. Preserve
weights, thresholds, exclusions, required visuals and formatting constraints.
Distinguish source requirements, user decisions, AI proposals and unknowns.
Include an extraction-coverage gap when completeness cannot be established;
never call a provisional plan exhaustive while a rubric page remains unread.

Optional Markdown extraction is a derived inspection aid with source locators,
not a replacement for the original or the plan. Do not convert the entire draft
to Markdown solely to track progress. If a tool is missing, use a supported
alternative or identify the exact gap. Adding a converter is conditional on a
demonstrated capability need, the host's installation rules and user authority;
no new plugin is required merely to maintain a Markdown plan.

Missing criteria permit a provisional plan, not invented grading rules. Inspect
available inputs first, ask only material questions, and continue independent
supported work. "No rubric supplied" differs from "user confirms none exists".
On new/replaced criteria, compare sources, identify affected items and revisit
only dependent decisions and checks. Apply the existing
[criteria-writing contract](criteria-writing-contract.md), including its approval
and missing-evidence boundaries; persistence creates no additional drafting gate.

## Artifact revisions, approvals and exports

For each deliverable family (document, slides, workbook), distinguish:

| Record | Meaning |
|---|---|
| Working artifact | Current editable path and revision; may be unapproved. |
| Approved artifact | Preserved artifact revision plus exact user decision and approved sections. |
| Export | Output path/revision, source artifact/revision, actual verification and currency relative to working/approved source. |

A revision record includes an artifact ID, path, revision ID and content hash
when available. Timestamps/size are freshness hints, not proof of identical
content. If identity cannot be established, mark it unconfirmed and inspect the
affected content; do not silently reuse approval or checks. An external write at
the same path can invalidate a revision. Preserve the previous approved content
using an immutable snapshot or a recoverable version-history identifier before
further writes. Never label overwritten bytes as the old approved revision.

User approval refers to the identified version and scope shown in chat. An
ambiguous "OK" covering several candidates needs narrow clarification. Reuse
clear existing decisions. Approval of a plan, a proposed edit, content acceptance
and file verification are different facts. An export request approves none of
them. Newly saved/verified r04 does not replace approved r03 automatically.
Approval refers to the identified revision and scope; this is a revision-scoped
approval and reopening an item preserves its previous approval for that revision.

Resolve export source from the request: "approved version" means the approved
revision within its recorded scope; "current draft" means working revision.
For an unspecified export, reuse an unambiguous conversational target; otherwise
ask which revision. Record and independently inspect the actual export. An r03
PDF remains current for r03 even if r04 is being drafted; mark its relationship
to each baseline, rather than declaring every older PDF unusable. On approval of
r04, an r03 PDF is stale relative to the approved baseline. Do not export again
without an existing applicable export request.

If an existing export has the requested source revision and format/settings,
verify its actual identity and applicable checks, then deliver it without
creating a duplicate. Regenerate when the requested source/settings changed,
the output is missing or invalid, or the user explicitly requests regeneration.
Record which path occurred; reuse never grants new content approval.

Each work item records criterion IDs, status, exact artifact revision/locator,
blockers, remaining obligations/dependencies, evidence/check references and
applicable approval scope. Select the next action in the single checkpoint;
do not copy it into a second editable task list.
Separate content state (`todo`, `drafting`, `review`, `revision_needed`, `done`)
from blockers, verification and acceptance. `done` means its agreed acceptance
checks passed; required user acceptance must be recorded. A count of words or a
successful save is insufficient. Propagate material changes only to dependent
items/decisions. Wording-only edits preserve substantive approval where meaning
is unchanged, but still require checking the newly saved file.

Progress and readiness are separate states. An approved but incomplete item with
an evidence gap or verification limit is not complete or ready; approval does
not replace a check. Approval is revision-scoped and scope-scoped, and must be
checked against the recorded verification for that same version and scope.

Stable item identities survive heading renames, reordering, merges and splits.
Keep a mapping from old items to new locators (an old-to-new item/locator
mapping) and keep the criterion ID mapping authoritative; preserve it when
content moves.
Reopening an item preserves its previous approval
against its old revision; record the new revision and affected scope separately.
Do not treat a newly saved or verified revision as replacing an approved
revision automatically.

## Checkpoint transaction and handoff

Update at meaningful boundaries: saved section, reviewed revision, received
decision, new evidence, export or session handoff. Avoid a file for each turn.

1. Read the adopted plan when present and the existing records affected by this operation.
   Immediately before each write, compare the target's current revision with
   the one read; reconcile concurrent changes and preserve unrelated user edits.
   For a new authorized target, confirm the path is still unused. Use safe
   replacement/backup where supported; do not overwrite another writer's state.
2. Save the requested deliverable first when it is being edited; preserve
   applicable approved snapshots. Reopen and check the actual saved revision.
   Failed or missing checks remain explicit; do not mark the item complete.
   For a decision/evidence-only checkpoint, inspect the relevant existing
   deliverable without rewriting it. A survey-only operation skips this step
   if no deliverable is involved.
3. Update the designated project context only if it is affected and authorized,
   then reopen and check its actual saved revision. If context is absent or
   unaffected, skip this step; do not create a context to satisfy the transaction.
   First context creation requires its own already-authorized placement/scope.
4. Update the affected plan entries and the single `Where We Are / Resume Here`
   checkpoint last. Link the context and plan with the same change reference
   and source/output revision references; record actual saved results and gaps.
   If context was not touched, record only the relevant artifact/decision change.
   Do not inject tracking metadata into the authored report merely to link it.
   A survey-only context update without an adopted plan skips this step; it
   never creates a plan as a side effect.
5. Re-read every artifact and record touched by the transaction. Verify paths,
   revisions, the shared change reference, source/export relationships, required
   decision references and next action agree. A mismatch is incomplete
   synchronization and must be reconciled before claiming consistency.
6. Report the actual changed artifact, remaining gap and next action briefly.

If the deliverable write fails, do not advance its saved revision in either
record. If the deliverable saves but context updating fails, report the partial
save with exact saved and unsaved paths/revisions; do not mark the plan fully
synchronized. If context updating succeeds but plan updating fails, preserve the
saved deliverable/context and report that split result. The same rule applies
when artifact saving succeeds but plan updating fails with no affected context.
A still-writable existing plan may record the partial checkpoint, never an
invented success. Next session reconciles the actual artifact, affected context
and plan before continuing; absence of a checkpoint is not proof work was never
performed. One writer owns each checkpoint; reviewers return findings.

This is a recoverable sequence for interrupted updates: identify the saved and
unsaved parts, preserve unrelated changes, and reconcile them on resumption.
Do not generate a third tracker or recovery file to hold the split result.

Keep `Where We Are / Resume Here` near the top: current target/revision, last
checked checkpoint, next action and completion condition, required source
locators, pending decisions, and any temporary task's return point. Move long
historical logs to archives only when needed; preserve locators for approvals and
never delete versions as routine cleanup. A paused/canceled/completed plan is not
resumed by an unrelated question.
