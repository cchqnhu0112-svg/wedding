# Dự Án Thiệp Cưới Online (Online Wedding Invitation) - React + Tailwind CSS

Dự án thiệp cưới online được thiết kế chính xác theo phong cách **Y2K Pastel Doodle / Whimsical Romance** từ mẫu thiết kế của bạn, với tông màu kem, xanh pastel, hồng pastel, vàng và xanh olive kết hợp cùng các họa tiết vẽ tay (doodles) ngọt ngào.

---

## 🌟 Tính Năng Nổi Bật

1. **Giao Diện Chuẩn Thiết Kế Gốc (Pixel-Accurate)**:
   - **Hero Card**: Khung viền sọc xanh da trời - trắng với đường cắt răng cưa (scalloped teeth), khung viền uốn lượn tím nhạt, thông điệp *"ДОРОГИЕ РОДНЫЕ И БЛИЗКИЕ!"*, *"У нас для вас прекрасная новость! МЫ ЖЕНИМСЯ"*, tên cô dâu chú rể *"Роман & Валерия"*, ảnh lồng trong trái tim hồng có nơ ruy băng vẽ tay.
   - **Lịch Tháng 9/2026**: Tiêu đề ngày *"05.09.26"*, hoa nhí vàng, bảng lịch tháng 9 với ngày 5 được khoanh bằng trái tim vẽ tay kèm nút **"Lưu vào Google Calendar / Apple Calendar"**.
   - **Địa Điểm ("ГДЕ?")**: Huy hiệu oval nét vẽ tay 3 vòng, hoa hồng lớn, hoa xanh, mũi tên chỉ dẫn, thông tin trang viên Stroganov và nút xanh olive **"ОТКРЫТЬ КАРТУ"** (mở popup bản đồ Google Maps & Yandex Maps kèm nút sao chép địa chỉ).
   - **Dress Code ("ЧТО НАДЕТЬ?")**: Bảng viền ren lượn sóng với 4 ô màu chủ đạo (Xanh pastel, Vàng pastel, Xanh xô thơm, Hồng phấn) có tương tác xem tên màu.
   - **Lịch Trình ("ВО СКОЛЬКО?")**: Đăng ký hôn phối (12:30) & Tiệc cưới (17:00) với dải ruy băng xanh và vàng uốn lượn.
   - **Lời Nhắn Quà Mừng ("ПРИМИТЕ ВО ВНИМАНИЕ")**: Lời nhắn gửi gắm phong bao mừng cưới.
   - **Biểu Mẫu Xác Nhận Tham Dự ("АНКЕТА ГОСТЯ")**:
     - Ô nhập họ và tên
     - Lựa chọn tham dự ("Обязательно буду" / "К сожалению, не получится")
     - Người đi cùng & con nhỏ
     - Nhu cầu xe đưa đón
     - Nút gửi **"ОТПРАВИТЬ"**: Bắn pháo hoa giấy confetti và hiển thị popup cảm ơn, cho phép gửi chia sẻ nhanh qua Telegram/Zalo.
   - **Người Điều Phối ("ЕСТЬ ВОПРОСЫ?")**: Số điện thoại liên hệ, thông tin điều phối viên Aleksandr và đường gợn sóng xanh nước biển.
   - **Lời Kết ("С НЕТЕРПЕНИЕМ ЖДЕМ ВАС!")**: Huy hiệu kết thúc tràn ngập mong chờ.

2. **Các Tính Năng Tương Tác Bổ Sung**:
   - 🎵 **Trình phát nhạc nền lãng mạn**: Nút phát nhạc xoay tròn êm dịu góc dưới màn hình.
   - 🌐 **Đa ngôn ngữ (3 Ngôn Ngữ)**:
     - **Русский (Gốc)**: Giữ nguyên 100% tiếng Nga y chang như trong ảnh thiết kế.
     - **Tiếng Việt**: Dành cho đám cưới Việt Nam.
     - **English**: Dành cho khách quốc tế.
   - 📱 **2 Chế Độ Xem (View Mode)**:
     - **Bản gốc 2 cột (Dual Column)**: Trưng bày 2 cột song song như hình mẫu.
     - **Bản di động cuộn (Mobile Scroll)**: Mô phỏng khung điện thoại thông minh để xem cách khách mời lướt trên màn hình dọc.
   - ⏳ **Đồng hồ đếm ngược**: Tự động đếm ngày, giờ, phút, giây đến thời khắc lễ cưới 05.09.2026.
   - 📸 **Thay đổi ảnh cưới trực tiếp**: Nhấn vào khung ảnh trái tim để tải lên ảnh cô dâu chú rể của bạn.

---

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Di chuyển vào thư mục dự án
```bash
cd /Users/mbp/.gemini/antigravity/scratch/wedding-invitation-react
```

### 2. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt tại: `http://localhost:5173`

### 3. Build sản phẩm (Production)
```bash
npm run build
```
Thư mục xuất ra nằm tại `dist/`, có thể deploy trực tiếp lên Vercel, Netlify, GitHub Pages hoặc Cloudflare Pages cực kỳ nhẹ và nhanh.
