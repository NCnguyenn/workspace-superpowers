# Criteria-based Writing Contract

Shared rules for interpreting criteria, confirming scope, approving outlines, and handling evidence in report or thesis writing. This reference defines handoffs within the existing workspace lifecycle; it is not another router. Ownership defines consumer responsibilities, including drafting-prose when available. This reference does not install skills or change routing by itself.

Use the [workflow continuity contract](workflow-continuity.md) for message
changes, late files, pending questions, and resumption. Use the
[document continuity contract](document-continuity.md) for source context and
coherent continuation. These add no approval gates: reuse decisions that already
apply and return only unresolved prerequisites to their owner.

## Deliverable language

Follow the [language policy](language-policy.md): authored analysis, outlines, reports, and generated/exported artifacts default to English. Use Vietnamese or another language only when explicitly requested by the user for the relevant output. Conversation or source language does not override this default. Record the resolved language in scope and carry it through drafting, labels, placeholders, review, and export.

## 1. Activation and stopping points

Apply when the requested operation concerns understanding criteria, outlining, drafting, or substantively revising report/thesis content against explicit requirements. Criteria may be pasted in the conversation or supplied in a rubric, brief, or other artifact. Infer the operation from context; do not require users to name a skill or enter a mode value.

Do not activate approval gates merely because a prompt contains “report” or “thesis”. Typo fixes, wording-only edits, layout changes, format conversion, spreadsheet operations, and presentation operations keep their existing workflows. Omit the optional template sections entirely for those tasks.

| task_mode | Requested operation | Authorized output and stopping point |
|---|---|---|
| analyze | Read, interpret, or explain criteria and their scope | Return the interpretation, obligations, evidence needs, and material open questions. Stop at analysis. Do not produce an unsolicited outline or full draft, or demand approval for an unrequested next stage. |
| outline | Create or revise an outline | Resolve material ambiguity, produce the outline with criterion/evidence/visual mapping, and wait for feedback. Approval of an outline-only task does not itself authorize writing the full content. |
| draft | Write complete content against criteria | Confirm scope and obtain outline approval unless already satisfied or explicitly waived; then draft, review, and deliver within that authorization. Drafting remains the requested outcome while intermediate gates are pending. |
| revise | Change existing content | Read the source and honor the requested changes and preserve-list. Bounded wording edits do not reopen approval gates. Material scope, argument, or structural changes require confirmation of affected scope/outline unless already authorized or waived. Stop after the requested revision and its review/verification. |

An explicit new request can change the mode. Responding to a question, correcting an outline, or approving its structure must not be treated as permission for an unrelated operation. In an already authorized drafting task, outline approval permits continuation within its scope without asking again whether to write.

## 2. Ownership

| Owner | Responsibility | Boundary |
|---|---|---|
| scoping-the-brief | Break criteria into obligations, inspect available context, identify material gaps, and establish/record scope confirmation | Does not approve an outline on the user's behalf or expand the requested operation. |
| planning-work | Build and revise the outline, map criteria/evidence/visuals, identify its version, and receive/record the user's outline decision | Does not infer approval from silence, approve its own outline, or turn an outline-only task into drafting. |
| drafting-prose | Check applicable scope, outline, authorization, and evidence prerequisites before composing | Consumes recorded decisions. It cannot create, waive, or infer user approval to unlock drafting. Return unresolved prerequisites to their owner. |

The workspace router continues selecting lifecycle stages and specialists. Reviewing-work coordinates review; the executing role applies fixes. File deliverables retain existing verification and packaging requirements. These responsibilities do not require separate agents or a persistent state service.

## 3. Semantic state

Keep this information in the working brief, outline, or conversation state, with the same meaning wherever it is recorded. Templates do not require extra files. Record applicable fields without asking the user to fill out internal enum values.

