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

For tracked work, map findings to the stable `work_id`, item IDs, artifact
revisions and affected dependencies, and distinguish progress from readiness,
approval and verification. Return a bounded change list to the plan owner or
editor; do not mutate records, infer a decision from a recommendation, or mark
unaffected items for review. External and uncommitted differences are evidence
only when the relevant sources were inspected.

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
   Lock terminology only for the same established role or concept; preserve
   distinct roles, quotations, citations and source terminology. Lock narrative
   person only when established and surface scoped authorial drift. Carry forward
   project/scenario identity, technology, metrics and decisions, while retaining
   material conflicts instead of choosing silently. Identify the bridge required
   at the actual continuation seam.
5. Record a preserve-list and requested change-list when changes are authorized.
   Pass findings, evidence locators, coverage limits, continuity profile, and gaps
   to the selected planner/writer/editor. Return analysis-only findings and stop
   when analysis is the requested outcome.

The continuity profile is source-grounded context, not approval, verification, or
evidence of a measured result. A completed-work read-back remains a read-back:
do not trigger drafting, style enforcement, or a new intake map merely because the
artifact was read.


For initial intake of an assignment brief, rubric, or graded guide with no named section or narrower requested operation, return an intake map in this order: deliverables and submission rules with locators; each graded criterion mapped to the work the source requires, not only its code; failure constraints; contradictions left unresolved; decisions the source does not already settle. A contents list or glance table is not coverage. Do not choose a side in a contradiction. On continuation, reuse the existing intake map and update only findings affected by new inputs. Named-section analysis, outlining and narrow comparisons stay within their requested scope; they do not restart whole-guide intake.

An opening question about the parts, criteria, or structure of a newly supplied assignment guide is not Simple Q&A and is not a narrower operation. Answer it inside the intake map, not instead of the map. On continuation, reuse the existing intake map. If several valid readings remain and the source does not contradict itself, invoke `brainstorming`, present 2–3 options, recommend one, and stop. The user chooses. Do not select one and write. Explain necessary source terms in the same sentence in the language of the user's current message. Do not default that language to Vietnamese, and do not produce a line-by-line translation.

### Completed-assignment read-back

When the user asks to read or remember a completed assignment/report, whether it
arrived in the current turn or is retained from an earlier read, return a
source-grounded read-back in three blocks:

1. **What the document is:** preserve the exact identity, names, dates and
   whether it is a submitted work or a guide.
2. **What each major part does:** follow the artifact's actual headings and
   explain its argument, its stated conclusion or limit, and whether it is
   general theory, a scenario, a prototype/trial, or an implemented product.
3. **Project and scenario thread:** identify where each project/scenario first
   appears, where the document changes it, and whether the conclusion returns to
   it. State unread or unverified images/schema explicitly.

Do not invent learning outcomes, P/M/D labels, project names, technologies,
measurements or test conditions. Do not normalize names or dates, turn projected
results into observed experiments, treat a grading-grid cell as written content,
or expose the internal skill/tool route. Do not praise the submission or start a
new criterion analysis, outline or draft unless the user separately asks for it.

### Completed work versus a later guide

When a later guide is supplied with, or follows in context after, a completed
assignment and the user asks what remains, use a narrow comparison rather than
the initial intake map. The first result must state the criteria already present
in the earlier document; the next
must state the criteria still missing; only then report mismatches, ambiguity and
evidence limits. A criterion explicitly present in the earlier document, such as
P7 when the source names it, must be reported as present rather than moved into
the missing list without evidence.

Do not open with formatting, use completion percentages, attach a criterion code
that the source does not establish, turn optional wording such as `you can` into
a mandatory requirement, or propose invented figures or failed test cases.
The sentence `quality assurance` or another incidental phrase is not a criterion
section unless the source gives it that criterion identity.

Per-type inspection fields: `references/artifact-inspection.md`.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)`, `inspect_image(file)`, `inspect_layered_image(file)` to re-query structure on demand.
- `read_file(path)` for text, Markdown, and CSV-style artifacts.

## Dependencies

- `reading-artifacts` — required; never analyze an unread file. `brainstorming` — when several valid readings remain. `editing-documents` and `verifying-artifacts` — downstream consumers of the preserve-list.

## Fallback

If layout or a typed representation is unavailable, analyze from the accessible representation and declare what could not be observed. Never invent structure.

## Common mistakes

- Analyzing from guessed or raw-byte-only input.
- Producing a change-list with no preserve-list.
- Inventing structure the artifact does not expose.
- Treating the preserve-list as the trigger for an edit skill — it only names what must not change.
