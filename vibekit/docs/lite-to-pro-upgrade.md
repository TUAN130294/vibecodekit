# Lite to Pro Upgrade Guide

> 🎯 **Khi nào cần upgrade?**
> - Traffic vượt quá free tier (>100k requests/month)
> - Cần background jobs/automation
> - Cần Redis cho caching/rate limiting
> - Muốn tự host để kiểm soát hoàn toàn

---

## Tổng quan Upgrade

### Before (Lite Mode)
```
Frontend & API → Vercel (Serverless)
Database → Supabase/Neon (Serverless)
Cost: $0/month
```

### After (Pro Mode)
```
Full Stack → Docker (Self-hosted or AWS)
Database → PostgreSQL (Container)
Redis → Redis (Container)
Python Workers → Background jobs
n8n → No-code automation
Cost: $20-50/month (self-hosted) hoặc $60-180/month (AWS)
```

---

## Option 1: Nhanh nhất - Chạy CLI Init lại

### Bước 1: Backup code hiện tại

```bash
# Commit tất cả changes
git add .
git commit -m "Before upgrade to Pro"

# Tạo branch backup
git checkout -b backup-lite-mode
git checkout main
```

### Bước 2: Chạy lại init script

```bash
npm run init
# Chọn: Pro Mode
# Chọn features cần thêm
```

Script sẽ tự động:
- ✅ Generate `docker-compose.yml` mới
- ✅ Update `.env` với local services
- ✅ Add Python worker folder
- ✅ Add n8n config

### Bước 3: Migrate data từ Supabase/Neon

```bash
# Export data từ Supabase
# Dashboard > Database > Backups > Download

# Hoặc dùng pg_dump
pg_dump "postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres" > backup.sql

# Import vào local PostgreSQL
docker-compose up -d postgres
psql "postgresql://admin:changeme@localhost:5432/myapp" < backup.sql
```

### Bước 4: Update environment variables

```bash
# .env (local)
DATABASE_URL="postgresql://admin:changeme@localhost:5432/myapp"
REDIS_URL="redis://localhost:6379"

# .env.production (for deployment)
DATABASE_URL="postgresql://admin:changeme@postgres:5432/myapp"
REDIS_URL="redis://redis:6379"
```

### Bước 5: Start services

```bash
# Pro mode - All services
docker-compose --profile pro up -d

# Or Full mode - Include Python + n8n
docker-compose --profile full up -d
```

**Done!** 🎉 Bạn đã upgrade lên Pro mode.

---

## Option 2: Manual Upgrade (Từng bước)

### Phase 1: Add Docker Services (Week 1)

#### 1.1 Add PostgreSQL

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: changeme
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
# Start PostgreSQL
docker-compose up -d postgres

# Migrate data from Supabase/Neon
pg_dump "old_db_url" | psql "postgresql://admin:changeme@localhost:5432/myapp"

# Update .env
DATABASE_URL="postgresql://admin:changeme@localhost:5432/myapp"

# Test app locally
npm run dev
```

#### 1.2 Add Redis (Optional nhưng khuyến nghị)

```yaml
# docker-compose.yml
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

```bash
# Start Redis
docker-compose up -d redis

# Install Redis client
npm install ioredis

# Update code
# lib/redis.ts
import Redis from 'ioredis'
export const redis = new Redis(process.env.REDIS_URL!)
```

### Phase 2: Add Python Workers (Week 2)

#### 2.1 Create Python service

```bash
mkdir -p services/python-worker
cd services/python-worker
```

```dockerfile
# services/python-worker/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "worker.py"]
```

```python
# services/python-worker/worker.py
import os
import psycopg2
import time

DATABASE_URL = os.getenv('DATABASE_URL')

def process_jobs():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    while True:
        # Fetch pending jobs
        cur.execute("SELECT id, data FROM jobs WHERE status = 'pending' LIMIT 10")
        jobs = cur.fetchall()

        for job_id, data in jobs:
            try:
                # Process job
                print(f"Processing job {job_id}...")
                # ... your logic here ...

                # Mark as completed
                cur.execute("UPDATE jobs SET status = 'completed' WHERE id = %s", (job_id,))
                conn.commit()
            except Exception as e:
                print(f"Error: {e}")
                cur.execute("UPDATE jobs SET status = 'failed' WHERE id = %s", (job_id,))
                conn.commit()

        time.sleep(5)  # Poll every 5 seconds

if __name__ == '__main__':
    process_jobs()
```

