'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface Translations {
    [key: string]: {
        vi: string;
        en: string;
    };
}

// All translations for the kit-guide page
export const translations: Translations = {
    // Header
    'header.title': {
        vi: 'Universal Kit',
        en: 'Universal Kit',
    },
    'header.subtitle': {
        vi: 'Bộ công cụ phát triển Full-Stack',
        en: 'Full-Stack Development Toolkit',
    },
    'header.github': {
        vi: 'Xem trên GitHub',
        en: 'View on GitHub',
    },
    // Nav
    'nav.features': {
        vi: 'Tính năng',
        en: 'Features',
    },
    'nav.docs': {
        vi: 'Tài liệu',
        en: 'Docs',
    },
    'nav.promptGen': {
        vi: 'Tạo Prompt',
        en: 'Prompt Gen',
    },
    'nav.planGen': {
        vi: 'Tạo Kế hoạch',
        en: 'Plan Gen',
    },
    'nav.customize': {
        vi: 'Tùy chỉnh',
        en: 'Customize',
    },
    // Hero
    'hero.badge': {
        vi: 'Phase 1: Core 80% - Hoàn thành',
        en: 'Phase 1: Core 80% - Complete',
    },
    'hero.title1': {
        vi: 'Phát triển nhanh hơn với',
        en: 'Build Faster with',
    },
    'hero.title2': {
        vi: 'AI-Powered',
        en: 'AI-Powered',
    },
    'hero.title3': {
        vi: 'Development Kit',
        en: 'Development Kit',
    },
    'hero.description': {
        vi: 'Bộ công cụ full-stack hoàn chỉnh với React, Next.js, Node.js, tính năng AI, tự động hóa và triển khai self-hosted.',
        en: 'Complete full-stack toolkit with React, Next.js, Node.js, AI features, automation, and self-hosted deployment.',
    },
    'hero.savings': {
        vi: 'Tiết kiệm $500+/năm và ship nhanh hơn 10x.',
        en: 'Save $500+/year and ship 10x faster.',
    },
    'hero.cta1': {
        vi: 'Tạo Prompt đầu tiên',
        en: 'Generate Your First Prompt',
    },
    'hero.cta2': {
        vi: 'Khám phá tính năng',
        en: 'Explore Features',
    },
    // Stats
    'stats.rulesFiles': {
        vi: 'File Rules',
        en: 'Rules Files',
    },
    'stats.templates': {
        vi: 'Templates',
        en: 'Templates',
    },
    'stats.timeSaved': {
        vi: 'Thời gian tiết kiệm',
        en: 'Time Saved',
    },
    'stats.costSaved': {
        vi: 'Chi phí tiết kiệm',
        en: 'Cost Saved',
    },
    // Features section
    'features.title': {
        vi: 'Mọi thứ bạn cần',
        en: 'Everything You Need',
    },
    'features.subtitle': {
        vi: 'Bộ công cụ hoàn chỉnh cho phát triển web hiện đại',
        en: 'Complete toolkit for modern web development',
    },
    // Feature items
    'feature.frontend.title': {
        vi: 'Frontend Hiện đại',
        en: 'Modern Frontend',
    },
    'feature.frontend.desc': {
        vi: 'React 18 + Next.js 14 + Tailwind CSS',
        en: 'React 18 + Next.js 14 + Tailwind CSS',
    },
    'feature.frontend.f1': {
        vi: 'Server Components',
        en: 'Server Components',
    },
    'feature.frontend.f2': {
        vi: 'TypeScript',
        en: 'TypeScript',
    },
    'feature.frontend.f3': {
        vi: 'Thiết kế Responsive',
        en: 'Responsive Design',
    },
    'feature.backend.title': {
        vi: 'Backend Mạnh mẽ',
        en: 'Powerful Backend',
    },
    'feature.backend.desc': {
        vi: 'Node.js + Express + GraphQL',
        en: 'Node.js + Express + GraphQL',
    },
    'feature.backend.f1': {
        vi: 'REST & GraphQL APIs',
        en: 'REST & GraphQL APIs',
    },
    'feature.backend.f2': {
        vi: 'Xác thực',
        en: 'Authentication',
    },
    'feature.backend.f3': {
        vi: 'Rate Limiting',
        en: 'Rate Limiting',
    },
    'feature.database.title': {
        vi: 'Đa Database',
        en: 'Multiple Databases',
    },
    'feature.database.desc': {
        vi: 'PostgreSQL, MongoDB, Redis',
        en: 'PostgreSQL, MongoDB, Redis',
    },
    'feature.database.f1': {
        vi: 'TypeORM & Prisma',
        en: 'TypeORM & Prisma',
    },
    'feature.database.f2': {
        vi: 'Migrations',
        en: 'Migrations',
    },
    'feature.database.f3': {
        vi: 'Caching',
        en: 'Caching',
    },
    'feature.ai.title': {
        vi: 'Tính năng AI',
        en: 'AI Features',
    },
    'feature.ai.desc': {
        vi: 'Tích hợp ChatGPT sẵn sàng',
        en: 'ChatGPT integration ready',
    },
    'feature.ai.f1': {
        vi: 'Chatbot với RAG',
        en: 'Chatbot with RAG',
    },
    'feature.ai.f2': {
        vi: 'Tóm tắt',
        en: 'Summarization',
    },
    'feature.ai.f3': {
        vi: 'Dịch thuật',
        en: 'Translation',
    },
    'feature.automation.title': {
        vi: 'Tự động hóa',
        en: 'Automation',
    },
    'feature.automation.desc': {
        vi: 'Python + n8n workflows',
        en: 'Python + n8n workflows',
    },
    'feature.automation.f1': {
        vi: 'Background Jobs',
        en: 'Background Jobs',
    },
    'feature.automation.f2': {
        vi: 'Scheduled Tasks',
        en: 'Scheduled Tasks',
    },
    'feature.automation.f3': {
        vi: 'Webhooks',
        en: 'Webhooks',
    },
    'feature.bi.title': {
        vi: 'Nền tảng BI',
        en: 'BI Platform',
    },
    'feature.bi.desc': {
        vi: 'Dashboards & phân tích',
        en: 'Dashboards & analytics',
    },
    'feature.bi.f1': {
        vi: 'Biểu đồ & Đồ thị',
        en: 'Charts & Graphs',
    },
    'feature.bi.f2': {
        vi: 'Dữ liệu Real-time',
        en: 'Real-time Data',
    },
    'feature.bi.f3': {
        vi: 'Cảnh báo',
        en: 'Alerts',
    },
    'feature.protection.title': {
        vi: 'Bảo vệ Code',
        en: 'Code Protection',
    },
    'feature.protection.desc': {
        vi: 'Quy tắc chống AI ảo giác',
        en: 'Anti-hallucination rules',
    },
    'feature.protection.f1': {
        vi: 'Protected Markers',
        en: 'Protected Markers',
    },
    'feature.protection.f2': {
        vi: 'Safe Refactoring',
        en: 'Safe Refactoring',
    },
    'feature.protection.f3': {
        vi: 'AI Guards',
        en: 'AI Guards',
    },
    'feature.selfhosted.title': {
        vi: 'Self-Hosted',
        en: 'Self-Hosted',
    },
    'feature.selfhosted.desc': {
        vi: 'Docker all-in-one',
        en: 'Docker all-in-one',
    },
    'feature.selfhosted.f1': {
        vi: 'Tiết kiệm $500+/năm',
        en: 'Save $500+/year',
    },
    'feature.selfhosted.f2': {
        vi: 'Toàn quyền kiểm soát',
        en: 'Full Control',
    },
    'feature.selfhosted.f3': {
        vi: 'Auto Backups',
        en: 'Auto Backups',
    },
    'feature.uiux.title': {
        vi: 'UI/UX Pro Max',
        en: 'UI/UX Pro Max',
    },
    'feature.uiux.desc': {
        vi: '57 styles, 95 palettes',
        en: '57 styles, 95 palettes',
    },
    'feature.uiux.f1': {
        vi: 'Design Styles',
        en: 'Design Styles',
    },
    'feature.uiux.f2': {
        vi: 'Bảng màu',
        en: 'Color Palettes',
    },
    'feature.uiux.f3': {
        vi: 'Typography',
        en: 'Typography',
    },
    // Docs section
    'docs.title': {
        vi: '📚 Tài liệu',
        en: '📚 Documentation',
    },
    'docs.subtitle': {
        vi: 'Duyệt hướng dẫn và quy tắc đầy đủ',
        en: 'Browse comprehensive guides and rules',
    },
    'docs.quickview': {
        vi: 'Xem nhanh tài liệu',
        en: 'Quick docs preview',
    },
    'docs.quickviewDesc': {
        vi: 'Tóm tắt từ các file trong thư mục docs/',
        en: 'Summary from files in docs/ folder',
    },
    // Prompt generator
    'prompt.title': {
        vi: '✨ Tạo AI Prompt',
        en: '✨ AI Prompt Generator',
    },
    'prompt.subtitle': {
        vi: 'Tạo prompt hoàn hảo cho tính năng của bạn',
        en: 'Generate perfect prompts for your features',
    },
    // Plan generator
    'plan.title': {
        vi: '📋 Tạo Kế hoạch Triển khai',
        en: '📋 Implementation Plan Generator',
    },
    'plan.subtitle': {
        vi: 'Tạo lộ trình triển khai chi tiết',
        en: 'Create detailed implementation roadmap',
    },
    // Customize section
    'customize.title': {
        vi: '⚙️ Tùy chỉnh Kit của bạn',
        en: '⚙️ Customize Your Kit',
    },
    'customize.subtitle': {
        vi: 'Cấu hình theo sở thích của bạn',
        en: 'Configure to match your preferences',
    },
    'customize.database': {
        vi: '🗄️ Database',
        en: '🗄️ Database',
    },
    'customize.api': {
        vi: '🔷 API Style',
        en: '🔷 API Style',
    },
    'customize.deployment': {
        vi: '🚀 Triển khai',
        en: '🚀 Deployment',
    },
    'customize.features': {
        vi: '✨ Tính năng',
        en: '✨ Features',
    },
    'customize.save': {
        vi: 'Lưu cấu hình & Tải Kit',
        en: 'Save Configuration & Download Kit',
    },
    // Quick actions
    'quickactions.title': {
        vi: 'Sẵn sàng Build? 🚀',
        en: 'Ready to Build? 🚀',
    },
    'quickactions.subtitle': {
        vi: 'Bắt đầu trong vài phút với các lệnh này',
        en: 'Get started in minutes with these commands',
    },
    'quickactions.viewGuide': {
        vi: 'Xem hướng dẫn đầy đủ',
        en: 'View Full Guide',
    },
    'quickactions.generatePrompt': {
        vi: 'Tạo Prompt đầu tiên',
        en: 'Generate First Prompt',
    },
    // Footer
    'footer.description': {
        vi: 'Bộ công cụ phát triển full-stack cho web apps hiện đại',
        en: 'Full-stack development toolkit for modern web apps',
    },
    'footer.resources': {
        vi: 'Tài nguyên',
        en: 'Resources',
    },
    'footer.tools': {
        vi: 'Công cụ',
        en: 'Tools',
    },
    'footer.connect': {
        vi: 'Kết nối',
        en: 'Connect',
    },
    'footer.copyright': {
        vi: 'Universal Kit cho Vibecoder - Mã nguồn mở • Xây dựng với ❤️ bằng Next.js',
        en: 'Universal Kit for Vibecoder - Open Source • Built with ❤️ using Next.js',
    },
    // Commands
    'cmd.install': {
        vi: 'Cài đặt dependencies',
        en: 'Install dependencies',
    },
    'cmd.start': {
        vi: 'Khởi động services',
        en: 'Start services',
    },
    'cmd.dev': {
        vi: 'Bắt đầu phát triển',
        en: 'Start development',
    },
    'cmd.generate': {
        vi: 'Tạo tính năng CRUD',
        en: 'Generate CRUD feature',
    },
    'cmd.review': {
        vi: 'Kiểm tra code',
        en: 'Review code',
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('vi');

    useEffect(() => {
        // Check localStorage or browser language
        const saved = localStorage.getItem('kit-language') as Language;
        if (saved && (saved === 'vi' || saved === 'en')) {
            setLanguage(saved);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('kit-language', lang);
    };

    const t = (key: string): string => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Missing translation for key: ${key}`);
            return key;
        }
        return translation[language];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}

// Language Toggle Component
export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <button
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${language === 'vi'
                        ? 'bg-white text-gray-900 shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                🇻🇳 VI
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${language === 'en'
                        ? 'bg-white text-gray-900 shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
            >
                🇺🇸 EN
            </button>
        </div>
    );
}
