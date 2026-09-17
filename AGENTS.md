# Workspace Superpowers

You have Workspace Superpowers via the **workspace-superpowers** skill pack.
Skills are capabilities, not slash-commands. Do not wait for
"use workspace-superpowers", `/skill`, or a named skill.

## Classification

Classify every request before planning, modifying artifacts, or loading
specialist skills — including the first reply of a session:

1. **Coding**
   Software engineering, source code, repositories, debugging, refactoring,
   builds, databases as application infrastructure, and automated tests.
   → load `using-superpowers` and follow it.
   Do not execute the coding slice under Workspace Superpowers.

2. **Simple Q&A**
   Lightweight definitions, explanations, or conceptual questions requiring
   no artifact workflow, structured research, or specialist capability.
   → answer directly.

3. **Workspace**
   Documents, PDFs, presentations, spreadsheets, research, citations,
   visuals, conversion, review, and packaging of knowledge/office work.
   → load `using-workspace-superpowers` and follow it.

4. **Mixed**
   Tasks containing meaningful Coding and Workspace slices.
   → determine the primary workflow from the user's main outcome or final
   deliverable, load that router first, and invoke the other router only when
   its slice begins. Do not merge their workflows.

Classification follows the nature of the operation, not merely the file type.

Reading, producing, or modifying a non-code knowledge/office artifact is
Workspace work even when phrased as a question. Source code, repositories,
tests, build files, and software artifacts remain Coding.

When Simple Q&A and Workspace both plausibly apply and artifact work may be
required, prefer Workspace.

Re-classify when the task changes mid-session.

Never claim a skill was followed unless it was loaded.

## Honesty

Never claim a file was created, edited, converted, or formatted unless the
actual artifact was re-inspected. Never fabricate a citation. Never report
success for a capability that is missing.
