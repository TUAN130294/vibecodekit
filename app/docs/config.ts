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
    title: 'Getting Started',
    items: [
      { title: 'Introduction', slug: 'quick-start' },
      { title: 'Setup New Project', slug: 'setup-new-project' }
    ]
  },
  {
    title: 'The Vibe Architecture',
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
    title: 'Reference',
    items: [
      { title: 'Agents Configuration', slug: 'AGENTS' },
      { title: 'CLI & Scripts', slug: 'cli-tools' }
    ]
  },
  {
    title: 'Why VibeCodeKit',
    items: [{ title: 'Why VibeCodeKit?', slug: 'why-vibecodekit' }]
  }
];

