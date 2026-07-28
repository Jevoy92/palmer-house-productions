import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand } from "@/components/site/PageShell";
import { blogPosts, getCategories } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Palmer House Productions" },
      {
        name: "description",
        content:
          "Strategy, systems, and production know-how for founders who want video content that compounds—browse every Palmer House Productions article.",
      },
      { property: "og:title", content: "Blog | Palmer House Productions" },
      {
        property: "og:description",
        content: "Strategy, systems, and production know-how for founders who want video content that compounds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const categories = ["All", ...getCategories()];
  const [active, setActive] = useState("All");

  const posts = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <PageShell>
      <PageHero
        eyebrow="Resources"
        title="Insights for"
        highlight="video-first founders"
        subtitle="Strategy, systems, and production know-how from the Pals—no fluff, just what actually moves the needle for your business."
        ctas={false}
      />

      <Section>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={
                active === cat
                  ? "rounded-full px-4 py-2 text-sm font-semibold text-white shadow-glow"
                  : "rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground shadow-soft"
              }
              style={active === cat ? { backgroundImage: "var(--gradient-brand)" } : undefined}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-glow"
            >
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <span className="rounded-full border border-border px-2.5 py-1">{post.category}</span>
                <span>{post.palLane} Pal</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug group-hover:text-gradient-brand">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Ready to Transform Your Business with Video?"
        subtitle="Get personalized insights and strategic recommendations for your unique situation."
        primaryLabel="Get Your Strategy Assessment"
      />
    </PageShell>
  );
}
