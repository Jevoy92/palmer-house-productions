import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell, CtaBand, Eyebrow } from "@/components/site/PageShell";
import { blogPosts, getPostBySlug, type BlogSection } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) return {};
    return {
      meta: [
        { title: `${post.title} | Palmer House Productions Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const relatedPosts =
    related.length > 0
      ? related
      : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="px-4 pb-16 pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
            ← Back to Blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Eyebrow>{post.category}</Eyebrow>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {post.palLane} Pal
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border py-4 text-sm text-muted-foreground">
            <span>By {post.author}</span>
            <span aria-hidden>•</span>
            <span>{post.date}</span>
            <span aria-hidden>•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="prose-content mt-10 space-y-10">
            {post.sections.map((section: BlogSection, i: number) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-display text-2xl font-bold tracking-tight">{section.heading}</h2>
                )}
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((p: string, j: number) => (
                    <p key={j} className="text-base leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.bullets.map((b: string, k: number) => (
                        <li key={k} className="text-base leading-relaxed text-muted-foreground">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center font-display text-3xl font-extrabold tracking-tight">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                to="/blog/$slug"
                params={{ slug: rp.slug }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-glow"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {rp.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-gradient-brand">
                  {rp.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{rp.excerpt}</p>
                <span className="mt-4 text-xs text-muted-foreground">{rp.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Transform Your Business with Video?"
        subtitle="Get personalized insights and strategic recommendations for your unique situation."
        primaryLabel="Get Your Strategy Assessment"
      />
    </PageShell>
  );
}
