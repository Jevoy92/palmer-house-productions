import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MorphingText } from "@/components/ui/morphing-text";
import { HorizontalScrollSection } from "@/components/ui/horizontal-scroll-section";
import { 
  Download, 
  Users, 
  Repeat, 
  Wrench,
  Gift,
  FileText,
  Video,
  Mic,
  Camera,
  CheckCircle,
  DollarSign
} from "lucide-react";
import { PRICING } from "@/lib/pricing";
import { revealElements, scrollReveal, clipPathReveal, animateCounter } from "@/lib/gsap";

export const AnimatedVideoPackagesTabbed = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero section on load
    if (heroRef.current) {
      revealElements(Array.from(heroRef.current.querySelectorAll('.hero-element')), {
        delay: 0.2,
        stagger: 0.1,
        y: 30
      });
    }

    // Animate packages with scroll trigger
    if (packagesRef.current) {
      scrollReveal(packagesRef.current, '.package-card', {
        start: 'top 80%',
        stagger: 0.2
      });
    }

    // Animate counters
    animateCounter('.price-counter', {
      from: 0,
      to: 4500,
      duration: 2,
      trigger: '.price-section',
      format: (value) => `$${value.toFixed(0)}`
    });
  }, []);

  const digitalDownloads = [
    {
      title: PRICING.DIY_DOWNLOADS["25_REELS"].name,
      price: PRICING.DIY_DOWNLOADS["25_REELS"].price,
      format: PRICING.DIY_DOWNLOADS["25_REELS"].format,
      description: PRICING.DIY_DOWNLOADS["25_REELS"].description,
      paymentUrl: PRICING.DIY_DOWNLOADS["25_REELS"].paymentUrl,
      icon: Video
    },
    {
      title: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.name,
      price: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.price,
      format: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.format,
      description: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.description,
      paymentUrl: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.paymentUrl,
      icon: FileText
    },
    {
      title: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.name,
      price: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.price,
      format: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.format,
      description: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.description,
      paymentUrl: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.paymentUrl,
      icon: Mic
    }
  ];

  const oneTimeBundles = [
    {
      title: "Internal FAQ Buildout",
      price: "$4,500",
      type: "One-time",
      description: "Up to 15 short videos (60–90 seconds each) covering HR onboarding, hiring answers, internal processes, company explainer, software tutorials. Clean talking-head style.",
      features: ["15 videos (60-90 sec each)", "HR onboarding content", "Internal processes", "Company explainer", "Software tutorials"]
    },
    {
      title: "External FAQ Buildout", 
      price: "$4,500",
      type: "One-time",
      description: "Up to 15 short videos (60–90 seconds each) covering customer onboarding, top objections, service breakdowns, pricing explanations. Delivered with thumbnails + captioned.",
      features: ["15 videos (60-90 sec each)", "Customer onboarding", "Objection handling", "Service breakdowns", "Pricing explanations", "Thumbnails + captions"]
    },
    {
      title: "YouTube Visibility Engine",
      price: "$6,500", 
      type: "One-time",
      description: "3 long-form videos (8–10 minutes each) with full strategy, scripting, teleprompter support, cinematic editing, and YouTube optimization.",
      features: ["3 long-form videos (8-10 min)", "Content strategy + series plan", "Full scripting + outlines", "On-set teleprompter support", "Cinematic editing", "YouTube SEO optimization"]
    },
    {
      title: "The 7-Day Launch",
      price: "$2,500",
      type: "One-time", 
      description: "1 strategy session + 1 shoot day. 1 hero brand video + 3-5 cutdowns for social. Fast-turnaround edit timeline (7 business days).",
      features: ["1 strategy session", "1 shoot day", "1 hero brand video (90-120 sec)", "3-5 social cutdowns", "7-day turnaround"]
    },
    {
      title: "30 Reels in 30 Days",
      price: "$4,800",
      type: "One-time",
      description: "1 full-day shoot (up to 8 hours) producing 30 social-ready vertical videos with captions and formatting for IG/LinkedIn/TikTok.",
      features: ["1 full-day shoot (8 hours)", "30 social videos (15-30 sec)", "Platform formatting", "Captions included", "IG/LinkedIn/TikTok ready"]
    },
    {
      title: "The Founder's Brand Kit",
      price: "$6,000",
      type: "One-time",
      description: "1 shoot day with personal brand strategy including founder bio video, hook videos, vibe montage, and multi-platform delivery.",
      features: ["1 shoot day + strategy", "Founder Bio Video (90-120 sec)", "2 Hook/Top-of-Funnel Videos", "Vibe Montage or Style Sizzle", "Multi-platform delivery", "Thumbnails included"]
    },
    {
      title: "The Starter Session",
      price: "$500",
      type: "One-time",
      description: "30-minute filming session with minimum 3 edited one-minute videos. Simple talking-head delivery, no stylized editing. Capped at 6 bookings per month.",
      features: ["30-minute session", "3+ one-minute videos", "Simple talking-head style", "No stylized editing", "Limited slots (6/month)"]
    }
  ];

  const bonusItems = [
    { item: "25 DIY Reels PDF + script pack", value: PRICING.DIY_DOWNLOADS["25_REELS"].price },
    { item: "The Video Strategy Blueprint", value: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.price },
    { item: "Owner/Founder Script Bundle", value: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.price },
    { item: "Personalized Script Feedback (1x)", value: "$97" },
    { item: "On-Camera Coaching Session (1x)", value: "$200" }
  ];

  const handleDiscoveryCall = () => {
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer');
  };

  const handleBooking = (title: string) => {
    navigate('/contact', { state: { selectedService: title } });
  };

  const handlePurchase = (paymentUrl: string) => {
    window.open(paymentUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="pt-16 md:pt-24 pb-8 md:pb-16 bg-cinematic-charcoal relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-social-orange to-social-pink rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-4 md:right-20 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-video-blue to-social-purple rounded-full opacity-30 blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-br from-social-pink to-video-blue rounded-full opacity-15 blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-8 md:mb-12">
          <div className="hero-element inline-block px-3 py-2 bg-gradient-to-r from-social-orange to-social-pink rounded-full text-video-white font-bold text-sm mb-4 shadow-2xl">
            🎬 Business Video Assets
          </div>
          <h2 className="hero-element text-2xl md:text-4xl font-display font-black mb-4 text-video-white tracking-tight">
            Business Video Assets: <MorphingText 
              texts={["Evergreen Tools for Growth", "Strategic Systems", "Repeatable Solutions"]}
              className="text-gradient bg-gradient-to-r from-social-orange to-social-pink bg-clip-text text-transparent"
              duration={1.5}
              stagger={3}
            />
          </h2>
          <p className="hero-element text-base md:text-lg text-corporate-gray mb-4 max-w-2xl mx-auto px-4">
            Not social fluff — these are cinematic, repeatable videos that save your team time, cut training costs, and build customer trust.
          </p>
          <div className="hero-element">
            <MagneticButton
              onClick={handleDiscoveryCall}
              variant="default"
              className="px-6 py-3 text-sm font-bold mb-6"
            >
              Book Strategy Call
            </MagneticButton>
          </div>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="assets" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6 h-auto bg-cinematic-dark/50 backdrop-blur-sm">
            <TabsTrigger value="assets" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center text-video-white data-[state=active]:bg-social-orange data-[state=active]:text-video-white">
              <Wrench size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>Business Video Assets</span>
            </TabsTrigger>
            <TabsTrigger value="bundles" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center text-video-white data-[state=active]:bg-social-orange data-[state=active]:text-video-white">
              <Video size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>Other Bundles</span>
            </TabsTrigger>
            <TabsTrigger value="diy" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center text-video-white data-[state=active]:bg-social-orange data-[state=active]:text-video-white">
              <Download size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>DIY Starters</span>
            </TabsTrigger>
          </TabsList>

          {/* DIY Downloads Tab */}
          <TabsContent value="diy" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg md:text-xl font-display font-black text-video-white mb-2">
                📁 Digital Downloads
              </h2>
              <p className="text-sm text-corporate-gray">Instant access to templates, guides and resources</p>
            </div>
            
            <HorizontalScrollSection className="mb-8">
              {digitalDownloads.map((item, index) => (
                <div key={index} className="package-card bg-cinematic-dark/80 backdrop-blur-sm p-6 rounded-3xl border border-video-white/10 hover:border-social-orange/50 transition-all duration-500 hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-social-orange to-social-pink rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                      <item.icon color="white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-video-white mb-2">{item.title}</h3>
                    <div className="text-3xl font-black text-video-white mb-2">{item.price}</div>
                    <div className="text-sm text-corporate-gray mb-3 font-medium">{item.format}</div>
                  </div>
                  <p className="text-sm text-corporate-gray mb-6 leading-relaxed">{item.description}</p>
                  <MagneticButton
                    onClick={() => handlePurchase(item.paymentUrl)}
                    variant="default"
                    className="w-full py-3 px-4 text-sm font-bold"
                  >
                    Buy Now
                  </MagneticButton>
                </div>
              ))}
            </HorizontalScrollSection>
          </TabsContent>

          {/* Business Video Assets Tab */}
          <TabsContent value="assets" className="space-y-6" ref={packagesRef}>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-black text-video-white mb-4">
                📊 Strategic Business Video Assets
              </h2>
              <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
                Replace repetitive operations with systematic video solutions. One shoot → a year of assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 price-section">
              {/* External Business Video Assets */}
              <div className="package-card bg-cinematic-dark/80 backdrop-blur-sm p-8 rounded-3xl border border-video-white/10 hover:border-social-pink/50 transition-all duration-500 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-video-white font-bold text-sm mb-4 shadow-2xl">
                    <Users size={16} className="mr-2" />
                    External Assets
                  </div>
                  <h3 className="text-2xl font-bold text-video-white mb-2">Customer-Facing Systems</h3>
                  <div className="text-4xl font-black text-video-white price-counter">{PRICING.BUSINESS_VIDEO_ASSETS.EXTERNAL_ASSETS.price}</div>
                </div>
                <p className="text-sm text-corporate-gray mb-6 leading-relaxed">
                  Up to 15 videos covering customer onboarding, top objections, service breakdowns, and pricing explanations. 
                  Delivered with thumbnails and captions for immediate deployment.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-400 mr-2" />
                    <span className="text-video-white">Customer onboarding videos</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-400 mr-2" />
                    <span className="text-video-white">Objection handling content</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-400 mr-2" />
                    <span className="text-video-white">Service breakdowns</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-400 mr-2" />
                    <span className="text-video-white">Pricing explanations</span>
                  </li>
                </ul>
                <MagneticButton
                  onClick={() => handleBooking("External Business Video Assets")}
                  variant="secondary"
                  className="w-full py-3 px-4 text-sm font-bold bg-gradient-to-r from-social-purple to-social-pink"
                >
                  Book Strategy Call
                </MagneticButton>
              </div>

              {/* Internal Business Video Assets */}
              <div className="package-card bg-cinematic-dark/80 backdrop-blur-sm p-8 rounded-3xl border border-video-white/10 hover:border-social-orange/50 transition-all duration-500 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-social-orange to-social-pink rounded-full text-video-white font-bold text-sm mb-4 shadow-2xl">
                    <Wrench size={16} className="mr-2" />
                    Internal Assets
                  </div>
                  <h3 className="text-2xl font-bold text-video-white mb-2">Team-Facing Systems</h3>
                  <div className="text-4xl font-black text-video-white price-counter">{PRICING.BUSINESS_VIDEO_ASSETS.INTERNAL_ASSETS.price}</div>
                </div>
                <p className="text-sm text-corporate-gray mb-6 leading-relaxed">
                  Up to 15 videos covering HR onboarding, hiring processes, internal procedures, and software tutorials. 
                  Clean talking-head style for maximum clarity.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-400 mr-2" />
                    <span className="text-video-white">HR onboarding content</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-400 mr-2" />
                    <span className="text-video-white">Hiring process videos</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-400 mr-2" />
                    <span className="text-video-white">Internal procedures</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-400 mr-2" />
                    <span className="text-video-white">Software tutorials</span>
                  </li>
                </ul>
                <MagneticButton
                  onClick={() => handleBooking("Internal Business Video Assets")}
                  variant="default"
                  className="w-full py-3 px-4 text-sm font-bold"
                >
                  Book Strategy Call
                </MagneticButton>
              </div>
            </div>

            {/* Bonus Pack Section */}
            <div className="bg-cinematic-dark/60 backdrop-blur-sm p-8 rounded-3xl border border-video-white/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-video-blue to-social-purple rounded-full text-video-white font-bold text-sm mb-4 shadow-2xl">
                  <Gift size={16} className="mr-2" />
                  Business Bonus Pack
                </div>
                <h3 className="text-2xl font-bold text-video-white mb-2">Free with Any Business Video Assets Package</h3>
                <div className="text-lg text-corporate-gray">Total Value: {PRICING.BONUS_PACK.totalValue}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bonusItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-cinematic-dark/80 rounded-xl border border-video-white/10">
                    <span className="text-sm font-medium text-video-white">{item.item}</span>
                    <span className="text-sm font-bold text-green-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* One-Time Bundles Tab */}
          <TabsContent value="bundles" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-black text-video-white mb-4">
                🛠️ One-Time Problem-Solving Bundles
              </h2>
              <p className="text-lg text-corporate-gray">Solve specific video challenges with targeted solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {oneTimeBundles.map((bundle, index) => (
                <div key={index} className="package-card bg-cinematic-dark/80 backdrop-blur-sm p-6 rounded-3xl border border-video-white/10 hover:border-social-orange/50 transition-all duration-500 hover:scale-105">
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 bg-video-white/10 text-video-white rounded-full text-xs font-bold mb-3">
                      {bundle.type}
                    </div>
                    <h3 className="text-xl font-bold text-video-white mb-2">{bundle.title}</h3>
                    <div className="text-2xl font-black text-video-white mb-3">{bundle.price}</div>
                  </div>
                  
                  <p className="text-sm text-corporate-gray mb-4 leading-relaxed">{bundle.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-video-white mb-2">What's included:</h4>
                    <ul className="space-y-1">
                      {bundle.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-xs">
                          <CheckCircle size={12} className="text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-corporate-gray">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <MagneticButton
                    onClick={() => handleBooking(bundle.title)}
                    variant="outline"
                    className="w-full py-3 px-4 text-sm font-bold border-social-orange text-social-orange hover:bg-social-orange hover:text-video-white"
                  >
                    Book Strategy Call
                  </MagneticButton>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="text-center mt-12 pt-8 border-t border-video-white/10">
          <h3 className="text-2xl font-bold text-video-white mb-4">Ready to Transform Your Business with Video?</h3>
          <p className="text-corporate-gray mb-6 max-w-2xl mx-auto">
            Book a strategy call to discuss your specific video needs and get a custom solution designed for your business.
          </p>
          <MagneticButton
            onClick={handleDiscoveryCall}
            variant="default"
            className="px-8 py-4 text-lg font-bold"
          >
            Book Your Strategy Call Now
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};