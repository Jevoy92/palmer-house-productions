import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Clapperboard, FileStack, Gauge, Sparkles } from "lucide-react";
import {
  Card,
  CardGrid,
  FaqList,
  IncludedPanel,
  InView,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  PalCallout,
  Scene,
  StatBand,
} from "@/components/site/PalVisuals";
import { Glyph, GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import productionWorkspace from "@/assets/studio-visuals/production-workspace.png";
import { laneVar } from "@/lib/pal-lanes";
import { studioPlans } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const chapters: {
  number: string;
  title: string;
  body: string;
  glyph: GlyphName;
  lane: PalAccent;
  label: string;
}[] = [
  {
    number: "01",
    title: "Give the idea a job.",
    body: "Start with the outcome, the real audience, and the question worth organizing. No empty prompt box.",
    glyph: "chart",
    lane: "spotlight",
    label: "Outcome first",
  },
  {
    number: "02",
    title: "Build the campaign spine.",
    body: "The Studio creates the big idea, message pillars, anchor script, short scripts, captions, FAQs, email, and carousel together.",
    glyph: "workflow",
    lane: "reel",
    label: "One idea, many assets",
  },
  {
    number: "03",
    title: "Make it filmable.",
    body: "Every campaign includes a shot list, B-roll, wardrobe, props, delivery notes, timing, and a practical filming checklist.",
    glyph: "camera",
    lane: "evergreen",
    label: "Shot list included",
  },
  {
    number: "04",
    title: "Give it a rhythm.",
    body: "Assets arrive with a publishing schedule your team can edit, assign, approve, and export to its calendar.",
    glyph: "calendar",
    lane: "system",
    label: "Publishing rhythm",
  },
  {
    number: "05",
    title: "Bring in the humans.",
    body: "Send the exact campaign to Palmer House for strategy, filming, or editing. The brief stays attached; nobody starts over.",
    glyph: "handshake",
    lane: "spotlight",
    label: "Brief stays attached",
  },
];

const PLAN_LANES: PalAccent[] = ["system", "spotlight", "reel"];
const PLAN_GLYPHS: GlyphName[] = ["spark", "clock", "calendar"];

const EVERY_PLAN_INCLUDES = [
  "The connected Studio workspace",
  "Brand DNA + Pal guidance",
  "Personalized video roadmap",
  "Scripts, platform posts + production plans",
  "Content calendar + private library",
  "Palmer House help desk",
];

const MEMBERSHIP_FAQS = [
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
    a: "Yes. Guided and Partner are designed for shared workspaces. Database roles and private storage are already enforced; transactional invitations activate when email delivery is connected.",
  },
  {
    q: "Can Palmer House use the exact brief?",
    a: "Yes. A service request can be opened from the campaign, keeping the goal, audience, scripts, and production plan attached.",
  },
];

