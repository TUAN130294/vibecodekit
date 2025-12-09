# Security Rules

## Input & Output
- Validate all inputs (schema-based); sanitize outputs; enforce types.
- Block SQL injection with parameterized queries; escape/encode outputs to prevent XSS.
- Enforce size limits on payloads and uploads.

## Auth & Sessions
- JWT bearer tokens; short-lived access tokens; refresh tokens optional.
- Rotate secrets; store in `.env.*` only; never commit secrets.
- Role/permission checks centralized; least privilege; audit sensitive actions.

## Transport & Network
- HTTPS/TLS in staging/prod; HSTS; secure cookies where applicable.
- CORS allow-list per environment; disallow `*` in prod.
- Rate limit per IP/user; add captcha for public endpoints if abused.

## Secrets Management
- `.env.example` committed; `.env.local`/`.env.staging`/`.env.prod` gitignored.
- Use secret managers in cloud; avoid printing secrets in logs.

## Dependency & Supply Chain
- Run `npm audit`/`pip audit` in CI; pin versions; update regularly.
- Verify third-party SDK scopes; avoid over-permissioned service accounts.

## Data Protection
- Encrypt at rest (DB + backups) and in transit.
- Mask/redact PII in logs; minimize data retention; apply retention policies.
- Backups tested; document restore steps in `memory-bank/architecture.md`.

## Logging & Monitoring
- Structured logs with requestId/userId; avoid sensitive values.
- Alert on auth failures, rate-limit spikes, and unusual access patterns.
- Maintain audit logs for admin actions and data exports.

## Guardrails Checklist (build + review)
- Do not hardcode API keys; keep real secrets only in `.env.*` (gitignored).
- Validate input on both client + server; reject overlong payloads and unsafe HTML.
- Check authorization on every data fetch/update to prevent IDOR.
- For new APIs, keep response envelope `{ success, data, error? }` and avoid stack traces in prod.
- Before committing, run `npm run doctor` to spot missing envs and potential secret leaks.

