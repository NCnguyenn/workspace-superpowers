---
name: converting-artifacts
description: Use when converting, exporting, or transforming an artifact from one file format to another, ensuring format fidelity and post-conversion verification.
---

# Converting Artifacts

## Job

Transform a selected source artifact into a requested target format while preserving the requested revision, structure, content, and presentation as far as the available conversion path supports. Conversion does not authorize rewriting, translating, replacing assets, or changing an unrequested source.

Use [workflow continuity](../../references/workflow-continuity.md) to identify the latest requested source and output. For sustained work, retain working/approved status and source-export relationships under [persistent work tracking](../../references/work-tracking.md).

## Source priority

Use the highest-fidelity editable source available. This **source priority** avoids patching a lossy export when the original DOCX, Markdown, presentation, workbook, or source markup can be changed and regenerated. If an existing export already matches the requested source revision and settings, verify it rather than duplicating it.

A conversion produces a new artifact. Earlier checks are stale after conversion, and source verification does not verify the output.

## Inputs and output

**Inputs:** selected source path and revision, requested target format, conversion settings, template/rubric requirements, known fidelity risks, and expected output location.

**Output:** the generated target path, source-to-output mapping, independent verification results for source and target, and any remaining fidelity limitations.

## Method

1. **Inspect the source.** Use `reading-artifacts` or a type-specific representation to identify headings, tables, images, fonts, links, formulas, notes, and layout-sensitive elements.
2. **Resolve the source revision.** Distinguish working from approved artifacts. An export request does not grant content approval.
3. **Choose a fidelity-aware path.** Select conversion or export settings that preserve text, metadata, fonts, page geometry, vectors, hyperlinks, tables, and other required elements.
4. **Generate the target.** Create the output without silently changing source content or substituting a figure, table cell, or font.
5. **Verify independently.** Send the new artifact to `verifying-artifacts`. Reopen the target, inspect type-specific structure, and render where available. Check page count, clipping, table structure, text, fonts, links, and asset fidelity.
6. **Package only after verification.** Report paths for the source and converted outputs, their revisions, passed checks, and limitations.

## Tables, figures, and Word mathematics

Use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md). Preserve native Word tables (`w:tbl`), image relationships and media, inline drawings (`wp:inline`), captions, sources, order, placement, template formatting, and rubric requirements. Structural XML alone does not establish rendered fidelity.

For mathematics entering Word, apply the [native Equation contract](../../references/math-in-documents.md). Detect a math-capable path first, compare source mathematical content with target OMML, and verify native editing after save/reopen. An image or raw markup cannot satisfy the native Equation requirement. If the user explicitly accepts a limited handoff, deliver that alternative with its missing editability or checks stated; keep native fidelity failed or unverified rather than calling it a native Equation PASS.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `convert_artifact(src, format)` — transform an artifact into another format.
- `export_artifact(file, format)` — generate a distribution output.
- `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)`, and `inspect_image(file)` — source and target inspection.
- `verify_artifact(file)` — output integrity and conversion checks.
- `render_document(file)`, `render_presentation(file)`, and `render_image(file)` — visual checks where available.
- `read_file(path)` and `write_file(path, content)` — safe text-level fallback.

## Completion and fallback

Conversion is complete only when the selected output exists, opens, and is independently verified. If the target capability is unavailable, state that limitation and offer a safe supported alternative. If a command reports success but creates a zero-byte, invalid, truncated, or corrupt output, do not claim conversion success.

## Common mistakes

- Converting a rasterized or lossy intermediate instead of the highest-fidelity source.
- Treating exit code 0 as proof that a converted output is correct.
- Verifying the source but not the output.
- Silently accepting clipped tables, font substitution, lost hyperlinks, or altered placement.
- Reporting an output as approved when only its source revision was approved.
