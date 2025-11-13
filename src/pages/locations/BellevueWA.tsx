import React, { useState, useEffect } from 'react';
import { Navigation } from "@/components/Navigation";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Link } from "react-router-dom";
import { LocationStructuredData } from "@/components/seo/LocationStructuredData";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import systemPalAnalytics from "@/assets/system-pal-analytics.png";
import spotlightPalDirector from "@/assets/spotlight-pal-director.png";
import evergreenPalContentPlanning from "@/assets/evergreen-pal-content-planning.png";
import reelPalSocialEngagement from "@/assets/reel-pal-social-engagement.png";
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Building, 
  Phone, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Camera,
  Video,
  Edit3,
  Target,
  DollarSign,
  Calendar,
  Award,
  Rocket,
  GraduationCap,
  Smartphone,
  CircleHelp,
  Trophy,
  Megaphone
} from "lucide-react";

const BellevueWA = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Trigger animations on scroll
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          element.classList.add('opacity-100', 'translate-y-0', 'translate-x-0');
          element.classList.remove('opacity-0', 'translate-y-10', 'translate-x-10');
        }
      });
    };

    window.addEventListener('scroll', animateElements);
    animateElements(); // Initial check

    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  return (
    <div className="bg-gray-50 overflow-x-hidden relative">
      {/* Fixed Background Bars - Updated for visibility */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange"></div>
          <div className="w-1/4 h-full bg-pal-purple"></div>
          <div className="w-1/4 h-full bg-pal-green"></div>
          <div className="w-1/4 h-full bg-pal-blue"></div>
        </div>
      </div>

      <MetaTags
        title="Bellevue Video Production Studio | Palmer House Productions"
        description="Bellevue, WA video production for tech companies and brands. Studio and on-location shoots, editing, and strategy—serving Seattle metro area."
        keywords="Bellevue video production, Seattle video studio, tech video production, corporate video Bellevue"
        ogTitle="Bellevue, WA Video Production | Palmer House Productions"
        ogDescription="Professional video production in Bellevue, serving Seattle metro and global tech clients."
        canonicalUrl="https://www.palmerhouseproductions.com/locations/bellevue-wa"
      />
      <StructuredData type="services" />
      <LocationStructuredData
        city="Bellevue"
        region="WA"
        canonicalUrl="https://www.palmerhouseproductions.com/locations/bellevue-wa"
      />
      <FAQSchema
        faqs={[
          { question: 'Which areas around Bellevue do you cover?', answer: 'Greater Seattle metro including Redmond, Kirkland, Issaquah, Renton, and all Eastside communities. Remote collaboration is available.' },
          { question: 'Do you specialize in tech companies?', answer: 'Yes — we work extensively with tech companies, startups, and SaaS platforms for product demos, corporate communications, and training content.' },
          { question: 'What types of projects fit best?', answer: 'Brand storytelling, product demonstrations, internal training libraries, testimonials, and launch content.' },
          { question: 'How fast can we start?', answer: 'Immediately. Book a strategy call and we will align on scope, timeline, and the right content system.' },
          { question: 'Is long-form YouTube included?', answer: 'YouTube long-form is a separate ongoing plan. Social and brand assets are covered in our monthly and bundle systems.' }
        ]}
      />
      <Navigation />
      <MainContent>
        <section className="py-16 sm:py-20 lg:py-32 relative z-10 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbNavigation />
            <div className="text-center mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-gray-900 leading-tight">
                Bellevue, WA Video Production
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our Bellevue studio specializes in tech company video production. We build content systems for startups, SaaS platforms, and established tech brands throughout the Seattle metro area.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-20">
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-l-6 border-pal-blue hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pal-blue/10 rounded-xl flex items-center justify-center text-pal-blue group-hover:scale-110 transition-transform">
                      <Video className="h-6 sm:h-8 w-6 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-gray-900">Tech-Focused Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {[
                      "SaaS product demonstrations",
                      "Technical training libraries", 
                      "Startup pitch and brand videos",
                      "Enterprise communications"
                    ].map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{service}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/video-packages" className="inline-flex items-center font-semibold text-pal-blue hover:text-pal-blue/80 transition-colors">
                    Explore Tech Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-l-6 border-pal-green hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pal-green/10 rounded-xl flex items-center justify-center text-pal-green group-hover:scale-110 transition-transform">
                      <Phone className="h-6 sm:h-8 w-6 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-gray-900">Get Started Today</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">
                    Tell us about your next shoot or system. We'll recommend the best path.
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-pal-green hover:bg-pal-green/90 text-white">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="outline" asChild className="border-pal-green text-pal-green hover:bg-pal-green/5">
                      <a
                        href="https://calendar.app.google/TjXSG2EjNF7KZzcJ8"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book Strategy Call
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Spacer */}
            <div className="h-[5vh] bg-white relative z-10"></div>

            {/* Intro Section */}
            <section className="bg-white py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    Tech-Focused Video Solutions
                  </h2>
                  <p className="text-xl text-gray-600 mb-12 leading-relaxed animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                    From startup launches to enterprise communications, we create video systems that scale with your tech company. Product demos, team training, and brand storytelling that resonates with your audience.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 bg-pal-blue/5 rounded-2xl border border-pal-blue/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                      <div className="w-16 h-16 bg-pal-blue/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Video className="text-2xl text-pal-blue" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Product Demos</h3>
                      <p className="text-gray-600 text-sm">Showcase your software and tech solutions with engaging demonstrations</p>
                    </div>
                    <div className="p-6 bg-pal-purple/5 rounded-2xl border border-pal-purple/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                      <div className="w-16 h-16 bg-pal-purple/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Users className="text-2xl text-pal-purple" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Team Training</h3>
                      <p className="text-gray-600 text-sm">Scale your team's knowledge with comprehensive training libraries</p>
                    </div>
                    <div className="p-6 bg-pal-green/5 rounded-2xl border border-pal-green/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                      <div className="w-16 h-16 bg-pal-green/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Building className="text-2xl text-pal-green" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Brand Stories</h3>
                      <p className="text-gray-600 text-sm">Tell your company's story and connect with your target market</p>
                    </div>
                    <div className="p-6 bg-pal-orange/5 rounded-2xl border border-pal-orange/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                      <div className="w-16 h-16 bg-pal-orange/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Rocket className="text-2xl text-pal-orange" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Launch Content</h3>
                      <p className="text-gray-600 text-sm">Launch your products and features with maximum impact</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SaaS Solutions */}
            <section className="bg-gray-50 py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="text-center lg:text-left animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    <h2 className="text-base font-semibold text-pal-blue uppercase tracking-wider">SaaS & Startups</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Product Demos That Convert</h3>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      Transform complex software into compelling stories. From onboarding flows to feature announcements, we create video content that helps your users understand and love your product while driving conversions.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                          <Video className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Product Walkthroughs</h4>
                          <p className="mt-1 text-gray-600">Clear, engaging demonstrations that showcase your software's key features and benefits.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                          <Users className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">User Onboarding</h4>
                          <p className="mt-1 text-gray-600">Video-based onboarding that reduces churn and increases user activation rates.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                          <Rocket className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Feature Launches</h4>
                          <p className="mt-1 text-gray-600">Announce new features with excitement and clarity to drive adoption among existing users.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 flex justify-center lg:justify-start">
                      <Link
                        to="/contact"
                        className="bg-pal-blue text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                  <div className="relative flex justify-center items-center h-[450px] lg:h-auto animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-300">
                    <div className="absolute w-full h-full bg-pal-blue rounded-3xl transform -rotate-6"></div>
                    <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center p-8">
                      <img 
                        src={systemPalAnalytics} 
                        alt="System Pal with Analytics Dashboard - Product Demo Visualization" 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Enterprise Solutions */}
            <section className="bg-white py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="relative flex justify-center items-center h-[450px] lg:h-auto order-2 lg:order-1 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700">
                    <div className="absolute w-full h-full bg-pal-purple rounded-3xl transform rotate-6"></div>
                    <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center p-8">
                      <img 
                        src={spotlightPalDirector} 
                        alt="Spotlight Pal Film Director - Enterprise Training and Communication" 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                  <div className="text-center lg:text-left order-1 lg:order-2 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    <h2 className="text-base font-semibold text-pal-purple uppercase tracking-wider">Enterprise</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Scale Your Team Training</h3>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      Empower your growing team with scalable video training systems. From technical onboarding to company culture videos, create a comprehensive learning library that grows with your organization.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                          <GraduationCap className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Technical Training</h4>
                          <p className="mt-1 text-gray-600">Complex technical concepts made accessible through clear, structured video content.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                          <Users className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Culture & Values</h4>
                          <p className="mt-1 text-gray-600">Strengthen company culture with engaging videos that communicate your values and mission.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                          <CircleHelp className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Knowledge Base</h4>
                          <p className="mt-1 text-gray-600">Build comprehensive video libraries that reduce support tickets and empower self-service.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 flex justify-center lg:justify-start">
                      <a
                        href="https://calendar.app.google/TjXSG2EjNF7KZzcJ8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-pal-purple text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                      >
                        Book Strategy Call
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Storytelling */}
            <section className="bg-gray-50 py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="text-center lg:text-left animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    <h2 className="text-base font-semibold text-pal-green uppercase tracking-wider">Brand Story</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Connect With Your Market</h3>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      Stand out in the competitive tech landscape with authentic brand storytelling. From founder stories to customer success videos, create emotional connections that drive business growth.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                          <Building className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Company Origin</h4>
                          <p className="mt-1 text-gray-600">Share your startup journey and mission to build trust with customers and investors.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                          <Star className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Customer Success</h4>
                          <p className="mt-1 text-gray-600">Showcase real results with authentic testimonials and case study videos.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                          <Trophy className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Thought Leadership</h4>
                          <p className="mt-1 text-gray-600">Position your executives as industry experts with strategic content and speaking videos.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 flex justify-center lg:justify-start">
                      <Link
                        to="/video-packages"
                        className="bg-pal-green text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                      >
                        View Packages
                      </Link>
                    </div>
                  </div>
                  <div className="relative flex justify-center items-center h-[450px] lg:h-auto animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-300">
                    <div className="absolute w-full h-full bg-pal-green rounded-3xl transform -rotate-6"></div>
                    <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center p-8">
                      <img 
                        src={evergreenPalContentPlanning} 
                        alt="Evergreen Pal with Content Calendar - Brand Storytelling and Planning" 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Launch & Marketing */}
            <section className="bg-white py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="relative flex justify-center items-center h-[450px] lg:h-auto order-2 lg:order-1 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700">
                    <div className="absolute w-full h-full bg-pal-orange rounded-3xl transform rotate-6"></div>
                    <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center p-8">
                      <img 
                        src={reelPalSocialEngagement} 
                        alt="Reel Pal with Social Media Engagement - Launch Campaign and Marketing" 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                  <div className="text-center lg:text-left order-1 lg:order-2 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    <h2 className="text-base font-semibold text-pal-orange uppercase tracking-wider">Launch & Marketing</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">High-Impact Launch Content</h3>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      Launch your products, features, or company updates with maximum impact. From social campaigns to investor presentations, create content that generates buzz and drives action.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                          <Megaphone className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Product Launches</h4>
                          <p className="mt-1 text-gray-600">Generate excitement and drive adoption with compelling launch campaigns across all channels.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                          <DollarSign className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Investor Content</h4>
                          <p className="mt-1 text-gray-600">Professional pitch videos and company overviews for funding rounds and partnerships.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                          <Smartphone className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Social Campaigns</h4>
                          <p className="mt-1 text-gray-600">Multi-platform content that amplifies your message across LinkedIn, Twitter, and beyond.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 flex justify-center lg:justify-start">
                      <Link
                        to="/contact"
                        className="bg-pal-orange text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                      >
                        Launch Your Project
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default BellevueWA;