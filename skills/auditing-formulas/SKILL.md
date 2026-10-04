---
name: auditing-formulas
description: Use when auditing, diagnosing, tracing dependencies, or correcting formulas, calculations, and financial or statistical logic in spreadsheet workbooks.
---

# Auditing Formulas

## Job

Trace workbook calculations from inputs to outputs, identify the root cause of formula faults, and propose or apply authorized corrections without hiding errors. An audit-only request returns findings; a repair request adds changes, recalculation, and verification.

Use [workflow continuity](../../references/workflow-continuity.md) to retain workbook revision, sheet/cell locators, intended calculation logic, and the user’s requested stopping point.

## Audit invariants

1. **Zero calculation errors for repair completion.** Do not claim a repaired workbook is error-free while unintended `#REF!`, `#VALUE!`, `#DIV/0!`, `#N/A`, `#NAME?`, `#NUM!`, or `#NULL!` errors remain.
2. **Never hide errors with static values.** Repair the formula, its dependency, or its documented input condition; do not overwrite a broken calculation with a number.
3. **Detect circular dependencies.** Identify unintended circular references and explain the loop before changing it.
4. **Check formula patterns.** A formula that breaks a repeated row or column pattern is a finding even if it does not currently display an error.
5. **Separate a sample from a proof.** A few checked cells support only those cells; they do not establish the correctness of the whole model.

## Inputs and output

**Inputs:** workbook revision, target sheets/ranges, expected business or mathematical logic, known error cells, relevant assumptions, and whether the request is audit-only or repair.

**Output:** a formula audit with cell locators, precedents, dependents, observed error, root cause, proposed correction, effect on outputs, and verification status. A repair also returns the modified and recalculated workbook revision.

## Method

1. **Inventory calculation faults.** Scan sheets for formula errors, warnings, inconsistent fills, hard-coded substitutions, and circular references.
2. **Trace dependencies.** For each affected output, walk upstream precedents and downstream dependents. Record the chain, not only the first visible error.
3. **Diagnose the root cause.** Check reference shifts, type mismatch, empty or zero denominator, lookup key/range mismatch, function spelling, quote use, units, rounding, and circular loops.
4. **Evaluate intended logic.** Compare the formula with adjacent patterns, defined names, business rule, and source data. Do not apply `IFERROR` blindly; it can mask an integrity fault.
5. **Return findings or make an authorized repair.** For audit-only work, stop after a clear report. For repair work, change only the required formulas and preserve the intended model.
6. **Recalculate and re-audit.** Re-run the fault scan, check all affected outputs and downstream values, and verify zero calculation errors for the repaired scope.
7. **Verify the artifact.** Send the repaired workbook to `verifying-artifacts` before reporting file completion.

## Error diagnosis guide

| Symptom | Investigate first |
|---|---|
| `#REF!` | deleted, moved, or broken range references |
| `#VALUE!` | text where a number/date is required; incompatible range shapes |
| `#DIV/0!` | zero or empty denominator; whether missing input should remain visible |
| `#NAME?` | function spelling, named range, or quoted text parameter |
| `#N/A` | lookup key, lookup range, match mode, sort order, and data type |
| Circular reference | the exact loop and whether it is intentional iterative logic |
| Inconsistent formula | relative/absolute references and the intended fill pattern |

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `inspect_spreadsheet(file)` — formulas, layout, and calculation modes.
- `audit_spreadsheet(file)` — error inventory, dependency tracing, and circular detection.
- `recalculate_spreadsheet(file)` — post-repair calculation.
- `edit_spreadsheet(file, ...)` — authorized formula edits.
- `verify_artifact(file)` — saved workbook integrity.
- `read_file(path)` and `write_file(path, content)` — text-level audit support.

## Completion and fallback

An audit is complete when it reports exact cells, evidence, limits, and proposed fixes. A repair is complete only when recalculation, re-audit, and file verification confirm the repaired scope. If automated audit support is unavailable, inspect formula strings manually and return a coordinate-based audit; do not claim recalculated results that were not produced.

## Common mistakes

- Hard-coding a value to conceal a formula error.
- Fixing one row while leaving identical broken formulas elsewhere.
- Wrapping every error in `IFERROR` without diagnosing its cause.
- Calling a workbook error-free before recalculation and a second audit.
- Treating a mathematical-looking formula as correct without checking its assumptions and dependencies.
