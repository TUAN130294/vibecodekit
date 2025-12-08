# Automation (n8n) Rules

## Workflow Design
- Name nodes descriptively: `Fetch Orders`, `Transform to CSV`, `Notify Slack`.
- Standard pattern: Trigger → Fetch → Transform → Validate → Persist → Notify; add error branch.
- Keep workflows idempotent; use dedup keys when ingesting webhooks.

## Error Handling
- Add global error workflow for alerting/logging.
- Use retries with backoff on unstable APIs; cap attempts to avoid storms.
- Log enough context (workflow id, execution id, tenant/user) but never secrets.

## Variables & Templating
- Use `{{ $json.field }}` or `{{ $node.NodeName.json.field }}` explicitly.
- Keep environment-specific values in credentials/variables, not hardcoded.

## Webhooks & Triggers
- Secure webhooks with signatures/shared secrets; validate timestamps to prevent replay.
- Set reasonable timeouts and response bodies; return 2xx promptly then continue async if heavy.
- For schedules, avoid overlapping runs; add mutex/flag checks when necessary.

## Data Transformation
- Normalize to consistent shapes (snake_case for DB, camelCase for API).
- Validate after transform; drop/flag unexpected fields.
- For CSV/Excel, define header maps and types; handle encodings.

## Integrations
- DB: use parameterized queries; limit batch sizes; respect transactions.
- APIs: set `User-Agent`, rate limit, and handle 429 with jittered backoff.
- Messaging: ensure idempotency keys when pushing to queues.

## Testing & Monitoring
- Create sandbox credentials for test runs; avoid prod data.
- Version workflows; keep changelog in `memory-bank/progress.md`.
- Enable execution logging; send failures to alert channel (Slack/Email).

## Templates
- Bulk import: Trigger (Webhook) → Validate payload → Split in Batches → Upsert DB → Notify.
- Reporting: Cron → Fetch Metrics → Aggregate → Generate File → Upload (S3/GDrive) → Notify.
- Sync: Poll Source → Compare Hash → Upsert Changes → Emit Webhook.

