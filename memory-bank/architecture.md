# Architecture Overview

## High-Level Components
- API Server (Node.js, Express/Fastify).
- Worker Service (Node or Python for async jobs).
- Data Processing/ML Service (Python FastAPI/Celery).
- n8n Orchestrator (workflows, webhooks).
- PostgreSQL + Redis; optional Elasticsearch.
- Object storage for reports/artifacts.

## Data Flow
- Ingest events via API/webhooks → validate → queue → workers → DB.
- n8n triggers workflows, calls APIs, and writes to DB.
- Reporting endpoints query DB/Elasticsearch; caching via Redis.
- ML/CV service processes media, returns counts/labels to API/DB.

## Microservices (optional)
- `api`: handles HTTP, auth, validation, routing.
- `worker`: background jobs, queues, scheduled tasks.
- `ml`: model inference/training endpoints.
- `orchestrator`: n8n instance for workflow automation.

## Database Schema (core tables)
- `users` (id, email, role, password_hash, created_at).
- `orders` (id, user_id, total, status, created_at).
- `workflows` (id, name, config, status, created_at).
- `reports` (id, type, period, path, created_at).

## Integration Points
- Google Sheets API for ops data.
- Webhooks from POS/ecommerce.
- Messaging to Slack/WhatsApp/Line via APIs.

## Deployment
- Containerized services; optional Kubernetes.
- Multi-region: deploy per region with read replicas; route via Cloudflare.
- CI/CD: GitHub Actions; promote dev → staging → prod.

## Security Architecture
- JWT auth; RBAC middleware.
- HTTPS/TLS everywhere; WAF at edge.
- Encrypt data at rest; backups encrypted; audit logs for admin actions.

## Scalability
- Horizontal scale API and workers; auto-scale on queue depth/CPU.
- Cache hot endpoints; use read replicas.
- Use queues to smooth bursts; circuit breakers for external deps.

