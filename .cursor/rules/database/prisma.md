# Prisma Development Rules

## Setup

### Installation
```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

This creates:
- `prisma/schema.prisma` - Schema definition
- `.env` - Database URL

### Configuration

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql", "mongodb", "sqlite"
  url      = env("DATABASE_URL")
}
```

## Schema Definition

### Basic Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  age       Int?
  isActive  Boolean  @default(true)
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
  profile   Profile?

  @@index([email])
  @@map("users") // Custom table name
}

enum Role {
  USER
  ADMIN
  MODERATOR
}
```

### Field Types
```prisma
model Example {
  id        String   @id @default(cuid())
  string    String
  int       Int
  float     Float
  boolean   Boolean
  datetime  DateTime
  json      Json
  bytes     Bytes
  decimal   Decimal
  bigint    BigInt

  // Optional
  optional  String?

  // Array
  tags      String[]

  // Default values
  status    String   @default("pending")
  count     Int      @default(0)
  created   DateTime @default(now())
  updated   DateTime @updatedAt
}
```

### Relationships

#### One-to-One
```prisma
model User {
  id      String   @id @default(cuid())
  profile Profile?
}

model Profile {
  id     String @id @default(cuid())
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId String @unique
}
```

#### One-to-Many
```prisma
model User {
  id    String @id @default(cuid())
  posts Post[]
}

model Post {
  id       String @id @default(cuid())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}
```

#### Many-to-Many
```prisma
model Post {
  id         String     @id @default(cuid())
  title      String
  categories Category[]
}

model Category {
  id    String @id @default(cuid())
  name  String
  posts Post[]
}

// With explicit join table (more control)
model Post {
  id               String            @id @default(cuid())
  title            String
  postCategories   PostCategory[]
}

model Category {
  id               String            @id @default(cuid())
  name             String
  postCategories   PostCategory[]
}

model PostCategory {
  post       Post     @relation(fields: [postId], references: [id])
  postId     String
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId String
  assignedAt DateTime @default(now())

  @@id([postId, categoryId])
}
```

## Migrations

### Create Migration
```bash
# Create and apply migration
npx prisma migrate dev --name init

# Create migration without applying
npx prisma migrate dev --create-only

# Apply pending migrations
npx prisma migrate deploy

# Reset database (DANGER: deletes all data)
npx prisma migrate reset
```

### Generate Client
```bash
# Generate Prisma Client after schema changes
npx prisma generate
```

## Prisma Client Setup

```ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Disconnect on shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
```

## CRUD Operations

### Create
```ts
// Create single record
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
    age: 30,
  },
});

// Create with relations
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
    posts: {
      create: [
        { title: 'First Post', content: 'Content' },
        { title: 'Second Post', content: 'More content' },
      ],
    },
  },
  include: {
    posts: true, // Include related posts in response
  },
});

// Create many
const users = await prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
  ],
  skipDuplicates: true, // Skip if unique constraint fails
});
```

### Read
```ts
// Find all
const users = await prisma.user.findMany();

// Find with filter
const adults = await prisma.user.findMany({
  where: {
    age: { gte: 18 },
    isActive: true,
  },
});

// Find unique (by unique field or ID)
const user = await prisma.user.findUnique({
  where: { email: 'john@example.com' },
});

const user = await prisma.user.findUnique({
  where: { id: userId },
});

// Find first matching
const user = await prisma.user.findFirst({
  where: { age: { gte: 18 } },
  orderBy: { createdAt: 'desc' },
});

// With relations
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: true,
    profile: true,
  },
});

// Select specific fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
  },
});

// Pagination
const users = await prisma.user.findMany({
  skip: 20, // Offset
  take: 10, // Limit
  orderBy: { createdAt: 'desc' },
});

// Count
const count = await prisma.user.count({
  where: { age: { gte: 18 } },
});
```

### Update
```ts
// Update one
const user = await prisma.user.update({
  where: { id: userId },
  data: { age: 31 },
});

// Update many
const result = await prisma.user.updateMany({
  where: { isActive: false },
  data: { status: 'archived' },
});

// Upsert (update or create)
const user = await prisma.user.upsert({
  where: { email: 'john@example.com' },
  update: { name: 'John Updated' },
  create: { email: 'john@example.com', name: 'John Doe' },
});

// Increment/Decrement
const user = await prisma.user.update({
  where: { id: userId },
  data: {
    loginCount: { increment: 1 },
    credits: { decrement: 10 },
  },
});

// Update with relations
const post = await prisma.post.update({
  where: { id: postId },
  data: {
    categories: {
      connect: [{ id: categoryId1 }, { id: categoryId2 }],
    },
  },
});
```

### Delete
```ts
// Delete one
const user = await prisma.user.delete({
  where: { id: userId },
});

// Delete many
const result = await prisma.user.deleteMany({
  where: { isActive: false },
});

// Delete all (DANGER)
await prisma.user.deleteMany({});
```

## Advanced Queries

### Filtering

#### Comparison
```ts
const users = await prisma.user.findMany({
  where: {
    age: { gt: 18, lt: 65 }, // Greater than, less than
    email: { contains: '@gmail.com' }, // String contains
    name: { startsWith: 'John' }, // String starts with
    status: { in: ['active', 'pending'] }, // In array
    deletedAt: { isSet: false }, // Check if null/undefined
  },
});
```

#### Logical Operators
```ts
// AND (implicit)
const users = await prisma.user.findMany({
  where: {
    age: { gte: 18 },
    isActive: true,
  },
});

