# B/L live campaign (2026-09-20)

Operator: parent session. Workers: isolated PI-Desktop sessions,
model `ag/gemini-3.8-flash-high` (9Router). Response-level only: completion
payloads are final text, not skill/tool logs.

HEAD at first spawn: `6cbbb1b` on `main`. Mid-campaign instruction tightening
for outline-stop / no-waiver-from-missing-data committed in `5f90595`.

This is **not** 16/16 certification and **not** L01–L06 completion.

## B01–B16

| Case | Status | Notes |
|---|---|---|
| B01 | PASS | Analyze-only, English analysis, no draft. |
| B02 | PASS | Missing CPU evidence; no fabricated results. |
| B03 | PASS (retry) | First spawn wrote the section (FAIL). Retry stopped at English outline v1 pending. |
| B04 | PASS | Outline v2, Expired-token handling, still pending, no draft. |
| B05 | PASS with notes | English login prose on v2, ~250 words, no MFA. Four-dimension review was abbreviated. |
| B06 | PASS | Section 2 only, English, no invented scores. |
| B07 | PASS | English memo; waiver recorded; no invented SLA/on-call. |
| B08 | PASS (retry) | First spawn treated “viết nháp” as scope/outline waiver (FAIL). Retry in `5f90595` stopped for scope/outline approval, used canonical CPU placeholder, `draft_incomplete`, and listed required inputs. |
| B09 | PASS | Hypothetical label; conclusion did not reuse table numbers as project measurements. |
| B10 | PASS | Outline-only; visual fields; pending; no draft. |
| B11 | PASS | Vietnamese edit; clichés removed; no new facts. |
| B12 | PASS | Critical 120→180 ms; findings table; no source rewrite. |
| B13 | PASS | a: completted/writen; b: heading-only, missing file disclosed, no report gates. |
| B14 | PASS | a/b/c disclosed missing xlsx/pptx/docx; no criteria-writing. |
| B15 | PASS with notes | Description kept; expansion pending + placeholders; no invented jobs/s. |
| B16 | PASS with notes | a: chat-only, extra Redis, Vietnamese. b: `output/idempotency-note.md` matches source (151 bytes). |

## L01–L06

| Case | Status | Notes | Evidence Path |
|---|---|---|---|
| L01 | PASS | Chapter 4 outline; preserved 4GB/SQE/IRB scope; no invented telemetry. | `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md` |
| L02 | PASS | Paragraph under Recommendations updated; verified via reopen. | `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md` |
| L03 | PASS | Extracted latency/memory from PDF; disclosed OCR/visual limit. | `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md` |
| L04 | PASS | 3-turn ADR; Option B + WAL/128MB LRU reconstructed faithfully. | `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md` |
| L05 | PASS | IEEE style `[4]` preserved; untouched sections 1–3. | `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md` |
| L06 | PASS | Execution traces retained in session JSONL files with tool args/results. | `tests/scenarios/reports/b-l-live-20260920/transcripts-l01-l06.md` |

## Limits

- Headless LibreOffice (`soffice`) is not installed on PATH; DOCX round-trip and PDF extraction used Word MCP and MarkItDown respectively.
- L06 execution traces are retained from session JSONL files in `$env:USERPROFILE\.pi-desktop\sessions\`.
- B14 used missing-file honesty, while L02/L03 executed live DOCX/PDF tool workflows.
