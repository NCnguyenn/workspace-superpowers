# Báo cáo thảo luận và triển khai cơ chế theo dõi công việc dài hạn với AI

**Dự án:** Workspace Superpowers

**Phạm vi:** Nội dung đã thảo luận và những thay đổi đã thực hiện trong tác vụ này

**Ngôn ngữ:** Tiếng Việt theo yêu cầu của người dùng

**Trạng thái:** Đã sửa bộ hướng dẫn trong workspace và thực hiện các kiểm tra được nêu dưới đây; chưa cập nhật bản plugin đã cài, chưa kiểm chứng đầu cuối trên Word/PDF hoặc giao diện chat mới.

## 1. Kết quả chính

Cuộc thảo luận bắt đầu từ ý tưởng dùng một file Markdown để giữ tiến độ viết báo cáo hoặc luận văn qua nhiều phiên làm việc với AI. Sau các lần làm rõ, yêu cầu trở thành một cơ chế quản lý công việc bằng hội thoại: AI nhận biết khi nào cần theo dõi, đề xuất lưu hồ sơ, tự tạo hoặc tái sử dụng các file phù hợp, rồi duy trì tiến độ và liên kết tài liệu. Người dùng chỉ trao đổi, kiểm tra và xác nhận qua chat.

Phần đã triển khai là **quy tắc và mẫu hồ sơ được tích hợp vào bộ skill hiện có**. Không có dịch vụ nền, cơ sở dữ liệu trạng thái hoặc trình theo dõi thư mục mới được xây dựng. Cơ chế hoạt động thông qua việc AI đọc hướng dẫn, gọi các công cụ sẵn có và thực hiện đúng luồng công việc.

Hai thành phần mới làm đầu mối là:

- [Quy tắc theo dõi công việc](../references/work-tracking.md): điều kiện kích hoạt, tìm hồ sơ, tiếp tục công việc, ghép dự án, quản lý phiên bản và cập nhật tiến độ.
- [Mẫu work-plan.md](../templates/work-plan.md): cấu trúc để AI lưu yêu cầu, các hạng mục, quyết định, tài liệu và bước tiếp theo.

Các thành phần này đã được nối vào `AGENTS.md`, router, các skill liên quan, một số vai trò agent trực tiếp tham gia và hướng dẫn khởi động PI. Chưa thể kết luận mọi tình huống vận hành thực tế đều đã được kiểm chứng chỉ từ những thay đổi hướng dẫn này.

## 2. Các vấn đề và mục tiêu được thống nhất

| Mã | Vấn đề người dùng đặt ra | Mục tiêu cần đạt |
|---|---|---|
| V01 | Mỗi phiên chat phải nhắc lại ngữ cảnh hoặc gửi lại tài liệu | Khôi phục được công việc từ hồ sơ và nguồn còn truy cập được |
| V02 | Người dùng không biết tính năng theo dõi tồn tại | AI chủ động đề xuất khi công việc cần, không chờ lệnh kỹ thuật |
| V03 | Không phải tác vụ nào cũng cần kế hoạch dài hạn | Giữ hỏi đáp, chỉnh văn phong, xuất file một lần được gọn nhẹ |
| V04 | Đã có cơ chế lưu ngữ cảnh dự án | Tái sử dụng cơ chế đó và liên kết với kế hoạch, tránh xây workflow rời rạc |
| V05 | Có thể có nhiều báo cáo, nhiều dự án hoặc nhiều hồ sơ Markdown | Xác định đúng hồ sơ theo công việc và tài liệu, không đoán bằng tên hoặc ngày sửa |
| V06 | Người dùng không biết hoặc chưa cung cấp tiêu chí | Đọc đầu vào trước, ghi nhận phần thiếu, hỏi đúng điểm cần làm rõ |
| V07 | Tiêu chí nằm trong Word, PDF hoặc Text | Trích đúng nghĩa và giữ vị trí nguồn để kế hoạch bám sát yêu cầu |
| V08 | Sửa và xuất báo cáo sinh ra nhiều phiên bản | Phân biệt bản đang làm, bản đã duyệt và bản xuất từ nguồn nào |
| V09 | File theo dõi có thể không khớp tài liệu thực tế | Chỉ cập nhật tiến độ dựa trên file đã lưu và kiểm tra |
| V10 | Có dự án không có nghĩa mục nào cũng cần mô tả dự án | Chỉ sử dụng ngữ cảnh dự án tại các mục có yêu cầu hoặc cần bằng chứng |
| V11 | Skill, rule và agent có thể hành động thiếu nhất quán | Dùng chung một quy tắc, phân rõ bên đọc, lập kế hoạch, ghi file và kiểm tra |
| V12 | Người dùng không muốn tự tạo thư mục hoặc quản lý metadata | AI thực hiện các thao tác nội bộ, người dùng làm việc qua chat |

