import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, ProcessTimeline, Scene } from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import { cartStore, useCart } from "@/lib/cart-store";
import { DIY_DOWNLOADS, type PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const DOWNLOAD_DETAILS: Record<
  string,
  { problem: string; body: string; lane: PalAccent; glyph: GlyphName }
> = {
  "diy-strategy-blueprint": {
    problem: "I do not know what to film first.",
    body: "A step-by-step guide to choosing the right videos for your brand's growth stage and audience behavior.",
    lane: "evergreen",
    glyph: "calendar",
  },
  "diy-25-reels": {
    problem: "I need useful ideas I can film now.",
    body: "Talking-head style reel concepts for solo founders, coaches, and service providers who want a practical place to start.",
    lane: "reel",
    glyph: "teleprompter",
  },
  "diy-script-bundle": {
    problem: "I know the topic, but the words are stuck.",
    body: "Plug-and-play starting points for About Me, Social Proof, call-to-action, and FAQ videos.",
    lane: "spotlight",
    glyph: "script",
  },
};

const FALLBACK_DETAILS = DOWNLOAD_DETAILS["diy-strategy-blueprint"];

const diyPath = [
  {
    title: "Choose the friction",
    body: "Name the one thing that keeps slowing the business down — the repeated question, the unclear offer, the blank calendar.",
    glyph: "search",
    lane: "reel",
  },
  {
    title: "Use a guided framework",
    body: "Pick the download that matches the page you are stuck on and follow the same structure our Pals use.",
    glyph: "script",
    lane: "spotlight",
  },
  {
    title: "Film the first useful asset",
    body: "Make one video that does a job. Then repeat the process with the next friction point.",
    glyph: "camera",
    lane: "evergreen",
  },
] as const;

const money = (value: number) => `$${value.toLocaleString()}`;

function DiyDownloadsPage() {
  const cart = useCart();

  return (
    <PageShell>
      <PageHero
        eyebrow="DIY video tools"
        title="You do not need a crew."
        highlight="You need a clear next step."
        subtitle="If the budget, timing, or idea is not ready for full production, start with the same strategic structure: choose the problem, use the tool, and make one useful thing."
        lane="evergreen"
        visual={
          <Scene
            name="diyDownloads"
            priority
            tags={["Scripts", "Reel ideas", "Strategy blueprint"]}
          />
        }
      />

      <Section
        eyebrow="Real tools from the catalog"
        title="Buy the fix for the page you are stuck on."
        subtitle="These items use the same live cart and checkout as Palmer House production packages. Prices and quantities stay in sync."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {DIY_DOWNLOADS.map((download) => {
            const details = DOWNLOAD_DETAILS[download.id] ?? FALLBACK_DETAILS;
            const qty = cart.selected[download.id] ?? 0;
            const accent = details.lane;
            return (
              <article
                key={download.id}
                className="flex min-h-[28rem] flex-col overflow-hidden rounded-[2.25rem] border border-border bg-white shadow-soft"
              >
                <div
                  className="relative overflow-hidden p-6 sm:p-7"
                  style={{ background: `var(--${accent}-soft)` }}
                >
                  <span
                    aria-hidden
                    className="absolute -right-10 -top-10 size-32 rounded-full"
                    style={{ background: `color-mix(in srgb, var(--${accent}) 16%, white)` }}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: `var(--${accent}-text)` }}
                    >
                      {details.problem}
                    </span>
                    <span className="grid size-12 shrink-0 place-items-center rounded-[1.25rem] bg-white shadow-sm">
                      <Glyph name={details.glyph} lane={accent} className="size-8" />
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-3xl font-extrabold">{download.name}</h3>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-sm leading-relaxed text-muted-foreground">{details.body}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Check className="size-4 text-evergreen" />
                    {download.format} · digital download
                  </div>
                  <div className="mt-auto pt-8">
                    <div className="flex items-end justify-between gap-4">
                      <span className="text-3xl font-extrabold">{money(download.price)}</span>
                      <span className="text-xs text-muted-foreground">one-time</span>
                    </div>
                    {qty > 0 ? (
                      <div className="mt-5 flex items-center gap-2">
                        <div className="flex flex-1 items-center justify-between rounded-full border border-border p-1">
                          <button
                            type="button"
                            onClick={() => cartStore.decrement(download.id)}
                            className="grid size-11 place-items-center rounded-full hover:bg-mist"
                            aria-label={`Remove one ${download.name}`}
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="text-sm font-bold" aria-live="polite">
                            {qty} in cart
                          </span>
                          <button
                            type="button"
                            onClick={() => cartStore.add(download.id)}
                            className="grid size-11 place-items-center rounded-full bg-ink text-white"
                            aria-label={`Add another ${download.name}`}
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => cartStore.add(download.id)}
                        className="primary-action mt-5 w-full justify-center"
                      >
                        <ShoppingBag className="size-4" /> Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {DIY_DOWNLOADS.some((download) => (cart.selected[download.id] ?? 0) > 0) && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] bg-ink p-5 text-white sm:p-6">
            <div>
              <p className="font-bold">Your DIY toolkit is ready to review.</p>
              <p className="mt-1 text-sm text-white/60">
                Checkout uses the same live Palmer House cart.
              </p>
            </div>
            <Link
              to="/checkout"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-ink"
            >
              Review cart <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </Section>

      <Section
        tone="mist"
        eyebrow="The DIY path"
        title="Same structure the Pals use. Your camera."
        subtitle="Every download follows the same three moves, so the work you do alone still fits the system when you are ready for a crew."
      >
        <ProcessTimeline steps={[...diyPath]} />
        <div className="mx-auto mt-10 max-w-3xl">
          <PalCallout
            pal="cyrus"
            quote="A template is not a shortcut around thinking — it is a shortcut around the blank page. Pick the friction, follow the structure, press record."
            action={{ label: "Meet Evergreen Pal", to: "/evergreen-pal" }}
          />
        </div>
      </Section>

      <Section
        tone="evergreen"
        eyebrow="When a download is not enough"
        title="Move up one level of support."
        subtitle="Keep the strategy work, add a human guide, or hand the full production to a Pal."
      >
        <div className="mx-auto max-w-4xl">
          <CardGrid cols={2}>
            <Card
              index="Add a strategist"
              title="Build the roadmap together."
              body="Explore content strategy and turn the bottlenecks into a prioritized plan."
              to="/content-strategy"
              lane="evergreen"
              glyph="bulb"
            />
            <Card
              index="Add the crew"
              title="Let a Pal produce the system."
              body="Explore video production and hand the shoot, edit, and delivery to the right lane."
              to="/services/video-production"
              lane="spotlight"
              glyph="camera"
            />
          </CardGrid>
        </div>
      </Section>

      <CtaBand
        title="Still not sure how much support you need?"
        subtitle="Tell us what is stuck. We will point you toward a download, strategy session, or production lane without overbuilding the solution."
        lane="evergreen"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/services/diy-downloads")({
  head: () => ({
    ...createSeo({
      title: "DIY Downloads | Palmer House Productions",
      description:
        "Instant-access video scripts, strategy guides, and templates for founders and creators who want to create compelling content on their own.",
      pathname: "/services/diy-downloads",
    }),
  }),
  component: DiyDownloadsPage,
});
