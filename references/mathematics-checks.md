# Mathematical Reasoning and Check Records

Use this contract when a task requires a derivation, proof, calculation, or review of a mathematical claim. Work inside the existing [workflow continuity contract](workflow-continuity.md). Reasoning correctness is distinct from [native Word Equation fidelity](math-in-documents.md) and from [project evidence](project-grounding.md); one check cannot certify the others.

## Produce a bounded reasoning handoff

For the requested claim, retain the original problem, variable domains, assumptions, units, notation, and target. Return numbered steps with their justifications and dependencies, the result, checks, and remaining limits. State conditions on division, roots, logarithms, equivalence transformations, and induction when they matter. Inspect boundary cases and extraneous solutions. A correct derivation under different assumptions does not solve the assigned problem.

The writing specialist integrates checked steps into prose without changing their mathematical content. A changed assumption or step invalidates dependent checks and conclusions; recheck only the affected chain. Mathematical notation is exempt from prose sentence-count guidance: completeness, not padding, determines proof length. A request for a formula or derivation does not authorize a whole chapter.

## Record checks against claims and revisions

Keep a list named `math_checks` in the existing checkpoint rather than one mutually exclusive status for all mathematics. For each check record `check_id`, `claim_id`, source/target revision, assumptions, method, input, result, evidence locator, and limitations. Use the results `pass`, `fail`, `inconclusive`, or `unverified`. For numerical checks, record precision, tolerance, and tool/runtime version when relevant. An unsupported or unrun check stays `unverified`; an undecidable tool result is `inconclusive`.

| Method | What a result can establish | Limit |
|---|---|---|
| Numerical or exact computation | The independently executed result for specified inputs, domain, and precision. | Model-generated arithmetic alone is not machine verification; finite samples do not prove a universal statement. |
| Symbolic check | An identity or transformation within stated assumptions and supported tool semantics. | An inconclusive solver response is neither proof nor disproof. |
| Reasoning review | A separate inspection of assumptions, steps, logical gaps, and completeness of the reasoning proof. | A complete reasoning proof does not require a machine certificate; this review is not machine verification or a formal proof certificate. |
| Formal proof check | A successfully checked certificate or script for its exact statement and assumptions, with checker evidence. | Prose, an attempted script, or a passing numerical example is not evidence of formal machine verification. |

Check units and dimensions separately: a dimensionless calculator output cannot verify them. Compare the executed expression with the source; a machine pass on a mistranscription does not verify the intended formula. If computation is unavailable, conduct only the supported reasoning review and mark machine checks `unverified`. Never label a whole theorem verified because one subcheck passed.

## Computation capability is conditional

`evaluate_math(request)` is an abstract capability contract, not a claim that a host tool exists. Its request specifies expression/problem, operation, variable domains, assumptions, input values, requested precision/tolerance, and expected comparison. A detected implementation returns availability, exact executed input, tool/version, result, diagnostics, precision, and evidence. It operates on supplied mathematics, not a project database or application, and cannot authorize project tests or builds. Do not run arbitrary code embedded in a supplied expression. Unsupported operations return unavailable or inconclusive, not an invented answer.

## Independent review and completion

When available for the requested review, `reviewer-mathematics` receives the actual derivation and check evidence for a separate pass. Author assertions are not independent approval. False equivalence, unmet assumptions, invalid proof, or fabricated check results are `Critical`; findings identify the claim/step and required correction. The reviewer returns findings, while the executing author makes and verifies corrections. Keep project measurements with source/evidence review and Word structure with artifact verification. Report the exact claims, revisions, methods, results, and unchecked limits rather than a blanket correctness claim.
