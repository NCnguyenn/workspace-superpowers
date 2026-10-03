# PI-Desktop 0.16.0 TodoWrite source observation

Status: **SOURCE_ONLY — not a native execution trace**  
Captured: `2026-10-03T15:40:43.6693729+07:00`  
Capture mode: read-only inspection of the installed executable and agent sidecar; no host UI, session, plugin installation, registry, or configuration mutation.

## Artifact identity

| Artifact | Observed value |
|---|---|
| Executable | `C:\Users\CHI NGUYEN\AppData\Local\Programs\PI-Desktop\PI-Desktop.exe` |
| File version | `0.16.0` |
| Product version | `0.16.0.0` |
| Sidecar | `C:\Users\CHI NGUYEN\AppData\Local\Programs\PI-Desktop\resources\agent-runtime\sidecar.js` |
| Sidecar size | `246348` bytes |
| Sidecar SHA-256 | `1BB83AFC0059F8BDB167F0DC6DD9D3C9AB5916848D7A564558B858E5BF96BB47` |
| `app.asar` SHA-256 | `17A2993BD28737EDF74489CCB444D5AE403EB3B3C65EF10D6DD638EC0D3DB2EF` |

The values above came from PowerShell `Get-Item`, `Get-FileHash`, and
`[IO.File]::ReadAllText` against the installed paths. The source offsets below
are character offsets in that exact sidecar file; they are locators, not live
event timestamps.

## Observed native surface

### TodoWrite description and schema

At source character offset `20028`, the sidecar defines the `TodoWrite`
description and schema. The description says that the tool is for multi-step
work, every call replaces the full display-order list, only one item may be
`in_progress`, and content longer than 500 Unicode characters is truncated with
a host warning. The adjacent schema is equivalent to:

```text
{
  todos: Array(
    Object({
      content: String(minLength: 1),
      status: "pending" | "in_progress" | "completed" | "cancelled",
      priority?: "high" | "medium" | "low"
    }),
    { maxItems: 50 }
  )
}
```

This is direct source evidence for the native tool contract. It is not evidence
that the current plugin or a live model invoked the tool.

### Agent-mode registration

At source character offset `150035`, the agent-mode built-in tool list includes
`TodoWrite` alongside the core read/write tools. This establishes that the host
runtime can expose the tool to an agent-mode model in this installed build. It
does not establish that a particular session received the tool, selected it, or
submitted valid arguments.

### Host-owned execution path

At source character offset `146621`, tool execution calls the host-owned
`tools.execute` route with `sessionId`, `turnId`, `toolCallId`, `toolName`, and
arguments. The extension therefore does not register a wrapper or call this
internal route. The adapter's `native-checklist.cjs` helper is pure mapping and
validation code; it owns no state and performs no host call.

### Lifecycle and compaction names

The sidecar contains `session_before_compact`, `session_compact`,
`session_compact_failed`, `turn_start`, `turn_end`, `tool_execution_start`,
`tool_execution_end`, and related lifecycle names. A source context at offset
`202534` shows `session_before_compact` receiving a reason and retention mode,
followed by `session_compact` or `session_compact_failed`. These names show an
available lifecycle surface only. No checklist state snapshot or restoration
record was captured around a real compaction or restart.

### Agent instruction

At source character offset `94012`, the native agent prompt tells the model to
keep the session checklist current with `TodoWrite`, verify work before marking
items complete, keep at most one item in progress, and finish with all items
completed or cancelled. This explains the host's intended model usage but is
not a retained model response or tool-call trace.

## Adapter consequence

The PI adapter now documents and tests a conservative mirror path:

- use `TodoWrite` only when the tool is present in the current native catalog;
- send the complete list on every update because the host replaces the list;
- map the four native statuses directly and preserve portable
  `awaiting_user`/`blocked`/`paused` details in canonical Markdown with a
  labelled, lossy native mirror;
- keep the pure mapper's 50-item, 500-Unicode-character, and one-active-row
  validation aligned with the host schema; and
- fall back to the portable Markdown view when the tool or canonical state is
  unavailable.

The extension does not programmatically intercept the model's host-owned
`TodoWrite` call. It does not claim a native renderer, native checklist IDs, action
callbacks, a cross-turn state store, or permission grants. Those boundaries are
why the eight Phase 4 gates and SCL01–SCL10 remain `BLOCKED`.

## Evidence limits

This record does **not** prove:

1. a live PI-Desktop model invocation of `TodoWrite` or its exact payload;
2. a native panel/component rendering rows or counts;
3. show/hide/pause/resume/cancel/replace/reopen action payloads and return paths;
4. checklist/request identity or isolation across side questions and replacement;
5. state survival or intentional loss across compaction/restart; or
6. installed plugin identity, enabled state, project scope, or effective
   permission grants.

The record upgrades the implementation and source-inspection evidence only. It
does not upgrade any SCL result or native-host gate to `PASS`.
