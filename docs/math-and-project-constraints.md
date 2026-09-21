# Math in Word and project-folder grounding

Scope: report/thesis work that either (a) puts mathematics into Microsoft Word, or (b) is grounded in a specific project folder. This note records the two constraints and what to do. It is not an implementation plan.

## 1. Mathematics in Word must stay native Equation

**Problem.** Users paste formulas into Word, ask to write them into Word, edit an existing `.docx`, or export to Word. Some authoring or conversion paths may flatten mathematics into images, Unicode lookalikes, or raw LaTeX such as `$...$`. Such output does not satisfy the native Equation requirement.

**Do this.**

- Every Word path (paste, author, edit, export) must produce or preserve native Equation (`oMath` / OMML). The formula must remain editable after save/reopen.
- Detect the input representation and preserve or reconstruct its mathematical content as native Equation: existing OMML → keep; LaTeX → convert to OMML; Unicode/MathML → convert if possible. An image may be an input, but is not an acceptable final formula unless the user explicitly accepts a limited handoff. Uncertain transcription must be resolved rather than guessed.
- Before claiming Word complete, verify the required formulas retain their mathematical content and native Equation structure, inspect the rendered layout, and confirm editing followed by save/reopen preserves both. Record the Word environment tested; unavailable checks remain unverified. Counting equation parts is not a pass.
- If Equation create/round-trip is unavailable, do not package `.docx` as complete. Image or raw LaTeX is allowed only if the user accepts that limited handoff in this task.
- Editing must not flatten existing Equations. Conversion that drops OMML fails verification.

## 2. A project folder is inspect-only; memory is one Markdown file

**Problem.** Grounding may start from a folder path, from a description already in that folder, or both. Agents tend either to invent structure without opening the folder, or to treat survey as a license to edit code, run tests, or write the database.

**Do this.**

- If a folder path is given: list, read, and remember all files needed for the relevant project slice. Do not ask the user to restate the whole tree. Record coverage and uninspected regions. Skip dependencies and generated outputs (for example `node_modules` and `dist`) by default, but inspect them when necessary. Read-only version metadata inspection is allowed; unrelated paths need not be read.
- If the folder already contains a detailed description (README, docs, brief): use it for orientation. When descriptions, inspected files, or observed behavior conflict, record their provenance, version/environment, and what each establishes. Do not silently resolve the conflict or infer runtime behavior from documentation or source alone. Description-only with no readable path stays `user_provided`; do not invent a tree.
- For a software project, opening the app or a database is allowed only to look: read-only queries, screenshots. This permission does not authorize tests, builds for evidence, migrations, or changes to code, configuration, schema, Git state, or data. If opening requires a prohibited action, obtain explicit user permission before that action.
- Remembering may create or update **one** derived Markdown file in that project folder (for example `project-context.md`): inspected paths, version (commit/mtime), coverage, conflicts, unread areas. Reuse that single designated context file across this survey and its continuations. If none exists, create one without overwriting an original project document. Label it derived. Do not copy secrets. Its summaries remain derived notes, not original project evidence; factual claims must retain locators to the original inspected sources. Re-read affected files when the project changes.
- That Markdown file is the only write authorized by this survey. Every other write still needs an explicit user request.
