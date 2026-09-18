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
* **Ask only what is material:** Inquire only about decisions that change the deliverable: audience, purpose, language, deliverable format(s), length/page constraints, rubric obligations, citation style, source location, and output location. Do not hardcode a citation style. Resolve deliverable language under the [shared language policy](../../references/language-policy.md): English unless the user explicitly requests another language. Do not infer it from conversation/source language or ask merely because language was omitted.
* **User says "just do it" / "decide for me":** Skip the interview unless the ambiguity is dangerous (destructive edit, wrong language for a graded deliverable, or fabricated-source risk). Record working assumptions explicitly. Do not invent a house citation style. Internal plan, review, and verification remain mandatory.

## Procedure

1. Inspect existing input artifacts, rubrics, and instructions before formulating questions.
2. Determine whether unresolved ambiguities would change the deliverable.
3. If material ambiguity remains and user input is accessible, ask focused, targeted questions.
4. Establish the working brief (`templates/brief.md`) recording:
   - Target audience, core purpose, and deliverable language (English by default, with any explicit user override recorded).
   - Required deliverable formats, length, and constraints.
   - Applicable rubric/template obligations and citation style, if the brief or discipline requires one.
   - Explicit working assumptions and preserved elements.
5. Hand off to `planning-work` when complexity warrants a plan; otherwise proceed to the selected specialists. Review and verification remain mandatory for substantial deliverables.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — to examine existing text-bearing rubrics, templates, or instructions.
- `invoke_skill(name)` — to load `reading-artifacts` / `analyzing-artifacts` when source files exist.

Interactive questions, when needed, are asked of the user in the conversation. They are not a named capability.

## Dependencies

- Preceded by `reading-artifacts` and `analyzing-artifacts` when source files or rubrics exist.
- Leads to `planning-work` when the task is complex enough to need an outline or deliverable contract.

## Fallback

If interactive questioning is unavailable or unsupported by the harness, document working assumptions in the brief, disclose them clearly, and proceed. Do not invent sources to fill an evidence gap.

## Common mistakes

* Asking questions on a trivial edit or typo fix.
* Asking for information already specified in the prompt or rubric.
* Asking endless open-ended questions instead of proposing concrete defaults.
* Blocking execution when user requested "decide for me", except for dangerous ambiguity.
* Forgetting to record established constraints in a working brief.
* Hardcoding APA, IEEE, or any other citation style as the package default.
