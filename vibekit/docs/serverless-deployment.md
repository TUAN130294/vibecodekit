# Serverless Deployment Guide - $0/month to Start

> 🎯 **Mục tiêu**: Deploy ứng dụng với chi phí $0, scale tự động, không cần quản lý server.

## Tổng quan

**Serverless Stack:**
- **Frontend & API**: Vercel (Free tier: 100GB bandwidth, unlimited requests)
- **Database**: Supabase hoặc Neon (Free tier: 500MB database)
- **Redis** (optional): Upstash (Free tier: 10,000 commands/day)
- **File Storage** (optional): Vercel Blob hoặc Supabase Storage

**Chi phí so sánh:**

| Stack | Setup | Free Tier | Scaling Cost |
|-------|-------|-----------|--------------|
| **Serverless** | 5 phút | $0/tháng | Chỉ trả khi có traffic |
| Traditional VPS | 30 phút | $5-20/tháng | Fixed cost |
| AWS EC2 | 1 giờ | $20-50/tháng | Fixed + traffic |

---

## Option 1: Vercel + Supabase (Khuyến nghị)

### Ưu điểm
✅ **All-in-one**: Database + Auth + Storage + Realtime
✅ **Generous free tier**: 500MB DB + 1GB storage + 2GB bandwidth
✅ **Built-in features**: Row Level Security, Realtime subscriptions, Auth
✅ **PostgreSQL compatible**: Dùng được Prisma, TypeORM

### Bước 1: Setup Supabase (3 phút)

1. **Tạo project miễn phí**
   ```bash
   # Truy cập https://supabase.com
   # Click "New Project"
   # Chọn region gần nhất (Singapore cho VN)
   # Set database password (save it!)
   ```

2. **Lấy credentials**
   ```bash
   # Vào Settings > API
   # Copy 3 values này:

   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGc...
   service_role key: eyJhbGc... (keep secret!)
   ```

3. **Lấy Database URL**
   ```bash
   # Vào Settings > Database > Connection string > URI

   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

4. **Cập nhật `.env.local`**
   ```bash
   # Database
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"

   # Supabase (for client-side)
   NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."

   # Supabase (server-side)
   SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."
   ```

5. **Run migrations**
   ```bash
   # Nếu dùng Prisma
   npx prisma migrate deploy

   # Hoặc tạo tables trực tiếp trên Supabase Dashboard
   # SQL Editor > New query
   ```

### Bước 2: Setup Vercel (2 phút)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login và link project**
   ```bash
   vercel login
   vercel link
   ```

3. **Add environment variables**
   ```bash
   # Copy từ .env.local
   vercel env add DATABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

5. **Done!** 🎉
   ```
   ✅ Production: https://your-app.vercel.app
   ```

---

## Option 2: Vercel + Neon (Postgres thuần)

### Ưu điểm
✅ **Pure Postgres**: Không bị lock-in vào Supabase
✅ **Branching**: Tạo branch database cho mỗi PR
✅ **Autoscaling**: Scale to zero khi không dùng
✅ **Free tier**: 0.5GB storage, 100 hours compute/month

### Bước 1: Setup Neon

1. **Tạo project**
   ```bash
   # Truy cập https://neon.tech
   # Click "Create Project"
   # Chọn region (AWS Singapore)
   ```

2. **Lấy connection string**
   ```bash
   # Dashboard > Connection Details

   postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```

3. **Cập nhật `.env.local`**
   ```bash
   DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"
   ```

4. **Run migrations**
   ```bash
   npx prisma migrate deploy
   ```

### Bước 2: Deploy Vercel

(Giống Option 1, bước 2)

---

## Option 3: Serverless với Upstash Redis (Optional)

### Khi nào cần Redis?
- Rate limiting
- Session storage
- Caching API responses
- Real-time features (pub/sub)

### Setup Upstash (2 phút)

1. **Tạo database**
   ```bash
   # Truy cập https://upstash.com
   # Create database
   # Chọn region gần nhất
   ```

2. **Lấy credentials**
   ```bash
   # Copy REST URL và Token

   UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=AXXXbGciOiJIUzI1NiI...
   ```

3. **Install client**
   ```bash
   npm install @upstash/redis
   ```

4. **Sử dụng**
   ```typescript
   // lib/redis.ts
   import { Redis } from '@upstash/redis'

   export const redis = new Redis({
     url: process.env.UPSTASH_REDIS_REST_URL!,
     token: process.env.UPSTASH_REDIS_REST_TOKEN!,
   })

   // Usage
   await redis.set('key', 'value')
   const value = await redis.get('key')
   ```

