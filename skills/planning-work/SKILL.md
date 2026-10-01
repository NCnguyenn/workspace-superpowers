---
name: planning-work
description: Use when an outline is requested, criteria-based writing needs an outline decision, or workspace complexity calls for a structural plan or output contract.
---

# Planning Work

Construct an execution plan, structural outline, and deliverable contract for complex workspace projects.

For adopted [persistent work tracking](../../references/work-tracking.md), use
the [work-plan template](../../templates/work-plan.md) to own the plan's content:
brief, requirement-to-item coverage, outline/milestones, dependencies, decisions
and next action. Reuse existing plan identity and decision owners; do not create
parallel brief/outline registers. Send grounded content to `editing-documents`
for the one persistent write and `verifying-artifacts` for readback. Missing
criteria allow a clearly provisional plan, not invented mandatory requirements.
Project references attach only to items that need them, not every heading.

Planning owns the whole-report plan and stable item mapping, but it does not
persist the record itself. Carry the adopted `plan_file`, `work_id`, item IDs,
target revision and applicable `context_file` to `editing-documents`. Revise only
affected items and dependencies; preserve prior approvals by version and keep
project-dependent work waiting when no authorized concrete project exists. A
saved next action is a checkpoint, not permission to override the current prompt.

Apply the [workflow continuity contract](../../references/workflow-continuity.md)
to feedback, side questions, and late files. Update only affected outline sections;
retain valid decisions and resolve new evidence before dependent planning.
For continuing a report, consume the profile and source map from the
[document continuity contract](../../references/document-continuity.md). Position
the next criterion within the existing argument, headings, and numbering; do not
replace the document's structure with a generic report outline.

## When to use

Multi-section, multi-stage, research-heavy, or multi-artifact projects (e.g. theses, comprehensive reports, multi-slide decks, mixed-format packages) before authoring or modifying content.

Also use for a requested outline or an unresolved outline prerequisite under the [criteria-writing contract](../../references/criteria-writing-contract.md), including a small report/thesis section.

## When not to use

Trivial or mechanical edits, or small tasks without a requested/required outline. Do not force a separate planning file or reopen an applicable approved or waived outline decision.

## Plan shapes

Select the plan shape that matches the deliverable:

| Deliverable | Plan shape | Output |
|---|---|---|
| Criteria-based report / thesis section | Criterion obligations, points, evidence, and visual decisions per heading | Proportional outline in chat or [outline template](../../templates/outline.md), with approval state |
| Report / Essay | Section outline and argument progression | Outline document (`templates/outline.md`) |
| Thesis / Dissertation | Thesis architecture, chapter breakdown, and research plan | Comprehensive chapter plan |
| Presentation / Deck | Narrative arc and slide storyboard | Slide storyboard |
| Spreadsheet / Dataset | Data cleaning and formula architecture | Analysis plan |
| Document formatting | Style, heading, and pagination plan | Format plan |
| Design / image | Canvas, layer, and export plan | Design plan |
| Conversion | Source → target mapping and verification points | Conversion plan |
| Mixed Project | Multi-artifact dependencies and sequencing | Multi-artifact plan and contract (`templates/deliverable-contract.md`) |
| Project-directory-mapped report | `structure_map` from inspected project paths/roles to applicable headings and evidence | Existing outline plus source coverage and limits; folder-based headings only when requested |

For project reports, use [project grounding](../../references/project-grounding.md).
Preserve an adopted rubric and existing approved outline; a folder is not
automatically a chapter. Carry read-only survey permissions into any software
handoff. Plan required evidence without authorizing new tests, builds or mutations.

## Criteria-based outline

Use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md)
for actual preview delivery and source/asset identity. Call `working-with-visuals`
when an asset needs inspection or preparation, and `citing-sources` for required
attribution. Return to the current outline; these dependencies do not authorize
drafting. Keep candidate sources separate from the outline's actually cited list.

