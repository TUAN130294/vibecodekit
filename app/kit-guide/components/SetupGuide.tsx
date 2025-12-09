'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';

export default function SetupGuide() {
  const { language } = useLanguage();
  const [selectedUseCase, setSelectedUseCase] = useState<'starter' | 'existing'>('starter');

  const content = {
    vi: {
      title: '📂 Hướng Dẫn Cài Đặt & Sử Dụng',
      subtitle: 'Chọn cách phù hợp với dự án của bạn',
      useCase1Title: 'Use Case 1: Starter Template',
      useCase1Badge: 'Khuyến nghị',
      useCase1Desc: 'Bắt đầu dự án mới với VibeCodeKit',
      useCase2Title: 'Use Case 2: Thêm vào Project Có Sẵn',
      useCase2Badge: 'Advanced',
      useCase2Desc: 'Tích hợp VibeKit vào dự án hiện tại',

      starter: {
        title: '🚀 Sử Dụng Làm Starter Template',
        subtitle: 'Tốt nhất cho dự án mới',
        benefits: [
          'Cấu trúc sạch đẹp ngay từ đầu',
          'AI configs đã được setup sẵn',
          'Dễ dàng cho người mới bắt đầu',
          'Full-stack template hoàn chỉnh'
        ],
        steps: [
          {
            title: 'Bước 1: Clone Repository',
            code: 'git clone https://github.com/TUAN130294/vibecodekit.git my-new-project\ncd my-new-project'
          },
          {
            title: 'Bước 2: Cài Dependencies',
            code: 'npm install'
          },
          {
            title: 'Bước 3: Khởi Tạo Project',
            code: 'npm run init\n# Hoặc double-click: vibekit/scripts/INIT_PROJECT.bat (Windows)'
          },
          {
            title: 'Bước 4: Start Development',
            code: 'npm run dev:lite\n# Hoặc: vibekit/scripts/RUN_WEB.bat (Windows)'
          }
        ],
        structure: {
          title: 'Cấu Trúc Project:',
          items: [
            { path: 'my-new-project/', desc: 'Root project (code ở đây)' },
            { path: '├── app/', desc: 'Frontend code (Next.js)' },
            { path: '├── src/', desc: 'Backend code (Express)' },
            { path: '├── vibekit/', desc: 'Kit utilities (không động vào)' },
            { path: '│   ├── scripts/', desc: 'CLI tools' },
            { path: '│   ├── docs/', desc: 'Documentation' },
            { path: '│   └── templates/', desc: 'Code templates' },
            { path: '├── .cursor/', desc: 'AI configs' },
            { path: '└── package.json', desc: 'Project config' }
          ]
        }
      },

      existing: {
        title: '🔧 Thêm Vào Project Có Sẵn',
        subtitle: 'Cho người có kinh nghiệm',
        warning: '⚠️ Cần merge configs cẩn thận để tránh conflict',
        benefits: [
          'Giữ nguyên cấu trúc project cũ',
          'Chỉ lấy utilities cần thiết',
          'Linh hoạt tùy chỉnh',
          'Không phá vỡ code hiện tại'
        ],
        steps: [
          {
            title: 'Bước 1: Download VibeCodeKit',
            code: 'git clone https://github.com/TUAN130294/vibecodekit.git temp-vibekit'
          },
          {
            title: 'Bước 2: Copy vibekit/ Utilities',
            code: 'cp -r temp-vibekit/vibekit your-project/vibekit'
          },
          {
            title: 'Bước 3: Copy AI Configs (QUAN TRỌNG)',
            code: 'cp -r temp-vibekit/.cursor your-project/.cursor\ncp -r temp-vibekit/.agent your-project/.agent\ncp -r temp-vibekit/.claude your-project/.claude\ncp temp-vibekit/.cursorrules your-project/.cursorrules'
          },
          {
            title: 'Bước 4: Copy Configs (Nếu Chưa Có)',
            code: 'cp temp-vibekit/.vscode/settings.json your-project/.vscode/\ncp temp-vibekit/tailwind.config.cjs your-project/\n# Merge tsconfig.json, package.json nếu đã tồn tại'
          },
          {
            title: 'Bước 5: Cleanup',
            code: 'rm -rf temp-vibekit'
          }
        ],
        structure: {
          title: 'Cấu Trúc Sau Khi Thêm:',
          items: [
            { path: 'your-project/', desc: 'Project cũ của bạn' },
            { path: '├── src/', desc: 'Code cũ giữ nguyên' },
            { path: '├── vibekit/', desc: 'Kit utilities MỚI' },
            { path: '│   ├── scripts/', desc: 'CLI tools' },
            { path: '│   ├── docs/', desc: 'Documentation' },
            { path: '│   └── templates/', desc: 'Code templates' },
            { path: '├── .cursor/', desc: 'AI configs MỚI' },
            { path: '├── .agent/', desc: 'AI configs MỚI' },
            { path: '└── package.json', desc: 'Merge scripts' }
          ]
        }
      }
    },
    en: {
      title: '📂 Setup & Usage Guide',
      subtitle: 'Choose the right approach for your project',
      useCase1Title: 'Use Case 1: Starter Template',
      useCase1Badge: 'Recommended',
      useCase1Desc: 'Start a new project with VibeCodeKit',
      useCase2Title: 'Use Case 2: Add to Existing Project',
      useCase2Badge: 'Advanced',
      useCase2Desc: 'Integrate VibeKit into current project',

      starter: {
        title: '🚀 Use as Starter Template',
        subtitle: 'Best for new projects',
        benefits: [
          'Clean structure from the start',
          'AI configs pre-configured',
          'Easy for beginners',
          'Complete full-stack template'
        ],
        steps: [
          {
            title: 'Step 1: Clone Repository',
            code: 'git clone https://github.com/TUAN130294/vibecodekit.git my-new-project\ncd my-new-project'
          },
          {
            title: 'Step 2: Install Dependencies',
            code: 'npm install'
          },
          {
            title: 'Step 3: Initialize Project',
            code: 'npm run init\n# Or double-click: vibekit/scripts/INIT_PROJECT.bat (Windows)'
          },
          {
            title: 'Step 4: Start Development',
            code: 'npm run dev:lite\n# Or: vibekit/scripts/RUN_WEB.bat (Windows)'
          }
        ],
        structure: {
          title: 'Project Structure:',
          items: [
            { path: 'my-new-project/', desc: 'Project root (code here)' },
            { path: '├── app/', desc: 'Frontend code (Next.js)' },
            { path: '├── src/', desc: 'Backend code (Express)' },
            { path: '├── vibekit/', desc: 'Kit utilities (don\'t touch)' },
            { path: '│   ├── scripts/', desc: 'CLI tools' },
            { path: '│   ├── docs/', desc: 'Documentation' },
            { path: '│   └── templates/', desc: 'Code templates' },
            { path: '├── .cursor/', desc: 'AI configs' },
            { path: '└── package.json', desc: 'Project config' }
          ]
        }
      },

      existing: {
        title: '🔧 Add to Existing Project',
        subtitle: 'For experienced developers',
        warning: '⚠️ Carefully merge configs to avoid conflicts',
        benefits: [
          'Keep existing project structure',
          'Only take needed utilities',
          'Flexible customization',
          'Won\'t break current code'
        ],
        steps: [
          {
            title: 'Step 1: Download VibeCodeKit',
            code: 'git clone https://github.com/TUAN130294/vibecodekit.git temp-vibekit'
          },
          {
            title: 'Step 2: Copy vibekit/ Utilities',
            code: 'cp -r temp-vibekit/vibekit your-project/vibekit'
          },
          {
            title: 'Step 3: Copy AI Configs (IMPORTANT)',
            code: 'cp -r temp-vibekit/.cursor your-project/.cursor\ncp -r temp-vibekit/.agent your-project/.agent\ncp -r temp-vibekit/.claude your-project/.claude\ncp temp-vibekit/.cursorrules your-project/.cursorrules'
          },
          {
            title: 'Step 4: Copy Configs (If Not Exists)',
            code: 'cp temp-vibekit/.vscode/settings.json your-project/.vscode/\ncp temp-vibekit/tailwind.config.cjs your-project/\n# Merge tsconfig.json, package.json if exists'
          },
          {
            title: 'Step 5: Cleanup',
            code: 'rm -rf temp-vibekit'
          }
        ],
        structure: {
          title: 'Structure After Adding:',
          items: [
            { path: 'your-project/', desc: 'Your existing project' },
            { path: '├── src/', desc: 'Old code unchanged' },
            { path: '├── vibekit/', desc: 'NEW kit utilities' },
            { path: '│   ├── scripts/', desc: 'CLI tools' },
            { path: '│   ├── docs/', desc: 'Documentation' },
            { path: '│   └── templates/', desc: 'Code templates' },
            { path: '├── .cursor/', desc: 'NEW AI configs' },
            { path: '├── .agent/', desc: 'NEW AI configs' },
            { path: '└── package.json', desc: 'Merged scripts' }
          ]
        }
      }
    }
  };

  const t = content[language];
  const guide = selectedUseCase === 'starter' ? t.starter : t.existing;

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Use Case Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedUseCase('starter')}
            className={`flex-1 p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedUseCase === 'starter'
                ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{t.useCase1Title}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                {t.useCase1Badge}
              </span>
            </div>
            <p className="text-gray-600 text-left">{t.useCase1Desc}</p>
          </button>

          <button
            onClick={() => setSelectedUseCase('existing')}
            className={`flex-1 p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedUseCase === 'existing'
                ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{t.useCase2Title}</h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
                {t.useCase2Badge}
              </span>
            </div>
            <p className="text-gray-600 text-left">{t.useCase2Desc}</p>
          </button>
        </div>

        {/* Guide Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{guide.title}</h3>
          <p className="text-lg text-gray-600 mb-6">{guide.subtitle}</p>

          {selectedUseCase === 'existing' && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <p className="text-yellow-800 font-medium">{guide.warning}</p>
            </div>
          )}

          {/* Benefits */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">✨ {language === 'vi' ? 'Ưu điểm' : 'Benefits'}:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              📝 {language === 'vi' ? 'Các Bước Thực Hiện' : 'Steps'}:
            </h4>
            <div className="space-y-6">
              {guide.steps.map((step, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-6 py-2">
                  <h5 className="font-bold text-gray-900 mb-2">{step.title}</h5>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {step.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Structure */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">{guide.structure.title}</h4>
            <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm">
              {guide.structure.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 py-1">
                  <span className={`${item.path.includes('vibekit') || item.path.includes('.cursor') || item.path.includes('.agent') ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                    {item.path}
                  </span>
                  <span className="text-gray-500">← {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/docs"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            📚 {language === 'vi' ? 'Xem Tài Liệu Đầy Đủ' : 'View Full Documentation'}
          </a>
        </div>
      </div>
    </div>
  );
}
