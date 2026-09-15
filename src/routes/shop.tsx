import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/collection/CollectionPage";
import { createSeo } from "@/lib/seo";
import type { PalAccent } from "@/lib/pricing-catalog";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { lane?: PalAccent | "all"; q?: string } => ({
    lane: ["reel", "spotlight", "system", "evergreen", "all"].includes(String(search.lane))
      ? (search.lane as PalAccent | "all")
      : undefined,
    q: typeof search.q === "string" ? search.q.slice(0, 200) : undefined,
  }),
  head: () =>
    createSeo({
      title: "Video Packages | Palmer House Productions",
      description:
        "Explore ten clear video packages: social content, commercials, product demos, customer stories, team spotlights, onboarding, safety, sales training, Video SOPs and education.",
      pathname: "/shop",
    }),
  component: ShopRoute,
});

function ShopRoute() {
  return <CollectionPage {...Route.useSearch()} />;
}
