---
name: reading-artifacts
description: Use when an existing artifact — document, PDF, deck, workbook, image, rubric, template, or other file — must be opened and its accessible content or representation read before any analysis or edit.
---

# Reading Artifacts

## Job

Open the real artifact and extract what is actually accessible. Reading records observations and source locators; it does not interpret meaning, approve content, or modify files.

Use [workflow continuity](../../references/workflow-continuity.md) to preserve source identity, coverage, and the current request. For sustained work, use [persistent work tracking](../../references/work-tracking.md) to read the adopted plan checkpoint before related artifacts. For continuation or substantive revision, apply the [document continuity contract](../../references/document-continuity.md).

## Inputs and output

**Inputs:** an artifact path or attachment, its claimed role, the requested question or change, and any known revision or target locator.

**Output:** an extraction handoff with artifact identity and revision, inspected representation and locators, relevant excerpts or structured observations, unreadable regions, and coverage limits.

## Method

1. **Open the real artifact and read the representation appropriate to its type.** Read text, pages, sheets, cells, pixels, metadata, layers, notes, or structure rather than treating raw bytes as content.
2. **Identify the source.** Record path or attachment identity, file type, revision or observed state, and its role: rubric, draft, evidence, template, completed work, or output.
3. **Inspect the requested coverage.** Read the relevant section and the adjacent context needed for the next operation. Do not claim whole-document coverage from a short excerpt.
4. **Extract with locators.** Preserve exact heading, page, paragraph, sheet, cell, slide, figure, relationship, or source-message locators. Record extracted text separately from what remains unreadable.
5. **State limits.** Mark missing OCR, unsupported structure, inaccessible pages, incomplete extraction, or unavailable rendering. A conversion to text is an aid, not proof that every representation was read.
6. **Hand off without interpretation.** Send actual excerpts, locators, revision observations, and coverage limits to `analyzing-artifacts` or the selected specialist.

## Type-specific focus

- **Documents:** headings, paragraphs, tables, images, citations, comments, tracked changes, headers, and the requested surrounding passages.
- **PDFs:** page count, text layer, reading order, tables, figures, scan status, and OCR limits. Keep PDF page indices separate from printed page numbers.
- **Spreadsheets:** sheets, ranges, data types, formulas, dependencies, calculated values, and charts.
- **Presentations:** slide count, layout, notes, assets, and visible text.
- **Images and DOCX figures:** pixels, dimensions, captions, source links, and the relationship details required below.
- **Existing prose continuation:** document/version, insertion point, immediately preceding passage, following passage if inserting, referenced definitions, evidence, terminology, and presentation conventions.

For continuation or substantive revision, record the document/version, insertion point, actual adjacent excerpts, source locators, and coverage limits. Hand actual excerpts and coverage limits to analysis; do not infer the whole document's style or facts from a short sample.

For a completed assignment/report read-back, extract the actual major headings, arguments and conclusions or limits, scenario transitions or project thread, explicit criterion labels, and inspected or unread coverage. This is an extraction handoff, not permission to interpret or rewrite the document.

## Visual and mathematical evidence

Before reporting an image or embedded figure, apply the [visual evidence boundary](../../references/visual-evidence-boundary.md). A media filename is not a relationship ID. For a DOCX figure, report its `r:embed` ID, resolved relationship target, counting scope, and whether indices are 0-based or 1-based. Label copied document text as document-stated, not as a runtime result.

For Word mathematics, use the [native Equation contract](../../references/math-in-documents.md). Extract formula content and source locators, native OMML versus image or text representation, inline/display placement, numbering, and any unavailable checks.

For project folders, follow [project grounding](../../references/project-grounding.md). Preserve read-only boundaries, observed paths, revisions, coverage, and conflicts. Reading does not create a `context_file`.

## Handoffs

- `analyzing-artifacts` receives the real artifact identity, relevant excerpts, source locators, coverage limits, and changed/unread regions.
- `planning-work`, `editing-documents`, and `reviewing-work` receive only the source slices needed for their current operation.
- `verifying-artifacts` reopens the final current artifact later; this first read does not verify a future revision.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` — text-bearing artifacts.
- `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, and `inspect_spreadsheet(file)` — typed office structure when available.
- `extract_pdf_text(file)`, `extract_pdf_tables(file)`, `extract_pdf_images(file)`, and `ocr_scanned_document(file)` — PDF and scan extraction when available.
- `inspect_image(file)` and `inspect_layered_image(file)` — visual and layered representations.
- `list_files(dir)` — bounded artifact sets and candidate plans.

## Fallback

If the file cannot be opened, stop dependent claims and state what could not be read. If a scan lacks OCR, identify unreadable pages or regions. If only a partial representation is available, return it with its limits; never guess missing content.

## Common mistakes

- Treating raw bytes, a filename, or a partial conversion as a complete read.
- Interpreting content while reading instead of returning observations to analysis.
- Forgetting source locators and coverage limits.
- Reusing an earlier read after the source changed.
- Reporting screenshots, DOCX images, or formula structure as runtime or mathematical proof.
