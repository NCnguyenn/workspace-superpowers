# PI-Desktop Phase 4 native checklist bridge

Date: 2026-10-03. Candidate: `0.1.7-beta`, PI-Desktop `0.16.0`.

## Implementation

The previous package provided prompt instructions and a TodoWrite mapper. This
candidate adds the native tool
`plugin_local_workspace_superpowers_workspace_checklist`, the transient
session-scoped `ChecklistStore`, and a host-loaded Workspace Checklist panel.
The SDK supplies tool session/turn identity. `pluginBridge.invoke` returns panel
actions through binding/checklist/revision checks to the same state owner.

Show/hide affect visibility. Pause retains approval, blockers and the return point.
Cancel distinguishes completed from cancelled work. Replace archives the old
request and uses new IDs. Reopen invalidates affected completed work and live
dependents, retains unfinished gates and omitted tasks, and preserves unaffected
results. Explicit omission requires dependency rescoping and retains limitations.
Completed non-cancelled scope closes without counting omitted tasks as completed.
Status reclassification and reopening cannot bypass approval or evidence gates.

Mutations retain versioned `workspace.checklist.transition` records with timestamp,
correlation/session/turn/request/checklist IDs, source, payload and before/after
states. Tool transitions also use the native SDK log; the panel exports a bounded
trace and dropped-record count. The extension blocks competing TodoWrite calls
only when this native owner is in the actual catalog.

## Verification

- `npm.cmd test`: **267 passed**, zero failures.
- Bridge and extension subset: **36 passed**.
- Package tests: PI **6**, ChatGPT **2**, Antigravity **2** passed. The latter used
  its permitted installed CLI validator without installing anything.
- Final packed candidate through the installed SDK loader: **18 passed**, covering
  loading, invocation identity, panel callbacks, session isolation, SDK process
  restart and the native 8,000-character tool-context projection boundary.
- Independent code review found three Important gate/reopening defects and one
  Minor task-key defect. All were fixed with regression tests. The reviewer found
  no further Critical or Important defects; the final key normalization correction
  was subsequently verified by the 36-test bridge/extension run.

The probe `scripts/probe-pi-checklist-sdk.mjs` extracts the actual
`out/main/plugin-host-process.js` read-only from the pinned installed ASAR:
`17a2993bd28737edf74489ccb444d5ae403eb3b3c65ef10d6dd638ec0d3db2ef`.
Its embedding IPC peer is simulated. No live renderer, granted permission or
model-driven SCL acceptance is claimed by that probe.

## Package handoff

Archive: `dist/pi-phase4-0.1.7-beta/local.workspace-superpowers-0.1.7-beta.piplug`.
SHA-256: `fcdb93aa6060de474029a2d265e5059904889564dcf87ac2ef17806b9cf25d11`.
All 84 archive/unpacked file bytes and CRC were reopened and checked; 24 distinct
skills are packaged. Raw SDK probe records are in
`dist/pi-phase4-0.1.7-beta/native-sdk-probe.json`.

The operator chose to install the package themselves; no further desktop
screenshots or UI automation are authorized. Use the native Install package/update
action, review the five permissions (`agent.prompt.inject`, `agent.extension`,
`agent.tool.register`, `ui.panel`, `session.read`), enable it and begin a fresh chat.
Use host reinstallation if updating fails. Do not edit the registry or copy files
into the installed directory.

## Live acceptance boundary

The implementation, code review, local tests and package are ready. This run has
not installed or exercised this candidate in a live PI-Desktop session. Phase 4
live admission is pending; historical SCL responses are not retrospectively
marked PASS for this implementation.

Restart recovery accepts only exact, hash-validated same-session native tool
receipts and requires confirmation of possible later panel actions. The host's
8,000-character projection or compaction may remove usable receipts; missing
state never reconstructs completion. Cached visibility is not a fresh host-open
acknowledgement. No independent session database, credentials or network is used.

The old readiness pack describes the earlier prompt/mirror campaign. Its old
missing-owner/callback observations are addressed in this candidate's code; its
missing live evidence remains unavailable. Future acceptance must cite the
installed `0.1.7-beta` package and its actual traces.
