---
name: working-with-mathematics
description: Use when a report, thesis, explanation or revision contains mathematical expressions, derivations, discrete mathematics, proofs or calculations requiring interpretation or checking.
---

# Working with Mathematics

Optional mathematical support for the requested section, not another writing
router. Apply the [workflow continuity contract](../../references/workflow-continuity.md),
[document continuity contract](../../references/document-continuity.md) and
[mathematics check contract](../../references/mathematics-checks.md).

## When to use

Defining symbols/assumptions, deriving results, explaining proof steps or
checking mathematical content in a report or thesis. Read the actual source
through `reading-artifacts` first when an existing file is involved.

Activate from the actual mathematical need without the user naming this skill.
Examples include "chứng minh bằng quy nạp", "tính toán số cách chọn",
"giải thích từng bước", "write the recurrence analysis", and a request to
continue a thesis section whose retained context contains a derivation.
These examples illustrate intent, not an exact keyword matcher. Merely mentioning
a formula does not require mathematical rewriting. For a mixed project report,
retain the project survey's read-only limits and the current prose workflow.

## When not to use

Spreadsheet cell/dependency audits belong to `auditing-formulas`. Pure equation
layout or lossless conversion uses document skills and the
[Word Equation contract](../../references/math-in-documents.md), without forcing
a new proof. Software work remains a bounded Coding slice.

## Procedure

1. Consume the assigned question, source locators, existing notation, assumptions,
   domains and relevant continuity profile. Preserve the requested operation:
   analysis and checking do not authorize a new chapter or file edit.
2. Establish the target claim and notation table. Identify missing conditions
   that materially change the result; continue independent supported work.
3. For authorized derivation, return numbered steps and reasons, dependencies,
   result and limits. For review-only input, identify issues instead of silently
   replacing the derivation. Do not skip steps needed for the intended reader.
4. Use `evaluate_math(request)` only when a suitable implementation is detected.
   Record each actual check and its assumptions; separate computation, samples,
   reasoning review and formal proof. Never manufacture an execution result.
5. Return the mathematical handoff to the writing/editor skill. It integrates
   the prose; any mathematical changes return here for affected rechecks.
6. Send substantive mathematics to `reviewing-work` for separate mathematics
   review. Word outputs also require Equation verification after the final edit.

## Required capabilities

- `read_file(path)` / `inspect_document(file)` — source content and checks.
- `evaluate_math(request)` — optional independent computation with evidence;
  unavailable operations remain unverified.
- `write_file(path, content)` — only for authorized artifacts/check records;
  no additional source-project writes are implied.

## Dependencies

Selected by `drafting-prose` for optional support or by analysis/review for a
bounded mathematical question. Uses the existing brief and `math_checks` list.
Precedes `reviewing-work`; file outputs then require `verifying-artifacts`.
No new scope or outline approval gate.

## Fallback

If computation is unavailable, return supported reasoning and explicit unverified
machine checks. If Word Equation creation or verification is unavailable, follow
the limited-handoff rule; do not substitute an image and call Word complete.

## Common mistakes

- Treating finite test values as proof for every input.
- Ignoring domains or changing established notation mid-chapter.
- Calling model arithmetic machine-checked.
- Rewriting the same formula independently in mathematical and prose passes.
- Treating native Equation structure as evidence of mathematical correctness.
