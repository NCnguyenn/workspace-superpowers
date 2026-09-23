# Changelog

Changes are listed newest first. The current package version is **0.1.3-beta9**.
Historical entries below were reconstructed from retained local package contents,
the Git history, and the criterion workflow report. They describe implementation
changes, not proof of publication or successful execution in PI-Desktop.

The local folders named beta2 through beta5 still declared `0.1.3-beta` in their
package manifests. They are build iterations, not distinct semantic-version
releases. The changes after the existing 0.1.1 commit are being published as one
consolidated source update; this changelog does not imply separate historical
commits or tags for those builds.

## 0.1.3-beta9 — 2026-09-23

- Ask for missing data/evidence before completed analysis only when the current
  requirement needs it. Pure theory and metrics needed only by later sections
  do not trigger a project-data interview. Reuse supplied facts and scoped
  illustrative permission; never embed invented defaults in an analysis.
- Permit PI evidence question cards with chat fallback, while keeping ordinary
  analysis/outline approvals in chat. Empty or skipped answers remain pending.
- Require PEEL development, a nonmechanical 4–5-sentence paragraph benchmark,
  and complete grammatical clauses instead of casual dash chaining.
- Set a 65% discursive-prose floor for core analytical sections, with explicit
  counting scope and format exceptions. Keep tables and atomic lists as support
  for reasoning; align the writing specialists and prose reviewer.
- Complete references at every cited section delivery, including chat excerpts
  and cumulative saved reports. Audit citation/source correspondence in both
  directions and verify metadata; never guess bibliographic fields.
- Align citation routing for required or existing citations, and refresh the PI
  bootstrap so older project instructions receive these rules.
- Validation: **117 automated tests and 5 package integration tests passed**.
  Added structural regression coverage and manual Unit 7 cases. Native PI
  multi-turn acceptance remains **PENDING**; simulations are not host evidence.

## 0.1.3-beta8 — 2026-09-22

### Outline structure and title fidelity

- Default document outlines and their corresponding prose to Heading 1/2/3,
  numbered `1`, `1.x`, `1.x.x`, unless the user explicitly requests another
  structure. Preserve explicitly adopted existing numbering.
- Copy the supplied criterion or requirement title verbatim into Heading 1,
  retaining identifiers, punctuation, capitalization and original language.
  Main points belong at level 2; supporting subpoints at level 3.
- Request missing or unreadable criterion wording instead of inventing a title
  from an identifier such as P1. Keep protected titles unchanged through drafting.
- Replace the generic Section 1/Section 2 outline template with an explicit
  numbered hierarchy, concrete arguments, evidence and visual specifications.

### Evidence before outlining

- During analysis, inspect required data and evidence before handing off to
  planning. Missing required inputs trigger a focused `scoping-the-brief`
  interview and block the affected outline, including outline-only requests.
- Continue only after adequate inputs have been inspected or the user explicitly
  permits illustrative material for the particular gap. General approval,
  urgency and permission to choose a layout do not authorize fabricated data.
- Label authorized hypothetical examples locally and distinguish them from
  measured project results. They cannot satisfy a requirement for actual results.
- Preserve separate analysis approval and evidence readiness; neither substitutes
  for the other. Purely theoretical work does not require irrelevant project data.
- Apply the shared contract in scoping, planning, routing, drafting, requirement
  review, the brief/outline templates and PI's refreshable instructions.

### Validation

- Added structural regression checks and packaged-hook assertions for heading
  hierarchy, protected source titles and evidence prerequisites.
- Added H01–H09 manual PI scenarios covering source language, missing evidence,
  illustrative permission, supplied data, explicit numbering overrides and draft
  continuity.
- Verification at completion: **112 automated tests and 5 package integration
  tests passed**. The beta8 archive was reopened and every packaged byte checked.
- Fresh native PI tool-trace acceptance for these behaviors remains **PENDING**.
  Instruction review and simulations are not native host execution evidence.

## 0.1.3-beta7 — 2026-09-22

- Added a per-message routing block: select the next operation from the current
  request and retained context, and call the workspace router on each Workspace
  turn before loading the relevant specialists.
- Preserved direct Simple Q&A, separate Coding routing, pending approvals,
  temporary task return points, cancellations and scoped stopping points.
- Refreshed routing and specialist-call blocks independently in the PI
  `before_agent_start` hook. A current writing-stage block no longer suppresses
  a missing or stale routing block in an older project bootstrap.
- Preserved surrounding project instructions/custom paths and avoided duplicate
  injection. Hosts exposing both event APIs register one handler.
