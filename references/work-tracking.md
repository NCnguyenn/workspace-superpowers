# Persistent work tracking

Use this contract when a Workspace task needs a durable plan across sessions, dependent stages, review cycles, or related deliverables. It extends [workflow continuity](workflow-continuity.md); it does not create authorization, a new lifecycle, or a separate user form. Users make decisions in chat. Agents maintain the canonical record, artifact identities, revisions, checkpoints, and handoffs.

## Canonical records and ownership

Use a canonical two-record model, with at most two management Markdown records for a sustained deliverable:

1. **`work-plan.md`** owns the whole-report outline, work-item progress, decisions, dependencies, artifact relationships, and the next action.
2. **`project-context.md`**, only when a concrete project is selected and its creation/placement is authorized, owns project identity, inspected source state, evidence provenance, coverage, and conflicts.

The work plan must not become a project specification. The project context must not become a progress tracker. Do not create `progress.md`, a third tracker, a recovery log, a migration register, a private agent log, or another parallel state record. The [Session Checklist](session-progress.md) is a transient execution view for one request; it creates no file, database, state store, or durable progress register and never replaces the work plan.

New records belong in the approved dedicated common project directory or other authorized output location. Record the `context_file` placement decision under [project grounding](project-grounding.md):

- an adopted context may remain in the source project only when its exact path was explicitly authorized;
- an explicitly authorized new source-project path is a valid override for that one context write;
- survey authority alone does not authorize choosing a new source-project path;
- otherwise place a new context beside the plan in the report workspace or authorized output location.

Reuse the adopted or designated context identity and path. Never create duplicate context records. Without a concrete project, maintain only the work plan and leave project-dependent items waiting; do not create an empty context.

### The single checkpoint and item register

The work plan contains exactly one authoritative orientation/checkpoint section named `Where We Are / Resume Here` and one authoritative whole-report item register. The checkpoint owns the selected next action. Item records own progress, readiness, remaining obligations, dependencies, and references to decisions/checks. A compact summary may link to those sections but must not duplicate editable state.

For an adopted legacy plan, identify its equivalent checkpoint and item register. Consolidate only under the existing editing authority, preserve user decisions and history, and resolve conflicting state before removing duplicates. Do not append a second current-position section merely to adopt this template.

## Discovery and resumption

Discover the plan before asking for progress, planning anew, or reading a directory of unrelated substantive documents on:

- the first Workspace turn in a new chat;
- resumption after context loss;
- an explicit request to continue.

The host must expose the effective instructions and the same accessible files. This is bounded file discovery, not automatic cross-chat memory or background monitoring.

1. **Select candidates.** Use a supplied/adopted `plan_file` first. Otherwise inspect the current task root, declared output location, and conventional `work/*/work-plan.md` locations within that root. Do not search the whole disk, vendor trees, or unrelated projects.
2. **Read identity and checkpoint.** Have `reading-artifacts` read the record identity and `Where We Are / Resume Here` (or the adopted equivalent), excluding templates, examples, and archives.
3. **Match the request.** With one matching record, read its brief, decisions, target item, and relevant blockers. With several, match the user’s target deliverable or `work_id`; never choose by newest timestamp alone. If still ambiguous, ask one question naming the candidates.
4. **Check linked revisions.** Read the adopted plan before linked artifacts. Check the next action’s target and affected inputs; read only the source passages, rubric obligations, and adjacent prose needed for that action.
5. **Continue or stop.** Continue under recorded authorization. Ask only about a missing input, ambiguous target, changed requirement, or unresolved applicable decision. A next-action note is not user authorization.

Completed or canceled work reopens only on an explicit request. A broken path may be repaired when identity and content are unambiguous; record the relocation. Conflicting IDs or divergent copies require resolution before writing. If the record is inaccessible, disclose the limitation and request the minimum record/input; never claim cross-chat persistence or a saved update.

## When to propose persistence

| Observable work | Action |
|---|---|
| Simple Q&A, isolated wording fix, one-off formatting/export, or a short self-contained result | Do not create or offer a new plan. |
| Existing adopted plan matches the request | Reuse it; update only the affected checkpoint and item. |
| User explicitly requests tracking or has already accepted persistence | Create or reuse the appropriate record in an authorized location. |
| Sustained work with multiple sessions, dependent stages, review cycles, pending inputs, or related deliverables | Offer a durable plan once, with its purpose and proposed location. |
| Project survey alone | Follow the one-context-file rule; do not create a work plan as a survey side effect. |

