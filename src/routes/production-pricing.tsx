import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/components/collection/PricingPage";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/production-pricing")({
  validateSearch: (search: Record<string, unknown>): { package?: string } => ({
    package: typeof search.package === "string" ? search.package.slice(0, 100) : undefined,
  }),
  head: () =>
    createSeo({
      title: "Video Production Pricing | Palmer House Productions",
      description:
        "A filming session plus the videos you take home. Build an editable video estimate, choose your package and request your project plan.",
      pathname: "/production-pricing",
    }),
  component: ProductionPricingRoute,
});

function ProductionPricingRoute() {
  const search = Route.useSearch();
  return <PricingPage key={search.package ?? "default"} packageId={search.package} />;
}