```yaml
# docker-compose.yml
  python-worker:
    build: ./services/python-worker
    environment:
      DATABASE_URL: postgresql://admin:changeme@postgres:5432/myapp
    depends_on:
      - postgres
```

```bash
docker-compose up -d python-worker
```

### Phase 3: Add n8n Automation (Week 3)

```yaml
# docker-compose.yml
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

```bash
docker-compose up -d n8n

# Access n8n UI
open http://localhost:5678
# Login: admin / changeme

# Create workflows:
# - Auto-import data from external APIs
# - Send email notifications
# - Sync with Google Sheets
```

### Phase 4: Containerize Next.js App

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://admin:changeme@postgres:5432/myapp
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
```

```bash
docker-compose up -d app
```

---

## Deployment: Self-hosted vs AWS

### Option A: Self-hosted VPS ($5-20/month)

**Providers:**
- DigitalOcean Droplet ($6/month)
- Linode ($5/month)
- Vultr ($6/month)
- Contabo ($5/month - EU)

**Setup:**

```bash
# 1. SSH to VPS
ssh root@your-vps-ip

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Clone repo
git clone https://github.com/your-username/your-app.git
cd your-app

# 4. Setup .env
cp .env.example .env
nano .env  # Edit credentials

# 5. Start services
docker-compose --profile full up -d

# 6. Setup nginx (reverse proxy)
apt install nginx certbot python3-certbot-nginx
```

**Nginx config:**

```nginx
# /etc/nginx/sites-available/your-app
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Setup SSL
certbot --nginx -d your-domain.com
```

### Option B: AWS Deployment

Follow: [docs/deployment/aws.md](./deployment/aws.md)

---

## Data Migration Strategy

### Zero-downtime migration

```bash
# Step 1: Setup new infrastructure (Pro mode) parallel to old (Lite)
docker-compose up -d

# Step 2: Replicate data in real-time
# Use logical replication or custom sync script

# Step 3: Test thoroughly
npm run test
npm run test:e2e

# Step 4: Switch DNS
# Point domain from Vercel to new server

# Step 5: Monitor for 24h
# Check logs, metrics

# Step 6: Decommission old infrastructure
# Cancel Vercel/Supabase if not needed
```

---

## Cost Comparison

| Component | Lite (Serverless) | Pro (Self-hosted) | Pro (AWS) |
|-----------|------------------|-------------------|-----------|
| **Hosting** | Vercel Free | VPS $6/month | ECS $30/month |
| **Database** | Supabase Free | Included | RDS $20/month |
| **Redis** | Upstash Free | Included | ElastiCache $15/month |
| **Bandwidth** | 100GB free | 1-2TB included | $0.09/GB |
| **Total** | **$0** | **$6-20/month** | **$65-100/month** |

### Break-even Analysis

- **Traffic < 10k users/month**: Serverless wins ($0)
- **Traffic 10k-100k users**: Self-hosted wins ($6-20/month vs $20-50 Vercel Pro)
- **Traffic > 100k users**: AWS wins (better scaling, reliability)

---

## Rollback Plan

Nếu có vấn đề, rollback về Lite mode:

```bash
# 1. Restore backup branch
git checkout backup-lite-mode

# 2. Point domain back to Vercel
# Update DNS CNAME

# 3. Restore data to Supabase (if needed)
psql "supabase_url" < latest-backup.sql

# 4. Verify
# Test production URL
```

---

## Checklist

### Pre-upgrade
- [ ] Backup all data (database dump)
- [ ] Backup code (git commit)
- [ ] Document current environment variables
- [ ] Plan maintenance window (off-peak hours)

### During upgrade
- [ ] Setup Docker services locally
- [ ] Migrate data to new database
- [ ] Test all features locally
- [ ] Setup monitoring (logs, metrics)
- [ ] Configure backups

### Post-upgrade
- [ ] Monitor error rates (first 24h)
- [ ] Check performance metrics
- [ ] Verify all integrations working
- [ ] Update documentation
- [ ] Celebrate! 🎉

---

## Support

Nếu gặp vấn đề:
- 📖 [Troubleshooting Guide](./troubleshooting.md)
- 💬 GitHub Discussions
- 📧 Email support

---

**Estimated Upgrade Time:**
- Quick (CLI): 2-3 hours
- Manual: 1-2 weeks (phased approach)

**Recommended:** Start with Quick upgrade for testing, then fine-tune.
