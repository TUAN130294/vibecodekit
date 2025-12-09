type TocItem = {
  id: string;
  depth: number;
  text: string;
};

export function Toc({ headings }: { headings: TocItem[] }) {
  const filtered = headings.filter(h => h.depth === 2 || h.depth === 3);
  if (!filtered.length) return null;

  return (
    <div className="sticky top-10 rounded-lg border border-white/5 bg-slate-900/50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        On this page
      </div>
      <ul className="mt-3 space-y-2 text-sm text-slate-200">
        {filtered.map(item => (
          <li key={item.id} className={item.depth === 3 ? 'pl-3 text-slate-400' : ''}>
            <a href={`#${item.id}`} className="hover:text-white">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

