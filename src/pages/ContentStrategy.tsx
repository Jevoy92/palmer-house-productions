import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MobileFirstOptimization } from "@/components/MobileFirstOptimization";
import { MainContent } from "@/components/MainContent";
import { VideoReadinessAudit } from "@/components/assessments/VideoReadinessAudit";
import { AssessmentPreview } from "@/components/assessments/AssessmentPreview";
import { TrainingROICalculator } from "@/components/assessments/TrainingROICalculator";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageTransition } from '@/components/PageTransition';
import { 
  Target, 
  Calculator, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Lightbulb
} from "lucide-react";

const ContentStrategyPage = () => {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const { transitionTo } = usePageTransition();

  // Handle URL parameters for direct assessment links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const assessment = params.get('assessment');
    if (assessment && ['video-readiness', 'training-roi'].includes(assessment)) {
      setActiveAssessment(assessment);
    }
  }, []);

  if (activeAssessment === "video-readiness") {
    return (
      <div className="min-h-screen bg-white">
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Navigation />
        <MainContent className="pt-20">
          <div className="py-8">
            <Button 
              onClick={() => setActiveAssessment(null)}
              variant="outline"
              className="mb-6"
            >
              ← Back to Strategy Hub
            </Button>
            <VideoReadinessAudit />
          </div>
        </MainContent>
      </div>
    );
  }

  if (activeAssessment === "training-roi") {
    return (
      <div className="min-h-screen bg-white">
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Navigation />
        <MainContent className="pt-20">
          <div className="py-8">
            <Button 
              onClick={() => setActiveAssessment(null)}
              variant="outline"
              className="mb-6"
            >
              ← Back to Strategy Hub
            </Button>
            <TrainingROICalculator />
          </div>
        </MainContent>
      </div>
    );
  }




  return (
    <div className="min-h-screen overflow-x-hidden font-sans relative">
      {/* Fixed 4-Color Background Bars */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange"></div>
          <div className="w-1/4 h-full bg-pal-purple"></div>
          <div className="w-1/4 h-full bg-pal-green"></div>
          <div className="w-1/4 h-full bg-pal-blue"></div>
        </div>
      </div>
      <MetaTags 
        title="Video Readiness Audit | Quick Assessment | Palmer House"
        description="Take our Video Readiness Audit for instant insights and a tailored roadmap to improve your video marketing."
        keywords="video readiness audit, video strategy assessment, video marketing audit, Palmer House Productions"
        ogTitle="Video Readiness Audit | Palmer House Productions"
        ogDescription="Quick video readiness assessment with personalized recommendations."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData />
      <MobileFirstOptimization />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Hero - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center mb-12">
              <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
                🎯 Quick Assessment Tools
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Quick <span className="text-pal-orange">Assessment</span>
              </h1>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed mb-12">
                Take a quick assessment to get instant insights about your video strategy.
                Perfect for quick wins and identifying immediate opportunities.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="flex items-center space-x-2 text-corporate-gray">
                  <CheckCircle className="w-5 h-5 text-pal-green" />
                  <span>3-5 minute assessment</span>
                </div>
                <div className="flex items-center space-x-2 text-corporate-gray">
                  <CheckCircle className="w-5 h-5 text-pal-green" />
                  <span>Instant actionable insights</span>
                </div>
                <div className="flex items-center space-x-2 text-corporate-gray">
                  <CheckCircle className="w-5 h-5 text-pal-green" />
                  <span>Smart booking recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Assessment Preview */}
        <section className="py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
              <AssessmentPreview 
                onSelectAssessment={setActiveAssessment}
                currentPath="/content-strategy"
              />
            </div>
          </div>
        </section>

        {/* Content Strategy Framework */}
        <section className="py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight">
                Our Content Strategy <span className="text-pal-purple">Framework</span>
              </h2>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed mb-12">
                Beyond SEO-first thinking: We help you create demand-driven content 
                that generates qualified leads and drives real business results.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pal-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-2">Audience-Centric</h3>
                  <p className="text-corporate-gray">
                    Build content around real audience problems, not just keywords
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pal-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-2">Interactive Experiences</h3>
                  <p className="text-corporate-gray">
                    Engage prospects with assessments and personalized recommendations
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pal-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-2">Demand Generation</h3>
                  <p className="text-corporate-gray">
                    Create content that generates demand, not just captures existing demand
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pal-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-2">ROI-Focused</h3>
                  <p className="text-corporate-gray">
                    Every piece of content is designed to drive measurable business outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center">
              <h2 className="text-2xl md:text-3xl font-display font-black mb-6 text-corporate-dark tracking-tight">
                Need Comprehensive <span className="text-pal-green">Video Strategy</span>?
              </h2>
              <p className="text-lg xl:text-xl text-corporate-gray mb-8 max-w-4xl mx-auto font-medium leading-relaxed">
                Explore our complete video production packages with personalized recommendations tailored to your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => transitionTo('/video-packages')}
                  variant="premium"
                  size="touch"
                  className="bg-pal-purple text-white hover:bg-pal-purple/90"
                >
                  Explore Video Packages
                </Button>
                <Button 
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                  variant="outline"
                  className="px-8 py-3 hover:scale-105 transition-all border-pal-purple text-pal-purple hover:bg-pal-purple hover:text-white"
                >
                  Book Strategy Call
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default ContentStrategyPage;