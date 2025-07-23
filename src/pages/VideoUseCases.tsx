
import { Navigation } from "@/components/Navigation";
import { VideoUseCasesHero } from "@/components/use-cases/VideoUseCasesHero";
import { UseCaseCategories } from "@/components/use-cases/UseCaseCategories";
import { UseCaseExamples } from "@/components/use-cases/UseCaseExamples";

const VideoUseCasesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <VideoUseCasesHero />
      <UseCaseCategories />
      <UseCaseExamples />
    </div>
  );
};

export default VideoUseCasesPage;
