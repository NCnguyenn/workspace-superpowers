# Default Outline Structure and Evidence Readiness

Use this reference for document/report outlines and the corresponding authored sections. An explicit user-requested structure or format takes precedence. Preserve adopted numbering in an existing document unless the user authorizes a change. Slide storyboards, spreadsheet plans, and mechanical formatting tasks keep their format-specific structures. For criteria-based writing, [the criteria contract](criteria-writing-contract.md) owns analysis and outline approvals; this reference defines the outline's form and evidence prerequisite.

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

The outline and the finished section use the same blocks in the same order. About 40–50% means those blocks are already written, shorter, with the argument, example, and boundary. The finished draft adds the remaining 50–60% inside those same blocks: fuller sentences, transitions, and citations. It does not add or remove a paragraph, list, table, figure, or number. Do not reverse these ratios. Do not turn either ratio into a word-count quota.

A topic label is not an outline point. Prepare the argument using internal Claim:, Reason:, and Limit: notes, then turn those notes into natural prose. Do not print Claim:, Reason:, Limit:, Visual:, Table:, or Not needed in the delivered outline. One paragraph per heading is not an outline of a multi-part heading. Where a heading has several arguments, show a short paragraph for each in the order the final section will use. Use bullets only for genuinely parallel items, not as substitutes for reasoning.

Bad shape: one finished academic paragraph, then a source line whose URL is a wiki File page. Good shape, when the heading needs two arguments, three parallel limits, and a diagram:

[Short paragraph: what this block will defend, the example it will use, and the boundary it will not cross.]

[Short paragraph: the second argument, still shorter than the finished paragraph.]

- [Parallel limit or comparison item]
- [Next parallel item]
- [Next parallel item]

![Short description](https://upload.wikimedia.org/...direct-image-bytes...)

Source: page title, source page URL, external public illustration, not the user's project. The image URL above is a shape, not a real file. Resolve a real upload.wikimedia.org URL. Do not invent an upload path.

The finished section keeps that order: two paragraphs, that list, then that image. It fills the paragraphs. It does not merge them into one paragraph per heading, and it does not add a new block.

If a section has no image, omit the image. If it has no table, omit the table. Record `Not needed` in the planning decision, not as empty content under the heading.

For a requested illustration, embed image markdown with a direct HTTPS image URL returning image bytes in the same message, with source title and page URL immediately below. A wiki File page, bare URL, Google results page, local file path, or long base64 blob is not an embedded image; a source line without image markdown is not an image. For instance, resolve a public file page to its actual upload.wikimedia.org URL; do not invent an upload path. Do not create, generate, or code-draw a substitute unless the user asks or agrees after being asked. Silence is not permission. An external illustration is not a project screenshot. Do not add an unstated technology, audience, operating commitment, or assignment label for apparent depth. If the user did not write an example label, do not put it into a question option.

## Asset source decision

Decide the source before showing the outline; do not invent a stand-in and continue.

| Need | Required source/action | Boundary |
|---|---|---|
| Requested public illustration or theory diagram | Find and inspect an existing public image; embed image markdown with a direct HTTPS image URL returning the bytes in the same message. Provide the source citation. | A wiki File page, bare URL, file path, or long base64 blob does not display the requested image. |
| Comparison or criteria table | Render a filled, supported table in the same message, with caption and source. | Unknown cells are not assumed numbers. |
| Project screenshot, internal metric, budget, timeline, or case photo | Ask the user and wait for real project material. | A web image or generated image cannot represent the user's project. |
| Published public fact | Inspect and cite an appropriate source. | An uninspected social post is a lead, not verified evidence. |
| Code-drawn diagram or generated image | Use only on explicit request or agreement after asking; identify it as a drawing. | Do not treat silence or analysis approval as permission or present a drawing as a found image. |
| Hypothetical number | Obtain explicit permission for the specific gap and label it hypothetical. | It cannot stand in for a measured project result. |

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
