'use client';

import { useState } from 'react';
import { LanguageProvider, LanguageToggle, useLanguage } from './components/LanguageProvider';
import PlanGenerator from './components/PlanGenerator';
import PromptGenerator from './components/PromptGenerator';

// Main content component that uses translations
function KitGuideContent() {
  const { t, language } = useLanguage();
  
  // State for customization options
  const [database, setDatabase] = useState('PostgreSQL + TypeORM');
  const [apiStyle, setApiStyle] = useState('REST API');
  const [deployment, setDeployment] = useState('Self-Hosted (Docker)');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['AI Chatbot', 'Automation (n8n)', 'BI Dashboard', 'Code Protection']);

  const stats = [
    { label: t('stats.rulesFiles'), value: '26+', icon: '📋', color: 'from-blue-500 to-blue-600' },
    { label: t('stats.templates'), value: '10+', icon: '🎨', color: 'from-purple-500 to-purple-600' },
    { label: t('stats.timeSaved'), value: '70%', icon: '⚡', color: 'from-emerald-500 to-emerald-600' },
    { label: t('stats.costSaved'), value: '$500+', icon: '💰', color: 'from-amber-500 to-amber-600' },
  ];

  const features = [
    {
      icon: '⚛️',
      title: t('feature.frontend.title'),
      description: t('feature.frontend.desc'),
      features: [t('feature.frontend.f1'), t('feature.frontend.f2'), t('feature.frontend.f3')],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🔧',
      title: t('feature.backend.title'),
      description: t('feature.backend.desc'),
      features: [t('feature.backend.f1'), t('feature.backend.f2'), t('feature.backend.f3')],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🗄️',
      title: t('feature.database.title'),
      description: t('feature.database.desc'),
      features: [t('feature.database.f1'), t('feature.database.f2'), t('feature.database.f3')],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🤖',
      title: t('feature.ai.title'),
      description: t('feature.ai.desc'),
      features: [t('feature.ai.f1'), t('feature.ai.f2'), t('feature.ai.f3')],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: '🔄',
      title: t('feature.automation.title'),
      description: t('feature.automation.desc'),
      features: [t('feature.automation.f1'), t('feature.automation.f2'), t('feature.automation.f3')],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '📊',
      title: t('feature.bi.title'),
      description: t('feature.bi.desc'),
      features: [t('feature.bi.f1'), t('feature.bi.f2'), t('feature.bi.f3')],
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: '🛡️',
      title: t('feature.protection.title'),
      description: t('feature.protection.desc'),
      features: [t('feature.protection.f1'), t('feature.protection.f2'), t('feature.protection.f3')],
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: '🐳',
      title: t('feature.selfhosted.title'),
      description: t('feature.selfhosted.desc'),
      features: [t('feature.selfhosted.f1'), t('feature.selfhosted.f2'), t('feature.selfhosted.f3')],
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: '🎨',
      title: t('feature.uiux.title'),
      description: t('feature.uiux.desc'),
      features: [t('feature.uiux.f1'), t('feature.uiux.f2'), t('feature.uiux.f3')],
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const docs = [
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
  ];

  const commands = [
    { cmd: 'npm install', desc: t('cmd.install') },
    { cmd: 'docker-compose up -d', desc: t('cmd.start') },
    { cmd: 'npm run dev', desc: t('cmd.dev') },
    { cmd: '/generate crud products', desc: t('cmd.generate') },
    { cmd: '/review --security', desc: t('cmd.review') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header - Glassmorphism Style */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
                <p className="text-sm text-gray-600 font-medium">{t('header.subtitle')}</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('nav.features')}</a>
              <a href="#docs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('nav.docs')}</a>
              <a href="#prompt-gen" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('nav.promptGen')}</a>
              <a href="#plan-gen" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('nav.planGen')}</a>
              <a href="#customize" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('nav.customize')}</a>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageToggle />
              <a
                href="https://github.com/TUAN130294/vibecodekit"
                target="_blank"
                className="hidden md:flex px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                {t('header.github')}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Aurora/Bento Style */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Aurora background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full mb-6 border border-blue-200/50 shadow-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold">{t('hero.badge')}</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.title1')}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> {t('hero.title2')} </span>
              <br className="hidden md:block" />
              {t('hero.title3')}
            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto font-medium leading-relaxed">
              {t('hero.description')}
            </p>
            <p className="text-lg text-blue-600 font-semibold mb-10">
              {t('hero.savings')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="#prompt-gen"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all"
              >
                {t('hero.cta1')}
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all border-2 border-gray-200 hover:border-blue-300"
              >
                {t('hero.cta2')}
              </a>
            </div>
          </div>

          {/* Stats - Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-lg text-center group hover:scale-105 transition-transform hover:shadow-xl">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-3 mx-auto shadow-md group-hover:shadow-lg transition-shadow group-hover:scale-110`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Bento Layout */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('features.title')}</h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">{t('features.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-lg hover:-translate-y-1 cursor-pointer group hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4 font-medium">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Browser - Bento Style */}
      <section id="docs" className="py-20 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('docs.title')}</h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">{t('docs.subtitle')}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.map((doc) => (
                <div
                  key={doc.file}
                  onClick={() => {
                    navigator.clipboard.writeText(doc.file);
                    alert(language === 'vi' ? `Đã copy: ${doc.file}` : `Copied: ${doc.file}`);
                  }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-lg hover:-translate-y-1 group hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{doc.icon}</span>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-semibold">{doc.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-500 font-mono truncate">{doc.file}</p>
                  <p className="text-xs text-blue-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'vi' ? '👆 Click để copy đường dẫn' : '👆 Click to copy path'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Docs (quick view) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {language === 'vi' ? '🎯 Bắt đầu trong 3 bước đơn giản' : '🎯 Get Started in 3 Simple Steps'}
              </h3>
              <p className="text-gray-600">
                {language === 'vi' ? 'Không cần kinh nghiệm - chỉ cần làm theo hướng dẫn!' : 'No experience needed - just follow the guide!'}
              </p>
            </div>

            {/* Step-by-step Visual Guide */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Step 1 */}
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 shadow-lg border-4 border-blue-500">
                  1
                </div>
                <div className="mt-4">
                  <div className="text-4xl mb-4">📥</div>
                  <h4 className="text-xl font-bold mb-2">
                    {language === 'vi' ? 'Tải & Cài đặt' : 'Download & Install'}
                  </h4>
                  <p className="text-blue-100 text-sm mb-4">
                    {language === 'vi'
                      ? 'Clone repo về máy, rồi chạy lệnh cài đặt'
                      : 'Clone the repo, then run install command'}
                  </p>
                  <div className="bg-white/20 rounded-lg p-3 font-mono text-sm">
                    <code>npm install</code>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/20">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-purple-600 shadow-lg border-4 border-purple-500">
                  2
                </div>
                <div className="mt-4">
                  <div className="text-4xl mb-4">⚡</div>
                  <h4 className="text-xl font-bold mb-2">
                    {language === 'vi' ? 'Chạy Web' : 'Run Web'}
                  </h4>
                  <p className="text-purple-100 text-sm mb-4">
                    {language === 'vi'
                      ? 'Double-click file RUN_WEB.bat hoặc chạy lệnh'
                      : 'Double-click RUN_WEB.bat or run command'}
                  </p>
                  <div className="bg-white/20 rounded-lg p-3 font-mono text-sm">
                    <code>npm run dev:web</code>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/20">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600 shadow-lg border-4 border-emerald-500">
                  3
                </div>
                <div className="mt-4">
                  <div className="text-4xl mb-4">🎉</div>
                  <h4 className="text-xl font-bold mb-2">
                    {language === 'vi' ? 'Bắt đầu Code!' : 'Start Coding!'}
                  </h4>
                  <p className="text-emerald-100 text-sm mb-4">
                    {language === 'vi'
                      ? 'Mở trình duyệt và bắt đầu tạo feature'
                      : 'Open browser and start creating features'}
                  </p>
                  <div className="bg-white/20 rounded-lg p-3 font-mono text-sm">
                    <code>localhost:3000</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Tips Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* For Beginners */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    🌟
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {language === 'vi' ? 'Dành cho Người mới' : 'For Beginners'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'vi' ? 'Bắt đầu từ đây!' : 'Start here!'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white rounded-xl p-3">
                    <span className="text-xl">📂</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {language === 'vi' ? 'File RUN_WEB.bat' : 'RUN_WEB.bat file'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'vi' ? 'Double-click để chạy web ngay' : 'Double-click to run web instantly'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-3">
                    <span className="text-xl">📖</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {language === 'vi' ? 'Thư mục docs/' : 'docs/ folder'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'vi' ? 'Đọc hướng dẫn chi tiết' : 'Read detailed guides'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-3">
                    <span className="text-xl">🎨</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {language === 'vi' ? 'Thư mục templates/' : 'templates/ folder'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'vi' ? 'Copy & paste các mẫu có sẵn' : 'Copy & paste ready templates'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    🛡️
                  </div>
                  <div>
                    <h4 className="font-bold">
                      {language === 'vi' ? 'Mẹo Bảo vệ Code' : 'Code Protection Tips'}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {language === 'vi' ? 'Giữ code an toàn với AI' : 'Keep code safe with AI'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <p className="text-sm">
                      {language === 'vi'
                        ? 'Đánh dấu code quan trọng với 🔒 PROTECTED'
                        : 'Mark important code with 🔒 PROTECTED'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <p className="text-sm">
                      {language === 'vi'
                        ? 'AI sẽ không sửa vùng code được bảo vệ'
                        : 'AI won\'t modify protected code areas'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <p className="text-sm">
                      {language === 'vi'
                        ? 'Chạy test trước khi merge: npm test'
                        : 'Run tests before merge: npm test'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Generator - Bento Card */}
      <section id="prompt-gen" className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('prompt.title')}</h2>
              <p className="text-lg md:text-xl text-gray-600 font-medium">{t('prompt.subtitle')}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
              <PromptGenerator />
            </div>
          </div>
        </div>
      </section>

      {/* Plan Generator - Bento Card */}
      <section id="plan-gen" className="py-20 bg-gradient-to-b from-blue-50/30 to-purple-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('plan.title')}</h2>
              <p className="text-lg md:text-xl text-gray-600 font-medium">{t('plan.subtitle')}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-xl">
              <PlanGenerator />
            </div>
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section id="customize" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('customize.title')}</h2>
              <p className="text-lg md:text-xl text-gray-600">{t('customize.subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Database Choice */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🗄️</span>
                  <h3 className="text-lg font-bold text-gray-900">{t('customize.database')}</h3>
                </div>
                <div className="space-y-3">
                  {['PostgreSQL + TypeORM', 'PostgreSQL + Prisma', 'MongoDB + Mongoose'].map((db) => (
                    <label key={db} className={`flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 cursor-pointer transition-colors ${
                      database === db ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
                    }`}>
                      <input 
                        type="radio" 
                        name="database" 
                        value={db}
                        checked={database === db}
                        onChange={(e) => setDatabase(e.target.value)}
                        className="w-4 h-4 text-blue-600" 
                      />
                      <span className="text-sm font-medium text-gray-700">{db}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* API Style */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💎</span>
                  <h3 className="text-lg font-bold text-gray-900">{t('customize.api')}</h3>
                </div>
                <div className="space-y-3">
                  {['REST API', 'GraphQL', 'Both REST + GraphQL'].map((api) => (
                    <label key={api} className={`flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 cursor-pointer transition-colors ${
                      apiStyle === api ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
                    }`}>
                      <input 
                        type="radio" 
                        name="api" 
                        value={api}
                        checked={apiStyle === api}
                        onChange={(e) => setApiStyle(e.target.value)}
                        className="w-4 h-4 text-blue-600" 
                      />
                      <span className="text-sm font-medium text-gray-700">{api}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Deployment */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🚀</span>
                  <h3 className="text-lg font-bold text-gray-900">{t('customize.deployment')}</h3>
                </div>
                <div className="space-y-3">
                  {['Self-Hosted (Docker)', 'AWS Elastic Beanstalk', 'AWS ECS + Fargate', 'AWS Lambda'].map((deploy) => (
                    <label key={deploy} className={`flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 cursor-pointer transition-colors ${
                      deployment === deploy ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
                    }`}>
                      <input 
                        type="radio" 
                        name="deploy" 
                        value={deploy}
                        checked={deployment === deploy}
                        onChange={(e) => setDeployment(e.target.value)}
                        className="w-4 h-4 text-blue-600" 
                      />
                      <span className="text-sm font-medium text-gray-700">{deploy}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">✨</span>
                  <h3 className="text-lg font-bold text-gray-900">{t('customize.features')}</h3>
                </div>
                <div className="space-y-3">
                  {['AI Chatbot', 'Automation (n8n)', 'BI Dashboard', 'Code Protection'].map((feature) => (
                    <label key={feature} className={`flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 cursor-pointer transition-colors ${
                      selectedFeatures.includes(feature) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
                    }`}>
                      <input 
                        type="checkbox" 
                        checked={selectedFeatures.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFeatures([...selectedFeatures, feature]);
                          } else {
                            setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                          }
                        }}
                        className="w-4 h-4 text-blue-600" 
                      />
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                const config = {
                  database,
                  apiStyle,
                  deployment,
                  features: selectedFeatures,
                  timestamp: new Date().toISOString(),
                };
                
                // Create and download config file
                const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'kit-config.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Show success message with next steps
                const message = language === 'vi' 
                  ? `✅ Đã lưu cấu hình!\n\nDatabase: ${database}\nAPI: ${apiStyle}\nDeployment: ${deployment}\nFeatures: ${selectedFeatures.join(', ')}\n\n📥 File kit-config.json đã được tải về.\n\n🚀 Bước tiếp theo:\n1. Đặt file kit-config.json vào thư mục gốc project\n2. Chạy lệnh: npm run init:from-config\n\nHoặc chạy interactive init:\nnpm run init`
                  : `✅ Configuration saved!\n\nDatabase: ${database}\nAPI: ${apiStyle}\nDeployment: ${deployment}\nFeatures: ${selectedFeatures.join(', ')}\n\n📥 kit-config.json file has been downloaded.\n\n🚀 Next steps:\n1. Place kit-config.json in project root\n2. Run: npm run init:from-config\n\nOr run interactive init:\nnpm run init`;
                
                alert(message);
              }}
              className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              {t('customize.save')}
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions - Gradient Bento */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('quickactions.title')}</h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 font-medium">{t('quickactions.subtitle')}</p>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-left border border-white/20 shadow-xl">
              <div className="space-y-4 font-mono text-sm">
                {commands.map(({ cmd, desc }) => (
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
              <a href="#docs" className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all hover:-translate-y-0.5">
                {t('quickactions.viewGuide')}
              </a>
              <a href="#prompt-gen" className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all hover:-translate-y-0.5">
                {t('quickactions.generatePrompt')}
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
              <h3 className="font-bold text-lg mb-4">{t('header.title')}</h3>
              <p className="text-gray-400 text-sm">{t('footer.description')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#docs" className="hover:text-white transition-colors">{t('nav.docs')}</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">{t('nav.features')}</a></li>
                <li><a href="docs/quick-start.md" className="hover:text-white transition-colors">Quick Start</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.tools')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#prompt-gen" className="hover:text-white transition-colors">{t('nav.promptGen')}</a></li>
                <li><a href="#plan-gen" className="hover:text-white transition-colors">{t('nav.planGen')}</a></li>
                <li><a href="#customize" className="hover:text-white transition-colors">{t('nav.customize')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.connect')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://github.com/TUAN130294/vibecodekit" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Issues</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discussions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Export the page wrapped with LanguageProvider
export default function KitGuidePage() {
  return (
    <LanguageProvider>
      <KitGuideContent />
    </LanguageProvider>
  );
}
