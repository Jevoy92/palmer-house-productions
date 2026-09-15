import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock3, UserRound } from "lucide-react";
import { PageShell, CtaBand, Eyebrow, InView, Card, CardGrid } from "@/components/site/PageShell";
import { PalFigure } from "@/components/site/PalVisuals";
import type { GlyphName } from "@/components/site/Glyphs";
import { laneById, laneVar } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";
import { blogPosts, getPostBySlug, type BlogPost, type BlogSection } from "@/data/blog";
import {
  blogPostingSchema,
  breadcrumbSchema,
  createSeo,
  jsonLdScript,
  schemaGraph,
} from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) return {};

    const pathname = `/blog/${post.slug}`;
    const publishedDate = new Date(post.date).toISOString().slice(0, 10);
    const seo = createSeo({
      title: `${post.title} | Palmer House Productions Blog`,
      description: post.excerpt,
      pathname,
      type: "article",
    });

    return {
      ...seo,
      meta: [
        ...seo.meta,
        { property: "article:published_time", content: publishedDate },
        { property: "article:modified_time", content: publishedDate },
        { property: "article:author", content: post.author },
      ],
      scripts: [
        jsonLdScript(
          schemaGraph(
            blogPostingSchema({
              headline: post.title,
              description: post.excerpt,
              pathname,
              author: post.author,
              datePublished: publishedDate,
            }),
            breadcrumbSchema([
              { name: "Home", pathname: "/" },
              { name: "Blog", pathname: "/blog" },
              { name: post.title, pathname },
            ]),
          ),
        ),
      ],
    };
  },
  component: BlogPostPage,
});

const LANE_OF: Record<BlogPost["palLane"], PalAccent> = {
  Reel: "reel",
  Spotlight: "spotlight",
  Evergreen: "evergreen",
  System: "system",
};

const CATEGORY_GLYPH: Record<string, GlyphName> = {
  Strategy: "bulb",
  "Production Tips": "camera",
  Production: "camera",
  ROI: "chart",
  Training: "workflow",
  Tools: "gift",
  "Social Media": "reel",
  SEO: "search",
};

