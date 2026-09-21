# Native mathematics in Word

Applies whenever mathematics enters Word through paste, author, edit or export,
including a formatting-only edit. It adds fidelity requirements to the existing
lifecycle, not a new approval workflow. Use the [workflow continuity contract](workflow-continuity.md).

## Required representation and ownership

Every required formula must retain its mathematical content as a native Equation
(`oMath` / OMML), editable after save/reopen. An image, Unicode lookalike or raw
LaTeX `$...$` in Word is not an Equation. Ordinary prose symbols need not each
become a separate Equation; identify the actual mathematical expressions from
the source and requested scope. Do not replace entire paragraphs with equations.

Use the latest user-designated Word revision when editing. Preserve user edits,
notation, bookmarks, numbering, references and neighboring content. A newer
generated source does not automatically override the user's document. Source
LaTeX is supporting material, not a synchronized master unless explicitly adopted.

## Entry paths

| Entry | Required action |
|---|---|
| Paste | Inspect the actual pasted representation. Preserve native OMML; convert supported LaTeX, MathML or mathematical Unicode into equivalent OMML. Reconstruct image input only when transcription is reliable; resolve ambiguous symbols instead of guessing. If clipboard access is absent, say it was not tested. |
| Author | Establish assumptions/notation with the mathematics specialist when needed; create native Equation through a detected document-edit or conversion capability. Do not assume a plain-text writer can insert equations. |
| Edit | Inspect existing equation structures and source locations before changing them. Preserve unrelated equations and meaning. Perform editability experiments on a disposable copy, never insert test changes into the user's deliverable. |
| Export | Compare source expressions with actual target equations. Missing, flattened or altered math fails conversion fidelity even if the output opens. A text converter's success does not establish math support. |

Formatting keeps inline/display placement, fraction and matrix height, scalable
delimiters, limits and subscripts readable. Avoid fixed line heights that clip
math. Break long equations at meaningful boundaries without changing meaning.
Use document-native numbering and cross-references; imported formula labels are
not assumed to survive. Formatting cannot correct a mathematical claim silently.

## Capability and verification contract

Detect create/convert, inspect, render and edit/save/reopen support separately
before promising completion. The capability names are abstractions, not proof
that a host implementation exists. Record unsupported input constructs early.

For each final artifact revision, verification records:

1. Required expression locations/IDs and their source mathematical content.
2. Native OMML structures at those locations, with no image/text substitutions.
   Equation counts alone are insufficient; a nonempty `oMath` can contain the
   wrong expression or merely a literal LaTeX string.
3. Visual inspection of rendered pages: symbols, grouping, line breaks, clipping,
   numbering and cross-references. State the actual renderer used.
4. A native editing round trip on a copy of the final document: open, edit a
   representative of every used equation structure (and every changed formula),
   save/reopen, and compare intended content, Equation structure and layout.
   Check preservation of the untouched formulas too. The delivered original
   must also reopen unchanged; retain its identity separately from the test copy.
5. The Word environment (application, version/platform), tested entry paths,
   output revision, results and limitations. A different renderer is not proof
   of editing behavior in Microsoft Word. Recheck affected structures and layout
   after any later edit/export; do not reuse stale verification.

Keep content correctness, native structure, visual fidelity and editability as
separate checks. An unavailable check remains **unverified**, not a pass. Do not
claim Word complete when a required Equation capability or check is unavailable.
Independent authorized work may continue.

## Limited handoff

Image/raw LaTeX alternatives require the user's **explicit acceptance** of a
limited handoff in the current task. Reuse a recorded applicable acceptance; do
not ask again. Describe exactly what cannot be edited or verified. Such an
artifact is not completion of the native Equation requirement. Never silently
flatten equations, even to repair appearance. A source image is allowed as input;
an image as the final formula is allowed only under this limited-handoff rule.

## Shared checkpoint

Store `word_math_checks` in the existing brief/checkpoint: target revision,
formula/source locators, entry path, native-structure check, content comparison,
renderer/visual check, round-trip evidence, Word environment, unresolved limits,
and limited-handoff acceptance if any. This is optional for nonmath tasks and
does not create a parallel approval or evidence register.
