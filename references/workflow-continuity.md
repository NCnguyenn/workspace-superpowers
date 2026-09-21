# Workflow Continuity

Shared coordination rules for every workspace skill. The current user request
and applicable prior instructions determine the work; a workflow is not a script
the user must follow. The workspace router owns routing. Specialists perform
their assigned operation and return results or gaps without expanding it.

## Interpret each new message

Read the message together with the active task, pending questions, and relevant
earlier decisions before the next action. A message may both answer a question
and add a file or change scope. Apply each part to its affected work; do not force
the whole message into one category. Infer ordinary typos and shorthand from
context; ask only when competing interpretations materially change the result.

| Message intent | Action | State to retain |
|---|---|---|
| Answer or approval | Apply only to the question, section, and version actually answered. | Other questions remain unresolved; partial answers are not blanket approval. |
| Side question or status request | Answer normally using the appropriate skill, or directly for simple Q&A. Then resume independent authorized work if it can proceed. | Goal, progress, decisions, and pending questions. Do not force the user to answer an unrelated gate first. |
| New file or evidence | Use `reading-artifacts`, then analysis/domain skills as needed; map it to the current request before continuing. | Source identity/version, what it supports, affected gaps and outputs. Receipt alone does not approve an outline or authorize an edit. |
| Correction or refinement | Update affected scope, facts, or output; select the skills needed for that change. | Unaffected decisions and completed work. Invalidate only dependent assumptions, draft passages, or checks. |
| Temporary switch: “do this first” | Save the current checkpoint and perform the requested task. Resume afterward when that sequence was requested and prerequisites allow it. | The return point and unanswered decisions; do not silently drop the original task. |
| Replacement or cancellation | Stop work on the superseded scope; route the replacement if supplied. | Completed artifacts and useful context. Do not resume canceled work or delete files merely because the task was canceled. |
| Pause | Stop the paused scope and retain its checkpoint. | Await a resumption instruction; a question about it alone does not authorize execution. |
| Resume or “continue” | Resolve the intended task/section from the conversation; check relevant source and decision freshness, then take the next authorized action. | Existing scope, style, evidence limits, and approvals. Ask only if the target or a required prerequisite is genuinely unresolved. |

Treat a new message as steering the active task unless the user clearly replaces,
cancels, or pauses it. If an unrelated substantial request has an unclear relation
to the current work, handle its clear independent portion and ask only about the
ambiguous ordering. Do not automatically restart an interview or erase context.

## Compact checkpoint and handoff

Keep a proportional checkpoint in conversation state or the
[working brief](../templates/brief.md); no extra file, service, or user form is
required. For a one-step task, a short note is sufficient. For sustained work retain:

- Goal and currently authorized operation; target artifact/section and stopping point.
- Constraints, preserve-list, deliverable language, and applicable scope/outline decisions.
- Input/output identities and revisions, what was actually inspected, and relevant locators.
- Current stage, completed work, next action, and any temporary task's return point.
- Pending questions and evidence gaps, with the particular actions they block.
- For existing prose, the [document continuity profile](document-continuity.md).

Pass only the relevant portion to each specialist or role. Include actual source
excerpts needed to judge a passage, not only a style label or filename. The
orchestrator retains the checkpoint; specialists return results, source locators,
changed assumptions, limitations, and the next dependency. Roles do not need
the whole conversation. On resumption after context loss, reconstruct from
available records and artifacts; never invent an approval or claim perfect memory.

## Files arriving during work

1. Identify whether each file is the document to continue, evidence, a rubric,
   a style sample, or a replacement version. A file may have multiple roles.
   Prefer the user's stated role; ask only if the distinction changes the action.
2. Read its real accessible representation. Record the path/attachment identity,
   revision or observed timestamp, inspected sections/pages/sheets, and limits.
   Reuse a prior read only when the artifact is unchanged and the relevant content
   is still available; re-read changed or previously uninspected portions.
3. Analyze relevance, contradictions, and affected requirements. Newer does not
   automatically mean authoritative. A style sample is not a source of project
   facts. Report conflicting sources without silently choosing favorable data.
4. Update the checkpoint and evidence register; revisit dependent prose, tables,
   figures, conclusions, and stale verification. Preserve unaffected decisions.
5. Return to the user's requested operation. Missing access blocks only dependent
   work. Explain the missing representation without guessing its contents.

## Flexible routing with bounded authorization

Load the selected skill before relying on its instructions. Handoff references
are not evidence that a skill was loaded or that a tool is available. Do not load
the entire catalog for each message. If a skill is unavailable, use a supported
fallback and state the limitation; never claim the missing capability ran.

An audit-only request produces findings, an outline-only request produces an
outline, and a formatting-only request preserves substantive content. A skill's
later procedure steps do not authorize additional operations. Applicable writing
decisions follow the [criteria-writing contract](criteria-writing-contract.md);
reuse explicit authorization and waivers instead of requesting them again.
Required unanswered decisions block their dependent action, not side questions
or other authorized work. Silence and off-topic answers never resolve a gate.

Review substantial content. Reopen final files after their latest modification
or export, even when resuming a previous task. Keep content readiness separate
from file integrity. Route Coding slices to `using-superpowers` and use Workspace
skills only for the Workspace slice.

## Example

While outline v2 is pending, the user says: “What does p95 mean? Read this CSV
for criterion 2 as well.” Explain p95, read and analyze the CSV, and update the
evidence and affected outline points. Keep approval pending unless the user
also approves the relevant version. If the user then says “Apply that change
and write criterion 2,” reuse this clear authorization for that section and
continue once its remaining evidence prerequisites are met.
