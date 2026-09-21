---
name: working-with-spreadsheets
description: Use when inspecting, cleaning, analyzing, updating data, or creating charts in spreadsheet workbooks (XLSX, CSV) while preserving formula integrity.
---

# Working with Spreadsheets

Inspect, manipulate, analyze, and format spreadsheet workbooks while strictly maintaining formula integrity and data types.

Apply the [workflow continuity contract](../../references/workflow-continuity.md).
When a workbook supplies evidence for another task, return relevant sheet/cell
locators, values, units, formulas, and calculation limits to analysis, then resume
that task. Inspection/analysis alone does not authorize data cleaning, formula
repairs, chart creation, or saving changes to the source workbook.

## When to use

Inspecting sheets and named ranges, cleaning raw tabular data, updating numbers or labels, building summary views, creating charts, or modifying workbooks (XLSX, XLS, CSV).

## When not to use

* Free-form document drafting or narrative reports (use document or prose skills).
* Deep formula debugging, circular reference resolution, or calculation auditing (route to `auditing-formulas`).

## Formula preservation rule (§10)

**Never overwrite calculated formulas with static values.**

Unless the user explicitly asks to freeze, paste-as-values, or replace a calculation with a fixed constant, all formula relationships must remain live and dynamic. Overwriting formulas with static numbers destroys the workbook's integrity and auditability.

## Procedure

1. **Inspect workbook architecture:** Use `inspect_spreadsheet` to discover sheet names, dimensions, named ranges, data types, header rows, calculation mode, and existing charts.
2. **Preserve data structure:** Keep original sheet names, table layouts, and cell formatting (currency, percentages, dates, integers) intact unless the user explicitly requested restructuring.
3. **Apply updates or cleaning:**
   - Use `edit_spreadsheet` to update data rows, insert columns, or apply transformations.
   - Respect data types: never store numbers or dates as raw unformatted strings.
4. **Recalculate & validate:** Invoke `recalculate_spreadsheet` to ensure formula engines update properly without producing calculation faults.
5. **Add visuals when requested:** Use `create_chart_spreadsheet` to generate charts with clear series names, axes, and legends.
6. **Route complex formula issues:** If formulas return errors (`#REF!`, `#VALUE!`, `#DIV/0!`) or circular dependencies emerge, invoke `auditing-formulas`.
7. **Verify workbook:** Hand off to `verifying-artifacts` to confirm file validity and absence of calculation errors.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

- `inspect_spreadsheet(file)` — to discover sheets, ranges, formulas, and chart objects.
- `edit_spreadsheet(file, ...)` — to update values, formulas, or formatting.
- `recalculate_spreadsheet(file)` — to recalculate workbook formulas.
- `create_chart_spreadsheet(..)` — to generate charts from data ranges.
- `verify_artifact(file)` — to verify output workbook integrity.
- `read_file(path)` / `write_file(path, content)` — basic file operations.

## Dependencies

- Follows `reading-artifacts` and `analyzing-artifacts`.
- Composes with `auditing-formulas` when calculations need diagnostic review.
- Precedes `verifying-artifacts`.

## Fallback

If native XLSX editing is unsupported, output clean CSV files or emit an explicit formula modification matrix with cell coordinates and target formulas. Never claim an XLSX file was updated if only CSV was exported.

## Common mistakes

* Replacing dynamic formula cells with static numbers.
* Converting numeric or date fields into plain text strings.
* Breaking formula references by deleting referenced rows or columns.
* Failing to trigger recalculation after updating underlying data.
* Omitting sheet names when referencing cells across multiple worksheets.
