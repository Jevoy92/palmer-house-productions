import { createFileRoute } from "@tanstack/react-router";
import { PalLanePage } from "@/components/site/PalLanePage";
import { createServiceSeo } from "@/lib/seo";

export const Route = createFileRoute("/evergreen-pal")({
  head: () => ({
    ...createServiceSeo({
      title: "Evergreen Pal Long-Form Video Packages | Palmer House Productions",
      description:
        "Turn complex expertise into clear long-form video with Cyrus and Clara. Explore Evergreen Pal packages for authority, education, and reusable explanations.",
      pathname: "/evergreen-pal",
      serviceName: "Evergreen Pal educational video production",
      serviceType: "Long-form educational and authority video production",
    }),
  }),
  component: () => <PalLanePage accent="evergreen" />,
});
