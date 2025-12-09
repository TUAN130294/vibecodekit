import Link from 'next/link';
import '../globals.css';
import { docSections } from './config';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-10 pt-10 lg:px-8">
        <aside className="hidden w-64 shrink-0 lg:block">
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
                        className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/80 hover:text-white"
                      >
                        <div className="font-medium">{item.title}</div>
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
        </aside>
        <main className="flex-1 lg:max-w-5xl">{children}</main>
      </div>
    </div>
  );
}

