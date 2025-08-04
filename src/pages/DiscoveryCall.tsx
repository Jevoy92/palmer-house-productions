
import { Navigation } from "@/components/Navigation";
import { DiscoveryCallHero } from "@/components/discovery/DiscoveryCallHero";
import { CollapsibleDiscoverySteps } from "@/components/discovery/CollapsibleDiscoverySteps";
import { JeopardyCardGame } from "@/components/discovery/JeopardyCardGame";
import { DiscoveryCallForm } from "@/components/discovery/DiscoveryCallForm";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const DiscoveryCallPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <DiscoveryCallHero />
        <CollapsibleDiscoverySteps />
        <JeopardyCardGame />
        <DiscoveryCallForm />
      </MainContent>
    </div>
  );
};

export default DiscoveryCallPage;