function MembershipPage() {
  const reduce = useReducedMotion();
  return (
    <PageShell>
      <PageHero
        eyebrow="Palmer House Studio"
        title="One useful idea."
        highlight="A whole campaign ready to move."
        subtitle="Strategy, scripts, production planning, publishing, and real production support—connected by one four-lane system."
        lane="system"
        primary={{ label: "Start your free sprint", to: "/studio" }}
        secondary={{ label: "Compare Studio plans", to: "/membership/pricing" }}
        visual={
          <Scene
            name="membershipStudio"
            priority
            tags={["Strategy", "Scripts", "Production plan", "Publishing"]}
            caption="7 days · one complete campaign · cancel anytime after upgrading"
          />
        }
      />

      <Section
        tone="mist"
        eyebrow="Inside the Studio"
        title="Campaign Architect organizes the decision, not just the content."
        subtitle="Every campaign starts with the idea that has a job, then builds the assets and the production plan around it."
      >
        <InView className="relative mx-auto max-w-6xl rounded-[2rem] border border-black/5 bg-white p-3 shadow-soft sm:p-5">
          <div className="overflow-hidden rounded-[1.35rem] bg-white">
            <div className="flex min-h-14 items-center gap-3 border-b border-border px-4">
              <span className="grid size-8 place-items-center rounded-lg bg-ink font-mono text-[11px] font-bold text-white">
                PH
              </span>
              <span className="text-xs font-bold">Campaign Architect</span>
              <span className="ml-auto rounded-full bg-evergreen-soft px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[.1em] text-evergreen">
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
                <p className="font-mono text-[11px] font-bold uppercase tracking-[.14em] text-spotlight">
                  The organizing idea
                </p>
                <h3 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-[-.05em] sm:text-5xl">
                  Your customer does not need more content. They need the decision organized.
                </h3>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {(
                    [
                      ["Name the real friction", "search", "reel"],
                      ["Make the expertise visible", "light", "spotlight"],
                      ["Give one confident next step", "publish", "evergreen"],
                    ] as [string, GlyphName, PalAccent][]
                  ).map(([item, glyph, lane], index) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/80 p-5"
                      style={{ background: laneVar(lane, "-soft") }}
                    >
                      <div className="flex items-center justify-between">
                        <GlyphBadge name={glyph} lane={lane} size="sm" />
                        <span className="font-mono text-[11px] text-muted-foreground">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-6 text-sm font-semibold">{item}</p>
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
        </InView>
      </Section>

      <section className="bg-ink px-4 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-white/55">
            The transformation
          </p>
          <h2 className="mt-6 max-w-[11ch] text-4xl font-extrabold leading-[.96] tracking-[-.05em] sm:text-7xl sm:leading-[.92]">
            From “what should we post?” to “here is the system.”
          </h2>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-2">
            <div className="bg-ink p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <GlyphBadge name="layers" lane="reel" size="sm" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[.14em] text-white/50">
                  Before
                </p>
              </div>
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
              <div className="flex items-center gap-3">
                <GlyphBadge name="workflow" lane="system" size="sm" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[.14em] text-system">
                  After
                </p>
              </div>
              <ul className="mt-8 space-y-5">
                {[
                  "One useful idea becomes a campaign",
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
          <div className="mx-auto mt-12 max-w-3xl">
            <PalCallout
              pal="silas"
              quote="The system is the deliverable. Every campaign leaves with a script, a shot plan, and a publishing rhythm — so the footage you shoot never goes looking for a job."
              action={{ label: "See the seven-day sprint", to: "/membership/sprint" }}
            />
          </div>
        </div>
      </section>

      <Section
        eyebrow="One connected workflow"
        title="Each room finishes the work the last room started."
        subtitle="Five rooms, one campaign. Every step hands a finished piece to the next."
        lane="system"
      >
        <div className="space-y-16">
          {chapters.map((chapter, index) => (
            <FeatureSplit
              key={chapter.title}
              reverse={index % 2 === 1}
              lane={chapter.lane}
              eyebrow={`Room ${chapter.number}`}
              title={chapter.title}
              body={chapter.body}
              visual={
                <GraphicFrame lane={chapter.lane} label={chapter.label}>
                  <div className="grid h-full place-items-center pt-8">
                    <Glyph
                      name={chapter.glyph}
                      lane={chapter.lane}
                      className="size-36 sm:size-48"
                    />
                  </div>
                </GraphicFrame>
              }
            />
          ))}
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="The production moat"
        title="Software that knows what happens after “generate.”"
        subtitle="Most tools stop at words. Palmer House Studio designs for the physical work: performance, cameras, locations, B-roll, editing, approvals, and the people responsible for shipping it."
      >
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="overflow-hidden rounded-[2rem] border border-border bg-white"
        >
          <img
            src={productionWorkspace}
            alt="A visual production workspace connecting scripts, editing, analytics, and publishing"
            loading="lazy"
            decoding="async"
            className="aspect-[16/7] w-full object-cover"
          />
        </motion.figure>
        <div className="mt-10">
          <CardGrid cols={3}>
            <Card
              lane="system"
              glyph="camera"
              title="Film it yourself"
              body="Use the shot list, production checklist, and delivery notes with your own team."
            />
            <Card
              lane="spotlight"
              glyph="handshake"
              title="Bring your crew"
              body="Keep strategy and assets in the Studio while assigning production internally."
            />
            <Card
              lane="reel"
              glyph="chat"
              title="Call Palmer House"
              body="Request strategy, filming, or editing from the campaign itself—without a new intake."
            />
          </CardGrid>
        </div>
      </Section>

      <Section
        eyebrow="Membership"
        title="Choose the amount of momentum."
        subtitle="Every plan includes the same connected Studio. The difference is campaign volume and how much private Palmer House guidance you want beside it."
        lane="system"
      >
        <StatBand
          stats={Object.values(studioPlans).map((plan, index) => ({
            value: plan.campaigns,
            label: `complete campaigns each month · ${plan.name}`,
            lane: PLAN_LANES[index],
          }))}
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {Object.entries(studioPlans).map(([key, plan], index) => (
            <InView key={key} delay={index * 0.08} className="h-full">
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-7 ${index === 1 ? "border-spotlight bg-spotlight-soft" : "border-border bg-white"}`}
              >
                <span
                  aria-hidden
                  className="absolute -right-12 -top-12 size-32 rounded-full"
                  style={{ background: laneVar(PLAN_LANES[index], "-soft") }}
                />
                <div className="relative flex items-center justify-between">
                  <GlyphBadge name={PLAN_GLYPHS[index]} lane={PLAN_LANES[index]} size="sm" />
                  {index === 1 && (
                    <span className="rounded-full bg-system px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[.1em] text-white">
                      Best balance
                    </span>
                  )}
                </div>
                <p className="relative mt-6 font-mono text-[11px] font-bold uppercase tracking-[.14em] opacity-65">
                  {plan.name}
                </p>
                <p className="relative mt-3 text-5xl font-extrabold">
                  ${plan.price}
                  <span className="text-sm font-medium text-muted-foreground">/mo</span>
                </p>
                <p className="relative mt-4 min-h-12 text-sm leading-relaxed opacity-65">
                  {plan.audience}
                </p>
                <p
                  className={`relative mt-7 rounded-2xl p-4 text-sm font-bold ${index === 1 ? "bg-white text-spotlight" : ""}`}
                  style={
                    index === 1
                      ? undefined
                      : {
                          background: laneVar(PLAN_LANES[index], "-soft"),
                          color: laneVar(PLAN_LANES[index], "-text"),
                        }
                  }
                >
                  {plan.campaigns} complete campaigns each month
                </p>
                <ul className="relative mt-7 space-y-4 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-evergreen" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/studio"
                  className={`relative mt-9 flex min-h-13 items-center justify-center rounded-2xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight focus-visible:ring-offset-2 ${index === 1 ? "bg-spotlight text-white" : "bg-ink text-white"}`}
                >
                  Start your free sprint
                </Link>
              </article>
            </InView>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/membership/pricing"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight"
          >
            Compare every detail <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12">
          <IncludedPanel
            title="Every plan includes the same connected Studio."
            items={EVERY_PLAN_INCLUDES}
            lane="system"
            glyph="workflow"
          />
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <PalCallout
            pal="samira"
            quote="Pick the plan by how many campaigns you can actually ship in a month — and how often you want a Palmer House strategist in the room with you."
            action={{ label: "Compare Studio plans", to: "/membership/pricing" }}
          />
        </div>
      </Section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-system text-white">
          <div className="grid lg:grid-cols-[1fr_.9fr]">
            <div className="p-8 sm:p-12">
              <p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-white/65">
                The seven-day sprint
              </p>
              <h2 className="mt-5 text-4xl font-extrabold leading-[.96] tracking-[-.05em] sm:text-5xl">
                Do not tour the software. Finish something.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                Set up the brand memory, build one complete campaign, edit it with your team, and
                leave with a production-ready plan—even if you do not upgrade.
              </p>
              <Link
                to="/membership/sprint"
                className="mt-8 inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-7 font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-system"
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
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/15">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[.12em] text-white/65">
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

      <Section
        tone="mist"
        eyebrow="The practical questions"
        title="The practical questions."
        subtitle="Samira answers the ones that come up before most teams start their sprint."
      >
        <FaqList items={MEMBERSHIP_FAQS} lane="system" pal="samira" />
      </Section>
    </PageShell>
  );
}

function MembershipRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname === "/membership" || pathname === "/membership/" ? (
    <MembershipPage />
  ) : (
    <Outlet />
  );
}

export const Route = createFileRoute("/membership")({
  head: () => ({
    ...createSeo({
      title: "Palmer House Studio — One Idea to a Complete Campaign",
      description:
        "Build strategy, scripts, a production plan, and a publishing rhythm from one useful idea—then produce it yourself or with Palmer House.",
      pathname: "/membership",
    }),
  }),
  component: MembershipRoute,
});
