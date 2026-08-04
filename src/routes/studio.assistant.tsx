import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/assistant")({
  head: () => ({ meta: [{ title: "Ask a Pal — Palmer House Studio" }] }),
  component: () => <StudioPage view="assistant" />,
});
