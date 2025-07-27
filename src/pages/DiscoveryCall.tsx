
import { Navigation } from "@/components/Navigation";
import { DiscoveryCallHero } from "@/components/discovery/DiscoveryCallHero";
import { CollapsibleDiscoverySteps } from "@/components/discovery/CollapsibleDiscoverySteps";
import { JeopardyCardGame } from "@/components/discovery/JeopardyCardGame";
import { DiscoveryCallForm } from "@/components/discovery/DiscoveryCallForm";

const DiscoveryCallPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <DiscoveryCallHero />
      <CollapsibleDiscoverySteps />
      <JeopardyCardGame />
      <DiscoveryCallForm />
    </div>
  );
};

export default DiscoveryCallPage;
