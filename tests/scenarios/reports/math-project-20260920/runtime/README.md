# Runtime evidence: 2026-09-20 math/project constraints

This directory contains disposable runtime-probe output. It is outside any
surveyed source project and does not represent a user deliverable.

The corrected [sandbox probe](word-probe-20260920-163558-87da96c10f0e480e90442a4b3f8244f1/result.json)
failed to activate Word COM (`0x80070520`). The subsequent authorized
[outside-sandbox probe](word-probe-20260920-163612-dcb2dc7f39ec4cd4bd5339e54b346573/result.json)
timed out after 30 seconds and produced no DOCX/PDF. The exact stalled stage
was not observable. Only the owned PowerShell worker was stopped; no Word
process was killed, so a probe-owned instance may remain if COM activation hung.
Earlier timestamped directories record earlier attempts, not a successful
native Word round trip.

`node --test adapters/codex/word-math-probe.test.mjs` passed 3/3 tests. The
namespace-aware XML self-test includes a valid alternate-prefix fraction and
negative fixtures for malformed/missing XML, no OMML, raw LaTeX, DTD,
wrong numerator/denominator/RHS, altered untouched equation and same text with
different mathematical structure. Two further checks cover bounded hidden
worker configuration and refusal to overwrite an existing output directory.

Final review replaced the structure blacklist with a narrow allowlist. Negative
fixtures also cover absolute-value delimiters, prescripts, non-bar fractions and
reordered expressions. Unknown structures fail this fixture check; they are not
certified by flattening their text. This is not a general OMML semantic validator.

These are adapter parser/safety tests, not Word Equation editability evidence.
No all-path Word completion can be claimed: native create/edit/save/reopen,
clipboard import and rendered visual fidelity still need actual runtime
verification. See [capabilities](../../../../../adapters/codex/capabilities.md)
for the exact capability boundaries and reproduction commands.
