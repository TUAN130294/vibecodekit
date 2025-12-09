import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-white prose-h2:mt-10 prose-h2:pt-4 prose-h2:border-t prose-h2:border-white/10 prose-pre:bg-slate-900/90 prose-pre:text-slate-50 prose-pre:rounded-xl prose-li:leading-relaxed prose-p:leading-relaxed prose-a:text-blue-400 hover:prose-a:text-blue-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