Judge the operation, not keywords, page count, or file type. A short report with several dependent experiments may be sustained; a two-sentence thesis edit may be small.

Offer: “I can keep the plan, decisions, and current files together so we can continue next session. I will create and update the record here; you only need to review and answer in chat.” Include an optional project context only when project evidence is relevant.

Record the answer and its scope. Tracking consent authorizes the stated tracking files and locations, not scope approval, outline approval, content acceptance, installation, testing, or unrelated edits. Silence is not acceptance. A decline means continue without persistence and do not create a refusal file. Honor explicit no-write instructions.

### Mandatory user interview and approval before creating files

Never silently create `work-plan.md`, `project-context.md`, or deliverable files such as `report.md`, `brief.md`, or `outline.md` from unconfirmed assumptions, invented milestones, or fabricated facts. If a brief, rubric, or graded guide was supplied, the intake map comes first. Confirm only identity fields that the map does not settle.

Before creating a tracking or project file:

1. Interview only unsettled identity fields such as project title, problem, objective, scope boundary, or directory name.
2. Present the proposed folder, record structure, milestones, and deliverable paths in chat.
3. Wait for explicit user approval or requested corrections.
4. Create the approved directory and files only after that decision.

This requirement does not apply to maintenance of the repository’s existing instruction files under an authorized task brief.

## Record ownership and placement

The active plan is the persisted view of the adopted brief, outline, decisions, and checkpoint, not an independently edited duplicate. Use the [work-plan template](../templates/work-plan.md) proportionally. If a brief or outline already owns a decision, reference its exact record instead of copying a status that could diverge.

- [planning-work](../skills/planning-work/SKILL.md) owns outline mapping, item structure, and plan content; scoping supplies requirements and scope decisions.
- [editing-documents](../skills/editing-documents/SKILL.md) is the sole persistent writer for an adopted plan and the designated `context_file`; the router coordinates but does not write substantive content.
- Specialists and agents receive `plan_file`, `work_id`, item ID, target revision, relevant decisions, evidence, and source excerpts. They return results, changed paths, checks, and gaps; they do not create private plans or approve their work.
- [verifying-artifacts](../skills/verifying-artifacts/SKILL.md) reopens the actual deliverables, affected context, and updated plan.

### Dedicated common project folder

Create the plan and related deliverables in one dedicated common project directory, such as `<project_name>/` or `projects/<project_name>/`, rather than scattering them in the workspace root. The default is `<project_folder>/work-plan.md`; concurrent work may use `<project_folder>/work/<work-id>/work-plan.md`. Existing nonstandard adopted paths remain valid; do not rename or duplicate them merely to conform.

Keep the canonical path in the checkpoint. If startup-visible instructions do not record it, do not promise automatic rediscovery next session. Project grounding permits a context write inside a source project only at its exact explicitly authorized path. It grants no permission to run builds, tests, migrations, reorganize files, or write other outputs.

## Identity and selective project matching

The plan records:

- `record_type: work_plan`;
- stable `work_id`, title, `plan_file`, task/output roots, plan revision, lifecycle, and tracking consent;
- `context_file` and its `placement_authority` when applicable;
- the authorized operation and stopping point.

`project_refs` is empty for work without project evidence. Otherwise each entry identifies a `project_id`, source root, exact `context_file`, inspected source revision, and relevant item IDs. A designated context records `record_type: project_context`, `project_id`, and source root. Match path, identity, and evidence, not title or modification time alone.

Project context is consulted only when the current item needs it. The outline maps each project-dependent item to a precise claim and locator. An item with no project need records `project_refs: none`. A repository’s presence does not authorize a “Project overview” chapter or project claims in every section.

## Source intake and evidence coverage

Use the available reader and format specialist for Word, PDF, spreadsheet, image, and text inputs. Preserve originals and record role, path, revision, and inspected coverage. A binary stream or conversion is not proof of complete reading.

