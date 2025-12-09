export type DocNavItem = {
  title: string;
  slug: string;
  description?: string;
};

export type DocSection = {
  title: string;
  items: DocNavItem[];
};

export const docSections: DocSection[] = [
  {
    title: 'Bắt đầu',
    items: [
      { title: 'Giới thiệu', slug: 'quick-start' },
      { title: 'Thiết lập dự án', slug: 'setup-new-project' }
    ]
  },
  {
    title: 'Kiến trúc Vibe',
    items: [
      { title: 'Memory Bank Workflow', slug: 'memory-bank-workflow' },
      { title: 'Next.js + Python Worker Bridge', slug: 'python-worker-automation' }
    ]
  },
  {
    title: 'Workflows',
    items: [
      { title: 'Feature Development', slug: 'memory-bank/implementation-plan' },
      { title: 'Code Protection', slug: 'code-protection-guide' },
      { title: 'Doctor & Rules', slug: 'doctor-and-rules' }
    ]
  },
  {
    title: 'Tham khảo',
    items: [
      { title: 'Agents Configuration', slug: 'AGENTS' },
      { title: 'CLI & Scripts', slug: 'cli-tools' }
    ]
  },
  {
    title: 'Vì sao VibeCodeKit',
    items: [{ title: 'Why VibeCodeKit?', slug: 'why-vibecodekit' }]
  }
];

