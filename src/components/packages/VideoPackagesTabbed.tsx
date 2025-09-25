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

// Import new character avatars
import reelPalAvatar from "@/assets/pals/female-reel-pal-content-creation.png";
import systemPalAvatar from "@/assets/pals/female-system-pal-multitasking.png";
import evergreenPalAvatar from "@/assets/pals/female-evergreen-pal-content-planning.png";
import spotlightPalAvatar from "@/assets/pals/spotlight-pal-3d-avatar.png";

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
    <section className="pt-16 md:pt-24 pb-8 md:pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Section - White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
          <div className="text-center">
            <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
              🎬 Business Video Assets
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight">
              Business Video Assets: <span className="text-pal-purple">Evergreen Tools for Growth</span>
            </h2>
            <p className="text-base md:text-lg xl:text-xl text-corporate-gray mb-8 max-w-4xl mx-auto font-medium">
              Not social fluff — these are cinematic, repeatable videos that save your team time, cut training costs, and build customer trust.
            </p>
            <button
              onClick={handleDiscoveryCall}
              className="inline-flex items-center px-8 py-4 bg-pal-purple text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 video-shadow-lg"
            >
              Book Strategy Call
            </button>
          </div>
        </div>

        {/* Tabbed Interface - White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
          <Tabs defaultValue="reel" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto bg-gray-50">
              <TabsTrigger value="reel" className="text-xs py-4 min-h-[60px] flex flex-col items-center data-[state=active]:bg-pal-orange data-[state=active]:text-white">
                <div className="w-8 h-8 bg-pal-orange rounded-full mb-1 flex items-center justify-center">
                  <Video size={14} className="text-white" />
                </div>
                <span>Reel Pal</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="text-xs py-4 min-h-[60px] flex flex-col items-center data-[state=active]:bg-pal-purple data-[state=active]:text-white">
                <div className="w-8 h-8 bg-pal-purple rounded-full mb-1 flex items-center justify-center">
                  <Wrench size={14} className="text-white" />
                </div>
                <span>System Pal</span>
              </TabsTrigger>
              <TabsTrigger value="evergreen" className="text-xs py-4 min-h-[60px] flex flex-col items-center data-[state=active]:bg-pal-green data-[state=active]:text-white">
                <div className="w-8 h-8 bg-pal-green rounded-full mb-1 flex items-center justify-center">
                  <Users size={14} className="text-white" />
                </div>
                <span>Evergreen Pal</span>
              </TabsTrigger>
              <TabsTrigger value="spotlight" className="text-xs py-4 min-h-[60px] flex flex-col items-center data-[state=active]:bg-pal-blue data-[state=active]:text-white">
                <div className="w-8 h-8 bg-pal-blue rounded-full mb-1 flex items-center justify-center">
                  <Camera size={14} className="text-white" />
                </div>
                <span>Spotlight Pal</span>
              </TabsTrigger>
            </TabsList>

            {/* Reel Pal Tab */}
            <TabsContent value="reel" className="space-y-8">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto flex items-center justify-center mb-6">
                  <img 
                    className="w-full h-full object-contain" 
                    src={reelPalAvatar} 
                    alt="Reel Pal 3D character avatar" 
                  />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-6">
                  📱 Reel Pal - Social Content Creation
                </h2>
                <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium">
                  Short-form social content that captures hearts and drives real engagement across all platforms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Starter Session */}
                <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-pal-orange/10 text-pal-orange rounded-full text-sm font-bold mb-4">STARTER</div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-2">The Starter Session</h3>
                    <div className="text-4xl font-black text-pal-orange">$500</div>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />30-minute filming session</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />Minimum 3 edited videos</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />Simple talking-head style</li>
                  </ul>
                  <button
                    onClick={() => handleBooking("The Starter Session")}
                    className="w-full py-4 px-6 bg-pal-orange text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Book Session
                  </button>
                </div>

                {/* DIY Reels */}
                <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-pal-orange/10 text-pal-orange rounded-full text-sm font-bold mb-4">DIY</div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-2">25 DIY Reels</h3>
                    <div className="text-4xl font-black text-pal-orange">$47</div>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />25 talking-head reel ideas</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />Platform breakdowns</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />Sample scripts provided</li>
                  </ul>
                  <button
                    onClick={() => handlePurchase(PRICING.DIY_DOWNLOADS["25_REELS"].paymentUrl)}
                    className="w-full py-4 px-6 bg-pal-orange text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Script Bundle */}
                <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-pal-orange/10 text-pal-orange rounded-full text-sm font-bold mb-4">SCRIPTS</div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-2">Script Bundle</h3>
                    <div className="text-4xl font-black text-pal-orange">$47</div>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />About Me video scripts</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />Social proof templates</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />Call-to-action scripts</li>
                  </ul>
                  <button
                    onClick={() => handlePurchase(PRICING.DIY_DOWNLOADS.SCRIPT_BUNDLE.paymentUrl)}
                    className="w-full py-4 px-6 bg-pal-orange text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Get Scripts
                  </button>
                </div>

                {/* 30 Reels */}
                <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-pal-orange text-white px-4 py-2 rounded-full text-sm font-bold">MOST POPULAR</div>
                  </div>
                  <div className="text-center mb-6 mt-4">
                    <div className="inline-block px-4 py-2 bg-pal-orange/10 text-pal-orange rounded-full text-sm font-bold mb-4">DONE FOR YOU</div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-2">30 Reels in 30 Days</h3>
                    <div className="text-4xl font-black text-pal-orange">$4,800</div>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />1 full-day shoot (8 hours)</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />30 social-ready videos</li>
                    <li className="flex items-center"><CheckCircle size={16} className="text-pal-orange mr-3" />Platform formatting</li>
                  </ul>
                  <button
                    onClick={() => handleBooking("30 Reels in 30 Days")}
                    className="w-full py-4 px-6 bg-pal-orange text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </TabsContent>

          {/* System Pal Tab */}
          <TabsContent value="system" className="space-y-8">
            <div className="text-center">
                <div className="w-48 h-48 mx-auto flex items-center justify-center mb-6">
                  <img 
                    className="w-full h-full object-contain" 
                    src={systemPalAvatar} 
                    alt="System Pal 3D character avatar" 
                  />
                </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-6">
                ⚙️ System Pal - Training & Internal Systems
              </h2>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium">
                Training videos, employee onboarding, and internal documentation that actually gets used and drives results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Internal Assets */}
              <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-pal-purple/10 text-pal-purple rounded-full text-sm font-bold mb-4">
                    Internal Assets
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Internal Business Assets</h3>
                  <div className="text-4xl font-black text-pal-purple">$4,500</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />15 videos @ 1–2 min each</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Onboarding & training</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Software walkthroughs</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Process & policy explainers</li>
                </ul>
                <button
                  onClick={() => handleBooking("Internal Business Video Assets")}
                  className="w-full py-4 px-6 bg-pal-purple text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>

              {/* External Assets */}
              <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-pal-purple text-white px-4 py-2 rounded-full text-sm font-bold">MOST POPULAR</div>
                </div>
                <div className="text-center mb-6 mt-4">
                  <div className="inline-flex items-center px-4 py-2 bg-pal-purple/10 text-pal-purple rounded-full text-sm font-bold mb-4">
                    External Assets
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">External Business Assets</h3>
                  <div className="text-4xl font-black text-pal-purple">$4,500</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />15 videos @ 1–2 min each</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Customer FAQ libraries</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Product/service explainers</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Testimonial capsules</li>
                </ul>
                <button
                  onClick={() => handleBooking("External Business Video Assets")}
                  className="w-full py-4 px-6 bg-pal-purple text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>

              {/* Advanced Package */}
              <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-pal-purple/10 text-pal-purple rounded-full text-sm font-bold mb-4">
                    Advanced
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Safety & Compliance</h3>
                  <div className="text-4xl font-black text-pal-purple">$10,000+</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />8–10 videos @ up to 5 min</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Safety & compliance training</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Sales training modules</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-purple mr-3" />Advanced software training</li>
                </ul>
                <button
                  onClick={() => handleBooking("Safety & Compliance Training")}
                  className="w-full py-4 px-6 bg-pal-purple text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Evergreen Pal Tab */}
          <TabsContent value="evergreen" className="space-y-8">
            <div className="text-center">
                <div className="w-48 h-48 mx-auto flex items-center justify-center mb-6">
                  <img 
                    className="w-full h-full object-contain" 
                    src={evergreenPalAvatar} 
                    alt="Evergreen Pal 3D character avatar" 
                  />
                </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-6">
                🌱 Evergreen Pal - Authority Building
              </h2>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium">
                YouTube growth, thought leadership content, and building sustainable authority that drives long-term business success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Strategy Blueprint */}
              <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-pal-green/10 text-pal-green rounded-full text-sm font-bold mb-4">STRATEGY</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Video Strategy Blueprint</h3>
                  <div className="text-4xl font-black text-pal-green">$19</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />Step-by-step video guide</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />Growth stage strategies</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />Audience behavior insights</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />Content planning framework</li>
                </ul>
                <button
                  onClick={() => handlePurchase(PRICING.DIY_DOWNLOADS.STRATEGY_BLUEPRINT.paymentUrl)}
                  className="w-full py-4 px-6 bg-pal-green text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Get Strategy
                </button>
              </div>

              {/* Founder Brand Kit */}
              <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-pal-green text-white px-4 py-2 rounded-full text-sm font-bold">MOST POPULAR</div>
                </div>
                <div className="text-center mb-6 mt-4">
                  <div className="inline-block px-4 py-2 bg-pal-green/10 text-pal-green rounded-full text-sm font-bold mb-4">PERSONAL BRAND</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Founder's Brand Kit</h3>
                  <div className="text-4xl font-black text-pal-green">$6,000</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />1 shoot day + strategy</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />Founder bio video (90-120 sec)</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />2 hook/top-of-funnel videos</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />Vibe montage/sizzle reel</li>
                </ul>
                <button
                  onClick={() => handleBooking("The Founder's Brand Kit")}
                  className="w-full py-4 px-6 bg-pal-green text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>

              {/* YouTube Engine */}
              <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-pal-green/10 text-pal-green rounded-full text-sm font-bold mb-4">YOUTUBE</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">YouTube Visibility Engine</h3>
                  <div className="text-4xl font-black text-pal-green">$6,500</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />3 long-form videos (8-10 min)</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />Content strategy + series plan</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />Full scripting + outlines</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-green mr-3" />SEO titles + descriptions</li>
                </ul>
                <button
                  onClick={() => handleBooking("YouTube Visibility Engine")}
                  className="w-full py-4 px-6 bg-pal-green text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Spotlight Pal Tab */}
          <TabsContent value="spotlight" className="space-y-8">
            <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-pal-blue/10 flex items-center justify-center mb-6">
                  <img 
                    className="w-20 h-20 rounded-full object-cover object-center" 
                    src={spotlightPalAvatar} 
                    alt="Spotlight Pal 3D character avatar" 
                  />
                </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-6">
                🎬 Spotlight Pal - Premium Content
              </h2>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium">
                Cinematic brand films and premium content that commands attention and creates lasting impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* 7-Day Launch */}
              <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-pal-blue text-white px-4 py-2 rounded-full text-sm font-bold">MOST POPULAR</div>
                </div>
                <div className="text-center mb-6 mt-4">
                  <div className="inline-block px-4 py-2 bg-pal-blue/10 text-pal-blue rounded-full text-sm font-bold mb-4">HERO</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">The 7-Day Launch</h3>
                  <div className="text-4xl font-black text-pal-blue">$2,500</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />1 strategy session + shoot day</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />1 hero brand video (90-120 sec)</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />3–5 cutdowns for social</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />Fast turnaround (7 business days)</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />Professional cinematic quality</li>
                </ul>
                <button
                  onClick={() => handleBooking("The 7-Day Launch")}
                  className="w-full py-4 px-6 bg-pal-blue text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Book Launch
                </button>
              </div>

              {/* Music Video */}
              <div className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-pal-blue/10 text-pal-blue rounded-full text-sm font-bold mb-4">MUSIC</div>
                  <h3 className="text-2xl font-bold text-corporate-dark mb-2">Music Video Production</h3>
                  <div className="text-4xl font-black text-pal-blue">Custom</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />Cinematic music video creation</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />Creative concept development</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />Professional video production</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />Multi-location shooting</li>
                  <li className="flex items-center text-sm"><CheckCircle size={16} className="text-pal-blue mr-3" />Advanced post-production</li>
                </ul>
                <button
                  onClick={() => handleBooking("Music Video Production")}
                  className="w-full py-4 px-6 bg-pal-blue text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Business Bonus Pack - White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mt-12">
          <Accordion type="single" collapsible>
            <AccordionItem value="bonus-pack" className="border-none">
              <AccordionTrigger className="hover:no-underline pb-8">
                <div className="text-left">
                  <div className="inline-flex items-center px-6 py-3 bg-pal-purple text-white font-bold text-lg mb-6 rounded-full">
                    <Gift size={20} className="mr-2" />
                    🎁 The Business Bonus Pack
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark">
                    Free Bonus <span className="text-pal-purple">Value Pack</span>
                  </h2>
                  <p className="text-lg xl:text-xl text-corporate-gray mt-4 font-medium">
                    $410 value included with most packages - see what's inside
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-corporate-dark mb-6 text-xl">What's Included:</h4>
                    <ul className="space-y-4">
                      {bonusItems.map((bonus, index) => (
                        <li key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <span className="text-sm text-corporate-gray font-medium">{bonus.item}</span>
                          <span className="text-sm font-bold text-pal-purple">{bonus.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-2xl text-center">
                    <div className="text-4xl font-black text-corporate-dark mb-3">$410</div>
                    <div className="text-xl font-medium text-corporate-gray mb-6">Total Value</div>
                    <div className="text-3xl font-black text-pal-green mb-4">FREE</div>
                    <p className="text-base text-corporate-gray">
                      Included with qualifying packages
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Call to Action - White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mt-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark">
              Ready to Begin Your <span className="text-pal-purple">Video Strategy</span>?
            </h2>
            <p className="text-lg xl:text-xl text-corporate-gray mb-10 max-w-4xl mx-auto font-medium">
              Book a strategy call to explore which package fits your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleDiscoveryCall}
                className="px-8 py-4 bg-pal-purple text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 video-shadow-lg"
              >
                Book Strategy Call
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-corporate-dark text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 video-shadow-lg"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
