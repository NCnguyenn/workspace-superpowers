# Artifact inspection fields

What analysis should record per type. No tool names.

| Artifact | Inspection yields |
|---|---|
| DOCX / DOC / ODT / RTF | Sections, styles, heading hierarchy, tables, images, captions, TOC, references, headers/footers, page setup |
| Word mathematics | Formula/source locators and content; native `oMath` / OMML versus images, plain Unicode or raw LaTeX; inline/display structure, numbering/references and inspection limits under [Equation fidelity](../../../references/math-in-documents.md) |
| PDF | Page count, text layers, tables, figures, embedded fonts, scan vs text |
| PPTX / PPT / ODP | Slide count, layouts, placeholders, themes, charts, images, notes |
| XLSX / XLS / CSV | Sheets, ranges, tables, formulas, references, data types, charts, formatting |
| Markdown / TXT / LaTeX | Structure, headings, links, math, build requirements |
| PNG / JPG / WEBP / TIFF | Dimensions, colour mode, visual content (pixels). Flattened unless layers exist |
| SVG | Vector structure, text elements, viewBox, styling |
| PSD / PSB | Canvas, layer tree, text layers, smart objects — only with layered capability |
| Mixed artifact set | Relationships between artifacts (report ↔ data ↔ deck ↔ figures) |
| Project folder | Observed relevant tree, file roles, source revisions, descriptions versus source/runtime evidence, conflicts and unread regions under [project grounding](../../../references/project-grounding.md) |

Reading raw bytes is not a row in this table.
