---
name: reading-artifacts
description: Use when an existing artifact — document, PDF, deck, workbook, image, rubric, template, or other file — must be opened and its accessible content or representation read before any analysis or edit.
---

# Reading Artifacts

Generic input-reading for any existing file. Does not interpret. Does not edit.

For Word mathematics, include the representation and formula locators required
by the [Equation contract](../../references/math-in-documents.md). For a project
folder or its description, follow the acquisition and read-only boundaries in
[project grounding](../../references/project-grounding.md); return observed paths,
versions and coverage to analysis. This reading skill does not write the context file.

Apply the [workflow continuity contract](../../references/workflow-continuity.md)
when files arrive at any stage. Reading is an input step that returns to the
requested operation; it does not restart the task or authorize editing.

## When to use

An attached or referenced artifact must be opened before analysis or modification.

## When not to use

No existing file is involved. Analysis of already-read content belongs to `analyzing-artifacts`.

## Procedure

Open the real artifact and read the representation appropriate to its type: text, pages, sheets, cells, pixels, metadata, layers, or other available structure.

Record artifact identity/revision, inspected locators, extracted content, and
unreadable portions for downstream use. Reuse an unchanged prior read only if
the relevant representation remains available. Read changed or uncovered parts.
For writing the next section, inspect the structure, relevant preceding and
following passages, definitions, and evidence requested by the
[document continuity contract](../../references/document-continuity.md).
Hand actual excerpts and coverage limits to analysis; do not infer style or facts
from a filename or a short sample claimed to represent the whole document.

Reading raw bytes alone does not constitute understanding the artifact.

Do not interpret yet.
Do not edit.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` for text-bearing artifacts.
- `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)` for office artifacts.
- `extract_pdf_text(file)`, `extract_pdf_tables(file)`, `extract_pdf_images(file)` for PDF content.
- `ocr_scanned_document(file)` for scanned or image-only pages.
- `inspect_image(file)`, `inspect_layered_image(file)` for raster and layered visuals.
- `list_files(dir)` when the artifact belongs to a set.

A capability may be absent. Absence is a first-class state: record it, never substitute a guess for it.

## Dependencies

None. Every other skill that touches an existing file requires this one first; `analyzing-artifacts` cannot start without it.

## Fallback

- The file cannot be opened → stop the dependent reading/claim, disclose the limitation, and return the gap to the router so independent authorized work can proceed. Never guess contents. Opening a binary stream without a type-appropriate representation is not a successful read.
- Scanned or image-only artifact with no OCR capability → report which pages or regions were unreadable. Do not paraphrase what a page probably says.
- No typed inspection capability → read the accessible representation, such as extracted text, and state which structure was not observed.

## Common mistakes

- Treating raw bytes or a hex dump as a read.
- Interpreting while reading — structure and preserve-lists belong to `analyzing-artifacts`.
- Reporting a successful read for a file that failed to open.
- Reporting a scanned page as read when OCR was unavailable.
- Skipping the metadata, layers, sheets, or non-text structure the type exposes.
