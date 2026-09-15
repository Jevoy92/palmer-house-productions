import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useMemo } from "react";
import {
  Card,
  CardGrid,
  CtaBand,
  Eyebrow,
  FaqList,
  IncludedPanel,
  InView,
  PageHero,
  PageShell,
  Section,
} from "./PageShell";
import { PalCallout, ProcessTimeline, StatBand, type Stat } from "./PalVisuals";
import { GlyphBadge, type GlyphName } from "./Glyphs";
import { MissionComparison } from "./MissionComparison";
import { monthlyPrice } from "@/lib/cart-store";
import { palList } from "@/lib/pal-directory";
import { LANES, PAL_PORTRAITS, laneById, laneVar } from "@/lib/pal-lanes";
import {
  BASE_INCLUDED,
  EVERGREEN_LENGTH_PRICE,
  PAL_GROUPS,
  FINISHED_VIDEO_PRICE,
  SESSION_PRICE,
  computeItemPrice,
  getIncluded,
  type PalAccent,
} from "@/lib/pricing-catalog";

const laneCopy: Record<
  PalAccent,
  {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    problemTitle: string;
    outputs: string[];
    outputGlyphs: [GlyphName, GlyphName, GlyphName];
    outputBodies: [string, string, string];
    process: [string, string, string, string];
    faqs: { q: string; a: string }[];
  }
> = {
  reel: {
    eyebrow: "Reel Pal · Get Seen",
    title: "Turn one clear idea into",
    highlight: "repeatable momentum.",
    subtitle:
      "Ryder and Raquel build short-form systems that earn attention, hold it, and give your team a reliable publishing rhythm.",
    problemTitle: "Choose the visibility problem that sounds familiar.",
    outputs: ["15–90s reels", "Hook variations", "Caption-ready cuts"],
    outputGlyphs: ["reel", "spark", "edit"],
    outputBodies: [
      "Platform-native short videos cut for the first two seconds and built to publish on a rhythm.",
      "Several openers from one filming block so you can test what stops the scroll.",
      "Framing and delivery formats agreed in scope, with edits prepared for the channels you choose.",
    ],
    process: [
      "Pick the one point of view the reels should keep repeating.",
      "Plan hooks, talking points, and the questions your audience keeps asking.",
      "Two focused hours on set with teleprompter, direction, and momentum.",
      "Edited, captioned, split into cuts, and organized to publish this week.",
    ],
    faqs: [
      {
        q: "Can I choose how many social videos we make?",
        a: "Yes. Choose the number of finished videos on the package page. We agree on length, framing, and topics before filming.",
      },
      {
        q: "Do you help with hooks and scripts?",
        a: "Yes. Every production includes script and talking-point help, teleprompter support, wardrobe guidance, and on-set direction.",
      },
    ],
  },
  spotlight: {
    eyebrow: "Spotlight Pal · Build Trust",
    title: "Make the first impression feel",
    highlight: "as credible as the work.",
    subtitle:
      "Kareem and Kiana create commercials, product demos, customer stories, and employee spotlights that make quality visible before a sales call.",
    problemTitle: "Choose the trust gap you need to close.",
    outputs: ["Commercials", "Product demos", "Customer & employee stories"],
    outputGlyphs: ["mic", "handshake", "camera"],
    outputBodies: [
      "A clear offer and reason to act, built around the people you want to reach.",
      "A practical demonstration of what your product does and how someone uses it.",
      "Real customers and employees sharing their experience in their own words.",
    ],
    process: [
      "Find the story a first-time visitor should meet before anything else.",
      "Lock the interview plan, b-roll list, wardrobe, and location for production day.",
      "Cinematic camera, lighting, and audio with direction that keeps people natural.",
      "Color, sound, and story edit delivered ready for your site and sales process.",
    ],
    faqs: [
      {
        q: "What makes Spotlight different from a Reel package?",
        a: "Spotlight prioritizes story, production polish, b-roll, and trust. Reel prioritizes publishing velocity and platform-native short-form delivery.",
      },
      {
        q: "Can a Spotlight shoot also create short clips?",
        a: "Yes. Add finished social videos to the scope and the shared footage can support both trust and visibility.",
      },
    ],
  },
  evergreen: {
    eyebrow: "Evergreen Pal · Explain Clearly",
    title: "Answer the important question",
    highlight: "once—and keep earning.",
    subtitle:
      "Cyrus and Clara turn complex expertise into structured long-form videos that educate buyers, build authority, and reduce repeated explanations.",
    problemTitle: "Choose the explanation that should keep working.",
    outputs: ["5–15 min episodes", "Web explainers", "Repurpose-ready masters"],
    outputGlyphs: ["play", "bulb", "layers"],
    outputBodies: [
      "Structured long-form answers to the questions buyers ask before they trust you.",
      "Pricing, process, and offer explainers that shorten sales calls and support search.",
      "Long-form masters planned so clips, articles, and posts can be pulled later.",
    ],
    process: [
      "Pick the question you answer most and make it permanent.",
      "Outline the episode structure, examples, and the reasoning behind each claim.",
      "Longer production coverage with teleprompter support and clear direction.",
      "A deeper edit, chaptered and organized for web, YouTube, and repurposing.",
    ],
    faqs: [
      {
        q: "Why is Evergreen priced differently?",
        a: "Long-form work requires deeper narrative planning, longer production coverage, and a more involved edit. It uses episode pricing rather than session-plus-video pricing.",
      },
      {
        q: "Can long-form episodes become short clips?",
        a: "Yes. Repurposed edits turn the long-form master into platform-native clips without rebuilding the story from scratch.",
      },
    ],
  },
  system: {
    eyebrow: "System Pal · Train & Scale",
    title: "Move repeated knowledge out of",
    highlight: "people’s heads.",
    subtitle:
      "Silas and Samira create onboarding, safety training, sales training, and video SOPs that make important knowledge easier to find and reuse.",
    problemTitle: "Choose the repeat loop your team needs to remove.",
    outputs: ["Onboarding", "SOP walkthroughs", "Training libraries"],
    outputGlyphs: ["handshake", "workflow", "library"],
    outputBodies: [
      "Welcome and first-week videos so new hires and new clients hear the same clear answer.",
      "Real tools, real spaces, and real steps documented once instead of explained weekly.",
      "An organized library your team can search, delivered into the tools you already use.",
    ],
    process: [
      "List the explanations your team repeats and rank them by time saved.",
      "Map the workflow, script the steps in order, and confirm on-site access.",
      "Film at your workplace so the tools, spaces, and processes are the real ones.",
      "Clear, chaptered edits organized for Notion, Loom, drives, or your LMS.",
    ],
    faqs: [
      {
        q: "Where can our team host the finished videos?",
        a: "We organize delivery for the tools you already use, including Notion, Loom, internal drives, and learning-management systems.",
      },
      {
        q: "Can you film at our workplace?",
        a: "Yes. On-location production is often the clearest way to document real tools, spaces, and processes.",
      },
    ],
  },
};

