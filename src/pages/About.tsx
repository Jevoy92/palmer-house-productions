
import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Values } from "@/components/Values";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { InternalLinking } from "@/components/seo/InternalLinking";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="About Palmer House | Seattle Video Production"
        description="Meet the Palmer House Productions team - professional video content creators specializing in strategic business storytelling and brand development in Seattle."
        keywords="about Palmer House Productions, Seattle video production team, professional video creators, business storytelling"
        ogTitle="About Palmer House | Seattle Video Production Team"
        ogDescription="Meet the Palmer House Productions team - professional video content creators specializing in strategic business storytelling and brand development in Seattle."
      />
      <StructuredData type="about" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <main>
          <h1 className="sr-only">About Palmer House Productions - Professional Video Production Team</h1>
          <About />
          <Team />
          <Values />
          <InternalLinking currentPage="about" />
        </main>
      </MainContent>
    </div>
  );
};

export default AboutPage;
