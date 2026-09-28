import { createFileRoute } from "@tanstack/react-router";
import { parseStudioPurchaseIntent } from "@/lib/public-journey";
import { StudioPage } from "@/components/studio/StudioApp";
export const Route = createFileRoute("/studio/billing")({
  validateSearch: (search: Record<string, unknown>) => parseStudioPurchaseIntent(search) ?? {},
  head: () => ({
    meta: [
      { title: "Billing — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="billing" />,
});
