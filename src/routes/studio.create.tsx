import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

export const Route = createFileRoute("/studio/create")({
  validateSearch: (search: Record<string, unknown>): { idea?: string } =>
    typeof search.idea === "string" ? { idea: search.idea.slice(0, 5000) } : {},
  head: () => ({
    meta: [
      { title: "Create a campaign — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <StudioPage view="engine" />,
});
