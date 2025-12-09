# Tự động chẩn đoán lỗi (Doctor & Rules)

## Khi nào dùng?
- Muốn kiểm tra nhanh môi trường, biến `.env`, cổng dịch vụ.
- Muốn nhắc nhở bảo mật/secret trước khi commit.

## Lệnh nhanh
```bash
npm run doctor
```

## Doctor làm gì?
- Kiểm tra biến bắt buộc (`DATABASE_URL`, `JWT_SECRET`).
- Báo thiếu/đủ các biến optional.
- Quét `.env*` tìm dấu hiệu secret thật (cảnh báo, không chặn).
- Kiểm tra cổng 3000/5432/6379 có đang trống.

## Cursor Rules
- `.cursorrules` + `.cursor/rules/*` hướng dẫn AI fix lỗi đúng chuẩn dự án.
- Quy tắc Active Context: trước khi kết thúc task phải cập nhật `memory-bank/progress.md`.

## Quy trình gợi ý
1. Chạy `npm run doctor` để chắc môi trường sạch.
2. Đọc rule liên quan (frontend/backend/security/ai-chatbot) trước khi sửa code.
3. Sửa lỗi theo rule; ghi nhận thay đổi quan trọng vào memory-bank nếu cần.

