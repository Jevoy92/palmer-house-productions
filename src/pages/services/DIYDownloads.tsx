import { useNavigate } from "react-router-dom";
import { Download, Video, FileText, Mic, Camera } from "lucide-react";
import { PRICING } from "@/lib/pricing";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Navigation } from "@/components/Navigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";
import { ZohoLeadForm } from "@/components/zoho/ZohoLeadForm";
import { FAQSchema } from "@/components/seo/FAQSchema";


const DIYDownloads = () => {
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

  const handlePurchase = (paymentUrl: string) => {
    window.open(paymentUrl, '_blank', 'noopener,noreferrer');
  };

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
        title="DIY Video Resources & Downloads | Palmer House"
        description="Download professional video resources - script templates, strategy guides, and DIY tools for creating compelling business content."
        keywords="DIY video downloads, video strategy blueprint, script bundle, video production resources"
        ogTitle="DIY Video Downloads | Palmer House Productions"
        ogDescription="Download professional video resources - script templates, strategy guides, and DIY tools for creating compelling business content."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <FAQSchema
        faqs={[
          { question: 'How do I receive my download?', answer: 'Instant access via email with auto-delivery. No waiting or manual processing.' },
          { question: 'Are these part of a bigger system?', answer: 'Yes — each download fits into a broader content system for onboarding, sales, and support.' },
          { question: 'Refund policy?', answer: 'Digital products are non-refundable. If you have an issue, email support and we’ll make it right.' },
          { question: 'Can I use these with my team?', answer: 'Yes — licensed for your business use. Redistribution or resale is not permitted.' },
          { question: 'What should I buy first?', answer: 'Start with the Video Strategy Blueprint to choose the right videos for your goals and audience.' }
        ]}
      />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            {/* Hero Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
              <div className="text-center">
                <div className="inline-block px-6 py-3 bg-pal-purple text-white font-bold text-lg mb-8 rounded-full">
                  <Download className="inline-block mr-2" size={20} />
                  DIY Downloads
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                  Start Your Video Journey <span className="text-pal-purple">Today</span>
                </h1>
                <p className="text-lg md:text-xl xl:text-2xl text-corporate-gray mb-8 max-w-4xl mx-auto font-medium">
                  Instant access to professional video resources that help you create compelling content on your own timeline.
                </p>
              </div>
            </div>
            
            {/* Downloads Grid - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {digitalDownloads.map((item, index) => {
                  const palColors = ['bg-pal-purple', 'bg-pal-orange', 'bg-pal-blue'];
                  const palTextColors = ['text-pal-purple', 'text-pal-orange', 'text-pal-blue'];
                  
                  return (
                    <div key={index} className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                      <div className="text-center mb-6">
                        <div className={`w-20 h-20 ${palColors[index]} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                          <item.icon color="white" size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-corporate-dark mb-4">{item.title}</h2>
                        <div className={`text-4xl font-black ${palTextColors[index]} mb-2`}>{item.price}</div>
                        <div className="text-sm text-corporate-gray mb-4 font-medium">{item.format}</div>
                      </div>
                      <p className="text-sm text-corporate-gray mb-8 leading-relaxed text-center">{item.description}</p>
                      <button
                        onClick={() => handlePurchase(item.paymentUrl)}
                        className={`w-full py-4 px-6 ${palColors[index]} text-white font-bold text-base rounded-xl hover:scale-105 transition-all duration-300 video-shadow`}
                      >
                        Buy Now
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-6">
                  Ready to Take the Next Step?
                </h3>
                <p className="text-lg xl:text-xl text-corporate-gray mb-8 font-medium max-w-3xl mx-auto">
                  Need more personalized guidance? Explore our coaching and production services.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => navigate('/video-packages')}
                    className="px-8 py-4 bg-pal-purple text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 video-shadow-lg"
                  >
                    Explore DIY Coaching
                  </button>
                  <a
                    href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border-2 border-pal-purple text-pal-purple font-bold text-lg rounded-xl hover:bg-pal-purple hover:text-white transition-all duration-300"
                  >
                    Book Strategy Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
      
    </div>
  );
};

export default DIYDownloads;