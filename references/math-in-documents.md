# Native Mathematics in Word

Use this contract whenever a requested paste, authoring, edit, formatting-only change, or export puts mathematics in a Word document. It adds representation and fidelity checks to the existing [workflow continuity contract](workflow-continuity.md); it creates no new approval gate. Check mathematical reasoning separately under [mathematical checks](mathematics-checks.md).

## Required representation and source ownership

Identify the expressions required by the source and the requested operation. Each required formula must retain its mathematical content as a native, editable Word Equation (`oMath` / OMML) in the deliverable after save and reopen. An image, Unicode lookalike, or literal LaTeX `$...$` in the document is not a native Equation. Ordinary prose symbols do not each need a separate Equation, and an entire prose paragraph must not be replaced with math markup.

Edit the latest user-designated Word revision. Preserve user edits, notation, bookmarks, numbering, references, other equations, and neighboring content. A newer generated file is not automatically authoritative; source LaTeX is supporting material rather than a synchronized master unless the user adopts it. Establish the source and target revisions before changing formulas.

## Entry path: inspect, act, and check

| Entry | Required action | Stop or disclose when |
|---|---|---|
| Paste | Inspect the actual pasted representation. Keep existing native OMML or convert supported LaTeX, MathML, or mathematical Unicode to equivalent OMML. Reconstruct an image only if transcription is reliable. | A symbol or grouping is ambiguous: ask rather than guess. If clipboard access is absent, report that paste was not tested. |
| Author | Establish assumptions and notation with the mathematics specialist when needed. Detect an actual document-edit or conversion capability before creating native Equations. | A plain-text authoring route cannot create OMML: do not promise editable Word math. |
| Edit | Inspect existing equation structures and source locations, change only requested math, and preserve unrelated equations and meaning. Use a disposable copy for editability experiments. | Do not place test edits in the deliverable or silently change a mathematical claim to improve formatting. |
| Export | Compare the source expressions with the actual target equations and inspect their structure and content. | Missing, flattened, or altered math fails fidelity, even if the conversion command succeeds or the file opens. |

Preserve inline/display placement, readable fraction and matrix height, scalable delimiters, limits, and subscripts. Avoid fixed line heights that clip equations. Break long expressions at meaningful boundaries without changing their meaning. Use document-native equation numbering and cross-references where required; imported formula labels are not guaranteed to survive.

## Detect capabilities before promising completion

Detect creation/conversion, inspection, rendering, and edit/save/reopen support **separately**. These are required capability categories, not assertions that a particular host supplies them. Identify unsupported constructs early. A structural check cannot stand in for a visual or Word editability check.

For each final artifact revision, record and perform the supported checks:

1. Map every required expression to its source mathematical content and target location/ID. Compare meaning, not just the equation count: a matching count is insufficient to prove fidelity.
2. Inspect native OMML at those locations. A nonempty `oMath` containing the wrong expression or literal LaTeX does not pass; neither does an image or text substitute.
3. Inspect rendered pages for symbols, grouping, line breaks, clipping, numbering, and cross-references. Identify the actual renderer; rendering in another application does not prove Microsoft Word editability.
4. On a **copy** of the final document, open and edit a representative of each used equation structure and every changed formula, save/reopen, and compare intended content, Equation structure, and layout. Check that untouched formulas remain intact. Reopen the delivered original unchanged and keep its identity separate from the test copy.
5. Record the tested Word application, version/platform, entry paths, output revision, results, and limits. Recheck affected formulas and layout after later edits or exports; old checks do not verify a new revision.

Keep mathematical correctness, native structure, rendered appearance, and editability as separate results. An unavailable check is `unverified`, never a pass. If a required Equation capability or check is unavailable, do not call the Word artifact complete; continue independent authorized work.

## Limited handoff and shared checkpoint

An image or raw-LaTeX alternative requires the user's **explicit acceptance** of a limited handoff in this task. Reuse applicable recorded acceptance instead of asking again. Specify exactly what remains uneditable or unverified and do not describe the result as satisfying the native-Equation requirement. A source image can be input without authorizing an image as the final formula. Never flatten an equation silently to repair its appearance.

Store `word_math_checks` in the existing brief/checkpoint, not a parallel tracker. Include target revision, formula/source locators, entry path, native-structure and content comparisons, renderer/visual result, edit/save/reopen evidence, Word environment, unresolved limits, and any explicit limited-handoff acceptance. Omit this record for tasks without Word mathematics.