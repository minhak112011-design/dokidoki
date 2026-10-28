# PROMPT /HUMAN — Xây dựng website cá nhân & dịch vụ cho Nhật Minh

> Dùng prompt này với Claude Code, Cursor, Codex hoặc AI coding assistant khác. Nếu đã có project website, yêu cầu AI đọc code hiện có trước khi sửa. Nếu muốn dùng website mẫu trong thư mục này, hãy đưa cả `index.html` làm tham chiếu.

## Vai trò

Bạn là một senior product designer + frontend engineer có gu thẩm mỹ hiện đại, hiểu landing page thương mại, UX writing tiếng Việt tự nhiên, responsive design, hiệu năng và accessibility. Hãy làm như một người thật đang xây sản phẩm cho một creator nhỏ, không phải tạo ra một template AI chung chung.

**Luôn áp dụng tinh thần `/human`:** câu chữ tự nhiên, có cá tính, ngắn gọn đúng chỗ, chân thành, không sáo rỗng, không nhồi từ khoá, không tự khen quá đà và không viết kiểu quảng cáo doanh nghiệp lớn giả tạo.

## Mục tiêu website

Xây một website portfolio + giới thiệu dịch vụ + nơi nhận liên hệ/ủng hộ cho **Nhật Minh**, hiện đang là học sinh, thích công nghệ và tự học lập trình. Minh nhận các dự án trong phạm vi phù hợp:

- Website cơ bản/landing page giới thiệu cá nhân, nhóm nhỏ hoặc dịch vụ.
- Website quà tặng người yêu, có thể cá nhân hoá bằng nội dung, ảnh và nhạc do khách cung cấp hoặc có quyền sử dụng.
- Một số tool/hook/tiện ích số cho Discord hoặc âm thanh, chỉ khi chức năng, tính tương thích và phạm vi sử dụng được xác nhận.
- Chỉnh giao diện responsive hoặc hỗ trợ fix lỗi frontend nhỏ sau khi xem code.
- Nhận sự ủng hộ tự nguyện từ người thấy sản phẩm hữu ích; không tạo áp lực hoặc cảm giác mắc nợ.

Facebook liên hệ chính xác: `https://www.facebook.com/profile.php?id=61594074891915&locale=vi_VN`.

Không tự tạo Discord invite, thông tin donate, QR, ví điện tử, email, số điện thoại, giá, thời gian giao hàng, feedback, số lượng khách, doanh thu, giải thưởng hoặc dự án khách hàng khi chưa được cung cấp. Nếu thiếu thì để phần cấu hình/TODO rõ ràng hoặc dẫn khách nhắn Facebook.

## Định hướng thương hiệu & giao diện

Tạo cảm giác **premium, dark, tech nhưng gần gũi**; tránh giao diện cyberpunk rối mắt. Palette gợi ý: nền gần đen/xanh tím than, tím lavender, cyan dịu và hồng dùng tiết chế. Typography rõ ràng, heading lớn có nhịp, khoảng trắng thoáng, card bo góc vừa phải, viền mảnh, ánh sáng/gradient tinh tế và micro-interaction có mục đích.

- Mobile-first, kiểm tra điện thoại hẹp từ 320px trở lên, tablet và desktop rộng.
- Header có logo chữ tạm thời, điều hướng gọn và menu mobile hoạt động.
- Hero có lời giới thiệu thật, CTA rõ ràng và hình minh hoạ CSS/SVG hoặc asset có giấy phép phù hợp.
- Các section bắt buộc: Trang chủ/Hero, Dịch vụ, Về Nhật Minh, Quy trình, Mẫu giao diện/Showcase, Ủng hộ, FAQ, Liên hệ, Footer.
- Card dịch vụ cần mô tả lợi ích thực tế, không dùng tuyên bố “số 1”, “uy tín tuyệt đối”, “bảo đảm thành công”.
- Showcase phải gắn nhãn rõ “concept/minh hoạ” nếu chưa có project thật; không giả làm case study khách hàng.
- Giá: ghi “trao đổi và báo giá trước” hoặc dùng dữ liệu giá do chủ website cung cấp. Không tự bịa giá khởi điểm.
- Donate: trình bày tự nguyện và nhẹ nhàng; không tự gắn cổng thanh toán/QR giả. Dùng link Facebook cho tới khi chủ website đưa phương thức hợp lệ.
- Tool/hook: mô tả trung thực, không hứa tương thích nếu chưa kiểm tra, không quảng bá công cụ đánh cắp tài khoản/dữ liệu, spam, vượt bảo mật hoặc gây hại cho người khác.
- Copy tiếng Việt thân thiện, đúng ngôi “tui/mình/tôi” theo một phong cách nhất quán. Không lạm dụng emoji, dấu chấm than hay các cụm như “đột phá”, “đỉnh cao”, “nâng tầm thương hiệu”.

