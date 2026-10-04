---
name: working-with-visuals
description: Use when inspecting screenshots, DOCX figures, or other static images, or when generating, modifying, or verifying vector graphics, diagrams, and layered visual assets.
---

# Working with Visuals

## Job

Inspect, prepare, edit, generate when authorized, and verify visual assets while keeping visual evidence, source provenance, vector fidelity, and layered-edit limitations explicit. An image supplied for inspection is not permission to modify it, and an illustrative image is never proof of a project result.

Use [workflow continuity](../../references/workflow-continuity.md) to preserve the parent task’s terminology, scenario, visual convention, source revision, and requested stopping point.

## Evidence boundary

Before making any visual conclusion, apply the [visual evidence boundary](../../references/visual-evidence-boundary.md).

- A media filename is **not a relationship ID**. For DOCX figures, report `r:embed`, the resolved relationship target, the counting scope, and whether the index is 0-based or 1-based.
- **Do not convert a PNG width into a CSS viewport**, including by assuming device pixel ratio.
- Distinguish `media opened`, `original image legible`, `rendered document legible`, `supports a claim`, and `criterion satisfied`.
- Visible pixels can establish visible pixels, not runtime execution, database values, device identity, or criterion completion.
- Copy requested visible text faithfully; if an element partly covers a row, state that limitation rather than guessing hidden marks.

## Inputs and output

**Inputs:** asset path or source URL, intended use, source/provenance, requested change, destination medium, visual constraints, and whether the task is read-only or authoring.

**Output:** inspected visual facts or a verified visual artifact with dimensions, format, aspect ratio, provenance, transformation details, evidence status, and any unsupported check.

## Method

1. **Inspect the actual asset.** Read pixels, vector markup, layers, metadata, dimensions, aspect ratio, color space, text, and relationship data appropriate to the file type.
2. **Choose the authorized pathway.**
   - For a requested existing illustration, locate and display the actual image with a direct HTTPS URL that returns image bytes; do not substitute a drawing or generated image.
   - For a requested or explicitly approved diagram, create or edit SVG, Mermaid, or another declared visual representation.
   - For a raster change, crop, resize, or optimize while preserving the intended aspect ratio.
   - For a layered asset, modify layers only when explicit layered capabilities exist.
3. **Preserve provenance and meaning.** Record whether the asset is external, original explanatory, adapted, user-project evidence, or an authorized illustration. Keep a generated or original diagram labeled as such.
4. **Verify the result.** Reopen the target and use `verifying-artifacts`; check format, dimensions, clipping, distortion, readability, and rendering where available.
5. **Return to the calling task.** Asset preparation does not authorize an outline, draft, or deck unless that operation is already authorized.

## Fidelity rules

- **Vector preservation:** do not unintentionally rasterize vector graphics. Keep SVG geometry, viewBox, paths, and editable text where required.
- **Layered limitation:** without `inspect_layered_image(file)` and `edit_layered_image(file, ...)`, report the layered-edit limitation. A flattened export is not an editable layered change.
- **Aspect ratio and resolution:** preserve proportions and select resolution appropriate to the requested print or screen use. Do not infer real-world size or device viewport from pixels.
- **Visual QA:** a file write or script result is not visual proof. Render the actual result when a renderer is available; otherwise mark rendered appearance unverified.

For source selection, attribution, previews, and Word placement, use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md). The shared contract governs whether a visual is required, requested, blocked, or not needed; do not create a decorative asset just because a section exists.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `inspect_image(file)` and `edit_image(file, ...)` — raster inspection and edits.
- `inspect_layered_image(file)` and `edit_layered_image(file, ...)` — layered files when supported.
- `render_image(file)` — rendered visual inspection.
- `verify_artifact(file)` — visual-file integrity.
- `read_file(path)` and `write_file(path, content)` — SVG, Mermaid, and text visual sources.

## Completion and fallback

A changed visual is complete only after reopening and verifying the target through `verifying-artifacts`. If native image manipulation is unavailable, provide a supported declarative SVG or Mermaid diagram only when drawing is authorized. If layered editing is unavailable, provide a flattened preview or another supported alternative and state that the original layer structure was not edited.

## Common mistakes

- Rasterizing editable vectors without an explicit reason.
- Stretching images or diagrams to fit a space.
- Claiming a layered file changed when only a flattened preview was exported.
- Treating a screenshot as proof of runtime behavior or a PNG width as a CSS viewport.
- Claiming a visual check from a successful command without reopening or rendering the asset.
