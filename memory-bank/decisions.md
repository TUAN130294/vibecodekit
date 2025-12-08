# Technical Decisions

## Database
- PostgreSQL chosen for reliability, JSONB, and ecosystem.

## API Framework
- Express.js selected for maturity and familiarity; Fastify viable if performance bottlenecks emerge.

## Authentication
- JWT for stateless auth; aligns with multi-region scaling; rotate secrets regularly.

## Caching & Queue
- Redis for caching and Bull Queue for background jobs.

## Deployment
- Dockerized services; Kubernetes optional; Cloudflare for CDN/edge routing.

## Monitoring
- Datadog preferred for unified metrics/logs/traces; ELK as fallback.

## API & Security
- Express with rate limiting, CORS allow-list (env `CORS_ORIGINS`), JWT stub in auth route.

## Rationale
- Choices optimize for speed-to-market, strong ecosystem, and operational simplicity.

