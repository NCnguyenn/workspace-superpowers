---
name: using-workspace-superpowers
description: Use when any message starts, continues, changes, approves, or resumes document, research, office, or knowledge work, including new files and mixed requests, before any response or action.
---

# Using Workspace Superpowers

## Job

This is the workspace entry router. It classifies the current request, loads only the skills needed for the requested operation, and preserves the user’s stopping point. It does not read substantive artifact content, write deliverables, or replace a specialist’s method.

The current message selects the operation. Do not continue the previous workflow merely because it was last, and do not start the writing pipeline because a message mentions a report, assignment, or file. Side questions are handled at their own scope; a pending approval blocks only the stage that depends on it.

## Select the correct route

1. Classify the request as Workspace, Coding, Simple Q&A, or the workspace slice of a mixed request.
2. For Workspace work, identify the requested result, target artifact or section, available inputs, and authorized stopping point.
3. Resolve the matching catalog entry and load its current body before relying on its method. The user need not name the skill.
4. Add only the additional skills required as dependencies of the operation. A skill description helps discovery; it never replaces loading the skill body.
5. Reassess when the user adds evidence, changes scope, pauses, cancels, or asks for a different operation.

| Request | Route | Boundary |
|---|---|---|
| Coding | Hand off to `using-superpowers` | Do not run Coding work through this workspace router. |
| Simple Q&A | Answer directly | Do not create an artifact workflow. |
| Mixed | Route the workspace slice here and the coding slice to `using-superpowers` | Keep the workflows separate. |
| Existing file needs content interpretation | `reading-artifacts` then `analyzing-artifacts` | Do not infer facts from a filename, raw bytes, or an unread region. |
| Mechanical document change | `reading-artifacts` then the relevant specialist and `verifying-artifacts` | Do not add planning or prose gates to a typo or formatting-only change. |
| Substantive artifact change | Read, analyze, edit, review when substantial, then verify | Preserve the requested scope and unrelated user changes. |

## Load skills before acting

If there is even a **1% chance a skill might apply**, call it **before any response, question, or file action**. You do not have a choice. A remembered summary is not a call, and “I already know this skill” is not a reason to skip the current instructions. If the loaded skill does not fit, stop using it and select the correct one; do not preload the catalog.

At every stage transition, execute the designated `invoke_skill(name)` as an actual tool call and read the returned instructions before doing that stage. Naming a skill, describing a route, or loading a router on an earlier turn does not satisfy this requirement.

**FORBIDDEN: NEVER draft section prose, generate a detailed outline, or analyze criteria from generic knowledge without first loading the designated specialist skill.** This router coordinates work; it does NOT authorize writing prose directly.

## Session progress

For a genuinely multi-stage Workspace request, first read the complete portable [session progress contract](../../references/session-progress.md) through `read_file(path)` before evaluating activation, creating, mutating, resuming, replacing, reopening, or rendering a checklist. A link, filename, remembered summary, or earlier router load is not a contract read. If the contract cannot be read, report that limitation and do not claim checklist-contract conformance.

Keep simple work lean. A routine save, export, verification call, or several loaded skills does not by itself require a checklist. When the contract’s conditions are met, make one transient checklist for the current request, update it only at meaningful response boundaries, and show **Loaded skills** only after their bodies were actually loaded. Checklist visibility is never approval, evidence readiness, verification, or completion.

## Continuity and durable work

Apply the [workflow continuity contract](../../references/workflow-continuity.md) on every Workspace turn. Keep the current operation, source revisions, pending decisions, blockers, and return point. Reuse still-applicable approvals; invalidate only affected dependencies. Do not turn a recommendation, a new file, a plan’s next action, or a short acknowledgement into authorization.

For sustained work, apply [persistent work tracking](../../references/work-tracking.md). On a fresh or resumed task, locate an adopted or bounded candidate `work-plan.md`, then load `reading-artifacts` to read its identity and current checkpoint before reading linked documents. Planning owns plan content; `editing-documents` is the persistent writer; `verifying-artifacts` reopens saved records. The router owns neither the record nor a parallel state system. Follow the contract’s checkpoint rules and preserve the one designated `context_file` when project evidence is relevant.

For a project folder, apply [project grounding](../../references/project-grounding.md). A survey is read-only unless the user explicitly authorizes a wider action. Do not infer runtime behavior, run tests or builds, change Git state, or create a project context from survey access alone.

For a continuation or substantive revision, obtain a source-grounded profile and adjacent excerpts through `reading-artifacts` and `analyzing-artifacts` under the [document continuity contract](../../references/document-continuity.md). A completed-assignment read-back is a narrow route: use `reading-artifacts` and `analyzing-artifacts`, then skip new intake/scoping unless the user asks for a new task. A comparison with a later guide is a narrow comparison of criteria already present and remaining criteria, not a new intake.

## Criteria-based writing

