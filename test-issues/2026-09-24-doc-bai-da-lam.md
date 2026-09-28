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
