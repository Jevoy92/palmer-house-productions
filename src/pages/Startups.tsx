import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePageTransition } from '@/components/PageTransition';
import { useState, useEffect } from 'react';
import { 
  Rocket, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Clock,
  Target,
  Lightbulb,
  PlayCircle,
  FileText,
  Camera,
  Zap,
  Eye,
  Building2,
  ArrowRight,
  Star,
  Award,
  Video,
  DollarSign,
  Globe,
  Briefcase
} from "lucide-react";
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import maleReelPalImage from '@/assets/pals/male-reel-pal-edited.png';

const AnimatedText = () => {
  const phrases = [
    "Launch Strong",
    "Raise Funding", 
    "Tell Your Story",
    "Build Authority",
    "Scale Fast",
    "Stand Out"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <span 
      className={`block text-white/90 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {phrases[currentIndex]}
    </span>
  );
};

const StartupsPage = () => {
  const { transitionTo } = usePageTransition();

  const startupCategories = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Launch Videos",
      description: "Compelling launch content that generates buzz and drives adoption",
      modules: ["Product Demos", "Founder Stories", "Launch Campaigns", "Press Kit Videos"],
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Fundraising Content",
      description: "Professional pitch videos that capture investor attention",
      modules: ["Pitch Decks", "Product Demos", "Team Introductions", "Vision Videos"],
      color: "border-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team & Culture",
      description: "Showcase your team and company culture to attract talent",
      modules: ["Team Introductions", "Culture Videos", "Recruitment Content", "Behind the Scenes"],
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Marketing",
      description: "Video content that scales your marketing and drives growth",
      modules: ["Social Media Content", "Customer Stories", "Feature Announcements", "Growth Campaigns"],
      color: "border-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Brand Storytelling",
      description: "Build your brand narrative and establish market presence",
      modules: ["Origin Stories", "Mission Videos", "Value Propositions", "Brand Campaigns"],
      color: "border-teal-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Product Education",
      description: "Help customers understand and adopt your product faster",
      modules: ["Product Tutorials", "Onboarding Videos", "Feature Walkthroughs", "Use Case Demos"],
      color: "border-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    }
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6 text-pal-orange" />,
      title: "Faster Growth",
      description: "Video content drives 3x more engagement than text"
    },
    {
      icon: <Clock className="h-6 w-6 text-pal-orange" />,
      title: "Quick Turnaround",
      description: "Fast production cycles to match startup speed"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-pal-orange" />,
      title: "Cost Effective",
      description: "Startup-friendly pricing and flexible packages"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-pal-orange" />,
      title: "Proven Results",
      description: "Helping startups raise $10M+ with compelling video"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags 
        title="Startup Video Production | Launch & Fundraising Videos | Palmer House Productions"
        description="Video production for startups: launch videos, pitch decks, fundraising content, and growth marketing. Help your startup stand out and scale faster."
        keywords="startup video production, pitch deck videos, fundraising videos, startup marketing, product launch videos, investor pitch videos"
        ogTitle="Startup Video Production | Palmer House Productions"
        ogDescription="Launch strong with professional video content. Fundraising, product demos, and growth marketing videos for startups."
        canonicalUrl="https://www.palmerhouseproductions.com/startups"
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="services" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />

      <MainContent>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-pal-orange via-pal-orange/90 to-pal-orange/80 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-16 sm:w-20 h-16 sm:h-20 border-2 border-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-12 sm:w-16 h-12 sm:h-16 border-2 border-white rotate-45 animate-pulse delay-300"></div>
            <div className="absolute bottom-20 left-1/4 w-10 sm:w-12 h-10 sm:h-12 border-2 border-white rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-white order-2 lg:order-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
                    <Rocket className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                    Reel Pal + Spotlight Pal
                  </Badge>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
                  Startup Videos That 
                  <AnimatedText />
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-lg">
                  From MVP demos to investor pitches, we create video content that helps startups 
                  capture attention, communicate value, and accelerate growth.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                  <Button 
                    size="lg"
                    className="bg-white text-corporate-dark hover:bg-white/95 border-0 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto shadow-lg"
                    onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078320', '_blank', 'noopener,noreferrer')}
                  >
                    <Video className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-corporate-dark" />
                    Get Startup Video Quote
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-corporate-dark hover:border-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
                    onClick={() => transitionTo('/reel-pal')}
                  >
                    Explore Video Pals
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-white/90">
                      <div className="flex justify-center mb-2">
                        {benefit.icon}
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm mb-1">{benefit.title}</h3>
                      <p className="text-xs text-white/70 leading-tight">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative w-full max-w-md sm:max-w-lg mx-auto">
                  {/* Character Image */}
                  <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] mx-auto">
                    <img 
                      src={reelPalImage} 
                      alt="Reel Pal character representing startup video expertise"
                      className="w-full h-full object-contain animate-fade-in"
                      loading="eager"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 text-white animate-pulse">
                    <Rocket className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <div className="absolute bottom-8 sm:bottom-10 -left-4 sm:-left-6 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 text-white animate-pulse delay-500">
                    <TrendingUp className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Startup Video Categories */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 lg:mb-6">
                Video Solutions for Every Stage
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From idea to IPO, we create video content that accelerates your startup's growth 
                and helps you stand out in competitive markets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {startupCategories.map((category, index) => (
                <Card key={index} className={`group hover:shadow-2xl transition-all duration-300 ${category.color} border-l-6 bg-white hover:scale-105 animate-fade-in`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 ${category.bgColor} rounded-xl flex items-center justify-center ${category.iconColor} group-hover:scale-110 transition-transform`}>
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl text-gray-900 leading-tight">{category.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </CardDescription>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-800 uppercase tracking-wide">Includes:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {category.modules.map((module, moduleIndex) => (
                          <Badge key={moduleIndex} variant="secondary" className="text-xs py-1 px-3 justify-start">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 lg:mb-6">
                Our Startup-Focused Process
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Fast, flexible, and designed for the unique needs of growing startups.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  step: "01",
                  title: "Strategy Session",
                  description: "We understand your goals, audience, and key messages",
                  icon: <Lightbulb className="h-8 w-8" />,
                  color: "border-purple-500",
                  bgColor: "bg-purple-50",
                  iconColor: "text-purple-600"
                },
                {
                  step: "02", 
                  title: "Rapid Production",
                  description: "Fast turnaround without compromising quality",
                  icon: <Camera className="h-8 w-8" />,
                  color: "border-teal-500",
                  bgColor: "bg-teal-50",
                  iconColor: "text-teal-600"
                },
                {
                  step: "03",
                  title: "Iterative Feedback",
                  description: "Quick review cycles to ensure perfect messaging",
                  icon: <PlayCircle className="h-8 w-8" />,
                  color: "border-orange-500",
                  bgColor: "bg-orange-50",
                  iconColor: "text-orange-600"
                },
                {
                  step: "04",
                  title: "Launch Support",
                  description: "Multiple formats optimized for different platforms",
                  icon: <Rocket className="h-8 w-8" />,
                  color: "border-emerald-500",
                  bgColor: "bg-emerald-50",
                  iconColor: "text-emerald-600"
                }
              ].map((step, index) => (
                <Card key={index} className={`group text-center hover:shadow-2xl transition-all duration-300 ${step.color} border-l-6 bg-white hover:scale-105 animate-fade-in`}>
                  <CardHeader className="pb-4">
                    <div className="relative mb-4">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto ${step.iconColor} group-hover:scale-110 transition-transform`}>
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-gray-900 mb-3">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 lg:py-24 bg-pal-orange text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 lg:mb-6">
                Video Content That Drives Results
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                See why startups choose video to accelerate their growth and fundraising success.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
              {[
                {
                  number: "Higher",
                  label: "Engagement",
                  description: "Video content captures attention better"
                },
                {
                  number: "Proven",
                  label: "Funding Success",
                  description: "Trusted by funded startups"
                },
                {
                  number: "Better",
                  label: "Message Retention",
                  description: "Video messages stick with audiences"
                },
                {
                  number: "Fast",
                  label: "Turnaround",
                  description: "Quick concept to delivery"
                }
              ].map((stat, index) => (
                <div key={index} className="text-center animate-fade-in">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 text-white">
                    {stat.number}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold mb-2 text-white/90">
                    {stat.label}
                  </div>
                  <div className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Ready to Launch Your Video Strategy?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 lg:mb-12 leading-relaxed">
                Join hundreds of startups who've accelerated their growth with compelling video content. 
                Let's create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-pal-orange hover:bg-pal-orange/90 text-white font-semibold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 h-auto shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078320', '_blank', 'noopener,noreferrer')}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Book Your Strategy Call
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-pal-orange text-pal-orange hover:bg-pal-orange hover:text-white font-semibold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 h-auto transition-all"
                  onClick={() => transitionTo('/video-packages')}
                >
                  View Startup Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-12 lg:mt-16 text-center">
                <p className="text-sm text-gray-500 mb-4">Trusted by startups from seed to Series A and beyond</p>
                <div className="flex justify-center items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">4.9/5 from 50+ startup clients</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default StartupsPage;