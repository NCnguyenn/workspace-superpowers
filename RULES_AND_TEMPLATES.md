# Rules, Contracts, and Templates

This is the navigation guide for Workspace Superpowers' **16 rules/contracts** (`AGENTS.md` and 15 files in `references/`) and **six templates** in `templates/`. Follow the applicable contract itself for full requirements. A link here neither loads a Skill nor grants permission to use a host capability. Classify the current operation first; do not activate every reference or create every template for every request.

## Start here: routing and continuity

| Rule or contract | When it applies | Principal input, responsibility, or result |
|---|---|---|
| [AGENTS.md](AGENTS.md) | Every new request before planning an artifact; reclassify when the operation changes. | Route Coding, Workspace, Simple Q&A, or Mixed work; load applicable skills, protect evidence and approval boundaries, and report only verified results. |
| [Workflow continuity](references/workflow-continuity.md) | A request changes, pauses, resumes, branches, or receives late files. | Interpret the current message against applicable decisions; preserve unaffected scope, track a temporary return point, and stop only for an actual unresolved prerequisite. |
| [Persistent work tracking](references/work-tracking.md) | Sustained work has an adopted canonical plan, or a new session must discover one. | Obtain tracking and placement consent where required; maintain one `work-plan.md` checkpoint, item register, sources, revisions, decisions, and checks. No parallel progress file. |
| [Document continuity](references/document-continuity.md) | Continuing or substantively revising an existing document. | Inspect the target and adjacent material; preserve argument, terminology, citation/format conventions, and the seam between old and new content. |
| [Session progress](references/session-progress.md) | A host displays an ephemeral checklist for multi-step work. | Map active tasks and state transitions to a session checklist without replacing the durable plan or inventing a second checkpoint. |
| [Guided questions](references/guided-questions.md) | Missing facts, genuine branch decisions, and review of visible proposals. | Ask only what remains unresolved; display proposed content before requesting its scoped approval, and recover when it was not visible. |

## Writing, evidence, and artifact contracts

| Rule or contract | When it applies | Principal input, responsibility, or result |
|---|---|---|
| [Criteria-based writing](references/criteria-writing-contract.md) | Interpreting criteria, outlining, drafting, or substantively revising report/thesis content against explicit requirements. | Inspect command verbs, scope, evidence, and source locators; keep analysis approval, detailed-outline approval, and post-draft review distinct. Does not turn unrelated office tasks into report writing. |
| [Outline structure](references/outline-structure.md) | Preparing a document/report outline and checking evidence readiness. | Preserve the exact `source_title`; use `1`, `1.x`, `1.x.x` by default and preview actual argument blocks and needed assets without inventing evidence. |
| [Academic and professional writing style](references/academic-writing-style.md) | Writing or reviewing analytical prose. | Develop supported arguments in natural paragraphs, use lists for genuinely parallel material, and return rule-based prose findings; adds no gate. |
| [Deliverable language](references/language-policy.md) | Choosing language for chat, authored text, labels, or export. | English is the authored default unless explicitly overridden for that output; chat follows the current user's language, while protected source titles remain exact. |
| [Citation styles](references/citation-styles.md) | Citations or bibliography are required. | Preserve the established style or use Harvard as fallback; inspect metadata and support, match each actual citation/attribution to its source, and do not invent references. |
| [Project grounding](references/project-grounding.md) | A report or analysis must describe an accessible project folder or its description. | Survey the relevant slice read-only; record source coverage, conflicts, and one authorized derived context path. No software write or test/build by implication. |
| [Visual and document evidence boundary](references/visual-evidence-boundary.md) | Describing screenshots, embedded figures, or results stated by a document. | Separate document-stated, visually observed, source-inspected, runtime-observed, and unverified claims; inspect actual locators and avoid inferring unseen runtime or device facts. |
| [Visual assets, citations, and Word fidelity](references/visual-assets-and-word-fidelity.md) | Figures/tables, source/asset decisions, Word conversion, layout, or verification are relevant. | Identify provenance and permission, show available previews with attribution, preserve asset placement, and check actual DOCX structure/rendering separately. |
| [Native mathematics in Word](references/math-in-documents.md) | Pasting, authoring, editing, formatting, or exporting mathematical expressions in DOCX. | Preserve editable OMML Equations and source meaning; record native, visual, and edit/save/reopen checks per target revision. |
| [Mathematical reasoning and checks](references/mathematics-checks.md) | Derivation, calculation, proof, or mathematical review is requested. | Record assumptions, justified steps, per-claim `math_checks`, method limits, and independent review without conflating computation and proof. |

