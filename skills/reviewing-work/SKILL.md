---
name: reviewing-work
description: Use when a drafted or assembled workspace deliverable needs quality review before verification — not for trivial mechanical fixes.
---

# Reviewing Work

Coordinate quality review within the workspace lifecycle. The workspace entry router retains ownership of the overall workflow.

Use the [workflow continuity contract](../../references/workflow-continuity.md)
to review the current scope and artifact revision after user changes. For prose
continuation, apply the [document continuity contract](../../references/document-continuity.md):
provide reviewers the relevant profile, adjacent excerpts, and evidence locators.
Check the insertion boundary and dependent conclusions, not just standalone
fluency. Route continuity defects to coherence, prose, requirement, or evidence
review by their cause; recheck affected passages after correction.

For criteria-based writing, follow the [criteria-writing contract](../../references/criteria-writing-contract.md) for applicable decisions, evidence gaps, and delivery status. Apply the [language policy](../../references/language-policy.md) to findings and suggested wording.

## When to use

Substantial drafted, revised, or assembled content, including chat-only text, documents, reports, presentations, theses, and data packages.

## When not to use

Trivial or mechanical fixes (e.g. typos, formatting tweaks) that require only `verifying-artifacts`. File opening, layout rendering, and export integrity checks (those belong to `verifying-artifacts`).

## Review router contract

`reviewing-work` is a **review router**. It does not perform every check itself. It inspects the task and deliverable, selects the applicable review dimensions, and invokes the matching review skills or roles.

| Dimension | Role | Owns |
|---|---|---|
| requirement | `reviewer-requirement` | Assigned criteria, approved scope, in-force outline, required components |
| coherence | `reviewer-coherence` | Argument flow, chapter/section structure, terminology and notation consistency |
| citation | `reviewer-citation` | Claim support, source traceability, and evidence limits for academic and internal sources |
| prose | `reviewer-prose` | Paragraph and sentence style, lists, clichés, cadence; style-guide Rule IDs |
| visual | `reviewer-visual` | Visual quality in inspected representations; final artifact integrity remains with `verifying-artifacts` |

| Deliverable | Review dimensions |
|---|---|
| Thesis / Dissertation | Requirement, argument/coherence (`reviewer-coherence`), prose (`reviewer-prose`), citation, formatting, artifact integrity |
| Business / Technical Report | Requirement, content, coherence (`reviewer-coherence`), prose (`reviewer-prose`), citation (where applicable), formatting |
| Essay / Assignment | Rubric, argument/coherence (`reviewer-coherence`), prose (`reviewer-prose`), citation, formatting |
| Literature Review | Source coverage, claim–evidence mapping, citation integrity, synthesis quality, coherence, prose (`reviewer-prose`) |
| Excel / Data Deliverable | Data quality, formulas, calculations, charts, workbook integrity |
| PPTX Deck | Narrative arc, slide content, visual hierarchy, layout consistency, visual QA |
| PDF output | Pagination, clipping, fonts, links, table and figure integrity |
| PSD / design | Design intent, layer integrity, export correctness |
| Translation / rewrite | Fidelity to source, register, terminology consistency, target-language naturalness |

Select citation/evidence review whenever factual or empirical claims need support, even with no bibliography. Use prose review for substantial rewritten text; choose other dimensions by content. Cross-dimension defects retain one primary owner and supporting findings; do not drop them between roles or count the same defect twice.

## Severity contract

Findings must be classified into one of four explicit severity levels:

* **Critical:** Must fix before final completion (e.g. fabricated source, contradicted rubric requirement, broken formula). An allowed incomplete draft is not final completion.
* **Important:** Must fix unless a clear, recorded justification permits deferral.
* **Minor:** Fix when low risk and time permits.
* **Suggestion:** Optional enhancement for future iterations.

## Blocking defects

Treat the following as **Critical** (blocking):

* Fabricated numbers, measurements, or data.
* Unsupported or contradicted empirical result claims, including assertions used to satisfy an empirical criterion.
* Content that violates the applicable approved scope or a required scope/outline decision.

A draft still missing required evidence must remain `draft_incomplete`. Smooth prose does not make it complete. Neutral placeholders in a permitted incomplete draft are not fabricated results; record the missing evidence and affected criteria. Locally labeled, authorized hypothetical examples are not project measurements. Neither satisfies a criterion requiring real results. Permission to deliver an incomplete draft never permits fabricated or unsupported result assertions.

## Execution handoff

Reviewers produce findings only: `Severity · Location · Problem · Suggested Fix`, using the [review findings template](../../templates/review-findings.md). They **never silently rewrite the deliverable wholesale** or edit it in place. Suggested wording belongs in findings; the author/editor applies corrections to affected passages and dependent claims, tables, or conclusions.

Wording fixes within approved scope do **not** require renewed approval. Material scope, argument, or outline changes follow the contract's affected-decision rules: reuse existing authorization, otherwise return only the unresolved decision to scoping/planning. A review suggestion is not user approval.

## Procedure

1. Read the candidate text or inspected artifact representation. Compare it with the brief and applicable decisions; for criteria writing include the outline version, approval/waiver record, evidence register, and unresolved gaps.
2. Select the necessary review dimensions and obtain missing artifact representations through the appropriate reading or domain skill. A byte stream alone is not an inspection.
3. Dispatch the matching roles or skills with only the assigned content and relevant constraints, decisions, evidence, and locators. Never pass orchestrator session history. This skill does not perform every dimension itself.
4. If the harness has no subagent mechanism, run the same roles sequentially in the orchestrator using each role's criteria and output shape.
5. Consolidate findings, resolve severity/ownership disagreements against the actual requirements and evidence, and retain unresolved blockers. An uninspected source cannot be reported as verified.
6. Return Critical and Important findings to the author/editor. Recheck affected passages and dependent claims after fixes; retain any permitted Important deferral with its recorded justification.
7. Keep `draft_incomplete` while mandatory evidence/content is missing. Deliver an incomplete draft only when authorized, with remaining gaps stated; final completion requires closing all blocking findings.
8. Hand every file being delivered, including an authorized incomplete draft, to `verifying-artifacts`. Return reviewed chat-only content without inventing a file or claiming file verification. File integrity does not resolve missing content or evidence.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — for text-bearing artifacts and review checklists.
- `inspect_document(file)` — inspect supported document content and structure.
- `invoke_skill(name)` — load review, reading, or domain skills for other artifact representations.
- `delegate(role, context)` — optional; to delegate to review roles (`reviewer-requirement`, `reviewer-coherence`, `reviewer-citation`, `reviewer-visual`, `reviewer-prose`).

## Dependencies

- Follows authoring, drafting, or substantial document editing.
- Precedes `verifying-artifacts` for file deliverables. Chat-only content completes with content review.

## Fallback

If delegation is unavailable, the orchestrator applies the same role criteria sequentially. If a required source or representation cannot be inspected, report the limitation and keep affected claims unresolved; do not substitute assumptions for verification.

## Common mistakes

* Silently rewriting the entire document during review instead of reporting findings.
* Confusing review (critique, coherence, argument, citation, prose) with verification (file opening, format parsing, render checks).
* Skipping citation verification on academic or evidence-based deliverables, including internal logs and benchmark tables.
* Approving an incomplete draft because the prose reads smoothly.
* Conflating minor stylistic suggestions with critical blockers.
* Asking the user to re-approve wording fixes that stay inside the already-approved scope.