| Field | Meaning and allowed values |
|---|---|
| task_mode | analyze, outline, draft, or revise: the operation the user authorized, not merely the current stage. |
| criteria | Original criterion text or locator, its identifier, and concrete obligations. Preserve the relation to the source; do not invent grading requirements. |
| scope | Included and excluded content, target sections, audience, language, length, and established constraints. Separate unknown constraints from confirmed ones. |
| scope_status | pending, confirmed, waived, or not_required. Confirmed requires a user decision applicable to this scope; waived requires a user instruction to skip confirmation. Not required applies where the requested operation does not need the gate, such as analysis or a bounded wording edit. |
| outline_status | not_started, pending, approved, revision_requested, waived, or not_required. Pending means awaiting a decision. Approved requires a decision for the applicable version/sections. Waived is explicit permission to omit this gate, not inferred convenience. |
| outline_version | An identifiable revision, such as v1 or v2, including an outline shown in chat. Record affected sections when approval is partial. Use N/A if no outline applies. |
| approval_record | The user's decision or faithful quotation/locator, whether it concerns scope or outline, applicable scope/sections, and outline version where relevant. Record explicit waivers here too. No decision means no approval record. |
| evidence_register | Each material claim/criterion, its source and locator, what it supports, and a status: verified, user_provided, missing, or illustrative. Record permission and local labeling for illustrative material. |
| blocking_gaps | Specific missing information/evidence, why it matters, affected claims/sections, and what resolves it. Distinguish a drafting blocker from a blocker to reporting the content as complete. |
| delivery_status | draft_incomplete or ready_after_review. Keep incomplete where required content/evidence remains unresolved. Ready applies to the output actually requested after relevant review; file delivery additionally requires verification of the final artifact. |

User_provided does not mean independently verified. Verified is limited to what the inspected source actually establishes: a README is not proof of implementation, and code alone is not proof of successful operation or measured performance. Illustrative examples are never empirical evidence of the user's project.

For analysis-only work, accurately identifying missing evidence can complete the requested analysis without making a future report ready. An outline can be delivered for review while its approval remains pending. Delivery readiness and permission to draft are separate facts.

## 4. Approval invariants and transitions

### Invariants

- Silence, elapsed time, an unavailable reply, or a reply to a different question is not agreement. Never turn those states into confirmed, approved, or waived.
- A decision is valid only for its recorded scope and applicable outline version/sections. Approval of section A does not approve a newly added section B.
- Reuse decisions available in the conversation or supplied approval record. Do not ask the user to repeat a decision solely to follow a checklist.
- A waiver concerns only the gate(s) the user waived. Skipping outline approval does not waive evidence requirements, factual fidelity, review, or verification.
- “Write a draft before the data is ready” is neither permission to invent results nor a blanket waiver of unrelated approval gates.
- Wording and typo corrections within approved scope do not invalidate substantive approval. Material scope, argument, or structural changes reopen only the affected decision unless the user already authorized that change and continuation.
- If applicability of a prior decision is genuinely unclear, ask about that uncertainty; do not assume approval or restart the entire interview.

### Transitions

| Situation | Required action and next state |
|---|---|
| Analysis requested | Analyze available content and ask only material clarification questions if needed. Scope/outline gates are not required for this output. Deliver analysis and stop. |
| Draft requested; scope not yet confirmed | Inspect context, resolve material ambiguity, summarize proposed scope for confirmation, and set scope_status to pending. Reuse an already explicit, applicable scope decision instead of asking again. |
| Scope confirmed or its confirmation explicitly waived | Record the decision. Planning-work prepares an identified outline version and sets outline_status to pending, unless a valid outline decision exists or that gate is waived. |
| Outline-only request with sufficient scope supplied | Prepare the requested outline without an extra interview. Show the version and mark approval pending. Stop and wait for feedback; do not write the report. |
| Outline changes requested without permission to continue | Set revision_requested, apply the changes, identify the revised version, and return it as pending for the affected sections. |
| Applicable outline approved | Record decision/version/sections and set them approved. Continue to content only if drafting or substantive revision was authorized and remaining prerequisites are met. |
| “Change heading B as follows, then write” | If the change and affected scope are clear, record the instruction as authorization for that revised version/section and continuation. Do not ask for the same authorization again. |
| User explicitly skips a gate | Mark that gate waived and record the instruction. Stay within the authorized operation/scope; remaining gates and evidence checks still apply. |
| Scope or outline materially changes later | Preserve unaffected decisions. Confirm the changed part when not already authorized; block dependent drafting while that part is pending. |
| No interactive response can be obtained | Explain the unresolved prerequisite. Analysis or a clearly provisional outline may be returned within the requested task, but it is not approved. Do not complete dependent report content by guessing. |

