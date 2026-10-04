---
name: working-with-pdf
description: Use when inspecting, extracting content, splitting, merging, annotating, or manipulating existing PDF artifacts — prefer editing source files when available.
---

# Working with PDF

## Job

Inspect, extract, or make an explicitly requested PDF change while respecting PDF structure and the authority of its editable source. A PDF is often a rendered output; its visual appearance and its internal text representation must be checked separately.

Use [workflow continuity](../../references/workflow-continuity.md) to preserve the requested pages, source revision, and return point. Extraction does not authorize page manipulation, annotation, or a rewrite.

## Source priority

**Prefer editing the source over patching the PDF.** If an editable DOCX, Markdown, HTML, LaTeX, or presentation source exists, change that source through the relevant skill and export a new PDF. Direct PDF patching is reserved for explicitly requested page operations, annotations, form filling, or cases with no usable source.

## Inputs and output

**Inputs:** source PDF, requested pages or operation, available source files, intended result, and required evidence or layout checks.

**Output:** extracted text, tables, images, or a changed PDF with page-level locators, coverage limits, and verification results.

## Method

1. **Inspect the PDF.** Determine page count, text layer, font embedding, metadata, security restrictions, reading order, and whether pages are scans.
2. **Read the right representation.** Extract text, tables, or images with page locators. Treat a scan as unreadable until OCR or visual inspection establishes its content.
3. **Preserve structure.** Keep table rows and columns, page ranges, bookmarks, form fields, and asset quality intact. A flat text dump is not a table extraction.
4. **Apply only the requested operation.** Merge, split, annotate, or fill forms only when the user asks. Never use a PDF operation to invent, summarize, or rewrite content.
5. **Verify output.** Any created or modified PDF goes to `verifying-artifacts`; check page count, ordering, text and figure presence, font behavior, clipping, and rendered pages where available.

## Common PDF operations

| Need | Approach | Required check |
|---|---|---|
| Read an existing PDF | inspect text layer, pages, and requested content | page locator and unread/OCR limits |
| Extract a table | preserve rows, columns, headers, units, and page source | compare extracted structure with the page |
| Extract a figure | retain resolution and source page | distinguish image content from runtime evidence |
| Split or merge pages | specify exact page ranges and target order | page count, order, bookmarks where relevant |
| Annotate or fill a form | preserve existing fields and document integrity | reopen form or annotations in the output |
| Correct report content | edit the editable source, then convert | verify source and new PDF separately |

## Evidence and fidelity boundaries

Apply [visual evidence boundary](../../references/visual-evidence-boundary.md) before making screenshot or figure claims. Visible pixels establish only what is visible, not data provenance or runtime behavior. For PDF figures and tables, use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md) when they are part of a document delivery chain.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `inspect_pdf(file)` — pages, text layers, fonts, metadata, and scan status.
- `extract_pdf_text(file)`, `extract_pdf_tables(file)`, and `extract_pdf_images(file)` — requested content extraction.
- `ocr_scanned_document(file)` — scan OCR when available.
- `annotate_pdf(file)`, `merge_pdfs(files)`, and `split_pdf(file)` — explicit PDF operations.
- `verify_artifact(file)` — output integrity check.
- `read_file(path)` and `write_file(path, content)` — text-level support.

## Completion and fallback

A read-only extraction is complete when it reports page locators and coverage limits. A changed PDF is complete only after reopening and verifying the final output. If OCR, rendering, or editing is unavailable, state which pages or checks remain unavailable; never guess scanned text or claim a visual check was performed.

## Common mistakes

- Patching complex PDF content when an editable source exists.
- Treating a command exit code as proof that the PDF is readable or unclipped.
- Flattening a table into unstructured text without reporting the loss.
- Claiming OCR coverage for unread scan pages.
- Treating a figure as proof of a runtime or database claim.
