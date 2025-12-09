# Why VibeCodeKit?

## Không chỉ là prompt kit
❌ Kit khác: tập hợp prompt rời rạc, dễ mất bối cảnh, phải copy/paste liên tục.  
✅ VibeCodeKit: Một “Hệ điều hành cho Code” với 3 trụ cột:
- Bộ nhớ: **Memory Bank** giữ bối cảnh, kế hoạch, quyết định.
- Tay chân: **Python Worker** xử lý AI/data nặng, tách khỏi UI.
- Luật lệ: **Cursor Rules + Doctor** để mọi thay đổi an toàn, nhất quán.

## Lợi ích cốt lõi
- Onboard nhanh: mở `docs/` và `memory-bank/` là hiểu kiến trúc và quy trình.
- Không drift: Active Context bắt buộc cập nhật `memory-bank/progress.md`.
- Tự động hóa: gửi job AI nặng qua `usePythonWorker`, UI vẫn mượt.
- Tự chữa lành: `npm run doctor` + rule bảo mật giúp phát hiện lỗi sớm.

## So sánh nhanh
- Kế hoạch: Memory Bank workflow thay cho `/plan`.
- Tự động hóa: Python Worker automation thay cho `/cook`.
- Sửa lỗi: Doctor & Rules thay cho `/fix`.

## Cách bắt đầu
1) Đọc `docs/quick-start.md` (cài đặt, env).  
2) Lên kế hoạch tại `memory-bank/implementation-plan.md`.  
3) Code theo plan, gửi workload nặng sang Python Worker.  
4) Cập nhật `memory-bank/progress.md`, chạy `npm run doctor` trước khi commit.

