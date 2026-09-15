import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { LaneTiles, PalCrew, StatBand } from "@/components/site/PalVisuals";
import { PAL_HEADSHOTS, laneVar } from "@/lib/pal-lanes";
import type { PalName } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";
import musicVideo from "@/assets/work/MusicVideo-optimized.webm";
import musicPoster from "@/assets/work/MusicVideo-poster.jpg";
import chiropractor from "@/assets/work/Chiropractor-optimized.webm";
import chiropractorPoster from "@/assets/work/Chiropractor-poster.jpg";
import farmersMarket from "@/assets/work/FarmersMarket-optimized.webm";
import farmersMarketPoster from "@/assets/work/FarmersMarket-poster.jpg";
import hrEducation from "@/assets/work/HREducation-optimized.webm";
import hrEducationPoster from "@/assets/work/HREducation-poster.jpg";
import naturopath from "@/assets/work/Naturopath-optimized.webm";
import naturopathPoster from "@/assets/work/Naturopath-poster.jpg";
import nonprofit from "@/assets/work/NonProfit-optimized.webm";
import nonprofitPoster from "@/assets/work/NonProfit-poster.jpg";

type Story = {
  title: string;
  client: string;
  lane: PalAccent;
  video: string;
  poster: string;
  portrait: boolean;
  voice: PalName;
  copy: string;
};

const LANE_LABEL: Record<PalAccent, string> = {
  reel: "Reel",
  spotlight: "Spotlight",
  evergreen: "Evergreen",
  system: "System",
};

const STORIES: Story[] = [
  {
    title: "Make the craft feel undeniable.",
    client: "Music + performance",
    lane: "spotlight",
    video: musicVideo,
    poster: musicPoster,
    portrait: false,
    voice: "kareem",
    copy: "The work already had energy. Our job was to make every frame feel as intentional as the performance.",
  },
  {
    title: "Turn expertise into reassurance.",
    client: "Health + wellness",
    lane: "evergreen",
    video: chiropractor,
    poster: chiropractorPoster,
    portrait: true,
    voice: "clara",
    copy: "A viewer should understand the care before they ever walk through the door. We gave the expertise a calmer path.",
  },
  {
    title: "Make a local story travel.",
    client: "Community + place",
    lane: "reel",
    video: farmersMarket,
    poster: farmersMarketPoster,
    portrait: true,
    voice: "raquel",
    copy: "The fastest content still needs a human center. We built the momentum around what the community already loved.",
  },
  {
    title: "Teach once. Let the asset carry it.",
    client: "People + operations",
    lane: "system",
    video: hrEducation,
    poster: hrEducationPoster,
    portrait: true,
    voice: "samira",
    copy: "The answer was living in meetings. We shaped it into something every teammate could find and revisit.",
  },
  {
    title: "Make trust visible before the call.",
    client: "Founder-led service",
    lane: "spotlight",
    video: naturopath,
    poster: naturopathPoster,
    portrait: true,
    voice: "kiana",
    copy: "Warm direction mattered more than another take. The result feels like the person clients will actually meet.",
  },
  {
    title: "Give the mission a face and a reason.",
    client: "Nonprofit + impact",
    lane: "evergreen",
    video: nonprofit,
    poster: nonprofitPoster,
    portrait: true,
    voice: "cyrus",
    copy: "Impact becomes memorable when the audience can see the stakes, the people, and the path forward.",
  },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function WorkVideo({
  src,
  poster,
  label,
  portrait,
}: {
  src: string;
  poster: string;
  label: string;
  portrait: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldLoad = useInView(videoRef, { once: true, margin: "400px 0px" });

  return (
    <div className="relative h-full min-h-64 overflow-hidden bg-ink">
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full scale-110 object-cover opacity-35 blur-xl"
      />
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        controls
        muted
        playsInline
        preload={shouldLoad ? "metadata" : "none"}
        className={`relative z-10 aspect-video h-full w-full ${portrait ? "object-contain" : "object-cover"}`}
        aria-label={label}
      />
    </div>
  );
}

function WorkPage() {
  const reduced = useReducedMotion();
  return (
    <PageShell>
      <PageHero
        eyebrow="Selected work"
        title="Proof should move"
        highlight="before it explains."
        subtitle="Real film, real businesses, and the strategic reason each piece exists. Press play before reading the case note."
        lane="spotlight"
        visual={<PalCrew className="w-full" />}
        primary={{ label: "Book a Discovery Call", to: "/contact" }}
        secondary={{ label: "Explore packages", to: "/shop" }}
      >
        <StatBand
          className="mt-8"
          stats={[
            { value: STORIES.length, label: "case notes below", lane: "spotlight" },
            { value: 4, label: "Pal lanes represented", lane: "reel" },
            { value: 1, suffix: " day", label: "typical production footprint", lane: "evergreen" },
          ]}
        />
      </PageHero>

      <section className="px-4 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-6xl space-y-6">
          {STORIES.map((story, index) => (
            <motion.article
              key={story.title}
              initial={reduced ? false : { opacity: 0, transform: "translateY(24px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="grid overflow-hidden rounded-[2rem] border border-white/80 lg:grid-cols-[1.35fr_0.65fr]"
              style={{ background: laneVar(story.lane, "-soft") }}
            >
              <div className={`relative bg-ink ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <WorkVideo
                  src={story.video}
                  poster={story.poster}
                  portrait={story.portrait}
                  label={`${story.client} project video`}
                />
                <span className="pointer-events-none absolute left-5 top-5 grid size-11 place-items-center rounded-full bg-white text-ink">
                  <Play className="size-4 fill-current" />
                </span>
              </div>
              <div className="flex flex-col p-6 sm:p-9">
                <p
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: laneVar(story.lane, "-text") }}
                >
                  {LANE_LABEL[story.lane]} Pal · {story.client}
                </p>
                <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.03em]">{story.title}</h2>
                <blockquote className="mt-6 text-lg leading-relaxed text-ink-soft">
                  “{story.copy}”
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full"
                    style={{ background: laneVar(story.lane, "-soft") }}
                  >
                    <img
                      src={PAL_HEADSHOTS[story.voice]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover mix-blend-multiply"
                    />
                  </span>
                  <p className="text-sm font-semibold">
                    {cap(story.voice)}, your {LANE_LABEL[story.lane]} Pal
                  </p>
                </div>
                <Link
                  to="/find-your-pal"
                  className="mt-auto inline-flex min-h-11 items-end gap-2 pt-8 font-semibold underline underline-offset-4"
                >
                  Find the lane for your problem <ArrowRight className="mb-1 size-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Section
        tone="mist"
        eyebrow="Pick the lane behind the proof"
        title="Every piece above started with a business problem."
        subtitle="Choose the friction you recognize and meet the Pal who solves it."
      >
        <LaneTiles ctaLabel="Explore" />
      </Section>

      <CtaBand
        title="What should your next video make easier?"
        subtitle="Bring the bottleneck. We match it to a lane, a plan, and a package."
        primaryLabel="Book a Discovery Call"
        primaryTo="/contact"
        secondaryLabel="Explore packages"
        secondaryTo="/shop"
        lane="spotlight"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/work")({
  head: () => ({
    ...createSeo({
      title: "Selected Work | Palmer House Productions",
      description:
        "Watch real Palmer House work and understand the business transformation each video was built to support.",
      pathname: "/work",
    }),
  }),
  component: WorkPage,
});
