title: Vibecode Kit (Backend + Automation + UI/UX)
description: Use Vibecode Kit rules to scaffold backend modules, DB, API, n8n workflows, and UI/UX.

## Context Sources (read first)
- AGENTS.md
- .cursorrules
- .cursor/rules/* (general, backend, api, database, automation, testing, security, python, uiuxpro)
- memory-bank/* (brief, tech stack, architecture, api-specs, implementation-plan, progress, decisions)

## Task Flow
1) Summarize user request; list scope and constraints.
2) Propose modules: controller/service/repo/entity/migration/tests; API schema with validation + envelopes; auth/JWT, rate limit, CORS.
3) DB: TypeORM entities + migrations; indexes; avoid N+1.
4) Automation: n8n workflow (Trigger → Fetch → Transform → Validate → Persist → Notify); output JSON workflow.
5) UI/UX: select style+palette+font+chart from UI UX Pro Max; layout KPI/trend/table; note chosen tokens.
6) Testing: unit + integration (supertest) for main routes.
7) List files to create/edit before generating code.

## Output Requirements
- Responses in concise steps.
- Code uses project envelopes: { success, data } or { success: false, code, message }.
- Respect max line length 100, semicolons (TS), trailing commas.
- Never leak secrets; use env placeholders.

