# B-campaign live sample (2026-09-20)

Operator: this parent session. Workers: isolated PI-Desktop sessions,
model `ag/gemini-3.8-flash-high` (9Router). Response-level only: completion
payloads contain final text, not skill/tool logs.

HEAD at spawn: `ede40f4` on `codex/adaptive-workflow-continuity`.

| Case | Operator observation |
|---|---|
| B01 | PASS: analyze-only, English, no draft. |
| B02 | PASS with notes: missing CPU evidence; no fabricated results. |
| B03 | PASS: scope + English outline v1, stopped pending. |
| B04 | PASS: outline v2, Expired-token handling, still pending, no draft. |
| B05 | PASS: English login prose on v2, 228 words, no MFA, four-dimension review. |
| B06 | PASS: section 2 only, English, no invented scores. |
| B07 | FAIL: Vietnamese; invented on-call SLA. |
| B08 | PASS: English draft_incomplete, canonical CPU placeholder, no invented numbers. |
| B09 | FAIL: hypothetical numbers used as real operational proof. |
| B10 | PASS with notes: outline-only + visual fields; extra performance topics. |
| B11 | PASS: Vietnamese edit, clichés removed. |
| B12 | PASS: Critical 120→180 ms; findings table; no source rewrite. |
| B13 | PASS both sub-cases: typo-only; heading-only, no report gates. |
| B14a | PASS: missing xlsx disclosed; no report outline. |
| B14b | PASS: missing pptx disclosed; no thesis/report gates. |
| B14c | PASS: missing docx disclosed; no fabricated PDF. |
| B15 | PASS with notes: description kept; expansion used placeholders, no jobs/s. Vietnamese. |
| B16a | PASS with notes: chat-only, no file claim; extra Redis; Vietnamese. |
| B16b | PASS with file evidence: `output/idempotency-note.md` matches source text. |

L01–L06 not run. Not 16/16 behavioral certification. No skill/tool logs in completion payloads.
