# Work Plan: <title>

Use under the [persistent work-tracking contract](../references/work-tracking.md).
This is a template, not an active plan. Replace placeholders on adoption; omit
inapplicable optional sections. Users supply answers in chat, never schema fields.
Paths in the adopted record resolve relative to that record. Remove this template
instruction and its package-relative link from the user's instantiated file.

## Identity and Authority

```yaml
record_type: work_plan
work_id: <stable ID assigned by the agent>
plan_file: <canonical path>
task_root: <authorized task root>
output_root: <authorized output location>
plan_revision: 1
lifecycle: active # active | paused | completed | canceled
updated_at: <timestamp with timezone>
tracking_consent: <user decision/reference and authorized record locations>
authorized_operation: <requested action and stopping point>
```

## Resume Here

- Current target: <artifact ID, path, revision, item/heading>
- Last checked checkpoint: <what was actually saved/inspected>
- Next action: <concrete action within recorded authorization>
- Completion condition: <observable result for that action>
- Read next: <only relevant source IDs, revisions and exact locators>
- Pending decisions / blocked actions: <question IDs or none>
- Temporary task / return point: <if applicable>

## Brief and Applicable Decisions

- Objective / audience: <...>
- Included / excluded scope: <...>
- Deliverable language: <applicable explicit instruction or English default>
- Outputs / deadline / length / format / citation requirements: <known values or unknown>
- Continuity: <argument, terminology, voice, numbering; adjacent prose read as needed>
- Criteria availability: <supplied | not_provided | user_confirms_none | incomplete_read>
- Scope / outline decisions: <existing record locator or decision IDs below>
- Outline version: <version; approval applies only to recorded scope>

## Source and Extraction Register

| Source ID | Role / path | Revision / fingerprint | Inspected coverage / locators | Gaps / conflicts |
|---|---|---|---|---|
| <ID> | <rubric, draft, reference, template> | <actual identity> | <pages/headings/tables> | <unread/OCR uncertainty or none> |

## Requirements and Coverage

| Criterion ID | Obligation / origin | Source revision + locator | Work items | Evidence needed | Acceptance check |
|---|---|---|---|---|---|
| <ID> | <source requirement, user decision, AI proposal, unknown> | <traceable locator> | <IDs> | <source or gap> | <check, including threshold/weight if supplied> |

Completeness: <verified coverage or specific unread/missing portions; do not call incomplete extraction exhaustive>

## Outline / Work Items

Keep stable item IDs when headings are renamed. Use outline entries for writing
or milestones for other office work; do not invent chapters for unrelated tasks.

- <Item ID — heading/milestone>
  - Purpose / main points: <...>
  - Criteria: <IDs or not applicable>
  - Evidence / visuals: <locator and purpose, missing input, or not needed>
  - Project references: <project ID + relevant claim/locator, or none>

| Item ID | Status | Artifact revision / locator | Blocker / dependency | Next action | Check / acceptance references |
|---|---|---|---|---|---|
| <ID> | <todo/drafting/review/revision_needed/done> | <exact target> | <ID or none> | <action> | <actual checks and scoped decisions> |

## Project References (Optional)

Omit when no project evidence is needed. Reference the single designated context
record; do not duplicate its contents or treat a folder as a mandatory chapter.

| Project ID | Source root | Context file | Inspected source revision | Relevant work items / claims |
|---|---|---|---|---|
| <ID> | <path> | <exact path> | <revision and dirty-state/coverage limits> | <IDs and purpose> |

## Artifact Registry

Repeat per deliverable family when work includes several outputs.

| Artifact ID | Role | Path | Revision / fingerprint | Verification | Approval reference / scope |
|---|---|---|---|---|---|
| <ID> | working | <editable file> | <revision and actual hash if available> | <checks or missing> | <pending or existing decision> |
| <ID> | approved | <preserved snapshot/version-history locator> | <exact approved revision> | <actual checks> | <decision ID and sections> |

| Export ID / path | Export revision | Source artifact / revision | Verification | Currency relative to working / approved |
|---|---|---|---|---|
| <ID + path> | <actual identity> | <exact source> | <independent output checks> | <current/stale/not applicable for each baseline> |

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

## Recent Changes

- <timestamp> — <saved change, reason, affected items and revisions>

Keep this short. Archived decision/check records retain exact locators. This plan
is derived state; originals and actual user decisions remain authoritative.
