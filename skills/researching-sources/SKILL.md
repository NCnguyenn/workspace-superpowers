---
name: researching-sources
description: Use when the user explicitly requests external research, literature searching, or finding reference materials — not for standard drafting or editing from supplied facts.
---

# Researching Sources

## Job

Find, assess, and extract external evidence that the user explicitly requested. Research produces traceable evidence cards and verified bibliographic information for a stated question; it does not manufacture authority, begin an unrequested literature search, or turn discovery results into proof.

Use the [workflow continuity contract](../../references/workflow-continuity.md) to retain the research question, target claim, source locators, and calling task. User-supplied material is read through `reading-artifacts`; receiving it does not itself request external research.

## Use when

Load this skill only when the user explicitly requests research, a literature search, source discovery, or external reference materials. Do not load it for routine drafting, rewriting, summarizing, or editing from supplied facts. Required citations do not automatically authorize a new external search; use existing inspected sources when sufficient.

## Inputs and output

**Inputs:** focused research question, claims needing support, domain and date limits, accepted source types, existing evidence, and the target deliverable’s citation needs.

**Output:** evidence cards with source identity, assessment, exact supporting extract or data, locator, claim mapping, reuse status, and unresolved limitations. `citing-sources` receives only metadata that was checked against the source.

## Method

1. **Define the evidence need.** State the question, intended claim, required level of authority, recency needs, and boundaries. Do not search broadly when a narrow source would answer the question.
2. **Search deliberately.** Use scholarly, official, institutional, or primary sources appropriate to the claim. Treat search snippets and social posts as leads, not evidence.
3. **Open the source.** Inspect the original source before quoting or recording metadata. Verify authorship, publication context, date, method, scope, and relevant rights or reuse conditions.
4. **Extract traceable support.** Capture the exact finding, data point, or quotation with page, section, figure, table, or stable locator. Record what the source does not establish as well as what it supports.
5. **Assess fitness.** Compare authority, relevance, methodological quality, currency, and conflict with other sources. Do not use a convenient source for a claim outside its scope.
6. **Return evidence cards.** Separate proposed sources, verified sources, and sources actually cited. Hand verified evidence to `citing-sources` or the authoring skill; preserve unverified candidates as unverified.

### Evidence card example

```text
Claim: [specific sentence the source can support]
Source: [verified author, year, title, permanent URL]
Locator: [page, section, figure, or table]
Evidence: [short exact extract or accurately bounded data]
Limits: [population, date range, method, or uncertainty]
Reuse status: [known license/terms, unknown, or not applicable]
```

## Source quality and honesty

Never invent authors, titles, years, journals, DOIs, URLs, page numbers, publishers, quotes, or results. A source that cannot be retrieved or inspected remains unverified. Search ranking does not establish provenance, credibility, permission to reuse, or claim support.

For figures and tables, apply [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md). Record provenance, attribution, and reuse conditions separately from citation style. An external illustration is not user-project evidence.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `search_academic(query)` — scholarly databases and repositories when available.
- `search_web(query)` — official, institutional, and publisher sources when available.
- `read_reference_documentation()` — official documentation and standards where available.
- `read_file(path)` — local papers or downloaded source material.
- `write_file(path, content)` — authorized evidence cards or research notes.

## Completion and fallback

Research is complete when each returned claim is linked to an inspected source and locator, its limits are clear, and unverified candidates are labeled or excluded. If scholarly search is unavailable, use reputable official or institutional web sources when appropriate. If no safe search or source-reading capability exists, report the limitation instead of fabricating a bibliography.

## Common mistakes

- Researching spontaneously because prose “would look stronger” with citations.
- Treating a snippet, abstract, social post, or search result as source evidence.
- Copying unverified metadata into a reference list.
- Quoting a result without its conditions, population, or page/section locator.
- Treating citation formatting as proof that a source supports a claim.
