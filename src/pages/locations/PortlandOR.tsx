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
import reelPalMobile from "@/assets/reel-pal-mobile.png";
import evergreenPalSEO from "@/assets/evergreen-pal-seo.png";
import evergreenPalContentPlanning from "@/assets/evergreen-pal-content-planning.png";
import systemPalKnowledgeBase from "@/assets/system-pal-knowledge-base.png";
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
  Megaphone,
  Coffee,
  Lightbulb,
  Briefcase
} from "lucide-react";

const PortlandOR = () => {
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
        title="Portland Video Production Studio | Palmer House Productions"
        description="Portland, OR video production for brands that want results. Studio and on-location shoots, editing, and strategy—serving clients globally."
        keywords="Portland video production, Oregon video studio, corporate video Portland, brand storytelling Portland"
        ogTitle="Portland, OR Video Production | Palmer House Productions"
        ogDescription="Cinematic video production in Portland, serving Oregon and global clients."
        canonicalUrl="https://www.palmerhouseproductions.com/locations/portland-or"
      />
      <StructuredData type="services" />
      <LocationStructuredData
        city="Portland"
        region="OR"
        canonicalUrl="https://www.palmerhouseproductions.com/locations/portland-or"
      />
      <FAQSchema
        faqs={[
          { question: 'Which areas around Portland do you cover?', answer: 'Metro Portland plus Beaverton, Lake Oswego, Tigard, Gresham, Salem, Bend, and the Oregon Coast. Remote collaboration is available.' },
          { question: 'Do you travel for shoots?', answer: 'Yes — local travel is included, and extended coverage across Oregon and the Pacific Northwest is available.' },
          { question: 'What types of projects fit best?', answer: 'Brand storytelling, social authority systems, internal training libraries, testimonials, and launch content.' },
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
                Portland, OR Video Production
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our Portland studio partners with local Oregon companies as well as remote-first and global teams. We build content systems—not one-off videos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-20">
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-l-6 border-pal-orange hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pal-orange/10 rounded-xl flex items-center justify-center text-pal-orange group-hover:scale-110 transition-transform">
                      <Video className="h-6 sm:h-8 w-6 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-gray-900">Creative Solutions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {[
                      "Brand storytelling and narratives",
                      "Creative campaigns and social content", 
                      "Training libraries and onboarding",
                      "Customer testimonials and case studies"
                    ].map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{service}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/video-packages" className="inline-flex items-center font-semibold text-pal-orange hover:text-pal-orange/80 transition-colors">
                    Explore Creative Packages
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
                    <CardTitle className="text-xl sm:text-2xl text-gray-900">Start Your Project</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">
                    Tell us about your next shoot or system. We'll recommend the best path forward.
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-pal-green hover:bg-pal-green/90 text-white">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="outline" asChild className="border-pal-green text-pal-green hover:bg-pal-green/5">
                      <a
                        href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078320"
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
                    Portland's Creative Video Hub
                  </h2>
                  <p className="text-xl text-gray-600 mb-12 leading-relaxed animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-200">
                    From artisanal brands to global corporations, we craft video content that captures Portland's innovative spirit. Creative storytelling, remote collaboration, and content systems that scale with your business.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 bg-pal-orange/5 rounded-2xl border border-pal-orange/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-300">
                      <div className="w-16 h-16 bg-pal-orange/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Coffee className="text-2xl text-pal-orange" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Local Brands</h3>
                      <p className="text-gray-600 text-sm">Artisanal businesses and local brands that define Portland's character</p>
                    </div>
                    <div className="p-6 bg-pal-purple/5 rounded-2xl border border-pal-purple/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-400">
                      <div className="w-16 h-16 bg-pal-purple/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Lightbulb className="text-2xl text-pal-purple" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
                      <p className="text-gray-600 text-sm">Creative solutions for forward-thinking companies and organizations</p>
                    </div>
                    <div className="p-6 bg-pal-green/5 rounded-2xl border border-pal-green/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-500">
                      <div className="w-16 h-16 bg-pal-green/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Globe className="text-2xl text-pal-green" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Global Reach</h3>
                      <p className="text-gray-600 text-sm">Remote-first approach serving clients worldwide</p>
                    </div>
                    <div className="p-6 bg-pal-blue/5 rounded-2xl border border-pal-blue/20 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700 delay-600">
                      <div className="w-16 h-16 bg-pal-blue/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Briefcase className="text-2xl text-pal-blue" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Corporate</h3>
                      <p className="text-gray-600 text-sm">Professional corporate communications and training content</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Storytelling Solutions */}
            <section className="bg-gray-50 py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="text-center lg:text-left animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    <h2 className="text-base font-semibold text-pal-orange uppercase tracking-wider">Brand Stories</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Authentic Portland Narratives</h3>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      Portland businesses have unique stories to tell. From craft breweries to tech startups, we capture the authentic spirit that makes your brand memorable and builds genuine connections with your audience.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                          <Coffee className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Local Character</h4>
                          <p className="mt-1 text-gray-600">Showcase what makes your Portland business unique and authentic.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                          <Users className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Community Focus</h4>
                          <p className="mt-1 text-gray-600">Connect with Portland's community-minded audience through meaningful content.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-orange/10 text-pal-orange rounded-lg flex items-center justify-center">
                          <Star className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Quality Craft</h4>
                          <p className="mt-1 text-gray-600">Highlight the craftsmanship and attention to detail that Portland is known for.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 flex justify-center lg:justify-start">
                      <Link
                        to="/contact"
                        className="bg-pal-orange text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                      >
                        Tell Your Story
                      </Link>
                    </div>
                  </div>
                  <div className="relative flex justify-center items-center h-[450px] lg:h-auto animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-300">
                    <div className="absolute w-full h-full bg-pal-orange rounded-3xl transform -rotate-6"></div>
                    <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center p-8">
                      <img 
                        src={reelPalMobile} 
                        alt="Reel Pal with Mobile Content Kit - Brand Storytelling and Content Creation" 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Content Systems */}
            <section className="bg-white py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="relative flex justify-center items-center h-[450px] lg:h-auto order-2 lg:order-1 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700">
                    <div className="absolute w-full h-full bg-pal-purple rounded-3xl transform rotate-6"></div>
                    <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center p-8">
                      <img 
                        src={evergreenPalSEO} 
                        alt="Evergreen Pal with SEO Strategy - Training Systems and Analytics" 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                  <div className="text-center lg:text-left order-1 lg:order-2 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    <h2 className="text-base font-semibold text-pal-purple uppercase tracking-wider">Content Systems</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Scalable Video Libraries</h3>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      Build comprehensive video systems that grow with your business. From employee training to customer onboarding, create efficient content frameworks that save time and ensure consistency.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                          <GraduationCap className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Training Libraries</h4>
                          <p className="mt-1 text-gray-600">Comprehensive video training that scales with your team's growth.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                          <Rocket className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Onboarding Flows</h4>
                          <p className="mt-1 text-gray-600">Streamlined video onboarding that sets new hires up for success.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-purple/10 text-pal-purple rounded-lg flex items-center justify-center">
                          <CircleHelp className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">FAQ Systems</h4>
                          <p className="mt-1 text-gray-600">Reduce support tickets with comprehensive video FAQ libraries.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 flex justify-center lg:justify-start">
                      <a
                        href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078320"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-pal-purple text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                      >
                        Build Your System
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Remote Collaboration */}
            <section className="bg-gray-50 py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="text-center lg:text-left animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    <h2 className="text-base font-semibold text-pal-green uppercase tracking-wider">Remote First</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Global Collaboration</h3>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      Portland's remote-work culture meets professional video production. We've built our processes to support distributed teams, flexible schedules, and seamless collaboration across time zones.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                          <Globe className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Cloud Workflows</h4>
                          <p className="mt-1 text-gray-600">Cloud-based review and approval processes that work across time zones.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                          <Clock className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Flexible Scheduling</h4>
                          <p className="mt-1 text-gray-600">Accommodate different schedules and work styles with flexible production timelines.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-green/10 text-pal-green rounded-lg flex items-center justify-center">
                          <Users className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Team Coordination</h4>
                          <p className="mt-1 text-gray-600">Seamless coordination with distributed teams and stakeholders.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 flex justify-center lg:justify-start">
                      <Link
                        to="/video-packages"
                        className="bg-pal-green text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                      >
                        Start Remote Project
                      </Link>
                    </div>
                  </div>
                  <div className="relative flex justify-center items-center h-[450px] lg:h-auto animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-300">
                    <div className="absolute w-full h-full bg-pal-green rounded-3xl transform -rotate-6"></div>
                    <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center p-8">
                      <img 
                        src={evergreenPalContentPlanning} 
                        alt="Evergreen Pal with Content Calendar - Remote Collaboration and Planning" 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Creative & Social Content */}
            <section className="bg-white py-20 lg:py-32 relative z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="relative flex justify-center items-center h-[450px] lg:h-auto order-2 lg:order-1 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700">
                    <div className="absolute w-full h-full bg-pal-blue rounded-3xl transform rotate-6"></div>
                    <div className="relative z-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center p-8">
                      <img 
                        src={systemPalKnowledgeBase} 
                        alt="System Pal with Video Knowledge Base - Social Content and Engagement" 
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                  <div className="text-center lg:text-left order-1 lg:order-2 animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-700">
                    <h2 className="text-base font-semibold text-pal-blue uppercase tracking-wider">Social & Creative</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Engaging Social Content</h3>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                      Portland's creative energy translated into compelling social content. From Instagram reels to TikTok campaigns, create content that captures attention and drives engagement across all platforms.
                    </p>
                    <div className="mt-10 space-y-8">
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                          <Smartphone className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Social Media Content</h4>
                          <p className="mt-1 text-gray-600">Engaging short-form content optimized for Instagram, TikTok, and beyond.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-400">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                          <Lightbulb className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Creative Campaigns</h4>
                          <p className="mt-1 text-gray-600">Original, creative campaigns that reflect Portland's innovative spirit.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 animate-on-scroll opacity-0 transform translate-x-10 transition-all duration-700 delay-600">
                        <div className="flex-shrink-0 w-12 h-12 bg-pal-blue/10 text-pal-blue rounded-lg flex items-center justify-center">
                          <Camera className="text-2xl" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">Behind the Scenes</h4>
                          <p className="mt-1 text-gray-600">Authentic behind-the-scenes content that builds connection with your audience.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 flex justify-center lg:justify-start">
                      <Link
                        to="/contact"
                        className="bg-pal-blue text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl animate-on-scroll opacity-0 transform translate-y-5 transition-all duration-700 delay-800"
                      >
                        Create Content
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

export default PortlandOR;