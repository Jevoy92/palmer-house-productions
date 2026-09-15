import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import {
  Card,
  CardGrid,
  CtaBand,
  InView,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import { PalCallout, Scene, StatBand } from "@/components/site/PalVisuals";
import { Glyph, GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/resources/reviews")({
  head: () => ({
    ...createSeo({
      title: "Client Reviews | Palmer House Productions",
      description:
        "Real stories from real clients who've transformed their brands through authentic video storytelling with Palmer House Productions.",
      pathname: "/resources/reviews",
    }),
  }),
  component: ReviewsPage,
});

const reviews = [
  {
    time: "2 months ago",
    quote:
      "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced. They took the time to understand our goals and delivered exceptional results.",
    initials: "IJ",
    name: "Isabella Johnstun",
    role: "Dick's Restaurant Supply",
  },
  {
    time: "4 months ago",
    quote:
      "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for photos is one stressor, but jumping in front of the camera to make a video is even more stressful. Jevoy has a gift of helping his clients become grounded and comfortable.",
    initials: "AS",
    name: "Athan Seyler",
    role: "Local Guide",
  },
  {
    time: "2 months ago",
    quote:
      "The Palmer House Productions team is incredibly warm, patient, and skilled! I'm painfully camera-shy, and they made the experience as comfortable as it ever could've been. They encouraged me along the way, tailoring the shoot in some very creative ways to achieve a highly professional video. Highly recommend!",
    initials: "CP",
    name: "Chelsea Power",
  },
  {
    time: "4 months ago",
    quote:
      "Jevoy and his team did video marketing for me and my work. I don't love being in front of camera, and they made it easy, comfortable, seamless, and gave me the pointers and guidance I needed to get it done with hardly any cuts! Highly recommend them for any of your marketing needs!",
    initials: "RD",
    name: "Rachel Delavan",
    role: "Local Guide",
  },
  {
    time: "a year ago",
    quote:
      "Awesome experience from start to finish working with Jevoy. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos.",
    initials: "SJ",
    name: "Sarah Dylan Jensen",
    role: "Local Guide",
  },
  {
    time: "2 years ago",
    quote:
      "Jevoy is amazing. He's super easy to work with. He made me very comfortable to do a shoot with. I'd highly recommend him to anyone looking for good photos for any event. We used his pics for my website and got all good compliments!",
    initials: "CS",
    name: "Cynthia Scanlon",
  },
  {
    time: "2 months ago",
    quote:
      "It was my first time in a professional environment. Jevoy gave me lots of good tips through the process to make it easier. Professional, patient, and skilled team.",
    initials: "JR",
    name: "James Russell",
    role: "Local Guide",
  },
  {
    time: "11 months ago",
    quote:
      "I have done two photoshoots with Jevoy and the photos from both sessions turned out amazing. I love them. Besides that, he is easy to communicate and work with. I would easily work with Palmer House Productions again.",
    initials: "QT",
    name: "Quenia Tolentino",
  },
  {
    time: "2 years ago",
    quote:
      "Jevoy is an absolute dream to work with! He has a great eye and is very knowledgeable. My photos turned out so amazing I would highly recommend him to anyone looking to book a photographer!!",
    initials: "OC",
    name: "Olivia Colantonio",
  },
];

const CARD_ACCENTS: PalAccent[] = ["reel", "spotlight", "evergreen", "system"];
const CARD_GLYPHS: GlyphName[] = [
  "mic",
  "camera",
  "chat",
  "spark",
  "play",
  "handshake",
  "light",
  "edit",
];

