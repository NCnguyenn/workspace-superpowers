---
name: scoping-the-brief
description: Use when material workspace requirements are unclear, report or thesis criteria need interpretation, or applicable scope confirmation is unresolved.
---

# Scoping the Brief

## Job

Turn inspected requirements into an actionable, bounded brief. This skill identifies what is already known, what is missing, and which decision must come from the user. It does not invent facts, approve an outline, or begin drafting.

Use the [workflow continuity contract](../../references/workflow-continuity.md). For sustained work, inspect an adopted plan under [persistent work tracking](../../references/work-tracking.md) before asking for information that is already recorded.

## Use when

Load this skill for a material ambiguity that changes the deliverable: an unclear objective, audience, criterion, evidence need, target format, scope boundary, or approval state. Use it for requested criteria analysis and applicable scope confirmation under the [criteria-writing contract](../../references/criteria-writing-contract.md).

Do not load it for a typo, a small wording correction, a direct formatting change, or a fully specified task with valid recorded decisions. Do not reopen an applicable confirmed or waived decision.

## Inputs and output

**Inputs:** the current request, inspected source artifacts, prior decisions, evidence locators, existing plan checkpoint, and any named target section.

**Output:** a concise working brief or scoped analysis handoff containing known constraints, unresolved material questions, evidence readiness, source locators, and the exact next authorized operation.

## Method

1. **Inspect before asking.** If files, a rubric, template, or prior brief exist, use `reading-artifacts` and `analyzing-artifacts` first. Do not ask for a fact already available in an accessible source.
2. **Classify the gap.** Separate source requirements, user decisions, AI proposals, and unknowns. Ask only when an answer changes content, evidence, format, scope, or a required decision.
3. **Ask one focused question.** Explain the current decision and offer real choices when useful. Keep questions about missing evidence separate from approval of visible content.
4. **Record a usable brief.** Capture purpose, audience, deliverable form, source title and locator, preserved constraints, evidence status, blocking gaps, and the resolved deliverable language. English is the default under the [language policy](../../references/language-policy.md) unless the user explicitly requests another deliverable language. Chat explanations follow the language of the user's current message; do not default that language to Vietnamese. Explain any necessary source term in the same sentence; do not produce a line-by-line translation.
5. **Hand off at the correct boundary.** Analysis-only work ends with analysis. A requested outline goes to `planning-work` only after applicable evidence and analysis requirements are resolved. A draft or substantive revision retains its requested outcome but waits at unresolved prerequisites.

### Evidence decision

```text
Does the current requirement need a missing fact, metric, screenshot, result, or source?
  no  -> record evidence_readiness: not_required; continue the applicable route
  yes -> identify the precise claim and missing input
         -> ask for real data or scoped illustrative permission
         -> keep evidence_readiness: pending until the answer is confirmed
```

## Initial guides, completed work, and continuity

For an initial supplied brief, rubric, or graded guide with **no named section** or narrower operation, prepare an intake map before any setup interview. An opening question about the parts, criteria, or structure of a guide is not Simple Q&A and not a narrower operation. Map deliverables, each criterion’s required work, failure constraints, source locators, contradictions, and only decisions the source does not settle.

For a named section, continuation, or narrow comparison, reuse the intake map and inspect only the affected material. A completed assignment read-back stays a read-back. When comparing completed work with a later guide, identify remaining criteria through a narrow comparison rather than restarting intake.

## Criteria-based writing

Apply [outline structure and evidence readiness](../../references/outline-structure.md) and [criterion-level analysis and two stops](../../references/criteria-writing-contract.md#criterion-level-analysis-and-two-stops). The two approvals apply to each requested section or criterion, but they are not extra ceremonies for mechanical work. Reuse a `scope_status` that is `confirmed` or `waived` when its recorded scope applies; silence is not approval.

Maintain these fields in the existing brief or conversation state; do not ask the user to fill internal labels:

- `task_mode`, `criteria`, `scope`, `scope_status`, and `approval_record`;
- `evidence_register` and `blocking_gaps` with source locators and limits;
- `source_title`, `source_locator`, and `evidence_readiness`.

### Requirement analysis

Before presenting the requirement analysis, inspect the original wording, available sources, and prior answers. Identify command verbs, cognitive depth, in-scope and out-of-scope boundaries, general theory versus scenario application, required evidence, visuals, and citations. Explain necessary source terms in the same sentence as the analysis.

This is **not a mandatory interview for every section**. A theoretical requirement can record `not_required` and continue without metrics. Do not hold it for evidence required only by a later section. If the current target needs absent scenario evidence, ask whether the user can supply **real data** or explicitly authorize an **illustrative** example for the named gap. Ask this before presenting the requirement analysis. A preselected option, silence, partial answer, cancellation, or general approval leaves the state pending. Any optional number is hypothetical, not a BTEC standard or benchmark.

When evidence is pending, return a gap diagnosis and targeted questions, not a completed analysis for approval. Apply the contract’s **Missing Evidence Protocol**. Do not make up a project name, business domain, budget, SLA, performance result, citation, or a later assignment such as a functional prototype. If a fact is needed and unsettled, ask before using it.

If the facts are sufficient and two or more interpretations remain, load `brainstorming`, compare 2–3 options, recommend one, and wait for the user’s choice. Do not use brainstorming to resolve a source contradiction.

After completing the analysis, display it in chat and wait for approval before preparing a detailed outline. Silence is not approval. Use [guided questions](../../references/guided-questions.md) for visible delivery and recovery; a question card has no back parameter and no Back control. This is a host gap: do not invent a Back button. A card selection is not locked until the user confirms; summarize the selection and ask the user to confirm or correct it in chat.

## Project-folder boundary

For a folder-based report, follow [project grounding](../../references/project-grounding.md). An accessible path is enough to begin read-only inspection; it does not authorize code changes, tests, builds, migrations, or project writes. Preserve the designated `context_file` identity when one exists.

## Required capabilities

Abstract capability names are resolved by the host adapter.

- `read_file(path)` — inspect text-bearing requirements and recorded decisions.
- `invoke_skill(name)` — load reading, analysis, planning, or brainstorming at the appropriate handoff.

## Fallback

For criteria writing, the criteria-writing contract controls fallback. An unavailable answer never confirms scope, approves an outline, or resolves missing evidence. Keep the dependent work pending and state the precise gap. For other tasks, make only safe, clearly labeled working assumptions and proceed with independent supported work.

## Common mistakes

- Interviewing by default instead of inspecting accessible sources first.
- Asking many generic questions rather than one decision that changes the deliverable.
- Treating “decide for me” as permission to invent evidence or waive every approval.
- Confusing evidence permission with analysis or outline approval.
- Treating a completed assignment as a new assignment intake.
- Turning the conversation language into a deliverable-language instruction without an explicit request.