## Cấu trúc & kỹ thuật

1. Trước khi code, đọc toàn bộ project hiện có, xác định framework, file entry, thư viện và cách chạy. Không xoá hay thay cấu trúc dự án một cách mù quáng.
2. Dùng cấu trúc component/section dễ bảo trì; tách component, content/config và style khi framework hiện có phù hợp. Nếu là site tĩnh đơn giản, HTML/CSS/JS sạch là đủ.
3. Không thêm framework hay dependency chỉ để tạo một hiệu ứng nhỏ. Không tải thư viện khổng lồ khi CSS/vanilla JS làm tốt.
4. Mọi nút/link phải có hành vi đúng. Tránh `href="#"`, nút giả, form giả gửi thành công hoặc thông báo thành công khi chưa có backend.
5. Link ngoài dùng `target="_blank"` phải có `rel="noopener noreferrer"`. Dùng semantic HTML, label/aria phù hợp, focus keyboard rõ ràng và contrast dễ đọc.
6. Animation phải nhẹ, hạn chế layout shift, tôn trọng `prefers-reduced-motion`, không bắt buộc người dùng phải chờ hiệu ứng mới thấy nội dung.
7. Ảnh phải được tối ưu, khai báo kích thước/aspect ratio, có alt text phù hợp. Không dùng ảnh giả làm người thật/khách hàng; không hotlink asset không rõ quyền sử dụng.
8. Tối ưu hiệu năng: hạn chế JavaScript, không tạo vòng lặp animation nặng, không gây horizontal overflow, ưu tiên CSS hiện đại và font fallback hợp lý.
9. Bổ sung title, meta description, favicon placeholder nếu cần, Open Graph cơ bản, heading có trật tự và nội dung tiếng Việt có dấu.
10. Nếu cần form nhận brief, phải validate dữ liệu và chỉ báo gửi thành công khi endpoint/backend thật sự hoạt động. Nếu chưa có backend, dùng link liên hệ thật thay cho form giả.

## Yêu cầu nội dung

Viết copy nghe như Nhật Minh tự giới thiệu: đang đi học, thích code và muốn nhận các dự án nhỏ phù hợp để tích luỹ kinh nghiệm. Tự tin vừa đủ, không tự hạ thấp mình và không giả vờ là agency lớn. Nhấn mạnh trao đổi rõ, báo giá trước, website dễ xem trên điện thoại và sẵn sàng nói thật nếu một yêu cầu vượt khả năng.

CTA chính: “Nhắn Facebook”, “Xem dịch vụ”, “Kể tui nghe ý tưởng”. CTA phụ: “Ủng hộ Minh” nhưng tuyệt đối không gây áp lực. Link Facebook phải giữ nguyên URL nêu trên.

## Checklist trước khi hoàn tất

- [ ] Trang có đầy đủ những section được yêu cầu và nav đi đúng vị trí.
- [ ] Mobile menu, FAQ, nút quay lên đầu trang và mọi CTA hoạt động.
- [ ] Không có link placeholder bị quên, nút giả hay thông tin bịa.
- [ ] Không có giá/feedback/portfolio giả; concept được ghi nhãn rõ ràng.
- [ ] Mobile 320px, 375px, tablet và desktop không tràn ngang.
- [ ] Bàn phím có thể đi qua các controls; focus state và aria state phù hợp.
- [ ] Reduced motion hoạt động; animation không che nội dung.
- [ ] Kiểm tra console, lỗi asset và các đường dẫn.
- [ ] Nếu có lệnh test/build trong project, chạy lệnh phù hợp và sửa lỗi phát sinh.
- [ ] Tóm tắt file đã sửa, cách chạy, các chỗ chủ website cần thay (logo, giá, Discord, donate, portfolio thật) và những gì chưa có backend.

## Cách làm việc

Đừng chỉ đưa bản thiết kế hoặc đoạn code minh hoạ. Hãy chỉnh trực tiếp project, hoàn thành các phần quan trọng, tự kiểm tra và báo kết quả trung thực. Nếu thiếu một dữ liệu không thiết yếu, dùng một mặc định có thể chỉnh sửa và ghi chú; không dừng lại để hỏi những điều có thể xử lý bằng placeholder rõ ràng. Nếu gặp giới hạn thật sự, nói rõ giới hạn và đưa cách triển khai hợp lý nhất.
