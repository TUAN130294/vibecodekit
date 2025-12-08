import { Metadata } from 'next';
import PromptGenerator from './components/PromptGenerator';
import PlanGenerator from './components/PlanGenerator';

export const metadata: Metadata = {
  title: 'Universal Kit - Guide & Tools',
  description: 'Explore features, customize, and generate prompts & plans',
};

export default function KitGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🚀</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Universal Kit</h1>
                <p className="text-sm text-gray-600">Full-Stack Development Toolkit</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#docs" className="text-gray-700 hover:text-blue-600 transition-colors">Docs</a>
              <a href="#prompt-gen" className="text-gray-700 hover:text-blue-600 transition-colors">Prompt Gen</a>
              <a href="#plan-gen" className="text-gray-700 hover:text-blue-600 transition-colors">Plan Gen</a>
              <a href="#customize" className="text-gray-700 hover:text-blue-600 transition-colors">Customize</a>
            </nav>

            <a
              href="https://github.com/TUAN130294/vibecodekit"
              target="_blank"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Phase 1: Core 80% - Complete</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Build Faster with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI-Powered </span>
              Development Kit
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Complete full-stack toolkit with React, Next.js, Node.js, AI features, automation, and self-hosted deployment.
              Save $500+/year and ship 10x faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#prompt-gen"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Generate Your First Prompt
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all border-2 border-gray-200"
              >
                Explore Features
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {[
                { label: 'Rules Files', value: '26+', icon: '📋' },
                { label: 'Templates', value: '10+', icon: '🎨' },
                { label: 'Time Saved', value: '70%', icon: '⚡' },
                { label: 'Cost Saved', value: '$500+', icon: '💰' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Complete toolkit for modern web development</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '⚛️',
                title: 'Modern Frontend',
                description: 'React 18 + Next.js 14 + Tailwind CSS',
                features: ['Server Components', 'TypeScript', 'Responsive Design'],
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '🔧',
                title: 'Powerful Backend',
                description: 'Node.js + Express + GraphQL',
                features: ['REST & GraphQL APIs', 'Authentication', 'Rate Limiting'],
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: '🗄️',
                title: 'Multiple Databases',
                description: 'PostgreSQL, MongoDB, Redis',
                features: ['TypeORM & Prisma', 'Migrations', 'Caching'],
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: '🤖',
                title: 'AI Features',
                description: 'ChatGPT integration ready',
                features: ['Chatbot with RAG', 'Summarization', 'Translation'],
                color: 'from-orange-500 to-red-500',
              },
              {
                icon: '🔄',
                title: 'Automation',
                description: 'Python + n8n workflows',
                features: ['Background Jobs', 'Scheduled Tasks', 'Webhooks'],
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: '📊',
                title: 'BI Platform',
                description: 'Dashboards & analytics',
                features: ['Charts & Graphs', 'Real-time Data', 'Alerts'],
                color: 'from-indigo-500 to-purple-500',
              },
              {
                icon: '🛡️',
                title: 'Code Protection',
                description: 'Anti-hallucination rules',
                features: ['Protected Markers', 'Safe Refactoring', 'AI Guards'],
                color: 'from-red-500 to-pink-500',
              },
              {
                icon: '🐳',
                title: 'Self-Hosted',
                description: 'Docker all-in-one',
                features: ['Save $500+/year', 'Full Control', 'Auto Backups'],
                color: 'from-blue-500 to-indigo-500',
              },
              {
                icon: '🎨',
                title: 'UI/UX Pro Max',
                description: '57 styles, 95 palettes',
                features: ['Design Styles', 'Color Palettes', 'Typography'],
                color: 'from-pink-500 to-rose-500',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Browser */}
      <section id="docs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">📚 Documentation</h2>
            <p className="text-xl text-gray-600">Browse comprehensive guides and rules</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Quick Start', file: 'docs/quick-start.md', icon: '🚀', time: '5 min' },
                { title: 'React Rules', file: '.cursor/rules/frontend/react.md', icon: '⚛️', time: '10 min' },
                { title: 'Next.js Rules', file: '.cursor/rules/frontend/nextjs.md', icon: '▲', time: '10 min' },
                { title: 'Tailwind Rules', file: '.cursor/rules/frontend/tailwind.md', icon: '🎨', time: '10 min' },
                { title: 'GraphQL Guide', file: '.cursor/rules/api/graphql.md', icon: '🔷', time: '15 min' },
                { title: 'MongoDB Guide', file: '.cursor/rules/database/mongodb.md', icon: '🍃', time: '15 min' },
                { title: 'Prisma Guide', file: '.cursor/rules/database/prisma.md', icon: '💎', time: '15 min' },
                { title: 'AI Chatbot Rules', file: '.cursor/rules/ai-chatbot-rules.md', icon: '🤖', time: '20 min' },
                { title: 'Code Protection', file: '.cursor/rules/code-preservation.md', icon: '🛡️', time: '15 min' },
                { title: 'AWS Deployment', file: '.cursor/rules/deployment/aws.md', icon: '☁️', time: '20 min' },
                { title: 'Self-Hosted Guide', file: 'docs/quick-start.md#self-hosted', icon: '🏠', time: '10 min' },
                { title: 'Protection Guide', file: 'docs/code-protection-guide.md', icon: '🔒', time: '15 min' },
              ].map((doc) => (
                <a
                  key={doc.file}
                  href={`vscode://file/${doc.file}`}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{doc.icon}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{doc.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-500 font-mono">{doc.file}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Docs (quick view) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900">Docs nhanh ngay tại đây</h3>
              <p className="text-gray-600">Tóm tắt từ các file trong thư mục `docs/`</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚀</span>
                  <h4 className="text-xl font-semibold text-gray-900">Quick Start (docs/quick-start.md)</h4>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Clone/copy kit, tạo file `.env.local` từ `.env.example`.</li>
                  <li>Chạy `npm install` (Node) và thiết lập Python venv nếu cần.</li>
                  <li>Dev backend: `npm run dev`; Dev web guide: `npm run dev:web` → `http://localhost:3000/kit-guide`.</li>
                  <li>Docker full stack: `docker-compose up --build` (app, postgres, redis, n8n, python_worker).</li>
                  <li>Tests: `npm test`; Lint: `npm run lint`; Doctor: `npm run doctor`.</li>
                </ul>
              </div>

              <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🔒</span>
                  <h4 className="text-xl font-semibold text-gray-900">Code Protection (docs/code-protection-guide.md)</h4>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Đánh dấu vùng nhạy cảm bằng comment 🔒 PROTECTED; tránh refactor khi chưa được duyệt.</li>
                  <li>AI/bot phải đọc `.cursor/rules/code-preservation.md` trước khi chỉnh sửa.</li>
                  <li>Không thay đổi logic bot/AI, prompt, RAG fallback; luôn giữ validation & retry.</li>
                  <li>Refactor nguy hiểm: phải hỏi/duyệt trước; an toàn: thêm log, sửa typo, bổ sung test.</li>
                  <li>Trước khi merge: chạy lint/test; kiểm tra diff không đụng vùng protected.</li>
                </ul>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-sm text-gray-700 bg-gray-50">
              <p className="font-semibold mb-2">Gộp tài liệu:</p>
              <p>
                Trang này đã gộp chức năng Prompt & Plan; tài liệu chính được tóm tắt nhanh. Bạn vẫn có thể mở file gốc trong `docs/` khi cần chi tiết hoặc
                chạy lệnh <code className="px-1 py-0.5 bg-white border rounded">vscode://file/docs/quick-start.md</code> để mở trực tiếp. Nếu muốn gọn repo,
                bạn có thể bỏ `docs/prompt-web.html` (đã trùng chức năng) và dùng duy nhất trang `/kit-guide`.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Generator */}
      <section id="prompt-gen" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">✨ AI Prompt Generator</h2>
              <p className="text-xl text-gray-600">Generate perfect prompts for your features</p>
            </div>
            <PromptGenerator />
          </div>
        </div>
      </section>

      {/* Plan Generator */}
      <section id="plan-gen" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">📋 Implementation Plan Generator</h2>
              <p className="text-xl text-gray-600">Create detailed implementation roadmap</p>
            </div>
            <PlanGenerator />
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section id="customize" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">⚙️ Customize Your Kit</h2>
              <p className="text-xl text-gray-600">Configure to match your preferences</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Database Choice */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🗄️ Database</h3>
                <div className="space-y-3">
                  {['PostgreSQL + TypeORM', 'PostgreSQL + Prisma', 'MongoDB + Mongoose'].map((db) => (
                    <label key={db} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
                      <input type="radio" name="database" className="w-4 h-4 text-blue-600" defaultChecked={db.includes('Prisma')} />
                      <span className="text-sm font-medium text-gray-700">{db}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* API Style */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🔷 API Style</h3>
                <div className="space-y-3">
                  {['REST API', 'GraphQL', 'Both REST + GraphQL'].map((api) => (
                    <label key={api} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
                      <input type="radio" name="api" className="w-4 h-4 text-blue-600" defaultChecked={api === 'REST API'} />
                      <span className="text-sm font-medium text-gray-700">{api}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Deployment */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Deployment</h3>
                <div className="space-y-3">
                  {['Self-Hosted (Docker)', 'AWS Elastic Beanstalk', 'AWS ECS + Fargate', 'AWS Lambda'].map((deploy) => (
                    <label key={deploy} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
                      <input type="radio" name="deploy" className="w-4 h-4 text-blue-600" defaultChecked={deploy.includes('Docker')} />
                      <span className="text-sm font-medium text-gray-700">{deploy}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">✨ Features</h3>
                <div className="space-y-3">
                  {['AI Chatbot', 'Automation (n8n)', 'BI Dashboard', 'Code Protection'].map((feature) => (
                    <label key={feature} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Save Configuration & Download Kit
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build? 🚀</h2>
            <p className="text-xl mb-8 opacity-90">Get started in minutes with these commands</p>

            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 text-left">
              <div className="space-y-4 font-mono text-sm">
                {[
                  { cmd: 'npm install', desc: 'Install dependencies' },
                  { cmd: 'docker-compose up -d', desc: 'Start services' },
                  { cmd: 'npm run dev', desc: 'Start development' },
                  { cmd: '/generate crud products', desc: 'Generate CRUD feature' },
                  { cmd: '/review --security', desc: 'Review code' },
                ].map(({ cmd, desc }) => (
                  <div key={cmd} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-green-400">$</span>
                      <code className="text-white">{cmd}</code>
                    </div>
                    <span className="text-blue-200 text-xs hidden md:block"># {desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="docs/quick-start.md" className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all">
                View Full Guide
              </a>
              <a href="#prompt-gen" className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all">
                Generate First Prompt
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Universal Kit</h3>
              <p className="text-gray-400 text-sm">Full-stack development toolkit for modern web apps</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="docs/quick-start.md" className="hover:text-white transition-colors">Quick Start</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#prompt-gen" className="hover:text-white transition-colors">Prompt Generator</a></li>
                <li><a href="#plan-gen" className="hover:text-white transition-colors">Plan Generator</a></li>
                <li><a href="#customize" className="hover:text-white transition-colors">Customization</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://github.com/your-repo" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Issues</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discussions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>Universal Kit for Vibecoder - Open Source • Built with ❤️ using Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
