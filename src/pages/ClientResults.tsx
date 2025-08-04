
import { Navigation } from "@/components/Navigation";
import { ClientResultsHero } from "@/components/results/ClientResultsHero";
import { ClientResultsGrid } from "@/components/results/ClientResultsGrid";
import { ClientMetrics } from "@/components/results/ClientMetrics";
import { ClientTestimonials } from "@/components/results/ClientTestimonials";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const ClientResultsPage = () => {
  return (
    <div className="min-h-screen bg-white">
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
