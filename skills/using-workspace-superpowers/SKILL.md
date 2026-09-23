---
name: using-workspace-superpowers
description: Use when any message starts, continues, changes, approves or resumes document, research, office or knowledge work, including new files and mixed requests, before any response or action.
---

# using-workspace-superpowers

Single entry router for the workspace domain. Classify, compose, and route. Contains no format-specific procedure.


The current message selects the operation. Do not advance the previous workflow because it was last, and do not start the writing pipeline because the message mentions a report, assignment, or file. After this router, call the specialist whose catalog description matches the current operation, then load additional skills for its applicable dependencies as their work begins. The user need not name a skill or follow the last step. A pending approval blocks only its dependent next stage.


If there is even a 1% chance a skill might apply, call it before any response, question, or file action. You do not have a choice. You must use it. The user need not name the skill or follow the previous step. A remembered summary is not a call. If the loaded skill does not fit, stop using it. Do not preload the catalog.

| Thought | Reality |
|---|---|
| I already know this skill | Load the current body. Memory is not a call. |
| I'll ask first | Call the matching skill before the question. |
| The last step comes next | The current message selects the skill. |
| 1% is too small | 1% means call it. Stop only after the body does not fit. |

## Entry and reselection

Load this router on every Workspace turn, including short approvals and
continuations. Use the current message together with retained context to select
the next operation; do not mechanically advance the previous workflow. For
Simple Q&A, answer directly. For Coding, hand off to `using-superpowers`.
A mixed message may need a direct answer and a separate artifact operation.

Before selecting a specialist, identify the requested result, the target
artifact or section, and the authorized stopping point. Resolve its name against
the host's available catalog and load its actual instructions before use.
Descriptions are discovery cues, not a substitute for the skill body. Match
meaning and context rather than isolated words such as "report" or "formula".
Do not preload the catalog or ask the user to name a skill.

Reassess when new evidence, a correction or a different operation appears, even
within one turn. Reuse still-applicable approvals; invalidate only dependent
decisions. A skill's next step cannot authorize an unrequested draft, rewrite,
export or file creation. Keep the return point of temporary switches and honor
explicit pauses and cancellations. Apply the continuity contract below rather
than restarting an interview. PI's exact IDs and calls are defined by its host
adapter; loading the router does not load the specialists.

## Durable work and first-turn discovery

Apply [persistent work tracking](../../references/work-tracking.md) on fresh
Workspace chats, continuations and sustained work. Locate the adopted plan or
bounded `work-plan.md` candidates in the task root or dedicated project directory with listing only, then delegate reading to
`reading-artifacts` before scoping or planning. Reuse its checkpoint and load
only the relevant source slices. Propose tracking once when justified, with
zero/one/two record types according to the task; simple edits stay lightweight.
Tracking files and project deliverable files are co-located in a dedicated common project directory created by AI. Mandatory interview and explicit user approval in chat are required before creating tracking or project markdown files. A supplied brief, rubric, or graded guide is read in full and mapped before that interview. The interview does not replace the intake map.
Planning owns plan content, editing persists the shared record, and verification
checks actual paths/revisions. The router does not write a plan or create an
independent state system. Handoffs carry work/item identity and current targets.

For mathematics entering Word, route the assigned operation under the
[native Equation contract](../../references/math-in-documents.md). For folder-based
reports, pass the [project survey contract](../../references/project-grounding.md)
to reading/analysis/planning and any bounded Coding handoff. The survey's explicit
read-only limits override generic coding setup/test instructions. These contracts
add no lifecycle or approval gates; unrelated tasks retain their existing routes.
When project context must be persisted, hand the grounded context and its single
designated path to `editing-documents` for creation/update, then verification.
The router never writes that record itself.

## Ongoing requests and continuity

Apply the [workflow continuity contract](../../references/workflow-continuity.md)
at every new message and specialist handoff. Select skills from the current
request plus retained context; the user need not follow a fixed sequence.
Answer simple side questions directly, process supplied files through reading
and analysis, and return to the next authorized step. Preserve pending decisions
without forcing them onto unrelated work. Pause, replace, or cancel only the
scope the user actually changed.

