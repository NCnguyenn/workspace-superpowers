# Continuing an Existing Document

Use when writing the next criterion, paragraph, section, or chapter of an existing
report/thesis, or making a substantive revision that must fit its surroundings.
The document remains one argument in one project context. A new section must
advance that argument, not become an unrelated miniature report.

## Inspect before continuing

For folder-based reports retain the [project grounding record](project-grounding.md),
including `context_file`, source provenance/revisions, coverage, conflicts and
the heading-to-path mapping. For mathematics, preserve the existing notation,
assumptions, derivation IDs and [check records](mathematics-checks.md). Continue
from the latest adopted Word revision under [Equation fidelity](math-in-documents.md);
do not regenerate from stale LaTeX over the user's edits. Recheck only the affected
content and its dependencies, including layout after pagination changes.

Use `reading-artifacts` for files and `analyzing-artifacts` for interpretation.
For pasted text, inspect it directly. Establish the current document/version,
requested insertion point, applicable criterion, and output form (chat proposal
or in-file edit). Do not invent which criterion comes next when the source and
conversation leave multiple materially different choices.

Read the document's structure, relevant introduction/objectives, immediately
preceding passage, following passage if inserting, and referenced definitions,
methods, results, tables, and figures. Follow dependencies beyond the neighboring
paragraph when needed. For a long document, inspect these targeted portions and
record coverage; do not claim a whole-document read from a short excerpt. Reuse
unchanged inspected content still available in context rather than rereading
every file. A changed source or uncertain version requires a fresh read.

## Continuity profile

Capture these applicable facts in the existing brief or conversation state,
with source locators and short representative excerpts. This is an internal
working aid, not another approval gate or mandatory user questionnaire.

| Dimension | Record from the document and user instructions |
|---|---|
| Argument and placement | Document purpose, research question, chapter/criterion map, what preceding sections established, and what this section must add. |
| Project context | Same system, actors, setting, dataset, method, time period, and limits. Distinguish implemented behavior, planned work, observation, and interpretation. |
| Evidence | Relevant claims, sources/locators, units, conditions, uncertainty, missing evidence, and unresolved contradictions. User-provided claims are not automatically verified. |
| Terminology | Preferred names, abbreviations already defined, notation, translation choices where authorized, and terms that must not be interchanged. |
| Voice and register | Formality, narrative person, tense by function, certainty, paragraph development, and level of technical detail. Use actual surrounding prose as the reference. |
| Presentation | Heading hierarchy/numbering, paragraph/list/table usage, figure/table numbering and captions, citation convention, cross-references, and visible document styles. |
| Boundaries | Requested section, preserve-list, selected language, source coverage limits, and user-requested deviations from existing conventions. |

For a new document, establish the profile from the brief and first accepted
sections, then carry it forward. If multiple authors or source sections conflict,
prefer the adopted template and the relevant approved section; surface a material
unresolved conflict instead of inventing a single established style.

## Resolve precedence and limits

Explicit current instructions and adopted requirements control the affected
scope. Preserve applicable prior decisions and compatible document conventions;
use the [writing style guide](academic-writing-style.md) for gaps and clarity.
Do not reproduce factual errors, unsupported claims, inflated certainty, or
unreadable prose merely to imitate the source. Flag material defects and keep
corrections within the authorized scope; do not rewrite earlier chapters silently.

Follow the [language policy](language-policy.md). Source language alone is not
an override of the English default. Honor an explicit applicable language
instruction, including one to continue in the source language. If same-language
integration and the selected output language conflict, clarify that specific
conflict before insertion rather than silently translating protected text.

Preserve a coherent existing citation convention unless the user or adopted
requirements specify a change. Use [citation style rules](citation-styles.md)
when citations are required and no convention has been established. Do not
introduce formal citations or external research solely to imitate academic prose.

## Compose the continuation

1. Apply the authorized operation and any unresolved prerequisites from the
   [criteria-writing contract](criteria-writing-contract.md). “Continue section
   3” reuses valid scope/outline decisions; it does not restart the whole report.
2. Identify the relationship to prior content: explanation, application,
   comparison, result interpretation, limitation, or next methodological step.
   Write the opening so that relationship is clear; do not add a generic
   introduction or repeat definitions that the reader already has.
3. Develop only the requested contribution. Reuse the established project
   scenario, terminology, units, and evidence limits. Match the surrounding
   register and presentation while allowing methods, results, and discussion
   to use the tense and structure appropriate to their different functions.
4. Integrate supplied evidence by claim/criterion, not by copying one source
   summary after another. Reconcile disagreements and identify missing support.
   Preserve prospective language for planned evaluations and do not turn an
   earlier tentative observation into a confirmed or production-wide result.
5. Check numbering, citations, figure/table references, and adjacent transitions.
   Do not claim an uninspected figure or unwritten chapter exists. Change
   neighboring text only within authorized scope; otherwise identify the small
   reconciliation needed. File insertion belongs to the relevant editing skill.

Pass the profile, necessary adjacent excerpts, evidence locators, target version,
and preserve-list to the writing specialist and reviewers. Generic labels such
as “academic tone” alone do not provide enough context for a continuation.

## Review the seam and dependent content

- Requirement review checks the requested criterion, insertion point, boundaries,
  and adopted requirements.
- Coherence review reads the new text together with relevant adjacent passages;
  it checks progression, contradictions, duplicated explanations, scenario drift,
  and dependent conclusions.
- Prose review compares the actual passages for register, person, tense by
  function, terminology, paragraph/list usage, and presentation conventions.
- Evidence review checks sources, conditions, certainty, and repeated quantities
  across old/new text, tables, and figures.

Return concrete locations and fixes. Review only what was inspected and state
missing context. Smooth standalone prose is insufficient when its transition or
facts conflict with the document. Recheck affected seams after corrections and
verify the final file after the last edit/export. Chat-only continuation receives
content review without a claim that the source file was modified.

## Example

Earlier sections compare a baseline configuration and an indexed configuration
on a staging catalogue and explicitly lack CPU data. The next section proposes
further evaluation. Continue using those terms and limitations, and describe
repeated trials and tail-latency measurement as future work. Do not rename the
indexed configuration a cache, invent CPU savings, switch to a promotional
bullet list, or claim that production users already benefited.
