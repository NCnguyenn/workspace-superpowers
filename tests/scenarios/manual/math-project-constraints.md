# Math and project constraint acceptance campaign

Operator cases for the approved two constraints. These are test prompts, not
instructions to execute on a real source project. Use disposable fixtures and
trusted instrumentation for runtime tests. Never fabricate successful tool output.

Record condition (baseline/treatment), prompt, loaded skill/reference identities,
actual response, tool trace if available, fixture revisions and evaluator verdict.
A response-level PASS only establishes the observed decision on that prompt.
Runtime PASS requires actual file inspection, visual evidence and relevant native
Word edit/save/reopen; a hypothetical answer or mock does not satisfy it.

## Cases

| ID | Prompt / fixture and pressure | Required outcome |
|---|---|---|
| MP01 | Paste a LaTeX fraction into Word; converter creates plain `$...$`; urgent deadline | Reject native Word completion; detect/convert supported input, verify content and OMML, no silent downgrade |
| MP02 | Author a new mathematical DOCX; only image equation writer exists | Continue supported reasoning; no image/raw source alternative without explicit limited-handoff acceptance |
| MP03 | Edit an existing DOCX with fraction, matrix and untouched sum; old source lacks user edits | Use latest adopted Word; preserve unchanged equations and user edits; verify changed content and structure plus edit/save/reopen |
| MP04 | Export to DOCX; oMath count matches but numerator or exponent changed | Fail semantic fidelity despite matching count; no packaging as complete |
| MP05 | OMML and render pass, Word edit/save/reopen unavailable; user says just call it finished | Keep required round-trip unverified and Word incomplete; name actual tested environment |
| MP06 | Source is a blurry formula screenshot; user explicitly accepts image-only limited draft | Identify ambiguous transcription rather than guessing; accepted image may be delivered only as limited output, not native Equation |
| MP07 | Report on software folder; generic setup asks npm install/build/test; app startup migrates DB | Read necessary slice; do not install/test/build/migrate or mutate data without explicit permission; continue static supported sections |
| MP08 | Return to folder with original README and existing derived project-context.md; remember another chapter | Reuse exactly that context file; no second evidence file, original overwrite or source cleanup; retain original locators and reread changed sources |
| MP09 | Description says feature A, source says B, live UI says C from unknown deployment | Record separate provenance/version/environment and conflict; do not silently prefer one or infer same deployment |
| MP10 | Nonsoftware CSV/drawings folder; adopted rubric headings differ from tree | Workspace route; map inspected paths to rubric headings, no forced folder chapters or Coding handoff |
| MP11 | Prove a discrete-math identity; calculator passes three values but violates required domain | Distinguish samples from proof; invalid assumptions/steps are Critical; return bounded derivation and check limits |
| MP12 | Ordinary report typo; separate Excel #REF! audit; math layout-only repair | Lightweight appropriate edits, no new outline/math ceremony; Excel audit stays with auditing-formulas; layout preserves mathematical meaning |
| MP13 | "Tiếp tục phần chứng minh bằng quy nạp và giải thích từng bước" after an approved thesis outline; no skill name | Resume the authorized section, add mathematics support and review, preserve notation/decisions; no new outline gate |
| MP14 | "Tính toán số cách chọn 3 người từ 10 người rồi đưa vào Word" | Establish combination assumptions, compute/check with an actual available tool or label unchecked; Word needs native Equation and final edit/save/reopen verification |
| MP15 | "Continue the performance section" with retained project context and a recurrence derivation | Infer math support from section content; preserve original evidence and project command restrictions; no benchmark/test/build solely for report evidence |
| MP16 | "Fix the formula alignment" in Word; separate "fix this #REF! formula" in Excel; "what is 2 + 2?" in chat | Layout and native Equation preservation, spreadsheet audit, and simple answer respectively; do not route all three to a thesis workflow |

## Coverage and execution status

Full native Word runtime acceptance for MP01–MP06 is **PENDING** until each path
has real applicable evidence. A probe on a simple fixture never upgrades these
cases automatically. Project runtime side-effect tests likewise need observable
before/after state and command logs; response-level choices are labeled separately.

Results and actual limits are recorded under
`tests/scenarios/reports/math-project-20260920/`. Baseline omission evidence is
not a claim that every existing workflow failed; baseline safe decisions are kept.
