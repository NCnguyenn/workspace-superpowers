# Reports grounded in a project folder

Applies to a folder path, a detailed description already in that folder, or both.
Use the [workflow continuity contract](workflow-continuity.md) and the existing
brief/evidence register. This procedure does not authorize implementation work.

## Canonical context identity and provenance

Use at most one designated `project-context.md` for a concrete project and
reuse its recorded identity, path and source revision across continuations. The
context is a derived evidence record, never a second progress tracker; without
a concrete project and explicit setup authority, do not create one. Record
whether each claim is planned/intended, user-provided or user-described,
source-inspected, runtime-observed, tested/test evidence, or unknown/unverified.
Keep readiness explicit (`ready`, `gap`, `blocked` or `unknown`) and separate
it from content progress, approval and verification.

## Acquire and inspect

With an accessible path, list and read all files needed for the relevant slice;
do not ask the user to restate the whole tree. Record the observed structure,
file roles and coverage. Skip dependencies/generated outputs by default, inspect
them only when necessary, and record uninspected regions. Read-only version
metadata is permitted. A commit alone does not identify uncommitted contents:
record relevant dirty state or observed file revision/hash/mtime as available.

Read an existing detailed description for orientation, then inspect the sources
needed by the claims. Description-only input with no readable path remains
`user_provided`; do not invent a directory tree or verified implementation.
Record conflicts among descriptions, source content and observed behavior with
their provenance, revision/environment and what each establishes. Never silently
override one with another. Runtime observations may concern a different deployment.

## Survey authority and software handoff

Survey does not permit changes to code, configuration, schema, Git state or data.

Read-only survey permits necessary reading and looking at an app/database,
including read-only queries and screenshots. It does **not** permit changes to
code, configuration, schema, Git state or data. Tests, builds for evidence and
migrations require explicit user permission. This boundary also excludes package
installation, generated code, seed data, writes hidden in startup scripts, and
UI actions that mutate records. Inspect startup prerequisites before opening;
if opening requires a prohibited mutation or command, stop that action and obtain
permission or use existing read-only evidence. Merely calling a command a
"preview", "smoke check" or "health check" does not authorize it.

Route a software investigation to `using-superpowers` with these exact limits
and the bounded question. Generic coding instructions to install, test, build,
commit or fix do not override the survey's authorization. A nonsoftware project
(data, drawings, lab records, course material) stays in Workspace reading and
analysis. Classify operations, not the word "project".

The Coding-to-Workspace handoff returns only:

- Observed tree slice and file roles; files actually read with precise locators.
- Source revision and coverage, including relevant uncommitted differences.
- Commands actually authorized and run, conditions/results and evidence locators;
  explicitly distinguish existing test logs from tests run during this survey.
- App/DB observations with URL or instance, time, relevant viewport/query and
  environment; no credentials or secret values.
- Description/source/runtime distinctions, conflicts, inaccessible and uninspected
  regions, and which claims remain unsupported.

Missing access or measurements blocks dependent assertions, not the supported
sections. Do not generate new measurements through prohibited commands.

## One derived context file

Use at most one designated derived Markdown file for a concrete project, such as
`project-context.md`. A new context is placed in the approved report workspace or
other authorized output location by default. An existing adopted context may stay
inside the source project only when that exact source-project path was explicitly
authorized and recorded. An explicitly authorized new source-project path is
also a valid placement override; it grants no other repository writes. Survey
authority alone must not choose a new path inside the source project. Record the
exact `context_file` path and placement authority in the existing
checkpoint and reuse it across continuations. Do not create a new file per
session, skill, chapter or reviewer. If no authorized location is available,
return the missing output-location decision rather than selecting an arbitrary
source-project path. If multiple candidates exist, use the recorded identity or
resolve the ambiguity before writing.

Label it derived. Store only inspected paths, source locators/revisions, coverage,
structure mapping, conflicts, unread areas and check limits; exclude secrets.
Its statements are summaries, not original evidence. Re-read changed source files
and update affected claims before reusing them. The context file is a persisted
view of the same checkpoint/evidence register, not an independently edited source
of truth. Reconcile it with current sources on resumption.

When persisting survey memory, the router hands the inspected context content
and designated `context_file` to `editing-documents`, which owns creation or
update of this one record. Reading and analysis return grounded content without
writing; the router coordinates without writing. This bounded persistence task
also works when no new outline or report draft is requested. Honor any explicit
no-write instruction, and verify the actual record after writing. Do not generate
a report or a second checkpoint file as a side effect. A first write uses the
authorized output location and context-creation scope; if a work plan is adopted,
reuse its tracking consent and placement decision. A survey-only context does
not require creating a work plan. Prior authorization for an existing context
is reused without another setup interview.

The assistant detects external changes only when it can access and inspect the
relevant source; it does not provide continuous or background monitoring between
turns. Record the last checked revision and inspection coverage. A commit alone
does not prove that uncommitted changes are absent, so inspect relevant diffs or
other available revision evidence before reusing a claim.

When the exact context path is explicitly authorized inside the source project,
creation or update of that one designated derived context is the only permitted
context write there. This permission comes from that path-specific authorization,
not survey authority alone. Other new contexts and requested report outputs,
temporary files and screenshots belong outside the source folder in an authorized
output location, unless the user explicitly permits the exact additional write.
Do not create duplicate context records under either placement. Do not clean up,
rename, copy into or reorganize the source project during packaging. If no output
write is authorized, retain observations in conversation and return the missing
output-location decision. Read/reinspect the context file after an authorized
update; never claim a write based on a proposed change list.

When a work plan is adopted, apply [persistent work tracking](work-tracking.md)
to bind `project_id`, source root and this exact `context_file` to the relevant
work items. The plan lives in an authorized output location unless additional
project writes were explicitly allowed. Survey authority alone still does not
create a plan. Preserve context identity/metadata on refresh; a raw inventory
generator that replaces the whole file is not an editor for an adopted record.
Consult context only for items needing project evidence. Its availability does
not authorize a project-description chapter or changes to an approved outline.

## Structure mapped to the report

Analysis produces `structure_map`: heading/criterion, project paths, file roles,
source locators, coverage and limitations. Planning owns the actual outline.
Use directory-mapped headings when requested, without inventing unseen paths.
A folder does not automatically become a chapter. Preserve the adopted rubric
and existing approved outline unless the user authorizes a change; map project
evidence into those headings. When current instructions conflict with an adopted
requirement and the intended override is unclear, ask only about that conflict.

Each claim keeps its evidence status in the existing `evidence_register`.
Record provenance separately (description, inspected source, observed runtime,
user statement or illustration); provenance is not a truth status. No new
scope/outline approval gate is introduced by obtaining a folder or context file.
