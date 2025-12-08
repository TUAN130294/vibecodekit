# Backend (Node.js + Express/Fastify) Rules

## Architecture Pattern
- MVC with Service/Repository layers; domain logic in services, DB in repositories.
- Suggested layout:
```
src/
  controllers/
  services/
  repositories/
  models/
  middleware/
  utils/
  config/
  types/
  tests/
```

## Express/Fastify Conventions
- Routes descriptive and RESTful: `/users/:id`, `/workflows/:workflowId/run`.
- Keep handlers thin: validate → call service → map response → hand off errors to middleware.
- Validation via Joi/Zod per-route; reject early with 400 + code.

### Route Definitions (good)
```ts
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
```

### Error Middleware
```ts
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof APIError ? err.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    code: err instanceof APIError ? err.code : 'INTERNAL_ERROR',
    message: err.message,
  });
});
```

## Async/Await Best Practices
- Always wrap in try/catch and forward to `next(err)`.
- Avoid mixing `.then()` with `async/await`.
- Use `Promise.all` for independent IO; guard with timeouts when calling external APIs.

## Service Layer Pattern
```ts
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundError('USER_NOT_FOUND', `User ${userId} not found`);
    return user;
  }
}
```

## Dependency Injection
- Prefer constructors for services/repositories; avoid hidden globals.
- Example with lightweight container:
```ts
container.bind('UserRepo', () => new UserRepository(db));
container.bind('UserService', c => new UserService(c.get('UserRepo')));
```

## Database Interaction (TypeORM)
- Use entities with explicit column types and indices; enable migrations.
```ts
@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  total!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
```
- Transactions for multi-step writes:
```ts
await dataSource.transaction(async manager => {
  await manager.save(user);
  await manager.save(order);
});
```

## Validation (Joi/Zod)
- Define schemas per route; reuse across controller and tests.
```ts
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});
```

## Testing (Jest)
- Unit test each service method; mock repositories and external APIs.
- Integration tests hit real DB (test schema); seed data per suite; tear down cleanly.
- Aim for 80%+ coverage; snapshot for consistent response envelopes.

## Logging
- Structured JSON logs via Winston; include `requestId`, `userId`, and `code` on errors.
- Redact PII/secrets; log at `info` for normal ops, `warn` for recoverable issues, `error` for failures.

## Performance & Reliability
- Add pagination and filtering to all list endpoints.
- Use caching (Redis) for hot reads; set TTL and cache keys including user/tenant scope.
- Apply rate limiting and timeouts on external API calls; circuit breaker for unstable deps.

## API Responses
- Standard envelope: `{ success: true, data }` or `{ success: false, code, message }`.
- Return proper HTTP codes: 200/201 for success, 400 for validation, 401/403 auth, 404 not found, 409 conflict, 429 rate limit, 500 fallback.

