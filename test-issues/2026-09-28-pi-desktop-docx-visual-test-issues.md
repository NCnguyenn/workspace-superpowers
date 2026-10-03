# PI-Desktop DOCX read-back and visual-inspection test issues — 28 September 2026

- **Recorded on:** 28 September 2026 (2026-09-28), Asia/Bangkok (UTC+07:00)
- **Package under test:** `workspace-superpowers` `0.1.6-beta`
- **Host runtime:** PI-Desktop version and native tool trace were not supplied in the pasted result; native runtime acceptance remains **PENDING**.
- **Source artifact:** `D:\BTEC\WDD1\Document\BC00560_NguyenNC_Assignment_Part1_Revised_Final_Concise_D2_P7_Rebuilt.docx`
- **Source identity checked:** 56,411,594 bytes; SHA-256 `a0a10c8b750caf2f19ac3ae867581bf91991a1276278f7cf2fb0d50a9f1537a4`.
- **Scope:** two separate cases in one file. Case A is the Vietnamese assignment read-back and Figures 95–97. Case B, recorded later in this file at the user's request, is the SDLC outline test. Case B does not change any Case A status. This record does not modify the source DOCX, plugin source, package manifest or installed PI-Desktop state.
- **Latest checkpoint, Case A:** second recheck addendum below, 28 September 2026. Paragraph locators and the COSRX title ellipsis are corrected. T04 remains **FAIL** because the claimed complete card transcription omits a visible line. T05 remains **FAIL** because a DPR hypothetical and an incomplete Figure 95 breakpoint list remain. T06–T08 remain **PENDING**. Earlier Case A sections preserve historical findings, not the latest Case A status.
- **Latest checkpoint, Case B:** SDLC outline section at the end of this file. The outline is a topic list, not a 30–40% argument outline. A promised diagram and a promised RACI table were not shown. Absence of a downloaded Google image is not a defect.

## Initial-run result (history)

The first read-back was broadly useful for identifying the assignment structure, the Fashion E-commerce/Aura Skin/Lumenora project thread and the difference between projected SEO values and missing independent measurements. The visual-inspection response correctly identified the broad content of the three figures and the PNG dimensions.

The visual-inspection response is **FAIL for factual precision and evidence-boundary handling**. The following claims must be corrected before this test can be marked PASS:

1. The three DOCX relationship IDs were reported incorrectly.
2. The Figure 97 product brand was misread.
3. A displayed `$0` price was treated as proof of a local database and authentic runtime data.
4. Raster dimensions were treated as proof of an iPhone model and a CSS viewport.
5. Two screenshots were treated as proof that the particular CSS snippet had executed.
6. Image readability at original size was treated as proof that the figure satisfies D2/P7 in the rendered Word document.
7. The read-back sometimes presented claims written in the assignment as independently established results.
8. The pasted response contains no native PI `Skill`/image-tool trace, so it cannot independently establish that PI-Desktop performed the visual inspection.

## Evidence baseline

The supplied DOCX was opened as an OOXML package and the three referenced media files were extracted and previewed. The actual relationships are:

| Figure | Caption paragraph | Image paragraph | Actual `r:embed` | Actual relationship target | PNG dimensions | SHA-256 of media |
|---|---:|---:|---|---|---:|---|
| Figure 95 | `word/document.xml` paragraph 1568 | paragraph 1567 | `rId182` | `media/image165.png` | 1800 × 1200 | `2507fe59537f3008eb5988ab44e5c10f134602c97e25e00aa9cf959c39c42b2e` |
| Figure 96 | `word/document.xml` paragraph 1571 | paragraph 1570 | `rId183` | `media/image166.png` | 1440 × 884 | `4e8ee60e0d626736c4252886304d0dffa642498286fd17db78ee8c3dad8889b3` |
| Figure 97 | `word/document.xml` paragraph 1574 | paragraph 1573 | `rId184` | `media/image167.png` | 390 × 754 | `433f780ea62e489f21613b8f4e381c3c12a88d16390996584ab9c761c547ef95` |

The copied DOCX path used by the PI scratch session had the same source SHA-256, so the relationship mismatch is not explained by a different source revision.

The baseline table uses **1-based positions among all descendant `w:p` elements** in `word/document.xml`, including paragraphs nested in tables. The recheck addendum reconciles this with the follow-up response's different numbering.

## Initial-run issue register (history)

### VIS-001 — Incorrect DOCX relationship IDs (Critical)

- **Observed claim:** The response states `image165.png` is linked through `rId165`, `image166.png` through `rId166`, and `image167.png` through `rId167`.
- **Observed source:** The response is in the supplied visual-inspection result, lines 4, 25 and 43.
- **Checked fact:** The live `document.xml` links are `rId182`, `rId183` and `rId184`, respectively. The target names are `media/image165.png`, `media/image166.png` and `media/image167.png`.
- **Impact:** A reviewer cannot reproduce the stated evidence locator from the response. A media filename is not a relationship ID; the two must not be conflated.
- **Required correction:** Resolve the chain `caption/image paragraph → r:embed → document.xml.rels → media target` and report the actual IDs shown in the evidence baseline.
- **Status:** **FAIL**.