- Clarified that the hook injects instructions; it does not execute `Skill` or
  certify the model's tool trace. Updated installation and capability notes.
- Aligned routine approval interactions with natural chat rather than mandatory
  modal cards, and allowed storyboard planning directly from pasted text.
- Added R01–R09 multi-turn routing acceptance scenarios and packaged them with
  the plugin.
- Verification at completion: **109 automated tests and 5 package integration
  tests passed**; archive contents and SHA-256 were checked. Native PI behavior
  for the new routing rules was not certified.

## 0.1.3-beta6 — retained local build

- Added mandatory native specialist calls at stage transitions, including later
  turns following approval: scoping, planning, drafting, writing specialists and
  review must actually load before their work.
- Updated the hook to refresh the specialist-call contract even when an older
  project bootstrap or Workspace Superpowers heading is present.
- Required the prose style reference to be read before composition and review
  to occur before delivering substantial prose in chat.
- Required review-role instructions for the non-delegated review fallback;
  strengthened prose/coherence checks and documented actual-call evidence.
- Added hook/package integration checks and expanded the criterion runtime trial.
- Adopted the distinct manifest version `0.1.3-beta6`.

## Internal beta5 build — manifest 0.1.3-beta

- Bound outline points to approved analysis and drafted prose to the approved
  outline, preserving coherence across the three stages.
- Required tracking and project deliverables to share a dedicated project folder.
- Required a project interview and explicit approval before creating tracking
  or project Markdown files; retained full drafted text delivery in chat.
- Extended plan discovery to the dedicated project directory.

## Internal beta4 build — manifest 0.1.3-beta

- Expanded requirement analysis to command verbs, cognitive depth, scope
  boundaries, theory versus project application, evidence, diagrams and tables.
- Added detailed numbered-outline guidance with concrete arguments and visual
  specifications. Beta8 later replaced the earlier H2/H3/H4 examples with the
  explicit H1/H2/H3 default and protected source titles.
- Required full section drafts in chat and a stop for user review before moving
  to the next section.

## Internal beta3 build — manifest 0.1.3-beta

- Removed robotic approval-stage tags and workflow lectures from user-facing
  responses while retaining the underlying separate approval decisions.
- Clarified natural in-chat requests for analysis and outline approval.

## Internal beta2 build — manifest 0.1.3-beta

- Replaced the bootstrap's mandatory modal approval cards with ordinary chat
  review. Reserved structured cards for explicit requests or suitable complex
  choices. Beta7 subsequently aligned the shared guide and host mapping.

## 0.1.3-beta — retained local build

- Changed the package label and installation references from 0.1.3 to the beta
  version. The retained archive comparison shows no workflow-content change in
  this version-label iteration.

## 0.1.3 — retained local build

- Extended separate analysis and detailed-outline approvals across sections,
  chapters and criteria, including introductory content.
- Clarified that requests to write immediately and approved master headings do
  not substitute for applicable detailed decisions.
- Strengthened rules against invented project context and operational metrics.
- Separated conversation language from the English default for authored content
  and prohibited unsolicited interleaved bilingual output.
- Introduced the PI lifecycle bootstrap hook; later betas refined refresh logic.

## 0.1.2 — retained local build

- Established criterion-level analysis, separate detailed-outline approval,
  command-verb interpretation and source-versus-authorization boundaries.
- Added native PI question-tool schema examples and explicit handling of skipped,
  canceled and empty answers. Later betas changed the default interaction to chat.
- Strengthened developed-paragraph guidance and prose review while retaining
  useful lists, tables and numbered headings.
- Added regression scenarios, guided-question references and packaging checks.
- Historical validation and its limits are recorded in the
  [0.1.2 implementation report](docs/criterion-workflow-0.1.2-report.md). Its earlier
  ignore-policy/test failures and UI defaults are historical, not current status.

## 0.1.1 — existing commit fc8f14f

- Added persistent work tracking, plan discovery, reusable user decisions and
  PI packaging on top of the existing workspace skill pack.
- Earlier commits established workflow/document continuity, mathematics and
  Word-equation support, project grounding, and bounded inspection tools.

## Repository publication notes

- Include the architecture tests, adapter tests, scenario operators, synthetic
  fixtures and retained evidence packs so the automated suite is reproducible.
- Keep generated `dist/` packages, local scenario runs and ad-hoc report dumps
  ignored. Build installable packages using `python scripts/package-pi.py` with
  a fresh `--out` directory. Committing source does not create a GitHub Release
  or upload a `.piplug` asset.
- Historical evidence packs retain their original observations and limitations;
  they are not fresh beta8 acceptance results.
