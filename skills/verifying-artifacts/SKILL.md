---
name: verifying-artifacts
description: Use when any artifact has been created, edited, converted, or exported and success is about to be claimed.
---

# Verifying Artifacts

## Job

Reopen the actual current artifact and check the result against the requested revision and deliverable contract. Verification establishes file integrity and format-specific evidence; it does not replace content review, invent a missing rendering capability, or silently repair the artifact.

**Command success is not artifact success.**

**A check on an earlier generation is stale after another write or conversion.**

Use [workflow continuity](../../references/workflow-continuity.md) to identify the latest target. For sustained work, use [persistent work tracking](../../references/work-tracking.md) to compare the saved artifact, affected `context_file`, and plan references with the handed-off revision. Report a split save or unsynchronized checkpoint honestly.

## Inputs and output

**Inputs:** actual output paths, target revision, preserve-list, deliverable contract, expected checks, and any source/export relationship.

**Output:** a verification record stating what was reopened, which checks passed, what was unverified or blocked, and whether the artifact is ready for packaging or must return to its owner.

## Method

1. **Locate the latest target.** Confirm the exact source, working or approved revision, export relationship, and intended output path. Do not verify a stale path or an earlier generation.
2. **Reopen the real artifact.** Use a type-appropriate representation rather than a raw binary stream. Verify that it exists, opens, and exposes the expected structure.
3. **Compare requested content and preservation.** Check changed areas against the approved/requested scope, preserve-list, template or rubric, and expected cross-artifact values.
4. **Run format-specific checks.** Use [artifact verification criteria](references/artifact-verification.md), preserving the distinction between structural and rendered checks. Render where a rendering capability exists; record a missing renderer as unverified.
5. **Check generated outputs independently.** Verify the editable source and every export separately. A source pass does not verify a PDF, image, workbook export, or converted document.
6. **Record limits and hand off.** State paths, revision identities, passed checks, missing checks, and residual limitations. Return defects to the responsible editor, converter, or specialist. Package only after verification passes for the requested delivery set.

## Format-specific checks

- **DOCX and rich text:** structure, headings, tables, links, citations, fields, figures, captions, page setup, and render where available.
- **PDF:** page count, text, fonts, tables, figures, clipping, and render where available.
- **Presentations:** slide count, theme, asset presence, speaker notes, text overflow, and rendered slides where available.
- **Workbooks:** sheet structure, formulas, references, recalculation faults, charts, and data types.
- **Images and vectors:** dimensions, format, aspect ratio, editability where required, clipping, and rendered appearance.
- **Mixed sets:** each artifact plus cross-artifact consistency.

For tables and figures, apply [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md) and the [visual evidence boundary](../../references/visual-evidence-boundary.md). Compare actual table cells, media identity, captions, sources, placement, and template/rubric requirements. Separate structural and rendered checks. XML extent or a media count cannot establish visual readability.

For a continuation or substantive revision, apply the [document continuity contract](../../references/document-continuity.md). Recheck the actual seam, role names, narrative person, tense by function, technical decisions, evidence status, citations, lead-and-list defects, headings, and cross-references. Do not silently rewrite unrelated earlier sections. Verification cannot establish native PI-Desktop acceptance without the corresponding retained trace.

## Word mathematics

Apply the [native Equation contract](../../references/math-in-documents.md). Record formula locators, mathematical content, OMML structure, rendered appearance, and native edit/save/reopen checks separately. An unavailable required check is unverified, not a pass; native Equation completion remains blocked until all required checks exist.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `verify_artifact(file)` — file integrity and type-specific verification.
- `read_file(path)` — text-bearing artifacts only.
- `render_document(file)`, `render_presentation(file)`, and `render_image(file)` — visual verification when available.
- `recalculate_spreadsheet(file)` and `audit_spreadsheet(file)` — workbook checks when available.

## Completion and fallback

Report success only after reopening the current artifact. If a file cannot be reopened, a check is unavailable, or the artifact is corrupt, do not claim success. State the exact failed or unverified check and return the artifact to its owner. A later conversion, write, insertion, or export requires verification again.

## Common mistakes

- Treating an exit code, generated filename, or successful save as proof of a valid artifact.
- Verifying the source but not its export, or the export but not its source.
- Claiming a render, visual review, native Equation check, or native acceptance that did not occur.
- Ignoring an intervening write that made previous evidence stale.
- Omitting exact artifact paths and residual limitations from the final delivery.
