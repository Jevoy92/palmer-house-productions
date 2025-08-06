
import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { ClientResultsHero } from "@/components/results/ClientResultsHero";
import { ClientResultsGrid } from "@/components/results/ClientResultsGrid";
import { ClientMetrics } from "@/components/results/ClientMetrics";
import { ClientTestimonials } from "@/components/results/ClientTestimonials";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const ClientResultsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
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