Apply [outline structure and evidence readiness](../../references/outline-structure.md)
before generating any headings. Check `source_title`, `source_locator` and
`evidence_readiness`. If the exact title or required evidence is missing, invoke
`scoping-the-brief` for a targeted interview and wait; do not show an affected
outline while the answer is pending, even for an outline-only request.
Reuse supplied evidence or explicit scoped permission for hypothetical examples.

Apply [criterion-level analysis and two stops](../../references/criteria-writing-contract.md#criterion-level-analysis-and-two-stops).
The two-stop rule applies to all sections, chapters, parts, and criteria of deliverables (e.g. “Section 1: Project Overview”, “Introduction”, or “P1”).
For a section or criterion draft, inspect the actual analysis decision before outlining. A master outline naming section headings does not supply detailed approval. If analysis is pending, return to scoping without presenting the detailed outline. Once approved/waived, prepare and present the detailed outline directly in chat.
A user message that only asks for the outline, including `làm dàn ý`, is not analysis approval. If that analysis has not been displayed and approved or explicitly waived, return the analysis alone and do not include the outline.
Never invent project names (e.g. fictitious apps/companies), consulting roles, business context, budgets, SLAs, latency targets, or operational metrics as real facts. Do not add a deliverable that belongs to a later assignment, such as a functional prototype, or scope details the user has not confirmed. If a detail is needed and unsettled, ask before using it. If unstated in source documents or prompt, ask the user or mark as a blocking gap. Explicitly authorized hypothetical examples may use illustrative values within that permission, labeled locally and never presented as actual evidence.
Explain the outline in the language of the user's current message. Do not default that language to Vietnamese. Explain each necessary source term in the same sentence, and do not produce a line-by-line translation. The outline intended for submission follows the locked submission language.

Planning owns outline creation, revisions, and receipt of approval under the contract. Scope confirmation belongs to `scoping-the-brief`; drafting only consumes these decisions.
Apply the [guided questions](../../references/guided-questions.md) visible delivery and recovery
rules: display the complete detailed outline before its review question, and
redisplay it if the user reports it missing. An internal plan is not user-visible
delivery or approval.

1. Reuse applicable scope and outline decisions. Return unresolved applicable analysis approval to scoping, including for a criterion outline-only request. Once that analysis is approved or explicitly waived, sufficient scope and resolved evidence prerequisites permit outlining without another interview. Evidence permission alone does not approve the analysis.
2. Unless the user explicitly requests another structure, use Heading 1/2/3 numbered `1`, `1.x`, `1.x.x`. Heading 1 copies the source title verbatim. For each main point, fill Claim, Reason and Limit from [outline structure](../../references/outline-structure.md). A topic label is not an outline point. Record length only when the user or source specified it. Do not add an audience, unstated technology or an operating commitment to imitate depth. A small criterion may use a short outline directly in chat.
3. For each heading, set Visual and Table to `Not needed` or to the asset rendered in the same message. A name, column list, caption, or "Figure 1.1" is not that decision. When an asset is shown, also record name/type, purpose, position, source/data, preparer and status beside it. Those fields do not replace the rendered asset. Keep the Heading 1/2/3 tree visible; do not collapse the outline into one continuous bullet list.

Choose the asset source before showing the outline:
- User-supplied image: show that file in the same chat message. Do not replace it with a web image or a drawing.
- Requested illustration, including a standard theory, cycle, architecture, or public concept diagram: search Google or another public platform, download an existing image file, and display that image in the same chat message with the source citation directly under it. Record the page title and URL, and state that it is an external illustration, not the user's project evidence. Do not create, generate, or code-draw a substitute.
- Comparison or criteria table: render the full table in the same message. Cells come from inspected user data or a cited public source. An unknown cell stays unknown.
- Project screenshot, internal metric, budget, timeline, or case-specific photo: ask the user and wait. Do not substitute a web image, a social-media post, or a generated image as the user's project.
- Published public fact: search and cite. A social-media post is a lead, not a verified fact, unless the user asked to use that inspected post.
- Code-drawn diagram (SVG, HTML, Mermaid) or a generated image: only when the user explicitly asks for that drawing, or after you ask and the user agrees. Silence, "continue", or analysis approval is not agreement.
- Invented number or fake project result: only after the user explicitly permits that specific gap. Label a permitted illustration as hypothetical, never as project evidence.

Display means the user can see the image pixels in that chat message. Embed the downloaded file as a Markdown image in that message. A filename, a Google search-results link, a caption, or a promise to insert the image into a document later is not display. If the download or the chat preview fails, say so and ask. Do not draw a replacement unless the user then agrees.

The complete draft later adds prose only. It does not add a new table, figure, or number.
4. Record `outline_status`, `outline_version`, and `approval_record`, including the decision's applicable sections and explicit waivers. Follow [guided questions](../../references/guided-questions.md), present the detailed outline directly in chat and STOP to await user approval before drafting. Silence is not approval; preserve already approved or waived decisions within their scope. When persisting files, co-locate tracking and deliverable files in a dedicated common project directory created by AI with user consent.
5. On feedback, set `revision_requested`, apply the requested change, identify the revised version, and return affected sections as pending when further approval is needed. Explicit “change this, then write” authorizes the clear revised section and continuation; do not ask again. Preserve unaffected approvals.
6. For an outline-only request, present the outline and stop. Outline approval alone does not authorize drafting. In an already authorized draft or substantive revision task, applicable outline approval permits continuation to `drafting-prose` without another request to write; evidence prerequisites still apply.

The outline shows about 40–50% of the detailed content the complete section will contain, including the heading tree, Claim, Reason and Limit, and every table, figure, and number the draft will use. The complete draft adds the remaining 50–60% as connected prose only. Do not reverse these ratios. Do not turn either ratio into a word-count quota or invent content to satisfy a ratio. If several valid organizations of sections, evidence, tables, or diagrams remain, invoke `brainstorming`. Present 2–3 outlines, recommend one, and stop. The user chooses. Do not select one and write the section.

## Procedure

1. Review the working brief and findings from `reading-artifacts` / `analyzing-artifacts`.
2. Select the plan shape appropriate to the deliverable type.
   - For criteria-based writing, use the outline procedure above; apply file-contract steps below only when files are requested.
3. Establish the structural outline:
   - Define sections, section purposes, and key points.
   - Map required evidence and citations to sections.
   - Set length targets or slide allocations.
4. Establish the deliverable contract:
   - Identify primary editable source artifacts (e.g. `.docx`, `.md`).
   - Identify rendered/exported artifacts (e.g. `.pdf`).
   - Identify supporting assets (e.g. `.bib`, figures, data tables).
   - Set format-specific integrity criteria.
5. Define execution checkpoints (e.g. drafting $\rightarrow$ reviewing $\rightarrow$ verifying).

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `write_file(path, content)` — for standalone requested outlines/contracts; adopted work-plan persistence belongs to `editing-documents`.
- `delegate(role, context)` — optional; only for specialist *planning* roles. Do not dispatch the full execution graph from this skill; `reviewing-work` and `verifying-artifacts` remain later lifecycle stages.

## Dependencies

- Follows `scoping-the-brief` when scope is unresolved, `analyzing-artifacts` when starting from existing files, and `brainstorming` when several valid organizations remain.
- Precedes drafting, formatting, and subsequent `reviewing-work`.

## Fallback

If file generation is restricted or unnecessary, keep the plan in chat or execution state. A criteria outline awaiting user approval must be visible to the user; an internal plan cannot substitute for approval. If a reply is unavailable, retain pending status and follow the contract rather than proceeding to dependent drafting.

## Common mistakes

* Writing a full planning document for a simple typo or single-paragraph edit.
* Drafting multi-chapter documents without an agreed outline.
* Omitting the deliverable contract for multi-artifact deliverables.
* Over-complicating the plan with unnecessary subagent chains when a single orchestrator suffices.

| Excuse | Reality |
|---|---|
| A figure name is enough for the outline | Naming it is not showing it. Display the downloaded image in the same message. |
| Draw the SVG when writing the DOCX | The outline must show the image now. The later draft adds prose only. |
| A short instruction says diagrams are code | That does not permit drawing when the user asked for an existing image. Ask first, or draw only after the user agrees. |
