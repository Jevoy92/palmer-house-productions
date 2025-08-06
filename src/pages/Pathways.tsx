
import { Navigation } from "@/components/Navigation";
import { ServicePackages } from "@/components/ServicePackages";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { InternalLinking } from "@/components/seo/InternalLinking";

const PathwaysPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Video Production Packages | Service Options | Palmer House Productions"
        description="Explore our video production service packages designed for different business needs. From single videos to comprehensive content strategies, find the perfect solution."
        keywords="video production packages, video service options, business video packages, video production pricing, content creation packages"
        ogTitle="Video Production Packages | Service Options"
        ogDescription="Video production service packages for different business needs. From single videos to comprehensive strategies."
        canonicalUrl="https://www.palmerhouseproductions.com/pathways"
      />
      <StructuredData type="packages" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight text-center">
              Video Production <span className="text-gradient-1">Service Packages</span>
            </h1>
          </div>
        </section>
        <ServicePackages />
        <InternalLinking currentPage="packages" />
      </MainContent>
    </div>
  );
};

export default PathwaysPage;
