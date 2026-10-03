# Session Checklist Phase 3 capability matrix

Date: 2026-10-02  
Scope: native-host discovery and design only  
Decision: **No host is admitted to Phase 4.**

## Scope and evidence boundary

The portable Session Checklist remains the chat-managed Markdown/plain-text fallback. It owns transient state in the retained conversation context and renders only at normal response boundaries. This Phase 3 record does not add a native panel, runtime event bridge, database, MCP write surface, checklist file, `progress.md`, or host-specific dependency to the portable contract.

The Phase 2 campaign remains blocked. The authoritative blocker is [`tests/scenarios/reports/session-checklist-phase2-20261002/blocker.md`](../../tests/scenarios/reports/session-checklist-phase2-20261002/blocker.md): the available hosts did not provide the retained sequential conversation, unedited responses, native traces, and independent review required for SCL01–SCL10. No Phase 2 case is promoted to `PASS` by this discovery record. Package validation, source inspection, static architecture tests, bootstrap injection, a controlled lifecycle hook, a question card, or a read-only MCP catalogue is not native Session Checklist acceptance.

### Evidence classifications

| Classification | Meaning in this record |
|---|---|
| `verified` | A narrow host or package boundary was directly exercised or retained in a source/command record. It does not imply checklist support. |
| `documented but unverified` | The repository or host documentation describes a mapping or surface, but no retained checklist-specific runtime evidence exercises it. |
| `unavailable` | The requested host capability or evidence path was not available in this environment, or the host explicitly exposes no such surface. |
| `unknown` | The available evidence is insufficient to determine the capability without guessing. |

These labels apply to each capability independently. A `verified` bootstrap or packaging boundary is not a `verified` event path, state owner, renderer, action-return path, or model acceptance result.

## Host capability matrix

