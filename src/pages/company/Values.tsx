import { Compass, Search, Sparkles, Heart, Wrench, Target } from "lucide-react";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";

const Values = () => {
  const values = [
    { 
      icon: Compass, 
      title: "Freedom over Formulas", 
      description: "We break the template. Every brand has a wild edge—we help you find it and film it.",
      longDescription: "Template-based content creates template-based results. We believe every brand has a unique story that deserves to be told in its own voice. Our approach starts with understanding what makes you different, then amplifying that difference through authentic visual storytelling.",
      gradient: "gradient-social-1"
    },
    { 
      icon: Search, 
      title: "Truth over Trendiness", 
      description: "We don't chase what's viral. We tell stories with soul that actually mean something.",
      longDescription: "Trends fade, but truth endures. While others chase the latest viral format, we focus on timeless storytelling principles that create lasting emotional connections. Your authentic message will always outperform borrowed tactics.",
      gradient: "gradient-social-2"
    },
    { 
      icon: Sparkles, 
      title: "Clarity over Complexity", 
      description: "Clear beats clever. Simple beats busy. If your audience doesn't feel it, they won't follow.",
      longDescription: "In a world of information overload, clarity is kindness. We strip away the unnecessary to focus on what matters most—your core message. Complex concepts become simple stories that your audience can instantly understand and act upon.",
      gradient: "gradient-social-3"
    },
    { 
      icon: Heart, 
      title: "Emotion over Ego", 
      description: "Connection > performance. We capture presence, not performance—because impact starts with honesty.",
      longDescription: "The most powerful videos don't showcase what you want to say—they reveal who you truly are. We create space for authentic moments that build genuine connections between you and your audience.",
      gradient: "gradient-social-4"
    },
    { 
      icon: Wrench, 
      title: "Craft over Clout", 
      description: "Quality matters more than views. We build visuals that last, not just content that scrolls.",
      longDescription: "We're craftspeople first, content creators second. Every frame is intentional, every edit serves a purpose. Our work is designed to represent your brand with excellence, regardless of platform or algorithm changes.",
      gradient: "gradient-social-5"
    },
    { 
      icon: Target, 
      title: "Purpose over Profit", 
      description: "We create with intention. Every frame serves your mission, not just our bottom line.",
      longDescription: "Great video production isn't about our creativity—it's about your success. Every creative decision is measured against one question: Does this serve your business goals and connect with your audience?",
      gradient: "gradient-social-1"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-7xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8">
                🧭 Trail Markers
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                What We <span className="text-gradient-3">Value</span>
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-4xl mx-auto">
                The compass points we navigate by in every creative expedition. These principles guide every decision, every frame, and every story we tell.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 ${value.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-display font-black text-corporate-dark mb-4">
                          {value.title}
                        </h2>
                        <p className="text-lg text-corporate-gray leading-relaxed mb-4">
                          {value.description}
                        </p>
                        <p className="text-corporate-gray leading-relaxed">
                          {value.longDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Philosophy Section */}
            <div className="bg-gradient-to-br from-social-purple/10 via-social-pink/5 to-social-cyan/10 rounded-3xl p-12 video-shadow border border-social-purple/20 mb-16">
              <div className="text-center">
                <h2 className="text-4xl font-display font-black text-corporate-dark mb-8">
                  Our Creative Philosophy
                </h2>
                <div className="relative max-w-4xl mx-auto">
                  <div className="text-6xl text-social-purple/20 absolute -top-4 -left-4">"</div>
                  <blockquote className="text-2xl text-corporate-gray leading-relaxed italic mb-8 relative z-10">
                    We don't make noise. We make movement—video content that feels aligned, moves like strategy, 
                    and leaves a lasting emotional fingerprint long after the scroll.
                  </blockquote>
                  <div className="text-6xl text-social-purple/20 absolute -bottom-8 -right-4">"</div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-social-purple to-social-pink rounded-full"></div>
                  <p className="text-gradient-1 font-bold text-xl">Palmer House Productions</p>
                  <div className="w-16 h-1 bg-gradient-to-r from-social-purple to-social-pink rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Impact Statement */}
            <div className="text-center gradient-social-4 p-12 rounded-3xl video-shadow">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
                Our Work Doesn't Shout. It <span className="text-white/90">Echoes</span>.
              </h3>
              <p className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                We create video content that resonates beyond the moment of viewing. Every project is designed to build 
                lasting connections, drive meaningful action, and represent your brand with the authenticity it deserves. 
                Because in a world full of content, what matters most is content that matters.
              </p>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default Values;