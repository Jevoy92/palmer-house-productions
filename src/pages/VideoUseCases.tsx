import { Navigation } from "@/components/Navigation";
import { VideoUseCasesHero } from "@/components/use-cases/VideoUseCasesHero";
import { UseCaseCategories } from "@/components/use-cases/UseCaseCategories";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";

const VideoUseCasesPage = () => {
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
        title="Seattle Business Video Case Studies | Palmer House Productions"
        description="Real Seattle business video case studies showing transformation through strategic content systems. See specific challenges, processes, and projected results for local businesses."
        keywords="Seattle business video case studies, video content systems, business transformation, Seattle video production, local business examples"
        ogTitle="Seattle Business Video Case Studies | Palmer House Productions"
        ogDescription="Real Seattle business video case studies showing transformation through strategic content systems."
        canonicalUrl="https://www.palmerhouseproductions.com/video-use-cases"
      />
      <StructuredData type="services" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <VideoUseCasesHero />
        <UseCaseCategories />
      </MainContent>
    </div>
  );
};

export default VideoUseCasesPage;