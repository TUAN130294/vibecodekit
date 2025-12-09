import Link from 'next/link';
import '../globals.css';
import { docSections } from './config';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-xl font-bold text-white shadow-lg shadow-blue-500/25">
              ⚡
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">VibeCodeKit</p>
              <h1 className="text-xl font-bold text-white">Docs Hub</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/kit-guide"
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-blue-400/60 hover:text-blue-200"
            >
              ← Back to Guide
            </Link>
            <a
              href="https://github.com/TUAN130294/vibecodekit"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 pt-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[240px_minmax(0,1fr)_220px]">
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/30">
            <nav className="space-y-6">
              {docSections.map(section => (
                <div key={section.title} className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {section.title}
                  </div>
                  <ul className="space-y-2">
                    {section.items.map(item => (
                      <li key={item.slug}>
                        <Link
                          href={`/docs/${item.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-100 hover:bg-blue-500/10 hover:text-blue-200"
                        >
                          <div>{item.title}</div>
                          {item.description && (
                            <p className="text-xs text-slate-400">{item.description}</p>
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

        <main className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/30">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

