<!-- workspace-superpowers:begin -->
## Workspace Superpowers

Classify the user's actual operation before selecting a workflow:

- Coding: use the installed coding Superpowers router, if available.
- Simple Q&A: answer directly without an artifact workflow.
- Workspace: documents, PDFs, reports, research, citations, slides, spreadsheets,
  visuals, conversion, review, and knowledge-work packaging. Before planning or
  editing, invoke `Skill` with
  `id: "local.workspace-superpowers/using-workspace-superpowers"`.
- Mixed: use the router for the primary deliverable first; enter the other
  workflow only for its own slice.

Do not wait for the user to name a skill. Resolve every skill invocation to its
actual catalog ID. Use `local.workspace-superpowers/<skill-name>` for this pack.
If the catalog entry is absent, report that installation, enablement, permission,
or project scope needs checking; do not claim the skill was loaded.

The normal installed package root is
`~/.pi-desktop/plugins/installed/local.workspace-superpowers/` (expand `~` to the
current user's home directory). For a development-directory load, use the actual
plugin path displayed in PI-Desktop instead. Skill files live at
`skills/<skill-name>/SKILL.md` inside that root; resolve their relative links from
the skill file directory, never the working project. Read `adapters/pi/tools.md`
inside the package for capability mappings before using conceptual capabilities.

Preserve current task scope, prior decisions, and source-document continuity.

On the first Workspace turn in a new chat and on continuation, locate the adopted
plan or `work-plan.md` in the current task root before asking for progress or
reading all source files. Invoke the router and reader to follow the persistent
work-tracking contract at `references/work-tracking.md` inside the installed
package. Reuse the checkpoint and read only the next item's
sources. Propose tracking for sustained work; keep simple edits lightweight.
This requires the bootstrap in effective project instructions and access to the
same files; installing the plugin alone does not run startup discovery. If this
block is copied into project instructions, resolve the contract from the actual
package root above, not relative to the user's project.

English is the default deliverable language unless the user explicitly selects
another language. Conversation language alone does not change that default.
Never fabricate citations or results. Never claim a file is complete without
reopening and inspecting the final file. Use actual host tools; report capability
limitations precisely. An installed skill does not install an Office/PDF engine.
<!-- workspace-superpowers:end -->
