import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/studio/create")({
  beforeLoad: () => {
    throw redirect({
      to: "/studio/conversations",
      search: { prompt: "I have something to turn into content." },
    });
  },
});
