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
  Heart, 
  Shield, 
  Users, 
  Video,
  CheckCircle,
  AlertTriangle,
  Clock,
  Target,
  Award,
  BookOpen,
  FileCheck,
  Stethoscope,
  Activity,
  Microscope,
  Pill,
  Brain,
  UserCheck,
  ArrowRight,
  Building,
  Cog,
  Star
} from "lucide-react";
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';

const HealthcarePage = () => {
  const { transitionTo } = usePageTransition();

  const videoSolutions = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safety & Compliance Training",
      description: "HIPAA compliance, infection control, patient safety protocols, PPE usage, workplace safety standards, emergency procedures, and OSHA healthcare requirements.",
      palType: "System Pal",
      color: "border-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      features: ["HIPAA Compliance", "Infection Control", "Emergency Response", "Patient Safety Protocols"]
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Clinical Training & Procedures",
      description: "Medical procedure demonstrations, clinical skill training, patient care protocols, equipment operation, diagnostic procedures, and evidence-based practice guidelines.",
      palType: "System Pal",
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      features: ["Procedure Demos", "Clinical Skills", "Equipment Training", "Best Practices"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Patient Education Videos",
      description: "Treatment explanations, pre-op and post-op care instructions, medication management, chronic disease management, preventive care education, and wellness resources.",
      palType: "Evergreen Pal",
      color: "border-teal-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      features: ["Treatment Guides", "Post-Op Care", "Disease Management", "Wellness Tips"]
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Staff Onboarding & Development",
      description: "New hire orientation, role-specific training, continuing education, soft skills development, customer service excellence, and career advancement pathways.",
      palType: "System Pal",
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      features: ["Onboarding", "Role Training", "CE Credits", "Skill Development"]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Facility Marketing & Recruitment",
      description: "Physician recruitment videos, nursing talent acquisition, facility tours, service line promotion, patient testimonials, and community health campaigns.",
      palType: "Spotlight Pal",
      color: "border-pink-500",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      features: ["Recruitment Videos", "Facility Tours", "Service Promotion", "Testimonials"]
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Social Media & Patient Engagement",
      description: "Health tips and educational shorts, doctor Q&A sessions, behind-the-scenes content, community health awareness, wellness challenges, and social proof campaigns.",
      palType: "Reel Pal",
      color: "border-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      features: ["Health Tips", "Doctor Q&A", "Community Health", "Wellness Content"]
    }
  ];

  const industryBenefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Reduce Medical Errors",
      stat: "Up to 45%",
      description: "Video training improves retention and reduces clinical errors"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Faster Onboarding",
      stat: "60% Faster",
      description: "Get new clinical staff up to speed in half the time"
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Better Patient Outcomes",
      stat: "30% Improvement",
      description: "Educated patients have better treatment adherence"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Maintain Accreditation",
      stat: "100% Compliant",
      description: "Meet Joint Commission and CMS documentation requirements"
    }
  ];

  const useCases = [
    {
      title: "Hospital Systems",
      description: "Enterprise-wide training for multi-facility healthcare organizations. Standardize procedures, ensure regulatory compliance, reduce liability risk, and improve patient safety scores across all locations with scalable video training systems.",
      icon: <Building className="h-6 w-6" />
    },
    {
      title: "Private Practices",
      description: "Professional marketing and patient education for specialty practices. Attract new patients with authentic storytelling, explain complex procedures clearly, build online authority, and differentiate your practice in competitive markets.",
      icon: <Stethoscope className="h-6 w-6" />
    },
    {
      title: "Long-Term Care Facilities",
      description: "Safety protocols and compliance training for nursing homes and assisted living. Train caregivers on proper techniques, document staff competencies, reduce workplace injuries, and maintain state licensing requirements.",
      icon: <Heart className="h-6 w-6" />
    },
    {
      title: "Medical Device Companies",
      description: "Product training and sales enablement for healthcare technology. Create clinical education materials, demonstrate proper device usage, support regulatory submissions, and accelerate market adoption with clear visual communication.",
      icon: <Microscope className="h-6 w-6" />
    },
    {
      title: "Pharmaceutical Companies",
      description: "Drug education and professional training for pharma organizations. Develop sales training materials, create patient education resources, support clinical trials, and communicate complex scientific data effectively.",
      icon: <Pill className="h-6 w-6" />
    },
    {
      title: "Behavioral Health",
      description: "Sensitive training and stigma-reduction content for mental health providers. Train staff on trauma-informed care, create patient-facing mental health resources, promote services with empathy, and support community mental health initiatives.",
      icon: <Brain className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags 
        title="Healthcare Video Production | Medical Training Videos | Palmer House Productions"
        description="Healthcare video production: HIPAA-compliant training, patient education, clinical procedures, staff onboarding, medical marketing, and safety compliance videos for hospitals, clinics, and healthcare organizations."
        keywords="healthcare video production, medical training videos, HIPAA compliance videos, patient education videos, clinical training, hospital marketing videos, medical procedure videos, nursing training"
        ogTitle="Healthcare Video Production | Medical Training & Patient Education"
        ogDescription="Specialized video production for healthcare: clinical training, patient education, compliance, and marketing videos for medical organizations."
        canonicalUrl="https://www.palmerhouseproductions.com/industries/healthcare"
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
                Healthcare Industry
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
                Healthcare Video Production That Saves Lives & Drives Growth
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                From HIPAA-compliant staff training to patient education and physician recruitment, 
                we create video content that improves clinical outcomes and positions your organization as a leader.
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
                  description: "Understanding your goals, audience, and compliance requirements through detailed consultation.",
                  color: "bg-orange-100",
                  textColor: "text-orange-600"
                },
                {
                  number: "2",
                  title: "Planning",
                  description: "Developing scripts, storyboards, and production timelines tailored to your healthcare environment.",
                  color: "bg-pink-100",
                  textColor: "text-pink-600"
                },
                {
                  number: "3",
                  title: "Production",
                  description: "Professional filming with healthcare-specific equipment and techniques, ensuring minimal disruption.",
                  color: "bg-blue-100",
                  textColor: "text-blue-600"
                },
                {
                  number: "4",
                  title: "Delivery",
                  description: "Final videos optimized for your platforms with accessibility features and compliance documentation.",
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

            {/* Healthcare Video Specialties */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthcare Video Specialties</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Our expertise spans across various healthcare sectors, ensuring we understand the unique challenges and opportunities in your field.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  {[
                    {
                      icon: <Building className="h-6 w-6" />,
                      title: "Hospitals & Health Systems",
                      description: "Large-scale video projects for complex healthcare environments.",
                      color: "bg-blue-100",
                      iconColor: "text-blue-600"
                    },
                    {
                      icon: <Stethoscope className="h-6 w-6" />,
                      title: "Private Practices",
                      description: "Personalized content for specialty clinics and individual practitioners.",
                      color: "bg-green-100",
                      iconColor: "text-green-600"
                    },
                    {
                      icon: <Pill className="h-6 w-6" />,
                      title: "Pharmaceutical",
                      description: "Educational and promotional content for medical products and treatments.",
                      color: "bg-purple-100",
                      iconColor: "text-purple-600"
                    },
                    {
                      icon: <Brain className="h-6 w-6" />,
                      title: "Medical Education",
                      description: "Training materials for medical schools and continuing education programs.",
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
                    <Activity className="h-16 w-16 text-green-600" />
                  </div>
                  <div className="bg-purple-200 rounded-3xl flex items-center justify-center h-48">
                    <FileCheck className="h-16 w-16 text-purple-600" />
                  </div>
                  <div className="bg-orange-200 rounded-3xl flex items-center justify-center h-48">
                    <Microscope className="h-16 w-16 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Healthcare Video Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Healthcare Video Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive video production solutions tailored for healthcare organizations, 
                designed to educate, inform, and inspire confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  badge: "Patient Education",
                  title: "Educational Videos",
                  description: "Clear, accessible content that helps patients understand procedures, treatments, and wellness practices.",
                  features: ["Treatment explanations", "Pre/post-op instructions", "Wellness programs"],
                  color: "bg-blue-100",
                  iconColor: "text-blue-600",
                  badgeColor: "bg-blue-100 text-blue-700"
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  badge: "Staff Training",
                  title: "Training Content",
                  description: "Professional development videos that enhance skills and ensure consistent care standards.",
                  features: ["Compliance training", "Safety protocols", "New technology guides"],
                  color: "bg-green-100",
                  iconColor: "text-green-600",
                  badgeColor: "bg-green-100 text-green-700"
                },
                {
                  icon: <Heart className="h-8 w-8" />,
                  badge: "Brand Stories",
                  title: "Promotional Videos",
                  description: "Compelling narratives that showcase your organization's mission and build community trust.",
                  features: ["Patient testimonials", "Facility tours", "Staff spotlights"],
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

        {/* How Each Pal Serves Healthcare */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                How Each Pal Serves Healthcare
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every healthcare organization needs different video solutions. Our specialized Pals deliver 
                exactly what you need—from social engagement to training systems to brand authority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Reel Pal Card */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-orange-400 bg-gradient-to-br from-white to-orange-50/30 hover:scale-105">
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                      <Video className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2 text-xs bg-orange-100 text-orange-700">
                        Reel Pal
                      </Badge>
                      <CardTitle className="text-2xl text-gray-900">Social Media & Patient Engagement</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 mb-6 leading-relaxed">
                    Boost patient engagement with health tips, doctor Q&As, behind-the-scenes content, 
                    and community health awareness campaigns that build trust on social platforms.
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Health Tips", "Doctor Q&A", "Patient Stories", "Community Health"].map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-white border-orange-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    className="text-orange-600 hover:text-orange-700 p-0 h-auto font-semibold"
                    onClick={() => transitionTo('/reel-pal')}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>

              {/* System Pal Card */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-400 bg-gradient-to-br from-white to-purple-50/30 hover:scale-105">
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                      <Cog className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2 text-xs bg-purple-100 text-purple-700">
                        System Pal
                      </Badge>
                      <CardTitle className="text-2xl text-gray-900">Training & Compliance Systems</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 mb-6 leading-relaxed">
                    HIPAA-compliant training videos, clinical procedures, safety protocols, and onboarding 
                    content that scales across your entire healthcare organization.
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["HIPAA Training", "Clinical SOPs", "Safety Protocols", "Staff Onboarding"].map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-white border-purple-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold"
                    onClick={() => transitionTo('/system-pal')}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>

              {/* Evergreen Pal Card */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-teal-400 bg-gradient-to-br from-white to-teal-50/30 hover:scale-105">
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2 text-xs bg-teal-100 text-teal-700">
                        Evergreen Pal
                      </Badge>
                      <CardTitle className="text-2xl text-gray-900">Patient Education & Authority</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 mb-6 leading-relaxed">
                    Build patient trust with treatment explanations, wellness resources, disease management 
                    guides, and expert medical content that establishes your authority.
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Treatment Guides", "Wellness Tips", "Disease Management", "Expert Content"].map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-white border-teal-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    className="text-teal-600 hover:text-teal-700 p-0 h-auto font-semibold"
                    onClick={() => transitionTo('/evergreen-pal')}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>

              {/* Spotlight Pal Card */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-pink-400 bg-gradient-to-br from-white to-pink-50/30 hover:scale-105">
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                      <Star className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2 text-xs bg-pink-100 text-pink-700">
                        Spotlight Pal
                      </Badge>
                      <CardTitle className="text-2xl text-gray-900">Marketing & Recruitment</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 mb-6 leading-relaxed">
                    Attract physicians and patients with facility tours, testimonials, service promotion, 
                    and high-impact recruitment videos that showcase your excellence.
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Facility Tours", "Testimonials", "Recruitment", "Service Promotion"].map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-white border-pink-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    className="text-pink-600 hover:text-pink-700 p-0 h-auto font-semibold"
                    onClick={() => transitionTo('/spotlight-pal')}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trusted Across Healthcare */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Trusted Across Healthcare
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From hospital systems to private practices, we understand your unique challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Hospital Systems */}
              <div className="bg-white border-2 border-blue-400 rounded-3xl p-8 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hospital Systems</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enterprise-wide training for multi-facility healthcare organizations. Standardize procedures, ensure regulatory compliance, reduce liability risk, and improve patient safety scores across all locations with scalable video training systems.
                </p>
              </div>

              {/* Private Practices */}
              <div className="bg-white border-2 border-blue-400 rounded-3xl p-8 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Stethoscope className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Private Practices</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional marketing and patient education for specialty practices. Attract new patients with authentic storytelling, explain complex procedures clearly, build online authority, and differentiate your practice in competitive markets.
                </p>
              </div>

              {/* Long-Term Care Facilities */}
              <div className="bg-white border-2 border-blue-400 rounded-3xl p-8 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Long-Term Care Facilities</h3>
                <p className="text-gray-600 leading-relaxed">
                  Safety protocols and compliance training for nursing homes and assisted living. Train caregivers on proper techniques, document staff competencies, reduce workplace injuries, and maintain state licensing requirements.
                </p>
              </div>

              {/* Medical Device Companies */}
              <div className="bg-white border-2 border-blue-400 rounded-3xl p-8 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Microscope className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Medical Device Companies</h3>
                <p className="text-gray-600 leading-relaxed">
                  Product training and sales enablement for healthcare technology. Create clinical education materials, demonstrate proper device usage, support regulatory submissions, and accelerate market adoption with clear visual communication.
                </p>
              </div>

              {/* Pharmaceutical Companies */}
              <div className="bg-white border-2 border-blue-400 rounded-3xl p-8 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Pill className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pharmaceutical Companies</h3>
                <p className="text-gray-600 leading-relaxed">
                  Drug education and professional training for pharma organizations. Develop sales training materials, create patient education resources, support clinical trials, and communicate complex scientific data effectively.
                </p>
              </div>

              {/* Behavioral Health */}
              <div className="bg-white border-2 border-blue-400 rounded-3xl p-8 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Behavioral Health</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sensitive training and stigma-reduction content for mental health providers. Train staff on trauma-informed care, create patient-facing mental health resources, promote services with empathy, and support community mental health initiatives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance & Standards */}
        <section className="py-24 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                HIPAA-Compliant & Accreditation-Ready Video Production
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                We understand healthcare compliance requirements. All videos meet HIPAA privacy standards, 
                Joint Commission requirements, CMS guidelines, and state licensing documentation needs. 
                Our healthcare video production services include secure file handling, proper consent documentation, 
                and audit trail capabilities to support your accreditation and compliance efforts.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                {[
                  { label: "HIPAA Compliant", icon: <Shield className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "Joint Commission", icon: <Award className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "CMS Standards", icon: <FileCheck className="h-8 w-8 mx-auto mb-2" /> },
                  { label: "CE Credit Support", icon: <BookOpen className="h-8 w-8 mx-auto mb-2" /> }
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
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-12">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Ready to Improve Patient Care with Video?
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Let's discuss how video can help your healthcare organization reduce errors, 
                improve compliance, and deliver better outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg px-8 py-6 h-auto shadow-lg"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Strategy Call
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-semibold text-lg px-8 py-6 h-auto"
                  onClick={() => transitionTo('/contact')}
                >
                  Request Proposal
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

export default HealthcarePage;