### VIS-002 — Figure 97 product brand misread (Critical)

- **Observed claim:** The Figure 97 description calls the upper-right product “ROUND LAB” and describes it as a Round Lab Birch product.
- **Checked fact:** In the opened image, the upper-right card is labeled **LANEIGE** and the visible product text begins `LANEIGE Birch Moisturizing...`; the visible price is `$15`.
- **Other visible cards:** The upper-left card is Round Lab and shows `$45`; the lower-left card is COSRX and shows `$38.50`; the lower-right card is SKIN1004 and shows `$0`.
- **Impact:** The report attributes a product to the wrong brand. This is a direct visual-reading error.
- **Required correction:** Transcribe only the visible labels, retaining an ellipsis where the screenshot truncates text. Do not complete a product name from outside the image.
- **Status:** **FAIL**.

### VIS-003 — `$0` treated as proof of database authenticity (Critical)

- **Observed claim:** The response says the `$0` card “reflects the authenticity of real data running on the local database.”
- **Checked fact:** The screenshot establishes only that the rendered image contains a card displaying `$0`.
- **Missing evidence:** No database query, application log, source-to-screen data trace, runtime environment record or browser inspection was supplied.
- **Impact:** The response turns a visible UI value into an unsupported empirical/runtime claim.
- **Required correction:** Replace the statement with: “The screenshot displays a product card with a visible `$0` price. The source of that value and the database/runtime state are not verified by this image alone.”
- **Status:** **FAIL**.

### VIS-004 — Raster width treated as device and CSS viewport identity (Critical)

- **Observed claim:** The 390-pixel image width is said to “reflect exactly” an iPhone 12/13/14 CSS viewport; the 1440-pixel image is described as a standard 1440-pixel desktop viewport.
- **Checked fact:** The media files are 390 × 754 and 1440 × 884 raster images. Image dimensions alone do not identify the device, browser, device-pixel ratio, CSS viewport, zoom, crop, export scale or screenshot method.
- **Impact:** The response reports an unverified capture condition as an observed fact.
- **Required correction:** State only the raster dimensions. Assert a CSS viewport or device model only when a browser capture configuration, device emulation record, screenshot metadata or equivalent trace is available.
- **Status:** **FAIL**.

### VIS-005 — Screenshot compatibility treated as proof of CSS execution (Critical)

- **Observed claim:** Figure 97 is called direct proof that the CSS in Figure 95 executed successfully and automatically changed the grid to two columns.
- **Checked fact:** Figure 95 visibly contains CSS rules, and Figure 97 visibly contains a two-column layout. This demonstrates compatibility between the code shown and the layout shown; it does not prove that this exact code revision was loaded and applied in the captured browser session.
- **Missing evidence:** Browser/runtime trace, computed-style capture, source revision linkage, network/resource record or controlled resize sequence.
- **Required correction:** Use bounded wording: “The two-column layout in Figure 97 is consistent with the responsive rule shown in Figure 95.” Treat actual execution as unverified until runtime evidence is retained.
- **Status:** **FAIL**.

### VIS-006 — Original-image clarity treated as D2/P7 acceptance (Important)

- **Observed claim:** The response marks the three images `VERIFIED`, `Đạt` and “high-value evidence” for D2/P7 solely from opening the extracted PNGs.
- **Checked fact:** The original PNGs are readable at the inspected resolution. Figure 95 also has substantial blank space, with the code concentrated on the left. The response did not inspect the figure at its rendered size inside the DOCX or an exported PDF.
- **Impact:** Original-image readability is not the same as readability after Word layout scaling, nor does it establish that the visual satisfies every D2/P7 requirement.
- **Required correction:** Separate three judgements: (a) media file opens, (b) content is legible in the original PNG, and (c) content is legible and sufficient at the final document/PDF size. The third judgement requires rendered-document inspection and criterion mapping.
- **Status:** **FAIL / RETEST REQUIRED**.

### READ-001 — Assignment claims presented as independently verified results (Important)

- **Observed claim:** The first read-back says that the 25 P7 test cases have actual results, all are Pass and each is supported by 25 screenshots; it also describes D2 code screenshots as evidence.
- **Checked fact:** The DOCX contains those written claims and embedded media, but a text read-back alone does not independently validate the website execution, each screenshot’s content, the date of execution or the source code shown in each image.
- **Impact:** The response partially collapses “the assignment states X” and “X was independently verified.” This is especially risky because the same response later acknowledges that embedded images, live execution and performance measurements cannot be independently verified from text alone.
- **Required correction:** Use provenance labels consistently:
  - “The assignment reports 25 test cases marked Pass.”
  - “The DOCX contains visual-evidence items associated with those cases.”
  - “Independent execution and screenshot-to-test-case validation were not performed in this read-back.”
