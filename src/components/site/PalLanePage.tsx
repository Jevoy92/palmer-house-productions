import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useMemo } from "react";
import {
  CtaBand,
  Eyebrow,
  FaqList,
  IncludedPanel,
  InView,
  PageHero,
  PageShell,
  Section,
} from "./PageShell";
import { StatBand, type Stat } from "./PalVisuals";
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
    faqs: { q: string; a: string }[];
  }
> = {
  reel: {
    eyebrow: "Reel Pal · Get Seen",
    title: "Social videos.",
    highlight: "Something worth sharing.",
    subtitle:
      "Short social videos with a clear point, a strong opening, and room for your personality. Our crew helps you plan, film, and edit them.",
    problemTitle: "Choose your starting package.",
    outputs: ["15–90s reels", "Hook variations", "Caption-ready cuts"],
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
    title: "Show your work.",
    highlight: "Let people see the difference.",
    subtitle:
      "Show the people, products, and work behind your business. Our crew produces commercials, product demos, customer stories, and employee spotlights.",
    problemTitle: "Choose the story you want to tell.",
    outputs: ["Commercials", "Product demos", "Customer & employee stories"],
    faqs: [
      {
        q: "What makes Spotlight different from a Reel package?",
        a: "Spotlight packages center on a product, customer, employee, or offer. Social Content focuses on shorter videos for your channels. We agree the formats and finish in your scope.",
      },
      {
        q: "Can a Spotlight shoot also create short clips?",
        a: "Yes. Add finished social videos to the scope and the shared footage can support both trust and visibility.",
      },
    ],
  },
  evergreen: {
    eyebrow: "Evergreen Pal · Explain Clearly",
    title: "Good questions.",
    highlight: "Answers worth keeping.",
    subtitle:
      "Give your expertise the time it needs. Our crew turns your explanation into an educational video customers can watch and return to.",
    problemTitle: "Choose the explanation that should keep working.",
    outputs: ["5–15 min episodes", "Web explainers", "Your expertise"],
    faqs: [
      {
        q: "Why is Evergreen priced differently?",
        a: "An educational episode gives one explanation more room. It uses length-based episode pricing, including filming and editing, rather than session-plus-video pricing.",
      },
      {
        q: "Can long-form episodes become short clips?",
        a: "Yes. We can quote additional short edits from the agreed footage. Tell us which channels and formats you need.",
      },
    ],
  },
  system: {
    eyebrow: "System Pal · Train & Scale",
    title: "Show the steps.",
    highlight: "Help people get it right.",
    subtitle:
      "Help new hires, customers, and teammates follow the same clear steps. Our crew films onboarding, safety training, sales training, and video SOPs.",
    problemTitle: "Choose what your team needs to learn.",
    outputs: ["Onboarding", "Video SOPs", "Training videos"],
    faqs: [
      {
        q: "Where can our team host the finished videos?",
        a: "Use the video files in your existing knowledge or learning tools. Tell us how you plan to host them so we can agree the formats and handoff; hosting and platform setup are confirmed separately.",
      },
      {
        q: "Can you film at our workplace?",
        a: "Yes. On-location production is often the clearest way to document real tools, spaces, and processes.",
      },
    ],
  },
};

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
  const [, secondPal] = laneInfo.pals;
  const otherLanes = LANES.filter((lane) => lane.id !== accent);

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
        primary={{ label: "Browse these packages", to: "/shop", search: { lane: accent } }}
        secondary={{ label: "See production pricing", to: "/production-pricing" }}
      />

      <Section eyebrow="Packages" title={copy.problemTitle} lane={accent}>
        <div
          className={`grid gap-5 ${group.items.length === 1 ? "mx-auto max-w-2xl" : "md:grid-cols-2"}`}
        >
          {group.items.map((item, index) => {
            const oneTime = computeItemPrice(item);
            const included = getIncluded(item, group);
            return (
              <InView key={item.id} delay={(index % 3) * 0.05} className="h-full">
                <article className="surface-card relative flex h-full flex-col overflow-hidden">
                  <div className="relative flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: laneVar(accent, "-text") }}
                      >
                        Package {String(index + 1).padStart(2, "0")}
                      </p>
                      <img
                        src={item.icon}
                        alt=""
                        className="size-14 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
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
                            Working estimate · scope confirmed before payment
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
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/shop" search={{ lane: accent }} className="secondary-action">
            Browse {group.role} packages <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Pricing, plainly"
        title={
          accent === "evergreen"
            ? "One episode. Room for the detail."
            : "One session, plus your finished videos."
        }
        subtitle={
          accent === "evergreen"
            ? "Educational episodes use length-based pricing, with filming and editing included."
            : "A filming session plus the finished videos you choose. We confirm scope, tax, and travel in your quote."
        }
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

      <Section
        eyebrow="Your guides"
        title={`Meet ${group.palName}.`}
        subtitle="Our Pals are creative guides and AI assistants in Studio. They bring different perspectives; Palmer House’s human crew delivers the production."
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
                  <p className="mt-4 text-sm font-semibold">“{pal.persona.firstQuestion}”</p>
                </div>
              </article>
            </InView>
          ))}
        </div>
      </Section>

      <Section eyebrow="Another direction?" title="You can combine different kinds of video.">
        <div className="flex flex-wrap justify-center gap-3">
          {otherLanes.map((lane) => (
            <Link key={lane.id} to={lane.to} className="secondary-action">
              {lane.problem} <ArrowRight className="size-4" />
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          We confirm what each idea needs and which packages can share a shoot. Prefer to develop
          the script yourself?{" "}
          <Link to="/membership" className="font-semibold underline underline-offset-4">
            Explore Studio.
          </Link>
        </p>
      </Section>

      <Section eyebrow="Questions" title="Before you choose" lane={accent}>
        <FaqList items={copy.faqs} lane={accent} pal={secondPal} />
      </Section>

      <CtaBand
        title="Choose the package. Make it your own."
        subtitle="See an example, adjust the scope, and review your estimate. Our team confirms the final plan before payment."
        primaryLabel="Browse video packages"
        primaryTo="/shop"
        secondaryLabel="Talk to our team"
        secondaryTo="/contact"
        secondarySearch={{ intent: "production" }}
        lane={accent}
      />
    </PageShell>
  );
}
