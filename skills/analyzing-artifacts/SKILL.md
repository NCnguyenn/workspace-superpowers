---
name: analyzing-artifacts
description: Use when already-read artifacts need interpretation, comparison, synthesis, criteria mapping, or context for a requested continuation or revision.
---

# Analyzing Artifacts

## Job

Interpret inspected material for the requested question. Analysis turns observations into traceable findings, comparisons, criteria mappings, or a continuity profile. It does not edit an artifact or infer approval from a recommendation.

Never analyze an unread file. Use [workflow continuity](../../references/workflow-continuity.md) to preserve source roles, revisions, conflicts, and the current operation. For durable work, return bounded findings to the owner identified by [persistent work tracking](../../references/work-tracking.md); do not create a parallel analysis record.

## Inputs and output

**Inputs:** extraction handoff from `reading-artifacts`, requested question or change, relevant decisions, source coverage, and any target section or claim.

**Output:** source-grounded findings with locators, evidence status, conflicts, preserve-list, change-list where editing is authorized, and the next required handoff.

## Method

1. **Set the analytical question.** Identify what must be explained, compared, diagnosed, or mapped. Keep source roles distinct: requirement, draft, evidence, template, completed work, or later guide.
2. **Map evidence to claims.** For each finding, distinguish document-stated text, user-provided information, source-inspected evidence, inference, planned work, observed result, and missing support.
3. **Compare on shared dimensions.** When sources differ, retain units, conditions, dates, versions, and disagreement. Synthesize supported conclusions; do not concatenate summaries or silently select a favorable source.
4. **Build an actionable handoff.** Return source locators, relevant excerpts, coverage limits, preserve-list, requested changes, and blockers. An analysis-only task returns findings and stops.
5. **Keep decisions separate.** A recommendation is not user approval; a preserve-list is not an edit instruction; a later source is not automatically authoritative.

A glance table is not coverage. State the inspected range and any unread pages, cells, slides, images, or source regions.

## Criteria and guide analysis

For initial intake of a brief, rubric, or graded guide with no named section, return an intake map in this order:

1. deliverables and submission rules with locators;
2. each criterion mapped to the concrete work it requires;
3. failure constraints and material contradictions left unresolved;
4. decisions the source does not settle.

An opening question about the parts, criteria, or structure of a supplied guide is not Simple Q&A and not a narrower operation. Reuse the intake map for a named section rather than rebuilding it. If sufficient evidence leaves 2–3 valid readings, load `brainstorming`; the user chooses before the next stage.

## Continuations and substantive revisions

Use the [document continuity contract](../../references/document-continuity.md). Build a source-grounded profile from the document/version, target seam, relevant adjacent excerpts, argument relationship, project/scenario identity, evidence, terminology, voice, register, heading structure, and source limits.

Lock terminology only for the same established role or concept; preserve distinct roles, quotations, citations and source terminology. Lock narrative person only when established and surface scoped authorial drift. Retain material contradictions rather than resolving them silently. The profile is context, not approval, verification, or proof of a measured result.

For project folders, apply [project grounding](../../references/project-grounding.md). Produce a `structure_map` of inspected paths, roles, locators, coverage, and limits for `planning-work`; a folder does not become a chapter by default. Mathematical interpretation may use `working-with-mathematics` for a bounded question.

## Completed-assignment read-back

A completed-work read-back remains a read-back: do not trigger drafting, style enforcement, or a new intake map merely because the artifact was read. Return three blocks:

1. **What the document is:** exact identity, names, dates, and whether it is submitted work or a guide.
2. **What each major part does:** actual headings, arguments, conclusions or limits, and whether each part is theory, scenario, proposal, trial, or implemented product.
3. **Project and scenario thread:** where it appears, how it changes, and whether the conclusion returns to it.

Label each finding `document-stated`, `visually-observed`, `source-inspected`, `runtime-observed`, or `unverified` under the [visual evidence boundary](../../references/visual-evidence-boundary.md). Do not invent learning outcomes. Do not normalize names or dates. Do not turn projected work into observed results.

### Completed work versus a later guide

Use a narrow comparison. First identify criteria already present, then criteria still missing, then mismatches, ambiguity, and evidence limits. Do not use completion percentages, treat a grading-grid cell as written content, turn optional wording such as `you can` into a requirement, or introduce invented figures or failed test cases. A criterion explicitly present, such as P7 when the source names it, remains present.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` — text, Markdown, CSV, and extracted source content.
- `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)`, `inspect_image(file)`, and `inspect_layered_image(file)` — re-query a required representation when available.

## Handoffs and fallback

Pass editing requests to `editing-documents`, outlines to `planning-work`, and file completion checks to `verifying-artifacts`. If a needed representation is unavailable, analyze the accessible representation and declare the limit. Never invent unseen structure, a project result, or an approval state.

## Common mistakes

- Analyzing guessed, raw-byte-only, or unread content.
- Losing conflicting conditions, units, or source versions during synthesis.
- Treating user-provided notes as independently verified measurements.
- Sending an edit list without a preserve-list for a substantive revision.
- Treating a completed document as permission to draft or re-open intake.
