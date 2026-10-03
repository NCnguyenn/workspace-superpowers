---
name: working-with-visuals
description: Use when inspecting screenshots, DOCX figures, or other static images, or when generating, modifying, or verifying vector graphics, diagrams, and layered visual assets.
---

# Working with Visuals

Inspect, generate, edit, format, and verify visual assets, vector graphics (SVG), diagrams, and layered graphic formats (PSD, PSB).

Apply the [workflow continuity contract](../../references/workflow-continuity.md).
Carry the parent document's terminology, scenario, evidence, and visual convention
into requested assets. An image supplied for inspection is not permission to edit
it; return inspected facts and limitations to the parent task. Never present an
illustrative generated image as evidence of an actual project result.
Before any inspection conclusion, apply [visual evidence boundary](../../references/visual-evidence-boundary.md).

A media filename is not a relationship ID. Report the `r:embed` ID, its relationship target, the counting scope, and whether the index is 0-based or 1-based.
Do not convert a PNG width into a CSS viewport, including by assuming DPR is 1.
Copy every visible line. Keep an ellipsis only when the pixels show it. If a control covers part of a row, say that row is partly covered and do not reduce the visible marks.
Keep `media opened`, `original image legible`, `rendered document legible`, `supports a claim`, and `criterion satisfied` separate. XML size is a risk, not rendered readability.
Paste the unedited tool result. If it is absent, say tool execution is unverified. Render each caption once.

## When to use

Creating or editing standalone images (PNG, JPG, WEBP), authoring or adjusting vector graphics (SVG), generating diagrams (flowcharts, architecture diagrams, charts in Mermaid or SVG), inspecting visual properties (dimensions, aspect ratio, color profile, resolution), and modifying layered graphics.

## When not to use

* Composing multi-slide presentations or decks (belongs to `working-with-presentations`).
* Formatting Word/text document layout or typographic margins (belongs to `formatting-layout`).
* Plotting data charts directly inside spreadsheet workbooks (belongs to `working-with-spreadsheets`).
* Converting images or documents across file formats (belongs to `converting-artifacts`).

## Visual invariants (§10, §14, §17)

Apply [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md)
for selection, provenance, reuse conditions, actual previews and unavailable-host
fallbacks. Return the inspected or prepared asset to its calling analysis,
outline or drafting operation. An available preview must be shown there; asset
preparation does not authorize starting the next writing stage.

* **Vector preservation rule:** Never unintentionally rasterize vector graphics (SVG). Keep SVG text elements editable, preserve vector coordinates and viewBox attributes, and ensure scalable fidelity across zoom levels.
* **Layered graphic contract (PSD/PSB) (§10, §17):** Only attempt layered modifications when the harness exposes explicit layered capabilities (`inspect_layered_image`, `edit_layered_image`). Without layered capabilities, report the limitation transparently and fall back to producing flattened visual previews. Never claim an editable layered edit was performed if only a flattened raster was produced.
* **Aspect ratio & resolution integrity:** Preserve original aspect ratios to avoid horizontal/vertical stretching or squishing. Validate visual resolution against destination medium (minimum 300 DPI for print deliverables, 72–150 DPI for web/screen presentation).
* **Visual QA via rendering:** A file write or script exit code 0 is not proof of visual correctness. Reopen and visually verify rendered output via `render_image(file)` whenever visual rendering capabilities exist.

## Procedure

1. **Inspect visual asset:** For an existing image or graphic, use `inspect_image(file)` or `inspect_layered_image(file)` to check dimensions, aspect ratio, color space (RGB/CMYK), layer structure, and vector elements.
2. **Determine visual pathway:**
   - *Requested illustration:* If the user asked to see an image and did not ask to draw one, do not author SVG, Mermaid, HTML, or a generated image. Return a direct HTTPS image URL that returns the image bytes, preferably the final upload.wikimedia.org URL, so the calling message can embed it as image markdown. A wiki File page, a bare URL, a source line without that image markdown, a file path, and a long base64 blob are not images. Do not invent an upload path. Code-draw only if the user asked for a drawing or agreed after being asked.
   - *Vector/Diagram:* Author or adjust declarative vector code (SVG, Mermaid) only when that drawing was requested or agreed. Preserve viewports and vector paths.
   - *Raster image:* Crop, resize, or optimize an existing image using `edit_image(file, ...)` while preserving aspect ratio. Do not generate a new illustration to replace a requested source image.
   - *Layered asset:* Modify layers, canvas, or masks via `edit_layered_image(file, ...)` when supported.
3. **Verify visual artifact:** Reopen the resulting artifact with `verifying-artifacts` and `verify_artifact(file)`. Confirm dimensions, file size, absence of clipping or distortion, and render preview via `render_image(file)` where available.
4. **Disclose limitations:** Transparently report any unverified visual properties or unsupported layered operations in final packaging.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

* `inspect_image(file)` — inspect raster image dimensions, color space, DPI, and format metadata.
* `edit_image(file, ...)` — crop, resize, adjust, or filter raster images.
* `inspect_layered_image(file)` — inspect layer tree, smart objects, masks, and text layers in PSD/PSB assets.
* `edit_layered_image(file, ...)` — apply edits to layers, masks, or text in layered graphics.
* `render_image(file)` — render image preview for visual QA and layout verification.
* `verify_artifact(file)` — verify image file header, dimensions, and compression health.
* `read_file(path)` / `write_file(path, content)` — read and write SVG markup, Mermaid source, or raw graphic files.

## Dependencies

* Follows `reading-artifacts` and `analyzing-artifacts` when inspecting an existing visual file.
* Created or modified files conclude with `verifying-artifacts` before file completion is claimed. Read-only visual analysis reports inspected coverage and limits.

## Fallback

* **No native image manipulation tool:** Generate clean, self-contained SVG code or declarative Mermaid diagram code that renders without external binary dependencies.
* **No layered editor for PSD/PSB:** Inspect available flattened preview, clearly report the inability to edit binary layer trees, and offer to deliver an SVG or high-resolution PNG alternative.

## Common mistakes

* Converting vector SVG graphics into low-resolution raster bitmaps.
* Silently stretching or squishing images without maintaining proportional aspect ratios.
* Claiming a PSD layer was updated when only a flattened PNG was exported.
* Assuming exit code 0 from an image conversion script means the image is visually intact without re-opening it.
* Producing tiny unreadable diagram labels or clipped SVG viewports.
