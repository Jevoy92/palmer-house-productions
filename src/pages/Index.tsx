
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { CondensedClients } from "@/components/home/CondensedClients";
import { ClientShowcase } from "@/components/ClientShowcase";
import { AnimatedTextReveal } from "@/components/AnimatedTextReveal";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { LaunchOptimization } from "@/components/LaunchOptimization";
import { MobileFirstOptimization } from "@/components/MobileFirstOptimization";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden font-sans relative bg-white">
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
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <LaunchOptimization />
      <MobileFirstOptimization />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <MainContent>
        <Hero />
        <ClientShowcase />
        <AnimatedTextReveal />
        <div id="services">
          <Services />
        </div>
        <CondensedClients />
      </MainContent>
    </div>
  );
};

export default Index;
