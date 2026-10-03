# PI-Desktop Phase 4 readiness evidence pack

Campaign: `session-checklist-phase2-pi-desktop-20261003/phase4-readiness`  
Prepared date: 2026-10-03  
Source revision (base): `a7ad6c8c19835f2b0bfc7010e9e48c23ecf70998`; adapter/evidence updates are uncommitted working-tree changes.  
Decision: **BLOCKED — PI-Desktop is not admitted to Phase 4.**

## Purpose and boundary

This is a readiness evidence pack plus a source-level implementation record. The
PI adapter now contains a conservative mirror path for the native `TodoWrite`
tool found in PI-Desktop 0.16.0. The pack still does not claim a complete
Session Checklist bridge, native renderer, callback path, persistence layer, or
Phase 4 admission. It does not modify the PI-Desktop registry, installed plugin
directory, permissions, enabled state, package path, or application
configuration.

The installed host was inspected read-only for binary identity and sidecar
source. The native UI, a live conversation, plugin installation state, and
permission grants were not inspected:

| Field | Observed value | Evidence limit |
|---|---|---|
| Host executable | `C:\Users\CHI NGUYEN\AppData\Local\Programs\PI-Desktop\PI-Desktop.exe` | File version only; no live UI/session acceptance. |
| Host version | File `0.16.0`; product `0.16.0.0` | Does not prove the campaign used this host instance. |
| Agent sidecar | `resources/agent-runtime/sidecar.js`; SHA-256 `1BB83AFC0059F8BDB167F0DC6DD9D3C9AB5916848D7A564558B858E5BF96BB47` | Source observation only; no runtime trace export. |
| `app.asar` | SHA-256 `17A2993BD28737EDF74489CCB444D5AE403EB3B3C65EF10D6DD638EC0D3DB2EF` | Identity anchor only. |
| Plugin | `local.workspace-superpowers` 0.1.6-beta (source manifest) | Installed identity, enabled state, scope, and permission grant not inspected. |
| Model/provider | Not retained | No exact campaign metadata is available. |
| Inspection timestamp | `2026-10-03T15:40:43.6693729+07:00` | Timestamp for read-only source inspection, not an SCL run. |

The source working tree is dirty and contains unrelated modifications and untracked files. This pack does not attribute them to the PI package or mutate them.

## Evidence classes

| Evidence class | Available material | What it does not prove |
|---|---|---|
| Structural / source | Package declarations, adapter source, manual campaign, Phase 3 matrix, historical 0.15.9 offline host contract, and the 0.16.0 sidecar inspection in [09-todowrite-source.md](native-trace/09-todowrite-source.md). | A live PI-Desktop 0.16.0 session, model tool call, renderer, action callback, checklist state owner, or permission grant. |
| Response-level | The current operator log summarizes supplied observations. `scl08-transcript.txt` retains a partial response-only record. | Plugin origin, hidden checklist state, Skill execution, native IDs, traces, renderer ownership, or callbacks. |
| Native execution | **UNAVAILABLE**. No raw live PI-Desktop event, tool-call payload, renderer, action, or permission trace is present. | Any of the eight Phase 4 gates. |
| Independent review | **UNAVAILABLE**. No reviewer distinct from the operator/run conductor reviewed retained native evidence. | PASS for any SCL case or Phase 4 admission. |

A visible checklist block, screenshot, Skill label, package declaration, registry entry, prompt-injection result, database row, or assistant self-report is not substituted for native execution evidence.

## Sources used without extending their claims

