---
name: researching-sources
description: Use when the user explicitly requests external research, literature searching, or finding reference materials — not for standard drafting or editing from supplied facts.
---

# Researching Sources

Discover, evaluate, and extract verified evidence and bibliographic records from external literature.

## When to use

Only when the user explicitly requests finding reference materials, external research, literature reviews, or academic source discovery.

## When not to use

* Standard drafting, rewriting, summarizing, or editing from facts already provided in the prompt or existing project files.
* When the user did not request external research or citations. Do not spontaneously initiate literature searches.
* When all required factual content is already established.

## Absolute honesty rule (§15)

* **Zero fabrication:** Never invent authors, journal titles, publication years, DOIs, URLs, or page numbers.
* **Unverified sources:** If a source cannot be retrieved or verified through accessible search capabilities, state clearly that it is unverified, or omit the claim. Never guess bibliographic metadata.

## Procedure

1. **Clarify evidence needs:** Identify specific research questions, claims requiring empirical backing, and boundary conditions.
2. **Execute targeted search:** Search scholarly or reliable publications using available search capabilities (`search_academic`, `search_web`).
3. **Evaluate sources:** Assess authority (peer-reviewed journal, institutional report), recency, methodological rigor, and relevance.
4. **Extract evidence:** Capture verbatim quotes, data points, or findings along with exact page/section locators.
5. **Record complete metadata:** Catalog Author(s), Year, Title, Journal/Publisher, Volume(Issue), Page range, and DOI or permanent URL.
6. **Synthesize evidence cards:** Organize findings by thematic argument and prepare for the authoring specialist or `citing-sources`.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

- `search_academic(query)` — to query scholarly databases and repositories.
- `search_web(query)` — to discover published reports, organizational whitepapers, and authoritative web sources.
- `read_reference_documentation()` — to access official documentation or manual guidelines.
- `read_file(path)` — to inspect local literature or downloaded papers.
- `write_file(path, content)` — to save structured evidence cards.

## Dependencies

- Requires an explicit user request for external research or literature search.
- Precedes `citing-sources` and authoring specialists (`drafting-prose`, `editing-documents`).

## Fallback

If `search_academic` is unavailable, fall back to `search_web` for reputable institutional domains (.edu, .gov, .org, official publishers). If no search capability exists, stop and clearly report the limitation. Never fabricate literature.

## Common mistakes

* Triggering external research spontaneously when the user only asked to draft or edit text from supplied facts.
* Fabricating DOIs or citations to make text appear authoritative.
* Citing blog posts or unverified summaries when academic sources are required.
* Extracting conclusions without recording exact locators (page or section).
