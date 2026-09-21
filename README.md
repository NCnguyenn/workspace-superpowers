# Workspace Superpowers

Workspace-domain counterpart of [obra/superpowers](https://github.com/obra/superpowers): an installable **skill pack** for knowledge and office work.

It is not a coding framework, not a UI plugin, and not a document-generator library. After install, workspace prompts auto-route. Do not type `/skill`.

Core lifecycle: **route → scope → read → analyze → plan → draft/edit → review → verify → package**. Stages follow the requested operation. Trivial file edits skip ceremony, never final file verification; chat-only content does not require a generated file.

The root `package.json` `"pi"` field is distribution/discovery metadata only. Skills are portable and must not depend on it.

Deliverables and repository content default to English, even when the user communicates in Vietnamese. Use another language only on an explicit user request. See the [language policy](references/language-policy.md).

See the [design specification](docs/workspace-superpowers-design.md).

## PI-Desktop local preview

Build an installable package for PI-Desktop 0.15.1 with Python 3.9+ (standard
library only):

```powershell
python scripts/test-package-pi.py
python scripts/package-pi.py
```

Install `dist/pi/local.workspace-superpowers-0.1.1.piplug` from PI-Desktop's
Plugins page, or choose the generated `dist/pi/local.workspace-superpowers`
folder. Grant `agent.prompt.inject`, enable the plugin for the target project,
and merge the supplied bootstrap into that project's effective instructions.
See [installation and rollback](adapters/pi/install.md),
[bootstrap](adapters/pi/bootstrap.md), and
[real-world trial prompts](adapters/pi/dogfood.md).

The builder preserves all 23 skills and their supporting references, uses
explicit skill IDs, and reopens the archive to check every byte. Existing output
directories are refused; use `--out dist/pi-next` for another build. Package
validation is separate from runtime acceptance in PI-Desktop. No global
instructions, installed plugins, or user documents are modified by the build.

## Skill catalog

The current package contains 23 skills. Availability of actual artifact operations depends on the host's capabilities.

| Group | Implemented skills |
|---|---|
| Entry and lifecycle | `using-workspace-superpowers`, `scoping-the-brief`, `reading-artifacts`, `analyzing-artifacts`, `planning-work`, `reviewing-work`, `verifying-artifacts`, `packaging-deliverables` |
| Research and citations | `researching-sources`, `citing-sources` |
| Documents and conversion | `editing-documents`, `formatting-layout`, `converting-artifacts`, `working-with-pdf` |
| Spreadsheets | `working-with-spreadsheets`, `auditing-formulas` |
| Presentations and visuals | `working-with-presentations`, `storyboarding-slides`, `working-with-visuals` |
| Prose | `drafting-prose`, `writing-reports`, `writing-academic-prose` |
| Mathematics | `working-with-mathematics` (optional support, independent computation where detected, separate reasoning review) |

The prose family adds three complementary skills:

| Skill | Responsibility |
|---|---|
| [drafting-prose](skills/drafting-prose/SKILL.md) | Checks applicable brief, outline approval or waiver, and evidence prerequisites; selects writing specialists and hands content to review. Cannot approve its own work. |
| [writing-reports](skills/writing-reports/SKILL.md) | Separates problem/objective, plan, method, observed results, and evaluation/limits; maps criteria and evidence to headings, tables, and figures. |
| [writing-academic-prose](skills/writing-academic-prose/SKILL.md) | Develops claims with evidence and interpretation, calibrates certainty, and removes empty phrasing. Four to five sentences is guidance for developed paragraphs, not a quota; concise complete paragraphs remain valid. |

## Writing against criteria

The [shared contract](references/criteria-writing-contract.md) applies to interpreting, outlining, drafting, or substantively revising report/thesis content against requirements. Users need not name a skill or provide an internal mode value.

| Mode | Example request | Result and stopping point |
|---|---|---|
| `analyze` | “Analyze this experimental-evaluation criterion only.” | Interpret obligations, scope, and evidence needs; stop without drafting or demanding outline approval. |
| `outline` | “Outline this section and identify its evidence and figures.” | Present a proportional outline and wait for feedback. Outline approval alone does not authorize writing the report. |
| `draft` | “Write the section against these criteria.” | Resolve applicable scope/outline decisions, write supported content, then review requirement, coherence, evidence, and prose. Reuse valid approvals and explicit waivers. |
| `revise` | “Rework this section's argument using these results.” | Substantive revisions use prose specialists and affected-scope rules. Typo, wording-only, and format-only changes retain their lightweight editing routes. |

Silence is not approval. Scoping owns scope confirmation; planning owns outline versions and decisions; drafting consumes those decisions. Small outlines may be shown in chat. Each heading maps obligations, main points, and evidence to a visual decision: **Not needed**, or name/type, purpose, position, source/data, preparer, and status.

Missing measurements block dependent assertions, not independent authorized work. A permitted early draft uses neutral placeholders and remains `draft_incomplete`. Hypothetical illustrations require explicit permission and local labels; they never substitute for required project results. Spreadsheet, slide, formatting, and conversion tasks do not acquire report-writing approval gates.

## Flexible requests and coherent continuation

Every skill references the [workflow continuity contract](references/workflow-continuity.md).
The router interprets each new message with retained context: answer side
questions normally, inspect late files, update affected work, and resume at the
next authorized step. Pending decisions remain scoped to dependent actions;
users do not have to follow a prescribed conversation sequence. Explicit pauses,
replacement requests, and cancellations are respected.

The [document continuity contract](references/document-continuity.md) requires
reading the relevant source structure and surrounding passages before continuing
a report or thesis. A compact profile carries its argument, project context,
terminology, register, presentation, and evidence limits through planning,
writing, and review. Review includes the transition between existing and new
text. Existing approvals and language decisions remain applicable; the profile
does not add another interview or approval gate.

Audit-only and storyboard-only requests stop at their requested outputs.
Continuation preserves an established citation convention; Harvard is the
fallback only when citations are required and no convention is specified.

## Review and delivery

For sustained work, the [tracking contract](references/work-tracking.md) adds
agent-managed persistence through the existing lifecycle. At the first Workspace
turn or a continuation, read an adopted `work-plan.md` before asking for progress,
then read only relevant source slices. Offer tracking once when useful; simple
questions, short deliverables and isolated edits do not acquire extra files.
Users answer and approve through chat. Existing context records and decisions
are reused rather than duplicated.

The [plan template](templates/work-plan.md) links requirements to work items,
optional project evidence, exact working/approved artifacts and export source
revisions. Project descriptions appear only in mapped sections. Word/PDF rubric
extraction retains original locators and unread/OCR gaps; a saved plan is not
proof all criteria were read. Startup discovery requires effective workspace
instructions and access to the same files; it is not a host background service.

| Role | Review responsibility |
|---|---|
| [reviewer-requirement](agents/reviewer-requirement.md) | Criteria, applicable scope, outline, and required components |
| [reviewer-coherence](agents/reviewer-coherence.md) | Argument flow, section structure, terminology, and logical consistency |
| [reviewer-citation](agents/reviewer-citation.md) | Academic and internal evidence, including logs and benchmarks; bibliography may be N/A |
| [reviewer-prose](agents/reviewer-prose.md) | Paragraphs, lists, register, cadence, and redundant phrasing under the [style-guide Rule IDs](references/academic-writing-style.md) |
| [reviewer-mathematics](agents/reviewer-mathematics.md) | Assumptions, notation, derivations, proofs and the limits of computational checks |

Reviewers return findings; the author applies corrections and affected content is rechecked. Fabricated data, unsupported empirical results, and violations of applicable scope/approval boundaries are Critical. Wording corrections within authorized scope do not restart approval. Visual review is selected when applicable. Files, including permitted incomplete drafts, must be reopened after their final edit/export; chat-only delivery makes no file-verification claim.

## Word mathematics and project folders

The [approved constraints](docs/math-and-project-constraints.md) are integrated
through shared references rather than a separate lifecycle:

The router selects mathematics from the actual request and retained section
content. Users need not name a skill: deriving a recurrence, explaining a proof
or continuing a mathematical thesis section adds the mathematics specialist.
Equation alignment stays with document layout; cell-formula audits stay with
spreadsheet skills. See the [activation table](skills/using-workspace-superpowers/SKILL.md#mathematics-activation).

- [Word mathematics](references/math-in-documents.md): paste, author, edit and
  export preserve native editable Equation. Mathematical content, OMML structure,
  appearance and edit/save/reopen are separate checks. Missing required checks
  block Word completion; limited alternatives require explicit acceptance.
- [Mathematical checks](references/mathematics-checks.md): assumptions, notation,
  numbered steps and per-check evidence; samples are not universal proof.
- [Project grounding](references/project-grounding.md): inspect the relevant
  folder slice and map it to the report; reuse one derived context Markdown file.
  App/database observation does not authorize code/config/schema/Git/data edits,
  tests, evidence builds or migrations. Nonsoftware projects stay in Workspace.

The [local capability record](adapters/codex/capabilities.md) reports actual host
coverage. It is not a guarantee for other Word versions or Pi installations.
Acceptance cases are in [the math/project campaign](tests/scenarios/manual/math-project-constraints.md).
Structural tests, response-level trials and actual Word runtime tests are
different evidence classes; do not infer one from another.
The [upgrade report](docs/math-project-upgrade-report.md) records implemented
behavior, test evidence and the unresolved native Word runtime limitation.

## Validation status

The criteria-writing and continuity instructions are implemented. Run the
tracked architecture suite with `npm test`. These checks cover structure, not
observed model behavior.

The local **C01–C08** continuity campaign completed nine independent task runs
(C07 split into two), including five multi-turn conversations and 17 scored
request/response turns. A separate evaluator confirmed **response-level PASS**
for all nine tasks. The retained responses demonstrate side-question handling,
late-file incorporation, resumption, cancellation, evidence-conflict handling,
source-consistent continuation, and review/audit/storyboard boundaries.

Full hidden skill/tool traces were not retained; these results do not certify
every skill invocation or all runtime behavior. A before/after manifest confirms
unchanged final bytes for 52 existing files across C04–C08. The initial baseline
launch was blocked by unavailable agent credits, so no before/after behavioral
improvement is measured. **B01–B16** and **L01–L06** (long thesis, DOCX/PDF,
compaction, citation preservation, execution traces) remain **PENDING**.
Evidence: `tests/scenarios/reports/continuity-live-20260920/report.md`.

Architecture tests, operator scripts, and retained evidence packs under `tests/`
are tracked. `tests/scenarios/runs/` and ad-hoc `tests/scenarios/reports/report-*`
dumps stay gitignored, as do `docs/superpowers/plans/`.

```powershell
npm test
```

