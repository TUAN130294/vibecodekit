# Database (PostgreSQL + TypeORM) Rules

## Schema Design
- Normalize core entities; denormalize selectively for hot paths.
- Use UUID primary keys; timestamps with time zone.
- Enforce NOT NULL where possible; default values for state fields.
- Naming: snake_case tables/columns; plural tables (`users`, `orders`).

## Entities & Decorators (TypeORM)
```ts
@Entity({ name: 'workflows' })
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'jsonb', nullable: true })
  config!: Record<string, unknown> | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
```

## Migrations
- All schema changes via migrations; no direct schema edits.
- Versioned, reversible; run in CI before deploy.
- Keep migration idempotent and data-safe; backfill in batches.

## Indexing & Performance
- Add indices for frequent WHERE/JOIN columns; include partial indexes for status flags.
- Avoid sequential scans on large tables; analyze query plans.
- Use pagination (limit/offset or keyset); avoid unbounded queries.

## Query Patterns
- Parameterized queries only; prefer repository/query builder over raw SQL.
- Use transactions for multi-step writes; wrap in `dataSource.transaction`.
- For bulk operations, batch and throttle to avoid lock contention.

## Relationships
- 1:1 with `@OneToOne` + unique constraint; 1:N with `@OneToMany`/`@ManyToOne`; M:N with join tables.
- Set cascade only when intentional; prefer explicit deletes; use soft-delete where audit is needed.

## Connection Management
- Use pooling; configure min/max; close connections on shutdown.
- Separate read replicas if needed; mark read-only operations.

## Backup & Restore
- Daily backups; test restores; document RPO/RTO in `memory-bank/architecture.md`.
- Encrypt backups; restrict access; rotate credentials.

## Data Validation & Governance
- Validate at API/service layer before persistence.
- Use constraints (CHECK, UNIQUE) to protect invariants.
- Log data access for sensitive tables; mask PII in logs/exports.