## 3. Đánh giá ý tưởng dùng Markdown

### 3.1. Lợi ích dự kiến

Một hồ sơ gọn và được cập nhật đúng giúp AI biết mục tiêu, quyết định đã có, tài liệu đang dùng và hành động tiếp theo. So với việc người dùng tự tóm tắt lại mọi phiên, cách này có thể giảm bỏ sót thông tin và giảm khả năng chọn nhầm bản thảo.

Markdown phù hợp vì có thể đọc trực tiếp, tìm kiếm, đặt liên kết tới nguồn và lưu lịch sử thay đổi bằng những công cụ thông thường. Tuy nhiên, trong tác vụ này chưa có phép đo định lượng về thời gian tiết kiệm, chi phí token hoặc tỷ lệ giảm sai sót. Những lợi ích nêu trên là đánh giá thiết kế, không phải kết quả thực nghiệm về năng suất.

### 3.2. Chi phí và giới hạn

Hồ sơ cần được duy trì. Nếu ghi trạng thái không đúng, nó có thể khiến AI tiếp tục sai dù bản thảo thực tế vẫn đầy đủ. Nếu đưa toàn bộ nội dung báo cáo và lịch sử hội thoại vào kế hoạch, việc đọc hồ sơ lại trở nên tốn kém.

Do đó, thiết kế chọn một bản ghi điều phối ngắn, liên kết tới nguồn thay vì sao chép nguồn. AI vẫn phải đọc phần tài liệu cần cho nhiệm vụ cụ thể. Việc có `work-plan.md` không thay thế kiểm tra dữ liệu, văn bản gốc hoặc quyết định của người dùng.

Khả năng nối tiếp giữa các chat cũng phụ thuộc vào quyền truy cập. Nếu chat mới không nhìn thấy workspace hoặc hồ sơ cũ, file Markdown không tự tạo ra trí nhớ xuyên môi trường.

## 4. Cơ chế nhận diện và đề xuất tạo hồ sơ

### 4.1. Quyết định dựa trên thao tác thực tế

AI xét số giai đoạn, nhu cầu tiếp tục qua nhiều phiên, nguồn đang chờ, quan hệ phụ thuộc và vòng phản hồi. Không dùng riêng từ khóa “luận văn”, “báo cáo” hoặc số trang để quyết định.

| Tình huống | Quy tắc đã bổ sung |
|---|---|
| Hỏi đáp khái niệm | Trả lời trực tiếp, không tạo hồ sơ |
| Chỉnh hai câu trong luận văn | Sửa đúng hai câu; không khởi động quy trình theo dõi mới |
| Định dạng hoặc xuất file một lần | Dùng workflow tương ứng; không tự tạo kế hoạch |
| Báo cáo ngắn, đầu vào đầy đủ, hoàn thành một lượt | Thường không đề xuất hồ sơ riêng |
| Báo cáo ngắn nhưng phải chờ nhiều đợt dữ liệu | Có thể đề xuất theo dõi vì công việc kéo dài và có phụ thuộc |
| Luận văn, báo cáo hoặc công việc văn phòng nhiều giai đoạn | Chủ động đề xuất lưu kế hoạch và tiến độ |
| Đã có kế hoạch phù hợp | Tái sử dụng, không xin lại quyền thiết lập |
| Chỉ khảo sát dự án | Theo quy tắc hồ sơ ngữ cảnh hiện có, không tự sinh thêm kế hoạch |

### 4.2. Người dùng chỉ cần quyết định qua chat

Cơ chế được thống nhất là: **AI chủ động đề xuất một lần, người dùng đồng ý, AI tự tạo hoặc tái sử dụng hồ sơ rồi tự duy trì trong phạm vi đã thống nhất.**

Nội dung đề xuất giải thích lợi ích và vị trí lưu dự kiến, không yêu cầu người dùng nhập trường kỹ thuật. Sau khi được đồng ý, việc cập nhật sự kiện thực tế như đã sửa mục nào, còn thiếu nguồn gì hoặc bước tiếp theo là gì không cần xin phép lại ở mỗi lượt.

Nếu người dùng từ chối, AI tiếp tục bằng ngữ cảnh hội thoại và không lặp lại đề nghị cho công việc chưa thay đổi. Không tạo riêng một file chỉ để ghi việc từ chối. Nếu người dùng đã yêu cầu theo dõi rõ ràng, AI tái sử dụng quyền đó thay vì hỏi lại.

Sự đồng ý duy trì hồ sơ khác với phê duyệt phạm vi, đề cương hoặc nội dung báo cáo. Những quyết định này được lưu riêng và chỉ có hiệu lực cho phần đã được xác nhận.

## 5. Vai trò của work-plan.md và project-context.md

