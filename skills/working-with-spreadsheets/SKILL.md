---
name: working-with-spreadsheets
description: Use when inspecting, cleaning, analyzing, updating data, or creating charts in spreadsheet workbooks (XLSX, CSV) while preserving formula integrity.
---

# Working with Spreadsheets

## Job

Inspect, update, clean, analyze, format, or chart tabular data while preserving workbook structure, data types, and live calculations. Workbook changes must remain traceable by sheet, range, and formula behavior.

Use [workflow continuity](../../references/workflow-continuity.md) to retain the target workbook revision, sheet/range locators, and requested operation. A workbook used as evidence for another task is read and returned to that task; inspection alone does not authorize a save.

## Non-negotiable rule

**Never overwrite calculated formulas with static values.** Preserve live formula relationships unless the user explicitly asks to freeze, paste values, or replace the calculation with a fixed constant.

## Inputs and output

**Inputs:** workbook path, target sheets/ranges, intended data or formatting changes, formula constraints, chart request, and known data-quality issues.

**Output:** an updated or analyzed workbook with changed range locators, formula-preservation evidence, recalculation results, and unresolved data or calculation issues.

## Method

1. **Inspect workbook architecture.** Identify sheets, ranges, tables, named ranges, headers, data types, formulas, calculation mode, validation rules, and existing charts.
2. **Profile the data before editing.** Check headers, missing values, duplicate records, date/number formats, units, and outliers against the requested purpose. Preserve raw data when a transformation must be reproducible.
3. **Make scoped updates.** Change only approved cells, rows, columns, formulas, labels, or styles. Preserve sheet names, references, tables, and number formats unless restructuring is requested.
4. **Protect formula dependencies.** Before deleting or moving data, identify formulas that reference it. Use `auditing-formulas` for `#REF!`, `#VALUE!`, `#DIV/0!`, circular dependencies, unexpected calculation results, or complex precedent/dependent analysis.
5. **Recalculate and inspect.** Recalculate after changes and check for faults, changed formulas, data-type drift, and unexpected downstream values.
6. **Create charts only from supported data.** Use clear series names, axes, units, legends, and source ranges. Do not make a chart imply a result that the data do not support.
7. **Verify the saved workbook.** Send a modified workbook to `verifying-artifacts`; reopen it and confirm sheets, formulas, data, charts, and calculation state.

## Formula and data checks

- Numbers remain numeric; dates remain dates; percentages, currency, units, and display formats remain meaningful.
- Formula fills follow the intended row or column pattern.
- Referenced rows or columns are not deleted without an intentional formula update.
- A formula audit distinguishes an intentional missing-value marker from an actual calculation fault.
- Workbook calculations and chart labels agree with their source ranges.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `inspect_spreadsheet(file)` — sheets, ranges, formulas, types, and charts.
- `edit_spreadsheet(file, ...)` — scoped values, formulas, and formatting changes.
- `recalculate_spreadsheet(file)` — recalculate workbook formulas.
- `create_chart_spreadsheet(...)` — chart creation from explicit ranges.
- `verify_artifact(file)` — saved workbook integrity.
- `read_file(path)` and `write_file(path, content)` — text/CSV support.

## Completion and fallback

A modified workbook is complete only after recalculation and verification. If native workbook editing is unavailable, return a coordinate-based change matrix or a clean CSV export that clearly states it is not an updated XLSX. Do not claim an XLSX change if only a text representation was produced.

## Common mistakes

- Replacing formulas with numbers to make a workbook “look correct.”
- Turning dates, percentages, or numbers into plain text.
- Deleting a referenced range without checking downstream formulas.
- Creating charts with unspecified units or misleading series labels.
- Treating a successful save as evidence that formulas recalculated correctly.
