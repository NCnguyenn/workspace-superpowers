# Default outline structure and evidence readiness

Apply to document/report outlines and the corresponding authored sections.
An explicit user-requested structure or format takes precedence over this
default. Preserve numbering already explicitly adopted for an existing document;
do not silently renumber it. Slide storyboards, spreadsheet plans and mechanical
formatting operations keep their own format-specific structures.

## Heading hierarchy and protected titles

Without an explicit alternative, use `1 → 1.x → 1.x.x`: Heading 1 for the
criterion or requirement, Heading 2 for main points, Heading 3 for supporting
subpoints under their main point. In Markdown use `#`, `##`, `###`; in Word use
Heading 1, Heading 2, Heading 3 with corresponding decimal numbering. Additional
levels extend the same hierarchy only when needed. Multiple criteria use `1`,
`2`, etc., with children such as `2.1` and `2.1.1`. Do not skip a parent level.
Do not create empty subheadings or repetitive subpoints just to fill three levels.

Capture `source_title` and `source_locator` from the user's text or inspected
file. Copy the criterion/requirement title **verbatim** after its outline number:
keep its original identifier, wording, capitalization, punctuation and language.
Do not shorten, paraphrase, translate, polish, or replace it with a generic topic.
For example, a source title `P1 Explain the components of an information system`
becomes `1 P1 Explain the components of an information system`, not
`1 System Overview`. Treat the outline number as separate from the protected
source title. If the source title itself contains numbering, preserve it unless
the user explicitly authorizes removing or mapping that numbering.

If there is a separate title, preserve that title and retain the full criterion
wording in the requirement mapping. If only a criterion sentence is provided,
use that full sentence as the protected title. If only an identifier such as
`P1` is available, ask for its exact title/wording before preparing the outline;
do not invent it. Resolve unreadable or conflicting source titles with the user.
Proposed lower-level headings must follow the approved scope and selected
deliverable language. Original-language protected titles are source quotations,
not permission to add bilingual translations to the authored outline.

Each main point and subpoint needs concrete planned arguments and its applicable
evidence/table/figure decision. During drafting and export, retain the approved
hierarchy and protected title; bullets are supporting notes, not replacements
for the required numbered headings.

## Evidence before outline

During requirement analysis, determine whether the target needs numbers,
measurements, project facts, comparisons, screenshots, logs, examples, citations
or other evidence. Inspect available sources and prior answers first. Do not
demand project data for a purely theoretical criterion that does not need it.

Record `evidence_readiness` for the target in the existing brief or conversation:

| Value | Meaning and action |
|---|---|
| `not_required` | The target has no missing evidence prerequisite. State why; proceed subject to existing analysis approval requirements. |
| `provided` | Required material is accessible and inspected, sufficient for planning. Retain locators and limitations; user-provided is not independently verified. |
| `pending` | Required material is absent, unreadable or insufficient. Load `scoping-the-brief` for a focused interview and ask for the concrete missing inputs before preparing the outline. |
| `illustrative_authorized` | The user explicitly permits hypothetical/example/generated material for the specified gap. Record their permission and its scope; an illustrative outline may proceed subject to applicable analysis approval. |

When `pending`, describe what is missing, which criterion/claim needs it and
what the user can provide. Ask naturally in chat, then wait for the answer.
Do not output an affected outline, partial heading tree, example figures or
assumed results while waiting. Unrelated questions and independently authorized
sections may continue. This prerequisite also applies to outline-only requests.
Do not add a separate approval ceremony when evidence is already sufficient.

General "continue", analysis approval, urgency, permission to choose a layout,
or a waiver of writing gates is not permission to invent data. Unanswered or
partial replies leave unresolved evidence gaps pending. New files must be read
before treating a gap as resolved. Ask only about gaps not already answered.

If the user explicitly permits illustrative data or examples, label them at the
point of use as hypothetical, not measured or empirical project evidence. Keep
them distinguishable from supplied facts in headings, bullets, tables, figures
and later prose; do not invent bibliographic citations or claim generated
screenshots prove implementation. Permission for one gap is not blanket
authorization for unrelated assumptions. If a criterion demands real results,
explain that an illustrative outline does not satisfy that requirement; the
final deliverable remains incomplete until actual evidence is supplied.

Scoping owns the interview and evidence decision; planning checks readiness
before outlining. Drafting consumes the approved structure and evidence state;
review checks both fidelity and authorization. Reuse the existing evidence
register and approval record; no extra tracking file is required.
