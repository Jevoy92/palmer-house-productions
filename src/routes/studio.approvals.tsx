import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/studio/approvals")({
  beforeLoad: () => {
    throw redirect({ to: "/studio/work", search: { tab: "approvals" } });
  },
});
