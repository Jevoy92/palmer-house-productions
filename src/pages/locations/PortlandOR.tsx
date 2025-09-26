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
  Target,
  DollarSign,
  Calendar,
  Award
} from "lucide-react";

const PortlandOR = () => {
  return (
    <div className="bg-gray-50 overflow-x-hidden relative">
      {/* Fixed Background Bars */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange transition-all duration-700 ease-in-out"></div>
          <div className="w-1/4 h-full bg-pal-purple transition-all duration-700 ease-in-out"></div>
          <div className="w-1/4 h-full bg-pal-green transition-all duration-700 ease-in-out"></div>
          <div className="w-1/4 h-full bg-pal-blue transition-all duration-700 ease-in-out"></div>
        </div>
      </div>

      <MetaTags
        title="Portland Video Production Studio | Palmer House Productions"
        description="Portland, OR video production for brands that want results. Studio and on-location shoots, editing, and strategy—serving clients globally."
        keywords="Portland video production, Oregon video studio, corporate video Portland, brand storytelling Portland"
        ogTitle="Portland, OR Video Production | Palmer House Productions"
        ogDescription="Cinematic video production in Portland, serving Oregon and global clients."
        canonicalUrl="https://www.palmerhouseproductions.com/locations/portland-or"
      />
      <StructuredData type="services" />
      <LocationStructuredData
        city="Portland"
        region="OR"
        canonicalUrl="https://www.palmerhouseproductions.com/locations/portland-or"
      />
      <FAQSchema
        faqs={[
          { question: 'Which areas around Portland do you cover?', answer: 'Metro Portland plus Beaverton, Lake Oswego, Tigard, Gresham, Salem, Bend, and the Oregon Coast. Remote collaboration is available.' },
          { question: 'Do you travel for shoots?', answer: 'Yes — local travel is included, and extended coverage across Oregon and the Pacific Northwest is available.' },
          { question: 'What types of projects fit best?', answer: 'Brand storytelling, social authority systems, internal training libraries, testimonials, and launch content.' },
          { question: 'How fast can we start?', answer: 'Immediately. Book a strategy call and we’ll align on scope, timeline, and the right content system.' },
          { question: 'Is long-form YouTube included?', answer: 'YouTube long-form is a separate ongoing plan. Social and brand assets are covered in our monthly and bundle systems.' }
        ]}
      />
      <Navigation />
      <MainContent>
        <section className="py-16 sm:py-20 lg:py-32 relative z-10 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbNavigation />
            <div className="text-center mb-12 lg:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-gray-900 leading-tight">
                Portland, OR Video Production
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our Portland studio partners with local Oregon companies as well as remote-first and global teams. We build content systems—not one-off videos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-20">
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-6 border-blue-500 bg-white hover:scale-105 animate-fade-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <Video className="h-6 sm:h-8 w-6 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-corporate-dark">Services we offer</CardTitle>
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
              
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-6 border-green-500 bg-white hover:scale-105 animate-fade-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                      <Phone className="h-6 sm:h-8 w-6 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-corporate-dark">Start a project</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base text-gray-600 mb-6 leading-relaxed">
                    Tell us about your next shoot or system. We'll recommend the best path.
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="outline" asChild className="border-green-500 text-green-600 hover:bg-green-50">
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

            {/* Oregon Service Areas */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-6 border-purple-500 bg-white mb-16 lg:mb-20 animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                    <MapPin className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl text-corporate-dark">Oregon Service Coverage</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  From our Portland base, we serve businesses throughout Oregon and the Pacific Northwest with comprehensive video production services.
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Metro Portland</Badge>
                    </h3>
                    <div className="space-y-2">
                      {["Downtown Portland", "Beaverton & Tigard", "Lake Oswego & Milwaukie", "Gresham & East Portland"].map((area, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Production Options</Badge>
                    </h3>
                    <div className="space-y-2">
                      {["Professional studio space", "Corporate office filming", "Outdoor location shoots", "Multi-location projects"].map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Extended Coverage</Badge>
                    </h3>
                    <div className="space-y-2">
                      {["Salem & Mid-Valley", "Bend & Central Oregon", "Coastal regions", "Remote collaboration"].map((range, index) => (
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

            {/* Content Systems Focus */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-6 border-amber-500 bg-white mb-16 lg:mb-20 animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                    <Globe className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl text-corporate-dark">Content Systems, Not One-Offs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5 text-amber-600" />
                      Scalable Video Programs
                    </h3>
                    <CardDescription className="text-base text-gray-600 mb-4 leading-relaxed">
                      We specialize in building sustainable content systems that grow with your business. Instead of isolated videos, we create frameworks for ongoing content production.
                    </CardDescription>
                    <div className="space-y-2">
                      {[
                        "Monthly content production schedules",
                        "Branded video templates and styles", 
                        "Training libraries that expand over time"
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
                      <Users className="w-5 h-5 text-amber-600" />
                      Remote-First Approach
                    </h3>
                    <CardDescription className="text-base text-gray-600 mb-4 leading-relaxed">
                      Working with distributed teams across time zones? We've built our processes to support seamless collaboration whether you're local or global.
                    </CardDescription>
                    <div className="space-y-2">
                      {[
                        "Cloud-based review and approval",
                        "Flexible scheduling across time zones",
                        "Digital-first delivery systems"
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

            {/* Investment & Process */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-6 border-red-500 bg-white animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <DollarSign className="h-6 sm:h-8 w-6 sm:w-8" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl text-corporate-dark">Investment & Timeline</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      Project Types
                    </h3>
                    <div className="space-y-4">
                      {[
                        { title: "Single Videos", price: "Starting at $500" },
                        { title: "Video Packages", price: "Starting at $2,500" },
                        { title: "Business Video Assets", price: "Starting at $4,500" }
                      ].map((project, index) => (
                        <Card key={index} className="border-l-4 border-red-400 bg-red-50">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-corporate-dark">{project.title}</h4>
                            <p className="text-sm text-gray-600">{project.price}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-red-600" />
                      Timeline
                    </h3>
                    <div className="space-y-4">
                      {[
                        { phase: "Discovery & Planning", duration: "1-2 weeks" },
                        { phase: "Production", duration: "1-3 days filming" },
                        { phase: "Post-Production", duration: "2-4 weeks editing" }
                      ].map((timeline, index) => (
                        <div key={index} className="border-l-4 border-red-400 pl-4">
                          <h4 className="font-semibold text-corporate-dark">{timeline.phase}</h4>
                          <p className="text-sm text-gray-600">{timeline.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-corporate-dark mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-red-600" />
                      What's Included
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Pre-production planning",
                        "Professional crew & equipment", 
                        "Multiple format delivery",
                        "Two rounds of revisions",
                        "Cloud-based asset delivery",
                        "Usage rights included"
                      ].map((included, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{included}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default PortlandOR;