import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

function CheckoutSuccessPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-evergreen text-white">
          <Check className="size-8" />
        </span>
        <h1 className="mt-7 text-5xl font-extrabold sm:text-7xl">Your booking is moving.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Stripe accepted the payment handoff. Palmer House will confirm the project scope,
          schedule, and next preparation step by email.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/production-guide"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white"
          >
            Get production-ready <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center rounded-full border border-border px-6 font-semibold"
          >
            Return home
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/checkout-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : "",
  }),
  head: () => ({
    meta: [
      { title: "Booking Received | Palmer House Productions" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutSuccessPage,
});
