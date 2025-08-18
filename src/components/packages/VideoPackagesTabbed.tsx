import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

export const VideoPackagesTabbed = () => {
  const navigate = useNavigate();

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
    <section className="pt-16 md:pt-24 pb-8 md:pb-16 bg-video-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-4 md:right-20 w-12 h-12 md:w-24 md:h-24 gradient-social-2 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 md:w-40 md:h-40 gradient-social-3 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block px-3 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-4 video-shadow">
            🎬 Business Video Assets
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-black mb-4 text-corporate-dark tracking-tight">
            Business Video Assets: <span className="text-gradient-1">Evergreen Tools for Growth</span>
          </h2>
          <p className="text-base md:text-lg text-corporate-gray mb-4 max-w-2xl mx-auto px-4">
            Not social fluff — these are cinematic, repeatable videos that save your team time, cut training costs, and build customer trust.
          </p>
          <button
            onClick={handleDiscoveryCall}
            className="inline-flex items-center px-6 py-3 gradient-social-1 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300 video-shadow mb-6"
          >
            Book Strategy Call
          </button>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="assets" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6 h-auto">
            <TabsTrigger value="assets" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center">
              <Wrench size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>Business Video Assets</span>
            </TabsTrigger>
            <TabsTrigger value="bundles" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center">
              <Video size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>Other Bundles</span>
            </TabsTrigger>
            <TabsTrigger value="diy" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center">
              <Download size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>DIY Starters</span>
            </TabsTrigger>
          </TabsList>

          {/* DIY Downloads Tab */}
          <TabsContent value="diy" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg md:text-xl font-display font-black text-corporate-dark mb-2">
                📁 Digital Downloads
              </h2>
              <p className="text-sm text-corporate-gray">Instant access to templates, guides and resources</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {digitalDownloads.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 gradient-social-1 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <item.icon color="white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-corporate-dark mb-2">{item.title}</h3>
                    <div className="text-3xl font-black text-corporate-dark mb-2">{item.price}</div>
                    <div className="text-sm text-corporate-gray mb-3 font-medium">{item.format}</div>
                  </div>
                  <p className="text-sm text-corporate-gray mb-6 leading-relaxed">{item.description}</p>
                  <button
                    onClick={() => handlePurchase(item.paymentUrl)}
                    className="w-full py-3 px-4 gradient-social-1 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300 video-shadow"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Business Video Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark mb-4">
                📊 Strategic Business Video Assets
              </h2>
              <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
                Replace repetitive operations with systematic video solutions. One shoot → a year of assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* External Business Video Assets */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-white font-bold text-sm mb-4">
                    <Users size={16} className="mr-2" />
                    External Assets
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Customer-Facing Systems</h3>
                  <div className="text-4xl font-black text-corporate-dark">{PRICING.BUSINESS_VIDEO_ASSETS.EXTERNAL_ASSETS.price}</div>
                </div>
                <p className="text-sm text-corporate-gray mb-6 leading-relaxed">
                  Up to 15 videos covering customer onboarding, top objections, service breakdowns, and pricing explanations. 
                  Delivered with thumbnails and captions for immediate deployment.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    Customer onboarding videos
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    Objection handling content
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    Service breakdowns
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    Pricing explanations
                  </li>
                </ul>
                <button
                  onClick={() => handleBooking("External Business Video Assets")}
                  className="w-full py-3 px-4 bg-gradient-to-r from-social-purple to-social-pink text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300 video-shadow"
                >
                  Book Strategy Call
                </button>
              </div>

              {/* Internal Business Video Assets */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-4">
                    <Wrench size={16} className="mr-2" />
                    Internal Assets
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Team-Facing Systems</h3>
                  <div className="text-4xl font-black text-corporate-dark">{PRICING.BUSINESS_VIDEO_ASSETS.INTERNAL_ASSETS.price}</div>
                </div>
                <p className="text-sm text-corporate-gray mb-6 leading-relaxed">
                  Up to 15 videos covering HR onboarding, hiring processes, internal procedures, and software tutorials. 
                  Clean talking-head style for maximum clarity.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    HR onboarding content
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    Hiring process videos
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    Internal procedures
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={14} className="text-green-500 mr-2" />
                    Software tutorials
                  </li>
                </ul>
                <button
                  onClick={() => handleBooking("Internal Business Video Assets")}
                  className="w-full py-3 px-4 gradient-social-2 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300 video-shadow"
                >
                  Book Strategy Call
                </button>
              </div>
            </div>

            {/* Bonus Pack Section */}
            <div className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 gradient-social-3 rounded-full text-white font-bold text-sm mb-4">
                  <Gift size={16} className="mr-2" />
                  Business Bonus Pack
                </div>
                <h3 className="text-2xl font-bold text-corporate-dark mb-2">Free with Any Business Video Assets Package</h3>
                <div className="text-lg text-corporate-gray">Total Value: {PRICING.BONUS_PACK.totalValue}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bonusItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border">
                    <span className="text-sm font-medium text-corporate-dark">{item.item}</span>
                    <span className="text-sm font-bold text-green-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* One-Time Bundles Tab */}
          <TabsContent value="bundles" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark mb-4">
                🛠️ One-Time Problem-Solving Bundles
              </h2>
              <p className="text-lg text-corporate-gray">Solve specific video challenges with targeted solutions</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {oneTimeBundles.map((bundle, index) => (
                <AccordionItem key={index} value={`bundle-${index}`} className="bg-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full text-left">
                      <div>
                        <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold mb-2">
                          {bundle.type}
                        </div>
                        <h3 className="text-xl font-bold text-corporate-dark">{bundle.title}</h3>
                        <div className="text-2xl font-black text-corporate-dark mt-1">{bundle.price}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-sm text-corporate-gray mb-4 leading-relaxed">{bundle.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-sm text-corporate-dark mb-3">Includes:</h4>
                      <ul className="space-y-2">
                        {bundle.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle size={14} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-corporate-gray">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {bundle.price !== "$500" && (
                      <div className="bg-yellow-50 p-3 rounded-xl mb-4">
                        <p className="text-xs text-yellow-800 font-medium">
                          🎁 Includes FREE Business Bonus Pack (valued at $410)
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => handleBooking(bundle.title)}
                      className="w-full py-3 px-4 gradient-social-4 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300 video-shadow"
                    >
                      Book This Bundle
                    </button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>

        {/* Business Bonus Pack - Collapsible */}
        <div className="mt-16">
          <Accordion type="single" collapsible>
            <AccordionItem value="bonus-pack" className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-3xl border border-social-purple/20">
              <AccordionTrigger className="px-8 py-6 hover:no-underline">
                <div className="text-left">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-white font-bold text-sm mb-4">
                    <Gift size={20} className="mr-2" />
                    🎁 The Business Bonus Pack
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark">
                    Free Bonus <span className="text-gradient-purple">Value Pack</span>
                  </h2>
                    <p className="text-lg text-corporate-gray mt-2">
                      $410 value included with most packages - see what's inside
                    </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-corporate-dark mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {bonusItems.map((bonus, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span className="text-sm text-corporate-gray">{bonus.item}</span>
                          <span className="text-sm font-bold text-corporate-dark">{bonus.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-black text-corporate-dark mb-2">$410</div>
                      <div className="text-lg font-medium text-corporate-gray mb-4">Total Value</div>
                      <div className="text-2xl font-black text-green-600">FREE</div>
                      <p className="text-sm text-corporate-gray mt-2">
                        Included with qualifying packages
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 md:p-12 rounded-3xl video-shadow-lg max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-corporate-dark">
              Ready to Begin Your <span className="text-gradient-1">Video Strategy</span>?
            </h2>
            <p className="text-xl text-corporate-gray mb-8 max-w-3xl mx-auto">
              Book a strategy call to explore which package fits your business goals.
            </p>
            <button
              onClick={handleDiscoveryCall}
              className="px-8 py-4 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow mr-4"
            >
              Book Strategy Call
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-corporate-dark text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
