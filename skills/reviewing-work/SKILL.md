---
name: reviewing-work
description: Use when a drafted or assembled workspace deliverable needs quality review before verification — not for trivial mechanical fixes.
---

# Reviewing Work

Route and coordinate multi-dimensional quality review across candidate workspace deliverables.

## When to use

Drafted, revised, or assembled documents, reports, presentations, theses, and data packages before declaring them ready for verification.

## When not to use

Trivial or mechanical fixes (e.g. typos, formatting tweaks) that require only `verifying-artifacts`. File opening, layout rendering, and export integrity checks (those belong to `verifying-artifacts`).

## Review router contract

`reviewing-work` is a **review router**. It does not perform every check itself. It inspects the task and deliverable, selects the applicable review dimensions, and invokes the matching review skills or roles.

| Deliverable | Review dimensions |
|---|---|
| Thesis / Dissertation | Requirement, argument, coherence, academic prose, citation, formatting, artifact integrity |
| Business / Technical Report | Requirement, content, coherence, prose, citation (where applicable), formatting |
| Essay / Assignment | Rubric, argument, coherence, prose, citation, formatting |
| Literature Review | Source coverage, claim–evidence mapping, citation integrity, synthesis quality, coherence |
| Excel / Data Deliverable | Data quality, formulas, calculations, charts, workbook integrity |
| PPTX Deck | Narrative arc, slide content, visual hierarchy, layout consistency, visual QA |
| PDF output | Pagination, clipping, fonts, links, table and figure integrity |
| PSD / design | Design intent, layer integrity, export correctness |
| Translation / rewrite | Fidelity to source, register, terminology consistency, target-language naturalness |

## Severity contract

Findings must be classified into one of four explicit severity levels:

* **Critical:** Must fix before completion. Blocks delivery (e.g. fabricated source, contradicted rubric requirement, broken formula).
* **Important:** Must fix unless a clear, recorded justification permits deferral.
* **Minor:** Fix when low risk and time permits.
* **Suggestion:** Optional enhancement for future iterations.

## Execution handoff

Reviewers produce findings; they **never silently rewrite the deliverable wholesale** and they do not edit it in place. Findings are returned to the executor in the standard shape (`Severity · Location · Problem · Suggested Fix` in `templates/review-findings.md`). The executing role applies the fixes. Do not pause for a confirmation interview between review and fix unless the operation is destructive or irreversible.

## Procedure

1. Inspect the candidate artifact and compare against the brief and deliverable contract.
2. Select the necessary review dimensions.
3. Dispatch the matching review roles or review skills. This skill does not perform every dimension itself.
4. If the harness has no subagent mechanism, run the same roles sequentially in the orchestrator using each role's criteria and output shape.
5. Consolidate findings into the review findings matrix.
6. Return Critical and Important findings to the authoring/editing specialist for application. Do not apply those edits inside the review roles.
7. Hand off the corrected artifact to `verifying-artifacts`.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — for text-bearing artifacts and review checklists.
- `inspect_document(file)`, `inspect_pdf(file)`, `inspect_presentation(file)`, `inspect_spreadsheet(file)` — a byte stream is not a review.
- `invoke_skill(name)` — to load specialized review skills.
- `delegate(role, context)` — optional; to delegate to review roles (`reviewer-requirement`, `reviewer-citation`, etc.).

## Dependencies

- Follows authoring, drafting, or substantial document editing.
- Precedes `verifying-artifacts`.

## Fallback

If delegation to independent subagent roles is unavailable, the orchestrator performs each review dimension sequentially using the same criteria and records findings explicitly.

## Common mistakes

* Silently rewriting the entire document during review instead of reporting findings.
* Confusing review (critique, coherence, argument, citation) with verification (file opening, format parsing, render checks).
* Skipping citation verification on academic or evidence-based deliverables.
* Conflating minor stylistic suggestions with critical blockers.
