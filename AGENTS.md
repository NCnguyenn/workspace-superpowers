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

On the first Workspace turn in a new chat and on continuation, discover an
existing `work-plan.md` before asking for progress or reading all source files.
Follow the [persistent work-tracking contract](references/work-tracking.md):
use the recorded plan path or bounded task-root discovery, route its read to
`reading-artifacts`, then load only sources needed by its current item. Reuse
matching plans and user decisions. Propose agent-managed tracking for sustained
work; do not create it for simple Q&A, isolated edits or one-off exports. Users
review and consent in chat; they need not create folders or maintain metadata.
An existing plan does not turn an unrelated question into permission to resume.

For ongoing Workspace work, apply the [workflow continuity contract](references/workflow-continuity.md).
Interpret each new message in context: answer side questions normally, read new
files before using them, preserve unaffected decisions, and resume at the relevant
step. A pending question does not block unrelated work, and an off-topic answer
is not approval. Users do not need to follow the workflow's expected sequence.
When continuing a report, retain its argument, project context, terminology,
voice, and presentation under the [document continuity contract](references/document-continuity.md).

Never claim a skill was followed unless it was loaded.

## Deliverable Language

English is the default for authored content, skills, documents, reports, outlines, and generated/exported artifacts, regardless of the conversation language. Use Vietnamese or another language only when the user explicitly requests it for the relevant deliverable. Follow the [deliverable language policy](references/language-policy.md); do not infer output language from Vietnamese conversation or source material.

## Honesty

Never claim a file was created, edited, converted, or formatted unless the
actual artifact was re-inspected. Never fabricate a citation. Never report
success for a capability that is missing.
