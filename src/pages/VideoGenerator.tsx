import React from 'react';
import { VideoGenerator } from '@/components/remotion/VideoGenerator';
import { Navigation } from '@/components/Navigation';
import { EnhancedFooter } from '@/components/seo/EnhancedFooter';
import { MetaTags } from '@/components/seo/MetaTags';
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics';
import { StructuredData } from '@/components/seo/StructuredData';
import { BreadcrumbNavigation } from '@/components/seo/BreadcrumbNavigation';
import { SkipLink } from '@/components/ui/skip-link';

const VideoGeneratorPage: React.FC = () => {
  return (
    <>
      <MetaTags
        title="AI Video Generator - Palmer House Productions"
        description="Create professional videos instantly with our AI-powered video generator. FAQ videos, social media reels, and founder stories made easy."
        keywords="AI video generator, automated video creation, FAQ videos, social media reels, founder videos, Palmer House Productions"
        ogImage="/og-video-generator.jpg"
        canonicalUrl="/video-generator"
      />
      <GoogleAnalytics />
      <StructuredData type="services" />
      
      <SkipLink href="#main">Skip to main content</SkipLink>
      <Navigation />
      
      <BreadcrumbNavigation />

      <main id="main" className="min-h-screen bg-background py-8">
        <VideoGenerator />
      </main>

      <EnhancedFooter />
    </>
  );
};

export default VideoGeneratorPage;