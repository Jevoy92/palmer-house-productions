import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/studio/roadmap")({
  beforeLoad: () => {
    throw redirect({ to: "/studio/work", search: { tab: "roadmap" } });
  },
});
