# Universal Kit - Quick Start Guide

Get up and running with the Universal Kit in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git
- Docker (optional, for full stack)

## 1. Installation

```bash
# Clone or use this kit
cd your-project

# Install Node.js dependencies
npm install

# Install Python dependencies (optional, for automation/ML)
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

## 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
# Minimum required:
# DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
# JWT_SECRET="your-secret-key"
```

## 3. Database Setup

### Option A: Local PostgreSQL

```bash
# Start PostgreSQL (if using Docker)
docker-compose up -d postgres redis

# Run migrations
npx prisma migrate dev
# or for TypeORM
npm run typeorm migration:run
```

### Option B: Use a Cloud Database

```bash
# Update DATABASE_URL in .env.local with your cloud DB URL
# Then run migrations
npx prisma migrate deploy
```

## 4. Start Development Server

```bash
# Start the dev server
npm run dev

# In another terminal, start the worker (optional)
npm run worker

# Access the app
# Open http://localhost:3000
```

## 5. Verify Installation

Visit these endpoints to verify everything works:

- `http://localhost:3000` - Main app
- `http://localhost:3000/api/health` - Health check
- `http://localhost:3000/api/docs` - API documentation (if enabled)

## Quick Tour

### Project Structure

```
.
├── .cursor/rules/          # AI coding rules
│   ├── frontend/           # React, Next.js, Tailwind
│   ├── backend/            # Node.js, API patterns
│   ├── database/           # PostgreSQL, MongoDB, Prisma
│   └── deployment/         # AWS deployment
│
├── .agent/                 # AI agent system
│   ├── skills/             # Code reviewer, test generator
│   └── workflows/          # Feature development workflows
│
├── templates/              # Code generation templates
│   ├── react/              # Component, hook, page templates
│   ├── api/                # REST & GraphQL templates
│   └── fullstack/          # Full CRUD templates
│
├── src/                    # Backend source code
│   ├── entities/           # Database models
│   ├── services/           # Business logic
│   ├── controllers/        # Route handlers
│   └── middleware/         # Express middleware
│
├── app/                    # Frontend (Next.js App Router)
│   ├── api/                # API routes
│   ├── components/         # React components
│   └── (routes)/           # Page routes
│
├── memory-bank/            # Project documentation
│   ├── architecture.md     # System architecture
│   ├── api-specs.md        # API specifications
│   └── decisions.md        # Technical decisions
│
└── ui-ux-pro-max-skill-main/  # UI/UX design system
```

### Key Features

#### 1. Frontend Development (React + Next.js)
```bash
# Create a new component
# Use Vibecoder: /generate component UserCard

# Or manually copy from templates/react/component/
```

#### 2. Backend API Development
```bash
# Create a new API endpoint
# Use Vibecoder: /generate api users

# Or manually copy from templates/api/rest-endpoint/
```

#### 3. Full CRUD Features
```bash
# Generate complete feature with frontend + backend
# Use Vibecoder: /generate crud products

# This creates:
# - Database model
# - API endpoints
# - Frontend pages (list, create, edit)
# - Tests
```

#### 4. Code Review
```bash
# Review your code
# Use Vibecoder: /review

# With options:
# /review --security    # Focus on security
# /review --pr          # Review entire PR
# /review --fix         # Auto-fix issues
```

#### 5. Test Generation
```bash
# Generate tests for your code
# Use Vibecoder: /generate-tests

# Or use agent:
# /workflow feature "User authentication"
# This runs complete workflow including test generation
```

## Common Tasks

### Add a New Page

1. Create page file:
```bash
# app/products/page.tsx
```

2. Use Next.js App Router conventions:
```tsx
export default async function ProductsPage() {
  return <div>Products</div>;
}
```

### Add a New API Endpoint

1. Create route handler:
```bash
# app/api/products/route.ts
```

2. Implement handlers:
```ts
export async function GET(request: NextRequest) {
  // Your logic
  return NextResponse.json({ data: [] });
}
```

### Add a New Database Model

#### With Prisma:
```prisma
// prisma/schema.prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  price     Float
  createdAt DateTime @default(now())
}
```

```bash
npx prisma migrate dev --name add-product
npx prisma generate
```

#### With TypeORM:
```ts
// src/entities/Product.ts
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;
}
```

## Using the AI Agent System

### Code Review
```bash
# In your IDE or Vibecoder:
/review
```

The agent will check for:
- Code quality issues
- Security vulnerabilities
- Performance problems
- Best practice violations

### Feature Development Workflow
```bash
/workflow feature "Add user profile page"
```

The agent will:
1. Analyze requirements
2. Create implementation plan
3. Generate code
4. Generate tests
5. Review code
6. Create documentation

### Refactoring
```bash
/refactor
```

The agent suggests:
- Function extraction
- Component simplification
- Performance improvements
- Code duplication removal

## Using Code Templates

### React Component
```bash
# Copy template
cp -r templates/react/component src/components/MyComponent

# Replace {{ComponentName}} with your component name
# Update props and implementation
```

### API Endpoint
```bash
# Copy template
cp templates/api/rest-endpoint/route.ts app/api/myendpoint/route.ts

# Replace {{resource}} and {{ResourceName}}
# Implement your logic
```

## Testing

### Run Tests
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Generate Tests
```bash
# Use Vibecoder agent
/generate-tests src/components/UserCard.tsx

# Or use test generator skill directly
```

## Deployment

### Deploy to AWS

See [AWS Deployment Guide](.cursor/rules/deployment/aws.md) for detailed instructions.

Quick options:

#### Elastic Beanstalk (Easiest)
```bash
eb init
eb create production
eb deploy
```

#### Docker + ECS
```bash
docker build -t my-app .
docker push to ECR
# Deploy to ECS
```

#### Serverless (Amplify/Lambda)
```bash
amplify init
amplify add hosting
amplify publish
```

## Troubleshooting

### Database Connection Issues
```bash
# Check DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
npx prisma db pull

# Reset database if needed
npx prisma migrate reset
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Regenerate types
npx prisma generate

# Check tsconfig.json paths
npm run build
```

## Next Steps

1. **Read the Architecture** - Check `memory-bank/architecture.md`
2. **Explore Rules** - Read `.cursor/rules/` for coding guidelines
3. **Try Templates** - Generate components and APIs
4. **Use Agents** - Let AI help with code review and generation
5. **Check UI/UX Kit** - Explore `ui-ux-pro-max-skill-main/`

## Getting Help

- **Documentation**: Check `memory-bank/` and `docs/` folders
- **Rules**: Read `.cursor/rules/` for best practices
- **Templates**: Refer to `templates/` for examples
- **Issues**: Create issues in your repo

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**You're ready to build! 🚀**

Start with:
```bash
npm run dev
```

Then use Vibecoder commands like `/generate component` or `/workflow feature` to accelerate development!