- **Status:** **FAIL / WORDING AND EVIDENCE-BOUNDARY FIX REQUIRED**.

### READ-002 — Implementation claims need source/runtime provenance (Important)

- **Observed claim:** The read-back describes the Lumenora website as a completed real system and names PHP 8.3, MySQL, `normalizeCartItems()`, `cart-quote-api.php`, `checkout_service.php`, `db.php` and `.ec-shop-*` as implemented results.
- **Checked fact:** These details are present in the assignment narrative and captions. The source repository, runtime, database and complete code files were not supplied as part of this test.
- **Required correction:** Preserve the useful summary but prefix it with “the document reports” or “the document describes.” Reserve “verified implementation” for claims supported by the actual source/runtime evidence.
- **Status:** **IMPORTANT IMPROVEMENT**.

### VIS-007 — Native PI tool trace is absent (Important / Acceptance Pending)

- **Observed condition:** The pasted visual-inspection result contains conclusions but no retained native `Skill` calls, image inspection tool calls, returned tool results or timestamps from PI-Desktop.
- **Impact:** The result can be reviewed for factual accuracy, but it cannot prove that the installed `0.1.6-beta` plugin routed the request through its native workspace router and visual specialist.
- **Required correction:** Retain the unedited PI transcript/tool trace. For this operation, expect the router followed by the relevant reading/analysis/visual skills. Do not treat a statement such as “đã kiểm tra trực quan độc lập” as a substitute for a tool trace.
- **Status:** **PENDING** for runtime acceptance; the evidence record is incomplete.

### VIS-008 — Duplicate figure-title prefix in response (Minor)

- **Observed claim:** The response headings begin `Figure 95: Figure 95: ...`, and the same duplication appears for Figures 96 and 97.
- **Impact:** This is a presentation defect and makes the report look mechanically assembled, although it does not change the image facts.
- **Required correction:** Render each caption title once.
- **Status:** **MINOR / FIX RECOMMENDED**.

## Initial-run test status matrix (history)

| Test | Scope | Result | Reason |
|---|---|---|---|
| T01 | Read-back of completed assignment in Vietnamese | **PASS WITH LIMITS** | Structure and project thread were useful; claims derived only from the DOCX must remain document-reported unless independently checked. |
| T02 | Extract/open Figures 95–97 and inspect dimensions | **PASS** | The three PNGs exist, open and have the dimensions recorded in the evidence baseline. |
| T03 | Reproduce DOCX media relationship locators | **FAIL** | All three reported `rId` values were wrong. |
| T04 | Read visible Figure 97 product labels | **FAIL** | The upper-right brand was reported as Round Lab instead of LANEIGE. |
| T05 | Keep image conclusions within evidence limits | **FAIL** | `$0`, viewport/device identity and CSS execution were overclaimed. |
| T06 | Verify evidence at rendered Word/PDF size | **PENDING** | Original PNGs were inspected; the rendered document/PDF was not inspected in this test. |
| T07 | Verify PI-Desktop native routing/tool execution | **PENDING** | The pasted response contains no native tool trace. |
| T08 | Validate the assignment’s 25 test cases against the live website | **PENDING** | No website runtime, source project or independent execution log was supplied. |

## Required upgrade actions

1. Add a reusable evidence-boundary rule to the visual inspection path: visible pixels establish visible pixels; they do not establish data provenance, runtime execution, device identity or test success without linked evidence.
2. Require relationship-aware DOCX evidence locators. A media filename must always be accompanied by the actual `r:embed` ID and its resolved relationship target.
3. Require exact visible-text transcription for screenshots, with ellipses for cropped labels and no inferred brand/product completion.
4. Separate `media opened`, `original image legible`, `rendered document legible`, `supports a claim` and `criterion satisfied` into independent statuses.
5. Add an explicit provenance field to read-back findings: `document-stated`, `visually-observed`, `source-inspected`, `runtime-observed`, or `unverified`.
6. Do not mark native PI acceptance PASS until the unedited PI transcript retains the router/specialist calls and their returned results.
7. Re-run the visual case after the response is corrected, then inspect the figures in the DOCX/PDF at their actual page size.

## Corrected wording for the three figures

- **Figure 95:** The extracted PNG contains a CSS snippet showing four-column, three-column and two-column grid rules plus a one-column hero breakpoint. The code is legible in the original PNG. Whether this is the exact deployed source revision is not established by the image alone.
- **Figure 96:** The extracted PNG shows the Shop All interface with a visible four-column product grid in the inspected image. The raster is 1440 × 884; the capture device and CSS viewport are not independently established.
- **Figure 97:** The extracted PNG shows a mobile-sized presentation with two visible product columns. The raster is 390 × 754. Visible labels include Round Lab, LANEIGE, COSRX and SKIN1004; the upper-right card is LANEIGE. The layout is consistent with Figure 95, but CSS execution and data provenance are not proven by the screenshot alone.

