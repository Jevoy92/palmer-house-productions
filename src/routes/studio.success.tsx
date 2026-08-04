import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/success")({
  head: () => ({ meta: [{ title: "Member Success — Palmer House Studio" }] }),
  component: () => <StudioPage view="success" />,
});
