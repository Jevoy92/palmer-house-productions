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

export const Route = createFileRoute("/studio")({ component: StudioLayout });
