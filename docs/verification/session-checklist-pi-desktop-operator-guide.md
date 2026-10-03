# Session Checklist evidence campaign: PI-Desktop operator guide

This guide explains how to update the local Workspace Superpowers checkout,
build the PI-Desktop package, install it in a fresh PI-Desktop chat, run the
Phase 2 Session Checklist campaign, retain evidence, and decide whether the
Phase 4 native-host gate may open.

This is an operator procedure. A package build, passing architecture test,
bootstrap injection, or model response from a stateless API runner is not
enough to admit a host to Phase 4.

## Current decision boundary

The repository currently has:

- a chat-managed MVP that renders transient Markdown/plain text at assistant
  response boundaries;
- the Phase 2 campaign at tests/scenarios/manual/session-checklist.md;
- the Phase 2 blocker at
  tests/scenarios/reports/session-checklist-phase2-20261002/blocker.md;
- the Phase 3 matrix at
  docs/verification/session-checklist-phase3-capability-matrix.md.

Phase 4 remains blocked until one real host proves all eight requirements with
retained, reviewable evidence:

1. a checklist-specific native event or extension input with a stable schema;
2. the transient state owner and turn, compaction, restart, and restoration
   semantics;
3. a native renderer or panel that displays checklist state;
4. a user-action payload and return path for show, hide, pause, resume, cancel,
   replace, and reopen;
5. request/session scoping across side questions, replacement, cancellation,
   reopening, and continuation;
6. permission and installation proof for the required host capability;
7. independently reviewed live lifecycle acceptance; and
8. compatibility with the portable contract and read-only MCP boundary.

If any requirement is unavailable, record BLOCKED. Never replace missing
evidence with source inspection, a synthetic transcript, a mock runner, a
database edit, or an assistant self-report.

## Roles

The operator must use the PI-Desktop UI. The current shell has no supported way
to drive the application window or export its native runtime trace. Send one
user turn, wait for the assistant response, and record it before sending the
next turn.

An independent reviewer checks the retained transcript and traces. The
repository maintainer or agent updates the matrix and implements Phase 4 only
after the evidence gate passes.

## 1. Protect the checkout

Open PowerShell:

~~~powershell
$repo = 'D:\Personal_Project\workspace-superpowers'
Set-Location $repo
~~~

Inspect before fetching:

~~~powershell
git status --short --untracked-files=all
git branch --show-current
git remote -v
git log --oneline --decorate -5
~~~

Do not run git reset --hard, git clean -fd, or a force push. This checkout has
uncommitted and untracked work, so do not overwrite it with a pull. Preserve
current work first using the normal branch or patch workflow.

After the working tree is clean and the intended branch is known:

~~~powershell
$branch = (git branch --show-current).Trim()
if (-not $branch) { throw 'Detached HEAD: choose a branch before updating.' }
git fetch origin --prune
git log --oneline --decorate "HEAD..origin/$branch"
git pull --ff-only origin $branch
~~~

If the tree is dirty, stop before git pull and resolve which local changes
belong to the package revision. Do not discard Session Checklist changes or
evidence files.

Record the exact revision:

~~~powershell
git rev-parse HEAD
git status --short --untracked-files=all
~~~

## 2. Run repository checks

Save complete command output in the evidence pack or operator log:

~~~powershell
npm.cmd test
python scripts/test-package-pi.py
python scripts/test-package-chatgpt.py
python scripts/test-package-antigravity.py
git diff --check
~~~

Antigravity may be blocked by the local Windows permission error for agy.exe.
Record the exact error; do not report that test as passed from another machine.

Run focused checks:

~~~powershell
node --test tests/architecture/session-progress.test.mjs
node --test tests/architecture/session-checklist-phase3.test.mjs
node --test tests/architecture/pi-lifecycle-adapter.test.mjs
node --test adapters/mcp/catalog.test.mjs
~~~

These checks prove repository contracts and controlled host boundaries. They do
not prove a live model maintained a checklist.

## 3. Build a fresh PI-Desktop package

Build from the source checkout. Do not install the repository root directly and
do not use a PI-Desktop piplug archive as a Pi CLI package. The builder refuses
an existing output directory:

~~~powershell
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$out = Join-Path $repo "dist\pi-session-checklist-$stamp"
python scripts/package-pi.py --out $out
Get-ChildItem -LiteralPath $out -Recurse -File | Select-Object FullName, Length
~~~

