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
import { Rocket, TrendingUp, Video, CheckCircle, Target, Users, Zap, DollarSign, BarChart, Lightbulb, Award, Clock, ArrowRight, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';
const StartupsPage = () => {
  const {
    transitionTo
  } = usePageTransition();
  const videoSolutions = [{
    icon: <Rocket className="h-8 w-8" />,
    title: "Pitch Deck & Investor Videos",
    description: "Compelling pitch videos that capture investor attention, communicate your vision, showcase traction, demonstrate product-market fit, and increase fundraising success rates.",
    palType: "Spotlight Pal",
    color: "border-blue-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    features: ["Investor Pitch Videos", "Demo Day Content", "Vision Communication", "Traction Showcase"]
  }, {
    icon: <Play className="h-8 w-8" />,
    title: "Product Demo & Explainer Videos",
    description: "Clear, engaging product demonstrations that showcase features, highlight benefits, simplify complex technology, and convert prospects into customers.",
    palType: "Evergreen Pal",
    color: "border-teal-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    features: ["Product Demos", "Feature Highlights", "Use Case Videos", "Explainer Content"]
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "Social Media & Growth Marketing",
    description: "High-impact social content that drives viral growth, builds community, showcases company culture, attracts early adopters, and amplifies your startup's voice.",
    palType: "Reel Pal",
    color: "border-orange-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    features: ["Viral Content", "Community Building", "Culture Videos", "Growth Marketing"]
  }, {
    icon: <Award className="h-8 w-8" />,
    title: "Brand Story & Mission Videos",
    description: "Authentic storytelling that communicates your founding story, showcases team passion, builds emotional connection with customers, and differentiates your brand.",
    palType: "Spotlight Pal",
    color: "border-purple-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    features: ["Founding Story", "Team Culture", "Mission Videos", "Brand Identity"]
  }, {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Customer Success & Testimonials",
    description: "Powerful social proof through customer stories, success metrics, use case demonstrations, and testimonials that accelerate sales cycles and build credibility.",
    palType: "Spotlight Pal",
    color: "border-green-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    features: ["Customer Stories", "Success Metrics", "Social Proof", "Case Studies"]
  }, {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Internal Training & Onboarding",
    description: "Scalable training systems that onboard new hires faster, standardize processes, document knowledge, and maintain company culture as you grow.",
    palType: "System Pal",
    color: "border-red-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    features: ["New Hire Onboarding", "Process Documentation", "Culture Training", "Knowledge Base"]
  }];
  const industryBenefits = [{
    icon: <DollarSign className="h-6 w-6" />,
    title: "Increase Funding",
    stat: "2x More Likely",
    description: "Startups with pitch videos raise significantly more capital"
  }, {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Accelerate Growth",
    stat: "5x Conversion",
    description: "Video content converts visitors to customers faster"
  }, {
    icon: <Clock className="h-6 w-6" />,
    title: "Scale Faster",
    stat: "60% Time Saved",
    description: "Video training systems enable rapid team scaling"
  }, {
    icon: <BarChart className="h-6 w-6" />,
    title: "Boost Engagement",
    stat: "10x Reach",
    description: "Social video content increases brand awareness"
  }];
  const useCases = [{
    title: "Pre-Seed & Seed Stage",
    description: "Pitch videos for accelerators and angel investors, MVP product demos, founder story videos, early customer testimonials, and social content to build initial traction.",
    icon: <Rocket className="h-6 w-6" />
  }, {
    title: "Series A & Growth Stage",
    description: "Professional investor presentations, product marketing videos, customer success stories, recruiting content, thought leadership videos, and brand awareness campaigns.",
    icon: <TrendingUp className="h-6 w-6" />
  }, {
    title: "SaaS & B2B Tech",
    description: "Product demos, feature explainers, customer onboarding videos, training systems, webinar content, and sales enablement materials that shorten sales cycles.",
    icon: <Zap className="h-6 w-6" />
  }, {
    title: "D2C & E-commerce",
    description: "Product showcase videos, user-generated content campaigns, social media content, influencer collaborations, brand storytelling, and conversion-optimized product videos.",
    icon: <Target className="h-6 w-6" />
  }, {
    title: "Mobile Apps & Platforms",
    description: "App store videos, feature demos, user testimonials, tutorial content, growth marketing videos, and social proof content that drives downloads and engagement.",
    icon: <Play className="h-6 w-6" />
  }, {
    title: "Impact & Social Ventures",
    description: "Mission videos, impact stories, donor engagement content, community building videos, awareness campaigns, and storytelling that attracts supporters and customers.",
    icon: <Award className="h-6 w-6" />
  }];
  return <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags title="Startup Video Production | Pitch Videos & Product Demos | Palmer House Productions" description="Video production for startups: investor pitch videos, product demos, social media content, brand storytelling, customer testimonials, and training systems that accelerate growth and funding." keywords="startup video production, pitch deck videos, product demo videos, investor videos, startup marketing videos, saas demo videos, startup storytelling, growth marketing videos" ogTitle="Startup Video Production | Accelerate Growth & Funding" ogDescription="Help your startup grow faster with compelling video content: pitch videos, product demos, social media, and customer stories that drive results." canonicalUrl="https://www.palmerhouseproductions.com/startups" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="services" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />

      <MainContent>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
                Startup Solutions
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
                Startup Video Production That Accelerates Growth & Funding
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                From pitch videos that wow investors to product demos that convert customers, we create video 
                content that helps startups grow faster, raise more capital, and build stronger brands.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 font-semibold text-lg px-8 py-6 h-auto shadow-lg" onClick={() => window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer')}>
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg px-8 py-6 h-auto" onClick={() => transitionTo('/pals')}>
                  Meet the Pals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {industryBenefits.map((benefit, index) => <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{benefit.stat}</div>
                    <h3 className="font-semibold text-sm text-gray-700 mb-1">{benefit.title}</h3>
                    <p className="text-xs text-gray-500 leading-tight">{benefit.description}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Our Video Production Process */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[{
              number: "1",
              title: "Discovery",
              description: "Understanding your startup's vision, target market, and growth goals through detailed consultation.",
              color: "bg-orange-100",
              textColor: "text-orange-600"
            }, {
              number: "2",
              title: "Planning",
              description: "Developing compelling scripts and storyboards that communicate your unique value proposition.",
              color: "bg-pink-100",
              textColor: "text-pink-600"
            }, {
              number: "3",
              title: "Production",
              description: "Professional filming that captures your team's passion and showcases your product's potential.",
              color: "bg-purple-100",
              textColor: "text-purple-600"
            }, {
              number: "4",
              title: "Delivery",
              description: "Optimized videos ready for pitches, social media, websites, and investor presentations.",
              color: "bg-blue-100",
              textColor: "text-blue-600"
            }].map((step, index) => <div key={index} className="text-center">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <span className={`text-3xl font-bold ${step.textColor}`}>{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>)}
            </div>

            {/* Startup Video Specialties */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Startup Video Specialties</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                We understand the unique challenges startups face at every stage, from pre-seed to Series A and beyond.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  {[{
                  icon: <Rocket className="h-6 w-6" />,
                  title: "Investor Pitch Videos",
                  description: "Compelling narratives that capture attention and communicate traction.",
                  color: "bg-blue-100",
                  iconColor: "text-blue-600"
                }, {
                  icon: <Play className="h-6 w-6" />,
                  title: "Product Demonstrations",
                  description: "Clear showcases of features, benefits, and competitive advantages.",
                  color: "bg-green-100",
                  iconColor: "text-green-600"
                }, {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: "Growth Marketing",
                  description: "Viral-ready social content that drives customer acquisition.",
                  color: "bg-purple-100",
                  iconColor: "text-purple-600"
                }, {
                  icon: <Award className="h-6 w-6" />,
                  title: "Brand Storytelling",
                  description: "Authentic stories that build emotional connections with customers.",
                  color: "bg-orange-100",
                  iconColor: "text-orange-600"
                }].map((specialty, index) => <div key={index} className="flex items-start gap-4">
                      <div className={`w-14 h-14 ${specialty.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className={specialty.iconColor}>{specialty.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{specialty.title}</h3>
                        <p className="text-gray-600">{specialty.description}</p>
                      </div>
                    </div>)}
                </div>

                {/* Decorative Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-4 h-full">
                  <div className="bg-purple-200 rounded-3xl flex items-center justify-center h-48">
                    <Rocket className="h-16 w-16 text-purple-600" />
                  </div>
                  <div className="bg-blue-200 rounded-3xl flex items-center justify-center h-48">
                    <TrendingUp className="h-16 w-16 text-blue-600" />
                  </div>
                  <div className="bg-green-200 rounded-3xl flex items-center justify-center h-48">
                    <Target className="h-16 w-16 text-green-600" />
                  </div>
                  <div className="bg-orange-200 rounded-3xl flex items-center justify-center h-48">
                    <Video className="h-16 w-16 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Solutions Grid */}
        

        {/* Who We Serve */}
        

        {/* Final CTA */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Accelerate Your Startup's Growth?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Let's create video content that helps you raise more capital, grow faster, and build a stronger brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer')}>
                Schedule Startup Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => transitionTo('/contact')}>
                Request a Quote
              </Button>
            </div>
          </div>
        </section>
      </MainContent>
    </div>;
};
export default StartupsPage;