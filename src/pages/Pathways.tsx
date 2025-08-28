
import { Navigation } from "@/components/Navigation";
import { ServicePackages } from "@/components/ServicePackages";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { InternalLinking } from "@/components/seo/InternalLinking";

const PathwaysPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Video Production Service Packages | Palmer House Productions"
        description="Explore video production service packages for different business needs. From single videos to comprehensive content strategies."
        keywords="video production packages, video service options, business video packages, video production pricing, content creation packages"
        ogTitle="Video Production Packages | Service Options"
        ogDescription="Explore video production service packages for different business needs. From single videos to comprehensive content strategies."
        canonicalUrl="https://www.palmerhouseproductions.com/pathways"
      />
      <StructuredData type="packages" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight text-center">
              Video Production <span className="text-gradient-1">Service Packages</span>
            </h1>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <p className="text-lg md:text-xl text-corporate-gray leading-relaxed mb-8">
                Discover our comprehensive video production services designed to solve specific business challenges. From individual video needs to complete content systems, we help businesses streamline communication, improve training, and boost engagement through strategic video content.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-xl video-shadow">
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Content Systems</h3>
                  <p className="text-corporate-gray">Ongoing video libraries that grow with your business and solve recurring communication challenges.</p>
                </div>
                <div className="bg-white p-6 rounded-xl video-shadow">
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">One-Time Solutions</h3>
                  <p className="text-corporate-gray">Targeted video bundles that address specific needs like onboarding, FAQs, or product launches.</p>
                </div>
                <div className="bg-white p-6 rounded-xl video-shadow">
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">DIY Resources</h3>
                  <p className="text-corporate-gray">Templates, guides, and coaching to help you create professional video content in-house.</p>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-lg font-bold text-blue-800 mb-2">Why Choose Palmer House Productions?</h4>
                <p className="text-blue-700">
                  We don't just create videos—we build strategic content systems that save time, reduce repetitive work, and scale with your business. Every project starts with understanding your unique challenges and designing solutions that deliver measurable results.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ServicePackages />
        <InternalLinking currentPage="packages" />
      </MainContent>
    </div>
  );
};

export default PathwaysPage;
