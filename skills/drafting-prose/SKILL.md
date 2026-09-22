---
name: drafting-prose
description: Use when writing new prose, continuing an existing report or thesis section, or substantively recomposing content within the requested scope.
---

# Drafting Prose

Retain the approved heading hierarchy and protected source criterion titles
under [outline structure and evidence readiness](../../references/outline-structure.md).
Do not rename level-1 titles or flatten numbered main points/subpoints during
drafting. Hypothetical evidence stays labeled and separate from actual results.

For adopted [persistent work tracking](../../references/work-tracking.md),
consume only the assigned item, actual target revision, criteria/decision
references and relevant source excerpts. Return changed artifact identities,
coverage and gaps for the editor's checkpoint. Project descriptions belong only
where that item's requirements call for them. Do not start another tracker or
promote a draft to the approved baseline.

Family skill for composing new report or thesis content after applicable scope and outline conditions are met. It selects a writing specialist. It does not replace the workspace lifecycle or invent approvals.

Apply the [workflow continuity contract](../../references/workflow-continuity.md)
when the request changes. For continuation or revision, follow the
[document continuity contract](../../references/document-continuity.md): obtain
the source profile, insertion point, adjacent excerpts, and evidence before
composing. Use reading/analysis for missing context, then return here without
restarting already satisfied gates. New file receipt alone is not permission to write.

Follow the [criteria-writing contract](../../references/criteria-writing-contract.md), the [language policy](../../references/language-policy.md), and the [academic writing style guide](../../references/academic-writing-style.md).

Before composing, you MUST execute `read_file("../../references/academic-writing-style.md")`
through the host adapter, resolving the path from this skill's directory, and
read the returned guide. A link, remembered summary, or router invocation is not
a substitute. Apply S1 to vary sentence cadence by function: concise limits,
clear explanations, and longer sentences only where the reasoning needs them.
Avoid uniformly long compound sentences; do not impose sentence-length quotas.
Apply F1/R4 to remove empty AI clichés and inflated promotional language while
preserving supported technical meaning, accurate quotations, and required names.

## When to use

New sections or full-document prose against criteria, a working brief, and an evidence register, when the authorized operation is draft or a substantive compose.

## When not to use

Analysis-only or outline-only requests. Typo, wording-only, or format-only edits of an existing artifact (`editing-documents`, `formatting-layout`). Spreadsheet, presentation, image, or conversion work.

## Prerequisite check

Drafting-prose consumes recorded decisions. It cannot create, waive, or infer user approval. Silence, elapsed time, or a reply to a different question is not approval. Authored content defaults to English unless an explicit language override is recorded.

