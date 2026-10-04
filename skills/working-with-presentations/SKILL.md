---
name: working-with-presentations
description: Use when creating, inspecting, modifying, styling, or preparing slide decks and presentation artifacts while maintaining fixed slide geometry, typography, and speaker notes separation.
---

# Working with Presentations

## Job

Create, edit, inspect, and verify presentation decks while preserving readable fixed canvas geometry, consistent visual hierarchy, and a clear separation between slide content and speaker notes.

Use [workflow continuity](../../references/workflow-continuity.md) to retain the current storyboard, evidence limits, theme, target slide range, and deck revision. A request for slide advice or source inspection does not authorize construction or editing.

## Inputs and output

**Inputs:** deck or storyboard, source evidence, target audience and duration, theme or template, slide range, speaker-note needs, and output format.

**Output:** an inspected or changed deck with slide-level content and layout decisions, speaker notes, asset provenance, review results, and verification evidence.

## Non-negotiable presentation rules

- **Fixed canvas geometry:** preserve the deck’s selected fixed aspect ratio and keep all objects inside the slide bounds.
- **Readable text:** do not solve overflow by shrinking text below practical legibility; simplify the slide or move explanatory detail to speaker notes.
- **Speaker notes separation:** slides carry the takeaway, selected evidence, and visual structure. Detailed narration, delivery cues, and background explanations belong in speaker notes.
- **Consistent theme:** use or preserve compatible fonts, colors, spacing, layouts, and masters across the deck.
- **Asset fidelity:** charts, diagrams, and images retain their aspect ratio and remain legible without clipping or unintended rasterization.

## Method

1. **Inspect or plan first.** For an existing deck, use `reading-artifacts` and `analyzing-artifacts` to inspect slides, layouts, themes, notes, placeholders, and assets. For a new deck, begin with `storyboarding-slides` or `planning-work`.
2. **Set the visual system.** Establish slide dimensions, master layouts, type hierarchy, color palette, and spacing from the existing deck or approved template.
3. **Build slide purpose before decoration.** Give each slide a clear action headline, one central takeaway, supporting evidence, and a deliberate layout. Keep dense explanation in notes.
4. **Integrate evidence-aware visuals.** Use `working-with-visuals` for diagrams and assets and `working-with-spreadsheets` for data charts. Do not imply a measured result without data.
5. **Review substantial decks.** Route substantial decks through `reviewing-work` for narrative, coherence, visual hierarchy, and legibility.
6. **Verify the final deck.** Use `verifying-artifacts` to reopen the current deck, check slide count, notes, asset presence, text overflow, and rendered slides where available.

## Specialist routing

| Need | Route |
|---|---|
| Slide-by-slide narrative, action headlines, or deck flow | `storyboarding-slides` |
| Standalone diagrams, visual assets, vectors, or image editing | `working-with-visuals` |
| Spreadsheet chart creation or data cleanup | `working-with-spreadsheets` |
| PDF or image export | `converting-artifacts` |

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `inspect_presentation(file)` — slides, layouts, themes, notes, and assets.
- `edit_presentation(file, ...)` — slides, text, shapes, themes, and notes.
- `render_presentation(file)` — rendered slide inspection when available.
- `verify_artifact(file)` — deck integrity and count checks.
- `read_file(path)` and `write_file(path, content)` — text-based fallback.

## Completion and fallback

A changed deck is complete only after `verifying-artifacts` reopens it and checks the requested slides. If native deck editing is unavailable, produce a slide-by-slide specification with layout, content, visual intent, and speaker notes; do not claim that a PPTX was created or edited.

## Common mistakes

- Putting a script or a full paragraph on the slide instead of in speaker notes.
- Allowing text overflow, overlap, or unreadable fonts.
- Mixing unrelated themes, colors, or layouts across slides.
- Distorting a chart or image to fit a placeholder.
- Treating a successful export as proof of slide-level visual quality.
