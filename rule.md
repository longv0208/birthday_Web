

### 🌸 1. Tổng quan
- Chủ đề: “Happy Birthday — Made with Love”
- Phong cách: pastel hồng nhẹ, tinh tế, ngọt ngào.
- Cấu trúc layout giống mẫu của Eazypizzylife trên TikTok: có tiêu đề, video, các nút ở giữa và phần lời chúc bên dưới.
- Toàn bộ giao diện phải **đẹp, mềm mại, có animation mượt mà** (sử dụng CSS keyframes hoặc Framer Motion nếu dùng React).
- - Lúc vào web, **ngay lập tức phát bài hát** bạn đã chọn (chẳng hạn từ một file `.mp3` hoặc streaming link) — tự động, loop hoặc một lần tùy bạn thiết lập.
---

### 🎀 2. Bố cục trang

#### 🧁 Header:
- Chữ “Happy Birthday!” (font tròn, màu #e58da3)
- Có hiệu ứng nhẹ: trái tim hoặc pháo hoa rơi bằng CSS animation hoặc canvas.

#### 🎞 Video giới thiệu:
- Một ảnh ở giữa, có overlay text:
```

hi, twenties!
Wishing you a day filled with love, joy, and all the things that make you happiest 💖

```
- Dưới video là 3 nút chính (đặt giữa trang, bo tròn, pastel pink):
```

[ Cake 🎂 ]   [ Album 🪩 ]   [ Read Me 💌 ]

```

---

### 🎂 3. Khi nhấn nút **"Cake 🎂"**

- Sau đó tạo hiệu ứng bánh sinh nhật rơi từng tầng xuống:
- Có 3 tầng bánh + 1 cây nến ở trên.
- Mỗi tầng rơi xuống theo thứ tự, nhẹ rung khi chạm nền.
- Sau khi bánh hoàn chỉnh, nến sáng lên ✨
- nếu có thể hãy làm cho người dùng có thể thổi được nến khi cho phép sử dụng mic
- Dòng chữ xuất hiện:
  > “Make a wish before you blow the candles 🎂💖”
- Có hiệu ứng confetti bay lên khi hoàn tất (`canvas-confetti` hoặc animation CSS).
- Bài hát phát ngầm nền trong suốt phần bánh rơi và hiệu ứng.

---

### 🎡 4. Khi nhấn nút **"Album 🪩"**
- Hiển thị gallery ảnh (photobooth dọc 3–4 ảnh, hiệu ứng trượt hoặc flip nhẹ).
- Có nút “Collect” phía dưới, khi nhấn hiện popup “Made with love 💕”.

---

### 💌 5. Khi nhấn nút **"Read Me 💌"**
- Hiển thị hộp thư bật ra giữa màn hình (animation mở phong bì).
- Bên trong là lời chúc sinh nhật:
> “Happy Birthday to the most amazing girl!  
> Keep shining, keep smiling, and never stop believing in yourself 💖”

---

### 🌷 6. Footer
- Dòng chữ nhỏ ở giữa:
```

(made with love)
eazypizzylife ✨

```

---

### 🎨 7. Style hướng dẫn
- Màu nền: #FFEFF3  
- Màu chữ chính: #D81B60  
- Font: ‘Poppins’, ‘Nunito’ hoặc ‘Inter’
- Nút bo tròn 20px, có hiệu ứng hover (`transform: scale(1.05)`, `box-shadow` nhẹ)
- Toàn bộ hiệu ứng vào/ra mượt, có thể dùng `transition: all 0.4s ease`

---

### ⚙️ 8. Công nghệ
- Có thể code bằng HTML/CSS/JS đơn thuần hoặc React + Tailwind.
- Nếu dùng React, hãy đặt component chính là `BirthdayCard.jsx`.
- Nếu dùng HTML thuần, đặt tên file là `index.html`.

---

### 💡 9. Yêu cầu thêm
- Tối ưu cho cả desktop và mobile.
- Animation mượt, không giật.
- Thời gian hoàn thiện < 5s (load nhanh).
- Khi người dùng nhấn lại “Cake 🎂”, animation bánh rơi và bài hát phát lại từ đầu.

---

### 📦 10. Tổng kết
Tạo cho tôi **một trang web thiệp sinh nhật đáng yêu, tương tác được, có hiệu ứng bánh sinh nhật rơi từng tầng xuống**, theo phong cách pastel ngọt ngào, giống giao diện của “eazypizzylife” trên TikTok, và phát bài hát bạn chọn ngay khi nhấn vào trang web.
```

---

