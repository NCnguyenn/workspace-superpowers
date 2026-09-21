---
name: packaging-deliverables
description: Use when verified workspace artifacts are ready to be named, organized, and reported as the final delivery set.
---

# Packaging Deliverables

Assemble, organize, and produce the final delivery report for verified workspace artifacts.

For [persistent work tracking](../../references/work-tracking.md), report the
exact delivered revision and whether it is working or user-approved. Preserve
approved snapshots and linked evidence during cleanup. After an authorized move
or rename, send new paths to the plan's editor and recheck links before delivery;
do not leave the next session pointing at an obsolete path. A new export returns
through conversion/verification rather than being marked current by packaging.

For Word mathematics, apply the [Equation completion boundary](../../references/math-in-documents.md):
do not package an unverified native Equation requirement as complete. An explicitly
accepted limited handoff retains its limitations. During project surveys, the
[project write boundary](../../references/project-grounding.md) also governs packaging:
no source-project cleanup, output copies or extra evidence files beyond the one
designated context file without explicit permission for those writes.

Apply the [workflow continuity contract](../../references/workflow-continuity.md)
to the current requested output set. If the user changes the deliverable during
packaging, route the affected work to its specialist and verification first.

## When to use

Concluding any workspace task where artifacts were created, modified, converted, or reviewed, and final delivery is being made to the user.

## When not to use

Before verification is complete. `verifying-artifacts` must verify the final files
before packaging begins. Do not include unrequested intermediate or scratch files.
An explicitly requested incomplete draft may be delivered after file verification,
with its incomplete content/evidence status retained; it is not a finished report.

## Mandatory reporting invariants

The final delivery report (following `templates/final-report.md`) must explicitly state:

1. **Artifact Paths:** Exact locations of all deliverable files, distinguishing source/editable artifacts from rendered/exported files and supporting data.
2. **Changes Made:** Clear summary of what was added, modified, or preserved.
3. **Checks Performed:** Exact verification checks that succeeded on the actual files.
4. **Unsupported Checks & Limitations:** Transparent statement of any checks that could not be run (e.g. missing visual renderer, missing OCR engine) and any residual limitations.

Never omit limitations. Never claim an unverified artifact was verified.

## Procedure

1. Verify that all artifacts declared in the deliverable contract have passed `verifying-artifacts`.
2. Clean up temporary scratch scripts and intermediate cache files.
3. Organize files into clear deliverable directories if requested (e.g. `output/`, `figures/`).
4. Ensure standard, clear file naming and versioning.
5. Generate the final delivery report covering:
   - Summary of completed deliverables and paths.
   - Substantive modifications versus preserved elements.
   - Verified integrity checks.
   - Transparent disclosure of residual limitations and unsupported checks.
6. Present the final summary to the user.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — to confirm deliverable existence and inspect verification status.
- `write_file(path, content)` — to generate the final packaging report.
- `list_files(dir)` — to locate verified artifacts in their working locations.
- `export_artifact(file, format)` / `convert_artifact(src, format)` — if an export is still required, hand it to `converting-artifacts`, then `verifying-artifacts` for the new output before resuming packaging. Source verification never verifies a new export.

## Dependencies

- Requires `verifying-artifacts` to have completed successfully for all delivered artifacts.

## Fallback

If directory restructuring or archiving tools are unavailable, deliver the verified artifacts in their current working locations, providing exact absolute paths in the final report.

## Common mistakes

* Packaging artifacts before `verifying-artifacts` has confirmed their integrity.
* Concealing limitations or claiming visual verification when only command exit code 0 was observed.
* Leaving scratch files and debugging scripts scattered in deliverable folders.
* Failing to provide clear, actionable file paths to the user.
