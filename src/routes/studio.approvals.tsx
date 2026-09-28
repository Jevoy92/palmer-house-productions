import { createFileRoute, redirect } from "@tanstack/react-router";

// Keep old bookmarks useful after removing the dedicated Approvals page.
export const Route = createFileRoute("/studio/approvals")({
  beforeLoad: () => {
    throw redirect({ to: "/studio/library", replace: true });
  },
});
