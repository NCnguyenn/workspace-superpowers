---
name: working-with-mathematics
description: Use when a report, thesis, explanation, or revision contains mathematical expressions, derivations, proofs, or calculations that require interpretation or checking.
---

# Working with Mathematics

## Job

Provide bounded mathematical support to the current analysis, authoring, editing, or review task. Establish notation and assumptions, derive or check the requested result, record what was actually verified, and return the result to the calling skill. This skill is not another writing router and does not authorize a new chapter, project command, or file change.

Use [workflow continuity](../../references/workflow-continuity.md), [document continuity](../../references/document-continuity.md), and [mathematics check records](../../references/mathematics-checks.md). For mathematics in Word, also use the [native Equation contract](../../references/math-in-documents.md).

## Use when

Load this skill when the actual task requires one or more of the following:

- define symbols, domains, units, assumptions, or notation;
- explain a derivation, recurrence, proof, induction argument, or calculation;
- check a mathematical claim, transformation, or numerical result;
- integrate substantive mathematics into a report or thesis section;
- review a mathematical argument independently of its authoring pass.

Activation follows intent and available content without the user naming the skill. Merely mentioning a formula does not require a mathematical rewrite. Spreadsheet cell formulas and dependency audits belong to `auditing-formulas`; equation-only formatting or conversion belongs to document skills plus the Equation contract.

## Inputs and output

**Inputs:** target claim or problem, source locators, established notation, domains, assumptions, known evidence, requested depth, and current authoring or review boundary.

**Output:** a mathematical handoff containing notation, assumptions, numbered reasoning steps, result, checks performed, limitations, and the next owner. An audit-only task returns findings without silently replacing a derivation.

## Method

1. **Set the mathematical question.** Identify what must be defined, derived, verified, or explained. Preserve existing notation unless a correction is authorized.
2. **State domains and assumptions.** Record units, valid input ranges, division conditions, root or logarithm restrictions, equivalence conditions, and induction domain where relevant.
3. **Derive or inspect step by step.** Give each material transformation a reason. Do not skip a step that the intended reader needs to judge the conclusion.
4. **Check independently when supported.** Use `evaluate_math(request)` only if a suitable implementation is available. Record actual executed inputs, assumptions, precision, result, diagnostics, and limitations. Separate exact or numerical computation, symbolic checking, reasoning review, and formal proof.
5. **Test boundaries.** Check edge cases, extraneous solutions, dimensional consistency, and whether a finite sample is being mistaken for a universal proof.
6. **Return the handoff.** Pass the result and its limits to the writing or editing skill. Any changed assumption or formula invalidates dependent checks and requires a focused recheck.
7. **Route review and file verification.** Substantive mathematics goes to `reviewing-work` and `reviewer-mathematics`. Word artifacts also require Equation verification after the final edit.

## Verification vocabulary

| Check type | What it establishes | What it does not establish |
|---|---|---|
| Exact or numerical computation | result for specified inputs, domains, and precision | universal proof or source transcription correctness |
| Symbolic check | identity or transformation under stated assumptions | unsupported constructs or unstated assumptions |
| Reasoning review | completeness and step validity of a reasoning proof under stated assumptions | machine-checked proof certificate |
| Formal proof check | an exact checked statement with retained checker evidence | a broader claim than the checked theorem |

Model arithmetic is not machine verification. A finite set of examples is not proof for every input.

## Word and project boundaries

For Word, native editable OMML is required where the document requires an Equation. Images, lookalike Unicode, and raw markup do not satisfy that representation. The user may explicitly accept a limited handoff with the exact missing capabilities stated. Acceptance does not satisfy the native Equation requirement or turn failed or unperformed checks into a PASS. Mathematical correctness, Word structure, and project evidence remain separate checks.

For a mixed project report, retain [project grounding](../../references/project-grounding.md) read-only limits. Mathematical work cannot grant permission to run application tests, builds, or migrations.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` and `inspect_document(file)` — source mathematics and document context.
- `evaluate_math(request)` — optional independent calculation or symbolic check when available.
- `write_file(path, content)` — authorized check records or artifacts only.

## Completion and fallback

A mathematical handoff is complete when it states the target claim, assumptions, reasoning, result, actual checks, and limitations. If computation or Word Equation support is unavailable, return supported reasoning and explicitly label unavailable checks as unverified. Never substitute an image and call native Word mathematics complete.

## Common mistakes

- Ignoring domains, units, or assumptions.
- Treating numerical examples as proof.
- Calling model arithmetic machine-checked.
- Changing notation mid-section without a source or authorized reason.
- Having separate prose and mathematics passes independently rewrite the same formula.
- Treating native Equation structure as proof of mathematical correctness.
