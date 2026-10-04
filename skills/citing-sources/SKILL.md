---
name: citing-sources
description: Use when citations, bibliographic references, or claim-to-source mapping are requested or required, or a draft already contains formal citations.
---

# Citing Sources

## Job

Attach verified evidence to claims, format citations consistently, and audit the relationship between in-text citations and references. Citation work does not create evidence, repair an unsupported claim by adding a plausible-looking source, or start unrequested external research.

Use the [workflow continuity contract](../../references/workflow-continuity.md) to preserve the current source and draft revision. Preserve the existing citation convention in a continuing document unless a change is requested.

## Use when

Load this skill when the user explicitly requests citations or references, the brief/template/rubric requires them, or a draft already contains formal citations. Do not add formal citations to routine unreferenced writing without a requirement or request.

## Resolve the citation style

1. Use the style named by the user or adopted rubric/template.
2. Otherwise preserve the existing coherent document convention.
3. If citations are required and no convention exists, **Harvard Style is the package default**. Use [citation style rules](../../references/citation-styles.md) for exact forms.
4. Clarify a material conflict rather than silently mixing styles or reformatting unrelated sections.

Harvard is a fallback; it does not itself require citations.

## Inputs and output

**Inputs:** current draft scope, claim-to-evidence mapping, inspected source metadata, target style, figure/table attributions, and whether the delivery is chat, file, or both.

**Output:** correctly formatted in-text citations, a complete `## References` section or style-equivalent list, and a bidirectional audit report for the delivered scope.

## Method

1. **Inventory claims and citations.** Identify factual, quoted, statistical, visual, and table claims that require support. Preserve source locators and the intended scope of each citation.
2. **Verify claim support.** Confirm that the inspected source supports the specific claim and conditions. Distinguish proposed, verified, and actually cited sources.
3. **Verify metadata.** Check author or organization, year, title, publication or publisher, edition or volume where required, URL/DOI, locator, and relevant license or reuse conditions. Never guess page numbers, publishers, or other missing metadata.
4. **Place citations.** Attach each citation to the claim it supports. Include a page or equivalent locator for a direct quote or a specific data point when the source provides one.
5. **Build references now.** For a cited chat section, include `## References` in that same delivery. For a saved continuing report, update its cumulative terminal list; do not postpone references until a later chapter. Do not start the next section before delivering the references.
6. **Audit both directions.** Check narrative, parenthetical, corporate-author, grouped, year-suffix, numeric, note, figure, and table citations. Every cited item must have one matching reference entry, and every listed entry must be used in the delivery scope. Pattern matching helps inventory but cannot prove semantic support.
7. **Hand off to review.** Flag the citation set for `reviewer-citation` through `reviewing-work` and recheck any affected citations after corrections.

### Compact Harvard example

```text
Claim: The study reports the outcome only for its sampled period (Smith, 2024, p. 18).

## References
Smith, J. (2024) *Study title*. Publisher. Available at: https://example.org/study (Accessed: 1 January 2026).
```

The example shows formatting only; it is not evidence for an actual claim.

## Visual and attribution boundary

Apply [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md). A proposed source is not verified merely because it appears in an outline. Figure or table attribution must identify the actual source and respect license or reuse conditions. A citation does not establish permission to reproduce an asset.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` — inspect draft text and evidence sources.
- `edit_document(file, change)` — insert citations or update a reference list when authorized.
- `write_file(path, content)` — create a requested standalone bibliography or citation map.

## Completion and fallback

Citation work is complete when every delivered citation has a verified matching entry, every delivery-scope reference is used, and each cited claim remains within the source’s support. If a source or its metadata cannot be verified, request it, mark the relevant claim incomplete, or remove the unsupported citation. If in-document editing is unavailable, provide a structured insertion list and do not claim the file changed.

## Common mistakes

- Inventing a DOI, page number, publisher, or access date to make an entry look complete.
- Citing a source for a claim it does not establish.
- Leaving a cited chat section without `## References`.
- Adding uncited background sources to a final list.
- Treating a citation style as a substitute for evidence, provenance, or reuse permission.
