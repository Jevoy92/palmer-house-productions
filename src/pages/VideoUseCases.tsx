
import { Navigation } from "@/components/Navigation";
import { VideoUseCasesHero } from "@/components/use-cases/VideoUseCasesHero";
import { UseCaseCategories } from "@/components/use-cases/UseCaseCategories";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const VideoUseCasesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <VideoUseCasesHero />
        <UseCaseCategories />
      </MainContent>
    </div>
  );
};

export default VideoUseCasesPage;
