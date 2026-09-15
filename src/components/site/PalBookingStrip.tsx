import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import clara from "@/assets/pal-portraits/clara.webp";
import cyrus from "@/assets/pal-portraits/cyrus.webp";
import kareem from "@/assets/pal-portraits/kareem.webp";
import kiana from "@/assets/pal-portraits/kiana.webp";
import raquel from "@/assets/pal-portraits/raquel.webp";
import ryder from "@/assets/pal-portraits/ryder.webp";
import samira from "@/assets/pal-portraits/samira.webp";
import silas from "@/assets/pal-portraits/silas.webp";
import { cn } from "@/lib/utils";

export type PalLane = "all" | "reel" | "spotlight" | "evergreen" | "system";

const pals = [
  {
    name: "Kiana",
    role: "Story and presence",
    lane: "spotlight",
    image: kiana,
    to: "/spotlight-pal",
    tone: "bg-spotlight-soft",
  },
  {
    name: "Kareem",
    role: "Production quality",
    lane: "spotlight",
    image: kareem,
    to: "/spotlight-pal",
    tone: "bg-spotlight-soft",
  },
  {
    name: "Ryder",
    role: "Hooks and momentum",
    lane: "reel",
    image: ryder,
    to: "/reel-pal",
    tone: "bg-reel-soft",
  },
  {
    name: "Raquel",
    role: "Retention and connection",
    lane: "reel",
    image: raquel,
    to: "/reel-pal",
    tone: "bg-reel-soft",
  },
  {
    name: "Clara",
    role: "Clarity and structure",
    lane: "evergreen",
    image: clara,
    to: "/evergreen-pal",
    tone: "bg-evergreen-soft",
  },
  {
    name: "Cyrus",
    role: "Authority strategy",
    lane: "evergreen",
    image: cyrus,
    to: "/evergreen-pal",
    tone: "bg-evergreen-soft",
  },
  {
    name: "Silas",
    role: "Workflow and scale",
    lane: "system",
    image: silas,
    to: "/system-pal",
    tone: "bg-system-soft",
  },
  {
    name: "Samira",
    role: "Knowledge and onboarding",
    lane: "system",
    image: samira,
    to: "/system-pal",
    tone: "bg-system-soft",
  },
] as const;

const lanes = [
  {
    id: "all",
    label: "All Problems",
    description: "Meet every specialist and start with the problem that is slowing you down.",
  },
  {
    id: "reel",
    label: "Get Seen",
    description:
      "Build visibility with short-form hooks, retention, and a repeatable content rhythm.",
  },
  {
    id: "spotlight",
    label: "Build Trust",
    description: "Turn your story, expertise, and production quality into proof people can feel.",
  },
  {
    id: "evergreen",
    label: "Explain Clearly",
    description: "Answer important questions once with structured videos that keep working.",
  },
  {
    id: "system",
    label: "Train & Scale",
    description: "Capture onboarding, training, and workflows so knowledge stops living in heads.",
  },
] as const;

