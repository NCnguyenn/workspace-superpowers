# PI-Desktop capability mapping

Target inspected: PI-Desktop 0.15.1 on Windows, 2026-09-21.

The skill pack names conceptual operations. They are not executable tool names.

| Concept | Host mapping |
|---|---|
| `invoke_skill(name)` | Native `Skill` tool, argument `id` set to `local.workspace-superpowers/<name>`. Reuse an already loaded applicable skill. |
| Read/list/search | Use the currently exposed Read, Glob, Grep, or bounded shell tools. Resolve package-relative references from the originating instruction file. |
| Write/edit | Use current Write/Edit or shell tools only within the user's authorized artifact scope. |
| `delegate(role, context)` | If the current catalog exposes Task/subagents, inspect its schema and use a supported agent type with the bundled `agents/<role>.md` as task instructions. Bundled role files are not automatically registered agent types. Otherwise perform a separate review pass and disclose the absence of independent review. |
| Render/export/inspect Office and PDF | Discover the current Office/PDF libraries, tools, or connectors before promising an output. Reopen exported artifacts. Skill installation supplies no renderer or Office application. |
| Research/citations | Use an available search or retrieval tool when authorized by the request. Preserve source metadata and verification status. |
| Mathematics | Follow the portable mathematics contracts; use a separately available computation or native Word Equation engine. The historical probes in the repository do not establish capability in a new session. |

Plugin loading contributes a bounded catalog (up to 32 skills, 128 KiB per skill,
240 characters per description). Full bodies load on demand. The plugin does not
automatically execute its packaged `AGENTS.md` or register the role files.
Use the supplied bootstrap in the working project's instructions.

## Persistent work plans

The bootstrap routes first Workspace turns and continuations to plan discovery
under [work tracking](../../references/work-tracking.md). This is an instruction
path, not a registered session-start hook. No background reads occur on merely
opening a tab. The effective project bootstrap and same-file access are required.
Resolve adopted paths from the plan location and reuse available host read/write
tools; users consent and review through chat rather than editing metadata.

The development `project-survey.mjs` utility produces a raw inventory context and
replaces its target. Do not use that whole-file writer to refresh an adopted
context with identity or curated notes; use the reader/analyzer/editor handoff
to preserve that record. The work plan references the designated context path.

Word/PDF extraction must use an actually available reader/converter/OCR engine.
Markdown extraction, if useful, remains derived and carries source-page/table
locators and unread regions. Package installation supplies no extraction engine.

Every generated skill has an explicit contribution ID. Relying on the basename
of `skills/<name>/SKILL.md` would produce the same `skill` ID for every entry on
the inspected host. The generated adapter note is not written back to portable
source skills.

The only declared plugin permission is `agent.prompt.inject`. PI-Desktop's
installer requires its own permission grant before the skills become available.
