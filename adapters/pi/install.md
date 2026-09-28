# Install Workspace Superpowers for PI-Desktop

Target: PI-Desktop 0.15.9 or later. Version 0.1.6-beta uses a native agent
extension; package validation alone does not certify model behavior or rendering.

## Build and install

```powershell
python scripts/test-package-pi.py
python scripts/package-pi.py --out dist/pi-orchestration-0.1.6-beta
```

Select the generated `local.workspace-superpowers-0.1.6-beta.piplug` through
PI-Desktop's Plugins install/update action. The unpacked plugin folder can also
be installed. Do not choose the source repository root or edit the registry
version manually. Existing output directories are refused by the builder.

Review **both** requested permissions in the host: `agent.prompt.inject` exposes
the skill catalog, and the new **`agent.extension`** loads the native bootstrap
extension. The build does not grant permissions. Retain the existing project
scope and enabled state, restart/reload using the host and begin a fresh chat.
Verify version 0.1.6-beta and 24 distinct namespaced skills, including
`local.workspace-superpowers/using-workspace-superpowers`.

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
The extension registers no tools and does not install document-rendering engines.
See [host mappings](tools.md).

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
separate claims. Model-level native acceptance remains PENDING until traced.

An optional read-only test executes the generated candidate through the pinned
PI-Desktop 0.15.9 loader and prompt method:

```powershell
node scripts/probe-pi-desktop.mjs --sidecar="C:/path/to/PI-Desktop/resources/agent-runtime/sidecar.js" --plugin="D:/path/to/generated/local.workspace-superpowers"
```

It runs without credentials, network calls, conversations or installed-config
changes. An unknown sidecar hash fails instead of guessing minified symbols.

To undo an installed upgrade, use the host's native installer with the previous
0.1.5-beta package, restore its permission set through the host, and begin a fresh
chat. Source documents and reports stay in their projects. The older version has
the known notification-hook limitation. Do not label rollback as fixing it.
