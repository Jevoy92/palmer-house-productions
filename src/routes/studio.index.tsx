import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/studio/")({
  head: () =>
    createSeo({
      title: "Content Engine — Palmer House Studio",
      description:
        "Sign in to the Palmer House Studio to plan, organize, and publish your video content system.",
      pathname: "/studio",
      noIndex: true,
    }),
  component: () => <StudioPage view="engine" />,
});
