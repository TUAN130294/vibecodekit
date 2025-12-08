# Testing Rules

## Coverage & Scope
- Minimum 80% coverage; critical paths higher.
- Unit tests for services/utils; integration tests for controllers + DB; E2E for key flows.

## Structure
- Unit: colocate under `src/**/__tests__` or `tests/unit`.
- Integration: `tests/integration` hitting test DB; use migrations + seeds.
- E2E: `tests/e2e` with real HTTP (supertest/Playwright).

## Naming
- Describe behavior: `should return 404 when user missing`.
- Files end with `.test.ts` / `.spec.ts`.

## Mocking
- Mock external APIs with jest.mock/MSW; avoid mocking core logic.
- Use test doubles for queues/cache when integration not needed.

## Database in Tests
- Use isolated test DB; migrate before suite; truncate between tests.
- Seed deterministic fixtures; avoid relying on ordering.

## Performance/Load
- Use Artillery/k6 for load/regression on critical endpoints.
- Track p95 latency; budget <200ms API, <100ms DB.

## Python Tests
- pytest with `tests/` folder; fixtures for IO; use `pytest-cov`.
- Keep parity with Node behaviors for shared contracts.

## CI
- Run lint, unit, integration in pipeline; fail fast on coverage drop.
- Parallelize suites; cache dependencies; produce junit + coverage reports.

