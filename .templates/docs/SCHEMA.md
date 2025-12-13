# Database Schema Documentation

## Overview
<!-- Mô tả tổng quan về database design -->
- **Database Type**: [PostgreSQL/MySQL/MongoDB/etc.]
- **ORM**: [TypeORM/Prisma/Mongoose/etc.]
- **Naming Convention**: [snake_case/camelCase/etc.]

---

## Tables

### Table: `users`
<!-- Mô tả bảng users -->
**Purpose**: [Mục đích của bảng]

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Unique identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| `password_hash` | VARCHAR(255) | NOT NULL | Hashed password |
| `role` | VARCHAR(50) | DEFAULT 'user' | User role (user/admin) |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_users_email` on `email` (for fast lookups)

**Relationships**:
- One-to-Many: `users` → `tasks` (via `assigned_to`)
- One-to-Many: `users` → `orders` (via `user_id`)

---

### Table: `tasks`
<!-- Mô tả bảng tasks -->
**Purpose**: [Mục đích của bảng]

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Unique identifier |
| `title` | VARCHAR(255) | NOT NULL | Task title |
| `description` | TEXT | NULL | Task description |
| `status` | ENUM | NOT NULL, DEFAULT 'open' | Task status (open/in_progress/done) |
| `priority` | ENUM | DEFAULT 'medium' | Priority (low/medium/high) |
| `assigned_to` | UUID | FOREIGN KEY → users.id | Assigned user ID |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_tasks_status` on `status` (for filtering)
- `idx_tasks_assigned_to` on `assigned_to` (for user queries)

**Relationships**:
- Many-to-One: `tasks` → `users` (via `assigned_to`)

**Enums**:
```sql
CREATE TYPE task_status AS ENUM ('open', 'in_progress', 'done');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
```

---

### Table: `orders`
<!-- Mô tả bảng orders -->
**Purpose**: [Mục đích của bảng]

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Unique identifier |
| `total` | DECIMAL(10,2) | NOT NULL | Order total amount |
| `status` | ENUM | NOT NULL, DEFAULT 'pending' | Order status |
| `user_id` | UUID | FOREIGN KEY → users.id, NOT NULL | Customer user ID |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_orders_status` on `status` (for filtering)
- `idx_orders_user_id` on `user_id` (for user queries)
- `idx_orders_created_at` on `created_at` (for date range queries)

**Relationships**:
- Many-to-One: `orders` → `users` (via `user_id`)

**Enums**:
```sql
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'cancelled');
```

---

### Table: `reports`
<!-- Mô tả bảng reports -->
**Purpose**: [Mục đích của bảng]

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Unique identifier |
| `type` | ENUM | NOT NULL | Report type (daily/monthly) |
| `data` | JSONB | NOT NULL | Report data (flexible schema) |
| `generated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Generation timestamp |

**Indexes**:
- `idx_reports_type` on `type` (for filtering)
- `idx_reports_generated_at` on `generated_at` (for date queries)

**Relationships**:
- None (standalone table)

**Enums**:
```sql
CREATE TYPE report_type AS ENUM ('daily', 'monthly');
```

**JSONB Schema** (for `data` column):
```json
{
  "date": "2024-01-01",
  "totalRevenue": 1000.00,
  "orderCount": 50,
  "orders": ["uuid1", "uuid2"]
}
```

---

## Relationships Diagram

```
users
  ├── 1:N → tasks (via assigned_to)
  └── 1:N → orders (via user_id)

tasks
  └── N:1 → users (via assigned_to)

orders
  └── N:1 → users (via user_id)

reports
  └── (standalone)
```

---

## Row Level Security (RLS) Policies

### PostgreSQL RLS Example

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Enable RLS on tasks table
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view tasks assigned to them
CREATE POLICY "Users can view assigned tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = assigned_to);

-- Policy: Admins can view all tasks
CREATE POLICY "Admins can view all tasks"
  ON tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
```

---

## Migrations

### Migration Naming Convention
```
YYYYMMDDHHMMSS-description.ts
```

### Example Migration
```typescript
// migrations/20241210120000-create-tasks-table.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasksTable1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          // ... more columns
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
```

---

## Data Validation Rules

### Application-Level Validation
- **Email**: Must be valid email format, unique
- **Password**: Minimum 8 characters, must contain uppercase, lowercase, number
- **Status Enums**: Must match predefined enum values
- **UUIDs**: Must be valid UUID v4 format

### Database-Level Constraints
- **NOT NULL**: Required fields
- **UNIQUE**: Email addresses, unique identifiers
- **FOREIGN KEY**: Referential integrity
- **CHECK**: Custom validation (e.g., total > 0)

---

## Indexing Strategy

### Primary Indexes
- All tables have `id` as PRIMARY KEY (auto-indexed)

### Secondary Indexes
- **Frequently queried columns**: `status`, `user_id`, `created_at`
- **Foreign keys**: Automatically indexed by most databases
- **Composite indexes**: For multi-column queries (e.g., `(user_id, status)`)

### Index Maintenance
- Monitor index usage and remove unused indexes
- Rebuild indexes periodically for optimal performance

---

## Backup & Recovery

### Backup Strategy
- **Frequency**: Daily full backups, hourly incremental
- **Retention**: 30 days for daily, 7 days for hourly
- **Location**: [S3/Cloud Storage/etc.]

### Recovery Procedures
- **Point-in-time recovery**: Supported
- **RTO (Recovery Time Objective)**: [Target, e.g., 1 hour]
- **RPO (Recovery Point Objective)**: [Target, e.g., 15 minutes]

---

## Appendix

### ER Diagram
<!-- Link to visual ER diagram or embed image -->
[Link to ER diagram]

### Sample Queries
```sql
-- Get all tasks for a user
SELECT * FROM tasks WHERE assigned_to = :userId;

-- Get daily report data
SELECT * FROM reports WHERE type = 'daily' ORDER BY generated_at DESC LIMIT 1;
```

