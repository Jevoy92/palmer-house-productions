import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route = createFileRoute("/studio/onboarding")({
  component: () => <Navigate to="/studio" />,
});