### 5.1. Không mặc định luôn tạo hai file

| Loại hồ sơ | Nội dung chịu trách nhiệm | Khi cần |
|---|---|---|
| `work-plan.md` | Mục tiêu, tiêu chí, đề cương hoặc mốc công việc, tiến độ, quyết định, đầu ra và điểm tiếp tục | Công việc dài hạn đã được chấp thuận theo dõi |
| `project-context.md` | Thông tin dự án đã kiểm tra, vị trí nguồn, phiên bản, giới hạn và xung đột bằng chứng | Khi cần duy trì ngữ cảnh của dự án cụ thể |

Một công việc có thể không cần hồ sơ nào, chỉ cần kế hoạch, chỉ cần ngữ cảnh khảo sát hoặc cần cả hai loại. Có thể dùng hồ sơ đã tồn tại với tên khác; không bắt buộc đổi tên hoặc tạo bản sao để phù hợp tên minh họa.

### 5.2. Cách ghép hồ sơ

Kế hoạch ghi định danh công việc, đường dẫn chính thức, tài liệu đầu ra và các tham chiếu dự án. Mỗi tham chiếu dự án xác định dự án, thư mục nguồn, hồ sơ ngữ cảnh, phiên bản đã kiểm tra và những mục cần sử dụng nó.

Các trường chính gồm `work_id`, `plan_file`, `project_id`, `context_file` và định danh tài liệu. Chúng do AI quản lý. Đường dẫn tương đối được giải theo file đang chứa đường dẫn, không theo thư mục hiện tại của shell.

Một dự án có thể được nhiều báo cáo tham chiếu. Một báo cáo có thể sử dụng nhiều dự án. Vì vậy, việc ghép không bị giới hạn thành một cặp cố định.

Nếu có nhiều kế hoạch và không xác định được báo cáo đích, AI hỏi một câu qua chat để chọn công việc. AI không tự chọn bản sửa gần nhất. Với hồ sơ cũ thiếu định danh, cần kiểm tra thư mục nguồn và nội dung trước khi bổ sung định danh.

### 5.3. Chỉ trình bày dự án ở phần cần thiết

Kế hoạch ánh xạ từng mục tới luận điểm hoặc bằng chứng dự án cần dùng. Mục không cần thì ghi không áp dụng hoặc bỏ phần tham chiếu tương ứng.

Ví dụ, nếu chương 3 mô tả triển khai, chương 3 có thể dùng hồ sơ dự án. Khi sửa phần tổng quan ở chương 1, AI không tự chèn lại cấu trúc mã nguồn hoặc tạo thêm mục giới thiệu dự án. Sự tồn tại của thư mục mã nguồn không tự trở thành yêu cầu của đề cương.

### 5.4. Bảo toàn giới hạn ghi của workflow khảo sát

Quy tắc khảo sát dự án hiện có chỉ cho phép một hồ sơ ngữ cảnh dẫn xuất được chỉ định trong thư mục nguồn. Thay đổi lần này không mở rộng ngầm quyền đó. Kế hoạch, tài liệu xuất và phần trích xuất phải nằm ở vị trí đầu ra được phép; muốn đặt thêm trong dự án thì cần quyền phù hợp đã được xác lập.

Tiện ích `project-survey.mjs` hiện ghi đè toàn bộ đầu ra khảo sát. Mã của tiện ích này không được sửa trong đợt triển khai. Hướng dẫn mới quy định không dùng cách ghi đè đó để làm mới một hồ sơ đã có định danh hoặc ghi chú được biên tập; phải đi qua bước đọc, phân tích và chỉnh sửa để bảo toàn nội dung.

## 6. Tiếp tục công việc khi mở chat mới

Quy tắc khởi động đã được bổ sung vào `AGENTS.md` và bootstrap PI. Ở lượt Workspace đầu tiên của chat mới, khi mất ngữ cảnh hoặc khi người dùng yêu cầu tiếp tục, AI phải tìm kế hoạch trước khi hỏi lại tiến độ hoặc đọc hàng loạt tài liệu.

Thứ tự được quy định:

1. Dùng đường dẫn kế hoạch đã biết hoặc được cung cấp.
2. Nếu chưa có, tìm `work-plan.md` trong thư mục tác vụ và vị trí đầu ra đã khai báo.
3. Khi chưa tìm thấy, kiểm tra có giới hạn tại `work/<work-id>/work-plan.md` trong thư mục tác vụ; không quét toàn ổ đĩa.
4. Đọc định danh và phần `Resume Here` để chọn đúng công việc.
5. Khôi phục yêu cầu đang được phép thực hiện, bản thảo đích, quyết định và phần còn thiếu.
6. Kiểm tra phiên bản liên quan, rồi chỉ đọc tiêu chí, đoạn bản thảo, phần liền kề và bằng chứng cần cho bước đó.

