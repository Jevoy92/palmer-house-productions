import { createFileRoute } from "@tanstack/react-router";
import { PalLanePage } from "@/components/site/PalLanePage";
import { createServiceSeo } from "@/lib/seo";

export const Route = createFileRoute("/spotlight-pal")({
  head: () => ({
    ...createServiceSeo({
      title: "Spotlight Pal Brand Video Packages | Palmer House Productions",
      description:
        "Build premium founder stories, client proof, and offer films with Kareem and Kiana. Explore Spotlight Pal packages designed to make trust visible.",
      pathname: "/spotlight-pal",
      serviceName: "Spotlight Pal brand video production",
      serviceType: "Brand film and testimonial video production",
    }),
  }),
  component: () => <PalLanePage accent="spotlight" />,
});
