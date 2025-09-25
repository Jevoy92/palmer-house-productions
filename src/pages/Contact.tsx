
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
import { usePageTransition } from '@/components/PageTransition';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { transitionTo } = usePageTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleBookCall = () => {
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer');
  };

  const handleVideoReadinessAudit = () => {
    transitionTo('/assessments/video-readiness');
  };

  const handleExplorePackages = () => {
    transitionTo('/video-packages');
  };

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
        <section id="contact" className="py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Hero Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center mb-12">
              <div className="inline-block px-6 py-3 bg-pal-green text-white font-bold text-lg mb-8 rounded-full video-shadow">
                💬 Get Started
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Ready to Transform Your <span className="text-pal-green">Video Strategy</span>?
              </h1>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
                Get personalized recommendations and start creating professional video content that drives results.
              </p>
            </div>

            {/* Contact Options - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Assessment Options */}
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-display font-black text-corporate-dark mb-6">
                    Choose Your <span className="text-pal-purple">Starting Point</span>
                  </h2>
                  
                  {/* Book Strategy Call */}
                  <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-pal-orange/30 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pal-orange rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-corporate-dark mb-1 text-lg">Book a Strategy Call</h3>
                          <p className="text-sm text-corporate-gray">Free 30-minute strategy session</p>
                        </div>
                        <Button 
                          onClick={handleBookCall} 
                          className="bg-pal-orange hover:bg-pal-orange/90 text-white px-6 py-3"
                          size="lg"
                        >
                          Book Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explore Video Packages */}
                  <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-pal-purple/30 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pal-purple rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-corporate-dark mb-1 text-lg">Explore Video Packages</h3>
                          <p className="text-sm text-corporate-gray">Browse our comprehensive video production services</p>
                        </div>
                        <Button 
                          onClick={handleExplorePackages} 
                          variant="outline" 
                          className="border-pal-purple text-pal-purple hover:bg-pal-purple hover:text-white px-6 py-3"
                          size="lg"
                        >
                          Browse Packages
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Video Readiness Audit */}
                  <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-pal-blue/30 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pal-blue rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-corporate-dark mb-1 text-lg">Video Readiness Audit</h3>
                          <p className="text-sm text-corporate-gray">Assess your current video capabilities</p>
                        </div>
                        <Button 
                          onClick={handleVideoReadinessAudit} 
                          variant="outline" 
                          className="border-pal-blue text-pal-blue hover:bg-pal-blue hover:text-white px-6 py-3"
                          size="lg"
                        >
                          Start Audit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <TrustSidebar />
                </div>

                {/* Quick Contact Form */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-corporate-dark mb-6">
                    Send Us a <span className="text-pal-green">Quick Message</span>
                  </h2>
                  <ZohoLeadForm title="Quick Message" leadSource="Website" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default ContactPage;