---

## Monitoring & Debugging

### Vercel Analytics (Built-in)

```bash
# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Supabase Logs

```bash
# Dashboard > Logs
# - API logs
# - Database logs
# - Realtime logs
```

### Error Tracking (Optional - Sentry)

```bash
npm install @sentry/nextjs

# Sentry.io có free tier: 5k errors/month
```

---

## Scaling & Costs

### Free Tier Limits

**Vercel:**
- ✅ 100GB bandwidth/month
- ✅ 100GB-hours serverless function execution
- ✅ Unlimited requests
- ✅ Automatic HTTPS
- ❌ 1 concurrent build (upgrade $20/month for more)

**Supabase:**
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 2GB bandwidth
- ✅ 50,000 monthly active users
- ❌ Paused after 1 week inactivity (free plan)

**Neon:**
- ✅ 0.5GB storage
- ✅ 100 hours compute/month (3 GB-hours)
- ✅ Autoscale to zero
- ❌ 1 project only (free plan)

**Upstash Redis:**
- ✅ 10,000 commands/day
- ✅ 256MB storage
- ❌ Max 1 database (free plan)

### Khi nào cần upgrade?

| Metric | Free Tier | Paid Tier |
|--------|-----------|-----------|
| **Traffic** | ~10k users/month | 100k+ users |
| **Database** | 500MB | Unlimited |
| **Build time** | 1 concurrent | 5+ concurrent |
| **Cost** | $0 | ~$20-50/month |

---

## Performance Tips

### 1. Edge Functions cho API nhanh hơn

```typescript
// app/api/hello/route.ts
export const runtime = 'edge' // 🚀 Chạy ở edge, latency thấp

export async function GET() {
  return Response.json({ hello: 'world' })
}
```

### 2. Incremental Static Regeneration (ISR)

```typescript
// app/posts/[id]/page.tsx
export const revalidate = 60 // Regenerate every 60 seconds

export default async function PostPage({ params }) {
  const post = await db.post.findUnique({ where: { id: params.id } })
  return <Article post={post} />
}
```

### 3. Image Optimization (Automatic)

```tsx
import Image from 'next/image'

// Vercel tự động optimize images
<Image src="/hero.jpg" width={800} height={600} alt="Hero" />
```

### 4. Database Connection Pooling

```typescript
// lib/db.ts - Supabase tự động có pooling
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Neon - Sử dụng Prisma với connection pooling
// DATABASE_URL="postgresql://...?pgbouncer=true"
```

---

## Migration Strategy

### Từ Self-hosted → Serverless

1. **Backup data**
   ```bash
   # Dump PostgreSQL
   pg_dump -h localhost -U admin myapp > backup.sql
   ```

2. **Import vào Supabase/Neon**
   ```bash
   # Supabase: SQL Editor > paste backup.sql
   # Neon: psql "postgresql://..." < backup.sql
   ```

3. **Update DNS**
   ```bash
   # Point domain to Vercel
   CNAME: your-app.vercel.app
   ```

### Từ Serverless → Self-hosted (Nếu scale quá lớn)

Follow guide: [docs/lite-to-pro-upgrade.md](./lite-to-pro-upgrade.md)

---

## Troubleshooting

### ❌ "Module not found" khi deploy

```bash
# Make sure dependencies are in "dependencies", not "devDependencies"
npm install <package> --save
```

### ❌ Database connection timeout

```bash
# Kiểm tra DATABASE_URL có đúng không
# Kiểm tra IP whitelist (Supabase/Neon cho phép all IPs by default)
```

### ❌ "Serverless Function has timed out"

```bash
# Vercel timeout: 10s (free), 60s (pro)
# Optimize slow queries hoặc chuyển sang background job
```

---

## Checklist Deploy

- [ ] Tạo Supabase/Neon project
- [ ] Copy DATABASE_URL vào Vercel env vars
- [ ] Run database migrations
- [ ] Deploy với `vercel --prod`
- [ ] Test production URL
- [ ] Setup custom domain (optional)
- [ ] Add Analytics
- [ ] Setup error tracking (optional)

---

## Next Steps

- ✅ [Lite to Pro Upgrade Guide](./lite-to-pro-upgrade.md) - Khi cần scale
- ✅ [Performance Optimization](./performance-optimization.md) - Tối ưu tốc độ
- ✅ [Security Best Practices](./security.md) - Bảo mật production

---

**💰 Total Cost: $0/month** cho ~10,000 users
**⚡ Deploy time: 5 phút** from zero to production
**🚀 Scalability:** Tự động scale, không downtime
