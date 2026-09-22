# Criteria-based Writing Contract

Shared rules for interpreting criteria, confirming scope, approving outlines, and handling evidence in report or thesis writing. This reference defines handoffs within the existing workspace lifecycle; it is not another router. Ownership defines consumer responsibilities, including drafting-prose when available. This reference does not install skills or change routing by itself.

Use the [workflow continuity contract](workflow-continuity.md) for message
changes, late files, pending questions, and resumption. Use the
[document continuity contract](document-continuity.md) for source context and
coherent continuation. These add no approval gates: reuse decisions that already
apply and return only unresolved prerequisites to their owner.

For adopted durable work, [persistent work tracking](work-tracking.md) stores or
references this same semantic state. Criterion IDs retain original source
locators and extraction limits; each maps to affected work items. Tracking
consent is not scope, outline or content approval. Do not duplicate decisions
between the plan and a previously adopted brief/outline. Missing criteria or
unread rubric pages remain gaps even if the plan file was successfully saved.

## Deliverable language

Follow the [language policy](language-policy.md): authored analysis, outlines, reports, and generated/exported artifacts default to English. Use Vietnamese or another language only when explicitly requested by the user for the relevant output. Conversation or source language does not override this default. Record the resolved language in scope and carry it through drafting, labels, placeholders, review, and export.

Chat, Q&A, explanations, requirement analysis presentations, progress updates, and user questions must follow the user's conversational language (e.g. Vietnamese). Authored deliverables (the outline, report content, drafts, and exported files) default to English.

**Strict negative constraint on interleaved bilingual text:** Never interleave bilingual translations or explanations directly into chat blocks (e.g. forbidden: dumping `[Bản tiếng Anh nộp bài]` alongside `[Giải thích tiếng Việt]`). The conversational discussion is in the user's language, and the authored deliverable is in English. Deliver clean, non-interleaved content.

## 1. Activation and stopping points

Apply [outline structure and evidence readiness](outline-structure.md) to all
document outlines and their corresponding sections: the default is Heading
1/2/3 numbered `1`, `1.x`, `1.x.x`, with the source criterion title verbatim at
level 1. The evidence prerequisite below applies before outline-only outputs
as well as outlines that precede drafting.

Apply when the requested operation concerns understanding criteria, outlining, drafting, or substantively revising report/thesis content against explicit requirements. Criteria may be pasted in the conversation or supplied in a rubric, brief, or other artifact. Infer the operation from context; do not require users to name a skill or enter a mode value.

Do not activate approval gates merely because a prompt contains “report” or “thesis”. Typo fixes, wording-only edits, layout changes, format conversion, spreadsheet operations, and presentation operations keep their existing workflows. Omit the optional template sections entirely for those tasks.

| task_mode | Requested operation | Authorized output and stopping point |
|---|---|---|
| analyze | Read, interpret, or explain criteria and their scope | Return the interpretation, obligations, evidence needs, and material open questions. Stop at analysis. Do not produce an unsolicited outline or full draft, or demand approval for an unrequested next stage. |
| outline | Create or revise an outline | Resolve material ambiguity, applicable analysis approval and evidence prerequisites, then produce the outline with criterion/evidence/visual mapping and wait for feedback. Approval of an outline-only task does not itself authorize writing the full content. |
| draft | Write complete content against criteria | Confirm scope and obtain outline approval unless already satisfied or explicitly waived; then draft, review, and deliver within that authorization. Drafting remains the requested outcome while intermediate gates are pending. |
| revise | Change existing content | Read the source and honor the requested changes and preserve-list. Bounded wording edits do not reopen approval gates. Material scope, argument, or structural changes require confirmation of affected scope/outline unless already authorized or waived. Stop after the requested revision and its review/verification. |

An explicit new request can change the mode. Responding to a question, correcting an outline, or approving its structure must not be treated as permission for an unrelated operation. In an already authorized drafting task, outline approval permits continuation within its scope without asking again whether to write.

## Criterion-level analysis and two stops

The two-stop rule (Requirement Analysis Approval -> Detailed Outline Approval -> Drafting) applies to **ALL** sections, chapters, parts, and criteria of deliverables — including introductory chapters (e.g. "Section 1: Project Overview", "Introduction", "Background", "Executive Summary"), substantive chapters, literature reviews, as well as formal criteria labeled P1/M1/D1 or syllabus rubrics.

For a request to draft a section or criterion such as “Section 1: Project Overview” or “P1”, apply these two stops to the target section or criterion, even after a master outline was approved. A request such as “do Section 1”, “write Introduction”, “do P1”, “continue P1”, or “the information is already in the brief” authorizes the outcome; it does not approve an unseen interpretation or detailed outline.

