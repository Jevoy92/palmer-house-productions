
import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { ClientResultsHero } from "@/components/results/ClientResultsHero";
import { ClientResultsGrid } from "@/components/results/ClientResultsGrid";
import { ClientMetrics } from "@/components/results/ClientMetrics";
import { ClientTestimonials } from "@/components/results/ClientTestimonials";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const ClientResultsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Client Success Stories & Video Production Results | Palmer House"
        description="See real results from Palmer House clients - increased conversion rates, improved ROI, and successful brand transformations through video."
        keywords="client results, video production ROI, business transformation, Palmer House Productions success stories, video marketing results"
        ogTitle="Client Results | Palmer House Productions"
        ogDescription="See real results from Palmer House clients - increased conversion rates, improved ROI, and successful brand transformations through video."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <ClientResultsHero />
        <ClientMetrics />
        <ClientResultsGrid />
        <ClientTestimonials />
      </MainContent>
    </div>
  );
};

export default ClientResultsPage;
