---
name: editing-documents
description: Use when editing existing text or document content, from typo or wording corrections to insertion, rewriting, restructuring, or full redesign.
---

# Editing Documents

Modify existing text or document content at the depth requested.

## When to use

Typo or wording corrections, insertion, deletion, rewriting, restructuring, or full redesign of an existing document. The preserve-list does not decide whether this skill loads.

## When not to use

Create-from-blank with no existing artifact. Read-only analysis. Verify-only. Spreadsheets, presentations, images and PDFs belong to their own artifact families.

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
- Treating a create-from-blank deliverable as an edit.
- Rewriting content when only layout or style was requested.
- Changing facts or removing uncertainty during a wording-only or unspecified edit.
