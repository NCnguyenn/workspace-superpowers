# Mathematical reasoning and check records

Use within the existing [workflow continuity contract](workflow-continuity.md).
Mathematical correctness is separate from [Word Equation fidelity](math-in-documents.md)
and from [project evidence](project-grounding.md).

## Reasoning handoff

For a requested mathematical contribution, retain the problem, variable domains,
assumptions, units, notation and target claim. Return numbered steps with their
justification and dependencies, result, checks and limits. State conditions on
division, roots, logarithms, equivalence transformations and induction as relevant.
Check boundary cases and extraneous solutions. A correct result under different
assumptions does not solve the assigned problem.

The writing specialist integrates these steps into prose without changing their
mathematical content. A changed assumption or step invalidates its dependent
checks and conclusions. Mathematical notation is exempt from prose sentence-count
guidance; a proof must be complete rather than padded. Do not generate a whole
chapter when only a formula or derivation was requested.

## Check records

Maintain a list `math_checks` in the existing checkpoint, not one mutually
exclusive status for all mathematics. Each check has `check_id`, `claim_id`,
source/target revision, assumptions, method, input, result, evidence locator and
limitations. Results are pass, fail, inconclusive or unverified. Record precision,
tolerance and tool/runtime version for numerical checks where relevant.

| Method | What the evidence can establish |
|---|---|
| Numerical or exact computation | A computation for the specified inputs, domains and precision. Capture the actual independently executed result; model-generated arithmetic alone is not machine verification. |
| Symbolic check | An identity or transformation within explicit assumptions and the tool's supported semantics. An inconclusive solver result is not false or proved. |
| Reasoning review | A separate review of assumptions, steps and logical gaps. State that it is reasoning review, not machine verification or a formal proof certificate. |
| Formal proof check | Only a successfully checked certificate/script with its exact statement, assumptions and checker evidence; never infer this from prose. |

Finite numerical samples are not a proof of a universally quantified statement.
Units/dimensions require their own check; a dimensionless calculator output cannot
verify them. A machine pass on a mistranscribed expression does not verify the
source formula. If no computation capability is available, record unverified
machine checks and perform only the supported reasoning review. Do not label a
whole theorem "verified" from one passing numerical subcheck.

## Abstract computation capability

`evaluate_math(request)` consumes expression/problem, operation, variable domains,
assumptions, input values, requested precision/tolerance and expected comparison.
It returns availability, exact executed input, tool/version, result, diagnostics,
precision and evidence. It operates on supplied mathematics, not on a project
database or application; it cannot grant permission to run project tests/builds.
An implementation must be detected and must not execute arbitrary code embedded
in a supplied expression. Missing operations return unavailable/inconclusive.

## Review and completion

`reviewer-mathematics` receives the actual derivation and check evidence for a
separate review pass; author assertions of correctness are not approval. False
equivalence, unmet assumptions, invalid proofs or invented check results are
Critical. Findings identify the claim/step and necessary correction. Project
measurements stay with source/evidence review; Word structure stays with artifact
verification. Reviewers return findings; the author applies corrections.