Với đường dẫn bị đổi, AI tìm trong phạm vi cho phép để đối chiếu định danh và nội dung. Nếu xác định chắc chắn file đã được chuyển, có thể sửa liên kết trong quyền duy trì hồ sơ hiện có. Nếu vẫn mơ hồ, chỉ hỏi về điểm mơ hồ đó.

Không bắt người dùng gửi lại file còn truy cập được hoặc nhắc lại câu trả lời đã lưu. Tuy vậy, yêu cầu này không có nghĩa AI chỉ đọc kế hoạch mà bỏ qua tài liệu gốc.

**Giới hạn đã ghi rõ:** chưa có hook nền tự đọc file ngay khi người dùng mở tab. Quy tắc được thực hiện khi AI xử lý lượt yêu cầu trong môi trường đã nạp hướng dẫn và truy cập cùng hệ thống file. Các hàm `onLoad` và `onUnload` trong adapter PI hiện không triển khai hành vi đọc kế hoạch.

## 7. Tiếp nhận Word/PDF/Text và lập kế hoạch bám tiêu chí

### 7.1. Quy trình được quy định

AI phân loại đầu vào thành đề bài, rubric, mẫu định dạng, tài liệu tham khảo, bản thảo hoặc bằng chứng dự án. Mỗi nguồn cần có đường dẫn, phiên bản và phạm vi đã đọc.

| Định dạng | Những điểm cần giữ khi đọc |
|---|---|
| Word | Heading, đoạn, bảng, chú thích, bình luận và tracked changes có liên quan; không xem sửa đổi đề xuất là yêu cầu đã duyệt |
| PDF | Trang và bảng nguồn, thứ tự đọc, ký hiệu, phần scan; phân biệt số trang file với số trang in |
| Text/Markdown | Mã hóa, thứ bậc mục và nguyên văn yêu cầu bắt buộc khi cần |

Sau khi đọc, AI ánh xạ từng nghĩa vụ sang mã tiêu chí, vị trí nguồn, mục cần thực hiện, bằng chứng và cách kiểm tra. Các trọng số, ngưỡng, giới hạn, hình/bảng bắt buộc và yêu cầu định dạng phải được giữ nếu nguồn có nêu.

Chuyển tài liệu thành Markdown chỉ là một phương án hỗ trợ đọc. Nó không tự chứng minh rằng toàn bộ nguồn đã được đọc đúng, cũng không thay thế bản kế hoạch. Không cần chuyển cả bản thảo Word thành Markdown chỉ để theo dõi tiến độ.

### 7.2. Khi thiếu tiêu chí hoặc đọc không đầy đủ

Hồ sơ phân biệt “chưa được cung cấp tiêu chí”, “người dùng xác nhận không có bộ tiêu chí riêng” và “đã có nguồn nhưng chưa đọc hết”. AI không biến một đề cương thông thường thành tiêu chí chấm chính thức.

Nếu một trang PDF chứa bảng yêu cầu chưa đọc được, kế hoạch phải giữ khoảng trống đó và chỉ được gọi là dự thảo hoặc chưa đầy đủ về độ bao phủ. Những phần độc lập có đủ căn cứ vẫn có thể làm tiếp. Người dùng chỉ cần trả lời câu hỏi liên quan; không phải điền cấu trúc Markdown.

### 7.3. Công cụ bổ sung

Người dùng đã cho phép cân nhắc repo, plugin hoặc MCP nếu cần. Trong đợt này chưa cài thêm công cụ vì chưa có tài liệu đầu vào thực tế cần xử lý và việc duy trì kế hoạch không tự đòi hỏi một bộ chuyển đổi mới.

Lần kiểm tra môi trường đã ghi nhận Python mặc định chưa có `docx`, `pypdf`, `pdfplumber`, `pymupdf`; chưa thấy `pdftotext` hoặc `pandoc` trên PATH. Kết quả này chỉ mô tả môi trường đã kiểm tra, không kết luận mọi connector hoặc runtime khác đều thiếu khả năng đọc tài liệu.

Do đó, phần đã hoàn thành là quy tắc lựa chọn công cụ, trích xuất và ghi nhận giới hạn. Khả năng đọc Word/PDF/OCR đầu cuối chưa được chứng minh trong tác vụ này.

## 8. Quản lý phiên bản, phê duyệt và bản xuất

### 8.1. Ba loại trạng thái tài liệu

| Loại | Thông tin cần giữ |
|---|---|
| Bản đang làm việc | Đường dẫn bản có thể chỉnh sửa, định danh và phiên bản hiện tại |
| Bản đã duyệt | Phiên bản được bảo toàn, quyết định người dùng và phạm vi được duyệt |
| Bản xuất | Đường dẫn, phiên bản đầu ra, định danh và phiên bản nguồn, kết quả kiểm tra |