function BlogPostPage() {
  const post = Route.useLoaderData() as BlogPost;

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const relatedPosts =
    related.length > 0 ? related : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const directAnswer =
    post.sections.find((section) => section.paragraphs.some(Boolean))?.paragraphs.find(Boolean) ??
    post.excerpt;
  const laneId = LANE_OF[post.palLane];
  const laneInfo = laneById[laneId];
  const lane = {
    color: laneVar(laneId),
    soft: laneVar(laneId, "-soft"),
    text: laneVar(laneId, "-text"),
    path: laneInfo.to,
  };
  const outline = post.sections.filter((section) => section.heading).slice(0, 6);

  return (
    <PageShell>
      <article>
        <header className="px-4 pb-10 pt-4 sm:pb-14 sm:pt-6">
          <div
            className="mx-auto max-w-7xl rounded-[2.5rem] px-5 py-10 sm:rounded-[3.5rem] sm:px-10 sm:py-14"
            style={{ background: lane.soft }}
          >
            <div className="mx-auto max-w-6xl">
              <Link
                to="/blog"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" /> All field guides
              </Link>

              <div className="mt-7 grid items-end gap-10 lg:grid-cols-[1fr_18rem]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Eyebrow lane={laneId}>{post.category}</Eyebrow>
                    <span
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: lane.text }}
                    >
                      {post.palLane} Pal
                    </span>
                  </div>
                  <h1 className="mt-6 max-w-4xl text-[clamp(2.7rem,6.5vw,5.8rem)] font-extrabold leading-[0.94] tracking-[-0.055em] text-balance">
                    {post.title}
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    {post.excerpt}
                  </p>
                </div>

                <div className="hidden lg:block">
                  <PalFigure
                    pal={laneInfo.pals[0]}
                    size="md"
                    lane={laneId}
                    className="aspect-square"
                    caption={`A field note from ${post.author}`}
                    tags={[`${post.palLane} Pal`]}
                  />
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-y border-ink/10 py-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <UserRound className="size-4" /> By {post.author}
                </span>
                <span>{post.date}</span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-4" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 pb-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="min-w-0">
              <aside
                className="rounded-[2rem] border p-6 sm:p-8"
                style={{
                  borderColor: `color-mix(in srgb, ${lane.color} 25%, var(--border))`,
                  background: `color-mix(in srgb, ${lane.soft} 65%, white)`,
                }}
                aria-label="Direct answer"
              >
                <p
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: lane.color }}
                >
                  The direct answer
                </p>
                <p className="mt-4 text-lg font-semibold leading-relaxed sm:text-xl">
                  {directAnswer}
                </p>
              </aside>

              <div className="mt-12 space-y-11">
                {post.sections.map((section: BlogSection, i: number) => (
                  <section key={`${section.heading}-${i}`}>
                    {section.heading && (
                      <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl">
                        {section.heading}
                      </h2>
                    )}
                    <div className={`${section.heading ? "mt-4" : ""} space-y-4`}>
                      {section.paragraphs.map((paragraph: string, j: number) => (
                        <p
                          key={j}
                          className="text-base leading-8 text-muted-foreground sm:text-[1.05rem]"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                          {section.bullets.map((bullet: string, k: number) => (
                            <li
                              key={k}
                              className="rounded-2xl border border-border bg-card p-4 text-sm font-medium leading-relaxed"
                            >
                              <span
                                aria-hidden
                                className="mr-2 inline-block size-2 rounded-full"
                                style={{ background: lane.color }}
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <aside className="h-fit space-y-4 lg:sticky lg:top-24" aria-label="Article links">
              {outline.length > 0 && (
                <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-soft">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    In this guide
                  </p>
                  <ol className="mt-4 space-y-3">
                    {outline.map((section, index) => (
                      <li key={`${section.heading}-${index}`} className="flex gap-3 text-sm">
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold leading-snug">{section.heading}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <div className="rounded-[1.75rem] border border-border bg-card p-3 shadow-soft">
                <PalFigure pal="clara" size="sm" lane="evergreen" tags={["Field notes"]} />
                <div className="p-3 pt-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-evergreen-text">
                    Written by the Pals
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Every field guide is drafted with the Palmer House Pals — the strategic guides
                    behind our four video lanes — and edited by {post.author}.
                  </p>
                </div>
              </div>
              <Link
                to={lane.path}
                className="group block rounded-[1.75rem] p-5"
                style={{ background: lane.soft }}
              >
                <span
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: lane.text }}
                >
                  Put it to work
                </span>
                <p className="mt-3 text-lg font-bold">Explore the {post.palLane} lane.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                  Meet the Pals{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </aside>
          </div>
        </div>
      </article>

      <section className="bg-mist px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <InView>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow lane={laneId}>Keep building</Eyebrow>
                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
                  Related field guides
                </h2>
              </div>
              <Link to="/blog" className="secondary-action">
                Browse every guide
              </Link>
            </div>
          </InView>
          <div className="mt-8">
            <CardGrid cols={3}>
              {relatedPosts.map((relatedPost, index) => (
                <InView key={relatedPost.slug} delay={index * 0.06} className="h-full">
                  <Card
                    to={`/blog/${relatedPost.slug}`}
                    lane={LANE_OF[relatedPost.palLane]}
                    glyph={CATEGORY_GLYPH[relatedPost.category] ?? "script"}
                    index={`${relatedPost.category} · ${relatedPost.readTime}`}
                    title={relatedPost.title}
                    body={relatedPost.excerpt}
                  />
                </InView>
              ))}
            </CardGrid>
          </div>
        </div>
      </section>

      <CtaBand
        title="Turn the idea into a repeatable system."
        subtitle="Bring us the bottleneck. We’ll help you choose the right lane, scope, and next production step."
        primaryLabel="Book a Discovery Call"
        lane={laneId}
      />
    </PageShell>
  );
}
