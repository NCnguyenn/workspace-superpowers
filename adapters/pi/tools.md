# PI-Desktop capability mapping

Target inspected: PI-Desktop 0.15.1 on Windows, 2026-09-21.

The skill pack names conceptual operations. They are not executable tool names.

| Concept | Host mapping |
|---|---|
| `invoke_skill(name)` | Native `Skill` tool, argument `id` set to `local.workspace-superpowers/<name>`. You MUST make an actual call at every stage transition, including approved follow-up turns. Reuse is limited to the current stage; an earlier stage's load does not replace the next required call. |
| Workspace turn entry | Call `Skill` with `id: "local.workspace-superpowers/using-workspace-superpowers"` on each Workspace turn before artifact work, including approvals, new files and resumption. Reassess selection at operation changes within a turn. Simple Q&A stays direct; Coding uses its own router. |
| Read/list/search | Use the currently exposed Read, Glob, Grep, or bounded shell tools. Resolve package-relative references from the originating instruction file. |
| Write/edit | Use current Write/Edit or shell tools only within the user's authorized artifact scope. |
| `delegate(role, context)` | If the current catalog exposes Task/subagents, inspect its schema and use a supported agent type with the bundled `agents/<role>.md` as task instructions. Bundled role files are not automatically registered agent types. Otherwise perform a separate review pass and disclose the absence of independent review. |
| Render/export/inspect Office and PDF | Discover the current Office/PDF libraries, tools, or connectors before promising an output. Reopen exported artifacts. Skill installation supplies no renderer or Office application. |
| Research/citations | Use an available search or retrieval tool when authorized by the request. Preserve source metadata and verification status. |
| Guided questions / gate decisions | Ask naturally in chat for analysis/outline approval. Use native `asktool` for upfront evidence clarification, a requested card or a distinct branching choice; inspect `questions` with `question`, string `options`, and optional `multiSelect`. Offer one decision at a time. Follow [guided questions](../../references/guided-questions.md) and the mapping below. |
| Mathematics | Follow the portable mathematics contracts; use a separately available computation or native Word Equation engine. The historical probes in the repository do not establish capability in a new session. |

Plugin loading contributes a bounded catalog (up to 32 skills, 128 KiB per skill,
240 characters per description). Full bodies load on demand. The plugin does not
automatically execute its packaged `AGENTS.md` or register the role files.
The enabled `before_agent_start` hook reads the bundled bootstrap and refreshes
its routing and specialist-call blocks in the prompt. It does not itself invoke
`Skill` or inspect tool traces. When hooks are unavailable, use the supplied
bootstrap in the working project's instructions.

## Persistent work plans

The bootstrap routes first Workspace turns and continuations to plan discovery
under [work tracking](../../references/work-tracking.md). This is an instruction
path, not automatic plan discovery by the lifecycle hook. The hook reads only
its own bundled bootstrap; no project files are read on merely opening a tab.
Effective bootstrap instructions and same-file access are required.
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

## Question UI capability boundary

The installed PI-Desktop 0.15.1 runtime was inspected on 2026-09-21:
`agent-runtime/sidecar.js` defines `ASK_TOOL_NAME = "asktool"`, registers it as
a core conversation tool, and emits `asktool_request`. The desktop renderer
displays the **A few questions** card, selectable options, **Enter another answer**,
**Skip**, **Decline all**, and **Submit answers**. This is the host's native UI;
the skill pack does not need to register a new tool or request new permissions.
`AskUserQuestion` also occurs in a provider compatibility name list, but it is
not the native name declared by this Pi runtime. Do not call that alias by guess.

Use ordinary chat for routine interviews and gate decisions. Availability of
`asktool` alone is not a reason to interrupt reading with a card. When the user
requests that interface, or a complex choice warrants it and the bootstrap
permits it, show the proposal first and actually call the tool; merely writing
options into the response does not open the card. Keep one decision per call.
For missing required project metrics, use a focused structured question card before presenting
the completed analysis: offer “I have real data to provide” and “I authorize
illustrative assumptions for the missing budget, timeline and scale”, naming only
the actual gaps. Proposed values must be optional and hypothetical. Wait for an
explicit answer; a suggested/default choice does not grant permission. Use chat
fallback when the tool is unavailable or disallowed, without bypassing the wait.
The runtime supports up to 20 questions, requires nonempty question text and at
least one string option, and deduplicates options. Use two or three useful
choices; omit an “Other” option because the card already supplies free text.
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
