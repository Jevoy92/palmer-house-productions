import { createFileRoute } from "@tanstack/react-router";
import { PalLanePage } from "@/components/site/PalLanePage";
import { createServiceSeo } from "@/lib/seo";

export const Route = createFileRoute("/system-pal")({
  head: () => ({
    ...createServiceSeo({
      title: "System Pal Training Video Packages | Palmer House Productions",
      description:
        "Explore Onboarding, Safety Training, Sales Training, and Video SOPs with Silas and Samira. See clear examples, scope, and pricing.",
      pathname: "/system-pal",
      serviceName: "System Pal training video production",
      serviceType: "Training, onboarding, and SOP video production",
    }),
  }),
  component: () => <PalLanePage accent="system" />,
});
