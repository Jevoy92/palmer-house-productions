import { createFileRoute } from "@tanstack/react-router";
import { PalLanePage } from "@/components/site/PalLanePage";
import { createServiceSeo } from "@/lib/seo";

export const Route = createFileRoute("/spotlight-pal")({
  head: () => ({
    ...createServiceSeo({
      title: "Spotlight Pal Brand Video Packages | Palmer House Productions",
      description:
        "Explore Commercials, Product Demos, Customer Stories, and Employee Spotlights with Kareem and Kiana. See examples, scope, and pricing.",
      pathname: "/spotlight-pal",
      serviceName: "Spotlight Pal brand video production",
      serviceType: "Brand film and testimonial video production",
    }),
  }),
  component: () => <PalLanePage accent="spotlight" />,
});
