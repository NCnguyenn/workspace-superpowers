# Danh mục & Vai trò 12 Agent Chuyên trách (Agent Roles)

Tài liệu này tổng hợp toàn bộ **12 vai trò Agent chuyên biệt (Agent Roles)** trong dự án **Workspace Superpowers** (nằm trong thư mục [`agents/`](agents/)).

Hệ thống được thiết kế theo nguyên tắc **Tách biệt quyền hạn (Separation of Concerns)**: Người thực thi (Executor) và Người phản biện (Reviewer) là các vai trò hoàn toàn độc lập, đảm bảo AI không bao giờ tự phê duyệt nội dung của chính mình, duy trì tính khách quan và tính trung thực học thuật (*Honesty*).

---

## 1. Bảng tổng quan 12 Agent Roles

| STT | Phân nhóm | Tên vai trò (Role) | Đường dẫn tệp | Trách nhiệm chính |
|:---:|---|---|---|---|
| 1 | **Thực thi & Sản xuất** | `drafter` | [`agents/drafter.md`](agents/drafter.md) | Soạn thảo nội dung theo đề cương đã được phê duyệt |
| 2 | **Thực thi & Sản xuất** | `formatter` | [`agents/formatter.md`](agents/formatter.md) | Căn chỉnh định dạng, bố cục, kiểu dáng văn bản |
| 3 | **Thực thi & Sản xuất** | `inspector` | [`agents/inspector.md`](agents/inspector.md) | Khảo sát cấu trúc tệp/thư mục dự án thực tế |
| 4 | **Thực thi & Sản xuất** | `packager` | [`agents/packager.md`](agents/packager.md) | Đóng gói và kiểm đếm danh mục thành phẩm bàn giao |
| 5 | **Thực thi & Sản xuất** | `researcher` | [`agents/researcher.md`](agents/researcher.md) | Khảo cứu tài liệu, thu thập bằng chứng thực tế |
| 6 | **Thực thi & Sản xuất** | `verifier` | [`agents/verifier.md`](agents/verifier.md) | Mở lại tệp trên đĩa để xác thực tính toàn vẹn sau khi ghi |
| 7 | **Phản biện Độc lập** | `reviewer-requirement` | [`agents/reviewer-requirement.md`](agents/reviewer-requirement.md) | Phản biện mức độ đáp ứng tiêu chí (rubric) và phạm vi |
| 8 | **Phản biện Độc lập** | `reviewer-coherence` | [`agents/reviewer-coherence.md`](agents/reviewer-coherence.md) | Đánh giá tính mạch lạc, chuyển ý và tính nhất quán logic |
| 9 | **Phản biện Độc lập** | `reviewer-citation` | [`agents/reviewer-citation.md`](agents/reviewer-citation.md) | Thẩm định trích dẫn học thuật và tính có thực của dữ liệu |
| 10 | **Phản biện Độc lập** | `reviewer-prose` | [`agents/reviewer-prose.md`](agents/reviewer-prose.md) | Soát lỗi hành văn, cấu trúc đoạn văn theo Style Guide |
| 11 | **Phản biện Độc lập** | `reviewer-mathematics` | [`agents/reviewer-mathematics.md`](agents/reviewer-mathematics.md) | Kiểm tra giả định, ký hiệu, phép biến đổi và tính toán toán học |
| 12 | **Phản biện Độc lập** | `reviewer-visual` | [`agents/reviewer-visual.md`](agents/reviewer-visual.md) | Đánh giá tính phù hợp và chất lượng của biểu đồ, hình ảnh |

---

## 2. Chi tiết từng Agent Role

### Nhóm 1: Thực thi & Sản xuất (Execution & Production - 6 agents)

#### 1. `drafter` ([`agents/drafter.md`](agents/drafter.md))
- **Ngữ cảnh được cấp:** Bản tóm tắt yêu cầu (brief), đề cương đã được phê duyệt, dữ liệu/bằng chứng đã khảo sát.
- **Nhiệm vụ:** Viết các đoạn văn, phát triển nội dung hoàn chỉnh bám sát từng mục trong đề cương.
- **Giới hạn cứng (Hard Limits):**
  - Không tự ý viết vượt ngoài phạm vi đề cương đã duyệt.
  - Tuyệt đối không bịa đặt số liệu đo lường, kết quả thực nghiệm hay trích dẫn giả mạo.
  - Phải dùng nhãn đánh dấu giữ chỗ (`draft_incomplete`) nếu thiếu bằng chứng thực tế.

#### 2. `formatter` ([`agents/formatter.md`](agents/formatter.md))
- **Ngữ cảnh được cấp:** Tệp tài liệu nguồn và quy chuẩn định dạng (template, style guide).
- **Nhiệm vụ:** Điều chỉnh font chữ, căn lề, khoảng cách dòng, Heading 1/2/3, danh mục bảng biểu và mục lục tự động.
- **Giới hạn cứng:** Chỉ chỉnh sửa lớp trình bày hiển thị, tuyệt đối không được thêm bớt hoặc thay đổi ngữ nghĩa nội dung văn bản.

#### 3. `inspector` ([`agents/inspector.md`](agents/inspector.md))
- **Ngữ cảnh được cấp:** Thư mục hoặc tệp dự án cần khảo sát để lấy dữ liệu viết báo cáo.
- **Nhiệm vụ:** Khảo sát nhanh cấu trúc thư mục, tệp mã nguồn, tệp cấu hình để tóm tắt bối cảnh thực tế cho người viết.
- **Giới hạn cứng:** Chỉ đọc thông tin (Read-only); tuyệt đối không chạy lệnh sửa code, đổi schema cơ sở dữ liệu hay tạo nhánh Git.

