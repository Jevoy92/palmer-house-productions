import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { VideoNeedsQuiz } from "@/components/discovery/VideoNeedsQuiz";

const FindYourPalPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Find Your Pal Quiz | Palmer House Productions"
        description="Discover which Palmer House Pal is perfect for your video needs. Take our quick quiz to find your ideal video solution."
        keywords="find your pal, video quiz, video solution, content strategy quiz"
        ogTitle="Find Your Perfect Video Pal"
        ogDescription="Quick quiz to match you with the right video solution for your business."
        canonicalUrl="https://www.palmerhouseproductions.com/assessments/find-your-pal"
      />
      <StructuredData />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <VideoNeedsQuiz />
      </MainContent>
    </div>
  );
};

export default FindYourPalPage;
