
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
    <div className="min-h-screen overflow-x-hidden font-sans relative">
      {/* Fixed 4-Color Background Bars */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange"></div>
          <div className="w-1/4 h-full bg-pal-purple"></div>
          <div className="w-1/4 h-full bg-pal-green"></div>
          <div className="w-1/4 h-full bg-pal-blue"></div>
        </div>
      </div>
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
        <section className="pt-24 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Hero Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center mb-12">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Video Production <span className="text-pal-purple">Service Packages</span>
              </h1>
              <p className="text-lg xl:text-xl text-corporate-gray leading-relaxed mb-8 max-w-4xl mx-auto font-medium">
                Discover our comprehensive video production services designed to solve specific business challenges. From individual video needs to complete content systems, we help businesses streamline communication, improve training, and boost engagement through strategic video content.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-gradient-to-br from-pal-orange/10 to-pal-orange/5 p-6 rounded-xl border border-pal-orange/20">
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Content Systems</h3>
                  <p className="text-corporate-gray">Ongoing video libraries that grow with your business and solve recurring communication challenges.</p>
                </div>
                <div className="bg-gradient-to-br from-pal-purple/10 to-pal-purple/5 p-6 rounded-xl border border-pal-purple/20">
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">One-Time Solutions</h3>
                  <p className="text-corporate-gray">Targeted video bundles that address specific needs like onboarding, FAQs, or product launches.</p>
                </div>
                <div className="bg-gradient-to-br from-pal-green/10 to-pal-green/5 p-6 rounded-xl border border-pal-green/20">
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">DIY Resources</h3>
                  <p className="text-corporate-gray">Templates, guides, and coaching to help you create professional video content in-house.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pal-blue/10 to-pal-blue/5 p-6 rounded-xl border border-pal-blue/20">
                <h4 className="text-lg font-bold text-corporate-dark mb-2">Why Choose Palmer House Productions?</h4>
                <p className="text-corporate-gray">
                  We don't just create videos—we build strategic content systems that save time, reduce repetitive work, and scale with your business. Every project starts with understanding your unique challenges and designing solutions that deliver measurable results.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
              <ServicePackages />
            </div>
          </div>
        </section>
        
        <InternalLinking currentPage="packages" />
      </MainContent>
    </div>
  );
};

export default PathwaysPage;
