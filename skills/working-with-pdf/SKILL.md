---
name: working-with-pdf
description: Use when inspecting, extracting content, splitting, merging, annotating, or manipulating existing PDF artifacts — prefer editing source files when available.
---

# Working with PDF

Inspect, extract, manipulate, and verify PDF documents while respecting structure and source authority.

## When to use

Inspecting PDF properties, extracting formatted text, extracting tabular data, extracting images, splitting, merging, annotating, or filling interactive forms in existing PDF artifacts.

## When not to use

* Generating new formatted reports or documents from scratch (author in an editable source format such as DOCX or Markdown, then convert to PDF).
* Substantive text rewriting when the original source document (DOCX, LaTeX, Markdown, HTML) is accessible.

## Source priority rule (§10, §14)

**Prefer editing the source over patching the PDF.**

Direct binary patching of a compiled PDF is fragile and risks destroying reflow, font embeddings, and layout grids. When the source file (e.g. DOCX, LaTeX, Markdown) exists or can be produced, apply edits to the source and re-export to PDF, rather than attempting binary modification of the PDF itself.

## Procedure

1. **Inspect PDF representation:** Use `inspect_pdf` to check page count, text layers, embedded fonts, metadata, security restrictions, and whether the artifact is a raster scan.
2. **Handle scans:** If pages are scanned images, invoke `ocr_scanned_document` if available; otherwise, report unreadable pages as a capability limitation.
3. **Extract content cleanly:**
   - Text: use `extract_pdf_text` to extract reading order text.
   - Tables: use `extract_pdf_tables` to capture row/column boundaries into structured Markdown or CSV.
   - Images: use `extract_pdf_images` to extract figures without quality loss.
4. **Manipulate pages or forms:**
   - Merging: use `merge_pdfs` ensuring page order and bookmarks are preserved.
   - Splitting: use `split_pdf` specifying exact page ranges.
   - Annotating / Form-filling: use `annotate_pdf` to insert highlights, comments, or form data without corrupting form field dictionaries.
5. **Verify output:** Hand off created or modified PDFs to `verifying-artifacts` to check page count, font embedding, table structure, and absence of clipping.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

- `inspect_pdf(file)` — to discover pages, text layers, fonts, and scan status.
- `extract_pdf_text(file)` — to extract textual content.
- `extract_pdf_tables(file)` — to extract structured tables.
- `extract_pdf_images(file)` — to extract embedded raster/vector images.
- `ocr_scanned_document(file)` — to perform optical character recognition on scanned pages.
- `annotate_pdf(file)` — to add annotations or fill form fields.
- `merge_pdfs(files)` — to combine multiple PDFs.
- `split_pdf(file)` — to extract designated page subsets.
- `verify_artifact(file)` — to check output integrity.
- `read_file(path)` / `write_file(path, content)` — basic file operations.

## Dependencies

- Follows `reading-artifacts` and `analyzing-artifacts` when diagnosing an existing PDF.
- Always verified by `verifying-artifacts` before completion is reported.

## Fallback

* **No OCR capability:** Clearly report that scanned pages could not be extracted; never invent or guess text from unread images.
* **No PDF render capability:** Verify page counts, text extractability, and file headers, then explicitly report that visual pixel QA was not performed.
* **No direct PDF editor:** Extract text and tables to editable formats (Markdown, CSV, DOCX) and deliver the extracted content.

## Common mistakes

* Patching complex PDF text directly instead of editing the underlying source file.
* Claiming a corrupted or unrendered PDF succeeded merely because a command exited with code 0.
* Losing column structure by treating table extractions as flat unformatted text.
* Concealing OCR limitations on scanned documents.
