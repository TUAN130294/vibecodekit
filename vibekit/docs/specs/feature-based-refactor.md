# Feature-Based Clean Architecture Refactor

## Goal
Tái cấu trúc dự án từ cấu trúc theo layer (controllers/services/entities/routes) sang cấu trúc theo feature (Feature-Based Clean Architecture) để tối ưu cho AI Coding.

## Business Logic
- Mỗi feature là một domain nghiệp vụ độc lập
- Tất cả code liên quan đến một feature nằm trong cùng một thư mục
- Dễ dàng tìm kiếm, maintain và scale
- AI có thể hiểu context tốt hơn khi tất cả code liên quan nằm gần nhau

## Schema / Data Structure
Không thay đổi database schema, chỉ thay đổi cấu trúc code.

## Flow

### Phase 1: Phân tích
- Đọc tất cả file trong `src/controllers`, `src/services`, `src/entities`, `src/routes`
- Xác định các feature domain:
  - **auth**: Authentication logic
  - **tasks**: Task management
  - **reports**: Report generation
  - **health**: Health check (infrastructure, có thể để shared)

### Phase 2: Tạo cấu trúc mới
Tạo thư mục `src/features/` với cấu trúc:
```
src/features/
├── auth/
│   └── routes/
├── tasks/
│   ├── controllers/
│   ├── services/
│   ├── entities/
│   ├── types/
│   └── routes/
├── reports/
│   ├── controllers/
│   ├── services/
│   ├── entities/
│   └── routes/
└── shared/
    ├── entities/  (User, Order - shared entities)
    └── services/  (health, email, stripe - shared services)
```

### Phase 3: Di chuyển file
- `src/routes/auth.ts` → `src/features/auth/routes/auth.ts`
- `src/controllers/taskController.ts` → `src/features/tasks/controllers/taskController.ts`
- `src/services/taskService.ts` → `src/features/tasks/services/taskService.ts`
- `src/entities/Task.ts` → `src/features/tasks/entities/Task.ts`
- `src/routes/tasks.ts` → `src/features/tasks/routes/tasks.ts`
- `src/controllers/reportController.ts` → `src/features/reports/controllers/reportController.ts`
- `src/services/reportService.ts` → `src/features/reports/services/reportService.ts`
- `src/entities/Report.ts` → `src/features/reports/entities/Report.ts`
- `src/routes/reports.ts` → `src/features/reports/routes/reports.ts`
- `src/entities/User.ts` → `src/features/shared/entities/User.ts`
- `src/entities/Order.ts` → `src/features/shared/entities/Order.ts`
- `src/controllers/healthController.ts` → `src/features/shared/controllers/healthController.ts`
- `src/services/healthService.ts` → `src/features/shared/services/healthService.ts`
- `src/services/emailService.ts` → `src/features/shared/services/emailService.ts`
- `src/services/stripeService.ts` → `src/features/shared/services/stripeService.ts`

### Phase 4: Cập nhật imports
Tìm và cập nhật TẤT CẢ imports trong:
- `src/config/dataSource.ts` (import entities)
- `src/routes/index.ts` (import routes và controllers)
- Các file trong features (relative imports giữa các file trong cùng feature)
- Bất kỳ file nào khác import từ các file đã di chuyển

### Phase 5: Cleanup
- Xóa thư mục rỗng: `src/controllers/`, `src/services/`, `src/entities/`, `src/routes/`
- Kiểm tra không có file nào bị bỏ sót

## Edge Cases & Validations
- ✅ Đảm bảo tất cả imports được cập nhật đúng
- ✅ Đảm bảo TypeORM dataSource vẫn load được tất cả entities
- ✅ Đảm bảo routes vẫn hoạt động đúng
- ✅ Không break bất kỳ functionality nào
- ✅ Shared entities (User, Order) phải accessible từ tất cả features

## Checklist
- [ ] Tạo cấu trúc thư mục `src/features/`
- [ ] Di chuyển auth feature
- [ ] Di chuyển tasks feature
- [ ] Di chuyển reports feature
- [ ] Di chuyển shared entities và services
- [ ] Cập nhật imports trong `src/config/dataSource.ts`
- [ ] Cập nhật imports trong `src/routes/index.ts`
- [ ] Cập nhật imports trong tất cả file đã di chuyển
- [ ] Kiểm tra không có file nào bị bỏ sót
- [ ] Xóa thư mục rỗng
- [ ] Test build để đảm bảo không có lỗi

