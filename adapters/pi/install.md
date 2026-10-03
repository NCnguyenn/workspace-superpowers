# Install Workspace Superpowers for PI-Desktop

Target: PI-Desktop 0.16.0 or later. Version 0.1.7-beta includes a native plugin
tool and panel, plus the agent bootstrap extension. Package validation alone
does not certify live model behavior or rendering.

## Build and install

```powershell
python scripts/test-package-pi.py
python scripts/package-pi.py --out dist/pi-native-checklist-0.1.7-beta
```

Select the generated `local.workspace-superpowers-0.1.7-beta.piplug` through
PI-Desktop's Plugins install/update action. The unpacked plugin folder can also
be installed. Do not choose the source repository root or edit the registry
version manually. Existing output directories are refused by the builder.

Review the five requested permissions in the host: `agent.prompt.inject` exposes
the skill catalog; `agent.extension` loads the native bootstrap;
`agent.tool.register` registers the checklist tool; `ui.panel` renders its panel;
and `session.read` reads retained same-session tool receipts for recovery.
The build does not grant permissions. Retain the existing project scope and
enabled state, reload using the host and begin a fresh chat.
Verify version 0.1.7-beta and 24 distinct namespaced skills, including
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
The native plugin registers
`plugin_local_workspace_superpowers_workspace_checklist`. It owns transient
checklist state per host session and renders the Workspace Checklist panel.
The model uses this tool for create, update, visibility and lifecycle changes.
The panel returns user actions through the SDK with a binding token, checklist
identity and revision. Use the **Show Workspace Checklist** command to reopen
the panel. Its **Download trace** button exports transition payloads and IDs.
When this tool is present, the extension blocks competing `TodoWrite` calls.
Without the native owner, the legacy TodoWrite mirror remains a lossy fallback.
No document-rendering engine is installed. See [host mappings](tools.md).

After plugin-process restart, recovery accepts only exact same-session native
tool receipts. It preserves their IDs but requires confirmation of later panel
actions before advancing work. If compaction removed those receipts, status
reports unavailable state instead of inventing completed tasks.

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
separate claims. Local bridge tests and the SDK-loader probe do not prove live
permission grants, renderer/action ownership or model lifecycle acceptance.
Record those against the installed host; historical SCL observations are not
automatically acceptance evidence for this new implementation.

An optional read-only test executes the generated candidate through the pinned
PI-Desktop 0.15.9 loader and prompt method:

```powershell
node scripts/probe-pi-desktop.mjs --sidecar="C:/path/to/PI-Desktop/resources/agent-runtime/sidecar.js" --plugin="D:/path/to/generated/local.workspace-superpowers"
```

It runs without credentials, network calls, conversations or installed-config
changes. An unknown sidecar hash fails instead of guessing minified symbols.

To undo an installed upgrade, use the host's native installer with the previous
0.1.6-beta package, restore its two permissions through the host, and begin a
fresh chat. The older package has only the prompt extension and TodoWrite
mirror, without the native checklist state owner or panel.
