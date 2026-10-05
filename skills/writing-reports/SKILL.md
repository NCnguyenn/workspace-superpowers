---
name: writing-reports
description: Use when structuring, authoring, or evaluating technical, business, or operational reports that must distinguish the problem, method, observed results, and evaluation.
---

# Writing Reports

## Job

Write or evaluate report sections in which the reader must be able to distinguish what problem exists, what was planned, what method was used, what was observed, and what can be concluded. This skill is selected by `drafting-prose`; it does not approve scope or outline decisions.

Use [workflow continuity](../../references/workflow-continuity.md), [document continuity](../../references/document-continuity.md), [criteria-writing contract](../../references/criteria-writing-contract.md), [academic writing style guide](../../references/academic-writing-style.md), and [language policy](../../references/language-policy.md). Preserve the established report context, terminology, source limits, and accepted numbering.

## Report layers

Keep these layers distinct in headings and sentences.

| Layer | Includes | Must not become |
|---|---|---|
| Problem / objective | assigned question, target outcome, and authorized scope | an unearned success claim |
| Plan | intended future steps and decisions | observed results |
| Method | tools, data, conditions, parameters, and procedure actually used | a claim that the method was effective without evidence |
| Observed results | inspected measurements, logs, tables, figures, or user-provided results with status | causal explanation or projection beyond evidence |
| Evaluation and limits | supported interpretation, trade-offs, uncertainty, and next constraints | new results, trials, or metrics |

A planned benchmark is not an observed result. A README is not a passing test. A proposed figure is not proof that it exists or supports a claim.

## Inputs and output

**Inputs:** approved outline blocks, or the authorized brief and structure when the outline is explicitly waived or not required; criterion obligations, evidence register, source locators, project or continuity profile, required visuals, and unresolved gaps.

**Output:** a report section that expands the authorized blocks with clear report-layer boundaries, evidence-aware prose, source labels, and honest limits for `drafting-prose` to review.

## Procedure

1. **Map the section’s report job.** Identify which layer or layers each authorized block serves. Preserve the approved outline where it applies; do not impose a generic chapter sequence when the criterion requires a narrower structure.
2. **Name the evidence state.** State whether a claim is observed, planned, user-provided, source-inspected, illustrative, or missing. Preserve conditions, units, dates, and source locators.
3. **Develop paragraphs by default.** Use connected prose for explanation and evaluation. An analytical subsection with one lead sentence followed by a list is not finished reasoning; develop it without padding to a rendered-line quota or line-count quota. Lists remain appropriate for parallel items, parameters, or sequence.
4. **Integrate visual evidence deliberately.** Place only authorized tables and figures where they advance the argument. Explain what they show, their source, scope, and limitation; do not use decorative assets or add blocks outside an applicable approved outline.
5. **Evaluate without overclaiming.** Link a result to its method and conditions, distinguish correlation from causation, and make uncertainty visible. A conclusion must not reuse hypothetical illustration numbers as operational proof.
6. **Return a review-ready section.** Hand the candidate to `drafting-prose` for `reviewing-work` before delivering it to the user.

## Project and evidence boundaries

For folder-based reports, use the inspected `structure_map` under [project grounding](../../references/project-grounding.md). Map paths to the authorized headings; do not turn an accessible folder into a report chapter or run unapproved tests, builds, or migrations. A source description, code file, README, or user statement does not by itself establish runtime behavior or measured performance.

Use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md) for visuals and the [native Equation contract](../../references/math-in-documents.md) when mathematical content enters Word. A required screenshot, metric, or test result that is unavailable remains a gap rather than an invented illustration.

## Example

**Weak:** “The revised process improved performance significantly.”

**Evidence-aware:** “The supplied benchmark log records a lower median response time for the tested dataset under the stated conditions. The log does not establish behavior outside that dataset or in production.”

The example demonstrates evidence status; it does not provide a real measurement.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` — brief, outline, logs, tables, and source notes.
- `write_file(path, content)` and `edit_document(file, change)` — authorized report composition.
- `inspect_document(file)` and `inspect_spreadsheet(file)` — evidence inspection where available.

## Completion and fallback

Return a candidate section within the applicable authorized structure and evidence limits. When a required source cannot be opened, preserve the gap and write only what the remaining evidence supports. If the caller authorized incomplete drafting under the criteria contract, retain neutral placeholders and `draft_incomplete`; do not upgrade the candidate to complete. Do not invent a project name, role, budget, SLA, metric, result, functional prototype, citation, or scope detail; ask before using it.

## Common mistakes

- Writing a planned method as if it had already run.
- Mixing evaluation language into the observed-results layer.
- Replacing report reasoning with bullet stacks or a table-only section.
- Treating illustrative figures or user-provided notes as independently verified results.
- Adding a standard report skeleton, project fact, or operational proof outside the authorized structure and evidence.