#### 4. `packager` ([`agents/packager.md`](agents/packager.md))
- **Ngữ cảnh được cấp:** Danh sách các tệp thành phẩm đã qua kiểm chứng xác thực.
- **Nhiệm vụ:** Đặt tên chuẩn, gom cụm các tệp kết quả (DOCX, PDF, XLSX, ảnh minh họa) và lập danh mục bàn giao (manifest).
- **Giới hạn cứng:** Chỉ đóng gói các tệp đã được kiểm chứng thành công qua `verifier`.

#### 5. `researcher` ([`agents/researcher.md`](agents/researcher.md))
- **Ngữ cảnh được cấp:** Đề bài, câu hỏi nghiên cứu hoặc chủ đề cần khảo cứu tài liệu.
- **Nhiệm vụ:** Tìm kiếm các nguồn học thuật, bài báo, tài liệu kỹ thuật đáng tin cậy để làm cơ sở lý thuyết hoặc bằng chứng.
- **Giới hạn cứng:** Báo cáo trung thực nguồn gốc; phân biệt rõ dữ liệu có thật và giả thuyết.

#### 6. `verifier` ([`agents/verifier.md`](agents/verifier.md))
- **Ngữ cảnh được cấp:** Đường dẫn tệp vừa được tạo ra hoặc chỉnh sửa trên đĩa.
- **Nhiệm vụ:** Mở lại tệp thực tế, đọc kiểm tra cấu trúc để chứng minh tệp không bị lỗi font, hỏng cấu trúc (corrupt) hoặc mất dữ liệu.
- **Giới hạn cứng:** Không được xác nhận "hoàn thành" nếu chưa thực sự mở lại tệp trên hệ thống tệp đĩa.

---

### Nhóm 2: Phản biện Độc lập (Independent Reviewers - 6 agents)

Các Reviewer không sửa trực tiếp vào văn bản mà trả về bảng phát hiện lỗi theo mẫu [`templates/review-findings.md`](templates/review-findings.md) với 4 cấp độ nghiêm trọng:
- **`Critical`**: Bịa đặt số liệu, vi phạm phạm vi/chưa có sự chấp thuận của người dùng, lỗi toán học nghiêm trọng làm sụp đổ lập luận.
- **`Important`**: Lập luận đứt gãy, thiếu mục bắt buộc của rubric, giải thích thiếu căn cứ.
- **`Minor`**: Câu văn diễn đạt vụng, trích dẫn lệch chuẩn nhẹ.
- **`Suggestion`**: Gợi ý nâng cao phong cách, không bắt buộc.

#### 7. `reviewer-requirement` ([`agents/reviewer-requirement.md`](agents/reviewer-requirement.md))
- **Nhiệm vụ:** Đối chiếu từng phần của tài liệu với tiêu chí gốc (rubric) và phạm vi được phê duyệt.
- **Trọng tâm kiểm tra:** Phát hiện các nghĩa vụ bị bỏ sót, các nội dung bị viết lan man ngoài phạm vi, hoặc đề cương bị bẻ cong so với tiêu chí gốc.

#### 8. `reviewer-coherence` ([`agents/reviewer-coherence.md`](agents/reviewer-coherence.md))
- **Nhiệm vụ:** Đánh giá tính liền mạch của dòng lập luận, tính hợp lý trong chuyển ý giữa các đoạn/phần, và tính nhất quán của thuật ngữ chuyên môn xuyên suốt bài viết.

#### 9. `reviewer-citation` ([`agents/reviewer-citation.md`](agents/reviewer-citation.md))
- **Nhiệm vụ:** Thẩm định tính có thật và độ chính xác của các trích dẫn học thuật, số liệu thực nghiệm, nhật ký đo lường.
- **Trọng tâm kiểm tra:** Bắt lỗi "ảo giác" (hallucination) trích dẫn; kiểm tra đối soát 2 chiều giữa trích dẫn trong văn bản và danh mục tham khảo cuối bài.

#### 10. `reviewer-prose` ([`agents/reviewer-prose.md`](agents/reviewer-prose.md))
- **Nhiệm vụ:** Kiểm tra chất lượng hành văn theo cẩm nang phong cách học thuật [`references/academic-writing-style.md`](references/academic-writing-style.md).
- **Trọng tâm kiểm tra:** 
  - Mô hình đoạn văn PEEL (P1-P3).
  - Tỉ lệ văn xuôi tối thiểu 65% so với danh sách gạch đầu dòng (L1-L6).
  - Giọng văn học thuật khách quan, không dùng từ sáo rỗng hoặc khẳng định quá đà (R1-R4, F1).

#### 11. `reviewer-mathematics` ([`agents/reviewer-mathematics.md`](agents/reviewer-mathematics.md))
- **Nhiệm vụ:** Kiểm tra tính đúng đắn của các ký hiệu, giả định ban đầu, các bước biến đổi công thức và kết quả tính toán độc lập.
- **Trọng tâm kiểm tra:** Bắt lỗi ngộ nhận logic trong chứng minh toán học, công thức tính toán sai lệch so với lý thuyết.

#### 12. `reviewer-visual` ([`agents/reviewer-visual.md`](agents/reviewer-visual.md))
- **Nhiệm vụ:** Thẩm định chất lượng biểu đồ, hình vẽ minh họa, ảnh chụp giao diện.
- **Trọng tâm kiểm tra:** Nhãn trục biểu đồ rõ ràng, nguồn dữ liệu minh bạch, hình ảnh không bị méo lệch tỉ lệ, và tuân thủ ranh giới bằng chứng thị giác.