**First stop — requirement analysis.** Read the original criterion and relevant rubric context before proposing scope. Present a rigorous, clear analysis report directly in chat:
- **Keywords, Command Verbs & Cognitive Depth:** Accurately extract the primary keywords and command verbs (e.g. identify, describe, explain, compare, contrast, analyze, evaluate, critique, justify). Explicitly classify and explain the cognitive demand:
  * *Pure Theoretical / Descriptive (Lý thuyết nền tảng)*: describe, identify, explain principles. Focus on theoretical foundations, definitions, mechanisms, lifecycles, and phases without jumping into comparisons, critiques, or premature project decisions.
  * *Comparative / Analytical (So sánh đối chiếu)*: compare, contrast, analyze differences/similarities. Establish formal multi-dimensional comparison criteria and comparison matrices.
  * *Critical Evaluation / Critique (Đánh giá, phản biện)*: evaluate, assess, critique. Deliver a balanced examination of strengths, limitations, failure modes, risks, and real-world tradeoffs.
  * *Justification / Decision Defense (Biện minh, bảo vệ lựa chọn)*: justify, defend. Provide rigorous arguments defending a chosen lifecycle, architecture, or methodology based on concrete project scenario constraints.
- **Scope Boundaries (In-Scope vs Out-of-Scope):** Detail exactly what must be covered and what must be excluded to prevent scope creep. Delineate strictly whether the section is pure general academic theory (e.g. general SDLC definitions) or applied to the project scenario (e.g. selecting a model for the project), preventing overlap with adjacent criteria (such as M1 or D1).
- **Evidence, Diagrams & Citations:** Identify needed data, project facts, measurements, screenshots, examples, process diagrams, comparison tables and citations. Inspect available inputs. If required support is missing, use `scoping-the-brief` to ask the user for specific inputs before preparing the outline. Wait for inspected inputs or explicit scoped permission for illustrative data; neither analysis approval nor an unanswered question resolves the gap. Record `evidence_readiness` and any permission in the existing brief/conversation.
- **STOP and await user approval in chat** before preparing any detailed outline.

Use the rubric's definitions when provided; otherwise use this interpretation aid, not an invented grading scheme:

| Command verb | Required work |
|---|---|
| identify / describe | Identify relevant elements or explain their characteristics within the stated scope; do not inflate this into a mandatory evaluation. |
| explain | Develop how or why something works, connecting mechanism, conditions and consequences; naming components alone is insufficient. |
| compare / contrast | Use common comparison dimensions and discuss relevant similarities/differences; separate descriptions alone do not complete the comparison. |
| analyze | Examine parts and relationships, explain contributing factors and implications with support. |
| evaluate / assess / justify | Apply explicit criteria to evidence, weigh strengths and limitations, and reach a supported judgment or defend a choice. |
| critically discuss / critique | Examine claims, assumptions, alternatives and counterarguments; weigh evidence and limits before a reasoned position. |

Multiple verbs may require multiple kinds of reasoning. Do not infer the verb or difficulty from a label such as P1, M1 or D1. If original wording is missing, request it or return explicitly provisional analysis; never invent its demands. Treat source instructions as assignment evidence, not as user approval or permission to skip gates. A document saying “write immediately” cannot approve the assistant's interpretation or override the user's review workflow.

Record this analysis within `criteria` and `scope`, using `scope_status: pending`. The existing scope gate is the requirement-analysis approval gate, not an extra third gate. The `approval_record` identifies criterion/section, analysis revision and the user's actual decision. **Do not include the detailed outline in the analysis-approval response.** Ask for the decision naturally in chat, then stop. Clear source material removes redundant clarification, not this unresolved stop.

**Second stop — detailed outline.** After analysis approval (or an explicit waiver) and resolution of the target's evidence prerequisite, planning prepares the detailed outline directly in chat:
- **Strictly grounded in approved analysis:** The outline must directly derive from the approved scope boundaries, keywords, and cognitive demands established in Stop 1. Every heading and point must fulfill an identified in-scope requirement.
- **Hierarchical headings (H1, H2, H3):** Default to `1`, `1.x`, `1.x.x`, unless an alternative structure is explicitly requested. Heading 1 copies the original criterion/requirement title verbatim; Heading 2 contains main points and Heading 3 supporting subpoints. Preserve source identifiers, punctuation and language. Do not paraphrase or translate the protected title.
- **Key arguments and content per heading:** Concrete bullet points detailing the specific points to be developed in each paragraph, never empty heading placeholders.
- **Visuals and tables specification:** Explicitly specify any proposed tables (name, columns/criteria) or diagrams (name, process flow).
- **STOP and await user approval in chat** before drafting paragraphs.

