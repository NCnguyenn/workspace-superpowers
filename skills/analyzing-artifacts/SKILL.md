---
name: analyzing-artifacts
description: Use when already-read artifacts need interpretation, comparison, synthesis, criteria mapping, or context for a requested continuation or revision.
---

# Analyzing Artifacts

Interpret completed reads for the requested analysis, continuation, or revision.
Does not edit. Apply the [workflow continuity contract](../../references/workflow-continuity.md)
when new inputs or changed requests require updating earlier findings.

For [persistent work tracking](../../references/work-tracking.md), compare the
read plan with relevant artifact revisions, map source obligations to stable
work-item IDs and identify affected gaps/decisions. Match project context only
to items needing its evidence. Return proposed checkpoint changes to the editor;
do not infer acceptance from newer files or write an analysis-specific tracker.

For a project folder, apply [project grounding](../../references/project-grounding.md):
classify the inspected inventory, retain source revisions/conflicts and produce
`structure_map` for planning. Descriptions and observations are different evidence
classes; do not silently reconcile contradictions. Return context updates to the
router/editor; analysis does not create another evidence file. Mathematical
interpretation may invoke `working-with-mathematics` for a bounded question.

## When to use

`reading-artifacts` has already opened the file and a type-appropriate representation exists.

## When not to use

The file has not been read. Do not analyze from guessed or raw-byte-only input.

## Procedure

1. Identify the requested question or operation, source roles, inspected coverage,
   structure, content, and layout. Analysis-only work does not require an edit list.
2. Extract relevant findings with source locators. Map evidence to claims or criteria;
   distinguish user assertions, observed data, inference, plans, and missing support.
3. Compare sources by topic/claim; retain disagreement, units, conditions, and version
   differences. Synthesize supported findings rather than concatenate summaries.
4. For continuation or substantive revision, build the profile and adjacent context
   in the [document continuity contract](../../references/document-continuity.md).
   Identify the argument already established and the target section's contribution.
5. Record a preserve-list and requested change-list when changes are authorized.
   Pass findings, evidence locators, coverage limits, continuity profile, and gaps
   to the selected planner/writer/editor. Return analysis-only findings and stop
   when analysis is the requested outcome.

Per-type inspection fields: `references/artifact-inspection.md`.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)`, `inspect_image(file)`, `inspect_layered_image(file)` to re-query structure on demand.
- `read_file(path)` for text, Markdown, and CSV-style artifacts.

## Dependencies

- `reading-artifacts` — required; never analyze an unread file.
- `editing-documents` and `verifying-artifacts` — downstream consumers of the preserve-list.

## Fallback

If layout or a typed representation is unavailable, analyze from the accessible representation and declare what could not be observed. Never invent structure.

## Common mistakes

- Analyzing from guessed or raw-byte-only input.
- Producing a change-list with no preserve-list.
- Inventing structure the artifact does not expose.
- Treating the preserve-list as the trigger for an edit skill — it only names what must not change.