Use the [criteria-writing contract](../../references/criteria-writing-contract.md) and [outline structure and evidence readiness](../../references/outline-structure.md) for report or thesis criteria. Apply the contract's **criterion-level analysis and two stops**: requirement analysis approval and detailed-outline approval remain separate. Evidence required by the current target must be inspected or explicitly authorized as illustrative before an affected outline is prepared. Never invent project names, business context, budgets, SLAs, operational measurements, citations, or a later-assignment deliverable such as a functional prototype; ask before using an unsettled fact.

An opening question about the parts, criteria, or structure of a newly supplied guide is **not Simple Q&A** and **not a narrower operation**. Read and analyze the guide, return its intake map, and reuse that map for a named section rather than repeating intake.

For a completed assignment, use the completed-assignment read-back route through `reading-artifacts` and `analyzing-artifacts`, then **skip new intake/scoping** unless the user requests a new task. When a later guide follows, identify the remaining criteria through a narrow comparison rather than reopening intake.

If several valid document interpretations or organizations remain after evidence is sufficient, load `brainstorming`. It is **not a software-design skill**: present 2–3 comparable approaches, recommend one, and wait for the user’s choice.

| `task_mode` | Required route and stopping point |
|---|---|
| `analyze` | MUST execute `invoke_skill("scoping-the-brief")`, then `analyzing-artifacts` when substantive source interpretation is needed; use `brainstorming` when valid readings remain, present analysis, and Stop. |
| `outline` | MUST execute `invoke_skill("planning-work")` after applicable scope, analysis, and evidence prerequisites; use `brainstorming` when valid organizations remain, show the detailed outline, and Stop. |
| `draft` | MUST execute `invoke_skill("drafting-prose")`, load its selected writer, complete `reviewing-work` before delivering, then provide the authorized section only. |
| `revise` | Execute `editing-documents`; use `drafting-prose` for substantive report or thesis recomposition and `formatting-layout` for presentation-only changes; review and verify the affected result. |

A request for an outline alone is not analysis approval. A detailed outline approval is not permission to draft a different scope. A request to skip a gate is not an explicit language request and does not waive evidence, review, or verification. Apply the [language policy](../../references/language-policy.md): chat explanations follow the language of the current user message; do not default that language to Vietnamese.

Use `citing-sources` when citations are requested, required, or citations already present in a draft need checking and completion.

Before an image, screenshot, or DOCX-figure claim, load `working-with-visuals` and apply the [visual evidence boundary](../../references/visual-evidence-boundary.md). Visible pixels are not runtime, database, device, or criterion proof. Before mathematics enters Word, apply the [native Equation contract](../../references/math-in-documents.md).

## Mathematics activation

Choose mathematics support from the actual operation, supplied content, and retained context. The word alone “formula,” “report,” or “thesis” does not choose a route.

| Actual need | Route |
|---|---|
| Define notation, derive or check a proof, explain a recurrence, or evaluate mathematical reasoning | Add `working-with-mathematics` to the current analysis, writing, or review task. |
| Author or edit a mathematical expression in Word | Apply the native Equation contract; use mathematics support when meaning or correctness changes. |
| Format an unchanged equation or convert it without changing meaning | Use the document, layout, or conversion route plus Equation verification. |
| Diagnose workbook references or formulas | Use `working-with-spreadsheets` or `auditing-formulas`; mathematics support is optional only for the underlying mathematical claim. |
| Ordinary prose containing a number or a simple conversational calculation | Keep the lightweight route. |

## Core skill map

- **Scope and evidence:** `scoping-the-brief`, `researching-sources`, `citing-sources`, `brainstorming`.
- **Artifact understanding:** `reading-artifacts`, `analyzing-artifacts`.
- **Planning and authoring:** `planning-work`, `drafting-prose`, `writing-reports`, `writing-academic-prose`, `editing-documents`.
- **Documents and media:** `formatting-layout`, `converting-artifacts`, `working-with-pdf`, `working-with-spreadsheets`, `auditing-formulas`, `working-with-presentations`, `storyboarding-slides`, `working-with-visuals`.
- **Completion:** `reviewing-work`, `verifying-artifacts`, `packaging-deliverables`.

## Allowed Router Capabilities

This router coordinates workflow only. Substantive artifact content remains delegated to specialists.

- `list_files(dir)` — locate bounded candidate plans or artifacts.
- `read_file(path)` — read the Session Checklist contract before a checklist-specific decision.
- `invoke_skill(name)` — load the required lifecycle, family, or specialist skill.
- `delegate(role, context)` — optionally use compatible roles when the host supports them.

## Output and completion

Return a concise route decision, the loaded skills, the current stopping point, and any real blocker. Before delivering a file result, ensure the responsible specialist routes it through `verifying-artifacts`; package only verified delivery files. Before delivering substantial chat prose, ensure `reviewing-work` has completed. Do not claim a file, native host action, rendered view, or verification that did not occur.

## Common mistakes

- Reading substantive artifact content in the router instead of loading `reading-artifacts`.
- Forcing a full lifecycle for a trivial task or skipping required stages for a substantial one.
- Treating a plan, previous workflow, or generic “continue” as permission to exceed the current request.
- Loading a specialist only in thought instead of with an actual call.
- Treating an export, command exit code, or visible checklist as proof of completion.
- Routing Coding work through the workspace workflow.
