---
name: citing-sources
description: Use when citations, bibliographic references, or claim-to-source mapping are requested or required, or a draft already contains formal citations.
---

# Citing Sources

Format in-text citations, compile bibliographies, and verify claim-to-source mappings.

Apply the [workflow continuity contract](../../references/workflow-continuity.md).
Use the current source/evidence version and preserve established citation
conventions when continuing an existing document, unless a change is requested.

## When to use

When the user explicitly requests citations, bibliographic references, literature attribution, or claim-to-source mapping; when an adopted brief/template/rubric requires them; or when a draft already contains formal citations that need checking and completion.

## When not to use

* Unreferenced prose, routine drafting, internal memos, or edits where citations are neither present nor requested/required.
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
* **Each delivery is self-contained:** Every cited section delivered in chat must end with `## References` (or the required style's equivalent), even when only one section is drafted this turn. Any saved report must also have its reference list updated before handoff. Never defer references to the final chapter or substitute a promise to add them later.
* **Verified metadata:** Check author, year, title, edition, publisher and other style-required fields against inspected sources. Do not copy a sample bibliography as verified evidence or guess missing fields to complete an entry.

## Procedure

1. **Resolve style:** Use the requested/required style, then the existing document convention; otherwise apply **Harvard Style**. Clarify material conflicts rather than silently mixing conventions.
2. **Verify evidence mapping:** Confirm that each claim has a verifiable evidence card or verified source before attaching a citation.
3. **Format in-text citations:**
   - Single author: `(Smith, 2023)`
   - Two authors: `(Smith and Jones, 2022)`
   - Three+ authors: `(Smith et al., 2021)`
   - Direct quotes or specific data points: include page number, e.g. `(Smith, 2023, p. 45)`
4. **Compile the reference list now:** Append `## References` to the delivered section, following the resolved style. Harvard entries are alphabetical. For a continuing report, maintain one deduplicated cumulative list at the document end; place new sections before it. The chat excerpt carries the entries cited in that excerpt, while the saved report's list covers its entire body. Do not paste uncited entries from other chapters into a standalone excerpt.
5. **Bidirectional audit before ending the turn:** Inventory parenthetical and narrative author–year citations, corporate author abbreviations, grouped citations, year suffixes and any numeric citations or notes required by the chosen style. Match each to its full entry and check the reverse direction in the same delivery scope. Reconcile identity, year/edition, locators and duplicates; verify that each source supports its claim. A pattern scan may assist but is not proof of semantic correspondence. Inspect the final chat text and reopen any saved report after editing; repair absent lists and unmatched entries before delivery.
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

If source metadata or claim support cannot be verified, request the missing source
or follow the criteria contract's incomplete-draft protocol. Do not fabricate an
entry, strip attribution to conceal a gap, or present the cited draft as complete.

## Common mistakes

* Adding formal citations spontaneously when the user did not request them.
* Defaulting to APA or IEEE when Harvard Style is the established default.
* Inventing DOIs, journal volumes, or page numbers for hard-to-find sources.
* Citing a reference in the text that does not exist in the final reference list (or vice versa).
* Delivering a cited chapter without its references because the full report is unfinished.
* Omitting page numbers for direct quotes.