## Closure rule

This issue record is complete as a record of the current failures and gaps. It must not be marked resolved merely because the response is rewritten. Closure requires a fresh PI-Desktop trace, corrected relationship and label transcription, bounded evidence language, and rendered DOCX/PDF inspection where the result claims final-document readability.

## Recheck addendum — 28 September 2026

The supplied follow-up result was compared again with the unchanged DOCX. The source still has 56,411,594 bytes and SHA-256 `a0a10c8b750caf2f19ac3ae867581bf91991a1276278f7cf2fb0d50a9f1537a4`.

- **Response reviewed:** [follow-up pasted response](<C:/Users/CHI NGUYEN/.codex/attachments/c25578eb-f753-4d30-bb1f-5b7428f72168/Pasted text.txt>), all 130 lines. Line references below refer to that file.
- **Independent checks:** ZIP/XML inspection, PNG header/byte/hash inspection, and direct preview of Figure 97 in Codex. These corroborate the output facts; they do not establish what PI-Desktop executed. The exact `wp:extent` and `wp:docPr` values quoted in lines 22–43 also match the DOCX.
- **Issue identity:** VIS-010 continues VIS-004, VIS-011 continues VIS-007, and VIS-012 continues VIS-006. They record follow-up observations of existing defects/gaps and should not be counted as three additional distinct root causes. No plugin repair is claimed.

### XML locator reconciliation

The relationship chain in the follow-up result is correct:

| Figure | Image `r:embed` | Relationship target | PNG dimensions | Media SHA-256 |
|---|---|---|---:|---|
| Figure 95 | `rId182` | `media/image165.png` | 1800 × 1200 | `2507fe59537f3008eb5988ab44e5c10f134602c97e25e00aa9cf959c39c42b2e` |
| Figure 96 | `rId183` | `media/image166.png` | 1440 × 884 | `4e8ee60e0d626736c4252886304d0dffa642498286fd17db78ee8c3dad8889b3` |
| Figure 97 | `rId184` | `media/image167.png` | 390 × 754 | `433f780ea62e489f21613b8f4e381c3c12a88d16390996584ab9c761c547ef95` |

The paragraph numbers are two valid indexing schemes and must not be compared as if they were the same locator:

- The follow-up's indexes match **0-based indexes over direct `w:body` child paragraphs**: image/caption pairs `1006/1007`, `1009/1010` and `1012/1013`. This reproduces the numbers without proving which extraction method PI actually ran.
- The earlier evidence baseline uses **1-based indexes over all descendant `w:p` elements in document order**: image/caption pairs `1567/1568`, `1570/1571` and `1573/1574`.

This is a locator-documentation issue, not a relationship-target mismatch. Future output must state the counting scope and whether the index is 0-based or 1-based.

### Exact Figure 97 text recheck

The opened `image167.png` confirms these visible brand/name/price pairs:

- Round Lab — `Bamboo Ultra...` — `$45`
- LANEIGE — `Birch Moisturizing...` — `$15`
- COSRX — `Mugwort Calming Cream` — `$38.50`
- SKIN1004 — `Real Centella Cica...` — `$0`

The COSRX title is visible on two lines and does **not** show a trailing ellipsis. The follow-up result's `Mugwort Calming Cream...` therefore adds punctuation that is not visible and remains an exact-transcription failure.

### Residual issues in the follow-up result

#### XML-001 — Paragraph-index convention is unstated (Minor / reproducibility)

- **Response locators:** lines 20–21, 30–31 and 40–41. The original evidence baseline also omitted its counting convention; it is clarified above.
- **Finding:** `1006/1007`, `1009/1010`, `1012/1013` are correct only under the direct-body, 0-based convention; `1567/1568`, `1570/1571`, `1573/1574` are correct under the all-descendant, 1-based convention.
- **Required action:** Include the counting scope and base in every paragraph locator. Keep the `rId` → relationship target chain as the primary reproducible locator.
- **Status:** **IMPROVEMENT REQUIRED**.

#### VIS-009 — COSRX title incorrectly given a trailing ellipsis (Important)

- **Response locator:** line 67.
- **Finding:** The follow-up transcribes `Mugwort Calming Cream...`, but the opened pixels show `Mugwort Calming Cream` with no final `…`.
- **Impact:** The result still violates its own instruction to preserve only punctuation that is visibly cropped.
- **Required action:** Report `Mugwort Calming Cream` without an ellipsis; retain ellipses only for visibly truncated strings such as `Bamboo Ultra...`, `Birch Moisturizing...` and `Real Centella Cica...`.
- **Status:** **FAIL / RETEST REQUIRED**.

#### VIS-010 — Raster width still described as a viewport width (Critical; continuation of VIS-004)

