# PI-Desktop capability mapping

Target for native prompt lifecycle and checklist bridge: PI-Desktop 0.16.0 on
Windows, inspected read-only on 2026-10-03. Earlier tool/UI observations below
retain their original version and date.

The skill pack names conceptual operations. They are not executable tool names.

| Concept | Host mapping |
|---|---|
| `invoke_skill(name)` | Native `Skill` tool, argument `id` set to `local.workspace-superpowers/<name>`. You MUST make an actual call at every stage transition, including approved follow-up turns. Reuse is limited to the current stage; an earlier stage's load does not replace the next required call. |
| Workspace turn entry | Call `Skill` with `id: "local.workspace-superpowers/using-workspace-superpowers"` on each Workspace turn before artifact work, including approvals, new files and resumption. Reassess selection at operation changes within a turn. Simple Q&A stays direct; Coding uses its own router. |
| Read/list/search | Use the currently exposed Read, Glob, Grep, or bounded shell tools. Resolve package-relative references from the originating instruction file. |
| Write/edit | Use current Write/Edit or shell tools only within the user's authorized artifact scope. |
| `delegate(role, context)` | If the current catalog exposes Task/subagents, inspect its schema and use a supported agent type with the bundled `agents/<role>.md` as task instructions. Bundled role files are not automatically registered agent types. Otherwise perform a separate review pass and disclose the absence of independent review. |
| Render/export/inspect Office and PDF | Discover the current Office/PDF libraries, tools, or connectors before promising an output. Reopen exported artifacts. For DOCX inspect native tables, image relationships/media, inline drawings, captions and placement when supported. Skill installation supplies no renderer or Office application; do not hard-code capability or treat XML checks alone as native host acceptance. |
| Research/citations | Use an available search or retrieval tool when authorized by the request. Preserve source metadata and verification status. |
| Guided questions / gate decisions | Ask naturally in chat for analysis/outline approval. Use native `asktool` for upfront evidence clarification, a requested card or a distinct branching choice; inspect `questions` with `question`, string `options`, and optional `multiSelect`. Offer one decision at a time. Follow [guided questions](../../references/guided-questions.md) and the mapping below. |
| Mathematics | Follow the portable mathematics contracts; use a separately available computation or native Word Equation engine. The historical probes in the repository do not establish capability in a new session. |

Plugin loading contributes a bounded catalog (up to 32 skills, 128 KiB per skill,
240 characters per description). Full bodies load on demand. The plugin does not
automatically execute its packaged `AGENTS.md` or register the role files.
The native agent extension declared in `contributes.agentExtensions` handles
`before_agent_start` in the agent runtime and returns the thin bootstrap with the
actual package root. It does not invoke `Skill` or inspect model traces. Plugin-
process `pi.events.on` handlers cannot inject prompts: their returns are ignored.
The runtime refreshes only its own managed block before each turn, including after
compaction; existing project instructions remain intact. Without native extension
permission, use the supplied bootstrap in the project's effective instructions.

## Persistent work plans

The bootstrap routes first Workspace turns and continuations to plan discovery
under [work tracking](../../references/work-tracking.md). This is an instruction
path, not automatic plan discovery by the lifecycle hook. The hook reads only
its own bundled bootstrap; no project files are read on merely opening a tab.
Effective bootstrap instructions and same-file access are required.
Resolve adopted paths from the plan location and reuse available host read/write
tools; users consent and review through chat rather than editing metadata.

The development `project-survey.mjs` utility produces a raw inventory context and
replaces its target. It may be used only against a disposable test fixture or a
source-project path explicitly authorized for that exact write. Do not use that
whole-file writer to create a new context path by assumption or refresh an
adopted context with identity or curated notes; use the reader/analyzer/editor
handoff to preserve the designated record. The work plan references the exact
`context_file` path. Normal survey authority is read-only and does not grant
repository writes.

Word/PDF extraction must use an actually available reader/converter/OCR engine.
Markdown extraction, if useful, remains derived and carries source-page/table
locators and unread regions. Package installation supplies no extraction engine.

For a missing preview or project screenshot, use ordinary chat to request a
supported attachment/path or pasted input; a text question card cannot receive a
file unless its schema explicitly supports attachments. If display, embedding,
inspection or rendering is unavailable, report a limited handoff/unverified check;
do not bypass host restrictions through downloads or alternate tools.

