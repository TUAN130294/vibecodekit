# Technical Specifications

## Overview
<!-- Mô tả tổng quan về technical implementation -->
- **API Style**: [REST/GraphQL/gRPC]
- **API Versioning**: [Strategy, e.g., URL-based /api/v1/]
- **Response Format**: [JSON envelope structure]

---

## API Contracts

### Base URL
```
Production: https://api.example.com
Staging: https://staging-api.example.com
Development: http://localhost:3000
```

### Authentication
- **Method**: [JWT Bearer Token/OAuth 2.0/API Key]
- **Header**: `Authorization: Bearer <token>`
- **Token Expiry**: [e.g., 1 hour]
- **Refresh Token**: [If applicable]

### Response Envelope
All API responses follow this structure:

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
```

### Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_INPUT` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict (e.g., duplicate) |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | External service unavailable |

---

## Endpoints

### Authentication

#### POST `/api/auth/login`
**Description**: Authenticate user and return JWT token

**Request**:
```typescript
{
  email: string;
  password: string;
}
```

**Response** (200):
```typescript
{
  success: true,
  data: {
    token: string;
    expiresIn: number; // seconds
    user: {
      id: string;
      email: string;
      role: string;
    }
  }
}
```

**Error Responses**:
- `400`: Invalid input
- `401`: Invalid credentials
- `429`: Rate limit exceeded

---

### Tasks

#### GET `/api/tasks`
**Description**: Get paginated list of tasks

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | 1 | Page number |
| `limit` | number | No | 20 | Items per page (max 100) |
| `status` | string | No | - | Filter by status (open/in_progress/done) |

**Response** (200):
```typescript
{
  success: true,
  data: {
    tasks: Task[];
    total: number;
    page: number;
    limit: number;
  }
}
```

**Error Responses**:
- `400`: Invalid pagination parameters
- `401`: Unauthorized

---

#### POST `/api/tasks`
**Description**: Create a new task

**Request**:
```typescript
{
  title: string; // Required, max 200 chars
  description?: string; // Optional
  priority?: 'low' | 'medium' | 'high'; // Optional, default 'medium'
  assignedToId?: string; // Optional, UUID of user
}
```

**Response** (201):
```typescript
{
  success: true,
  data: Task
}
```

**Error Responses**:
- `400`: Invalid input (missing title, invalid priority, etc.)
- `401`: Unauthorized
- `404`: Assigned user not found (if assignedToId provided)

---

#### GET `/api/tasks/:id`
**Description**: Get single task by ID

**Response** (200):
```typescript
{
  success: true,
  data: Task
}
```

**Error Responses**:
- `404`: Task not found
- `401`: Unauthorized

---

#### PATCH `/api/tasks/:id`
**Description**: Partially update a task

**Request**:
```typescript
{
  title?: string;
  description?: string;
  status?: 'open' | 'in_progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assignedToId?: string;
}
```

**Response** (200):
```typescript
{
  success: true,
  data: Task
}
```

**Error Responses**:
- `400`: Invalid input
- `404`: Task not found
- `401`: Unauthorized

---

#### DELETE `/api/tasks/:id`
**Description**: Delete a task

**Response** (200):
```typescript
{
  success: true,
  data: {
    message: string;
    deletedTask: Task;
  }
}
```

