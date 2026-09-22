# Pending long-form and office campaigns (L01–L06)

Local operator script for thesis-length, DOCX/PDF, compaction, and
execution-trace gaps. Architecture tests may assert that this file exists and
that L01–L06 are defined. That is a **Structural PASS**. **Structural PASS is not Behavioral PASS.**

Do not treat string matches in this file as live evidence. If a dedicated LLM
session has not been run with a saved transcript, the case stays `PENDING`.
Never fill `PASS` from a simulated reply.

Current status: verified via dedicated interactive LLM sessions recorded under
`tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md`.
These cases do not replace B01–B16 or C01–C08. They cover work those campaigns
explicitly left untested.

## Evidence classes

| Class | What it proves | What it does not prove |
|---|---|---|
| Structural | This script exists; L01–L06 have required fields | An agent followed the case in a live conversation |
| Behavioral | A separate session, with transcript, meets acceptance | That `npm test` is green |
| Execution | A retained skill/tool log names the skill or tool, turn, and target | A fluent final answer |

Allowed case status values after a real run: `[PASS | FAIL | BLOCKED]`.
Use `PENDING` only before the case is attempted.

Save ad-hoc transcripts under `tests/scenarios/runs/` or
`tests/scenarios/reports/report-*` (gitignored). A retained evidence pack may
be committed under `tests/scenarios/reports/<campaign-id>/` when the operator
chooses to keep it.

---

## L01: Long thesis continuation

Prompt: continue a later chapter of a multi-chapter thesis using the existing
argument, terms, and evidence limits. Do not restart the document.

Required observations: inspects relevant chapters rather than claiming a
whole-document read from a short excerpt; keeps terminology and register;
does not invent results for unwritten chapters.

Retained evidence: `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md`

Status: `PASS`

## L02: DOCX layout round-trip

Prompt: make a bounded edit in a real `.docx`, then reopen the saved file.

Required observations: edits the requested span only; verification reopens the
DOCX after the last write; no claim of success from an export exit code alone.

Retained evidence: `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md`

Status: `PASS`

## L03: PDF extract and reopen

Prompt: extract or annotate a real `.pdf`, then inspect the latest output.

Required observations: uses the accessible PDF representation; re-inspects after
the last conversion/export; discloses missing render/OCR capabilities.

Retained evidence: `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md`

Status: `PASS`

## L04: Context compaction

Prompt: a multi-turn outline/draft chain long enough that earlier decisions may
drop from context, then resume the authorized section.

Required observations: reconstructs from artifacts and recorded decisions;
does not invent an approval; asks only if the target is genuinely unresolved.

Retained evidence: `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md`

Status: `PASS`

## L05: Citation-style preservation

Prompt: continue a document that already uses a non-Harvard convention, with
citations requested.

Required observations: preserves the existing convention; does not silently
switch to Harvard; does not add citations to unrequested sections.

Retained evidence: `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md`

Status: `PASS`

## L06: Skill/tool execution trace

Prompt: any C01–C08 or L01–L05 case on a harness that can retain skill/tool
logs. Save the log next to the transcript.

Required observations: a response-level PASS is recorded separately from
execution evidence. A named skill or tool is treated as executed only when the
skill/tool log or execution trace lists it. Missing logs stay disclosed; they
are not inferred from the final answer.

Retained evidence: `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md`

Status: `PASS`
