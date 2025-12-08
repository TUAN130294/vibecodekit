'use client';

import { useState } from 'react';

interface PromptOptions {
  featureType: string;
  featureName: string;
  description: string;
  includeTests: boolean;
  typeScriptStrict: boolean;
  accessibility: boolean;
  documentation: boolean;
}

export default function PromptGenerator() {
  const [options, setOptions] = useState<PromptOptions>({
    featureType: '',
    featureName: '',
    description: '',
    includeTests: false,
    typeScriptStrict: false,
    accessibility: false,
    documentation: false,
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const generatePrompt = () => {
    if (!options.featureType || !options.featureName || !options.description) {
      setGeneratedPrompt('⚠️ Please fill in Feature Type, Feature Name, and Description first.');
      return;
    }

    const templates: Record<string, string> = {
      component: `Create a React component named "${options.featureName}" with the following requirements:

${options.description}

Technical Requirements:
- Use TypeScript with proper type definitions
- Implement as a functional component with hooks
- Use Tailwind CSS for styling
- Follow the pattern from templates/react/component/Component.tsx
${options.typeScriptStrict ? '- Use TypeScript strict mode with all safety checks' : ''}
${options.accessibility ? '- Implement WCAG 2.1 AA accessibility standards (ARIA labels, keyboard navigation, focus management)' : ''}
${options.includeTests ? '- Create comprehensive unit tests with React Testing Library' : ''}
${options.documentation ? '- Include JSDoc comments and usage examples' : ''}

File Structure:
- Component: src/components/${options.featureName}/${options.featureName}.tsx
- Types: src/components/${options.featureName}/types.ts
${options.includeTests ? `- Tests: src/components/${options.featureName}/${options.featureName}.test.tsx` : ''}

Follow the React rules in .cursor/rules/frontend/react.md`,

      page: `Create a Next.js page for "${options.featureName}" with the following requirements:

${options.description}

Technical Requirements:
- Use Next.js 14 App Router
- Implement as Server Component (use 'use client' only if needed)
- Include proper metadata for SEO
- Use Tailwind CSS for styling
- Follow patterns from .cursor/rules/frontend/nextjs.md
${options.typeScriptStrict ? '- Use TypeScript strict mode' : ''}
${options.accessibility ? '- Implement accessibility best practices (semantic HTML, ARIA, keyboard navigation)' : ''}
${options.includeTests ? '- Create integration tests with Playwright' : ''}
${options.documentation ? '- Add comprehensive documentation and usage notes' : ''}

File Structure:
- Page: app/${options.featureName.toLowerCase().replace(/\s+/g, '-')}/page.tsx
- Components: app/${options.featureName.toLowerCase().replace(/\s+/g, '-')}/components/
${options.includeTests ? `- Tests: tests/e2e/${options.featureName.toLowerCase().replace(/\s+/g, '-')}.spec.ts` : ''}

Generate metadata, implement data fetching if needed, and follow Next.js best practices.`,

      api: `Create a REST API endpoint for "${options.featureName}" with the following requirements:

${options.description}

Technical Requirements:
- Implement full CRUD operations (GET, POST, PUT, DELETE)
- Use Zod for request validation
- Include proper error handling and status codes
- Follow patterns from templates/api/rest-endpoint/route.ts
- Use envelope response format: { success: boolean, data?: any, error?: { code: string, message: string } }
${options.typeScriptStrict ? '- Use TypeScript strict mode with all type safety' : ''}
${options.includeTests ? '- Create API integration tests with Jest/Supertest' : ''}
${options.documentation ? '- Add OpenAPI/Swagger documentation' : ''}

File Structure:
- API Route: app/api/${options.featureName.toLowerCase().replace(/\s+/g, '-')}/route.ts
- Validation: app/api/${options.featureName.toLowerCase().replace(/\s+/g, '-')}/validation.ts
- Service: src/services/${options.featureName.toLowerCase().replace(/\s+/g, '-')}.service.ts
${options.includeTests ? `- Tests: tests/api/${options.featureName.toLowerCase().replace(/\s+/g, '-')}.test.ts` : ''}

Include rate limiting, authentication middleware, and follow security best practices.`,

      graphql: `Create GraphQL resolvers for "${options.featureName}" with the following requirements:

${options.description}

Technical Requirements:
- Define GraphQL schema (types, queries, mutations)
- Implement resolvers with proper context/auth
- Use DataLoader to prevent N+1 queries
- Follow patterns from .cursor/rules/api/graphql.md
${options.typeScriptStrict ? '- Use TypeScript strict mode with generated types' : ''}
${options.includeTests ? '- Create resolver tests with Apollo Testing Library' : ''}
${options.documentation ? '- Add GraphQL schema documentation' : ''}

File Structure:
- Schema: src/graphql/schema/${options.featureName.toLowerCase()}.graphql
- Resolvers: src/graphql/resolvers/${options.featureName.toLowerCase()}.ts
- Types: src/graphql/types/${options.featureName.toLowerCase()}.ts
${options.includeTests ? `- Tests: tests/graphql/${options.featureName.toLowerCase()}.test.ts` : ''}

Implement proper error handling, authentication, and authorization.`,

      crud: `Create a complete CRUD feature for "${options.featureName}" with the following requirements:

${options.description}

Technical Requirements:
- Backend: Database model, service layer, API endpoints
- Frontend: List view, detail view, create/edit forms, delete confirmation
- Use Prisma for database ORM
- Follow patterns from templates/fullstack/crud-feature/
${options.typeScriptStrict ? '- Use TypeScript strict mode throughout' : ''}
${options.accessibility ? '- Implement full accessibility (keyboard nav, screen readers, focus management)' : ''}
${options.includeTests ? '- Create full test suite (unit, integration, E2E)' : ''}
${options.documentation ? '- Add complete documentation for API and components' : ''}

File Structure:
Backend:
- Model: prisma/schema.prisma (add ${options.featureName} model)
- Service: src/services/${options.featureName.toLowerCase()}.service.ts
- API: app/api/${options.featureName.toLowerCase()}/route.ts

Frontend:
- List: app/${options.featureName.toLowerCase()}/page.tsx
- Detail: app/${options.featureName.toLowerCase()}/[id]/page.tsx
- Form: app/${options.featureName.toLowerCase()}/components/Form.tsx
${options.includeTests ? `
Tests:
- API tests: tests/api/${options.featureName.toLowerCase()}.test.ts
- Component tests: tests/components/${options.featureName.toLowerCase()}.test.tsx
- E2E tests: tests/e2e/${options.featureName.toLowerCase()}.spec.ts` : ''}

Include validation, error handling, loading states, and optimistic updates.`,

      bot: `Create an AI chatbot for "${options.featureName}" with the following requirements:

${options.description}

⚠️ IMPORTANT: This is PROTECTED CODE. Follow .cursor/rules/ai-chatbot-rules.md

Technical Requirements:
- Use the bot template from templates/protected-code/bot-template.ts
- Implement RAG (Retrieval-Augmented Generation) with vector search
- Include system prompt, context building, and response validation
- Add retry logic for API failures and fallback handling
- Implement token counting and cost control
${options.includeTests ? '- Create comprehensive tests (100% coverage for bot logic)' : ''}
${options.documentation ? '- Document prompt versions and A/B testing approach' : ''}

File Structure:
- Bot Class: src/bot/${options.featureName.toLowerCase()}-bot.ts
- System Prompt: src/bot/prompts/${options.featureName.toLowerCase()}.ts
- RAG Context: src/bot/context/${options.featureName.toLowerCase()}.ts
- API Route: app/api/chat/${options.featureName.toLowerCase()}/route.ts
${options.includeTests ? `- Tests: tests/bot/${options.featureName.toLowerCase()}.test.ts` : ''}

🔒 CRITICAL SECTIONS TO PROTECT:
1. System prompt (mark as PROTECTED)
2. RAG context builder with fallback
3. Retry logic and error handling
4. Response validation (anti-hallucination)

Follow all patterns from .cursor/rules/ai-chatbot-rules.md`,

      automation: `Create an automation script for "${options.featureName}" with the following requirements:

${options.description}

Technical Requirements:
- Implement as Python script for background execution
- Use schedule library for cron-like scheduling
- Include error handling, retries, and logging
- Store results in database
${options.includeTests ? '- Create tests with pytest' : ''}
${options.documentation ? '- Add usage documentation and scheduling guide' : ''}

File Structure:
- Script: src/automation/${options.featureName.toLowerCase().replace(/\s+/g, '_')}.py
- Config: src/automation/config/${options.featureName.toLowerCase().replace(/\s+/g, '_')}.yaml
- Database: Update Prisma schema for result storage
${options.includeTests ? `- Tests: tests/automation/test_${options.featureName.toLowerCase().replace(/\s+/g, '_')}.py` : ''}

🔒 PROTECTED LOGIC:
- Mark critical sections with # 🔒 PROTECTED comments
- Include retry logic with exponential backoff
- Never skip error handling or logging

Include dry-run mode, progress tracking, and notification on completion/failure.`,

      dashboard: `Create a BI dashboard for "${options.featureName}" with the following requirements:

${options.description}

Technical Requirements:
- Use Chart.js or Recharts for visualizations
- Implement real-time data updates with polling/websockets
- Include filters, date range selection, and export functionality
- Follow responsive design patterns
${options.typeScriptStrict ? '- Use TypeScript strict mode' : ''}
${options.accessibility ? '- Make charts accessible (ARIA labels, data tables alternative)' : ''}
${options.includeTests ? '- Create component and integration tests' : ''}
${options.documentation ? '- Document data sources and chart specifications' : ''}

File Structure:
- Page: app/dashboard/${options.featureName.toLowerCase().replace(/\s+/g, '-')}/page.tsx
- Components:
  - Charts: app/dashboard/components/charts/
  - Filters: app/dashboard/components/filters/
  - KPICards: app/dashboard/components/KPICards.tsx
- API: app/api/dashboard/${options.featureName.toLowerCase()}/route.ts
- Queries: src/queries/${options.featureName.toLowerCase()}.ts
${options.includeTests ? `- Tests: tests/dashboard/${options.featureName.toLowerCase()}.test.tsx` : ''}

Include loading states, error boundaries, empty states, and data freshness indicators.`,
    };

    const prompt = templates[options.featureType] || 'Please select a feature type first.';
    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
      <div className="space-y-6">
        {/* Feature Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Feature Type</label>
          <select
            value={options.featureType}
            onChange={(e) => setOptions({ ...options, featureType: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          >
            <option value="">Select feature type...</option>
            <option value="component">React Component</option>
            <option value="page">Next.js Page</option>
            <option value="api">API Endpoint (REST)</option>
            <option value="graphql">GraphQL Resolver</option>
            <option value="crud">Full CRUD Feature</option>
            <option value="bot">AI Chatbot</option>
            <option value="automation">Automation Script</option>
            <option value="dashboard">BI Dashboard</option>
          </select>
        </div>

        {/* Feature Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Feature Name</label>
          <input
            type="text"
            value={options.featureName}
            onChange={(e) => setOptions({ ...options, featureName: e.target.value })}
            placeholder="e.g., User Profile Card, Product API, Revenue Dashboard"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={options.description}
            onChange={(e) => setOptions({ ...options, description: e.target.value })}
            rows={4}
            placeholder="Describe what you want to build... Include requirements, functionality, and any specific details."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
          />
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={options.includeTests}
              onChange={(e) => setOptions({ ...options, includeTests: e.target.checked })}
              className="w-5 h-5 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Include Tests</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={options.typeScriptStrict}
              onChange={(e) => setOptions({ ...options, typeScriptStrict: e.target.checked })}
              className="w-5 h-5 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">TypeScript Strict</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={options.accessibility}
              onChange={(e) => setOptions({ ...options, accessibility: e.target.checked })}
              className="w-5 h-5 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Accessibility (a11y)</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={options.documentation}
              onChange={(e) => setOptions({ ...options, documentation: e.target.checked })}
              className="w-5 h-5 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Documentation</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePrompt}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          Generate Prompt ✨
        </button>

        {/* Generated Prompt Preview */}
        {generatedPrompt && (
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Generated Prompt</h3>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                Copy
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
              {generatedPrompt}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
