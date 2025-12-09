# API Specs (Draft)

## Base
- Base URL: `https://api.example.com/v1`
- Auth: Bearer token (JWT)
- Rate Limits: 1000 req/min
- Pagination: `offset`/`limit`

## Endpoints (sample)
- GET `/api/v1/reports/daily` — Get daily report (metrics aggregate).
- POST `/api/v1/workflows/execute` — Trigger workflow (n8n or orchestrator).
- GET `/api/v1/metrics/count` — Get count via CV/ML or other source.
- POST `/api/v1/tasks` — Create task (e.g., from email/form).
- GET `/api/v1/sync/status` — Check data sync status.

## Response Example
```json
{
  "success": true,
  "data": {
    "reportDate": "2025-01-02",
    "revenue": 12345.67,
    "orders": 321
  }
}
```

## Error Codes
- `INVALID_INPUT`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `RATE_LIMITED`, `INTERNAL_ERROR`

## Notes
- All responses JSON; include `requestId` header; document in OpenAPI at `/api/docs`.