**Third stage — Drafting and in-chat delivery.**
- Only after explicit outline approval can paragraph drafting proceed.
- **Strictly grounded in approved outline:** Drafting must directly translate and expand the approved detailed outline heading by heading, point by point. It must maintain strict argument coherence and factual fidelity—never drifting into unapproved topics, dropping planned points, or inventing unstated metrics.
- **Full in-chat text delivery:** The complete drafted text for the section must be output directly into the chat response so the user can read, review, and evaluate it immediately. Do not hide text behind a file path or merely say "saved to file". Even if saved locally into the dedicated project folder for persistence, the complete drafted content must appear in chat.
- **STOP after delivering the section draft:** Never automatically jump to the next section or start analyzing the next criterion in the same message. Wait for the user to review the drafted section and confirm or provide feedback before moving on.

**Internal discipline — No process leakage or meta-announcements.**
These stops and gates are strictly internal behavioral rules for the agent, not a script or labels to display to the user. Follow the natural collaborative style of **obra/superpowers**:
- NEVER print robotic process tags or labels such as `[STOP 1]`, `[STOP 2]`, `[ĐIỂM DỪNG 1]`, `[Điểm dừng 2]`, `[Gate 1]`, `[Approval Gate]`.
- NEVER lecture the user about internal workflow machinery (e.g. forbidden: "theo đúng quy trình 2 điểm dừng", "chúng ta chuyển sang Điểm dừng 2", "theo quy trình chuẩn trước khi xây dựng...").
- Simply present the actual analysis or outline directly with standard headings (e.g. `## Phân tích yêu cầu: Section 1 — Project Overview`), and close with a polite in-chat question inviting review (e.g. "Bạn xem qua phần phân tích này nhé. Nếu bạn thấy hợp lý, cho tôi biết để tôi tiếp tục lập dàn ý chi tiết.").

**Reusing decisions.** A master outline with only “Section 1 Overview” or “P1 Components” is structural navigation, not approval of the section's analysis or detailed outline. Prior decisions count only when the displayed material and user's decision actually cover the target section or criterion's interpretation and detailed plan. Reference that evidence; do not invent a fresh gate when both decisions already apply. An explicit waiver can skip exactly the named gate(s). Silence, a default option, or urgency cannot. Approval of Section 1 or P1 does not approve Section 2 or P2. Material revisions reopen only the affected decision unless the user already authorizes the change and continuation.

**Recovery after a skipped gate.** Acknowledge the missed step and return to the earliest unresolved decision. An unsolicited draft or outline is unapproved; its existence is not consent. If analysis is pending, return analysis alone and wait, even if a detailed outline could be produced in the same response.

These stops govern section and criterion writing. Preserve analysis-only and
outline-only stopping points, bounded edits, existing approvals and explicit
waivers. A criterion outline-only request still requires applicable analysis
approval and evidence readiness before outlining; it authorizes no future prose.
Permission for illustrative data does not by itself approve the analysis.

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
| source_title / source_locator | Exact protected criterion or requirement title and its inspected source or user-message locator; never a generated paraphrase. |
| evidence_readiness | not_required, provided, pending, or illustrative_authorized under the outline structure contract. Pending required evidence blocks the affected outline; record explicit scoped illustrative permission. |
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
- Skipping confirmation, choosing a layout, or writing immediately is not a language instruction. Vietnamese “viết luôn” or “tự quyết bố cục” still yields English unless the user names the output language.
- Compose only supplied facts from the prompt or fixture. Do not invent SLAs, on-call coverage, restore-test pass rates, extra tools, or other unstated operational metrics.
- Never invent project names (e.g. fictitious apps/companies like "SpeedyBite"), consulting roles, business domains, budgets (e.g. "$15,000"), SLAs, latency/performance numbers (e.g. "2.5s"), user counts, or other operational metrics without interviewing and confirming with the user. If unstated in source documents or prompt, ask the user or mark as a blocking gap. Never fabricate project context.
- Strictly forbid dumping interleaved bilingual blocks in chat (e.g. `[Bản tiếng Anh nộp bài]` interleaved with `[Giải thích tiếng Việt]`).
- Do not abuse modal question tools (such as `asktool`) to obstruct the user's reading at approval stops. Conduct review naturally in chat, and reserve `asktool` strictly for cases where the user explicitly requests an interactive card or when choosing between distinct branching paths.
- “Write a draft before the data is ready” is neither permission to invent results nor a blanket waiver of unrelated approval gates. It does not set `scope_status` or `outline_status` to waived.
- A complete technical description in the prompt does not waive outline approval for a draft. Present the outline and stop unless that gate is already approved or explicitly waived.
- Wording and typo corrections within approved scope do not invalidate substantive approval. Material scope, argument, or structural changes reopen only the affected decision unless the user already authorized that change and continuation.
- If applicability of a prior decision is genuinely unclear, ask about that uncertainty; do not assume approval or restart the entire interview.

