import { useNavigate } from "react-router-dom";
import { Repeat, CheckCircle, Video, Calendar, Gift } from "lucide-react";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Navigation } from "@/components/Navigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";

const MonthlyContent = () => {
  const navigate = useNavigate();

  const monthlyDeliverables = [
    { icon: Video, text: "1 Hero/Founder Video", description: "90-120 second brand-focused content" },
    { icon: CheckCircle, text: "6 Social Reels", description: "30-45 seconds each, platform optimized" },
    { icon: Video, text: "1 Client Voice Video", description: "60-90 second social proof content" },
    { icon: CheckCircle, text: "Captions & Thumbnails", description: "Platform-optimized for all content" }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Monthly Strategy Call",
      description: "We plan your content themes, messaging, and shoot requirements for the month ahead."
    },
    {
      step: 2,
      title: "Production Day",
      description: "One focused shoot day captures all your monthly content with professional quality."
    },
    {
      step: 3,
      title: "Post-Production",
      description: "Professional editing, color correction, and platform optimization for each piece."
    },
    {
      step: 4,
      title: "Delivery & Support",
      description: "Receive all content with captions, thumbnails, and publishing guidance."
    }
  ];

  const handleBooking = () => {
    navigate('/contact', { state: { selectedService: "Social Authority Kit" } });
  };

  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Monthly Video Content Service | Palmer House"
        description="Social Authority Kit - monthly video content system. Hero videos, social reels, and testimonials delivered monthly with 3-month commitment."
        keywords="monthly video content, social authority kit, video marketing system, consistent content creation, social media videos"
        ogTitle="Monthly Content | Palmer House Productions"
        ogDescription="Social Authority Kit - monthly video content system. Hero videos, social reels, and testimonials delivered monthly with 3-month commitment."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-7xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8">
                <Repeat className="inline-block mr-2" size={20} />
                Monthly Content System
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                The Social <span className="text-gradient-3">Authority</span> Kit
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-4xl mx-auto">
                Consistent, professional video content delivered monthly. Build your social authority with a systematic approach to video marketing.
              </p>
              <div className="inline-block px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium">
                🔥 Limited monthly slots available - 3-month minimum commitment
              </div>
            </div>

            {/* Pricing Overview */}
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl video-shadow-lg mb-16 text-center">
              <div className="text-6xl font-black text-corporate-dark mb-4">
                $3,000<span className="text-2xl text-corporate-gray">/month</span>
              </div>
              <div className="text-lg text-corporate-gray font-medium mb-8">3-month minimum commitment</div>
              <button
                onClick={handleBooking}
                className="px-12 py-6 gradient-social-3 text-white font-bold text-xl rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
              >
                Apply for Monthly System
              </button>
            </div>

            {/* Monthly Deliverables */}
            <div className="mb-16">
              <h2 className="text-4xl font-display font-black text-center text-corporate-dark mb-12">
                What You Get Every Month
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {monthlyDeliverables.map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 text-center">
                    <div className="w-16 h-16 gradient-social-3 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <item.icon color="white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-corporate-dark mb-3">{item.text}</h3>
                    <p className="text-sm text-corporate-gray">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mb-16">
              <h2 className="text-4xl font-display font-black text-center text-corporate-dark mb-12">
                Our Monthly Process
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step) => (
                  <div key={step.step} className="text-center">
                    <div className="w-16 h-16 gradient-social-1 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-xl">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-4">{step.title}</h3>
                    <p className="text-corporate-gray">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus Section */}
            <div className="mb-16">
              <div className="bg-blue-50 p-12 rounded-3xl border border-blue-200">
                <div className="text-center">
                  <Gift className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <h3 className="text-3xl font-display font-black text-corporate-dark mb-6">
                    🎁 Bonus Included
                  </h3>
                  <p className="text-xl text-corporate-gray mb-4">
                    Get the complete <strong>Business Bonus Pack</strong> (valued at $531) FREE with this package!
                  </p>
                  <p className="text-corporate-gray">
                    Includes DIY resources, strategy blueprints, and script bundles to supplement your monthly content.
                  </p>
                </div>
              </div>
            </div>

            {/* What's Excluded */}
            <div className="mb-16">
              <div className="bg-gray-50 p-12 rounded-3xl">
                <h3 className="text-2xl font-display font-black text-corporate-dark mb-6 text-center">
                  What's Not Included
                </h3>
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-lg text-corporate-gray mb-4">
                    <strong>YouTube (long-form) content</strong> is handled separately under our future ongoing monthly YouTube plan.
                  </p>
                  <p className="text-corporate-gray">
                    This package focuses specifically on social media content (Instagram, LinkedIn, TikTok) and brand videos for your website and marketing campaigns.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-3xl p-12 border border-social-purple/20">
                <h3 className="text-4xl font-display font-black text-corporate-dark mb-6">
                  Ready for Consistent Content?
                </h3>
                <p className="text-xl text-corporate-gray mb-8 max-w-3xl mx-auto">
                  Join the select group of brands building social authority through consistent, professional video content.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleBooking}
                    className="px-10 py-5 gradient-social-3 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300"
                  >
                    Apply for Monthly System
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-10 py-5 border-2 border-social-purple text-social-purple font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300"
                  >
                    Schedule Strategy Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
      <EnhancedFooter />
    </div>
  );
};

export default MonthlyContent;