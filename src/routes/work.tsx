import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CtaBand, InView, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { LaneTiles } from "@/components/site/PalVisuals";
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
    copy: "Watch for the relationship between the performance, the framing, and the rhythm of the edit.",
  },
  {
    title: "Turn expertise into reassurance.",
    client: "Health + wellness",
    lane: "evergreen",
    video: chiropractor,
    poster: chiropractorPoster,
    portrait: true,
    voice: "clara",
    copy: "Look at how a direct explanation and a view of the practice help introduce the work.",
  },
  {
    title: "Make a local story travel.",
    client: "Community + place",
    lane: "reel",
    video: farmersMarket,
    poster: farmersMarketPoster,
    portrait: true,
    voice: "raquel",
    copy: "People, place, and small details give a local story something to remember.",
  },
  {
    title: "Teach once. Let the asset carry it.",
    client: "People + operations",
    lane: "system",
    video: hrEducation,
    poster: hrEducationPoster,
    portrait: true,
    voice: "samira",
    copy: "Clear spoken guidance gives viewers an explanation they can pause and return to.",
  },
  {
    title: "Make trust visible before the call.",
    client: "Founder-led service",
    lane: "spotlight",
    video: naturopath,
    poster: naturopathPoster,
    portrait: true,
    voice: "kiana",
    copy: "A person speaking in their own setting can help viewers get a feel for the service.",
  },
  {
    title: "Give the mission a face and a reason.",
    client: "Nonprofit + impact",
    lane: "evergreen",
    video: nonprofit,
    poster: nonprofitPoster,
    portrait: true,
    voice: "cyrus",
    copy: "Notice how the people and their setting give a wider mission a human point of view.",
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
        playsInline
        preload={shouldLoad ? "metadata" : "none"}
        className={`relative z-10 aspect-video h-full w-full ${portrait ? "object-contain" : "object-cover"}`}
        aria-label={label}
      />
    </div>
  );
}

function WorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Selected work"
        title="See the work."
        highlight="Picture what comes next."
        subtitle="A selection of Palmer House production work, from performances and local businesses to education and community stories. Press play to see the finished films."
        lane="spotlight"
        visual={
          <img
            src={musicPoster}
            alt="A frame from Palmer House’s music and performance work"
            className="aspect-video w-full rounded-2xl object-cover"
            fetchPriority="high"
          />
        }
        primary={{
          label: "Talk about your video",
          to: "/contact",
          search: { intent: "production" },
        }}
        secondary={{ label: "Explore packages", to: "/shop" }}
      />

      <section className="px-4 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-6xl space-y-6">
          {STORIES.map((story, index) => (
            <InView key={story.title}>
              <article className="grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[1.35fr_0.65fr]">
                <div className={`relative bg-ink ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <WorkVideo
                    src={story.video}
                    poster={story.poster}
                    portrait={story.portrait}
                    label={`${story.client} project video`}
                  />
                </div>
                <div className="flex flex-col p-6 sm:p-9">
                  <p
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: laneVar(story.lane, "-text") }}
                  >
                    {LANE_LABEL[story.lane]} Pal · {story.client}
                  </p>
                  <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.03em]">{story.title}</h2>
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{story.copy}</p>
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
                        className="size-full object-cover"
                      />
                    </span>
                    <p className="text-sm font-semibold">{cap(story.voice)}’s creative lens</p>
                  </div>
                  <Link
                    to="/find-your-pal"
                    className="mt-auto inline-flex min-h-11 items-end gap-2 pt-8 font-semibold underline underline-offset-4"
                  >
                    Find a video package <ArrowRight className="mb-1 size-4" />
                  </Link>
                </div>
              </article>
            </InView>
          ))}
        </div>
      </section>

      <Section
        tone="mist"
        eyebrow="What do you want to make?"
        title="Choose a starting point for your video."
        subtitle="Find a production category, see the packages, and adjust the scope. The Pals are creative guides; our human team produces the work."
      >
        <LaneTiles ctaLabel="Explore" />
      </Section>

      <CtaBand
        title="What should your next video make easier?"
        subtitle="Bring the idea, the audience, and where you want to use it. We’ll help shape the brief and confirm a production plan."
        primaryLabel="Talk about your video"
        primarySearch={{ intent: "production" }}
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
        "Watch real Palmer House work and explore examples of performance, business, education, and community video.",
      pathname: "/work",
    }),
  }),
  component: WorkPage,
});
