import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { VideoReadinessAudit } from "@/components/assessments/VideoReadinessAudit";

const VideoReadinessPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="Video Readiness Audit | Palmer House Productions"
        description="Take the Video Readiness Audit to assess your strategy and get instant, personalized recommendations."
        keywords="video readiness audit, video strategy audit, video assessment"
        ogTitle="Video Readiness Audit"
        ogDescription="Quick video strategy audit with instant recommendations."
        canonicalUrl="https://www.palmerhouseproductions.com/assessments/video-readiness"
      />
      <StructuredData />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="py-16 md:py-20 bg-corporate-light">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-block px-4 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-4 video-shadow">
              🎯 Assessment
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black mb-4 text-corporate-dark">
              Video Readiness Audit
            </h1>
            <p className="text-base md:text-lg text-corporate-gray max-w-3xl mx-auto">
              A fast, focused assessment to gauge your current video marketing capabilities.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto px-6">
            <VideoReadinessAudit />
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default VideoReadinessPage;
