---
name: scoping-the-brief
description: Use when material workspace requirements are unclear, report or thesis criteria need interpretation, or applicable scope confirmation is unresolved.
---

# Scoping the Brief

Resolve blocking ambiguity and establish an actionable working brief for substantial workspace tasks.

For sustained work, use [persistent work tracking](../../references/work-tracking.md):
inspect an existing plan before asking for requirements already recorded. Offer
agent-managed persistence when warranted, without requiring user file management.
For an initial supplied brief, rubric, or graded guide with no named section or narrower requested operation, present the intake map before any setup question. On continuation, reuse the existing intake map; inspect changed inputs and focus on the named section instead of repeating intake. Confirm only identity fields that the source or map does not already settle, and only before creating tracking or project files. Do not ask grade target, report language, or which assignment when the source or language policy already settles them.
Extract source requirements separately from proposals/unknowns; retain rubric
coverage gaps. Tracking consent does not approve the scope or outline. Return
the brief and decisions to planning/editor for the same adopted record.

Apply the [workflow continuity contract](../../references/workflow-continuity.md).
Consume partial answers without discarding other context. If the user asks a side
question or supplies a file instead of answering, route that request and keep only
the still-relevant question pending. Reuse facts and decisions already established.

## When to use

Folder-based reports use [project grounding](../../references/project-grounding.md).
An accessible folder or existing detailed description is sufficient to begin
inspection; do not require the user to restate the tree. Retain the one designated
context-file identity and survey limits in the existing brief. This does not
authorize project tests/builds or introduce an extra scope gate.

Under-specified, complex, multi-stage, or graded tasks (e.g. assignments, research syntheses, client reports, presentations) where missing facts would materially alter the deliverable.

Also use for requested criteria analysis or unresolved scope confirmation under the [criteria-writing contract](../../references/criteria-writing-contract.md), even when the supplied facts are clear.

## When not to use

Trivial or mechanical work (e.g. typo-fixes, single-cell corrections, straightforward formatting adjustments). Fully specified work needs no interview; do not reopen an applicable confirmed or waived scope decision.

## Adaptive ceremony

* **Trivial fixes:** No interview. Proceed immediately through the core loop.
* **Inspect first:** When input files exist, run `reading-artifacts` and `analyzing-artifacts` first. Do not ask the user for information already present in the rubric, template, or draft.
* **Ask only what is material:** Inquire only about decisions that change the deliverable: audience, purpose, language, deliverable format(s), length/page constraints, rubric obligations, source location, and output location. Resolve citation conventions from [citation style rules](../../references/citation-styles.md); reuse established conventions and use Harvard only when citations are required and no convention is specified. Resolve deliverable language under the [shared language policy](../../references/language-policy.md): English unless the user explicitly requests another language. Do not infer it from conversation/source language or ask merely because language was omitted.
* **User says "just do it" / "decide for me":** Skip optional clarification and record safe working assumptions. Resolve material conflicts and evidence gaps; do not invent a house citation style. For criteria writing, record only the approval gates the user explicitly waived. Review and applicable file verification remain required.

## Criteria-based writing

Apply [outline structure and evidence readiness](../../references/outline-structure.md).
Capture the exact `source_title` and its locator. During analysis, check required
data and support; set `evidence_readiness` before handing off to planning. If
required evidence is missing, interview the user with targeted questions and
wait before preparing the outline. Explicit permission for illustrative data
may resolve the planning prerequisite only within its recorded scope; never
invent real measurements or citations. Analysis approval alone does not resolve
a missing-evidence question.

### Interview missing scenario metrics before analysis delivery

This is not a mandatory interview for every section. Ask only about missing data
or evidence necessary to the current requirement or claim after inspecting inputs.
A theoretical explanation does not need a project-data interview; record
`not_required` when no evidence gap affects it and continue the applicable steps.
Do not block it on metrics needed only by a later section. Required academic
citations remain applicable without demanding empirical project evidence.

Inspect supplied sources and prior answers before presenting the requirement analysis.
If an applied scenario requires absent budget, timeline, scale, concurrency or
other factual bounds, ask one focused evidence question and wait before delivering
the completed analysis for approval. Never place a generated package of numbers
inside that analysis and ask whether the user wants to adjust it afterward.

Offer a choice between supplying real data and explicitly authorizing illustrative
assumptions for the named gaps. Use the host's structured question interface when
available and permitted for evidence clarification; otherwise ask in chat. For example:
“Do you have budget, delivery timeline and target scale in your brief, or may I
propose hypothetical values for these missing constraints?” A proposed numeric
option must be labeled optional and hypothetical, not a standard BTEC benchmark.
Do not mark illustrative data as the recommended choice without a task-specific reason.

Record the answer and scoped permission in the existing conversation or brief.
Set `provided` only after inspecting sufficient supplied inputs; set
`illustrative_authorized` only for gaps the user explicitly allows you to model.
A preselected option, skipped question, timeout, general “continue”, or partial
answer leaves unresolved gaps `pending`. Reuse permission already granted; do not
ask again. No metric interview is needed for pure theory or nonessential numbers.
An analysis-only diagnosis may explain missing evidence without inventing it.
Safe working assumptions about presentation never authorize invented project facts.

### Section decisions

