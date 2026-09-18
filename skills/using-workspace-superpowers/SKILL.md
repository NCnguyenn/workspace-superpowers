---
name: using-workspace-superpowers
description: Use when starting a workspace-primary document, research, office, or knowledge-work request, or when entering the workspace slice of a mixed request — before planning or touching workspace artifacts.
---

# using-workspace-superpowers

Single entry router for the workspace domain. Classify, compose, and route. Contains no format-specific procedure.

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

Apply the [shared language policy](../../references/language-policy.md): authored deliverables default to English unless the user explicitly requests another language. Vietnamese conversation or input does not select Vietnamese output. Carry the resolved language into the brief and downstream specialists; a missing language instruction does not require an interview.

## Allowed Router Capabilities

This router coordinates workflow only.

It may use:

* `list_files(dir)` — locate or resolve candidate artifacts without reading substantive content.
* `invoke_skill(name)` — load the appropriate lifecycle, family, or specialist skill.
* `delegate(role, context)` — optional; use only when the harness exposes compatible delegation or subagent roles.

Content reading, substantive interpretation, artifact manipulation, and verification are delegated to specialist skills.

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

* Research & Evidence: `researching-sources`, `citing-sources` (invoke only upon explicit user request for external research, reference materials, or citations)
* Documents & Media: `editing-documents`, `formatting-layout`, `working-with-pdf`, `working-with-spreadsheets`, `auditing-formulas`, `working-with-presentations`, `storyboarding-slides`, `working-with-visuals`
* Prose: `drafting-prose`, `writing-reports`, `writing-academic-prose`
* Transform: `converting-artifacts`

The catalog is extensible. These examples are not an exhaustive list.

This router never inlines specialist procedures.

## Criteria-based writing routes

Use the [criteria-writing contract](../../references/criteria-writing-contract.md) for activation, state, and authorization. Infer `task_mode` from the requested operation, not the words “report” or “thesis”. For source files, invoke `reading-artifacts` and applicable `analyzing-artifacts` before scoping; chat criteria need no artificial file step.

| task_mode | Route and stopping point |
|---|---|
| `analyze` | `scoping-the-brief` with `analyzing-artifacts` as needed → interpretation, scope, and evidence needs. Stop at analysis. |
| `outline` | `scoping-the-brief` as needed → `planning-work` → criterion, evidence, and visual mapping. Stop at the outline and wait for feedback; outline approval alone does not authorize drafting. |
| `draft` | `scoping-the-brief` / `planning-work` for unresolved contract prerequisites → `drafting-prose` selects writing specialist(s) → `reviewing-work`. Continue through applicable gates using recorded decisions. |
| `revise` | `editing-documents` → `drafting-prose` for substantive report/thesis rewrites under the contract; it selects prose specialists. Typo or wording-only edits stay in `editing-documents`; format-only edits use `formatting-layout`, without writing approval gates. |

Scoping owns scope confirmation; planning owns outline decisions. Drafting checks prerequisites without approving them. Reuse applicable decisions and explicit waivers; ask only about unresolved requirements or decisions. An explicit request to write after an outline can change the authorized operation under the contract.

For chat-only outputs, review the requested content without claiming file verification or creation. For file deliverables, retain `verifying-artifacts` → `packaging-deliverables`. Spreadsheet, presentation, conversion, and other unrelated routes remain unchanged.

## Procedure

1. **Confirm Workspace Ownership**

   * Determine whether this is Workspace work, Coding work, Simple Q&A, or the workspace slice of a mixed request.
   * Coding slices belong to `using-superpowers`.

2. **Select Lifecycle Skills**

   * Compose the lifecycle stages appropriate to the task scope.
   * Small tasks run lean; substantial tasks execute the full sequence.

3. **Enforce Hard Dependencies**

   * No file modification before `reading-artifacts` (and `analyzing-artifacts` for non-trivial modifications).
   * Criteria-based prose follows the contract's applicable scope and outline prerequisites, including small sections. Other complex or multi-artifact prose needs `planning-work`.
   * No file completion claim before `verifying-artifacts` re-opens the real deliverable.
   * No delivery packaging before verification has passed.

4. **Scope When Material Facts Are Missing**

   * Invoke `scoping-the-brief` for material ambiguity, criteria analysis, or unresolved scope confirmation required by the criteria-writing contract.
   * Do not interview when the brief is already clear. Clarification and required scope confirmation are separate; reuse confirmed decisions and explicit waivers.
   * When researching sources or citing references, invoke `researching-sources` and `citing-sources` only when the user explicitly requests literature research or citations. When citation style is not specified, default to Harvard Style.

5. **Analyze Before Substantive Modification**

   * Invoke `analyzing-artifacts` after `reading-artifacts` for substantive changes to existing files. For pasted text, the selected scoping or editing skill reads and interprets the supplied content directly.
   * Simple mechanical edits may proceed directly from reading to the relevant editing specialist.

6. **Plan Proportionally to the Task**

   * Invoke `planning-work` for a requested outline, unresolved criteria-writing outline prerequisites, or multi-stage, high-risk, multi-artifact, or otherwise complex work.
   * A small criterion can use a short outline in chat; no separate plan file is required.
   * Do not require a planning stage for trivial or mechanical tasks.

7. **Compose Domain Specialists**

   * Invoke the family and specialist skills required by the deliverable.
   * Keep lifecycle responsibilities separate from format-specific procedures.

8. **Review Substantial Deliverables**

   * Invoke `reviewing-work` for drafted, graded, multi-section, research, or otherwise substantial artifacts.
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

`scoping-the-brief → reading-artifacts → analyzing-artifacts → planning-work → relevant specialists → reviewing-work → verifying-artifacts → packaging-deliverables`

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
* **Invoking research or citations spontaneously:** invoke `researching-sources` and `citing-sources` only when the user explicitly requests literature research or citations.
* **Treating the listed specialist examples as the complete catalog:** the router must remain extensible.