Tên có chữ “final” hoặc thời gian sửa gần nhất không quyết định bản chính. Cùng một đường dẫn có thể chứa nội dung đã thay đổi, nên cần định danh phiên bản và mã kiểm tra nội dung khi có khả năng. Timestamp và kích thước chỉ là dấu hiệu thay đổi, không đủ chứng minh nội dung giống nhau.

Trước khi tiếp tục sửa, bản đã duyệt cần được giữ bằng snapshot hoặc lịch sử phiên bản có thể khôi phục. Không ghi đè rồi tiếp tục gắn nhãn nội dung mới là phiên bản đã được duyệt trước đó.

### 8.2. Ví dụ đã thống nhất về hành vi

Nếu r03 đã được duyệt, r04 mới được sửa và PDF hiện có được xuất từ r03:

- Yêu cầu “xuất bản đã duyệt” chọn r03, không chọn r04 chỉ vì mới hơn.
- PDF r03 vẫn đúng với bản đã duyệt r03, dù nó không phản ánh bản đang sửa r04.
- Khi r04 được duyệt, PDF r03 trở nên cũ so với mốc duyệt mới.
- Nếu PDF hiện có khớp nguồn và thiết lập xuất được yêu cầu, AI kiểm tra rồi dùng lại; không bắt buộc sinh bản trùng.
- Yêu cầu xuất PDF không tự trở thành quyết định duyệt nội dung.

Đây là quy tắc và tình huống kiểm tra suy luận; không có PDF r03/r04 thực tế được xuất trong đợt chạy thử này.

### 8.3. Tiến độ theo từng mục

Các trạng thái nội dung gồm `todo`, `drafting`, `review`, `revision_needed`, `done`. Blocker, kết quả kiểm tra và chấp thuận được lưu riêng. Một mục chỉ được xem là hoàn tất khi đáp ứng điều kiện đã thống nhất, bao gồm sự chấp thuận của người dùng nếu điều đó được yêu cầu.

Khi sửa một mục, chỉ đánh giá lại mục đó và các phần phụ thuộc. Chỉnh văn phong không đổi nghĩa có thể giữ phê duyệt nội dung trước đó, nhưng file vừa lưu vẫn cần kiểm tra lại. Không dùng số chữ hoặc thao tác lưu thành công làm bằng chứng hoàn tất.

## 9. Cơ chế cập nhật để tránh lệch hồ sơ

Các bước cập nhật đã được quy định theo thứ tự:

1. Đọc lại kế hoạch và kiểm tra phiên bản đang dùng để tránh ghi đè cập nhật của bên khác.
2. Lưu tài liệu, bảo toàn bản đã duyệt và mở lại để kiểm tra.
3. Cập nhật các mục bị ảnh hưởng, định danh file và điểm tiếp tục trong kế hoạch.
4. Đọc lại kế hoạch vừa lưu, kiểm tra đường dẫn, phiên bản, nguồn xuất và quyết định liên quan.
5. Thông báo ngắn qua chat về kết quả thực tế, điểm còn thiếu và bước tiếp theo.

Nếu lưu tài liệu thành công nhưng cập nhật kế hoạch thất bại, AI phải báo riêng hai kết quả. Phiên sau đối chiếu lại file thật với hồ sơ; không mặc định công việc chưa được làm chỉ vì chưa có checkpoint.

Chỉ một bên chịu trách nhiệm ghi kế hoạch tại một checkpoint. Agent khác trả kết quả hoặc nhận xét về để cập nhật chung, không tạo kế hoạch riêng. Đây là quy tắc phối hợp, chưa phải cơ chế khóa file bằng phần mềm.

## 10. Tích hợp với skill, rule và agent hiện có

### 10.1. Quy tắc và điều phối

| File | Thay đổi trong đợt này |
|---|---|
| [AGENTS.md](../AGENTS.md) | Bổ sung tìm kế hoạch ở lượt Workspace đầu tiên và khi tiếp tục; không biến câu hỏi khác thành lệnh tiếp tục công việc |
| [Router Workspace](../skills/using-workspace-superpowers/SKILL.md) | Điều phối tìm hồ sơ, giao reader đọc, dùng trạng thái đã có và giữ ranh giới trách nhiệm |
| [workflow-continuity.md](../references/workflow-continuity.md) | Liên kết trạng thái dài hạn với hồ sơ đã chấp thuận; mang định danh và mục đích vào các lần bàn giao |
| [project-grounding.md](../references/project-grounding.md) | Ghép ngữ cảnh vào đúng mục, giữ giới hạn ghi và bảo vệ hồ sơ trước thao tác ghi đè khảo sát |
| [criteria-writing-contract.md](../references/criteria-writing-contract.md) | Dùng cùng trạng thái tiêu chí/phê duyệt; giữ nguồn, khoảng trống trích xuất và tránh sao chép quyết định |
| [README.md](../README.md) | Thêm phần giải thích cơ chế theo dõi, quan hệ phiên bản và điều kiện để chat mới khôi phục |

