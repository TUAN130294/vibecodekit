# Next.js API Routes - Migration Guide

This directory contains **serverless API routes** that replace the Express backend (`src/`). These routes deploy seamlessly to **Vercel** with zero configuration, enabling true serverless deployment at **$0/month**.

## 📁 Directory Structure

```
app/api/
├── health/
│   └── route.ts          # GET /api/health - Health check
├── auth/
│   └── login/
│       └── route.ts      # POST /api/auth/login - Authentication
├── tasks/
│   ├── route.ts          # GET/POST /api/tasks - List/Create tasks
│   └── [id]/
│       └── route.ts      # GET/PUT/PATCH/DELETE /api/tasks/[id]
└── README.md             # This file
```

## 🔄 Migration from Express

### Before (Express) → After (Next.js API Routes)

| Express | Next.js API Routes | Location |
|---------|-------------------|----------|
| `src/routes/index.ts` | `app/api/health/route.ts` | Health check |
| `src/routes/auth.ts` | `app/api/auth/login/route.ts` | Authentication |
| `src/routes/tasks.ts` | `app/api/tasks/route.ts` | Task CRUD |
| `src/controllers/` | Merged into route handlers | N/A |
| `src/services/` | Inline or `/lib/services/` | Business logic |

### Key Differences

1. **No Express App**: Next.js handles routing automatically
2. **File-based Routing**: Each `route.ts` file = API endpoint
3. **Built-in TypeScript**: Full type safety with NextRequest/NextResponse
4. **Serverless by Default**: Auto-deploys to Vercel Edge/Lambda
5. **No Server Management**: No `server.listen()`, no ports, no Express middleware

## 🚀 Quick Start

### 1. Test API Routes Locally

```bash
npm run dev:lite
# or
npm run dev:web
```

Visit:
- http://localhost:3000/api/health
- http://localhost:3000/api/tasks

### 2. Test with cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# List tasks
curl http://localhost:3000/api/tasks?page=1&limit=10

# Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "New task", "priority": "high"}'

# Get single task
curl http://localhost:3000/api/tasks/1

# Update task status
curl -X PATCH http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'

# Delete task
curl -X DELETE http://localhost:3000/api/tasks/1
```

## 📦 API Endpoints

### Health Check

**GET** `/api/health`

Returns system health status.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 123.456,
    "environment": "development"
  }
}
```

---

### Authentication

**POST** `/api/auth/login`

Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**GET** `/api/auth/login` (Optional)

Verify token validity.

**Headers:**
```
Authorization: Bearer <token>
```

---

### Tasks

**GET** `/api/tasks?page=1&limit=20&status=OPEN`

List tasks with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `status` (optional): Filter by status (OPEN|IN_PROGRESS|COMPLETED|CANCELLED)

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "1",
        "title": "Setup development environment",
        "description": "Install Node.js, Docker, and configure IDE",
        "status": "COMPLETED",
        "priority": "high",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 20
  }
}
```

**POST** `/api/tasks`

Create a new task.

**Request Body:**
```json
{
  "title": "New task",
  "description": "Task description",
  "priority": "high",
  "assignedToId": "user-123"
}
```

**GET** `/api/tasks/[id]`

Get a single task by ID.

**PUT** `/api/tasks/[id]`

Fully update a task (all fields required).

**PATCH** `/api/tasks/[id]`

Partially update a task (only provided fields updated).

**DELETE** `/api/tasks/[id]`

Delete a task.

## 🔒 Production Checklist

### 1. Database Integration

Replace in-memory storage with a real database:

**Option A: Prisma + PostgreSQL**
```bash
npm install @prisma/client
npx prisma init
```

**Option B: Supabase**
```bash
npm install @supabase/supabase-js
```

**Option C: MongoDB**
```bash
npm install mongodb
```

### 2. Validation with Zod

```bash
npm install zod
```

Example:
```typescript
import { z } from 'zod';

const CreateTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional()
});

// In route handler:
const body = CreateTaskSchema.parse(await request.json());
```

### 3. Authentication Middleware

Create `lib/middleware/auth.ts`:
```typescript
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function verifyToken(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('Unauthorized');

  const secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret);
}
```

Use in routes:
```typescript
export async function GET(request: NextRequest) {
  const user = verifyToken(request); // Throws if invalid
  // ... rest of handler
}
```

### 4. Rate Limiting

Use Vercel Edge Middleware or Upstash Redis:

```bash
npm install @upstash/ratelimit @upstash/redis
```

### 5. Environment Variables

Create `.env.local`:
```bash
JWT_SECRET=your-secret-key-change-in-production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

Update `vercel.json` or Vercel dashboard with production secrets.

## 🌐 Deployment to Vercel

### 1. Deploy to Vercel

```bash
npm run deploy:vercel
```

or

```bash
vercel --prod
```

### 2. Configure Environment Variables

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `JWT_SECRET`
   - `DATABASE_URL`
   - Any other secrets

### 3. Test Production API

```bash
curl https://your-app.vercel.app/api/health
```

## 💰 Cost Comparison

| Deployment | Cost/Month | Notes |
|------------|-----------|-------|
| **Vercel (Lite Mode)** | $0 | 100GB bandwidth, 100K requests |
| **Vercel Pro** | $20 | Unlimited bandwidth, team features |
| **Self-hosted (Pro Mode)** | $5-50 | DigitalOcean, AWS, etc. |

## 🔧 Troubleshooting

### Issue: "Module not found" errors

**Solution:** Make sure you're using Next.js 14+ with app directory support.

```bash
npm install next@latest react@latest react-dom@latest
```

### Issue: CORS errors in production

**Solution:** Add CORS headers in route handlers:

```typescript
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ ... });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  return response;
}
```

### Issue: "Cannot read property 'tasksStore' of undefined"

**Solution:** The in-memory storage is for demo only. Implement a real database for production.

## 📚 Learn More

- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Prisma with Next.js](https://www.prisma.io/nextjs)
- [Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## 🆘 Need Help?

- Check the [serverless deployment guide](../../docs/serverless-deployment.md)
- Review the [Lite to Pro upgrade guide](../../docs/lite-to-pro-upgrade.md)
- Open an issue on GitHub
