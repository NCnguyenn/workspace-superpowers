# Math and project reporting upgrade

Date: 2026-09-20. Scope: the two approved constraints and automatic mathematics
selection in this repository. Authored artifacts use the package's English
default; user-facing task updates are in Vietnamese.

## Result

The portable skill/workflow upgrade is implemented (23 skills, mathematics
specialist, mathematics review role, bounded exact arithmetic).

**On this PI-Desktop host, both constraints now have runtime evidence.**

1. Native Word Equations: an in-process Word 16.0 COM session created two
   `oMath` objects (fraction `(x+1)/2=3` and `y=4`), edited the first RHS to
   `4`, saved, and reopened with two native Equations and no image blips.
   Fixtures: `tests/fixtures/word-native-equations/`. Nested/hidden
   `powershell.exe` workers still hang or fail COM; do not use them here.
2. Project survey: `adapters/pi/project-survey.mjs` inspects a folder, writes
   only `project-context.md`, skips `node_modules` and secret-like files, and
   refuses tests unless explicitly permitted. Tests: 2/2.

See [Pi capability record](../adapters/pi/capabilities.md).

## Implemented behavior

| Need | Implemented route and boundary |
|---|---|
| Mathematical report/thesis content | The existing prose/analysis workflow adds `working-with-mathematics` when the section needs notation, calculations, a derivation, recurrence, proof or correctness checking. It returns assumptions, justified numbered steps, results and check limits. |
| Implicit and follow-up requests | The router uses actual content and retained context. “Continue the induction proof”, “calculate the number of selections” and continuing a recurrence section activate mathematics without a skill name. Ordinary edits, simple conversational arithmetic and Excel audits keep their appropriate routes. |
| All Word entry paths | Paste, author, edit and export share one native Equation contract: preserve mathematical content and OMML; inspect layout; edit/save/reopen a copy; preserve untouched equations and the adopted original revision. Counts and successful export alone do not pass. |
| Missing Word capability | Mark required checks unverified and block Word completion. Image or raw LaTeX alternatives require explicit acceptance of a limited handoff; they never count as native Equation completion. |
| Project-based report | Read the necessary folder slice, existing description or both; retain original source locators, revisions, coverage and conflicts. Map inspected sources into the adopted report outline. |
| Project boundaries | Survey permits observation and exactly one designated derived context Markdown write. It does not authorize code/config/schema/Git/data changes, tests, evidence builds, migrations or mutating startup/UI actions. |
| Persistent project context | The router delegates grounded creation/update of the one context record to `editing-documents`; reading and analysis remain read-only. Reuse the exact path, preserve original documents, and verify the written record. |
| Continuity | Reuse the current brief, evidence register, notation, source revision and applicable approvals. These extensions introduce no second lifecycle or additional approval gate. |

Shared instructions: [Word mathematics](../references/math-in-documents.md),
[mathematical checking](../references/mathematics-checks.md),
[project grounding](../references/project-grounding.md),
[activation table](../skills/using-workspace-superpowers/SKILL.md#mathematics-activation).

## Verification

| Evidence | Observed result | What it establishes |
|---|---|---|
| Architecture baseline | 58/58 passed | Existing structural checks passed before implementation. |
| New contract tests before implementation | 0/8 passed, expected missing-contract failures | Structural RED baseline; not evidence of agent misconduct. |
| Final architecture suite | 68/68 passed | Catalog, roles, capability names, links, continuity, routing and shared-contract checks. |
| Scenario infrastructure self-tests | 43/43 passed during this implementation | Test harness behavior; not live Word/project acceptance. |
| Exact arithmetic adapter | 8/8 passed | Actual Python executions, exact arithmetic/discrete operations, resource bounds, supported request semantics and structured failure cases. |
| Word probe self-tests | 3/3 passed | Known-fixture XML checks, negative cases, bounded worker configuration and overwrite refusal; no Word editability claim. |
| MP01–MP16 response samples | Decisions consistent with expected outcomes | Bounded hypothetical responses with visible expectations; no statistical routing guarantee or project side-effect certification. |
| Whitespace verification | `git diff --check` passed with `core.safecrlf=false` | No diff whitespace errors; not runtime correctness. |

Independent review identified and the implementation corrected context-write
ownership, arithmetic JSON overflow, silently ignored domain/tolerance fields,
and false semantic acceptance of equations with identical extracted text but
different structure. Review also corrected capability wording and checkpoint
placement. Baseline safe behavior is preserved without claiming numerical
before/after improvement.
Final defect closure was inspected and tested by the main agent; a requested
independent re-review could not run after the agent service reached its usage
limit. The earlier independent findings are retained in the evidence record.

Evidence: [baseline](../tests/scenarios/reports/math-project-20260920/baseline.md),
[response samples](../tests/scenarios/reports/math-project-20260920/treatment.md),
[arithmetic runtime](../tests/scenarios/reports/math-project-20260920/math-runtime/README.md),
[Word runtime](../tests/scenarios/reports/math-project-20260920/runtime/README.md).

## Actual host limits and dependencies

The arithmetic adapter uses Python's standard library. It supports exact rational
arithmetic, integer powers, factorial, combinations and GCD within explicit
resource bounds. It is not a CAS, theorem prover or unit checker. Unsupported
request semantics return unavailable; recorded assumptions are not verified.
No external MCP, repository or plugin was installed for this upgrade.

The Codex nested-worker Word probe failed (`0x80070520` / timeout). On this
PI-Desktop interactive shell, in-process Word 16.0 COM succeeded: native
`oMath` create, edit, save, and reopen. Evidence files are in
`tests/fixtures/word-native-equations/`. Do not use a hidden nested
`powershell.exe` worker for Word on this host.

Clipboard/LaTeX paste and visual layout inspection of arbitrary documents
were not exercised. Office MCP was not used as an Equation engine.
See [Pi capabilities](../adapters/pi/capabilities.md) and the
[Codex capability record](../adapters/codex/capabilities.md).

These changes apply to this repository checkout. They do not assert global
skill installation or a new MCP tool.
