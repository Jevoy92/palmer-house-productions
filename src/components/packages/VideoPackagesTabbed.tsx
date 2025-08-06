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
      icon: Video
    },
    {
      title: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.name,
      price: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.price,
      format: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.format,
      description: PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.description,
      icon: FileText
    },
    {
      title: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.name,
      price: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.price,
      format: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.format,
      description: PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.description,
      icon: Mic
    },
    {
      title: PRICING.DIY_DOWNLOADS.CONFIDENCE_COURSE.name,
      price: PRICING.DIY_DOWNLOADS.CONFIDENCE_COURSE.price,
      format: PRICING.DIY_DOWNLOADS.CONFIDENCE_COURSE.format,
      description: PRICING.DIY_DOWNLOADS.CONFIDENCE_COURSE.description,
      icon: Camera
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
    { item: "On-Camera Confidence Mini Course", value: PRICING.DIY_DOWNLOADS.CONFIDENCE_COURSE.price },
    { item: "Personalized Script Feedback (1x)", value: "$97" },
    { item: "On-Camera Coaching Session (1x)", value: "$200" }
  ];

  const handleDiscoveryCall = () => {
    navigate('/discovery-call');
  };

  const handleBooking = (title: string) => {
    navigate('/contact', { state: { selectedService: title } });
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
            🎬 Video Packages
          </div>
          <h1 className="text-2xl md:text-4xl font-display font-black mb-4 text-corporate-dark tracking-tight">
            Video Production <span className="text-gradient-1">Services</span>
          </h1>
          <p className="text-base md:text-lg text-corporate-gray mb-4 max-w-2xl mx-auto px-4">
            Professional video content organized by service type for easy browsing.
          </p>
          <div className="inline-block px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-xs font-medium mb-6">
            📅 Limited monthly availability
          </div>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="diy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 h-auto">
            <TabsTrigger value="diy" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center">
              <Download size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>DIY</span>
            </TabsTrigger>
            <TabsTrigger value="coaching" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center">
              <Users size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>Coaching</span>
            </TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center">
              <Repeat size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>Monthly</span>
            </TabsTrigger>
            <TabsTrigger value="bundles" className="text-xs py-3 min-h-[44px] flex flex-col md:flex-row items-center">
              <Wrench size={14} className="mb-1 md:mb-0 md:mr-2" />
              <span>Bundles</span>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    onClick={() => handleBooking(item.title)}
                    className="w-full py-3 px-4 gradient-social-1 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300 video-shadow"
                  >
                    Get Instant Access
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Group Coaching Tab */}
          <TabsContent value="coaching" className="space-y-6">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl text-center video-shadow-lg border-4 border-gradient-to-r from-social-purple to-social-pink">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-white font-bold text-sm md:text-base mb-6">
                <Users size={20} className="mr-2" />
                🗓️ 6-Week Group Coaching: "The Camera-Ready Brand"
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black mb-6 text-corporate-dark">
                Transform Your <span className="text-gradient-purple">On-Camera Presence</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-social-purple/20">
                  <div className="text-4xl font-black mb-2 text-corporate-dark">$2,000</div>
                  <div className="text-lg font-medium text-corporate-gray">One-time investment</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-social-purple/20">
                  <div className="text-2xl font-bold mb-2 text-corporate-dark">8-10 Founders</div>
                  <div className="text-lg font-medium text-corporate-gray">Max seats per cohort</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-social-purple/20">
                  <div className="text-2xl font-bold mb-2 text-corporate-dark">Weekly Zoom</div>
                  <div className="text-lg font-medium text-corporate-gray">Live sessions + feedback</div>
                </div>
              </div>
              <p className="text-xl mb-8 text-corporate-gray">
                Build confidence + skill to record your first 3–5 brand videos yourself. Includes assignments, feedback, and private Circle group.
              </p>
              <button
                onClick={() => handleBooking("Camera-Ready Brand Coaching")}
                className="px-8 py-4 bg-gradient-to-r from-social-purple to-social-pink text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
              >
                Join Next Cohort
              </button>
            </div>
          </TabsContent>

          {/* Monthly Content Tab */}
          <TabsContent value="monthly" className="space-y-6">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl video-shadow-lg">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 gradient-social-3 rounded-full text-white font-bold text-sm md:text-base mb-4">
                  <Repeat size={20} className="mr-2" />
                  ♻️ Monthly Content System: "The Social Authority Kit"
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark mb-4">
                  Consistent Content, <span className="text-gradient-3">Delivered Monthly</span>
                </h2>
                <div className="text-5xl font-black text-corporate-dark mb-2">$3,000<span className="text-xl text-corporate-gray">/month</span></div>
                <div className="text-lg text-corporate-gray font-medium mb-4">3-month minimum commitment</div>
                <div className="inline-block px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium">
                  🔥 Limited monthly slots available
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="font-bold text-corporate-dark mb-4">Monthly Delivery Includes:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-3" />
                      <span className="text-sm">1 Hero/Founder video (90–120 seconds)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-3" />
                      <span className="text-sm">6 Social Reels (30–45 seconds each)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-3" />
                      <span className="text-sm">1 Client Voice/Social Proof video (60–90 seconds)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-3" />
                      <span className="text-sm">Captions + Thumbnails (Platform-optimized)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h4 className="font-bold text-corporate-dark mb-4">What's Excluded:</h4>
                  <p className="text-sm text-corporate-gray mb-4">
                    YouTube (long-form) content is handled separately under our future ongoing monthly YouTube plan.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h5 className="font-bold text-blue-800 mb-2">🎁 Bonus Included:</h5>
                    <p className="text-sm text-blue-700">
                      Get the complete Business Bonus Pack (valued at $531) FREE with this package!
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBooking("Social Authority Kit")}
                className="w-full py-4 px-6 gradient-social-3 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
              >
                Apply for Monthly Content System
              </button>
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
                          🎁 Includes FREE Business Bonus Pack (valued at $531)
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
                    $531 value included with most packages - see what's inside
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
                      <div className="text-3xl font-black text-corporate-dark mb-2">$531</div>
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
              Book a discovery call to explore which package fits your business goals.
            </p>
            <button
              onClick={handleDiscoveryCall}
              className="px-8 py-4 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow mr-4"
            >
              Book Discovery Call
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