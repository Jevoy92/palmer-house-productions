import { createFileRoute, redirect } from "@tanstack/react-router";

// The Expo campaign has ended; send old links to the free public demo.
export const Route = createFileRoute("/expo")({
  beforeLoad: () => {
    throw redirect({ to: "/expo/demo", statusCode: 301 });
  },
});
