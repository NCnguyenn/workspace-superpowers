---
name: reviewing-work
description: Use when evaluating completed or drafted workspace artifacts across relevant quality dimensions before verification and delivery.
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

## Severity contract

Findings must be classified into one of four explicit severity levels:

* **Critical:** Must fix before completion. Blocks delivery (e.g. fabricated source, contradicted rubric requirement, broken formula).
* **Important:** Must fix unless a clear, recorded justification permits deferral.
* **Minor:** Fix when low risk and time permits.
* **Suggestion:** Optional enhancement for future iterations.

## Execution handoff

Reviewers produce findings; they **never silently rewrite the deliverable wholesale**. Findings are returned to the executor in the standard shape (`Severity · Location · Problem · Suggested Fix` in `templates/review-findings.md`), and the executing role applies approved remedies.

## Procedure

1. Inspect the candidate artifact and compare against the brief and deliverable contract.
2. Select the necessary review dimensions.
3. Dispatch review roles or execute checks sequentially:
   - Check requirement/rubric conformance.
   - Check argument progression and logical coherence.
   - Verify citation integrity and claim-source grounding (zero tolerance for fabricated references).
   - Check visual and typographic consistency.
4. Consolidate findings into the review findings matrix.
5. Coordinate fixes for Critical and Important findings with the authoring/editing specialist.
6. Hand off the finalized artifact to `verifying-artifacts`.

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `read_file(path)` — to inspect deliverables and review checklists.
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
