import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { CtaBand, InView, PageHero, PageShell, Section } from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  PalCallout,
  Scene,
  StatBand,
} from "@/components/site/PalVisuals";
import { Glyph, GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import { cartStore, kitCadenceCountKey, monthlyPrice, useCart } from "@/lib/cart-store";
import { PRODUCTION_OFFERS, type ProductionOffer } from "@/lib/offer-catalog";
import { PAL_GROUPS, computeItemPrice, type PalAccent } from "@/lib/pricing-catalog";
import { laneById, laneVar } from "@/lib/pal-lanes";
import { createSeo } from "@/lib/seo";

const starters = PAL_GROUPS.map((group) => ({
  group,
  item: group.items.find((item) => item.recommended) ?? group.items[0],
})).filter((entry) => Boolean(entry.item));

const OFFER_GLYPH: Record<ProductionOffer["code"], GlyphName> = {
  STARTERDUO: "gift",
  EDIT2FOR1: "cart",
};

const PROMISES: { label: string; glyph: GlyphName; lane: PalAccent }[] = [
  { label: "One clear price", glyph: "chart", lane: "reel" },
  { label: "Real package controls", glyph: "workflow", lane: "system" },
  { label: "No mystery add-ons", glyph: "shield", lane: "spotlight" },
  { label: "Cart stays in sync", glyph: "cart", lane: "evergreen" },
];

function OfferGraphic({ offer }: { offer: ProductionOffer }) {
  return (
    <GraphicFrame lane={offer.accent} minHeight="min-h-[12rem]">
      <div className="grid h-full place-items-center">
        <Glyph name={OFFER_GLYPH[offer.code]} lane={offer.accent} className="size-28 sm:size-32" />
      </div>
    </GraphicFrame>
  );
}

function OffersPage() {
  const cart = useCart();
  const [added, setAdded] = useState<string | null>(null);

  function claimOffer(offer: ProductionOffer) {
    const selected = { ...cart.selected };
    for (const itemId of offer.itemIds) {
      selected[itemId] =
        offer.code === "EDIT2FOR1" && itemId === "extra-edited-video"
          ? Math.max(2, selected[itemId] ?? 0)
          : Math.max(1, selected[itemId] ?? 0);
    }
    cartStore.setSelected(selected);
    cartStore.applyOffer(offer.code);
    setAdded(offer.code);
  }

  function chooseMonthly(itemId: string) {
    cartStore.applyOffer(undefined);
    cartStore.setCount(kitCadenceCountKey(itemId), 1);
    if (!cart.selected[itemId]) cartStore.add(itemId);
    setAdded(itemId);
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Current offers"
        title="Build the system."
        highlight="Keep more of the budget."
        subtitle="Straightforward production offers with the scope, savings, and next step visible before you add anything."
        lane="reel"
        primary={{ label: "Review cart", to: "/checkout" }}
        secondary={{ label: "Build Your Package", to: "/production-pricing" }}
        visual={
          <Scene
            name="offersBundle"
            priority
            tags={["Bundle and save 10%", "Two edited minutes for one", "Monthly saves 20%"]}
          />
        }
      />

      <Section
        eyebrow="Limited production offers"
        title="Useful combinations, not random discounts."
        subtitle="Each offer solves a real planning problem and updates the same cart used by packages, pricing, and checkout."
        lane="reel"
      >
        <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PROMISES.map((promise, index) => (
            <InView key={promise.label} delay={index * 0.06}>
              <div className="surface-card flex h-full items-center gap-3 p-4">
                <GlyphBadge name={promise.glyph} lane={promise.lane} size="sm" />
                <p className="text-sm font-bold">{promise.label}</p>
              </div>
            </InView>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {PRODUCTION_OFFERS.map((offer, index) => (
            <InView key={offer.code} delay={index * 0.08} className="h-full">
              <article className="surface-card relative flex h-full flex-col overflow-hidden p-3">
                <span
                  aria-hidden
                  className="absolute -right-12 -top-12 size-32 rounded-full"
                  style={{ background: laneVar(offer.accent, "-soft") }}
                />
                <OfferGraphic offer={offer} />
                <div className="relative flex flex-1 flex-col p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <GlyphBadge name={OFFER_GLYPH[offer.code]} lane={offer.accent} size="sm" />
                    <p
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: laneVar(offer.accent, "-text") }}
                    >
                      {offer.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-4 text-3xl font-extrabold">{offer.name}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{offer.description}</p>
                  <p
                    className="mt-4 rounded-2xl p-4 text-sm font-medium"
                    style={{ background: laneVar(offer.accent, "-soft") }}
                  >
                    {offer.terms}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                    <button
                      type="button"
                      onClick={() => claimOffer(offer)}
                      className="primary-action"
                    >
                      <ShoppingBag className="size-4" />
                      {added === offer.code ? "Added to your cart" : "Claim this offer"}
                    </button>
                    <Link to="/checkout" className="secondary-action">
                      Review cart <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </InView>
          ))}
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="How the savings stack"
        title="Every offer is built from the same pricing model."
        subtitle="Bundles, output offers, and monthly rhythm each remove cost in a different place — and all of them land in one cart."
      >
        <div className="space-y-16">
          <FeatureSplit
            lane="spotlight"
            eyebrow="Bundle and save 10%"
            title="Attention and credibility launch together."
            body="Pair Social Content with Commercials and both packages drop 10% when booked together as a one-time production."
            bullets={[
              "Social Content + Commercials",
              "10% off both packages",
              "One-time production booking",
            ]}
            action={{ label: "Review your plan", to: "/checkout" }}
            visual={
              <GraphicFrame lane="spotlight" label="Two packages, one discount">
                <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 pt-10">
                  <div className="flex flex-col items-center gap-2">
                    <Glyph name="reel" lane="reel" className="size-20 sm:size-24" />
                    <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-reel-text shadow-sm">
                      Reel
                    </span>
                  </div>
                  <Glyph name="gift" lane="spotlight" className="size-16 sm:size-20" />
                  <div className="flex flex-col items-center gap-2">
                    <Glyph name="camera" lane="spotlight" className="size-20 sm:size-24" />
                    <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-spotlight-text shadow-sm">
                      Spotlight
                    </span>
                  </div>
                </div>
              </GraphicFrame>
            }
          />
          <FeatureSplit
            reverse
            lane="reel"
            eyebrow="Monthly production"
            title="Choose a monthly rhythm and the price drops 20%."
            body="Every monthly video package includes the $99/month Palmer House Studio tier for Brand DNA, planning, and publishing support."
            bullets={[
              "20% off the one-time package price",
              "Palmer House Studio included",
              "Repeats monthly until you change or cancel it",
            ]}
            action={{ label: "Compare packages", to: "/shop" }}
            visual={
              <GraphicFrame lane="reel" label="Monthly rhythm">
                <div className="grid h-full place-items-center pt-8">
                  <Glyph name="calendar" lane="reel" className="size-40 sm:size-52" />
                </div>
              </GraphicFrame>
            }
          />
        </div>
        <div className="mx-auto mt-14 max-w-3xl">
          <PalCallout
            pal="ryder"
            quote="Monthly is the quiet 20%. Same production standard, same package scope, and the Studio tier rides along — you just stop re-buying the plan every month."
            action={{ label: "See how sessions stack", to: "/production-pricing" }}
          />
        </div>
      </Section>

      <section className="bg-ink px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl">
          <InView>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-system-soft">
              Monthly production
            </p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em]">
              Save 20% and keep your content rhythm moving.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              Every monthly video package includes the $99/month Palmer House Studio tier for Brand
              DNA, planning, and publishing support.
            </p>
          </InView>
          <div className="mt-10">
            <StatBand
              stats={[
                { value: 20, suffix: "%", label: "saved on every monthly package", lane: "reel" },
                {
                  value: 99,
                  prefix: "$",
                  label: "Studio tier included each month",
                  lane: "system",
                },
                { value: 4, label: "Pal lanes with a monthly starter", lane: "spotlight" },
              ]}
            />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {starters.map(({ group, item }, index) => {
              if (!item) return null;
              const oneTime = computeItemPrice(item);
              const lane = laneById[group.id];
              return (
                <InView key={item.id} delay={index * 0.06}>
                  <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-5 text-ink">
                    <span
                      aria-hidden
                      className="absolute -right-10 -top-10 size-28 rounded-full"
                      style={{ background: laneVar(group.accent, "-soft") }}
                    />
                    <div className="relative flex items-center justify-between gap-3">
                      <GlyphBadge name={lane.glyph} lane={group.accent} size="sm" />
                      <span
                        className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                        style={{
                          background: laneVar(group.accent, "-soft"),
                          color: laneVar(group.accent, "-text"),
                        }}
                      >
                        {lane.problem}
                      </span>
                    </div>
                    <p
                      className="relative mt-5 text-sm font-semibold"
                      style={{ color: laneVar(group.accent, "-text") }}
                    >
                      {group.role}
                    </p>
                    <h3 className="relative mt-1 text-2xl font-extrabold">{item.name}</h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="relative mt-auto pt-6">
                      <p className="text-3xl font-extrabold">
                        ${monthlyPrice(oneTime).toLocaleString()}
                        <span className="text-sm font-medium text-muted-foreground"> / month</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        One-time ${oneTime.toLocaleString()}
                      </p>
                      <Link
                        to="/packages/$packageId"
                        params={{ packageId: item.id }}
                        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4"
                      >
                        View package <ArrowRight className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => chooseMonthly(item.id)}
                        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full px-4 text-sm font-bold text-white"
                        style={{ background: laneVar(group.accent) }}
                      >
                        {added === item.id ? "Monthly package added" : "Choose monthly"}
                      </button>
                    </div>
                  </article>
                </InView>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        lane="reel"
        title="Not sure which offer fits the problem?"
        subtitle="Bring us the bottleneck. We will match it to the right Pal lane, offer, and working package before anything is charged."
        primaryLabel="Talk Through the Problem"
        secondaryLabel="Build Your Package"
        secondaryTo="/production-pricing"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/offers")({
  head: () => ({
    ...createSeo({
      title: "Video Production Offers | Palmer House Productions",
      description:
        "Explore Palmer House video production bundles, monthly savings, and limited output offers across Reel, Spotlight, Evergreen, and System Pal lanes.",
      pathname: "/offers",
    }),
  }),
  component: OffersPage,
});
