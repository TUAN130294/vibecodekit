# Universal Development Kit - Hướng Dẫn Tiếng Việt 🇻🇳

**Bộ công cụ phát triển full-stack hoàn chỉnh** với AI-powered workflows, automation, và real-time analytics.

## 🚀 Cách Chạy Web (Cho Người Mới Bắt Đầu)

### ⚡ Cách Nhanh Nhất (Windows)

1. **Tìm file**: `🚀 CHẠY WEB.bat` hoặc `SETUP_WEBSITE.bat` ở thư mục gốc của project
2. **Nhấp đúp** (double-click) vào file đó
3. **Đợi** web tự động cài đặt và chạy (lần đầu có thể mất vài phút)
4. **Trình duyệt** sẽ tự động mở sau vài giây tại: `http://localhost:3000/kit-guide`

### 📋 Yêu Cầu

- ✅ **Node.js** (phiên bản 18 trở lên)
  - Tải tại: https://nodejs.org/
  - Chọn phiên bản LTS (Long Term Support)
- ✅ **Windows 10/11** (file .bat chỉ chạy trên Windows)

### 💡 Lưu Ý

- **Giữ cửa sổ Command Prompt mở** để web tiếp tục chạy
- **Nhấn `Ctrl+C`** trong cửa sổ đó để dừng web server
- **Lần đầu chạy** có thể mất vài phút để cài đặt dependencies
- **Các lần sau** sẽ chạy nhanh hơn

### ❌ Nếu Gặp Lỗi

**"Node.js chưa được cài đặt"**
- Tải và cài Node.js từ https://nodejs.org/
- Khởi động lại máy tính sau khi cài

**"Port 3000 đang được sử dụng"**
- Đóng các ứng dụng khác đang dùng port 3000
- Hoặc đợi vài phút rồi thử lại

**"npm install thất bại"**
- Kiểm tra kết nối internet
- Thử chạy lại file .bat
- Hoặc mở PowerShell và chạy: `npm install`

**Web không mở tự động**
- Mở trình duyệt thủ công
- Truy cập: `http://localhost:3000/kit-guide`

## 📁 Cấu Trúc Project

```
.
├── 🚀 CHẠY WEB.bat          ← File này để chạy web (Windows)
├── SETUP_WEBSITE.bat        ← File này cũng để chạy web
├── HƯỚNG DẪN CHẠY WEB.txt   ← Hướng dẫn chi tiết
│
├── app/                     ← Frontend (Next.js)
│   └── kit-guide/          ← Trang web guide
│
├── src/                     ← Backend (Node.js)
│   ├── controllers/        ← Xử lý API requests
│   ├── services/           ← Business logic
│   └── routes/             ← Định nghĩa routes
│
├── .cursor/rules/          ← Quy tắc cho AI (Cursor)
├── memory-bank/            ← Tài liệu dự án
└── docs/                    ← Hướng dẫn chi tiết
```

## 🎯 Tính Năng Chính

### Frontend
- ✅ React 18 + Next.js 14
- ✅ Tailwind CSS
- ✅ TypeScript
- ✅ Web Guide với Prompt Generator

### Backend
- ✅ Node.js + Express
- ✅ REST API
- ✅ JWT Authentication
- ✅ PostgreSQL + TypeORM

### AI & Automation
- ✅ AI Agent System
- ✅ Code Templates
- ✅ n8n Workflows
- ✅ Python Workers

## 📚 Tài Liệu

- **Hướng dẫn nhanh**: `docs/quick-start.md`
- **Hướng dẫn chạy web**: `HƯỚNG DẪN CHẠY WEB.txt`
- **Quy tắc AI**: `.cursor/rules/`
- **Tài liệu dự án**: `memory-bank/`

## 🆘 Hỗ Trợ

Nếu gặp vấn đề:
1. Đọc file `HƯỚNG DẪN CHẠY WEB.txt`
2. Kiểm tra file `docs/quick-start.md`
3. Tạo issue trên GitHub: https://github.com/TUAN130294/vibecodekit

---

**Chúc bạn sử dụng vui vẻ! 🎉**