- **Response locator:** line 83.
- **Finding:** The follow-up correctly removes certainty about an iPhone, but says that the 390 × 754 raster “corresponds to” a 390 px viewport. A PNG width alone does not establish CSS viewport, device emulation, browser zoom, crop or export scale.
- **Required action:** State only `390 × 754 px`; mark the CSS viewport and capture setup unverified unless a browser/device trace is retained. Do not replace an unsupported device assertion with an unsupported probability claim about Device Mode or automation.
- **Status:** **FAIL / RETEST REQUIRED**.

#### VIS-011 — PIL/OpenCV execution is asserted without a supplied trace (Important; continuation of VIS-007)

- **Response locator:** line 94.
- **Finding:** The follow-up says all media opened through PIL and OpenCV, but provides no command output, returned tool result, timestamp or PI-Desktop native trace for those operations.
- **Impact:** The image facts can be checked from the media, but the claimed tool provenance and native acceptance cannot be established from the pasted result.
- **Limit:** The missing supplied trace does not prove that PI failed to run those tools or that a trace is not retained elsewhere.
- **Required action:** Preserve the unedited PI transcript and native `Skill`/image-tool results; otherwise label the tool execution unverified.
- **Status:** **PENDING / NATIVE ACCEPTANCE NOT ESTABLISHED**.

#### VIS-012 — XML physical size is used to predict rendered readability (Important; continuation of VIS-006)

- **Response locators:** lines 89–91 and 128.
- **Finding:** XML size calculations can indicate a readability risk, but line 91 goes further and asserts that Figure 97 text will be “hầu như không thể đọc được”. Line 128 then explicitly admits that the actual Word page was not inspected. Neither the calculated Figure 95 text width nor the Figure 97 image width establishes actual rendered readability.
- **Required action:** Report the XML dimensions and a possible readability risk; keep actual readability unverified until the DOCX/PDF is rendered and inspected at page size. Original-PNG legibility alone also does not establish D2/P7 sufficiency.
- **Status:** **PENDING / RENDERED CHECK REQUIRED**.

### Recheck status matrix

| Test | Recheck disposition | Remaining condition |
|---|---|---|
| T01 | PASS WITH LIMITS | Keep document-stated claims separate from independent verification. |
| T02 | PASS for media existence, opening and dimensions | This does not establish PI-native routing. |
| T03 | PASS WITH LIMITS (response facts) | Relationship IDs/targets and paragraph positions are reproduced; counting scope/base must be stated. PI execution remains T07. |
| T04 | FAIL | LANEIGE is corrected, but the COSRX title still has an invented trailing ellipsis. |
| T05 | FAIL / PARTIAL CORRECTION | Database, device-model and CSS-execution certainty was removed; viewport width and rendered readability still exceed the supplied evidence. |
| T06 | PENDING | No rendered Word/PDF inspection was supplied. |
| T07 | PENDING | No native PI `Skill`/image-tool trace was supplied. |
| T08 | PENDING | No live website, source project or independent execution log was supplied. |

The historical failures above remain recorded; the corrected relationship chain and LANEIGE identification do not close the issue record. Closure still requires a fresh native PI trace, exact Figure 97 transcription, bounded viewport wording and rendered-document inspection.

## Second recheck addendum — 28 September 2026

A later PI-Desktop answer was compared with the same unchanged DOCX and with the extracted Figures 95 and 97. This addendum does not modify the source DOCX, plugin source, package manifest or installed PI-Desktop state, and it does not claim a plugin repair.

- **Prompt reviewed:** [five-point recheck prompt](<C:/Users/CHI NGUYEN/.pi-desktop/scratch/abf7de59-8542-4b41-be72-6ab14b0ad74b/pasted/pasted-1b85da40-0033-4f18-bf82-f6abe1e57a7e-pasted-text-b85a0ae5.txt>), 21 lines.
- **Response reviewed:** [pasted answer](<C:/Users/CHI NGUYEN/.pi-desktop/scratch/abf7de59-8542-4b41-be72-6ab14b0ad74b/pasted/pasted-328743e4-2ae7-46d6-b71b-f3790ec675e8-pasted-text-3f82db53.txt>), 107 lines. Line references below refer to that file.
- **Source identity:** still 56,411,594 bytes; SHA-256 `a0a10c8b750caf2f19ac3ae867581bf91991a1276278f7cf2fb0d50a9f1537a4`.
- **Independent checks:** OOXML relationship, paragraph-count, `wp:extent` and `wp:docPr` inspection; PNG IHDR, byte size and SHA-256; direct preview of the Figure 97 lower-left card and the top of `image165.png`; pixel-glyph inspection of the COSRX volume line. Windows OCR of the three Figure 95 slices is supporting evidence only. These checks corroborate or contradict the pasted facts. They do not establish what PI-Desktop executed.

