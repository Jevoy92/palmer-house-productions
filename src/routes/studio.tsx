import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StudioProvider } from "@/components/studio/StudioProvider";
import { Toaster } from "@/components/ui/sonner";

function StudioLayout() {
  return (
    <StudioProvider>
      <Outlet />
      <Toaster position="top-right" richColors />
    </StudioProvider>
  );
}

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [{ title: "Palmer House Studio" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: StudioLayout,
});
