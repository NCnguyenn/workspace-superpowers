---
name: storyboarding-slides
description: Use when planning slide-by-slide narrative structure, formulating action headlines, sequencing presentation progression, or designing storyboard blueprints before deck authoring.
---

# Storyboarding Slides

## Job

Turn a brief, report, or evidence set into a slide-by-slide narrative blueprint before deck construction. A storyboard establishes the audience journey, action headlines, visual evidence, and speaker notes; it does not claim that a presentation file has been built.

Use [workflow continuity](../../references/workflow-continuity.md) to preserve source argument, terminology, scenario, evidence limits, and the requested stopping point. A storyboard-only request ends with the storyboard; its approval alone does not request deck authoring.

## Inputs and output

**Inputs:** source report or brief, audience, presentation purpose and duration, available evidence, required decisions, existing deck conventions, and known visual constraints.

**Output:** a slide blueprint with action headline, audience takeaway, content blocks, visual/data need, evidence source, speaker notes, and narrative relationship to surrounding slides.

## Method

1. **Read the source material.** Use `reading-artifacts` and `analyzing-artifacts` for source files; inspect pasted content directly. Extract only evidence actually available and preserve its limits.
2. **Define the audience decision.** State what the audience must understand, decide, or do by the end of the deck. Set slide count from the requested duration and purpose, not a generic template.
3. **Build a narrative arc.** Sequence context, problem or question, evidence and comparison, resolution, and next action. Keep each transition purposeful.
4. **Write an action headline for every slide.** An action headline states the slide’s takeaway, not merely its topic. Prefer “The pilot exposed the two highest-risk bottlenecks” over “Findings.”
5. **Specify each slide.** Include the core takeaway, concise body content, visual/data element, evidence locator or limitation, and speaker notes.
6. **Respect the boundary.** Deliver the requested storyboard and stop. If deck construction is already authorized, hand the approved storyboard to `working-with-presentations`.

## Blueprint

```markdown
### Slide 3 — The pilot exposed the two highest-risk bottlenecks
- **Purpose:** Explain why the decision is needed now.
- **Core takeaway:** The evidence identifies two issues that block the target outcome.
- **On-slide content:** One comparison visual and up to three supporting points.
- **Visual or data:** Named chart, table, diagram, or user-supplied screenshot with source status.
- **Speaker notes:** Method, evidence limits, transition to the next slide, and delivery cues.
```

## Practical rules

- Use **action headlines** and a deliberate **narrative arc** rather than topic labels.
- Keep bullets concise and reserve detailed explanation for speaker notes.
- Do not invent results, metrics, or visuals to fill a slide.
- Put a data-rich table or chart only where the slide’s takeaway depends on it.
- Use [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md) when an asset’s provenance, preview, or attribution matters.

## Required capabilities

Abstract capabilities are resolved by the host adapter.

- `read_file(path)` — source reports, briefs, and notes.
- `write_file(path, content)` — an authorized storyboard file.
- `inspect_document(file)` — source-document inspection.
- `inspect_presentation(file)` — existing deck inspection.

## Completion and fallback

A storyboard is complete when every slide has a purpose, action headline, evidence-aware content shape, visual decision, and speaker notes, with a coherent narrative progression. If file writing is unavailable or unnecessary, deliver the storyboard in chat. Hand approved deck construction to `working-with-presentations`.

## Common mistakes

- Using “Overview,” “Background,” or “Discussion” as action headlines.
- Turning every slide into a wall of text.
- Omitting speaker notes and forcing narration onto the slide canvas.
- Jumping into deck authoring before the narrative and visual evidence are settled.
