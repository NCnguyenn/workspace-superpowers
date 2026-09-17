---
name: using-workspace-superpowers
description: Use when starting any workspace, document, research, office, or mixed knowledge-work request — before clarifying questions, planning, or touching files.
---

# Using Workspace Superpowers

Single entry router for the workspace domain. Classify and route. Contains no format procedure.

## When to use

Knowledge or office artifact work. Not coding. Not simple Q&A with no artifact.

## When not to use

Software engineering, debugging, refactoring, or test work — those belong to Superpowers. Mixed tasks: keep this router for the workspace slice only.

## Procedure

1. Load this before acting.
2. Existing file → `reading-artifacts` then `analyzing-artifacts` before any edit.
3. Any substantive change to an existing text/document artifact → `editing-documents` (including full redesign).
4. Before claiming done → `verifying-artifacts`.
5. Coding → Superpowers, not here.
6. Interview only if a missing fact would change the deliverable (typo-fix = no interview).

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `invoke_skill(name)` — load the matching specialist.
- `delegate(role, context)` — optional, only where the harness exposes roles.
- `list_files(dir)`, `read_file(path)` — only to identify which artifact the request is about. Opening and reading it belongs to `reading-artifacts`.

## Dependencies

None. This router is the entry point and is required background for every other workspace skill. It routes to `reading-artifacts`, `analyzing-artifacts`, `editing-documents`, and `verifying-artifacts`; it never inlines their procedures.

## Fallback

If a named specialist is missing, use a valid lower-level capability that still completes the job safely. If none exists, stop and disclose the limitation. Do not halt solely because the specialist folder is absent.

## Common mistakes

- Interviewing on a typo-fix.
- Routing coding work here.
- Skipping verification because a command exited 0.
- Stopping only because a specialist directory is not present when a safe fallback still exists.
- Embedding a specialist's procedure in this router instead of routing to it.
- Reading the artifact here instead of routing to `reading-artifacts`.
