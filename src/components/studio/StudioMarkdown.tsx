import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Shared markdown renderer for Pal chat answers. Styled by hand so the output
 * matches Studio typography instead of a generic prose theme.
 */
export function StudioMarkdown({ children, accent }: { children: string; accent?: string }) {
  return (
    <div className="text-[15px] leading-[1.75] text-ink [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children: content }) => (
            <h3 className="mb-3 mt-6 text-lg font-black tracking-[-.02em]">{content}</h3>
          ),
          h2: ({ children: content }) => (
            <h3 className="mb-3 mt-6 flex items-center gap-2 text-base font-black tracking-[-.02em]">
              <span
                className="h-4 w-1 shrink-0 rounded-full"
                style={{ background: accent || "var(--system)" }}
              />
              {content}
            </h3>
          ),
          h3: ({ children: content }) => (
            <h4 className="mb-2 mt-5 text-sm font-black uppercase tracking-[.08em] text-muted-foreground">
              {content}
            </h4>
          ),
          p: ({ children: content }) => <p className="my-3">{content}</p>,
          strong: ({ children: content }) => (
            <strong className="font-black text-ink">{content}</strong>
          ),
          ul: ({ children: content }) => <ul className="my-3 space-y-2">{content}</ul>,
          ol: ({ children: content }) => (
            <ol className="my-3 list-decimal space-y-2 pl-5 marker:font-black">{content}</ol>
          ),
          li: ({ children: content, ...props }) =>
            "ordered" in props && props.ordered ? (
              <li className="pl-1">{content}</li>
            ) : (
              <li className="relative pl-5 before:absolute before:left-0 before:top-[.65em] before:size-1.5 before:rounded-full before:bg-current before:opacity-40">
                {content}
              </li>
            ),
          a: ({ children: content, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-bold underline underline-offset-4"
              style={{ color: accent || "var(--system)" }}
            >
              {content}
            </a>
          ),
          blockquote: ({ children: content }) => (
            <blockquote
              className="my-4 rounded-r-xl border-l-2 py-1 pl-4 text-muted-foreground"
              style={{ borderColor: accent || "var(--system)" }}
            >
              {content}
            </blockquote>
          ),
          code: ({ children: content }) => (
            <code className="rounded-md bg-mist px-1.5 py-0.5 font-mono text-[.85em]">
              {content}
            </code>
          ),
          hr: () => <hr className="my-5 border-border" />,
          table: ({ children: content }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">{content}</table>
            </div>
          ),
          thead: ({ children: content }) => <thead className="bg-mist">{content}</thead>,
          th: ({ children: content }) => (
            <th className="border-b border-border px-3 py-2 text-left text-[11px] font-black uppercase tracking-[.08em]">
              {content}
            </th>
          ),
          td: ({ children: content }) => (
            <td className="border-b border-border px-3 py-2 align-top">{content}</td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
