import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CollectionShell } from "@/components/collection/CollectionShell";
import { PAL_GROUPS, computeItemPrice, type PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const GOALS: { lane: PalAccent; title: string; description: string; packageId: string }[] = [
  {
    lane: "reel",
    title: "Get seen more often",
    description: "Short-form content for your business.",
    packageId: "social-content",
  },
  {
    lane: "spotlight",
    title: "Help buyers trust you",
    description: "Commercials, demonstrations, and real stories.",
    packageId: "commercials",
  },
  {
    lane: "system",
    title: "Stop repeating yourself",
    description: "Onboarding, training, and clear processes.",
    packageId: "onboarding",
  },
  {
    lane: "evergreen",
    title: "Share your expertise",
    description: "Long-form answers that keep working.",
    packageId: "educational-videos",
  },
];

function FindYourPalPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [lane, setLane] = useState<PalAccent>("reel");
  const [scope, setScope] = useState<"focused" | "larger">("focused");
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const goal = GOALS.find((candidate) => candidate.lane === lane)!;
  const group = PAL_GROUPS.find((candidate) => candidate.id === lane)!;
  const item =
    group.items.find((candidate) => candidate.id === goal.packageId) ??
    group.items.find((candidate) => candidate.recommended) ??
    group.items[0];
  const editable = item.editable;
  const focusedCount = lane === "evergreen" ? 0 : (editable?.defaultCount ?? 1);
  const largerCount =
    lane === "evergreen"
      ? 1
      : Math.min(editable?.max ?? focusedCount, focusedCount + 2 * (editable?.step ?? 1));
  const count = scope === "focused" ? focusedCount : largerCount;
  const scopeLabel = (value: number) =>
    lane === "evergreen"
      ? `One ${5 + value * 5}-minute episode`
      : `${value} ${editable?.unitLabelPlural ?? "finished videos"}`;
  const price = computeItemPrice(item, count);
  const money = (value: number) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    mounted.current = true;
  }, [step]);

  return (
    <CollectionShell
      active="products"
      footer={
        step === 1 ? (
          <button className="pc-primary" onClick={() => setStep(2)}>
            Next: choose scope <ArrowRight size={18} />
          </button>
        ) : (
          <Link
            className="pc-primary"
            to="/packages/$packageId"
            params={{ packageId: item.id }}
            search={{ count }}
          >
            View {item.name} <ArrowRight size={18} />
          </Link>
        )
      }
    >
      <section className="pc-guide" data-lane={lane}>
        <p className="pc-eyebrow">Find your starting point · {step} of 2</p>
        <h1 ref={heading} tabIndex={-1} className="pc-heading">
          {step === 1
            ? "What should video do for your business?"
            : "How much do you want to start with?"}
        </h1>
        <p className="pc-muted">
          {step === 1
            ? "Two quick choices. A package and a starting price."
            : "Choose a starting scope. You can adjust it on the package page."}
        </p>
        {step === 1 ? (
          <fieldset className="pc-guide-choices">
            <legend className="sr-only">Choose the goal for your video</legend>
            {GOALS.map((choice) => (
              <label
                key={choice.lane}
                className="pc-choice"
                data-lane={choice.lane}
                data-selected={lane === choice.lane}
              >
                <img src={`/packages/lanes/${choice.lane}.png`} width={64} height={64} alt="" />
                <span>
                  <strong>{choice.title}</strong>
                  <small>{choice.description}</small>
                </span>
                <input
                  type="radio"
                  name="video-goal"
                  value={choice.lane}
                  checked={lane === choice.lane}
                  onChange={() => setLane(choice.lane)}
                />
              </label>
            ))}
          </fieldset>
        ) : (
          <>
            <fieldset className="pc-guide-choices">
              <legend className="sr-only">Choose your starting scope</legend>
              <label className="pc-choice" data-selected={scope === "focused"}>
                <span>
                  <strong>A focused start</strong>
                  <small>
                    {scopeLabel(focusedCount)} · {money(computeItemPrice(item, focusedCount))}
                  </small>
                </span>
                <input
                  type="radio"
                  name="video-scope"
                  value="focused"
                  checked={scope === "focused"}
                  onChange={() => setScope("focused")}
                />
              </label>
              <label className="pc-choice" data-selected={scope === "larger"}>
                <span>
                  <strong>More room to explore</strong>
                  <small>
                    {scopeLabel(largerCount)} · {money(computeItemPrice(item, largerCount))}
                  </small>
                </span>
                <input
                  type="radio"
                  name="video-scope"
                  value="larger"
                  checked={scope === "larger"}
                  onChange={() => setScope("larger")}
                />
              </label>
            </fieldset>
            <div className="pc-guide-result" aria-live="polite" aria-atomic="true">
              <p className="pc-eyebrow">Your starting point · {group.role}</p>
              <h2>{item.name}</h2>
              <p className="pc-muted">{item.description}</p>
              <p>
                <strong>{money(price)}</strong>{" "}
                <span className="pc-muted">· {scopeLabel(count)}</span>
              </p>
              <p className="pc-muted">We confirm the final scope before payment.</p>
            </div>
            <button className="pc-secondary" onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Change goal
            </button>
          </>
        )}
        <Link className="pc-guide-browse" to="/shop" search={step === 2 ? { lane } : {}}>
          {step === 1 ? "Browse all packages instead" : `See all ${group.role} packages`}{" "}
          <ArrowRight size={16} />
        </Link>
      </section>
    </CollectionShell>
  );
}

export const Route = createFileRoute("/find-your-pal")({
  head: () => ({
    ...createSeo({
      title: "Find Your Pal | Palmer House Productions",
      description:
        "Choose your video goal and starting scope to find a Palmer House package, see its price, and explore an example.",
      pathname: "/find-your-pal",
    }),
  }),
  component: FindYourPalPage,
});
