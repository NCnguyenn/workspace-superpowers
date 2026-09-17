---
name: working-with-presentations
description: Use when creating, inspecting, modifying, styling, or preparing slide decks and presentation artifacts while maintaining fixed slide geometry, typography, and speaker notes separation.
---

# Working with Presentations

Author, inspect, structure, style, and verify presentation slide decks across supported presentation formats (PPTX, PPT, ODP, Markdown slide decks).

## When to use

Creating new slide decks from a brief or storyboard, editing existing slides, adjusting slide layout and placeholders, standardizing master slide themes and color palettes, organizing speaker notes, and verifying presentation artifacts.

## When not to use

* Slide-by-slide narrative planning, initial message architecture, or storyboard authoring before slide construction (belongs to `storyboarding-slides`).
* Standalone data analysis, formula calculations, or complex table crunching (belongs to `working-with-spreadsheets`).
* Creating or editing standalone image and vector assets (belongs to `working-with-visuals`).
* Converting or exporting slide decks to PDF or image sequences (belongs to `converting-artifacts`).

## Presentation invariants (§10, §14)

* **Fixed canvas geometry & no text overflow:** Slides have fixed aspect ratio (standard 16:9 or 4:3). Text and visual elements must fit cleanly within placeholders. Never allow text to overflow slide boundaries or shrink fonts below readable legibility (minimum 14–18pt for body, 24–36pt for titles).
* **Separation of slide content vs speaker notes:** Slides convey the core takeaway, supporting evidence, and visuals. Detailed narration, delivery cues, and background explanations belong in speaker notes, not crowded onto the slide canvas.
* **Consistent master theme:** Preserve or apply consistent typography (title and body fonts), color palette (primary, secondary, accent), and spacing across all slides in the deck.
* **Asset integrity:** Embedded charts, diagrams, and images must maintain their aspect ratios and render clearly without distortion, clipping, or unintended rasterization.

## Specialists

The presentation family coordinates with specialists for planning, asset creation, and conversion:

| Trigger | Route to |
|---|---|
| Slide-by-slide narrative planning, headline drafting, or storyboarding | `storyboarding-slides` |
| Standalone diagram generation, vector graphics, or visual asset creation | `working-with-visuals` |
| Exporting or converting presentation deck to PDF or other formats | `converting-artifacts` |

## Procedure

1. **Inspect or plan:** For an existing deck, invoke `reading-artifacts` and `analyzing-artifacts` (inspect slide count, layouts, placeholders, theme, notes via `inspect_presentation(file)`). For a new deck, start with a storyboard from `storyboarding-slides` or `planning-work`.
2. **Apply slide structure & theme:** Set up slide dimensions, master layouts, consistent fonts, and color palette.
3. **Populate slide content:** Add action headlines, concise bullets, structured tables, or visual placeholders. Write comprehensive presenter scripts in speaker notes.
4. **Embed visual assets:** Integrate charts and diagrams using `working-with-visuals` or `working-with-spreadsheets`.
5. **Review presentation:** Invoke `reviewing-work` (focusing on visual hierarchy, legibility, and coherence) for substantial decks.
6. **Mandatory verification:** Reopen the deck using `verifying-artifacts`. Verify slide count, absence of text overflow, presence of assets, and render slides via `render_presentation(file)` where available.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

* `inspect_presentation(file)` — discover slide count, layouts, placeholders, themes, notes, and embedded assets.
* `edit_presentation(file, ...)` — create or modify slides, placeholders, text, themes, shapes, and notes.
* `render_presentation(file)` — render slide images for visual QA and layout verification.
* `verify_artifact(file)` — verify deck integrity, slide count, and file health.
* `read_file(path)` / `write_file(path, content)` — basic file operations when typed slide editing is unavailable.

## Dependencies

* `reading-artifacts`, `analyzing-artifacts` — required before editing existing decks.
* `storyboarding-slides` — recommended before generating multi-slide decks from scratch or transforming reports into slides.
* `reviewing-work` — required for substantial slide decks before verification.
* `verifying-artifacts` — mandatory after slide generation/editing and before claiming completion.

## Fallback

If native presentation editing tools (`edit_presentation`) are unavailable, produce a structured slide deck specification (slide-by-slide layout, headlines, bullet points, speaker notes) or generate a Markdown-based presentation format (e.g. Marp or Slidev syntax). Never claim a PPTX file was edited or generated if only text was produced.

## Common mistakes

* Cramming entire paragraphs onto slides instead of utilizing speaker notes.
* Allowing text boxes to overflow slide canvas margins or overlap other elements.
* Skipping slide verification and assuming a presentation tool succeeded merely because command exited 0.
* Mixing disparate fonts, colors, and layouts across slides without a unifying master theme.
* Distorting image aspect ratios when placing graphics into placeholders.
