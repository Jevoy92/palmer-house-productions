import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  FaqList,
  CtaBand,
  Card,
  CardGrid,
} from "@/components/site/PageShell";
import { Scene } from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import { laneVar } from "@/lib/pal-lanes";
import type { PalName } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo, faqSchema, jsonLdScript, schemaGraph } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...createSeo({
      title: "FAQ | Palmer House Productions",
      description:
        "Your complete guide to video content systems, pricing, and process at Palmer House Productions. Find exactly what you're looking for.",
      pathname: "/faq",
    }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(groups.flatMap((group) => group.items))))],
  }),
  component: FaqPage,
});

const groups: {
  category: string;
  lane: PalAccent;
  glyph: GlyphName;
  pal: PalName;
  items: { q: string; a: string }[];
}[] = [
  {
    category: "Content Systems",
    lane: "system",
    glyph: "workflow",
    pal: "samira",
    items: [
      {
        q: "What is a video content system and why does my business need one?",
        a: "A video content system is a coordinated library of videos — social, training, marketing, and proof content — captured efficiently and organized so your business always has content ready to use, instead of scrambling for one-off videos.",
      },
      {
        q: "How does your system approach save me money compared to traditional training or marketing?",
        a: "By capturing multiple videos in a single, well-planned shoot day, you get months of content for a fraction of the cost of hiring separate crews for each individual video.",
      },
      {
        q: "How do you determine which videos my business actually needs?",
        a: "We start with a strategy call to understand your goals, audience, and existing gaps, then map out a content plan built around the problems video can actually solve for you.",
      },
      {
        q: "What kinds of business problems can a video content system solve?",
        a: "Everything from inconsistent onboarding and repetitive training questions to weak social presence, low lead generation, and lack of social proof.",
      },
      {
        q: "How do you ensure the content system stays up to date as our business changes?",
        a: "We build systems with refresh cycles in mind and offer ongoing update packages so your library evolves alongside your team, offers, and brand.",
      },
    ],
  },
  {
    category: "Internal & External Video",
    lane: "reel",
    glyph: "reel",
    pal: "raquel",
    items: [
      {
        q: "How does video onboarding save time for my managers and HR team?",
        a: "Video onboarding lets new hires learn processes on their own time, freeing managers from repeating the same training sessions over and over.",
      },
      {
        q: "Can you help us reduce training costs and increase retention?",
        a: "Yes — a well-built training library standardizes onboarding, reduces trainer hours, and helps new employees ramp up faster and stay longer.",
      },
      {
        q: "Can you create videos optimized for social media like TikTok, Instagram, and LinkedIn?",
        a: "Absolutely — our short-form content is built hook-first and formatted specifically for every platform your audience uses.",
      },
      {
        q: "What's included in your YouTube Visibility Engine?",
        a: "A long-form content strategy paired with production, optimization, and publishing support designed to build organic search and discovery over time.",
      },
      {
        q: "Will your videos help us generate more leads or awareness?",
        a: "Yes — our brand films, testimonials, and evergreen content are designed to build trust and visibility that translates into real leads.",
      },
    ],
  },
  {
    category: "Packages & Pricing",
    lane: "spotlight",
    glyph: "cart",
    pal: "kiana",
    items: [
      {
        q: "How does your production pricing work?",
        a: "Pricing is based on the scope of your content system — number of shoot days, deliverables, and post-production needs. See our pricing page for full package details.",
      },
      {
        q: "Can I customize my video package?",
        a: "Yes — every package can be tailored to fit your specific goals, timeline, and budget.",
      },
      {
        q: "What types of video missions do you offer?",
        a: "We offer missions across social visibility, internal systems, evergreen authority content, and spotlight/brand proof content through our Pal-based framework.",
      },
      {
        q: "Do you offer a starter option for first-timers?",
        a: "Yes — we have entry-level packages designed for businesses new to video production who want to start building a content library affordably.",
      },
      {
        q: "What's included in the Camera-Ready Brand DIY coaching?",
        a: "Coaching and downloadable resources that help you and your team get comfortable and confident producing content on your own between professional shoots.",
      },
    ],
  },
  {
    category: "Ownership & Support",
    lane: "evergreen",
    glyph: "shield",
    pal: "clara",
    items: [
      {
        q: "Do we own the video content?",
        a: "Yes — once your project is paid in full, full ownership of the final video content transfers to you.",
      },
      {
        q: "Can we edit or update videos ourselves in the future?",
        a: "Yes — we deliver final files in formats that allow you or your team to make updates as your business evolves.",
      },
      {
        q: "What support do you offer after delivery?",
        a: "We offer post-delivery support including revisions, refresh packages, and guidance on how to best deploy your content.",
      },
      {
        q: "How do I know if my team is actually using the content?",
        a: "We help you set up simple tracking and hosting solutions so you can see engagement and usage of your video library.",
      },
      {
        q: "How secure is our video library?",
        a: "Your content is stored and delivered through secure, access-controlled platforms so only your team can access sensitive internal videos.",
      },
    ],
  },
  {
    category: "ROI & Results",
    lane: "system",
    glyph: "chart",
    pal: "silas",
    items: [
      {
        q: "How do I measure the ROI of a video content system?",
        a: "We help you track metrics like training time saved, engagement rates, lead generation, and content reuse across the life of your library.",
      },
      {
        q: "Will this actually improve employee engagement?",
        a: "Video content — especially culture and training videos — consistently improves engagement by making information more accessible and human.",
      },
      {
        q: "What about ongoing content needs as our company grows?",
        a: "We offer ongoing production partnerships so your content system keeps pace with your growth, new hires, and new offers.",
      },
      {
        q: "Can we get help updating our system every year or quarter?",
        a: "Yes — we offer quarterly and annual refresh packages to keep your content system current.",
      },
      {
        q: "How long before we see results from our video content system?",
        a: "Many clients see engagement and efficiency gains within the first few weeks of deploying their new content library.",
      },
    ],
  },
  {
    category: "Process & Next Steps",
    lane: "spotlight",
    glyph: "handshake",
    pal: "kareem",
    items: [
      {
        q: "What's the first step to working with Palmer House Productions?",
        a: "Book a free strategy call — we'll talk through your goals and map out the right content path with no pressure and no jargon.",
      },
      {
        q: "How long does the full content system process take?",
        a: "From strategy call to finished content, most projects are completed in weeks, not months.",
      },
      {
        q: "Can you work with companies outside of Seattle?",
        a: "Yes — beyond Seattle, Bellevue, Tacoma, and Portland, we also support remote-first and distributed teams nationwide.",
      },
      {
        q: "How do I know which package or system is right for my business?",
        a: "That's exactly what your strategy call is for — we'll recommend the right Pal, package, and scope based on your goals.",
      },
      {
        q: "Can you create content for our next product or event launch?",
        a: "Yes — we build launch content including social campaigns, investor content, and announcement videos to maximize impact.",
      },
    ],
  },
];