## Templates: use only when the operation needs them

Templates are authoring scaffolds, not automatically required files. The executing agent fills applicable fields from inspected evidence and recorded user decisions. Users review content and decisions in chat rather than maintaining internal metadata. Remove template-only instructions and example rows from an instantiated deliverable. If durable tracking has been adopted, reference its canonical decisions rather than maintaining competing status copies.

| Template | When to use it | Owner, inputs, and usable output |
|---|---|---|
| [Work plan](templates/work-plan.md) | Sustained work after the tracking/placement decision. | Executing agent maintains one authoritative resume checkpoint, item register, source/revision records, decisions, and next authorized action; conditional project/export rows only when needed. |
| [Outline](templates/outline.md) | A requested or required document/report outline; inline chat form is sufficient for a small criterion. | Planning agent uses approved criterion analysis and ready/authorized evidence to show exact protected headings, argument blocks, sources, visual decisions, version, and scoped outline decision. |
| [Working brief](templates/brief.md) | Scope and evidence need a shared handoff or durable record. | Executing agent records confirmed requirements, sources, language, preservation rules, assumptions, gaps, and conditional continuity/criteria/math/project fields. |
| [Review findings](templates/review-findings.md) | Independent review of a specified artifact/revision. | Reviewer returns located, actionable `Critical`, `Important`, `Minor`, or `Suggestion` findings; executing author fixes and retests. Reviewer does not rewrite the artifact. |
| [Deliverable contract](templates/deliverable-contract.md) | Multiple outputs or explicit source/export acceptance checks need to be declared. | Executing agent identifies authorized files and formats, source-to-export revisions, observable checks, and unresolved acceptance gaps. |
| [Final report](templates/final-report.md) | A sustained or multi-output task needs a structured completion handoff. | Executing agent names delivered paths/revisions, preserved content, checks actually performed, failed or unavailable checks, remaining limitations, and next owners. |

## How the pieces fit

1. Start with [AGENTS.md](AGENTS.md), then apply [workflow continuity](references/workflow-continuity.md) to the current message. For sustained adopted work, use the [work plan](templates/work-plan.md) under [persistent tracking](references/work-tracking.md); the [session checklist](references/session-progress.md) is transient.
2. For criteria-based writing, capture the actual requirement and evidence in the [brief](templates/brief.md), follow the [criteria contract](references/criteria-writing-contract.md), and prepare the [outline](templates/outline.md) only after the applicable analysis decision. [Outline structure](references/outline-structure.md) governs form, while [guided questions](references/guided-questions.md) governs visible review. Approval of one revision or section is not approval of another.
3. When applicable, [project grounding](references/project-grounding.md), [visual evidence](references/visual-evidence-boundary.md), [assets and Word fidelity](references/visual-assets-and-word-fidelity.md), [math reasoning](references/mathematics-checks.md), and [native Word math](references/math-in-documents.md) add their own evidence checks. They do not authorize project writes, supply missing facts, or establish host support merely because they are linked.
4. Define outputs and checks in the [deliverable contract](templates/deliverable-contract.md) if needed. An independent reviewer uses [review findings](templates/review-findings.md); the executing agent corrects issues, reopens the saved artifacts, runs applicable checks, and reports actual results and limits using the [final report](templates/final-report.md) or a concise chat response.