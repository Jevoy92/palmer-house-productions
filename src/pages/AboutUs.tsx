
import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Values } from "@/components/Values";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { InternalLinking } from "@/components/seo/InternalLinking";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans">
      <MetaTags
        title="About Palmer House Productions | Professional Video Production Team"
        description="Meet the Palmer House Productions team. Professional video production experts specializing in cinematic storytelling and business content creation."
        keywords="about Palmer House Productions, video production team, professional videographers, cinematic storytelling experts"
        ogTitle="About Palmer House Productions | Video Production Team"
        ogDescription="Meet our professional video production team specializing in cinematic storytelling and business content."
        canonicalUrl="https://www.palmerhouseproductions.com/about-us"
      />
      <StructuredData type="about" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            {/* Hero Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center mb-12">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                About <span className="text-pal-purple">Palmer House Productions</span>
              </h1>
            </div>
          </div>
        </section>
        <About />
        <Team />
        <Values />
        <InternalLinking currentPage="about" />
      </MainContent>
    </div>
  );
};

export default AboutUsPage;
