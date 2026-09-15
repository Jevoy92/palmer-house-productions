import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Clock } from "lucide-react";
import { useEffect } from "react";
import { PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, PalFigure, ProcessTimeline, Scene } from "@/components/site/PalVisuals";
import { CelebrationLayer, celebrateOnce } from "@/components/studio/Celebrate";
import { cartStore } from "@/lib/cart-store";
import { verifyDepositCheckout } from "@/lib/stripe-checkout";

const NEXT_STEPS = [
  {
    title: "Scope confirmed",
    body: "Palmer House reviews the working plan and confirms the project scope with you by email.",
    pal: "kiana",
  },
  {
    title: "Schedule set",
    body: "Production timing is locked in around your calendar before anything else moves.",
    pal: "samira",
  },
  {
    title: "Get production-ready",
    body: "You receive the next preparation step so the session day feels natural, not rushed.",
    pal: "kareem",
  },
] as const;

function CheckoutSuccessPage() {
  const { session_id: sessionId } = Route.useSearch();
  const verification = Route.useLoaderData();
  const paid = verification.status === "paid";

  useEffect(() => {
    if (!sessionId || !paid) return;
    cartStore.reset();
    const timer = window.setTimeout(
      () =>
        celebrateOnce(`checkout.${sessionId}`, {
          title: "Your production is officially moving.",
          detail: "Watch your inbox for scope and scheduling details.",
        }),
      0,
    );
    return () => window.clearTimeout(timer);
  }, [paid, sessionId]);

  if (!paid) {
    const pending = verification.status === "pending";
    return (
      <PageShell>
        <section className="px-4 py-12 sm:py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-[2.5rem] bg-mist px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_.9fr]">
            <div className="text-center lg:text-left">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-system-soft text-system-text lg:mx-0">
                {pending ? <Clock className="size-8" /> : <AlertTriangle className="size-8" />}
              </span>
              <h1 className="mt-7 text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl">
                {pending ? "Payment confirmation is pending." : "We couldn’t verify this payment."}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground lg:mx-0">
                {pending
                  ? "Your cart is still saved. Refresh this page after Stripe finishes processing, or contact Palmer House if this status does not update."
                  : "No cart items were removed. Return to checkout or contact Palmer House if you completed payment and reached this page unexpectedly."}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  to="/checkout"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white"
                >
                  Return to checkout <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex min-h-12 items-center rounded-full border border-border px-6 font-semibold"
                >
                  Contact Palmer House
                </Link>
              </div>
            </div>
            <PalFigure
              pal="samira"
              size="lg"
              lane="system"
              className="min-h-[20rem]"
              tags={["Cart still saved", "Nothing removed"]}
            />
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <CelebrationLayer />
      <PageHero
        eyebrow="Booking received"
        title="Your booking is"
        highlight="moving."
        subtitle="Stripe accepted the payment handoff. Palmer House will confirm the project scope, schedule, and next preparation step by email."
        lane="spotlight"
        primary={{ label: "Get production-ready", to: "/production-guide" }}
        secondary={{ label: "Return home", to: "/" }}
        visual={<Scene name="success" priority tags={["Deposit received", "Scope next"]} />}
      />

      <Section
        tone="mist"
        eyebrow="What happens next"
        title="Three short steps before the camera rolls."
        subtitle="Each one arrives by email, guided by the Pal who owns that part of the process."
      >
        <ProcessTimeline steps={[...NEXT_STEPS]} />
        <div className="mx-auto mt-12 max-w-3xl">
          <PalCallout
            pal="kiana"
            quote="Watch your inbox for scope and scheduling details. Once those are confirmed, the production guide walks you through everything to prepare."
            action={{ label: "Open the production guide", to: "/production-guide" }}
          />
        </div>
      </Section>
    </PageShell>
  );
}

export const Route = createFileRoute("/checkout-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : "",
  }),
  loader: async ({ location }) => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (!sessionId) return { status: "invalid" as const };
    return verifyDepositCheckout({ data: { sessionId } });
  },
  head: () => ({
    meta: [
      { title: "Booking Received | Palmer House Productions" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutSuccessPage,
});
