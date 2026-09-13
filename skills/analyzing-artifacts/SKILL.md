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

## Fallback

If layout or a typed representation is unavailable, analyze from the accessible representation and declare what could not be observed. Never invent structure.
