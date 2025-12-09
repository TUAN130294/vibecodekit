type TocItem = {
  id: string;
  depth: number;
  text: string;
};

export function Toc({ headings }: { headings: TocItem[] }) {
  const filtered = headings.filter(h => h.depth === 2 || h.depth === 3);
  if (!filtered.length) return null;

  return (
    <div className="sticky top-10 rounded-xl border border-slate-200 bg-white/85 p-4 shadow-md shadow-slate-200/50">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        On this page
      </div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {filtered.map(item => (
          <li key={item.id} className={item.depth === 3 ? 'pl-3 text-slate-500' : ''}>
            <a href={`#${item.id}`} className="hover:text-blue-700">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

