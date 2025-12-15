# Restaurant Backend API

Backend service cho hệ thống quản lý nhà hàng, được xây dựng bằng **NestJS**. Hỗ trợ quản lý bàn, tạo mã QR, và xuất báo cáo (PDF, ZIP).

## 🚀 Cách hệ thống hoạt động

Hệ thống xoay quanh việc **số hóa quy trình gọi món tại bàn** thông qua mã QR:

1.  **Quản lý bàn:** Admin tạo danh sách bàn trong hệ thống (số bàn, vị trí).
2.  **Mã hóa thông tin:** Mỗi bàn được gán một **Token duy nhất** (chứa ID bàn hoặc URL gọi món). Token này được mã hóa thành hình ảnh **QR Code**.
3.  **Xuất bản in:**
    * **PDF:** Hệ thống nhúng ảnh QR Code và thông tin bàn vào file PDF để in và dán lên từng bàn.
    * **ZIP:** Gom tất cả file PDF của các bàn vào một file nén (.zip) để tải về một lần duy nhất.

---

## 🛠 Công nghệ sử dụng
- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **PDF Generation:** PDFKit (tạo file PDF từ code)
- **QR Code:** node-qrcode (tạo ảnh mã QR)
- **Compression:** Archiver (nén file ZIP)

## ⚙️ Cài đặt & Cấu hình

### 1. Cài đặt dependencies
```bash
npm install
```

##Cấu hình Font chữ (Quan trọng)Để file PDF hiển thị đúng tiếng Việt, bắt buộc phải có file font:Tạo thư mục: backend/assets/fonts/Tải file Roboto-Regular.ttf (hoặc font tiếng Việt bất kỳ) và đặt vào thư mục trên.Kiểm tra file nest-cli.json đã có cấu hình copy assets:
"compilerOptions": {
  "assets": ["assets/**/*"],
  "watchAssets": true
}
🚀 Chạy ứng dụng
# Chế độ development (hot-reload)
```bash
npm run start:dev
```
# Chế độ production
```bash
npm run build
npm run start:prod
```
Server sẽ chạy tại: http://localhost:3000