function LaneIcon({ lane, className }: { lane: PalLane; className?: string }) {
  if (lane === "all") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        <circle cx="16" cy="8" r="2.5" fill="currentColor" />
        <circle cx="8" cy="16" r="2.5" fill="currentColor" />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      </svg>
    );
  }
  if (lane === "reel") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <rect x="6.5" y="3" width="11" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="m10.5 9 5 3-5 3V9Z" fill="currentColor" />
      </svg>
    );
  }
  if (lane === "spotlight") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (lane === "evergreen") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
        <path
          d="M4.5 5.5c3-.8 5.5-.1 7.5 2v11c-2-2.1-4.5-2.8-7.5-2V5.5Zm15 0c-3-.8-5.5-.1-7.5 2v11c2-2.1 4.5-2.8 7.5-2V5.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5v4m0 0-6 4m6-4 6 4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function PalBookingStrip({
  lane: controlledLane,
  onLaneChange,
  query = "",
  embedded = false,
}: {
  lane?: PalLane;
  onLaneChange?: (lane: PalLane) => void;
  query?: string;
  embedded?: boolean;
}) {
  const [internalLane, setInternalLane] = useState<PalLane>("all");
  const lane = controlledLane ?? internalLane;
  const activeLane = lanes.find((item) => item.id === lane) ?? lanes[0];
  const visiblePals = useMemo(() => {
    const byLane = lane === "all" ? pals : pals.filter((pal) => pal.lane === lane);
    const needle = query.trim().toLowerCase();
    if (!needle) return byLane;
    return byLane.filter(
      (pal) =>
        pal.name.toLowerCase().includes(needle) ||
        pal.role.toLowerCase().includes(needle) ||
        pal.lane.includes(needle),
    );
  }, [lane, query]);

  function chooseLane(next: PalLane) {
    if (controlledLane === undefined) setInternalLane(next);
    onLaneChange?.(next);
  }

  return (
    <section
      id="pals"
      className={cn(
        embedded
          ? "pb-14 pt-16 sm:pb-20 sm:pt-20"
          : "mx-auto mt-24 max-w-7xl px-4 sm:mt-32 sm:px-6",
      )}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <h2 className="max-w-[22ch] text-[clamp(2.45rem,5vw,4.5rem)] font-extrabold leading-[0.92] tracking-[-0.06em] text-ink">
            Book a Pal for the problem you&apos;re actually trying to solve
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Choose the outcome you need. Each problem maps to the two Pals built to solve it.
          </p>
        </div>
        <Link
          to="/find-your-pal"
          className="hidden min-h-11 shrink-0 items-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink underline underline-offset-4 sm:inline-flex"
        >
          Need help choosing? →
        </Link>
      </div>

      <div
        className="mt-7 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Choose the problem you want to solve"
      >
        {lanes.map((item) => {
          const selected = lane === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`pal-tab-${item.id}`}
              onClick={() => chooseLane(item.id)}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const currentIndex = lanes.findIndex((candidate) => candidate.id === item.id);
                const nextIndex =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? lanes.length - 1
                      : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + lanes.length) %
                        lanes.length;
                chooseLane(lanes[nextIndex].id);
                event.currentTarget.parentElement
                  ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                  [nextIndex]?.focus();
              }}
              aria-selected={selected}
              aria-controls="pal-results"
              tabIndex={selected ? 0 : -1}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-2.5 pr-4 text-sm font-semibold transition duration-200",
                selected
                  ? "border-ink bg-ink text-white shadow-sm"
                  : "border-border bg-white text-ink hover:-translate-y-0.5 hover:border-ink/25 hover:bg-secondary",
              )}
            >
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full",
                  selected
                    ? "bg-white/15"
                    : item.id === "reel"
                      ? "bg-reel-soft text-reel"
                      : item.id === "spotlight"
                        ? "bg-spotlight-soft text-spotlight"
                        : item.id === "evergreen"
                          ? "bg-evergreen-soft text-evergreen"
                          : item.id === "system"
                            ? "bg-system-soft text-system"
                            : "bg-secondary",
                )}
              >
                <LaneIcon lane={item.id} className="size-4" />
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex min-h-7 items-center gap-2" aria-live="polite">
        <span
          aria-hidden
          className={cn(
            "size-2 shrink-0 rounded-full",
            lane === "reel"
              ? "bg-reel"
              : lane === "spotlight"
                ? "bg-spotlight"
                : lane === "evergreen"
                  ? "bg-evergreen"
                  : lane === "system"
                    ? "bg-system"
                    : "bg-ink",
          )}
        />
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {activeLane.description}
        </p>
      </div>

      <div
        id="pal-results"
        role="tabpanel"
        aria-labelledby={`pal-tab-${lane}`}
        tabIndex={0}
        className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {visiblePals.map((pal) => (
          <Link
            key={pal.name}
            to={pal.to}
            className="group w-[10.5rem] shrink-0 snap-start sm:w-[11.5rem] lg:w-[12rem]"
          >
            <div
              className={cn(
                "relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-black/[0.05]",
                pal.tone,
              )}
            >
              <img
                src={pal.image}
                alt={`${pal.name}, ${pal.role}`}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
              />
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-extrabold leading-none tracking-[-0.03em] text-ink">
                  {pal.name}
                </p>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{pal.role}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visiblePals.length === 0 && (
        <p className="py-10 text-sm text-muted-foreground">
          No Pal matches “{query}”. Try get seen, build trust, explain clearly, train and scale, or
          a Pal name.
        </p>
      )}
    </section>
  );
}
