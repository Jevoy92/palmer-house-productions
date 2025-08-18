
import { Navigation } from "@/components/Navigation";
import { VideoPackagesTabbed } from "@/components/packages/VideoPackagesTabbed";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { FAQSchema } from "@/components/seo/FAQSchema";

const VideoPackagesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Business Video Assets & Pricing | Palmer House Productions"
        description="Business video assets - Internal & External video systems, advanced compliance training, and DIY resources for evergreen business growth."
        keywords="business video assets, internal training videos, external customer videos, video compliance training, Palmer House Productions pricing"
        ogTitle="Business Video Assets | Palmer House Productions"
        ogDescription="Business video assets - Internal & External video systems, advanced compliance training, and DIY resources for evergreen business growth."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="packages" />
      <FAQSchema
        faqs={[
          { question: 'Do you offer one-off videos?', answer: 'We build content systems. Select one-time bundles are available when they function as systems (e.g., FAQ buildouts, launches).' },
          { question: 'How do I choose the right package?', answer: 'Start with your bottleneck. If it repeats weekly, systematize it — onboarding, FAQs, sales demos, or social proof.' },
          { question: 'Can we start now?', answer: 'Yes — all offers are available now. Book a strategy call to map scope and timeline.' },
          { question: 'What’s the Social Authority Kit?', answer: 'A monthly content system delivering a hero/founder video, six reels, and a client voice video with captions and thumbnails.' },
          { question: 'Are downloads instant?', answer: 'Yes — digital downloads are instant access with auto‑delivery.' }
        ]}
      />
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
