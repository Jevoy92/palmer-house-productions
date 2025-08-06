import { Navigation } from "@/components/Navigation";
import { VideoUseCasesHero } from "@/components/use-cases/VideoUseCasesHero";
import { UseCaseCategories } from "@/components/use-cases/UseCaseCategories";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";

const VideoUseCasesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Video Use Cases | Business Video Applications | Palmer House Productions"
        description="Explore comprehensive video use cases for business applications. See how professional video production can transform your internal operations and external marketing efforts."
        keywords="video use cases, business video applications, corporate video examples, video marketing cases, training video examples"
        ogTitle="Video Use Cases | Business Applications"
        ogDescription="Comprehensive video use cases for business applications. Transform your operations and marketing with professional video."
        canonicalUrl="https://www.palmerhouseproductions.com/video-use-cases"
      />
      <StructuredData type="services" />
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