# Universal Development Kit for Vibecoder 🚀

**Complete full-stack toolkit** for rapid development with AI-powered workflows, automation, and real-time analytics.

Includes: Node.js + TypeScript backend, React + Next.js frontend, Python automation/ML, n8n workflows, PostgreSQL/MongoDB/Redis, GraphQL, AWS deployment, and comprehensive UI/UX guidance.

## ✨ What's New - Universal Kit 2.0

### 🎯 Modular Architecture (LEGO System)
- **Lite Mode** - Serverless deployment, $0/month, 5 minutes setup
- **Pro Mode** - Docker with all services, $20-50/month
- **Smart CLI Init** - Choose only what you need with `npm run init`
- **Auto Cleanup** - Removes unused modules to keep project clean

### 💰 Serverless First (NEW!)
- **Zero Cost Start** - Vercel + Supabase free tier
- **Scale Gradually** - $0 → $20 → $100+ as you grow
- **Easy Upgrade** - Lite → Pro in 2 hours with migration guide

### 🎯 Phase 1: Core 80%
- **Frontend Rules**: React, Next.js 14, Tailwind CSS best practices
- **AI Agent System**: Code reviewer, test generator, refactoring assistant
- **Code Templates**: React components, API endpoints, full CRUD features
- **Database Support**: MongoDB (Mongoose), Prisma ORM (in addition to TypeORM)
- **GraphQL**: Complete GraphQL API setup with Apollo Server
- **Deployment**: Serverless (Vercel), Docker, AWS (EC2, ECS, Lambda)
- **Code Protection**: Prevent AI from breaking critical code
- **Human-Friendly DX**: Clean project structure, hidden AI configs

## 🎁 Features

### Frontend Development
- ✅ **React 18+** - Functional components, hooks, TypeScript
- ✅ **Next.js 14** - App Router, Server Components, RSC
- ✅ **Tailwind CSS** - Utility-first styling with design system
- ✅ **TypeScript** - Strict type checking, enhanced DX
- ✅ **Component Templates** - Ready-to-use templates for rapid development

### Backend Development
- ✅ **Node.js + Express** - REST API with TypeScript
- ✅ **GraphQL** - Apollo Server with type-safe resolvers
- ✅ **Authentication** - JWT, middleware, role-based access
- ✅ **API Templates** - REST and GraphQL endpoint generators

### Database & ORM
- ✅ **PostgreSQL** - Primary relational database
- ✅ **TypeORM** - Entity-based ORM with migrations
- ✅ **Prisma** - Modern ORM with excellent TypeScript support
- ✅ **MongoDB** - NoSQL with Mongoose ODM
- ✅ **Redis** - Caching and session store

### AI Agent System 🤖
- ✅ **Code Reviewer** - Automated code review with best practices
- ✅ **Test Generator** - Auto-generate unit, integration, E2E tests
- ✅ **Refactoring Assistant** - Intelligent refactoring suggestions
- ✅ **Feature Workflow** - End-to-end feature development automation
- ✅ **Documentation Generator** - Auto-generate docs from code

### Code Generation Templates
- ✅ **React Components** - Component + tests + stories
- ✅ **Custom Hooks** - Reusable hooks with tests
- ✅ **Next.js Pages** - Server/Client components
- ✅ **REST APIs** - Full CRUD endpoints with validation
- ✅ **GraphQL Resolvers** - Type-safe resolvers
- ✅ **Full CRUD Features** - Frontend + Backend + Tests in one command

### Automation & ML
- ✅ **n8n Workflows** - No-code automation platform
- ✅ **Python Workers** - Background tasks, ML inference
- ✅ **Scheduled Jobs** - Cron-based automation
- ✅ **Event-Driven** - Webhook and queue processing

### Deployment & DevOps
- ✅ **AWS Deployment** - EC2, ECS, Lambda, Elastic Beanstalk
- ✅ **Docker** - Multi-service orchestration
- ✅ **GitHub Actions** - CI/CD pipelines
- ✅ **Monitoring** - CloudWatch logs and metrics

### Testing
- ✅ **Jest** - Unit and integration tests
- ✅ **React Testing Library** - Component tests
- ✅ **Playwright** - E2E tests
- ✅ **Supertest** - API endpoint tests

