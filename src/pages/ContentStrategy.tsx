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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Handle URL parameters for direct assessment links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const assessment = params.get('assessment');
    if (assessment && ['video-readiness'].includes(assessment)) {
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




  return (
    <div className="min-h-screen bg-white">
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
        <section className="py-24 bg-gradient-to-br from-video-white to-corporate-light">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
              🎯 Quick Assessment Tools
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
              Quick <span className="text-gradient-1">Assessment</span>
            </h1>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium mb-12">
              Take a quick assessment to get instant insights about your video strategy.
              Perfect for quick wins and identifying immediate opportunities.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="flex items-center space-x-2 text-corporate-gray">
                <CheckCircle className="w-5 h-5 text-social-green" />
                <span>3-5 minute assessment</span>
              </div>
              <div className="flex items-center space-x-2 text-corporate-gray">
                <CheckCircle className="w-5 h-5 text-social-green" />
                <span>Instant actionable insights</span>
              </div>
              <div className="flex items-center space-x-2 text-corporate-gray">
                <CheckCircle className="w-5 h-5 text-social-green" />
                <span>Smart booking recommendations</span>
              </div>
            </div>
            
          </div>
        </section>

        {/* Assessment Preview */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <AssessmentPreview 
              onSelectAssessment={setActiveAssessment}
              currentPath="/content-strategy"
            />
          </div>
        </section>

        {/* Content Strategy Framework */}
        <section className="py-24 bg-corporate-light">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-corporate-dark mb-4">
                Our Content Strategy Framework
              </h2>
              <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
                Beyond SEO-first thinking: We help you create demand-driven content 
                that generates qualified leads and drives real business results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 gradient-social-1 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-corporate-dark mb-2">Audience-Centric</h3>
                <p className="text-corporate-gray">
                  Build content around real audience problems, not just keywords
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 gradient-social-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-corporate-dark mb-2">Interactive Experiences</h3>
                <p className="text-corporate-gray">
                  Engage prospects with assessments and personalized recommendations
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 gradient-social-3 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-corporate-dark mb-2">Demand Generation</h3>
                <p className="text-corporate-gray">
                  Create content that generates demand, not just captures existing demand
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 gradient-social-4 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-corporate-dark mb-2">ROI-Focused</h3>
                <p className="text-corporate-gray">
                  Every piece of content is designed to drive measurable business outcomes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg p-8">
              <h2 className="text-3xl font-bold text-corporate-dark mb-4">
                Need a Comprehensive Strategy?
              </h2>
              <p className="text-xl text-corporate-gray mb-8">
                Get a complete business assessment with personalized video strategy recommendations tailored to your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/video-packages'}
                  variant="premium"
                  size="touch"
                  className="gradient-social-1 text-white"
                >
                  Complete Strategy Assessment
                </Button>
                <Button 
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                  variant="outline"
                  className="px-8 py-3 hover:scale-105 transition-all"
                >
                  Book Strategy Call
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default ContentStrategyPage;