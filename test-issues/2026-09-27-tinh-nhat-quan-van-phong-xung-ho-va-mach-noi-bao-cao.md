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
