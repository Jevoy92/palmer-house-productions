
import { Navigation } from "@/components/Navigation";
import { DiscoveryCallHero } from "@/components/discovery/DiscoveryCallHero";
import { DiscoveryProcessSteps } from "@/components/discovery/DiscoveryProcessSteps";
import { VideoNeedsQuiz } from "@/components/discovery/VideoNeedsQuiz";
import { DiscoveryCallForm } from "@/components/discovery/DiscoveryCallForm";

const DiscoveryCallPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <DiscoveryCallHero />
      <DiscoveryProcessSteps />
      <VideoNeedsQuiz />
      <DiscoveryCallForm />
    </div>
  );
};

export default DiscoveryCallPage;
