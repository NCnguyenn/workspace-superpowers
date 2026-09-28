# PI-Desktop 0.15.9 bootstrap host contract

This report separates native host-boundary verification from model acceptance.
No plugin installation, permission grant, application configuration change, API
credential, or live model request is part of this probe.

## Verified integration contract

The deployed `resources/app.asar` main bundle exposes `pi.agent.registerTool`,
`unregisterTool`, and `complete` to ordinary plugin activation code. It does not
expose a prompt-registration API. `plugin-host-process.js` lines 410–413 call
event listeners without using their return values. Consequently, returning
`systemPrompt` from `pi.events.on('before_agent_start', ...)` cannot inject it.

The supported integration is a native extension factory registered through
`contributes.agentExtensions`, with the `agent.extension` permission declared
and granted by the host. Declaring the permission in a candidate is not a grant.

Source locations in the extracted main bundle:

- Lines 95562–95577 validate an array of relative path strings; the actual
  extension regex accepts `.ts`, `.mts`, `.js`, and `.mjs`, but not `.cjs`.
- Lines 105112–105154 check granted permissions, resolve existing entries inside
  the plugin root, and record their ownership.
- Lines 122239–122245 forward enabled project extensions to the sidecar as
  `trustedExtensions` containing `id`, `entry`, `label`, `source`, and `root`.

The deployed sidecar has SHA-256:

```text
a8925db0a896cc231a22dd515775d4187904e7c80c80ad526880139a4cc520eb
```

Its loader uses Jiti with `moduleCache: false`, `tryNative: false`, and
`.import(entry, {default: true})`. A `.js` file exporting a CommonJS factory via
`module.exports` loads successfully. The native runner invokes that factory
with an API exposing `pi.on`.

`before_agent_start` is a result-bearing native event. The desktop runtime's
`extensionBeforeAgentStart` calls the runner, merges returned result fields,
and passes a returned string `systemPrompt` to `setAgentSystemPrompt`.
`session_compact` is a notification; its return value does not change the
system prompt. Injecting on every `before_agent_start` covers a newly rebuilt
base on subsequent turns without relying on transcript retention.

## Reproducible offline probe

Run from the repository root, providing an explicit deployed sidecar and an
unpacked candidate directory:

```powershell
node scripts/probe-pi-desktop.mjs --sidecar="C:\Users\CHI NGUYEN\AppData\Local\Programs\PI-Desktop\resources\agent-runtime\sidecar.js" --plugin="D:\Personal_Project\workspace-superpowers\dist\pi-orchestration-0.1.6-beta\local.workspace-superpowers"
```

The script refuses an unrecognized sidecar hash before executing its source.
It copies that source to a disposable temporary module and adds exports for
the actual native loader, runner, and desktop runtime class. It invokes the
real runtime hook on a minimal runtime object; only unrelated runtime services
are substituted. This tests the loader and prompt application bridge without
constructing a model session.

Assertions cover preservation of unrelated host text, the namespaced router,
exactly one managed runtime block, repeat-call idempotence, a rebuilt compacted
base, and empty native diagnostics. Separate disposable copies of the candidate
verify that missing and empty bootstrap files produce visible native factory
errors. The original candidate and deployed application are not modified.
Temporary files are removed in `finally`.

The compact JSON result identifies the sidecar and candidate bootstrap hashes.
`hostBoundary: PASS` means these checks passed; `modelAcceptance: PENDING`
explicitly means no model-following or live UI acceptance claim is made.

## Validation record

The initial native investigation successfully loaded a CommonJS `.js` factory
and applied its returned bootstrap through the actual desktop runtime method,
with no native diagnostics. Candidate-specific results are recorded below
after running the reproducible script against the built artifact.

The candidate build was probed on 2026-09-28 with the pinned deployed sidecar:

The final artifact was rebuilt into `dist/pi-orchestration-0.1.6-beta-final/`
and the same probe passed against that directory. Archive SHA-256:
`b4ff08fc12113e5a4dc30f1a6cbd963fc91080ba821e02710729e03836195ae7`.

```json
{"piDesktopVersion":"0.15.9","sidecarHash":"a8925db0a896cc231a22dd515775d4187904e7c80c80ad526880139a4cc520eb","pluginVersion":"0.1.6-beta","bootstrapHash":"27918c0764b135d328fec195d3990008452bae44bcb66c669aa7f1522340eac2","hostBoundary":"PASS","modelAcceptance":"PENDING","cases":["fresh","repeated","compacted-base","missing-bootstrap-visible-error","empty-bootstrap-visible-error"]}
```
