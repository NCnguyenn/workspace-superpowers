---
name: packaging-deliverables
description: Use when verified workspace artifacts are ready to be named, organized, and reported as the final delivery set.
---

# Packaging Deliverables

## Job

Assemble the verified files the user requested and report exactly what is being delivered. Packaging organizes and describes a verified set; it does not create missing content, treat an unverified export as current, or conceal a limitation.

Use [workflow continuity](../../references/workflow-continuity.md) to respond to changed delivery scope. For durable work, preserve output revision and working/approved status under [persistent work tracking](../../references/work-tracking.md). A packaging action never grants content approval or changes a plan record by itself.

## Inputs and output

**Inputs:** requested delivery set, verified artifact paths and revisions, source/export relationships, naming or directory constraints, and known limitations.

**Output:** a concise final delivery report with exact paths, changes, verification evidence, unsupported checks, and remaining blockers or limits.

## Preconditions

Every delivered file must have completed `verifying-artifacts` on its latest requested revision. An explicitly requested incomplete draft can be delivered only with its incomplete evidence or content status retained; it is not a completed report. Do not include scratch, temporary, cache, or unrequested intermediate files.

For Word mathematics, apply the [native Equation contract](../../references/math-in-documents.md): do not package a failed or unverified native Equation requirement as complete. For project-folder work, apply [project grounding](../../references/project-grounding.md): do not clean, rename, copy into, or reorganize source projects without explicit permission.

## Method

1. **Confirm the delivery set.** List the exact files and their role: editable source, export, supporting data, or asset. Confirm that each has a current verification result.
2. **Check identities and relationships.** Keep working and approved revisions distinct. Confirm each export’s source revision and settings; a new export returns to conversion and verification.
3. **Organize only as authorized.** Apply requested naming or destination rules. Do not move a file merely to make a neater package, and do not introduce a new archive or report file unless requested.
4. **Report the outcome.** Follow the [final report template](../../templates/final-report.md) proportionately. Include:
   - exact artifact paths and roles;
   - substantive changes and preserved elements;
   - verification checks performed on actual files;
   - unsupported checks, remaining limitations, and incomplete status where applicable.
5. **Present the final summary.** Make it possible for the user or downstream owner to find and understand every delivered file.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `list_files(dir)` — locate requested verified files.
- `read_file(path)` — inspect delivery and verification records.
- `write_file(path, content)` — create a requested packaging report.
- `export_artifact(file, format)` and `convert_artifact(src, format)` — only when a requested export still needs the `converting-artifacts` and `verifying-artifacts` route.

## Completion and fallback

If directory restructuring or archiving is unavailable or unauthorized, deliver verified files in their current paths and state that choice. If a required artifact has no current verification, return it to `verifying-artifacts` rather than calling the package complete.

## Common mistakes

- Packaging before the final artifact is re-opened and verified.
- Including scratch files or silently omitting a requested deliverable.
- Presenting an export as current without checking its selected source revision.
- Hiding a missing visual, native Equation, OCR, or rendering check.
- Reporting a working draft as approved or complete.
