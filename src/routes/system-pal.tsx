import { createFileRoute } from "@tanstack/react-router";
import { PalLanePage } from "@/components/site/PalLanePage";
import { createServiceSeo } from "@/lib/seo";

export const Route = createFileRoute("/system-pal")({
  head: () => ({
    ...createServiceSeo({
      title: "System Pal Training Video Packages | Palmer House Productions",
      description:
        "Build onboarding, SOP, training, and client-handoff video libraries with Silas and Samira. Explore System Pal packages for knowledge that scales.",
      pathname: "/system-pal",
      serviceName: "System Pal training video production",
      serviceType: "Training, onboarding, and SOP video production",
    }),
  }),
  component: () => <PalLanePage accent="system" />,
});
