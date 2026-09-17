---
name: converting-artifacts
description: Use when converting, exporting, or transforming an artifact from one file format to another, ensuring format fidelity and post-conversion verification.
---

# Converting Artifacts

Transform, export, and convert artifacts across file formats while preserving structural fidelity and verifying the output.

## When to use

Transforming an existing artifact into a different format (e.g. Markdown or DOCX to PDF, PPTX to PDF, XLSX to CSV or PDF, HTML to PDF), compiling source markup into document formats, or generating distributable publication files from editable sources.

## When not to use

* In-place editing of text, formulas, or slides in an existing artifact (belongs to `editing-documents`, `working-with-spreadsheets`, `working-with-presentations`).
* Formatting layout within the same document format without changing file type (belongs to `formatting-layout`).
* Direct binary patching of compiled PDFs when source files are unavailable (belongs to `working-with-pdf`).

## Source priority and verification rules (§10, §14)

* **Source priority rule:** Prefer editing the source over patching derived formats. Always convert from the highest-fidelity editable source artifact (e.g. DOCX, LaTeX, Markdown) rather than lossy intermediates.
* **Post-conversion verification and stale check rule:** A check on an earlier generation is stale after another write or conversion. Converting an artifact produces a new artifact requiring independent inspection and verification. Command success is not artifact success.
* **Separate verification:** An export is verified separately from its source: check both.
* **Format fidelity:** Converted outputs must preserve heading structure, table alignments, embedded fonts, vector fidelity for graphics, and interactive hyperlinks without clipping or unintended rasterization.

## Procedure

1. Inspect source artifact: Use `reading-artifacts` or typed inspection (`inspect_document(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)`, `inspect_pdf(file)`, `inspect_image(file)`) to confirm source integrity and identify layout-sensitive elements.
2. Select conversion pathway: Choose `convert_artifact(src, format)` or `export_artifact(file, format)` with parameters that preserve metadata, pagination, and font embeddings.
3. Execute transformation: Generate the target artifact.
4. Mandatory post-conversion verification: Reopen the newly generated artifact using `verifying-artifacts` and the target inspection capability (`inspect_pdf(file)`, `inspect_document(file)`, `inspect_image(file)`). Check page count, font embedding, table structure, and layout via `verify_artifact(file)` and visual rendering (`render_document(file)`, `render_presentation(file)`, or `render_image(file)`) where available.
5. Hand off to packaging: Deliver verified artifacts to `packaging-deliverables`, explicitly reporting paths for both source and converted files.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

* `convert_artifact(src, format)` — transform an artifact into another format.
* `export_artifact(file, format)` — export an artifact to a presentation or distribution format.
* `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)`, `inspect_image(file)` — inspect source and target artifacts.
* `verify_artifact(file)` — check file headers, structural integrity, and conversion fidelity.
* `render_document(file)`, `render_presentation(file)`, `render_image(file)` — visual QA of converted output where available.
* `read_file(path)` / `write_file(path, content)` — basic file operations.

## Dependencies

* `reading-artifacts` — required to inspect the source file before conversion.
* `verifying-artifacts` — mandatory after conversion; conversion produces a new file whose verification cannot rely on prior source checks.

## Fallback

If the target conversion capability is unavailable, explicitly report the limitation (§17) and offer safe intermediate alternatives (e.g. exporting to Markdown, HTML, or CSV). If a conversion tool returns exit code 0 but produces an invalid, zero-byte, or corrupted output, refuse to claim success: record the inspection failure during `verifying-artifacts` and report the defect honestly. Never claim a conversion succeeded if the target artifact was not generated and verified.

## Common mistakes

* Assuming exit code 0 or command execution means the converted artifact is correct without reopening it.
* Treating exit code 0 as success when the generated file is corrupt, truncated, or unreadable.
* Treating verification of the source artifact as sufficient for the converted output.
* Converting a lossy or rasterized intermediate instead of the primary source artifact.
* Silently accepting font substitution, page overflow, or clipped tables in the output.
* Failing to report paths of both source and converted artifacts in packaging.
