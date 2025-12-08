# General Rules for All Code

## Project Context
- Backend automation platform with real-time data processing for retail ops.
- Must handle 1000+ concurrent connections; multi-region (APAC).

## Code Quality Standards
- Write maintainable, readable code; prefer clarity over cleverness.
- File naming: source camelCase (`userService.ts`, `dataProcessor.py`), tests end with `.test.ts` or `.spec.ts`, configs lowercase-with-dashes or camelCase.
- Imports sorted: stdlib → third-party → local; no unused imports.
- Comments: explain WHY, not WHAT; keep JSDoc/TSDoc for public functions; avoid stale comments.
- Documentation: keep README and memory-bank in sync when behavior or interfaces change.

## Error Handling
- Never swallow errors; always log with context (no secrets).
- Use custom errors with machine-readable `code` and HTTP `statusCode`.
- Async flows use try/catch; bubble to centralized error middleware/handler.
- Provide safe error responses: `{ success: false, code, message }`; do not leak stack traces in prod.

## Performance Guidelines
- Avoid N+1 queries (prefer joins/eager loading); batch writes.
- Cache where sensible (Redis), add TTL; invalidate on writes.
- Target DB queries <100ms p95; API handlers <200ms p95.
- Add pagination for list endpoints; stream large exports.

## Security Checklist
- Validate and sanitize all inputs (schema-based validation).
- Use parameterized queries only; escape outputs to avoid XSS.
- Do not log secrets; keep secrets in `.env.*` (gitignored except template).
- Enforce HTTPS in staging/prod; implement rate limiting and CORS allow-list.
- Keep dependencies updated; run vuln scans in CI.

## Collaboration & Process
- Branch naming: `feature/*`, `bugfix/*`, `release/*`.
- Commits follow conventional format, e.g., `feat(api): add workflow trigger`.
- Tests required for new logic; minimum coverage 80%.
- Ask for clarification on ambiguous requirements; prefer explicit decisions documented in `memory-bank/decisions.md`.

