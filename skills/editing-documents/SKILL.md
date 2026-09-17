---
name: editing-documents
description: Use when making a substantive modification to an existing text or document artifact — insert, delete, rewrite, restructure, or full redesign — not only when formatting must be preserved.
---

# Editing Documents

Substantive modification of an existing text or document artifact.

## When to use

Any insert, delete, rewrite, restructure, or full redesign of an existing document — including “redesign the whole file”. The preserve-list does not decide whether this skill loads.

## When not to use

Create-from-blank with no existing artifact. Read-only analysis. Verify-only. Spreadsheets, presentations, images and PDFs belong to their own artifact families.

## Procedure

1. `reading-artifacts` then `analyzing-artifacts` first.
2. Edit against the requested changes.
3. The preserve-list from analyzing names only what must **not** change.
4. Then `verifying-artifacts`.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `edit_document(file, change)` for text and document artifacts.
- `read_file(path)` / `write_file(path, content)` when no typed edit capability exists.

Typed edit capabilities for other families — spreadsheet, presentation, image, layered image — belong to those families' skills, not here.

## Specialists

None shipped yet. The trigger rows exist now so a later specialist drops in without editing the router or the dependencies below.

| Trigger | Route to |
|---|---|
| Substantive content change to an existing text or document artifact | this skill |
| Layout, style, TOC, captions or pagination only, content unchanged | `formatting-layout`, when it ships in the document family |

## Dependencies

- `reading-artifacts`, `analyzing-artifacts` — required before any edit.
- `verifying-artifacts` — required after the edit and before success is claimed.

## Fallback

If in-file edit is unavailable, emit a structured change list. Never claim the file changed.

## Common mistakes

- Editing before reading and analyzing.
- Changing something on the preserve-list.
- Claiming the file changed when only a change-list was produced.
- Treating a create-from-blank deliverable as an edit.
- Rewriting content when only layout or style was requested.
