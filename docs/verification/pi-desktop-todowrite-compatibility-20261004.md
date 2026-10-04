# PI-Desktop built-in TodoWrite compatibility fix

Current package label: the user requested that the corrected build remain
`0.1.7-beta`. Active metadata and installation guidance now use that label.
The original panel archive and earlier 0.1.8-beta archives/results are preserved.
See the [same-version follow-up](#same-version-follow-up) for the current package.
The 0.1.8-beta evidence below records the earlier build, not the current label.

Date: 2026-10-04. Replacement: `local.workspace-superpowers` `0.1.8-beta`.
Starting checkout: clean `main` at `ff1e302`, containing later changes than the
handoff commit `f5bb36b`. Work is on `codex/pi-todowrite-compatibility-20261004`,
without reset, commit or push. Historical implementation and operator evidence
remain intact.

## Change and evidence boundary

Version 0.1.7-beta intercepted and blocked TodoWrite when its plugin tool was in
the catalog, instructed the model to prefer that tool, and registered a competing
panel. That affected the host's existing checklist and did not fulfill the
requested architecture. Its tests and simulated SDK probe did not prove live
native acceptance.

The replacement removes the tool-call blocker, selects the host's built-in
TodoWrite in bootstrap/runtime instructions, and makes the plugin-process entry
inert with respect to tools, commands, panels and session reads. It removes the
manifest UI contribution and requests only `agent.prompt.inject` and
`agent.extension`. The archive excludes the competing bridge and panel assets.
The managed bootstrap refresh and 24 skill IDs are preserved.
Generated PI skill footers explicitly select TodoWrite over their portable
Markdown rendering defaults; the portable source skills and contract are unchanged.

The existing pure `native-checklist.cjs` mapper is retained. Portable approval,
blocker, pause/resume, cancellation, request history and dependency-based reopening
remain in conversation context. They are not unsupported native status fields or
host APIs. TodoWrite owns the visible task list; there is no second routine
Markdown checklist when it is available. Markdown fallback is not native UI.
There is no host show/hide action API, and no promise to close an existing card.

Historical bridge/controller tests and sources remain in the repository but are
not reachable from the default entry or packaged. The pinned panel SDK probe is
marked historical and rejects replacement versions rather than reporting its
old panel checks as new checklist evidence.

No PI-Desktop application files, registry, database or installed plugin files
were changed. No desktop screenshot or running-application automation was used.
The operator installs the replacement. Local checks cannot prove that a live
model called TodoWrite or that the built-in checklist rendered in chat.

## Actual host schema

Read-only inspection on 2026-10-04 found installed PI-Desktop file version
`0.16.1`, product version `0.16.1.0`. The inspected source was:
`C:\Users\CHI NGUYEN\AppData\Local\Programs\PI-Desktop\resources\agent-runtime\sidecar.js`.
Its SHA-256 was `77719B37F27130F871C5C0C6148D2D1C74E87BF109FD079DC6CFE9061240959F`.

On line 7, `Ei` defines `todos[]` with nonempty `content`, four literal statuses
`pending|in_progress|completed|cancelled`, optional priority `high|medium|low`,
and at most 50 rows. `xi` describes full-list replacement, one `in_progress`
row, and truncation beyond 500 Unicode characters. The agent catalog still
includes TodoWrite. This matches the retained 0.16.0 mapping; it is source
evidence rather than a live tool/UI observation.

## Automated verification

| Check | Actual result | Scope |
|---|---|---|
| `npm.cmd test` | 280 passed, 0 failed | Repository architecture and adapter tests, including the retained historical bridge suite. |
| `node --test --test-reporter=spec adapters/pi/agent-extension.test.mjs adapters/pi/native-checklist.test.mjs` | 22 passed, 0 failed | Built-in prompt selection, unblocked TodoWrite, inert default lifecycle, host schema mapping and bootstrap preservation. |
| `python scripts/test-package-pi.py` | 7 passed, 0 failed | Real archive readback, portable dependencies, packaged bootstrap/lifecycle regressions, deterministic builds and output guards. |
| `python scripts/test-package-chatgpt.py` | 2 passed, 0 failed | Shared-version ChatGPT package checks; no installation. |
| `python scripts/test-package-antigravity.py` | 2 passed, 0 failed | Shared-version Antigravity package checks using its non-installing CLI validator. |

The regression was exercised before implementation: the TodoWrite case failed
because the old hook returned `block: true`; lifecycle assertions recorded tool
and command registration and panel-close operations; packaged checks failed on
extra permissions, the tool-call hook and unexpected SDK access. Those cases
pass after the fix. The repository checks also caught the enlarged bootstrap;
it was shortened within its existing bounds without relaxing the tests.

The bootstrap is 65 lines and approximately 3.9K characters, within the existing
80-line/4,096-character contract. The final repository run has no failures,
skipped tests or cancelled tests. Historical bridge tests are not evidence that
the replacement uses a panel or that TodoWrite rendered live. No new simulated
SDK probe or model-driven live acceptance was claimed.

## Review and final package

An independent read-only code review found no Critical or Important defects.
Its one Minor note concerned portable Markdown instructions in loaded skill
bodies. That was resolved by adding the explicit PI override to every generated
skill footer and a packaged assertion for all 24 copies. The new assertion failed
before the producer change, then all 7 package checks and 280 repository checks
passed again. The reviewer checked the incremental change and reported no
material findings. `git diff --check` is clean.

Final replacement archive:

```text
D:\Personal_Project\workspace-superpowers\dist\pi-todowrite-0.1.8-beta-final\local.workspace-superpowers-0.1.8-beta.piplug
```

- Version: `0.1.8-beta`; archive size: 616,888 bytes.
- SHA-256: `20b21c008402d541e0975417a36d5fcbb8043f33853cdbe7cd34966c56b07454`.
- All 81 archive entries were reopened, checked for CRC/store-only format, and
  compared byte-for-byte with unpacked files and build-record hashes.
- Manifest: 24 distinct skills; `agent.prompt.inject` and `agent.extension`;
  the existing `.js` native extension; no `ui` contribution or competing
  bridge/panel assets. All generated PI footers include the rendering override.
- The final packed entry and extension were executed offline: no checklist SDK
  access, no panel callback or TodoWrite hook, correct built-in bootstrap after
  stale-block refresh and compaction-base reconstruction, and correct mapper
  arguments including waiting/blocker/pause prefixes, cancellation and reopening.
- The legacy panel probe rejects the replacement before reading an ASAR; its
  historical checks cannot be misreported as new TodoWrite verification.
- The original 0.1.7-beta archive is unchanged, with SHA-256
  `ec0b1127c7c1d0509f416d555ee37ee7e9fcc9be91bbaa477c4fd78b6137d453`.

The output directory retains `build-record.json`, the archive checksum,
`compatibility-verification.json` and the passing `repository-tests.log`.
An earlier 0.1.8-beta intermediate build is preserved in
`dist/pi-todowrite-0.1.8-beta/`; install the final archive above.
Neither package was installed by this work. The remaining live check is the
operator's fresh-chat observation below, not another code/package blocker.

## Focused fresh-chat smoke check

Install/update `0.1.8-beta` through the host's native package action, retaining
the desired scope and enabled state. Review the two bootstrap/catalog permissions,
reload through the host and start a fresh chat. Use these example inputs:

> Use PI-Desktop's built-in checklist for three stages: inspect the supplied
> measurements, calculate percentage reductions, and verify the calculations.
> Row A: 120 ms before, 90 ms after. Row B: 200 ms before, 150 ms after.
> Complete only the inspection stage, then wait for my go-ahead. Do not create files.

Observe the actual TodoWrite call and the existing checklist in chat. Inspection
should be completed and the other stages unfinished; a waiting row may show its
portable state as a content prefix. No competing Workspace Checklist popup,
command or plugin checklist tool should appear. Then send:

> Proceed with the calculations and verification.

Both reductions should be 25%, and the same built-in checklist should become
completed only after verification. Actual tool results and visible behavior are
the evidence; an assistant statement about checklist updates is insufficient.
Optionally change Row A's after value to 84 ms and ask to recalculate/reverify
only the affected result: expect 30% for Row A and retention of Row B's 25%.

No full SCL01–SCL10 rerun is required for this compatibility smoke. Comprehensive
live lifecycle acceptance, including restart/compaction, remains a separate claim;
the short smoke only verifies the restored built-in path and the exercised updates.

## Same-version follow-up

On 2026-10-04 the operator requested retaining the `0.1.7-beta` label. Active
package metadata and installation instructions now use that version. The
TodoWrite compatibility fix remains in place; the original panel build and both
earlier 0.1.8-beta archives were retained. No installed plugin was changed.

Current corrected archive:

```text
D:\Personal_Project\workspace-superpowers\dist\pi-todowrite-0.1.7-beta-fixed-20261004\local.workspace-superpowers-0.1.7-beta.piplug
```

- Version: `0.1.7-beta`; archive size: 617,510 bytes.
- SHA-256: `8869944cdadf4097fa8af913c61a0d54bed591a4f9e079737115d8afc39a0beb`.
- All 81 stored archive entries passed CRC and were compared byte-for-byte with
  the unpacked files and build-record hashes. All 24 generated skill footers
  select the host's built-in TodoWrite rather than routine Markdown rendering.
- Manifest: only `agent.prompt.inject` and `agent.extension`; no `ui`
  contribution. No competing bridge or panel files are packaged.
- The actual packaged entry, extension and mapper were executed offline with
  guarded APIs. Load/unload made no SDK calls, only `before_agent_start` was
  registered, stale managed bootstrap was refreshed, compacted bases received
  current instructions, and TodoWrite argument mapping retained portable
  approval/blocker/pause prefixes, cancellation and reopening.
- The original 0.1.7-beta and final 0.1.8-beta archive hashes still match the
  historical values recorded above.

The historical SDK panel probe now checks the manifest's panel architecture
before reading any ASAR. A version-only guard would accept the corrected build
because it retains `0.1.7-beta`; a new regression failed on that old behavior
and passed after the architecture guard was added. This is a rejection check,
not execution of the old panel SDK checks or proof of live TodoWrite rendering.

Checks rerun for this label: `npm.cmd test` passed all 280 repository tests;
`python scripts/test-package-pi.py` passed all 8 package tests;
`python scripts/test-package-chatgpt.py` and
`python scripts/test-package-antigravity.py` each passed 2 tests. The latter
used the existing non-installing validator. `git diff --check` was clean.

The output directory retains its build record, checksum,
`compatibility-verification.json` and passing `repository-tests.log`.
Install the corrected archive from this directory, since its filename and
version match the preserved original. Use the focused fresh-chat smoke above
after installing this corrected `0.1.7-beta` build. Actual TodoWrite calls and
the visible built-in checklist remain the operator's live verification; no
running PI-Desktop installation or renderer acceptance is claimed here.
