import { ExpoModule } from "@/components/expo/ExpoModule";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, PageShell, Section } from "@/components/site/PageShell";
import { studioCreditAllowance } from "@/lib/studio-credits";
import { studioConsultingOffer, studioPlans } from "@/lib/studio-model";
import { SESSION_PRICE, FINISHED_VIDEO_PRICE, EVERGREEN_LENGTH_PRICE } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    createSeo({
      title: "Ways to Work & Pricing | Palmer House Productions",
      description:
        "Compare full video production, self-directed Studio tools, and planning or shoot preparation with Palmer House.",
      pathname: "/pricing",
    }),
  component: PricingHub,
});

function PricingHub() {
  return (
    <PageShell>
      <ExpoModule />
      <PageHero
        eyebrow="Ways to work & pricing"
        title="The right help."
        highlight="At the right stage."
        subtitle="Hire our team to make the videos, build with Studio yourself, or get help preparing to shoot. Start where you need us."
        lane="spotlight"
        ctas={false}
      />
      <Section eyebrow="Three ways to move forward" title="Choose how much help you need.">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="surface-card flex flex-col p-6 sm:p-8">
            <img src="/packages/lanes/reel.png" width="64" height="64" alt="" />
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-reel-text">
              Full production
            </p>
            <h3 className="mt-3 text-3xl font-extrabold">We make the videos.</h3>
            <p className="mt-4 text-muted-foreground">
              For a business ready for a team to plan, film, and edit useful videos.
            </p>
            <div className="my-6 border-y border-border py-5">
              <p className="text-3xl font-bold">
                ${SESSION_PRICE} <span className="text-sm font-normal">per filming session</span>
              </p>
              <p className="mt-2 text-lg font-semibold">
                + ${FINISHED_VIDEO_PRICE} per finished video
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Two hours on location. Educational episodes start at $
                {EVERGREEN_LENGTH_PRICE[5].toLocaleString()} for five minutes.
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "Pre-shoot planning, script help and wardrobe guidance",
                "Filming, direction, professional lighting and sound",
                "Editing, color and sound mix",
              ].map((t) => (
                <li className="flex gap-2" key={t}>
                  <Check className="size-4 shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="my-5 text-sm text-muted-foreground">
              Package prices are working estimates. We confirm scope, timing, tax and travel before
              payment.
            </p>
            <Link to="/shop" className="primary-action mt-auto justify-center">
              Browse video packages <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/production-pricing"
              className="mt-4 text-center text-sm font-semibold underline"
            >
              Build your own estimate
            </Link>
          </article>
          <article className="surface-card flex flex-col p-6 sm:p-8">
            <img src="/packages/lanes/system.png" width="64" height="64" alt="" />
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-system-text">
              Studio software
            </p>
            <h3 className="mt-3 text-3xl font-extrabold">Make progress yourself.</h3>
            <p className="mt-4 text-muted-foreground">
              For creators and teams who want AI collaborators and one place to develop their work.
            </p>
            <div className="my-6 border-y border-border py-5">
              <p className="text-3xl font-bold">
                ${studioPlans.creator.price}
                <span className="text-sm font-normal"> / month</span>
              </p>
              <p className="mt-2 text-lg font-semibold">
                {studioCreditAllowance.creator.toLocaleString()} AI credits each month
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Annual billing and plans with human strategy time are available.
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "Pals that share your brand and project context",
                "Campaign drafts, posts, images, PDFs and video scripts",
                "Private library and content planning calendar",
              ].map((t) => (
                <li className="flex gap-2" key={t}>
                  <Check className="size-4 shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="my-5 text-sm text-muted-foreground">
              Review, copy and publish your work yourself. Filming, editing and generated video are
              not included.
            </p>
            <Link to="/membership/pricing" className="primary-action mt-auto justify-center">
              Compare Studio plans <ArrowRight className="size-4" />
            </Link>
            <Link to="/membership" className="mt-4 text-center text-sm font-semibold underline">
              See how Studio works
            </Link>
          </article>
          <article className="surface-card flex flex-col p-6 sm:p-8">
            <img src="/packages/lanes/evergreen.png" width="64" height="64" alt="" />
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-evergreen-text">
              Planning & preparation
            </p>
            <h3 className="mt-3 text-3xl font-extrabold">Get ready to make it.</h3>
            <p className="mt-4 text-muted-foreground">
              For someone who needs a clearer concept, stronger script, or confidence before the
              camera rolls.
            </p>
            <div className="my-6 border-y border-border py-5">
              <p className="text-3xl font-bold">
                ${studioConsultingOffer.price}
                <span className="text-sm font-normal">
                  {" "}
                  · {studioConsultingOffer.duration} minutes
                </span>
              </p>
              <p className="mt-2 text-lg font-semibold">{studioConsultingOffer.name}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                A focused working session, with {studioConsultingOffer.includedDays} days of Studio
                access confirmed by our team.
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                "Choose the message, audience and first useful idea",
                "Discuss concepts, scripting or a filming setup",
                "Scope wardrobe and on-camera preparation support",
              ].map((t) => (
                <li className="flex gap-2" key={t}>
                  <Check className="size-4 shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="my-5 text-sm text-muted-foreground">
              Use the session for a focused decision. Larger strategy, writing or preparation work
              is scoped separately.
            </p>
            <Link
              to="/contact"
              search={{ intent: "intensive" }}
              className="primary-action mt-auto justify-center"
            >
              Request a planning session <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/content-strategy"
              className="mt-4 text-center text-sm font-semibold underline"
            >
              Explore preparation support
            </Link>
          </article>
        </div>
      </Section>
      <Section
        eyebrow="You can combine them"
        title="The work carries forward."
        subtitle="Develop a direction in Studio, work through the decisions with our team, then bring the brief into production. You can also start directly with any one service."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" search={{ intent: "call" }} className="primary-action">
            Help me choose <ArrowRight className="size-4" />
          </Link>
          <Link to="/offers" className="secondary-action">
            Production offers
          </Link>
          <Link to="/services/diy-downloads" className="secondary-action">
            DIY guides
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
