import { loadDoc } from '@/lib/docs';
import { notFound } from 'next/navigation';
import { Markdown } from '../components/Markdown';
import { Toc } from '../components/Toc';

export default function DocPage({ params }: { params: { slug?: string[] } }) {
  const doc = loadDoc(params.slug);
  if (!doc) return notFound();

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
      <article>
        <header className="mb-8 space-y-2">
          <p className="text-xs uppercase tracking-wide text-primary-300">VibeCodeKit Docs</p>
          <h1 className="text-3xl font-bold text-white">{doc.title}</h1>
          {doc.description && <p className="text-slate-300">{doc.description}</p>}
        </header>
        <Markdown content={doc.content} />
      </article>
      <aside className="hidden lg:block">
        <Toc headings={doc.headings} />
      </aside>
    </div>
  );
}

