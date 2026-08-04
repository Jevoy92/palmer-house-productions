import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";
export const Route = createFileRoute("/studio/campaigns/")({
  head: () => ({
    meta: [
      { title: "Campaigns — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="campaigns" />,
});
