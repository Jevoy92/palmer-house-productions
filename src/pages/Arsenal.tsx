
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Shield, Users, FileText, HelpCircle, Zap, BookOpen, Heart, Trophy } from "lucide-react";

type FilterType = "all" | "internal" | "external";

export default function Arsenal() {
  const [filter, setFilter] = useState<FilterType>("all");

  const internalSolutions = [
    {
      icon: Users,
      title: "Employee Onboarding Videos",
      problem: "Get new hires up to speed fast—without repeating yourself.",
      description: "Step-by-step walkthroughs of systems, HR policies, and culture that eliminate confusion and accelerate productivity.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      icon: FileText,
      title: "Client Intake & Training",
      problem: "Turn confusing onboarding into clear, repeatable systems.",
      description: "Video series that explain your service process, set expectations, and showcase deliverables before you even start.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2"
    },
    {
      icon: Shield,
      title: "Vendor + Partner Alignment",
      problem: "One video beats ten emails. Align your outside help with your internal flow.",
      description: "Crystal-clear communication tools that keep contractors, partners, and vendors on the same page.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3"
    },
    {
      icon: HelpCircle,
      title: "Internal FAQs + Resource Libraries",
      problem: "Answer questions before they're even asked.",
      description: "Searchable video libraries that solve common issues instantly, reducing support tickets and confusion.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1"
    }
  ];

  const externalSolutions = [
    {
      icon: Zap,
      title: "Lead Generation Campaigns",
      problem: "Stay top of mind and drive discovery across platforms.",
      description: "Viral-ready content that captures attention, builds trust, and converts viewers into qualified leads.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      icon: BookOpen,
      title: "Product/Service Education",
      problem: "Teach before you pitch. Convert browsers into buyers.",
      description: "Educational content that demonstrates value, addresses objections, and guides prospects through your buying process.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2"
    },
    {
      icon: Heart,
      title: "Audience Engagement & Retention",
      problem: "Stay visible with evergreen content that scales your voice.",
      description: "Consistent, valuable content that keeps your audience engaged and coming back for more.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3"
    },
    {
      icon: Trophy,
      title: "Reputation & Authority Building",
      problem: "Become the go-to expert in your niche—on camera.",
      description: "Thought leadership content that positions you as the authority and builds unshakeable credibility.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1"
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
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If contact section doesn't exist, navigate to home page contact
      window.location.href = '/#contact';
    }
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
            Business Tools That <span className="text-gradient-2">Work</span>.
          </h1>
          <p className="text-2xl text-corporate-gray mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            See how brands are solving real problems using handcrafted video—from onboarding and client training to viral growth campaigns.
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
              🔒 Internal Solutions
            </button>
            <button
              onClick={() => setFilter("external")}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 video-shadow ${
                filter === "external" 
                  ? "gradient-social-3 text-white" 
                  : "bg-video-white border-2 border-social-cyan text-social-cyan hover:bg-social-cyan hover:text-white"
              }`}
            >
              🌐 External Solutions
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
                🔒 Internal Solutions
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Streamline Your <span className="text-gradient-2">Operations</span>
              </h2>
              <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium">
                Save time, reduce confusion, and scale your internal processes with video tools that work.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {solutions.internal.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <div 
                    key={index}
                    className="group p-10 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-500 hover:scale-105"
                  >
                    <div className={`w-16 h-16 ${solution.gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <h3 className={`text-3xl font-display font-black mb-4 ${solution.textGradient}`}>
                      {solution.title}
                    </h3>
                    <p className="text-corporate-dark font-bold text-lg mb-4">
                      {solution.problem}
                    </p>
                    <p className="text-corporate-gray leading-relaxed text-lg font-medium">
                      {solution.description}
                    </p>
                  </div>
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
                🌐 External Solutions
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Grow Your <span className="text-gradient-3">Audience</span>
              </h2>
              <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium">
                Connect with customers, build authority, and drive growth with video that converts.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {solutions.external.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <div 
                    key={index}
                    className="group p-10 bg-corporate-light rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-500 hover:scale-105"
                  >
                    <div className={`w-16 h-16 ${solution.gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <h3 className={`text-3xl font-display font-black mb-4 ${solution.textGradient}`}>
                      {solution.title}
                    </h3>
                    <p className="text-corporate-dark font-bold text-lg mb-4">
                      {solution.problem}
                    </p>
                    <p className="text-corporate-gray leading-relaxed text-lg font-medium">
                      {solution.description}
                    </p>
                  </div>
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
            Not sure what solution fits your business best? Let's explore your challenges and craft the perfect video strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={handleGetStarted}
              className="px-10 py-5 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
            >
              Start Building 🔨
            </button>
            <button 
              onClick={() => window.open('/glimpse', '_blank')}
              className="px-10 py-5 bg-video-white border-2 border-social-purple text-social-purple font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow"
            >
              Book a Glimpse 👁️
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
