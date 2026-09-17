---
name: auditing-formulas
description: Use when auditing, diagnosing, tracing dependencies, or correcting formulas, calculations, and financial/statistical logic in spreadsheet workbooks.
---

# Auditing Formulas

Audit, diagnose, trace cell dependencies, and repair broken formulas and calculation logic in spreadsheet workbooks.

## When to use

Diagnosing formula calculation errors (`#REF!`, `#VALUE!`, `#DIV/0!`, `#N/A`, `#NAME?`, `#NUM!`, `#NULL!`), tracing precedent/dependent cell chains, detecting circular references, or auditing mathematical consistency across tabular models.

## When not to use

* Simple data entry, text formatting, or standard chart creation without calculation errors (use `working-with-spreadsheets`).
* Narrative document writing or non-tabular data tasks.

## Audit invariants (§10, §13)

1. **Zero calculation errors:** Workbooks delivered to users must not contain unresolved spreadsheet error codes (`#REF!`, `#VALUE!`, `#DIV/0!`, `#N/A`, `#NAME?`, `#NUM!`, `#NULL!`).
2. **Never hide errors with static numbers:** Never overwrite a broken formula with a static value merely to conceal an error. The root dependency or formula syntax must be repaired.
3. **Detect circular dependencies:** Detect unintended circular references that destabilize calculation iterations.
4. **Formula pattern consistency:** Flag anomalies where a formula within a uniform column or row abruptly breaks pattern with adjacent cells.

## Procedure

1. **Scan for calculation faults:** Use `audit_spreadsheet` and `inspect_spreadsheet` across all sheets to inventory all formula errors, warning flags, and circular references.
2. **Trace precedent and dependent chains:** Inspect upstream input cells (precedents) and downstream outputs (dependents) to understand the data flow.
3. **Diagnose root causes:**
   - `#REF!`: Identify deleted or shifted range references.
   - `#VALUE!`: Detect non-numeric text strings passed into mathematical functions.
   - `#DIV/0!`: Check for zero or empty divisors; introduce `IFERROR` or `IF(denominator=0, ...)` guards where appropriate.
   - `#NAME?`: Identify mistyped function names or missing quotes around text parameters.
   - `#N/A`: Verify lookup keys, sort order, and lookup range boundaries in `XLOOKUP`, `VLOOKUP`, or `INDEX-MATCH`.
   - Circular reference: Trace the dependency loop and break the recursive reference.
4. **Apply formula corrections:** Use `edit_spreadsheet` to update formula strings, preserving intended mathematical logic.
5. **Recalculate & re-audit:** Invoke `recalculate_spreadsheet` and re-run `audit_spreadsheet` to verify that all errors are resolved.
6. **Hand off to verify:** Transfer the workbook to `verifying-artifacts` to confirm file health.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

- `inspect_spreadsheet(file)` — to discover sheet layout, cell formulas, and calculation modes.
- `audit_spreadsheet(file)` — to diagnose formula errors, precedent/dependent trees, and circular references.
- `recalculate_spreadsheet(file)` — to recalculate formula values after edits.
- `edit_spreadsheet(file, ...)` — to update formula expressions and cell values.
- `verify_artifact(file)` — to verify final workbook integrity.
- `read_file(path)` / `write_file(path, content)` — basic file operations.

## Dependencies

- Works in tandem with `working-with-spreadsheets`.
- Must conclude with `verifying-artifacts` before completion is claimed.

## Fallback

If automated spreadsheet recalculation or auditing capabilities are unavailable, examine cell formula strings manually, identify syntax/logic errors, and output a detailed audit report listing exact cell coordinates, observed errors, root causes, and replacement formulas.

## Common mistakes

* Silencing an error by typing in a hardcoded number instead of fixing the formula.
* Fixing an error on one row while leaving identical broken formulas across the rest of the column.
* Wrapping every formula blindly in `IFERROR(..., "")`, masking underlying data integrity bugs.
* Forgetting to recalculate the workbook to verify that repairs took effect.
