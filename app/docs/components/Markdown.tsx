import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-slate lg:prose-lg max-w-none prose-headings:text-white prose-headings:font-semibold prose-h2:mt-10 prose-h2:pt-5 prose-h2:border-t prose-h2:border-white/10 prose-h3:mt-6 prose-h3:text-xl prose-pre:bg-slate-900/90 prose-pre:text-slate-50 prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px] prose-li:leading-relaxed prose-p:leading-relaxed prose-p:text-slate-200 prose-li:text-slate-200 prose-strong:text-white prose-a:text-blue-300 hover:prose-a:text-blue-200 prose-blockquote:border-l-4 prose-blockquote:border-blue-400/60 prose-blockquote:bg-slate-800/60 prose-blockquote:rounded-xl prose-blockquote:text-slate-100 prose-blockquote:py-3 prose-blockquote:px-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

