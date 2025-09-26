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
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Clock,
  Target,
  Cog,
  PlayCircle,
  FileText,
  Headphones,
  Camera,
  HardHat,
  Eye,
  Heart,
  Zap,
  ArrowRight,
  Star,
  Building,
  Award,
  Video
} from "lucide-react";
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';
import maleSystemPalImage from '@/assets/pals/male-system-pal-edited.png';

const SafetyVideosPage = () => {
  const { transitionTo } = usePageTransition();

  const safetyCategories = [
    {
      icon: <HardHat className="h-8 w-8" />,
      title: "Construction Safety",
      description: "Comprehensive training for construction sites and heavy equipment",
      modules: ["Fall Protection", "Equipment Safety", "Hazard Communication", "Site Safety"]
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Office Safety",
      description: "Essential workplace safety for office environments",
      modules: ["Ergonomics", "Emergency Procedures", "Fire Safety", "First Aid Basics"]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Electrical Safety",
      description: "Critical training for electrical work and awareness",
      modules: ["Lockout/Tagout", "Electrical Hazards", "Arc Flash Safety", "PPE Requirements"]
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Chemical Safety",
      description: "Handling hazardous materials and chemical awareness",
      modules: ["MSDS Training", "Spill Response", "Chemical Storage", "PPE Selection"]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health & Wellness",
      description: "Promoting workplace health and mental wellness",
      modules: ["Stress Management", "Injury Prevention", "Mental Health", "Wellness Programs"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Behavioral Safety",
      description: "Creating a culture of safety awareness and accountability",
      modules: ["Safety Leadership", "Incident Reporting", "Safety Culture", "Peer Observations"]
    }
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6 text-pal-purple" />,
      title: "Reduce Incidents",
      description: "Up to 75% reduction in workplace accidents"
    },
    {
      icon: <Clock className="h-6 w-6 text-pal-purple" />,
      title: "Save Time",
      description: "Scalable training that reaches everyone instantly"
    },
    {
      icon: <FileText className="h-6 w-6 text-pal-purple" />,
      title: "Ensure Compliance",
      description: "Meet OSHA and industry safety requirements"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-pal-purple" />,
      title: "Track Progress",
      description: "Built-in analytics to monitor completion and retention"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags 
        title="Safety Training Videos | Workplace Safety | Palmer House Productions"
        description="Professional safety training videos that reduce workplace incidents by 75%. OSHA-compliant content for construction, office, and industrial safety training."
        keywords="safety training videos, workplace safety, OSHA training, safety compliance, construction safety, industrial safety training"
        ogTitle="Safety Training Videos | Palmer House Productions"
        ogDescription="Reduce workplace incidents with professional safety training videos. OSHA-compliant content for all industries."
        canonicalUrl="https://www.palmerhouseproductions.com/safety-videos"
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <StructuredData type="services" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />

      <MainContent>
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-gradient-to-br from-pal-purple via-pal-purple/90 to-pal-purple/80 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rotate-45"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                    System Pal Specializes
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Safety Training Videos That 
                  <span className="block text-white/90">Save Lives</span>
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
                  Professional safety training videos that reduce workplace incidents by up to 75%. 
                  OSHA-compliant content designed for maximum retention and real-world application.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button 
                    size="lg"
                    className="bg-white text-corporate-dark hover:bg-white/95 border-0 font-semibold text-lg px-8 py-4 h-auto shadow-lg"
                    onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                  >
                    <Video className="mr-2 h-5 w-5 text-corporate-dark" />
                    Get Safety Training Quote
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-corporate-dark hover:border-white font-semibold text-lg px-8 py-4 h-auto"
                    onClick={() => transitionTo('/system-pal')}
                  >
                    Learn More About System Pal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-white/90">
                      <div className="flex justify-center mb-2">
                        {benefit.icon}
                      </div>
                      <h3 className="font-bold text-sm mb-1">{benefit.title}</h3>
                      <p className="text-xs text-white/70">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative w-full max-w-lg mx-auto">
                  {/* Character Image */}
                  <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] mx-auto">
                    <img 
                      src={systemPalImage} 
                      alt="System Pal character representing safety training expertise"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white animate-pulse">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div className="absolute bottom-10 -left-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white animate-pulse delay-500">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Categories */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Comprehensive Safety Training Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From construction sites to corporate offices, we create safety training videos 
                that protect your most valuable asset: your people.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safetyCategories.map((category, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-l-4 border-pal-purple">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-pal-purple/10 rounded-2xl flex items-center justify-center text-pal-purple group-hover:bg-pal-purple group-hover:text-white transition-colors">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {category.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-700">Key Modules:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.modules.map((module, moduleIndex) => (
                          <Badge key={moduleIndex} variant="secondary" className="text-xs">
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
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Our Safety Training Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We work with safety experts to create training that's both engaging and compliant.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Safety Assessment",
                  description: "We analyze your specific safety requirements and compliance needs",
                  icon: <FileText className="h-8 w-8" />
                },
                {
                  step: "02", 
                  title: "Content Development",
                  description: "Our team creates OSHA-compliant scripts with safety professionals",
                  icon: <Camera className="h-8 w-8" />
                },
                {
                  step: "03",
                  title: "Production & Review",
                  description: "Professional video production with multiple review cycles",
                  icon: <PlayCircle className="h-8 w-8" />
                },
                {
                  step: "04",
                  title: "Deployment & Tracking",
                  description: "Easy deployment with completion tracking and progress analytics",
                  icon: <Award className="h-8 w-8" />
                }
              ].map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-pal-purple/10 rounded-full flex items-center justify-center mx-auto text-pal-purple group-hover:bg-pal-purple group-hover:text-white transition-colors">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-pal-purple text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 lg:py-32 bg-pal-purple text-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                The Impact of Professional Safety Training
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Data-driven results that prove the value of investing in safety training.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { stat: "75%", label: "Reduction in workplace incidents" },
                { stat: "$4.6M", label: "Average annual savings per 100 employees" },
                { stat: "90%", label: "Training completion rate" },
                { stat: "3x", label: "Better retention vs. traditional methods" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold mb-2">{item.stat}</div>
                  <div className="text-white/90">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-r from-pal-purple to-pal-purple/90">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto text-white">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Ready to Improve Your Safety Training?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join hundreds of companies that have reduced workplace incidents with our professional safety training videos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-corporate-dark hover:bg-white/95 border-0 font-semibold text-lg px-8 py-4 h-auto shadow-lg"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                >
                  Schedule Safety Consultation
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-corporate-dark hover:border-white font-semibold text-lg px-8 py-4 h-auto"
                  onClick={() => transitionTo('/contact')}
                >
                  Get Custom Quote
                </Button>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>OSHA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Industry Expert Reviewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Proven Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default SafetyVideosPage;