# Workspace Superpowers Skills Catalog

This catalog helps an agent select the smallest applicable workspace skill. Load the chosen skill just in time and follow its full instructions; this index is a discovery aid, not a replacement for a skill’s procedure.

## Selection principles

- Choose by the requested operation, target artifact, and required stopping point—not by isolated words such as “report” or “formula.”
- Read existing artifacts before interpreting or editing them.
- Use a specialist only for its assigned operation, then return to the calling workflow.
- Review substantial content before delivery and reopen modified artifacts before claiming file completion.
- For workspace work, begin with `using-workspace-superpowers`. Coding work belongs to the coding workflow.

## Workflow and Lifecycle

| Name | When to use | Main input | Expected output |
|---|---|---|---|
| [`using-workspace-superpowers`](skills/using-workspace-superpowers/SKILL.md) | A workspace message starts, continues, changes, pauses, approves, or resumes work. | Current request, retained context, and target operation. | A scoped route, required skills, stopping point, and real blocker if any. |
| [`scoping-the-brief`](skills/scoping-the-brief/SKILL.md) | A material requirement, evidence need, scope boundary, or criterion interpretation is unresolved. | Request, inspected requirements, prior decisions, and evidence gaps. | Actionable brief or analysis handoff with focused unanswered decisions. |
| [`reading-artifacts`](skills/reading-artifacts/SKILL.md) | An existing document, PDF, workbook, deck, image, rubric, or template must be opened. | Artifact identity, target question, and requested coverage. | Extracted observations, locators, revision information, and coverage limits. |
| [`analyzing-artifacts`](skills/analyzing-artifacts/SKILL.md) | Already-read material needs interpretation, comparison, synthesis, criteria mapping, or continuity context. | Extraction handoff, source roles, and analytical question. | Traceable findings, conflicts, preserve-list, gaps, and handoff. |
| [`planning-work`](skills/planning-work/SKILL.md) | An outline, multi-artifact plan, deliverable contract, or structural decision is required. | Brief, findings, evidence, decisions, and target deliverable. | Evidence-aware outline or plan with dependencies and approval state. |
| [`brainstorming`](skills/brainstorming/SKILL.md) | Two or more viable document interpretations, structures, evidence placements, or visual choices remain. | Settled constraints and the specific open decision. | Comparable options, recommendation, and a user-selected direction. |
| [`reviewing-work`](skills/reviewing-work/SKILL.md) | Substantial drafted, revised, or assembled content needs independent quality review. | Candidate revision, requirements, evidence, outline, and relevant source context. | Severity-ranked findings and recheck requirements. |
| [`verifying-artifacts`](skills/verifying-artifacts/SKILL.md) | A file has been created, edited, converted, or exported and completion is about to be claimed. | Actual current artifact path, revision, and expected checks. | Reopen-based verification record with passed and unverified checks. |
| [`packaging-deliverables`](skills/packaging-deliverables/SKILL.md) | Verified artifacts are ready for final delivery. | Requested file set, verification records, and destination constraints. | Final delivery set and report with exact paths and limitations. |

## Research and Citation Integrity

| Name | When to use | Main input | Expected output |
|---|---|---|---|
| [`researching-sources`](skills/researching-sources/SKILL.md) | The user explicitly requests external research, literature search, or reference discovery. | Research question, target claims, source criteria, and boundaries. | Inspected evidence cards with locators, metadata, quality assessment, and limits. |
| [`citing-sources`](skills/citing-sources/SKILL.md) | Citations are requested or required, or existing formal citations need checking. | Draft claims, inspected source metadata, target style, and delivery scope. | Formatted citations, `## References`, and bidirectional citation audit. |

## Documents, Layout, and Conversion

| Name | When to use | Main input | Expected output |
|---|---|---|---|
| [`editing-documents`](skills/editing-documents/SKILL.md) | Existing document content needs a typo fix, insertion, rewrite, restructuring, or authorized persistent record update. | Current document, requested changes, preserve-list, and applicable decisions. | Scoped document edit or precise change list, followed by review and verification as needed. |
| [`formatting-layout`](skills/formatting-layout/SKILL.md) | Typography, margins, styles, headers, captions, TOC, or document layout changes without content changes. | Inspected document, template/rubric, and layout requirements. | Presentation-only changes or formatting specification with verification. |
| [`converting-artifacts`](skills/converting-artifacts/SKILL.md) | An artifact must be exported or transformed into another file format. | Selected source revision, target format, settings, and fidelity constraints. | Converted output with source-to-output mapping and independent verification. |
| [`working-with-pdf`](skills/working-with-pdf/SKILL.md) | An existing PDF must be inspected, extracted, split, merged, annotated, or form-filled. | PDF, requested pages or operation, and available editable source. | Page-located extraction or verified PDF operation result. |