const quickFacts: { label: string; lane: PalAccent; glyph: GlyphName }[] = [
  { label: "One shoot can create months of useful content.", lane: "reel", glyph: "reel" },
  { label: "Packages flex around goals, scope, and budget.", lane: "system", glyph: "cart" },
  { label: "You own the final content after payment.", lane: "evergreen", glyph: "shield" },
  { label: "A strategy call maps the right place to start.", lane: "spotlight", glyph: "chat" },
];

const nextResources: {
  to: string;
  label: string;
  body: string;
  lane: PalAccent;
  glyph: GlyphName;
}[] = [
  {
    to: "/production-pricing",
    label: "Build a package",
    body: "See scope, options, and working estimates.",
    lane: "spotlight",
    glyph: "cart",
  },
  {
    to: "/video-system-assessment",
    label: "Assess your system",
    body: "Get a readiness score and Pal recommendation.",
    lane: "system",
    glyph: "search",
  },
  {
    to: "/production-guide",
    label: "Prep for shoot day",
    body: "Use the wardrobe, location, and logistics guide.",
    lane: "reel",
    glyph: "camera",
  },
];

const slug = (value: string) => value.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");

function FaqPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Clear answers."
        highlight="No production fog."
        subtitle="Start here for direct answers about video systems, packages, ownership, results, and what happens after you book."
        ctas={false}
        lane="system"
        visual={<Scene name="faqHelp" priority tags={["Pricing", "Ownership", "Process"]} />}
      />

      <Section
        eyebrow="Jump to an answer"
        title="Everything most teams ask before production."
        subtitle="Browse by topic. Expand only the questions you need, and use the related links when you are ready to take the next step."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-[1.5rem] p-4"
              style={{ background: laneVar(item.lane, "-soft") }}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-[1.25rem] bg-white shadow-sm">
                <Glyph name={item.glyph} lane={item.lane} className="size-8" />
              </span>
              <p className="text-sm font-bold leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
        <nav
          aria-label="FAQ categories"
          className="mt-10 flex gap-2 overflow-x-auto pb-2 lg:flex-wrap lg:justify-center"
        >
          {groups.map((group) => (
            <a
              key={group.category}
              href={`#${slug(group.category)}`}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ background: laneVar(group.lane) }}
              />
              {group.category}
            </a>
          ))}
        </nav>
      </Section>

      {groups.map((group, index) => (
        <Section
          key={group.category}
          id={slug(group.category)}
          tone={index % 2 === 0 ? group.lane : "paper"}
          lane={group.lane}
          eyebrow={`${String(index + 1).padStart(2, "0")} · ${group.items.length} answers`}
          title={group.category}
          className="scroll-mt-28"
        >
          <div className="mb-8 flex justify-center">
            <span className="grid size-16 place-items-center rounded-[1.25rem] bg-white shadow-soft">
              <Glyph name={group.glyph} lane={group.lane} className="size-11" />
            </span>
          </div>
          <FaqList items={group.items} lane={group.lane} pal={group.pal} />
        </Section>
      ))}

      <Section
        tone="ink"
        eyebrow="Keep moving"
        title="Choose the next useful resource."
        align="left"
      >
        <div className="text-foreground">
          <CardGrid cols={3}>
            {nextResources.map((item) => (
              <Card
                key={item.to}
                title={item.label}
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
        title="Still have a question specific to your team?"
        subtitle="Bring us the goal, constraint, or half-formed idea. We’ll help you find the clearest next step."
        primaryLabel="Ask Palmer House"
        lane="system"
      />
    </PageShell>
  );
}
