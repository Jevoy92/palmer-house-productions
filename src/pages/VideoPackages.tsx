
import { Navigation } from "@/components/Navigation";
import { VideoPackagesTabbed } from "@/components/packages/VideoPackagesTabbed";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const VideoPackagesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Video Packages & Pricing | Palmer House Productions"
        description="Video production packages - Social Authority Kit, FAQ systems, external videos, and DIY resources for business growth and engagement."
        keywords="video production packages, social authority kit, video FAQ systems, Palmer House Productions pricing, business video solutions"
        ogTitle="Video Packages | Palmer House Productions"
        ogDescription="Video production packages - Social Authority Kit, FAQ systems, external videos, and DIY resources for business growth and engagement."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="packages" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <h1 className="sr-only">Video Production Packages and Pricing</h1>
        <VideoPackagesTabbed />
      </MainContent>
    </div>
  );
};

export default VideoPackagesPage;
