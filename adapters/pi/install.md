# Install Workspace Superpowers for PI-Desktop

Target: PI-Desktop 0.16.0 or later. The corrected 0.1.7-beta build retains the skill catalog
and agent bootstrap extension, and uses PI-Desktop's existing built-in TodoWrite
checklist in chat. It contributes no checklist tool, panel or custom renderer.
Package validation alone does not certify live model behavior or rendering.

## Build and install

```powershell
python scripts/test-package-pi.py
python scripts/package-pi.py --out dist/pi-todowrite-0.1.7-beta-fixed-20261004
```

Select the generated `local.workspace-superpowers-0.1.7-beta.piplug` through
PI-Desktop's Plugins install/update action. The unpacked plugin folder can also
be installed. Do not choose the source repository root or edit the registry
version manually. Existing output directories are refused by the builder.

Review the two requested permissions in the host: `agent.prompt.inject` exposes
the skill catalog and `agent.extension` loads the native bootstrap. Checklist
tool registration, panel and session-read permissions are no longer requested.
The build does not grant permissions or install/update the plugin. Retain the
existing project scope and enabled state, reload using the host and begin a
fresh chat so the old extension hooks and catalog are not retained.
Verify version 0.1.7-beta and 24 distinct namespaced skills, including
`local.workspace-superpowers/using-workspace-superpowers`.
The corrected and original panel builds share the version label. Select the
archive from `pi-todowrite-0.1.7-beta-fixed-20261004`, using its build record and
checksum to distinguish it; the version label alone does not prove the fix.

## Prompt lifecycle

The manifest contributes `adapters/pi/agent-extension.js`. PI-Desktop loads it
inside the agent runtime, where `before_agent_start` is a result-bearing event.
The extension returns the thin [bootstrap](bootstrap.md) with the actual package
root. It runs before each turn, including turns after compaction, and refreshes
only its own complete runtime block. It does not invoke skills itself.

The desktop plugin-process `pi.events.on` callback is notification-only: its
return value cannot change the agent's system prompt. Older package hook tests
mocked a different API and therefore did not establish native prompt injection.
The plugin-process `main.js` now has no prompt hook.

Each Workspace turn still loads the router, then the appropriate specialists,
using the actual native `Skill` catalog IDs. Skill bodies own document workflow,
approval and evidence rules; the bootstrap does not duplicate those procedures.
For an activated multi-stage checklist, the model calls the host's `TodoWrite`
directly. The extension has no tool-call blocker and the plugin entry makes no
checklist SDK calls, including during unload. The retired **Show Workspace
Checklist** command and panel assets are absent from the replacement package.
The pure native-checklist mapper preserves the actual four-state host schema.
Portable IDs, approval/blocker evidence, pause/resume, cancellation and reopening
remain in conversation context; no independent state store is added. See
[the checklist protocol](checklist-runtime.md) and [host mappings](tools.md).
No document-rendering engine is installed.

After compaction or restart, recover only evidence-supported retained state.
If portable identities or gates are uncertain, ask the minimum confirmation;
do not invent completed tasks or a host checklist-read API. TodoWrite has no
show/hide action API. A hide request can suppress routine publication but cannot
promise to close an existing card. If TodoWrite is unavailable or fails, report
the limit and use Markdown as a fallback without claiming native UI.

## Fallback and legacy project instructions

Without an authorized native agent extension, merge the complete marked
[bootstrap](bootstrap.md) into the project's effective instructions and record
the real installed package root. Preserve other project instructions. A plugin's
bundled `AGENTS.md` is not automatically executed just because it is installed.

Existing legacy project blocks and custom paths are not deleted by the runtime.
When migrating one, replace only the adopted Workspace Superpowers block and
retain unrelated/user-edited content. The runtime deliberately does not guess
which unmarked project instructions it may delete.

## Verification and rollback

Check actual router and specialist tool results with the [routing trial](routing-trial.md)
and [criterion trial](criterion-trial.md). Record fresh sessions, approvals,
side questions, continuation and post-compaction turns. Catalog discovery,
bootstrap injection, successful Skill calls and correct skill application are
separate claims. Local regressions and archive checks do not prove live native
checklist rendering or model lifecycle acceptance. The repository's pinned
original 0.1.7-beta panel SDK probe is historical and rejects this replacement
by architecture, even though the version label is retained; its 18
earlier checks are not TodoWrite acceptance. Historical SCL observations remain
unchanged. Installation and live checklist observation are operator actions.

For a short smoke check in a fresh Agent chat, use these example inputs:

> Use PI-Desktop's built-in checklist for three stages: inspect the supplied
> measurements, calculate percentage reductions, and verify the calculations.
> Row A: 120 ms before, 90 ms after. Row B: 200 ms before, 150 ms after.
> Complete only the inspection stage, then wait for my go-ahead. Do not create files.

Observe a real TodoWrite call and the existing checklist in chat, with inspection
completed and the calculation/verification stages unfinished. No Workspace
Checklist popup, show command or plugin checklist tool should appear. Then send:

> Proceed with the calculations and verification.

Expect 25% reductions for both rows and TodoWrite updating the same built-in
checklist to completion after verification. Assess the visible card and actual
tool results, not an assistant claim that it updated progress. If desired, change
Row A's after value to 84 ms and ask to recalculate/reverify only that row: the
affected work should reopen and finish at 30%, retaining Row B's 25% result.
This focused compatibility smoke check does not require repeating SCL01–SCL10.

To undo an installed upgrade, use the host's native installer with a retained
package and begin a fresh chat. Version 0.1.6-beta has the earlier TodoWrite
mapping; the original 0.1.7-beta panel build contains the competing panel and
TodoWrite blocker, so that original archive is unsuitable for verifying restored
built-in compatibility. Never edit the
registry or copy files into the installed plugin directory manually.
