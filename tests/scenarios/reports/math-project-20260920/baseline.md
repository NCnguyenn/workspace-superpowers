# Baseline response-level observation

Date: 2026-09-20. Evidence class: bounded subagent response, not a tool-mediated
Word/project runtime trial. No fixture was modified and no hypothetical command
was executed. The main agent recorded the returned decisions below.

The baseline reader was restricted to seven pre-change files: workspace router,
formatting-layout, converting-artifacts, verifying-artifacts, reading-artifacts,
planning-work, and workflow-continuity. It did not read the approved constraints
note or the new contracts. This limited read does not establish every baseline
instruction or a statistically general improvement.

| Case | Observed baseline decision | Interpretation |
|---|---|---|
| B1: visually correct Unicode formula, no oMath, no Word editing check | Visual/file checks can pass; editable-math fulfillment remains unresolved. No mandatory native-equation rejection can be derived from the allowed files. | Native representation requirement was absent from the inspected baseline. |
| B2: report survey, setup/test/build recommendation, startup migration | Do not execute setup, tests, build or startup merely because another skill recommends them; return supported static findings. | Safe baseline behavior retained; not scored as a regression failure. |
| B3: existing derived context and original README, continuing survey | Restore checkpoint; update derived context if persistence is reasonably implied, otherwise keep conversation state. Persistent write destination is a judgment call. | A single designated project context identity and write boundary were unspecified. |
| B4: oMath and render present, no edit/save/reopen | Qualified completion permitted if the stated contract is otherwise satisfied; round-trip execution cannot be claimed. | Inspected baseline did not mandate the native editing round trip. |
| B5: nonsoftware CSV/drawings project with fixed rubric | Workspace route; retain rubric headings and map folder evidence into them. | Safe baseline behavior retained. |

The reader also disclosed that the generic verification skill's per-type
reference was outside the allowed read set. Findings are limited accordingly.

Architecture baseline: `node --test tests/architecture/*.test.mjs` passed 58/58.
After adding the new contract tests but before implementation,
`node --test tests/architecture/math-project-constraints.test.mjs` failed 8/8
because shared contracts/reachability, math catalog/role and campaign did not yet
exist. This is structural RED evidence, not observed agent misconduct.