const PROCESS_TITLES = [
  "Name the problem",
  "Plan the package",
  "Production day",
  "Polished delivery",
];

function groupPackageCount(accent: PalAccent) {
  return PAL_GROUPS.find((group) => group.id === accent)?.items.length ?? 0;
}

function laneStats(accent: PalAccent): Stat[] {
  if (accent === "evergreen") {
    return [
      {
        value: EVERGREEN_LENGTH_PRICE[5],
        prefix: "$",
        label: "5-minute evergreen episode",
        lane: "evergreen",
      },
      {
        value: EVERGREEN_LENGTH_PRICE[10],
        prefix: "$",
        label: "10-minute evergreen episode",
        lane: "evergreen",
      },
      {
        value: EVERGREEN_LENGTH_PRICE[15],
        prefix: "$",
        label: "15-minute evergreen episode",
        lane: "evergreen",
      },
      { value: 2, suffix: " hrs", label: "on-location filming per session", lane: accent },
    ];
  }
  return [
    { value: SESSION_PRICE, prefix: "$", label: "per production session", lane: accent },
    { value: 2, suffix: " hrs", label: "on-location filming per session", lane: accent },
    { value: FINISHED_VIDEO_PRICE, prefix: "$", label: "per finished video", lane: accent },
    {
      value: groupPackageCount(accent),
      label: groupPackageCount(accent) === 1 ? "package in this lane" : "packages in this lane",
      lane: accent,
    },
  ];
}

