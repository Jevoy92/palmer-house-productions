import mascot from "@/assets/mascot.jpg";
import { Marquee } from "./Marquee";

const ideas = [
  "Mythbuster",
  "Features",
  "Us vs Them",
  "Testimonials",
  "Best-sellers",
  "Media",
  "Negative Hook",
];
const ideas2 = [
  "FAQ",
  "Before & After",
  "Top X Reasons",
  "Problem-solution",
  "Statistics",
  "Notes",
  "What's Inside",
];

const businesses = ["Digital products", "Agencies", "SaaS", "Mobile apps", "Services"];

function Pill({ label }: { label: string }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-border bg-card px-6 py-3 text-base font-medium shadow-soft">
      {label}
    </span>
  );
}

export function ContentCalendar() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-gradient-brand text-sm font-semibold uppercase tracking-widest">
          Unlimited ads and social media post ideas
        </p>
        <h2 className="mt-4 max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)]">
          Fill out your content calendar, 3 months in advance
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          You rest. Holo doesn't. It works in the background to generate marketing visuals while you
          sleep. So you can swipe in the morning and launch just before lunch.
        </p>

        <div className="surface-card mt-10 grid items-center gap-8 p-8 sm:p-12 md:grid-cols-2">
          <img
            src={mascot}
            alt="Holo mascot swiping content ideas"
            width={1200}
            height={1200}
            loading="lazy"
            className="mx-auto w-56 mix-blend-multiply"
          />
          <div>
            <h3 className="text-2xl">Like Tinder, but for content.</h3>
            <p className="mt-3 text-muted-foreground">
              Swipe to skip, save, or generate what you like best.
            </p>
            <div className="mt-6 flex gap-3">
              <span className="grid size-12 place-items-center rounded-full border border-border bg-background text-lg">
                ✕
              </span>
              <span className="bg-gradient-brand grid size-12 place-items-center rounded-full text-lg text-primary-foreground shadow-glow">
                ♥
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="px-4 text-center text-2xl">1000's of available ideas</h3>
        <div className="mt-8 space-y-4">
          <Marquee duration="38s">
            {ideas.map((i) => (
              <Pill key={i} label={i} />
            ))}
          </Marquee>
          <Marquee duration="44s" reverse>
            {ideas2.map((i) => (
              <Pill key={i} label={i} />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-4">
        <h2 className="text-center text-[clamp(1.9rem,4.5vw,3rem)]">Works for any business type</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {businesses.map((b) => (
            <Pill key={b} label={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
