---
name: planning-work
description: Use when an outline is requested, criteria-based writing needs an outline decision, or workspace complexity calls for a structural plan or output contract.
---

# Planning Work

## Job

Create the structure that makes an authorized workspace task executable: an outline, a deliverable contract, dependencies, and a stopping point. Planning owns the plan’s content and outline decisions; it does not persist a durable record, approve its own work, or begin drafting.

Use [workflow continuity](../../references/workflow-continuity.md) to revise only affected sections after feedback. For sustained work, use [persistent work tracking](../../references/work-tracking.md): reuse the adopted `plan_file`, stable item identities, and prior decisions; send plan content to `editing-documents` for the single persistent write and to `verifying-artifacts` for readback.

## Choose the plan shape

| Deliverable | Plan must establish | Main output |
|---|---|---|
| Report or essay | section purpose, argument progression, evidence, and limits | outline |
| Criteria-based section | criterion obligations, source title, evidence, visual decisions, and approval state | detailed chat outline or outline file |
| Thesis or dissertation | chapter roles, research sequence, dependencies, and evidence gaps | chapter plan |
| Presentation | narrative arc, slide purpose, evidence, and notes | storyboard |
| Spreadsheet | data sources, transformation sequence, formulas, checks, and charts | analysis plan |
| Formatting | target styles, unchanged content, and layout checks | format plan |
| Conversion | selected source, target format, fidelity risks, and verification points | conversion plan |
| Mixed deliverable | artifact dependencies, editable sources, exports, and acceptance checks | plan plus deliverable contract |
| Project-directory-mapped report | `structure_map`, relevant paths, evidence locators, coverage, and limits | existing outline mapped to evidence |

A project folder is not automatically a chapter. Apply [project grounding](../../references/project-grounding.md); use project paths only where they support an approved heading. The survey’s read-only limits continue into any Coding handoff.

## Method

1. **Confirm inputs.** Read the brief, source findings, relevant decisions, and evidence register. For an existing document, use the [document continuity contract](../../references/document-continuity.md) to position the planned section at the actual seam.
2. **Select the smallest useful shape.** A single mechanical change needs no plan. A small criterion may have a short outline in chat; do not create a planning file merely for ceremony.
3. **Map obligations to blocks.** Each section or artifact must have a purpose, concrete argument or task, evidence source and locator, constraints, dependencies, and acceptance check.
4. **Define the deliverable boundary.** Identify editable sources, rendered exports, supporting assets, required checks, and who owns the next action. Use the [deliverable contract template](../../templates/deliverable-contract.md) when several artifacts or exports depend on one another.
5. **Present the authorized plan.** Show the content the user needs to review. Do not substitute an internal record or a filename for visible delivery.
6. **Record only real decisions.** When persistence is authorized, hand the selected outline, plan version, and decisions to `editing-documents`. A plan checkpoint does not authorize an unrequested draft, export, or project write.

## Criteria-based outline

Apply [outline structure and evidence readiness](../../references/outline-structure.md), [criterion-level analysis and two stops](../../references/criteria-writing-contract.md#criterion-level-analysis-and-two-stops), and [guided questions](../../references/guided-questions.md). Read the exact `source_title` and `source_locator`; preserve the level-1 requirement wording verbatim. Chat explanations follow the language of the user's current message; do not default that language to Vietnamese. Explain necessary source terms in the same sentence and do not produce a line-by-line translation.

Before outlining, check that the applicable analysis is approved or explicitly waived and that `evidence_readiness` is `provided`, `not_required`, or `illustrative_authorized`. If evidence is pending, return to `scoping-the-brief` and wait. A request solely for an outline is not analysis approval. An outline-only request still requires those prerequisites and must Stop after the outline; outline approval does not authorize drafting unless drafting or substantive revision was already authorized for that scope.

Build the outline using the same blocks that the final section will retain, in the same order:

- default to `1`, `1.x`, and `1.x.x` unless an explicit structure already applies;
- include distinct short paragraphs for distinct arguments; one paragraph per heading is not an outline of a multi-part heading;
- use a short list only for parallel items, not to replace explanation;
- map each argument to evidence and its limit;
- display a required image or complete table in the same message and at the same position the final section will use it; a source line without the image is not the image;
- omit an image or table that is not needed from the user-facing outline. `Not needed` is a valid internal planning status, but do not print it as an outline block.

The outline provides roughly **40–50%** of the final section’s developed content. The final draft adds the remaining **50–60%** inside the same blocks. Do not reverse these proportions or turn them into a word-count quota. Do not add a new paragraph, list, table, figure, or number during drafting.

For every visual or table decision, record **name/type**, **purpose**, **position**, **source/data**, **preparer**, and **status** in the planning record. Use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md) and load `working-with-visuals` for asset inspection or preparation. Ask for project screenshots, internal metrics, budget, timeline, or case-specific photographs; do not substitute web content or generated material. A requested public illustration must appear as image markdown with a direct HTTPS image URL returning image bytes in the same message, with its source citation below it. Do not draw or generate a replacement unless the user asks or explicitly agrees.

If 2–3 valid organizations remain, load `brainstorming`, compare the alternatives using the same criteria, recommend one, and wait. The user chooses; planning does not select an approach on the user’s behalf.

### Outline decision and revision
Store `outline_status`, `outline_version`, and `approval_record` with the criterion, evidence, and length constraints. Apply the [guided questions](../../references/guided-questions.md) **visible delivery and recovery** rules: show the full detailed outline in chat before asking for a decision, and redisplay it if the user reports it missing. An internal plan is not visible delivery. Outline approval does not authorize drafting unless drafting or substantive revision was already authorized for that scope. If feedback changes an outline, mark the affected version `revision_requested`, revise only affected blocks, identify the new version, and wait again when required.

## Mathematics and project evidence

If the plan involves mathematics in Word, apply the [native Equation contract](../../references/math-in-documents.md). Preserve required Equation representation, check requirements, and the selected Word revision; do not make a plan that treats an image or raw markup as native Word math.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `write_file(path, content)` — create a standalone requested outline or contract only when writing is authorized.
- `delegate(role, context)` — optionally use a planning role for a bounded subtask; do not dispatch the full lifecycle from planning.

## Completion and fallback

A plan is complete when it maps the requested result to ordered, evidence-aware blocks with clear dependencies and the correct next owner. If a file is unnecessary or unavailable, deliver the plan in chat. If an approval is pending, keep the dependent drafting step pending; silence is not approval.

## Common mistakes

- Writing a full project plan for a typo or a one-step correction.
- Treating a master outline as approval for each section’s detailed outline.
- Inventing source titles, evidence, visual assets, or project facts to complete a plan.
- Treating an asset label or bare link as a displayed visual.
- Converting the plan into a generic report template rather than mapping the actual requirements.
- Letting an internal plan substitute for visible user review.
