# Workspace Superpowers — Design Specification

| | |
|---|---|
| Status | Living design specification — implemented criteria-writing extension; behavioral acceptance pending |
| Date | 2026-09-13 |
| Revised | 2026-09-19: document implemented criteria-writing skills, contract, and review roles; retain future catalog and adapter proposals as targets |
| Package id | `workspace-superpowers` |
| Pi plugin id | `workspace-superpowers` (confirm against the installed Pi manifest schema at packaging; Superpowers ships as `obra.superpowers`) |
| Repo target | `github.com/<owner>/workspace-superpowers` (public) |
| Reference sibling | `obra/superpowers` — same product class (installable skill-pack plugin); different domain (workspace artifacts, not software engineering) |
| Approval state | Documentation prepared for user review; B01–B16 interactive acceptance remains PENDING; no release approval implied |

This document records architecture and implementation status. Explicit user
instructions and the applicable shared contracts take precedence over historical
design proposals. Where this spec and a harness's real
plugin API disagree, the harness wins for the adapter / plugin-packaging layer
and this file must be amended — the skill pack never bends to a harness.

---

## 1. Purpose

Workspace Superpowers is the workspace-domain counterpart of
[obra/superpowers](https://github.com/obra/superpowers). Superpowers is an
installable **skill-pack plugin** for software engineering. This package is the
**same product class** for **knowledge and office work**.

### 1.1 Product form

What ships is a **plugin the user installs** into a harness — the same
consumption model as Superpowers:

- **Pi Desktop (v1):** a skill-pack plugin with the same observed shape as
  `obra.superpowers` — `manifest.json`, a trivial `main.js` (`onLoad` /
  `onUnload` only), `contributes.skills`, `permissions: ["agent.prompt.inject"]`,
  `activationEvents: ["onStartup"]`. No panel, no custom commands, no
  workbench, no tools of its own, no network of its own.
- **Other harnesses (Antigravity, Claude, Codex):** the same skill pack, wrapped
  by that harness's adapter. Adding a harness does not fork the skills.
- After install, the user never types `/skill` or names this package. Workspace
  prompts auto-route via bootstrap injection.

The **content** (the Superpowers analogue of the methodology) is workspace
work: reading, inspecting, researching, writing, revising, analysing,
formatting, transforming, converting, reviewing, verifying and packaging real
artifacts (documents, PDFs, presentations, spreadsheets, images, design files).

It is not a subset of Superpowers and not a "report-writing plugin". It shares
Superpowers' DNA:

- a thin always-on bootstrap that classifies and routes,
- composable skills discovered automatically from `Use when…` descriptions,
- family routers that delegate to small specialist skills,
- role-based delegation to subagents,
- review and artifact verification before any claim of completion.

The plugin must handle the trivial case ("fix this typo, keep the format")
and the compound case ("12 research PDFs + an XLSX dataset → thesis DOCX → PDF →
defence deck") with the **same** architecture, differing only in the size of the
skill graph the router builds.

## 2. Non-goals

- **Not** a coding framework. Software engineering, debugging, refactoring and
  test work stay with Superpowers. Mixed tasks route to both, never merge them.
- **Not** a UI plugin. No panel, no custom commands, no workbench, no tools of
  its own. It **is** an installable skill-pack plugin in the Superpowers class.
- **Not** a document generator library. It does not ship its own DOCX/PPTX/XLSX
  writer; it routes to whatever capability the harness exposes.
- **Not** a citation manager. It plans, formats and verifies citations; it does
  not replace Zotero/EndNote and does not maintain a reference database.
- **Not** a full catalog at v1. v1 proves the architecture with ~23 skills; the
  catalog grows to 50–80 specialists afterwards without touching the skill pack.
- English is the default deliverable and repository language. Explicit user
  requests can select another language for a particular deliverable (§16).

## 3. Design Principles

### 3.1 Layer invariants (the most important part of this design)

Each layer has exactly one job. Crossing a boundary is an architecture error.

```
BOOTSTRAP        ≠ workflow          (classify and route only)
ROUTER           ≠ specialist impl.  (select skills only)
FAMILY SKILL     ≠ giant all-in-one  (route to specialists)
SPECIALIST SKILL ≠ tool binding      (declare capability, never a tool name)
ROLE             ≠ harness subagent  (portable role, mapped by adapter)
CAPABILITY       ≠ MCP/tool name     (abstract verb, resolved by adapter)
ADAPTER          = harness mapping   (the ONLY place tool names may appear)
```

Architecture requirements checked by tests and source review (§24):

- Adding a specialist normally requires only its owning family's trigger entry.
  A new family or lifecycle contract may need explicit entry-router integration;
  that integration must contain routing decisions, never specialist procedures.
- No file under `skills/`, `agents/`, `workflows/`, `tool-routing/`,
  `references/`, `templates/` may name a Pi, Claude, Codex or Antigravity tool,
  an MCP server, or a harness permission string.
- `AGENTS.md` (and any harness bootstrap snippet) may not grow workflow content.
  Budget: ≤ 80 lines. Exceeding it, or containing a format-specific procedure,
  is a defect.

### 3.2 Portability first

The skill pack speaks only in the abstractions defined in §11 — `invoke_skill`,
`delegate`, `inspect_document`, `edit_document`, `render_document`,
`inspect_pdf`, `extract_pdf_text`, `inspect_presentation`, `edit_presentation`,
`inspect_spreadsheet`, `edit_spreadsheet`, `convert_artifact`,
`export_artifact`, `verify_artifact`, `search_web`, `search_academic`. An adapter
maps them. Porting to a new harness means adding one adapter directory, never
forking the skill set.

The product is still a plugin. Portability means one skill pack plus one adapter
directory per harness — the same split Superpowers uses between upstream skills
and a Pi wrapping — not "this is not a plugin".


### 3.3 Automatic skill invocation

The user never types `/skill`, "use workspace-superpowers", or names a skill.
Classification and routing happen before clarifying questions, before planning,
and before touching files.

### 3.4 Adaptive ceremony

Process scales with the task; the verification gate never scales down. Interview
only where a missing fact would change the deliverable. Plan internally even
when no plan document is produced. Review and verify are mandatory for any
substantial deliverable. This Adaptive Gate is intentional: the pack learns
Superpowers' methodology, not a 1:1 clone of its "never skip a skill" red-flag
table. A typo-fix must not trigger brainstorming, a long interview, or a plan
document.

### 3.5 Evidence before assertion

Never claim a file was created, edited, converted or formatted unless the actual
artifact was re-inspected. Never fabricate a citation, author, DOI, URL, page
number or year. Never report success for a capability that does not exist.

## 4. Scope

### 4.1 In scope (mandatory coverage)

| Id | Family | Representative work |
|---|---|---|
| A | Writing / authoring | reports, assignments, essays, research reports, theses, literature reviews, proposals, business reports, technical documents, SOPs, meeting documents, executive summaries; rewrite, paraphrase, proofread, translate; tone/audience/length/structure control; natural non-mechanical academic prose |
| B | Reading / understanding | read files, analyse structure, summarise, compare multiple files, extract information, locate headings/sections/tables/figures, read layout, relate multiple documents, read templates/rubrics/guidelines/briefs |
| C | Editing | edit existing content, rewrite sections, insert/delete/replace, preserve format, heading and style control, fonts, spacing, indentation, margins, page/section breaks, headers/footers, page numbers, tables, figures, captions, TOC, references, bibliography, templates, merge/split, compare revisions |
| D | Formatting / layout | normalise layout, academic and business formatting, style consistency, heading hierarchy, typography, tables, figures, references, pagination, visual hierarchy, document polish |
| E | Research | research planning, web search, academic source search where capability exists, source discovery, credibility assessment, literature search, evidence extraction, fact checking, source comparison, claim–evidence mapping, multi-source synthesis |
| F | Citation / references | citation planning, insertion, formatting (APA / Harvard / IEEE / Chicago / other per brief), bibliography, metadata checking, source-existence checking, claim-support checking, zero fabrication |
| G | Word / text documents | DOCX, DOC, ODT, RTF, TXT, Markdown, LaTeX and other text formats the adapter supports |
| H | PDF | read, analyse layout, extract text/tables/images, OCR where capability exists, merge/split, annotate, convert, create, render/verify; know when to edit the source instead of the PDF |
| I | Presentations | read PPTX, analyse deck, storyboard, slide structure and writing, visual hierarchy, layout, speaker notes, charts, edit slides, create decks, reformat, review, export PPTX/PDF, render slides for visual QA (PPTX, PPT, ODP, PDF slide export) |
| J | Spreadsheet / data | read XLS/XLSX/CSV, sheet/range/table analysis, data cleaning, formula inspection and authoring, pivots, validation, charts, formatting, spreadsheet audit, broken formula/reference detection, workbook generation, real workbook verification |
| K | Design / image / visual | PSD/PSB where capability exists, SVG, PNG, JPG, WEBP, TIFF; read design structure, layer and layout analysis, text-layer edit, asset replacement, canvas resizing, asset export, image editing, design review, visual QA, layer preservation; explicit limitation when layered editing is unavailable |
| L | Conversion / export | DOCX→PDF, MD→DOCX, MD→PDF, PPTX→PDF, XLSX→PDF, CSV→XLSX, PSD→PNG, SVG→PNG, PDF→images, images→PDF and other conversions; verify output rather than trusting the command |
| M | Review / QA | requirement, rubric, content, argument, coherence, academic, prose, grammar, citation, source, fact, format, layout, visual, spreadsheet/data, formula, artifact-integrity review, final verification |
| N | Packaging / deliverables | create real files, naming, folder structure, editable vs rendered versions, supporting assets, references, figures, final export, versioning, deliver paths, report residual limitations |
| O | Mixed workspace tasks | multi-artifact workflows (core use case, not an exception) |

### 4.2 Out of scope

Coding tasks (§2), UI panels and workbench chrome, plugin-private persistence,
network services, any capability the harness does not expose. Packaging the
skill pack as an installable plugin **is** in scope.


## 5. Terminology

| Term | Meaning |
|---|---|
| **Plugin / skill pack** | The installable unit. Same product class as `obra/superpowers`: skills + bootstrap injection; no panel, no custom tools. On Pi this is a plugin package (`manifest.json`, `main.js`, `contributes.skills`). |
| **Bootstrap** | Thin instruction injected by the harness at session/project level. Classifies the request and routes. Contains no workflow. |
| **Router** | `using-workspace-superpowers`. Selects lifecycle and family skills for the current task. |
| **Lifecycle skill** | Phase of every workspace task: scope, read, analyze, plan, review, verify, package. |
| **Family skill** | Domain group that routes to specialists (e.g. `working-with-spreadsheets`). |
| **Specialist skill** | Small composable procedure for one job (e.g. `auditing-formulas`). |
| **Skill graph** | The ordered/parallel set of skills selected for one task, built at runtime. |
| **Role** | Portable subagent persona (`researcher`, `drafter`, `reviewer-coherence`…). |
| **Capability** | Abstract operation a skill needs (`edit_docx`, `render_presentation`). |
| **Adapter** | Harness-specific mapping of abstraction → real tool, plus capability detection, fallback rules, and plugin packaging files for that harness. |

| **Artifact** | Any real file produced, read or modified by a task. |
| **Deliverable contract** | The declared output set (paths, formats, editable vs rendered, assets) agreed before substantial execution. |
| **Finding** | A review result with severity Critical / Important / Minor / Suggestion. |

## 6. System Architecture

```
USER PROMPT
     ↓
thin bootstrap
     ↓
classify
 ┌───────┬───────────┬─────────────┐
 coding   Q&A       workspace       mixed
   ↓       ↓            ↓             ↓
coding SP direct   workspace SP   primary router
                         ↓
             using-workspace-superpowers
                         ↓
                lifecycle routing
                         ↓
            family skill discovery
                         ↓
              specialist skills
                         ↓
                   skill graph
                         ↓
              role/subagent layer
                         ↓
              capability request
                         ↓
                   adapter
                         ↓
                  actual tools
                         ↓
                     review
                         ↓
              artifact verification
                         ↓
             package + deliver
```

### 6.1 Bootstrap

Injected by the harness (`AGENTS.md` on Pi; equivalent per harness). Contents,
exhaustively:

1. Lightweight classification: coding → Superpowers; simple Q&A → answer
   directly; workspace/document/research/office/artifact work → load
   `using-workspace-superpowers`; mixed → determine the primary workflow and
   invoke secondary skills when required.
2. The prohibition on waiting for a slash command or an explicit skill request.
3. The honesty rule: never claim a skill was followed unless it was loaded.
4. A pointer to the router skill name. Nothing else.

Forbidden in the bootstrap: outlines, review checklists, format procedures,
capability lists, tool or MCP names, examples of document workflows.

### 6.2 Workspace Router

`using-workspace-superpowers` is the single entry point for the workspace
domain. It:

- classifies the prompt and locates candidate artifacts; delegates substantive
  reading and interpretation to lifecycle or domain skills,
- classifies the task against families A–O,
- selects lifecycle skills in order (§7),
- discovers family and specialist skills from catalog descriptions,
- builds the skill graph, sized to the task,
- decides delegation depth (§9.3),
- enforces the hard dependencies (§8.5),
- stops for material ambiguity or an unresolved applicable criteria-writing
  approval prerequisite (§6.9); existing decisions are reused.

It contains no domain procedure. If it grows one, that content belongs in a
family or specialist skill.

### 6.3 Lifecycle Skills

`scoping-the-brief`, `reading-artifacts`, `analyzing-artifacts`, `planning-work`, `reviewing-work`,
`verifying-artifacts`, `packaging-deliverables`. Select applicable stages by
operation: analysis-only and outline-only requests stop at their requested output.
Existing files are read before editing; substantive changes require analysis.
Mechanical edits remain lightweight, and chat-only content does not require files.

### 6.4 Family Skills

`drafting-prose`, `researching-sources`, `citing-sources`,
`editing-documents`, `formatting-layout`, `working-with-pdf`,
`working-with-presentations`, `working-with-spreadsheets`,
`working-with-visuals`, `converting-artifacts`.

A family skill is a router plus shared conventions for its domain. It lists its
specialists with trigger conditions and states which lifecycle skills must
accompany them. It must stay small enough that reading it costs less than
reading two specialists.

### 6.5 Specialist Skills

Concrete procedures, one job each, composable. The implemented prose family is
[drafting-prose](../skills/drafting-prose/SKILL.md), with
[writing-reports](../skills/writing-reports/SKILL.md) and
[writing-academic-prose](../skills/writing-academic-prose/SKILL.md).
The larger tree below is a target catalog, not an availability list; §21 lists
all currently implemented skills. In particular, dedicated thesis-management,
literature-review, and methodology skills below are not implemented.

```
drafting-prose
    ├─ writing-reports
    ├─ writing-academic-prose
    ├─ writing-essays
    ├─ writing-theses
    ├─ writing-literature-reviews
    ├─ writing-methodology
    ├─ writing-results
    ├─ writing-discussions
    ├─ writing-proposals
    ├─ writing-executive-summaries
    ├─ writing-sops
    ├─ rewriting-prose
    ├─ translating-prose
    ├─ proofreading-prose
    └─ improving-natural-prose

working-with-spreadsheets
    ├─ reading-spreadsheets
    ├─ cleaning-data
    ├─ analyzing-data
    ├─ auditing-formulas
    ├─ writing-formulas
    ├─ building-pivots
    ├─ creating-charts
    ├─ formatting-spreadsheets
    └─ verifying-workbooks

working-with-presentations
    ├─ inspecting-presentations
    ├─ planning-presentations
    ├─ storyboarding-slides
    ├─ writing-slide-content
    ├─ designing-slide-layouts
    ├─ editing-presentations
    ├─ working-with-speaker-notes
    ├─ reviewing-presentations
    └─ verifying-presentations

working-with-pdf
    ├─ reading-pdfs
    ├─ extracting-pdf-text
    ├─ extracting-pdf-tables
    ├─ extracting-pdf-images
    ├─ ocr-ing-scanned-documents
    ├─ annotating-pdfs
    ├─ merging-pdfs
    ├─ splitting-pdfs
    └─ verifying-pdfs
```

`writing-academic-prose` is a specialist, never a top-level router. It owns:
claim → reasoning → evidence → interpretation; academic register; critical
analysis; hedging; disciplinary caution; paragraph logic; avoiding unsupported
generalisation; avoiding mechanical AI phrasing. `writing-reports` owns business
and technical report conventions, which differ. Merging them would bloat
`drafting-prose` and is prohibited.

### 6.6 Role / Subagent Layer

Portable roles defined in `agents/<role>.md`. A role is a prompt contract:
inputs, job, hard limits, output shape. Roles never name harness tools. If the
harness supports subagents, the adapter spawns one; if not, the main agent
switches role at the same checkpoint and still produces the same output shape.

### 6.7 Capability Layer

`tool-routing/capabilities.md` declares abstract capabilities and their
contracts (§11). No tool names, no MCP names, no assumptions about what any
specific server supports.

### 6.8 Harness Adapters

`adapters/<harness>/` is how the skill pack becomes an installable plugin (or
the harness's equivalent) on that harness. It contains:

- `bootstrap.md` — the snippet to inject for that harness,
- `tools.md` — abstraction → harness mechanism mapping,
- `capabilities.md` — capability → concrete tool mapping **after detection**,
- `install.md` — how to install the plugin / skill pack on that harness,
- packaging files where the harness requires them (e.g. Pi `manifest.json`,
  `main.js`).

Adapter content is packaging and tool mapping, not core contract. Names such as
`Task`, `agent.prompt.inject`, `manifest.json`, `main.js` are Pi implementation
details and must be re-verified against the running Pi version before packaging
(§18.1). If the real API differs, the adapter changes; the skill pack does not.


### 6.9 Implemented criteria-writing contract

[criteria-writing-contract.md](../references/criteria-writing-contract.md) is
the shared source for activation, semantic state, approval transitions, and
missing evidence. It is not another router. Its consumers use the optional
extensions in [brief.md](../templates/brief.md) and
[outline.md](../templates/outline.md); unrelated office work omits them.

| Owner | Responsibility |
|---|---|
| `using-workspace-superpowers` | Select the requested operation and applicable lifecycle/authoring skills |
| `scoping-the-brief` | Extract criteria, establish included/excluded scope, identify evidence gaps, receive scope decisions |
| `planning-work` | Map headings to obligations/evidence/visuals; manage outline versions, revisions, and approval records |
| `drafting-prose` | Check recorded prerequisites and select report/academic specialists; never infer or create approval |
| `reviewing-work` | Coordinate four content-review dimensions, return findings, and recheck affected fixes |

```text
analyze -> scope/interpret -> stop
outline -> scope as needed -> planning -> pending outline; stop
draft   -> resolve or reuse applicable scope/outline decisions -> drafting-prose
            -> writing-reports and/or writing-academic-prose -> reviewing-work
revise  -> editing-documents -> substantive prose: drafting-prose -> review
            -> typo/wording/format: existing lightweight specialist route
files   -> reopen final artifact -> package
chat    -> reviewed content; no file claim
```

State includes `task_mode`, `criteria`, `scope`, `scope_status`, `outline_status`,
`outline_version`, `approval_record`, `evidence_register`, `blocking_gaps`, and
`delivery_status`. Preserve decisions within their recorded scope; silence is
never approval. A waiver affects only the gate explicitly waived. Outline-only
approval does not authorize drafting; approval within an existing draft request
permits continuation without another interview.

Every criteria heading records obligations, points, evidence, optional length,
and a visual decision. Assets use name/type, purpose, position, source/data,
preparer, and status; **Not needed** is valid. Small outlines may stay in chat.
Missing evidence blocks dependent claims while independent authorized work may
continue. An allowed early draft uses neutral placeholders and stays
`draft_incomplete`; permitted hypothetical examples remain labeled at every
use and cannot satisfy empirical criteria. Descriptions/code are not proof of
measured performance. English remains the default under the
[language policy](../references/language-policy.md).

## 7. Request Lifecycle

```
prompt
→ bootstrap classify
→ load workspace router
→ inspect prompt / context
→ existing files: reading-artifacts → analyzing-artifacts
→ classify task
→ select skills
→ check meaningful ambiguity
   → missing critical fact: scoping-the-brief
   → sufficient: continue
→ define deliverable / output contract
→ planning-work
→ build skill graph
→ execute
→ specialist review
→ fix Critical / Important findings
→ verify actual artifacts
→ export
→ verify exported results
→ package deliverables
→ report outputs + changes + verification + limitations
```

### 7.1 Classification

The [workflow continuity contract](../references/workflow-continuity.md) applies
to each new message, not only task entry. Retain a compact checkpoint, answer
side questions normally, inspect late files, and select the next skill according
to the current request and applicable prior decisions. An unanswered question
blocks only dependent work. Temporary switches retain a return point; canceled
work does not resume automatically. All 22 skills reference this shared contract.

For report/thesis continuation, the [document continuity contract](../references/document-continuity.md)
connects reading, analysis, planning, writing, and review. Its source-grounded
profile captures the argument, scenario, terminology, register, presentation,
and evidence limits. Writers and reviewers receive relevant adjacent excerpts;
they check the insertion boundary as well as the new section. The profile lives
in the brief or conversation state and introduces no new approval gate.

Bootstrap classifies the request domain. The router then classifies the task
inside the workspace domain: which families are involved, whether artifacts
already exist, whether evidence is required, whether the output is a single file
or a compound deliverable set.

### 7.2 Artifact Inspection

Default for any existing file: `reading-artifacts` → `analyzing-artifacts`
(structure, content, layout, requested changes, preserve-list) → edit →
reopen via `verifying-artifacts` → render if needed → deliver.

Prohibited: edit → save → "done" without verification.

### 7.3 Brief Scoping

For criteria writing, clarification and scope confirmation are separate.
Follow §6.9 even for a small section; reuse confirmed decisions and explicit
waivers. Generic interview fallbacks do not approve pending scope or outlines.

Interview only on facts that would change the deliverable: audience, purpose,
language, required format(s), length or page/slide/sheet constraints, rubric or
template obligations, citation style, source material location, output contract.

Adaptive rules:

- Trivial, fully specified ("fix this typo, keep the format") → no interview.
- Under-specified substantial work ("complete this assignment") → inspect first,
  then ask only what inspection did not answer.
- User says "just do it", "decide for me", "skip the interview", "don't ask" →
  skip the interview unless an ambiguity is dangerous (destructive edit, wrong
  language for a graded deliverable, fabricated-source risk). Internal plan,
  review and verification remain mandatory.

### 7.4 Deliverable Contract

Substantial tasks declare outputs before execution, distinguishing source /
editable from final / rendered from supporting assets:

```
outputs:
  - thesis.docx          # editable source
  - thesis.pdf           # rendered
  - references.bib       # supporting
  - figures/             # supporting assets
```

```
outputs:
  - final-deck.pptx
  - final-deck.pdf
  - assets/
```

### 7.5 Planning

`planning-work` is the generic planner. It selects the plan shape and may
compose specialist planning skills:

| Task | Plan shape |
|---|---|
| Report / essay | outline produced by `planning-work` (a `writing-outlines` specialist may take this over later) |
| Thesis | thesis architecture + research plan + chapter plan |
| Presentation | storyboard |
| Spreadsheet | analysis plan |
| Document formatting | format plan |
| Design / image | design plan |
| Conversion | conversion plan |
| Mixed project | multi-artifact plan |

Small tasks ordinarily need only an internal mini-plan. A requested or required
criteria outline must be shown to the user, but need not become a separate file.

### 7.6 Skill Graph Construction

The router composes a graph, not a fixed chain. Independent branches may run in
parallel:

```
             researcher
            ↗          ↘
inspect → planner → drafter → formatter
                     ↓          ↓
                 citations    renderer
                     ↘          ↙
                       reviewer
                          ↓
                       verifier
```

Sizing rule: simple task → main agent only; medium task → orchestrator +
reviewer; complex research/document task → researcher + drafter + reviewers;
mixed project → the specialist roles the graph requires. No gratuitous spawning.

### 7.7 Execution

The orchestrator keeps coordination context and delegates bulk production. It
does not hold a long draft in its own context when a drafter role is available.
Execution proceeds without pausing for confirmation between steps; it stops only
for a destructive or irreversible operation, an out-of-scope side effect, a
dangerous ambiguity, an unresolved applicable contract approval or evidence
prerequisite, or a plan so broken that every path forward is a guess.

### 7.8 Review

`reviewing-work` routes to the applicable review specialists (§13). Findings are
returned to the executor, which applies fixes. Reviewers do not rewrite the
artifact wholesale.

### 7.9 Verification

`verifying-artifacts` re-opens or renders the real file and checks it against the
deliverable contract and format-specific criteria (§14). Verification of exports
is separate from verification of sources.

### 7.10 Packaging

`packaging-deliverables` produces the final file set, naming, folder structure
and versioning, then reports: artifact paths, what changed, what was verified,
and residual limitations.

## 8. Skill System

### 8.1 Skill Contract

Each skill is a directory `skills/<name>/SKILL.md` with YAML frontmatter:

```yaml
---
name: auditing-formulas
description: Use when a workbook's formulas, references or calculated values may be wrong, broken, stale or inconsistent with the stated intent.
---
```

- `name`: letters, numbers, hyphens.
- `description`: third person, begins with `Use when…`, states triggers and
  symptoms only, ≤ 500 characters where possible, ≤ 1024 total frontmatter.
- Body: overview, when to use / not use, procedure, required capabilities,
  dependencies, common mistakes. Heavy reference goes to sibling files; reusable
  prompts go to `agents/`.

### 8.2 Discovery

Skills are discovered from catalog descriptions, not from a hardcoded chain. The
router matches the classified task against descriptions and loads every skill
with a plausible match, then prunes by reading the body. Loading a skill that
turns out not to apply is cheaper than skipping one that did.

### 8.3 Use-when Descriptions

Descriptions never summarise the workflow. A description that describes the
process causes agents to follow the description instead of reading the skill.
Process detail lives in the body.

### 8.4 Family → Specialist Routing

A family skill lists its specialists with trigger conditions, and the router may
also load a specialist directly when its description matches. Both paths are
valid; neither may embed the other's procedure.

### 8.5 Dependencies (exact form)

```
Existing artifact:
    reading-artifacts → analyzing-artifacts before modifying.

Complex work:
    plan before substantial execution.

Evidence-dependent factual or academic claims:
    establish evidence before asserting them.

Substantial workspace deliverables:
    perform applicable review before completion.

Any created or modified artifact:
    verify the actual artifact before claiming success.

Citation-required work:
    invoke the citation workflow whenever claims must be attributed,
    referenced, or traceable to external sources.
```

Citation is scoped to work that must be attributable. An internal SOP built from
user-supplied content, or an email proposing a meeting, has claims but needs no
bibliography.

### 8.6 Composition

Skills compose by reference (`invoke_skill(<name>)`) and by declaring required
capabilities. They never inline each other's content. Cross-references name the
skill and mark whether it is required background; they do not force-load files.

### 8.7 Failure Behaviour

If a skill cannot complete: detect the missing capability → choose a valid
fallback → preserve as much of the workflow as possible → state the limitation
explicitly → never pretend the operation succeeded. Examples: no layered PSD
editing → export a flattened image, produce precise edit instructions, or
request a compatible tool; no OCR → say which pages were unreadable; no render
capability → verify structure and declare that visual QA was not performed.

## 9. Role / Subagent System

### 9.1 Role catalog

This table includes target personas. Current role files are `inspector`,
`researcher`, `drafter`, `formatter`, `verifier`, `packager`, and the five
reviewers listed in §9.2. Other personas below are future roles, not shipped files.

| Role | Job | Hard limits |
|---|---|---|
| `inspector` | Read structure, content, layout, template/rubric | Does not modify files |
| `researcher` | Search, evaluate sources, extract evidence, record metadata | Does not write the final artifact; never fabricates sources |
| `drafter` | Write or revise content against the plan | Does not self-declare completion |
| `formatter` | Apply style, layout, TOC, captions, pagination | Does not change arguments or findings |
| `data-analyst` | Clean, analyse, compute, chart workbook data | Does not write long prose |
| `slide-author` | Storyboard and build decks | Does not author thesis body text |
| `visual-editor` | Image/SVG/layered edits where capability exists | Never claims layered edits it cannot perform |
| `citation-specialist` | Citations, bibliography, claim–source mapping | Never invents metadata |
| `reviewer-*` | Produce findings for one dimension | Does not rewrite the artifact wholesale |
| `verifier` | Re-open, render, check integrity against the contract | Never treats command success as artifact success |
| `packager` | Export, name, organise, report paths and limitations | Never omits limitations |

### 9.2 Review roles

Implemented: `reviewer-requirement`, `reviewer-coherence`, `reviewer-citation`,
[reviewer-prose](../agents/reviewer-prose.md), and `reviewer-visual`.

Argument flow belongs to coherence; prose owns sentence/paragraph style.
Separate argument, fact, format, layout, spreadsheet, and artifact-integrity
reviewer files are future possibilities, not installed roles. Domain skills
and final artifact verification cover applicable checks today.

### 9.3 Delegation depth

Delegation is a capability, not a dependency. Depth is chosen by task size:

| Task size | Delegation |
|---|---|
| Trivial (typo, single-cell fix) | main agent only |
| Small–medium (one artifact, clear brief) | main agent + one reviewer |
| Complex (multi-section, multi-source, or graded deliverable) | researcher + drafter + applicable reviewers |
| Mixed project (multi-artifact) | specialist roles per branch, parallel where independent |

If the harness has no subagent mechanism, the same roles run sequentially in the
main agent at the same checkpoints and must still produce the role's output
shape.

### 9.4 Role prompt contract

Each `agents/<role>.md` specifies: context supplied (never the orchestrator's
session history), the job, constraints, required capability list, and the exact
output shape (e.g. findings as `severity · location · problem · suggested fix`).

## 10. Artifact Model

Every artifact type defines what inspection yields and what verification means.

| Artifact | Inspection yields | Verification means |
|---|---|---|
| **DOCX / DOC / ODT / RTF** | Sections, styles, heading hierarchy, tables, images, captions, TOC, references, headers/footers, page setup | File opens; sections, styles, tables and images intact; expected content present; page breaks and layout correct; references/TOC consistent; pages rendered where capability exists |
| **PDF** | Page count, text layers, tables, figures, embedded fonts, whether it is a scan | Page count; renders; text/images/tables present; no clipping; fonts embedded; layout correct. Prefer editing the source over patching the PDF |
| **PPTX / PPT / ODP** | Slide count, layouts, placeholders, themes, charts, images, notes | File opens; slide count matches; no text overflow; assets and charts present; theme/layout consistent; slides rendered for visual QA |
| **XLSX / XLS / CSV** | Sheets, ranges, tables, formulas, references, data types, charts, formatting | Workbook opens; sheets present; formulas parse and references resolve; data matches expectation; formatting and charts intact; calculated values checked where the capability exists |
| **Markdown / TXT / LaTeX** | Structure, headings, links, math, build requirements | Structure valid; links resolve; LaTeX compiles where capability exists |
| **PNG / JPG / WEBP / TIFF** | Dimensions, colour mode, layers (flattened), visual content | Dimensions and mode as specified; renders; visual QA against intent |
| **SVG** | Vector structure, text elements, viewBox, styling | Parses; renders; text editable where required; no unintended rasterisation |
| **PSD / PSB** | Canvas, layer tree, text layers, smart objects — only with layered capability | Canvas and expected layers changed; editable structure preserved where capability exists; preview exported. Without layered capability: report limitation and fallback, never claim an editable edit |
| **Mixed artifact set** | Relationships between artifacts (report ↔ data ↔ deck ↔ figures) | Every artifact verified individually, plus cross-artifact consistency (numbers in prose match the workbook, slides match the report, figures resolve) |

## 11. Capability Model

`tool-routing/capabilities.md` declares abstractions only. Each entry states the
contract (inputs, outputs, side effects) and how to detect availability. v1
capability set:

```
invoke_skill(name)
delegate(role, context)

inspect_document(file)        inspect_pdf(file)
edit_document(file, change)   extract_pdf_text(file)
render_document(file)         extract_pdf_tables(file)
                              extract_pdf_images(file)
inspect_presentation(file)    ocr_scanned_document(file)
edit_presentation(file, ...)  annotate_pdf(file)
render_presentation(file)     merge_pdfs(files) / split_pdf(file)

inspect_spreadsheet(file)     inspect_image(file)
edit_spreadsheet(file, ...)   edit_image(file, ...)
recalculate_spreadsheet(file) inspect_layered_image(file)
audit_spreadsheet(file)       edit_layered_image(file, ...)
create_chart_spreadsheet(..)  render_image(file)

search_web(query)             export_artifact(file, format)
search_academic(query)        convert_artifact(src, format)
read_reference_documentation() verify_artifact(file)

list_files(dir)               read_file(path) / write_file(path, content)
```

Rules:

- Skills declare the capabilities they need; they never name a tool.
- A capability may be absent. Absence is a first-class state (§17).
- Capability contracts are stable across harnesses; implementations are not.

## 12. Tool Routing

Resolution order inside an adapter:

1. Detect what the harness currently exposes (installed tools, MCP servers,
   local CLIs, libraries).
2. Map each requested capability to the best available implementation, recording
   fidelity (e.g. `render_presentation` → "full" vs "structure only").
3. Where no implementation exists, record `unavailable` and the fallback.
4. Never assert a mapping without detection. An adapter that says "Office MCP
   supports X" without checking is a defect.

Core files never contain the result of step 2. Only `adapters/<harness>/capabilities.md` does.

## 13. Review System

`reviewing-work` is a **review router**. It inspects the task and deliverable,
determines the applicable review dimensions, and invokes the matching review
skills or roles. It never performs every review itself.

Four independent content dimensions have explicit owners:

| Dimension | Implemented role | Boundary |
|---|---|---|
| Requirement | `reviewer-requirement` | Criteria, applicable scope/outline, and coverage; unstated conventions are Suggestions |
| Coherence | `reviewer-coherence` | Argument flow, logic, terminology, and cross-section consistency |
| Citation/evidence | `reviewer-citation` | Academic and internal source support, including logs/benchmarks/code locators; bibliography may be N/A |
| Prose | `reviewer-prose` | Paragraphs, lists, register, cadence, clichés, and redundant endings by style-guide Rule ID |

The [style guide](../references/academic-writing-style.md) defines P/L/R/E/S/C/F,
LANG/V, and I rules. Its four-to-five-sentence paragraph benchmark is not a
quota. Reviewers never add facts to improve specificity or use AI-detector
scores as acceptance evidence. They receive bounded context, not orchestrator
session history; cross-dimension findings retain a primary owner.

| Deliverable | Review dimensions |
|---|---|
| Thesis / dissertation | requirement, argument, coherence, academic prose, citation, formatting, artifact integrity |
| Business / technical report | requirement, content, coherence, prose, citation where required, formatting |
| Essay / assignment | rubric, argument, coherence, prose, citation, formatting |
| Literature review | source coverage, claim–evidence mapping, citation, synthesis quality, coherence |
| Excel / data deliverable | data quality, formulas, charts, workbook integrity |
| PPTX deck | narrative, slide content, visual hierarchy, layout consistency, rendered visual QA |
| PDF output | pagination, clipping, fonts, links, table and figure integrity |
| PSD / design | design intent, layer integrity, export correctness |
| Translation / rewrite | fidelity to source, register, terminology consistency, target-language naturalness |

Severity contract:

```
Critical    → must fix before completion
Important   → must fix unless a clear, recorded reason justifies deferral
Minor       → fix when low risk
Suggestion  → optional
```

Reviewers return findings; the executor applies fixes. Reviewer output must not
silently restructure the deliverable.

Fabricated data, unsupported or contradicted empirical results, and violations
of applicable scope/approval boundaries are Critical. Neutral placeholders in
an authorized incomplete draft are not fabrication; mandatory evidence gaps
still prevent final completion. Wording corrections do not reopen approval.
Material argument/scope changes follow the affected-decision contract. The
executor fixes affected passages and dependent claims, which are rechecked.
All delivered files, including incomplete drafts, need final inspection;
chat-only review makes no claim of file creation or verification.

## 14. Verification System

Verification is artifact-based, not command-based.

```
created or modified artifact
   → reopen / re-read
   → compare against deliverable contract
   → run format-specific checks (§10)
   → render where a render capability exists
   → record what was checked and what could not be checked
   → only then report success
```

Mandatory statements in the final report: which artifacts exist at which paths,
which checks passed, which checks were impossible (missing capability), and any
residual limitation.

## 15. Research & Citation Integrity

Research follows:

```
question / claim
→ what evidence is needed?
→ search
→ source evaluation (authority, recency, relevance, bias)
→ evidence extraction
→ metadata recording
→ synthesis
→ citation
→ verify the claim–source relationship
```

Prohibited: writing a claim first and inventing a citation afterwards.
Prohibited fabrication: author, DOI, title, publisher, journal, year, URL, page
number. If a source cannot be verified, the text must say it is unverified or the
claim must be removed or hedged.

Citation style follows the explicit user instruction or adopted template/rubric,
then the coherent existing document convention for continuation or revision.
When citations are required and neither establishes a style, Harvard is the
package fallback under the [citation style rules](../references/citation-styles.md).
Do not ask merely because this fallback applies or silently reformat unrelated sections.

## 16. Language Behaviour

English is the default language for all authored content, skills, documentation,
reports, outlines, and generated/exported artifacts. Follow the
[shared language policy](../references/language-policy.md).

1. Honor an explicit applicable user request for the deliverable language,
   including an already established instruction for the same deliverable.
2. Otherwise, use English. Do not infer another language from the conversation,
   source material, or template. A Vietnamese request for a report without a
   language instruction produces an English report.
3. If a mandatory supplied requirement conflicts with the default and has not
   been explicitly adopted by the user, clarify that specific conflict rather
   than silently selecting another language.

Conversational updates may follow the user's language. Deliverable prose,
headings, captions, placeholders, and exports follow the resolved output language.
Preserve quotations, identifiers, and explicitly protected source content;
resolve any conflict with preservation-only instructions without silently
translating. Omitted language alone is not a reason to interview the user.

## 17. Fallback & Missing Capabilities

```
capability requested
   → adapter detection
   → available: execute, record fidelity
   → partial: execute within limits, state exactly what was and was not done
   → unavailable: choose a valid fallback, preserve the workflow where possible,
                  report the limitation
```

Fallback examples: no layered PSD editing → flattened export plus precise edit
instructions; no OCR → report unreadable pages; no PDF render → structural
verification with an explicit "visual QA not performed"; no PPTX render →
structure and overflow heuristics with the same disclosure.

Absolute rule: never fabricate a successful file operation.

## 18. Pi Adapter v1

v1's primary deliverable is an **installable Pi Desktop plugin**, consumed the
same way as Superpowers: the user installs it; skills appear in the catalog;
workspace prompts auto-route; they never type `/skill`.

The plugin is a **package** built from the portable skill pack, not a second
source of truth (§18.3). Observed Superpowers-on-Pi shape to match:

- `manifest.json` with `schemaVersion`, `id`, `name`, `version`, `description`,
  `main`, `contributes.skills`, `permissions` (including `agent.prompt.inject`),
  `engines.piDesktop`, `categories`, `activationEvents`
- trivial `main.js` exporting `onLoad` / `onUnload` and registering no tools
- skills as Markdown files listed in `contributes.skills`

### 18.1 Verification prerequisite

Before packaging, confirm against the **installed** Pi Desktop version:

- the plugin manifest schema and required fields,
- how skills are contributed and discovered,
- how bootstrap instructions are injected,
- the subagent/delegation mechanism and its role types,
- which document capabilities are actually reachable (Office tooling, PDF
  conversion, image handling),
- whether packaging/validation tooling accepts the plugin.

Evidence currently observed from installed Pi plugins (including
`obra.superpowers`) is treated as **observed behaviour to be re-verified**, not
as a contract. If it differs at implementation time, the adapter changes and
this section is updated.

### 18.2 Adapter contents

```
adapters/pi/
  bootstrap.md        # snippet for the Pi agent instructions file
  tools.md            # invoke_skill → skill mechanism; delegate → subagent mechanism
                      # inspect_artifact / invoke_tool / render / export → detected tools
  capabilities.md     # capability → concrete Pi-reachable implementation + fidelity
  install.md          # installation and activation steps
  manifest.json       # packaging metadata (Pi implementation detail)
  main.js             # lifecycle hooks only (Pi implementation detail)
```

### 18.3 Distribution

The Pi plugin is a **package** built from the portable skill pack, not a second
source of truth. A build/package step copies or links `skills/`, `agents/`,
`workflows/`, `tool-routing/`, `references/`, `templates/` into the plugin
layout and validates it. Editing the generated package instead of the skill pack
is a defect. The published artifact is the installable plugin, analogous to how
Superpowers is installed on Pi.

## 19. Future Harness Adapters

The `adapters/` directory is not currently implemented. The proposed
`adapters/antigravity/`, `adapters/claude/`, and `adapters/codex/` directories
would begin as stubs with `unverified` mappings. Adding a
harness means: detect its skill / plugin mechanism, delegation mechanism, and
document capabilities; fill the three mapping files; write `install.md` so the
skill pack can be installed there the same way Superpowers is. No skill-pack
file should need modification. This remains a design requirement to validate
when an adapter is implemented; current structural tests do not prove it.


## 20. Repository Structure

The tree illustrates the target layout, not a guarantee that every entry ships.
The criteria-writing skills, reviewer-prose, contract, and templates shown are
implemented. `tests/architecture/`, `tests/scenarios/manual/`, and retained
evidence packs under `tests/scenarios/reports/` are tracked.
`tests/scenarios/runs/`, ad-hoc `tests/scenarios/reports/report-*` dumps, and
`docs/superpowers/plans/` remain local-only and ignored.

```
workspace-superpowers/
├── README.md                     # what it is, install, scope, relation to Superpowers
├── LICENSE                       # permissive open licence
├── AGENTS.md                     # bootstrap snippet (thin; ≤ 80 lines)
├── CHANGELOG.md
├── docs/
│   └── workspace-superpowers-design.md   # this file
├── skills/
│   ├── using-workspace-superpowers/SKILL.md
│   ├── scoping-the-brief/SKILL.md
│   ├── drafting-prose/SKILL.md
│   ├── writing-reports/SKILL.md
│   ├── writing-academic-prose/SKILL.md
│   └── .../SKILL.md
├── agents/
│   ├── inspector.md
│   ├── researcher.md
│   ├── drafter.md
│   ├── reviewer-prose.md
│   └── ...
├── workflows/
│   ├── docx-edit.md
│   ├── pdf-research.md
│   ├── report-to-slides.md
│   ├── spreadsheet-audit.md
│   ├── visual-edit.md
│   ├── literature-review.md
│   ├── thesis.md
│   └── mixed-project.md
├── tool-routing/
│   └── capabilities.md           # abstractions only
├── adapters/
│   ├── pi/
│   ├── antigravity/              # stub
│   ├── claude/                   # stub
│   └── codex/                    # stub
├── references/
│   ├── academic-writing-style.md
│   ├── criteria-writing-contract.md
│   ├── language-policy.md
│   ├── citation-styles.md
│   ├── document-format-notes.md
│   └── verification-checklists.md
├── templates/
│   ├── brief.md
│   ├── outline.md
│   ├── deliverable-contract.md
│   ├── review-findings.md
│   └── final-report.md
└── tests/
    ├── architecture/             # layer-invariant and modularity tests
    └── scenarios/                # behavioural scenario tests
```

## 21. v1 Skill Set

The current repository contains 22 implemented skills, listed below. The
inspection split uses `reading-artifacts` and `analyzing-artifacts`.
Target specialists outside this list are not current capabilities.

**Core (8)**
`using-workspace-superpowers`, `scoping-the-brief`, `reading-artifacts`,
`analyzing-artifacts`, `planning-work`, `reviewing-work`, `verifying-artifacts`,
`packaging-deliverables`

**Research (2)**
`researching-sources`, `citing-sources`

**Prose (3)**
`drafting-prose`, `writing-academic-prose`, `writing-reports`

`rewriting-prose` and `reviewing-coherence` are not separate implemented skills;
existing editing and review skills provide the applicable behavior.

**Document (2)**
`editing-documents`, `formatting-layout`

**PDF (1)**
`working-with-pdf`

**Presentation (2)**
`working-with-presentations`, `storyboarding-slides`

**Spreadsheet (2)**
`working-with-spreadsheets`, `auditing-formulas`

**Visual (1)**
`working-with-visuals`

**Transform (1)**
`converting-artifacts`

Each family skill shipped at v1 must already contain its specialist list and
trigger table, so that later specialists drop in without router edits.

## 22. Future Skill Expansion

Target catalog: ~50–80 specialists across the families in §6.5. Expansion rule:

> Adding a specialist requires adding a skill directory plus its trigger entry
> in the owning family's specialist list. It must not require modifying the
> bootstrap, the workspace router, another family, the capability model, or any
> adapter.

Additions such as `writing-systematic-reviews`, `writing-methodology`,
`building-pivots`, `ocr-ing-scanned-documents`, `designing-slide-layouts`,
`editing-layered-images` should follow this rule. Future additions require
architecture tests and source review (§24.2); the current suite does not prove
extension behavior for specialists that have not been implemented.

## 23. Example Workflows

`workflows/*.md` are illustrative compositions, not procedures embedded in the
router.

Specialists named below that are outside the v1 set (§21) — for example
`writing-literature-reviews`, `writing-theses`, `analyzing-data` — illustrate the
target composition. Until such a specialist ships, its family skill performs the
same job, and the graph is unchanged.

| Workflow | Skill graph |
|---|---|
| **DOCX format fix** | reading-artifacts → analyzing-artifacts → formatting-layout → verifying-artifacts → packaging-deliverables |
| **Typo fix, keep format** | reading-artifacts → analyzing-artifacts → editing-documents → verifying-artifacts → packaging-deliverables (no interview, no planner) |
| **PDF research** | reading-artifacts → analyzing-artifacts (PDFs) → researching-sources → citing-sources → drafting-prose/writing-literature-reviews → converting-artifacts → verifying-artifacts |
| **Report → slides** | reading-artifacts → analyzing-artifacts (report) → planning-work (storyboard) → working-with-presentations → storyboarding-slides → reviewing-work (narrative, layout, visual) → converting-artifacts (PDF) → verifying-artifacts |
| **Spreadsheet audit** | reading-artifacts → analyzing-artifacts → working-with-spreadsheets → auditing-formulas → reviewing-work (data, formulas, integrity) → verifying-artifacts |
| **Image / PSD edit** | reading-artifacts → analyzing-artifacts → working-with-visuals → (layered capability? edit : limitation + fallback) → verifying-artifacts |
| **Thesis** | reading-artifacts → analyzing-artifacts (rubric + draft) → scoping-the-brief (if gaps) → planning-work (architecture) → researching-sources ∥ drafting-prose/writing-theses → citing-sources → formatting-layout → reviewing-work (requirement, argument, coherence, academic prose, citation, format) → verifying-artifacts → converting-artifacts → packaging-deliverables |
| **Mixed project (core case)** | reading-artifacts → analyzing-artifacts (12 PDFs + XLSX) → planning-work (multi-artifact) → researching-sources ∥ working-with-spreadsheets/analyzing-data → drafting-prose/writing-theses → citing-sources → formatting-layout → reviewing-work → verifying-artifacts → converting-artifacts (PDF) → working-with-presentations (defence deck) → verifying-artifacts (all) → packaging-deliverables |

## 24. Testing Strategy

Test ladder: architecture → skill contract → behavioral/pressure → regression.
Run `npm test` for the current architecture count. The B01–B16, C01–C08, and
L01–L06 operator scripts are tracked; B01–B16 and L01–L06 remain PENDING.
C01–C08 are response-level only. Earlier bounded dry-run reviews, mock runs,
and self-tests do not establish dedicated multi-turn acceptance. This is not a
claim of full product completion.

### 24.1 Skill discipline tests (RED–GREEN–REFACTOR)

Per the skill-authoring methodology: run pressure scenarios **without** the
skill and record the baseline failures and rationalisations verbatim; write the
minimal skill addressing those failures; re-run and confirm compliance; close
loopholes found in re-runs. Discipline skills (bootstrap routing, review before
completion, verification before claiming success, no fabricated citations) are
tested with combined pressures — time, sunk cost, authority, fatigue — and must
hold under all of them.

### 24.2 Architecture tests

Current local checks cover the shipped catalog, frontmatter, declared
capabilities, selected routing contracts, role sections, reference paths, and
the scenario script's ID/field structure. The broader requirements below also
need source review or future test coverage; a green suite does not prove every
architecture property or live behavior.

Automated checks over the repository:

- **Layer purity:** no file outside `adapters/` names a harness tool, MCP server,
  harness permission, or harness-specific command.
- **Bootstrap budget:** the bootstrap snippet is ≤ 80 lines and contains no
  format-specific procedure, review checklist or capability list.
- **Description form:** every `SKILL.md` description starts with `Use when…` and
  does not summarise the body's workflow.
- **Modularity:** adding a new specialist directory plus one trigger line in its
  family's list passes all tests with zero diffs to the bootstrap, router, other
  families, `tool-routing/`, or adapters.
- **Role portability:** every `agents/<role>.md` declares capabilities, never tools.
- **Fallback presence:** every skill that requests a capability states its
  behaviour when that capability is unavailable.

### 24.3 Scenario tests

End-to-end scenario runs against the acceptance criteria in §25, executed by a
fresh agent given only the bootstrap plus the skill catalog, judged on: correct
routing, absence of over-interviewing, correct skill-graph size, presence of
review and verification, honest limitation reporting.

For criteria writing, the local operator script is
`tests/scenarios/manual/criteria-writing.md`. Keep B03–B05 and B02–B08 in their
respective sessions; send follow-ups only after observed stops. Record model,
environment, skill version, prompts, transcripts, and artifacts. PENDING means
unattempted; attempted runs record PASS, FAIL, or BLOCKED with evidence. Neither
structural string checks nor mock/self-test results may become behavioral PASS.
Architecture tests and operator scripts are tracked. Ad-hoc run dumps stay
local-only; fresh checkouts do not include `tests/scenarios/runs/`.

### 24.4 Packaging tests

The Pi adapter package validates against the installed Pi Desktop version before
release; the plugin **installs** like Superpowers, its skills appear in the
catalog, and a workspace prompt auto-routes without any slash command.


## 25. Acceptance Criteria

The system is **not** complete until every scenario below passes.

| # | Scenario | Required behaviour |
|---|---|---|
| 1 | "Fix the typos in this Word file, keep the formatting." | inspect → edit → verify → deliver. **No** long interview, **no** writing workflow, **no** subagent swarm. |
| 2 | "Complete this assignment." | inspect rubric and files → detect material ambiguity → ask only what is missing → plan → execute → review → verify. |
| 3 | "Read these 15 PDFs and write a literature review." | research + evidence extraction + claim–evidence mapping + citation + academic prose + citation/coherence review + verification. No fabricated sources. |
| 4 | "Check whether this Excel has any wrong formulas." | spreadsheet family only. **No** writing workflow triggered. Data/formula/integrity review + real workbook verification. |
| 5 | "Turn this report into slides." | document inspection → presentation planning/storyboard → PPTX build → narrative/layout/visual review → PDF export → both artifacts verified. |
| 6 | "Edit this PSD." | Without layered-editing capability: **no fake success**. Report the limitation and deliver a valid fallback (flattened export, precise instructions, or a request for a compatible tool). |
| 7 | "12 research PDFs + this XLSX dataset → thesis DOCX → PDF → defence PPTX." | Composes multiple families into one skill graph with correct parallelism, cross-artifact consistency (numbers in prose match the workbook, slides match the thesis), every artifact verified, final report lists paths, changes, checks performed and limitations. |
| 8 | Any workspace prompt, no slash command | The router loads automatically; the correct family and specialists are selected; skills are never claimed as followed without being loaded. |
| 9 | A coding prompt in the same session | Routes to Superpowers, not to Workspace Superpowers. |
| 10 | Adding `writing-systematic-reviews` | New skill directory + one trigger line. Bootstrap, router, other families, capability model and adapters unchanged; all architecture tests pass. |
| 11 | Deliverable language differs from conversation language | Conversation may remain Vietnamese; artifacts default to English unless the user explicitly requests another language (§16). |
| 12 | Any conversion or export step | Output verified as an artifact; command exit status alone never accepted as success. |
| 13 | Install the Pi plugin | Plugin installs in the Superpowers shape; skills listed; no panel; bootstrap injects; a workspace prompt auto-routes. |


---

## Appendix A — Mandatory principles

```
Understand before doing.
Read and analyze before editing.
Plan before complex work.
Use evidence before asserting.
Use skills automatically.
Use tools according to capability.
Review before completion.
Verify before claiming success.
Verify the artifact, not just the command.
Never fabricate successful file operations.
Never fabricate citations.
Do not over-interview.
Do not over-spawn subagents.
Do not reduce Workspace Superpowers to academic writing.
```

## Appendix B — Next steps after this spec is approved

1. User review of this document; amend inline.
2. Implementation plan (ordered, testable tasks) derived from §20–§25.
3. Implementation: skill pack (core skills → agents → workflows → capability
   model) → Pi plugin package in the Superpowers shape (`manifest.json`,
   trivial `main.js`, `contributes.skills`, `agent.prompt.inject`) after the
   §18.1 API verification → installable distribution.
4. Workflow and skill tests per §24.
5. GitHub publication: public repo, permissive licence, English README, install
   instructions per adapter (Pi first: install the plugin).
