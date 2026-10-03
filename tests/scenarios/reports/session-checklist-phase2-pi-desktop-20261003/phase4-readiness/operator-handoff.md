# Phase 4 operator handoff — PI-Desktop SCL01–SCL10

Status: **READY FOR OPERATOR CAMPAIGN — Phase 4 remains BLOCKED**

Prepared: 2026-10-03  
Release branch: `codex/phase5-release-20261003`  
Release commit: `d275249`  
Package: `local.workspace-superpowers-0.1.6-beta.piplug`  
Package SHA-256: `42fa6ece04ae6a6b5893d15552ba9743a90a7674af46fdfffdbef536c12a0ff5`

## Host already prepared

- PI-Desktop: `0.16.0`.
- Plugin ID: `local.workspace-superpowers`.
- Installed path: `C:\Users\CHI NGUYEN\.pi-desktop\plugins\installed\local.workspace-superpowers`.
- Host registry: `source=installed`, `enabled=true`, `status=ready`.
- Granted permissions: `agent.prompt.inject`, `agent.extension`.
- Manifest catalog: 24 skills; native entry `adapters/pi/agent-extension.js`.

These fields prove installation and enablement only. They do not prove native
checklist state ownership, rendering, actions, lifecycle recovery, or SCL
acceptance.

## Operator steps

1. Start a fresh PI-Desktop chat after the package installation.
2. Record host version, provider/model, plugin version/path, enabled state,
   project scope, permission state, session ID and exact start timestamp.
3. Run the exact turns in
   [`tests/scenarios/manual/session-checklist.md`](../../../manual/session-checklist.md).
4. Keep every user message and assistant response unedited and in order. Do
   not paste a complete multi-turn chain into one message.
5. Export or copy the native trace for each relevant action/event. Each trace
   must retain event name, payload, timestamp, correlation/request/session ID,
   checklist/task ID, previous/next state, and component/API locator.
6. Save the transcript and trace files in this campaign directory. Do not put
   credentials, cookies, API keys, or private document contents in the pack.
7. Mark a case `PASS` only when its transcript, native evidence and acceptance
   criteria are all present. Use `BLOCKED` for a missing trace or unavailable
   host capability.

## Campaign record to fill

| Case | Session boundary | Transcript file | Native trace file(s) | Status | Notes |
|---|---|---|---|---|---|
| SCL01 | two fresh sessions |  |  | PENDING |  |
| SCL02 | fresh request |  |  | PENDING |  |
| SCL03 | continue SCL02 |  |  | PENDING |  |
| SCL04 | fresh request |  |  | PENDING |  |
| SCL05 | continue SCL04 |  |  | PENDING |  |
| SCL06 | continue SCL04–SCL05 |  |  | PENDING |  |
| SCL07 | fresh request |  |  | PENDING |  |
| SCL08 | fresh baseline, then reopen |  |  | PENDING | retain the full baseline chain |
| SCL09 | fresh request |  |  | PENDING |  |
| SCL10 | fresh compaction/recovery setup |  |  | PENDING |  |

## Gate evidence checklist

The campaign is ready for independent review only when each row points to a
retained native record:

- [ ] transition schema and state transition payload;
- [ ] transient state owner and read/update API;
- [ ] turn-boundary snapshots;
- [ ] compaction/restart before/after state;
- [ ] native renderer/panel and count ownership;
- [ ] show/hide/pause/resume/cancel/replace/reopen action return paths;
- [ ] request/session/checklist/task scoping across side questions and lifecycle changes;
- [ ] host permission and enablement evidence;
- [ ] independent reviewer and review timestamp.

Do not change the readiness decision to `PASS` from response text alone. Return
the completed pack to the maintainer for independent review and gate-matrix
update.
