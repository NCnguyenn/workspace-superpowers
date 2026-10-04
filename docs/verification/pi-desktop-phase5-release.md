# PI-Desktop Phase 5 release and dogfood record

Historical release/install record. Packaging and installation below do not
establish Phase 4 native acceptance. The later 0.1.7-beta panel candidate
interfered with the built-in checklist; the 0.1.8-beta replacement restores the
TodoWrite path and is handed to the operator for installation. See
[the compatibility fix](pi-desktop-todowrite-compatibility-20261004.md).
The earlier package, results and evidence below remain unchanged.

Date: 2026-10-03  
Release branch: `codex/phase5-release-20261003`  
Release commit: `28b717e`  
GitHub branch: <https://github.com/NCnguyenn/workspace-superpowers/tree/codex/phase5-release-20261003>

## Scope

Phase 5 is the release and dogfood pass for the verified PI-Desktop adapter
subset. It packages the source tree, publishes the reviewed branch, installs the
package through PI-Desktop's native Extensions → Install package action, and
checks the installed extension boundary. It does not convert missing native
execution traces into Phase 4 evidence.

## Package

- Archive: `dist/pi-phase5-20261003/local.workspace-superpowers-0.1.6-beta.piplug`
- SHA-256: `42fa6ece04ae6a6b5893d15552ba9743a90a7674af46fdfffdbef536c12a0ff5`
- Archive contents: 80 files, store-only ZIP, CRC and archive/unpacked byte
  readback verified.
- Manifest: 24 skills; `agent.prompt.inject` and `agent.extension`; native entry
  `adapters/pi/agent-extension.js`.

## Verification

- `npm.cmd test`: 240 passed, 0 failed.
- `python scripts/test-package-pi.py`: 6 passed, 0 failed.
- `python scripts/test-package-chatgpt.py`: 2 passed, 0 failed.
- Native adapter tests: 14 passed, 0 failed.
- Installed-package runtime harness: bootstrap loaded, default export present,
  installed package root and `using-workspace-superpowers` router injected.
- PI-Desktop host registry after install: `source=installed`, version
  `0.1.6-beta`, `enabled=true`, `status=ready`, path
  `C:\Users\CHI NGUYEN\.pi-desktop\plugins\installed\local.workspace-superpowers`.
- Installed manifest and extension files were read back from that host path;
  archive SHA-256 matches the release record.

## Acceptance boundary

The package installation and installed-extension smoke checks pass. A complete
native live-turn smoke transcript was not retained from this run because the
desktop UI automation layer could not reliably submit a new prompt after the
native file-picker transition. This is a test-harness limitation, not a claim
that the live native bridge passed.

The Phase 4 readiness pack therefore remains **BLOCKED**. Native lifecycle
traces, renderer/action ownership, request scoping, permission evidence, and an
independent review are still required before Phase 4 admission.
