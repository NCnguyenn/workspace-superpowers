---
name: verifying-artifacts
description: Use when any artifact has been created, edited, converted, or exported and success is about to be claimed.
---

# Verifying Artifacts

Re-open the real artifact before claiming success.

For Word mathematics, enforce the [native Equation contract](../../references/math-in-documents.md).
Record content, OMML structure, rendered appearance and native edit/save/reopen
checks separately, with target revision and Word environment. Missing required
Equation checks block Word completion even when generic opening/rendering passes.

Apply the [workflow continuity contract](../../references/workflow-continuity.md)
when resuming or receiving changed files. Verify the current target version;
do not reuse a check invalidated by an intervening write, insertion, or export.

## When to use

Any created, edited, converted, or exported file is about to be reported as done.

## When not to use

No artifact was produced or changed.

## Procedure

1. Reopen or re-read the actual file.
2. Compare against the deliverable contract and the preserve-list.
3. Run the format-specific checks for that type: `references/artifact-verification.md`.
4. Render where a render capability exists; say so when it does not.
5. Record what was checked and what could not be checked.
6. Only then report success.

Command success is not artifact success.

A check on an earlier generation is stale after another write or conversion.
Inspect the latest file before reporting. Do not regenerate a failed export
unless a different converter exists; if you regenerate, verify the new file.

If render or visual check is unavailable, say so. Never treat a command exit code as proof the artifact is correct.

An export is verified separately from its source: check both.

The report must state which artifacts exist at which paths, which checks passed, which checks were impossible — for a missing capability or an undefined criterion — and any residual limitation.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `verify_artifact(file)` plus the typed inspection capability for that artifact.
- `render_document(file)`, `render_presentation(file)`, `render_image(file)` where visual QA is possible.
- `recalculate_spreadsheet(file)`, `audit_spreadsheet(file)` for workbooks.
- `read_file(path)` for text-bearing artifacts only; a byte stream from a binary format is not a re-open.

## Dependencies

- `reading-artifacts` — required background; verification is a re-read of the real file.
- Any skill or role that created or modified the artifact — whatever produced the file lands here before success is claimed. `editing-documents` is one producer, not the only one.

## Fallback

If the file cannot be re-opened, do not claim success. Disclose the limitation.

## Common mistakes

- Treating exit code 0 as proof the artifact is correct.
- Verifying the source but not the export, or the export but not the source.
- Claiming a render or visual QA that was never performed.
- Omitting artifact paths from the final report.
- Reporting success when the file could not be re-opened.
