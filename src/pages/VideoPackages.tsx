
import { Navigation } from "@/components/Navigation";
import { VideoPackagesTabbed } from "@/components/packages/VideoPackagesTabbed";

const VideoPackagesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <VideoPackagesTabbed />
    </div>
  );
};

export default VideoPackagesPage;
