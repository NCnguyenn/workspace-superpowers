# Criterion workflow and native question UI — 0.1.2

Date: 2026-09-21. Branch: `codex/criterion-gates-0.1.2`.

## Delivered changes

Criterion drafting now explicitly follows requirement analysis → user approval
→ detailed outline → user approval → prose and review. The original scope gate
owns the analysis decision; no third approval register was introduced. A master
outline containing only criterion headings cannot substitute for these detailed
decisions. Applicable previous approvals and explicit waivers remain reusable.

Analysis now includes source wording/locator, command verbs and required depth,
theory/application boundaries, obligations, evidence needs and material gaps.
Guidance distinguishes description, explanation, comparison, analysis, evaluation
and critique without inventing grading requirements from labels such as P1.
Source-document instructions are evidence, not approval from the user.

The shared guided-question reference requires actual structured-tool invocation
when supported, one decision at a time. Pi's adapter and bootstrap now name
`asktool` and provide separate schema-correct examples for the two approvals.
The host supplies the question card, radio options, custom answer, Skip, Decline
all and Submit answers. Empty/skipped/cancelled answers do not approve anything.
Chat choices are the fallback when the tool is unavailable or disallowed.

Report body guidance now requires developed paragraphs for explanation and
judgment, with matching prose-review criteria. Useful parallel lists, procedures,
comparison tables and numbered headings remain allowed; there is no list quota.

## Validation

| Check | Observed result | Limit |
|---|---|---|
| New structural regression tests | 7/7 pass; original five failed before the gate changes and two additional UI checks failed before the native mapping change | Instruction presence/schema checks, not runtime compliance |
| Package integration tests | 4/4 pass | Checks package content, references, reproducibility and output protection |
| Complete local test command | 93/95 pass | Two existing evidence-portability assertions conflict with the unchanged `.gitignore` policy |
| Diff whitespace check | Pass | Not a behavioral check |
| Independent review | No concrete gate/packaging defect found in the reviewed changes before the final native-tool refinement | Final native examples additionally checked by structural tests and local runtime inspection |
| Baseline agent probe | FAIL: agent wrote full P1 after only master-outline approval | Synthetic fixture in a separate Codex agent, not Pi |
| Updated agent probe, first turn | PASS: returned P1 analysis v1, requested approval, no detailed outline or draft | Same synthetic prompt in a fresh Codex agent |
| Updated probe, unrelated question | PASS: answered the definition question without approving P1 | Operator supplied one subsequent user turn |
| Updated probe, analysis approval | PASS: returned detailed P1 outline v1 and stopped for its separate approval | No prose was drafted at this point |
| Approved-draft probe | PASS: a fresh agent given the applicable analysis/outline decisions wrote all seven approved headings in developed paragraphs without another gate | Separate fixture-based continuation; the original final turn was interrupted |
| Approved-draft independent review | No requirement, coherence, prose or evidence findings in the supplied draft | Adjacent document content was unavailable; no file output or Pi execution tested |
| Native adapter interpretation probe | Returned the documented `asktool` JSON; treated `null` as pending analysis, not approval | Tool intent inspected, not an executed Pi call |

The baseline agent explicitly reported: “I treated the approved master outline
as applicable to section 2 and the latest message as authorization to draft it.”
The updated probe instead retained `scope_status=pending` and
`outline_status=not_started` after its first response. After the operator's
analysis approval, it retained `outline_status=pending`. These are observations
from returned responses in this task, not fabricated Pi transcripts.

The two full-suite failures are in
`tests/architecture/evidence-portability.test.mjs`: retained tests/evidence must
be committable, while the repository's existing `.gitignore` excludes `tests/`
and `*.test.mjs`. The ignore file and failing test were not changed. New local
tests likewise remain ignored, consistent with that policy. The packaged Pi
trial is retained under `adapters/pi/criterion-trial.md` and included in the build.

## Native UI evidence and remaining runtime check

Read-only inspection of the installed `agent-runtime/sidecar.js` found native
`ASK_TOOL_NAME = "asktool"`, its `questions` schema and sequential execution,
the `asktool_request` event, and null/empty-answer handling. Inspection of the
desktop renderer in `app.asar` found the question card and the labels shown in
the user's screenshot. `AskUserQuestion` occurred in a provider compatibility
list; it was not the actual native declaration used for this adapter.

This establishes the mapping, not an end-to-end call from the updated plugin.
No Pi session was controlled or answered on the user's behalf. Fresh Pi runtime
acceptance, including visible cards at both gates, remains to be run using the
packaged trial. An instruction-only package cannot guarantee every model obeys.

## Installable output

Use the final build, not the earlier intermediate `dist/pi-0.1.2` build:

`dist/pi-0.1.2-native-questions/local.workspace-superpowers-0.1.2.piplug`

The archive contains 23 skills and 67 files, 359424 bytes. Build verification
reopened the archive, checked its CRC, and compared every packaged byte with the
unpacked copy. SHA-256:

`dbc0308722b70afa678bd8eea1105d3056a27eb71f77915cfa482caf17462521`

Update the plugin using Pi's Plugins page. Replace the existing marked bootstrap
block with the final build's `adapters/pi/bootstrap.md`, preserving other project
instructions. Start a fresh Pi conversation and use `criterion-trial.md`. The
installed plugin, project instructions outside this repository and existing
conversations were not modified automatically.