| Host / adapter | Event mechanism for checklist transitions | Transient state owner and compaction/restart | Native display surface | User-action return path | Request scoping and lifecycle viability | Evidence quality and Phase 3 conclusion |
|---|---|---|---|---|---|---|
| **Pi Desktop** | `verified` only for the native extension's result-bearing `before_agent_start` prompt application. `session_compact` is notification-only. No checklist-specific transition event or stable transition payload is observed. Evidence: [`docs/verification/pi-desktop-0.15.9-host-contract.md`](pi-desktop-0.15.9-host-contract.md#L38-L44). | `documented but unverified` for bootstrap rebuilding after compaction: the host can reapply a managed prompt block on a later `before_agent_start`; this is not checklist state persistence. No owner or survival semantics for checklist state across restart are established. | `documented but unverified` for the legacy `asktool` question card only. It is not evidence of a progress/todo renderer. No native checklist panel is observed. Evidence: [`adapters/pi/tools.md`](../../adapters/pi/tools.md#L72-L105). | `unavailable` for a demonstrated checklist action payload returning to the active conversation. The question-card mapping has no evidence of checklist pause/resume/hide/cancel/reopen semantics. | `unknown`: bootstrapping preserves package/project scope, but no checklist identity, active-request binding, replacement isolation, or lifecycle continuation trace exists. | `verified` host boundary only; `modelAcceptance: PENDING` remains explicit in [`docs/verification/pi-desktop-0.15.9-host-contract.md`](pi-desktop-0.15.9-host-contract.md#L68-L87). **Phase 4: not admitted.** |
| **Pi CLI** | `verified` only for controlled registration of `resources_discover`, `session_start`, `session_compact`, and `before_agent_start` in [`adapters/pi-cli/lifecycle.mjs`](../../adapters/pi-cli/lifecycle.mjs#L9-L43). The test is an adapter boundary, not a live model or checklist event trace. | `verified` only for invalidating/rebuilding the bootstrap cache around controlled lifecycle hooks. `documented but unverified` for any checklist state owner or restart/compaction survival. | `unavailable` in the inspected adapter evidence: the CLI mapping renders through conversation text and exposes no verified native checklist panel. | `unknown`: no native checklist action schema or return-to-conversation trace is retained. | `unknown`: bootstrap paths are package-scoped, but request-scoped checklist IDs and replacement/cancellation/reopen behavior are not exposed. | `documented but unverified` for native installation, tool traces, and behavioral acceptance; the adapter README explicitly preserves those limits ([`adapters/pi-cli/README.md`](../../adapters/pi-cli/README.md#L18-L21)). **Phase 4: not admitted.** |
| **ChatGPT Desktop / local marketplace plugin / read-only MCP** | `unavailable` in the adapter evidence. The package retrieves static skills/resources; it documents no checklist transition event or callback. | `unavailable` for checklist ownership: [`adapters/mcp/catalog.mjs`](../../adapters/mcp/catalog.mjs#L100-L114) declares read-only packaged content and no state/write capability. No compaction/restart state evidence exists. | `unavailable` for a verified native progress panel or rich UI. The adapter explicitly says Composer/rich panels need a separate Apps SDK acceptance ([`adapters/chatgpt/tools.md`](../../adapters/chatgpt/tools.md#L16-L23)). | `unavailable`: no native checklist control or action-return payload is documented or exercised. | `unknown` for ChatGPT surface/session scoping. Normal conversation and Work are separate pending acceptance surfaces; one cannot be inferred from the other. | `documented but unverified` package/MCP boundaries; the acceptance matrix keeps installation, discovery, retrieval, and Work rows `PENDING` ([`adapters/chatgpt/acceptance.md`](../../adapters/chatgpt/acceptance.md#L1-L28)). **Phase 4: not admitted.** |
| **Antigravity Desktop / directory plugin** | `unavailable` in the inspected evidence. The always-on rule and `agy plugin validate` establish package loading/validation only; no in-agent checklist event schema or callback is detected. | `unknown`: no transient checklist owner, compaction behavior, or restart restoration path is exposed by the package validation record. | `unavailable` in the inspected adapter record. No native todo/progress surface is detected. | `unavailable`: no verified native user action or return-to-conversation path. | `unknown`: plugin-root path mapping is documented, but active conversation/request identity and lifecycle isolation are not demonstrated. | `verified` only for throwaway directory validation; installation and model application remain unverified in [`adapters/antigravity/capabilities.md`](../../adapters/antigravity/capabilities.md#L3-L25). The build records `installed: false`; validation does not enable a plugin ([`adapters/antigravity/install.md`](../../adapters/antigravity/install.md#L14-L27)). **Phase 4: not admitted.** |

## Phase 2 case preservation

This table records the Phase 2 status reported by the blocker; it is not new behavioral evidence. The manual campaign remains the protocol and retains its own per-case `PENDING` fields until a fresh supported host campaign is run and independently reviewed.

| Case | Phase 2 blocker status | Phase 3 effect | Missing evidence before `PASS` |
|---|---|---|---|
| SCL01 | `BLOCKED` | Unchanged; no lean-control run is claimed. | Retained fresh conversation and independent review. |
| SCL02 | `BLOCKED` | Unchanged; no creation/rendering run is claimed. | Sequential responses plus any available native trace. |
| SCL03 | `BLOCKED` | Unchanged; no approval/side-question/hide-show run is claimed. | Retained user actions and same-checklist evidence. |
| SCL04 | `BLOCKED` | Unchanged; no blocker/recovery run is claimed. | Retained blocker response and independent score. |
| SCL05 | `BLOCKED` | Unchanged; no dependency-gating run is claimed. | Trace or response evidence showing dependency eligibility. |
| SCL06 | `BLOCKED` | Unchanged; no pause/resume run is claimed. | Retained pause/resume turns and state continuity. |
| SCL07 | `BLOCKED` | Unchanged; no replacement run is claimed. | Old/new identity and isolated counter evidence. |
| SCL08 | `BLOCKED` | Unchanged; no reopen run is claimed. | Completed result, invalidation, and affected-descendant evidence. |
| SCL09 | `BLOCKED` | Unchanged; no cancellation/completion run is claimed. | Retained cancellation and final-count evidence. |
| SCL10 | `BLOCKED` | Unchanged; no recovery run is claimed. | Supported compaction/recovery setup and conservative reconstruction trace. |

`BLOCKED` here means the Phase 2 evidence pack was not available; it does not prove that a host can never implement the behavior. The blocker must not be replaced by a synthetic transcript, one-shot runner output, or a model self-report.

## Source and evidence register

| Source / locator | Establishes | Does not establish |
|---|---|---|
| [`references/session-progress.md`](../../references/session-progress.md#L4-L17) | The portable MVP is chat-managed, non-persistent, and requires future native proof of event path, state owner, renderer, action return, request scoping, and live lifecycle acceptance. | A host runtime, native event, panel, database, or behavioral acceptance. |
| [`docs/verification/pi-desktop-0.15.9-host-contract.md`](pi-desktop-0.15.9-host-contract.md#L6-L44) | Pi Desktop's narrow extension loader and prompt-application boundary, including compaction distinction. | A checklist event, native todo renderer, action-return schema, checklist persistence, or model following. |
| [`docs/verification/pi-desktop-0.15.9-host-contract.md`](pi-desktop-0.15.9-host-contract.md#L68-L87) | Retained `hostBoundary: PASS` versus `modelAcceptance: PENDING`. | Session Checklist behavioral acceptance. |
| [`adapters/pi/tools.md`](../../adapters/pi/tools.md#L72-L105) | Legacy `asktool` question-card source inspection and its interaction/schema limitations. | Checklist progress UI or lifecycle controls. |
| [`adapters/pi-cli/lifecycle.mjs`](../../adapters/pi-cli/lifecycle.mjs#L9-L43) and [`tests/architecture/pi-lifecycle-adapter.test.mjs`](../../tests/architecture/pi-lifecycle-adapter.test.mjs#L18-L59) | Controlled Pi CLI hook registration, cache invalidation, and bootstrap preservation. | A live model conversation, checklist events, native display, or action return. |
| [`adapters/pi-cli/README.md`](../../adapters/pi-cli/README.md#L18-L21) | Native installation, tool traces, and behavioral acceptance remain unverified. | Native support or Phase 2 PASS. |
| [`adapters/chatgpt/acceptance.md`](../../adapters/chatgpt/acceptance.md#L1-L28), [`adapters/chatgpt/tools.md`](../../adapters/chatgpt/tools.md#L1-L23), and [`adapters/mcp/catalog.mjs`](../../adapters/mcp/catalog.mjs#L100-L114) | ChatGPT acceptance is pending; the MCP surface is read-only; rich panels need separate acceptance. | A ChatGPT event path, state store, native panel, or user-action return. |
| [`adapters/antigravity/capabilities.md`](../../adapters/antigravity/capabilities.md#L3-L25), [`adapters/antigravity/tools.md`](../../adapters/antigravity/tools.md#L1-L18), and [`adapters/antigravity/install.md`](../../adapters/antigravity/install.md#L14-L27) | Antigravity package/validation and documented mapping limits; installation/model/application remain unverified. | Model execution, native UI, lifecycle events, or checklist support. |
| [`tests/scenarios/reports/session-checklist-phase2-20261002/blocker.md`](../../tests/scenarios/reports/session-checklist-phase2-20261002/blocker.md#L6-L40) | The environment's exact Phase 2 blocker and required future evidence. | A behavioral transcript or permission to change the campaign status. |

## Phase 4 admission gate

**Status: BLOCKED for all hosts.** Phase 4 may begin only after one host has retained direct evidence for every condition below; these are admission conditions, not implementation claims:

1. A checklist-specific native event or extension input with a stable, documented transition schema.
2. A transient state owner, including explicit survival semantics across turn boundaries, compaction, restart, or restoration; no unapproved cross-session store.
3. A native renderer/panel that actually presents the portable checklist state, not generic prompt text or a legacy question card.
4. A recorded user-action payload for show/hide, pause/resume, cancel/replace/reopen, with a return path to the correct active conversation and request.
5. Stable request/session scoping demonstrated across side questions, replacement, cancellation, reopening, and continuation.
6. Permission and installation evidence showing the host actually authorizes the required capability; source presence, package validation, or a declared permission is not a grant.
7. Retained live lifecycle acceptance independently reviewed for creation, update, pause, resume, hide, cancellation, replacement, reopening, and conversation continuation.
8. Compatibility evidence that the bridge preserves the portable state model, Phase 2 campaign semantics, and read-only MCP boundary.

None of the current records satisfies this gate. The correct interim behavior is to keep the chat-managed Markdown fallback and re-evaluate only when the missing host evidence is captured.

## Bounded discovery record

No host was installed, enabled, mutated, or driven through a live checklist campaign for this Phase 3 record. The available evidence is limited to repository source inspection, retained offline Pi Desktop host-boundary documentation, controlled Pi CLI tests, read-only/package validation records, and the existing Phase 2 blocker. These observations are sufficient to reject premature native support claims, not to prove that a future host implementation is impossible.
