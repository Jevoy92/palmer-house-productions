
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ZohoLeadForm } from "@/components/zoho/ZohoLeadForm";
import { Calendar, Video, CheckCircle } from "lucide-react";
import { TrustSidebar } from "@/components/contact/TrustSidebar";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleBookCall = () => {
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer');
  };

  const handleVideoReadinessAudit = () => {
    window.location.href = '/assessments/video-readiness';
  };


  const handleCompleteStrategyAssessment = () => {
    window.location.href = '/content-strategy';
  };

  return (
    <div className="min-h-screen bg-cinematic-charcoal">
      <MetaTags 
        title="Contact Palmer House Productions | Start Your Video Project Today"
        description="Contact Palmer House Productions for professional video production services. Get a custom quote for your business video project."
        keywords="contact Palmer House Productions, video production quote, professional video services, business video consultation"
        ogTitle="Contact Palmer House Productions | Video Production Services"
        ogDescription="Contact Palmer House Productions for professional video production services. Get a custom quote for your business video project."
        canonicalUrl="https://www.palmerhouseproductions.com/contact"
      />
      <StructuredData type="contact" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section id="contact" className="py-24 bg-cinematic-charcoal/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-6 video-shadow">
                💬 Get Started
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-black mb-6 text-video-white">
                Ready to Transform Your <span className="text-gradient-1">Video Strategy?</span>
              </h1>
              <p className="text-lg text-video-white/80 max-w-3xl mx-auto">
                Get personalized recommendations and start creating professional video content that drives results.
              </p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {/* Assessment Options */}
              <div className="space-y-4">
                {/* Book Strategy Call */}
                <Card className="border-0 video-shadow hover:video-shadow-lg transition-all bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                      <div className="w-12 h-12 gradient-social-1 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-video-white mb-1 text-base sm:text-lg">Book a Strategy Call</h3>
                        <p className="text-sm text-video-white/80">Free 30-minute strategy session</p>
                      </div>
                      <Button 
                        onClick={handleBookCall} 
                        className="gradient-social-1 text-white w-full sm:w-auto min-h-[44px] px-6"
                        size="lg"
                      >
                        Book Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Complete Strategy Assessment */}
                <Card className="border-0 video-shadow hover:video-shadow-lg transition-all bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                      <div className="w-12 h-12 gradient-social-2 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-video-white mb-1 text-base sm:text-lg">Complete Strategy Assessment</h3>
                        <p className="text-sm text-video-white/80">Comprehensive 12-step video strategy audit</p>
                      </div>
                      <Button 
                        onClick={handleCompleteStrategyAssessment} 
                        variant="outline" 
                        className="w-full sm:w-auto min-h-[44px] px-6"
                        size="lg"
                      >
                        Start Full Assessment
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Readiness Audit */}
                <Card className="border-0 video-shadow hover:video-shadow-lg transition-all bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-4">
                      <div className="w-12 h-12 gradient-social-3 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-video-white mb-1 text-base sm:text-lg">Video Readiness Audit</h3>
                        <p className="text-sm text-video-white/80">Assess your current video capabilities</p>
                      </div>
                      <Button 
                        onClick={handleVideoReadinessAudit} 
                        variant="outline" 
                        className="w-full sm:w-auto min-h-[44px] px-6"
                        size="lg"
                      >
                        Start Audit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <TrustSidebar />
              </div>

              {/* Quick Contact Form (Zoho CRM) */}
              <ZohoLeadForm title="Quick Message" leadSource="Website" />
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default ContactPage;
