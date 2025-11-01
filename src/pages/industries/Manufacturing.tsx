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
  HardHat, 
  Cog, 
  Users, 
  Video,
  CheckCircle,
  Shield,
  Clock,
  Target,
  Award,
  Wrench,
  Settings,
  Factory,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  FileCheck,
  ArrowRight
} from "lucide-react";
import systemPalImage from '@/assets/pals/male-system-pal-edited.png';

const ManufacturingPage = () => {
  const { transitionTo } = usePageTransition();

  const videoSolutions = [
    {
      icon: <HardHat className="h-8 w-8" />,
      title: "Safety Training & Compliance",
      description: "OSHA-compliant safety videos, lockout/tagout procedures, machine guarding, PPE requirements, hazard communication, fall protection, confined space entry, and emergency response protocols.",
      palType: "System Pal",
      color: "border-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      features: ["OSHA Compliance", "Safety Protocols", "PPE Training", "Emergency Response"]
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Equipment Operation & Maintenance",
      description: "Machine operation guides, preventive maintenance procedures, troubleshooting protocols, equipment setup instructions, calibration procedures, and technical maintenance training.",
      palType: "System Pal",
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      features: ["Machine Operation", "Maintenance SOPs", "Troubleshooting", "Calibration"]
    },
    {
      icon: <Factory className="h-8 w-8" />,
      title: "Standard Operating Procedures",
      description: "Production workflows, quality control processes, assembly instructions, lean manufacturing techniques, 5S methodology, continuous improvement practices, and ISO compliance documentation.",
      palType: "System Pal",
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      features: ["Production SOPs", "Quality Control", "Lean Manufacturing", "ISO Standards"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Workforce Training & Onboarding",
      description: "New hire orientation, role-specific training, cross-training programs, supervisor development, soft skills training, and continuous learning initiatives for manufacturing teams.",
      palType: "System Pal",
      color: "border-teal-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      features: ["Onboarding", "Skills Training", "Leadership Dev", "Cross-Training"]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Company Branding & Recruitment",
      description: "Facility tours, company culture videos, employee testimonials, recruitment marketing, capabilities presentations, trade show content, and corporate brand storytelling.",
      palType: "Spotlight Pal",
      color: "border-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      features: ["Facility Tours", "Culture Videos", "Recruitment", "Brand Content"]
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Social Media & Industry Presence",
      description: "Behind-the-scenes manufacturing content, employee spotlights, innovation showcases, sustainability initiatives, industry thought leadership, and manufacturing process transparency.",
      palType: "Reel Pal",
      color: "border-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      features: ["Behind-the-Scenes", "Employee Stories", "Innovation", "Thought Leadership"]
    }
  ];

  const industryBenefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Reduce Accidents",
      stat: "Up to 70%",
      description: "Video safety training dramatically reduces workplace incidents"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Faster Training",
      stat: "3x Faster",
      description: "Get workers productive faster with video training"
    },
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Improve Quality",
      stat: "45% Fewer Defects",
      description: "Standardized training reduces production errors"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Better Retention",
      stat: "35% Increase",
      description: "Strong culture videos improve employee retention"
    }
  ];

  const useCases = [
    {
      title: "Automotive Manufacturing",
      description: "Assembly line training, quality assurance procedures, lean manufacturing implementation, safety protocols, supplier training, and continuous improvement documentation for automotive production environments.",
      icon: <Factory className="h-6 w-6" />
    },
    {
      title: "Aerospace & Defense",
      description: "Precision manufacturing procedures, quality control documentation, compliance training for strict regulatory requirements, technical assembly instructions, and security protocol training.",
      icon: <Award className="h-6 w-6" />
    },
    {
      title: "Food & Beverage Production",
      description: "Food safety training, HACCP compliance, sanitation procedures, equipment cleaning protocols, allergen management, quality assurance, and FDA regulatory compliance documentation.",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Chemical Processing",
      description: "Hazardous materials handling, chemical safety protocols, process safety management, emergency response procedures, environmental compliance, and specialized equipment operation training.",
      icon: <AlertTriangle className="h-6 w-6" />
    },
    {
      title: "Electronics Manufacturing",
      description: "ESD safety training, clean room procedures, precision assembly techniques, quality testing protocols, equipment calibration, and IPC standards compliance training.",
      icon: <Settings className="h-6 w-6" />
    },
    {
      title: "Heavy Equipment & Machinery",
      description: "Equipment operation training, maintenance procedures, hydraulics and pneumatics training, welding and fabrication techniques, and heavy machinery safety protocols.",
      icon: <Wrench className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags 
        title="Manufacturing Video Production | Industrial Training Videos | Palmer House Productions"
        description="Manufacturing video production: safety training, equipment operation, SOPs, quality control, workforce development, and compliance videos for industrial facilities, factories, and production environments."
        keywords="manufacturing video production, industrial training videos, safety training manufacturing, equipment operation videos, SOP videos, factory training, OSHA compliance videos, lean manufacturing training"
        ogTitle="Manufacturing Video Production | Industrial Training & Safety"
        ogDescription="Specialized video production for manufacturing: safety training, equipment operation, SOPs, and workforce development for industrial facilities."
        canonicalUrl="https://www.palmerhouseproductions.com/industries/manufacturing"
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="services" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />

      <MainContent>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-800 via-gray-700 to-blue-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rotate-45 animate-pulse delay-300"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <Badge className="bg-white/20 text-white border-white/30 mb-6 text-lg px-4 py-2">
                  Manufacturing Industry Solutions
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Manufacturing Video Production That Builds Safer, Smarter Operations
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  From OSHA-compliant safety training to lean manufacturing implementation and workforce development, 
                  we create video content that reduces accidents, improves quality, standardizes processes, 
                  and scales training across your entire manufacturing operation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button 
                    size="lg"
                    className="bg-white text-gray-800 hover:bg-white/95 font-semibold text-lg px-8 py-4 h-auto shadow-lg"
                    onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Schedule Manufacturing Consultation
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-gray-800 font-semibold text-lg px-8 py-4 h-auto"
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
                      alt="Manufacturing video production expert"
                      className="w-full h-full object-contain animate-fade-in"
                      loading="eager"
                    />
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white animate-pulse">
                    <HardHat className="h-8 w-8" />
                  </div>
                  <div className="absolute bottom-10 -left-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white animate-pulse delay-500">
                    <Cog className="h-8 w-8" />
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
                Complete Video Solutions for Manufacturing Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Whether you need safety compliance training, standard operating procedures, equipment operation guides, 
                or company branding content, our manufacturing-focused video production services help you build 
                a safer, more efficient, and more profitable operation.
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

        {/* Industry Use Cases */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Serving Every Manufacturing Sector
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From discrete manufacturing to process industries, we understand the unique training and 
                communication challenges of different manufacturing environments and regulatory requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white border-t-4 border-gray-800 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 mb-4 group-hover:scale-110 transition-transform">
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

        {/* Compliance & Standards */}
        <section className="py-24 bg-gray-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                OSHA-Compliant & Standards-Ready Video Training
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                We understand manufacturing compliance requirements. All safety training videos meet OSHA standards, 
                ANSI guidelines, and industry-specific regulations. Our manufacturing video production services 
                support ISO certification, lean manufacturing initiatives, continuous improvement programs, 
                and regulatory audit requirements.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                {[
                  { label: "OSHA Compliant", icon: <Shield className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "ISO Standards", icon: <Award className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "ANSI Guidelines", icon: <FileCheck className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "Lean Certified", icon: <BookOpen className="h-8 w-8 mx-auto mb-2" /> }
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
                Ready to Build a Safer, More Efficient Operation?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how video training can help your manufacturing facility reduce accidents, 
                improve quality, standardize processes, and scale workforce development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gray-800 text-white hover:bg-gray-900 font-semibold text-lg px-8 py-4 h-auto"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Strategy Call
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-800 text-gray-800 hover:bg-gray-50 font-semibold text-lg px-8 py-4 h-auto"
                  onClick={() => transitionTo('/contact')}
                >
                  Get Manufacturing Video Quote
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

export default ManufacturingPage;