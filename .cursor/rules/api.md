# API Design Rules (REST)

## Naming & Versioning
- RESTful, noun-based: `/api/v1/users/:id`, `/api/v1/reports/daily`.
- Version in path (`/api/v1`); keep breaking changes behind new version.

## Request/Response
- JSON only; UTF-8; snake_case in DB, camelCase in API responses.
- Envelope: `{ success: true, data }` or `{ success: false, code, message, details? }`.
- Pagination: `?offset=0&limit=50`; include `total` when available.

## Status Codes
- 200/201 success; 202 for async accepted.
- 400 validation, 401 unauthorized, 403 forbidden, 404 not found, 409 conflict, 422 semantic error, 429 rate limit, 500 fallback.

## Validation
- Use Joi/Zod schemas per route; reject unknown fields.
- Sanitize inputs; enforce types and bounds; validate UUIDs/emails.

## AuthN/AuthZ
- JWT bearer tokens; rotate secrets; short-lived access, refresh tokens optional.
- Role/permission checks in middleware; least privilege; audit key actions.

## Rate Limiting & CORS
- Apply per-IP/per-user rate limits; handle 429 with `Retry-After`.
- CORS allow-list per environment; block wildcard origins in prod.

## Error Responses
```json
{ "success": false, "code": "INVALID_INPUT", "message": "email is required" }
```
- Never leak stack traces or internal ids in prod responses.

## OpenAPI/Swagger
- Maintain up-to-date OpenAPI spec; serve at `/api/docs`.
- Annotate controllers/handlers; include examples and error cases.

## Observability
- Log requestId, userId, path, duration, status; exclude sensitive data.
- Emit metrics for latency, errors, rate limits, cache hits.

## Examples
```ts
router.post(
  '/workflows/execute',
  validate(bodySchema),
  async (req, res, next) => {
    try {
      const result = await workflowService.execute(req.body);
      return res.status(202).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
);
```

