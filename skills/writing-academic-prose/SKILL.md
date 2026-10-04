---
name: writing-academic-prose
description: Use when authoring scholarly, analytical, or thesis prose that requires rigorous claim-evidence integration, calibrated certainty, and natural academic cadence.
---

# Writing Academic Prose

## Job

Write scholarly prose that develops a defensible argument through claims, explanation, evidence, interpretation, and calibrated limits. This skill is selected by `drafting-prose`; it does not create approvals, solve missing evidence, or use an academic tone to disguise unsupported claims.

Use [workflow continuity](../../references/workflow-continuity.md), [document continuity](../../references/document-continuity.md), [criteria-writing contract](../../references/criteria-writing-contract.md), [academic writing style guide](../../references/academic-writing-style.md), and [language policy](../../references/language-policy.md). Continue an existing document from actual adjacent passages and its source-grounded profile, not from a generic style label.

## Inputs and output

**Inputs:** approved outline blocks, target claim or criterion, evidence and locators, established terminology and voice, continuity seam, citation needs, and unresolved gaps.

**Output:** a review-ready scholarly section with developed paragraphs, claim-to-evidence links, appropriate certainty, preserved terminology, and explicit evidence limits.

## Core writing method

1. **State the point.** Open the paragraph with the claim or analytical focus required by the approved block.
2. **Explain the reasoning.** Show why the point matters, how the mechanism works, or which comparison dimension applies.
3. **Integrate evidence.** Use inspected sources, data, examples, or clearly bounded user-provided material. If support is absent, follow the Missing Evidence Protocol rather than inventing a citation.
4. **Interpret within limits.** Distinguish observation from inference, correlation from causation, and a narrow sample from a general conclusion. Use calibrated language where evidence is incomplete.
5. **Link or stop.** End only when the paragraph adds a supported implication, limit, or necessary transition. Do not add ceremonial conclusions.

This applies PEEL (Point, Explanation, Evidence/Example, Link) naturally; do not print PEEL labels in delivered prose.

## Paragraph and style checks

- Use developed analytical paragraphs. Four to five sentences is a completeness benchmark, not a quota; a complete short definition or transition may remain short.
- Core analytical report and assignment sections require at least **65%** discursive prose under the style guide’s counting scope. Do not add filler to satisfy the percentage.
- An analytical section with one lead sentence followed by a list is incomplete unless the list is the actual requested form. Bullets and numbered lists remain valid for parallel items, parameters, or sequence. Do not use a rendered-line quota or line-count quota.
- Use precise subjects, actions, conditions, and results. Avoid promotional claims, empty transitions, and generic praise.
- Vary sentence shape by function (S1) rather than meeting a sentence-length rule. Avoid casual clause chaining; preserve necessary quotations and technical terms.
- Apply F1 and R4 to remove cliches and inflated claims while preserving supported technical meaning.

## Evidence, citations, and continuity

Do not invent project names, roles, budgets, SLAs, metrics, results, citations, or a later assignment such as a functional prototype. If a required detail is unsettled, ask before using it or leave a precise gap. A hypothetical example must be explicitly authorized and labeled; it can never become project evidence or operational proof.

If citations are present, requested, or required, load `citing-sources` before handoff. Include the section’s `## References` list in chat delivery and update any saved cumulative list. Preserve the document’s terminology, narrative person, tense by function, evidence status, and transition across the actual seam. A quotation or cited source term is not automatically authorial drift.

## Example

**Unsupported:** “The intervention proved that adoption increased.”

**Bounded:** “The supplied survey responses indicate higher reported adoption within the respondents. The available material does not establish whether the change generalizes beyond that sample.”

The example models calibrated interpretation; it does not establish a real finding.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` — brief, outline, source evidence, continuity excerpts, and style guide.
- `write_file(path, content)` and `edit_document(file, change)` — authorized scholarly composition.
- `read_reference_documentation(query)` — optional standards or manuals named in the brief.
- `invoke_skill(name)` — `citing-sources` when citations are applicable.

## Completion and fallback

Return prose that stays within the approved outline and evidence limits, then send it to `drafting-prose` for review. If a source cannot be opened, write only what remaining evidence supports and mark the gap. Do not invent a citation, locator, result, or claim to make a paragraph sound complete.

## Common mistakes

- Padding a short paragraph to meet a sentence count without adding reasoning.
- Replacing analysis with a bullet outline.
- Treating a narrow observation as a universal causal finding.
- Ending every subsection with an unsupported statement of importance.
- Writing polished prose that conceals a missing evidence or approval prerequisite.
