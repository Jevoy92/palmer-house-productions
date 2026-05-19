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
import { GraduationCap, BookOpen, Users, Video, CheckCircle, School, Library, Award, Target, Clock, Heart, Lightbulb, Globe, TrendingUp, UserCheck, Sparkles, Brain, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import systemPalImage from '@/assets/pals/female-system-pal-edited.png';
import reelPalImage from '@/assets/pals/female-reel-pal-edited.png';
import evergreenPalImage from '@/assets/pals/female-evergreen-pal-final.png';
import spotlightPalImage from '@/assets/pals/female-spotlight-pal-edited.png';
const EducationPage = () => {
  const {
    transitionTo
  } = usePageTransition();
  const videoSolutions = [{
    icon: <BookOpen className="h-8 w-8" />,
    title: "Online Learning & Course Content",
    description: "Lecture capture, course modules, instructional videos, skill demonstrations, tutorial content, flipped classroom materials, and asynchronous learning resources for online and hybrid education.",
    palType: "System Pal + Evergreen Pal",
    color: "border-blue-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    features: ["Course Modules", "Lectures", "Tutorials", "Skill Demos"]
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "Faculty & Staff Training",
    description: "Professional development, teaching methodology training, technology training, compliance requirements, safety protocols, diversity and inclusion training, and institutional policy updates.",
    palType: "System Pal",
    color: "border-purple-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    features: ["PD Training", "Tech Training", "Compliance", "Best Practices"]
  }, {
    icon: <School className="h-8 w-8" />,
    title: "Student Recruitment & Admissions",
    description: "Campus tours, program showcases, student testimonials, welcome videos, orientation content, parent information sessions, and virtual open house materials that attract prospective students.",
    palType: "Spotlight Pal",
    color: "border-green-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    features: ["Campus Tours", "Program Showcases", "Student Stories", "Virtual Events"]
  }, {
    icon: <Award className="h-8 w-8" />,
    title: "Donor Relations & Fundraising",
    description: "Impact stories, campaign videos, donor recognition content, giving day promotions, endowment showcases, alumni success stories, and capital campaign materials that inspire giving.",
    palType: "Spotlight Pal",
    color: "border-orange-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    features: ["Impact Stories", "Campaign Videos", "Donor Recognition", "Alumni Stories"]
  }, {
    icon: <Globe className="h-8 w-8" />,
    title: "Social Media & Student Engagement",
    description: "Campus life highlights, student takeovers, event coverage, quick tips for students, behind-the-scenes content, sports highlights, and community-building social content.",
    palType: "Reel Pal",
    color: "border-teal-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    features: ["Campus Life", "Events", "Student Content", "Community Building"]
  }, {
    icon: <Heart className="h-8 w-8" />,
    title: "Safety & Wellness Education",
    description: "Campus safety protocols, emergency procedures, mental health resources, wellness initiatives, Title IX training, health education, and student support service information.",
    palType: "System Pal",
    color: "border-red-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    features: ["Safety Training", "Wellness", "Mental Health", "Support Services"]
  }];
  const industryBenefits = [{
    icon: <Target className="h-6 w-6" />,
    title: "Boost Enrollment",
    stat: "45% Increase",
    description: "Video tours and testimonials drive enrollment growth"
  }, {
    icon: <Clock className="h-6 w-6" />,
    title: "Scale Learning",
    stat: "10x Reach",
    description: "Deliver quality education to unlimited students"
  }, {
    icon: <UserCheck className="h-6 w-6" />,
    title: "Improve Retention",
    stat: "60% Better",
    description: "Video learning increases information retention"
  }, {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Increase Giving",
    stat: "3x More Donors",
    description: "Compelling stories inspire more generous giving"
  }];
  const useCases = [{
    title: "K-12 Schools & Districts",
    description: "Parent communication videos, teacher training, student safety education, virtual open houses, curriculum showcases, and community engagement content that builds trust and involvement.",
    icon: <School className="h-6 w-6" />
  }, {
    title: "Colleges & Universities",
    description: "Recruitment videos, online course content, faculty training, research showcases, donor cultivation, alumni engagement, and institutional branding that attracts students and support.",
    icon: <GraduationCap className="h-6 w-6" />
  }, {
    title: "Training & Certificate Programs",
    description: "Professional development courses, skill certification content, industry training programs, continuing education materials, and workforce development that delivers measurable outcomes.",
    icon: <Award className="h-6 w-6" />
  }, {
    title: "Online Learning Platforms",
    description: "Scalable course production, instructor training, platform tutorials, student success resources, marketing content, and instructional design support for digital learning environments.",
    icon: <Globe className="h-6 w-6" />
  }, {
    title: "Educational Nonprofits",
    description: "Program showcase videos, impact storytelling, volunteer training, donor engagement content, community education materials, and advocacy campaigns that drive mission forward.",
    icon: <Heart className="h-6 w-6" />
  }, {
    title: "Museums & Libraries",
    description: "Exhibit tours, educational programming, virtual events, collection showcases, behind-the-scenes content, and community engagement that expands access and impact.",
    icon: <Library className="h-6 w-6" />
  }];
  return <div className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      <MetaTags title="Education Video Production | E-Learning & School Videos | Palmer House Productions" description="Video production for education: online courses, student recruitment, faculty training, donor engagement, campus tours, and safety education for schools, colleges, and educational organizations." keywords="education video production, e-learning videos, online course production, school recruitment videos, campus tours, faculty training videos, educational content, student testimonials" ogTitle="Education Video Production | Learning Content & School Marketing" ogDescription="Specialized video production for education: online learning, student recruitment, faculty training, and donor engagement for schools and educational institutions." canonicalUrl="https://www.palmerhouseproductions.com/industries/education" />
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
                Education Industry Solutions
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-foreground">
                Education Video Production That Inspires Learning & Drives Growth
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                From online courses to student recruitment and donor engagement, we create video content 
                that enhances learning outcomes, attracts students, engages supporters, and positions your 
                educational institution as a leader in student success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" onClick={() => window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer')}>
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Education Consultation
                </Button>
                <Button variant="outline" size="lg" onClick={() => transitionTo('/pals')}>
                  Explore Video Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {industryBenefits.map((benefit, index) => <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-primary">
                      {benefit.icon}
                    </div>
                    <div className="text-2xl font-bold mb-1 text-foreground">{benefit.stat}</div>
                    <h3 className="font-semibold text-sm mb-1 text-foreground">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground leading-tight">{benefit.description}</p>
                  </div>)}
              </div>
            </div>

            
          </div>
        </section>

        {/* Our Video Production Process */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[{
              number: "1",
              title: "Discovery",
              description: "Understanding your goals, audience, and learning objectives through detailed consultation.",
              color: "bg-orange-100",
              textColor: "text-orange-600"
            }, {
              number: "2",
              title: "Planning",
              description: "Developing scripts, storyboards, and production timelines tailored to your educational environment.",
              color: "bg-pink-100",
              textColor: "text-pink-600"
            }, {
              number: "3",
              title: "Production",
              description: "Professional filming with education-specific equipment and techniques, ensuring minimal disruption.",
              color: "bg-blue-100",
              textColor: "text-blue-600"
            }, {
              number: "4",
              title: "Delivery",
              description: "Final videos optimized for your platforms with accessibility features and learning analytics.",
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

            {/* Education Video Specialties */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Education Video Specialties</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl">
                Our expertise spans across various educational sectors, ensuring we understand the unique challenges and opportunities in your field.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  {[{
                  icon: <School className="h-6 w-6" />,
                  title: "K-12 Schools & Districts",
                  description: "Parent communication, teacher training, and student safety education.",
                  color: "bg-blue-100",
                  iconColor: "text-blue-600"
                }, {
                  icon: <GraduationCap className="h-6 w-6" />,
                  title: "Colleges & Universities",
                  description: "Recruitment videos, course content, and institutional branding.",
                  color: "bg-green-100",
                  iconColor: "text-green-600"
                }, {
                  icon: <Globe className="h-6 w-6" />,
                  title: "Online Learning Platforms",
                  description: "Scalable course production and platform tutorials.",
                  color: "bg-purple-100",
                  iconColor: "text-purple-600"
                }, {
                  icon: <Library className="h-6 w-6" />,
                  title: "Museums & Libraries",
                  description: "Exhibit tours, educational programming, and virtual events.",
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
                    <BookOpen className="h-16 w-16 text-green-600" />
                  </div>
                  <div className="bg-purple-200 rounded-3xl flex items-center justify-center h-48">
                    <Lightbulb className="h-16 w-16 text-purple-600" />
                  </div>
                  <div className="bg-orange-200 rounded-3xl flex items-center justify-center h-48">
                    <Brain className="h-16 w-16 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Education Video Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Education Video Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive video production solutions tailored for educational organizations, 
                designed to inspire learning, attract students, and build community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[{
              icon: <BookOpen className="h-8 w-8" />,
              badge: "Learning Content",
              title: "Educational Videos",
              description: "Clear, engaging content that enhances learning outcomes and scales your teaching impact.",
              features: ["Course modules", "Lecture capture", "Tutorial content"],
              color: "bg-blue-100",
              iconColor: "text-blue-600",
              badgeColor: "bg-blue-100 text-blue-700"
            }, {
              icon: <Users className="h-8 w-8" />,
              badge: "Faculty Training",
              title: "Training Content",
              description: "Professional development videos that enhance teaching skills and ensure institutional compliance.",
              features: ["PD training", "Technology training", "Best practices"],
              color: "bg-green-100",
              iconColor: "text-green-600",
              badgeColor: "bg-green-100 text-green-700"
            }, {
              icon: <School className="h-8 w-8" />,
              badge: "Marketing",
              title: "Promotional Videos",
              description: "Compelling narratives that showcase your institution's mission and attract students.",
              features: ["Campus tours", "Student testimonials", "Program showcases"],
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

        {/* How Each Pal Serves Education */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How Each Pal Serves Education
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every educational institution needs different video solutions. Our specialized Pals deliver exactly what you need—from social engagement to training systems to brand authority.
              </p>
            </div>

            <Tabs defaultValue="reel" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12 h-auto p-2 bg-gray-100">
                <TabsTrigger value="reel" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white py-3 text-sm font-medium">
                  Reel Pal
                </TabsTrigger>
                <TabsTrigger value="system" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 text-sm font-medium">
                  System Pal
                </TabsTrigger>
                <TabsTrigger value="evergreen" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white py-3 text-sm font-medium">
                  Evergreen Pal
                </TabsTrigger>
                <TabsTrigger value="spotlight" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white py-3 text-sm font-medium">
                  Spotlight Pal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reel" className="animate-fade-in">
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl border-2 border-orange-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Video className="h-4 w-4" />
                        Reel Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Social Media & Student Engagement
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Build vibrant campus communities with student life highlights, event coverage, campus culture content, and engaging social media that attracts prospective students.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Campus life highlights and student success stories</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Event coverage and campus activity showcases</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Quick educational tips and student resource guides</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>Behind-the-scenes campus culture and community building</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Campus Life</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Events</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Student Stories</Badge>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Community Building</Badge>
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

              <TabsContent value="system" className="animate-fade-in">
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl border-2 border-purple-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                        <BookOpen className="h-4 w-4" />
                        System Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Faculty Training & Online Courses
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Scale your educational impact with online course content, faculty development programs, technology training, and standardized learning materials.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Essential Training Solutions:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Online course modules and lecture capture for flexible learning</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Faculty professional development and teaching methodology training</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Safety protocols, compliance training, and institutional policies</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>Technology training and educational software onboarding</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Online Courses</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Faculty Training</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Compliance</Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Tech Training</Badge>
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

              <TabsContent value="evergreen" className="animate-fade-in">
                <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl border-2 border-teal-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                        <GraduationCap className="h-4 w-4" />
                        Evergreen Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Program Marketing & Admissions
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Attract students with program showcases, academic excellence content, virtual open houses, and educational resources that demonstrate your institution's value.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Build Enrollment With:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Program overview videos and academic department showcases</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Virtual campus tours and facility highlights</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Parent information sessions and student resources</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                              <span>Educational content that establishes institutional authority</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Program Showcases</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Virtual Tours</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Admissions</Badge>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">Resources</Badge>
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

              <TabsContent value="spotlight" className="animate-fade-in">
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border-2 border-pink-200 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Heart className="h-4 w-4" />
                        Spotlight Pal
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Donor Relations & Fundraising
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Inspire giving with impact stories, campaign videos, donor recognition, and compelling fundraising content that showcases your institution's mission and impact.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Drive Philanthropy With:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Powerful impact stories showing how donations transform lives</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Campaign videos for capital projects and fundraising initiatives</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Donor recognition content and gratitude showcases</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                              <span>Alumni success stories and endowment impact videos</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Impact Stories</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Campaign Videos</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Donor Recognition</Badge>
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">Alumni Stories</Badge>
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
            </Tabs>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                Ready to Elevate Learning & Institutional Impact?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's discuss how video can help your educational institution engage students, 
                attract support, scale learning, and achieve your mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-600 text-white hover:bg-teal-700 font-semibold text-lg px-8 py-4 h-auto" onClick={() => window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer')}>
                  <Video className="mr-2 h-5 w-5" />
                  Schedule Strategy Call
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold text-lg px-8 py-4 h-auto" onClick={() => transitionTo('/contact')}>
                  Get Education Video Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>;
};
export default EducationPage;