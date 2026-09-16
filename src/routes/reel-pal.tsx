import { createFileRoute } from "@tanstack/react-router";
import { PalLanePage } from "@/components/site/PalLanePage";
import { createServiceSeo } from "@/lib/seo";

export const Route = createFileRoute("/reel-pal")({
  head: () => ({
    ...createServiceSeo({
      title: "Reel Pal Short-Form Video Packages | Palmer House Productions",
      description:
        "Create Social Content with Ryder and Raquel. Explore short-form videos, clear hooks, and examples for consistent publishing.",
      pathname: "/reel-pal",
      serviceName: "Reel Pal short-form video production",
      serviceType: "Short-form social video production",
    }),
  }),
  component: () => <PalLanePage accent="reel" />,
});
