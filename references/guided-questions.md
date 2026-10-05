# Guided Questions and Approval Decisions

Use this contract for clarification, evidence interviews, and user decisions during Workspace scoping and planning. It distinguishes two different actions:

- **Clarification:** obtain a missing fact or choose among material alternatives.
- **Approval:** obtain a decision about a complete, visible proposal already shown to the user.

A clarification answer does not approve a proposal. An approval does not supply missing evidence. Follow [workflow continuity](workflow-continuity.md) for scope changes and [criteria-writing contract](criteria-writing-contract.md) for criteria-based authoring decisions.

## Before asking

1. Inspect supplied sources and recorded answers first.
2. Identify the exact decision, evidence gap, or dependency that cannot proceed without an answer.
3. Ask one decision at a time with a focused question. Ask the next question only when the answer leaves another material gap.
4. Give two or three meaningful options when that improves understanding, allow free text where the host supports it, and explain a real trade-off when recommending an option.
5. Do not ask for information the source already settles, or turn a mandatory source requirement into an optional choice.

Do not invent programmes, units, grade bands, organizations, project names, budgets, timelines, or metrics. Examples such as BTEC, P1, M1, D1, or a unit number are not options unless the user supplied them. If the user did not provide a rubric, do not open a programme card.

## Clarification and evidence questions

Use ordinary chat for routine clarification. Use a structured question only when the host supports it and the choice is materially easier to answer that way, such as a scoped evidence decision or an explicitly requested card.

For a required missing fact, ask one focused question after source inspection. State briefly which current decision needs the answer. For missing project metrics, ask whether the user can provide real data or explicitly authorizes illustrative material for the identified gap. Keep `evidence_readiness: pending` until the required material is inspected or scoped illustrative permission is confirmed.

A preselected option, cancellation, timeout, empty result, silence, tool acknowledgement, or unrelated reply does not resolve the gap. An evidence card does not authorize an approval card. Continue independent authorized work only; do not present an affected completed analysis for approval while the prerequisite remains unresolved.

## Approval of visible content

Approval requires a complete analysis or detailed outline in the same chat response as its natural review question: show the content first and ask the question last. Identify the target section and revision.

Internal reasoning, a tool result, a file path, a promise to show content later, or a saved internal document is not displayed content. Do not prepare the dependent stage before the user responds. Analysis approval and detailed-outline approval are separate decisions on separate turns. An outline-only approval never silently authorizes a full draft.

Use ordinary chat for approval by default. Use a card for approval only when the user explicitly requests that interaction and the host permits it. If the host cannot show that message before the card, end with the complete proposal and a chat question and end the turn. If the proposal was never prepared, prepare it first; do not claim to redisplay nonexistent text.

Keep internal status values and labels out of user-facing wording. In particular, do not use “Stop 2”, “Gate 1”, or translations of those labels in a question or option. Name the actual next work instead.

## Structured-card boundary

A host adapter may document a question-card schema. Inspect the current schema before invoking a card. The inspected PI-Desktop card schema accepts `question`, `options`, and `multiSelect`; it has no back parameter. The card has no Back control. This is a host gap. Do not invent a Back button, back parameter, or simulated control.

When a requested structured question is available, invoke it rather than imitating an unavailable tool call in prose. Writing choices in prose is not a substitute for an actual requested card. When no card is available, is disabled, cannot be used for approval, or cannot display the proposal first, use the equivalent short chat question and wait.

After a card returns, summarize the selected answer in the language of the user's current message and ask the user to confirm or correct it in chat. A card selection is not locked until the user confirms that summary. Preserve the correction with the same target and scope; do not invent numbers while summarizing.

## Visible delivery and recovery

If the user says they cannot see an analysis or outline, acknowledge the issue briefly, redisplay the complete proposal in chat, keep approval pending, and end with one natural review question. Do not open another approval card and do not treat the visibility complaint as approval.

If required evidence is still missing, explain the gap and ask the focused evidence question instead of asking the user to approve unfinished analysis. If the user says the proposal was never prepared, load the responsible skill and prepare it first.

## Decision records and examples

Record the actual answer with the displayed criterion/section, revision, scope, and source locator in the existing approval record. Reuse a clear applicable decision rather than asking again. If a short answer could apply to more than one pending proposal, ask a narrow clarification.

| Situation | Correct action | Do not |
|---|---|---|
| Missing benchmark input for an applied criterion | Ask what data exists or whether illustrative material is authorized for that gap. | Invent a value or call a default a standard. |
| Complete analysis v1 is visible | Ask whether the user approves analysis v1 so the detailed outline may be prepared. | Include the detailed outline in the same approval response. |
| Complete outline v2 is visible | Ask whether the user approves outline v2 for the requested draft. | Treat outline-only approval as a request for prose. |
| User cannot see the outline | Redisplay the complete outline and keep approval pending. | Open another approval card or mark it approved. |
| Card selection returned | Summarize it and ask the user to confirm or correct it. | Treat the selection as final or claim a Back control exists. |

A clear instruction such as “change heading B as follows, then write” may authorize that exact revised scope and continuation under the [criteria-writing contract](criteria-writing-contract.md). It does not waive unrelated evidence, scope, or file-verification requirements.