The following response facts match the DOCX and are not new failures: `rId182`–`rId184`; targets `media/image165.png`, `media/image166.png` and `media/image167.png`; captions `Figure 95: Responsive CSS rules for the User Shop`, `Figure 96: User Shop at the desktop viewport` and `Figure 97: User Shop at the mobile viewport`; direct-body count 1,183 and all-descendant count 2,026; both paragraph-index conventions in the response table and trace block; `wp:docPr` ids `2105063254`–`2105063256` and the quoted `wp:extent` values; PNG dimensions and byte sizes 29,371, 1,343,347 and 264,138. The earlier media SHA-256 values also still match. Inch figures are the EMU extents divided by 914,400 and rounded to two decimals. They are XML layout extents, not a rendered-page measurement.

### Corrections in this answer

- The COSRX product-title lines match the opened image: `COSRX Mugwort` and `Calming Cream`, with no trailing ellipsis or period. The earlier shorthand `Mugwort Calming Cream` omitted the repeated `COSRX` on the first title line. VIS-009's invented title ellipsis is not repeated.
- The first subtitle line `Artemisia Vulgaris (Mugwort...` is consistent with the opened pixels, including a trailing ellipsis on that line. That ellipsis is not the VIS-009 defect.
- The conclusion in line 21 no longer asserts that the 390-pixel PNG width is the CSS viewport or that the capture is a real phone.
- Lines 35–37 withdraw the earlier claim that Figure 97 text is practically unreadable, and they keep rendered readability unverified. That meets the wording required for VIS-012. It does not complete T06.
- Database authenticity, iPhone identity and CSS-execution certainty are not reasserted.
- Paragraph counting scope and 0-based versus 1-based indexes are stated and reproduce both earlier conventions. XML-001's missing-convention defect is corrected in this answer.

### Residual issues in this answer

#### VIS-013 — COSRX card transcription is still incomplete (Important)

- **Response locators:** lines 4–12 and 97. Line 4 says every visible line from top to bottom was copied verbatim. Line 97 marks that transcription corrected.
- **Checked fact:** The title lines are exact. Below the subtitle, the PNG contains a dark circular control at about x=32–75, y=678–721, color near `(28, 26, 23)`. To its right, a separate visible line reads `Z (80ML).` The rating row is partly covered by that control; more than one star-shaped mark and `(342)` remain visible to the right. The price `$38.50` matches.
- **Finding:** The answer omits `Z (80ML).` and reduces the rating row to a single `★ (342)` without noting the control or the covered portion. The pixel log at lines 90–94 stops at y=678 and does not record the ink from y=679–721.
- **Impact:** The product-title ellipsis is fixed, but the answer's own completeness claim is still false. Exact visible-text transcription is not closed.
- **Required action:** Transcribe every visible line in the card, including `Z (80ML).`. State that the dark control hides part of the rating row, and do not reduce the visible marks to one star. Do not mark the transcription corrected while a visible line is missing.
- **Status:** **FAIL / RETEST REQUIRED**. This is a new observation in the exact-transcription family. It is not a repeat of the VIS-009 title ellipsis.

#### VIS-014 — Figure 95 breakpoint list omits a visible rule (Important)

- **Response locator:** line 20.
- **Observed claim:** Figure 95 contains only `@media (max-width: 991.98px)` and `@media (max-width: 767.98px)`, and no 390px breakpoint.
- **Checked fact:** The top of `image165.png` visibly contains `@media (max-width: 1279.98px)` with `grid-template-columns: repeat(3, minmax(0, 1fr));`. Windows OCR of the middle slice also returned `@media (max-width: 991.98px)` and `@media (max-width: 767.98px)`. No 390px breakpoint appeared in the visually inspected top slice or in OCR of the three slices. The lower two slices were not given a second visual pass after the preview tab changed, so absence of 390 below the first slice is OCR-supported only.
- **Impact:** The answer uses an incomplete reading of Figure 95 inside the viewport discussion. The "only these two breakpoints" statement is false even if the separate "no 390px rule" statement is not contradicted by the inspected evidence.
- **Required action:** List every breakpoint visibly present in Figure 95, including `1279.98px`. Do not use an incomplete CSS reading to support a viewport conclusion.
- **Status:** **FAIL / RETEST REQUIRED**.

#### VIS-010 — Raster width is still conditionally treated as a CSS viewport (Important; continuation of VIS-004)

- **Response locators:** lines 17–21.
- **Finding:** Line 21 correctly says there is no direct evidence that the CSS viewport is 390px or that the capture is a real phone. Line 17 still says that if DPR is 1.0, the CSS viewport is 390px, and it uses Retina/iPhone DPR values to convert PNG width into a viewport width.
- **Impact:** A PNG width does not become a CSS viewport merely by assuming DPR. Crop, browser chrome, zoom and export scale remain possible at DPR 1. This replaces a direct assertion with a conditional assertion. It is the same evidence-boundary defect, not a new root cause.
- **Required action:** State only `390 × 754 px` for the raster. Keep DPR, CSS viewport and capture setup unverified. Do not add a hypothetical equivalence.
- **Status:** **FAIL / RETEST REQUIRED**.