export function PalLanePage({ accent }: { accent: PalAccent }) {
  const group = PAL_GROUPS.find((candidate) => candidate.id === accent)!;
  const copy = laneCopy[accent];
  const laneInfo = laneById[accent];
  const pals = useMemo(() => palList.filter((pal) => pal.lane === accent), [accent]);
  const [leadPal, secondPal] = laneInfo.pals;
  const otherLanes = LANES.filter((lane) => lane.id !== accent);

  const processSteps = copy.process.map((body, i) => ({
    title: PROCESS_TITLES[i],
    body,
    pal: i % 2 === 0 ? leadPal : secondPal,
    lane: accent,
  }));

  return (
    <PageShell>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        highlight={copy.highlight}
        subtitle={copy.subtitle}
        lane={accent}
        pal={accent}
        palTags={copy.outputs}
      />

      <Section
        eyebrow="Your guides"
        title={`${group.palName} work as a pair.`}
        subtitle={laneInfo.promise}
        lane={accent}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {pals.map((pal, index) => (
            <InView key={pal.key} delay={index * 0.08}>
              <article className="surface-card grid min-h-72 grid-cols-[8rem_1fr] overflow-hidden sm:grid-cols-[12rem_1fr]">
                <div
                  className="relative flex items-end overflow-hidden"
                  style={{ background: laneVar(accent, "-soft") }}
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[14%] aspect-square w-[78%] -translate-x-1/2 rounded-full"
                    style={{ background: `color-mix(in srgb, ${laneVar(accent)} 20%, white)` }}
                  />
                  <img
                    src={PAL_PORTRAITS[pal.key]}
                    alt={`${pal.name}, ${pal.role}`}
                    className="relative h-full w-full object-contain object-bottom"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <Eyebrow lane={accent}>{pal.role}</Eyebrow>
                  <h3 className="mt-4 text-3xl font-extrabold">{pal.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {pal.intro}
                  </p>
                </div>
              </article>
            </InView>
          ))}
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="What this lane produces"
        title={`Three outputs ${group.palName} plan every shoot around.`}
        subtitle="Each deliverable is designed for the job the video needs to do, then organized so your team can publish or share it immediately."
        lane={accent}
      >
        <CardGrid cols={3}>
          {copy.outputs.map((output, i) => (
            <Card
              key={output}
              lane={accent}
              glyph={copy.outputGlyphs[i]}
              index={String(i + 1).padStart(2, "0")}
              title={output}
              body={copy.outputBodies[i]}
            />
          ))}
        </CardGrid>
        <div className="mt-10">
          <PalCallout
            pal={leadPal}
            quote={palList.find((pal) => pal.key === leadPal)?.intro ?? laneInfo.promise}
            action={{ label: "Not sure this is your lane? Find your Pal", to: "/find-your-pal" }}
          />
        </div>
      </Section>

      <Section eyebrow="Packages" title={copy.problemTitle} lane={accent}>
        <CardGrid cols={3}>
          {group.items.map((item, index) => {
            const oneTime = computeItemPrice(item);
            const included = getIncluded(item, group);
            return (
              <InView key={item.id} delay={(index % 3) * 0.05} className="h-full">
                <article className="surface-card relative flex h-full flex-col overflow-hidden">
                  <span
                    aria-hidden
                    className="absolute -right-12 -top-12 size-28 rounded-full"
                    style={{ background: laneVar(accent, "-soft") }}
                  />
                  <div className="h-2" style={{ background: laneVar(accent) }} aria-hidden />
                  <div className="relative flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: laneVar(accent, "-text") }}
                      >
                        Package {String(index + 1).padStart(2, "0")}
                      </p>
                      <GlyphBadge name={laneInfo.glyph} lane={accent} size="sm" />
                    </div>
                    <h3 className="mt-3 text-2xl font-extrabold">{item.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {included.slice(0, 3).map((line) => (
                        <li key={line} className="flex gap-2 text-sm">
                          <Check
                            className="mt-0.5 size-4 shrink-0"
                            style={{ color: laneVar(accent, "-text") }}
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-3xl font-extrabold">${oneTime.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">
                            or ${monthlyPrice(oneTime).toLocaleString()} monthly
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/packages/$packageId"
                        params={{ packageId: item.id }}
                        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4"
                        style={{ color: laneVar(accent, "-text") }}
                      >
                        View package and scope <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </InView>
            );
          })}
        </CardGrid>
        <div className="mt-8 flex justify-center">
          <Link to="/shop" search={{ lane: accent }} className="secondary-action">
            Browse {group.role} packages <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <Section
        tone={accent}
        eyebrow="How the lane works"
        title={`From the problem to a library, guided by ${group.palName}.`}
        subtitle="The business problem, audience, and deliverables are clear before production day."
      >
        <ProcessTimeline steps={processSteps} />
      </Section>

      <Section
        eyebrow="Pricing, plainly"
        title="One session. A usable library."
        subtitle="Every shoot is priced the same transparent way and includes the same production standard."
        lane={accent}
      >
        <StatBand stats={laneStats(accent)} />
        <div className="mt-12">
          <IncludedPanel
            title="Included in every production, one-time or monthly."
            items={BASE_INCLUDED}
            lane={accent}
            glyph={laneInfo.glyph}
          />
        </div>
      </Section>

      <MissionComparison />

      <Section
        tone="mist"
        eyebrow="Related lanes"
        title="Different problem? Different Pals."
        subtitle="Every lane uses the same session pricing, so footage from one shoot can support another when it makes sense."
        lane={accent}
      >
        <CardGrid cols={3}>
          {otherLanes.map((lane) => (
            <Card
              key={lane.id}
              lane={lane.id}
              glyph={lane.glyph}
              pal={lane.pals[0]}
              title={`${lane.label} · ${lane.problem}`}
              body={lane.promise}
              to={lane.to}
            />
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="Questions" title={`Before you book ${group.role}`} lane={accent}>
        <FaqList items={copy.faqs} lane={accent} pal={secondPal} />
      </Section>

      <CtaBand
        title={`Build your ${group.role} package with ${group.palName}.`}
        subtitle="Start with a proven package, then adjust the duration, cadence, and support around the problem you need to solve."
        primaryLabel="Book a Discovery Call"
        lane={accent}
      />
    </PageShell>
  );
}
