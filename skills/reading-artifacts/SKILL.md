---
name: reading-artifacts
description: Use when an existing artifact — document, PDF, deck, workbook, image, rubric, template, or other file — must be opened and its accessible content or representation read before any analysis or edit.
---

# Reading Artifacts

Generic input-reading for any existing file. Does not interpret. Does not edit.

## When to use

An attached or referenced artifact must be opened before analysis or modification.

## When not to use

No existing file is involved. Analysis of already-read content belongs to `analyzing-artifacts`.

## Procedure

Open the real artifact and read the representation appropriate to its type: text, pages, sheets, cells, pixels, metadata, layers, or other available structure.

Reading raw bytes alone does not constitute understanding the artifact.

Do not interpret yet.
Do not edit.

## Fallback

If the file cannot be opened, stop. Never guess contents. Opening a binary stream without a type-appropriate representation is not a successful read.
