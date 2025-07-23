
import { Navigation } from "@/components/Navigation";
import { ClientResultsHero } from "@/components/results/ClientResultsHero";
import { ClientResultsGrid } from "@/components/results/ClientResultsGrid";
import { ClientMetrics } from "@/components/results/ClientMetrics";
import { ClientTestimonials } from "@/components/results/ClientTestimonials";

const ClientResultsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <ClientResultsHero />
      <ClientMetrics />
      <ClientResultsGrid />
      <ClientTestimonials />
    </div>
  );
};

export default ClientResultsPage;
