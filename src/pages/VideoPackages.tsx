
import { Navigation } from "@/components/Navigation";
import { VideoPackagesTabbed } from "@/components/packages/VideoPackagesTabbed";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const VideoPackagesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <VideoPackagesTabbed />
      </MainContent>
    </div>
  );
};

export default VideoPackagesPage;
