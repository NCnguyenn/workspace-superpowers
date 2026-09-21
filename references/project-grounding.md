# Reports grounded in a project folder

Applies to a folder path, a detailed description already in that folder, or both.
Use the [workflow continuity contract](workflow-continuity.md) and the existing
brief/evidence register. This procedure does not authorize implementation work.

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

Survey authority permits creating or updating **one** designated derived Markdown
file inside the source project, such as `project-context.md`. Record its exact
`context_file` path in the existing checkpoint; reuse that context file across
continuations. Do not create a new file per session, skill, chapter or reviewer.
If no context file exists, choose an unused Markdown path without overwriting an
original README, rubric or other source document. If multiple candidates exist,
use the recorded identity or resolve the ambiguous choice before writing.

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
a report or a second checkpoint file as a side effect.

This is the only project-folder write authorized by survey. Store requested
report outputs, temporary files and screenshots outside that source folder in an
authorized output location, unless the user explicitly permits additional writes
there. Do not clean up, rename, copy into or reorganize the source project during
packaging. If no output write is authorized, retain observations in conversation
and return the missing output-location decision. Read/reinspect the context file
after an authorized update; never claim a write based on a proposed change list.

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
