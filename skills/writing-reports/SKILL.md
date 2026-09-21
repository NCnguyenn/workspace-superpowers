---
name: writing-reports
description: Use when structuring, authoring, or evaluating technical, business, or operational reports, ensuring clear separation of problem, methodology, observed results, and evaluation.
---

# Writing Reports

Specialist for technical, business, and operational reports. Map criteria onto headings that fit the assignment. Do not impose a fixed chapter template.

For folder-based reports, consume the inspected `structure_map` and provenance
under [project grounding](../../references/project-grounding.md). Use directory-based
headings when requested and compatible with the applicable outline; otherwise
map project content to its adopted headings. Never infer behavior for uninspected
paths or create measurements through unauthorized tests/builds.

Honor the current operation and handoff under the
[workflow continuity contract](../../references/workflow-continuity.md).
For the next criterion or section, follow the
[document continuity contract](../../references/document-continuity.md): use the
source profile and adjacent passages, retain the same project context and
terminology, and extend the existing argument without restarting the introduction.
Distinguish stylistic consistency from repeating unsupported source claims.

Follow the [criteria-writing contract](../../references/criteria-writing-contract.md) for scope, evidence, and visuals. Follow the [language policy](../../references/language-policy.md) for output language. Follow the [academic writing style guide](../../references/academic-writing-style.md) for prose.

## When to use

Authoring or evaluating a report whose reader must distinguish the problem, the method, what was actually observed, and the evaluation of those observations.

## When not to use

Thesis argument that is primarily claim–warrant–evidence without report structure (`writing-academic-prose`). Typo or layout-only edits. Spreadsheet, slide, or conversion tasks.

## Report layers

Keep these layers distinct in headings and in sentences. Mixing them is a defect.

| Layer | Contains | Must not contain |
|---|---|---|
| Problem / objective | Assigned question, criterion, and authorized scope | Results or success claims |
| Plan | Intended steps, still prospective | Observed measurements written as if already taken |
| Method | Tools, parameters, datasets, and conditions used | Evaluation of whether the method was “robust” without a test |
| Observed results | Values, logs, tables, and figures actually inspected | Causes, rankings, or future performance |
| Evaluation and limits | Interpretation bounded by the observations | New numbers, extra trials, or production claims not in the evidence |

A planned benchmark is not an observed result. A README is not a passing test. An outline's figure list is not proof the figure was produced.

## Criteria mapping and visuals

For each heading, state the criterion obligation, the evidence used, and the visual decision. Every table or figure needs a name or type, purpose, position, source, preparer, and status. **Not needed** is valid. Charts that assert results require data. Label hypothetical illustrations at the point of use; never reuse them as measured project results. A conclusion must not reuse illustration numbers as operational proof.

If evidence required by a criterion is missing, apply the contract Missing Evidence Protocol and keep `delivery_status` as `draft_incomplete` while that gap remains.

## Procedure

1. Read the authorized outline, criteria mapping, and evidence register for the section.
2. Choose headings that cover the criteria. Do not add chapters the brief does not require.
3. Write each layer with named subjects, actions, conditions, and results where known.
4. Place tables and figures only where the outline or criterion needs them, with source labels.
5. Return the section to `drafting-prose` for handoff to `reviewing-work`.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — brief, outline, logs, tables, and source notes.
- `write_file(path, content)` / `edit_document(file, change)` — compose report text.
- `inspect_document(file)` / `inspect_spreadsheet(file)` — inspect evidence artifacts when present.

## Dependencies

- Selected by `drafting-prose` after contract prerequisites are met.
- May be combined with `writing-academic-prose` on a project or thesis report, by section, not by default on every paragraph.
- Precedes `reviewing-work`.

## Fallback

If typed inspect capabilities are unavailable, read text-bearing evidence with `read_file(path)` and record what could not be opened. Do not invent the missing contents.

## Common mistakes

- Writing a planned method as if it had already been run.
- Putting evaluation language inside the results layer.
- Adding decorative tables or a standard thesis skeleton the criterion does not ask for.
- Filling empty cells with assumed percentages.
- Treating user-provided notes as independently verified measurements.