Apply [criterion-level analysis and two stops](../../references/criteria-writing-contract.md#criterion-level-analysis-and-two-stops).
The two-stop rule applies to all sections, chapters, parts, and criteria of
deliverables (e.g. “Section 1: Project Overview”, “Introduction”, or “P1”).
For a section or criterion draft, show the original wording/locator, extract primary keywords and command verbs, and classify the exact cognitive demand (pure theoretical description vs comparative matrix vs critical evaluation/tradeoffs vs justification). Delineate strict scope boundaries (In-Scope vs Out-of-Scope, general theory vs scenario application), required diagrams, and academic citations.
Identify the analysis revision and request its approval in chat before producing the
detailed outline. “Do Section 1” or “Do P1” and approval of master headings are
not that decision. Follow [guided questions](../../references/guided-questions.md) and conduct review naturally in chat without modal popup spam.
Apply its visible delivery and recovery rules: complete analysis first, natural
review question last. If the user did not see the analysis, return to visible
delivery; do not replace it with a confirmation card or a scope-only summary.

Never invent project names (e.g. fictitious apps/companies like "SpeedyBite"),
consulting roles, business context, budgets (e.g. "$15,000"), SLAs, latency targets,
or operational metrics without interviewing and confirming with the user. If unstated
in source documents or prompt, ask the user or record a blocking gap; never fabricate
project facts.

Conversational exchanges, requirement analysis presentations, questions, and
explanations follow the user's conversational language (e.g., Vietnamese). Authored
deliverables default to English. Never interleave bilingual translations or
explanations into chat blocks.

1. Extract criteria and section requirements from chat, supplied instructions, or artifacts already read. Record `task_mode`, original `criteria` with source/locator, obligations, and included/excluded `scope` in the [brief](../../templates/brief.md) or conversation state. Do not ask users to enter internal fields.
2. Inspect available evidence first. Maintain `evidence_register` and `blocking_gaps`: identify what is missing, which claim it supports, and what resolves the gap. Apply the contract's Missing Evidence Protocol; block dependent assertions while continuing authorized independent work.
3. Separate clarification from confirmation. Ask questions only about material unknowns. Reuse applicable `scope_status` values of `confirmed` or `waived` and their `approval_record`; do not interview again. If confirmation is required and unresolved, summarize scope, set `pending`, and await the user's decision. Silence or an unavailable response is not approval.
4. For `analyze`, deliver interpretation, obligations, scope, and evidence needs, then stop. Do not request approval of an unrequested outline. For `outline`, pass sufficiently clear scope to `planning-work` only after applicable analysis approval and the evidence prerequisite are resolved: required evidence is inspected or illustrative use is explicitly authorized. These are separate decisions; do not impose an unrelated drafting gate. For `draft` or substantive `revise`, resolve applicable scope and evidence prerequisites, then hand off outline decisions to `planning-work`.
5. Preserve unaffected decisions when scope changes. Confirm only the affected scope when not already authorized; never treat an earlier approval as covering a new experimental comparison. Project claims require actual evidence; a README is not proof of implementation. Software-engineering inspection belongs to the Coding workflow and does not authorize code changes.

## Procedure

1. Inspect existing input artifacts, rubrics, and instructions before formulating questions.
2. Determine whether unresolved ambiguities would change the deliverable.
3. If material ambiguity remains and user input is accessible, ask focused, targeted questions.
4. Establish the working brief (`templates/brief.md`) recording:
   - Target audience, core purpose, and deliverable language (English by default, with any explicit user override recorded).
   - Required deliverable formats, length, and constraints.
   - Applicable rubric/template obligations and citation style, if the brief or discipline requires one.
   - Explicit working assumptions and preserved elements.
5. Apply the criteria-based stopping points above when activated. Otherwise hand off to `planning-work` when complexity warrants a plan, or proceed to the selected specialists. Review remains required for substantial outputs; verify files before claiming file completion.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — to examine existing text-bearing rubrics, templates, or instructions.
- `invoke_skill(name)` — to load `reading-artifacts` / `analyzing-artifacts` when source files exist.

Interactive questions use the host's available structured question interface
when permitted, following the [guided questions](../../references/guided-questions.md) reference and adapter. Otherwise
ask a concise choice in chat and wait. They are conversation interactions, not
an additional artifact capability or a tool supplied by this skill pack.

## Dependencies

- Preceded by `reading-artifacts` and `analyzing-artifacts` when source files or rubrics exist.
- Leads to `planning-work` for requested outlines, applicable criteria-writing outline prerequisites, or complex work needing a plan. Analysis-only requests stop at analysis.

## Fallback

For criteria writing, the criteria-writing contract controls fallback: an unavailable answer never confirms scope, approves an outline, or resolves missing evidence. While the evidence interview is pending, return a gap diagnosis and targeted questions, not a completed analysis for approval or a provisional outline. An analysis-only diagnosis can identify gaps without filling them. For other tasks, disclose safe working assumptions and proceed only with supported work. Do not invent sources.

## Common mistakes

* Asking questions on a trivial edit or typo fix.
* Asking for information already specified in the prompt or rubric.
* Asking endless open-ended questions instead of offering a focused evidence choice.
* Treating optional illustrative numbers as accepted defaults before the user's answer.
* Treating "decide for me" as a reason for optional interviews, or as a waiver of every approval and evidence requirement.
* Forgetting to record established constraints in a working brief.
* Reopening an established citation convention or asking solely because the documented Harvard fallback applies.
