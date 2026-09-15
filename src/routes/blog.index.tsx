import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  PageShell,
  PageHero,
  Section,
  CtaBand,
  InView,
  Card,
  CardGrid,
} from "@/components/site/PageShell";
import { Scene } from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import { PAL_HEADSHOTS, laneById, laneVar } from "@/lib/pal-lanes";
import { palDirectory } from "@/lib/pal-directory";
import type { PalAccent } from "@/lib/pricing-catalog";
import { blogPosts, getCategories, type BlogPost } from "@/data/blog";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    ...createSeo({
      title: "Blog | Palmer House Productions",
      description:
        "Strategy, systems, and production know-how for founders who want video content that compounds—browse every Palmer House Productions article.",
      pathname: "/blog",
    }),
  }),
  component: BlogIndexPage,
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

const resources: { to: string; title: string; body: string; lane: PalAccent; glyph: GlyphName }[] =
  [
    {
      to: "/video-system-assessment",
      title: "Assess your current system",
      body: "Get a readiness score and a recommended Pal lane.",
      lane: "system",
      glyph: "search",
    },
    {
      to: "/games",
      title: "Generate a useful mission",
      body: "Turn a business goal into a hook, shot list, and CTA.",
      lane: "reel",
      glyph: "spark",
    },
    {
      to: "/production-guide",
      title: "Prepare for production day",
      body: "Use the practical wardrobe, location, and logistics checklist.",
      lane: "spotlight",
      glyph: "camera",
    },
  ];

function BlogIndexPage() {
  const categories = ["All", ...getCategories()];
  const [active, setActive] = useState("All");

  const posts = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <PageShell>
      <PageHero
        eyebrow="The Pal field guide"
        title="Build a video system."
        highlight="Start with one useful answer."
        subtitle="Practical guides for planning, producing, distributing, and improving business video—organized by the problem you are solving."
        ctas={false}
        lane="evergreen"
        visual={
          <Scene
            name="blog"
            priority
            tags={["Make it clear", "Make it useful", "Make it repeatable"]}
          />
        }
      />

      <Section
        eyebrow="Browse the library"
        title="Answers for the work in front of you."
        subtitle="Choose a topic or scan the full collection. Every article tells you what to do next—not just what to think about."
      >
        <nav
          className="mb-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center"
          aria-label="Filter articles by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={
                active === cat
                  ? "min-h-11 shrink-0 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-soft"
                  : "min-h-11 shrink-0 rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {posts.map((post, index) => {
            const lane = LANE_OF[post.palLane];
            const pal = laneById[lane].pals[0];
            const glyph = CATEGORY_GLYPH[post.category] ?? "script";
            return (
              <InView key={post.slug} delay={Math.min(index, 5) * 0.04}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none"
                >
                  <div
                    className="relative flex items-start justify-between gap-3 overflow-hidden p-5"
                    style={{ background: laneVar(lane, "-soft") }}
                  >
                    <span
                      aria-hidden
                      className="absolute -right-10 -top-14 size-36 rounded-full transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
                      style={{ background: `color-mix(in srgb, ${laneVar(lane)} 16%, white)` }}
                    />
                    <div className="relative">
                      <span className="grid size-12 place-items-center rounded-[1.25rem] bg-white shadow-sm">
                        <Glyph name={glyph} lane={lane} className="size-8" />
                      </span>
                      <span
                        className="mt-3 block font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: laneVar(lane, "-text") }}
                      >
                        {post.palLane} Pal · {post.category}
                      </span>
                    </div>
                    <span
                      className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white"
                      style={{ background: `color-mix(in srgb, ${laneVar(lane)} 22%, white)` }}
                    >
                      <img
                        src={PAL_HEADSHOTS[pal]}
                        alt={palDirectory[pal].name}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover mix-blend-multiply"
                      />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-extrabold leading-snug tracking-[-0.025em]">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                      <span>{post.readTime}</span>
                      <span
                        className="inline-flex items-center gap-1 font-bold"
                        style={{ color: laneVar(lane, "-text") }}
                      >
                        Read{" "}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </InView>
            );
          })}
        </div>
      </Section>

      <Section
        tone="ink"
        eyebrow="Need a faster starting point?"
        title="Use the resource that matches today’s question."
        align="left"
      >
        <div className="text-foreground">
          <CardGrid cols={3}>
            {resources.map((item) => (
              <Card
                key={item.to}
                title={item.title}
                body={item.body}
                to={item.to}
                lane={item.lane}
                glyph={item.glyph}
              />
            ))}
          </CardGrid>
        </div>
      </Section>

      <CtaBand
        title="Turn the next useful idea into a working video system."
        subtitle="Bring us the bottleneck. We’ll help you choose the right lane, scope, and next production step."
        primaryLabel="Book a Discovery Call"
        lane="evergreen"
      />
    </PageShell>
  );
}
