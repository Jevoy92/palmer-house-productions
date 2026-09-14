import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/studio/ideas")({
  beforeLoad: () => {
    throw redirect({ to: "/studio/work", search: { tab: "ideas" } });
  },
});
