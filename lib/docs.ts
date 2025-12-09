import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface DocContent {
  slug: string;
  title: string;
  description?: string;
  content: string;
  headings: Array<{ id: string; depth: number; text: string }>;
}

const docsRoot = path.join(process.cwd(), 'vibekit', 'docs');
const memoryBankRoot = path.join(process.cwd(), 'vibekit', 'memory-bank');

function normalizeSlug(slug: string | string[] | undefined): string {
  if (!slug || (Array.isArray(slug) && slug.length === 0)) return 'quick-start';
  return Array.isArray(slug) ? slug.join('/') : slug;
}

function resolvePath(slug: string) {
  const normalized = slug.endsWith('.md') ? slug : `${slug}.md`;

  // 1) absolute path
  const absolute = path.isAbsolute(slug) ? slug : path.join(process.cwd(), normalized);
  if (fs.existsSync(absolute)) return absolute;

  // 2) search known roots
  const roots = [docsRoot, memoryBankRoot];
  for (const root of roots) {
    const candidate = path.join(root, normalized);
    if (fs.existsSync(candidate)) return candidate;
  }

  // 3) fallback to docsRoot even if missing (for notFound)
  return path.join(docsRoot, normalized);
}

function extractHeadings(markdown: string) {
  const lines = markdown.split('\n');
  const headings: Array<{ id: string; depth: number; text: string }> = [];
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    headings.push({ id, depth, text });
  }
  return headings;
}

export function loadDoc(slugInput: string | string[] | undefined): DocContent | null {
  const slug = normalizeSlug(slugInput);
  const filePath = resolvePath(slug);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);
  const title =
    (parsed.data.title as string | undefined) ||
    slug
      .split('/')
      .pop()
      ?.replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase()) ||
    'Documentation';

  const headings = extractHeadings(parsed.content);

  return {
    slug,
    title,
    description: parsed.data.description as string | undefined,
    content: parsed.content,
    headings
  };
}

