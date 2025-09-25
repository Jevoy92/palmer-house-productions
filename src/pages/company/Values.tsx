import { Compass, Search, Sparkles, Heart, Wrench, Target } from "lucide-react";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Navigation } from "@/components/Navigation";

const Values = () => {
  const values = [
    { 
      icon: Compass, 
      title: "Freedom over Formulas", 
      description: "We break the template. Every brand has a wild edge—we help you find it and film it.",
      longDescription: "Template-based content creates template-based results. We believe every brand has a unique story that deserves to be told in its own voice. Our approach starts with understanding what makes you different, then amplifying that difference through authentic visual storytelling.",
      palColor: "pal-purple"
    },
    { 
      icon: Search, 
      title: "Truth over Trendiness", 
      description: "We don't chase what's viral. We tell stories with soul that actually mean something.",
      longDescription: "Trends fade, but truth endures. While others chase the latest viral format, we focus on timeless storytelling principles that create lasting emotional connections. Your authentic message will always outperform borrowed tactics.",
      palColor: "pal-orange"
    },
    { 
      icon: Sparkles, 
      title: "Clarity over Complexity", 
      description: "Clear beats clever. Simple beats busy. If your audience doesn't feel it, they won't follow.",
      longDescription: "In a world of information overload, clarity is kindness. We strip away the unnecessary to focus on what matters most—your core message. Complex concepts become simple stories that your audience can instantly understand and act upon.",
      palColor: "pal-blue"
    },
    { 
      icon: Heart, 
      title: "Emotion over Ego", 
      description: "Connection > performance. We capture presence, not performance—because impact starts with honesty.",
      longDescription: "The most powerful videos don't showcase what you want to say—they reveal who you truly are. We create space for authentic moments that build genuine connections between you and your audience.",
      palColor: "pal-green"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden font-sans relative">
      {/* Fixed 4-Color Background Bars */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange"></div>
          <div className="w-1/4 h-full bg-pal-purple"></div>
          <div className="w-1/4 h-full bg-pal-green"></div>
          <div className="w-1/4 h-full bg-pal-blue"></div>
        </div>
      </div>
      <MetaTags 
        title="Core Values & Philosophy | Palmer House Productions"
        description="Palmer House Productions core values - truth over trends, clarity over complexity, emotion over ego. Authentic video storytelling principles."
        keywords="Palmer House Productions values, video production philosophy, creative principles, authenticity in video, Seattle video company culture"
        ogTitle="Our Values | Palmer House Productions"
        ogDescription="Palmer House Productions core values - truth over trends, clarity over complexity, emotion over ego. Authentic video storytelling principles."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Hero Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center mb-12">
              <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
                💎 Our Values
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                What We <span className="text-pal-blue">Stand For</span>
              </h1>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
                These core values guide every project and client relationship at Palmer House Productions.
              </p>
            </div>

            {/* Values Grid - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
              <div className="grid lg:grid-cols-2 gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div 
                      key={index}
                      className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border hover:border-gray-200 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-6">
                        <div className={`w-16 h-16 bg-${value.palColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
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
            </div>
            
            {/* Philosophy Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-8">
                Our Creative <span className="text-pal-green">Philosophy</span>
              </h2>
              <div className="relative max-w-4xl mx-auto mb-8">
                <div className="text-6xl text-pal-purple/20 absolute -top-4 -left-4">"</div>
                <blockquote className="text-xl md:text-2xl text-corporate-gray leading-relaxed italic mb-8 relative z-10">
                  We don't make noise. We make movement—video content that feels aligned, moves like strategy, 
                  and leaves a lasting emotional fingerprint long after the scroll.
                </blockquote>
                <div className="text-6xl text-pal-purple/20 absolute -bottom-8 -right-4">"</div>
              </div>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-1 bg-pal-purple rounded-full"></div>
                <p className="text-pal-purple font-bold text-xl">Palmer House Productions</p>
                <div className="w-16 h-1 bg-pal-purple rounded-full"></div>
              </div>
              
              {/* Impact Statement */}
              <div className="bg-gradient-to-br from-pal-green/10 to-pal-blue/10 p-8 md:p-12 rounded-2xl border border-pal-green/20">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-corporate-dark mb-6">
                  Our Work Doesn't Shout. It <span className="text-pal-green">Echoes</span>.
                </h3>
                <p className="text-lg xl:text-xl text-corporate-gray leading-relaxed max-w-4xl mx-auto font-medium">
                  We create video content that resonates beyond the moment of viewing. Every project is designed to build 
                  lasting connections, drive meaningful action, and represent your brand with the authenticity it deserves. 
                  Because in a world full of content, what matters most is content that matters.
                </p>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default Values;