## Spreadsheets and Formula Integrity

| Name | When to use | Main input | Expected output |
|---|---|---|---|
| [`working-with-spreadsheets`](skills/working-with-spreadsheets/SKILL.md) | A workbook or CSV needs inspection, cleaning, analysis, updates, or charts. | Workbook, target sheets/ranges, data change, and formula constraints. | Analyzed or updated workbook with recalculation and verification evidence. |
| [`auditing-formulas`](skills/auditing-formulas/SKILL.md) | Formula errors, dependencies, circular references, or calculation logic need auditing or repair. | Workbook revision, target cells, expected logic, and audit/repair boundary. | Cell-level audit or verified repair with root cause and dependency evidence. |

## Presentations and Visual Assets

| Name | When to use | Main input | Expected output |
|---|---|---|---|
| [`storyboarding-slides`](skills/storyboarding-slides/SKILL.md) | A slide-by-slide narrative, action headlines, and visual plan are needed before deck authoring. | Brief or source report, audience, duration, evidence, and visual constraints. | Presentation storyboard with action headlines, slide purpose, visuals, and speaker notes. |
| [`working-with-presentations`](skills/working-with-presentations/SKILL.md) | A slide deck must be created, inspected, edited, styled, or prepared for delivery. | Deck or storyboard, evidence, theme/template, target slides, and notes. | Inspected or changed deck with visual hierarchy and verification evidence. |
| [`working-with-visuals`](skills/working-with-visuals/SKILL.md) | A screenshot, DOCX figure, image, vector, diagram, or layered asset needs inspection, authorized editing, or verification. | Asset, provenance, requested change, use context, and output constraints. | Visual findings or verified asset with fidelity and evidence limits. |

## Prose and Mathematics

| Name | When to use | Main input | Expected output |
|---|---|---|---|
| [`drafting-prose`](skills/drafting-prose/SKILL.md) | Authorized report or thesis prose must be written, continued, or substantively recomposed. | Authorized brief, approved outline or explicit waiver, evidence, decisions, continuity excerpts, and target section. | Reviewed section awaiting the user's decision; retain `draft_incomplete` where required evidence is missing. |
| [`writing-reports`](skills/writing-reports/SKILL.md) | A report section must separate problem, plan, method, observed results, and evaluation. | Approved report block, evidence register, source locators, and report context. | Evidence-aware report prose with clear layer boundaries. |
| [`writing-academic-prose`](skills/writing-academic-prose/SKILL.md) | A scholarly or thesis section needs claim-evidence reasoning, calibrated certainty, and academic cadence. | Approved argument blocks, evidence, continuity context, and citation needs. | Review-ready scholarly prose with explicit limits. |
| [`working-with-mathematics`](skills/working-with-mathematics/SKILL.md) | Mathematical notation, derivation, proof, calculation, or correctness checking needs support. | Target claim, notation, domains, assumptions, source locators, and requested depth. | Mathematical handoff with steps, checks, result, and limitations. |

## Typical Skill Sequences

These routes are examples, not permission to exceed the user’s requested operation:

- Existing substantive document revision: `reading-artifacts → analyzing-artifacts → editing-documents → reviewing-work → verifying-artifacts`.
- Requested external research: `researching-sources → citing-sources → selected authoring skill → reviewing-work`.
- Criteria-based section drafting: `scoping-the-brief → planning-work → drafting-prose → reviewing-work`, with separate user decisions at the required analysis and outline boundaries.
- Workbook repair: `working-with-spreadsheets → auditing-formulas → verifying-artifacts`.
- Report-to-deck delivery: `reading-artifacts → analyzing-artifacts → storyboarding-slides → working-with-presentations → reviewing-work → verifying-artifacts`.
- Conversion: `reading-artifacts → converting-artifacts → verifying-artifacts → packaging-deliverables`.