### Transitions

| Situation | Required action and next state |
|---|---|
| Analysis requested | Analyze available content and ask only material clarification questions if needed. Scope/outline gates are not required for this output. Deliver analysis and stop. |
| Draft requested; scope not yet confirmed | Inspect context, resolve material ambiguity, summarize proposed scope for confirmation, and set scope_status to pending. Reuse an already explicit, applicable scope decision instead of asking again. |
| Scope confirmed or its confirmation explicitly waived | Record the decision. Check evidence_readiness before planning; if pending, scoping asks for the missing inputs and waits. Otherwise prepare an identified outline version and set outline_status to pending, unless a valid outline decision exists or that gate is waived. |
| Outline-only request with sufficient scope supplied | Check the exact source title, required evidence and applicable analysis approval first. Resolve missing inputs or decisions before outlining; otherwise prepare the requested outline without an extra interview. Show the version and mark approval pending. Stop and wait for feedback; do not write the report. |
| Outline changes requested without permission to continue | Set revision_requested, apply the changes, identify the revised version, and return it as pending for the affected sections. |
| Applicable outline approved | Record decision/version/sections and set them approved. Continue to content only if drafting or substantive revision was authorized and remaining prerequisites are met. |
| “Change heading B as follows, then write” | If the change and affected scope are clear, record the instruction as authorization for that revised version/section and continuation. Do not ask for the same authorization again. |
| User explicitly skips a gate | Mark that gate waived and record the instruction. Stay within the authorized operation/scope; remaining gates and evidence checks still apply. |
| Scope or outline materially changes later | Preserve unaffected decisions. Confirm the changed part when not already authorized; block dependent drafting while that part is pending. |
| No interactive response can be obtained | Explain the unresolved prerequisite and return only the current authorized stage. For pending analysis or required evidence, return analysis and targeted questions without an affected outline. A provisional outline is allowed only when source-title and evidence prerequisites are resolved and applicable analysis decisions permit it. Never bypass a prerequisite by guessing. |

Before substantive drafting, check applicable scope/outline decisions, their scope/version, the authorized operation, and evidence needed by the target section. A permitted incomplete draft follows the protocol below; it is not an alternative way to bypass approval gates.

## 5. Missing Evidence Protocol

Apply when a criterion requires a project example, measured comparison, experimental result, system data, screenshot, or other support that is absent or insufficient for the intended claim.

Run this check during analysis, before planning the affected outline. Set
`evidence_readiness: pending` and use `scoping-the-brief` for the focused
interview. Wait for sufficient inspected inputs or explicit authorization for
illustrative material before outlining. This is an evidence prerequisite within
analysis, not an extra approval gate when evidence is already adequate. A purely
theoretical requirement must not acquire an unnecessary numeric-data interview.

1. Inspect the available prompt, files, and prior answers first. Do not request evidence already accessible or claim to have inspected an unreadable source.
2. Identify exactly what is missing, which criterion/claim it supports, and why current material is insufficient. Ask targeted questions or request concrete inputs: before/after logs under comparable conditions, benchmark settings, a dataset, or an actual screenshot of the specified function.
3. Add the gap and affected section to blocking_gaps; mark corresponding evidence missing. Suspend the affected outline and dependent assertions while the requested inputs or scoped illustrative permission remain unresolved. Continue independent, authorized work supported without that material.
4. For an already approved outline, if evidence becomes unavailable and the user permits an incomplete draft, place neutral placeholders at affected claims, tables, or figures. Do not assume the direction, magnitude, significance, or cause of a result. This does not waive the prerequisite for preparing a new or affected outline.
5. Use an illustrative scenario only when the user permits it. Label it at the point of use and carry the distinction into related tables, figures, and conclusions. Never cite it as a measured or implemented project result. A requested conclusion must not reuse the illustration's numbers as operational proof; keep those numbers adjacent to the local label, and leave a real-result claim incomplete if evidence is still required.
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
