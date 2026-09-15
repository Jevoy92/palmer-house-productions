import { createFileRoute } from "@tanstack/react-router";
import { PalLanePage } from "@/components/site/PalLanePage";
import { createServiceSeo } from "@/lib/seo";

export const Route = createFileRoute("/reel-pal")({
  head: () => ({
    ...createServiceSeo({
      title: "Reel Pal Short-Form Video Packages | Palmer House Productions",
      description:
        "Build a repeatable short-form video system with Ryder and Raquel. Explore Reel Pal packages for visibility, proof, and consistent publishing.",
      pathname: "/reel-pal",
      serviceName: "Reel Pal short-form video production",
      serviceType: "Short-form social video production",
    }),
  }),
  component: () => <PalLanePage accent="reel" />,
});
