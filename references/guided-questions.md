# Guided questions and approval decisions

Use with scoping and planning. Ask one decision at a time, after inspecting
available sources and recorded answers. A question can clarify an unknown or
approve a visible proposal; these are different purposes.

## Interaction

For a missing fact, ask one focused question after checking the supplied sources
and previous answers. Explain briefly which current decision needs the answer.
Use two or three meaningful options when they help, and accept free text. Ask
the next question only if the previous answer leaves another material gap.

For approval, deliver the complete analysis or detailed outline in the same chat response
as its natural review question, with the content first and the question last.
Identify the target section and revision. Internal reasoning, a tool result, a
file path, and a promise to show content later do not count as displaying it to
the user. End the response and wait; do not prepare the dependent stage yet.

Use ordinary chat for routine interviews and approval decisions. A tool being
available does not require a card. For upfront clarification of missing required
scenario metrics, use a structured evidence question when available and permitted
by the host; ask for real data or scoped illustrative permission before presenting
the completed analysis. For clarification, a complex choice may warrant a card.
For approval, use a card only when the user explicitly requests that interaction
and the host permits approval through that tool. Deliver the full proposal in a
visible chat message before calling it. If the host cannot show that message
before the card, deliver the proposal with a chat question and end the turn.
Resolve the tool through the host adapter, inspect its current schema, and invoke it
only for the applicable question after satisfying the display requirement.
Writing choices in prose is not a substitute for that tool call when a card is
requested. Never invent a tool call or claim a widget was displayed. Preserve
the user's selected interaction style within its scope across follow-ups.
Using an evidence card does not authorize an approval card.

Offer two or three concise, meaningful choices and allow free text when the host
supports it. Explain tradeoffs for genuine alternatives, recommend one when
justified, and do not turn a mandatory source requirement into an optional choice.
The two-stop rule applies across all sections, chapters, parts, and criteria
(e.g., “Section 1: Project Overview”, “Introduction”, or “P1”).
For analysis approval, use choices such as “Approve analysis; prepare detailed outline”
and “Revise analysis”. For outline approval, use “Approve outline; write section”
(or “Approve outline; write P1”) and “Revise outline” when drafting is already requested.
These are two separate questions on separate turns, not a combined permission to complete everything.
An outline-only task's approval choice must not silently authorize a full draft.

Use conversational language for questions; apply the deliverable language policy
to the actual analysis, outline and report. Questions need no separate skill or
user-managed form. Keep internal status values out of user-facing choices.
Keep labels such as "Stop 2", "Gate 1" and their translations out of all question and option
text, including parenthetical labels. Name the actual next work instead.

## Visible delivery and recovery

If the user says they cannot see the analysis or outline, acknowledge the missing
visible content briefly and redisplay the complete proposal in chat. Keep its
approval pending, then ask one natural review question at the end. Do not open another approval card
or treat the complaint as approval. If the proposal was never prepared, load its
responsible skill and prepare it first; do not claim to redisplay nonexistent text.
If required evidence is still missing, explain that gap and ask the focused
evidence question instead of asking the user to approve an unfinished analysis.

## Availability and answers

If the interface is unavailable, disabled in the current mode, or cannot be used
for approval, show the same short choice in ordinary chat and wait for the reply.
Text fallback preserves the gate. Do not ask the user to install a tool merely
to answer. A preselected option is not user approval. Empty results, cancellation,
timeouts, tool acknowledgements and unrelated replies leave the decision pending.
If a higher-priority host rule requires progress after an unanswered optional
question, continue only independent authorized work, not gated drafting.

Record the actual user's answer with the displayed criterion/version in the
existing approval record. Interpret short answers using the pending question;
ask only if their applicability is unclear. An explicit instruction to change
the proposal and continue may authorize the clear change under the shared
[criteria-writing contract](criteria-writing-contract.md). Reuse it rather than
requiring another click. Attachments supply evidence, not approval by themselves.
