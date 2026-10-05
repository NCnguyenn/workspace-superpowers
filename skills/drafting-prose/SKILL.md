---
name: drafting-prose
description: Use when composing, continuing, or substantively rewriting report or thesis prose within an authorized task.
---

# Drafting Prose

## Job

Coordinate the composition of authorized report or thesis prose after the applicable scope, outline, evidence, and continuity prerequisites are satisfied. This skill selects the writing specialist, protects the approved structure, ensures review before delivery, and stops for user feedback after each delivered section.

It consumes decisions; it cannot infer, create, waive, or approve them. Silence, time passing, a reply to a different question, or a complete prompt is not approval. A request to skip a gate is not a language override, language instruction, or language request.

## Required inputs

Before composing, collect only the target section and the context needed to write it correctly:

- authorized `task_mode`, target section, and stopping point;
- applicable `scope_status`, `outline_status`, `outline_version`, and `approval_record`;
- source criterion/title where applicable, approved outline blocks or authorized brief/structure, evidence register, and blocking gaps;
- source profile, insertion point, adjacent excerpts, terminology, and preserve-list for a continuation;
- selected deliverable language under the [language policy](../../references/language-policy.md), and the [academic writing style guide](../../references/academic-writing-style.md).

Use [workflow continuity](../../references/workflow-continuity.md), [persistent work tracking](../../references/work-tracking.md), [document continuity](../../references/document-continuity.md), and [criteria-writing contract](../../references/criteria-writing-contract.md). Do not create a second tracker or promote a working draft to an approved baseline. Chat explanations follow the language of the current user message; do not default that language to Vietnamese.

## Prerequisite check

Apply [criterion-level analysis and two stops](../../references/criteria-writing-contract.md#criterion-level-analysis-and-two-stops) where criteria-based writing applies. For other prose, consume the authorized brief and requested structure; do not introduce criteria-writing gates.

1. Confirm that the current request authorizes drafting or substantive composition, not analysis-only or outline-only work.
2. Confirm applicable scope and analysis decision coverage. Return unresolved gaps to `scoping-the-brief`.
3. Where an outline decision applies, confirm it is approved or explicitly waived for this version and section. A master outline is not enough.
4. Choose the evidence route below for the current target, preserving source locators and any unresolved gaps.
5. For a continuation, inspect the source profile, insertion point, adjacent excerpts, and evidence before composing; record coverage and unresolved gaps. Use reading/analysis for missing context rather than guessing.

| Evidence readiness | Observable condition | Permitted action |
|---|---|---|
| `not_required` or `provided` | No required evidence gap affects the target; available sources have been inspected. | Draft within the applicable decisions and retain source limits. |
| `illustrative_authorized` | The user explicitly permits illustrative material for the named gap. | Draft with local hypothetical labels; keep unmet real-evidence obligations visible. |
| `pending` | A detailed outline is already approved and the user explicitly permits an incomplete draft for these gaps. | Draft supported blocks, use neutral placeholders at missing claims, and retain `draft_incomplete`. |
| `pending` | Those incomplete-draft conditions are not met. | Hold dependent drafting and return the gap to `scoping-the-brief`; continue only independent authorized work. |

The incomplete-draft route consumes an existing approved outline. It does not permit preparing a new or affected outline while required evidence is pending, inventing a result, or marking a missing-evidence report `ready_after_review`.

Never invent project names, roles, business context, budgets, SLAs, performance metrics, citations, or a later assignment such as a functional prototype. If a fact is needed and unsettled, ask before using it. Hypothetical values must remain locally labeled and cannot become operational proof in a later conclusion.

## Select the writing specialist

Before writing, you **MUST** execute `read_file("../../references/academic-writing-style.md")` and read the returned style guide. Apply S1 for functional sentence variation and F1/R4 to remove empty claims and inflated language without changing supported meaning.

You **MUST** execute `invoke_skill(name)` and read the selected writing specialist before composing:

| Section need | Specialist |
|---|---|
| Technical, business, or operational report structure: problem, method, observed results, and evaluation | `writing-reports` |
| Scholarly argument, evidence synthesis, hedging, and thesis prose | `writing-academic-prose` |
| A project or thesis report with both needs | Select one by section; use both only where their responsibilities differ |

Optional mathematics support uses `working-with-mathematics` only for an actual mathematical interpretation, derivation, or correctness need. Equation formatting alone does not require a new proof or outline decision; Word output follows the [native Equation contract](../../references/math-in-documents.md).

## Procedure

1. Run the prerequisite check and stop at the earliest unresolved decision.
2. Load the style guide and selected writer using the required actual calls.
3. Compose only the authorized section. When an approved detailed outline applies, expand inside its existing paragraphs, lists, tables, figures, and numbers; do not add new blocks. Otherwise follow the authorized brief and structure.
4. Develop analytical reasoning through PEEL where appropriate. Core analytical report sections need at least 65% discursive prose under the style guide’s scope; a short lead may remain short when complete, and lists remain valid for parallel items, parameters, or sequence. Do not use a rendered-line quota.
5. When citations are required or already present, execute `invoke_skill("citing-sources")`, complete the bidirectional audit, include `## References` in the delivered cited section, and update the saved report’s cumulative reference list.
6. Execute `invoke_skill("reviewing-work")` before delivering, including chat-only prose. Fix blocking findings within the approved scope and recheck affected passages, evidence, citations, and continuity seams.
7. **Output the complete drafted text** for the authorized section directly in chat. Do not hide it behind a file path. File deliverables also require current artifact verification.
8. Ask whether the delivered section is approved. Do not start the next section or criterion in the same turn.

## Visuals, citations, and Word content

Carry authorized tables, figures, captions, attribution, and evidence limits into the same delivery blocks. Use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md) and load `working-with-visuals` when an asset requires inspection or preparation. When an approved outline applies, do not introduce an image, table, or number absent from it. When that outline is waived or not required, follow the authorized brief and structure; missing facts and asset permissions remain unresolved until supplied or explicitly authorized.

For citations, `citing-sources` is required when a citation is present, requested, or required. Never invent page numbers, publishers, URLs, or reference metadata. Authored deliverables use the resolved language, and chat discussion follows the current user message without interleaved bilingual delivery.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` — brief, outline, evidence, source excerpts, and the style guide.
- `write_file(path, content)` and `edit_document(file, change)` — authorized text composition or insertion.
- `invoke_skill(name)` — selected writer, citations where applicable, and review before delivery.
- `delegate(role, context)` — optional bounded writing or review work.

## Completion and fallback

Deliver the reviewed section in full at the requested stopping point, with references when cited, and request the user's section decision. A permitted incomplete draft remains `draft_incomplete`; a clean prose review cannot make missing required evidence complete. If a required writer or reviewer cannot be loaded, stop the affected stage; do not compose from generic knowledge or claim a review occurred. If file writing is unavailable, deliver reviewed chat text without claiming a file was created.

## Common mistakes

- Drafting before analysis, evidence, or detailed-outline decisions are resolved.
- Treating a master outline, generic urgency, or silence as approval.
- Adding new paragraphs, figures, tables, or numbers that were not in the approved outline.
- Turning illustrative values into project results or operational proof.
- Hiding section prose behind a file path.
- Skipping review or starting the next section before the user reviews the current one.
