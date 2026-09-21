---
name: editing-documents
description: Use when editing existing text or document content, or when creating or updating the single derived context record for an authorized project survey.
---

# Editing Documents

Modify existing text or document content at the depth requested.

Word mathematics follows the [native Equation contract](../../references/math-in-documents.md)
for paste and in-file edits: preserve OMML and mathematical content, use the
latest adopted Word source, and verify affected equations after edit/save/reopen.
Substantive math changes use `working-with-mathematics` through the existing
authoring route. Formatting-only work must not change a proof or expression.

Apply the [workflow continuity contract](../../references/workflow-continuity.md)
to changed requests and new artifacts. For insertion, continuation, or substantive
revision, use the [document continuity contract](../../references/document-continuity.md)
to preserve the existing argument, scenario, terminology, and presentation.
Check adjacent passages after insertion; update related text only within the
authorized scope. A chat suggestion does not modify the source file.

## When to use

Typo or wording corrections, insertion, deletion, rewriting, restructuring, or full redesign of an existing document. The preserve-list does not decide whether this skill loads.

Also create or update the one designated `context_file` under the
[project grounding contract](../../references/project-grounding.md). Consume
inspected content, provenance and conflicts from reading/analysis; preserve the
recorded file identity. First creation is a narrow exception to the existing-file
rule below: confirm the selected path is unused and never overwrite an original
project document. Re-read an existing context record before updating it, label
notes derived, and verify the actual file afterward. This persistence operation
does not require a new report outline or authorize any other project write.

## When not to use

Create-from-blank deliverables other than the designated project context record. Read-only analysis with no authorized persistence. Verify-only. Spreadsheets, presentations, images and PDFs belong to their own artifact families.

## Procedure

1. For existing files, use `reading-artifacts` first and `analyzing-artifacts` for non-trivial modifications. For pasted content, inspect the supplied text directly and analyze substantive changes without requiring a file. Mechanical corrections can proceed directly after reading.
2. Establish the requested changes and preserve-list. For substantive report/thesis rewrites or re-argument, use `drafting-prose` to check applicable prerequisites and select writing specialists under the [criteria-writing contract](../../references/criteria-writing-contract.md). Preserve the authorized `revise` operation; do not restart as a new report.
3. Apply the authorized edits. Typo, wording-only, and format-only changes do not activate criteria-writing approval gates. Route formatting and conversion to their specialists.
4. After substantial edits, hand off to `reviewing-work` and apply corrections. For modified files, finish with `verifying-artifacts`; for text returned in chat, review that text without claiming a file was changed.

## Factual fidelity

An instruction to edit or rewrite does not authorize inventing facts. For an
underspecified edit, improve wording while preserving factual claims, numbers,
direction and magnitude of changes, causes, and uncertainty. Change those only
when the user supplies the replacement facts or supporting evidence.

For example, a preliminary decline cannot become confirmed growth merely to make
a paragraph sound better. If a necessary clarification cannot be obtained, keep
the original facts and make only a meaning-preserving edit, or explain the
unresolved requirement. An unavailable answer is not permission to guess.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `edit_document(file, change)` for text and document artifacts.
- `read_file(path)` / `write_file(path, content)` when no typed edit capability exists.

Typed edit capabilities for other families — spreadsheet, presentation, image, layered image — belong to those families' skills, not here.

## Specialists

Select the route by the requested change, not the document's title.

| Trigger | Route to |
|---|---|
| Typo or wording-only correction preserving claims and structure | this skill directly; no criteria-writing approval gates |
| Substantive report/thesis rewrite or re-argument | `drafting-prose` checks prerequisites and selects `writing-reports` / `writing-academic-prose` by section; this skill applies document edits |
| Other substantive document content change | this skill with `analyzing-artifacts` for existing files, then `reviewing-work` |
| Layout, style, TOC, captions or pagination only, content unchanged | `formatting-layout` |
| Export or format conversion across file types (e.g. DOCX → PDF) | `converting-artifacts` |

## Dependencies

- For existing files, `reading-artifacts` is required before editing and `analyzing-artifacts` for non-trivial modifications. Pasted text is inspected and analyzed directly.
- `drafting-prose` — prerequisite check and prose specialist selection for substantive report/thesis rewrites, without replacing this skill's document editing responsibility.
- `reviewing-work` — required after a substantial (non-mechanical) edit, before `verifying-artifacts`.
- `verifying-artifacts` — required for modified files before file success is claimed. Chat-only text receives content review without a file-verification claim.

## Fallback

If in-file edit is unavailable, emit a structured change list. Never claim the file changed.

## Common mistakes

- Editing before reading, or making substantive changes without analysis.
- Changing something on the preserve-list.
- Claiming the file changed when only a change-list was produced.
- Treating an unrelated create-from-blank deliverable as an edit.
- Rewriting content when only layout or style was requested.
- Changing facts or removing uncertainty during a wording-only or unspecified edit.