Apply [visual assets and Word fidelity](../../references/visual-assets-and-word-fidelity.md)
to supported DOCX operations. Preserve the requested revision, its approval status and authoritative
template/rubric formatting; do not substitute universal font or caption defaults.

Every generated skill has an explicit contribution ID. Relying on the basename
of `skills/<name>/SKILL.md` would produce the same `skill` ID for every entry on
the inspected host. The generated adapter note is not written back to portable
source skills.

The declared permissions are `agent.prompt.inject` and `agent.extension`.
PI-Desktop owns all grants; declaring them in an archive does not grant them.

## Built-in checklist (corrected 0.1.7-beta build)

The model uses PI-Desktop's existing `TodoWrite` capability for activated
multi-stage checklists. The host executes the tool and displays its checklist
in chat. The bootstrap extension only refreshes its managed system-prompt block;
it registers no `tool_call` hook and leaves TodoWrite unblocked, even if an old
plugin checklist tool is present in a catalog. The plugin-process entry does
not register a checklist tool, show command, panel or callback.

Read [the checklist runtime](checklist-runtime.md) for the actual TodoWrite
schema and portable-state mapping. `native-checklist.cjs` is a pure argument
mapper, with no host calls or state store. Portable identities, dependencies,
approvals, blocker evidence and request history stay in retained conversation
context. The tool receives only content, supported status and optional priority.
Waiting, blocked and paused rows have explicit content prefixes and remain
unfinished; cancellation never counts as completion. Reopening invalidates
affected results and dependent verification. Pause/resume does not clear gates.

TodoWrite replaces the selected full list. It supplies no plugin lifecycle,
readback or show/hide API. Hiding suppresses routine progress publication; it
cannot promise to close a host card. Recovery reuses only evidence-supported
retained state, with minimum user confirmation when needed. No internal
`tools.execute` call, session SDK read or database write is used.

The old 0.1.7-beta bridge/panel sources and tests remain in the repository as
historical implementation evidence, but are not imported by the default entry
or included in the replacement archive. Its five-permission panel probe is
historical and does not validate the built-in checklist path. The replacement
requests only the two bootstrap/catalog permissions.
The original panel archive and corrected archive both say `0.1.7-beta`, at the
user's request. Distinguish them by archive directory/hash and manifest shape,
not the version label alone. The corrected archive has no UI contribution.

When TodoWrite is available, do not print a competing routine Markdown task
list. If it is unavailable or fails, report the limit and use the portable
Markdown fallback without claiming native UI. Local regression and archive
checks do not prove a live model call, visible rows or native lifecycle acceptance.

## PI-Desktop 0.16.0 native checklist source evidence

A read-only inspection of the installed runtime found the following narrow
native surface. It is recorded here so the adapter can use the host tool when
available; it is not live SCL acceptance and does not admit PI-Desktop to Phase
4.

- Installed executable: `C:\Users\CHI NGUYEN\AppData\Local\Programs\PI-Desktop\PI-Desktop.exe`, file version `0.16.0`, product version `0.16.0.0`.
- Installed sidecar: `resources/agent-runtime/sidecar.js`, SHA-256 `1BB83AFC0059F8BDB167F0DC6DD9D3C9AB5916848D7A564558B858E5BF96BB47`.
- `TodoWrite` is included in the agent-mode built-in tool catalog. Its source
  schema accepts `todos[]`, with `content`, `status` in
  `pending|in_progress|completed|cancelled`, optional priority in
  `high|medium|low`, and a maximum of 50 items.
- The host description states that each call replaces the full display-order
  list, allows only one `in_progress` item, and truncates content longer than
  500 Unicode characters with a warning.
- The sidecar routes tool execution through its host-owned
  `tools.execute` call with `sessionId`, `turnId`, and `toolCallId`. The
  extension must not call that internal route. The pure mapper is
  packaged for contract testing and documentation; the
  model's host-owned call is not programmatically intercepted by the extension.
- The sidecar exposes `session_before_compact`, `session_compact`, and related
  lifecycle event names. Their presence does not prove checklist state
  restoration, renderer ownership, action callbacks, or request scoping.

On 2026-10-04 a fresh read-only inspection found installed PI-Desktop `0.16.1`
(product version `0.16.1.0`). Its `sidecar.js` SHA-256 was
`77719B37F27130F871C5C0C6148D2D1C74E87BF109FD079DC6CFE9061240959F`.
The schema definition `Ei` and description `xi` on line 7 preserve the exact
TodoWrite shape and limits above; the agent catalog still includes TodoWrite.
This was source inspection only, without application/configuration changes or
interaction with the running UI.