Map every identified obligation to a stable criterion ID, source locator/revision, required item, evidence, and acceptance check. Preserve weights, thresholds, exclusions, required visuals, and formatting constraints. Distinguish source requirements, user decisions, AI proposals, and unknowns. If completeness cannot be established, record an extraction-coverage gap; do not call a provisional plan exhaustive.

A missing rubric permits a provisional plan, not invented grading rules. “No rubric supplied” differs from “the user confirms none exists.” On new or replaced criteria, compare sources and revisit only dependent items and checks. Apply the [criteria-writing contract](criteria-writing-contract.md); persistence adds no drafting gate.

## Revisions, approvals, exports, and item state

For each deliverable family, keep these records distinct:

| Record | Meaning |
|---|---|
| Working artifact | Current editable path and revision; may be unapproved. |
| Approved artifact | Preserved revision plus the exact user decision and approved scope. |
| Export | Output path/revision, source artifact/revision, actual verification, and currency relative to working and approved baselines. |

Record artifact ID, path, revision ID, and content hash when available. Timestamp and size are freshness hints, not identity proof. Preserve the prior approved content before an overwrite using an immutable snapshot or recoverable version-history identifier. Never call overwritten bytes the old approved revision.

Approval applies only to the visible identified revision and scope. Approval of a plan, proposed edit, content, and file verification are different facts. An export request approves none of them. A newly saved or verified r04 does not replace approved r03 automatically. An r03 export can remain current for r03 while stale relative to an approved r04 baseline.

Each work item records criterion IDs, status, exact artifact revision/locator, blockers, remaining obligations/dependencies, evidence/check references, and applicable approval scope. Keep content progress separate from readiness, approval, verification, and acceptance:

- content progress: `todo`, `drafting`, `review`, `revision_needed`, `done`;
- evidence readiness: ready, gap, blocked, or unknown as applicable;
- approval: revision- and scope-specific decision record;
- verification: actual check result and limitations.

`done` means the agreed acceptance checks passed and required user acceptance is recorded. A successful save, word count, or command is insufficient. An approved item with an evidence gap or verification limit is not complete or ready.

Stable item identities survive heading renames, reordering, merges, and splits. Preserve an old-to-new item/locator mapping and authoritative criterion IDs. When reopening an item, preserve the previous approval against the old revision and record the new revision and affected scope separately.

## Checkpoint transaction and handoff

Update at meaningful boundaries: a saved section, reviewed revision, received decision, new evidence, export, or session handoff. One writer owns each checkpoint. Immediately before each write, compare the target’s current revision with the one read; reconcile concurrent edits and preserve unrelated changes. An external write at the same path can invalidate a revision.

1. Read the adopted plan and records affected by the operation. Confirm a new authorized target is still unused.
2. Save the requested deliverable first when it is being edited. Preserve approved snapshots, reopen the actual saved revision, and leave failed checks explicit.
3. Update the designated project context only when it is affected and authorized; if absent or unaffected, skip it. Do not create a context to satisfy a transaction.
4. Update affected plan items and the single `Where We Are / Resume Here` checkpoint last. Link plan/context/artifact revisions with the same change reference and source/output revision references.
5. Re-read every artifact and record touched by the transaction. Verify paths, revisions, source/export relationships, decision references, and next action agree.
6. Report the actual saved paths/revisions, remaining gap, and next action.

If a deliverable saves but context or plan updating fails, report the exact partial-save state. If context updating succeeds but plan updating fails, preserve the saved deliverable/context and report that split result. Do not mark the plan synchronized or invent a revision. This is a recoverable sequence for interrupted updates: identify the saved and unsaved parts, preserve unrelated changes, and reconcile them on resumption. The next session reconciles the actual artifact, affected context, and plan. Do not create a third tracker or recovery file for the split result.

## Links to implementation owners

The [work-plan template](../templates/work-plan.md) provides the canonical field layout. [Project grounding](project-grounding.md) owns the one derived context record and survey boundary. The [criteria-writing contract](criteria-writing-contract.md) owns analysis, outline, evidence, and drafting decisions. [Reading artifacts](../skills/reading-artifacts/SKILL.md) owns bounded source inspection; [editing documents](../skills/editing-documents/SKILL.md) owns persistent writes; [verifying artifacts](../skills/verifying-artifacts/SKILL.md) owns final reinspection.
