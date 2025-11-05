import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { VideoHealthCheckQuiz } from "@/components/assessments/VideoHealthCheckQuiz";

const VideoHealthCheckPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Video Health & Visibility Check | Palmer House Productions"
        description="Assess your video content health and visibility across platforms. Get personalized recommendations to improve performance."
        keywords="video health check, visibility audit, video performance, content audit"
        ogTitle="Video Health & Visibility Check"
        ogDescription="Comprehensive assessment of your video marketing health and visibility."
        canonicalUrl="https://www.palmerhouseproductions.com/assessments/video-health-check"
      />
      <StructuredData />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-4">
              🩺 Diagnostic Assessment
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black mb-4 text-foreground">
              Video Health & Visibility Check
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive assessment of your video content health, visibility, and performance across platforms.
            </p>
          </div>
        </section>

        <section className="pb-12">
          <VideoHealthCheckQuiz />
        </section>
      </MainContent>
    </div>
  );
};

export default VideoHealthCheckPage;
