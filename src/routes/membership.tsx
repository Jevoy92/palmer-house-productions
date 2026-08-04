import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Clapperboard,
  FileStack,
  FolderOpen,
  Gauge,
  Layers3,
  Sparkles,
  Users,
  Video,
  WandSparkles,
} from "lucide-react";
import { useRef } from "react";
import { PageShell } from "@/components/site/PageShell";
import { studioPlans } from "@/lib/studio-model";

const chapters = [
  {
    number: "01",
    title: "Give the idea a job.",
    body: "Start with the business outcome, the real audience, and the question worth organizing. No empty prompt box.",
    icon: Gauge,
    color: "var(--spotlight)",
  },
  {
    number: "02",
    title: "Build the campaign spine.",
    body: "The Studio creates the big idea, message pillars, anchor script, short scripts, captions, FAQs, email, and carousel together.",
    icon: WandSparkles,
    color: "var(--reel)",
  },
  {
    number: "03",
    title: "Make it filmable.",
    body: "Every campaign includes a shot list, B-roll, wardrobe, props, delivery notes, timing, and a practical filming checklist.",
    icon: Clapperboard,
    color: "var(--evergreen)",
  },
  {
    number: "04",
    title: "Give it a rhythm.",
    body: "Assets arrive with a publishing schedule your team can edit, assign, approve, and export to its calendar.",
    icon: CalendarDays,
    color: "var(--system)",
  },
  {
    number: "05",
    title: "Bring in the humans.",
    body: "Send the exact campaign to Palmer House for strategy, filming, or editing. The brief stays attached; nobody starts over.",
    icon: Users,
    color: "var(--ink)",
  },
];

