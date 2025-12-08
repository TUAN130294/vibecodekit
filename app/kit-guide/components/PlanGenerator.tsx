'use client';

import { useState } from 'react';

interface PlanOptions {
  projectName: string;
  scope: string;
  teamSize: string;
  timeline: string;
  techStack: string[];
}

export default function PlanGenerator() {
  const [options, setOptions] = useState<PlanOptions>({
    projectName: '',
    scope: '',
    teamSize: '2 developers',
    timeline: '1 month',
    techStack: ['React', 'Next.js', 'TypeScript', 'PostgreSQL'],
  });

  const [generatedPlan, setGeneratedPlan] = useState('');

  const toggleTech = (tech: string) => {
    setOptions({
      ...options,
      techStack: options.techStack.includes(tech)
        ? options.techStack.filter((t) => t !== tech)
        : [...options.techStack, tech],
    });
  };

  const generatePlan = () => {
    if (!options.projectName || !options.scope) {
      setGeneratedPlan('⚠️ Please fill in Project Name and Project Scope first.');
      return;
    }

    const hasBackend = options.techStack.some((t) => ['PostgreSQL', 'MongoDB', 'Prisma', 'GraphQL', 'Python'].includes(t));
    const hasFrontend = options.techStack.some((t) => ['React', 'Next.js', 'TypeScript'].includes(t));
    const hasAutomation = options.techStack.includes('n8n') || options.techStack.includes('Python');
    const hasAI = options.scope.toLowerCase().includes('bot') || options.scope.toLowerCase().includes('ai') || options.scope.toLowerCase().includes('chatbot');

    const phases: string[] = [];

    // Phase 1: Setup & Foundation
    phases.push(`## Phase 1: Setup & Foundation (Week 1)

### 1.1 Project Initialization
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up Git repository and branching strategy
- [ ] Configure ESLint, Prettier, and pre-commit hooks
- [ ] Set up project structure following kit patterns

### 1.2 Development Environment
- [ ] Install dependencies (npm install)
${hasBackend ? '- [ ] Set up PostgreSQL/MongoDB database' : ''}
- [ ] Create .env files from .env.example
- [ ] Set up Docker Compose for local development
${hasAutomation ? '- [ ] Configure n8n for automation workflows' : ''}

### 1.3 Core Configuration
- [ ] Configure Tailwind CSS
${options.techStack.includes('Prisma') ? '- [ ] Set up Prisma schema and migrations' : ''}
${options.techStack.includes('GraphQL') ? '- [ ] Set up Apollo Server and GraphQL schema' : ''}
- [ ] Implement authentication and authorization
- [ ] Set up error handling middleware

**Deliverables:**
- Working development environment
- Basic project structure
- Database schema (if applicable)
- Authentication system

**Time Estimate:** 5-7 days for ${options.teamSize}`);

    // Phase 2: Core Features
    if (hasFrontend) {
      phases.push(`## Phase 2: Core Features Implementation (Week 2-3)

### 2.1 Frontend Components
- [ ] Create shared UI components (Button, Card, Modal, Form inputs)
- [ ] Implement layout components (Header, Footer, Sidebar, Navigation)
- [ ] Set up routing and navigation structure
- [ ] Create responsive design with Tailwind CSS

### 2.2 Main Features
Based on your scope: "${options.scope}"

${options.scope.toLowerCase().includes('sop') ? `
SOP Management Features:
- [ ] SOP list view with filtering and search
- [ ] SOP detail view with phase tracking
- [ ] SOP create/edit forms with validation
- [ ] Deadline management and alerts
- [ ] Phase status tracking (Not Started, In Progress, Completed)
` : ''}

${options.scope.toLowerCase().includes('dashboard') || options.scope.toLowerCase().includes('bi') || options.scope.toLowerCase().includes('analytics') ? `
BI Dashboard Features:
- [ ] KPI cards with real-time data
- [ ] Revenue charts (line, bar, pie)
- [ ] Inventory alerts and notifications
- [ ] Date range filters and export functionality
- [ ] Real-time data updates
` : ''}

### 2.3 State Management
- [ ] Set up global state (Context API or Redux)
- [ ] Implement data fetching with React Query/SWR
- [ ] Create custom hooks for shared logic
- [ ] Implement optimistic updates

**Deliverables:**
- Reusable component library
- Core feature pages
- State management system
- Responsive UI

**Time Estimate:** 10-14 days for ${options.teamSize}`);
    }

    // Phase 3: Backend & Database
    if (hasBackend) {
      phases.push(`## Phase 3: Backend & Database (Week 2-3)

### 3.1 Database Models
${options.techStack.includes('Prisma') ? `
Using Prisma:
- [ ] Define Prisma schema models
- [ ] Create and run migrations
- [ ] Set up seed data for development
- [ ] Configure database indexes for performance
` : `
Using TypeORM/Mongoose:
- [ ] Define entity/schema models
- [ ] Create migrations
- [ ] Set up database connections
- [ ] Configure relationships and indexes
`}

### 3.2 API Endpoints
${options.techStack.includes('GraphQL') ? `
GraphQL API:
- [ ] Define GraphQL schema (types, queries, mutations)
- [ ] Implement resolvers with DataLoader
- [ ] Add authentication middleware
- [ ] Implement subscriptions (if needed)
` : `
REST API:
- [ ] Implement CRUD endpoints
- [ ] Add request validation with Zod
- [ ] Implement error handling
- [ ] Add rate limiting and security middleware
`}

### 3.3 Business Logic
- [ ] Create service layer for business logic
- [ ] Implement data access layer (repositories)
- [ ] Add transaction support
- [ ] Create utility functions

**Deliverables:**
- Complete database schema
- Functional API endpoints
- Service layer implementation
- API documentation

**Time Estimate:** 10-14 days for ${options.teamSize}`);
    }

    // Phase 4: AI Features (if applicable)
    if (hasAI) {
      phases.push(`## Phase 4: AI Features Implementation (Week 3-4)

### 4.1 AI Chatbot Setup
⚠️ Follow .cursor/rules/ai-chatbot-rules.md for all AI code

- [ ] Use bot template from templates/protected-code/bot-template.ts
- [ ] Configure OpenAI API integration
- [ ] Implement system prompt (mark as 🔒 PROTECTED)
- [ ] Set up conversation state management

### 4.2 RAG Implementation
- [ ] Set up vector database (Pinecone/Chroma)
- [ ] Implement document embedding
- [ ] Create context builder with fallback (🔒 PROTECTED)
- [ ] Implement semantic search

### 4.3 Bot Features
${options.scope.toLowerCase().includes('summarization') ? '- [ ] Implement text summarization' : ''}
${options.scope.toLowerCase().includes('translation') ? '- [ ] Implement translation feature' : ''}
- [ ] Add retry logic for API failures (🔒 PROTECTED)
- [ ] Implement response validation (🔒 PROTECTED)
- [ ] Add token counting and cost control
- [ ] Create conversation history management

### 4.4 Testing & Safety
- [ ] Create comprehensive bot tests (100% coverage)
- [ ] Test fallback scenarios
- [ ] Test with no search results
- [ ] Validate anti-hallucination measures

**Deliverables:**
- Working AI chatbot with RAG
- Protected bot logic
- Comprehensive test suite
- Cost control measures

**Time Estimate:** 7-10 days for ${options.teamSize}

**⚠️ CRITICAL:** Mark all bot logic with 🔒 PROTECTED markers to prevent AI from breaking it later.`);
    }

    // Phase 5: Automation (if applicable)
    if (hasAutomation) {
      phases.push(`## Phase 5: Automation & Background Jobs (Week 3-4)

### 5.1 Python Workers
- [ ] Set up Python virtual environment
- [ ] Create worker scripts for background tasks
- [ ] Implement retry logic and error handling
- [ ] Add logging and monitoring

### 5.2 n8n Workflows
- [ ] Design automation workflows
- [ ] Set up triggers (schedule, webhook, manual)
- [ ] Implement data transformations
- [ ] Add error notifications

### 5.3 Scheduled Tasks
${options.scope.toLowerCase().includes('download') || options.scope.toLowerCase().includes('upload') ? `
- [ ] Auto-download from external sources
- [ ] Data parsing and validation
- [ ] Upload to database
- [ ] Send completion notifications
` : `
- [ ] Daily/hourly scheduled jobs
- [ ] Data synchronization
- [ ] Report generation
- [ ] Cleanup tasks
`}

**Deliverables:**
- Working automation scripts
- n8n workflows
- Scheduled jobs
- Error handling and monitoring

**Time Estimate:** 5-7 days for ${options.teamSize}`);
    }

    // Phase 6: Testing & Quality
    phases.push(`## Phase 6: Testing & Quality Assurance (Week 4)

### 6.1 Testing
- [ ] Write unit tests for components (React Testing Library)
- [ ] Write unit tests for services (Jest)
- [ ] Create API integration tests
${hasFrontend ? '- [ ] Write E2E tests with Playwright' : ''}
${hasAI ? '- [ ] Test all protected bot logic thoroughly' : ''}
- [ ] Achieve 80%+ code coverage

### 6.2 Code Quality
- [ ] Run ESLint and fix all issues
- [ ] Run Prettier to format code
- [ ] Review all 🔒 PROTECTED sections
- [ ] Code review with team

### 6.3 Security
- [ ] Security audit (OWASP top 10)
- [ ] Validate all user inputs
- [ ] Check for SQL injection vulnerabilities
- [ ] Review authentication/authorization

### 6.4 Performance
- [ ] Optimize database queries (add indexes)
- [ ] Implement caching with Redis
- [ ] Optimize frontend bundle size
- [ ] Load testing

**Deliverables:**
- Complete test suite
- Security audit report
- Performance optimization
- Bug fixes

**Time Estimate:** 5-7 days for ${options.teamSize}`);

    // Phase 7: Deployment
    phases.push(`## Phase 7: Deployment & Launch (Week 4-5)

### 7.1 Self-Hosted Setup
Since you mentioned using a 24/7 server:

- [ ] Set up Docker Compose on server
- [ ] Configure nginx reverse proxy
- [ ] Set up SSL certificates (Let's Encrypt)
- [ ] Configure environment variables

### 7.2 Database Setup
- [ ] Create production database
- [ ] Run migrations
- [ ] Set up automated backups (daily)
- [ ] Configure backup retention policy

### 7.3 Monitoring
- [ ] Set up application logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Create alerting for critical errors

### 7.4 Documentation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] User guide
- [ ] Admin guide
- [ ] Deployment runbook

**Deliverables:**
- Production deployment
- Monitoring and alerting
- Complete documentation
- Backup strategy

**Time Estimate:** 5-7 days for ${options.teamSize}

**Cost Savings:** Self-hosted on your server = $500-840/year saved vs cloud hosting!`);

    // Summary
    const totalWeeks = options.timeline.includes('1-2 weeks') ? 2 : options.timeline.includes('1 month') ? 4 : options.timeline.includes('2-3 months') ? 10 : 20;

    const summary = `# Implementation Plan: ${options.projectName}

## Project Overview

**Scope:** ${options.scope}

**Team:** ${options.teamSize}
**Timeline:** ${options.timeline} (${totalWeeks} weeks)
**Tech Stack:** ${options.techStack.join(', ')}

---

## Summary

This plan covers the complete implementation of "${options.projectName}" from setup to deployment.

**Key Features:**
${hasFrontend ? '✓ Modern frontend with React + Next.js\n' : ''}${hasBackend ? '✓ Robust backend with API and database\n' : ''}${hasAI ? '✓ AI features with protected code\n' : ''}${hasAutomation ? '✓ Automation and background jobs\n' : ''}✓ Self-hosted deployment for cost savings
✓ Comprehensive testing
✓ Production monitoring

**Timeline Breakdown:**
- Setup & Foundation: 1 week
- Core Features: ${hasFrontend && hasBackend ? '2-3 weeks' : '1-2 weeks'}
${hasAI ? '- AI Features: 1-2 weeks\n' : ''}${hasAutomation ? '- Automation: 1 week\n' : ''}- Testing & QA: 1 week
- Deployment: 1 week

**Total:** ${totalWeeks} weeks with ${options.teamSize}

---

${phases.join('\n\n---\n\n')}

---

## Risk Management

### Potential Risks:
1. **AI API Costs**: Monitor token usage daily
   - Mitigation: Implement token limits and cost alerts
2. **Scope Creep**: Stick to defined requirements
   - Mitigation: Use this plan as reference, reject out-of-scope requests
3. **Technical Debt**: Rushing code quality
   - Mitigation: Follow code reviews and don't skip tests
${hasAI ? '4. **AI Logic Changes**: AI assistant modifying protected code\n   - Mitigation: Use 🔒 PROTECTED markers and follow .cursor/rules/ai-chatbot-rules.md' : ''}

---

## Success Criteria

- [ ] All features from scope are implemented and working
- [ ] Test coverage above 80%
- [ ] Security audit passed
- [ ] Performance metrics met (page load < 2s, API response < 500ms)
${hasAI ? '- [ ] AI chatbot accuracy > 85%' : ''}
- [ ] Successfully deployed to production
- [ ] Documentation complete
- [ ] Team trained on maintenance

---

## Next Steps

1. **Review this plan** with your team
2. **Set up project** (Phase 1) following docs/quick-start.md
3. **Create tasks** in your project management tool
4. **Start coding** following the kit rules and templates
5. **Daily standups** to track progress
6. **Weekly demos** to stakeholders

**Resources:**
- Quick Start: docs/quick-start.md
- Protection Guide: docs/code-protection-guide.md
${hasAI ? '- AI Rules: .cursor/rules/ai-chatbot-rules.md\n' : ''}- Templates: templates/

**Cost Savings:**
Self-hosting saves **$500-840/year** compared to cloud hosting!

---

Generated by Universal Kit for Vibecoder
Built with ❤️ using Next.js`;

    setGeneratedPlan(summary);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPlan);
  };

  const downloadPlan = () => {
    const blob = new Blob([generatedPlan], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${options.projectName.toLowerCase().replace(/\s+/g, '-')}-implementation-plan.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
      <div className="space-y-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Project/Feature Name</label>
          <input
            type="text"
            value={options.projectName}
            onChange={(e) => setOptions({ ...options, projectName: e.target.value })}
            placeholder="e.g., SOP Management System"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        {/* Scope */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Project Scope</label>
          <textarea
            value={options.scope}
            onChange={(e) => setOptions({ ...options, scope: e.target.value })}
            rows={6}
            placeholder="Describe your project scope, features, and requirements..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
          />
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
            <select
              value={options.teamSize}
              onChange={(e) => setOptions({ ...options, teamSize: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none"
            >
              <option>1 developer</option>
              <option>2 developers</option>
              <option>3-5 developers</option>
              <option>6-10 developers</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Timeline</label>
            <select
              value={options.timeline}
              onChange={(e) => setOptions({ ...options, timeline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none"
            >
              <option>1-2 weeks</option>
              <option>1 month</option>
              <option>2-3 months</option>
              <option>3-6 months</option>
            </select>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tech Stack Preferences</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Prisma', 'GraphQL', 'Python', 'n8n'].map((tech) => (
              <label
                key={tech}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-purple-400 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={options.techStack.includes(tech)}
                  onChange={() => toggleTech(tech)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-sm font-medium text-gray-700">{tech}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePlan}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          Generate Implementation Plan 📋
        </button>

        {/* Generated Plan Preview */}
        {generatedPlan && (
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Implementation Plan</h3>
              <div className="flex gap-2">
                <button
                  onClick={downloadPlan}
                  className="px-3 py-1 bg-white hover:bg-gray-100 rounded-lg text-sm font-medium border transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-white hover:bg-gray-100 rounded-lg text-sm font-medium border transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="space-y-4 text-sm text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto bg-white rounded-lg p-4 font-mono leading-relaxed">
              {generatedPlan}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
