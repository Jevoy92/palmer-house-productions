import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";
export const Route = createFileRoute("/studio/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="settings" />,
});
