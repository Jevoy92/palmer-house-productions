import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

const PRINCIPLES = [
  {
    n: "01",
    title: "AI should remove blank-page friction.",
    body: "Use it to structure options, surface patterns, and turn raw thinking into a draft you can challenge.",
  },
  {
    n: "02",
    title: "The human point of view stays in charge.",
    body: "A fast generic answer is not a brand. Your experience, judgment, proof, and delivery are the material.",
  },
  {
    n: "03",
    title: "Automation must tell the truth.",
    body: "No fake people, fake proof, fake live feeds, or invisible charges. The interface should say what is generated, stored, or sent.",
  },
  {
    n: "04",
    title: "Better systems create more room for craft.",
    body: "When planning, repurposing, and handoffs become repeatable, the team can spend its energy on direction and story.",
  },
];

function AiPovPage() {
  return (
    <PageShell>
      <section className="px-4 pb-16 pt-14">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-[11ch] text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            AI is a tool. Your judgment is the system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Palmer House uses AI to accelerate the parts that should be easier—not to manufacture
            trust, replace direction, or sand every voice into the same answer.
          </p>
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl divide-y divide-border border-y border-border">
          {PRINCIPLES.map((item) => (
            <article key={item.n} className="grid gap-5 py-8 sm:grid-cols-[5rem_0.8fr_1.2fr]">
              <span className="font-mono text-sm text-muted-foreground">{item.n}</span>
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-ink p-8 text-white sm:p-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            The practical version
          </p>
          <h2 className="mt-4 max-w-[15ch] text-4xl font-extrabold sm:text-6xl">
            Use the machine to make the human work more useful.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/studio-preview"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink"
            >
              Try the transparent tools <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 font-semibold"
            >
              Talk through an AI content system
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/ai-pov")({
  head: () => ({
    meta: [
      { title: "Our View on AI | Palmer House Productions" },
      {
        name: "description",
        content:
          "Palmer House uses AI to reduce friction while keeping human judgment, proof, direction, and brand voice in charge.",
      },
    ],
  }),
  component: AiPovPage,
});
