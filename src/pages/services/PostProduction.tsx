import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTransition } from '@/components/PageTransition';
import { 
  Film, 
  Palette, 
  Music, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  Wand2,
  Target,
  Layers,
  Volume2,
  Eye,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const PostProduction = () => {
  const { transitionTo } = usePageTransition();

  const postProductionServices = [
    {
      icon: Film,
      title: "Video Editing & Assembly",
      description: "Expert editing that transforms raw footage into polished, engaging content. We craft narratives that capture attention and maintain viewer interest from start to finish.",
      features: ["Multi-cam Editing", "Narrative Flow", "Pacing Optimization", "Transitions & Effects"]
    },
    {
      icon: Palette,
      title: "Color Grading & Correction",
      description: "Professional color grading that establishes mood, ensures brand consistency, and creates a cinematic look that elevates your content above standard video.",
      features: ["Color Matching", "Mood Creation", "Brand Consistency", "Cinematic Grading"]
    },
    {
      icon: Music,
      title: "Audio Engineering & Sound Design",
      description: "Crystal-clear audio mixing, sound effects, and music integration that enhances emotional impact and ensures professional broadcast-quality sound.",
      features: ["Audio Mixing", "Noise Reduction", "Sound Effects", "Music Licensing"]
    },
    {
      icon: Wand2,
      title: "Motion Graphics & Animation",
      description: "Eye-catching motion graphics, lower thirds, title animations, and visual effects that reinforce your brand and explain complex concepts clearly.",
      features: ["Animated Titles", "Infographics", "Logo Animation", "Visual Effects"]
    },
    {
      icon: Target,
      title: "Format Optimization & Delivery",
      description: "Multi-platform optimization ensuring your video looks perfect whether it's on YouTube, LinkedIn, Instagram, or your website—formatted for maximum engagement.",
      features: ["Platform-Specific Edits", "Aspect Ratio Variants", "Compression Optimization", "Subtitle Integration"]
    },
    {
      icon: Layers,
      title: "Revision & Refinement",
      description: "Collaborative revision process that ensures the final product perfectly aligns with your vision, brand standards, and business objectives.",
      features: ["Structured Feedback", "Unlimited Revisions", "Version Control", "Final Delivery"]
    }
  ];

  const postProductionProcess = [
    {
      step: "Review & Assessment",
      description: "We review all raw footage, identify the best takes, and create a detailed editing plan aligned with your goals.",
      icon: Eye
    },
    {
      step: "First Cut Assembly",
      description: "Rough cut assembly establishing narrative flow, pacing, and structure for your approval before detail work begins.",
      icon: Layers
    },
    {
      step: "Refinement & Polish",
      description: "Color grading, audio mixing, motion graphics, and visual effects are added to create a professional, polished product.",
      icon: Sparkles
    },
    {
      step: "Final Delivery",
      description: "Optimized final files delivered in all required formats for seamless deployment across your chosen platforms.",
      icon: Zap
    }
  ];

  const capabilities = [
    {
      title: "Advanced Color Grading",
      description: "Create stunning visual consistency and mood with professional-grade color correction and grading techniques."
    },
    {
      title: "Audio Restoration",
      description: "Remove background noise, echo, and imperfections to ensure broadcast-quality audio clarity."
    },
    {
      title: "Motion Graphics",
      description: "Custom animated elements that reinforce your brand identity and explain complex information visually."
    },
    {
      title: "Multi-Format Optimization",
      description: "Deliver platform-specific versions optimized for Instagram, YouTube, LinkedIn, Facebook, and web."
    },
    {
      title: "Subtitle & Caption Creation",
      description: "Professional subtitle and closed caption services for accessibility and engagement across silent-viewing platforms."
    },
    {
      title: "Archive & Asset Management",
      description: "Organized project files and raw assets archived for future edits, repurposing, and version updates."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <MetaTags 
        title="Professional Video Post-Production Services | Editing, Color, & Sound"
        description="Expert video post-production services including editing, color grading, audio mixing, motion graphics, and multi-platform optimization. Transform raw footage into polished, professional content."
        keywords="video post-production, video editing, color grading, audio mixing, motion graphics, sound design, video editing services, professional video editing"
        ogTitle="Professional Video Post-Production Services | Palmer House Productions"
        ogDescription="Transform raw footage into polished, professional video content with expert editing, color grading, and sound design."
      />
      <StructuredData type="services" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <Film className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Professional Post-Production</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Polish Your Vision With
              <br />
              <span className="text-secondary">Expert Post-Production</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Transform raw footage into captivating content with professional editing, color grading, 
              audio engineering, and motion graphics that elevate your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => transitionTo('/contact')}
                className="group"
              >
                Start Your Edit
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => transitionTo('/spotlight-pal')}
              >
                Meet Spotlight Pal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Production Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-secondary">Complete</span> Post-Production Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every detail matters. Our comprehensive post-production services ensure 
              your video looks and sounds exceptional across all platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postProductionServices.map((service, index) => (
              <Card key={index} className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center gap-4 mb-4">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <service.icon className="w-8 h-8 text-secondary mx-auto" />
                    </div>
                    <h3 className="text-lg font-bold text-center">{service.title}</h3>
                  </div>
                  <p className="text-sm text-foreground/80 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
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

      {/* Post-Production Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-secondary">Our</span> Editing Workflow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A streamlined process that delivers exceptional results while keeping you 
              involved and informed at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {postProductionProcess.map((phase, index) => (
              <div key={index} className="relative group">
                <div className="bg-card rounded-xl p-6 h-full border-2 hover:border-primary transition-all hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <phase.icon className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{phase.step}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
                {index < postProductionProcess.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary z-10 w-6 h-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-secondary">Advanced</span> Post-Production Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge tools and techniques to bring your vision to life with 
              professional polish and technical excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-2 text-secondary">{capability.title}</h3>
                  <p className="text-foreground/80 text-sm">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Pal Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 border-2">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-semibold text-secondary">Meet Your Editor</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-secondary">Spotlight Pal</span>
                  <br />
                  Your Post-Production Expert
                </h2>
                <p className="text-lg text-foreground/80 mb-6">
                  Spotlight Pal specializes in transforming raw footage into polished, 
                  professional content. With expertise in editing, color grading, and audio 
                  post-production, Spotlight ensures every frame tells your story perfectly.
                </p>
                <Button 
                  onClick={() => transitionTo('/spotlight-pal')}
                  className="group"
                >
                  Learn More About Spotlight Pal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Film, label: "Expert Editing" },
                  { icon: Palette, label: "Color Grading" },
                  { icon: Volume2, label: "Audio Mixing" },
                  { icon: Wand2, label: "Motion Graphics" }
                ].map((item, index) => (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-4">
                      <item.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <p className="font-semibold text-sm">{item.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-secondary">Related</span> Video Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/services/video-production"
              className="group p-8 bg-card rounded-xl border-2 hover:border-primary transition-all hover:shadow-lg"
            >
              <Film className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                Video Production
              </h3>
              <p className="text-foreground/80 mb-4">
                Professional filming services for all your video content needs.
              </p>
              <div className="flex items-center text-primary font-semibold">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>

            <Link
              to="/content-strategy"
              className="group p-8 bg-card rounded-xl border-2 hover:border-primary transition-all hover:shadow-lg"
            >
              <Target className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                Consulting & Strategy
              </h3>
              <p className="text-foreground/80 mb-4">
                Strategic planning to maximize your video content ROI.
              </p>
              <div className="flex items-center text-primary font-semibold">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>

            <Link
              to="/services/diy-downloads"
              className="group p-8 bg-card rounded-xl border-2 hover:border-primary transition-all hover:shadow-lg"
            >
              <Zap className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                DIY Tools & Downloads
              </h3>
              <p className="text-foreground/80 mb-4">
                Templates and resources for self-service video creation.
              </p>
              <div className="flex items-center text-primary font-semibold">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your <span className="text-secondary">Raw Footage</span>?
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
            Let's discuss how professional post-production can elevate your video content 
            and maximize its impact across all platforms.
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
              Learn About Our Process
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostProduction;
