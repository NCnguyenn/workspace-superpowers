---
name: reviewing-work
description: Use when a drafted or assembled workspace deliverable needs quality review before verification — not for trivial mechanical fixes.
---

# Reviewing Work

## Job

`reviewing-work` is a **review router**. It selects independent review dimensions, gives each reviewer only the relevant source and constraints, consolidates findings, and returns them to the author or editor. It must never silently rewrite the deliverable wholesale, approve work on the user’s behalf, or substitute content review for file verification.

Use [workflow continuity](../../references/workflow-continuity.md) to review the current scope and revision. For sustained work, retain the plan/item identity, target revision, evidence and decision references under [persistent work tracking](../../references/work-tracking.md). Findings are not plan mutations, user acceptance, or proof that an uninspected source is current.

## Select review dimensions

| Dimension | Primary reviewer | Checks |
|---|---|---|
| Requirement | `reviewer-requirement` | criterion obligations, scope, outline, required components |
| argument/coherence (`reviewer-coherence`) | `reviewer-coherence` | progression, structure, terminology, transitions, and contradictions |
| Citation and evidence | `reviewer-citation` | claim support, source traceability, evidence limits, and reference consistency |
| Prose | `reviewer-prose` | paragraph development, register, lists, cadence, and style-guide rules |
| Mathematics | `reviewer-mathematics` | assumptions, derivations, calculations, and check evidence |
| Visual | `reviewer-visual` | visual quality in inspected representations and evidence boundaries |

Use citation/evidence review whenever factual, empirical, or internally logged claims need support, even without a bibliography. Use prose review for substantial rewritten text. Use mathematics review for substantive mathematical content or a requested correctness check, not merely for formatting an unchanged equation. Use visual review for visual claims, but reserve structural and rendered file checks for `verifying-artifacts`.

## Severity Contract

- **Critical:** blocks final completion. Examples: fabricated evidence, contradicted required criterion, unsupported empirical result, invalid proof, or an unauthorized scope change.
- **Important:** must be fixed unless a clear recorded justification allows deferral.
- **Minor:** fix when low risk and proportionate to the task.
- **Suggestion:** optional improvement.

A permitted incomplete draft remains `draft_incomplete` while required evidence is missing. Authorized hypothetical material must remain locally labeled and cannot become a measured result. Smooth prose is not a pass for unsupported content.

## Method

1. **Set the review target.** Identify the exact candidate revision, requested result, source coverage, approved scope and outline, evidence register, and unresolved gaps.
2. **Read what is necessary.** Inspect the candidate and relevant source representation. For a continuation, provide reviewers the relevant profile, adjacent excerpts, and evidence locators under the [document continuity contract](../../references/document-continuity.md). Route continuity defects to coherence, prose, requirement, or evidence review by their cause.
3. **Select independent dimensions.** Assign each defect one primary owner. Do not duplicate a finding across roles merely to inflate severity.
4. **Run the selected reviews.** Give each reviewer only its assignment, source excerpts, locators, decisions, evidence limits, and requested output shape. Never provide orchestrator session history.
5. **Consolidate findings.** Use `Severity · Location · Problem · Suggested Fix` and the [review findings template](../../templates/review-findings.md). Reconcile disagreements against inspected requirements and evidence.
6. **Return Critical and Important findings to the author or editor. Recheck affected passages,** dependent claims, tables, figures, citations, and seams after corrections.
7. **Finish at the right boundary.** Deliver reviewed chat-only content without claiming a file exists. Send every file deliverable, including an authorized incomplete draft, to `verifying-artifacts` after content review.

For criteria-based writing, apply the [criteria-writing contract](../../references/criteria-writing-contract.md). Review routine wording changes within approved scope without reopening user approval; return material scope or outline changes only to the affected decision owner.

## Fallback when delegation is unavailable

Load the applicable role instructions before reviewing. For substantial report or thesis prose, use `read_file("../../agents/reviewer-prose.md")` and `read_file("../../agents/reviewer-coherence.md")` before delivering the content, then read the prose role’s linked style guide. Apply the roles sequentially, report findings by role, and recheck corrections. This fallback is not permission to skip `reviewing-work` or replace it with generic self-review.

## Visual, Word, and mathematics boundaries

Use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md) and the [visual evidence boundary](../../references/visual-evidence-boundary.md) for images, figures, captions, and visual claims. Use the [native Equation contract](../../references/math-in-documents.md) and [mathematics check contract](../../references/mathematics-checks.md) for mathematics. A reviewer can identify a defect; final native structure, render, edit/save/reopen, and file integrity checks remain with verification.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` — source text, role instructions, and review checklists.
- `inspect_document(file)` — supported document structure and content.
- `invoke_skill(name)` — load a required domain or review skill.
- `delegate(role, context)` — optionally dispatch a compatible review role.

## Completion and fallback

A review is complete when the selected dimensions have returned traceable findings, Critical findings are fixed or explicitly blocking, Important deferrals are recorded, and affected corrections were rechecked. If a required source or representation is unavailable, state the limitation and leave affected claims unresolved.

## Common mistakes

- Reviewing only fluency while ignoring requirement coverage, evidence, or the actual seam.
- Treating a check on one revision as a check on a later revised artifact.
- Letting reviewers silently rewrite the deliverable instead of returning findings.
- Treating file opening or a render check as a substitute for content review.
- Marking an incomplete or fabricated-evidence draft as complete.
