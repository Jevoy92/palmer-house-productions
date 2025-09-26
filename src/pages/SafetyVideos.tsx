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
      modules: ["Fall Protection", "Equipment Safety", "Hazard Communication", "Site Safety"],
      color: "border-amber-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Office Safety",
      description: "Essential workplace safety for office environments",
      modules: ["Ergonomics", "Emergency Procedures", "Fire Safety", "First Aid Basics"],
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Electrical Safety",
      description: "Critical training for electrical work and awareness",
      modules: ["Lockout/Tagout", "Electrical Hazards", "Arc Flash Safety", "PPE Requirements"],
      color: "border-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Chemical Safety",
      description: "Handling hazardous materials and chemical awareness",
      modules: ["MSDS Training", "Spill Response", "Chemical Storage", "PPE Selection"],
      color: "border-green-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health & Wellness",
      description: "Promoting workplace health and mental wellness",
      modules: ["Stress Management", "Injury Prevention", "Mental Health", "Wellness Programs"],
      color: "border-pink-500",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Behavioral Safety",
      description: "Creating a culture of safety awareness and accountability",
      modules: ["Safety Leadership", "Incident Reporting", "Safety Culture", "Peer Observations"],
      color: "border-indigo-500",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
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
        <section className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-pal-purple via-pal-purple/90 to-pal-purple/80 overflow-hidden">
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
                    <Shield className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30 text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
                    System Pal Specializes
                  </Badge>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
                  Safety Training Videos That 
                  <span className="block text-white/90">Save Lives</span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-lg">
                  Professional safety training videos that reduce workplace incidents by up to 75%. 
                  OSHA-compliant content designed for maximum retention and real-world application.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
                  <Button 
                    size="lg"
                    className="bg-white text-corporate-dark hover:bg-white/95 border-0 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto shadow-lg"
                    onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                  >
                    <Video className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-corporate-dark" />
                    Get Safety Training Quote
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-corporate-dark hover:border-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
                    onClick={() => transitionTo('/system-pal')}
                  >
                    Learn More About System Pal
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
                      src={systemPalImage} 
                      alt="System Pal character representing safety training expertise"
                      className="w-full h-full object-contain animate-fade-in"
                      loading="eager"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 text-white animate-pulse">
                    <Shield className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <div className="absolute bottom-8 sm:bottom-10 -left-4 sm:-left-6 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 text-white animate-pulse delay-500">
                    <CheckCircle className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Categories */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 lg:mb-6">
                Comprehensive Safety Training Solutions
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From construction sites to corporate offices, we create safety training videos 
                that protect your most valuable asset: your people.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {safetyCategories.map((category, index) => (
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
                      <h4 className="font-semibold text-sm text-gray-800 uppercase tracking-wide">Key Modules:</h4>
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
                Our Safety Training Process
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We work with safety experts to create training that's both engaging and compliant.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  step: "01",
                  title: "Safety Assessment",
                  description: "We analyze your specific safety requirements and compliance needs",
                  icon: <FileText className="h-8 w-8" />,
                  color: "border-purple-500",
                  bgColor: "bg-purple-50",
                  iconColor: "text-purple-600"
                },
                {
                  step: "02", 
                  title: "Content Development",
                  description: "Our team creates OSHA-compliant scripts with safety professionals",
                  icon: <Camera className="h-8 w-8" />,
                  color: "border-teal-500",
                  bgColor: "bg-teal-50",
                  iconColor: "text-teal-600"
                },
                {
                  step: "03",
                  title: "Production & Review",
                  description: "Professional video production with multiple review cycles",
                  icon: <PlayCircle className="h-8 w-8" />,
                  color: "border-orange-500",
                  bgColor: "bg-orange-50",
                  iconColor: "text-orange-600"
                },
                {
                  step: "04",
                  title: "Deployment & Tracking",
                  description: "Easy deployment with completion tracking and progress analytics",
                  icon: <Award className="h-8 w-8" />,
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
        <section className="py-16 lg:py-24 bg-pal-purple text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 lg:mb-6">
                The Impact of Professional Safety Training
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Data-driven results that prove the value of investing in safety training.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { stat: "75%", label: "Reduction in workplace incidents", color: "border-t-amber-400" },
                { stat: "$4.6M", label: "Average annual savings per 100 employees", color: "border-t-green-400" },
                { stat: "90%", label: "Training completion rate", color: "border-t-blue-400" },
                { stat: "3x", label: "Better retention vs. traditional methods", color: "border-t-pink-400" }
              ].map((item, index) => (
                <Card key={index} className={`text-center bg-white/10 backdrop-blur-sm border-0 ${item.color} border-t-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in`}>
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3 text-white">{item.stat}</div>
                    <div className="text-sm sm:text-base text-white/90 leading-tight">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="h-8 sm:h-12 lg:h-16 bg-gradient-to-b from-pal-purple to-pal-purple/80"></div>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-pal-purple/80 via-pal-purple/70 to-pal-purple/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto text-white">
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <Shield className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
                Ready to Improve Your Safety Training?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of companies that have reduced workplace incidents with our professional safety training videos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
                <Button 
                  size="lg"
                  className="bg-white text-corporate-dark hover:bg-white/95 border-0 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto shadow-lg"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                >
                  Schedule Safety Consultation
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-corporate-dark hover:border-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
                  onClick={() => transitionTo('/contact')}
                >
                  Get Custom Quote
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                  <span className="text-sm sm:text-base">OSHA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                  <span className="text-sm sm:text-base">Industry Expert Reviewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                  <span className="text-sm sm:text-base">Proven Results</span>
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