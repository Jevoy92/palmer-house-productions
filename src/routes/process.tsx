import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { AwakeningSequence } from "@/components/process/AwakeningSequence";
import { PageShell } from "@/components/site/PageShell";
import productionCycle from "@/assets/studio-visuals/production-cycle.png";

const steps = [
  {
    number: "01",
    title: "Discovery",
    body: "We map the audience, the business bottleneck, and the questions your team keeps answering.",
  },
  {
    number: "02",
    title: "Strategy",
    body: "We choose the right Pal lanes and design a video system around measurable business outcomes.",
  },
  {
    number: "03",
    title: "Production",
    body: "Our crew handles the planning, direction, cameras, lighting, and sound so you can focus on being yourself.",
  },
  {
    number: "04",
    title: "Launch",
    body: "You receive a reusable library built for social, web, sales, onboarding, training, and support.",
  },
];

const promises = [
  "The business problem is defined before the shot list.",
  "Every video has a job, an audience, and a useful shelf life.",
  "Camera-shy founders get clear direction without sounding scripted.",
  "One production day is planned for maximum useful output.",
  "The final library is organized so your team can actually use it.",
  "The system can expand without rebuilding everything from scratch.",
];

function ProcessPage() {
  return (
    <PageShell>
      <section className="px-4 pb-20 pt-20 sm:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-[clamp(3.2rem,8vw,7.6rem)] font-extrabold leading-[0.92] tracking-[-0.065em]">
            Build a content system that works while you sleep.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Not random posts. Not marketing fluff. A clear process that turns business problems into
            reusable video assets.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Book a strategy call <ArrowRight className="size-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex min-h-12 items-center rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              See the four steps
            </a>
          </div>
        </div>
      </section>

      <AwakeningSequence />

      <section id="how-it-works" className="scroll-mt-24 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                How Palmer House works
              </p>
              <h2 className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[0.96] tracking-[-0.055em]">
                Listen first. Build the system. Then turn on the cameras.
              </h2>
            </div>
            <figure className="overflow-hidden rounded-[2rem] border border-border bg-white">
              <img
                src={productionCycle}
                alt="A visual production cycle from script through filming, storage, publishing, and calendar planning"
                className="aspect-[16/10] w-full object-cover"
              />
            </figure>
          </div>

          <ol className="mt-16 border-t border-border">
            {steps.map((step) => (
              <li
                key={step.number}
                className="grid gap-4 border-b border-border py-8 sm:grid-cols-[5rem_1fr_1.2fr] sm:items-start sm:gap-8 sm:py-10"
              >
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                  {step.number}
                </span>
                <h3 className="text-2xl font-bold sm:text-3xl">{step.title}</h3>
                <p className="max-w-xl leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Before the camera turns on
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl">
              Six promises that keep the work useful.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Production is the easy part. Knowing what to film, who it is for, and how it keeps
              working is the real job.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {promises.map((promise) => (
              <li
                key={promise}
                className="flex gap-3 rounded-3xl border border-border bg-white p-5 shadow-soft"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-system text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed">{promise}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-spotlight px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          <h2 className="mx-auto max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
            Ready to stop explaining the same thing twice?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            Book a free 30-minute strategy call and we will map the first version of your video
            system together.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Book the call <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process | Palmer House Productions" },
      {
        name: "description",
        content:
          "Discovery, strategy, production, and launch: the Palmer House process for turning repeated business problems into reusable video systems.",
      },
      { property: "og:title", content: "Our Process | Palmer House Productions" },
      {
        property: "og:description",
        content: "See how Palmer House turns one production day into a connected video library.",
      },
    ],
  }),
  component: ProcessPage,
});
