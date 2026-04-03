import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StreamingMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-headings:font-bold prose-h2:text-accent prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-base prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
