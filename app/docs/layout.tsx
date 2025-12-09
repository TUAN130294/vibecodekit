import Link from 'next/link';
import '../globals.css';
import { docSections } from './config';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/40 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white shadow-lg shadow-blue-500/25">
              ⚡
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">VibeCodeKit</p>
              <h1 className="text-xl font-bold text-slate-900">Docs Hub</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/kit-guide"
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              ← Back to Guide
            </Link>
            <a
              href="https://github.com/TUAN130294/vibecodekit"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-12 pt-10 lg:px-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-lg shadow-slate-200/40">
            <nav className="space-y-6">
              {docSections.map(section => (
                <div key={section.title} className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {section.title}
                  </div>
                  <ul className="space-y-2">
                    {section.items.map(item => (
                      <li key={item.slug}>
                        <Link
                          href={`/docs/${item.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <div>{item.title}</div>
                          {item.description && (
                            <p className="text-xs text-slate-500">{item.description}</p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 lg:max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/50">
            {children}
          </div>
        </main>

        <div className="hidden w-64 shrink-0 lg:block" />
      </div>
    </div>
  );
}

