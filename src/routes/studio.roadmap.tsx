import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/roadmap")({
  head: () => ({ meta: [{ title: "Video Roadmap — Palmer House Studio" }] }),
  component: () => <StudioPage view="roadmap" />,
});
