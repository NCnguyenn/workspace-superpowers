# Consolidated test issues and implementation record — 23–28 September 2026

- **Compiled on:** 28 September 2026.
- **Record:** `test-issues/2026-09-28-tong-hop-day-du-5-bien-ban.md`.
- **Coverage:** All five source Markdown files listed below: 1,317 source lines and 122,129 original bytes.
- **Purpose:** Provide one navigable record of the reported problems, proposed improvements, implementation decisions, verification results and remaining acceptance work.
- **Preservation:** The complete source records appear below in their original order within each file, with their wording, languages, headings, tables, examples, commands and historical updates retained.
- **Evidence boundary:** Statuses and test results in the overview are reported by the source records. This compilation does not rerun the implementation tests, approve a new revision, establish native runtime behavior or record a release.

## Independent workspace verification update — 28 September 2026

The lines, byte counts and fingerprints in the original source register below
describe the pre-remediation snapshot embedded in this compilation. The two
source issue files were then updated with the S3/S4 blocker remediations. This
addendum is the governing post-integration status; the embedded copies remain
visible as history so that earlier claims are not silently rewritten.

The current workspace still has branch `v0.1.5-beta`, HEAD
`f3dab0ba4c751c3c7b2e8b503d40dc87837cd82b`, and `package.json` version
`0.1.5-beta`. No commit, push, publish, branch/worktree creation, permanent
installation or native PI-Desktop session was performed.

### Current source files after remediation

| Issue | Current lines | Current bytes | Current SHA-256 status |
|---|---:|---:|---|
| S1 | 158 | 13,878 | unchanged historical closure hash |
| S2 | 207 | 18,770 | unchanged historical closure hash |
| S3 | 325 | 24,243 | changed by executable revision-fidelity remediation and native/render audit addendum |
| S4 | 563 | 54,818 | changed by placement/checkpoint remediation and native audit addendum |
| S5 | 238 | 20,406 | unchanged historical closure hash |

Current hashes for the changed records are `57f6531697d114770385c663ef10810f2028e4731279272cbfb1644d90f4a40a` (S3) and
`5282691395ec53aa4ea11cd684abd95efb76d66f66c053791c9d15770cd4b321` (S4).
The preserved closure hashes for S1, S2 and S5 remain respectively
`57837aeff37e5c6c026dab6d081b91631a3c885373076d5b5c93484d04354820`,
`1690f8722668141a529f04cb87aad99a47ce9a34de0da438201663c4db884c32` and
`63795df58879df5f8fce0668c8caf6f64e66197d91515d0340adfe88bf977153`.

### Fresh post-integration verification

These commands were run after both blocker remediations had stabilized. Focused
counts are subsets of the aggregate and are not added to it.

| Command | Result | Exit |
|---|---:|---:|
| `node --test adapters/pi/project-survey.test.mjs tests/architecture/project-tracking-synchronization.test.mjs` | 30/30 PASS | 0 |
| `node --test adapters/pi/revision-export-route.test.mjs tests/architecture/visual-export-citations.test.mjs` | 11/11 PASS | 0 |
| `python -B tests/architecture/word-visual-fidelity.test.py` | 27/27 PASS | 0 |
| `node tests/run.mjs` | 196/196 PASS | 0 |
| `python scripts/test-package-pi.py` | 5/5 PASS | 0 |
| `git diff --check` | pass; only LF/CRLF normalization warnings | 0 |

S3 and S4 are therefore `APPROVED — source/package` for the current working
revision. The synthetic DOCX structural suite is `PASS`; it is executable
OOXML/fixture evidence and does not prove native Word rendering. Native
PI-Desktop replay/transcript/tool trace remains `PENDING`; rendered DOCX/PDF
layout remains `UNVERIFIED`. All five issues are source/package-approved, but
the five issue set cannot be closed as fully verified or described as a complete
system until those native and rendered evidence layers exist.

## Independent native and render acceptance audit — 28 September 2026

All five issue files and this consolidated record were read before the audit.
The current tool catalog exposed no native PI-Desktop `Skill` tool. Codex
Document Control was queried and returned **no connected document sessions**.
`Get-Command pi` and `Get-Command pidesktop` found no executable. The installed
PI registry contains `local.workspace-superpowers` `0.1.4-beta`, scoped to other
projects, while the audited source/package is `0.1.5-beta` for this workspace;
that installation is stale and cannot certify the current revision. Historical
PI JSONL sessions were inspected for the requested case IDs and no qualifying
`BR`, `RB`, `R15`–`R27`, `VE`, `SYNC` or `DC` replay was found. Existing L01–L06
and C01–C08 records are unrelated historical campaigns and explicitly do not
provide the requested native traces.

| Issue | Requested native cases | PASS | FAIL | BLOCKED attempt reason | PENDING native cases | Issue verdict |
|---|---|---:|---:|---:|---:|---|
| S1 | BR01–BR03, R15–R17 | 0 | 0 | 6 | 6 | `APPROVED — source/package`; native `PENDING` |
| S2 | RB01–RB02, R18–R19 | 0 | 0 | 4 | 4 | `APPROVED — source/package`; native `PENDING` |
| S3 | R20–R23, VE01–VE09 (R23 has approved and working variants) | 0 | 0 | 13 IDs / 14 variants | 13 IDs / 14 variants | `APPROVED — source/package`; native `PENDING` |
| S4 | SYNC-01–SYNC-30 | 0 | 0 | 30 | 30 | `APPROVED — source/package`; native `PENDING` |
| S5 | R24–R27, DC01–DC15 | 0 | 0 | 19 | 19 | `APPROVED — source/package`; native `PENDING` |
| **Total** | **72 case IDs / 73 requested variants** | **0** | **0** | **72 IDs / 73 variants** | **72 IDs / 73 variants** | **No native issue closure** |

The attempted runs are capability-blocked, but the case verdict remains
`PENDING` under the evidence policy; they are not behavioral FAIL results and
are not promoted to `BLOCKED` as an issue verdict. No case is promoted to native
PASS from static tests, synthetic fixtures, package archives, old transcripts or
simulated responses. Native case evidence is therefore `PENDING — native
verification` for every issue.

### Render audit

No S3 revision export, S5 continuity report, or other current target DOCX/PDF
was available for a qualifying render. `soffice`, `libreoffice`, `pandoc`,
`mutool`, Ghostscript and ImageMagick were unavailable. Word 16.0 is registered,
but the direct COM activation failed with HRESULT `0x80070520` (“A specified
logon session does not exist”); no hidden worker was used. Python DOCX/PDF layout
modules were unavailable. `pdftoppm` was available and successfully rasterized
the unrelated historical fixture
`tests/scenarios/reports/b-l-live-20260920/fixtures/findings.pdf` (exit 0,
one page, 1241×1754 PNG); Poppler warned about missing `Symbol` and
`ArialUnicode` fonts. The retained preview is
`C:\Users\CHI NGUYEN\.codex\visualizations\2026\09\28\01a0e5af-a58d-75d0-b3b1-680838c0bf08\native-audit-findings-pdf-page-1.png`.
Visual inspection found no clipping or overflow in that unrelated fixture, which
is not evidence for S3/S5. Rendered DOCX/PDF acceptance remains `UNVERIFIED`.

### Current decision

| Issue | Final verdict |
|---|---|
| S1 | `APPROVED — source/package` (native `PENDING — native verification`) |
| S2 | `APPROVED — source/package` (native `PENDING — native verification`) |
| S3 | `APPROVED — source/package` (native `PENDING — native verification`; render `UNVERIFIED`) |
| S4 | `APPROVED — source/package` (native `PENDING — native verification`) |
| S5 | `APPROVED — source/package` (native `PENDING — native verification`; render `UNVERIFIED`) |

No issue qualifies for `CLOSED — fully verified`, and the workspace cannot be
declared fully complete until a fresh session runs the cases with the exact
`0.1.5-beta` package and retains native Skill/tool traces, transcripts, changed
paths and required output/render artifacts.

The overview is a reading aid. For an individual issue, its explicit closure, implementation update or follow-up remediation governs the corresponding older proposal within the scope stated by that record. Historical descriptions remain visible in the complete records; they are not silently rewritten into current facts.

## Contents

