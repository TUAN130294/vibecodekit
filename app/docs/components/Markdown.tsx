import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-slate lg:prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-semibold prose-h2:mt-0 prose-h2:mb-4 prose-h2:px-0 prose-h2:py-2 prose-h2:bg-transparent prose-h2:border-none prose-h2:text-2xl prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-lg prose-h3:text-slate-900 prose-h3:px-3 prose-h3:py-2 prose-h3:bg-slate-50 prose-h3:border prose-h3:border-slate-200 prose-h3:rounded-xl prose-pre:bg-slate-100 prose-pre:text-slate-900 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 prose-pre:leading-relaxed prose-pre:text-[14px] prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px] prose-code:text-slate-900 prose-li:leading-relaxed prose-p:leading-relaxed prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-primary-700 hover:prose-a:text-primary-600 prose-blockquote:border-l-4 prose-blockquote:border-primary-200 prose-blockquote:bg-primary-50 prose-blockquote:rounded-xl prose-blockquote:text-slate-800 prose-blockquote:py-3 prose-blockquote:px-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