The output should contain an unpacked local.workspace-superpowers directory, a
local.workspace-superpowers-version.piplug archive, its SHA-256 file, and
build-record.json.

Reopen the build record and archive:

~~~powershell
Get-Content -Raw (Join-Path $out 'build-record.json')
$archive = (Get-ChildItem -LiteralPath $out -Filter '*.piplug').FullName
Expand-Archive -LiteralPath $archive -DestinationPath (Join-Path $out 'archive-readback')
Get-ChildItem -LiteralPath (Join-Path $out 'archive-readback') -Recurse -File |
  Select-Object FullName, Length
~~~

The manifest must retain both permissions:

- agent.prompt.inject for skill catalog/bootstrap access;
- agent.extension for the native bootstrap extension.

The build does not grant permissions. The host must show and grant them.

## 4. Install and enable the package

Use the PI-Desktop Plugins page and select the new piplug file. Do not edit the
plugin registry or copy files into an installed directory.

During installation:

1. verify plugin ID local.workspace-superpowers;
2. verify its version matches package.json;
3. review and grant agent.prompt.inject and agent.extension;
4. enable the plugin;
5. restart or reload PI-Desktop through its UI; and
6. create a fresh chat after reload.

Record host version, plugin version, enabled state, provider/model,
permission state, package path, source revision, and fresh-chat time. Never
record API keys, secret references, cookies, or private document contents.

The before_agent_start prompt hook alone does not prove a checklist event,
native renderer, or action callback.

## 5. Prepare a retained evidence pack

Use a non-ignored path. Do not use tests/scenarios/runs or an ad-hoc
tests/scenarios/reports/report-* directory for final evidence.

~~~powershell
$campaign = 'tests/scenarios/reports/session-checklist-phase2-pi-desktop-YYYYMMDD'
New-Item -ItemType Directory -Force -Path $campaign | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $campaign 'native-trace') | Out-Null
~~~

Use this layout:

~~~text
session-checklist-phase2-pi-desktop-YYYYMMDD/
  README.md
  host-info.md
  operator-log.md
  transcript-SCL01.md
  transcript-SCL02-SCL03.md
  transcript-SCL04-SCL06.md
  transcript-SCL07.md
  transcript-SCL08.md
  transcript-SCL09.md
  transcript-SCL10.md
  native-trace/
  independent-review.md
~~~

README.md records campaign ID, source revision, host/model/plugin versions,
evidence limits, and completeness. operator-log.md records every command, UI
action, timestamp, and result without credentials. Transcripts preserve exact
user turns and assistant responses in order.

Check that the final path is committable:

~~~powershell
git check-ignore -v -- $campaign
git status --short --untracked-files=all -- $campaign
~~~

git check-ignore must return no match.

## 6. Capture host evidence

Keep native traces separate from the conversation transcript. Retain each
unedited export plus an index mapping it to a conversation turn.

| Gate | Evidence required |
|---|---|
| Transition schema | Event name, payload shape, state transition, timestamp, correlation ID. |
| State owner | Component owning transient state and its read/update API. |
| Turn boundary | State after the first response and every follow-up. |
| Compaction/restart | State before and after restoration, including intentional loss. |
| Renderer | Native panel/component showing checklist state and counts. |
| User action | Payload and return path for show, hide, pause, resume, cancel, replace, reopen. |
| Scoping | Side-question preservation and replacement/cancellation/reopen isolation. |
| Permissions | Host evidence that the required capability is granted and enabled. |

If a trace is unavailable, write UNAVAILABLE and explain why. Do not infer it
from prompt text or a database row.

## 7. Run SCL01-SCL10

Use the exact prompts and acceptance criteria in
tests/scenarios/manual/session-checklist.md. Do not paste a whole chain into
one message. Wait after every turn.

| Cases | Conversation setup | Required observation |
|---|---|---|
| SCL01 | Two fresh lean requests. | No checklist for a short answer or small wording edit. |
| SCL02-SCL03 | One multi-stage request, then status, side question, hide, show. | One request-scoped checklist, approval waiting, side-question preservation, hide/show without state loss. |
| SCL04-SCL06 | Establish blocker, test dependency handling, pause, resume. | Blocker evidence survives; cancellation is not completion; pause preserves waiting/blocker state. |
| SCL07 | Fresh report workflow, then replacement with slide outline. | Old checklist is replaced; new IDs and counts are isolated. |
| SCL08 | Fresh workflow reaches completion, then source revision invalidates one result. | Only affected work and descendants reopen. |
| SCL09 | Fresh workflow with completed and unfinished tasks, then cancel remaining work. | Completed and cancelled counts stay separate. |
| SCL10 | Fresh supported compaction/recovery setup. | Only evidence-supported state is reconstructed. |