#### VIS-015 — Tool results are narrated rather than retained (Important; continuation of VIS-007 / VIS-011)

- **Response locators:** lines 1 and 52–94. The prompt's fifth item required the actual XML, image-preview and tool logs, and forbade recreating a log in prose.
- **Finding:** Section 5 is headed as actual tool output, but the paste contains formatted trace blocks and a pixel narrative. It has no command, timestamp, tool name, returned tool envelope or native PI `Skill` call. Several numbers in those blocks match the DOCX, and the reported y-ranges 609–614, 627–641, 645–659 and 672–678 match ink rows in `image167.png`. Agreement of facts does not turn the narrative into a retained tool result.
- **Limit:** The missing trace in this 107-line paste does not prove that PI-Desktop failed to run tools, or that a trace is not retained elsewhere.
- **Required action:** Paste the unedited tool results. If only the final answer is available, label tool execution unverified instead of presenting a reconstructed log as the run result.
- **Status:** **PENDING / NATIVE ACCEPTANCE NOT ESTABLISHED**. Prompt item 5 is not met by this paste.

#### XML-001 — Thousands separators can be read as decimals (Minor)

- **Response locators:** lines 43 and 47.
- **Finding:** `1.183` and `2.026` are the correct counts 1183 and 2026, but the dot thousands separator is ambiguous in English prose.
- **Required action:** Write `1183` and `2026`, or state the separator. The counting scope and base are otherwise adequate.
- **Status:** **MINOR / FIX RECOMMENDED**. The earlier missing-convention defect is corrected.

#### VIS-016 — Repeated arrow glyphs in the answer (Minor)

- **Response locators:** lines 26–33 and 54–59.
- **Finding:** Extent conversions and the trace heading are interrupted by repeated `→` lines. This is presentation only.
- **Required action:** Render each conversion and heading once.
- **Status:** **MINOR / FIX RECOMMENDED**.

### Second recheck status matrix

| Test | This-answer disposition | Remaining condition |
|---|---|---|
| T01 | Not retested | Keep document-stated claims separate from independent verification. |
| T02 | Not retested | Media existence and dimensions were reproduced again. This does not establish PI-native routing. |
| T03 | PASS for locator facts in this answer | Scope, base, `rId` and target match the DOCX. Use unambiguous count notation. PI execution remains T07. |
| T04 | FAIL / PARTIAL CORRECTION | Title ellipsis is corrected. The claimed complete card transcription still omits `Z (80ML).` and under-specifies the rating row. |
| T05 | FAIL / PARTIAL CORRECTION | The conclusion no longer asserts a 390px viewport. The DPR hypothetical and the incomplete Figure 95 breakpoint list still exceed the evidence. |
| T06 | PENDING | Readability is now stated as a risk, not a measured result. No rendered Word/PDF inspection was supplied. |
| T07 | PENDING | No native PI `Skill`/tool-result envelope was supplied. The formatted log is not a substitute. |
| T08 | Not retested | No live website, source project or independent execution log was supplied. |

VIS-012's unsupported readability certainty is withdrawn in this answer. VIS-009's title ellipsis is not repeated. Neither correction closes the record. Closure still requires a fresh native PI trace, a complete exact Figure 97 transcription, a Figure 95 breakpoint list that includes `1279.98px`, viewport wording with no DPR equivalence, and rendered DOCX/PDF inspection where readability is claimed.

## Separate case — SDLC outline, 28 September 2026

This case is not part of the Figure 95–97 read-back. It does not reopen, correct or close T01–T08 or VIS-001–VIS-016. The filename remains the original Case A name because the operator asked for this finding to be appended to the same file.

- **Package under test:** the same installed `workspace-superpowers` `0.1.6-beta` session. No plugin repair is claimed.
- **Operator prompt:** `Viết giúp mình phần quy trình phát triển website.`
- **Scope question:** PI-Desktop asked which process model to use. The operator selected the standard SDLC option, then said `Được, làm dàn ý đi.` Asking which model was appropriate. It is not a failure.
- **Response reviewed:** [pasted SDLC outline](<C:/Users/CHI NGUYEN/.pi-desktop/scratch/abf7de59-8542-4b41-be72-6ab14b0ad74b/pasted/pasted-f78bbbab-5cc2-4e2f-a0bd-760b67556080-pasted-text-9be45f75.txt>), 47 lines. Line references below refer to that file.
- **Checked against:** the installed `planning-work` rule that an outline shows about 30–40% of the section's argument, and the visual rule that a promised figure or table must be shown in the outline. These checks judge the pasted answer. They do not establish which native skills PI-Desktop loaded.

The answer did stop before drafting and asked whether the outline was acceptable (line 46). That one stop is not a pass for the outline itself.

