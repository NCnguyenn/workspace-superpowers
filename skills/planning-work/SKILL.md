---
name: planning-work
description: Use when organizing and structuring a multi-stage, multi-artifact, or complex document task before drafting or execution.
---

# Planning Work

Construct an execution plan, structural outline, and deliverable contract for complex workspace projects.

## When to use

Multi-section, multi-stage, research-heavy, or multi-artifact projects (e.g. theses, comprehensive reports, multi-slide decks, mixed-format packages) before authoring or modifying content.

## When not to use

Trivial or single-step edits, mechanical corrections, or small tasks where an internal mental checklist suffices. Small tasks must not produce planning documents.

## Plan shapes

Select the plan shape that matches the deliverable:

| Deliverable | Plan shape | Output |
|---|---|---|
| Report / Essay | Section outline and argument progression | Outline document (`templates/outline.md`) |
| Thesis / Dissertation | Thesis architecture, chapter breakdown, and research plan | Comprehensive chapter plan |
| Presentation / Deck | Narrative arc and slide storyboard | Slide storyboard |
| Spreadsheet / Dataset | Data cleaning and formula architecture | Analysis plan |
| Mixed Project | Multi-artifact dependencies and sequencing | Multi-artifact plan and contract (`templates/deliverable-contract.md`) |

## Procedure

1. Review the working brief and findings from `reading-artifacts` / `analyzing-artifacts`.
2. Select the plan shape appropriate to the deliverable type.
3. Establish the structural outline:
   - Define sections, section purposes, and key points.
   - Map required evidence and citations to sections.
   - Set length targets or slide allocations.
4. Establish the deliverable contract:
   - Identify primary editable source artifacts (e.g. `.docx`, `.md`).
   - Identify rendered/exported artifacts (e.g. `.pdf`).
   - Identify supporting assets (e.g. `.bib`, figures, data tables).
   - Set format-specific integrity criteria.
5. Define execution checkpoints (e.g. drafting $\rightarrow$ reviewing $\rightarrow$ verifying).

## Required capabilities

Abstract capability names, resolved by the harness adapter. Never a tool name.

- `write_file(path, content)` — to generate the outline and deliverable contract when required.
- `delegate(role, context)` — optional; to dispatch execution or specialist roles if supported.

## Dependencies

- Follows `scoping-the-brief` (for complex briefs) or `analyzing-artifacts` (when starting from existing files).
- Precedes drafting, formatting, and subsequent `reviewing-work`.

## Fallback

If file generation for plans is restricted or the task is medium-sized, maintain the plan inline in execution state without writing intermediate plan files.

## Common mistakes

* Writing a full planning document for a simple typo or single-paragraph edit.
* Drafting multi-chapter documents without an agreed outline.
* Omitting the deliverable contract for multi-artifact deliverables.
* Over-complicating the plan with unnecessary subagent chains when a single orchestrator suffices.
