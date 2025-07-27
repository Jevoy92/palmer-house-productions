
import { Navigation } from "@/components/Navigation";
import { VideoUseCasesHero } from "@/components/use-cases/VideoUseCasesHero";
import { UseCaseCategories } from "@/components/use-cases/UseCaseCategories";

const VideoUseCasesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <VideoUseCasesHero />
      <UseCaseCategories />
    </div>
  );
};

export default VideoUseCasesPage;
