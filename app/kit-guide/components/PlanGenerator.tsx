'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';

interface PlanOptions {
  projectName: string;
  scope: string;
  teamSize: string;
  timeline: string;
  techStack: string[];
}

export default function PlanGenerator() {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const [options, setOptions] = useState<PlanOptions>({
    projectName: '',
    scope: '',
    teamSize: '2 developers',
    timeline: '1 month',
    techStack: ['React', 'Next.js', 'TypeScript', 'PostgreSQL'],
  });

  const [generatedPlan, setGeneratedPlan] = useState('');
  const [copied, setCopied] = useState(false);

  // Labels
  const labels = {
    projectName: isVi ? 'Tên Dự án/Tính năng' : 'Project/Feature Name',
    projectNamePlaceholder: isVi ? 'VD: Hệ thống Quản lý SOP' : 'e.g., SOP Management System',
    projectScope: isVi ? 'Phạm vi Dự án' : 'Project Scope',
    projectScopePlaceholder: isVi ? 'Mô tả phạm vi dự án, tính năng và yêu cầu của bạn...' : 'Describe your project scope, features, and requirements...',
    teamSize: isVi ? 'Quy mô Team' : 'Team Size',
    timeline: isVi ? 'Thời gian' : 'Timeline',
    techStack: isVi ? 'Công nghệ ưu tiên' : 'Tech Stack Preferences',
    generateBtn: isVi ? 'Tạo Kế hoạch Triển khai 📋' : 'Generate Implementation Plan 📋',
    generatedTitle: isVi ? 'Kế hoạch Triển khai' : 'Implementation Plan',
    download: isVi ? 'Tải xuống' : 'Download',
    copy: isVi ? 'Sao chép' : 'Copy',
    copied: isVi ? 'Đã sao chép!' : 'Copied!',
    fillRequired: isVi ? '⚠️ Vui lòng điền Tên dự án và Phạm vi trước.' : '⚠️ Please fill in Project Name and Project Scope first.',
  };

  const teamSizes = [
    { value: '1 developer', label: isVi ? '1 lập trình viên' : '1 developer' },
    { value: '2 developers', label: isVi ? '2 lập trình viên' : '2 developers' },
    { value: '3-5 developers', label: isVi ? '3-5 lập trình viên' : '3-5 developers' },
    { value: '6-10 developers', label: isVi ? '6-10 lập trình viên' : '6-10 developers' },
  ];

  const timelines = [
    { value: '1-2 weeks', label: isVi ? '1-2 tuần' : '1-2 weeks' },
    { value: '1 month', label: isVi ? '1 tháng' : '1 month' },
    { value: '2-3 months', label: isVi ? '2-3 tháng' : '2-3 months' },
    { value: '3-6 months', label: isVi ? '3-6 tháng' : '3-6 months' },
  ];

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
      setGeneratedPlan(labels.fillRequired);
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

    // Phase 5: Testing & Quality
    phases.push(`## Phase ${hasAI ? '5' : hasAutomation ? '5' : '4'}: Testing & Quality Assurance

### Testing
- [ ] Write unit tests for components (React Testing Library)
- [ ] Write unit tests for services (Jest)
- [ ] Create API integration tests
${hasFrontend ? '- [ ] Write E2E tests with Playwright' : ''}
${hasAI ? '- [ ] Test all protected bot logic thoroughly' : ''}
- [ ] Achieve 80%+ code coverage

### Code Quality
- [ ] Run ESLint and fix all issues
- [ ] Run Prettier to format code
- [ ] Review all 🔒 PROTECTED sections
- [ ] Code review with team

### Security
- [ ] Security audit (OWASP top 10)
- [ ] Validate all user inputs
- [ ] Check for SQL injection vulnerabilities
- [ ] Review authentication/authorization

### Performance
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

    // Phase 6: Deployment
    phases.push(`## Phase ${hasAI ? '6' : hasAutomation ? '6' : '5'}: Deployment & Launch

### Self-Hosted Setup
- [ ] Set up Docker Compose on server
- [ ] Configure nginx reverse proxy
- [ ] Set up SSL certificates (Let's Encrypt)
- [ ] Configure environment variables

### Database Setup
- [ ] Create production database
- [ ] Run migrations
- [ ] Set up automated backups (daily)
- [ ] Configure backup retention policy

### Monitoring
- [ ] Set up application logging
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Create alerting for critical errors

### Documentation
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

    const summary = `# ${isVi ? 'Kế hoạch Triển khai' : 'Implementation Plan'}: ${options.projectName}

## ${isVi ? 'Tổng quan Dự án' : 'Project Overview'}

**${isVi ? 'Phạm vi' : 'Scope'}:** ${options.scope}

**${isVi ? 'Team' : 'Team'}:** ${options.teamSize}
**${isVi ? 'Thời gian' : 'Timeline'}:** ${options.timeline} (${totalWeeks} ${isVi ? 'tuần' : 'weeks'})
**${isVi ? 'Công nghệ' : 'Tech Stack'}:** ${options.techStack.join(', ')}

---

## ${isVi ? 'Tóm tắt' : 'Summary'}

${isVi ? 'Kế hoạch này bao gồm toàn bộ việc triển khai' : 'This plan covers the complete implementation of'} "${options.projectName}" ${isVi ? 'từ setup đến deployment.' : 'from setup to deployment.'}

**${isVi ? 'Tính năng chính' : 'Key Features'}:**
${hasFrontend ? `✓ ${isVi ? 'Frontend hiện đại với React + Next.js' : 'Modern frontend with React + Next.js'}\n` : ''}${hasBackend ? `✓ ${isVi ? 'Backend mạnh mẽ với API và database' : 'Robust backend with API and database'}\n` : ''}${hasAI ? `✓ ${isVi ? 'Tính năng AI với code được bảo vệ' : 'AI features with protected code'}\n` : ''}${hasAutomation ? `✓ ${isVi ? 'Tự động hóa và background jobs' : 'Automation and background jobs'}\n` : ''}✓ ${isVi ? 'Triển khai self-hosted tiết kiệm chi phí' : 'Self-hosted deployment for cost savings'}
✓ ${isVi ? 'Testing toàn diện' : 'Comprehensive testing'}
✓ ${isVi ? 'Giám sát production' : 'Production monitoring'}

---

${phases.join('\n\n---\n\n')}

---

## ${isVi ? 'Các bước tiếp theo' : 'Next Steps'}

1. **${isVi ? 'Xem lại kế hoạch này' : 'Review this plan'}** ${isVi ? 'với team của bạn' : 'with your team'}
2. **${isVi ? 'Thiết lập dự án' : 'Set up project'}** (Phase 1) ${isVi ? 'theo' : 'following'} docs/quick-start.md
3. **${isVi ? 'Tạo tasks' : 'Create tasks'}** ${isVi ? 'trong công cụ quản lý dự án' : 'in your project management tool'}
4. **${isVi ? 'Bắt đầu code' : 'Start coding'}** ${isVi ? 'theo các rules và templates của kit' : 'following the kit rules and templates'}

**${isVi ? 'Tài nguyên' : 'Resources'}:**
- Quick Start: docs/quick-start.md
- Protection Guide: docs/code-protection-guide.md
${hasAI ? '- AI Rules: .cursor/rules/ai-chatbot-rules.md\n' : ''}- Templates: templates/

**${isVi ? 'Tiết kiệm Chi phí' : 'Cost Savings'}:**
${isVi ? 'Self-hosting tiết kiệm' : 'Self-hosting saves'} **$500-840/${isVi ? 'năm' : 'year'}** ${isVi ? 'so với cloud hosting!' : 'compared to cloud hosting!'}

---

${isVi ? 'Tạo bởi Universal Kit cho Vibecoder' : 'Generated by Universal Kit for Vibecoder'}
${isVi ? 'Xây dựng với ❤️ bằng Next.js' : 'Built with ❤️ using Next.js'}`;

    setGeneratedPlan(summary);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="space-y-6">
      {/* Project Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{labels.projectName}</label>
        <input
          type="text"
          value={options.projectName}
          onChange={(e) => setOptions({ ...options, projectName: e.target.value })}
          placeholder={labels.projectNamePlaceholder}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
        />
      </div>

      {/* Scope */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{labels.projectScope}</label>
        <textarea
          value={options.scope}
          onChange={(e) => setOptions({ ...options, scope: e.target.value })}
          rows={5}
          placeholder={labels.projectScopePlaceholder}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
        />
      </div>

      {/* Timeline */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{labels.teamSize}</label>
          <select
            value={options.teamSize}
            onChange={(e) => setOptions({ ...options, teamSize: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none bg-white"
          >
            {teamSizes.map((size) => (
              <option key={size.value} value={size.value}>{size.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{labels.timeline}</label>
          <select
            value={options.timeline}
            onChange={(e) => setOptions({ ...options, timeline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none bg-white"
          >
            {timelines.map((time) => (
              <option key={time.value} value={time.value}>{time.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{labels.techStack}</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Prisma', 'GraphQL', 'Python', 'n8n'].map((tech) => (
            <label
              key={tech}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-colors ${options.techStack.includes(tech)
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-gray-50 hover:border-purple-400'
                }`}
            >
              <input
                type="checkbox"
                checked={options.techStack.includes(tech)}
                onChange={() => toggleTech(tech)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="text-sm font-medium">{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePlan}
        className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
      >
        {labels.generateBtn}
      </button>

      {/* Generated Plan Preview */}
      {generatedPlan && (
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{labels.generatedTitle}</h3>
            <div className="flex gap-2">
              <button
                onClick={downloadPlan}
                className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg text-sm font-medium border transition-colors"
              >
                {labels.download}
              </button>
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-white hover:bg-gray-100 border'
                  }`}
              >
                {copied ? labels.copied : labels.copy}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto border leading-relaxed">
            {generatedPlan}
          </div>
        </div>
      )}
    </div>
  );
}
