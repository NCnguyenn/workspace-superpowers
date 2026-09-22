# Independent Multi-Turn Continuity Verification

## Scope and method

This campaign exercises the implemented workflow/document-continuity upgrade in
the local working tree on `codex/adaptive-workflow-continuity`, based on HEAD
`0611e43bfec0bf2b7dd31c96a39937899b80fe98`. It is a behavioral sample, not
release certification or a measurement of improvement over the old package.
The pre-upgrade baseline launch failed because agent credits were unavailable.

Nine bounded tasks completed across nine fresh task agents: C01–C08 with C07
split into workbook audit and slide storyboard. Five conversations had sequential
follow-ups (C02–C06), totaling 17 scored user-request/response turns across the
campaign. Each follow-up was sent after the preceding final response. Agents
received the actual user request and synthetic source paths, with instructions
to load the current package and avoid tests, plans, and earlier transcripts.
They did not receive expected answers or future follow-ups. `fork_turns=none`
provided independent task context. Model and effort were inherited; the service
did not report an exact model/provider identity. This is not cross-model testing.

C08's original execution was interrupted before a retained final response. A
fresh agent completed the same request; only that retry is scored. Separate
post-task requests for C01/C02 execution records have no retained responses and
are excluded from the turn count. A further independent agent assessed the
retained responses against the scenario rubric and inspected the raw fixtures.

## Observed results

All nine tasks meet their observable response requirements, confirmed by a
separate evaluator. This is **response-level PASS with execution-evidence limits**.

| Case | Turns | Observed result |
|---|---:|---|
| C01 | 1 | Continues §2.3 with the existing terms, restrained prose, and explicit connection to §2.2; planned work remains prospective. |
| C02 | 3 | Answers p95 directly during outline review; updates only definitions and retains outline-only scope. |
| C03 | 2 | Incorporates late notes, updates §2.3, distinguishes planning gaps from missing results, and preserves other sections. |
| C04 | 4 | Answers a side question, resumes the outline, incorporates new notes, and writes coherent prose after explicit approval without asking again. |
| C05 | 2 | Cancels the outline and returns exactly three source-grounded summary sentences. |
| C06 | 2 | Compares 180 and 310 ms with provenance/condition limits; asks the material clarification without selecting an unsupported value. |
| C07a | 1 | Correctly identifies Rates!C2 division by zero and proposes a correction; discloses absence of Excel recalculation. |
| C07b | 1 | Returns a five-slide storyboard with bounded evidence and no delivered deck. |
| C08 retry | 1 | Flags fabricated CPU/production results, index/cache drift, unsupported deployment, and inconsistent voice/presentation. |

C04 demonstrates plausible section resumption; an exact return cursor was not
established in the prompt, so exact cursor restoration is untested. C01 and C04
prose remain below 180 words. No substantive response-level defect remained
after independent assessment. The evaluator initially treated C06's lack of new
section prose as a failure, then corrected that interpretation: the response
already performed independent comparative analysis, while drafting dependent
claims required the unresolved clarification. Both assessments are retained in
[the evaluator record](independent-evaluation.md).

The architecture suite was rerun on 2026-09-20: **52 passed, 0 failed, 0 skipped**.
It checks all 22 skill frontmatters, catalog membership, contract reachability,
local Markdown references, role contracts, and related instruction invariants.

## Evidence

- [C01–C03 actual requests and responses](transcripts-c01-c03.md).
- [C04–C06 actual requests and responses](transcripts-c04-c06.md), including the
  four-turn outline → side question → outline → new notes and approved prose chain.
- [C07–C08 actual requests and responses](transcripts-c07-c08.md).
- [Source report snapshot](fixtures/report.md), [supervisor notes](fixtures/notes.md),
  [conflicting excerpt](fixtures/replacement.md), and [workbook](fixtures/audit.xlsx).
- [Pre-C04 SHA256 manifest](manifest-before-c04.json) and
  [post-C08 comparison before documentation edits](manifest-after-c08-before-documentation.json):
  52 existing package/fixture files checked, all 52 unchanged.

The source report concerns a synthetic Northbridge library staging comparison.
It supplies mean response times of 420 and 310 ms, defines the intervention as
a covering index, and excludes CPU measurements, repeated trials, and production
traffic. Notes propose future work; the conflicting excerpt reports 180 ms
without comparable conditions. The workbook contains a cached division-by-zero
error. None of these are measurements of this repository or a real service.

## Verification boundaries

Final responses were transcribed from collaboration-service messages. Complete
underlying tool-call logs are unavailable. Source-consistent content demonstrates
the observed behavior; it does not independently prove which skill files or
tools were loaded. Agent self-reports are not substituted for those logs.

The hash comparison establishes unchanged final bytes for the 52 listed files
between its snapshots. It does not establish absence of temporary edits, cover
C01–C03 before the first snapshot, or inventory new files outside the manifest.
No output deck was delivered; no workbook recalculation was claimed or executed
by the parent. The independent evaluator checked the workbook's actual XML.

The short synthetic cases do not cover all 22 skills behaviorally, real DOCX/PDF
layout, export/reopen workflows, long theses, context compaction, citation-style
preservation, language overrides, multiple models, or repeated reliability trials.
The separate older B01–B16 campaign remains pending. All 22 skills are covered by
structural contract/link checks, which are a different level of evidence.

Architecture tests, operator scripts, and this evidence pack are tracked.
Ad-hoc run dumps remain gitignored. At campaign time the upgrade had not been
installed elsewhere, committed, pushed, or published.