function MembershipPage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const productY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -65]);
  return (
    <PageShell>
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-5rem)] overflow-hidden px-4 pb-16 pt-16 sm:pt-20"
      >
        <div className="mx-auto max-w-[90rem]">
          <motion.div style={{ y: copyY }} className="relative z-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[.22em] text-system">
              Palmer House Studio
            </p>
            <h1 className="mx-auto mt-5 max-w-[12ch] text-5xl font-extrabold leading-[.9] tracking-[-.07em] sm:text-7xl lg:text-[7.5rem]">
              One useful idea. A whole campaign ready to move.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
              Strategy, scripts, production planning, publishing, and real production
              support—connected by the Four Pals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/studio" className="primary-action min-h-13 rounded-full px-7">
                Start the free sprint <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/membership/pricing"
                className="secondary-action min-h-13 rounded-full px-7"
              >
                See membership plans
              </Link>
            </div>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[.14em] text-muted-foreground">
              7 days · one complete campaign · cancel anytime after upgrading
            </p>
          </motion.div>
          <motion.div
            style={{ y: productY }}
            className="relative mx-auto mt-14 max-w-6xl rounded-[2rem] border border-black/5 bg-[#f5f5f2] p-3 shadow-[0_50px_120px_-60px_rgba(31,35,40,.55)] sm:p-5"
          >
            <div className="overflow-hidden rounded-[1.35rem] bg-white">
              <div className="flex min-h-14 items-center gap-3 border-b border-border px-4">
                <span className="grid size-8 place-items-center rounded-lg bg-ink font-mono text-[8px] font-bold text-white">
                  PH
                </span>
                <span className="text-xs font-bold">Campaign Architect</span>
                <span className="ml-auto rounded-full bg-evergreen-soft px-3 py-1 font-mono text-[8px] uppercase tracking-[.13em] text-evergreen">
                  Ready to film
                </span>
              </div>
              <div className="grid lg:grid-cols-[13rem_1fr]">
                <aside className="hidden border-r border-border bg-secondary/60 p-3 lg:block">
                  {["Strategy", "Anchor script", "Shorts", "Production plan", "Publishing"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`mb-1 rounded-xl px-3 py-3 text-xs font-semibold ${index === 0 ? "bg-ink text-white" : "text-muted-foreground"}`}
                      >
                        {item}
                      </div>
                    ),
                  )}
                </aside>
                <div className="p-5 sm:p-8">
                  <p className="font-mono text-[8px] uppercase tracking-[.17em] text-spotlight">
                    The organizing idea
                  </p>
                  <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-[-.05em] sm:text-5xl">
                    Your customer does not need more content. They need the decision organized.
                  </h2>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      "Name the real friction",
                      "Make the expertise visible",
                      "Give one confident next step",
                    ].map((item, index) => (
                      <div key={item} className="rounded-2xl bg-secondary p-5">
                        <span className="font-mono text-[8px] text-muted-foreground">
                          0{index + 1}
                        </span>
                        <p className="mt-8 text-sm font-semibold">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {[
                      ["Spotlight", "var(--spotlight)"],
                      ["Reel", "var(--reel)"],
                      ["Evergreen", "var(--evergreen)"],
                      ["System", "var(--system)"],
                    ].map(([name, color], index) => (
                      <motion.div
                        key={name}
                        initial={reduce ? false : { scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08, duration: 0.45 }}
                        className="origin-bottom rounded-xl p-3 text-white"
                        style={{ background: color }}
                      >
                        <p className="hidden text-xs font-bold sm:block">{name}</p>
                        <span className="block h-10 sm:h-7" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-ink px-4 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">
            The transformation
          </p>
          <h2 className="mt-6 max-w-[11ch] text-5xl font-extrabold leading-[.92] tracking-[-.06em] sm:text-7xl">
            From “what should we post?” to “here is the system.”
          </h2>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-2">
            <div className="bg-[#25292f] p-7 sm:p-10">
              <p className="font-mono text-[9px] uppercase tracking-[.17em] text-white/35">
                Before
              </p>
              <ul className="mt-8 space-y-5 text-white/55">
                {[
                  "Ideas scattered across chats and notes",
                  "Every script starts from a blank page",
                  "A filming day without a complete shot plan",
                  "Good footage that never gets published",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-reel" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-7 text-ink sm:p-10">
              <p className="font-mono text-[9px] uppercase tracking-[.17em] text-system">After</p>
              <ul className="mt-8 space-y-5">
                {[
                  "One business idea becomes a campaign",
                  "Every asset remembers the brand",
                  "The production plan is built with the script",
                  "The publishing rhythm arrives ready to edit",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-evergreen" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-system">
            One connected workflow
          </p>
          <h2 className="mt-5 max-w-[12ch] text-5xl font-extrabold leading-[.94] tracking-[-.06em] sm:text-7xl">
            Each room finishes the work the last room started.
          </h2>
          <div className="mt-16 divide-y divide-border">
            {chapters.map((chapter, index) => (
              <motion.article
                key={chapter.title}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55 }}
                className="grid gap-6 py-10 md:grid-cols-[5rem_4rem_1fr_1fr] md:items-start"
              >
                <span className="font-mono text-[10px] text-muted-foreground">
                  {chapter.number}
                </span>
                <span
                  className="grid size-12 place-items-center rounded-2xl text-white"
                  style={{ background: chapter.color }}
                >
                  <chapter.icon className="size-5" />
                </span>
                <h3 className="text-3xl font-extrabold tracking-[-.04em]">{chapter.title}</h3>
                <p className="max-w-lg leading-relaxed text-muted-foreground">{chapter.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f2] px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-evergreen">
                The production moat
              </p>
              <h2 className="mt-5 text-5xl font-extrabold leading-[.94] tracking-[-.06em] sm:text-6xl">
                Software that knows what happens after “generate.”
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Most tools stop at words. Palmer House Studio designs for the physical work:
              performance, cameras, locations, B-roll, editing, approvals, and the people
              responsible for shipping it.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Video,
                title: "Film it yourself",
                body: "Use the shot list, production checklist, and delivery notes with your own team.",
              },
              {
                icon: Users,
                title: "Bring your crew",
                body: "Keep strategy and assets in the Studio while assigning production internally.",
              },
              {
                icon: Clapperboard,
                title: "Call Palmer House",
                body: "Request strategy, filming, or editing from the campaign itself—without a new intake.",
              },
            ].map((item, index) => (
              <motion.article
                key={item.title}
                whileHover={reduce ? undefined : { y: -6 }}
                className="min-h-80 rounded-[2rem] bg-white p-7"
              >
                <span
                  className="grid size-12 place-items-center rounded-2xl text-white"
                  style={{
                    background: ["var(--system)", "var(--spotlight)", "var(--reel)"][index],
                  }}
                >
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-16 text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-system">
              Membership
            </p>
            <h2 className="mx-auto mt-5 max-w-[12ch] text-5xl font-extrabold leading-[.94] tracking-[-.06em] sm:text-7xl">
              Choose the amount of momentum.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Every plan includes the same connected Studio. The difference is campaign volume, team
              support, and Palmer House access.
            </p>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {Object.entries(studioPlans).map(([key, plan], index) => (
              <article
                key={key}
                className={`flex flex-col rounded-[2rem] border p-7 ${index === 1 ? "border-ink bg-ink text-white" : "border-border bg-white"}`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[.17em] opacity-55">
                    {plan.name}
                  </p>
                  {index === 1 && (
                    <span className="rounded-full bg-system px-3 py-1 font-mono text-[8px] uppercase tracking-[.13em]">
                      Most useful
                    </span>
                  )}
                </div>
                <p className="mt-8 text-5xl font-extrabold">
                  ${plan.price}
                  <span className="text-sm font-medium opacity-55">/mo</span>
                </p>
                <p className="mt-4 min-h-12 text-sm leading-relaxed opacity-65">{plan.audience}</p>
                <p
                  className={`mt-7 rounded-2xl p-4 text-sm font-bold ${index === 1 ? "bg-white/10" : "bg-secondary"}`}
                >
                  {plan.campaigns} complete campaigns each month
                </p>
                <ul className="mt-7 space-y-4 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check
                        className={`mt-0.5 size-4 shrink-0 ${index === 1 ? "text-system" : "text-evergreen"}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/studio"
                  className={`mt-9 flex min-h-13 items-center justify-center rounded-2xl font-semibold ${index === 1 ? "bg-white text-ink" : "bg-ink text-white"}`}
                >
                  Start with a free sprint
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/membership/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
            >
              Compare every detail <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-system text-white">
          <div className="grid lg:grid-cols-[1fr_.9fr]">
            <div className="p-8 sm:p-12">
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/55">
                The seven-day sprint
              </p>
              <h2 className="mt-5 text-5xl font-extrabold leading-[.94] tracking-[-.055em]">
                Do not tour the software. Finish something.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                Set up the brand memory, build one complete campaign, edit it with your team, and
                leave with a production-ready plan—even if you do not upgrade.
              </p>
              <Link
                to="/membership/sprint"
                className="mt-8 inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-7 font-semibold text-ink"
              >
                See the guided sprint <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { icon: Gauge, title: "Day 1", body: "Set the brand memory" },
                { icon: Sparkles, title: "Day 2", body: "Build the campaign" },
                { icon: FileStack, title: "Days 3–5", body: "Edit and approve" },
                { icon: Clapperboard, title: "Days 6–7", body: "Plan the production" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-5 bg-system p-6">
                  <item.icon className="size-5" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[.15em] text-white/50">
                      {item.title}
                    </p>
                    <p className="mt-1 font-semibold">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-4xl font-extrabold tracking-[-.05em]">
            The practical questions.
          </h2>
          <div className="mt-10 space-y-3">
            {[
              {
                q: "Is this replacing Palmer House production?",
                a: "No. The Studio makes planning and reuse more valuable whether you film yourself, use another crew, or ask Palmer House to produce the campaign.",
              },
              {
                q: "Does the AI publish without approval?",
                a: "No. Campaigns, assets, dates, and status changes stay editable. Your team remains responsible for claims, proof, approval, and publishing.",
              },
              {
                q: "What counts as a campaign?",
                a: "A complete system: strategy, one anchor, several short scripts, written assets, a production plan, and a publishing schedule. Failed generation reservations are released.",
              },
              {
                q: "Can my team use it?",
                a: "Yes. Business and Partner are designed for shared workspaces. Database roles and private storage are already enforced; transactional invitations activate when email delivery is connected.",
              },
              {
                q: "Can Palmer House use the exact brief?",
                a: "Yes. A service request can be opened from the campaign, keeping the goal, audience, scripts, and production plan attached.",
              },
            ].map((item) => (
              <details key={item.q} className="group rounded-2xl border border-border bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.q}
                  <span className="text-xl transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Palmer House Studio — One Idea to a Complete Campaign" },
      {
        name: "description",
        content:
          "Build strategy, scripts, a production plan, and a publishing rhythm from one useful business idea—then produce it yourself or with Palmer House.",
      },
    ],
  }),
  component: MembershipPage,
});
