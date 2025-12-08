# Automation & Data Analytics Platform

## Project Overview
- Purpose: Build scalable automation workflows and real-time data analytics for internal teams.
- Tech Stack: Node.js, TypeScript, Python, PostgreSQL, Redis, n8n, Google Sheets API, Cloudflare.
- Target: Multi-region capable; real-time data sync and reporting.
- Users: Internal operations, product, analytics, or business teams.

## Development Environment
- Node.js: `npm install`, `npm run dev`, `npm run worker`
- Python: `python -m venv venv && venv\\Scripts\\activate` (Windows) or `source venv/bin/activate`; install deps via `pip install -r requirements.txt`
- n8n: Self-hosted; start via `docker compose up n8n` or `n8n start`
- PostgreSQL/Redis: Run via Docker or managed services; ensure network access for local dev.

## Build & Test Commands
- Node: `npm run build`, `npm run test`, `npm run test:e2e`
- Python: `python -m pytest src/`
- Lint/Format: `npm run lint`, `npm run format`, `black src/`, `pylint src/`
- Deploy: `npm run deploy:staging`, `npm run deploy:prod`

## Code Style & Conventions
- TypeScript strict mode, ES modules.
- Naming: camelCase for variables/functions, PascalCase for classes/components, UPPER_SNAKE for constants.
- Formatting: 2-space indent (TS), 4-space indent (Python), max line length 100, semicolons required, trailing commas in multi-line lists/objects.
- Logging: Structured logging (Winston for Node, logging module for Python); never log secrets.
- Error Handling: Custom error classes with HTTP status codes and machine-readable `code`.

## Git Workflow
- Branches: `feature/*`, `bugfix/*`, `release/*`
- Commits: `feat(api): add workflow trigger endpoint`
- Pre-commit: lint + tests + type checks before push.

## Security Requirements
- Secrets in `.env.*` only (gitignored except `.env.example`).
- Validate all inputs; sanitize outputs; parameterized queries only.
- JWT-based auth; enforce HTTPS in staging/prod; rate limiting on APIs.
- CORS: explicit allow-list; avoid wildcards in production.

## Database Rules
- PostgreSQL with migrations (TypeORM/SQLAlchemy).
- Index frequently queried/filter columns; avoid N+1 (use joins/eager loading).
- Use transactions for multi-step writes; backup and restore procedures documented.

## API Documentation
- OpenAPI/Swagger available at `/api/docs`; keep endpoints annotated in code.
- Consistent response envelope: `{ success, data, error? }`; errors include `code`, `message`.

## Performance Targets
- API latency: <200ms p95; DB queries: <100ms p95; uptime 99.9%.
- Use caching (Redis) and batching where appropriate.

## Deployment
- CI/CD stages: Lint → Test → Build → Deploy Staging → Deploy Prod; production deploys require approval and rollback path.

## Common Patterns
- API handler template with validation, service call, typed response.
- Service layer wraps repositories; repositories isolate DB.
- Error middleware translating domain errors to HTTP responses.
- n8n workflow pattern: Trigger → Fetch → Transform → Validate → Persist → Notify; log failures, add retries/backoff.
- UI/UX dashboards: KPI cards + trends above, tables below; loading/empty/error states; show freshness timestamps.

