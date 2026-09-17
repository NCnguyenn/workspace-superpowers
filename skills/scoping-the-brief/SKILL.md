---
name: scoping-the-brief
description: Use when starting a complex or under-specified workspace task where missing constraints or requirements would materially change the final deliverable.
---

# Scoping the Brief

Resolve blocking ambiguity and establish an actionable working brief for substantial workspace tasks.

## When to use

Under-specified, complex, multi-stage, or graded tasks (e.g. assignments, research syntheses, client reports, presentations) where missing facts would materially alter the deliverable.

## When not to use

Trivial, mechanical, or fully specified work (e.g. typo-fixes, single-cell corrections, straightforward formatting adjustments). When the user has already provided complete requirements and constraints.

## Adaptive ceremony

* **Trivial fixes:** No interview. Proceed immediately through the core loop.
* **Inspect first:** When input files exist, run `reading-artifacts` and `analyzing-artifacts` first. Do not ask the user for information already present in the rubric, template, or draft.
* **Ask only what is material:** Inquire only about decisions that change the deliverable: audience, purpose, deliverable format(s), length/page constraints, rubric obligations, citation style, and output location.
* **User says "just do it" / "decide for me":** Skip the interview. Adopt safe standard conventions (e.g. standard margins, APA/IEEE citations, balanced tone), record these assumptions explicitly in the brief, and proceed.

## Procedure

1. Inspect existing input artifacts, rubrics, and instructions before formulating questions.
2. Determine whether unresolved ambiguities would change the deliverable.
3. If material ambiguity remains and user input is accessible, ask focused, targeted questions.
4. Establish the working brief recording:
   - Target audience and core purpose.
   - Required deliverable formats, length, and constraints.
   - Applicable rubric/template obligations and citation style.
   - Explicit working assumptions and preserved elements.
5. Hand off the brief to `planning-work`.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — to examine existing rubrics, templates, or instructions.
- `ask_user(question)` — to query the user when material ambiguity blocks execution.

## Dependencies

- Preceded by `reading-artifacts` and `analyzing-artifacts` when source files or rubrics exist.
- Leads to `planning-work` for structured task execution.

## Fallback

If interactive questioning is unavailable or unsupported by the harness, document safe standard assumptions in the brief, disclose them clearly, and proceed.

## Common mistakes

* Asking questions on a trivial edit or typo fix.
* Asking for information already specified in the prompt or rubric.
* Asking endless open-ended questions instead of proposing concrete defaults.
* Blocking execution when user requested "decide for me".
* Forgetting to record established constraints in a working brief.
