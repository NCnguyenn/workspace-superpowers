---
name: formatting-layout
description: Use when applying or adjusting document formatting, layout, typography, styles, margins, headers, footers, table of contents, or visual presentation of text and document artifacts without altering substantive content.
---

# Formatting Layout

Presentation, styling, typographic hierarchy, and page layout for text and document artifacts.

For Word formulas apply the layout/preservation sections of the
[native Equation contract](../../references/math-in-documents.md): retain native
OMML, meaning, inline/display placement, numbering and references. Adjust spacing
and line breaks without flattening or rewriting mathematics. Pass the final
revision to Equation-aware verification; correct appearance alone is insufficient.

Honor the current operation under the [workflow continuity contract](../../references/workflow-continuity.md).
For inserted sections, carry forward the document's established heading, caption,
numbering, and style conventions. Return newly requested content changes to the
editing skill; formatting alone does not authorize rewriting.

## When to use

Applying or adjusting typography, font hierarchy, line spacing, margins, section breaks, headers, footers, page numbering, table of contents (TOC), figure/table captions, and table styling in text and document artifacts (DOCX, ODT, RTF, Markdown).

## When not to use

* Substantive content modification, inserting arguments, rewriting claims, or changing numbers (belongs to `editing-documents` or `drafting-prose`).
* File format conversion or export across formats (belongs to `converting-artifacts`).
* Non-document artifacts: Spreadsheets, presentations, images, and binary PDFs belong to their respective specialist skills (`working-with-spreadsheets`, `working-with-presentations`, `working-with-visuals`, `working-with-pdf`).

## Content integrity invariant

**Never alter substantive content, arguments, numbers, or conclusions.**

Formatting edits are strictly presentational. Never delete text, insert new claims, or rewrite phrasing during a formatting task without explicit instruction. If text length causes overflow or awkward page breaks, adjust typographic properties (margins, spacing, page breaks) or flag the constraint rather than silently rewording the prose.

## Typographic and layout standards

* **Heading hierarchy:** Enforce strict monotonic nesting (Heading 1 → Heading 2 → Heading 3). Never skip heading levels for visual size.
* **Body typography:** Consistent font family and proportional line spacing (e.g. 1.15–1.5x); use paragraph spacing after rather than repeated empty returns.
* **Page setup:** Standard margins (e.g. 1 inch / 25.4mm); use clean section breaks when changing page orientation, header/footer sequences, or column counts.
* **Headers and footers:** Running header with title or section name; footer with unambiguous page numbering (e.g. "Page X of Y" or standard numerals); different first page for title pages.
* **Tables and captions:** Consistent table styling, aligned cell content, header rows repeated across page breaks, and standard numbering and placement for table and figure captions.
* **Table of contents:** Generate or refresh dynamic TOC fields following structural edits so entries and page numbers match the final pagination.

## Procedure

1. `reading-artifacts` then `analyzing-artifacts` first to inspect current styles, heading structure, geometry, and the preserve-list.
2. Establish target formatting specifications from the brief or target style guide.
3. Apply styling and layout changes via `edit_document(file, change)` or safe file operations without modifying substantive prose.
4. Generate, refresh, or align structural elements: TOC, headers, footers, page numbers, and captions.
5. Invoke `reviewing-work` (formatting and layout review) for substantial deliverables before verification.
6. Conclude with `verifying-artifacts` to reopen the artifact and confirm visual layout, style consistency, and page structure via `render_document(file)` where available.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

* `inspect_document(file)` — inspect styles, heading hierarchy, margins, and page setup.
* `edit_document(file, change)` — apply formatting and styling modifications to document artifacts.
* `render_document(file)` — render pages for visual layout QA when available.
* `verify_artifact(file)` — confirm structural and layout integrity.
* `read_file(path)` / `write_file(path, content)` — basic file operations when typed document editing is unavailable.

## Dependencies

* `reading-artifacts`, `analyzing-artifacts` — required before formatting.
* `reviewing-work` — required for substantial deliverables before `verifying-artifacts`.
* `verifying-artifacts` — mandatory after formatting and before completion is claimed.

## Fallback

If typed document styling capability is unavailable, produce a structured formatting specification or apply safe text-level styling (e.g. Markdown frontmatter or CSS). Never claim styling was applied if the file was not modified and verified.

## Common mistakes

* Altering or deleting substantive prose while adjusting styling.
* Skipping heading levels for visual convenience.
* Inserting blank paragraphs instead of adjusting paragraph spacing.
* Leaving Table of Contents un-updated after pagination shifts.
* Claiming layout correctness without reopening and inspecting the file via `verifying-artifacts`.
