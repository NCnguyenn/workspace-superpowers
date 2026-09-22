---
name: storyboarding-slides
description: Use when planning slide-by-slide narrative structure, formulating action headlines, sequencing presentation progression, or designing storyboard blueprints before deck authoring.
---

# Storyboarding Slides

Design slide-by-slide blueprints, narrative arcs, and action headlines before presentation deck construction.

Apply the [workflow continuity contract](../../references/workflow-continuity.md).
Preserve the source report's argument, terms, scenario, and evidence limits while
adapting its presentation to slides. A storyboard-only request stops with the
storyboard; approving it alone does not request deck construction.

## When to use

Transforming complex reports, research documents, or briefs into structured presentation plans; defining narrative progression across slides; formulating assertive action headlines; establishing visual-verbal balance; and writing slide blueprints before generating or editing a slide deck.

## When not to use

* Constructing, styling, or formatting final presentation files (belongs to `working-with-presentations`).
* Drafting long-form written reports, theses, or prose essays (belongs to `planning-work` or `drafting-prose`).
* Generating standalone image or vector assets (belongs to `working-with-visuals`).

## Storyboard principles (§7.5, §10, §23)

* **Action headlines over topic labels:** Every slide must have an assertive takeaway headline that communicates the core conclusion of the slide (e.g. *"Q3 Operating Margin Rose to 24% Driven by Automation"* instead of *"Financial Results"* or *"Operating Margin"*).
* **Narrative progression:** Sequence slides in a deliberate dramatic arc:
  1. *Context & Hook:* Current state, urgency, problem statement.
  2. *Evidence & Analysis:* Supporting data points, key findings, strategic alternatives.
  3. *Resolution & Call to Action:* Proposed solution, decision required, milestones, and next steps.
* **Visual-verbal balance:** Limit slide bullets to 3–5 concise points. Designate slides for visual dominance (full-bleed chart, comparison diagram, architecture map) rather than walls of text.
* **Speaker notes drafting:** Every storyboard entry must include clear speaking points and background evidence to offload dense explanations from the slide canvas.

## Storyboard blueprint shape

A slide storyboard produces a structured specification for each slide:

```markdown
### Slide [Number]: [Action Headline]
* **Slide Category:** [Title | Context | Analysis | Comparison | Timeline | Conclusion]
* **Core Takeaway:** [One sentence summarizing what the audience must understand]
* **Key Bullets / Content:**
  - [Assertion 1]
  - [Assertion 2]
  - [Assertion 3]
* **Visual / Data Element:** [Chart type, diagram description, or screenshot mockup]
* **Speaker Notes:** [Presenter script, data context, and delivery cues]
```

## Procedure

1. **Analyze source material:** For source files, use `reading-artifacts` and `analyzing-artifacts` to extract key arguments, data points, and constraints. For text pasted in chat, inspect the supplied text directly; do not invent a file-read step or require an attachment. Preserve evidence limits in either case.
2. **Determine deck scope & length:** Align slide count with the intended presentation duration and audience format (e.g. 5-slide executive briefing vs 15-slide technical review).
3. **Draft the narrative arc:** Outline the progression from context to problem, evidence, and conclusion.
4. **Author slide blueprints:** Write assertive action headlines, select visual elements, and draft speaker notes for every slide.
5. **Respect the requested stopping point:** Deliver a requested storyboard and stop. If deck production is already authorized, pass the finalized storyboard, source locators, and retained constraints to `working-with-presentations` for assembly.

## Required capabilities

Abstract capability names from §11, resolved by the harness adapter. Never a tool name.

* `read_file(path)` — read source reports, briefs, and reference materials.
* `write_file(path, content)` — write the storyboard document.
* `inspect_document(file)` — inspect source text documents when adapting them into a presentation.
* `inspect_presentation(file)` — inspect existing presentation decks when restructuring narrative flow.

## Dependencies

* Follows `scoping-the-brief` or `planning-work` during the planning lifecycle stage.
* Precedes `working-with-presentations`.

## Fallback

If template tools or dedicated planning canvases are unavailable, produce a clean
Markdown storyboard following the blueprint above. Deliver it directly in chat
when that is the requested output; create a file only when authorized.

## Common mistakes

* Writing vague topic titles ("Overview", "Background", "Discussion") instead of assertive action headlines.
* Overcrowding slides with more than 5 bullets or writing entire paragraphs in slide body text.
* Failing to provide speaker notes, forcing presenter script onto the visual canvas.
* Jumping directly into deck authoring in PPTX without aligning on slide narrative and order first.
