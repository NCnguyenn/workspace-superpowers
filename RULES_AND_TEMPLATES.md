# Hợp đồng Quy tắc Điều hành & Các Mẫu Tệp Chuẩn (Rules, Contracts & Templates)

Tài liệu này tổng hợp toàn bộ các **Hợp đồng Quy tắc Điều hành (Contracts & Rules)** và các **Mẫu Tệp Chuẩn (Templates)** chi phối hoạt động của dự án **Workspace Superpowers**.

---

## PHẦN 1: CÁC HỢP ĐỒNG QUY TẮC ĐIỀU HÀNH (16 RULES & CONTRACTS)

Các hợp đồng quy tắc quy định chuẩn mực ứng xử, ranh giới an toàn và luồng điều phối của AI trong từng tình huống cụ thể, bao gồm **1 quy tắc gốc** tại thư mục dự án và **15 hợp đồng tham chiếu** trong thư mục [`references/`](references/).

### 1. Bảng tổng quan Các Hợp đồng Quy tắc

| STT | Tên Hợp đồng / Quy tắc | Đường dẫn tệp | Mục đích chính |
|:---:|---|---|---|
| 1 | **Quy tắc Điều phối Gốc** | [`AGENTS.md`](AGENTS.md) | Phân loại yêu cầu lượt chat (JIT router), nguyên tắc trung thực và ngôn ngữ mặc định |
| 2 | **Duy trì Luồng làm việc** | [`references/workflow-continuity.md`](references/workflow-continuity.md) | Duy trì tiến trình qua nhiều lượt hội thoại, xử lý câu hỏi rẽ nhánh và file gửi muộn |
| 3 | **Theo dõi Công việc Dài hạn** | [`references/work-tracking.md`](references/work-tracking.md) | Cơ chế ghi nhớ, cập nhật và phục hồi tiến trình qua các phiên bằng `work-plan.md` |
| 4 | **Viết bám sát Tiêu chí** | [`references/criteria-writing-contract.md`](references/criteria-writing-contract.md) | Quy định 4 chế độ viết (`analyze`, `outline`, `draft`, `revise`) và các chốt phê duyệt |
| 5 | **Duy trì Tính liên tục Tài liệu** | [`references/document-continuity.md`](references/document-continuity.md) | Đảm bảo tính liền mạch văn phong, thuật ngữ khi viết tiếp vào tài liệu có sẵn |
| 6 | **Tiến độ Phiên làm việc** | [`references/session-progress.md`](references/session-progress.md) | Quy định hiển thị Session Checklist ngắn hạn trong chat và ánh xạ sang công cụ Todo |
| 7 | **Quy tắc Đặt câu hỏi** | [`references/guided-questions.md`](references/guided-questions.md) | Chỉ hỏi thông tin cốt lõi còn thiếu, hỏi từng quyết định một, tránh làm phiền |
| 8 | **Chính sách Ngôn ngữ** | [`references/language-policy.md`](references/language-policy.md) | Thành phẩm mặc định là tiếng Anh; chat theo ngôn ngữ người dùng; cấm chêm song ngữ |
| 9 | **Cấu trúc Đề cương** | [`references/outline-structure.md`](references/outline-structure.md) | Chuẩn đánh số đề cương (`1`, `1.x`, `1.x.x`), bảo toàn tiêu đề tiêu chí gốc |
| 10 | **Phong cách Viết Học thuật** | [`references/academic-writing-style.md`](references/academic-writing-style.md) | Bảng mã lỗi (Rule IDs) về đoạn văn PEEL, văn xuôi 65%, tránh sáo rỗng |
| 11 | **Quy chuẩn Trích dẫn** | [`references/citation-styles.md`](references/citation-styles.md) | Quy tắc định dạng trích dẫn (Harvard mặc định, APA, IEEE) và đối soát 2 chiều |
| 12 | **Căn cứ Thực tế Dự án** | [`references/project-grounding.md`](references/project-grounding.md) | Căn cứ số liệu vào mã nguồn dự án thực tế; cấm tự ý sửa code ngoài phạm vi |
| 13 | **Ranh giới Bằng chứng Thị giác** | [`references/visual-evidence-boundary.md`](references/visual-evidence-boundary.md) | Ảnh chụp màn hình không thay thế cho kiểm tra runtime/cơ sở dữ liệu thực tế |
| 14 | **Độ trung thực Đồ họa trong Word** | [`references/visual-assets-and-word-fidelity.md`](references/visual-assets-and-word-fidelity.md) | Quản lý độ phân giải, tỉ lệ và định dạng hình ảnh trong tệp Microsoft Word |
| 15 | **Công thức Toán trong Văn bản** | [`references/math-in-documents.md`](references/math-in-documents.md) | Quy chuẩn chèn công thức Word Equation OMML chỉnh sửa được (không chèn ảnh) |
| 16 | **Kiểm tra Suy luận Toán học** | [`references/mathematics-checks.md`](references/mathematics-checks.md) | Kiểm chứng độc lập các bước suy diễn, giả định và tính toán số học |

---

### 2. Chi tiết các Hợp đồng cốt lõi

