# Work Plan: <title>

<!-- Template instructions: remove this block from an adopted work plan. -->
Use this template only after the user agrees to durable tracking for sustained work under the [persistent work-tracking contract](../references/work-tracking.md). The executing agent creates and maintains the single canonical `work-plan.md`; the user answers questions in chat, not schema fields. Do not create a plan for a simple answer, isolated edit, or one-off export. Place the adopted plan and deliverables together only after the required placement decision.

Required when adopted: the resume checkpoint, brief, single item register, identity/authority, source coverage, and applicable decision/check references. Project references, assets, exports, completed summaries, and math checks are conditional on actual work; omit unused rows instead of inventing values. Keep unknown facts as `unknown` or pending with an owner and next action. Paths in the adopted record resolve relative to that record. Remove these instructions and package-relative links from the instantiated file.

A usable checkpoint names an authorized next action, its observable completion condition, exact target revision, relevant read-next locators, and any decision blocking it. After a change, update the affected item, artifact/check/decision references, and this checkpoint together; do not maintain a second task or progress register.

## Where We Are / Resume Here

- Current position / section: <item ID/link; artifact and revision from its record>
- Last checked checkpoint: <change reference and actual saved/inspected result; check IDs>
- Next action: <concrete authorized action>
- Completion condition: <observable result for the next action>
- Read next: <only relevant source IDs, revisions and exact locators>
- Blockers / pending decisions: <links to affected item gaps and question IDs, or none>
- Temporary task / return point: <if applicable>

## What This Work Must Deliver

- Purpose and audience: <...>
- Included / excluded scope: <...>
- Authoritative brief / requirements: <path or locator>
- Deliverable language: <applicable explicit instruction or English default>
- Outputs / deadline / length / format / citation requirements: <known values or unknown>
- Continuity: <argument, terminology, voice, numbering; adjacent prose read as needed>
- Criteria availability: <supplied | not_provided | user_confirms_none | incomplete_read>
- Scope / outline decisions: <existing record locator or decision IDs below>
- Outline version: <version; approval applies only to recorded scope>

## Whole-Report Outline and Progress

Repeat the compact item block for every known section or milestone. This is the
single item-progress register; distant work may remain provisional. Reference
decision/check records rather than copying their status. The checkpoint above
owns the selected next action; item blocks describe remaining work and dependencies.

### <Item ID> — <actual heading or milestone>

- Purpose / requirements: <purpose and criterion IDs>
- Progress: <todo / drafting / review / revision_needed / done>
- Evidence readiness: <ready / gap / blocked / unknown; exact missing support>
- Content locator: <artifact ID and heading/table; revision via Artifact Registry,
  or exact chat delivery locator marked unsaved>
- Remaining work / dependencies: <unfulfilled obligations and prerequisite item/question IDs>
- Approval references: <decision IDs with revision/scope in the decision record, or pending>
- Verification references: <check IDs with result/limits in the check record, or pending>
- Project / asset references: <only relevant project, evidence, figure/table IDs, or none>

## Completed Summaries

- <Item ID/link> — <substantive argument or conclusion and inherited implications;
  use the item record for content locators, status, decisions and check limits>

## Upcoming Work and Dependencies

- <Item ID/link> — <ordering rationale; read the item's remaining work and
  dependencies, without maintaining a second task or status list>

## Recent Changes and Unresolved Decisions

- <timestamp / shared change reference> — <change, reason, affected items,
  context/source/output revisions and saved/unsaved portions; question IDs>

## Identity and Authority

```yaml
record_type: work_plan
work_id: <stable ID assigned by the agent>
plan_file: <canonical path>
task_root: <authorized task root>
output_root: <authorized output location>
context_file: <exact designated project-context.md path, or none>
placement_authority: <report-workspace | explicitly authorized source-project path | none>
plan_revision: 1
lifecycle: active # active | paused | completed | canceled
updated_at: <timestamp with timezone>
tracking_consent: <user decision/reference and authorized record locations>
authorized_operation: <requested action and stopping point>
```

## Source and Extraction Register

| Source ID | Role / path | Revision / fingerprint | Inspected coverage / locators | Gaps / conflicts |
|---|---|---|---|---|
| <ID> | <rubric, draft, reference, template> | <actual identity> | <pages/headings/tables> | <unread/OCR uncertainty or none> |

## Requirements and Coverage

| Criterion ID | Obligation / origin | Source revision + locator | Work items | Evidence needed | Acceptance check |
|---|---|---|---|---|---|
| <ID> | <source requirement, user decision, AI proposal, unknown> | <traceable locator> | <IDs> | <source or gap> | <check, including threshold/weight if supplied> |

Completeness: <verified coverage or specific unread/missing portions; do not call incomplete extraction exhaustive>

The whole-report item blocks above are the single item register. Keep stable item
IDs when headings are renamed, and update their locator/dependency fields when work
moves, merges or splits. Do not create a second item-status table.

## Project References (Optional)

Omit when no project evidence is needed. Reference the single designated context
record; do not duplicate its contents or treat a folder as a mandatory chapter.

| Project ID | Source root | Context file | Inspected source revision | Relevant work items / claims |
|---|---|---|---|---|
| <ID> | <path> | <exact path> | <revision and dirty-state/coverage limits> | <IDs and purpose> |

## Artifact Registry

Repeat per deliverable family when work includes several outputs.

| Artifact ID | Role | Path | Revision / fingerprint | Verification references | Approval references |
|---|---|---|---|---|---|
| <ID> | working | <editable file> | <revision and actual hash if available> | <check IDs or pending> | <decision IDs or pending> |
| <ID> | approved | <preserved snapshot/version-history locator> | <exact approved revision> | <check IDs> | <decision IDs with scope in the decision record> |

| Export ID / path | Export revision | Source artifact / revision | Verification references | Currency relative to working / approved |
|---|---|---|---|---|
| <ID + path> | <actual identity> | <exact source> | <independent output check IDs> | <current/stale/not applicable for each baseline> |

No approval yet: omit the approved row. No export: omit the export table.
A populated path or a newer timestamp is not approval or verification.

## Questions, Decisions and Checks

| Question ID | Missing fact / decision | Blocks | Answer / source |
|---|---|---|---|
| <ID> | <specific issue> | <affected items/actions> | <pending or actual answer> |

| Decision ID | Type | User confirmation / locator and date | Applies to version / scope |
|---|---|---|---|
| <ID> | <tracking, scope, outline, content, waiver> | <actual user decision; never inferred> | <exact target> |

| Check ID | Artifact / revision | Inspection performed / result | Limits / affected items |
|---|---|---|---|
| <ID> | <exact target> | <actual check, including failed checks> | <unverified portions or none> |

Keep this short. Archived decision/check records retain exact locators. This plan
is derived state; originals and actual user decisions remain authoritative.
