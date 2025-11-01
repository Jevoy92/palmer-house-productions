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
import { 
  Briefcase, 
  Users, 
  Video,
  CheckCircle,
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Building2,
  Scale,
  Calculator,
  Shield,
  FileText,
  Lightbulb,
  UserCheck,
  Globe,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';

const ProfessionalServicesPage = () => {
  const { transitionTo } = usePageTransition();

  const videoSolutions = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Thought Leadership & Authority Building",
      description: "Executive interviews, industry insights, expert commentary, webinar content, conference presentations, white paper videos, and professional expertise showcases that position your firm as industry leaders.",
      palType: "Evergreen Pal",
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      features: ["Expert Interviews", "Industry Insights", "Webinar Content", "Authority Building"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Client Testimonials & Case Studies",
      description: "Client success stories, project case studies, outcome showcases, before-and-after narratives, ROI demonstrations, and social proof content that builds trust and credibility.",
      palType: "Spotlight Pal",
      color: "border-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      features: ["Success Stories", "Case Studies", "ROI Proof", "Client Testimonials"]
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Service Explanations & Education",
      description: "Service overview videos, process explanations, complex topic simplification, FAQ videos, how-to guides, industry education, and client onboarding content.",
      palType: "Evergreen Pal",
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      features: ["Service Overviews", "Process Explanations", "FAQ Videos", "Educational Content"]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Firm Marketing & Business Development",
      description: "Firm introduction videos, capabilities presentations, practice area highlights, conference booth content, proposal support videos, and new business pitch materials.",
      palType: "Spotlight Pal",
      color: "border-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      features: ["Firm Introductions", "Capabilities", "Pitch Support", "BD Materials"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Social Media & LinkedIn Presence",
      description: "Professional insights, quick tips, industry updates, behind-the-scenes firm culture, partner spotlights, networking content, and LinkedIn thought leadership videos.",
      palType: "Reel Pal",
      color: "border-teal-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      features: ["LinkedIn Content", "Quick Tips", "Firm Culture", "Partner Spotlights"]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Internal Training & Compliance",
      description: "Professional development, compliance training, standard operating procedures, client service protocols, technology training, and firm policy communication.",
      palType: "System Pal",
      color: "border-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      features: ["Compliance Training", "SOPs", "Tech Training", "Policy Updates"]
    }
  ];

  const industryBenefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Generate More Leads",
      stat: "5x More Inquiries",
      description: "Video content drives significantly more qualified leads"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Build Authority",
      stat: "3x Trust Factor",
      description: "Video establishes expertise faster than written content"
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Win More Business",
      stat: "40% Higher Close Rate",
      description: "Prospects who watch videos are more likely to engage"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Scale Your Expertise",
      stat: "24/7 Availability",
      description: "Multiply your reach without multiplying your time"
    }
  ];

  const useCases = [
    {
      title: "Law Firms",
      description: "Practice area explanations, attorney profiles, client success stories, legal education content, firm culture videos, and thought leadership that demonstrates expertise and builds trust with potential clients.",
      icon: <Scale className="h-6 w-6" />
    },
    {
      title: "Accounting & Financial Services",
      description: "Tax planning tips, financial education, service explanations, advisor introductions, compliance updates, market insights, and client testimonials that simplify complex financial concepts.",
      icon: <Calculator className="h-6 w-6" />
    },
    {
      title: "Consulting Firms",
      description: "Methodology explanations, case study showcases, industry expertise demonstrations, consultant profiles, transformation stories, and thought leadership that differentiates your approach.",
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      title: "Architecture & Engineering",
      description: "Project showcases, design process videos, technical expertise demonstrations, sustainability initiatives, innovation highlights, and client collaboration stories that bring projects to life.",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      title: "Marketing & Advertising Agencies",
      description: "Campaign showcases, creative process videos, client results, team culture content, industry insights, and portfolio presentations that demonstrate creative excellence and strategic thinking.",
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      title: "Insurance & Risk Management",
      description: "Coverage explanations, risk assessment education, claims process walkthroughs, agent introductions, client protection stories, and industry insights that build confidence and trust.",
      icon: <Shield className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags 
        title="Professional Services Video Production | Law Firm & Consulting Videos | Palmer House"
        description="Video production for professional services: law firms, consulting, accounting, architecture, and agencies. Build authority, attract clients, and showcase expertise with compelling video content."
        keywords="professional services video production, law firm videos, consulting videos, accounting videos, thought leadership videos, client testimonials, case study videos, professional services marketing"
        ogTitle="Professional Services Video Production | Authority & Client Attraction"
        ogDescription="Build authority and attract high-value clients with professional video content for law firms, consultants, accountants, and professional service firms."
        canonicalUrl="https://www.palmerhouseproductions.com/industries/professional-services"
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="services" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />

      <MainContent>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-indigo-700 via-blue-600 to-purple-600 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rotate-45 animate-pulse delay-300"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <Badge className="bg-white/20 text-white border-white/30 mb-6 text-lg px-4 py-2">
                  Professional Services Solutions
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Professional Services Video Production That Builds Authority & Wins Clients
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  From law firms to consulting practices, we create video content that showcases your expertise, 
                  builds trust with potential clients, and positions your firm as the clear choice in competitive 
                  professional services markets.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button 
                    size="lg"
                    className="bg-white text-indigo-700 hover:bg-white/95 font-semibold text-lg px-8 py-4 h-auto shadow-lg"
                    onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Schedule Consultation
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-indigo-700 font-semibold text-lg px-8 py-4 h-auto"
                    onClick={() => transitionTo('/evergreen-pal')}
                  >
                    Explore Authority Building
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {industryBenefits.map((benefit, index) => (
                    <div key={index} className="text-white/90">
                      <div className="flex justify-center mb-2">
                        {benefit.icon}
                      </div>
                      <div className="text-2xl font-bold mb-1">{benefit.stat}</div>
                      <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                      <p className="text-xs text-white/70 leading-tight">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] mx-auto">
                    <img 
                      src={evergreenPalImage} 
                      alt="Professional services video production expert"
                      className="w-full h-full object-contain animate-fade-in"
                      loading="eager"
                    />
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white animate-pulse">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <div className="absolute bottom-10 -left-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white animate-pulse delay-500">
                    <Award className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Solutions Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Video Solutions That Elevate Professional Service Firms
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Whether you need thought leadership content, client testimonials, service explanations, or social media presence, 
                our professional services video production helps you stand out, build authority, and attract higher-value clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoSolutions.map((solution, index) => (
                <Card key={index} className={`group hover:shadow-2xl transition-all duration-300 ${solution.color} border-l-6 bg-white hover:scale-105`}>
                  <CardHeader>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 ${solution.bgColor} rounded-xl flex items-center justify-center ${solution.iconColor} group-hover:scale-110 transition-transform`}>
                        {solution.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {solution.palType}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-gray-900 mb-3">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">
                      {solution.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
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

        {/* How Each Pal Serves Professional Services */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How Each Pal Serves Professional Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every professional service firm needs different video solutions. Our specialized Pals deliver exactly what you need—from thought leadership to client testimonials to authority building.
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
                  value="spotlight" 
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  Spotlight Pal
                </TabsTrigger>
                <TabsTrigger 
                  value="reel" 
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  Reel Pal
                </TabsTrigger>
                <TabsTrigger 
                  value="system" 
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  System Pal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="evergreen" className="animate-fade-in">
                <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl border-2 border-teal-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Briefcase className="h-4 w-4" />
                        Evergreen Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Thought Leadership & Authority
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Build authority and attract high-value clients with expert interviews, industry insights, service explanations, and educational content that positions you as the trusted advisor.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Build Authority With:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Executive interviews and expert commentary on industry trends</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Service explanation videos that simplify complex offerings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Educational content that demonstrates deep expertise</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Webinar content and conference presentations</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Expert Interviews</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Service Explanations</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Educational Content</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Webinars</Badge>
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

              <TabsContent value="spotlight" className="animate-fade-in">
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border-2 border-pink-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Users className="h-4 w-4" />
                        Spotlight Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Client Success & Social Proof
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Win more business with powerful client testimonials, case study videos, success stories, and firm marketing content that builds trust and credibility.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Win More Business With:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Compelling client testimonials and success story documentaries</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Case study videos showcasing measurable results and ROI</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Firm introduction videos and capabilities presentations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Proposal support videos and new business pitch materials</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Client Testimonials</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Case Studies</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Firm Intro</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Pitch Materials</Badge>
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

              <TabsContent value="reel" className="animate-fade-in">
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl border-2 border-orange-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Video className="h-4 w-4" />
                        Reel Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Social Media & LinkedIn Presence
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Build your professional brand with LinkedIn content, quick tips, industry insights, partner spotlights, and networking content that positions you as a thought leader.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>LinkedIn thought leadership and professional insights</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Quick tips and bite-sized industry updates</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Partner and team member spotlights</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Behind-the-scenes firm culture and values content</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">LinkedIn Content</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Quick Tips</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Partner Spotlights</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Firm Culture</Badge>
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

              <TabsContent value="system" className="animate-fade-in">
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl border-2 border-purple-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                        <FileText className="h-4 w-4" />
                        System Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Internal Training & Compliance
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Scale your team's expertise with professional development, compliance training, standard operating procedures, and internal communications.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Essential Training Solutions:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Professional development and continuing education programs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Compliance training and regulatory requirement updates</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Standard operating procedures and client service protocols</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Technology training and firm policy communications</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Professional Dev</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Compliance</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">SOPs</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Tech Training</Badge>
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
            </Tabs>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Ready to Elevate Your Firm's Marketing & Authority?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how video can help your professional services firm attract better clients, 
                command premium fees, and establish unquestionable authority in your market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-indigo-700 text-white hover:bg-indigo-800 font-semibold text-lg px-8 py-4 h-auto"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Strategy Call
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-indigo-700 text-indigo-700 hover:bg-indigo-50 font-semibold text-lg px-8 py-4 h-auto"
                  onClick={() => transitionTo('/contact')}
                >
                  Request Video Proposal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default ProfessionalServicesPage;