import { createFileRoute } from "@tanstack/react-router";
import { CheckoutPage } from "@/components/collection/CheckoutPage";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): { quote?: string } => ({
    quote:
      typeof search.quote === "string" && /^PH-[A-HJ-NP-Z2-9]{6}$/.test(search.quote)
        ? search.quote
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Your Video Plan | Palmer House Productions" },
      {
        name: "description",
        content:
          "Review your video package scope and request a confirmed project quote from Palmer House Productions.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PlanRoute,
});

function PlanRoute() {
  const { quote } = Route.useSearch();
  return <CheckoutPage quoteReference={quote} />;
}
