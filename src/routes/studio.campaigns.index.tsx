import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/studio/campaigns/")({
  beforeLoad: () => {
    throw redirect({ to: "/studio/work", search: { tab: "campaigns" } });
  },
});
