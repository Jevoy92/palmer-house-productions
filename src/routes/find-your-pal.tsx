import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Moon, Search, ShoppingBag, Sun } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import clara from "@/assets/pal-headshots/clara.png";
import cyrus from "@/assets/pal-headshots/cyrus.png";
import kareem from "@/assets/pal-headshots/kareem.png";
import kiana from "@/assets/pal-headshots/kiana.png";
import raquel from "@/assets/pal-headshots/raquel.png";
import ryder from "@/assets/pal-headshots/ryder.png";
import samira from "@/assets/pal-headshots/samira.png";
import silas from "@/assets/pal-headshots/silas.png";
import guidedLanes from "@/assets/studio-visuals/guided-lanes.png";
import { cartStore, useCart } from "@/lib/cart-store";
import { PAL_LANES, recommendLane, type PalLane } from "@/lib/dream-suite";
import { PAL_GROUPS } from "@/lib/pricing-catalog";

const QUICK_PROBLEMS = [
  "Nobody understands what we do",
  "I am tired of repeating myself",
  "Our content feels random",
  "We look smaller than we are",
  "Our team needs better training",
  "I freeze when the camera starts",
];

const headshots: Record<string, string> = {
  clara,
  cyrus,
  kareem,
  kiana,
  raquel,
  ryder,
  samira,
  silas,
};

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
              className={`relative overflow-hidden rounded-[2.5rem] border ${night ? "border-white/15 bg-ink" : "border-border bg-white"}`}
            >
              <motion.img
                src={guidedLanes}
                alt="A business owner choosing among four guided Palmer House solution paths"
                className={`size-full min-h-[30rem] object-cover transition-opacity ${night ? "opacity-75" : "opacity-100"}`}
                animate={
                  reduced ? undefined : { transform: ["scale(1)", "scale(1.018)", "scale(1)"] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <p
                className={`absolute inset-x-6 bottom-5 rounded-2xl p-4 text-center font-mono text-[9px] uppercase tracking-[0.16em] ${night ? "bg-ink/85 text-white/70" : "bg-white/90 text-muted-foreground"}`}
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
        {result && (
          <motion.section
            key={result.key}
            initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="px-4 py-16"
            style={{ background: result.soft }}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex justify-center gap-2">
                {result.people.map((person) => (
                  <div key={person.name} className="text-center">
                    <img
                      src={headshots[person.name.toLowerCase()] || person.image}
                      alt={person.name}
                      className="mx-auto size-40 rounded-[2rem] object-cover sm:size-48"
                    />
                    <p className="font-semibold">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                ))}
              </div>
              <div>
                <p
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: result.color }}
                >
                  Your strongest match · {result.label}
                </p>
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

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold sm:text-5xl">
            Or browse all four transformations.
          </h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {PAL_LANES.map((lane) => {
              const group = PAL_GROUPS.find((candidate) => candidate.id === lane.key);
              return (
                <Link
                  key={lane.key}
                  to={lane.path}
                  className="group grid min-h-28 items-center gap-4 py-5 sm:grid-cols-[10rem_1fr_auto]"
                >
                  <span
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: lane.color }}
                  >
                    {lane.label}
                  </span>
                  <span>
                    <span className="block text-xl font-bold">{lane.problem}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{group?.pitch}</span>
                  </span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/find-your-pal")({
  head: () => ({
    meta: [
      { title: "Find Your Pal | Palmer House Productions" },
      {
        name: "description",
        content:
          "Describe the business problem you keep facing and get a problem-first Palmer House Pal recommendation.",
      },
    ],
  }),
  component: FindYourPalPage,
});
