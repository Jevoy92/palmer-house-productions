import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Shield, Users, FileText, HelpCircle, Zap, BookOpen, Heart, Trophy, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type FilterType = "all" | "internal" | "external";

export default function Arsenal() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedSolutions, setExpandedSolutions] = useState<Set<string>>(new Set());

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
      title: "Employee Onboarding Expeditions",
      problem: "Get new crew members up to speed fast—without repeating yourself on every journey.",
      description: "Step-by-step adventure guides that eliminate confusion and accelerate team integration.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1",
      examples: [
        "New hire system navigation walkthroughs",
        "Company culture & values introductions",
        "Role-specific skill-building modules", 
        "Security & compliance pathfinding guides",
        "Remote work setup expeditions",
        "Performance review journey maps"
      ]
    },
    {
      id: "client-intake",
      icon: FileText,
      title: "Client Journey Mapping",
      problem: "Turn confusing onboarding into clear, repeatable expedition routes.",
      description: "Video series that chart the course, set expectations, and showcase destinations before the journey begins.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2",
      examples: [
        "Service process expedition overviews",
        "Expectation-setting journey guides",
        "Project timeline & milestone maps",
        "Communication preference pathways",
        "Deliverable showcase adventures",
        "Feedback & revision route planning"
      ]
    },
    {
      id: "vendor-alignment",
      icon: Shield,
      title: "Partner Expedition Alignment",
      problem: "One video beats ten emails. Align your expedition partners with your internal compass.",
      description: "Crystal-clear navigation tools that keep contractors, partners, and vendors on the same trail.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3",
      examples: [
        "Project scope territory mapping",
        "Quality standards demonstration camps",
        "Timeline coordination expeditions",
        "Communication protocol pathways",
        "Brand guideline navigation charts",
        "Deliverable specification adventures"
      ]
    },
    {
      id: "internal-faqs",
      icon: HelpCircle,
      title: "Base Camp Resource Libraries",
      problem: "Answer questions before they derail the expedition.",
      description: "Searchable video libraries that solve common trail challenges instantly, keeping everyone moving forward.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1",
      examples: [
        "Software troubleshooting trail guides",
        "Policy explanation expedition videos",
        "Procedure step-by-step adventures",
        "Equipment setup journey tutorials",
        "Emergency protocol pathway guides",
        "Best practice demonstration camps"
      ]
    }
  ];

  const externalSolutions = [
    {
      id: "discovery-campaigns",
      icon: Zap,
      title: "Discovery Content Expeditions",
      problem: "Stay visible on the horizon and guide explorers to your base camp.",
      description: "Discovery-focused content that captures attention, builds trust, and converts wanderers into expedition partners.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1",
      examples: [
        "Problem awareness expedition videos",
        "Educational content journey series",
        "Behind-the-scenes adventure stories",
        "Case study expedition narratives",
        "Industry insight trail reports",
        "Solution preview adventure teasers"
      ]
    },
    {
      id: "pathfinding-guides",
      icon: BookOpen,
      title: "Pathfinding Education Guides",
      problem: "Teach the trail before you guide the expedition. Convert explorers into adventurers.",
      description: "Educational content that demonstrates routes, addresses trail concerns, and guides prospects through their decision journey.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2",
      examples: [
        "Feature demonstration expeditions",
        "Use case scenario adventures",
        "Problem-solving pathway tutorials",
        "Comparison guide explorations",
        "Implementation journey tutorials",
        "Success story expedition showcases"
      ]
    },
    {
      id: "journey-companions",
      icon: Heart,
      title: "Journey Companion Content",
      problem: "Stay connected with consistent content that scales your expedition voice.",
      description: "Regular, valuable content that keeps your audience engaged and eager for the next adventure.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3",
      examples: [
        "Weekly insight expedition reports",
        "Q&A campfire series",
        "Industry trend exploration videos",
        "Behind-the-scenes base camp content",
        "Community spotlight adventures",
        "Seasonal expedition campaigns"
      ]
    },
    {
      id: "expert-expedition",
      icon: Trophy,
      title: "Expert Expedition Leadership",
      problem: "Become the go-to expedition leader in your territory—on camera.",
      description: "Thought leadership content that positions you as the expert guide and builds unshakeable credibility on any trail.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1",
      examples: [
        "Thought leadership expedition presentations",
        "Industry commentary trail reports",
        "Speaking engagement adventure highlights",
        "Podcast expedition appearances",
        "Conference presentation adventures",
        "Expertise demonstration expeditions"
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

  const handleGetStarted = () => {
    window.location.href = '/#contact';
  };

  const handlePathwayDiscovery = () => {
    window.open('https://calendly.com/palmerhouseproductions-info/discovery-call', '_blank');
  };

  const solutions = filteredSolutions();

  return (
    <div className="min-h-screen bg-video-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-video-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
          <div className="absolute top-40 right-20 w-24 h-24 gradient-social-2 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 gradient-social-3 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🛠️ The Arsenal
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Not Just <span className="text-gradient-1">Video</span>.
            <br />
            Adventure Tools That <span className="text-gradient-2">Work</span>.
          </h1>
          <p className="text-2xl text-corporate-gray mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            See how expedition leaders are solving real challenges using handcrafted video—from crew training and partner alignment to discovery campaigns and authority building.
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
              All Expedition Tools
            </button>
            <button
              onClick={() => setFilter("internal")}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 video-shadow ${
                filter === "internal" 
                  ? "gradient-social-2 text-white" 
                  : "bg-video-white border-2 border-social-orange text-social-orange hover:bg-social-orange hover:text-white"
              }`}
            >
              🏕️ Base Camp Tools
            </button>
            <button
              onClick={() => setFilter("external")}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 video-shadow ${
                filter === "external" 
                  ? "gradient-social-3 text-white" 
                  : "bg-video-white border-2 border-social-cyan text-social-cyan hover:bg-social-cyan hover:text-white"
              }`}
            >
              🌄 Discovery Tools
            </button>
          </div>
        </div>
      </section>

      {/* Internal Solutions */}
      {solutions.internal.length > 0 && (
        <section className="py-20 bg-corporate-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
                🏕️ Base Camp Tools
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Streamline Your <span className="text-gradient-2">Expeditions</span>
              </h2>
              <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium">
                Save time, reduce confusion, and scale your internal operations with video tools built for the adventure.
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
                            <h3 className={`text-3xl font-display font-black ${solution.textGradient}`}>
                              {solution.title}
                            </h3>
                            <CollapsibleTrigger asChild>
                              <button className="text-corporate-gray hover:text-corporate-dark transition-colors">
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
                              <h4 className="text-lg font-bold text-corporate-dark mb-4">Expedition Examples:</h4>
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
        <section className="py-20 bg-video-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
                🌄 Discovery Tools
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Expand Your <span className="text-gradient-3">Territory</span>
              </h2>
              <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium">
                Connect with fellow adventurers, build authority, and guide growth with video that leads the way.
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
                            <h3 className={`text-3xl font-display font-black ${solution.textGradient}`}>
                              {solution.title}
                            </h3>
                            <CollapsibleTrigger asChild>
                              <button className="text-corporate-gray hover:text-corporate-dark transition-colors">
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
                              <h4 className="text-lg font-bold text-corporate-dark mb-4">Discovery Examples:</h4>
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
      <section className="py-20 bg-corporate-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-5xl font-black text-corporate-dark mb-6">
            Ready to Build Your <span className="text-gradient-1">Arsenal</span>?
          </h3>
          <p className="text-xl text-corporate-gray mb-12 max-w-2xl mx-auto">
            Not sure what expedition tools fit your adventure best? Let's explore your challenges and craft the perfect video strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={handlePathwayDiscovery}
              className="px-10 py-5 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
            >
              Chart Your Course 🧭
            </button>
            <button 
              onClick={handleGetStarted}
              className="px-10 py-5 bg-video-white border-2 border-social-purple text-social-purple font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow"
            >
              Start Your Campaign 📹
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
