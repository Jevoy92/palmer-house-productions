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
  Landmark, 
  Shield, 
  Users, 
  Video,
  CheckCircle,
  AlertTriangle,
  FileText,
  Award,
  Target,
  Clock,
  Building2,
  Scale,
  Car,
  Heart,
  Megaphone,
  UserCheck,
  Eye,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import systemPalImage from '@/assets/pals/male-system-pal-edited.png';
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';

const GovernmentPage = () => {
  const { transitionTo } = usePageTransition();

  const videoSolutions = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Public Safety & Emergency Training",
      description: "Emergency response protocols, disaster preparedness, first responder training, public safety procedures, evacuation drills, crisis communication, and interagency coordination materials.",
      palType: "System Pal",
      color: "border-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      features: ["Emergency Response", "Public Safety", "First Responder Training", "Crisis Protocols"]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Compliance & Regulatory Training",
      description: "Policy compliance, regulatory updates, ethics training, procurement procedures, workplace safety, anti-discrimination training, transparency requirements, and mandatory certification programs.",
      palType: "System Pal",
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      features: ["Policy Training", "Ethics", "Compliance", "Certifications"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Employee Development & Onboarding",
      description: "New hire orientation, leadership development, technical skill training, customer service excellence, continuing education, succession planning, and workforce development initiatives.",
      palType: "System Pal",
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      features: ["Onboarding", "Leadership", "Skills Training", "Career Development"]
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "Public Information & Communications",
      description: "Public service announcements, community education, program awareness campaigns, citizen engagement content, meeting broadcasts, press releases, and transparency initiatives.",
      palType: "Evergreen Pal + Reel Pal",
      color: "border-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      features: ["PSAs", "Community Ed", "Citizen Engagement", "Public Meetings"]
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Agency Branding & Recruitment",
      description: "Recruitment videos, agency culture showcases, career path information, benefits explanations, diversity initiatives, community impact stories, and public servant testimonials.",
      palType: "Spotlight Pal",
      color: "border-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      features: ["Recruitment", "Culture Videos", "Career Paths", "Impact Stories"]
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Social Media & Community Engagement",
      description: "Behind-the-scenes government operations, community spotlights, program updates, success stories, public meetings highlights, and transparency-building social content.",
      palType: "Reel Pal",
      color: "border-teal-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      features: ["Transparency", "Community Stories", "Program Updates", "Public Engagement"]
    }
  ];

  const industryBenefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Improve Public Safety",
      stat: "60% Better Preparedness",
      description: "Video training improves emergency response readiness"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Scale Training",
      stat: "10x Efficiency",
      description: "Train employees across locations consistently"
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Better Citizen Service",
      stat: "45% Satisfaction Increase",
      description: "Informed citizens are more satisfied with services"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Attract Talent",
      stat: "3x More Applicants",
      description: "Compelling recruitment videos attract quality candidates"
    }
  ];

  const useCases = [
    {
      title: "Federal Agencies",
      description: "Large-scale training programs, compliance documentation, interagency coordination materials, public information campaigns, recruitment videos, and mission-critical communication for federal departments and agencies.",
      icon: <Landmark className="h-6 w-6" />
    },
    {
      title: "State Government",
      description: "Statewide training initiatives, legislative education, agency recruitment, public service campaigns, emergency preparedness, and citizen engagement content for state departments and offices.",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      title: "City & County Government",
      description: "Municipal employee training, community education, public meeting broadcasts, local emergency preparedness, parks and recreation promotions, and citizen service improvement initiatives.",
      icon: <Building2 className="h-6 w-6" />
    },
    {
      title: "Law Enforcement",
      description: "Officer training, de-escalation techniques, community policing education, use of force policies, body camera protocols, recruitment videos, and public transparency initiatives.",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Fire & Emergency Services",
      description: "Firefighter training, EMS protocols, hazmat response procedures, fire safety education, community outreach, volunteer recruitment, and interagency coordination materials.",
      icon: <AlertTriangle className="h-6 w-6" />
    },
    {
      title: "Transportation & Infrastructure",
      description: "Safety training, equipment operation, maintenance procedures, traffic management, public works education, construction project updates, and community information campaigns.",
      icon: <Car className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags 
        title="Government Video Production | Public Sector Training Videos | Palmer House Productions"
        description="Video production for government agencies: public safety training, compliance education, employee development, public information, recruitment, and community engagement for federal, state, and local government."
        keywords="government video production, public sector training videos, government employee training, public safety videos, compliance training government, government recruitment videos, public information videos"
        ogTitle="Government Video Production | Public Sector Training & Communications"
        ogDescription="Specialized video production for government: public safety, compliance training, employee development, and citizen engagement for public sector agencies."
        canonicalUrl="https://www.palmerhouseproductions.com/industries/government"
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="services" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />

      <MainContent>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rotate-45 animate-pulse delay-300"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <Badge className="bg-white/20 text-white border-white/30 mb-6 text-lg px-4 py-2">
                  Government & Public Sector Solutions
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Government Video Production That Serves the Public Good
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  From public safety training to citizen engagement and employee development, we create video 
                  content that helps government agencies operate efficiently, serve citizens effectively, 
                  and build public trust through transparency and clear communication.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-white/95 font-semibold text-lg px-8 py-4 h-auto shadow-lg"
                    onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Schedule Government Consultation
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-900 font-semibold text-lg px-8 py-4 h-auto"
                    onClick={() => transitionTo('/system-pal')}
                  >
                    Explore Training Solutions
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
                      src={systemPalImage} 
                      alt="Government video production expert"
                      className="w-full h-full object-contain animate-fade-in"
                      loading="eager"
                    />
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white animate-pulse">
                    <Landmark className="h-8 w-8" />
                  </div>
                  <div className="absolute bottom-10 -left-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white animate-pulse delay-500">
                    <Shield className="h-8 w-8" />
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
                Complete Video Solutions for Government Agencies
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Whether you need public safety training, compliance education, citizen engagement content, 
                or recruitment videos, our government-focused video production services help you fulfill your 
                mission, serve citizens better, and build public trust.
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

        {/* How Each Pal Serves Government */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How Each Pal Serves Government
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every government agency needs different video solutions. Our specialized Pals deliver exactly what you need—from public safety training to citizen engagement to transparency initiatives.
              </p>
            </div>

            <Tabs defaultValue="system" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12 h-auto p-2 bg-gray-100">
                <TabsTrigger 
                  value="system" 
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  System Pal
                </TabsTrigger>
                <TabsTrigger 
                  value="evergreen" 
                  className="data-[state=active]:bg-teal-500 data-[state=active]:text-white py-3 text-sm font-medium"
                >
                  Evergreen Pal
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

              <TabsContent value="system" className="animate-fade-in">
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl border-2 border-purple-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Shield className="h-4 w-4" />
                        System Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Public Safety & Compliance Training
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Ensure consistent, high-quality training across your agency with compliance education, emergency protocols, policy training, and standardized procedures.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Essential Training Solutions:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Emergency response protocols and disaster preparedness training</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Compliance and regulatory training for government employees</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Public safety procedures and first responder coordination</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Employee onboarding and continuing education programs</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Emergency Training</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Compliance</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Public Safety</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Employee Dev</Badge>
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

              <TabsContent value="evergreen" className="animate-fade-in">
                <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl border-2 border-teal-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Megaphone className="h-4 w-4" />
                        Evergreen Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Public Information & Education
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Educate and inform citizens with public service announcements, community education programs, service explanations, and transparent communication.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Build Public Trust With:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Public service announcements for community awareness</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Program explanations and service accessibility information</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Citizen education on rights, responsibilities, and resources</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Policy updates and transparent government communications</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">PSAs</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Community Ed</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Service Info</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Transparency</Badge>
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

              <TabsContent value="reel" className="animate-fade-in">
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl border-2 border-orange-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Video className="h-4 w-4" />
                        Reel Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Community Engagement & Transparency
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Build public trust with behind-the-scenes government operations, community spotlights, program updates, and social media content that humanizes public service.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Behind-the-scenes looks at government operations and services</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Community success stories and citizen spotlights</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Quick updates on programs, initiatives, and public meetings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Public servant spotlights showing the human side of government</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Behind-the-Scenes</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Community Stories</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Updates</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Transparency</Badge>
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

              <TabsContent value="spotlight" className="animate-fade-in">
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border-2 border-pink-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Building2 className="h-4 w-4" />
                        Spotlight Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Agency Branding & Recruitment
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Attract quality public servants with recruitment videos, agency culture showcases, career information, and compelling stories that inspire people to serve.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Attract Top Talent With:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Compelling recruitment videos showcasing public service careers</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Agency culture videos and employee testimonials</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Career pathway information and benefits explanations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Community impact stories showing the difference you make</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Recruitment</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Agency Culture</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Career Paths</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Impact Stories</Badge>
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

        {/* Industry Use Cases */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Serving Government Agencies at All Levels
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From federal departments to local municipalities, we understand the unique challenges, 
                regulations, and accountability requirements of government video production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white border-t-4 border-blue-900 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900 mb-4 group-hover:scale-110 transition-transform">
                      {useCase.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900 mb-3">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Transparency */}
        <section className="py-24 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Eye className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                Secure, Compliant, & Transparent Video Production
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                We understand government requirements for security clearances, data protection, accessibility compliance (Section 508), 
                public records laws, and transparent procurement processes. Our government video production services meet federal, 
                state, and local regulations while delivering content that serves the public interest and builds citizen trust.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                {[
                  { label: "Section 508 Compliant", icon: <Eye className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "Secure Production", icon: <Shield className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "Public Records Ready", icon: <FileText className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "Transparent Process", icon: <Scale className="h-8 w-8 mx-auto mb-2" /> }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    {item.icon}
                    <div className="font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Ready to Serve Your Mission with Professional Video?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how video can help your government agency train staff effectively, 
                engage citizens authentically, and fulfill your public service mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-blue-900 text-white hover:bg-blue-950 font-semibold text-lg px-8 py-4 h-auto"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Strategy Call
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 font-semibold text-lg px-8 py-4 h-auto"
                  onClick={() => transitionTo('/contact')}
                >
                  Get Government Video Quote
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

export default GovernmentPage;