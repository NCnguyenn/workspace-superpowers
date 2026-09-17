---
name: analyzing-artifacts
description: Use when a file that has already been read must be understood — structure, layout, headings, tables, what must be preserved, and what the user asked to change.
---

# Analyzing Artifacts

Turn a completed read into a preserve-list and a change-list. Does not edit.

## When to use

`reading-artifacts` has already opened the file and a type-appropriate representation exists.

## When not to use

The file has not been read. Do not analyze from guessed or raw-byte-only input.

## Procedure

1. Structure, content, and layout.
2. What the user asked to change.
3. Preserve-list: what must not change.
4. Hand the preserve-list to any later edit.

Per-type inspection fields: `references/artifact-inspection.md`.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)`, `inspect_image(file)`, `inspect_layered_image(file)` to re-query structure on demand.
- `read_file(path)` for text, Markdown, and CSV-style artifacts.

## Dependencies

- `reading-artifacts` — required; never analyze an unread file.
- `editing-documents` and `verifying-artifacts` — downstream consumers of the preserve-list.

## Fallback

If layout or a typed representation is unavailable, analyze from the accessible representation and declare what could not be observed. Never invent structure.

## Common mistakes

- Analyzing from guessed or raw-byte-only input.
- Producing a change-list with no preserve-list.
- Inventing structure the artifact does not expose.
- Treating the preserve-list as the trigger for an edit skill — it only names what must not change.