### OUT-001 — Outline is a topic list, not a 30–40% argument outline (Critical)

- **Response locators:** lines 5–43.
- **Observed form:** numbered headings followed by short labels such as `Khái niệm và tầm quan trọng của việc chuẩn hóa quy trình phát triển website` (line 7) and lists of activities and deliverable names.
- **Required form:** each point states the argument the later paragraph will make, enough to show about 30–40% of that paragraph. The ratio is not a word-count quota. A label of a topic is not that argument.
- **Impact:** approving this outline would approve a table of contents, not the reasoning of the section.
- **Required action:** rewrite each point as the claim, reason and limit the paragraph will use. Do not add technology names to imitate depth.
- **Status:** **FAIL**.

### OUT-002 — A diagram is named but not shown (Important)

- **Response locator:** line 8, `Sơ đồ luồng tổng quan 6 giai đoạn`.
- **Checked fact:** the pasted answer contains no diagram, image, SVG or other visible preview.
- **Not a defect:** the answer did not download an SDLC image from Google. A web search result is not permission to copy an image, and a copied diagram is not project evidence.
- **Actual defect:** once the outline promises a process diagram, the outline must show that diagram. The correct asset is an original explanatory diagram, labeled as explanatory, not a screenshot of a real project.
- **Required action:** show the six-stage flow in the outline, or explicitly record that no diagram is needed. Do not satisfy this item by downloading a Google image.
- **Status:** **FAIL**.

### OUT-003 — A RACI table is named but not shown (Important)

- **Response locators:** lines 44–45.
- **Checked fact:** the answer says a responsibility table will distinguish Project Manager, UI/UX Designer, Frontend Dev, Backend Dev, QA/Tester and Customer/Stakeholder. No table, columns or cells appear.
- **Boundary:** a table is not mandatory merely because the section exists. `Not needed` is a valid decision when it is stated. This answer does not state that decision. It promises a table and then omits it.
- **Required action:** show the table with its columns and supported cells, or state that the table is not needed. Do not leave a named table as a one-sentence description.
- **Status:** **FAIL**.

### OUT-004 — Detailed outline appears before a separate analysis approval (Important)

- **Observed sequence:** after the operator selected SDLC and asked for the outline, the answer gave a scope summary and the detailed outline together. No separate requirement analysis was shown and approved first.
- **Boundary:** the operator's request for an outline does not approve an unseen analysis. The later stop at line 46 does not replace that earlier stop.
- **Required action:** show the requirement analysis and wait. Present the detailed outline only after that analysis is approved or explicitly waived.
- **Status:** **FAIL**.

### OUT-005 — Audience and technology stack are invented (Important)

- **Response locators:** line 3 and lines 20–37.
- **Observed additions:** the audience is expanded to a student project, an internal SOP and a client proposal. The stages name Figma/XD, React/Next.js/Vue, Tailwind CSS, REST/GraphQL, AWS, Google Search Console, Google Analytics and 24/7 launch monitoring.
- **Checked fact:** the operator asked only for the website-development process and then selected standard SDLC. None of those audiences, products or operating commitments was supplied.
- **Required action:** keep the outline to the selected SDLC stages. Ask before adding a project, stack or operating commitment. If an example is authorized, label it as an example.
- **Status:** **FAIL**.

### Case B status

| Item | Result | Remaining condition |
|---|---|---|
| Ask which process model | Not a failure | The model was not stated in the first prompt. |
| Stop before drafting | Partial | Line 46 asks for outline approval. It does not cure OUT-001–OUT-005. |
| Outline depth | **FAIL** | Topic labels are not 30–40% arguments. |
| Diagram | **FAIL** | Named at line 8 and not shown. Do not download a Google image to close this. |
| Table | **FAIL** | RACI is promised and not shown. A table is not otherwise mandatory. |
| Analysis before outline | **FAIL** | The two approvals were collapsed. |
| Native PI skill trace | **PENDING** | This paste contains no unedited `Skill` or tool result. |

Case B remains open. Closing it requires a fresh answer with an approved analysis, an argument-level outline, a visible original diagram or an explicit `Not needed` decision, and a shown table or the same explicit decision. Case A remains on its own checkpoint above.

## Source correction — 28 September 2026, not a retest

The operator asked for the recorded Case A and Case B defects to be corrected in the `0.1.6-beta` source. The correction adds `references/visual-evidence-boundary.md` and tightens outline delivery. It does not change any FAIL or PENDING status above. Those statuses close only after a fresh PI-Desktop answer is checked against the installed package. The package built from this correction is `dist/pi-orchestration-0.1.6-beta-retest/local.workspace-superpowers-0.1.6-beta.piplug`, SHA-256 `d7599d8c38ca4b5a47541f8695d3c99b0541401871b763a0707e3119443a9731`. Installing that archive is still required. This note does not claim that install or a model retest happened.
