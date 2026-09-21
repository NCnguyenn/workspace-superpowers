---
name: planning-work
description: Use when an outline is requested, criteria-based writing needs an outline decision, or workspace complexity calls for a structural plan or output contract.
---

# Planning Work

Construct an execution plan, structural outline, and deliverable contract for complex workspace projects.

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

## Criteria-based outline

Planning owns outline creation, revisions, and receipt of approval under the contract. Scope confirmation belongs to `scoping-the-brief`; drafting only consumes these decisions.

1. Reuse applicable scope and outline decisions. For a draft request with unresolved scope confirmation, return that prerequisite to scoping. An outline-only request with sufficient scope can proceed directly.
2. For each heading, map the criterion obligation, main points, planned evidence, and length if specified or useful. Do not invent chapters or grading requirements. A small criterion may use a short outline directly in chat; a separate file is optional.
3. Include a table/figure decision at each heading: **Not needed**, or **name/type, purpose, position, source/data, preparer, status** for each asset. A parent may point to its child heading's asset. Missing measurements block results charts; diagrams need confirmed or clearly labeled proposed content.
4. Record `outline_status`, `outline_version`, and `approval_record`, including the decision's applicable sections and explicit waivers. Present a new outline as `pending`. Silence is not approval; preserve already approved or waived decisions within their scope.
5. On feedback, set `revision_requested`, apply the requested change, identify the revised version, and return affected sections as pending when further approval is needed. Explicit “change this, then write” authorizes the clear revised section and continuation; do not ask again. Preserve unaffected approvals.
6. For an outline-only request, present the outline and stop. Outline approval alone does not authorize drafting. In an already authorized draft or substantive revision task, applicable outline approval permits continuation to `drafting-prose` without another request to write; evidence prerequisites still apply.

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

- `write_file(path, content)` — to generate the outline and deliverable contract when required.
- `delegate(role, context)` — optional; only for specialist *planning* roles. Do not dispatch the full execution graph from this skill; `reviewing-work` and `verifying-artifacts` remain later lifecycle stages.

## Dependencies

- Follows `scoping-the-brief` (for complex briefs) or `analyzing-artifacts` (when starting from existing files).
- Precedes drafting, formatting, and subsequent `reviewing-work`.

## Fallback

If file generation is restricted or unnecessary, keep the plan in chat or execution state. A criteria outline awaiting user approval must be visible to the user; an internal plan cannot substitute for approval. If a reply is unavailable, retain pending status and follow the contract rather than proceeding to dependent drafting.

## Common mistakes

* Writing a full planning document for a simple typo or single-paragraph edit.
* Drafting multi-chapter documents without an agreed outline.
* Omitting the deliverable contract for multi-artifact deliverables.
* Over-complicating the plan with unnecessary subagent chains when a single orchestrator suffices.
