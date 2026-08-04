import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/studio-preview")({
  component: () => <Navigate to="/studio" />,
});
