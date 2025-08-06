
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Clients } from "@/components/Clients";
import { SolutionsOverview } from "@/components/SolutionsOverview";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Palmer House Productions | Professional Video Production & Cinematic Storytelling"
        description="Professional video production services that drive results. Expert cinematic storytelling, business videos, and content creation that saves time and builds your brand."
        keywords="video production, professional video, cinematic storytelling, business videos, content creation, video marketing"
        ogTitle="Palmer House Productions | Professional Video Production"
        ogDescription="Professional video production services that drive results. Expert cinematic storytelling and content creation."
        ogImage="https://www.palmerhouseproductions.com/og-image.jpg"
        canonicalUrl="https://www.palmerhouseproductions.com/"
      />
      <StructuredData type="homepage" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <Hero />
        <div id="services">
          <Services />
        </div>
        <Clients />
        <div id="pricing">
          <SolutionsOverview />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </MainContent>
    </div>
  );
};

export default Index;
