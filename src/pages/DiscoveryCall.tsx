
import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { DiscoveryCallHero } from "@/components/discovery/DiscoveryCallHero";
import { CollapsibleDiscoverySteps } from "@/components/discovery/CollapsibleDiscoverySteps";
import { JeopardyCardGame } from "@/components/discovery/JeopardyCardGame";
import { DiscoveryCallForm } from "@/components/discovery/DiscoveryCallForm";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const DiscoveryCallPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Discovery Call | Palmer House Productions"
        description="Book a free discovery call to explore video content solutions for your business. Map your challenges and discover the perfect video strategy for your brand."
        keywords="discovery call, free consultation, video strategy, business consultation, Palmer House Productions, video planning"
        ogTitle="Discovery Call | Palmer House Productions"
        ogDescription="Book a free discovery call to explore video content solutions for your business. Map your challenges and discover the perfect video strategy for your brand."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
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
