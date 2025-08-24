
import { Hero } from "@/components/Hero";
import { ServicesHorizontalScroll } from "@/components/animations/ServicesHorizontalScroll";
import { SolutionsOverview } from "@/components/SolutionsOverview";
import { EnhancedProcessSection } from "@/components/animations/EnhancedProcessSection";
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
import { MobileFirstOptimization } from "@/components/MobileFirstOptimization";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AnimatedCursor } from "@/components/ui/animated-cursor";

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
      <MobileFirstOptimization />
      <ScrollProgress />
      <AnimatedCursor />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <Hero />
        <TrustSection />
        <div id="services">
          <ServicesHorizontalScroll />
        </div>
        <EnhancedProcessSection />
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
