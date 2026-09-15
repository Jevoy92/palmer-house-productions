import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Moon, Search, ShoppingBag, Sun } from "lucide-react";
import { useState } from "react";
import { CtaBand, PageShell, Section } from "@/components/site/PageShell";
import { LaneTiles, PalCallout, PalCrew, PalRoster } from "@/components/site/PalVisuals";
import { Glyph } from "@/components/site/Glyphs";
import { createSeo } from "@/lib/seo";
import { cartStore, useCart } from "@/lib/cart-store";
import { PAL_LANES, recommendLane, type PalLane } from "@/lib/dream-suite";
import { palDirectory } from "@/lib/pal-directory";
import { PAL_HEADSHOTS, laneById, laneVar } from "@/lib/pal-lanes";
import { PAL_GROUPS } from "@/lib/pricing-catalog";
import type { PalName } from "@/lib/studio-model";

const QUICK_PROBLEMS = [
  "Nobody understands what we do",
  "I am tired of repeating myself",
  "Our content feels random",
  "We look smaller than we are",
  "Our team needs better training",
  "I freeze when the camera starts",
];

function isPalName(value: string): value is PalName {
  return value in palDirectory;
}

function FindYourPalPage() {
  const cart = useCart();
  const reduced = useReducedMotion();
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState<PalLane | null>(null);
  const [night, setNight] = useState(false);

  function solve(value = problem) {
    const clean = value.trim();
    if (!clean) return;
    setProblem(clean);
    setResult(recommendLane(clean));
  }

  const leadPal = result?.people[0]?.name.toLowerCase();
  const resultLane = result ? laneById[result.key] : null;

  return (
    <PageShell>
      <section
        className={`relative overflow-hidden px-4 pb-16 pt-14 transition-colors duration-500 ${night ? "bg-ink text-white" : "bg-white"}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setNight((value) => !value)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold ${night ? "border-white/25" : "border-border"}`}
              aria-pressed={night}
            >
              {night ? <Sun className="size-4" /> : <Moon className="size-4" />}{" "}
              {night ? "Day shift" : "Night shift"}
            </button>
          </div>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h1 className="max-w-[10ch] text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-7xl">
                Tell us what keeps happening.
              </h1>
              <p
                className={`mt-6 max-w-xl text-lg leading-relaxed ${night ? "text-white/65" : "text-muted-foreground"}`}
              >
                Start with the business problem. The Pals will point you toward the video system
                most likely to change it.
              </p>
              <div
                className={`mt-8 rounded-[2rem] border p-3 ${night ? "border-white/20 bg-white/10" : "border-border bg-secondary"}`}
              >
                <label htmlFor="pal-problem" className="sr-only">
                  Describe your business problem
                </label>
                <textarea
                  id="pal-problem"
                  value={problem}
                  onChange={(event) => setProblem(event.target.value)}
                  rows={3}
                  className={`w-full resize-none rounded-[1.35rem] border-0 p-4 text-base outline-none ${night ? "bg-white text-ink" : "bg-white"}`}
                  placeholder="Example: I keep explaining our process on every sales call…"
                />
                <button
                  type="button"
                  onClick={() => solve()}
                  className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-spotlight px-6 font-semibold text-white sm:w-auto"
                >
                  <Search className="size-4" /> Find my Pal
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {QUICK_PROBLEMS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => solve(item)}
                    className={`min-h-11 rounded-full border px-4 text-sm ${night ? "border-white/20 text-white/70" : "border-border text-muted-foreground"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`relative isolate overflow-hidden rounded-[2.5rem] border p-6 pt-12 ${night ? "border-white/15 bg-white/5" : "border-white/75 bg-spotlight-soft"}`}
            >
              <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-spotlight-text shadow-soft">
                8 Pals · 4 lanes
              </span>
              <PalCrew />
              <p
                className={`mt-4 rounded-2xl p-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] ${night ? "bg-ink/85 text-white/70" : "bg-white/90 text-muted-foreground"}`}
              >
                {night
                  ? "The guides rest. The system keeps working."
                  : "Your problem chooses the path. A Pal helps you walk it."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {result && resultLane && (
          <motion.section
            key={result.key}
            initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="px-4 py-16"
            style={{ background: result.soft }}
            aria-live="polite"
            aria-label="Your Pal recommendation"
          >
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex justify-center gap-4">
                  {result.people.map((person) => {
                    const key = person.name.toLowerCase();
                    return (
                      <div key={person.name} className="text-center">
                        <span
                          className="mx-auto grid size-40 place-items-center overflow-hidden rounded-[2rem] sm:size-48"
                          style={{
                            background: `color-mix(in srgb, ${laneVar(result.key)} 22%, white)`,
                          }}
                        >
                          <img
                            src={isPalName(key) ? PAL_HEADSHOTS[key] : person.image}
                            alt={person.name}
                            loading="lazy"
                            decoding="async"
                            className="size-full object-cover mix-blend-multiply"
                          />
                        </span>
                        <p className="mt-3 font-semibold">{person.name}</p>
                        <p className="text-xs text-muted-foreground">{person.role}</p>
                      </div>
                    );
                  })}
                </div>
                {leadPal && isPalName(leadPal) && (
                  <PalCallout
                    pal={leadPal}
                    quote={palDirectory[leadPal].intro}
                    compact
                    className="mt-8"
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <Glyph name={resultLane.glyph} lane={result.key} className="size-12" />
                  <p
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: laneVar(result.key, "-text") }}
                  >
                    Your strongest match · {result.label}
                  </p>
                </div>
                <h2 className="mt-4 text-4xl font-extrabold sm:text-6xl">{result.promise}</h2>
                <p className="mt-5 text-lg text-ink-soft">You said: “{problem}”</p>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  This is a starting recommendation, not a diagnosis. Explore the lane, add its
                  starter mission, or bring the problem to a strategy call.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={result.path}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white"
                  >
                    Meet {result.label} <ArrowRight className="size-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => cartStore.add(result.starterId)}
                    aria-pressed={Boolean(cart.selected[result.starterId])}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink px-6 font-semibold"
                  >
                    {cart.selected[result.starterId] ? (
                      <Check className="size-4" />
                    ) : (
                      <ShoppingBag className="size-4" />
                    )}{" "}
                    {cart.selected[result.starterId] ? "Added to plan" : "Add starter mission"}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Section
        tone="mist"
        eyebrow="Browse the lanes"
        title="Or browse all four transformations."
        subtitle="Each lane starts from a different business problem and pairs you with the two Pals built to solve it."
        lane="spotlight"
        align="left"
      >
        <LaneTiles ctaLabel="Meet" />
      </Section>

      <Section
        eyebrow="The specialists"
        title="Eight Pals. One problem-first system."
        subtitle="Whichever lane you land in, the production standard and session pricing stay the same."
        lane="evergreen"
      >
        <PalRoster />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="kiana"
            quote="Tell me what a video is supposed to change for your business and I can tell you which lane it belongs in — before we talk about cameras."
          />
          <PalCallout
            pal="samira"
            quote="New customers and new staff need the same clarity. Write down the answers you repeat — that is your knowledge base."
            action={{ label: "Explore System Pal", to: "/system-pal" }}
          />
        </div>
      </Section>

      <CtaBand
        title="Bring us the problem, not a shot list."
        subtitle="A short discovery call turns the recommendation into a scoped package with the right Pals attached."
        primaryLabel="Book a Discovery Call"
        secondaryLabel="Build Your Package"
        secondaryTo="/production-pricing"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/find-your-pal")({
  head: () => ({
    ...createSeo({
      title: "Find Your Pal | Palmer House Productions",
      description:
        "Describe the business problem you keep facing and get a problem-first Palmer House Pal recommendation.",
      pathname: "/find-your-pal",
    }),
  }),
  component: FindYourPalPage,
});
