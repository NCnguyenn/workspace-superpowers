# Artifact verification criteria

What verification means per type. No tool names. Companion to
`artifact-inspection.md` under `analyzing-artifacts/references/`, which records
what inspection yields for the same types.

| Artifact | Verification means |
|---|---|
| DOCX / DOC / ODT / RTF | File opens; sections, styles, tables and images intact; expected content present; page breaks and layout correct; references/TOC consistent; pages rendered where a render capability exists |
| Word mathematics | Required mathematical content and native `oMath` / OMML survive; inspect rendered layout and edit/save/reopen evidence in the recorded Word environment under [Equation fidelity](../../../references/math-in-documents.md). Counts alone do not pass; unavailable required checks block native Word completion |
| PDF | Page count; renders; text, images and tables present; no clipping; fonts embedded; layout correct. Prefer fixing the source over patching the PDF |
| PPTX / PPT / ODP | File opens; slide count matches; no text overflow; assets and charts present; theme and layout consistent; slides rendered for visual QA |
| XLSX / XLS / CSV | Workbook opens; sheets present; formulas parse and references resolve; data matches expectation; formatting and charts intact; calculated values checked where the capability exists |
| Markdown / TXT / LaTeX | Structure valid; links resolve; LaTeX compiles where the capability exists |
| PNG / JPG / WEBP / TIFF | Dimensions and colour mode match the brief or deliverable contract; where neither states them, record the actual values instead of asserting a pass. Renders; visual QA against intent |
| SVG | Parses; renders; text editable where required; no unintended rasterisation |
| PSD / PSB | Canvas and the expected layers changed; editable structure preserved where a layered capability exists; preview exported. Without a layered capability: report the limitation and the fallback, never claim an editable edit |
| Mixed artifact set | Every artifact verified individually, plus cross-artifact consistency — numbers in prose match the workbook, slides match the report, figures resolve |
| Derived project context | Only the designated Markdown context file changed within survey authority; reread it, confirm source locators/revisions and derived labeling under [project grounding](../../../references/project-grounding.md). The context is not original evidence |

A check that could not be run is reported as not run, with the reason: a missing
capability, or no criterion defined for it.
