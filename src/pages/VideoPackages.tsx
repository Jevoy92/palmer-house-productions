import { Navigation } from "@/components/Navigation";
import { VideoPackagesTabbed } from "@/components/packages/VideoPackagesTabbed";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { FAQSchema } from "@/components/seo/FAQSchema";

const VideoPackagesPage = () => {
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
        title="Business Video Assets & Pricing | Palmer House Productions"
        description="Business video assets - Internal & External video systems, advanced compliance training, and DIY resources for evergreen business growth."
        keywords="business video assets, internal training videos, external customer videos, video compliance training, Palmer House Productions pricing"
        ogTitle="Business Video Assets | Palmer House Productions"
        ogDescription="Business video assets - Internal & External video systems, advanced compliance training, and DIY resources for evergreen business growth."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="packages" />
      <FAQSchema
        faqs={[
          { question: 'Do you offer one-off videos?', answer: 'We build content systems. Select one-time bundles are available when they function as systems (e.g., FAQ buildouts, launches).' },
          { question: 'How do I choose the right package?', answer: 'Start with your bottleneck. If it repeats weekly, systematize it — onboarding, FAQs, sales demos, or social proof.' },
          { question: 'Can we start now?', answer: 'Yes — all offers are available now. Book a strategy call to map scope and timeline.' },
          { question: "What's the Business Video Assets package?", answer: "Strategic video systems that replace repetitive operations like client onboarding, training, and FAQ documentation." },
          { question: 'Are downloads instant?', answer: 'Yes — digital downloads are instant access with auto‑delivery.' }
        ]}
      />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      {/* Custom transparent navigation for this page */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/20" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <button className="flex items-center gap-3 whitespace-nowrap focus:outline-none" aria-label="Go to homepage">
                <span className="text-white font-extrabold tracking-tight text-base lg:text-lg">Palmer House Productions</span>
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-white font-medium">
              <a href="/services" className="hover:opacity-80 transition-opacity cursor-pointer">Services</a>
              <a href="/about" className="hover:opacity-80 transition-opacity cursor-pointer">Company</a>
              <a href="/resources" className="hover:opacity-80 transition-opacity cursor-pointer">Resources</a>
              <a href="/pals" className="hover:opacity-80 transition-opacity cursor-pointer">Meet the Pals</a>
              <a href="/contact" className="hover:opacity-80 transition-opacity cursor-pointer">Contact</a>
            </div>
          </div>
        </div>
      </nav>
      
      <BreadcrumbNavigation />
      <MainContent>
        <h1 className="sr-only">Video Production Packages and Pricing</h1>
        <VideoPackagesTabbed />
      </MainContent>
    </div>
  );
};

export default VideoPackagesPage;