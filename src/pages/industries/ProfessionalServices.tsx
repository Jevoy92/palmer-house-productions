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
        <section className="relative py-16 sm:py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge className="mb-6 text-lg px-4 py-2">
                Professional Services Solutions
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-foreground">
                Professional Services Video Production That Builds Authority & Wins Clients
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                From law firms to consulting practices, we create video content that showcases your expertise, 
                builds trust with potential clients, and positions your firm as the clear choice in competitive 
                professional services markets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => transitionTo('/evergreen-pal')}
                >
                  Explore Authority Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {industryBenefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-primary">
                      {benefit.icon}
                    </div>
                    <div className="text-2xl font-bold mb-1 text-foreground">{benefit.stat}</div>
                    <h3 className="font-semibold text-sm mb-1 text-foreground">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground leading-tight">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative max-w-2xl mx-auto">
              <div className="relative w-full max-w-lg mx-auto">
                <img 
                  src={evergreenPalImage} 
                  alt="Professional services video production expert"
                  className="w-full h-auto object-contain animate-fade-in"
                  loading="eager"
                />
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
                  description: "Understanding your firm, clients, and competitive positioning through detailed consultation.",
                  color: "bg-orange-100",
                  textColor: "text-orange-600"
                },
                {
                  number: "2",
                  title: "Planning",
                  description: "Developing messaging, content strategy, and production timelines tailored to your practice.",
                  color: "bg-pink-100",
                  textColor: "text-pink-600"
                },
                {
                  number: "3",
                  title: "Production",
                  description: "Professional filming with equipment and expertise that reflects your firm's professionalism.",
                  color: "bg-blue-100",
                  textColor: "text-blue-600"
                },
                {
                  number: "4",
                  title: "Delivery",
                  description: "Final videos optimized for your website, social media, and business development needs.",
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

            {/* Professional Services Video Specialties */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Services Specialties</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Our expertise spans across various professional service sectors, ensuring we understand the unique challenges and opportunities in your field.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  {[
                    {
                      icon: <Scale className="h-6 w-6" />,
                      title: "Law Firms",
                      description: "Practice area explanations and thought leadership for legal professionals.",
                      color: "bg-blue-100",
                      iconColor: "text-blue-600"
                    },
                    {
                      icon: <Calculator className="h-6 w-6" />,
                      title: "Accounting & Finance",
                      description: "Financial education and service explanations that build trust.",
                      color: "bg-green-100",
                      iconColor: "text-green-600"
                    },
                    {
                      icon: <Lightbulb className="h-6 w-6" />,
                      title: "Consulting Firms",
                      description: "Methodology showcases and transformation stories.",
                      color: "bg-purple-100",
                      iconColor: "text-purple-600"
                    },
                    {
                      icon: <Building2 className="h-6 w-6" />,
                      title: "Architecture & Engineering",
                      description: "Project showcases and technical expertise demonstrations.",
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
                    <Video className="h-16 w-16 text-blue-600" />
                  </div>
                  <div className="bg-green-200 rounded-3xl flex items-center justify-center h-48">
                    <Briefcase className="h-16 w-16 text-green-600" />
                  </div>
                  <div className="bg-purple-200 rounded-3xl flex items-center justify-center h-48">
                    <Award className="h-16 w-16 text-purple-600" />
                  </div>
                  <div className="bg-orange-200 rounded-3xl flex items-center justify-center h-48">
                    <TrendingUp className="h-16 w-16 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Professional Services Video Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Professional Services Video Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive video production solutions tailored for professional service firms, 
                designed to build authority, attract clients, and differentiate your practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {videoSolutions.map((solution, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 ${solution.color} border-2`}>
                  <CardHeader>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 ${solution.bgColor} rounded-xl flex items-center justify-center ${solution.iconColor}`}>
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