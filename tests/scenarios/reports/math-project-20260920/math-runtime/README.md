# Bounded math runtime evidence

Date: 2026-09-20 (Asia/Bangkok)

The adapter `adapters/codex/evaluate_math.py` accepts one JSON request on stdin
and writes one JSON response on stdout. It was exercised through the Node test
that starts the detected local Python executable for every request.

## Executed commands and outcomes

1. `node --test adapters/codex/evaluate_math.test.mjs` during final hardening:
   **fail**, 4/5 tests passed. The intermediate expression
   `(2 ** 1000) ** 1000` caused an uncaught Python integer-to-string limit
   exception instead of the required structured resource-limit failure.
2. Added adversarial request, scientific-decimal, provenance-field and domain
   cases; hardened the runtime. The same command then **passed, 7/7 tests**.
3. A direct CLI request with expression `comb(10,3) + 1/3`, expected `361/3`,
   and one supplied assumption returned `outcome: pass`, exact result `361/3`,
   `executed_expression: comb(10,3) + 1/3`, `assumptions_checked: false`,
   runtime `evaluate_math/1.1.0`, Python `3.11.9`, and exit code 0.
4. Independent review added JSON numeric-overflow and unsupported-request-field
   regressions: **fail, 6/8 tests passed**. JSON exponent overflow could reach
   response serialization, and unsupported `domain`, `precision` or `tolerance`
   fields were ignored.
5. Version `evaluate_math/1.2.0` rejects non-finite decoded floats before
   evaluation, disables non-finite JSON serialization, and rejects unknown
   request fields as unavailable. Final run: **pass, 8/8 tests**.

These are actual local runtime executions, separate from response-level skill
scenarios. They establish only this bounded arithmetic adapter's behavior.

The passing test run covers exact rational/decimal inputs and comparison,
factorial/comb/gcd, an unchecked calculation reported as `inconclusive`, a
comparison mismatch, domain validation, unavailable operations, forbidden
attribute/subscript/import/unknown-call/bool syntax, huge positive and negative
decimal exponents, huge intermediate powers, byte/depth/integer JSON limits,
non-finite JSON numbers, malformed assumptions, and zero-exponent domains.
`0 ** 0` requires an explicit convention and is rejected by this adapter.
The CLI exits 0 for a completed calculation (including an inconclusive
unchecked one), 1 for an expected-result mismatch, 2 for an unavailable
operation or invalid JSON envelope, and 3 for evaluation request, syntax,
domain, or resource-limit failures.

## Enforced limits

The request is limited to 65,536 UTF-8 bytes and 16 JSON nesting levels before
JSON parsing. Expressions allow 4,096 characters and 128 AST nodes, with at
most 512 literal digits and 32 supplied variables. Integer exponents have
absolute value at most 1,000; decimal scale is bounded before `Fraction`
expansion. Numerators and denominators must each have at most 4,096 digits.
Large powers are rejected before exponentiation using a bit-length bound;
intermediate arithmetic is checked without decimal string conversion.
Factorial arguments are at most 1,000; combination arguments are at most
10,000. Assumptions are at most 32 strings of 1,024 characters each.

## Evidence boundary

The runtime uses Python standard-library `ast`, `fractions.Fraction`, and
`math`, with a strict allow-list. It does not use `eval`, `exec`, a CAS, a proof
checker, or unit/dimension validation. A completed calculation without an
expected equality is intentionally `inconclusive`; finite supplied-input
calculations are not a proof of a general claim. Supplied assumptions are
recorded and explicitly not verified. `requested_expression` records the
request; `executed_expression` is present only after calculation completes.
Rejected syntax, unavailable operations, and resource-limit failures must
not be presented as a mathematical counterexample. This adapter adds no
Word equation rendering, clipboard, editing, or round-trip capability.

The only accepted request fields are `operation`, `expression`, `values`,
`expected`, and `assumptions`. The only operation is `evaluate` in the fixed
exact-rational domain. Custom domains (including finite fields), requested
precision and tolerance comparisons are unsupported and return `unavailable`
before execution; the adapter must not silently substitute a different problem.
Decimal and rational inputs must use strings to preserve exactness. Supplied
assumptions remain unverified context, not a way to change the arithmetic domain.
