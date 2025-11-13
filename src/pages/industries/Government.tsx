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
  ArrowRight,
  Lock,
  FileCheck,
  Package,
  Zap
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
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
                Government Industry
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
                Government Video Production That Serves the Public Good
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                From public safety training to citizen engagement and transparency initiatives, 
                we create compliant, accessible video content that helps government agencies 
                fulfill their mission and build public trust.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg px-8 py-6 h-auto shadow-lg"
                  onClick={() => window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer')}
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
                  description: "Understanding your agency's mission, audience, and compliance requirements through detailed consultation.",
                  color: "bg-orange-100",
                  textColor: "text-orange-600"
                },
                {
                  number: "2",
                  title: "Planning",
                  description: "Developing scripts, storyboards, and production timelines that meet government standards and regulations.",
                  color: "bg-pink-100",
                  textColor: "text-pink-600"
                },
                {
                  number: "3",
                  title: "Production",
                  description: "Professional filming with security clearances and protocols ensuring minimal disruption to operations.",
                  color: "bg-blue-100",
                  textColor: "text-blue-600"
                },
                {
                  number: "4",
                  title: "Delivery",
                  description: "Final videos with Section 508 compliance, public records documentation, and approved file formats.",
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

            {/* Government Video Specialties */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Government Video Specialties</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Our expertise spans across various government sectors, ensuring we understand the unique compliance and communication requirements of your agency.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  {[
                    {
                      icon: <Landmark className="h-6 w-6" />,
                      title: "Federal Agencies",
                      description: "Large-scale training and communication for federal departments.",
                      color: "bg-blue-100",
                      iconColor: "text-blue-600"
                    },
                  {
                    icon: <Building2 className="h-6 w-6" />,
                    title: "State & Local Government",
                    description: "Municipal video content for community engagement and services.",
                    color: "bg-green-100",
                    iconColor: "text-green-600"
                  },
                    {
                      icon: <Shield className="h-6 w-6" />,
                      title: "Law Enforcement",
                      description: "Training and transparency videos for police departments.",
                      color: "bg-purple-100",
                      iconColor: "text-purple-600"
                    },
                    {
                      icon: <Users className="h-6 w-6" />,
                      title: "Public Services",
                      description: "Educational content for citizen information and engagement.",
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
                    <Shield className="h-16 w-16 text-green-600" />
                  </div>
                  <div className="bg-purple-200 rounded-3xl flex items-center justify-center h-48">
                    <FileCheck className="h-16 w-16 text-purple-600" />
                  </div>
                  <div className="bg-orange-200 rounded-3xl flex items-center justify-center h-48">
                    <Users className="h-16 w-16 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Government Video Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Government Video Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive video production solutions tailored for government agencies, 
                designed to train personnel, engage citizens, and build public trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Shield className="h-8 w-8" />,
                  badge: "Staff Training",
                  title: "Training Content",
                  description: "Professional development videos that ensure consistent procedures and enhance workforce capabilities.",
                  features: ["Compliance training", "Safety protocols", "Technology training"],
                  color: "bg-blue-100",
                  iconColor: "text-blue-600",
                  badgeColor: "bg-blue-100 text-blue-700"
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  badge: "Public Engagement",
                  title: "Citizen Education",
                  description: "Clear, accessible content that helps citizens understand services, rights, and procedures.",
                  features: ["Service explanations", "Public awareness", "Community resources"],
                  color: "bg-green-100",
                  iconColor: "text-green-600",
                  badgeColor: "bg-green-100 text-green-700"
                },
                {
                  icon: <FileCheck className="h-8 w-8" />,
                  badge: "Transparency",
                  title: "Promotional Videos",
                  description: "Compelling narratives that showcase your agency's mission and build community trust.",
                  features: ["Agency updates", "Success stories", "Recruitment videos"],
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
                  onClick={() => window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer')}
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