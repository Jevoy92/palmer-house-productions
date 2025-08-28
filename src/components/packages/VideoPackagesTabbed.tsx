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
        <Tabs defaultValue="reel" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 h-auto">
            <TabsTrigger value="reel" className="text-xs py-3 min-h-[44px] flex flex-col items-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full mb-1 flex items-center justify-center">
                <Video size={14} className="text-white" />
              </div>
              <span>Reel Pal</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="text-xs py-3 min-h-[44px] flex flex-col items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full mb-1 flex items-center justify-center">
                <Wrench size={14} className="text-white" />
              </div>
              <span>System Pal</span>
            </TabsTrigger>
            <TabsTrigger value="evergreen" className="text-xs py-3 min-h-[44px] flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mb-1 flex items-center justify-center">
                <Users size={14} className="text-white" />
              </div>
              <span>Evergreen Pal</span>
            </TabsTrigger>
            <TabsTrigger value="spotlight" className="text-xs py-3 min-h-[44px] flex flex-col items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mb-1 flex items-center justify-center">
                <Camera size={14} className="text-white" />
              </div>
              <span>Spotlight Pal</span>
            </TabsTrigger>
          </TabsList>

          {/* Reel Pal Tab */}
          <TabsContent value="reel" className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <img 
                  className="w-20 h-20 rounded-full object-cover object-center" 
                  src="/lovable-uploads/5d98b294-ca3c-40a4-8b87-6dae295d4294.png" 
                  alt="Reel Pal avatar" 
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark mb-4">
                📱 Reel Pal - Social Content Creation
              </h2>
              <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
                Short-form social content that captures hearts and drives real engagement across all platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Starter Session */}
              <div className="bg-white p-6 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold mb-4">STARTER</div>
                  <h3 className="text-lg font-bold text-corporate-dark mb-2">The Starter Session</h3>
                  <div className="text-3xl font-black text-yellow-600">$500</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />30-minute filming session</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />Minimum 3 edited videos</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />Simple talking-head style</li>
                </ul>
                <button
                  onClick={() => handleBooking("The Starter Session")}
                  className="w-full py-3 px-4 bg-yellow-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Session
                </button>
              </div>

              {/* DIY Reels */}
              <div className="bg-white p-6 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold mb-4">DIY</div>
                  <h3 className="text-lg font-bold text-corporate-dark mb-2">25 DIY Reels</h3>
                  <div className="text-3xl font-black text-yellow-600">$47</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />25 talking-head reel ideas</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />Platform breakdowns</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />Sample scripts provided</li>
                </ul>
                <button
                  onClick={() => handlePurchase(PRICING.DIY_DOWNLOADS["25_REELS"].paymentUrl)}
                  className="w-full py-3 px-4 bg-yellow-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>

              {/* Script Bundle */}
              <div className="bg-white p-6 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold mb-4">SCRIPTS</div>
                  <h3 className="text-lg font-bold text-corporate-dark mb-2">Script Bundle</h3>
                  <div className="text-3xl font-black text-yellow-600">$47</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />About Me video scripts</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />Social proof templates</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />Call-to-action scripts</li>
                </ul>
                <button
                  onClick={() => handlePurchase(PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.paymentUrl)}
                  className="w-full py-3 px-4 bg-yellow-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Get Scripts
                </button>
              </div>

              {/* 30 Reels */}
              <div className="bg-white p-6 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">MOST POPULAR</div>
                </div>
                <div className="text-center mb-4 mt-4">
                  <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold mb-4">DONE FOR YOU</div>
                  <h3 className="text-lg font-bold text-corporate-dark mb-2">30 Reels in 30 Days</h3>
                  <div className="text-3xl font-black text-yellow-600">$4,800</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />1 full-day shoot (8 hours)</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />30 social-ready videos</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-500 mr-2" />Platform formatting</li>
                </ul>
                <button
                  onClick={() => handleBooking("30 Reels in 30 Days")}
                  className="w-full py-3 px-4 bg-yellow-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          </TabsContent>

          {/* System Pal Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <img 
                  className="w-20 h-20 rounded-full" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-3499219619cfd6454f31.png" 
                  alt="System Pal avatar" 
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark mb-4">
                ⚙️ System Pal - Training & Internal Systems
              </h2>
              <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
                Training videos, employee onboarding, and internal documentation that actually gets used and drives results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Internal Assets */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-bold mb-4">
                    Internal Assets
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Internal Business Assets</h3>
                  <div className="text-4xl font-black text-purple-600">$4,500</div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />15 videos @ 1–2 min each</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Onboarding & training</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Software walkthroughs</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Process & policy explainers</li>
                </ul>
                <button
                  onClick={() => handleBooking("Internal Business Video Assets")}
                  className="w-full py-3 px-4 bg-purple-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>

              {/* External Assets */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">MOST POPULAR</div>
                </div>
                <div className="text-center mb-6 mt-4">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-bold mb-4">
                    External Assets
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">External Business Assets</h3>
                  <div className="text-4xl font-black text-purple-600">$4,500</div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />15 videos @ 1–2 min each</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Customer FAQ libraries</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Product/service explainers</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Testimonial capsules</li>
                </ul>
                <button
                  onClick={() => handleBooking("External Business Video Assets")}
                  className="w-full py-3 px-4 bg-purple-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>

              {/* Advanced Package */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-bold mb-4">
                    Advanced
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Safety & Compliance</h3>
                  <div className="text-4xl font-black text-purple-600">$10,000+</div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />8–10 videos @ up to 5 min</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Safety & compliance training</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Sales training modules</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-purple-500 mr-2" />Advanced software training</li>
                </ul>
                <button
                  onClick={() => handleBooking("Safety & Compliance Training")}
                  className="w-full py-3 px-4 bg-purple-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Evergreen Pal Tab */}
          <TabsContent value="evergreen" className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                <img 
                  className="w-20 h-20 rounded-full" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-772ba728bd8c24b597ce.png" 
                  alt="Evergreen Pal avatar" 
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark mb-4">
                🌱 Evergreen Pal - Authority Building
              </h2>
              <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
                YouTube growth, thought leadership content, and building sustainable authority that drives long-term business success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Strategy Blueprint */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-4">STRATEGY</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Video Strategy Blueprint</h3>
                  <div className="text-4xl font-black text-green-600">$19</div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />Step-by-step video guide</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />Growth stage strategies</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />Audience behavior insights</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />Content planning framework</li>
                </ul>
                <button
                  onClick={() => handlePurchase(PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.paymentUrl)}
                  className="w-full py-3 px-4 bg-green-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Get Strategy
                </button>
              </div>

              {/* Founder Brand Kit */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">MOST POPULAR</div>
                </div>
                <div className="text-center mb-6 mt-4">
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-4">PERSONAL BRAND</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Founder's Brand Kit</h3>
                  <div className="text-4xl font-black text-green-600">$6,000</div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />1 shoot day + strategy</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />Founder bio video (90-120 sec)</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />2 hook/top-of-funnel videos</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />Vibe montage/sizzle reel</li>
                </ul>
                <button
                  onClick={() => handleBooking("The Founder's Brand Kit")}
                  className="w-full py-3 px-4 bg-green-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>

              {/* YouTube Engine */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-4">YOUTUBE</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">YouTube Visibility Engine</h3>
                  <div className="text-4xl font-black text-green-600">$6,500</div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />3 long-form videos (8-10 min)</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />Content strategy + series plan</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />Full scripting + outlines</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-green-500 mr-2" />SEO titles + descriptions</li>
                </ul>
                <button
                  onClick={() => handleBooking("YouTube Visibility Engine")}
                  className="w-full py-3 px-4 bg-green-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Spotlight Pal Tab */}
          <TabsContent value="spotlight" className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <img 
                  className="w-20 h-20 rounded-full object-cover object-center" 
                  src="/lovable-uploads/04881cac-8132-4f58-b31d-07f97e89beaf.png" 
                  alt="Spotlight Pal avatar" 
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark mb-4">
                🎬 Spotlight Pal - Premium Content
              </h2>
              <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
                Cinematic brand films and premium content that commands attention and creates lasting impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* 7-Day Launch */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">MOST POPULAR</div>
                </div>
                <div className="text-center mb-6 mt-4">
                  <div className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold mb-4">HERO</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">The 7-Day Launch</h3>
                  <div className="text-4xl font-black text-red-600">$2,500</div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />1 strategy session + shoot day</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />1 hero brand video (90-120 sec)</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />3–5 cutdowns for social</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />Fast turnaround (7 business days)</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />Professional cinematic quality</li>
                </ul>
                <button
                  onClick={() => handleBooking("The 7-Day Launch")}
                  className="w-full py-3 px-4 bg-red-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Launch
                </button>
              </div>

              {/* Music Video */}
              <div className="bg-white p-8 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold mb-4">MUSIC</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Music Video Production</h3>
                  <div className="text-4xl font-black text-red-600">Custom</div>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />Cinematic music video creation</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />Creative concept development</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />Professional video production</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />Multi-location shooting</li>
                  <li className="flex items-center text-sm"><CheckCircle size={14} className="text-red-500 mr-2" />Advanced post-production</li>
                </ul>
                <button
                  onClick={() => handleBooking("Music Video Production")}
                  className="w-full py-3 px-4 bg-red-500 text-white font-bold text-sm rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Get Quote
                </button>
              </div>
            </div>
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
