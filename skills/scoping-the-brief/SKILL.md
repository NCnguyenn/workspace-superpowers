---
name: scoping-the-brief
description: Use when material workspace requirements are unclear, report or thesis criteria need interpretation, or applicable scope confirmation is unresolved.
---

# Scoping the Brief

Resolve blocking ambiguity and establish an actionable working brief for substantial workspace tasks.

Apply the [workflow continuity contract](../../references/workflow-continuity.md).
Consume partial answers without discarding other context. If the user asks a side
question or supplies a file instead of answering, route that request and keep only
the still-relevant question pending. Reuse facts and decisions already established.

## When to use

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

1. Extract criteria from chat, supplied instructions, or artifacts already read. Record `task_mode`, original `criteria` with source/locator, obligations, and included/excluded `scope` in the [brief](../../templates/brief.md) or conversation state. Do not ask users to enter internal fields.
2. Inspect available evidence first. Maintain `evidence_register` and `blocking_gaps`: identify what is missing, which claim it supports, and what resolves the gap. Apply the contract's Missing Evidence Protocol; block dependent assertions while continuing authorized independent work.
3. Separate clarification from confirmation. Ask questions only about material unknowns. Reuse applicable `scope_status` values of `confirmed` or `waived` and their `approval_record`; do not interview again. If confirmation is required and unresolved, summarize scope, set `pending`, and await the user's decision. Silence or an unavailable response is not approval.
4. For `analyze`, deliver interpretation, obligations, scope, and evidence needs, then stop. Do not request approval of an unrequested outline. For `outline`, pass sufficiently clear scope to `planning-work` without imposing a drafting gate. For `draft` or substantive `revise`, resolve only applicable scope prerequisites, then hand off outline decisions to `planning-work`.
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

Interactive questions, when needed, are asked of the user in the conversation. They are not a named capability.

## Dependencies

- Preceded by `reading-artifacts` and `analyzing-artifacts` when source files or rubrics exist.
- Leads to `planning-work` for requested outlines, applicable criteria-writing outline prerequisites, or complex work needing a plan. Analysis-only requests stop at analysis.

## Fallback

For criteria writing, the criteria-writing contract controls fallback: an unavailable answer never confirms scope, approves an outline, or resolves missing evidence. Return authorized analysis or a provisional outline and identify blocked parts; do not draft dependent content by assumption. For other tasks, disclose safe working assumptions and proceed only with supported work. Do not invent sources.

## Common mistakes

* Asking questions on a trivial edit or typo fix.
* Asking for information already specified in the prompt or rubric.
* Asking endless open-ended questions instead of proposing concrete defaults.
* Treating "decide for me" as a reason for optional interviews, or as a waiver of every approval and evidence requirement.
* Forgetting to record established constraints in a working brief.
* Reopening an established citation convention or asking solely because the documented Harvard fallback applies.