- [Source register](#source-register)
- [Latest status reported by each record](#recorded-status)
- [Decision index and historical qualifications](#decision-index)
- [Reported verification results](#reported-verification)
- [Remaining acceptance and limits](#remaining-acceptance)
- [Source fingerprints](#source-fingerprints)
- [S1 — Intake, prose and citation issues](#source-01)
- [S2 — Reading completed work and comparing a later guide](#source-02)
- [S3 — Visuals, tables, Word and citations](#source-03)
- [S4 — Progress tracking and project context](#source-04)
- [S5 — Voice and document continuity](#source-05)

<a id="source-register"></a>

## Source register

| ID / full text | Original file | Main coverage | Source lines |
|---|---|---|---:|
| [S1](#source-01) | [2026-09-23-ghi-nhan-van-de.md](2026-09-23-ghi-nhan-van-de.md) | Intake, questions, brainstorming, analysis, outlines, prose and citations | 158 |
| [S2](#source-02) | [2026-09-24-doc-bai-da-lam.md](2026-09-24-doc-bai-da-lam.md) | Reading completed assignments and identifying remaining criteria | 207 |
| [S3](#source-03) | [2026-09-27-dinh-huong-nang-cap-visuals-tables-word-citations.md](2026-09-27-dinh-huong-nang-cap-visuals-tables-word-citations.md) | Figures, tables, citations and Word export fidelity | 224 |
| [S4](#source-04) | [2026-09-27-theo-doi-tien-do-va-dong-bo-ngu-canh-du-an.md](2026-09-27-theo-doi-tien-do-va-dong-bo-ngu-canh-du-an.md) | Report progress, project context and synchronization | 490 |
| [S5](#source-05) | [2026-09-27-tinh-nhat-quan-van-phong-xung-ho-va-mach-noi-bao-cao.md](2026-09-27-tinh-nhat-quan-van-phong-xung-ho-va-mach-noi-bao-cao.md) | Voice, terminology and continuity between report sections | 238 |

All relative file links retain the same base directory as the originals because this compilation is saved alongside them. Source text is preserved rather than translated; newly added navigation and editorial notes use English.

<a id="recorded-status"></a>

## Latest status reported by each record

| Source | Governing update in that source | Recorded source/package status | Separate limits |
|---|---|---|---|
| [S1](#source-01) | `Closure review — APPROVED`, 27 September 2026 | Seven issues closed at source/package level for v0.1.5-beta. | A real Back control remains a host limitation. Native multi-turn acceptance remains PENDING. The old student outline/Section 1 was not rewritten or reapproved. |
| [S2](#source-02) | `Closure review — APPROVED`, 27 September 2026 | Completed-work read-back and narrow remaining-criteria comparison approved at source/package level. | Native PI-Desktop replay remains PENDING. The original ASM document was not changed or approved by this closure. |
| [S3](#source-03) | `Implemented working revision and evidence — 28 September 2026` | Working source/package implementation APPROVED; synthetic DOCX structural fixture PASS. | Rendered layout UNVERIFIED; native PI-Desktop acceptance PENDING. No independent approval or release is recorded. |
| [S4](#source-04) | `Follow-up remediation — 28 September 2026` | Tracking, placement and checkpoint remediation APPROVED at source/package level after follow-up verification. | Native SYNC cases remain PENDING. No background monitoring or rendered DOCX/PDF verification is established. |
| [S5](#source-05) | `6. Kết quả triển khai và xác minh — 28/09/2026` | Continuity implementation records source/package PASS, with no remaining blocker found within that scope. | Native PI-Desktop and a real rendered DOCX artifact remain PENDING. Fixture and contract tests do not prove coherent model behavior. |

The source records retain the `v0.1.5-beta` branch / `0.1.5-beta` package context. Their approval statements apply to their recorded revisions and scopes; they do not establish a new release or installed-host parity.

<a id="decision-index"></a>

## Decision index and historical qualifications

| Topic | Consolidated reading of the sources | Source |
|---|---|---|
| Initial assignment-guide intake | An opening question about a new guide requires a source-grounded intake map, including obligations, locators, contradictions and unsettled decisions. This is distinct from reading a completed assignment. | [S1](#source-01), [S2](#source-02) |
| Question cards and correction | A skill cannot supply a missing host Back control. Summarize card selections and allow correction in chat before treating them as confirmed. | [S1](#source-01) |
| Document brainstorming | The early missing-skill report is historical. The later record confirms the document skill and integration exist; behavioral acceptance remains separate. Use it for genuine alternatives after evidence is sufficient, preserving the user's choice. | [S1](#source-01), [S4](#source-04) |
| Language, analysis and outline depth | Chat explanation follows the user's current language; authored output follows its selected language. Explain necessary terms in context. The outline previews about 30–40% of substantive content, with the full draft developing the remaining 60–70%; these are qualitative expectations, not word quotas. | [S1](#source-01) |
| Academic prose and review decisions | Avoid replacing analysis with a one-line lead and stacked bullets. Keep appropriate parallel lists. The later clarification treats 4–5 sentences as guidance, not a rigid count or rendered-line quota. Retain separate analysis and detailed-outline approvals and the existing post-draft review/wait; do not add a third gate. | [S1](#source-01), [S3](#source-03), [S5](#source-05) |
| Reading completed work | Preserve exact names, dates and actual headings; explain arguments, conclusions/limits and scenario transitions. Do not invent LO or P/M/D labels, treat projected SEO results as measured experiments, or confuse grading-grid labels with written sections. The recorded example distinguishes the unnamed fashion scenario, Aura Skin trial and later Lumenora design. | [S2](#source-02) |
| Comparing a later guide | Answer the remaining-work question first. In the recorded ASM example, P5, P6, M4, D2 and P7 already have content; M5 and D3 need additional sections. Report specific mismatches separately, including fashion versus cosmetics. Do not substitute completion percentages, optional-to-mandatory claims or invented failed tests. | [S2](#source-02) |
| Visuals and evidence | Later decisions qualify the original universal-visual proposal: select assets from actual requirements or explanatory value; `Not needed` remains valid. Preserve external, original, adapted, project and authorized illustrative provenance. Missing display capability does not mean an unseen asset was reviewed. | [S3](#source-03) |
| Citations | Keep proposed, verified and actually cited sources distinct. References cover actual citations in the delivery scope; do not invent bibliographic metadata. Required or established citation style takes precedence, with Harvard as the fallback. | [S1](#source-01), [S3](#source-03) |
| Word fidelity | Verify the requested revision and its approval status separately from native table cells, embedded image identity, inline drawings, captions/sources, placement and template formatting. An authorized working-draft export does not confer content approval. Synthetic structural PASS is distinct from rendered-layout verification. | [S3](#source-03) |
| Progress and project records | Use at most two management records for sustained work: `work-plan.md` for report progress and `project-context.md` only for an identified, authorized project context. A one-off task does not require tracking. Reuse consent and canonical paths; keep progress, evidence readiness, content approval and verification distinct. | [S4](#source-04) |
| Prompt intent and bounded propagation | Questions, comparisons, hypothetical changes and recommendations do not adopt a design. Clear decisions update only affected work. Intended technology remains separate from observed implementation and historical test evidence. Preserve unaffected decisions and prior revision-scoped approvals. | [S4](#source-04) |
| Placement and recoverable saves | New context records default to the authorized report workspace; a new source-project path needs exact authorization. Check revisions before each write, save/reopen the deliverable, then affected authorized context, then the plan checkpoint; reread touched records. Preserve exact saved/unsaved results after interruption. | [S4](#source-04) |
| Voice and document continuity | Later implementation replaces the original one-term-for-the-entire-document rule with role/context-aware consistency. Preserve distinct real roles, quotations and source terminology. Read relevant prior content, retain established authorial perspective and evidence, and connect the next section at its actual seam. Reuse the existing continuity profile and review responsibilities. | [S5](#source-05), [S4](#source-04) |
| No invented facts or unsupported success | Preserve actual scope, scenario, evidence, revisions and capability limits. Do not invent metrics, modules, test results, figures or acceptance. Source/package checks, fixtures, rendered artifacts and native host behavior are different evidence layers. | [S1](#source-01)–[S5](#source-05) |

<a id="reported-verification"></a>

## Reported verification results

These are historical results transcribed from the records, not checks executed during compilation. Focused suites are subsets where the sources say so; do not add them to aggregate totals or combine totals from different working revisions.

| Source / recorded checkpoint | Aggregate Node suite | Package checks | Other reported checks |
|---|---:|---:|---|
| S1 — 27 September closure | 139/139 PASS | 5/5 PASS | `real-world-refinements`: 14/14 PASS. |
| S2 — 27 September closure | 142/142 PASS | 5/5 PASS | `real-world-refinements`: 17/17 PASS. |
| S3 — 28 September working revision | 148/148 PASS | 5/5 PASS | Visual/export/citation architecture: 6/6; `real-world-refinements`: 17/17; synthetic DOCX structure: 16/16; whitespace check exit 0. |
| S5 — 28 September continuity implementation | 164/164 PASS | 5/5 PASS | Continuity consistency: 16/16; PI adapter unit tests: 10/10; listed regressions and whitespace check pass. |
| S4 — initial 28 September implementation | 176/176 PASS | 5/5 PASS | Focused tracking suite: 12/12 after a recorded 0/12 failing baseline; listed regressions and whitespace check pass. |
| S4 — 28 September follow-up remediation | 178/178 PASS | 5/5 PASS | Focused tracking suite: 14/14; synthetic DOCX structure: 16/16; whitespace check passes. |

Each complete record retains the exact commands, additional subset results, review fixes and verification limits. The largest aggregate above is the latest result in S4's follow-up; it is not a newly verified result for this compilation.

<a id="remaining-acceptance"></a>

## Remaining acceptance and limits

| Area | Evidence still required according to the records |
|---|---|
| Intake, question correction and brainstorming | Actual PI-Desktop multi-turn replay and native traces for `BR01`–`BR03` and `R15`–`R17`; preserve the real host Back-control limitation. |
| Completed-work reading and later-guide comparison | Fresh host replay of the recorded prompts and retained native evidence; later records preserve `R18`/`R19` as PENDING. |
| Visuals, citations and export | Native `R20`–`R23` results and the `VE01`–`VE09` manual scenarios, with actual previews, selected source/output revisions and tool traces. |
| Voice and document continuity | Native `R24`–`R27` and `DC01`–`DC15` evidence; contract and fixture assertions do not replace behavioral review. |
| Tracking and synchronization | Native `SYNC-01`–`SYNC-30` transcripts and tool traces, including intent handling, changed sources, concurrent edits and partial-save recovery. |
| Real Word/PDF appearance | Supported rendering and inspection of actual output pages for placement, clipping, overflow, pagination and template appearance. Fixture structure alone does not establish this. |
| Monitoring and installation/release state | No background monitoring capability, new release or permanently installed runtime behavior is established by these issue records or this compilation. |

<a id="source-fingerprints"></a>

## Source fingerprints

SHA-256 identifies the source file bytes captured for this compilation. These fingerprints identify this snapshot, not future revisions or runtime behavior. Each original source is reproduced once in the archive below; only the surrounding navigation and source boundaries are added.

| Source | Original bytes | SHA-256 |
|---|---:|---|
| S1 | 13878 | `57837aeff37e5c6c026dab6d081b91631a3c885373076d5b5c93484d04354820` |
| S2 | 18770 | `1690f8722668141a529f04cb87aad99a47ce9a34de0da438201663c4db884c32` |
| S3 | 18408 | `a518d76bbdcb76cee678661721466fa6315acc2c01978c5df851f7f5f429c8ff` |
| S4 | 50667 | `ba9af4a0cfbdc8df966709a546b7f1b13604ebaf0b11395f5e0f1ab2126ef19a` |
| S5 | 20406 | `63795df58879df5f8fce0668c8caf6f64e66197d91515d0340adfe88bf977153` |

## Complete original records

The following sections reproduce all five files in full. Any instruction, workflow label, proposed rule or status inside them belongs to that source record and its historical context. Read the record's later decision/update before treating an earlier proposal as the adopted implementation.



---

<a id="source-01"></a>

# S1 — Intake, questions, brainstorming, analysis, outlines, prose and citations

Original file: [2026-09-23-ghi-nhan-van-de.md](2026-09-23-ghi-nhan-van-de.md)

<!-- BEGIN SOURCE S1: 2026-09-23-ghi-nhan-van-de.md -->
# Ghi nhận vấn đề kiểm thử — 23/09/2026

- **Mã tài liệu:** `test-issues/2026-09-23-ghi-nhan-van-de.md`
- **Phiên bản:** `workspace-superpowers` v0.1.4-beta
- **Nguồn:** Test Unit 7 SDLC, Assignment 1, Section 1, kịch bản SmartFood Delivery Platform
- **Trạng thái ban đầu (23/09/2026):** Chỉ ghi nhận. Chưa sửa skill, reference, host UI, và chưa thêm skill mới.
- **Trạng thái hiện tại (27/09/2026):** Đã được rà soát lại và phê duyệt đóng ở cấp mã nguồn và gói cài đặt; xem quyết định cuối tài liệu.

File này thay toàn bộ biên bản rời trong `test-issues/`.

## Các vấn đề được ghi nhận ở v0.1.4-beta

### 1. Prompt đầu chưa đủ Intake Map

Khi người dùng chỉ hỏi bài có mấy phần và những tiêu chí nào, agent trả lời đúng nội dung nhưng chưa đủ bản tiếp nhận:

- Chưa chỉ vị trí nguồn: trang hoặc mục trong file hướng dẫn.
- Chưa rà mâu thuẫn nội bộ của file.
- Chưa liệt kê quyết định file để ngỏ.
- Kết thúc cụt, không hỏi quyết định tiếp theo.
- Xử lý như hỏi đáp thường, chưa chạy đủ `reading-artifacts` và `analyzing-artifacts`.

Prompt sau, khi người dùng yêu cầu bám bố cục Assignment 1, agent đã làm đủ Intake Map. Lỗi này vẫn còn với câu hỏi mở đầu.

### 2. Thẻ phỏng vấn không có nút lùi

Thẻ `A FEW QUESTIONS` có lựa chọn, ô nhập khác, `Decline all`, `Skip`, `Next`. Không có nút lùi. Chọn nhầm tên, quy mô, ngân sách hoặc thời gian thì không quay lại câu trước.

`asktool` chỉ nhận `question`, `options`, và `multiSelect`. Không có tham số lùi câu. Nút Back là lỗ hổng của thẻ host, không phải thứ một file skill tự tạo được.

Yêu cầu: thẻ nhiều câu phải cho chọn lại câu trước. Chọn sai không được coi là đã chốt.

### 3. Sau phỏng vấn chưa đề xuất phương án tốt hơn

Agent có tóm tắt lựa chọn, nhưng không cho sửa lựa chọn đã chọn trên thẻ và không nêu phương án tốt hơn.

Repo không có skill brainstorming. Nếu thêm sau, phải là bản cho tài liệu, không copy skill thiết kế phần mềm của obra/superpowers. Nối với:

- `scoping-the-brief`, sau khi đủ dữ liệu và trước phân tích yêu cầu.
- `analyzing-artifacts`, khi còn vài cách diễn giải.
- `planning-work`, khi còn vài cách tổ chức mục, bằng chứng, bảng hoặc sơ đồ.

Sau phỏng vấn, agent phải tổng hợp, cho người dùng sửa nếu chọn nhầm, và nếu có cách làm tốt hơn thì đề xuất rồi để người dùng chọn. Không bịa số liệu. Không nhảy sang dàn ý khi phân tích chưa được duyệt.

### 4. Phân tích yêu cầu khó hiểu

Phạm vi và hướng từ khóa của Section 1 khá tốt, nhưng phần trình bày khó hiểu. Agent liệt kê từ khóa tiếng Anh mà không giải thích từng từ bắt mục đó làm gì:

> Vocational Scenario, Business Context, Problem Statement, Stakeholders, SMART Objectives, Success Criteria, Project Scope, Constraints, Assumptions.

Diễn giải, câu hỏi, tóm tắt và phân tích trong chat phải theo ngôn ngữ người dùng đang dùng. Tiếng Việt chỉ là ngôn ngữ của phiên test này, không phải quy tắc. Bài nộp vẫn theo ngôn ngữ nộp đã chốt.

Không sửa bằng cách dịch đối chiếu từng dòng. Viết một bản diễn giải sạch, chỉ giữ thuật ngữ cần thiết và giải thích ngay trong câu. Phân tích phải cụ thể hơn, sâu hơn, và dễ đọc hơn.

### 5. Dàn ý còn mỏng

Dàn ý Section 1 có cấu trúc, nhưng chưa đủ chi tiết để người dùng thấy trước nội dung sẽ viết.

Yêu cầu:

- Diễn giải dàn ý bằng ngôn ngữ người dùng đang dùng.
- Dàn ý trình bày khoảng 30–40% nội dung chi tiết.
- Bản báo cáo hoàn chỉnh bổ sung khoảng 60–70% còn lại. Không đảo hai tỷ lệ.
- Có thể dùng skill brainstorming để đưa 2–3 dàn ý, đề cử một dàn ý phù hợp nhất, rồi dừng.
- Sửa dàn ý nào, hoặc chọn dàn ý nào, do người dùng quyết định. Agent không tự chọn rồi viết bài.

`references/outline-structure.md` mới yêu cầu mỗi mục có luận điểm cụ thể. Chưa có quy tắc 30–40% / 60–70% và chưa có bước đưa nhiều phương án.

### 6. Bài hoàn chỉnh còn dạng dàn ý

`1.2.2 System Scale and Capacity Targets` chỉ có một câu dẫn rồi ba gạch đầu dòng. `1.3.1` và `1.3.2` cũng một câu dẫn rồi liệt kê. `1.3.3` là hai câu ngắn. Cách này giống dàn ý, chưa phải đoạn văn học thuật.

Yêu cầu của người dùng:

- Đoạn phân tích ngắn nhất khoảng 4–5 dòng.
- Câu dẫn, nếu cần, ngắn nhất khoảng 3 dòng.
- Vẫn được dùng bullet hoặc danh sách đánh số khi cần diễn giải hay liệt kê mục song song.
- Không lạm dụng danh sách. Không xuống dòng liên tục để tránh viết đoạn văn.

Hợp đồng hiện có không ghi đúng câu chữ đó:

- **P2** dùng mốc 4–5 câu, không tính theo số dòng render, và cho phép câu chuyển ý ngắn nếu đã đủ nghĩa.
- **L1** và **L6** cấm biến lập luận thành chồng bullet. Mục báo cáo không được chỉ có một câu dẫn rồi liệt kê.
- **L2** và **L3** cho phép bullet hoặc danh sách đánh số với mục thật sự song song, thông số, hoặc trình tự.
- **L6** yêu cầu thân bài phân tích có ít nhất 65% văn xuôi, trừ khi mẫu bắt buộc nói khác.
- **S3** cấm dùng quota số dòng làm tiêu chí máy móc.

Lỗi liệt kê là có thật. Lần sửa sau phải xử lý đoạn quá ngắn, nhưng không được cấm mọi danh sách và không được biến "4–5 dòng" thành quota máy móc nếu điều đó trái P2 và S3.

### 7. Bản viết Section 1 thiếu trích dẫn và kết thúc cụt

Bản tiếng Anh không có trích dẫn Harvard trong bài và không có danh mục References. Bản dừng ở đoạn giả định cuối, không hỏi duyệt.

Không bịa số trang, nhà xuất bản, hoặc chi tiết nguồn chưa kiểm được khi sửa lỗi này.

## Việc test đã sửa trong chat, nhưng sản phẩm chưa sửa

Các điểm sau agent sửa được khi bị nhắc trong phiên test. Chưa có nghĩa skill đã chặn được lần sau.

- Đã bỏ các chỉ số tự thêm: phản hồi dưới 60 giây, hủy đơn dưới 1,5%, uptime 99,5%, giao hàng dưới 30 phút.
- Đã sửa tiêu đề mức 1 thành đúng `Section 1: Project Overview`.
- Đã bỏ functional prototype khỏi mục tiêu Section 1. Prototype thuộc Assignment 2.
- Đã dùng lại 20 tuần và $30,000 là thời gian và ngân sách của dự án phần mềm, không phải thời gian viết bài SDP.

Các chi tiết chưa được hỏi lại vẫn nằm trong dàn ý và bài viết: trạng thái Accept/Preparing/Ready, thanh toán khi nhận hàng, không làm app native, không làm AI, IoT, drone, và cụm "Guarantee transactional integrity".

## Việc test đã đạt, không tính là lỗi mở

- Prompt 2 làm đủ Intake Map cho Assignment 1, kể cả mâu thuẫn font Calibri và Times New Roman.
- Prompt 3 dừng để phỏng vấn trước khi phân tích, có lựa chọn dữ liệu thật và dữ liệu minh họa.
- Prompt 4 dừng sau phân tích yêu cầu, không có nhãn quy trình.
- Prompt 5 viết lại phân tích mà không nhảy sang dàn ý.
- Prompt 6–7 có dàn ý tiếng Anh, lời dẫn theo ngôn ngữ người dùng, không dịch đối chiếu từng dòng, và dừng để hỏi duyệt.
- Prompt 8 có toàn văn Section 1 trong chat, đúng tiếng Anh, không viết Section 2, không thấy tạo file.

## Trạng thái lịch sử trước v0.1.5-beta

- Chưa thêm nút lùi.
- Chưa tạo skill brainstorming cho tài liệu.
- Chưa nối skill mới với `scoping-the-brief`, `analyzing-artifacts`, hoặc `planning-work`.
- Chưa sửa quy tắc dàn ý, phân tích yêu cầu, đoạn văn, hoặc trích dẫn.
- Chưa viết lại dàn ý hoặc Section 1.

## Closure review — APPROVED

- **Ngày phê duyệt:** 27/09/2026.
- **Phạm vi:** Phê duyệt đóng bảy vấn đề của biên bản này ở cấp **source and package** của `workspace-superpowers` v0.1.5-beta.
- **Ngoại lệ đã biết:** `Back control` thực sự vẫn là một **host limitation**. Gói skill không giả lập nút Back; lựa chọn trên thẻ chỉ được khóa sau khi AI tóm tắt và người dùng xác nhận hoặc sửa trong chat.
- **Nghiệm thu hành vi:** `native PI-Desktop multi-turn acceptance` vẫn **PENDING** cho đến khi có transcript và native skill/tool trace của các ca đã định nghĩa. Trạng thái này không được đổi thành PASS từ kiểm thử chuỗi ký tự hoặc mô phỏng.
- **Bản bài sinh viên:** Việc viết lại dàn ý hoặc Section 1 không thuộc thay đổi sản phẩm. Biên bản này phê duyệt các hàng rào workflow, không phê duyệt lại nội dung bài test cũ.

### Đối chiếu bảy vấn đề

| # | Kết luận duyệt | Bằng chứng triển khai |
|---|---|---|
| 1 | Đóng ở cấp source/package | Router, scoping và analysis phân loại câu hỏi mở đầu về một guide mới thành intake map; kiểm thử kiến trúc khóa các điểm gọi đọc và phân tích. |
| 2 | Đóng bằng phương án thay thế trong phạm vi gói; giới hạn host được giữ rõ | `guided-questions`, `scoping-the-brief`, PI bootstrap và test liên quan đều yêu cầu tóm tắt lựa chọn, cho sửa trong chat và không khóa trước khi xác nhận. Không tuyên bố có nút Back. |
| 3 | Đóng ở cấp source/package | Document `brainstorming` hiện tồn tại, có routing/integration với `using-workspace-superpowers`, `scoping-the-brief`, `analyzing-artifacts` và `planning-work`. Skill đưa 2–3 lựa chọn, nêu đánh đổi, đề xuất một lựa chọn nhưng không tự chọn, rồi trả kết quả về skill gọi nó. |
| 4 | Đóng ở cấp source/package | Chính sách ngôn ngữ tách requirement analysis trong chat theo ngôn ngữ thông điệp hiện tại khỏi ngôn ngữ của deliverable; protocol nghiệm thu đã được đồng bộ để không chấm sai phân tích tiếng Việt. |
| 5 | Đóng ở cấp source/package | Outline contract yêu cầu luận điểm cụ thể, bằng chứng/visual và mức xem trước 30–40%; phần hoàn chỉnh phát triển 60–70% còn lại mà không biến tỷ lệ thành quota từ. |
| 6 | Đóng ở cấp source/package | Style và prose contracts phát hiện lead-and-list, dùng mốc 4–5 câu cho đoạn phân tích và cho phép danh sách khi nội dung thực sự song song; không dùng quota số dòng. |
| 7 | Đóng ở cấp source/package | Drafting/citation workflow yêu cầu in-text citations và References khi áp dụng, cấm bịa metadata, giao toàn văn trong chat và dừng hỏi duyệt trước khi sang phần tiếp theo. |

### Kiểm tra riêng cho brainstorming

Brainstorming integration is wired vào đúng bốn điểm: router chọn operation, scoping gọi sau khi đủ bằng chứng nhưng còn nhiều cách hiểu, analysis gọi khi cùng nguồn cho nhiều cách đọc hợp lệ, và planning gọi khi còn nhiều cách tổ chức mục/bằng chứng/bảng/sơ đồ. Matching không kích hoạt khi thiếu bằng chứng, nguồn tự mâu thuẫn, người dùng đã chốt cách làm, yêu cầu chỉ là sửa cơ học, hoặc công việc là thiết kế phần mềm.

Các ca nghiệm thu nhiều lượt `BR01`–`BR03` và `R15`–`R17` đã được định nghĩa để kiểm tra: đưa phương án rồi dừng; sửa lựa chọn thẻ và xác nhận; quay về đúng calling skill sau khi người dùng chọn; và bỏ qua brainstorming khi cách làm đã được chốt. Các ca này vẫn giữ `PENDING` cho đến khi chạy trên PI-Desktop thật.

### Kết quả xác minh và quyết định cuối

Kết quả được đọc trực tiếp sau lần sửa ngày 27/09/2026:

- `node --test tests/architecture/real-world-refinements.test.mjs`: **14/14 PASS**, gồm ba kiểm thử hồi quy mới cho ngôn ngữ phân tích, nghiệm thu brainstorming nhiều lượt và phạm vi phê duyệt của biên bản này.
- `node tests/run.mjs`: **139/139 PASS**, không có kiểm thử lỗi, bỏ qua hoặc bị hủy.
- `python scripts/test-package-pi.py`: **5/5 PASS**, gồm khả năng đóng gói, tái lập bản build và thực thi routing trong runtime đã đóng gói.

**Quyết định: APPROVED.** Bảy vấn đề được đóng ở cấp source/package của v0.1.5-beta. Brainstorming và matching được phê duyệt về kiến trúc, điều kiện kích hoạt, điểm quay về calling skill và protocol nghiệm thu. `BR01`–`BR03` cùng `R15`–`R17` vẫn mang trạng thái `PENDING` riêng cho lần replay trên PI-Desktop thật; trạng thái đó giới hạn tuyên bố về host runtime nhưng không làm mất hiệu lực phê duyệt source/package này.

<!-- END SOURCE S1 -->

---

<a id="source-02"></a>

# S2 — Reading completed assignments and identifying remaining criteria

Original file: [2026-09-24-doc-bai-da-lam.md](2026-09-24-doc-bai-da-lam.md)

<!-- BEGIN SOURCE S2: 2026-09-24-doc-bai-da-lam.md -->
# Ghi nhận vấn đề kiểm thử — 24/09/2026

- **Mã tài liệu:** `test-issues/2026-09-24-doc-bai-da-lam.md`
- **Ngày ghi:** 24/09/2026
- **Phiên bản đã test:** `workspace-superpowers` v0.1.4-beta
- **Nhánh đã kiểm trước khi ghi:** `v0.1.5-beta`, commit `f3dab0b`, 24/09/2026 12:58 +0700
- **Nguồn:** Đọc file bài đã nộp `BC00560_NguyenNC_Assignment_Part1_Revised_Final_Concise_D2_P7_Rebuilt.docx`, Unit 13, Assignment Part 1
- **Prompt test 1:** `Hãy đọc file bài ASM part 1 này của tôi`
- **Prompt test 2:** `đây là bài ASM part 1 của tôi bạn hãy đọc và ghi nhớ nội dung`
- **Prompt test 3:** `Đây là bài ASM final phân nối tiếp của nội dung trên bạn xem tôi cần làm thêm các tiêu chí nào để hoàn thành bài ASM môn này??` Kèm file `Assignment_2_guidance.docx`.
- **Trạng thái:** Chỉ ghi nhận ba lần test. Chưa sửa skill, bootstrap, reference, và chưa thêm skill mới.

File này không mở lại 7 issue ngày 23/09/2026. `v0.1.5-beta` đã đóng các issue đó. Vấn đề dưới đây chưa có trong release note, changelog, hay skill của nhánh đó.

## Vấn đề còn mở

Khi người dùng gửi bài đã làm, agent chưa trả lại đúng nội dung, đúng dự án, và đúng việc còn lại.

Test 1 trả về mục lục chủ đề rồi khen bài. Test 2 nhớ được nhiều chi tiết kỹ thuật hơn, nhưng tự dựng khung tiêu chí và nhập các kịch bản dự án. Test 3 được hỏi tiêu chí nào còn phải làm để hoàn thành môn, nhưng không nói P7 và các phần Assignment 2 đã có trong bài ASM 1, cũng không chốt danh sách tiêu chí còn thiếu.

Ca test không yêu cầu sửa file hay xuất file, nên không tính là lỗi thiếu kê format.

### Test 1 — việc agent đã làm được

Thứ tự chủ đề khớp file: DNS, protocol và phần cứng, framework, SEO, front-end/back-end với OSI, công cụ online, công cụ custom, biện minh stack, tài liệu thiết kế, website đã làm, đối chiếu wireframe, D2, P7, 21 mục References.

Một số mốc cũng đúng: Aura Skin, 30 màn hình wireframe, 25 test case, `cart-quote-api.php`, 6.2 MB, 7.4 giây, 1.4 giây.

### Test 1 — việc agent chưa làm

- Đổi heading của file thành `Mục 1 (P1)` đến `Mục 8 (M5)`. Trong file, chỉ heading D2 và P7 ghi mã tiêu chí. Các heading còn lại là câu yêu cầu đầy đủ.
- Kể công nghệ, không ghi lập luận và câu kết hoặc giới hạn của chính phần đó.
- Gọi số SEO là thực nghiệm trước/sau. Heading trong file là `Projected Post-Optimization Results`.
- Thêm dấu vào tên: file ghi `Nguyen Chi Nguyen` và `Le Nhat Quang`.
- Kết luận lý thuyết, thử công cụ và Lumenora nối xuyên suốt. File không nói vậy.
- Coi ô D3 trên grading grid là một phần nội dung đã viết. Không có heading D3.
- Khen bài `rất chi tiết`, `điểm sáng`, `đầu tư kỹ`. Đó không phải nội dung bài.

### Sợi dự án mà bản đọc phải giữ

File có ba lớp, không phải một dự án từ đầu đến cuối:

1. Từ phần framework đến phần biện minh stack, kịch bản là sàn thời trang, chưa có tên thương hiệu.
2. Aura Skin là landing mỹ phẩm giả, chỉ để so WordPress, v0.dev và Lovable.dev. File nói official scenario vẫn là sàn thời trang.
3. Đến tài liệu thiết kế, file mới nói Lumenora chuyển kịch bản bán hàng của assignment sang mỹ phẩm.

Kết luận cuối quay lại DNS, OSI, SEO và công cụ. Không khép Lumenora.

## Test 2 — 24/09/2026

- **Prompt:** `đây là bài ASM part 1 của tôi bạn hãy đọc và ghi nhớ nội dung`
- **Kết quả:** Chưa đạt. Chi tiết hơn test 1, nhưng bản ghi nhớ bị sắp lại và có chi tiết không có trong file.
- **Đối chiếu:** Các cụm dưới đây được tìm trên đúng file của lần test này. Không thấy trong file nghĩa là tìm nguyên văn không ra, không phải kết luận rằng mọi cách diễn đạt đều vắng.

### Việc khá hơn test 1

Agent dừng, chưa viết Part 2. Danh tính cơ bản có mặt: Unit 13, BC00560, SE08201, Le Nhat Quang, ngày 25 June 2026. Số 1.183 đoạn, 61 bảng, 206 hình khớp thông tin cấu trúc của file.

Một số chi tiết kỹ thuật có thật trong bài: `storage.js`, `checkout_service.php`, `editorial-commerce.css`, CSRF, ECC memory, cash on delivery, WebStorm như phương án bị loại, Notepad++ và NetBeans.

### Việc làm hỏng ghi nhớ

- Tự dựng LO1 đến LO4. File không có cụm `Learning outcome`.
- Gán lại mã P, M, D và dùng D2 hai lần: một lần cho biện minh công nghệ, một lần cho đánh giá quy trình. Trong file, chỉ heading D2 và P7 ghi mã.
- Gọi Lumenora là dự án chính ngay từ đầu. Nói phần loại công cụ online là để bảo vệ custom-built cho Lumenora. File nói official scenario vẫn là sàn thời trang.
- Gộp thời trang và mỹ phẩm thành một bài toán. Ba lớp thời trang, Aura Skin và Lumenora không được tách.
- Đổi tên thành `Nguyễn Chí Nguyện`. File ghi `Nguyen Chi Nguyen`. Đây không chỉ là thêm dấu. `Nguyện` là một từ khác.
- Đổi ngày thành `25/06/2026`.
- Vẫn gọi SEO là đo trước và sau. Heading trong file là `Projected Post-Optimization Results`.
- Kể WebStorm như IDE được phân tích cạnh VS Code và Sublime Text. Trong file, WebStorm là phương án bị loại. Notepad++ có trong bài nhưng bị bỏ.
- Thêm chi tiết không thấy khi tìm trong file: PhpStorm, PostgreSQL, FID, Windows 11, 1920×1080, nhãn black-box, mốc `1280px` và `992`.
- `390px` có trong bài, nhưng ở phần so sánh giao diện, không thấy được ghi là viewport của môi trường kiểm thử.
- Tuyên bố đã đọc toàn bộ và đã ghi nhớ toàn bộ schema. Ảnh không được xác nhận là đã xem từng tấm.
- Lộ trình nội bộ vẫn hiện trong câu trả lời: nạp skill, chạy Python, đọc từng tiêu chí.

Nếu dùng bản ghi nhớ này để sửa bài, agent có thể sửa nhầm phần và gọi nhầm dự án.

## Test 3 — đối chiếu guide Assignment 2

- **Prompt:** `Đây là bài ASM final phân nối tiếp của nội dung trên bạn xem tôi cần làm thêm các tiêu chí nào để hoàn thành bài ASM môn này??`
- **File mới:** `Assignment_2_guidance.docx`
- **Bài đã có:** `BC00560_NguyenNC_Assignment_Part1_Revised_Final_Concise_D2_P7_Rebuilt.docx`
- **Kết quả:** Chưa đạt. Agent kể tiêu chí và lập bảng, nhưng không trả lời thẳng việc còn lại.

Guide ghi thân bài Assignment 2 là `P5, P6, M4, D2, P7, M5, D3`. Bài ASM 1 đã có phần nội dung cho P5, P6, đối chiếu wireframe, D2 và P7. P7 trong bài ASM 1 đã có ca đăng ký, đăng nhập, UX và UI. M5 theo guide là quy trình QA. D3 theo guide là đánh giá kết quả kiểm thử. Hai phần này không có mục riêng trong bài ASM 1.

Câu mở phải là: P7 đã làm trong bài ASM 1, không phải tiêu chí còn phải làm mới. Các tiêu chí guide 2 đã có phần trong bài ASM 1 là P5, P6, M4, D2 và P7. Còn phải làm thêm M5 và D3. Agent không nói câu đó.

### Việc agent làm sai

- Mở bằng font, lề, chữ ký và mục lục. Câu hỏi không hỏi định dạng.
- Bảng có cột khối lượng, nhưng dùng `0%` và `100%`. Đó không phải danh sách tiêu chí còn thiếu.
- Ghi P7 là đã có một phần lớn và còn thiếu test UX/UI. Bài ASM 1 đã có mục P7, gồm ca UX và UI. Agent không nói P7 của guide 2 đã được làm trong ASM 1.
- Ghi P5 tái sử dụng trọn vẹn với Lumenora. Guide yêu cầu giới thiệu dự án website bán thời trang. Phần thiết kế trong bài là Lumenora, mỹ phẩm. Đây là chỗ chưa khớp, phải nêu sau câu tiêu chí còn thiếu, không được gọi là đã xong 100%.
- Ghi P6 là 0% việc thêm, rồi ở dưới lại nói Login và Register bắt buộc validate bằng JavaScript. Hai kết luận mâu thuẫn.
- Nói bài ASM 1 đang gắn đối chiếu wireframe là M3, nên chỉ cần đổi thành M4. Tìm trong bài ASM 1 không thấy chữ `M3`. Heading đối chiếu không ghi mã. Mâu thuẫn này đến từ bản ghi nhớ sai ở test 2.
- Biến SWOT thành việc bắt buộc. Guide viết `You can provide a SWOT about the course`.
- Nêu `Conclusion hiện tại chỉ có 131 từ`. Guide không có định mức số từ này.
- Hỏi có được tạo ca kiểm thử lỗi mẫu cho D3 hay không. Guide chỉ yêu cầu thảo luận ca không đạt nếu có. Không được đề nghị bịa ca lỗi.
- Kết bằng câu hỏi nộp một file hay hai file. Đó không phải câu trả lời cho tiêu chí còn thiếu.

`quality assurance` có một câu trong phần khái niệm kiểm thử của ASM 1. Đó không phải mục M5.

### Câu trả lời đạt cho prompt này

Một đoạn đầu, trước mọi quy định định dạng:

1. Đã có phần trong bài ASM 1: P5, P6, M4, D2, P7. Nói riêng P7 đã làm, không liệt kê P7 vào việc còn phải triển khai.
2. Còn phải làm thêm: M5 và D3.
3. Sau đó mới nêu chỗ đã có phần nhưng chưa khớp một yêu cầu được gọi tên. Ví dụ guide P5 nói website bán thời trang, bài thiết kế là Lumenora.

Không dùng phần trăm hoàn thành. Không gắn mã mà heading không ghi. Không biến `you can` thành bắt buộc. Không đề nghị tạo số liệu hoặc ca lỗi không có trong bài.

## AI nên phân tích và trả lời như thế nào

Khi người dùng gửi file bài đã làm và chỉ muốn đọc để nắm nội dung, agent làm bốn bước rồi dừng:

1. Mở đúng file. Danh sách heading chưa phải là đã đọc.
2. Lấy danh tính đúng chữ trên bìa. Không sửa chính tả, không thêm dấu.
3. Đi theo heading lớn của file, thường là Heading 1 và Heading 2. Với mỗi phần, ghi ba thứ: phần đó trình bày điều gì, nó tự kết luận hoặc tự giới hạn điều gì, và nó đang là lý thuyết chung, kịch bản, bản thử hay sản phẩm đã làm.
4. Xâu một sợi dự án: tên hoặc kịch bản xuất hiện lần đầu, mỗi câu trong file đổi tên hoặc chuyển kịch bản, và kết luận cuối có quay lại dự án đó không.

Không gắn mã P, M, D nếu heading không ghi mã đó. Không khen bài. Không mở phân tích tiêu chí, dàn ý hay viết tiếp. Không kê style, lề, header khi người dùng chưa yêu cầu sửa hoặc xuất file. Nếu không xem từng ảnh, phải nói giới hạn đó. Không tuyên bố đã đọc toàn bộ nếu còn phần chưa đọc.

Câu trả lời trong chat theo ngôn ngữ người dùng đang dùng. Heading và tên riêng giữ nguyên chữ trong file.

Câu trả lời có ba khối:

1. **Bài này là gì.** Danh tính đúng chữ. Nói rõ đây là bài đã nộp hay là đề.
2. **Từng phần đã viết gì.** Mỗi heading lớn một đoạn ngắn: lập luận, câu kết hoặc giới hạn của phần đó, và vai trò trong sợi dự án. Không thay bằng danh sách công nghệ.
3. **Dự án và mạch.** Chỗ nối và chỗ đứt quan sát được. Không viết `xuyên suốt` nếu file không lập liên kết đó. Ô trên grading grid không phải một phần nội dung.

Ví dụ cấm: `Mục 3 trình bày Bootstrap, React, Laravel và chọn stack thời trang.`

Ví dụ đạt: `Heading là câu analyze frameworks. Phần kết luận chọn Bootstrap 5 cho kịch bản thời trang chưa đặt tên, vì đội junior và không muốn pipeline build. Lumenora chưa xuất hiện ở đây.`

Ca đọc đạt phải nêu ba lớp thời trang, Aura Skin và Lumenora, phải gọi số SEO là projected, không được đổi tên trên bìa, không được dựng LO hoặc gán mã tiêu chí khi heading không ghi mã đó, và không được tuyên bố đã ghi nhớ toàn bộ nếu còn chi tiết chưa kiểm.

## Skill cần sửa sau, chưa sửa trong lần ghi này

Test 1 và 2 cho thấy câu `đọc file` chưa có hợp đồng đọc lại. Test 3 cho thấy câu `còn phải làm thêm tiêu chí nào` đang bị đẩy vào intake map của guide mới, nên agent không đối chiếu với bài đã nộp.

Sửa năm chỗ trong bảng, cộng một dòng phụ. Không sửa `drafting-prose`, `writing-reports`, `writing-academic-prose`, `reviewing-work`, hay `document-continuity.md` cho các ca này.

| Chỗ | Việc cần làm |
|---|---|
| `adapters/pi/bootstrap.md`, dòng về opening question và bảng `Match this message` | Thêm dòng cho bài đã làm: gọi `reading-artifacts` rồi `analyzing-artifacts`, trả bản đọc lại, không dùng intake map. Câu hỏi tiêu chí của guide mới, khi chưa có bài đã nộp, vẫn là intake map. Nếu người dùng đã có bài nộp và hỏi còn phải làm thêm tiêu chí nào, đó là so sánh hẹp, không trả intake map. |
| `skills/using-workspace-superpowers/SKILL.md` | Sửa cùng câu opening question, khoảng dòng nói guide mới không phải thao tác hẹp. Nếu không sửa, router sẽ đè bảng route. |
| `skills/scoping-the-brief/SKILL.md` | Sửa cùng ngoại lệ. Câu `còn phải làm thêm tiêu chí nào` không được kéo lại thành intake map. |
| `skills/analyzing-artifacts/SKILL.md` | Thêm hai hợp đồng đầu ra. Đọc bài đã làm: ba khối đã ghi ở trên. Đối chiếu guide sau: câu đầu nêu tiêu chí đã có trong bài cũ, câu kế nêu tiêu chí chưa có phần. P7 đã có thì phải nói đã có. |
| `skills/reading-artifacts/SKILL.md` | Khi đối chiếu, bàn giao heading của bài cũ và câu tiêu chí của guide. Không chỉ bàn giao quy định font, lề. |

Một dòng phụ trong `skills/analyzing-artifacts/references/artifact-inspection.md`: lần đọc nội dung dùng heading và lập luận. Cột style, header, page setup chỉ dùng khi người dùng hỏi bố cục hoặc sắp sửa file.

Hợp đồng đối chiếu phải cấm: mở bằng định dạng, dùng `0%` hoặc `100%`, gắn mã từ trí nhớ của lượt trước, biến `you can` thành bắt buộc, và đề nghị tạo ca kiểm thử lỗi không có trong bài.

## Đã kiểm trên v0.1.5-beta, chưa thấy sửa vấn đề này

`docs/releases/0.1.5-beta.md` đóng 7 issue của biên bản 23/09/2026: intake map cho đề, xác nhận thẻ hỏi, brainstorming tài liệu, ngôn ngữ chat, độ dày dàn ý, đoạn văn, và trích dẫn.

Trên cùng commit `f3dab0b`:

- Bảng route vẫn gửi `Open or inspect a supplied file` chỉ tới `reading-artifacts`.
- Dòng `Parts, criteria, or structure of a newly supplied assignment guide` vẫn bắt intake map, không phải câu trả lời trực tiếp. Test 3 rơi vào dòng này nên không đối chiếu bài ASM 1.
- Intake map vẫn chỉ dành cho đề, rubric, hoặc graded guide khi chưa có thao tác hẹp hơn. Câu `còn phải làm thêm tiêu chí nào` chưa được tách thành so sánh hẹp.
- `skills/reading-artifacts/SKILL.md` vẫn cấm diễn giải và không bắt bàn giao câu lập luận hay câu đổi dự án.
- `skills/analyzing-artifacts/SKILL.md` không có hợp đồng đọc lại bài đã làm, cũng không có hợp đồng đối chiếu tiêu chí còn thiếu.
- Không có cụm read-back, bài đã làm, hoặc hợp đồng mạch dự án cho lần đọc.

Vì vậy file này được thêm mới. Không sửa `test-issues/2026-09-23-ghi-nhan-van-de.md`.

## Chưa làm

- Chưa sửa bootstrap hay skill.
- Chưa build lại gói plugin.
- Test lần 2 và test lần 3 đã chạy. Cả hai vẫn chưa đạt.
- Chưa chạy lại prompt đọc file và prompt đối chiếu guide trên chat mới sau khi sửa skill.

## Closure review — APPROVED

- **Ngày phê duyệt:** 27/09/2026.
- **Phạm vi:** Đóng issue ở cấp source and package của `workspace-superpowers` sau khi
  bổ sung route đọc lại bài đã làm và route đối chiếu guide hẹp.
- **Giới hạn:** Native PI-Desktop multi-turn acceptance vẫn `PENDING` cho đến khi
  có transcript và native skill/tool trace. Kiểm thử chuỗi không được nâng trạng
  thái này thành PASS.
- **Bản bài sinh viên:** Không sửa hoặc phê duyệt lại file bài ASM; issue chỉ
  khắc phục hàng rào đọc, phân tích và routing.

### Đối chiếu phạm vi khắc phục

| Hạng mục | Kết quả source/package | Bằng chứng |
|---|---|---|
| Đọc bài đã làm | Đã thêm completed-work read-back qua `reading-artifacts` rồi `analyzing-artifacts`. | Bootstrap/router route riêng; reading bàn giao identity, headings, arguments, conclusions/limits, scenario transitions và coverage; analysis yêu cầu ba khối đầu ra. |
| Đối chiếu guide sau | Đã thêm narrow remaining-criteria comparison, không khởi động intake map. | Route đọc cả hai nguồn; analysis buộc nêu tiêu chí đã có trước, tiêu chí còn thiếu sau, rồi mới nêu mismatch/evidence limits. |
| Chống bịa nội dung | Đã khóa tên/ngày/heading, cấm dựng LO hoặc P/M/D, phần trăm, biến `you can` thành bắt buộc và bịa ca lỗi/số liệu. | `skills/analyzing-artifacts/SKILL.md` và `artifact-inspection.md`. |
| Phạm vi định dạng | Đã tách đọc nội dung khỏi style/header/page setup. | `skills/reading-artifacts/SKILL.md` và `skills/analyzing-artifacts/references/artifact-inspection.md`. |

### Kết quả xác minh

- `node --test tests/architecture/real-world-refinements.test.mjs`: **17/17 PASS**.
- `node tests/run.mjs`: **142/142 PASS**.
- `python scripts/test-package-pi.py`: **5/5 PASS**.

**Quyết định:** APPROVED ở cấp source and package; nghiệm thu native PI-Desktop vẫn
PENDING. Các test replay cho prompt đọc bài đã làm và đối chiếu guide phải được
chạy trên host thật trước khi tuyên bố hành vi runtime đã PASS.

<!-- END SOURCE S2 -->

---

<a id="source-03"></a>

# S3 — Figures, tables, citations and Word export fidelity

Original file: [2026-09-27-dinh-huong-nang-cap-visuals-tables-word-citations.md](2026-09-27-dinh-huong-nang-cap-visuals-tables-word-citations.md)

<!-- BEGIN SOURCE S3: 2026-09-27-dinh-huong-nang-cap-visuals-tables-word-citations.md -->
# Ghi nhận định hướng nâng cấp: Hình ảnh, Bảng biểu, Xuất file Word & Trích dẫn học thuật

- **Mã tài liệu:** `test-issues/2026-09-27-dinh-huong-nang-cap-visuals-tables-word-citations.md`
- **Ngày ghi nhận:** 27/09/2026
- **Implementation target:** existing `v0.1.5-beta` working branch; package version remains `0.1.5-beta`.
- **Current status (28 September 2026):** Source/package implementation is **APPROVED** within the scope below. DOCX fixture structure PASS; rendered layout unverified; native PI acceptance PENDING. No independent approval or release is recorded.

The original proposal below is retained as input. The explicit implementation
decisions and evidence in section 3 govern where it suggests universal visuals,
Harvard, formatting defaults or a new user-facing approval stage.

---

## 1. Định nghĩa chuẩn chất lượng (Quality Benchmark)

Một bài báo cáo học thuật / đồ án chuyên nghiệp chuẩn quốc tế phải hội tụ đủ 5 yếu tố cốt lõi:

$$\text{Báo cáo chuẩn} = \text{Văn xuôi học thuật (PEEL)} + \text{Bảng so sánh (Tables)} + \text{Sơ đồ/Ảnh minh họa (Figures)} + \text{Trích dẫn chuẩn (Harvard)} + \text{File Word chuẩn format}$$

1. **Văn xuôi học thuật sâu sắc (PEEL):** Mỗi đoạn phát triển theo mô hình Point - Explanation - Evidence - Link, không bị lỗi "đoạn văn hóa dàn ý" (Lead-and-list defect).
2. **Bảng so sánh đối chiếu (Comparison Tables):** Bắt buộc có bảng tổng hợp đa chiều khi so sánh các mô hình, công nghệ, kiến trúc.
3. **Sơ đồ / Ảnh minh họa trực quan (Diagrams / Figures):** Có sơ đồ vòng đời, kiến trúc, workflow trực quan, kèm Caption và ghi nguồn rõ ràng.
4. **Trích dẫn học thuật chuẩn xác (Harvard References):** Zero Fabrication - trích dẫn đúng nguồn kinh điển, có in-text citations và danh mục `## References` đầy đủ.
5. **File Word chuẩn format (`.docx`):** Giữ nguyên format mẫu (font, margin, line spacing), tạo bảng Word thực thụ (Native Word Tables) và nhúng ảnh trực tiếp (Inline Images), không xuất text thô.

---

## 2. Bốn trụ cột nâng cấp hệ thống

### Trụ cột 1: Quy trình xử lý Bảng & Ảnh minh họa theo "Hai điểm dừng" (Stop Gates)

Việc hiển thị ảnh, bảng và trích dẫn không được làm tùy tiện mà phải đi xuyên suốt 3 chặng kiểm soát, **đặc biệt phải hiển thị đầy đủ trực quan ngay từ bước Dàn ý (Outline)** chứ không được trì hoãn đến khi viết xong mới xuất hiện:

| Giai đoạn | Nhiệm vụ đối với Bảng biểu, Ảnh minh họa & Trích dẫn |
| :--- | :--- |
| **Stop 1: Phân tích yêu cầu (Analysis)** | - Xác định mục này **bắt buộc cần Bảng hay Ảnh** (ví dụ: so sánh mô hình bắt buộc có Bảng đối chiếu; giải thích quy trình bắt buộc có Sơ đồ vòng đời/workflow).<br>- **Phân loại nguồn ảnh:**<br>&nbsp;&nbsp;+ *Ảnh lý thuyết/chuẩn ngành (Waterfall, Scrum sprint, Spiral):* Tìm kiếm trên Google/mạng kèm nguồn uy tín.<br>&nbsp;&nbsp;+ *Ảnh minh chứng dự án riêng (screenshot app, database riêng của user):* Google chắc chắn không có $\rightarrow$ dùng `asktool` hỏi user có ảnh không, hoặc xin phép dùng sơ đồ khung/placeholder.<br>- Đề xuất danh sách Bảng & Ảnh dự kiến.<br>- **STOP xin duyệt.** |
| **Stop 2: Dàn ý chi tiết (Detailed Outline)**<br>*(Hiển thị trực quan 30–40%)* | - **HIỂN THỊ ĐẦY ĐỦ TRỰC QUAN NGAY TẠI OUTLINE (Không chờ đến khi viết xong bài):**<br>&nbsp;&nbsp;+ **Ảnh / Sơ đồ:** Hiển thị ảnh trực tiếp vào ô chat (`![Tên sơ đồ](url/path)`) kèm Caption và Nguồn trích dẫn rõ ràng ngay dưới luận điểm tương ứng, để user nhìn thấy và duyệt ảnh thật ngay từ dàn ý.<br>&nbsp;&nbsp;+ **Bảng biểu:** Kẻ bảng Markdown Table hoàn chỉnh (đầy đủ các cột so sánh, tiêu chí đối chiếu, dữ liệu khung) ngay trong dàn ý để user duyệt cấu trúc bảng.<br>&nbsp;&nbsp;+ **Trích dẫn (References):** Liệt kê danh mục tài liệu tham khảo dự kiến (chuẩn Harvard) cho các luận điểm trong dàn ý ngay cuối tin nhắn Outline.<br>- **STOP xin duyệt.** |
| **Stop 3: Bài viết hoàn chỉnh (Drafting & Delivery)** | - **Triển khai văn bản gắn kết đầy đủ:**<br>&nbsp;&nbsp;+ Kế thừa và hiển thị đầy đủ Bảng Markdown và Ảnh minh họa trực tiếp trong chat, lồng ghép mượt mà với các đoạn văn xuôi PEEL hoàn chỉnh.<br>&nbsp;&nbsp;+ In-text citations đầy đủ trong từng đoạn và danh mục `## References` chuẩn hóa ở cuối phần viết.<br>- **STOP xin duyệt.** |

---

### Trụ cột 2: Tìm kiếm tài liệu tham khảo & Trích dẫn học thuật uy tín

- **Nguyên tắc "Zero Fabrication":** Tuyệt đối không bịa tên tác giả, năm xuất bản, tên sách, nhà xuất bản hoặc DOI.
- **Tìm kiếm thực tế:** Khi cần trích dẫn lý thuyết phần mềm (SDLC, kiến trúc, kiểm thử, quản trị dự án), sử dụng công cụ tìm kiếm để lấy đúng nguồn kinh điển từ các tác giả uy tín đầu ngành (ví dụ: Ian Sommerville về Software Engineering, Roger Pressman, Robert C. Martin về Clean Architecture, Ken Schwaber & Jeff Sutherland về Scrum Guide...).
- **Hiển thị sớm từ Outline:** Các nguồn tài liệu tra cứu được phải được đưa vào danh mục tài liệu tham khảo ngay từ bước Dàn ý (Stop 2), giúp người dùng thẩm định độ tin cậy của tài liệu trước khi viết.
- **Cặp đôi song hành (Bidirectional Completeness):**
  - Mọi nhận định lý thuyết có trích dẫn trong bài (ví dụ: `(Sommerville, 2016, tr. 45)`) bắt buộc phải có mục tương ứng trong danh mục `## References` ở cuối phần viết.
  - Không liệt kê nguồn trong References nếu nguồn đó không được trích dẫn trong thân bài.

---

### Trụ cột 3: Kiểm định chất lượng khi xuất / chỉnh sửa file Word (`.docx`)

Khắc phục triệt để tình trạng AI chỉ ghi text thô giả danh tài liệu, **đảm bảo đưa đúng và đủ Ảnh & Bảng đã duyệt vào file Word**:

1. **Khớp nối nội dung với Word (Content & Visual Fidelity):**
   - Khi người dùng duyệt xong nội dung hoàn chỉnh và yêu cầu đưa vào file Word (`.docx`), AI bắt buộc phải lấy **đúng ảnh và đúng bảng** đã hiển thị và thống nhất ở chat để chèn vào file Word.
   - Vị trí chèn của Ảnh và Bảng phải nằm ngay sau đoạn văn dẫn giải tương ứng trong file Word, không để rơi rụng hoặc bỏ sót.
2. **Kiểm tra Tạo Bảng (Native Word Tables):**
   - Khi xuất ra file Word, bảng Markdown trong chat phải được convert thành **Bảng Word thực thụ (Table element trong cấu trúc OpenXML của `.docx`)**.
   - Phải có tiêu đề cột in đậm, đường viền (borders), nền header (shading) và căn lề chuẩn, không được chuyển đổi thành văn bản dạng gạch đầu dòng.
3. **Kiểm tra Nhúng Ảnh (Embedded Images):**
   - Ảnh minh họa (tải từ Google hoặc do user cung cấp) phải được tải về và **nhúng trực tiếp (Inline Image)** vào đúng vị trí trong file `.docx`.
   - Phải có dòng Caption bên dưới hình (Style *Caption*, chữ nghiêng, căn giữa) kèm nguồn rõ ràng.
4. **Bảo toàn Format mẫu (Template Fidelity):**
   - Giữ nguyên Font chữ (Times New Roman / Calibri theo yêu cầu), cỡ chữ, lề trang (Margins), khoảng cách dòng (Line spacing 1.15 - 1.5) theo đúng mẫu quy định.

---

### Trụ cột 4: Kế hoạch triển khai & Kịch bản kiểm thử (Roadmap & Verification)

#### A. Cập nhật Hợp đồng & Kỹ năng (Contracts & Skills)
1. **Hợp đồng Ảnh & Minh chứng (`references/criteria-writing-contract.md` & `skills/working-with-visuals/SKILL.md`):**
   - Bổ sung quy tắc phân loại ảnh: Lý thuyết (Google/Web) vs Dự án của User (`asktool` / xác minh nguồn).
   - Quy định hiển thị ảnh trực tiếp vào chat kèm Caption & Nguồn trích dẫn.
2. **Hợp đồng Bảng & Nhúng Word (`skills/converting-artifacts/SKILL.md` & `skills/formatting-layout/SKILL.md`):**
   - Bổ sung yêu cầu chuyển đổi Markdown Table sang Native Word Table.
   - Bổ sung yêu cầu tải và nhúng ảnh cục bộ vào file `.docx`.

#### B. Viết Test kiến trúc tự động (Architecture Tests)
- **Test 1:** Section đòi hỏi sơ đồ/vòng đời phải có Figure caption và nguồn gốc rõ ràng.
- **Test 2:** Tiêu chí so sánh (Comparative/Analytical) bắt buộc phải có Bảng đối chiếu thực sự.
- **Test 3:** Ảnh từ dự án của user nếu thiếu phải kích hoạt bước hỏi/xác nhận (`asktool` hoặc chat fallback), không tự ý bịa URL/ảnh ảo.
- **Test 4:** Khi xuất hoặc chỉnh sửa file Word, quy trình verify phải kiểm tra sự hiện diện của phần tử Table và Image nhúng trong file.

---

## 3. Implemented working revision and evidence — 28 September 2026

### Scope and resolved decisions

Implementation was authorized on the existing `v0.1.5-beta` branch over HEAD
`f3dab0ba4c751c3c7b2e8b503d40dc87837cd82b`. `package.json` is unchanged at
`0.1.5-beta`. No branch/worktree, commit, tag, push, release, permanent install or
new Office toolchain was created. Pre-existing uncommitted remediation was retained.
These results concern the current working revision, not the historical 0.1.5
release results.

The approved decisions override the corresponding original proposal wording:

- Visuals are required by the actual rubric/brief or selected for explanatory
  value; `Not needed` remains valid. Outline depth is not an asset quota.
- Available figure previews and supported Markdown tables belong in the outline
  with captions/sources. Missing required evidence blocks the affected work;
  missing display capability never implies review or approval of unseen assets.
- External, original explanatory, adapted, user-project and explicitly authorized
  illustrative assets retain distinct provenance. Discovery does not prove source
  credibility, claim support or reuse permission. Unknown licenses do not authorize
  copying, and ordinary sourced visuals do not acquire a blanket approval interview.
- Proposed, verified and actually cited sources stay distinct. References cover
  actual body/figure/table citations in the delivery scope. Required/established
  citation style wins; Harvard is only the fallback.
- DOCX checks compare the requested revision, its approval status, native table
  cells, embedded image identity/relationships, inline drawings, captions/sources,
  intended relative placement and template formatting. Authorized working-draft
  export remains possible without granting content approval.
- Analysis approval, detailed-outline approval and the existing post-draft review
  and wait remain intact. No new user-facing gate label was introduced.
- Existing records hold only needed asset identity/revision/location fields;
  transformations are checked rather than treating all changed hashes as failure.

### Implementation locations

- Shared contract: [visual-assets-and-word-fidelity.md](../references/visual-assets-and-word-fidelity.md).
- Analysis/outline entry points: criteria-writing contract, outline-structure
  reference, planning-work and drafting-prose skills, and brief/outline/deliverable
  templates.
- Asset/source consumers: working-with-visuals, researching-sources and
  citing-sources. Word consumers: converting-artifacts, editing-documents,
  formatting-layout, verifying-artifacts and its artifact-verification reference.
- PI bootstrap/tools link the rules, preserve specific completed-work routing,
  disclose capability limits and preserve supported input boundaries.
- [Routing trial](../adapters/pi/routing-trial.md) adds R20–R23 as PENDING and
  discovers catalog IDs from the actual tested manifest. R18/R19 stay PENDING.
- [Architecture regression](../tests/architecture/visual-export-citations.test.mjs)
  checks reachability, source/provenance boundaries, revision/approval/placement
  semantics and manual scenario coverage. VE01–VE09 are defined in the
  [manual cases](../tests/scenarios/manual/visual-export-citations.md); they are not
  recorded as executed native behavioral tests.
- [Synthetic DOCX builder](../tests/fixtures/word-native-visuals/build_fixture.py)
  and [structural tests](../tests/architecture/word-visual-fidelity.test.py) use
  only the Python standard library. Reproduction and limitations are documented
  in the [fixture README](../tests/fixtures/word-native-visuals/README.md).

### Review and regression fixes

The follow-up P2/P3 repair is complete. P2 now keeps the selected revision, its
working/approved status, and the requested order/placement as separate verification
facts in `artifact-verification.md`; it explicitly permits working-revision export
and verification without fabricated approval. A regression assertion rejects the
old `approved order` prerequisite and requires the working-export safeguard.

P3 now makes R23 run both a requested approved revision and a requested
working/unapproved revision with deliberately different table cells and figure
identity. The route preserves the requested revision and status, never grants
approval, checks cells/media/inline drawing/caption/source/placement/template
formatting, and limits a missing capability to its affected verification layer.
VE09 records the working/unapproved manual case while VE01–VE08 retain their
existing IDs and meanings; architecture assertions cover both routing and manual
coverage. This source/package approval does not establish rendered DOCX or native
PI-Desktop acceptance.

The earlier reviewer also demonstrated false acceptance of direct font overrides
and disabled OOXML bold values. Three failing tests reproduced direct overrides,
disabled bold and disabled italic; the fixture-specific checks now reject them.

The initial fixture was strengthened from string assertions and a placeholder
payload to namespace-aware OOXML checks with a valid synthetic PNG, root/styles
relationships and fixed ZIP metadata. It is not a new conversion engine.

Intermediate architecture failures concerned exact wording/line wrapping and the
old fixed catalog-count assertion. Assertions now tolerate whitespace and check
the manifest-discovery contract. No pre-existing failing test was carried forward;
all observed regressions were resolved before the final runs below.

### Verification results for this working revision

| Command | Result | Exit |
|---|---|---|
| `node --test tests/architecture/real-world-refinements.test.mjs` | 17/17 PASS | 0 |
| `node tests/run.mjs` | 148/148 PASS (full suite; no subset totals added) | 0 |
| `node --test tests/architecture/visual-export-citations.test.mjs` | 6/6 PASS (subset of the 148) | 0 |
| `python scripts/test-package-pi.py` | 5/5 PASS | 0 |
| `python -B tests/architecture/word-visual-fidelity.test.py` | 16/16 PASS | 0 |
| `git diff --check` | No whitespace errors; Git emitted LF/CRLF normalization warnings | 0 |

Package tests built temporary installable archives, checked all distributed
Markdown/reference bytes and links, reproduced identical archives and exercised
packaged hook behavior. Nothing was permanently installed. These checks do not
prove a model invoked native PI tools.

The DOCX tests generate and reopen actual temporary ZIP packages. They check
native table cell content, header shading/bold, an embedded relationship resolving
to a real PNG and its test pixels, inline picture structure/dimensions, captions,
source text, relative element order, selected styles/font/size/spacing/margins,
and deterministic fixture output. Negative mutations cover missing/wrong table,
media/relationship, external image, caption, attribution, placement and formatting,
including direct overrides and false on/off flags. This verifies the fixed
synthetic fixture and selected properties, not arbitrary DOCX schema compliance,
real template round trips or native export execution.

### Evidence layers and remaining acceptance

| Layer | Status | Scope or evidence still needed |
|---|---|---|
| Source/package | APPROVED for this working revision | Contracts, links, P2/P3 regressions and temporary package checks above; this scope excludes rendered DOCX and native PI-Desktop acceptance. |
| DOCX structure | PASS for synthetic fixture | Actual parsed package/media and negative mutations; a real host export still needs source/output comparison. |
| Rendered DOCX/layout | UNVERIFIED in this session | Need supported Word/Office/renderer output, reopened pages and inspection for clipping, overflow, pagination and template appearance. |
| Native PI-Desktop | PENDING | Need fresh-session catalog, exact native Skill/tool trace, transcript, input/output revisions, visible preview evidence and R20–R23 plus R18/R19 results. |

Capability discovery found no connected Codex document sessions, no `soffice`,
`libreoffice` or `pandoc` command, and no `docx`, `PIL`, `fitz` or `lxml` Python
module. `pdftoppm` exists but cannot itself render DOCX. Word.Application is
registered on Windows; registration alone does not establish a supported render
session. The existing PI capability record documents sandbox/hidden COM worker
failures, so no such worker was used to bypass that boundary. No new render or
native PI trace was produced. These limits affect rendered/native acceptance;
they do not block the completed source/package work.

The historical closure in `2026-09-24-doc-bai-da-lam.md` was not rewritten or
reopened. Its recorded source/package approval remains separate from native
PENDING acceptance. Its inspected SHA-256 remained
`1690f8722668141a529f04cb87aad99a47ce9a34de0da438201663c4db884c32`.

<!-- END SOURCE S3 -->

---

<a id="source-04"></a>

# S4 — Report progress, project context and synchronization

Original file: [2026-09-27-theo-doi-tien-do-va-dong-bo-ngu-canh-du-an.md](2026-09-27-theo-doi-tien-do-va-dong-bo-ngu-canh-du-an.md)

<!-- BEGIN SOURCE S4: 2026-09-27-theo-doi-tien-do-va-dong-bo-ngu-canh-du-an.md -->
# Issue record and improvement direction: AI-managed report progress and project context

- **Recorded on:** 27 September 2026 (2026-09-27), Asia/Bangkok (UTC+07:00).
- **Record:** `test-issues/2026-09-27-theo-doi-tien-do-va-dong-bo-ngu-canh-du-an.md`.
- **Source:** User feedback, the supplied Anti proposal, and the subsequent discussion consolidating both proposals.
- **Status:** At the 27 September recording stage, this was an accepted direction only. The implementation update below supersedes that historical status with source-contract and package verification results; native runtime cases remain pending.
- **Authorized action for the recording stage:** Create one issue document in the existing `test-issues` directory. That original recording scope did not authorize a new tracking workspace, code changes, plugin build, or project modification; the later implementation update records the separately completed authorized implementation work.
- **Release target:** Not assigned. Do not infer an implemented release from the dates or targets in earlier issue records.
- **Document language:** English under the workspace's default authored-document policy; identifiers and source filenames are preserved.

## 1. Problem and intended outcome

The user reports that the current workflow asks reasonably clear questions before creating a project folder, but the resulting Markdown records are difficult to understand and too numerous. The desired outcome is an assistant that manages the records itself while the user communicates through ordinary chat. The user should not have to maintain filenames, status fields, decision registers, or synchronization notes.

The progress record must act as a working outline of the entire assignment, report, essay, or thesis. It should show what each part contributes, what has actually been completed, the conclusions already established, and what should happen next. A second record is appropriate only when the writing depends on a concrete project or product. That record should describe the project and the evidence available from it.

Neither an initial outline nor an early project description can be assumed final. The user may revise completed sections, change scope, reorder work, replace a project, or edit documents outside the conversation. The assistant must identify these changes, assess their consequences, and keep the relevant records aligned without inventing facts or requiring repeated permission for routine bookkeeping.

### 1.1 Issues to address

| ID | Recorded problem or design risk | Required improvement |
|---|---|---|
| TRACK-01 | Too many overlapping files can contain different versions of the plan, progress, and decisions. | Use at most two management Markdown files per report workspace, with distinct responsibilities and stable paths. |
| TRACK-02 | A technically dense record is hard for a person to read. | Put current position, next action, blockers, and the overall outline first. Keep provenance details compact and close to the claims they support. |
| TRACK-03 | An early outline may become a rigid instruction even after the user changes direction. | Treat the outline as a revisable plan. Reconcile current intent and actual work before following a saved next action. |
| TRACK-04 | Completed content and saved progress can disagree. | Reinspect the affected document and update summaries, status, and locators from what actually exists. |
| TRACK-05 | Project facts can be confused with intentions, descriptions, or future implementation. | Distinguish planned, user-described, source-inspected, runtime-observed, and tested information. |
| TRACK-06 | Changing one section can leave related sections, figures, or conclusions inconsistent. | Track dependencies and propagate review requirements only to affected items. |
| TRACK-07 | A comparison, question, or brainstorming suggestion can be mistaken for approval. | Classify prompt intent and preserve proposal, decision, authorization, and approval as different states. |
| TRACK-08 | Repeated confirmations can turn automatic tracking into administrative work for the user. | Reuse setup consent and clear instructions; ask only about unresolved decisions or actions outside the authorized scope. |
| TRACK-09 | A project may not exist yet or may lack the evidence required for a section. | Keep independent work moving; record specific evidence gaps without creating fictional project facts. |
| TRACK-10 | Claims of automatic memory or synchronization can exceed actual access. | Record inspection coverage and freshness; detect external changes when sources are accessible and checked, without promising background monitoring. |
| TRACK-11 | Tests and UI interaction may be described as read-only even when they modify data. | Separate observation from execution and mutation; define permitted environments and effects before running them. |
| TRACK-12 | Partial saves or concurrent edits can leave the report and records inconsistent. | Use a single persistent writer, reread saved changes, and recover explicitly from interrupted updates. |

These are user-reported problems and improvement requirements, not a claim that every failure was reproduced during this recording task.

## 2. Existing evidence and historical status

The current repository already contains relevant mechanisms. This work should consolidate and tighten them rather than introduce a parallel lifecycle.

| Inspected source | Current evidence | Implication for implementation |
|---|---|---|
| [Work-tracking contract](../references/work-tracking.md) | Describes bounded discovery, matching existing plans, revision-aware decisions, a single writer, and checkpoint recovery. | Preserve these controls while simplifying the user-facing record and making change handling operational. |
| [Work-plan template](../templates/work-plan.md) | Includes identity, sources, requirements, work items, artifacts, exports, questions, decisions, and checks. | Reduce fragmentation and visible administrative overhead; do not discard necessary traceability. |
| [Workflow continuity](../references/workflow-continuity.md) | Distinguishes questions, corrections, temporary switches, replacement, pause, and resume. | Make these distinctions directly govern record updates and authorization. |
| [Project grounding](../references/project-grounding.md) | Separates descriptions, inspected source, and observed behavior; restricts survey writes and execution. | Align placement and test permissions with the proposed two-record model. |
| [Document continuity](../references/document-continuity.md) | Requires contextual, terminological, and evidence continuity across sections. | Connect those checks to item dependencies and change propagation. |
| [Document brainstorming](../skills/brainstorming/SKILL.md) | A document-specific brainstorming skill currently exists. | The new integration work must reuse and test it; do not describe the current source tree as missing this skill. |
| [PI bootstrap](../adapters/pi/bootstrap.md) and scoping/router references | Current text already routes open document choices to brainstorming. | Existing references are evidence of routing instructions, not proof that the proposed end-to-end behavior works. |

### 2.1 Relationship to earlier issue records

- [23 September record](2026-09-23-ghi-nhan-van-de.md): historically recorded missing document brainstorming, shallow outlines, intake problems, prose defects, and missing citations.
- [24 September record](2026-09-24-doc-bai-da-lam.md): reports closure of the seven earlier issues in `v0.1.5-beta`, while recording new failures in reading completed work and comparing it against a later guide. This is a historical report, not a new release verification.
- [27 September visuals, tables, Word, and citations proposal](2026-09-27-dinh-huong-nang-cap-visuals-tables-word-citations.md): supplies planned requirements for early visual review, evidence provenance, and export fidelity.
- [27 September voice and continuity proposal](2026-09-27-tinh-nhat-quan-van-phong-xung-ho-va-mach-noi-bao-cao.md): supplies planned requirements for stable terminology, contextual bridges, and review before delivery.

The user referred to brainstorming as previously recorded but not yet available. Source inspection now shows the skill exists. Preserve the older record as historical evidence and describe the remaining work as integration and behavioral verification, not creation of a second brainstorming skill. No installed-host or packaged-release parity is established by this inspection.

## 3. Record architecture and creation decisions

### 3.1 Two management records at most

| Record | Owns | Must not become |
|---|---|---|
| `work-plan.md` | Whole-report outline, requirement coverage, content summaries, progress, decisions, dependencies, current target, and next action. | A duplicate of the full report, a second project specification, or an instruction overriding the current request. |
| `project-context.md` | Project identity and location, observed implementation, evidence, readiness, versions, coverage, conflicts, and authorized survey boundaries. | A second report progress tracker or a source of invented implementation facts. |

The Anti proposal uses `report-plan.md`. Prefer the existing canonical name `work-plan.md` for new records to preserve discovery compatibility. Reuse an already adopted equivalent rather than creating a duplicate merely to enforce a filename. If naming changes later, update the canonical locator and all consumers together.

Keep the records in the dedicated report workspace alongside its deliverables. A code repository may be elsewhere and referenced by path or repository URL. Do not copy the source tree or place a new context record inside it by default.

This proposed placement differs from the current project-grounding allowance for a designated context file inside the source project. Reconcile the contract, templates, adapters, and existing-record discovery before rollout. Do not create two context records while migrating an existing setup.

The two-file limit concerns management records. User inputs, the report itself, images, logs, and requested exports are separate artifacts. Do not create extra Markdown trackers, private agent logs, or per-session summaries. Where a report is itself Markdown, it remains a deliverable, not a third management record.

### 3.2 When to create or reuse a record

| Situation | Assistant behavior |
|---|---|
| A simple question, isolated edit, or one-off export | Do not create tracking records merely because files are involved. |
| Sustained report work with no adopted tracking | Read supplied requirements first, establish unsettled identity fields, propose the dedicated folder and applicable record paths, and obtain setup consent once. |
| The user explicitly requests a record at a clear path with sufficient context | Use that authorization; do not repeat the same setup question. |
| A matching adopted plan already exists | Reuse it and its recorded decisions; verify its current target before continuing. |
| No concrete project has been selected | Create only the authorized work plan; mark project-dependent items as waiting. Do not create an empty or fictional project profile. |
| A concrete project is identified but incomplete | Create context when useful and authorized; record known inputs, maturity, and gaps without waiting for a finished product. |
| Only a user description is available | Label it user-provided and unverified. Do not invent paths, schemas, screenshots, or working features. |
| A project appears later | Create its context under existing setup consent if that consent already covers the conditional second record; otherwise obtain only the missing location/scope authorization. |
| Several plausible records or replacement documents exist | Resolve their identities and intended roles before choosing. Do not select by newest timestamp alone. |

Initial consent authorizes routine maintenance within its stated scope. It does not approve every future outline, authorize arbitrary rewrites, or permit project implementation changes.

## 4. A readable whole-report work plan

The plan should explain the work to a person before presenting administrative details. Use ordinary headings and concise summaries. Omit irrelevant fields rather than leaving pages of placeholders. Do not force every item into a very wide table.

### 4.1 Recommended information order

1. **Where we are:** Current section, last completed action, next action, and actual blockers.
2. **What this work must deliver:** Purpose, scope, authoritative brief, submission constraints, and applicable user decisions.
3. **Whole-report outline and progress:** Stable item identity, actual heading, criterion mapping where justified, purpose, and status.
4. **Completed-content summaries:** Main argument or conclusion, decisions established, report location/version, and what later sections inherit.
5. **Upcoming work and dependencies:** Evidence needed, prerequisite sections, and the next permissible action.
6. **Recent changes and unresolved decisions:** Short reasons, affected items, and exact scope of recorded approvals.

Compact revision and source details belong with the relevant item or in a small reference area within this same file. Avoid parallel registers repeating the same decision in several places.

### 4.2 Different depth for different distances

| Part of the plan | Required depth |
|---|---|
| Whole report | Known sections, purpose, requirement coverage, and relationships. Preserve uncertain organization as provisional. |
| Work about to begin | Concrete intended argument, evidence requirements, unresolved decisions, and next action. |
| Completed work | Concise substantive summary, actual location, verification limits, and applicable user approval. |
| Distant or evidence-dependent work | Purpose and known prerequisites; do not invent detailed arguments or results. |
| Reopened work | What changed, why, what remains valid, and the specific revision required. |

A whole-report outline is not the detailed outline approval for each criterion. Preserve the existing separate analysis, detailed-outline, and draft decisions. Do not mark a heading complete merely because its outline exists.

### 4.3 Progress and readiness must remain distinguishable

Use readable states such as not started, in progress, awaiting review, approved, needs review, and revision in progress. Record evidence gaps and verification limits separately so that an approved incomplete draft cannot masquerade as a fully evidenced final section.

An approval belongs to the section and version actually reviewed. A section delivered in chat but not saved into the working report must say so. If the chat text is no longer recoverable, do not fabricate the missing draft from its summary.

Stable item identities survive heading changes, reordering, merging, or splitting. Preserve the mapping from old items to new locations and from actual content to authoritative criteria. Do not invent P/M/D labels from memory when the source does not establish them.

## 5. Prompt understanding and confirmation boundaries

The assistant must interpret the current message in context before changing a decision. Detecting an alternative is not accepting it. A proposal may be recorded as an unresolved option without replacing the current approved direction.

| Prompt intent | Example | Permitted response and record effect |
|---|---|---|
| Question | “Would MongoDB fit better?” | Explain suitability. Keep the adopted technology unchanged. |
| Comparison or analysis | “Compare MySQL and MongoDB for this project.” | Compare against known requirements and evidence. Do not switch the project or report decision. |
| Brainstorming | “What other ways could we organize this chapter?” | Present suitable options and tradeoffs. Record a pending choice only if useful; do not adopt the recommended option automatically. |
| Hypothetical | “If we removed login, what would change?” | Analyze consequences as hypothetical. Do not remove login or mark dependent work obsolete. |
| Clear decision | “Use MongoDB for the revised design.” | Record the new design decision and identify affected content. Do not claim the implementation has migrated. |
| Clear revision request | “Rewrite this section and synchronize the related discussion.” | Revise within that authorized scope, honoring applicable unresolved writing approvals and evidence needs. |
| Change of order | “Do testing first today.” | Change the next task if prerequisites allow; do not assume the overall outline has been rejected. |
| New file | “Here is another version.” | Read it and determine its role. Ask only if replacement versus reference status is materially ambiguous. |
| Short approval | “OK.” | Apply only to an unambiguous pending proposal and version. Do not use it as blanket approval for several unresolved choices. |
| Praise or acknowledgment | “That idea is useful.” | Do not infer a technology change, file creation, or implementation instruction solely from praise. |
| Cancellation or deletion request | “Remove this section.” | Identify requirement/dependency consequences. Preserve artifacts/history appropriately; clarify only unresolved deletion or scope implications. |
| Unrelated question | A side question during drafting | Answer it without erasing progress or treating it as approval of a pending outline. |

When a change is clear and already authorized, report its material effects and proceed without asking the same permission again. Ask when the target, choice, consequences, or authority is genuinely unresolved. A pending decision blocks only its dependent action.

## 6. Three-way linkage: report, progress record, and project context

The three artifacts must be connected through relevant sections, decisions, source evidence, and versions. A change in any one triggers an impact check across the other applicable artifacts. It does not require mechanically rewriting all three, nor does it authorize changing source code to make a report claim true.

### 6.1 What each source establishes

| Source | Establishes |
|---|---|
| Current user instruction | Intended action, decision, and authorized scope. |
| Adopted assignment brief or requirements | Obligations the deliverable must satisfy. |
| Actual report content | What has been written, including contradictions or gaps. |
| Project source, runtime observations, and test evidence | What is implemented or observed under identified conditions. |
| Work plan and project context | Derived summaries, links, decisions, and inspection state; not replacements for primary evidence. |

Conflicting sources are recorded with their provenance and scope. A new instruction can change an intended design but cannot retroactively change measured results. A newer file is not automatically an approved replacement.

### 6.2 Change propagation matrix

| Change origin | Work-plan effect | Project-context effect | Report effect |
|---|---|---|---|
| Report argument or conclusion changes | Refresh summary, dependencies, next steps, and affected approval status. | Recheck project claims if used; record changed interpretation or evidence need without altering observed facts. | Review dependent paragraphs, figures, tables, and conclusions within authorization. |
| Outline or scope changes | Update item mapping, requirement coverage, and upcoming work. | Update relevant evidence needs and section links if affected. | Identify content to move, revise, add, or retire; do not silently rewrite unrelated approved sections. |
| Actual project implementation changes | Mark dependent items for review and identify new evidence requirements. | Reinspect changed sources and update observed state with version and limits. | Reassess descriptions, results, and conclusions against the report's intended project version. |
| User changes intended technology | Record the adopted design decision and affected items. | Keep intended technology separate from current implementation. | Update the authorized design discussion; do not claim migration without evidence. |
| A screenshot or test result changes | Update its dependent items and readiness. | Record source/version/environment and superseded evidence relationship. | Recheck captions, references to the evidence, result tables, and dependent conclusions. |
| Wording or formatting changes without a substantive effect | Refresh locators/version where necessary. | No factual update if no project claim is affected. | Preserve substantive approvals where meaning is unchanged; verify the edited artifact. |

Where an artifact is unaffected, retain it unchanged. Where an update is needed but not authorized or not supported, mark the dependency as pending instead of pretending synchronization is complete. Project context may be absent when no project exists; do not create it just to satisfy this matrix.

### 6.3 Reopening completed content

1. Preserve the prior approval and its actual version or recoverable version-history locator.
2. Record the new request and what it changes.
3. Mark the affected working item as needing review or revision.
4. Inspect dependent sections before deciding which require substantive edits.
5. Keep unaffected decisions, approvals, evidence, and completed items intact.
6. Update the current summary after the authorized revision has actually been made.
7. Obtain only the applicable approval for the changed content; never transfer old approval to a substantively different version.

“Needs review” means an impact must be assessed; it does not mean the section is already proven wrong. A proposed change must not erase the fact that earlier work was completed under an earlier valid decision.

### 6.4 Illustrative change scenario

Suppose a report's design and test discussion use MySQL. The user first asks whether MongoDB would be better. The assistant compares alternatives and retains the existing decision. If the user then explicitly adopts MongoDB for the revised design, the assistant identifies the technology rationale, data model, and relevant test discussion as affected; an unrelated DNS theory section remains unchanged.

The plan records the new design choice. The project context continues to say that the inspected implementation uses MySQL until contrary evidence is verified. Existing MySQL test results retain their original version and conditions. The assistant revises only authorized content and explains which further evidence is needed. This example is a workflow illustration, not a claim about an actual user project.

## 7. Project readiness and survey permissions

### 7.1 Evidence levels

Record whether each important claim comes from a user description, approved plan, inspected code/schema, observed UI/runtime behavior, or an executed test. Keep the original source locator, relevant revision, environment, date of observation, and coverage limits where applicable.

Code existence does not prove correct runtime behavior. A screenshot does not prove a complete workflow. A README does not prove tests passed. A passing test supports the tested conditions, not all environments. Do not reuse evidence from an older version as a result for a new one.

### 7.2 Incomplete or unavailable projects

- With no project, continue independent theory or requirement work and name the dependent sections that must wait.
- With a partial project, record actual readiness feature by feature rather than inventing a percentage of completion.
- With missing results, prepare a test plan only when that is useful and authorized; do not count it as execution evidence.
- Missing automated test code does not establish that manual testing is impossible.
- With an inaccessible source, retain prior evidence as historical and mark current verification unavailable.
- If a project is replaced, preserve which report content and evidence concern the previous project, then remap only the authorized current scope.
- A snapshot-based report may intentionally describe an older project version. Ask which baseline is intended only when the request does not resolve that choice.

### 7.3 Permitted observation and controlled execution

The proposed assistant may read code and database structure, inspect an application, run authorized tests, interact in a permitted test environment, and capture screenshots for the report. It must not modify application code, configuration, schema, production data, or Git state under report-survey authority.

Tests, startup scripts, builds, and UI actions can create files or records. Inspect their effects and prerequisites before execution. Establish a standing permission boundary for named environments and expected temporary/test outputs where useful, so routine authorized evidence collection does not require repeated confirmation. Existing permission applies only within that boundary; installation, migrations, destructive actions, or additional writes remain separate decisions.

Do not store passwords, tokens, or secret account details in the Markdown records. Record the test account role and approved access mechanism without embedding credentials. Store screenshots and logs in authorized report output locations, linked from the context record.

Software investigation continues through the Coding router with these bounds. A generic coding instruction to fix, build, install, or test must not expand the report survey into an implementation task.

## 8. Assistant operation and self-checking

### 8.1 On a relevant request or resumption

1. Interpret the current message using retained context; determine whether it is discussion, a decision, a revision, a new input, or a continuation.
2. Discover or reuse the adopted work-plan path. Read current position before unrelated sources.
3. Inspect the actual report passages and project sources needed for this operation. Reuse unchanged evidence only when its relevant content and identity remain available.
4. Compare actual state with saved summaries and identify discrepancies.
5. Explain material consequences briefly. Resolve only decisions that are genuinely missing.
6. Perform the authorized work and update the applicable records at a meaningful checkpoint.
7. Reopen saved portions and check their agreement with each other and the real artifacts.
8. Return the requested result with the current next step and any unresolved dependency.

Do not reread the entire project or rewrite both records after every casual message. Meaningful triggers include an adopted decision, revised or approved section, changed source, new evidence, export, or handoff. Routine bookkeeping should not dominate the conversation.

### 8.2 Short resumption summary

Retain Anti's short orientation idea: what is done, what comes next, and what changed or is blocked. Use it when the user resumes a tracked work item after a gap or when it resolves uncertainty. It is an informational summary, not a mandatory confirmation card.

If the user already asks to revise a specific section, begin that authorized work after the relevant checks. Do not force them to approve a generic previous next step. Do not greet every unrelated question with a report-status summary.

### 8.3 External changes and limits

The assistant detects external changes when it can access and inspect the relevant source. It does not continuously monitor files between turns unless a separate, explicitly established capability provides that service. Record the last checked version and coverage; do not claim automatic discovery of inaccessible changes.

A commit identifier alone does not identify uncommitted content. Use relevant file differences or other available revision evidence. Different local and deployed versions must remain distinguishable. When multiple interpretations remain, preserve the conflict and ask a narrow question rather than silently choosing a favorable source.

### 8.4 Single-writer updates and interruption recovery

All participating skills and agents use the same adopted records. Readers and reviewers return findings; the designated editor performs persistent updates. Before writing, check whether another actor has changed the target since it was read. Preserve unrelated user notes and changes.

Save and verify the actual deliverable first when it is being edited, then update the affected project observations and work-plan checkpoint in a defined sequence. Link them through the same change description or revision reference inside the existing records. Check that the combined saved state is consistent before calling it synchronized.

This is a recoverable sequence, not a promise that multiple file writes are atomic. If one write fails, identify the saved and unsaved parts. On relevant resumption, reconcile from real artifacts and evidence before continuing. Do not generate a third recovery tracker or claim a saved report from a plan entry alone.

## 9. Integration with skills, rules, templates, and agents

The following table assigns proposed responsibilities. It does not assert that the integration has already been implemented or tested. Shared rules should have one canonical owner and be referenced by consumers to avoid contradictory copies.

| Component | Required integration |
|---|---|
| `AGENTS.md`, `adapters/pi/bootstrap.md`, host routing | Keep classification, setup authorization, bounded discovery, and current-prompt routing consistent. A continuation does not automatically advance the previous stage. |
| `skills/using-workspace-superpowers/SKILL.md` | Select the current operation, recover the adopted records, and coordinate handoffs; do not author content or create a parallel state system inside the router. |
| `references/work-tracking.md` | Own the two-record model, creation/reuse policy, readable progress semantics, revision-scoped approvals, checkpoints, and recovery. |
| `references/workflow-continuity.md` | Own the prompt-intent distinctions, change-of-order behavior, temporary switches, and bounded propagation of change. |
| `references/project-grounding.md` | Own evidence provenance, readiness, source versions, permissions, record placement, and conflicts between intention and implementation. |
| `references/document-continuity.md` | Connect prior conclusions, terminology, voice, scenario, and adjacent prose to the affected work items. |
| `references/criteria-writing-contract.md`, `references/outline-structure.md` | Keep master planning separate from criterion analysis/outline/draft approvals and evidence readiness. Apply changed decisions only to their actual scope. |
| `references/guided-questions.md`, `references/language-policy.md` | Keep questions natural and necessary; preserve language decisions without inferring approval from a card, silence, or discussion. |
| `templates/work-plan.md` | Put human-readable orientation and whole-report progress first; consolidate duplicate registers and retain compact source/decision/version traceability. |
| `templates/brief.md`, `templates/outline.md`, `templates/deliverable-contract.md` | Treat these as reusable structures, not mandatory additional files for every report. Persist applicable information in the adopted records unless separately requested as a deliverable. |
| `skills/scoping-the-brief/SKILL.md` | Resolve only material unknowns, distinguish setup consent from content approval, and reuse settled identity fields. |
| `skills/reading-artifacts/SKILL.md` | Return actual headings, relevant passages, source revisions, and unread limits; read changed content before relying on old summaries. |
| `skills/analyzing-artifacts/SKILL.md` | Compare records with actual content, distinguish facts from proposals, identify dependencies, and report concrete remaining work. |
| `skills/brainstorming/SKILL.md` | Offer alternatives when a genuine choice remains; recommendation is not adoption. After a choice, hand the decision and affected scope back to the appropriate specialist. |
| `skills/planning-work/SKILL.md` | Own the whole-report outline, item relationships, provisional distant work, and revised next actions. Do not treat the initial outline as immutable. |
| `skills/drafting-prose/SKILL.md`, `skills/writing-reports/SKILL.md`, `skills/writing-academic-prose/SKILL.md` | Consume current approved scope, relevant evidence, and adjacent prose; return actual content changes and limitations for tracking. Do not self-approve or create another tracker. |
| `skills/editing-documents/SKILL.md` | Persist authorized changes as the single writer; preserve approved baselines and user edits, then request verification. |
| `skills/working-with-visuals/SKILL.md` | Bind each proposed or approved figure to its source, report item, asset version, and readiness; distinguish project screenshots from theoretical illustrations. |
| `skills/researching-sources/SKILL.md`, `skills/citing-sources/SKILL.md` | Return checked sources and claim mappings; changed sources trigger affected citation and argument checks without starting unrequested research. |
| `skills/converting-artifacts/SKILL.md`, `skills/formatting-layout/SKILL.md` | Preserve approved content, figures, tables, and template requirements in exports; report source/export identity and verification needs back to the shared plan. |
| `skills/reviewing-work/SKILL.md` | Check requirement coverage, continuity, evidence, and changed-section effects before delivery. Review findings are not user decisions. |
| `skills/verifying-artifacts/SKILL.md` | Reopen the report and changed records, validate their links and version relationships, and identify incomplete synchronization. |
| `skills/packaging-deliverables/SKILL.md` | Report actual verified outputs and export currency; do not create a new progress or handoff file as a packaging side effect. |
| `agents/inspector.md`, `agents/drafter.md` | Receive the same canonical record paths and bounded source context; return evidence/drafts without maintaining private state files. |
| `agents/reviewer-requirement.md`, `agents/reviewer-coherence.md`, `agents/reviewer-prose.md`, `agents/reviewer-citation.md` | Check only assigned dimensions while carrying section/version/decision identity; return findings to the editor rather than silently modifying records. |
| `agents/verifier.md`, `agents/packager.md` | Verify and report the actual final artifacts and consistent checkpoint, including limitations and interrupted updates. |
| `agents/researcher.md`, `agents/formatter.md`, `agents/reviewer-visual.md` | Return sources, formatting results, and visual findings with item and artifact identity; do not create separate evidence trackers or treat an uninspected image as verified. |

No new dedicated memory agent or background service is required for this proposal. Existing roles need a shared, consistently enforced handoff contract.

### 9.1 Connection to the previously recorded improvements

**Reading completed assignments and gap analysis:** Use the 24 September record's read-back requirements. Preserve actual headings, arguments, scenario transitions, and the distinction between content already present and content still missing. Do not populate progress from a grading-grid label or an invented percentage. A later guide comparison must answer the user's remaining-work question rather than restart an unrelated intake flow.

**Brainstorming and outline quality:** Reuse the existing document brainstorming skill. Track candidate organizations as proposals, then record the user's actual choice. Detailed outlines retain the established preview-depth requirement where applicable; distant master-plan items do not need invented detail to meet it.

**Visuals, tables, citations, and Word:** Link each required visual/table/source to the report item and actual evidence or asset. Distinguish planned, available, inspected, approved, embedded, and verified states where relevant. Replacing a figure or source triggers checks of captions, citations, associated claims, and affected exports. The presence of a planned figure in the work plan does not prove it was embedded in Word.

**Voice and document continuity:** Keep the adopted terminology and narrative perspective in the plan's concise continuity notes. Read adjacent passages before continuing. A user-authorized terminology change triggers a scoped consistency review; do not overwrite accurate source quotations or different real-world roles simply to satisfy a keyword rule.

**Mathematics and other artifact types:** Preserve existing domain verification obligations when relevant, including native Word equations, spreadsheet checks, or slide evidence. Tracking readiness must not replace the specialist's actual checks or introduce those domains when the request does not need them.

## 10. Proposed implementation order

1. Consolidate the shared rules for prompt intent, record creation, responsibilities, evidence, and change propagation. Resolve source-project versus report-workspace placement explicitly.
2. Simplify the canonical work-plan template and define a compact project-context structure without introducing additional mandatory management files.
3. Update routing, planning, reading, analysis, editing, review, verification, and agent handoffs together so that they use the same records and meanings.
4. Connect the earlier reading, brainstorming, continuity, visuals, citations, and Word improvements to item dependencies and evidence state.
5. Add contract-level checks for required integration, then run behavioral scenarios on the target host. Text presence alone is insufficient evidence of correct behavior.
6. Reconcile existing records when adopting the new model. Preserve valid decisions, approved content, source links, and user notes. Do not delete old records solely to make the count equal two.
7. Build or package only under a later implementation request and verify the installed behavior separately from source-tree changes.

For existing setups, choose one canonical plan and one applicable context record, consolidate required information, verify links, and retire superseded management records only with appropriate authority and recoverability. Do not create an extra migration tracker.

## 11. Acceptance scenarios for future verification

These are proposed tests, not executed or passing results.

| ID | Scenario | Expected behavior |
|---|---|---|
| SYNC-01 | Start a long report without a project. | Establish setup consent once; create only the plan and identify project-dependent work. |
| SYNC-02 | Ask one conceptual question. | Answer it without creating a plan or project context. |
| SYNC-03 | Resume with a matching existing plan. | Reuse the canonical path and decisions; inspect relevant current sources. |
| SYNC-04 | Ask whether another technology would be better. | Compare without changing the adopted decision or implementation facts. |
| SYNC-05 | Ask for several chapter organizations. | Brainstorm options; recommendation does not become approval. |
| SYNC-06 | Explicitly adopt a new design technology. | Record the decision, identify affected sections, and preserve the distinction from implemented technology. |
| SYNC-07 | Explicitly authorize synchronizing related sections. | Revise within that scope without repeating the same permission request; preserve applicable unresolved content approvals. |
| SYNC-08 | Request a hypothetical removal. | Explain consequences without actually removing content or invalidating approvals. |
| SYNC-09 | Change only the order of work. | Update the next task, not the approved structure or unrelated completed items. |
| SYNC-10 | Revise a previously approved section. | Keep the old approval tied to its version; mark only affected current/dependent content for review. |
| SYNC-11 | Rename, move, merge, or split a section. | Preserve stable identity and criterion mapping; update locators without duplicating progress. |
| SYNC-12 | Remove content satisfying a mandatory criterion. | Explain the coverage gap; do not mark the report fully complete. |
| SYNC-13 | Edit the report outside chat. | Detect relevant differences on inspection and reconcile summaries without inventing approval. |
| SYNC-14 | Modify source files without a new commit. | Consider relevant uncommitted changes; do not treat commit equality as unchanged evidence. |
| SYNC-15 | Use an older project version intentionally. | Preserve its evidence baseline and do not silently replace it with newer project facts. |
| SYNC-16 | Introduce a project after planning. | Create/reuse the conditional context record within setup authority; link only relevant items. |
| SYNC-17 | Require real results from an incomplete feature. | Identify the gap and continue independent work; a test plan is not recorded as executed results. |
| SYNC-18 | No automated test code exists. | Check permitted alternatives before declaring testing impossible. |
| SYNC-19 | A startup/test command writes data or requires installation. | Check standing authority and effects; do not execute under a false read-only assumption. |
| SYNC-20 | Receive new evidence replacing a figure or result. | Reassess dependent claims, captions, references, and affected exports; keep provenance. |
| SYNC-21 | Change a selected document voice or term. | Review affected prose and continuity without changing unrelated project facts. |
| SYNC-22 | A subagent completes an assigned draft. | Return content and gaps to the shared workflow; create no private tracker and infer no approval. |
| SYNC-23 | Another actor changes a record before save. | Reconcile the current revision and preserve unrelated changes rather than overwriting them. |
| SYNC-24 | The report saves but a record update fails. | Report the split result and recover on resumption; do not claim full synchronization. |
| SYNC-25 | The project or previous chat content is inaccessible. | State the exact gap; do not claim current verification or reconstruct missing prose as the original. |
| SYNC-26 | A user asks a clear action after a long gap. | Provide only useful orientation and proceed with the authorized action, without a mandatory generic confirmation. |
| SYNC-27 | Multiple old trackers are present. | Reconcile identities and content before consolidation; preserve history and avoid an extra tracker. |
| SYNC-28 | An incomplete draft has been approved. | Preserve that approval and the unresolved evidence gap separately; do not label the criterion fully satisfied. |
| SYNC-29 | Routine work completes after initial tracking consent. | Update and verify records automatically; do not ask the user to maintain Markdown. |
| SYNC-30 | Current source contains brainstorming but an old issue says it was missing. | Report the historical distinction and test integration; do not create a duplicate skill or assert installed behavior. |

## 12. Completion boundaries for this issue record

At the original 27 September recording stage, this document only recorded the reported issues, accepted direction, proposed responsibilities, and future acceptance scenarios. No scenario was marked passed, and that recording task did not change the report workflow, source code, skill pack, templates, rules, agents, or adapters. The implementation update below supersedes that historical source/package status while retaining the native acceptance boundary.

Future implementation is complete only when the records remain readable, prompt intent is respected, change propagation is bounded and evidence-based, interrupted updates are recoverable, and the relevant behavioral scenarios have actual verification results on the target host.

## Implementation update — 28 September 2026

This issue is implemented at the source-contract and package-test level. The
canonical model is now limited to two management records: `work-plan.md` owns
the whole-report outline, progress, decisions, dependencies and next action;
`project-context.md` owns project identity and inspected project evidence. The
work plan and context record have separate responsibilities, stable identities,
revision- and scope-bound approvals, bounded propagation, and recoverable
single-writer checkpoints. The work-plan template starts with the current
position, deliverable/scope, whole-report outline and progress, completed
summaries, upcoming work and dependencies, and recent changes/decisions.

No concrete user project or authorized source-project setup exists for this
repository task, so no new `project-context.md` was created. The placement rule
now records report-workspace versus source-project placement and reuses one
designated context only when a concrete project and authority exist. The only
copy found under `.tmp/work-tracking-execution/project-context.md` is an older
ignored test fixture; it was not adopted or changed.

Files updated for this implementation, alongside pre-existing working-tree
changes, are:

- `references/work-tracking.md`
- `references/workflow-continuity.md`
- `references/project-grounding.md`
- `templates/work-plan.md`
- `skills/using-workspace-superpowers/SKILL.md`
- `skills/scoping-the-brief/SKILL.md`
- `skills/reading-artifacts/SKILL.md`
- `skills/analyzing-artifacts/SKILL.md`
- `skills/planning-work/SKILL.md`
- `skills/editing-documents/SKILL.md`
- `skills/reviewing-work/SKILL.md`
- `skills/verifying-artifacts/SKILL.md`
- `adapters/pi/bootstrap.md`
- `adapters/pi/routing-trial.md`
- `tests/architecture/project-tracking-synchronization.test.mjs`
- `tests/scenarios/manual/project-tracking-synchronization.md`

The focused architecture test was intentionally RED before implementation
(12 tests, 0 passed, exit 1) and is now green (12/12, exit 0). The required
regressions also pass: `real-world-refinements` 17/17, `continuity-links` 3/3,
`criteria-writing` 18/18, `criterion-gates` 9/9, `question-delivery` 7/7,
and `visual-export-citations` 6/6. The aggregate `node tests/run.mjs` result is
176/176 passed, exit 0. `python scripts/test-package-pi.py` is 5/5 passed,
exit 0. `git diff --check` exits 0.

Source and packaged checks therefore pass on branch `v0.1.5-beta` with package
version `0.1.5-beta`. SYNC-01 through SYNC-30 remain `PENDING` because no native
PI-Desktop replay or retained runtime traces were run. No background monitoring
is claimed. No rendered DOCX/PDF artifact was produced or inspected for this
issue, so rendered fidelity remains unverified; the existing visual, Word and
citation limitations are preserved.

The earlier closure record `test-issues/2026-09-24-doc-bai-da-lam.md` and the
earlier visuals/tables/Word/citations closure remain preserved; this update does
not reopen or rewrite them.

## Follow-up remediation — 28 September 2026

An independent source/package review identified two required corrections in the
implementation above and one related checkpoint gap. They are now addressed in
the working tree without changing the branch, package version or earlier issue
closures.

### Placement and survey boundary

- New `project-context.md` records default to the approved report workspace or
  another authorized output location.
- An existing adopted source-project context is reusable only at its exact
  recorded authorized path. A new source-project path is allowed only when the
  user explicitly authorizes that exact placement; this does not grant other
  repository writes.
- Survey authority alone cannot choose a new source-project path. The raw
  `adapters/pi/project-survey.mjs` utility is restricted in the adapter guidance
  to disposable fixtures or an exact explicitly authorized path; normal survey
  persistence uses the reader/analyzer/editor handoff and preserves curated
  context identity. A survey-only context update does not create a work plan.

### Single-state work plan

`templates/work-plan.md` now has one `Where We Are / Resume Here` orientation and
one readable whole-report item register made of compact per-item blocks. Each item
separates progress, evidence readiness, content locator, remaining dependencies,
approval references and verification references. Completed summaries and upcoming
work link to those records instead of maintaining a second status or next-action
copy. Legacy plans may be adopted through their equivalent sections and are
consolidated under existing editing authority rather than receiving duplicate
registers.

### Checkpoint transaction and recovery

The canonical checkpoint sequence is now: inspect current revisions before each
write; save and reopen the deliverable; update/reopen an affected authorized
context (first creation requires its own authorized placement/scope); update/reopen the plan checkpoint
last; then reread every touched record. All touched management records carry the
same change reference and source/output revisions. Absent or unaffected context
is intentionally skipped and is never created for transaction symmetry. Report,
context and plan failures retain exact saved/unsaved portions for reconciliation;
no recovery tracker is created.

The verifier, editor, reader, verifier role, PI adapter guidance and manual
operator scenarios now use this same order and boundary. The architecture test
suite contains explicit regressions for new/default placement, adopted context
reuse, exact placement override, single-state progress, per-write conflict
checks, absent context and each partial-save result. The manual SYNC cases remain
`PENDING` until native PI-Desktop transcripts and tool traces exist.

### Fresh verification

All commands below were run after the follow-up edits and exited 0:

| Check | Result |
|---|---:|
| `node --test tests/architecture/project-tracking-synchronization.test.mjs` | 14/14 |
| `node tests/run.mjs` | 178/178 |
| `python scripts/test-package-pi.py` | 5/5 |
| `python -B tests/architecture/word-visual-fidelity.test.py` | 16/16 |
| `git diff --check` | pass (only normal LF/CRLF warnings) |

An independent read-only review of the contracts, template, consumers and manual
scenario definitions found no remaining source/package blocker. It also reran
the focused suite (14/14); its scenario review was a desk review, not native host
execution. The source/package remediation is **APPROVED** within this scope. Native
PI-Desktop execution, continuous monitoring and rendered DOCX/PDF fidelity remain
`PENDING`/`UNVERIFIED`; no transcript, native Skill/tool trace or rendered
artifact was created in this session. The branch remains `v0.1.5-beta`, package
version remains `0.1.5-beta`, and the earlier closure hashes remain unchanged.

<!-- END SOURCE S4 -->

---

<a id="source-05"></a>

# S5 — Voice, terminology and continuity between report sections

Original file: [2026-09-27-tinh-nhat-quan-van-phong-xung-ho-va-mach-noi-bao-cao.md](2026-09-27-tinh-nhat-quan-van-phong-xung-ho-va-mach-noi-bao-cao.md)

<!-- BEGIN SOURCE S5: 2026-09-27-tinh-nhat-quan-van-phong-xung-ho-va-mach-noi-bao-cao.md -->
# Ghi nhận vấn đề kiểm thử & Định hướng: Tính nhất quán văn phong, danh xưng xưng hô, mạch nối bài báo cáo & Tự kiểm định trước khi xuất bài

- **Mã tài liệu:** `test-issues/2026-09-27-tinh-nhat-quan-van-phong-xung-ho-va-mach-noi-bao-cao.md`
- **Ngày ghi nhận:** 27/09/2026
- **Phiên bản triển khai:** nhánh `v0.1.5-beta`, package `0.1.5-beta`.
- **Nguồn phát hiện:** Phản hồi người dùng trong quá trình kiểm thử viết bài báo cáo học thuật / đồ án dài có nhiều tiêu chí (P, M, D).
- **Trạng thái:** Đã triển khai và xác minh cấp source/package ngày 28/09/2026. Native PI-Desktop và nghiệm thu DOCX render vẫn `PENDING`; chi tiết và quyết định triển khai tại mục 6.

Các mục 1–5 giữ lại ghi nhận ban đầu. Mục 6 xác định phạm vi triển khai hiện hành,
đặc biệt thay quy tắc một từ toàn tài liệu, hạn ngạch số câu và đề xuất “Stop 3”
bằng kiểm tra theo vai trò/ngữ cảnh và các trách nhiệm review sẵn có.

---

## 1. Bản chất vấn đề ghi nhận

Khi thực hiện các bài báo cáo, đồ án hoặc luận văn dài bao gồm nhiều chương/tiêu chí (ví dụ: các tiêu chí P1, P2, M1, D1...), hệ thống AI hiện tại bộc lộ hiện tượng **"Vết gãy phong cách & Mất tính liên tục tài liệu" (Style Fracture & Lack of Document Continuity)**, tạo cảm giác bài viết được chắp vá bởi **2–3 người viết hoặc nhiều AI khác nhau** thay vì một tác giả duy nhất có tư duy mạch lạc.

### Các biểu hiện sai sót cụ thể

1. **Bất nhất về cách xưng hô và danh xưng học thuật (Terminology & Persona Inconsistency):**
   - *Dẫn chứng thực tế:* Ở tiêu chí P1–P2, AI dùng từ `teacher`, nhưng sang M1 lại tự đổi thành `lecturer`, rồi qua tiêu chí D1 lại chuyển thành `professor` (giáo sư). Sự nhảy từ tùy tiện này làm mất tính chuyên nghiệp học thuật.
   - Ngôi kể của người viết cũng bị lệch pha: có đoạn xưng `I / the author`, có đoạn lại dùng `we`, có đoạn lại chuyển sang thể bị động khách quan hoàn toàn mà không có sự nhất quán.
2. **Văn phong lệch nhịp giữa các phần (Tone of Voice Mismatch):**
   - Tiêu chí trước viết theo lối giải thích đàm thoại đơn giản, ngắn gọn; tiêu chí sau lại đột ngột chuyển sang văn phong hàn lâm nặng nề, phức tạp. Độ dài câu, cấu trúc đoạn và cách đặt vấn đề bị chênh lệch rõ rệt.
3. **Ý tưởng và lập luận rời rạc, "đá ý" nhau (Lack of Contextual Cohesion):**
   - Các tiêu chí P, M, D bị chia cắt thành từng khối độc lập. Tiêu chí sau không kế thừa bối cảnh, số liệu, ràng buộc kỹ thuật hay quyết định thiết kế đã được xác lập ở tiêu chí trước. Thậm chí tiêu chí sau đưa ra giải pháp kỹ thuật mâu thuẫn với tiêu chí trước.
4. **Tật xấu "lao vào viết ngay" khi người dùng yêu cầu làm tiếp (Blind Drafting):**
   - Khi người dùng gửi file bài đã làm dở hoặc đưa ra lệnh *"viết tiếp tiêu chí tiếp theo"*, AI thường hấp tấp triển khai ngay lập tức mà **không đọc, không thẩm định và không giải mã ngữ cảnh** của những nội dung đã có trước đó.
5. **Thiếu bước tự kiểm định chất lượng cuối cùng (Lack of Pre-Delivery Verification):**
   - Khi viết xong nội dung hoàn chỉnh trong chat hoặc xuất file Word (`.docx`), AI gửi bài ngay mà không rà soát lại một lần cuối, dẫn đến việc lọt lỗi sai về danh xưng, lỗi vỡ bảng biểu, mất ảnh nhúng hoặc lệch format so với mẫu.

---

## 2. Chuẩn mực "Một người viết duy nhất" (Single-Author Consistency Standard)

Mọi bài báo cáo, đồ án dài từ 2 tiêu chí/chương trở lên bắt buộc phải thiết lập và duy trì một **Hồ sơ phong cách thống nhất (Single-Voice & Terminology Profile)** xuyên suốt:

### A. Quy chuẩn Danh xưng & Ngôi kể (Persona & Honorifics)
- **Danh xưng người chấm / giảng viên:** Bắt buộc khóa cố định **duy nhất 1 thuật ngữ** cho toàn bộ tài liệu (ví dụ: chuẩn hóa dùng `Lecturer / Assessor`, nghiêm cấm việc tùy tiện đổi giữa `Teacher`, `Instructor`, `Lecturer`, `Professor`).
- **Ngôi xưng tác giả:** Khóa cố định một góc nhìn nhất quán:
  - *Mặc định học thuật:* Sử dụng thể khách quan học thuật (`this report`, `the project`, `the proposed system`).
  - *Nếu dùng ngôi thứ nhất:* Cố định dùng `the author` hoặc `I` (nếu bài cá nhân), hoặc `we` (nếu bài nhóm). Tuyệt đối không hoán đổi giữa các tiêu chí.

### B. Từ điển thuật ngữ & Khóa kịch bản dự án (Glossary & Scenario Lock)
- Tên dự án, bài toán nghiệp vụ, vai trò tư vấn, phạm vi công việc, ngăn xếp công nghệ (tech stack), ngân sách, tiến độ đã chốt ở tiêu chí đầu tiên (ví dụ P1, Section 1) là **bất biến** trong toàn bộ các tiêu chí tiếp theo (M, D, Section tiếp theo).
- Tiêu chí nâng cao (M, D) chỉ phân tích sâu hơn hoặc so sánh giải pháp dựa trên đúng kịch bản đó, không được tự ý đổi tên hệ thống hoặc bịa thêm các module trái ngược.

### C. Âm sắc văn phong & Cấu trúc đoạn văn (Academic Tone & PEEL Framework)
- Duy trì một "âm sắc học thuật" (Academic Register) đồng đều: trang trọng, khách quan, giàu sức thuyết phục và lập luận chặt chẽ.
- Mỗi đoạn văn phát triển trọn vẹn theo cấu trúc PEEL (Point - Explanation - Evidence - Link), độ dài lý tưởng từ 4–5 câu, tránh câu quá cụt hoặc biến đoạn văn thành danh sách gạch đầu dòng (chống tật Lead-and-list defect).

---

## 3. Quy trình bắt buộc khi nhận lệnh "Viết tiếp tiêu chí / Gửi bài cũ làm tiếp" (Continuity Protocol)

Khi người dùng gửi file nội dung đã làm trước đó hoặc ra lệnh tiếp tục triển khai tiêu chí mới, AI phải tuân thủ nghiêm ngặt quy trình 3 bước sau:

```
[Nhận yêu cầu viết tiếp / Nhận bài cũ]
                │
                ▼
  ┌─────────────────────────────┐
  │ BƯỚC 1: ĐỌC & GIẢI MÃ       │ ◄── Nghiêm cấm viết ngay
  │ - Danh xưng & Ngôi kể       │
  │ - Văn phong & Cấu trúc bài  │
  │ - Kịch bản kỹ thuật đã chốt │
  └─────────────┬───────────────┘
                │
                ▼
  ┌─────────────────────────────┐
  │ BƯỚC 2: THIẾT LẬP CẦU NỐI   │ ◄── Xác định kế thừa & liên kết
  │ - Kế thừa dữ liệu gì?       │
  │ - Tránh mâu thuẫn điểm nào? │
  │ - Câu chuyển tiếp (Bridge)  │
  └─────────────┬───────────────┘
                │
                ▼
  ┌─────────────────────────────┐
  │ BƯỚC 3: QUY TRÌNH 2 ĐIỂM DỪNG│
  │ - Stop 1: Phân tích kết nối │ ◄── Dừng chờ duyệt
  │ - Stop 2: Dàn ý kèm Bridge  │ ◄── Dừng chờ duyệt
  │ - Stop 3: Soạn thảo chuẩn   │
  └─────────────────────────────┘
```

### Bước 1: Đọc & Giải mã bài cũ (Read & Extract Voice Profile)
- Mở và khảo sát kỹ các phần đã làm trước đó:
  1. Trích xuất danh xưng giảng viên và ngôi xưng tác giả đang dùng.
  2. Đo lường văn phong, cấu trúc câu và phong cách bố cục các tiêu đề.
  3. Ghi nhận các quyết định kiến trúc, công nghệ và bài toán nghiệp vụ đã được chốt.

### Bước 2: Thiết lập cầu nối ngữ cảnh (Contextual Linkage & Gap Analysis)
- Trả lời rõ: *Tiêu chí mới này liên quan và kế thừa những gì từ các tiêu chí đã hoàn thành?*
  - Ví dụ: Khi viết tiêu chí M1 (So sánh mô hình kiến trúc), không so sánh chung chung trong chân không, mà phải đối chiếu trực tiếp với bài toán và ràng buộc đã nêu ở P1–P2.
- Chuẩn bị các câu chuyển tiếp (Transition hooks/bridges) để người đọc thấy rõ sự mạch lạc liền mạch giữa các phần.

### Bước 3: Đưa kiểm tra liên tục vào "Hai điểm dừng" (Stop Gates)
- **Tại Stop 1 (Phân tích yêu cầu):** Bắt buộc trình bày rõ ràng:
  - *Mục tiêu tiêu chí mới.*
  - *Mối liên hệ kế thừa với các phần trước (Continuity Check).*
  - *Cam kết bộ danh xưng và thuật ngữ sẽ áp dụng.*
  - $\rightarrow$ **STOP xin duyệt của người dùng.**
- **Tại Stop 2 (Dàn ý chi tiết):**
  - Mở đầu bằng luận điểm liên kết ngữ cảnh (Bridge from previous section).
  - Triển khai dàn ý bám sát 30–40% nội dung chi tiết.
  - $\rightarrow$ **STOP xin duyệt của người dùng.**

---

## 4. Hàng rào tự kiểm định trước khi giao bài (Pre-Delivery Final Verification Pass)

Trước khi bàn giao bất kỳ nội dung hoàn chỉnh nào trực tiếp trong chat, hoặc trước khi xuất/chỉnh sửa file Word (`.docx`), AI bắt buộc phải thực hiện **một lượt tự rà soát độc lập (Self-Review Pass)** theo bảng kiểm sau:

| Hạng mục kiểm tra | Tiêu chuẩn bắt buộc | Hành động xử lý nếu vi phạm |
| :--- | :--- | :--- |
| **1. Danh xưng xưng hô** | Chỉ xuất hiện duy nhất 1 danh xưng học thuật đã thống nhất (ví dụ: toàn bài chỉ dùng `lecturer`, không có chữ `teacher` hay `professor`). | Sửa lại ngay trước khi gửi kết quả. |
| **2. Ngôi kể tác giả** | Ngôi kể đồng nhất từ đầu đến cuối (toàn bài dùng thể khách quan hoặc cố định `the author`). | Chuẩn hóa lại các câu bị lệch ngôi. |
| **3. Mạch logic & Kịch bản** | Tên dự án, tech stack, số liệu và giả định hoàn toàn khớp với các tiêu chí trước; không bị "đá ý" hoặc mâu thuẫn. | Loại bỏ các chi tiết tự sáng tác, đồng bộ về kịch bản gốc. |
| **4. Văn phong PEEL** | Không có đoạn văn dạng dàn ý (lead-and-list); mỗi đoạn đều có câu chủ đề, giải thích, dẫn chứng và câu kết nối. | Viết lại các đoạn liệt kê thành đoạn văn phân tích hoàn chỉnh. |
| **5. Trích dẫn 2 chiều** | Mọi in-text citation đều có trong `## References` và ngược lại. Không bịa nguồn (Zero Fabrication). | Tra cứu nguồn kinh điển có thật hoặc xóa in-text giả. |
| **6. Bảng & Ảnh minh họa** | Bảng Markdown đầy đủ tiêu chí so sánh; Ảnh có Caption căn giữa in nghiêng và ghi rõ nguồn gốc. | Bổ sung đầy đủ chú thích và nguồn trước khi gửi. |
| **7. File Word (`.docx`)** | - Bảng là Native Table OpenXML (có border, shading header, bold title).<br>- Ảnh được tải về và nhúng trực tiếp (Inline Image).<br>- Bảo toàn font, margin, line spacing của mẫu. | Mở file kiểm tra lại cấu trúc XML/nội dung trước khi thông báo hoàn tất. |

---

## 5. Kế hoạch cập nhật vào hệ thống Kỹ năng & Hợp đồng (Roadmap)

1. **Cập nhật `references/document-continuity.md`:**
   - Đưa quy định cấm đổi danh xưng (`teacher/lecturer/professor`) và cấm lệch ngôi xưng thành điều khoản vi phạm nghiêm trọng (Critical Violation).
   - Quy định rõ ràng: Nhận lệnh viết tiếp phải kích hoạt bước đọc & giải mã bài cũ trước.
2. **Cập nhật `references/criteria-writing-contract.md`:**
   - Đưa mục *Continuity Check & Voice Lock* thành yêu cầu bắt buộc ở Stop 1 (Phân tích) và Stop 2 (Dàn ý).
   - Đưa *Bảng kiểm tự rà soát trước khi giao bài (Pre-Delivery Checklist)* vào quy trình nghiệm thu Stop 3.
3. **Cập nhật `skills/reading-artifacts/SKILL.md` & `skills/analyzing-artifacts/SKILL.md`:**
   - Bổ sung hợp đồng trích xuất hồ sơ phong cách (Voice & Terminology Profile Extraction) khi đọc bài cũ của người dùng.
4. **Bổ sung bài kiểm thử kiến trúc (Architecture Tests):**
   - Test tự động quét toàn văn báo cáo để phát hiện từ vựng danh xưng bị lẫn lộn (`teacher` xuất hiện cùng `lecturer` hoặc `professor` $\rightarrow$ Đánh rớt kiểm thử).
   - Test kiểm tra sự xuất hiện của câu chuyển tiếp (transition hook) tại các tiêu chí nối tiếp.

---

## 6. Kết quả triển khai và xác minh — 28/09/2026

### Phạm vi triển khai

- Mở rộng continuity profile hiện có, không tạo hồ sơ giọng văn hay hệ thống theo
  dõi song song. Profile giữ phiên bản và điểm chèn, lập luận/tiêu chí liên quan,
  bối cảnh và quyết định dự án, thuật ngữ, ngôi kể/thì theo chức năng, văn phong,
  quy ước trình bày, preserve-list/change-list, ngôn ngữ, phạm vi nguồn và xung đột.
  Profile không thay thế approval record hoặc chứng minh claim/result đã verified.
- Chỉ khóa thuật ngữ cho cùng vai trò/khái niệm đã xác lập. Giữ các vai trò khác
  nhau, tên trong trích dẫn, nguồn, References, ví dụ và cơ sở đào tạo khác nhau.
  Không dùng sự xuất hiện đồng thời teacher/lecturer/professor để đánh trượt bài.
- Giữ ngôi kể đã có căn cứ, không đổi bài cá nhân thành nhóm hoặc ngược lại.
  Kiểm tra câu do tác giả viết kể cả có in-text citation; lời trích/ngôi của nguồn
  được quy thuộc rõ không bị đánh đồng với ngôi tác giả. Thì được xét theo chức năng.
- Tiêu chí sau kế thừa scenario, công nghệ, scope, evidence và giới hạn đã xác lập.
  Không bịa module, số đo, kết quả hay ca kiểm thử. Xung đột được giữ cùng locator;
  đính chính rõ phạm vi của người dùng được ghi nhận nhưng không tự xác minh số đo.
- Reader trích nội dung/locator và yêu cầu rõ của người dùng; analyzer xây profile.
  Phân tích trình bày mối nối và evidence cần thiết; dàn ý áp dụng có bridge tại
  đúng điểm nối. Tái sử dụng quyết định hợp lệ, giữ hai lần duyệt và full in-chat
  delivery cùng review/wait sau draft, không thêm gate thứ ba.
- Tái sử dụng reviewing-work và các reviewer hiện hữu cho danh xưng, ngôi kể,
  scenario, facts/evidence/citations, register/PEEL, bố cục và đoạn nối. Bổ sung
  continuity handoff ở verifying-artifacts; sửa trong phạm vi được phép hoặc báo
  blocker. Mốc 4–5 câu là hướng dẫn định tính, không phải hạn ngạch.
- PI bootstrap đặt route đọc → phân tích → bước đã được phép trong các khối hook
  có thể refresh. Chỉ đọc/ghi nhớ bài hoàn chỉnh vẫn theo read-back, không kéo theo
  intake mới, style enforcement hay viết tiếp. Thêm R24–R27 và bộ manual DC01–DC15,
  tất cả vẫn `PENDING` cho nghiệm thu hành vi.

### File thay đổi trong lần triển khai này

| Nhóm | File |
|---|---|
| Contract | `references/document-continuity.md`; `references/criteria-writing-contract.md` |
| Handoff skill | `skills/reading-artifacts/SKILL.md`; `skills/analyzing-artifacts/SKILL.md`; `skills/verifying-artifacts/SKILL.md` |
| PI guidance | `adapters/pi/bootstrap.md`; `adapters/pi/routing-trial.md` |
| Architecture test mới | `tests/architecture/document-continuity-consistency.test.mjs` |
| Fixture tổng hợp mới | `tests/fixtures/document-continuity/README.md`; `source-report.md`; `group-report.md`; `conflicting-note.md`; `cases.json` trong cùng thư mục |
| Manual mới | `tests/scenarios/manual/document-continuity-consistency.md` |
| Biên bản | Chính issue này |

Không cần sửa thêm drafting-prose, reviewing-work, reviewer-coherence/prose hay
academic-writing-style: các đường chuyển profile, đọc đoạn kề, review trước giao
bài, PEEL định tính và post-draft wait đã có. Tái sử dụng criteria-writing,
workflow/document continuity, evidence register, work plan/approval records và
visual-assets-and-word-fidelity; không sao chép lại hợp đồng native table, ảnh
nhúng, caption, placement, template hay render.

Các thay đổi đã tồn tại trước phiên làm việc được giữ nguyên, gồm phần sửa
visuals/tables/Word/citations và các giới hạn native/runtime của chúng.

### Kiểm thử đã chạy từ workspace root

| Lệnh | Kết quả thực tế | Exit code |
|---|---|---|
| `node --test tests/architecture/real-world-refinements.test.mjs` | 17/17 PASS | 0 |
| `node --test tests/architecture/continuity-links.test.mjs` | 3/3 PASS | 0 |
| `node --test tests/architecture/criteria-writing.test.mjs` | 18/18 PASS | 0 |
| `node --test tests/architecture/criterion-gates.test.mjs` | 9/9 PASS | 0 |
| `node --test tests/architecture/question-delivery.test.mjs` | 7/7 PASS | 0 |
| `node --test tests/architecture/visual-export-citations.test.mjs` | 6/6 PASS | 0 |
| `node --test tests/architecture/document-continuity-consistency.test.mjs` | 16/16 PASS | 0 |
| `node --test adapters/pi/main.test.mjs` | 10/10 PASS | 0 |
| `node tests/run.mjs` | 164/164 PASS | 0 |
| `python scripts/test-package-pi.py` | 5/5 PASS | 0 |
| `git diff --check` | Không có lỗi whitespace | 0 |

Các lượt chạy trực tiếp là các tập con của Node suite, không cộng lại thành tổng
test độc lập. Bộ mới kiểm tra contract và tính hợp lệ của locator/đối chứng trong
15 tình huống tổng hợp; không thực thi bộ phân loại ngữ nghĩa hay chứng minh model
đã viết báo cáo mạch lạc. Review độc lập phát hiện và đã sửa ba điểm: phạm vi reader,
đính chính nguồn hợp lệ và ngoại lệ citation/ngôi kể; lượt tái kiểm tra không còn
blocker trong phạm vi đó.

### Trạng thái source/package và giới hạn

- **Source/package:** PASS trong phạm vi kiểm tra nêu trên. Package test build
  vào thư mục tạm, kiểm tra nội dung, tính tái lập và hook refresh. Không phát hành
  hay cài đặt plugin lâu dài; không tuyên bố runtime đã thực thi các contract.
- **Native PI-Desktop:** `PENDING`. Chưa có transcript nhiều lượt và native
  Skill/tool trace cho R24–R27/DC01–DC15. Giữ nguyên R18/R19 và R20–R23 cùng trạng
  thái nghiệm thu riêng.
- **DOCX/rendered artifact:** `PENDING` cho issue này. Không tạo hoặc render một
  DOCX báo cáo thực trong phiên; kiểm thử source/package/fixture không thay thế
  xác minh XML, layout hoặc thao tác native Word trên artifact thật.
- **Nhánh/version:** Đã kiểm tra vẫn là `v0.1.5-beta` và `0.1.5-beta`. Không tạo
  hoặc chuyển nhánh/worktree; không bump version, commit, push hay publish.
- **Closure trước:** Giữ nguyên file `test-issues/2026-09-24-doc-bai-da-lam.md`,
  gồm closure `APPROVED` cấp source/package và native `PENDING`. Không mở lại hoặc
  viết lại quyết định đó, không sửa bài ASM gốc.

Không còn blocker source/package được phát hiện. Phần còn thiếu là bằng chứng
nghiệm thu hành vi native và artifact render thực tế; các trạng thái đó chưa được
nâng thành PASS.

<!-- END SOURCE S5 -->