// OR
const users = await prisma.user.findMany({
  where: {
    OR: [
      { age: { lt: 18 } },
      { age: { gt: 65 } },
    ],
  },
});

// NOT
const users = await prisma.user.findMany({
  where: {
    NOT: {
      email: { endsWith: '@spam.com' },
    },
  },
});

// Complex combinations
const users = await prisma.user.findMany({
  where: {
    OR: [
      { age: { lt: 18 } },
      {
        AND: [
          { age: { gte: 65 } },
          { isActive: true },
        ],
      },
    ],
  },
});
```

#### Relation Filters
```ts
// Users with at least one post
const users = await prisma.user.findMany({
  where: {
    posts: {
      some: {}, // At least one
    },
  },
});

// Users with posts containing "prisma"
const users = await prisma.user.findMany({
  where: {
    posts: {
      some: {
        title: { contains: 'prisma' },
      },
    },
  },
});

// Users with no posts
const users = await prisma.user.findMany({
  where: {
    posts: {
      none: {}, // Zero
    },
  },
});

// Users where ALL posts are published
const users = await prisma.user.findMany({
  where: {
    posts: {
      every: {
        published: true,
      },
    },
  },
});
```

### Sorting
```ts
const users = await prisma.user.findMany({
  orderBy: [
    { createdAt: 'desc' },
    { name: 'asc' },
  ],
});

// Sort by relation count
const users = await prisma.user.findMany({
  orderBy: {
    posts: {
      _count: 'desc',
    },
  },
});
```

### Aggregation
```ts
// Count
const count = await prisma.user.count();

// Average
const result = await prisma.user.aggregate({
  _avg: { age: true },
});

// Multiple aggregations
const result = await prisma.user.aggregate({
  _count: true,
  _avg: { age: true },
  _sum: { credits: true },
  _min: { age: true },
  _max: { age: true },
  where: { isActive: true },
});

// Group by
const result = await prisma.user.groupBy({
  by: ['country'],
  _count: true,
  _avg: { age: true },
});
```

## Transactions

### Sequential Transactions
```ts
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: 'john@example.com', name: 'John' } }),
  prisma.post.create({ data: { title: 'First Post', authorId: userId } }),
]);
```

### Interactive Transactions
```ts
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: 'john@example.com', name: 'John' },
  });

  const post = await tx.post.create({
    data: { title: 'First Post', authorId: user.id },
  });

  return { user, post };
});
```

### With Isolation Level
```ts
await prisma.$transaction(
  async (tx) => {
    // Transaction logic
  },
  {
    isolationLevel: 'Serializable',
    maxWait: 5000,
    timeout: 10000,
  }
);
```

## Raw Queries

### Raw SQL
```ts
// Execute raw query
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE age > ${18}
`;

// Execute raw update
const result = await prisma.$executeRaw`
  UPDATE users SET is_active = ${true} WHERE age > ${18}
`;
```

### Type-Safe Raw Queries
```ts
import { Prisma } from '@prisma/client';

const users = await prisma.$queryRaw<User[]>`
  SELECT * FROM users WHERE age > ${18}
`;
```

## Middleware

```ts
// Add middleware to Prisma Client
prisma.$use(async (params, next) => {
  const before = Date.now();

  const result = await next(params);

  const after = Date.now();
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);

  return result;
});

// Soft delete middleware
prisma.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'delete') {
    // Change delete to update
    params.action = 'update';
    params.args['data'] = { deletedAt: new Date() };
  }

  if (params.model === 'User' && params.action === 'findMany') {
    // Exclude soft-deleted
    if (!params.args.where) {
      params.args.where = {};
    }
    params.args.where.deletedAt = null;
  }

  return next(params);
});
```

## Best Practices

### 1. Use Proper Indexes
```prisma
model User {
  id    String @id @default(cuid())
  email String @unique

  @@index([email])
  @@index([lastName, firstName])
  @@fulltext([name, bio]) // MySQL/MongoDB only
}
```

### 2. Avoid N+1 Queries
```ts
// Bad: N+1 queries
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
}

// Good: Single query with include
const users = await prisma.user.findMany({
  include: { posts: true },
});
```

### 3. Select Only Needed Fields
```ts
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    // Don't fetch heavy fields if not needed
  },
});
```

### 4. Use Transactions for Related Operations
```ts
await prisma.$transaction([
  prisma.account.update({ where: { id: fromId }, data: { balance: { decrement: amount } } }),
  prisma.account.update({ where: { id: toId }, data: { balance: { increment: amount } } }),
]);
```

### 5. Connection Pooling
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection pool settings
  // ?connection_limit=10&pool_timeout=20
}
```

## Testing

```ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

test('create user', async () => {
  const user = { id: '1', email: 'test@example.com', name: 'Test' };

  prismaMock.user.create.mockResolvedValue(user);

  const result = await createUser({ email: 'test@example.com', name: 'Test' });

  expect(result).toEqual(user);
});
```

## Error Handling

```ts
import { Prisma } from '@prisma/client';

try {
  await prisma.user.create({ data: userData });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Unique constraint violation
    if (error.code === 'P2002') {
      console.error('Email already exists');
    }
  }
  throw error;
}
```

## Prisma Studio

```bash
# Open Prisma Studio (GUI for database)
npx prisma studio
```
