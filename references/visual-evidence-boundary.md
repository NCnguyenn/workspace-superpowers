# Visual and document evidence boundary

Apply before reporting what an image, screenshot, or embedded DOCX figure shows, and before treating a sentence in a completed document as an observed result.

## Provenance

Label every finding with one of these values:

| Label | Use it when |
|---|---|
| `document-stated` | The document says it. This is not independent verification. |
| `visually-observed` | The pixels show it. |
| `source-inspected` | The named source file or XML was opened. |
| `runtime-observed` | A retained runtime trace shows it. |
| `unverified` | The claim has no linked evidence. |

Implementation names, test results, and measurements copied from a document stay `document-stated` until the source or runtime is inspected.

## Visible pixels

Visible pixels establish visible pixels. They do not establish data provenance, runtime execution, device identity, a CSS viewport, or that a criterion is satisfied.

A displayed price, including `$0`, is a visible price. The database or source of that value is `unverified` from the image alone.

A layout that matches a shown rule is compatibility. It does not prove that rule executed. Say "consistent with" and keep execution `unverified`.

Raster dimensions are raster dimensions. A PNG width is not a CSS viewport. Do not say it corresponds to, equals, or would equal a viewport if DPR is 1. Do not infer a device, zoom, crop, or export scale from the width.

When a screenshot shows CSS, list every visible breakpoint. Do not say "only these breakpoints" after reading part of the image.

## Transcription

Copy every visible text line in the requested region, through the bottom of that region. Keep an ellipsis only when the pixels show one. Do not complete a brand or product name from outside the image.

If a control covers part of a row, say the row is partly covered, name the control, and copy only the marks still visible. Do not reduce those marks to one symbol.

Render each caption once. Do not prefix `Figure 95: Figure 95:`.

## DOCX locator

The primary locator is the `r:embed` ID and its resolved relationship target. A media filename is not a relationship ID. Do not invent an ID from the filename number.

State the counting scope: direct `w:body` child paragraphs, or all descendant `w:p` elements. State whether the index is 0-based or 1-based. Write a count as `1183`, not `1.183`.

## Separate statuses

Report these independently. One pass does not imply the next:

- `media opened`
- `original image legible`
- `rendered document legible`
- `supports a claim`
- `criterion satisfied`

XML extent and original-PNG clarity can indicate a readability risk. They do not establish rendered document legible. Keep that status `unverified` until the Word or PDF page is inspected at page size.

## Tool result

Paste the unedited tool result, including the tool name and returned output. A retold log is not an unedited tool result. If that result is absent, label tool execution `unverified`. Matching numbers do not convert a narrative into a result.

Do not mark native acceptance passed without the retained router and specialist calls and their returned results.

Render each conversion once. Do not place repeated arrows on their own lines.
