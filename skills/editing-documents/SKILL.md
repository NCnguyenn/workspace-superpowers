---
name: editing-documents
description: Use when editing text or documents, persisting an adopted work plan, or maintaining the designated context record for an authorized project survey.
---

# Editing Documents

## Job

Apply authorized content changes to an existing text or document artifact while preserving scope, facts, and unrelated user content. This skill is also the single persistent writer for an adopted `work-plan.md` and the one designated `context_file` when their creation or update is authorized.

Use [workflow continuity](../../references/workflow-continuity.md) and [persistent work tracking](../../references/work-tracking.md). Before each persistent write, compare the current revision with the handed-off revision. Preserve user changes, approved snapshots, source identity, and the exact checkpoint order; do not create a parallel tracker.

## Route by change type

| Requested change | Route | Boundary |
|---|---|---|
| Typo or wording-only correction that preserves facts and structure | Edit directly after reading | No criteria-writing approval gate. |
| Substantive report or thesis rewrite / re-argument | `drafting-prose` with `writing-reports` or `writing-academic-prose`, then this skill applies the file edit | Read, analyze, review, and verify. |
| Other substantive document content change | Read, analyze, edit, review, and verify | Preserve the requested scope. |
| Layout, TOC, captions, pagination, or style only | `formatting-layout` | Never rewrite content. |
| Format transformation or export | `converting-artifacts` | Verify the generated output separately. |

Pasted text is an input, not a file prerequisite: inspect the supplied text directly and analyze a substantive change without requiring an attachment.

## Method

1. **Read the current source.** For existing files, use `reading-artifacts` first; use `analyzing-artifacts` for non-trivial changes. Identify the target revision, insertion point, preserve-list, and relevant adjacent text.
2. **Confirm the operation.** Separate content changes from layout, conversion, or evidence work. A request to rewrite wording does not authorize a factual rewrite.
3. **Prepare the change.** For a substantive report or thesis rewrite, load `drafting-prose` and its selected writer under the [criteria-writing contract](../../references/criteria-writing-contract.md). For a continuation, apply the [document continuity contract](../../references/document-continuity.md).
4. **Apply only authorized edits.** Preserve numbers, direction of change, uncertainty, source wording, protected titles, and user content unless replacement facts or an explicit change are supplied.
5. **Checkpoint persistent records correctly.** Save and reopen the deliverable first. Update an affected authorized `context_file` second. Update affected plan entries and the checkpoint last. Re-read every touched record and report a split result if any write fails.
6. **Review and verify.** Substantial edits go through `reviewing-work`; every modified file goes through `verifying-artifacts`. Chat-only edits are reviewed without claiming a file changed.

## Project context and tracking

Use [project grounding](../../references/project-grounding.md). Create or update a `context_file` only when its exact placement and creation/update authority are recorded. A read-only survey does not authorize a project write. The first creation must use an unused authorized path and must never overwrite an original project document. Keep project context derived, source-grounded, and separate from work progress.

## Factual fidelity and special content

Never invent evidence while editing. If a preliminary decline is the source fact, do not rewrite it as confirmed growth. If a required fact is unknown, preserve the existing claim, make only a meaning-preserving edit, or identify the gap.

For tables, figures, and Word content, apply [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md). For Word mathematics, apply the [native Equation contract](../../references/math-in-documents.md): preserve OMML, notation, and meaning; substantive mathematics returns to `working-with-mathematics`.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `edit_document(file, change)` — edit supported text and document artifacts.
- `read_file(path)` and `write_file(path, content)` — safe text operations when typed document editing is unavailable.

## Completion and fallback

A file edit is complete only after the requested change is saved, re-opened, and verified. If in-file editing is unavailable, provide a structured change list with exact insertion or replacement locations; do not claim the file changed.

## Common mistakes

- Editing before reading or making a non-trivial change without analysis.
- Treating a preserve-list as an optional suggestion.
- Rewriting facts during a wording-only task.
- Writing a work plan or project context without its explicit authority.
- Using an edit route for layout-only work or a conversion route for in-place content changes.
- Claiming a file update when only a proposed change list exists.
