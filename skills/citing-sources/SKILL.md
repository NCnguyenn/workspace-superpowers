---
name: citing-sources
description: Use when the user explicitly requests citations, bibliographic references, or claim-to-source mapping — not for unreferenced drafting.
---

# Citing Sources

Format in-text citations, compile bibliographies, and verify claim-to-source mappings.

Apply the [workflow continuity contract](../../references/workflow-continuity.md).
Use the current source/evidence version and preserve established citation
conventions when continuing an existing document, unless a change is requested.

## When to use

Only when the user explicitly requests citations, bibliographic references, literature attribution, or claim-to-source mapping.

## When not to use

* Unreferenced prose, routine drafting, internal memos, or edits where citations were not requested.
* Do not spontaneously add formal citations unless the brief, template, rubric, or user explicitly asks for them.

## Default style rule

When the user or adopted template/rubric specifies a style, use it. Otherwise
retain a coherent existing document convention for a continuation or revision.
If no convention is established:
* **Harvard Style is the package default** (`(Author, Year)` in-text and an alphabetical reference list at the end of the deliverable).
* Consult the [citation style rules](../../references/citation-styles.md) for exact formatting templates.

## Invariants & Honesty (§15)

* **Zero fabrication:** Never invent author names, publication years, titles, DOIs, URLs, or page numbers.
* **Claim–source correspondence:** An in-text citation must directly ground the sentence or paragraph it accompanies. Do not cite a source for claims it did not establish.
* **Bidirectional completeness:** Every citation in the body text must match an entry in the reference list. Every entry in the reference list must be cited in the text.

## Procedure

1. **Resolve style:** Use the requested/required style, then the existing document convention; otherwise apply **Harvard Style**. Clarify material conflicts rather than silently mixing conventions.
2. **Verify evidence mapping:** Confirm that each claim has a verifiable evidence card or verified source before attaching a citation.
3. **Format in-text citations:**
   - Single author: `(Smith, 2023)`
   - Two authors: `(Smith and Jones, 2022)`
   - Three+ authors: `(Smith et al., 2021)`
   - Direct quotes or specific data points: include page number, e.g. `(Smith, 2023, p. 45)`
4. **Compile the reference list:** Arrange entries alphabetically by first author's surname following the format in `references/citation-styles.md`.
5. **Bidirectional audit:** Ensure complete parity between body citations and bibliography entries.
6. **Hand off to review:** Flag the citation set for validation by `reviewer-citation` during `reviewing-work`.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — to inspect draft prose and evidence sources.
- `edit_document(file, change)` — to insert citations and append the reference list.
- `write_file(path, content)` — to generate standalone bibliography files (`.bib`, `.md`) when required.

## Dependencies

- Follows `researching-sources` or user-provided reference materials.
- Validated by `reviewer-citation` during `reviewing-work` and checked during `verifying-artifacts`.

## Fallback

If in-document editing is unavailable, output a structured citation list and formatted reference section in the response, specifying exact insertion points. Never claim files were updated if they were not.

## Common mistakes

* Adding formal citations spontaneously when the user did not request them.
* Defaulting to APA or IEEE when Harvard Style is the established default.
* Inventing DOIs, journal volumes, or page numbers for hard-to-find sources.
* Citing a reference in the text that does not exist in the final reference list (or vice versa).
* Omitting page numbers for direct quotes.