**Error Responses**:
- `404`: Task not found
- `401`: Unauthorized
- `403`: Forbidden (if user doesn't own task)

---

### Reports

#### GET `/api/reports/daily`
**Description**: Get or generate daily report

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `date` | string | No | today | Date in ISO format (YYYY-MM-DD) |

**Response** (200):
```typescript
{
  success: true,
  data: {
    id: string;
    type: 'daily';
    data: {
      date: string;
      totalRevenue: number;
      orderCount: number;
      orders: string[]; // Array of order IDs
    };
    generatedAt: string; // ISO timestamp
  }
}
```

**Error Responses**:
- `400`: Invalid date format
- `401`: Unauthorized
- `500`: Report generation failed

---

### Health Check

#### GET `/api/health`
**Description**: Health check endpoint

**Response** (200):
```typescript
{
  success: true,
  data: {
    status: 'ok';
    uptime: number; // seconds
    timestamp: string; // ISO timestamp
  }
}
```

**No Authentication Required**

---

## Data Models

### Task
```typescript
interface Task {
  id: string; // UUID
  title: string;
  description: string | null;
  status: 'open' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedToId: string | null; // UUID
  assignedTo?: User | null; // Populated if relations included
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

### User
```typescript
interface User {
  id: string; // UUID
  email: string;
  role: 'user' | 'admin';
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

### Report
```typescript
interface Report {
  id: string; // UUID
  type: 'daily' | 'monthly';
  data: {
    date: string;
    totalRevenue: number;
    orderCount: number;
    orders: string[]; // Array of order IDs
  };
  generatedAt: string; // ISO timestamp
}
```

---

## Implementation Details

### Service Layer Pattern
```typescript
// Example: TaskService
export class TaskService {
  async createTask(data: CreateTaskDto): Promise<Task> {
    // 1. Validate input
    // 2. Check business rules
    // 3. Create entity
    // 4. Save to database
    // 5. Return result
  }
}
```

### Error Handling
```typescript
// Custom error class
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
  }
}

// Usage in service
if (!user) {
  throw new APIError(404, 'USER_NOT_FOUND', 'User not found');
}
```

### Validation
- **Input Validation**: Use Zod or class-validator
- **Type Safety**: Strict TypeScript
- **Database Constraints**: Foreign keys, NOT NULL, CHECK constraints

### Logging
```typescript
// Structured logging
logger.info('Task created', {
  taskId: task.id,
  userId: user.id,
  timestamp: new Date().toISOString()
});
```

---

## Performance Considerations

### Caching Strategy
- **API Responses**: Cache GET requests for 5 minutes (non-user-specific)
- **Database Queries**: Use Redis for frequently accessed data
- **Static Assets**: CDN caching with long TTL

### Database Optimization
- **Indexes**: On frequently queried columns (status, user_id, created_at)
- **Connection Pooling**: Max 20 connections per instance
- **Query Optimization**: Use EXPLAIN ANALYZE for slow queries

### Rate Limiting
- **Per IP**: 100 requests/minute
- **Per User**: 1000 requests/hour (authenticated)
- **Per Endpoint**: Custom limits for heavy operations

---

## Security

### Input Sanitization
- **SQL Injection**: Parameterized queries only
- **XSS**: Sanitize all user inputs before rendering
- **CSRF**: CSRF tokens for state-changing operations

### Authentication & Authorization
- **JWT**: Signed with HS256, expires in 1 hour
- **Refresh Tokens**: Stored in httpOnly cookies
- **Role-Based Access**: Check user role before sensitive operations

### Data Protection
- **Encryption**: TLS 1.3 for data in transit
- **Sensitive Data**: Hash passwords with bcrypt (cost factor 10)
- **PII**: Encrypt personally identifiable information at rest

---

## Testing

### Unit Tests
```typescript
describe('TaskService', () => {
  it('should create a task', async () => {
    const task = await taskService.createTask({
      title: 'Test Task',
      priority: 'high'
    });
    expect(task.title).toBe('Test Task');
  });
});
```

### Integration Tests
```typescript
describe('POST /api/tasks', () => {
  it('should create a task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task' });
    
    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe('Test Task');
  });
});
```

### E2E Tests
- Critical user flows (login, create task, view reports)
- Use Playwright or Cypress

---

## Deployment

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# Authentication
JWT_SECRET=your-secret-key

# Server
PORT=3000
NODE_ENV=production

# External Services
STRIPE_KEY=sk_live_...
SENDGRID_API_KEY=SG...
```

### Build Process
```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run migrations
npm run migrate

# Start server
npm start
```

### Monitoring
- **Health Checks**: `/api/health` endpoint
- **Error Tracking**: Sentry integration
- **Performance**: APM tool (DataDog/New Relic)

---

## Appendix

### API Versioning Strategy
- **URL-based**: `/api/v1/tasks`, `/api/v2/tasks`
- **Header-based**: `Accept: application/vnd.api+json;version=1`
- **Current Version**: v1

### Webhooks (if applicable)
- **Events**: task.created, task.updated, order.completed
- **Payload**: JSON with event type and data
- **Authentication**: HMAC signature

### GraphQL (if applicable)
- **Endpoint**: `/graphql`
- **Schema**: [Link to GraphQL schema]
- **Playground**: `/graphql` (development only)

