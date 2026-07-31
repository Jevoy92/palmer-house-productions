import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import musicVideo from "@/assets/work/MusicVideo.webm";
import chiropractor from "@/assets/work/Chiropractor.webm";
import farmersMarket from "@/assets/work/FarmersMarket.webm";
import hrEducation from "@/assets/work/HREducation.webm";
import naturopath from "@/assets/work/Naturopath.webm";
import nonprofit from "@/assets/work/NonProfit.webm";

const STORIES = [
  {
    title: "Make the craft feel undeniable.",
    client: "Music + performance",
    lane: "Spotlight",
    color: "var(--spotlight)",
    video: musicVideo,
    voice: "Kareem",
    copy: "The work already had energy. Our job was to make every frame feel as intentional as the performance.",
  },
  {
    title: "Turn expertise into reassurance.",
    client: "Health + wellness",
    lane: "Evergreen",
    color: "var(--evergreen)",
    video: chiropractor,
    voice: "Clara",
    copy: "A viewer should understand the care before they ever walk through the door. We gave the expertise a calmer path.",
  },
  {
    title: "Make a local story travel.",
    client: "Community + place",
    lane: "Reel",
    color: "var(--reel)",
    video: farmersMarket,
    voice: "Raquel",
    copy: "The fastest content still needs a human center. We built the momentum around what the community already loved.",
  },
  {
    title: "Teach once. Let the asset carry it.",
    client: "People + operations",
    lane: "System",
    color: "var(--system)",
    video: hrEducation,
    voice: "Samira",
    copy: "The answer was living in meetings. We shaped it into something every teammate could find and revisit.",
  },
  {
    title: "Make trust visible before the call.",
    client: "Founder-led service",
    lane: "Spotlight",
    color: "var(--spotlight)",
    video: naturopath,
    voice: "Kiana",
    copy: "Warm direction mattered more than another take. The result feels like the person clients will actually meet.",
  },
  {
    title: "Give the mission a face and a reason.",
    client: "Nonprofit + impact",
    lane: "Evergreen",
    color: "var(--evergreen)",
    video: nonprofit,
    voice: "Cyrus",
    copy: "Impact becomes memorable when the audience can see the stakes, the people, and the path forward.",
  },
];

function WorkPage() {
  const reduced = useReducedMotion();
  return (
    <PageShell>
      <section className="px-4 pb-16 pt-14">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-[12ch] text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Proof should move before it explains.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Real film, real businesses, and the strategic reason each piece exists. Press play
            before reading the case note.
          </p>
        </div>
      </section>
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl space-y-6">
          {STORIES.map((story, index) => (
            <motion.article
              key={story.title}
              initial={reduced ? false : { opacity: 0, transform: "translateY(24px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="grid overflow-hidden rounded-[2rem] border border-border bg-white lg:grid-cols-[1.35fr_0.65fr]"
            >
              <div className={`relative bg-ink ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <video
                  src={story.video}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="aspect-video h-full w-full object-cover"
                  aria-label={`${story.client} project video`}
                />
                <span className="pointer-events-none absolute left-5 top-5 grid size-11 place-items-center rounded-full bg-white text-ink">
                  <Play className="size-4 fill-current" />
                </span>
              </div>
              <div className="flex flex-col p-6 sm:p-9">
                <p
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: story.color }}
                >
                  {story.lane} Pal · {story.client}
                </p>
                <h2 className="mt-5 text-3xl font-extrabold">{story.title}</h2>
                <blockquote className="mt-6 text-lg leading-relaxed text-ink-soft">
                  “{story.copy}”
                </blockquote>
                <p className="mt-3 text-sm font-semibold">
                  — {story.voice}, your {story.lane} Pal
                </p>
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
      <section className="bg-ink px-4 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              Your proof is next
            </p>
            <h2 className="mt-3 max-w-[14ch] text-4xl font-extrabold sm:text-6xl">
              What should your next video make easier?
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink"
          >
            Explore packages <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work | Palmer House Productions" },
      {
        name: "description",
        content:
          "Watch real Palmer House work and understand the business transformation each video was built to support.",
      },
    ],
  }),
  component: WorkPage,
});
