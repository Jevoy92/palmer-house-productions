import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";

const tabs = [
  "campaigns",
  "ideas",
  "library",
  "approvals",
  "calendar",
  "roadmap",
] as const;

export type WorkTab = (typeof tabs)[number];

export const Route = createFileRoute("/studio/work")({
  validateSearch: (search: Record<string, unknown>): { tab: WorkTab } => {
    const value = String(search.tab ?? "campaigns") as WorkTab;
    return { tab: tabs.includes(value) ? value : "campaigns" };
  },
  head: () => ({
    meta: [
      { title: "My Work — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { tab } = Route.useSearch();
  return <StudioPage view="work" workTab={tab} />;
}
