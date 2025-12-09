# Quy hoạch tính năng với Memory Bank

## Vì sao dùng Memory Bank?
- Lưu bối cảnh dự án ở dạng markdown → AI luôn nhớ được kiến trúc, quyết định, checklist.
- Không phụ thuộc phiên làm việc của IDE; tắt máy vẫn còn.
- Giảm drift: mọi người cùng nhìn một nguồn sự thật (source of truth).

## Bắt đầu
1. Mở `memory-bank/implementation-plan.md` để lên kế hoạch tính năng.
2. Ghi rõ yêu cầu, ràng buộc, edge cases.
3. Nếu cần bổ sung ngữ cảnh, thêm vào `memory-bank/architecture.md` hoặc `api-specs.md`.

## Quy trình hành động
1. Viết yêu cầu tại `memory-bank/implementation-plan.md`.
2. Cursor/AI đọc toàn bộ bối cảnh trong `memory-bank/*.md` và tự hoàn thiện chi tiết kỹ thuật còn thiếu.
3. Thực thi code theo kế hoạch, cập nhật tiến độ vào `memory-bank/progress.md` (được bắt buộc bởi Active Context rule).

## Lợi ích
- Kế hoạch được lưu vĩnh viễn, không mất bối cảnh.
- Dễ audit: xem lại quyết định và luồng triển khai.
- AI cộng tác hiệu quả hơn vì có tài liệu chuẩn hóa.

