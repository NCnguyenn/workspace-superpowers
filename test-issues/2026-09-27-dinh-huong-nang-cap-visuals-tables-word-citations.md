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

## 4. S3 executable revision-fidelity remediation — 28 September 2026

The remaining source/package blocker was the gap between the R23 wording and the
single fixed synthetic DOCX fixture. The fixture could reject malformed OOXML,
but it did not execute two different requested revisions through build and reopened
verification, and there was no adapter-level proof that an approved revision could
not replace a requested working/unapproved revision.

The remediation keeps R23 and VE01–VE09 `PENDING` as native behavioral cases. It
does not record a native PI run or a Word render. It adds bounded executable evidence:

- `approved-r1` and `working-r2` carry different revision IDs, approval statuses,
  table cells, captions, media names and PNG pixels. The test builder exports and
  reopens each requested revision independently and checks its recorded identity
  and status before content fidelity.
- Negative mutations reject approved-for-working substitution, swapped cells,
  swapped media, wrong placement, missing/wrong borders and left-aligned captions
  where this synthetic template requires centered captions. Existing relationship,
  inline drawing, caption/source and direct-formatting negatives remain covered.
- `adapters/pi/revision-export-route.cjs` is a small route boundary that resolves
  the exact requested revision, passes that record to export and verification, and
  rejects changed revision identity/status or a mismatched verification result.
  Its tests run approved and working requests separately and demonstrate the
  substitution failure. This is adapter contract coverage, not a native host trace.

### Files added or strengthened

| Area | File |
|---|---|
| Revision-aware synthetic DOCX builder | `tests/fixtures/word-native-visuals/build_fixture.py` |
| Fixture reproduction and limitations | `tests/fixtures/word-native-visuals/README.md` |
| Reopened OOXML and mutation checks | `tests/architecture/word-visual-fidelity.test.py` |
| Adapter revision boundary | `adapters/pi/revision-export-route.cjs` |
| Adapter route tests | `adapters/pi/revision-export-route.test.mjs` |
| Record | This S3 issue |

### Fresh verification after remediation

| Command | Result | Exit |
|---|---:|---:|
| `node --test adapters/pi/revision-export-route.test.mjs` | 5/5 PASS, including real Python fixture build/reopen for both revisions | 0 |
| `node --test tests/architecture/visual-export-citations.test.mjs` | 6/6 PASS | 0 |
| `python -B tests/architecture/word-visual-fidelity.test.py` | 27/27 PASS | 0 |
| `node tests/run.mjs` | 196/196 PASS (final post-S3/S4 integration run) | 0 |
| `python scripts/test-package-pi.py` | 5/5 PASS | 0 |

The focused Node commands will be subsets of the final aggregate and must not be
added to it. Package checks use
temporary archives and do not install the package. The branch remains
`v0.1.5-beta`, HEAD remains `f3dab0ba4c751c3c7b2e8b503d40dc87837cd82b`, and
`package.json` remains `0.1.5-beta`; no worktree, commit, push, publish or install
was performed.

The evidence boundary remains unchanged: synthetic OOXML structure and adapter
identity routing now pass, while native R23/VE execution and actual rendered Word
layout remain `PENDING`/unverified. A supported host must still export the two real
requested revisions, retain the native trace and inspect reopened pages for
clipping, overflow, pagination, borders, captions and template appearance.

### Final post-integration verification — 28 September 2026

After S4 remediation stabilized, the workspace-wide checks were rerun on the
same `v0.1.5-beta` branch and `0.1.5-beta` package:

| Command | Result | Exit |
|---|---:|---:|
| `node --test adapters/pi/revision-export-route.test.mjs tests/architecture/visual-export-citations.test.mjs` | 11/11 PASS | 0 |
| `python -B tests/architecture/word-visual-fidelity.test.py` | 27/27 PASS | 0 |
| `node tests/run.mjs` | 196/196 PASS | 0 |
| `python scripts/test-package-pi.py` | 5/5 PASS | 0 |
| `git diff --check` | pass; only LF/CRLF normalization warnings | 0 |

This supersedes the earlier pending aggregate-count placeholder. It is still
source/package and synthetic-structure evidence only: native PI-Desktop R23/VE
execution remains `PENDING`, and rendered DOCX/PDF layout remains `UNVERIFIED`.

## Independent native/render acceptance attempt — 28/09/2026

The source/package approval remains unchanged. A fresh native replay for `R20`–
`R23` and `VE01`–`VE09` was not executable: no native `Skill` tool was exposed,
Codex Document Control reported no connected document session, and the installed
PI plugin is the stale `local.workspace-superpowers` `0.1.4-beta` rather than
the audited `0.1.5-beta` package. Consequently there are no current native
Skill/tool calls, model/package trace, transcript, changed paths or host-export
artifacts. All 13 native cases are blocked at the capability boundary; `R23`
has two requested revision variants and both are blocked.

| Native cases | PASS | FAIL | BLOCKED | Issue-level status |
|---|---:|---:|---:|---|
| R20–R23 + VE01–VE09 (13 cases; R23 has 2 variants) | 0 | 0 | 13 | `PENDING — native verification` |

Render checks were attempted against an available historical PDF fixture only.
`pdftoppm` rendered `tests/scenarios/reports/b-l-live-20260920/fixtures/findings.pdf`
to one PNG page (exit 0), retained at
`C:\Users\CHI NGUYEN\.codex\visualizations\2026\09\28\01a0e5af-a58d-75d0-b3b1-680838c0bf08\native-audit-findings-pdf-page-1.png`.
It is not an S3 export and is not acceptance evidence. DOCX rendering was
unavailable: `soffice`, `libreoffice`, `pandoc` were absent and the Word COM
probe failed with `0x80070520` (no usable logon session). The PDF conversion
also reported missing `Symbol` and `ArialUnicode` display fonts. Rendered
DOCX/PDF fidelity remains `UNVERIFIED`.