### 10.2. Các skill trong vòng đời công việc

| Skill | Trách nhiệm được bổ sung hoặc làm rõ |
|---|---|
| [scoping-the-brief](../skills/scoping-the-brief/SKILL.md) | Đọc hồ sơ trước khi hỏi lại; đề xuất lưu trạng thái; phân biệt yêu cầu, đề xuất và điều chưa biết |
| [reading-artifacts](../skills/reading-artifacts/SKILL.md) | Đọc kế hoạch trước, rồi đọc phần nguồn cần thiết; trả phiên bản, vị trí và giới hạn trích xuất |
| [analyzing-artifacts](../skills/analyzing-artifacts/SKILL.md) | Ánh xạ tiêu chí vào mục ổn định, đối chiếu phiên bản và chỉ ra phần cần cập nhật |
| [planning-work](../skills/planning-work/SKILL.md) | Sở hữu nội dung kế hoạch, đề cương và phụ thuộc; giao editor lưu hồ sơ chung |
| [editing-documents](../skills/editing-documents/SKILL.md) | Cho phép tạo/cập nhật kế hoạch đã chấp thuận; đóng vai trò ghi file chung; giữ ghi chú và quyết định |
| [drafting-prose](../skills/drafting-prose/SKILL.md) | Nhận đúng mục, phiên bản và nguồn; chỉ đưa nội dung dự án vào nơi cần |
| [converting-artifacts](../skills/converting-artifacts/SKILL.md) | Chọn đúng nguồn đang sửa/đã duyệt; lưu quan hệ nguồn–bản xuất; dùng lại đầu ra còn phù hợp |
| [reviewing-work](../skills/reviewing-work/SKILL.md) | Kiểm tra bao phủ tiêu chí, phạm vi nội dung dự án và tuyên bố hoàn tất thiếu căn cứ |
| [verifying-artifacts](../skills/verifying-artifacts/SKILL.md) | Kiểm tra file thực tế rồi kiểm tra liên kết, phiên bản và checkpoint |
| [packaging-deliverables](../skills/packaging-deliverables/SKILL.md) | Bàn giao đúng phiên bản, giữ snapshot và cập nhật liên kết sau thao tác di chuyển được phép |

Các skill chuyên môn khác tiếp tục nhận ngữ cảnh qua vòng đời hiện có và quy tắc continuity dùng chung. Không phải tất cả `SKILL.md` đều được sửa trực tiếp, và không có skill mới được thêm vào danh mục chỉ để theo dõi tiến độ.

### 10.3. Các vai trò agent được sửa trực tiếp

| Vai trò | Thay đổi |
|---|---|
| [inspector](../agents/inspector.md) | Nhận định danh mục và trả nguồn/phiên bản/giới hạn đọc; không tự ghi kế hoạch |
| [drafter](../agents/drafter.md) | Nhận mục và bản đích; trả kết quả cho hồ sơ chung; không nâng bản nháp thành bản duyệt |
| [reviewer-requirement](../agents/reviewer-requirement.md) | Đối chiếu tiêu chí gốc với mục công việc và chỉ ra nội dung dự án ngoài phạm vi |
| [verifier](../agents/verifier.md) | Kiểm tra bản thật, liên kết và quan hệ xuất; không tự cấp phê duyệt |
| [packager](../agents/packager.md) | Bàn giao đúng vai trò/phiên bản và trả đường dẫn đã thay đổi để cập nhật |

Không tạo thêm loại agent mới. Các agent được sửa nhận ngữ cảnh có giới hạn cho nhiệm vụ, không nhận toàn bộ lịch sử hội thoại và không duy trì tracker riêng.

### 10.4. Template và adapter

| File | Thay đổi |
|---|---|
| [templates/work-plan.md](../templates/work-plan.md) | Mẫu mới: định danh/quyền, điểm tiếp tục, brief, nguồn, tiêu chí, mục công việc, dự án, phiên bản, câu hỏi/quyết định/kiểm tra và lịch sử ngắn |
| [templates/brief.md](../templates/brief.md) | Brief nằm trong hoặc được kế hoạch tham chiếu; tránh bản sao trạng thái độc lập |
| [templates/outline.md](../templates/outline.md) | Giữ mã mục ổn định, vị trí tiêu chí và một nơi sở hữu quyết định |
| [adapters/pi/bootstrap.md](../adapters/pi/bootstrap.md) | Hướng dẫn chat mới tìm kế hoạch; giải đường dẫn quy tắc theo thư mục plugin đã cài |
| [adapters/pi/tools.md](../adapters/pi/tools.md) | Nêu rõ đây là cơ chế bằng hướng dẫn; giới hạn công cụ khảo sát ghi đè và khả năng đọc Office/PDF |