For report/thesis continuation, obtain the source-grounded profile and relevant
adjacent excerpts through reading/analysis under the
[document continuity contract](../../references/document-continuity.md), then
pass them through planning, drafting/editing, and review. The router coordinates
this handoff; it does not inspect substantive file content itself.

## Responsibilities

1. Verify whether the request belongs to Workspace Superpowers.

   * If the task is primarily software engineering, coding, debugging, refactoring, or build/test automation → hand off to `using-superpowers`.
   * If the task is mixed → use this router only for the workspace slice.
2. Determine which workspace lifecycle stages are actually required.
3. Select and compose the appropriate lifecycle, family, and specialist skills for the requested outcome.
4. If a requested specialist capability is unavailable:

   * Fall back to a lower-level safe capability when possible.
   * If no safe fallback exists, stop that unsupported slice and clearly report the capability limitation.

## Deliverable Language

Apply the [shared language policy](../../references/language-policy.md): authored deliverables default to English unless the user explicitly requests another language. Vietnamese conversation or input does not select Vietnamese output. Skipping gates, choosing a layout, or writing immediately is not an explicit language request. Carry the resolved language into the brief and downstream specialists; a missing language instruction does not require an interview.

## Allowed Router Capabilities

This router coordinates workflow only.

It may use:

* `list_files(dir)` — locate or resolve candidate artifacts without reading substantive content.
* `invoke_skill(name)` — load the appropriate lifecycle, family, or specialist skill.
* `delegate(role, context)` — optional; use only when the harness exposes compatible delegation or subagent roles.

Content reading, substantive interpretation, artifact manipulation, and verification are delegated to specialist skills.

## Mandatory invocation contract

`invoke_skill(name)` means an actual tool call through the host adapter that
loads the named skill's instructions. It is not internal reasoning, a route
description, or an announcement. At every stage transition, including a new
turn after approval, execute the designated skill call and read its result
before performing that stage. A router call or a specialist loaded upfront on
an earlier stage does not satisfy this requirement. Keep recorded user approvals;
skill loading does not require another approval.

FORBIDDEN: You must NEVER draft section prose, generate outlines, or analyze criteria using generic LLM knowledge without first invoking the designated specialist skill. The router (`using-workspace-superpowers`) only classifies and routes; it does NOT authorize writing prose directly.

If the designated skill cannot be loaded, stop the affected stage and report
the missing capability. A lower-level artifact-tool fallback still requires
loading the responsible specialist; it does not authorize generic composition.
Simple Q&A and trivial mechanical edits retain their existing lean routes.

## Core Lifecycle and Domain Composition

Core lifecycle skills may include:

* `scoping-the-brief` — resolve blocking ambiguity and establish an actionable working brief.
* `reading-artifacts` — open, parse, and extract structure or content from artifacts.
* `analyzing-artifacts` — evaluate, diagnose, compare, synthesize, or critique substantive content.
* `planning-work` — construct an execution plan when task complexity warrants one.
* `reviewing-work` — route quality review across applicable dimensions before verification. Skip only for trivial mechanical fixes.
* `verifying-artifacts` — validate generated or modified artifacts before completion is claimed.
* `packaging-deliverables` — name, organize, and report the verified file set. Never before verification.

Additional family and specialist skills are selected according to the task.

Examples include:

* Research & Evidence: `researching-sources` for requested external research or reference materials; `citing-sources` for requested/required citations or citations already present in a draft.
* Documents & Media: `editing-documents`, `formatting-layout`, `working-with-pdf`, `working-with-spreadsheets`, `auditing-formulas`, `working-with-presentations`, `storyboarding-slides`, `working-with-visuals`
* Prose: `drafting-prose`, `writing-reports`, `writing-academic-prose`
* Mathematics: `working-with-mathematics` for optional mathematical support; equation-only layout/conversion remains with document skills, spreadsheet audits with `auditing-formulas`.
* Transform: `converting-artifacts`

