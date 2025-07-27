
import { Navigation } from "@/components/Navigation";
import { DiscoveryCallHero } from "@/components/discovery/DiscoveryCallHero";
import { CollapsibleDiscoverySteps } from "@/components/discovery/CollapsibleDiscoverySteps";
import { VideoNeedsQuiz } from "@/components/discovery/VideoNeedsQuiz";
import { DiscoveryCallForm } from "@/components/discovery/DiscoveryCallForm";

const DiscoveryCallPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <DiscoveryCallHero />
      <CollapsibleDiscoverySteps />
      <VideoNeedsQuiz />
      <DiscoveryCallForm />
    </div>
  );
};

export default DiscoveryCallPage;