- [Manual SCL01–SCL10 campaign](../../../manual/session-checklist.md): exact scenario protocol and acceptance criteria.
- [Current PI-Desktop operator log](../operator-log.md): response-level observations and stated limitations. It is not a complete trace archive.
- [Partial SCL08 response transcript](../scl08-transcript.txt): retained response text only; it includes no host trace, complete setup, timestamp, host session ID, plugin identity, or independent review.
- [Phase 3 capability matrix](../../../../../docs/verification/session-checklist-phase3-capability-matrix.md): prior conclusion that Pi Desktop is not admitted to Phase 4.
- [PI-Desktop operator guide](../../../../../docs/verification/session-checklist-pi-desktop-operator-guide.md): required trace fields, acceptance boundary, and operator procedure.
- [PI adapter mapping](../../../../../adapters/pi/tools.md) and [installation notes](../../../../../adapters/pi/install.md): documented package boundaries, not live permissions or renderer evidence.
- [PI-Desktop 0.16.0 TodoWrite source observation](native-trace/09-todowrite-source.md): read-only installed executable/sidecar identity, native tool schema, agent-mode registration, host execution path, and lifecycle-name observations. It is source-only evidence, not a live trace.
- [PI-Desktop 0.15.9 host contract](../../../../../docs/verification/pi-desktop-0.15.9-host-contract.md): a historical offline prompt-bootstrap result with `hostBoundary: PASS` and `modelAcceptance: PENDING`; it is not a 0.16.0 native checklist trace.

## Implementation completed for the verified subset

The repository now contains a host-specific adapter path for the source-observed
native tool:

- `adapters/pi/bootstrap.md` instructs PI-Desktop to use `TodoWrite` only when
  it is exposed in the current agent catalog, to replace the full list on every
  update, and to preserve the portable Markdown state as canonical.
- `adapters/pi/native-checklist.cjs` validates the host's 50-item,
  500-Unicode-character, one-active-row limits and maps portable states. The
  mapping labels `awaiting_user`, `blocked`, and `paused` because the native
  schema has no equivalent statuses; it performs no host call and stores no
  state. The model's host-owned `TodoWrite` call remains outside the
  extension; the helper is a deterministic contract/testing boundary.
- `scripts/package-pi.py` includes the pure helper in the generated package.

This is an implementation completion for the **verified TodoWrite mirror
subset**. It is not completion of the native-host evidence gate. The host does
not expose enough retained evidence here to claim a native renderer, user-action
return path, checklist identity, compaction recovery, or permission grant.

## Verification performed for this update

- `npm.cmd test` — **240 passed, 0 failed**.
- `python scripts/test-package-pi.py` — **6 passed, 0 failed**.
- `node --test adapters/pi/native-checklist.test.mjs` — **5 passed, 0 failed**.
- `node --test adapters/pi/agent-extension.test.mjs` — **9 passed, 0 failed**.
- A fresh store-only package was built at
  `dist/pi-phase4-20261003-final/`; archive readback verified CRC, helper
  inclusion, and unpacked/archive byte equality. SHA-256:
  `42fa6ece04ae6a6b5893d15552ba9743a90a7674af46fdfffdbef536c12a0ff5`.
- The readiness-pack link audit checked 66 local Markdown links and found 0
  broken links.

These are repository/package checks. They do not replace the missing live
PI-Desktop trace or independent review.

## SCL01–SCL10 readiness status

All ten cases are `BLOCKED` for **Phase 4 readiness**. This does not erase the operator log’s response-level observations; it records that the required retained native evidence and independent review are absent.

| Case | Required session relationship | Phase 4 readiness status | Existing material | Blocking evidence |
|---|---|---|---|---|
| SCL01 | Two fresh sessions | `BLOCKED` | Operator-log response summary records a remediation rerun. | No exact retained two-session transcript, host identity/timestamps, plugin attribution, native trace, or independent review. |
| SCL02 | Same session as SCL03 | `BLOCKED` | Operator-log response summary reports a request-scoped checklist and status follow-up. | No exact prompts/responses, stable checklist/task IDs, state snapshots, renderer/component trace, or independent review. |
| SCL03 | Continue SCL02 session | `BLOCKED` | Operator-log response summary reports side question and hide/show behavior. | No action payload/return path, same-request state trace, host correlation ID, or independent review. |
| SCL04 | Same session as SCL05–SCL06 | `BLOCKED` | Operator-log response summary reports CPU blocker behavior and a remediation rerun. | No exact sequential transcript, state transition trace, host identity/package attribution, or independent review. |
| SCL05 | Continue SCL04 session | `BLOCKED` | Operator-log response summary reports explicit omission and review of supported findings. | No dependency/task-ID trace, current-task state snapshot, count derivation evidence, or independent review. |
| SCL06 | Continue SCL04–SCL05 session | `BLOCKED` | Operator-log response summary reports pause/resume behavior. | No lifecycle payload, prior-status preservation trace, session correlation, or independent review. |
| SCL07 | Fresh session | `BLOCKED` | Operator-log response summary reports replacement history and isolated slide counts. | No old/new checklist IDs, replacement event, renderer/action trace, complete transcript, or independent review. |
| SCL08 | Fresh session after a completed baseline | `BLOCKED` | Partial response-only transcript and operator-log baseline/artifact notes exist. | The retained transcript is not complete/setup-attributed and has no native lifecycle/task trace, host identity/timestamp, or independent review. |
| SCL09 | Fresh session | `BLOCKED` | Operator-log response summary reports completed/cancelled counts. | No exact transcript, cancellation payload, state ownership trace, host/package attribution, or independent review. |
| SCL10 | Fresh supported compaction/recovery session | `BLOCKED` | Operator-log response summary reports conservative recovery. | No supported compaction/restart trace, before/after state, loss record, session identity, or independent review. |

