---
name: brainstorming
description: Use when several valid document interpretations, organizations, evidence placements, or visuals remain and the user has not chosen one.
---

# Document brainstorming

Choose among valid document approaches. This is not a software-design skill. Do not copy a coding brainstorming skill, and do not design software, APIs, data models, or code. It does not write a technical specification or an implementation sequence.

Selected by `using-workspace-superpowers` when more than one valid document approach remains. It does not replace `scoping-the-brief`, `analyzing-artifacts`, or `planning-work`, and it does not authorize analysis, an outline, or a draft by itself.

## When to use

- After an evidence interview, once the required facts are sufficient and before requirement analysis, when more than one valid interpretation remains.
- During `analyzing-artifacts`, when the same inspected source supports more than one reading and the source does not contradict itself.
- During `planning-work`, when more than one valid way to organize sections, evidence, tables, or diagrams remains.

## When not to use

- Required evidence is still missing. Return to `scoping-the-brief` and wait.
- The source or the user has already settled the approach.
- The request is one mechanical edit, a named continuation with an approved structure, or Simple Q&A.
- An unresolved contradiction inside a source. Do not pick a side. Leave it unresolved.
- Software design, architecture, or coding.

## Procedure

1. State the open decision and the constraints already settled. Do not invent metrics, citations, a later-assignment deliverable, or scope details the user has not confirmed.
2. Present 2–3 valid options in the language of the user's current message. For each option, say what it includes, what it excludes, and the tradeoff against the criterion. Explain any necessary source term in the same sentence. Do not produce a line-by-line translation.
3. Recommend one option and say why. A recommendation is not a selection.
4. Stop. The user chooses. Do not select one and write the analysis, outline, or section.
5. If the user corrects an earlier card choice, summarize the correction in chat and wait for confirmation. A card selection is not locked until the user confirms that summary.

The host question card has no Back control, and its schema has no back parameter. This is a host gap. Do not invent a Back button. Correction happens in chat.

Follow the [workflow continuity contract](../../references/workflow-continuity.md), the [language policy](../../references/language-policy.md), [guided questions](../../references/guided-questions.md), and [outline structure](../../references/outline-structure.md). Scope and evidence rules remain in the [criteria-writing contract](../../references/criteria-writing-contract.md).

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — inspect the settled brief, source locators, and approved constraints.
- `invoke_skill(name)` — return to `scoping-the-brief`, `analyzing-artifacts`, or `planning-work` after the user chooses.

## Dependencies

- Follows sufficient evidence from `scoping-the-brief`, or an inspected reading from `analyzing-artifacts`.
- Hands the user's choice to `planning-work` when the open decision is organization, evidence placement, or visuals.
- Does not precede drafting. Outline approval remains a separate decision.

## Fallback

If fewer than two valid approaches exist, say so and return to the calling skill. Do not invent a second option to fill the set. If the user does not choose, keep the decision pending.

## Common mistakes

- Copying a software-design brainstorming procedure into a document task.
- Treating the recommendation as the user's choice.
- Writing the analysis, outline, or section before the user chooses.
- Inventing a Back button for the host question card.
- Using brainstorming to resolve a contradiction the source leaves open.
