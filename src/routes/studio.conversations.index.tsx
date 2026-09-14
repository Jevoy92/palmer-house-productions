import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/conversations/")({
  head: () => ({
    meta: [
      { title: "Conversations — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="conversations" />,
});
