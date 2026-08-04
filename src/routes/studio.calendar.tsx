import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";
export const Route = createFileRoute("/studio/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="calendar" />,
});
