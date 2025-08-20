import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Shield, Users, FileText, HelpCircle, Zap, BookOpen, Heart, Trophy, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ContactWizard } from "@/components/ContactWizard";
import { trackConversion } from "@/lib/analytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

type FilterType = "all" | "internal" | "external";

export default function Arsenal() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedSolutions, setExpandedSolutions] = useState<Set<string>>(new Set());
  const [isContactWizardOpen, setIsContactWizardOpen] = useState(false);

  const toggleSolution = (solutionId: string) => {
    const newExpanded = new Set(expandedSolutions);
    if (newExpanded.has(solutionId)) {
      newExpanded.delete(solutionId);
    } else {
      newExpanded.add(solutionId);
    }
    setExpandedSolutions(newExpanded);
  };

  const internalSolutions = [
    {
      id: "employee-onboarding",
      icon: Users,
      title: "Employee Onboarding Systems",
      problem: "Get new team members up to speed fast—without repeating yourself every time.",
      description: "Step-by-step video guides that eliminate confusion and accelerate team integration.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1",
      examples: [
        "New hire system navigation walkthroughs",
        "Company culture & values introductions",
        "Role-specific skill-building modules", 
        "Security & compliance training guides",
        "Remote work setup tutorials",
        "Performance review process maps"
      ]
    },
    {
      id: "client-intake",
      icon: FileText,
      title: "Client Onboarding Systems",
      problem: "Turn confusing onboarding into clear, repeatable processes.",
      description: "Video series that set expectations, showcase outcomes, and guide clients through your process.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2",
      examples: [
        "Service process overviews",
        "Expectation-setting guides",
        "Project timeline & milestone explanations",
        "Communication preference tutorials",
        "Deliverable showcase videos",
        "Feedback & revision processes"
      ]
    },
    {
      id: "vendor-alignment",
      icon: Shield,
      title: "Partner & Vendor Alignment",
      problem: "One video beats ten emails. Align your partners with your standards.",
      description: "Crystal-clear communication tools that keep contractors, partners, and vendors aligned.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3",
      examples: [
        "Project scope explanations",
        "Quality standards demonstrations",
        "Timeline coordination videos",
        "Communication protocol guides",
        "Brand guideline tutorials",
        "Deliverable specification videos"
      ]
    },
    {
      id: "internal-faqs",
      icon: HelpCircle,
      title: "Internal Knowledge Libraries",
      problem: "Answer questions before they slow down your team.",
      description: "Searchable video libraries that solve common challenges instantly, keeping everyone productive.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1",
      examples: [
        "Software troubleshooting guides",
        "Policy explanation videos",
        "Procedure step-by-step tutorials",
        "Equipment setup instructions",
        "Emergency protocol guides",
        "Best practice demonstrations"
      ]
    }
  ];

  const externalSolutions = [
    {
      id: "discovery-campaigns",
      icon: Zap,
      title: "Discovery & Awareness Content",
      problem: "Stay visible and guide prospects to your business.",
      description: "Discovery-focused content that captures attention, builds trust, and converts viewers into customers.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1",
      examples: [
        "Problem awareness videos",
        "Educational content series",
        "Behind-the-scenes stories",
        "Case study narratives",
        "Industry insight reports",
        "Solution preview videos"
      ]
    },
    {
      id: "education-guides",
      icon: BookOpen,
      title: "Educational Content Systems",
      problem: "Educate before you sell. Convert prospects into customers.",
      description: "Educational content that demonstrates value, addresses concerns, and guides prospects through decisions.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2",
      examples: [
        "Feature demonstration videos",
        "Use case scenario tutorials",
        "Problem-solving guides",
        "Comparison explanations",
        "Implementation tutorials",
        "Success story showcases"
      ]
    },
    {
      id: "engagement-content",
      icon: Heart,
      title: "Ongoing Engagement Content",
      problem: "Stay connected with consistent content that scales your voice.",
      description: "Regular, valuable content that keeps your audience engaged and eager for more.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3",
      examples: [
        "Weekly insight videos",
        "Q&A series",
        "Industry trend explorations",
        "Behind-the-scenes content",
        "Community spotlight videos",
        "Seasonal campaigns"
      ]
    },
    {
      id: "thought-leadership",
      icon: Trophy,
      title: "Thought Leadership Content",
      problem: "Become the go-to expert in your industry—on camera.",
      description: "Thought leadership content that positions you as the expert and builds unshakeable credibility.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1",
      examples: [
        "Thought leadership presentations",
        "Industry commentary videos",
        "Speaking engagement highlights",
        "Podcast appearance clips",
        "Conference presentation videos",
        "Expertise demonstration content"
      ]
    }
  ];

  const filteredSolutions = () => {
    switch (filter) {
      case "internal":
        return { internal: internalSolutions, external: [] };
      case "external":
        return { internal: [], external: externalSolutions };
      default:
        return { internal: internalSolutions, external: externalSolutions };
    }
  };

  const handleGetCustomProposal = () => {
    setIsContactWizardOpen(true);
  };

  const handleBookDiscoveryCall = () => {
    trackConversion('discovery_call');
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078320', '_blank', 'noopener,noreferrer');
  };

  const solutions = filteredSolutions();

  return (
    <div className="min-h-screen bg-cinematic-charcoal">
      <MetaTags 
        title="Video Production Arsenal | Business Video Solutions | Palmer House Productions"
        description="Explore our comprehensive video production solutions for internal operations and external marketing. Professional business videos that streamline processes and drive growth."
        keywords="video production solutions, business videos, internal training videos, marketing videos, corporate video production"
        ogTitle="Video Production Arsenal | Business Solutions"
        ogDescription="Comprehensive video production solutions for internal operations and external marketing. Professional business videos that drive results."
        canonicalUrl="https://www.palmerhouseproductions.com/arsenal"
      />
      <StructuredData type="services" />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      
      <MainContent>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-cinematic-charcoal/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
            <div className="absolute top-40 right-20 w-24 h-24 gradient-social-2 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 gradient-social-3 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
              🛠️ Video Solutions Arsenal
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-8 text-video-white tracking-tight">
              Not Just <span className="text-gradient-1">Video</span>.
              <br />
              Business Tools That <span className="text-gradient-2">Work</span>.
            </h1>
            <p className="text-xl text-video-white/80 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
              See how business leaders are solving real challenges using professional video—from team training and partner alignment to marketing campaigns and thought leadership.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button
                onClick={() => setFilter("all")}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 video-shadow ${
                  filter === "all" 
                    ? "gradient-social-1 text-white" 
                    : "bg-video-white border-2 border-social-purple text-social-purple hover:bg-social-purple hover:text-white"
                }`}
              >
                All Solutions
              </button>
              <button
                onClick={() => setFilter("internal")}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 video-shadow ${
                  filter === "internal" 
                    ? "gradient-social-2 text-white" 
                    : "bg-video-white border-2 border-social-orange text-social-orange hover:bg-social-orange hover:text-white"
                }`}
              >
                🏢 Internal Operations
              </button>
              <button
                onClick={() => setFilter("external")}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 video-shadow ${
                  filter === "external" 
                    ? "gradient-social-3 text-white" 
                    : "bg-video-white border-2 border-social-cyan text-social-cyan hover:bg-social-cyan hover:text-white"
                }`}
              >
                📈 Marketing & Growth
              </button>
            </div>
          </div>
        </section>

        {/* Internal Solutions */}
        {solutions.internal.length > 0 && (
          <section className="py-20 bg-white/5 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
                  🏢 Internal Operations
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black mb-8 text-video-white tracking-tight">
                  Streamline Your <span className="text-gradient-2">Operations</span>
                </h2>
                <p className="text-xl text-video-white/80 max-w-3xl mx-auto font-medium">
                  Save time, reduce confusion, and scale your internal operations with video tools built for business.
                </p>
              </div>

              <div className="grid lg:grid-cols-1 gap-8">
                {solutions.internal.map((solution, index) => {
                  const IconComponent = solution.icon;
                  const isExpanded = expandedSolutions.has(solution.id);
                  return (
                    <Collapsible key={index} open={isExpanded} onOpenChange={() => toggleSolution(solution.id)}>
                      <div className="group p-10 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-500">
                        <div className="flex items-start gap-6">
                          <div className={`w-16 h-16 ${solution.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <IconComponent size={32} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className={`text-2xl md:text-3xl font-display font-black ${solution.textGradient}`}>
                                {solution.title}
                              </h3>
                              <CollapsibleTrigger asChild>
                                <button className="text-corporate-gray hover:text-corporate-dark transition-colors" aria-label={isExpanded ? "Collapse" : "Expand"}>
                                  {isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                                </button>
                              </CollapsibleTrigger>
                            </div>
                            <p className="text-corporate-dark font-bold text-lg mb-4">
                              {solution.problem}
                            </p>
                            <p className="text-corporate-gray leading-relaxed text-lg font-medium mb-6">
                              {solution.description}
                            </p>
                            
                            <CollapsibleContent className="space-y-3">
                              <div className="border-t border-corporate-gray/20 pt-6">
                                <h4 className="text-lg font-bold text-corporate-dark mb-4">Solution Examples:</h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {solution.examples.map((example, exampleIndex) => (
                                    <div key={exampleIndex} className="flex items-center gap-3 text-corporate-gray">
                                      <div className="w-2 h-2 bg-gradient-to-r from-social-purple to-social-orange rounded-full flex-shrink-0"></div>
                                      <span className="font-medium">{example}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </div>
                        </div>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* External Solutions */}
        {solutions.external.length > 0 && (
          <section className="py-20 bg-cinematic-charcoal/30 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
                  📈 Marketing & Growth
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black mb-8 text-video-white tracking-tight">
                  Expand Your <span className="text-gradient-3">Reach</span>
                </h2>
                <p className="text-xl text-video-white/80 max-w-3xl mx-auto font-medium">
                  Connect with your audience, build authority, and drive growth with video that leads the way.
                </p>
              </div>

              <div className="grid lg:grid-cols-1 gap-8">
                {solutions.external.map((solution, index) => {
                  const IconComponent = solution.icon;
                  const isExpanded = expandedSolutions.has(solution.id);
                  return (
                    <Collapsible key={index} open={isExpanded} onOpenChange={() => toggleSolution(solution.id)}>
                      <div className="group p-10 bg-corporate-light rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-500">
                        <div className="flex items-start gap-6">
                          <div className={`w-16 h-16 ${solution.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <IconComponent size={32} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className={`text-2xl md:text-3xl font-display font-black ${solution.textGradient}`}>
                                {solution.title}
                              </h3>
                              <CollapsibleTrigger asChild>
                                <button className="text-corporate-gray hover:text-corporate-dark transition-colors" aria-label={isExpanded ? "Collapse" : "Expand"}>
                                  {isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                                </button>
                              </CollapsibleTrigger>
                            </div>
                            <p className="text-corporate-dark font-bold text-lg mb-4">
                              {solution.problem}
                            </p>
                            <p className="text-corporate-gray leading-relaxed text-lg font-medium mb-6">
                              {solution.description}
                            </p>
                            
                            <CollapsibleContent className="space-y-3">
                              <div className="border-t border-corporate-gray/20 pt-6">
                                <h4 className="text-lg font-bold text-corporate-dark mb-4">Content Examples:</h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {solution.examples.map((example, exampleIndex) => (
                                    <div key={exampleIndex} className="flex items-center gap-3 text-corporate-gray">
                                      <div className="w-2 h-2 bg-gradient-to-r from-social-cyan to-social-pink rounded-full flex-shrink-0"></div>
                                      <span className="font-medium">{example}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </div>
                        </div>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-social-purple to-social-pink relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full float-animation"></div>
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-white rounded-full float-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full float-animation" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-8 text-white tracking-tight">
              Ready to Build Your <span className="text-video-white">Video Arsenal</span>?
            </h2>
            <p className="text-xl text-video-white mb-12 max-w-3xl mx-auto font-medium">
              Let's create a custom video strategy that solves your specific business challenges and drives real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleGetCustomProposal}
                className="px-8 py-4 bg-video-white text-social-purple font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg"
              >
                Get Custom Proposal
              </button>
              <button 
                onClick={handleBookDiscoveryCall}
                className="px-8 py-4 border-2 border-video-white text-video-white font-bold text-lg rounded-2xl hover:bg-video-white hover:text-social-purple transition-all duration-300"
              >
                Book Discovery Call
              </button>
            </div>
          </div>
        </section>
      </MainContent>

      <ContactWizard open={isContactWizardOpen} onOpenChange={setIsContactWizardOpen} />
    </div>
  );
}