function ReviewsPage() {
  const [featured, ...moreReviews] = reviews;
  const localGuides = reviews.filter((r) => r.role === "Local Guide").length;

  return (
    <PageShell>
      <PageHero
        eyebrow="Client proof"
        title="Being on camera can feel hard."
        highlight="The right team changes that."
        subtitle="Clients talk about the things that matter before the final export: feeling comfortable, being understood, staying informed, and receiving work they are proud to use."
        lane="spotlight"
        visual={
          <Scene
            name="reviews"
            priority
            tags={["Professional", "Patient", "Skilled"]}
            caption="A theme across client stories"
          />
        }
      />

      <section className="px-4 py-20 sm:py-28">
        <InView className="mx-auto max-w-6xl">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-spotlight-soft lg:grid-cols-[0.45fr_1fr]">
            <div className="grid min-h-60 place-items-center bg-white p-8">
              <div className="flex flex-col items-center gap-5">
                <Glyph name="mic" lane="spotlight" className="size-20" />
                <span className="grid size-20 place-items-center rounded-full bg-spotlight text-2xl font-extrabold text-white">
                  {featured.initials}
                </span>
                <div className="flex gap-1 text-reel" aria-label="Five highlighted stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="p-7 sm:p-12">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-spotlight-text">
                Featured client story · {featured.time}
              </p>
              <p className="mt-5 text-xl font-bold leading-relaxed sm:text-3xl">
                “{featured.quote}”
              </p>
              <footer className="mt-7 text-sm">
                <strong>{featured.name}</strong>
                {featured.role && <span className="text-muted-foreground"> · {featured.role}</span>}
              </footer>
            </blockquote>
          </div>
          <StatBand
            className="mt-8"
            stats={[
              { value: 5, label: "stars — the theme across client stories", lane: "spotlight" },
              { value: reviews.length, label: "client stories in their own words", lane: "reel" },
              {
                value: localGuides,
                label: "Google Local Guides among reviewers",
                lane: "evergreen",
              },
            ]}
          />
        </InView>
      </section>

      <Section
        tone="mist"
        eyebrow="More client stories"
        title="Proof from the other side of the camera."
        subtitle="Every note below is kept in the client's own words."
      >
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {moreReviews.map((review, index) => {
            const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
            const glyph = CARD_GLYPHS[index % CARD_GLYPHS.length];
            return (
              <article
                key={review.name + review.time}
                className="surface-card relative mb-5 break-inside-avoid overflow-hidden p-6"
              >
                <span
                  aria-hidden
                  className="absolute -right-12 -top-12 size-28 rounded-full"
                  style={{ background: `var(--${accent}-soft)` }}
                />
                <div className="relative flex items-center justify-between gap-3">
                  <GlyphBadge name={glyph} lane={accent} size="sm" />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {review.time}
                    </span>
                    <span
                      className="grid size-9 place-items-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: `var(--${accent})` }}
                    >
                      {review.initials}
                    </span>
                  </div>
                </div>
                <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">
                  “{review.quote}”
                </p>
                <p className="relative mt-5 text-sm font-bold">{review.name}</p>
                {review.role && (
                  <p
                    className="relative mt-1 text-xs font-semibold"
                    style={{ color: `var(--${accent}-text)` }}
                  >
                    {review.role}
                  </p>
                )}
              </article>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.google.com/search?q=Palmer+House+Productions+reviews"
            target="_blank"
            rel="noreferrer"
            className="secondary-action"
          >
            View all Google reviews
          </a>
          <Link to="/work" className="inline-flex min-h-12 items-center gap-2 font-bold">
            See the finished work <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Where to next"
        title="Pick the part that still feels unclear."
        lane="spotlight"
      >
        <div className="mx-auto mb-10 max-w-3xl">
          <PalCallout
            pal="kiana"
            quote="Tell me what changed for a real customer. That is the campaign — and it is also why clients keep saying the process felt calm."
            action={{ label: "Explore Spotlight Pal", to: "/spotlight-pal" }}
          />
        </div>
        <CardGrid cols={3}>
          <Card
            lane="evergreen"
            glyph="handshake"
            title="Camera-shy?"
            body="See how the process creates calm before production."
            to="/process"
          />
          <Card
            lane="spotlight"
            glyph="camera"
            title="Need proof?"
            body="Explore the Customer Stories package."
            to="/packages/customer-stories"
          />
          <Card
            lane="system"
            glyph="cart"
            title="Ready to scope it?"
            body="Build a working package with real catalog pricing."
            to="/shop"
          />
        </CardGrid>
      </Section>

      <CtaBand
        lane="spotlight"
        title="Want your project to feel this supported?"
        subtitle="Start with the part that feels unclear. We will help you choose the right lane and prepare for the camera."
        primaryLabel="Start a Conversation"
      />
    </PageShell>
  );
}
