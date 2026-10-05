---
name: brainstorming
description: Use when several valid document interpretations, organizations, evidence placements, or visuals remain and the user has not chosen one.
---

# Document Brainstorming

Choose among genuinely viable document approaches without writing the downstream analysis, outline, or content. This is a document-decision skill, not a software-design skill: never design software, APIs, data models, or code. Do not copy a software-design brainstorming procedure into document work. It does not write a technical specification or an implementation sequence.
`using-workspace-superpowers` selects this skill only after it identifies an unsettled document decision. It returns the user’s choice to `scoping-the-brief`, `analyzing-artifacts`, or `planning-work`; it does not replace any of them.

## Use when

Load this skill only when all required facts for the current decision are available and at least two valid document approaches remain. Typical decisions include:

- interpreting an otherwise consistent requirement in more than one defensible way;
- organizing sections, evidence, tables, or diagrams;
- choosing whether a visual belongs at one of several valid locations.

Do not use it for missing evidence, an unresolved contradiction, a settled structure, a mechanical edit, a named continuation with an approved structure, Simple Q&A, or Coding work. Missing evidence returns to `scoping-the-brief`; a source contradiction remains unresolved rather than being voted away.

## Method

1. **Name the decision.** State the exact choice that is open, the requested stopping point, and the constraints already settled. Separate source requirements, user decisions, proposals, and unknowns.
2. **Build comparable options.** Present 2–3 real options only. Evaluate every option using the same relevant criteria: requirement coverage, evidence fit, continuity with existing material, reader clarity, effort, and risk. For each option state what it includes, what it excludes, and its main trade-off.
3. **Recommend, do not decide.** Recommend one option with reasons tied to the criteria. A recommendation is not the user's selection.
4. **Stop for the choice.** Ask the user to choose or correct the options. Do not create the analysis, detailed outline, draft, asset, or file while the choice is pending.
5. **Return the decision.** After the user chooses, summarize the selected option, scope, exclusions, and any correction. Hand that decision and its source locators to the calling skill. If a structured question card was used, confirm its selection in chat before treating it as locked.

### Decision flow

```text
Several approaches remain?
  no  -> return to the calling skill; do not invent another option
  yes -> compare 2–3 options using the same criteria
          -> recommend one
          -> wait for the user's choice
          -> return the chosen scope to the calling skill
```

## Example

**Open decision:** A supplied report supports either a chronological structure or a theme-based comparison; all required evidence is already inspected.

| Option | Requirement coverage | Evidence and continuity | Reader clarity / effort |
|---|---|---|---|
| Chronological | Covers the comparison through the source sequence. | Keeps the supplied order and evidence together. | Easy to trace events; cross-section comparison takes more reader effort. |
| Theme-based | Compares alternatives under the requirement's shared dimensions. | Reuses the same evidence, reorganized by theme with source locators preserved. | Easier side-by-side judgment; requires more cross-references. |

Recommendation: theme-based, because the requirement asks for comparison under common dimensions. The user still chooses; no outline is written yet.

## Handoffs and boundaries

Follow the [workflow continuity contract](../../references/workflow-continuity.md), [language policy](../../references/language-policy.md), [guided questions](../../references/guided-questions.md), and [outline structure](../../references/outline-structure.md). Scope and evidence rules remain in the [criteria-writing contract](../../references/criteria-writing-contract.md).

- Return to `scoping-the-brief` when a required fact or evidence item is missing.
- Return to `analyzing-artifacts` when the decision depends on interpreting a source.
- Return to `planning-work` when the user chooses an organization, evidence placement, or visual plan.
- Return the choice to the caller; do not draft within brainstorming. The choice resolves only this decision. Drafting still requires an authorized writing request and applicable scope, outline, and evidence prerequisites; reuse decisions that already apply.

## Required capabilities

Abstract capabilities are resolved by the host adapter; their names do not imply that a particular tool is available.

- `read_file(path)` — inspect settled constraints, source locators, and prior decisions.
- `invoke_skill(name)` — return to the appropriate calling skill after the user chooses.

## Fallback

If fewer than two defensible approaches exist, report that the approach is settled and return to the caller. If the user does not choose, keep the decision pending. Never invent a second option merely to fill a template.

## Common mistakes

- Treating a recommendation as a user decision.
- Comparing options with different criteria or hiding their exclusions.
- Using brainstorming to resolve a source contradiction or missing evidence.
- Designing software instead of choosing a document approach.
- Writing the next stage before the user chooses.
- Inventing a Back button for a host question card; the host schema has no back parameter and no Back control.
