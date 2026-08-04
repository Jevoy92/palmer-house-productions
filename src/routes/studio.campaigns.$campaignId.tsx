import { createFileRoute } from "@tanstack/react-router";
import { StudioPage } from "@/components/studio/StudioApp";
export const Route = createFileRoute("/studio/campaigns/$campaignId")({
  head: () => ({
    meta: [
      { title: "Campaign — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CampaignRoute,
});
function CampaignRoute() {
  const { campaignId } = Route.useParams();
  return <StudioPage view="campaign" campaignId={campaignId} />;
}
