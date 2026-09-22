# First real-world trial

Status: PENDING until executed in PI-Desktop with retained evidence.

Copy this `dogfood` directory to a fresh working folder, open it as the project,
and install/enable the package first. The supplied `AGENTS.md` activates routing.
Place a copy of your real document in `input/`. Select a document you can inspect
yourself; preserve its original separately. Record the input filename, plugin
version, PI-Desktop version, model, date, and available artifact tools.

## D01 — Discovery and automatic routing

Send this ordinary request, replacing the filename:

> Read input/source.pdf. Summarize its purpose, main claims, and evidence limits.
> Then propose an outline for a short analytical report based on this document.
> Use English for the deliverable. Stop after the outline; do not draft the report.

Check the actual tool trace: the workspace router should load automatically,
followed by applicable reading/analysis/planning skills. The agent must read the
real file, preserve the outline-only boundary, and identify unreadable pages or
missing metadata. A statement that it used a skill is insufficient without a
corresponding retained tool trace.

## D02 — Draft, citations, and final file verification

Review the outline and provide concrete corrections. Once it is acceptable:

> I approve this outline and authorize drafting. Write the complete report using
> only the supplied source and verifiable metadata. Use APA citations. Do not
> invent missing authors, dates, page numbers, studies, or measurements. Export
> the report to output/report.docx, reopen it, and inspect content and layout.
> Report any missing capability or incomplete verification explicitly.

Use IEEE instead of APA if that is the convention you want to test. For a
Vietnamese deliverable, explicitly request Vietnamese. If DOCX export is
unavailable, record BLOCKED for DOCX and choose a limited alternative explicitly;
do not mark the original output requirement PASS.

Check each citation against the input. Open the DOCX yourself. Inspect heading
order, tables, page breaks, fonts, and the reference list. Preserve a PDF or page
images when available, alongside the original editable output.

## D03 — Continuity

While the outline is pending, ask a short side question about APA versus IEEE.
Then supply one correction or an additional source and continue. The system
should answer the side question, read the new input, retain unaffected choices,
and resume at the authorized stage. An unrelated reply is not outline approval.

## D04 — Optional presentation

> Turn the verified report into a six-slide presentation for a general audience.
> Preserve its evidence limits and source references. Export output/summary.pptx
> and inspect rendered slides for clipping and readability.

Check the real PPTX, slide geometry, text overflow, citation legibility, and
consistency with the report. Record missing presentation tools as BLOCKED.

## Trial record

Run the [per-message routing trial](routing-trial.md) for side questions, new
evidence, temporary switches, cancellation and approval reuse. Retain native
router and specialist calls on each applicable turn.

Run the [criterion workflow trial](criterion-trial.md) for the master-outline/P1
regression and separate analysis/outline stops. This is additional acceptance,
not implied by D01's explicit outline-only request.

| Case | Result | Evidence path / issue |
|---|---|---|
| D01 Discovery and routing | PENDING | |
| D02 Report, citations, DOCX verification | PENDING | |
| D03 Multi-turn continuity | PENDING | |
| D04 Optional PPTX | PENDING | |

Use PASS, FAIL, BLOCKED, or PENDING. Keep an unedited conversation/tool trace and
the actual final files. Packaging tests prove file integrity and compatibility
checks; they do not replace these real-world observations.
