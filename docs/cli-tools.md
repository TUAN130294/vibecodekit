# CLI & Scripts

## Khởi tạo dự án
- `npm run init` / `npm run setup`: scaffold cấu hình cơ bản.
- `npm run prepare`: thiết lập git hooks (`.githooks/`), bật cảnh báo Active Context.

## Kiểm tra hệ thống
- `npm run doctor`: quét env, cổng dịch vụ, cảnh báo secret.

## Chạy ứng dụng
- `npm run dev`: backend (Express) development.
- `npm run dev:web`: Next.js App Router dev.
- `npm run worker`: worker TypeScript stub (hoặc chạy Python worker riêng).

## Build & test
- `npm run build`, `npm run test`, `npm run test:e2e`, `npm run lint`, `npm run format`.

## Deploy
- `npm run deploy:vercel` (web), `npm run deploy:docker` (compose profile pro).

## Tips
- Scripts Python worker thực tế nằm tại `services/python-worker/`.
- Có thể mở rộng scripts trong `scripts/` (init-from-config, setup-new-project, rename-project).