These source observations support using the **built-in checklist path** in the
PI adapter. They do not prove a live model invocation, visible checklist
rows/counts, granted permissions or any live SCL acceptance. A fresh-chat smoke
check against the installed replacement is still needed.

## Question UI capability boundary

The question-card UI evidence below comes from an installed PI-Desktop 0.15.1
runtime inspected on 2026-09-21. It is legacy UI evidence, not the 0.15.9
native prompt-lifecycle contract above:
`agent-runtime/sidecar.js` defines `ASK_TOOL_NAME = "asktool"`, registers it as
a core conversation tool, and emits `asktool_request`. The desktop renderer
displays the **A few questions** card, selectable options, **Enter another answer**,
**Skip**, **Decline all**, and **Submit answers**. This is the host's native UI;
the skill pack does not need to register a new tool or request new permissions.
`AskUserQuestion` also occurs in a provider compatibility name list, but it is
not the native name declared by this Pi runtime. Do not call that alias by guess.

Use ordinary chat for routine interviews and gate decisions. Availability of
`asktool` alone is not a reason to interrupt reading with a card. A complex
clarification may warrant a card; analysis/outline approval cards require an
explicit user request and host permission. Follow [visible delivery and recovery](../../references/guided-questions.md):
display the complete proposal in chat before an approval card. If the host cannot
display that text before the card, end with the proposal and review question in
chat. Merely writing options does not open the card. Keep one decision per call.
An evidence-card preference does not request approval cards. If the user reports
unseen content, redisplay it in chat and keep approval pending, without another
approval card. Internal labels such as "Stop 2" belong in neither question nor option text.
For missing required project metrics, use a focused structured question card before presenting
the completed analysis: offer “I have real data to provide” and “I authorize
illustrative assumptions for the missing budget, timeline and scale”, naming only
the actual gaps. Proposed values must be optional and hypothetical. Wait for an
explicit answer; a suggested/default choice does not grant permission. Use chat
fallback when the tool is unavailable or disallowed, without bypassing the wait.
The runtime supports up to 20 questions, requires nonempty question text and at
least one string option, and deduplicates options. Use two or three useful
choices; omit an “Other” option because the card already supplies free text.

The inspected `asktool` schema has no back parameter. The card has no Back control. This is a host gap. Do not invent a Back button or claim one was added. After the card returns, summarize the selections and ask the user to confirm or correct them in chat. A card selection is not locked until the user confirms that summary.
Use `multiSelect: false` for mutually exclusive approval decisions. Questions
may follow the conversation language; these examples use English for clarity.

If the user explicitly requests an approval card, after displaying P1 analysis v1 call
`asktool` with:

```json
{
  "questions": [{
    "question": "Do you approve P1 analysis v1 so I can prepare its detailed outline?",
    "options": ["Approve analysis; prepare outline", "Revise analysis"],
    "multiSelect": false
  }]
}
```

Only after that approval and displaying P1 outline v1, the corresponding
optional card is:

```json
{
  "questions": [{
    "question": "Do you approve P1 outline v1 so I can write the requested P1 content?",
    "options": ["Approve outline; write P1", "Revise outline"],
    "multiSelect": false
  }]
}
```

These are separate calls around separate displayed proposals, not two questions
in one batch. For outline-only work, approval must not silently authorize prose.
Inspect the returned answer, including free text: `details.answers` contains an
array per answered question and `null` for skipped questions. Text output renders
unanswered questions with an empty answer. **Skip and Decline all are not approval.**
Neither empty arrays, cancellation, tool errors nor default selections approve
anything. Keep the existing decision pending and stop dependent work. If a newer
host exposes a different schema, inspect that schema before adapting. If the tool
is genuinely unavailable/disallowed, report that limit and use chat choices.

The user supplied a screenshot of this UI; source inspection establishes the
mapping. No new live Pi call was executed from this Codex session. Record actual
invocation/submission in the [criterion trial](criterion-trial.md) before claiming
the packaged workflow displayed or processed the UI in a fresh Pi session.

## Revision-aware DOCX adapter boundary

The packaged helper `revision-export-route.cjs` preserves the exact requested
revision ID and its working/approved status across revision resolution, export and
verification. An adapter must return both identity fields from export and from
verification; missing or changed values fail instead of falling back to another
revision. The helper does not implement DOCX conversion or prove a native host run.
R23 and VE cases remain pending until their separate native evidence is recorded.