Before substantive drafting, check applicable scope/outline decisions, their scope/version, the authorized operation, and evidence needed by the target section. A permitted incomplete draft follows the protocol below; it is not an alternative way to bypass approval gates.

## 5. Missing Evidence Protocol

Apply when a criterion requires a project example, measured comparison, experimental result, system data, screenshot, or other support that is absent or insufficient for the intended claim.

1. Inspect the available prompt, files, and prior answers first. Do not request evidence already accessible or claim to have inspected an unreadable source.
2. Identify exactly what is missing, which criterion/claim it supports, and why current material is insufficient. Ask targeted questions or request concrete inputs: before/after logs under comparable conditions, benchmark settings, a dataset, or an actual screenshot of the specified function.
3. Add the gap and affected section to blocking_gaps; mark corresponding evidence missing. Suspend assertions that depend on it. Continue independent, authorized work supported without that material.
4. If the user permits writing before evidence is available, produce a clearly incomplete draft. Place neutral placeholders at affected claims, tables, or figures. Do not assume the direction, magnitude, significance, or cause of a result.
5. Use an illustrative scenario only when the user permits it. Label it at the point of use and carry the distinction into related tables, figures, and conclusions. Never cite it as a measured or implemented project result.
6. On receiving evidence, inspect what it supports, update the register, replace affected placeholders, and review dependent claims. Merely receiving a file does not establish a result.

### Standard neutral placeholder

[Before/after CPU measurements under the same test conditions are required; the direction and magnitude of change are not yet established.]

Do not substitute “CPU decreased by X%”: that already assumes a decrease. Adapt the neutral form to other missing quantities without inventing an expected outcome.

For authorized hypothetical examples, use a local label such as **“Hypothetical illustration — not a measured project result.”** Permission to write first, a request for an example from the actual project, or a waived outline gate is not permission to fabricate that example.

If real-world evidence is required by the criterion, an illustration does not satisfy it. Keep the report draft_incomplete while mandatory evidence/content is missing, and list what remains to be supplied. Do not describe it as completed merely because the prose reads smoothly.

## 6. Criteria, evidence, and visuals in the outline

For each heading, identify criterion obligations, main points, planned evidence, and a visual/table decision. For every proposed visual/table, include name/type, purpose, intended position, source/data, preparer, and status. **“Not needed”** is valid; never add decorative assets just to populate the template.

- The preparer may be the user or executing role. State whether an asset is available, requested, to be created, or blocked by missing evidence.
- Draw diagrams from confirmed architecture or a clearly labeled proposed/illustrative design. Charts asserting results need data. An invented screenshot is not proof that a function operates.
- If an asset belongs to a child heading, the parent may point to that child rather than duplicating the request.
- Small criteria may use short outlines in chat. Do not require a separate file, fixed chapter structure, or content beyond the criterion.

Use the optional extensions in [the working brief](../templates/brief.md) and [the outline](../templates/outline.md). Leave them out for unrelated office tasks.

## 7. Handoff and completion

Pass the target section, applicable decisions/version, criteria mapping, evidence
register, unresolved gaps, and relevant continuity profile with adjacent source
excerpts to the executing role. An outline or visual plan is not evidence that
its contents have been implemented or measured.

Review content against authorized scope, criteria, outline, evidence, and applicable writing guidance. Apply corrections within authorization; do not reopen approval for routine wording fixes. Substantive changes arising from review follow the affected-scope transition above.

For file deliverables, reopen the final artifact after the latest edit/export before reporting it verified. For chat-only content, review the response without claiming file creation or verification. Completion refers to the requested output: analysis, outline, draft, or revision, with remaining evidence limitations stated honestly.
