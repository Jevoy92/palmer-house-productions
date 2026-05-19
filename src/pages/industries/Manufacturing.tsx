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
import { HardHat, Cog, Users, Video, CheckCircle, Shield, Clock, Target, Award, Wrench, Settings, Factory, AlertTriangle, TrendingUp, BookOpen, FileCheck, ArrowRight, Package, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import systemPalImage from '@/assets/pals/male-system-pal-edited.png';
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';
const ManufacturingPage = () => {
  const {
    transitionTo
  } = usePageTransition();
  const videoSolutions = [{
    icon: <HardHat className="h-8 w-8" />,
    title: "Safety Training & Compliance",
    description: "OSHA-compliant safety videos, lockout/tagout procedures, machine guarding, PPE requirements, hazard communication, fall protection, confined space entry, and emergency response protocols.",
    palType: "System Pal",
    color: "border-red-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    features: ["OSHA Compliance", "Safety Protocols", "PPE Training", "Emergency Response"]
  }, {
    icon: <Settings className="h-8 w-8" />,
    title: "Equipment Operation & Maintenance",
    description: "Machine operation guides, preventive maintenance procedures, troubleshooting protocols, equipment setup instructions, calibration procedures, and technical maintenance training.",
    palType: "System Pal",
    color: "border-blue-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    features: ["Machine Operation", "Maintenance SOPs", "Troubleshooting", "Calibration"]
  }, {
    icon: <Factory className="h-8 w-8" />,
    title: "Standard Operating Procedures",
    description: "Production workflows, quality control processes, assembly instructions, lean manufacturing techniques, 5S methodology, continuous improvement practices, and ISO compliance documentation.",
    palType: "System Pal",
    color: "border-purple-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    features: ["Production SOPs", "Quality Control", "Lean Manufacturing", "ISO Standards"]
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "Workforce Training & Onboarding",
    description: "New hire orientation, role-specific training, cross-training programs, supervisor development, soft skills training, and continuous learning initiatives for manufacturing teams.",
    palType: "System Pal",
    color: "border-teal-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    features: ["Onboarding", "Skills Training", "Leadership Dev", "Cross-Training"]
  }, {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Company Branding & Recruitment",
    description: "Facility tours, company culture videos, employee testimonials, recruitment marketing, capabilities presentations, trade show content, and corporate brand storytelling.",
    palType: "Spotlight Pal",
    color: "border-green-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    features: ["Facility Tours", "Culture Videos", "Recruitment", "Brand Content"]
  }, {
    icon: <Video className="h-8 w-8" />,
    title: "Social Media & Industry Presence",
    description: "Behind-the-scenes manufacturing content, employee spotlights, innovation showcases, sustainability initiatives, industry thought leadership, and manufacturing process transparency.",
    palType: "Reel Pal",
    color: "border-orange-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    features: ["Behind-the-Scenes", "Employee Stories", "Innovation", "Thought Leadership"]
  }];
  const industryBenefits = [{
    icon: <Target className="h-6 w-6" />,
    title: "Reduce Accidents",
    stat: "Up to 70%",
    description: "Video safety training dramatically reduces workplace incidents"
  }, {
    icon: <Clock className="h-6 w-6" />,
    title: "Faster Training",
    stat: "3x Faster",
    description: "Get workers productive faster with video training"
  }, {
    icon: <Cog className="h-6 w-6" />,
    title: "Improve Quality",
    stat: "45% Fewer Defects",
    description: "Standardized training reduces production errors"
  }, {
    icon: <Award className="h-6 w-6" />,
    title: "Better Retention",
    stat: "35% Increase",
    description: "Strong culture videos improve employee retention"
  }];
  const useCases = [{
    title: "Automotive Manufacturing",
    description: "Assembly line training, quality assurance procedures, lean manufacturing implementation, safety protocols, supplier training, and continuous improvement documentation for automotive production environments.",
    icon: <Factory className="h-6 w-6" />
  }, {
    title: "Aerospace & Defense",
    description: "Precision manufacturing procedures, quality control documentation, compliance training for strict regulatory requirements, technical assembly instructions, and security protocol training.",
    icon: <Award className="h-6 w-6" />
  }, {
    title: "Food & Beverage Production",
    description: "Food safety training, HACCP compliance, sanitation procedures, equipment cleaning protocols, allergen management, quality assurance, and FDA regulatory compliance documentation.",
    icon: <Shield className="h-6 w-6" />
  }, {
    title: "Chemical Processing",
    description: "Hazardous materials handling, chemical safety protocols, process safety management, emergency response procedures, environmental compliance, and specialized equipment operation training.",
    icon: <AlertTriangle className="h-6 w-6" />
  }, {
    title: "Electronics Manufacturing",
    description: "ESD safety training, clean room procedures, precision assembly techniques, quality testing protocols, equipment calibration, and IPC standards compliance training.",
    icon: <Settings className="h-6 w-6" />
  }, {
    title: "Heavy Equipment & Machinery",
    description: "Equipment operation training, maintenance procedures, hydraulics and pneumatics training, welding and fabrication techniques, and heavy machinery safety protocols.",
    icon: <Wrench className="h-6 w-6" />
  }];
  return <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags title="Manufacturing Video Production | Industrial Training Videos | Palmer House Productions" description="Manufacturing video production: safety training, equipment operation, SOPs, quality control, workforce development, and compliance videos for industrial facilities, factories, and production environments." keywords="manufacturing video production, industrial training videos, safety training manufacturing, equipment operation videos, SOP videos, factory training, OSHA compliance videos, lean manufacturing training" ogTitle="Manufacturing Video Production | Industrial Training & Safety" ogDescription="Specialized video production for manufacturing: safety training, equipment operation, SOPs, and workforce development for industrial facilities." canonicalUrl="https://www.palmerhouseproductions.com/industries/manufacturing" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="services" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />

      <MainContent>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-32 bg-white">
          
        </section>

        {/* Our Video Production Process */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[{
              number: "1",
              title: "Discovery",
              description: "Understanding your goals, audience, and compliance requirements through detailed consultation.",
              color: "bg-orange-100",
              textColor: "text-orange-600"
            }, {
              number: "2",
              title: "Planning",
              description: "Developing scripts, storyboards, and production timelines tailored to your manufacturing environment.",
              color: "bg-pink-100",
              textColor: "text-pink-600"
            }, {
              number: "3",
              title: "Production",
              description: "Professional filming with manufacturing-specific equipment and techniques, ensuring minimal disruption.",
              color: "bg-blue-100",
              textColor: "text-blue-600"
            }, {
              number: "4",
              title: "Delivery",
              description: "Final videos optimized for your platforms with accessibility features and compliance documentation.",
              color: "bg-green-100",
              textColor: "text-green-600"
            }].map((step, index) => <div key={index} className="text-center">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <span className={`text-3xl font-bold ${step.textColor}`}>{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>)}
            </div>

            {/* Manufacturing Video Specialties */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Manufacturing Video Specialties</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Our expertise spans across various manufacturing sectors, ensuring we understand the unique challenges and opportunities in your field.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  {[{
                  icon: <Factory className="h-6 w-6" />,
                  title: "Automotive Manufacturing",
                  description: "Assembly line training and quality assurance for automotive production.",
                  color: "bg-blue-100",
                  iconColor: "text-blue-600"
                }, {
                  icon: <Award className="h-6 w-6" />,
                  title: "Aerospace & Defense",
                  description: "Precision manufacturing and compliance for strict regulatory requirements.",
                  color: "bg-green-100",
                  iconColor: "text-green-600"
                }, {
                  icon: <Package className="h-6 w-6" />,
                  title: "Food & Beverage",
                  description: "Food safety, HACCP compliance, and sanitation procedures.",
                  color: "bg-purple-100",
                  iconColor: "text-purple-600"
                }, {
                  icon: <AlertTriangle className="h-6 w-6" />,
                  title: "Chemical Processing",
                  description: "Hazardous materials handling and process safety management.",
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
                  <div className="bg-blue-200 rounded-3xl flex items-center justify-center h-48">
                    <Video className="h-16 w-16 text-blue-600" />
                  </div>
                  <div className="bg-green-200 rounded-3xl flex items-center justify-center h-48">
                    <Settings className="h-16 w-16 text-green-600" />
                  </div>
                  <div className="bg-purple-200 rounded-3xl flex items-center justify-center h-48">
                    <FileCheck className="h-16 w-16 text-purple-600" />
                  </div>
                  <div className="bg-orange-200 rounded-3xl flex items-center justify-center h-48">
                    <HardHat className="h-16 w-16 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Manufacturing Video Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Manufacturing Video Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive video production solutions tailored for manufacturing organizations, 
                designed to train, standardize, and protect your operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[{
              icon: <HardHat className="h-8 w-8" />,
              badge: "Safety Training",
              title: "Training Content",
              description: "Professional development videos that ensure OSHA compliance and reduce workplace incidents.",
              features: ["Safety protocols", "Equipment operation", "Emergency response"],
              color: "bg-blue-100",
              iconColor: "text-blue-600",
              badgeColor: "bg-blue-100 text-blue-700"
            }, {
              icon: <Cog className="h-8 w-8" />,
              badge: "Operations",
              title: "Operational Videos",
              description: "Standard operating procedures and quality control content that improves efficiency.",
              features: ["SOPs", "Quality control", "Lean manufacturing"],
              color: "bg-green-100",
              iconColor: "text-green-600",
              badgeColor: "bg-green-100 text-green-700"
            }, {
              icon: <TrendingUp className="h-8 w-8" />,
              badge: "Culture",
              title: "Brand Videos",
              description: "Compelling narratives that showcase your capabilities and attract top talent.",
              features: ["Facility tours", "Recruitment", "Company culture"],
              color: "bg-purple-100",
              iconColor: "text-purple-600",
              badgeColor: "bg-purple-100 text-purple-700"
            }].map((service, index) => <Card key={index} className="border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <span className={service.iconColor}>{service.icon}</span>
                    </div>
                    <Badge className={`mb-4 ${service.badgeColor}`}>{service.badge}</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* How Each Pal Serves Manufacturing */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How Each Pal Serves Manufacturing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every manufacturing operation needs different video solutions. Our specialized Pals deliver exactly what you need—from safety training to equipment operation to workforce development.
              </p>
            </div>

            <Tabs defaultValue="system" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12 h-auto p-2 bg-gray-100">
                <TabsTrigger value="system" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 text-sm font-medium">
                  System Pal
                </TabsTrigger>
                <TabsTrigger value="reel" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white py-3 text-sm font-medium">
                  Reel Pal
                </TabsTrigger>
                <TabsTrigger value="spotlight" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white py-3 text-sm font-medium">
                  Spotlight Pal
                </TabsTrigger>
                <TabsTrigger value="evergreen" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white py-3 text-sm font-medium">
                  Evergreen Pal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="system" className="animate-fade-in">
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl border-2 border-purple-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                        <HardHat className="h-4 w-4" />
                        System Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Safety & Operations Training
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Create safer, more efficient operations with OSHA-compliant safety training, equipment operation guides, SOPs, and workforce development programs.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Essential Training Solutions:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>OSHA-compliant safety training and compliance documentation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Equipment operation guides and maintenance procedures</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Standard operating procedures and quality control processes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>New hire onboarding and cross-training programs</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Safety Training</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Equipment Operation</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">SOPs</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Workforce Dev</Badge>
                        </div>
                      </div>

                      <Button onClick={() => transitionTo('/system-pal')} className="bg-purple-500 hover:bg-purple-600 text-white mt-4">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <img src={systemPalImage} alt="System Pal character" className="w-full max-w-md h-auto object-contain animate-fade-in" />
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
                        Industry Presence & Engagement
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Showcase your manufacturing excellence with behind-the-scenes content, employee stories, innovation highlights, and social media content that builds your industry reputation.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Behind-the-scenes manufacturing process showcases</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Employee spotlights and team member recognition</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Innovation and technology showcases for industry leadership</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Sustainability initiatives and responsible manufacturing stories</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Behind-the-Scenes</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Employee Stories</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Innovation</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Industry Leadership</Badge>
                        </div>
                      </div>

                      <Button onClick={() => transitionTo('/reel-pal')} className="bg-orange-500 hover:bg-orange-600 text-white mt-4">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <img src={reelPalImage} alt="Reel Pal character" className="w-full max-w-md h-auto object-contain animate-fade-in" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="spotlight" className="animate-fade-in">
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border-2 border-pink-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                        <TrendingUp className="h-4 w-4" />
                        Spotlight Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Branding & Recruitment
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Attract skilled workers and showcase capabilities with facility tours, recruitment videos, company culture content, and compelling brand storytelling.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Showcase Your Excellence:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Cinematic facility tours highlighting advanced capabilities</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Recruitment videos that attract skilled manufacturing talent</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Company culture videos and employee testimonials</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Trade show content and capabilities presentations</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Facility Tours</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Recruitment</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Culture Videos</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Trade Shows</Badge>
                        </div>
                      </div>

                      <Button onClick={() => transitionTo('/spotlight-pal')} className="bg-pink-500 hover:bg-pink-600 text-white mt-4">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <img src={spotlightPalImage} alt="Spotlight Pal character" className="w-full max-w-md h-auto object-contain animate-fade-in" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="evergreen" className="animate-fade-in">
                <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl border-2 border-teal-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Settings className="h-4 w-4" />
                        Evergreen Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Technical Documentation & Expertise
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Create lasting value with technical documentation, process explanations, industry education, and thought leadership content that establishes manufacturing expertise.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Build Authority With:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Technical process documentation and best practices guides</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Quality assurance procedures and ISO compliance materials</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Industry thought leadership and manufacturing education</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Lean manufacturing and continuous improvement resources</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Technical Docs</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Quality Assurance</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Thought Leadership</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Lean Manufacturing</Badge>
                        </div>
                      </div>

                      <Button onClick={() => transitionTo('/evergreen-pal')} className="bg-teal-500 hover:bg-teal-600 text-white mt-4">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center">
                      <img src={evergreenPalImage} alt="Evergreen Pal character" className="w-full max-w-md h-auto object-contain animate-fade-in" />
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
                Ready to Build a Safer, More Efficient Operation?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how video training can help your manufacturing facility reduce accidents, 
                improve quality, standardize processes, and scale workforce development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-900 font-semibold text-lg px-8 py-4 h-auto" onClick={() => window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer')}>
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Strategy Call
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-50 font-semibold text-lg px-8 py-4 h-auto" onClick={() => transitionTo('/contact')}>
                  Get Manufacturing Video Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>;
};
export default ManufacturingPage;