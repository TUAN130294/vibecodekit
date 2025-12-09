# 🚀 Setup Project Mới từ Universal Kit

Hướng dẫn sử dụng Universal Kit để tạo project mới (ví dụ: antigravity).

## Cách 1: Clone và Setup (Khuyến nghị)

```bash
# 1. Clone Universal Kit về máy
git clone https://github.com/TUAN130294/vibecodekit.git antigravity
cd antigravity

# 2. Setup project với tên mới
npm run setup antigravity

# 3. Cài đặt dependencies
npm install

# 4. Cấu hình project (chọn database, API style, deployment...)
npm run init

# 5. Hoặc dùng web UI để cấu hình
npm run dev:web
# Mở http://localhost:3000/kit-guide và chọn options
# Sau đó chạy: npm run init:from-config
```

## Cách 2: Sử dụng Web UI

```bash
# 1. Clone và vào thư mục
git clone https://github.com/TUAN130294/vibecodekit.git antigravity
cd antigravity

# 2. Cài đặt dependencies
npm install

# 3. Chạy web UI
npm run dev:web

# 4. Mở http://localhost:3000/kit-guide
# 5. Chọn các options (Database, API Style, Deployment, Features)
# 6. Click "Lưu cấu hình & Tải Kit"
# 7. Đặt file kit-config.json vào thư mục gốc
# 8. Chạy: npm run init:from-config
```

## Cách 3: Setup nhanh với tên project

```bash
# Clone và setup trong một lệnh
git clone https://github.com/TUAN130294/vibecodekit.git antigravity && \
cd antigravity && \
npm install && \
npm run setup antigravity && \
npm run init
```

## Scripts có sẵn

- `npm run setup <project-name>` - Đổi tên project và cập nhật các file config
- `npm run init` - Interactive setup (hỏi từng bước)
- `npm run init:from-config` - Setup từ file kit-config.json đã lưu
- `npm run dev:web` - Chạy web UI để cấu hình trực quan

## Lưu ý

1. **Tên project** phải là lowercase, alphanumeric, và hyphens only
   - ✅ Đúng: `antigravity`, `my-app`, `project-123`
   - ❌ Sai: `AntiGravity`, `my_app`, `project.123`

2. Sau khi setup, nhớ:
   - Cập nhật `.env` với credentials thực tế
   - Review `memory-bank/*.md` files
   - Update README.md với thông tin project của bạn

3. Nếu dùng Docker, kiểm tra `docker-compose.yml` đã được cập nhật đúng tên project

## Ví dụ: Setup project "antigravity"

```bash
# Clone
git clone https://github.com/TUAN130294/vibecodekit.git antigravity
cd antigravity

# Setup
npm install
npm run setup antigravity

# Cấu hình qua web UI
npm run dev:web
# → Mở http://localhost:3000/kit-guide
# → Chọn options và save config
# → npm run init:from-config

# Hoặc cấu hình qua CLI
npm run init
```

## Sau khi setup xong

1. ✅ Project đã được đổi tên
2. ✅ Các file config đã được cập nhật
3. ✅ Sẵn sàng để phát triển!

Chúc bạn code vui vẻ! 🎉

