import Link from 'next/link';
import '../globals.css';
import { docSections } from './config';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 text-slate-900 relative overflow-hidden">
      {/* Aurora background effect - matching landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-sm relative">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-xl font-bold text-white shadow-lg shadow-blue-500/20">
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
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            >
              ← Back to Guide
            </Link>
            <a
              href="https://github.com/TUAN130294/vibecodekit"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-300 focus-visible:ring-offset-white"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 lg:gap-10 px-4 pb-12 pt-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 relative">
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-slate-200/70">
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
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
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

        <main className="lg:col-span-1 flex justify-center">
          <div className="w-full max-w-4xl rounded-2xl border border-slate-200/80 bg-white/95 p-8 shadow-2xl shadow-slate-200/80">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