### UI/UX Pro Max Kit 🎨
- ✅ **57 Design Styles** - Pre-designed style systems
- ✅ **95 Color Palettes** - Professional color schemes
- ✅ **56 Font Pairings** - Typography combinations
- ✅ **24 Chart Types** - Data visualization components
- ✅ **98 UX Guidelines** - Best practice patterns

## Credits
- UI/UX data and presets derived from UI UX Pro Max (MIT): https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

## 🚀 Quick Start

### Option 1: Lite Mode (Serverless - Recommended for Beginners)

**Cost: $0/month | Setup: 5 minutes**

```bash
# 1. Install dependencies
npm install

# 2. Run smart initializer
npm run init
# Choose: Lite Mode
# Select features you need

# 3. Start development
npm run dev:lite
# Opens http://localhost:3000

# 4. Deploy for free (when ready)
npm run deploy:vercel
```

**Windows Users:**
- Double-click `vibekit/scripts/INIT_PROJECT.bat` to initialize
- Double-click `vibekit/scripts/RUN_WEB.bat` to start coding

**📚 Lite Mode Guide:**
- [Serverless Deployment (Vercel + Supabase)](docs/serverless-deployment.md) - Deploy for $0
- [Kit Guide Web UI](http://localhost:3000/kit-guide) - Interactive documentation

---

### Option 2: Pro Mode (Docker - For Production)

**Cost: $20-50/month | Setup: 20 minutes**

```bash
# 1. Install dependencies
npm install

# 2. Run smart initializer
npm run init
# Choose: Pro Mode
# Select all features you need

# 3. Start with Docker (all services)
npm run dev:pro
# Starts: PostgreSQL, Redis, Next.js app
# OR
npm run dev:full
# Starts: All above + Python workers + n8n

# 4. Deploy to server
npm run deploy:docker
```

**📚 Pro Mode Guides:**
- [Lite to Pro Upgrade](docs/lite-to-pro-upgrade.md) - Migrate from serverless
- [Docker Setup](docs/quick-start.md) - Self-hosted deployment

---

### 🎯 What's the Difference?

| Feature | Lite Mode | Pro Mode |
|---------|-----------|----------|
| **Cost** | $0/month | $20-50/month |
| **Setup Time** | 5 minutes | 20 minutes |
| **Stack** | Next.js + Supabase | Docker + All Services |
| **Scale** | Auto (serverless) | Manual (VPS) |
| **Best For** | MVPs, Learning, Side Projects | Production, Teams, High Traffic |

**💡 Recommendation:**
- **Start Lite** → Deploy for free → Get users → **Upgrade to Pro** when needed

---

### 📖 Next Steps

1. **Initialize Project:** `npm run init` or double-click `vibekit/scripts/INIT_PROJECT.bat`
2. **Start Coding:** `npm run dev:lite` or double-click `vibekit/scripts/RUN_WEB.bat`
3. **Explore Kit Guide:** Open [http://localhost:3000/kit-guide](http://localhost:3000/kit-guide)
4. **Generate Features:** Use Prompt Generator & Plan Generator tools

**📖 Full Documentation:**
- [Quick Start Guide](docs/quick-start.md) - Detailed setup instructions
- [Serverless Deployment](docs/serverless-deployment.md) - Free hosting guide
- [Lite to Pro Upgrade](docs/lite-to-pro-upgrade.md) - Scaling guide

## 📁 Project Structure

```
.
├── .cursor/rules/              # AI coding rules & best practices
│   ├── frontend/               # React, Next.js, Tailwind
│   │   ├── react.md
│   │   ├── nextjs.md
│   │   └── tailwind.md
│   ├── backend.md              # Node.js, Express patterns
│   ├── api/                    # API design & GraphQL
│   │   └── graphql.md
│   ├── database/               # Database patterns
│   │   ├── database.md         # PostgreSQL + TypeORM
│   │   ├── mongodb.md          # MongoDB + Mongoose
│   │   └── prisma.md           # Prisma ORM
│   ├── deployment/             # Deployment guides
│   │   └── aws.md
│   ├── testing.md              # Testing strategies
│   ├── security.md             # Security best practices
│   └── uiuxpro.md              # UI/UX guidelines
│
├── .agent/                     # AI agent system
│   ├── config.json             # Agent configuration
│   ├── skills/                 # Specialized agent skills
│   │   ├── code-reviewer.md
│   │   ├── test-generator.md
│   │   └── refactoring.md
│   └── workflows/              # Automated workflows
│       └── feature-workflow.md
│
├── .vibecoder/                 # Vibecoder configuration
│   ├── config.json             # Main config
│   └── prompts/                # Prompt templates
│       └── code-generation.md
│
├── templates/                  # Code generation templates
│   ├── react/                  # React templates
│   │   ├── component/          # Component template
│   │   ├── hook/               # Custom hook template
│   │   └── page/               # Next.js page template
│   ├── api/                    # API templates
│   │   └── rest-endpoint/      # REST endpoint template
│   └── fullstack/              # Full-stack templates
│       └── crud-feature/       # Complete CRUD template
│
├── src/                        # Backend source code
│   ├── entities/               # Database models (TypeORM)
│   ├── services/               # Business logic
│   ├── controllers/            # Route handlers
│   ├── middleware/             # Express middleware
│   ├── routes/                 # API routes
│   └── config/                 # Configuration
│
├── app/                        # Frontend (Next.js App Router)
│   ├── api/                    # API routes
│   ├── components/             # React components
│   └── (routes)/               # Page routes
│
├── memory-bank/                # Project documentation
│   ├── project-brief.md        # Project overview
│   ├── tech-stack.md           # Technology choices
│   ├── architecture.md         # System architecture
│   ├── api-specs.md            # API documentation
│   ├── implementation-plan.md  # Development roadmap
│   ├── decisions.md            # Technical decisions
│   └── progress.md             # Current status
│
├── docs/                       # Additional documentation
│   ├── quick-start.md          # Quick start guide
│   └── n8n-workflow-sample.json # Sample n8n workflow
│
├── tests/                      # Test files
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
│
├── ui-ux-pro-max-skill-main/   # UI/UX design system
│   ├── styles/                 # 57 design styles
│   ├── palettes/               # 95 color palettes
│   ├── fonts/                  # 56 font pairings
│   ├── charts/                 # 24 chart types
│   └── guidelines/             # 98 UX patterns
│
└── services/
    └── python-worker/          # Python automation worker
```

## 🤖 Using AI Agent System

### Code Review
```bash
# Review current file
/review

# Review with auto-fix
/review --fix

# Security-focused review
/review --security

# Review entire PR
/review --pr
```

### Generate Code
```bash
# Generate React component
/generate component UserCard

# Generate API endpoint
/generate api products

# Generate full CRUD feature
/generate crud products

# Generate tests
/generate-tests
```

### Automated Workflows
```bash
# Run full feature development workflow
/workflow feature "Add user profile page"

# Workflow includes:
# - Requirements analysis
# - Implementation plan
# - Code generation
# - Test generation
# - Code review
# - Documentation
```

### Refactoring
```bash
# Get refactoring suggestions
/refactor

# Auto-apply safe refactorings
/refactor --auto

# Focus on performance
/refactor --performance
```

## 💻 Development

### Commands
```bash
# Development
npm run dev              # Start dev server
npm run worker           # Start background worker

# Building
npm run build            # Production build
npm start                # Start production server

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:watch       # Watch mode

# Code Quality
npm run lint             # ESLint
npm run format           # Prettier
npm run type-check       # TypeScript

# Database
npx prisma migrate dev   # Create & apply migration
npx prisma studio        # Open database GUI
npx prisma generate      # Generate Prisma client

# Python (if using)
black src/               # Format Python code
pylint src/              # Lint Python code
python -m pytest src/    # Run Python tests
```

### Environment Variables
```bash
# .env.local
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
JWT_SECRET="your-secret-key"
NODE_ENV="development"

# Optional
MONGODB_URI="mongodb://localhost:27017/db"
REDIS_URL="redis://localhost:6379"
AWS_REGION="us-east-1"
```

## 🚢 Deployment

### AWS Elastic Beanstalk (Easiest)
```bash
eb init
eb create production
eb deploy
```

### Docker + AWS ECS
```bash
docker build -t my-app .
docker push to ECR
# Deploy to ECS Fargate
```

### AWS Lambda (Serverless)
```bash
amplify init
amplify add hosting
amplify publish
```

**📖 Full guide**: See [.cursor/rules/deployment/aws.md](.cursor/rules/deployment/aws.md)

## 📚 Documentation

### Quick References
- **Quick Start**: [docs/quick-start.md](docs/quick-start.md)
- **Architecture**: [memory-bank/architecture.md](memory-bank/architecture.md)
- **API Specs**: [memory-bank/api-specs.md](memory-bank/api-specs.md)
- **Tech Stack**: [memory-bank/tech-stack.md](memory-bank/tech-stack.md)

### Development Guides
- **React**: [.cursor/rules/frontend/react.md](.cursor/rules/frontend/react.md)
- **Next.js**: [.cursor/rules/frontend/nextjs.md](.cursor/rules/frontend/nextjs.md)
- **Tailwind**: [.cursor/rules/frontend/tailwind.md](.cursor/rules/frontend/tailwind.md)
- **GraphQL**: [.cursor/rules/api/graphql.md](.cursor/rules/api/graphql.md)
- **MongoDB**: [.cursor/rules/database/mongodb.md](.cursor/rules/database/mongodb.md)
- **Prisma**: [.cursor/rules/database/prisma.md](.cursor/rules/database/prisma.md)

### Agent & Templates
- **Agent Config**: [.agent/config.json](.agent/config.json)
- **Code Review**: [.agent/skills/code-reviewer.md](.agent/skills/code-reviewer.md)
- **Test Generator**: [.agent/skills/test-generator.md](.agent/skills/test-generator.md)
- **Templates**: [templates/](templates/)

## 🎨 UI/UX Pro Max Kit

Access **57 design styles**, **95 color palettes**, **56 font pairings**, and **98 UX patterns**:

```
ui-ux-pro-max-skill-main/
├── styles/          # Complete design styles
├── palettes/        # Color schemes
├── fonts/           # Typography pairings
├── charts/          # Data visualization
└── guidelines/      # UX best practices
```

**Usage**: Pick a style, palette, and font pairing. Document in your PRs.

## 🧪 Testing

### Unit Tests (Jest)
```typescript
// Component test
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

test('renders user name', () => {
  render(<UserCard user={mockUser} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### E2E Tests (Playwright)
```typescript
test('user can sign up', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

### API Tests (Supertest)
```typescript
import request from 'supertest';
import { app } from '../app';

test('GET /api/users returns users', async () => {
  const res = await request(app).get('/api/users');
  expect(res.status).toBe(200);
  expect(res.body.data).toBeInstanceOf(Array);
});
```

## 🔒 Security

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Rate Limiting** - Prevent abuse
- ✅ **CORS** - Configured allow-list
- ✅ **Helmet** - Security headers
- ✅ **Input Validation** - Zod schemas
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **XSS Protection** - Sanitized inputs
- ✅ **Secrets Management** - AWS Secrets Manager support

## 🛠️ Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Reset database
npx prisma migrate reset

# Check DATABASE_URL
echo $DATABASE_URL
```

### Port Already in Use
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
```

### TypeScript Errors
```bash
# Regenerate Prisma types
npx prisma generate

# Check TypeScript config
npm run type-check
```

### Docker Issues
```bash
# View logs
docker-compose logs

# Restart services
docker-compose restart

# Clean rebuild
docker-compose down -v
docker-compose up --build
```

**More help**: See `memory-bank/progress.md` for current status and blockers.

## 📦 Tech Stack

### Frontend
- React 18 + TypeScript
- Next.js 14 (App Router)
- Tailwind CSS
- React Query / SWR
- Zustand / Context API

### Backend
- Node.js 18+
- Express.js
- TypeScript
- Apollo Server (GraphQL)

### Database
- PostgreSQL (primary)
- MongoDB (alternative)
- Redis (caching)
- TypeORM / Prisma (ORM)

### Testing
- Jest
- React Testing Library
- Playwright
- Supertest

### DevOps
- Docker
- GitHub Actions
- AWS (EC2, ECS, Lambda)
- CloudWatch

### Automation
- n8n (workflows)
- Python (ML/data processing)

## 🤝 Contributing

This is a starter kit. Customize it for your needs:

1. Update branding and naming
2. Add/remove features based on requirements
3. Extend templates for your patterns
4. Configure agents for your workflow

## 📄 License

MIT License - Use freely for personal and commercial projects.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GraphQL](https://graphql.org/learn/)
- [AWS Documentation](https://docs.aws.amazon.com/)

---

**Ready to build?** 🚀

```bash
npm run dev
```

Then use Vibecoder commands like `/generate component` or `/workflow feature` to accelerate development!
