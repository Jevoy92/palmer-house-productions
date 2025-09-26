import { Navigation } from "@/components/Navigation";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Link } from "react-router-dom";
import { LocationStructuredData } from "@/components/seo/LocationStructuredData";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Building, 
  Phone, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Camera,
  Video,
  Edit3,
  Target
} from "lucide-react";

const BellevueWA = () => {
  return (
    <div className="bg-gray-50 overflow-x-hidden relative">
      {/* Fixed Background Bars - Updated for visibility */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange"></div>
          <div className="w-1/4 h-full bg-pal-purple"></div>
          <div className="w-1/4 h-full bg-pal-green"></div>
          <div className="w-1/4 h-full bg-pal-blue"></div>
        </div>
      </div>

      <MetaTags
        title="Bellevue Video Production Studio | Palmer House Productions"
        description="Bellevue, WA video production studio crafting cinematic brand stories. Serving Seattle metro and global clients with strategy, filming, and editing."
        keywords="Bellevue video production, Seattle video studio, corporate video Bellevue, brand storytelling Bellevue"
        ogTitle="Bellevue, WA Video Production | Palmer House Productions"
        ogDescription="Cinematic video production in Bellevue, serving Seattle and global clients."
        canonicalUrl="https://www.palmerhouseproductions.com/locations/bellevue-wa"
      />
      <StructuredData type="services" />
      <LocationStructuredData
        city="Bellevue"
        region="WA"
        canonicalUrl="https://www.palmerhouseproductions.com/locations/bellevue-wa"
      />
      <FAQSchema
        faqs={[
          { question: 'Do you serve the entire Seattle metro?', answer: 'Yes — Bellevue, Seattle, Redmond, Kirkland, and the broader Puget Sound region. Travel within ~30 miles is included.' },
          { question: 'Studio or on-location?', answer: 'Both. We offer a professional studio setup in Bellevue and on-location shoots at your office or event.' },
          { question: 'Can you work with distributed teams?', answer: 'Yes — we support remote-first workflows with cloud review, async feedback, and flexible scheduling.' },
          { question: 'How do we start?', answer: 'Book a strategy call or share your bottleneck via our contact form. We’ll map the right video system for your goals.' },
          { question: 'Do you do one-off videos?', answer: 'We prioritize content systems. Select one-time bundles are available when they function as a system (e.g., FAQ buildouts).'}
        ]}
      />
      <Navigation />
      <MainContent>
        <section className="py-16 sm:py-20 lg:py-32 relative z-10 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbNavigation />
            <div className="text-center mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-gray-900 leading-tight">
                Bellevue, WA Video Production
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our Bellevue studio specializes in tech company video production. We build content systems for startups, SaaS platforms, and established tech brands throughout the Seattle metro area.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-20">
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-l-6 border-pal-blue hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pal-blue/10 rounded-xl flex items-center justify-center text-pal-blue group-hover:scale-110 transition-transform">
                      <Video className="h-6 sm:h-8 w-6 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-gray-900">Tech-Focused Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {[
                      "Corporate and brand storytelling",
                      "Social content and reels bundles", 
                      "Internal training and onboarding libraries",
                      "Customer testimonials and case studies"
                    ].map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{service}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/video-packages" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Explore Video Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-l-6 border-pal-green hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pal-green/10 rounded-xl flex items-center justify-center text-pal-green group-hover:scale-110 transition-transform">
                      <Phone className="h-6 sm:h-8 w-6 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-gray-900">Get Started Today</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">
                    Tell us about your next shoot or system. We'll recommend the best path.
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-pal-green hover:bg-pal-green/90 text-white">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="outline" asChild className="border-pal-green text-pal-green hover:bg-pal-green/5">
                      <a
                        href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078320"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book Strategy Call
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Local Service Areas */}
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-l-6 border-pal-purple mb-16 lg:mb-20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pal-purple/10 rounded-xl flex items-center justify-center text-pal-purple">
                    <MapPin className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl text-gray-900">Seattle Metro Coverage</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  Based in Bellevue, we serve the entire Seattle metropolitan area with both studio and on-location production services.
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Badge className="bg-pal-purple/10 text-pal-purple hover:bg-pal-purple/20">Eastside Tech Hub</Badge>
                    </h3>
                    <div className="space-y-2">
                      {["Bellevue & Eastside", "Seattle & Downtown", "Redmond & Tech Corridor", "Kirkland & Bothell"].map((area, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Badge className="bg-pal-purple/10 text-pal-purple hover:bg-pal-purple/20">Production Capabilities</Badge>
                    </h3>
                    <div className="space-y-2">
                      {["Professional studio setup", "On-site at your office", "Event documentation", "Remote collaboration"].map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Badge className="bg-pal-purple/10 text-pal-purple hover:bg-pal-purple/20">Extended Reach</Badge>
                    </h3>
                    <div className="space-y-2">
                      {["30-mile radius included", "Pacific Northwest region", "National projects available", "Global remote support"].map((range, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{range}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Local Advantages */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-6 border-amber-500 bg-white mb-16 lg:mb-20 animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                    <Star className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl text-corporate-dark">Why Choose Local Video Production</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5 text-amber-600" />
                      Local Market Knowledge
                    </h3>
                    <CardDescription className="text-base text-gray-600 mb-4 leading-relaxed">
                      We understand the Seattle business landscape, from tech startups to established enterprises. This local insight helps us create content that resonates with your Pacific Northwest audience.
                    </CardDescription>
                    <div className="space-y-2">
                      {[
                        "Familiar with local business culture",
                        "Knowledge of regional regulations", 
                        "Understanding of tech industry needs"
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-600" />
                      Responsive Partnership
                    </h3>
                    <CardDescription className="text-base text-gray-600 mb-4 leading-relaxed">
                      Being local means faster response times, easier collaboration, and the ability to handle last-minute changes or rush projects when needed.
                    </CardDescription>
                    <div className="space-y-2">
                      {[
                        "Same-day consultation availability",
                        "Quick turnaround on urgent projects",
                        "Face-to-face planning meetings"
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Overview */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-6 border-red-500 bg-white animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <Target className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl text-corporate-dark">Our Process</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Discovery Call",
                      description: "We discuss your goals, timeline, and budget to recommend the best approach.",
                      icon: <Phone className="h-6 w-6" />,
                      color: "border-t-blue-400"
                    },
                    {
                      step: "2",
                      title: "Strategy & Planning", 
                      description: "We develop a comprehensive plan including scripts, shot lists, and production timeline.",
                      icon: <Edit3 className="h-6 w-6" />,
                      color: "border-t-green-400"
                    },
                    {
                      step: "3",
                      title: "Production",
                      description: "Professional filming at our studio or your location with full crew and equipment.",
                      icon: <Camera className="h-6 w-6" />,
                      color: "border-t-amber-400"
                    },
                    {
                      step: "4",
                      title: "Delivery",
                      description: "Professional editing, color correction, and delivery in all formats you need.",
                      icon: <CheckCircle className="h-6 w-6" />,
                      color: "border-t-red-400"
                    }
                  ].map((step, index) => (
                    <Card key={index} className={`text-center bg-gray-50 border-0 ${step.color} border-t-4 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="relative mb-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto text-gray-700 shadow-sm">
                            {step.icon}
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
                            {step.step}
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-corporate-dark mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default BellevueWA;