Apply [criterion-level analysis and two stops](../../references/criteria-writing-contract.md#criterion-level-analysis-and-two-stops).
The two-stop rule applies to all sections, chapters, parts, and criteria of
deliverables (e.g. “Section 1: Project Overview”, “Introduction”, or “P1”).

Never invent project names (e.g. fictitious apps/companies like "SpeedyBite"),
consulting roles, business context, budgets, SLAs, latency targets, or operational
metrics. If unstated in source documents or prompt, ask the user or mark as a
blocking gap; never fabricate project facts.

Conversational dialogue follows the user's conversational language (e.g. Vietnamese);
authored deliverables default to English. Never interleave bilingual translations
or explanations into chat responses.

Before composing:

1. Confirm `task_mode` is draft or an authorized substantive compose. Stop at analysis or outline if that was the request.
2. When the scope gate applies, confirm `scope_status` is `confirmed` or `waived`. If it is required and still `pending` or missing, return the gap to `scoping-the-brief`. Do not impose criteria-writing gates on unrelated prose with `not_required` decisions.
3. Confirm `outline_status` is `approved`, `waived`, or `not_required` under the contract. If `pending`, `not_started`, or `revision_requested`, return to `planning-work`. A complete specification in the prompt is not outline approval; do not compose the section yet.
4. Inspect the evidence register and `blocking_gaps` for the target section. Follow the contract Missing Evidence Protocol. Do not invent measurements or project results.

## Select a writing specialist

You MUST execute `invoke_skill(name)` through the host adapter to load the selected
writing specialist before composing. Read its result; merely naming the skill or
applying generic writing knowledge does not satisfy this requirement. Load one
writing specialist for the section's job. Do not default to both on every paragraph.
Add optional mathematics support through `working-with-mathematics` only when
the section needs mathematical interpretation, derivation or checking. It returns
assumptions, notation, numbered steps and check evidence; the writing specialist
integrates them without independently rewriting the formulas. Follow the
[mathematics handoff](../../references/mathematics-checks.md) and, for Word output,
the [native Equation contract](../../references/math-in-documents.md). Pure Equation
formatting does not require a new proof or a new outline decision.

| Situation | Specialist |
|---|---|
| Technical, business, or operational report structure; problem, method, observed results, and evaluation | `writing-reports` |
| Scholarly argument, thesis prose, hedging, and claim–evidence cadence | `writing-academic-prose` |
| Project or thesis report that needs both structure and scholarly argument | both, assigned by section |

Use `invoke_skill(name)` to load the specialist. Pass the target section, applicable
decisions and version, criteria mapping, evidence register, unresolved gaps, and
relevant continuity profile with adjacent source excerpts. This bounded context
must support continuity without passing the entire conversation.

## Procedure

1. Run the prerequisite check. Stop and hand back if it fails.
2. Read the required style guide and invoke the selected writing specialist(s) for the assigned section using actual tool calls.
3. Compose only authorized content. Use the contract's neutral placeholder when a permitted incomplete draft is allowed.
4. Execute `invoke_skill("reviewing-work")` before delivering the draft, including chat-only prose. Have it apply prose and coherence review with the loaded role instructions, including S1 and F1/R4. Fix blocking findings within the approved scope and recheck affected passages. Do not self-approve or postpone this review until after delivery.
5. Output the complete drafted text for the section directly into chat for user review and approval (never hide text behind a file path or merely report "saved to file"). Even if saved to a file for persistence, render the full prose in chat. File deliverables also require artifact verification before delivery.
6. STOP after delivering the section draft: wait for user review and approval before advancing to the next section or criterion. Never bundle draft delivery of section N with analysis of section N+1 in the same turn.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — brief, outline, evidence, and source artifacts.
- `write_file(path, content)` / `edit_document(file, change)` — compose or insert authorized text.
- `invoke_skill(name)` — load `writing-reports` or `writing-academic-prose`, then `reviewing-work` before delivery.
- `delegate(role, context)` — optional executing or review roles; do not dispatch the full lifecycle.

## Dependencies

- Follows `scoping-the-brief` and `planning-work` when those gates apply.
- Uses `writing-reports` and/or `writing-academic-prose`.
- Precedes `reviewing-work`, then `verifying-artifacts` for file deliverables.

## Fallback

If a required writing or review skill cannot be loaded, stop the affected stage
and report the missing capability; do not compose from generic knowledge or
claim a review occurred. If file write is unavailable, the loaded specialists
may compose and review text for chat delivery without claiming a file was created.

## Common mistakes

- Inferring scope or outline approval from silence.
- Drafting analysis-only or outline-only requests.
- Inventing benchmark numbers to fill a criterion.
- Skip-approval or write-now is not a language instruction; conversation language still does not select output.
- Inventing SLAs, on-call coverage, or tools absent from the supplied facts.
- Inventing fictitious project names, consulting roles, budgets, or operational metrics.
- Interleaving bilingual translations or explanations in chat responses.
- Reusing hypothetical illustration numbers in a conclusion as operational proof.
- Calling both specialists on every paragraph by default.
- Hiding drafted text behind a file path without outputting the full text into chat.
- Continuing to the next section or criterion without stopping for user review of the current section draft.
- Skipping `reviewing-work` or invoking it only after delivering substantial prose.
