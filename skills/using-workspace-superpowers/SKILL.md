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
* `verifying-artifacts` — validate generated or modified artifacts before completion is claimed.

Additional family and specialist skills are selected according to the task.

Examples include:

* Research & Evidence: `researching-sources`, `citing-sources`
* Documents & Media: `editing-documents`, `working-with-pdf`, `presentations`, `spreadsheets`, `visuals`
* Finishing & Delivery: `formatting-layout`, `converting-artifacts`, `packaging-deliverables`

The catalog is extensible. These examples are not an exhaustive list.

This router never inlines specialist procedures.

## Procedure

1. **Confirm Workspace Ownership**

   * Determine whether this is Workspace work, Coding work, Simple Q&A, or the workspace slice of a mixed request.
   * Coding slices belong to `using-superpowers`.

2. **Locate Target Artifact(s)**

   * Use `list_files` only when necessary to identify the relevant artifacts.
   * Do not read substantive artifact content inside this router.

3. **Resolve Blocking Ambiguity**

   * If missing information would materially change the requested outcome or make execution unsafe, invoke `scoping-the-brief`.
   * Do not invoke scoping for mechanical, reversible, or already well-specified work.
   * Do not ask for information already available from the request, artifacts, or established context.

4. **Route Content Reading**

   * Existing artifact → invoke `reading-artifacts` before any content-dependent action.

5. **Route Analysis When Needed**

   * If the task requires diagnosis, interpretation, comparison, judgment, critique, synthesis, or substantive revision → invoke `analyzing-artifacts`.
   * Purely mechanical edits may proceed directly from reading to the relevant editing specialist.

6. **Plan Only When Complexity Warrants It**

   * Invoke `planning-work` for multi-stage, high-risk, multi-artifact, or otherwise complex work.
   * Do not require a planning stage for trivial or mechanical tasks.

7. **Compose Domain Specialists**

   * Invoke the family and specialist skills required by the deliverable.
   * Keep lifecycle responsibilities separate from format-specific procedures.

8. **Mandatory Verification for Created or Modified Artifacts**

   * Every created or modified artifact must conclude with `verifying-artifacts` before completion is claimed.
   * A successful command, script, export, or exit code is not sufficient evidence of artifact correctness.

## Typical Routes

Mechanical edit:

`reading-artifacts → relevant editing specialist → verifying-artifacts`

Substantive document revision:

`reading-artifacts → analyzing-artifacts → editing-documents → verifying-artifacts`

Ambiguous complex deliverable:

`scoping-the-brief → reading-artifacts → analyzing-artifacts → planning-work → relevant specialists → verifying-artifacts`

Research deliverable:

`scoping-the-brief when needed → researching-sources → citing-sources → relevant authoring specialist → verifying-artifacts`

Mixed coding/workspace task:

`workspace router handles workspace slice ↔ using-superpowers handles coding slice`

Do not merge their procedures into a single workflow.

## Common Mistakes to Avoid

* **Reading artifact content in this router:** substantive reading belongs to `reading-artifacts`.
* **Interviewing by default:** invoke `scoping-the-brief` only when ambiguity is materially blocking.
* **Asking for information already available:** inspect existing context and artifacts first.
* **Enforcing analysis on trivial fixes:** simple changes may use Read → Edit → Verify.
* **Enforcing planning on trivial work:** planning is proportional to complexity.
* **Skipping verification because a command exited 0:** command success does not prove layout, typography, formulas, citations, structure, or visual correctness.
* **Assuming a missing specialist requires total failure:** attempt a safe lower-level fallback first.
* **Inlining specialist procedures:** Word, Excel, PDF, presentation, research, and visual procedures belong in their respective skills.
* **Routing coding work into workspace workflows:** software engineering remains with `using-superpowers`.
* **Treating the listed specialist examples as the complete catalog:** the router must remain extensible.