For every case record exact user messages, exact assistant responses, visible
checklist blocks, counts, current task/status, Loaded skills text when shown,
native traces and locators, expected versus observed behavior, and missing
capabilities.

A checklist is not approval. Only an explicit approval turn can unlock an
approval-gated task.

## 8. Score each case

Use:

- PASS: retained transcript and required evidence exist, and an independent
  reviewer confirms every criterion;
- FAIL: a required behavior is observed to be wrong;
- BLOCKED: host, trace, permission, or evidence path is unavailable;
- PENDING: not attempted.

Do not mark PASS when only response text exists for a case requiring hidden
state, IDs, native events, or action callbacks. Mark the unobservable part
BLOCKED.

Keep tests/scenarios/manual/session-checklist.md PENDING until a retained pack
and independent review exist. Never turn an unreviewed result into PASS.

## 9. Independent review

A reviewer who did not conduct the run inspects the transcript, native traces,
permission/install proof, campaign criteria, and operator status.

Record one row per case in independent-review.md:

~~~text
Case: SCL02
Status: PASS | FAIL | BLOCKED
Transcript: transcript-SCL02-SCL03.md
Native evidence: native-trace/<file-or-UNAVAILABLE>
Criteria checked: <acceptance criteria>
Finding: <what the evidence shows>
Reviewer: <name or review role>
Reviewed at: <timestamp>
~~~

Reject mock responses, one-shot stateless runner output, source assertions,
assistant self-reports, database edits, and transcripts missing user turns.

## 10. Decide whether Phase 4 opens

| Result | Decision |
|---|---|
| Required SCL cases PASS, all eight gates have direct evidence, and no critical trace is missing | Update the capability matrix to admit the host and write a separate Phase 4 plan. Stop for plan review before coding. |
| Any SCL case FAIL | Keep Phase 4 blocked, fix the affected host/package/contract, and rerun. |
| Any gate BLOCKED or only documented | Keep Phase 4 blocked; do not build a speculative bridge. |
| Only package/bootstrap/static checks pass | Keep Phase 4 blocked; these are host-boundary checks, not native acceptance. |

If the gate opens, the new Phase 4 plan must name the selected host, event
schema, state owner, renderer, action-return path, scoping rules, tests,
rollback, and compatibility boundaries. Existing MVP design approval does not
automatically approve native implementation.

## 11. Rollback

If the package causes a host problem:

1. disable the plugin in PI-Desktop;
2. use the host's native uninstall or previous-package action;
3. restore the prior permission set through the host UI;
4. start a fresh chat and record the rollback; and
5. preserve evidence and error logs.

Do not delete the source checkout or evidence to hide a failed run.

## 12. Final report fields

~~~text
Campaign: <campaign ID>
Source revision: <git revision>
Host/model/plugin: <values>
SCL01-SCL10: <status per case>
Native event schema: <PASS/BLOCKED>
Transient state owner: <PASS/BLOCKED>
Native renderer: <PASS/BLOCKED>
User-action return path: <PASS/BLOCKED>
Request/session scoping: <PASS/BLOCKED>
Permission/install evidence: <PASS/BLOCKED>
Live lifecycle acceptance: <PASS/BLOCKED>
Portable contract/MCP compatibility: <PASS/BLOCKED>
Phase 4 decision: ADMITTED | BLOCKED
Independent reviewer: <name or role>
Remaining limitations: <explicit list>
~~~

A correct BLOCKED result is useful evidence. It identifies the missing host
capability and prevents unsupported native implementation from being documented
as complete.

## Repository references

- references/session-progress.md
- tests/scenarios/manual/session-checklist.md
- tests/scenarios/reports/session-checklist-phase2-20261002/blocker.md
- docs/verification/session-checklist-phase3-capability-matrix.md
- adapters/pi/install.md
- adapters/pi/tools.md
- adapters/pi/routing-trial.md
- tests/architecture/pi-lifecycle-adapter.test.mjs

