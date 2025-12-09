type TocItem = {
  id: string;
  depth: number;
  text: string;
};

export function Toc({ headings }: { headings: TocItem[] }) {
  const filtered = headings.filter(h => h.depth === 2 || h.depth === 3);
  if (!filtered.length) return null;

  return (
    <div className="sticky top-28 rounded-2xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-6 shadow-lg shadow-blue-500/5">
      {/* Header with gradient accent */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          On this page
        </span>
      </div>

      {/* Navigation links */}
      <nav>
        <ul className="space-y-1 text-sm">
          {filtered.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`
                  block rounded-lg px-3 py-2 transition-all duration-200
                  hover:bg-primary-50 hover:text-primary-700 hover:translate-x-1
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200
                  ${item.depth === 3
                    ? 'pl-6 text-slate-500 text-[13px] border-l-2 border-slate-200 ml-2 hover:border-primary-300'
                    : 'text-slate-700 font-medium'
                  }
                `}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

