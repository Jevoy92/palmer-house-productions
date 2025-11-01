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
        title="Business Video Use Cases | Palmer House Productions"
        description="Explore how businesses use video to solve pain points: boost visibility with Reel Pal, train staff with System Pal, establish authority with Evergreen Pal, and create premium content with Spotlight Pal."
        keywords="video use cases, business video solutions, Reel Pal, System Pal, Evergreen Pal, Spotlight Pal, video marketing examples, training videos, social media video"
        ogTitle="Business Video Use Cases | Palmer House Productions"
        ogDescription="Discover how businesses leverage video with our Pals to address specific pain points and drive results."
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