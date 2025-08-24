
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { SolutionsOverview } from "@/components/SolutionsOverview";
import { HorizontalProcessSection } from "@/components/HorizontalProcessSection";
import { FAQ } from "@/components/FAQ";
import { CondensedClients } from "@/components/home/CondensedClients";
import { TrustSection } from "@/components/TrustSection";

import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { LaunchOptimization } from "@/components/LaunchOptimization";
import { ShowcaseSection } from "@/components/ShowcaseSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-cinematic-charcoal">
      <MetaTags 
        title="Palmer House Productions | Creative Studio for Founders"
        description="Systemized video that saves time, cuts costs, and scales your brand. Professional cinematic storytelling for business systems and process documentation."
        keywords="video production, business systems, process documentation, creative studio, founders, systemized video"
        ogTitle="Palmer House Productions | Creative Studio for Founders"
        ogDescription="Systemized video that saves time, cuts costs, and scales your brand."
        ogImage="https://www.palmerhouseproductions.com/og-image.jpg"
        canonicalUrl="https://www.palmerhouseproductions.com/"
      />
      <StructuredData type="homepage" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <LaunchOptimization />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <Hero />
        <TrustSection />
        <div id="services">
          <Services />
        </div>
        <ShowcaseSection />
        <HorizontalProcessSection />
        <div id="pricing">
          <SolutionsOverview />
        </div>
        <CondensedClients />
        <FAQ />
      </MainContent>
    </div>
  );
};

export default Index;
