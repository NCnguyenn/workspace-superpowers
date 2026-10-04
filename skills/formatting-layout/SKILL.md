---
name: formatting-layout
description: Use when applying or adjusting document formatting, layout, typography, styles, margins, headers, footers, table of contents, or visual presentation of text and document artifacts without altering substantive content.
---

# Formatting Layout

## Job

Change presentation without changing meaning. This skill owns typography, style hierarchy, page geometry, tables, captions, headers, footers, page numbering, and table of contents behavior for document artifacts.

**Never alter substantive content, arguments, numbers, or conclusions.** If a layout problem would require a content rewrite, return that decision to `editing-documents`.

Use [workflow continuity](../../references/workflow-continuity.md) to retain established conventions. For a continuation, preserve the document’s heading, numbering, caption, and visual rules. Formatting alone does not authorize a new argument or a file conversion.

## Inputs and output

**Inputs:** inspected source document, template or rubric, target style requirements, preserve-list, and layout problems to correct.

**Output:** a changed document or a precise formatting specification, plus verification evidence that layout and content integrity were checked.

## Method

1. **Inspect before formatting.** Use `reading-artifacts` and `analyzing-artifacts` to identify existing styles, hierarchy, geometry, template rules, and substantive content to preserve.
2. **Resolve authoritative requirements.** Explicit user instructions and applicable templates or rubrics take precedence. Defaults are examples, not a reason to impose a house font, margin, border, or caption style.
3. **Apply presentation changes.** Adjust styles, spacing, margins, section breaks, headers, footers, page numbers, table format, captions, and dynamic fields without changing text meaning.
4. **Maintain structure.** Keep heading nesting monotonic, use paragraph spacing instead of empty returns, refresh the table of contents after structural changes, and preserve repeated table headers where needed.
5. **Review and verify.** Use `reviewing-work` for substantial layout work, then `verifying-artifacts` to reopen the latest file and inspect structural and rendered results where rendering is available.

## Practical checks

- Heading levels represent document hierarchy, not visual size.
- Body text uses consistent typography and paragraph spacing appropriate to the template.
- Section breaks isolate changes in orientation, columns, or header/footer sequences.
- Captions, table styles, and numbering remain consistent with the source or template.
- A dynamic TOC reflects final headings and pagination after layout changes.
- Text does not overflow, overlap, or disappear in a rendered view when rendering is available.

## Word mathematics and visual fidelity

For Word equations, apply the [native Equation contract](../../references/math-in-documents.md). Preserve OMML, inline/display placement, numbering, references, and mathematical meaning. A spacing fix cannot flatten or rewrite a formula.

For tables and figures, apply [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md). Keep template and rubric requirements authoritative. Missing render capability is an unavailable or unverified check, not a pass.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `inspect_document(file)` — styles, hierarchy, geometry, and page setup.
- `edit_document(file, change)` — document styling and layout changes.
- `render_document(file)` — visual layout inspection when available.
- `verify_artifact(file)` — post-edit integrity checks.
- `read_file(path)` and `write_file(path, content)` — text-level fallback.

## Completion and fallback

Formatting is complete only after the changed artifact is reopened and checked through `verifying-artifacts`. If typed styling is unavailable, provide a structured formatting specification or safe text-level style changes. Do not claim styling was applied unless the artifact was modified and verified.

## Common mistakes

- Altering substantive prose while trying to fix pages or spacing.
- Applying default fonts or margins over an existing template without authorization.
- Skipping heading levels for visual convenience.
- Adding blank paragraphs instead of controlling paragraph spacing.
- Claiming layout correctness without a reopened and, when possible, rendered file.
