import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/")({
  head: () => ({
    meta: [
      { title: "Studio Home — Palmer House" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="home" />,
});
