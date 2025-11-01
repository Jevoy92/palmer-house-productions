import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTransition } from '@/components/PageTransition';
import { 
  Video, 
  Camera, 
  Lightbulb, 
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  Shield,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const VideoProduction = () => {
  const { transitionTo } = usePageTransition();

  const productionServices = [
    {
      icon: Video,
      title: "Corporate Video Production",
      description: "Professional corporate videos that communicate your brand message, showcase your products, and engage your stakeholders with compelling visual storytelling.",
      features: ["Brand Films", "Product Demos", "Company Overviews", "Testimonials"]
    },
    {
      icon: Users,
      title: "Training & Educational Videos",
      description: "Scalable training content that standardizes your employee onboarding, reduces training time, and ensures consistent knowledge transfer across your organization.",
      features: ["Employee Onboarding", "Safety Training", "Process Documentation", "Compliance Videos"]
    },
    {
      icon: Target,
      title: "Marketing & Social Content",
      description: "Attention-grabbing video content optimized for social media platforms, designed to increase engagement, build brand awareness, and drive conversions.",
      features: ["Social Media Reels", "Ad Campaigns", "Product Launches", "Event Coverage"]
    },
    {
      icon: Lightbulb,
      title: "Thought Leadership Videos",
      description: "Position your executives as industry experts with professionally produced interview-style content, webinar recordings, and educational series.",
      features: ["Executive Interviews", "Industry Insights", "Educational Series", "Webinar Production"]
    }
  ];

  const productionProcess = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We start by understanding your goals, audience, and brand voice to create a custom video strategy that aligns with your business objectives."
    },
    {
      step: "02",
      title: "Pre-Production Planning",
      description: "Scriptwriting, storyboarding, location scouting, and talent coordination—we handle all the details before the cameras roll."
    },
    {
      step: "03",
      title: "Professional Filming",
      description: "Our experienced crew captures stunning footage using professional-grade equipment, ensuring every frame tells your story effectively."
    },
    {
      step: "04",
      title: "Post-Production & Delivery",
      description: "Expert editing, color grading, motion graphics, and sound design bring your vision to life with polish and professionalism."
    }
  ];

  const industries = [
    { name: "Healthcare", path: "/industries/healthcare" },
    { name: "Manufacturing", path: "/industries/manufacturing" },
    { name: "Professional Services", path: "/industries/professional-services" },
    { name: "Education", path: "/industries/education" },
    { name: "Government", path: "/industries/government" },
    { name: "Technology", path: "/startups" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <MetaTags 
        title="Professional Video Production Services | Corporate & Marketing Videos"
        description="Expert video production services for businesses. Corporate videos, training content, marketing videos, and social media content. Professional filming, creative storytelling, measurable results."
        keywords="video production, corporate video, marketing video, training videos, business video production, professional videography, video content creation"
        ogTitle="Professional Video Production Services | Palmer House Productions"
        ogDescription="Transform your business communication with professional video production. From corporate videos to social media content."
      />
      <StructuredData type="services" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Professional Video Production</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Transform Your Story Into
              <br />
              <span className="text-primary">Compelling Video Content</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Professional video production that captures attention, communicates your message, 
              and drives measurable business results across all platforms and industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => transitionTo('/contact')}
                className="group"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => transitionTo('/pals')}
              >
                Explore Video Solutions
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Fast Turnaround</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Quality Guaranteed</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Award-Winning</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Creative Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Full-Service <span className="text-primary">Video Production</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From concept to completion, we produce videos that engage, inform, and inspire action.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {productionServices.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2 ml-16">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Production Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven workflow that delivers high-quality video content on time and on budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productionProcess.map((phase, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-xl p-6 h-full border-2 hover:border-primary/50 transition-all">
                  <div className="text-6xl font-bold text-primary/10 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
                {index < productionProcess.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Industry-Specific</span> Video Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored video production services for your industry's unique needs and regulations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <Link
                key={index}
                to={industry.path}
                className="group p-6 bg-card rounded-lg border-2 hover:border-primary transition-all text-center hover:shadow-lg"
              >
                <p className="font-semibold group-hover:text-primary transition-colors">
                  {industry.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Video Production Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 border-2">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Meet the <span className="text-primary">Palmer House Pals</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our specialized video production experts—Reel Pal, System Pal, Evergreen Pal, 
                  and Spotlight Pal—each bring unique expertise to ensure your project exceeds expectations.
                </p>
                <Button 
                  onClick={() => transitionTo('/pals')}
                  className="group"
                >
                  Meet Your Production Team
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <Video className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-bold">Reel Pal</h3>
                    <p className="text-sm text-muted-foreground">Social Video</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-bold">System Pal</h3>
                    <p className="text-sm text-muted-foreground">Training Videos</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-bold">Evergreen Pal</h3>
                    <p className="text-sm text-muted-foreground">SEO Videos</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-bold">Spotlight Pal</h3>
                    <p className="text-sm text-muted-foreground">Premium Production</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your <span className="text-primary">Video Project</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how professional video production can elevate your brand 
            and achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => transitionTo('/contact')}
              className="group"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => transitionTo('/about-us')}
            >
              Learn About Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoProduction;