Các file PI và một phần README/package đã có thay đổi từ trước khi triển khai cơ chế theo dõi. Báo cáo chỉ quy phần bổ sung liên quan đến work tracking cho đợt này; không coi toàn bộ `git diff` hiện tại là kết quả của tác vụ.

## 11. Kết quả kiểm tra đã thực hiện

### 11.1. Kiểm tra trước và sau thay đổi bằng tình huống

Một agent đọc bộ quy tắc cũ trước khi có hợp đồng mới. Kết quả cho thấy chưa có thứ tự tìm `work-plan.md` thống nhất; công việc dài hạn có thể chỉ lưu trong chat; chưa có bảng quản lý quan hệ bản đang làm, bản duyệt và bản xuất. Quy tắc sửa nhỏ và xử lý nguồn không đọc được đã có, nên được giữ lại.

Sau thay đổi, một agent độc lập đọc bộ quy tắc mới và phân tích 11 tình huống, sau đó kiểm tra thêm 2 tình huống. Nội dung gồm: chat mới tiếp tục, luận văn thiếu rubric, xuất bản đã duyệt, sửa hai câu, PDF có trang không đọc được, hai báo cáo chung dự án, câu hỏi ngoài lề, file bị sửa cùng đường dẫn, cập nhật checkpoint thất bại, từ chối theo dõi, nhiều loại đầu ra, tiếp tục kế hoạch tạm dừng và dùng lại PDF phù hợp.

Lượt kiểm tra này phát hiện hai chỗ cần làm rõ: cách chọn kế hoạch đang tạm dừng và khi nào dùng lại PDF thay vì xuất lại. Hai chỗ đã được sửa và kiểm tra lại. Đây là **kiểm tra quyết định qua tình huống**, không phải 13 quy trình Word/PDF đã được chạy thật.

Rà soát tích hợp độc lập không báo lỗi mức Critical hoặc Important. Kết quả này hỗ trợ đánh giá tính nhất quán của hướng dẫn trong phạm vi đã đọc, không chứng minh tuyệt đối rằng mọi xung đột đều đã bị loại bỏ.

### 11.2. Chạy thử thật trên tài liệu Markdown

Bộ mẫu nằm trong `.tmp/work-tracking-execution/`. Agent dự định chạy độc lập bị dừng vì giới hạn sử dụng, nên lượt thao tác file thực tế được thực hiện trực tiếp bởi agent chính và không được gọi là kiểm tra độc lập.

Kết quả quan sát:

- Sửa đúng S2 theo tiêu chí C2; không sửa S1 hoặc bắt đầu S3.
- Bản `report-v03.md` được giữ nguyên từng byte theo SHA256.
- `report-v04.md` được cập nhật, mở lại và kiểm tra; kế hoạch ghi revision `r04-edit1` cùng SHA256 thực tế.
- Kế hoạch tăng phiên bản từ 1 lên 2 và giữ S2 ở trạng thái `review`, còn chờ người dùng chấp thuận.
- Các đường dẫn nguồn trong bộ mẫu tồn tại; không sinh PDF hoặc sửa hồ sơ dự án.

Chạy thử chứng minh được thao tác lưu và đồng bộ checkpoint trong bộ mẫu Markdown đó. Nó không chứng minh độ trung thực của chuyển đổi Word/PDF, OCR hoặc phát hiện chat mới trên giao diện.

### 11.3. Kiểm tra tự động

| Nhóm | Kết quả đã ghi nhận | Phạm vi ý nghĩa |
|---|---|---|
| Kiểm tra liên kết work tracking mới | 2/2 đạt sau khi bổ sung | Các điểm vào và bên tiêu thụ trỏ tới quy tắc/template chung |
| Nhóm tích hợp tập trung | 33 đạt, 0 lỗi | Liên kết, continuity, tiêu chí, ràng buộc dự án/toán |
| Toàn bộ `node tests/run.mjs` | 86 đạt, 2 lỗi trên tổng 88 | Không được mô tả là toàn bộ suite đã đạt |
| `python scripts/test-package-pi.py` | 4/4 đạt | Cấu trúc gói, đọc lại archive, từ chối ghi đè và kết quả đóng gói xác định |
| `git diff --check` | Không phát hiện lỗi khoảng trắng | Có cảnh báo chuyển LF/CRLF; không phải chứng nhận hành vi |

