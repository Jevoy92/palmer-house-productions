import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/create")({
  head: () => ({
    meta: [
      { title: "Content Engine — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="engine" />,
});
