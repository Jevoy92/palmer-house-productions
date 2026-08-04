import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";
export const Route = createFileRoute("/studio/brand")({
  head: () => ({
    meta: [
      { title: "Brand Studio — Palmer House" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="brand" />,
});