Hai lỗi còn lại yêu cầu các file test/bằng chứng không bị Git bỏ qua. Chính sách `.gitignore` đã có từ trước lại cố ý giữ `tests/` và `*.test.mjs` ở máy cục bộ. Đối chiếu `git check-ignore -v` và nội dung tại HEAD xác nhận nguyên nhân này. Không tự đổi chính sách lưu trữ chỉ để làm suite xanh.

Các kết quả trên là kết quả đã chạy ở các lượt triển khai trước và được đối chiếu lại khi viết báo cáo, không phải một chiến dịch kiểm thử mới toàn bộ trong lượt tạo báo cáo này. Hồ sơ chi tiết nằm tại [bản ghi xác minh](superpowers/plans/2026-09-21-work-tracking-validation.md).

## 12. Phần đã giải quyết và phần còn lại

| Hạng mục | Trạng thái hiện tại |
|---|---|
| Điều kiện đề xuất theo dõi dài hạn | Đã quy định và tích hợp vào hướng dẫn |
| Tránh tạo hồ sơ cho tác vụ nhỏ | Đã quy định; có kiểm tra tình huống |
| Đọc kế hoạch trước khi khôi phục công việc | Đã nối vào AGENTS/router/bootstrap; chưa thử giao diện chat mới thực tế |
| Ghép kế hoạch–dự án–tài liệu | Đã có quy tắc định danh và liên kết có chọn lọc |
| Bản đang sửa/bản đã duyệt/bản xuất | Đã có mô hình trạng thái và quy tắc; chạy thử lưu trạng thái trên Markdown |
| Trích yêu cầu có nguồn từ Word/PDF | Đã có quy trình và giới hạn; chưa kiểm chứng đầu cuối với đầu vào Word/PDF thực tế |
| Tích hợp skill/rule/agent | Đã nối các điểm liên quan; kiểm tra cấu trúc và rà soát độc lập đã thực hiện |
| Cập nhật plugin đã cài hoặc hướng dẫn toàn cục | Chưa thực hiện |
| Tự chạy nền ngay khi mở tab | Chưa triển khai; không thuộc cơ chế hiện tại |
| Khóa file hoặc giao dịch đồng thời bằng mã | Chưa triển khai; hiện là quy tắc một bên ghi và đối chiếu phiên bản |
| Đo mức tiết kiệm thời gian/token | Chưa thực hiện |
| Hai lỗi kiểm tra về Git-ignore | Còn tồn tại do chính sách cục bộ đã có |

## 13. Các bước kiểm chứng tiếp theo được đề xuất

Các bước dưới đây là công việc tiếp theo, chưa được báo cáo là đã thực hiện:

1. Đưa phiên bản bộ skill đã sửa vào môi trường thực sự sử dụng và xác nhận bootstrap có hiệu lực. Cập nhật bản cài không đồng nghĩa chỉ sửa nguồn trong workspace.
2. Mở chat mới trong cùng dự án, yêu cầu “tiếp tục”, rồi kiểm tra thực tế AI có đọc kế hoạch trước và có tránh hỏi lại quyết định đã lưu không.
3. Dùng một rubric Word và một PDF thực tế, gồm bảng hoặc trang scan nếu cần, để kiểm tra độ bao phủ tiêu chí và quyết định có cần thêm reader/OCR hay không.
4. Chạy quy trình Word r03 được duyệt → sửa r04 → xuất đúng bản được yêu cầu → kiểm tra PDF → cập nhật kế hoạch. Kiểm tra cả trường hợp ghi đè nội dung nhưng giữ nguyên tên file.
5. Thử hai báo cáo dùng chung một dự án, đổi vị trí file và tiếp tục từ kế hoạch tạm dừng.
6. Đo thời gian khôi phục, số lần phải hỏi lại, lỗi chọn phiên bản và công sức cập nhật qua vài phiên để đánh giá hiệu quả thực tế.

Không cần tạo thêm tracker chỉ để quản lý lần xuất báo cáo tổng kết này. Bản ghi triển khai và xác minh đã có đủ thông tin về công việc đang được báo cáo.

## 14. Tài liệu đối chiếu

- [Kế hoạch triển khai và danh sách công việc](superpowers/plans/2026-09-21-work-tracking.md).
- [Bản ghi xác minh và giới hạn](superpowers/plans/2026-09-21-work-tracking-validation.md).
- [Quy tắc vận hành chung](../references/work-tracking.md).
- [Mẫu hồ sơ kế hoạch](../templates/work-plan.md).
- [Kiểm tra liên kết mới](../tests/architecture/work-tracking-links.test.mjs).
- [Chính sách Git-ignore hiện có](../.gitignore).

Nội dung báo cáo dựa trên hội thoại, file đã đọc và kết quả kiểm tra đã ghi nhận trong workspace. Không sử dụng nguồn bên ngoài hoặc số liệu hiệu quả giả định để khẳng định hệ thống đã vận hành hoàn chỉnh.