The per-case files [transcript-SCL01.md](transcript-SCL01.md) through [transcript-SCL10.md](transcript-SCL10.md) describe the missing exact record and the required future capture sequence. They do not invent a transcript from the summaries above.

## Eight native-host gates

Every required native gate is `BLOCKED`. See [gate-matrix.md](gate-matrix.md) and the separate [native-trace](native-trace/) UNAVAILABLE records.

| Gate | Status | Reason |
|---|---|---|
| Transition schema | `BLOCKED` | The 0.16.0 `TodoWrite` argument schema is source-observed, but no live checklist transition event, timestamp, or correlation record exists. |
| State owner | `BLOCKED` | The host tool catalog and host-owned execution route are source-observed, but no checklist state owner/read-update contract is identified. |
| Turn boundary | `BLOCKED` | Lifecycle names are source-observed, but no direct state snapshots exist after initial or follow-up turns. |
| Compaction/restart | `BLOCKED` | Compaction event names are source-observed, but no before/after restoration or intentional-loss trace exists. |
| Renderer | `BLOCKED` | A native tool surface is source-observed, but no panel/component trace proves checklist rendering/count ownership. |
| User action | `BLOCKED` | No payload/return path for show, hide, pause, resume, cancel, replace, or reopen. |
| Scoping | `BLOCKED` | `sessionId`/`turnId` occur in the host tool execution path, but no checklist IDs or correlated request evidence proves side-question preservation or lifecycle isolation. |
| Permissions | `BLOCKED` | No host UI/runtime proof that required permissions are granted and the plugin is enabled. |

## Independent review

[Independent review](independent-review.md) is `BLOCKED`. The current agent prepared this pack and therefore cannot act as the required independent reviewer. No separate reviewer has inspected exact retained transcripts and native traces.

## Precise remediation required before reassessment

A future PI-Desktop operator and independent reviewer must provide all of the following in a new or extended retained pack:

1. Exact unedited user prompts and assistant responses for every SCL turn, including the required fresh/same-session chain boundaries.
2. Host version, model/provider, installed plugin path/version, enabled state, project scope, permission-grant evidence, session/request identifiers, and exact timestamps, captured from PI-Desktop rather than inferred from source/package metadata.
3. Raw checklist-transition events with event name, payload schema, previous/next state, timestamp, and correlation ID.
4. A component/API record identifying the transient state owner and its read/update methods, with turn-boundary snapshots.
5. Before/after compaction or restart records, including an intentional-loss/recovery case and the relation to the active request.
6. Native renderer evidence identifying the panel/component that displays rows and counts, rather than a transcript or question card.
7. Native action records for show, hide, pause, resume, cancel, replace, and reopen, including their payloads and return paths into the same active request.
8. Request-scoping traces that cover side questions, replacement, cancellation, reopening, and continuation without merging checklist identity/history.
9. Review by someone who did not conduct the run, with a per-case/per-gate verdict against the exact retained evidence.

Until every item is directly evidenced and independently reviewed, the portable chat-managed Markdown fallback remains the only supported Session Checklist renderer and **Phase 4 remains BLOCKED**.
