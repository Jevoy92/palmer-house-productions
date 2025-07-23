
import { Navigation } from "@/components/Navigation";
import { VideoPackagesTiers } from "@/components/VideoPackagesTiers";

const VideoPackagesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <VideoPackagesTiers />
    </div>
  );
};

export default VideoPackagesPage;
