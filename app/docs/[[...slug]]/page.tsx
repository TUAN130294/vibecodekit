import { loadDoc } from '@/lib/docs';
import { notFound } from 'next/navigation';
import { Markdown } from '../components/Markdown';
import { DocSections } from '../components/DocSections';
import { Toc } from '../components/Toc';

export default function DocPage({ params }: { params: { slug?: string[] } }) {
  const doc = loadDoc(params.slug);
  if (!doc) return notFound();

  return (
    <div className="grid gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-[minmax(0,1fr)_280px]">
      <article className="space-y-8">
        {/* Enhanced header with gradient background */}
        <header className="space-y-3 rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white via-white to-blue-50/30 p-8 shadow-lg shadow-blue-500/5 relative overflow-hidden">
          {/* Decorative accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary-600 font-semibold bg-primary-50 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
              VibeCodeKit Docs
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{doc.title}</h1>
            {doc.description && <p className="text-slate-600 text-lg mt-2">{doc.description}</p>}
          </div>
        </header>

        {/* Content sections with card layout */}
        <DocSections content={doc.content} />
      </article>

      {/* TOC sidebar with better separation */}
      <aside className="hidden lg:block">
        <Toc headings={doc.headings} />
      </aside>
    </div>
  );
}

