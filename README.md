# Workspace Superpowers

Workspace-domain counterpart of [obra/superpowers](https://github.com/obra/superpowers): an installable **skill pack** for knowledge and office work.

It is not a coding framework, not a UI plugin, and not a document-generator library. After install, workspace prompts auto-route. Do not type `/skill`.

Core lifecycle: **route → scope → read → analyze → plan → draft/edit → review → verify → package**. Stages follow the requested operation. Trivial file edits skip ceremony, never final file verification; chat-only content does not require a generated file.

The root `package.json` `"pi"` field is distribution/discovery metadata only. Skills are portable and must not depend on it.

Deliverables and repository content default to English, even when the user communicates in Vietnamese. Use another language only on an explicit user request. See the [language policy](references/language-policy.md).

See the [design specification](docs/workspace-superpowers-design.md).

## Skill catalog

The current package contains 22 skills. Availability of actual artifact operations depends on the host's capabilities.

| Group | Implemented skills |
|---|---|
| Entry and lifecycle | `using-workspace-superpowers`, `scoping-the-brief`, `reading-artifacts`, `analyzing-artifacts`, `planning-work`, `reviewing-work`, `verifying-artifacts`, `packaging-deliverables` |
| Research and citations | `researching-sources`, `citing-sources` |
| Documents and conversion | `editing-documents`, `formatting-layout`, `converting-artifacts`, `working-with-pdf` |
| Spreadsheets | `working-with-spreadsheets`, `auditing-formulas` |
| Presentations and visuals | `working-with-presentations`, `storyboarding-slides`, `working-with-visuals` |
| Prose | `drafting-prose`, `writing-reports`, `writing-academic-prose` |

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

## Review and delivery

| Role | Review responsibility |
|---|---|
| [reviewer-requirement](agents/reviewer-requirement.md) | Criteria, applicable scope, outline, and required components |
| [reviewer-coherence](agents/reviewer-coherence.md) | Argument flow, section structure, terminology, and logical consistency |
| [reviewer-citation](agents/reviewer-citation.md) | Academic and internal evidence, including logs and benchmarks; bibliography may be N/A |
| [reviewer-prose](agents/reviewer-prose.md) | Paragraphs, lists, register, cadence, and redundant phrasing under the [style-guide Rule IDs](references/academic-writing-style.md) |

Reviewers return findings; the author applies corrections and affected content is rechecked. Fabricated data, unsupported empirical results, and violations of applicable scope/approval boundaries are Critical. Wording corrections within authorized scope do not restart approval. Visual review is selected when applicable. Files, including permitted incomplete drafts, must be reopened after their final edit/export; chat-only delivery makes no file-verification claim.

## Validation status

As of 2026-09-19, the criteria-writing implementation and structural checks are in place. The local architecture suite passes **49/49**, with no failures or skips. Behavioral cases **B01–B16 remain PENDING**: no dedicated interactive acceptance transcripts have been recorded. Structural PASS and bounded review exercises are not behavioral acceptance or release certification.

`tests/` and `docs/superpowers/plans/` are intentionally local-only and excluded from Git distribution. In a development workspace containing those files, run:

```powershell
node --test (Get-ChildItem -Path tests/architecture/*.test.mjs | ForEach-Object { $_.FullName })
```
