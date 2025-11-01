import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePageTransition } from '@/components/PageTransition';
import { 
  Cpu, 
  Cloud, 
  Shield, 
  Code,
  CheckCircle,
  Video,
  Target,
  Clock,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Rocket,
  Zap,
  Globe,
  Laptop,
  Server,
  Database,
  Smartphone,
  Cog
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';

const TechnologyPage = () => {
  const { transitionTo } = usePageTransition();

  const videoSolutions = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Product Demos & Tutorials",
      description: "Clear, engaging product demonstrations, feature walkthroughs, API documentation, SDK tutorials, and technical onboarding content that accelerates user adoption.",
      palType: "Evergreen Pal",
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      features: ["Product Demos", "Feature Walkthroughs", "API Documentation", "SDK Tutorials"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Onboarding & Training",
      description: "Comprehensive onboarding series, user training videos, implementation guides, best practices documentation, and customer success content.",
      palType: "System Pal",
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      features: ["User Onboarding", "Implementation Guides", "Best Practices", "Success Training"]
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Product Launches & Updates",
      description: "Exciting launch videos, feature announcement content, release notes videos, update walkthroughs, and version migration guides.",
      palType: "Spotlight Pal",
      color: "border-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      features: ["Launch Videos", "Feature Announcements", "Release Notes", "Migration Guides"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Compliance Training",
      description: "Security best practices, compliance training, data protection protocols, cybersecurity awareness, and regulatory requirement videos.",
      palType: "System Pal",
      color: "border-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      features: ["Security Protocols", "Compliance Training", "Data Protection", "Cyber Awareness"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Social Media & Brand Content",
      description: "Tech tips and industry insights, product teasers, developer spotlights, company culture content, and thought leadership videos.",
      palType: "Reel Pal",
      color: "border-teal-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      features: ["Tech Tips", "Product Teasers", "Developer Spotlights", "Culture Content"]
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Developer Resources & Documentation",
      description: "Video documentation, coding tutorials, architecture overviews, integration guides, and technical webinar content.",
      palType: "Evergreen Pal",
      color: "border-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      features: ["Video Docs", "Coding Tutorials", "Architecture Guides", "Integration Demos"]
    }
  ];

  const industryBenefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Faster Adoption",
      stat: "3x Faster",
      description: "Users adopt products quicker with video training"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Reduce Support Tickets",
      stat: "40% Reduction",
      description: "Self-service video resources decrease support load"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Better User Experience",
      stat: "85% Satisfaction",
      description: "Video documentation improves user satisfaction"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Boost Conversions",
      stat: "2x Higher",
      description: "Product demos double trial-to-paid conversion"
    }
  ];

  const useCases = [
    {
      title: "SaaS Companies",
      description: "Product demo videos, feature tutorials, customer onboarding series, and help center content. Reduce churn with clear, engaging video documentation that helps users get value faster.",
      icon: <Cloud className="h-6 w-6" />
    },
    {
      title: "Enterprise Software",
      description: "Implementation training, admin guides, security documentation, and integration tutorials. Support complex deployments with comprehensive video resources for IT teams.",
      icon: <Server className="h-6 w-6" />
    },
    {
      title: "Developer Tools",
      description: "API documentation videos, SDK tutorials, code examples, and integration guides. Help developers succeed with clear technical content that accelerates implementation.",
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "Mobile Apps",
      description: "App store preview videos, feature highlights, user tutorials, and social promotion content. Drive downloads and engagement with compelling mobile-first video content.",
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      title: "Hardware Tech",
      description: "Product demonstrations, setup guides, troubleshooting videos, and maintenance tutorials. Support physical products with visual instructions that reduce returns.",
      icon: <Laptop className="h-6 w-6" />
    },
    {
      title: "Cybersecurity",
      description: "Security awareness training, threat analysis videos, compliance documentation, and incident response guides. Educate teams on best practices with engaging security content.",
      icon: <Shield className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags 
        title="Technology Video Production | Software Demos & Training | Palmer House Productions"
        description="Technology video production: product demos, software tutorials, customer onboarding, developer documentation, security training, and launch videos for tech companies."
        keywords="technology video production, software demo videos, SaaS product videos, tech training videos, developer documentation, API tutorial videos, product launch videos"
        ogTitle="Technology Video Production | Software Demos & Training"
        ogDescription="Specialized video production for technology companies: product demos, training, documentation, and launch content."
        canonicalUrl="https://www.palmerhouseproductions.com/industries/technology"
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="services" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />

      <MainContent>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
                Technology Industry
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
                Technology Video Production That Accelerates Product Adoption
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                From product demos to developer documentation, we create video content that helps users understand your technology faster, reducing support costs and driving growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg px-8 py-6 h-auto shadow-lg"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg px-8 py-6 h-auto"
                  onClick={() => transitionTo('/pals')}
                >
                  Meet the Pals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {industryBenefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{benefit.stat}</div>
                    <h3 className="font-semibold text-sm text-gray-700 mb-1">{benefit.title}</h3>
                    <p className="text-xs text-gray-500 leading-tight">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Video Production Process */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[
                {
                  number: "1",
                  title: "Discovery",
                  description: "Understanding your product, users, and technical requirements through detailed consultation.",
                  color: "bg-orange-100",
                  textColor: "text-orange-600"
                },
                {
                  number: "2",
                  title: "Planning",
                  description: "Creating scripts, storyboards, and technical documentation strategies.",
                  color: "bg-pink-100",
                  textColor: "text-pink-600"
                },
                {
                  number: "3",
                  title: "Production",
                  description: "Professional filming with screen capture, animations, and technical demonstrations.",
                  color: "bg-blue-100",
                  textColor: "text-blue-600"
                },
                {
                  number: "4",
                  title: "Delivery",
                  description: "Optimized videos with interactive elements, captions, and multi-platform formatting.",
                  color: "bg-green-100",
                  textColor: "text-green-600"
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <span className={`text-3xl font-bold ${step.textColor}`}>{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Technology Video Specialties */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Video Specialties</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Our expertise spans across various technology sectors, from SaaS to hardware, ensuring we understand your unique challenges.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  {[
                    {
                      icon: <Cloud className="h-6 w-6" />,
                      title: "SaaS & Cloud Platforms",
                      description: "Product demos, feature tutorials, and customer success content.",
                      color: "bg-blue-100",
                      iconColor: "text-blue-600"
                    },
                    {
                      icon: <Code className="h-6 w-6" />,
                      title: "Developer Tools & APIs",
                      description: "Technical documentation, coding tutorials, and integration guides.",
                      color: "bg-green-100",
                      iconColor: "text-green-600"
                    },
                    {
                      icon: <Database className="h-6 w-6" />,
                      title: "Enterprise Software",
                      description: "Implementation training, admin guides, and security documentation.",
                      color: "bg-purple-100",
                      iconColor: "text-purple-600"
                    },
                    {
                      icon: <Smartphone className="h-6 w-6" />,
                      title: "Mobile & Apps",
                      description: "App previews, feature highlights, and user tutorial content.",
                      color: "bg-orange-100",
                      iconColor: "text-orange-600"
                    }
                  ].map((specialty, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-14 h-14 ${specialty.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className={specialty.iconColor}>{specialty.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{specialty.title}</h3>
                        <p className="text-gray-600">{specialty.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Grid */}
                <div className="hidden lg:grid grid-cols-2 gap-4 h-full">
                  <div className="bg-blue-200 rounded-3xl flex items-center justify-center h-48">
                    <Code className="h-16 w-16 text-blue-600" />
                  </div>
                  <div className="bg-green-200 rounded-3xl flex items-center justify-center h-48">
                    <Zap className="h-16 w-16 text-green-600" />
                  </div>
                  <div className="bg-purple-200 rounded-3xl flex items-center justify-center h-48">
                    <Globe className="h-16 w-16 text-purple-600" />
                  </div>
                  <div className="bg-orange-200 rounded-3xl flex items-center justify-center h-48">
                    <Rocket className="h-16 w-16 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Technology Video Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Technology Video Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive video production solutions for technology companies, designed to educate users and accelerate product adoption.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Code className="h-8 w-8" />,
                  badge: "Product Content",
                  title: "Demo Videos",
                  description: "Engaging product demonstrations that showcase features and drive conversions.",
                  features: ["Product walkthroughs", "Feature highlights", "Use case demos"],
                  color: "bg-blue-100",
                  iconColor: "text-blue-600",
                  badgeColor: "bg-blue-100 text-blue-700"
                },
                {
                  icon: <BookOpen className="h-8 w-8" />,
                  badge: "User Training",
                  title: "Tutorial Content",
                  description: "Step-by-step guides that help users master your product quickly.",
                  features: ["Getting started guides", "Advanced tutorials", "Best practices"],
                  color: "bg-green-100",
                  iconColor: "text-green-600",
                  badgeColor: "bg-green-100 text-green-700"
                },
                {
                  icon: <Rocket className="h-8 w-8" />,
                  badge: "Marketing",
                  title: "Launch Videos",
                  description: "Compelling launch content that generates buzz and drives adoption.",
                  features: ["Product launches", "Feature announcements", "Company updates"],
                  color: "bg-purple-100",
                  iconColor: "text-purple-600",
                  badgeColor: "bg-purple-100 text-purple-700"
                }
              ].map((service, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <span className={service.iconColor}>{service.icon}</span>
                    </div>
                    <Badge className={`mb-4 ${service.badgeColor}`}>{service.badge}</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How Each Pal Serves Technology */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How Each Pal Serves Technology
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every tech company needs different video solutions. Our specialized Pals deliver exactly what you need—from product demos to training systems to developer content.
              </p>
            </div>

            <Tabs defaultValue="evergreen" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12 h-auto p-2 bg-gray-100">
                <TabsTrigger 
                  value="evergreen" 
                  className="data-[state=active]:bg-teal-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  Evergreen Pal
                </TabsTrigger>
                <TabsTrigger 
                  value="system" 
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  System Pal
                </TabsTrigger>
                <TabsTrigger 
                  value="reel" 
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  Reel Pal
                </TabsTrigger>
                <TabsTrigger 
                  value="spotlight" 
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  Spotlight Pal
                </TabsTrigger>
              </TabsList>

              {/* Evergreen Pal Content */}
              <TabsContent value="evergreen" className="animate-fade-in">
                <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl border-2 border-teal-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                        <BookOpen className="h-4 w-4" />
                        Evergreen Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Product Documentation & Tutorials
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Create comprehensive product demos, feature tutorials, API documentation, and user guides that help customers succeed with your technology.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Product demonstration videos showcasing key features and benefits</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Step-by-step tutorial series for getting started and advanced use</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>API and SDK documentation with code examples and walkthroughs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Help center and knowledge base video content library</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Product Demos</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Tutorial Series</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">API Docs</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Knowledge Base</Badge>
                        </div>
                      </div>

                      <Button 
                        onClick={() => transitionTo('/evergreen-pal')}
                        className="bg-teal-500 hover:bg-teal-600 text-white mt-4"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <img 
                        src={evergreenPalImage}
                        alt="Evergreen Pal character" 
                        className="w-full max-w-md h-auto object-contain animate-fade-in"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* System Pal Content */}
              <TabsContent value="system" className="animate-fade-in">
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl border-2 border-purple-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Cog className="h-4 w-4" />
                        System Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Customer Onboarding & Training
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Scalable onboarding systems, implementation training, admin guides, and security training that ensure customer success and reduce support tickets.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Essential Training Solutions:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Customer onboarding series that reduce time-to-value</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Implementation and admin training for enterprise deployments</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Security and compliance training for technical teams</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Role-based training paths for different user types</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Onboarding</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Implementation</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Security Training</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Admin Guides</Badge>
                        </div>
                      </div>

                      <Button 
                        onClick={() => transitionTo('/system-pal')}
                        className="bg-purple-500 hover:bg-purple-600 text-white mt-4"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <img 
                        src={systemPalImage}
                        alt="System Pal character" 
                        className="w-full max-w-md h-auto object-contain animate-fade-in"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Reel Pal Content */}
              <TabsContent value="reel" className="animate-fade-in">
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl border-2 border-orange-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Video className="h-4 w-4" />
                        Reel Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Social Media & Tech Content
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Engage your community with tech tips, product teasers, developer spotlights, and company culture content that builds brand awareness and drives growth.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Quick tech tips and industry insights for social platforms</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Product teaser videos and feature announcement shorts</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Developer and team spotlight content showcasing expertise</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Behind-the-scenes and company culture videos</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Tech Tips</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Product Teasers</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Dev Spotlights</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Culture Content</Badge>
                        </div>
                      </div>

                      <Button 
                        onClick={() => transitionTo('/reel-pal')}
                        className="bg-orange-500 hover:bg-orange-600 text-white mt-4"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <img 
                        src={reelPalImage}
                        alt="Reel Pal character" 
                        className="w-full max-w-md h-auto object-contain animate-fade-in"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Spotlight Pal Content */}
              <TabsContent value="spotlight" className="animate-fade-in">
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border-2 border-pink-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Rocket className="h-4 w-4" />
                        Spotlight Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Product Launches & Brand Content
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Create high-impact launch videos, promotional content, case studies, and brand storytelling that positions your technology as industry-leading.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Premium Content Solutions:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Cinematic product launch videos that generate buzz and excitement</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Customer success stories and case study videos for marketing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Brand storytelling and company vision videos for investors</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Conference and event promotional content that stands out</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Launch Videos</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Case Studies</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Brand Stories</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Event Content</Badge>
                        </div>
                      </div>

                      <Button 
                        onClick={() => transitionTo('/spotlight-pal')}
                        className="bg-pink-500 hover:bg-pink-600 text-white mt-4"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <img 
                        src={spotlightPalImage}
                        alt="Spotlight Pal character" 
                        className="w-full max-w-md h-auto object-contain animate-fade-in"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Serve in Technology</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From startups to enterprise software companies, we create video content that helps technology businesses scale and succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Accelerate Your Product Adoption?
            </h2>
            <p className="text-xl mb-10 text-blue-100 leading-relaxed">
              Let's create video content that helps users understand your technology faster, reduces support costs, and drives growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-6 h-auto shadow-lg"
                onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 h-auto"
                onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000116032', '_blank', 'noopener,noreferrer')}
              >
                Request Quote
              </Button>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default TechnologyPage;