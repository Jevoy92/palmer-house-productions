import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/feed")({
  head: () => ({ meta: [{ title: "Feed — Palmer House Studio" }] }),
  component: () => <StudioPage view="feed" />,
});
