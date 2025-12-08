# n8n Workflow Rules (Detailed)

## Naming & Organization
- Workflows named by intent: `Daily Sales Sync`, `Customer Count Ingest`.
- Nodes named by action + target: `Fetch Sheets Orders`, `Upsert Orders DB`, `Notify Slack`.
- Use tags for environment and domain (e.g., `prod`, `sales`, `sync`).

## Error Handling & Retries
- Add error trigger workflows for alerting; include execution id and payload hash.
- Configure retries with exponential backoff on HTTP/DB nodes; cap attempts.
- For idempotency, use unique keys (e.g., orderId + source) and UPSERT semantics.

## Credentials & Secrets
- Store in n8n credentials; never inline secrets.
- Separate creds per environment; restrict permissions to least privilege.

## Webhooks
- Validate signatures; reject old timestamps; respond quickly (ack + async).
- Rate limit and deduplicate incoming events; log verification failures.

## Data Handling
- Normalize shapes early; validate required fields; drop unexpected.
- For CSV/Excel, define column maps and types; handle UTF-8/BOM.
- Use Set/Function nodes to enforce schemas before DB writes.

## Scheduling
- Avoid overlapping runs; use mutex flags or `Wait` nodes when needed.
- Stagger heavy jobs; align with source rate limits.

## Observability
- Enable execution logging; push errors to Slack/Email.
- Track metrics: success rate, duration, retries, DLQ size.
- Keep workflow changelog in `memory-bank/progress.md`.

## Templates
- Ingest: Webhook → Validate → Transform → UPSERT (DB) → Notify.
- Report: Cron → Fetch metrics → Aggregate → Generate file → Upload → Notify.
- Sync: Poll API → Diff → Apply changes → Emit webhooks to downstream.