* **[`AGENTS.md`](AGENTS.md)**: 
  Điểm chạm đầu tiên trên mọi lượt chat. Phân loại tin nhắn thành **Coding** (dùng workflow code của host), **Simple Q&A** (trả lời trực tiếp, không tạo tệp rườm rà), **Workspace** (gọi router `using-workspace-superpowers`), hoặc **Mixed** (tách riêng 2 luồng). Thiết lập nguyên tắc **Honesty** (tuyệt đối không bịa đặt số liệu hay tự nhận là đã kiểm chứng tệp khi chưa mở lại).
* **[`workflow-continuity.md`](references/workflow-continuity.md)**: 
  Đảm bảo AI không bị "mất trí nhớ" hay phản ứng cứng nhắc khi người dùng đặt câu hỏi phụ giữa chừng, gửi bổ sung tệp tài liệu muộn, hoặc yêu cầu hủy/thay đổi hướng đi.
* **[`work-tracking.md`](references/work-tracking.md)**: 
  Cơ chế lưu trữ trạng thái công việc bền vững qua tệp `work-plan.md`. Tự động nhận diện hồ sơ công việc cũ khi bắt đầu phiên mới, chỉ đọc phần tài liệu liên quan mà không cần người dùng phải tải lại ngữ cảnh từ đầu.
* **[`criteria-writing-contract.md`](references/criteria-writing-contract.md)**: 
  Quy định rõ ràng rằng: Người dùng duyệt đề cương không đồng nghĩa với việc AI được tự ý viết báo cáo; và một khoảng trống dữ liệu thực nghiệm chưa có sẽ chặn việc khẳng định kết luận tương ứng.
* **[`language-policy.md`](references/language-policy.md)**: 
  Quy định nghiêm ngặt: Mọi tài liệu bàn giao (report, thesis, plan) mặc định bằng tiếng Anh trừ khi người dùng yêu cầu rõ ràng; trao đổi trong chat đi theo ngôn ngữ của người dùng; nghiêm cấm chêm song ngữ xen kẽ lẫn lộn trong câu trả lời.

---

## PHẦN 2: CÁC MẪU TỆP CHUẨN (6 TEMPLATES TRONG [`templates/`](templates/))

Các mẫu tệp này đóng vai trò là khung cấu trúc chuẩn mực để AI sử dụng khi lập kế hoạch, soạn thảo hoặc phản biện.

| STT | Tên Mẫu (Template) | Đường dẫn tệp | Mục đích sử dụng |
|:---:|---|---|---|
| 1 | **`work-plan.md`** | [`templates/work-plan.md`](templates/work-plan.md) | Mẫu kế hoạch làm việc bền vững (Durable Work Plan) lưu trữ tiến độ qua nhiều phiên |
| 2 | **`outline.md`** | [`templates/outline.md`](templates/outline.md) | Mẫu đề cương chi tiết liên kết tiêu chí, luận điểm, bằng chứng và quyết định hình ảnh |
| 3 | **`brief.md`** | [`templates/brief.md`](templates/brief.md) | Mẫu tóm tắt yêu cầu dự án/đề tài sau khi phỏng vấn làm rõ phạm vi |
| 4 | **`review-findings.md`** | [`templates/review-findings.md`](templates/review-findings.md) | Bảng mẫu chuẩn ghi nhận kết quả phản biện (Critical, Important, Minor, Suggestion) |
| 5 | **`deliverable-contract.md`** | [`templates/deliverable-contract.md`](templates/deliverable-contract.md) | Bản cam kết về định dạng, phạm vi và tiêu chí nghiệm thu của sản phẩm đầu ra |
| 6 | **`final-report.md`** | [`templates/final-report.md`](templates/final-report.md) | Cấu trúc chuẩn của một báo cáo tổng kết hoàn chỉnh (Bài toán -> Phương pháp -> Kết quả) |

---

### Chi tiết các Mẫu quan trọng

1. **`work-plan.md`** ([`templates/work-plan.md`](templates/work-plan.md)):
   - Chứa định danh công việc (`work_id`), đường dẫn tệp tài liệu đang soạn thảo, tệp bối cảnh dự án (`context_file`).
   - Danh sách các hạng mục công việc (Work Items), trạng thái hoàn thành (`pending`, `in_progress`, `completed`), các quyết định đã được người dùng phê duyệt và các bước tiếp theo cần làm.

2. **`outline.md`** ([`templates/outline.md`](templates/outline.md)):
   - Chia theo từng cấp độ Heading (`1`, `1.x`, `1.x.x`).
   - Mỗi mục đều có bảng ánh xạ: Nghĩa vụ cần đáp ứng, Luận điểm chính, Nguồn cứ liệu/dữ liệu thực nghiệm chứng minh, và Quyết định hình ảnh (có cần biểu đồ/hình vẽ hay không, ai chuẩn bị, trạng thái ra sao).

3. **`review-findings.md`** ([`templates/review-findings.md`](templates/review-findings.md)):
   - Được tất cả các vai trò Reviewer sử dụng khi trả kết quả phản biện:
   ```markdown
   | Severity | Location | Problem | Suggested Fix |
   |---|---|---|---|
   | [Critical/Important/Minor/Suggestion] | [Vị trí mục/tiêu chí] | [Mô tả cụ thể lỗi] | [Giải pháp khắc phục đề xuất] |
   ```
