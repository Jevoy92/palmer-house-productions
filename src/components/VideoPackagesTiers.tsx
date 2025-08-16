import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Heart,
  Star,
  CheckCircle,
  ExternalLink,
  Clock,
  ChevronDown,
  ChevronUp,
  DollarSign
} from "lucide-react";
import { PRICING } from "@/lib/pricing";

export const VideoPackagesTiers = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
      title: PRICING.ONE_TIME_BUNDLES.INTERNAL_FAQ.name,
      price: PRICING.ONE_TIME_BUNDLES.INTERNAL_FAQ.price,
      type: "One-time",
      description: `${PRICING.ONE_TIME_BUNDLES.INTERNAL_FAQ.videos} covering ${PRICING.ONE_TIME_BUNDLES.INTERNAL_FAQ.covers.join(", ")}. ${PRICING.ONE_TIME_BUNDLES.INTERNAL_FAQ.style}`,
      features: ["15 videos (60-90 sec each)", "HR onboarding content", "Internal processes", "Company explainer", "Software tutorials"],
      spotsAvailable: PRICING.ONE_TIME_BUNDLES.INTERNAL_FAQ.spotsAvailable,
      urgency: PRICING.ONE_TIME_BUNDLES.INTERNAL_FAQ.urgency
    },
    {
      title: PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.name,
      price: PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.price,
      type: "One-time",
      description: `${PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.videos} covering ${PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.covers.join(", ")}. ${PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.delivery}`,
      features: ["15 videos (60-90 sec each)", "Customer onboarding", "Objection handling", "Service breakdowns", "Pricing explanations", "Thumbnails + captions"],
      spotsAvailable: PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.spotsAvailable,
      urgency: PRICING.ONE_TIME_BUNDLES.EXTERNAL_FAQ.urgency
    },
    {
      title: PRICING.ONE_TIME_BUNDLES.YOUTUBE_ENGINE.name,
      price: PRICING.ONE_TIME_BUNDLES.YOUTUBE_ENGINE.price,
      type: "One-time",
      description: `${PRICING.ONE_TIME_BUNDLES.YOUTUBE_ENGINE.videos} with ${PRICING.ONE_TIME_BUNDLES.YOUTUBE_ENGINE.includes.join(", ")}.`,
      features: ["3 long-form videos (8-10 min)", "Content strategy + series plan", "Full scripting + outlines", "On-set teleprompter support", "Cinematic editing", "YouTube SEO optimization"],
      spotsAvailable: PRICING.ONE_TIME_BUNDLES.YOUTUBE_ENGINE.spotsAvailable,
      urgency: PRICING.ONE_TIME_BUNDLES.YOUTUBE_ENGINE.urgency
    },
    {
      title: PRICING.ONE_TIME_BUNDLES.SEVEN_DAY_LAUNCH.name,
      price: PRICING.ONE_TIME_BUNDLES.SEVEN_DAY_LAUNCH.price,
      type: "One-time",
      description: `${PRICING.ONE_TIME_BUNDLES.SEVEN_DAY_LAUNCH.sessions}. ${PRICING.ONE_TIME_BUNDLES.SEVEN_DAY_LAUNCH.delivery.join(" and ")}. ${PRICING.ONE_TIME_BUNDLES.SEVEN_DAY_LAUNCH.timeline}`,
      features: ["1 strategy session", "1 shoot day", "1 hero brand video (90-120 sec)", "3-5 social cutdowns", "7-day turnaround"],
      spotsAvailable: PRICING.ONE_TIME_BUNDLES.SEVEN_DAY_LAUNCH.spotsAvailable,
      urgency: PRICING.ONE_TIME_BUNDLES.SEVEN_DAY_LAUNCH.urgency
    },
    {
      title: PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.name,
      price: PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.price,
      type: "One-time",
      description: `${PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.shoot} producing ${PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.videos}. ${PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.includes}`,
      features: ["1 full-day shoot (8 hours)", "30 social videos (15-30 sec)", "Platform formatting", "Captions included", "IG/LinkedIn/TikTok ready"],
      spotsAvailable: PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.spotsAvailable,
      urgency: PRICING.ONE_TIME_BUNDLES.THIRTY_REELS.urgency
    },
    {
      title: PRICING.ONE_TIME_BUNDLES.FOUNDER_BRAND_KIT.name,
      price: PRICING.ONE_TIME_BUNDLES.FOUNDER_BRAND_KIT.price,
      type: "One-time",
      description: `${PRICING.ONE_TIME_BUNDLES.FOUNDER_BRAND_KIT.shoot} including ${PRICING.ONE_TIME_BUNDLES.FOUNDER_BRAND_KIT.includes.join(", ")}.`,
      features: ["1 shoot day + strategy", "Founder Bio Video (90-120 sec)", "2 Hook/Top-of-Funnel Videos", "Vibe Montage or Style Sizzle", "Multi-platform delivery", "Thumbnails included"],
      spotsAvailable: PRICING.ONE_TIME_BUNDLES.FOUNDER_BRAND_KIT.spotsAvailable,
      urgency: PRICING.ONE_TIME_BUNDLES.FOUNDER_BRAND_KIT.urgency
    },
    {
      title: PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.name,
      price: PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.price,
      type: "One-time",
      description: `${PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.session} with ${PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.minimum}. ${PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.style}`,
      features: ["30-minute session", "3+ one-minute videos", "Simple talking-head style", "No stylized editing", "Limited slots"],
      spotsAvailable: PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.spotsAvailable,
      urgency: PRICING.ONE_TIME_BUNDLES.STARTER_SESSION.urgency
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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section className="pt-16 md:pt-24 pb-8 md:pb-16 bg-video-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-4 md:right-20 w-12 h-12 md:w-24 md:h-24 gradient-social-2 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 md:w-40 md:h-40 gradient-social-3 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-4 md:right-10 w-14 h-14 md:w-28 md:h-28 gradient-social-4 rounded-full opacity-25 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block px-3 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-4 video-shadow">
            🎬 Video Packages
          </div>
          <h1 className="text-2xl md:text-4xl font-display font-black mb-4 text-corporate-dark tracking-tight">
            Video Production <span className="text-gradient-1">Packages</span>
          </h1>
          <p className="text-base md:text-lg text-corporate-gray mb-4 max-w-2xl mx-auto px-4">
            Professional video content for businesses. Choose the package that fits your needs.
          </p>
          <div className="inline-block px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-xs font-medium mb-6">
            📅 Limited monthly availability
          </div>
        </div>

        {/* Digital Downloads Section */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center px-3 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-3">
              <Download size={16} className="mr-2" />
              Digital Downloads
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black text-corporate-dark mb-2">
              DIY Video <span className="text-gradient-2">Resources</span>
            </h2>
            <p className="text-sm text-corporate-gray">Start creating immediately with our templates and guides</p>
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
        </div>

        {/* Group Coaching Section */}
        <div className="mb-16 md:mb-24">
            <div className="bg-white p-8 md:p-12 rounded-3xl text-center video-shadow-lg border-4 border-gradient-to-r from-social-purple to-social-pink">
            <div className="flex items-center justify-center mb-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-white font-bold text-sm md:text-base mr-4">
                <Users size={20} className="mr-2" />
                🗓️ 6-Week Group Coaching: "The Camera-Ready Brand"
              </div>
              <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                {PRICING.GROUP_COACHING.CAMERA_READY_BRAND.spotsAvailable} spots left
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black mb-4 text-corporate-dark">
              Group <span className="text-gradient-purple">Video Coaching</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
        </div>

        {/* Monthly Content System */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-4 py-2 gradient-social-3 rounded-full text-white font-bold text-sm md:text-base mb-4">
              <Repeat size={20} className="mr-2" />
              ♻️ Monthly Content System: "The Social Authority Kit"
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black text-corporate-dark mb-2">
              Monthly <span className="text-gradient-3">Content System</span>
            </h2>
            <p className="text-sm text-corporate-gray">Consistent professional video content delivered monthly</p>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl video-shadow-lg">
            <div className="text-center mb-8">
              <div className="text-5xl font-black text-corporate-dark mb-2">$3,000<span className="text-xl text-corporate-gray">/month</span></div>
              <div className="text-lg text-corporate-gray font-medium mb-4">3-month minimum commitment</div>
              <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                {PRICING.MONTHLY_CONTENT.SOCIAL_AUTHORITY_KIT.urgency}
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
                <h4 className="font-bold text-corporate-dark mb-4">YouTube Long-Form:</h4>
                <p className="text-sm text-corporate-gray mb-4">
                  For YouTube long-form videos, check out our "YouTube Visibility Engine" one-time bundle below.
                </p>
                <div className="bg-blue-50 p-4 rounded-xl">
                    <h5 className="font-bold text-blue-800 mb-2">🎁 Bonus Included:</h5>
                    <p className="text-sm text-blue-700">
                      Get the complete Business Bonus Pack (valued at $410) FREE with this package!
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
        </div>

        {/* One-Time Problem-Solving Bundles */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-4 py-2 gradient-social-4 rounded-full text-white font-bold text-sm md:text-base mb-4">
              <Wrench size={20} className="mr-2" />
              🛠️ One-Time Problem-Solving Bundles
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black text-corporate-dark mb-2">
              One-Time <span className="text-gradient-4">Bundles</span>
            </h2>
            <p className="text-sm text-corporate-gray">Targeted solutions for specific video needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {oneTimeBundles.map((bundle, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">
                      {bundle.type}
                    </div>
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                      {bundle.spotsAvailable} left
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-2">{bundle.title}</h3>
                  <div className="text-3xl font-black text-corporate-dark mb-2">{bundle.price}</div>
                  <div className="text-xs text-red-600 font-medium">{bundle.urgency}</div>
                </div>
                
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
              </div>
            ))}
          </div>
        </div>

        {/* Business Bonus Pack */}
        <div className="mb-16 md:mb-24">
          <div className="bg-white p-8 md:p-12 rounded-3xl video-shadow-lg border-4 border-gradient-to-r from-yellow-400 to-orange-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold text-sm md:text-base mb-4">
                <Gift size={20} className="mr-2" />
                🎁 The Business Bonus Pack
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-black mb-4 text-corporate-dark">
                Your Free <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Business Tools</span>
              </h2>
              <p className="text-xl mb-2 text-corporate-gray">Included FREE with:</p>
              <p className="text-lg text-corporate-gray">Monthly Social Authority Kit + Any One-Time Bundle $4,500+</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-4xl font-black mb-2 text-corporate-dark">Total Added Value: $410</div>
                <p className="text-lg text-corporate-gray">Use it. Don't use it. It's there when you need it. Like a compass in your back pocket.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bonusItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-2xl border-2 border-yellow-400/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-corporate-gray">{item.item}</span>
                      <span className="font-bold text-corporate-dark">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Future YouTube Plan */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl video-shadow border-2 border-dashed border-gray-300">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 font-bold text-sm md:text-base mb-4">
              <CheckCircle size={20} className="mr-2" />
              ✅ Available Now: Ongoing Monthly YouTube Plan
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark mb-4">
              YouTube Visibility Engine
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-2xl font-bold text-corporate-dark">$4,000-$5,000</div>
                <div className="text-sm text-corporate-gray">per month</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-2xl font-bold text-corporate-dark">2-3 Videos</div>
                <div className="text-sm text-corporate-gray">long-form monthly</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-2xl font-bold text-corporate-dark">Full Service</div>
                <div className="text-sm text-corporate-gray">scripting to optimization</div>
              </div>
            </div>
            <p className="text-lg text-corporate-gray">
              Complete YouTube strategy with scripting, filming, editing, and optimization for sustainable channel growth.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-social-purple to-social-pink p-8 md:p-12 rounded-3xl text-white video-shadow-lg">
            <h2 className="text-3xl md:text-5xl font-display font-black mb-6">
              Ready to Start Your Video System?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a strategy call to discuss which solution fits your goals and timeline.
            </p>
            <button
              onClick={handleDiscoveryCall}
              className="px-8 py-4 bg-white text-social-purple font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
            >
              🔍 Book Your Strategy Call
            </button>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleDiscoveryCall}
          className="px-6 py-3 gradient-social-2 text-white font-bold text-sm rounded-full video-shadow-lg hover:scale-105 transition-all duration-300"
        >
          💬 Book Strategy Call
        </button>
      </div>
    </section>
  );
};