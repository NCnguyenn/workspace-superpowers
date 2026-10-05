# Visual and Document Evidence Boundary

Use this boundary before describing an image, screenshot, or embedded DOCX figure, and before reporting a statement in a completed document as if it were an observed result. Record the locator and provenance for each claim. Visual inspection proves only what can be seen; use [visual assets and Word fidelity](visual-assets-and-word-fidelity.md) for asset creation/export and separate structural, rendered, and acceptance checks.

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

Visible pixels establish visible pixels, not data provenance, runtime execution, device identity, a CSS viewport, or criterion satisfaction. A displayed price, including `$0`, is a visible price; its database source remains `unverified` from the image alone. A layout compatible with a documented rule does not prove that rule ran: say “consistent with” and keep execution `unverified`.

Raster dimensions describe the raster; a PNG width is not a CSS viewport. Do not infer DPR, device, zoom, crop, or export scale from it. If the screenshot shows CSS rules, transcribe all visible breakpoints rather than calling a partial view exhaustive.

## Transcription

Copy every visible text line in the requested region, through the bottom of that region. Keep an ellipsis only when the pixels show one. Do not complete a brand or product name from outside the image.

If a control covers part of a row, say the row is partly covered, name the control, and copy only the marks still visible. Do not reduce those marks to one symbol.

Render each caption once. Do not prefix `Figure 95: Figure 95:`.

## DOCX locator

For an embedded image, locate `r:embed` and resolve its relationship target. A media filename is not a relationship ID; never derive one from the filename. State the counting scope for a paragraph index: direct `w:body` child paragraphs or all descendant `w:p` elements. State whether the index is 0-based or 1-based. Write a count as `1183`, not `1.183`.

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
