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
