# Native trace index — mixed source-only and UNAVAILABLE records

Campaign: `session-checklist-phase2-pi-desktop-20261003/phase4-readiness`  
Native execution trace status: **UNAVAILABLE**  
Source inspection status: **AVAILABLE for the narrow TodoWrite host surface**

## Why no native trace was captured

This shell performed a read-only inspection of the installed PI-Desktop 0.16.0
executable and agent sidecar. It still cannot drive the PI-Desktop window or
export a native runtime trace. No probe, package installation, registry edit,
installed-directory copy, permission change, or live host session was performed
for this evidence pack.

The evidence directory therefore contains one explicit UNAVAILABLE record per
Phase 4 gate plus [09-todowrite-source.md](09-todowrite-source.md), which is a
source-only host observation rather than a synthetic trace. Do not replace the
UNAVAILABLE records with prompt text, screenshots, Skill loading,
package/manifest declarations, registry rows, a database row, the
`before_agent_start` bootstrap result, or an assistant claim about checklist
state.

## Required raw trace fields for a future capture

Each retained native trace must identify:

- host version and exact installed plugin ID/version/path;
- effective permission grants and enabled/project scope;
- model/provider where the host exposes it;
- event/action name and versioned payload shape;
- timestamp and a stable correlation/request/session identity;
- previous and next checklist/task/lifecycle state when applicable;
- component/API owner and read/update/action handler locator;
- exact transcript file and conversation turn to which the trace belongs;
- redaction method for any sensitive material.

## Current files

| Gate | File | Status |
|---|---|---|
| Transition schema | [01-transition-schema.md](01-transition-schema.md) | `UNAVAILABLE` |
| State owner | [02-state-owner.md](02-state-owner.md) | `UNAVAILABLE` |
| Turn boundary | [03-turn-boundary.md](03-turn-boundary.md) | `UNAVAILABLE` |
| Compaction/restart | [04-compaction-restart.md](04-compaction-restart.md) | `UNAVAILABLE` |
| Renderer | [05-renderer.md](05-renderer.md) | `UNAVAILABLE` |
| User action | [06-user-action.md](06-user-action.md) | `UNAVAILABLE` |
| Scoping | [07-scoping.md](07-scoping.md) | `UNAVAILABLE` |
| Permissions | [08-permissions.md](08-permissions.md) | `UNAVAILABLE` |
| TodoWrite source observation | [09-todowrite-source.md](09-todowrite-source.md) | `SOURCE_ONLY` |

## Source-only limits

The [PI-Desktop 0.15.9 host contract](../../../../../../docs/verification/pi-desktop-0.15.9-host-contract.md) remains an offline prompt-bootstrap boundary record, not a checklist native trace. The [adapter mapping](../../../../../../adapters/pi/tools.md), [installation notes](../../../../../../adapters/pi/install.md), [Phase 3 matrix](../../../../../../docs/verification/session-checklist-phase3-capability-matrix.md), and [operator log](../../operator-log.md) remain source/procedure/response-summary material. The 0.16.0 source record establishes the narrow TodoWrite schema and host plumbing only; it does not establish a live checklist event, state owner, panel, callback, checklist correlation ID, or permission grant.
