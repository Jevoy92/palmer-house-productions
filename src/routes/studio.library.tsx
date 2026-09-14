import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/studio/library")({
  beforeLoad: () => {
    throw redirect({ to: "/studio/work", search: { tab: "library" } });
  },
});