The catalog is extensible. These examples are not an exhaustive list.

This router never inlines specialist procedures.

## Mathematics activation

Select from the requested operation, supplied content and retained context,
without requiring the user to name a skill or explicitly say "mathematics".
The word alone ("formula", "report", or "thesis") does not choose a route.
Reassess when a follow-up introduces a derivation, equation or project source;
preserve the active writing stage and earlier approvals.

| Actual need | Selection |
|---|---|
| Define notation, calculate a result, justify a recurrence, explain a proof, check a discrete-math argument, or revise substantive mathematical content | Add `working-with-mathematics` to the current analysis, writing or review operation; for authored substantial mathematics, include mathematics review |
| Write a report/thesis containing such content, even if the user asks only to continue the next section | The prose specialist keeps ownership; add mathematics support for the affected section based on its actual content |
| Paste, create, edit or export equations into Word | Apply the native Equation contract on every path; add mathematics support if meaning, derivation or correctness must be established or changed |
| Align/resize an existing equation or convert its representation without changing meaning | Document editing/layout/conversion plus native Equation verification; do not force a proof rewrite |
| Diagnose spreadsheet cell formulas, references or dependencies | `working-with-spreadsheets` / `auditing-formulas`; add mathematics support only for an underlying mathematical claim beyond the cell audit |
| Report grounded in a project that also contains mathematical reasoning | Compose project survey boundaries with the applicable prose/math/Word routes; neither mathematical checking nor a Coding handoff authorizes project commands |
| Ordinary wording/typo repair or a simple conversational calculation | Keep the appropriate lightweight edit or Simple Q&A route; do not create an artifact workflow solely because a number appears |

## Criteria-based writing routes

Apply [outline structure and evidence readiness](../../references/outline-structure.md):
default to Heading 1/2/3 numbered `1`, `1.x`, `1.x.x`, retaining the source
criterion title verbatim at level 1. Before outlining, route missing title or
required evidence to `scoping-the-brief` for an interview. Wait for supplied
evidence or explicit scoped permission for illustrative examples. This also
applies to outline-only requests; do not bypass it with provisional headings.

