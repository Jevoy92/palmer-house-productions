import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/studio/calendar")({
  beforeLoad: () => {
    throw redirect({ to: "/studio/work", search: { tab: "calendar" } });
  },
});
