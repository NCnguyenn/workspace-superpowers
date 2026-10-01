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


## Preview depth

Apply [visual assets and Word fidelity](visual-assets-and-word-fidelity.md): show
actual available figure previews and reviewable Markdown tables with supported
content, captions and sources under the relevant outline point. Specifications
alone do not replace an available preview. Record unavailable previews honestly;
the evidence prerequisite below still governs missing required material.

The outline shows about 40–50% of the detailed content the complete section will contain: the heading tree, the claim of each paragraph, the evidence or example it will use, the limit or implication it will reach, and every table, figure, and number the draft will use. The complete draft adds the remaining 50–60% by developing those approved points into connected prose. It does not add a new table, figure, or number. Do not reverse these ratios. Do not turn either ratio into a word-count quota, and do not invent content to satisfy a ratio.

Each main point uses these slots, in this order. A topic label is not an outline point.

- **Claim:** the sentence that point will defend.
- **Reason:** why that claim holds here.
- **Limit:** what that point will not claim.
- **Visual:** `Not needed`, or the downloaded image displayed in the same message.
- **Table:** `Not needed`, or the table rendered in the same message.

Naming a diagram or table is not showing it. For a requested illustration, search Google or another public platform, download an existing image, and display that image in the same chat message with the source citation directly under it. Display means the user can see the pixels. Embed the downloaded file. A filename, a search-results link, or a later-insert promise is not display. Do not create, generate, or code-draw a substitute. Code drawing is allowed only when the user asks for it or agrees after you ask. Silence is not agreement. Silence is not permission. An external image is not a project screenshot. Do not add an audience, unstated technology, or an operating commitment the user did not state. Those additions are not depth.

## Asset source decision

Decide the source before showing the outline. Do not invent a stand-in and continue.

| Need | Source | Do not |
|---|---|---|
| Requested illustration, standard theory, cycle, architecture, or public concept diagram | Search Google or another public platform, download an existing image, and display it in the same chat message with page title and URL under the image. | Create, generate, or code-draw a substitute. A filename or search-results link is not the image. |
| Comparison or criteria table | Full table rendered in the same message. Cells from inspected user data or a cited public source. | Fill an unknown cell with an assumed number. |
| Project screenshot, internal metric, budget, timeline, or case photo | Ask the user and wait. Show the supplied file. | Use a web image, social post, or generated image as the user's project. |
| Published public fact | Search and cite. A social post is only a lead unless the user asked to use that inspected post. | Treat an uninspected post as verified evidence. |
| Code-drawn diagram or generated image | Only when the user asks for that drawing, or agrees after you ask. Label it as a drawing, not as a found source image. | Treat silence, "continue", or analysis approval as agreement. |
| Hypothetical number | Only after explicit permission for that gap. Label it hypothetical. | Treat silence as permission. |

Chat framing follows the language of the user's current message. Do not default that language to Vietnamese. Explain each necessary source term in the same sentence, and do not add a line-by-line translation. The outline intended for submission follows the locked submission language.

If several valid organizations of sections, evidence, tables, or diagrams remain, invoke `brainstorming`. Present 2–3 outlines, recommend one, and stop. The user chooses which outline to revise or adopt. Do not select one and write the section.
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