For “do P1” or another section/chapter draft, enforce the contract's
[criterion-level analysis and two stops](../../references/criteria-writing-contract.md#criterion-level-analysis-and-two-stops)
before selecting prose specialists. The two-stop rule applies to all sections,
chapters, parts, and criteria of deliverables (e.g. “Section 1: Project Overview”,
“Introduction”, or “P1”). An approved master outline containing only
headings is not a detailed approval. Route to analysis and
scope confirmation first; only after that decision route to the detailed outline
and its separate approval. Preserve valid section-specific decisions/waivers.
Never invent fictitious project names, roles, SLAs, budgets, or operational metrics.
Conversational interaction follows the user's language (e.g. Vietnamese); deliverables
default to English without dumping interleaved bilingual text in chat.

Use the [criteria-writing contract](../../references/criteria-writing-contract.md) for activation, state, and authorization. Infer `task_mode` from the requested operation, not the words “report” or “thesis”. For source files, invoke `reading-artifacts` and applicable `analyzing-artifacts` before scoping; chat criteria need no artificial file step.

| task_mode | Route and stopping point |
|---|---|
| `analyze` | You MUST execute `invoke_skill("scoping-the-brief")` before criterion analysis, and `invoke_skill("analyzing-artifacts")` for substantive artifact interpretation as needed. Present interpretation, scope, and evidence needs. Stop at analysis. |
| `outline` | Invoke `scoping-the-brief` for unresolved scope prerequisites. You MUST execute `invoke_skill("planning-work")` before generating the detailed outline, including criterion, evidence, and visual mapping. Stop at the outline and wait for feedback; outline approval alone does not authorize drafting. |
| `draft` | Invoke `scoping-the-brief` / `planning-work` for unresolved contract prerequisites. You MUST physically execute `invoke_skill("drafting-prose")`; it must invoke the selected writing specialist(s). You are forbidden from outputting draft paragraphs without loading `drafting-prose`. Then execute `invoke_skill("reviewing-work")` before delivering the prose. Continue through applicable gates using recorded decisions. |
| `revise` | Execute `invoke_skill("editing-documents")`, then `invoke_skill("drafting-prose")` for substantive report/thesis rewrites under the contract; it must invoke prose specialists, followed by `invoke_skill("reviewing-work")` before delivery. Typo or wording-only edits stay in `editing-documents`; format-only edits use `formatting-layout`, without writing approval gates. |

Scoping owns scope confirmation; planning owns outline decisions. Drafting checks prerequisites without approving them. Reuse applicable decisions and explicit waivers; ask only about unresolved requirements or decisions. An explicit request to write after an outline can change the authorized operation under the contract.

For chat-only outputs, review the requested content without claiming file verification or creation. For file deliverables, retain `verifying-artifacts` → `packaging-deliverables`. Spreadsheet, presentation, conversion, and other unrelated routes remain unchanged.

## Procedure

1. **Confirm Workspace Ownership**

   * Determine whether this is Workspace work, Coding work, Simple Q&A, or the workspace slice of a mixed request.
   * Coding slices belong to `using-superpowers`.

2. **Select Lifecycle Skills**

   * Compose the lifecycle stages appropriate to the task scope, then execute `invoke_skill(name)` for each selected stage before doing its work. A conceptual route alone does not execute it.
   * Small tasks run lean; substantial tasks execute only the stages required and authorized for the current outcome.

3. **Enforce Hard Dependencies**

   * No file modification before `reading-artifacts` (and `analyzing-artifacts` for non-trivial modifications).
   * Criteria-based prose follows the contract's applicable scope and outline prerequisites, including small sections. Other complex or multi-artifact prose needs `planning-work`.
   * No criterion analysis without an actual `scoping-the-brief` invocation, no detailed outline without `planning-work`, and no draft paragraphs without `drafting-prose` and its selected writing specialist. Recheck this at each stage transition, not only on the first turn.
   * No file completion claim before `verifying-artifacts` re-opens the real deliverable.
   * No delivery packaging before verification has passed.

4. **Scope When Material Facts Are Missing**

   * You MUST execute `invoke_skill("scoping-the-brief")` before material ambiguity resolution, criteria analysis, or unresolved scope confirmation required by the criteria-writing contract.
   * Do not interview when the brief is already clear. Clarification and required scope confirmation are separate; reuse confirmed decisions and explicit waivers.
   * Invoke `researching-sources` for requested research, including applicable requirements the user adopted. Invoke `citing-sources` for requested/required citations or citations already present in a draft, so section-level references are completed before delivery. Preserve a coherent citation convention in an existing document; use Harvard Style only when citations are required and no style is established under the [citation style rules](../../references/citation-styles.md). Citation repair does not authorize unrelated research or unsolicited citations.

5. **Analyze Before Substantive Modification**

   * Invoke `analyzing-artifacts` after `reading-artifacts` for substantive changes to existing files. For pasted text, the selected scoping or editing skill reads and interprets the supplied content directly.
   * Simple mechanical edits may proceed directly from reading to the relevant editing specialist.

6. **Plan Proportionally to the Task**

   * You MUST execute `invoke_skill("planning-work")` before a requested outline, unresolved criteria-writing outline prerequisites, or multi-stage, high-risk, multi-artifact, or otherwise complex planning work.
   * A small criterion can use a short outline in chat; no separate plan file is required.
   * Do not require a planning stage for trivial or mechanical tasks.

7. **Compose Domain Specialists**

   * You MUST execute `invoke_skill(name)` for the family and specialist skills required by the deliverable. For `task_mode: draft`, execute `invoke_skill("drafting-prose")` before any draft paragraphs; it loads the writing specialist and required style references.
   * Keep lifecycle responsibilities separate from format-specific procedures.

8. **Review Substantial Deliverables**

   * You MUST execute `invoke_skill("reviewing-work")` after composition and before delivering drafted, graded, multi-section, research, or otherwise substantial content, including chat-only drafts. Do not defer review until after the user's review of the delivered draft.
   * Do not invoke `reviewing-work` for trivial mechanical fixes. Those proceed to `verifying-artifacts`.
   * Reviewers return findings; they do not rewrite the artifact wholesale. Fix Critical and Important findings before verification.

9. **Mandatory Verification for Created or Modified Artifacts**

   * Every created or modified artifact must conclude with `verifying-artifacts` before completion is claimed.
   * A successful command, script, export, or exit code is not sufficient evidence of artifact correctness.

10. **Package After Verification**

    * Invoke `packaging-deliverables` after `verifying-artifacts` for the files being delivered.
    * Report artifact paths, what changed, what was verified, and residual limitations.

## Typical Routes

Mechanical edit:

`reading-artifacts → relevant editing specialist → verifying-artifacts → packaging-deliverables`

Substantive document revision:

`reading-artifacts → analyzing-artifacts → editing-documents → reviewing-work → verifying-artifacts → packaging-deliverables`

Ambiguous complex deliverable:

With supplied sources: `reading-artifacts → analyzing-artifacts → scoping-the-brief when needed → planning-work → relevant specialists → reviewing-work → verifying-artifacts → packaging-deliverables`.
Without supplied sources, start with `scoping-the-brief` only for material ambiguity.
These are possible stages, not permission to exceed the requested operation.

Research deliverable:

`scoping-the-brief when needed → researching-sources → citing-sources → relevant authoring specialist → reviewing-work → verifying-artifacts → packaging-deliverables`

Document formatting / layout:

`reading-artifacts → analyzing-artifacts → formatting-layout → reviewing-work (when substantial) → verifying-artifacts → packaging-deliverables`

Report → Presentation deck:

`reading-artifacts → analyzing-artifacts → planning-work → storyboarding-slides → working-with-presentations → reviewing-work → verifying-artifacts → packaging-deliverables`

Artifact conversion / export:

`reading-artifacts (source) → converting-artifacts → verifying-artifacts (output) → packaging-deliverables`


Mixed coding/workspace task:

`workspace router handles workspace slice ↔ using-superpowers handles coding slice`

Do not merge their procedures into a single workflow.

## Common Mistakes to Avoid

* **Reading artifact content in this router:** substantive reading belongs to `reading-artifacts`.
* **Interviewing by default:** clarify only material gaps; required scope confirmation is a separate contract decision, reused when already recorded.
* **Asking for information already available:** inspect existing context and artifacts first.
* **Enforcing analysis on trivial fixes:** simple changes may use `reading-artifacts` → editing specialist → `verifying-artifacts`.
* **Enforcing planning on trivial work:** keep mechanical edits lean; a required criteria outline can be brief and inline.
* **Skipping verification because a command exited 0:** command success does not prove layout, typography, formulas, citations, structure, or visual correctness.
* **Skipping `reviewing-work` on a substantial deliverable:** verification of file integrity is not a substitute for requirement, coherence, citation, or visual review.
* **Packaging before verification:** `packaging-deliverables` runs only after `verifying-artifacts` has confirmed the files being delivered.
* **Assuming a missing specialist requires total failure:** attempt a safe lower-level fallback first.
* **Inlining specialist procedures:** Word, Excel, PDF, presentation, research, and visual procedures belong in their respective skills.
* **Routing coding work into workspace workflows:** software engineering remains with `using-superpowers`.
* **Invoking research or citations spontaneously:** keep external research within requested/adopted requirements. Do not add unsolicited formal citations; required or existing citations must still be checked and completed through `citing-sources`.
* **Treating the listed specialist examples as the complete catalog:** the router must remain extensible.
