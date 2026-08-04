import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/ideas")({
  head: () => ({
    meta: [
      { title: "Content Ideas — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="ideas" />,
});
