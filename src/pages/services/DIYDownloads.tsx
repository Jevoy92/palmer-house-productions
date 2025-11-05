import { Download, BookOpen, Video, FileText, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Button } from "@/components/ui/button";
import { PRICING } from "@/lib/pricing";

const DIYDownloads = () => {
  const diyProducts = Object.values(PRICING.DIY_DOWNLOADS);

  return (
    <div className="min-h-screen overflow-x-hidden font-sans">
      <MetaTags 
        title="DIY Video Downloads & Templates | Palmer House Productions"
        description="Professional video production templates, guides, and resources. Get instant access to DIY tools for video content creation."
        keywords="DIY video templates, video production guides, content creation resources, video scripts, video production downloads"
        ogTitle="DIY Downloads & Templates | Palmer House Productions"
        ogDescription="Professional video production templates, guides, and resources for DIY content creators."
        canonicalUrl="https://www.palmerhouseproductions.com/services/diy-downloads"
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <Navigation />
      <StructuredData />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Hero Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center mb-12">
              <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
                <Download className="inline-block mr-2" size={20} />
                DIY Resources
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                DIY <span className="text-pal-orange">Templates</span> & Resources
              </h1>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
                Professional video production resources at your fingertips. Instant access to guides, templates, and scripts.
              </p>
            </div>

            {/* Products Grid */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {diyProducts.map((product, index) => (
                  <div 
                    key={index}
                    className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border hover:border-pal-orange/50 transition-all duration-300 hover:video-shadow-lg"
                  >
                    <div className="w-16 h-16 bg-pal-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pal-orange/20 transition-colors">
                      {product.name.includes("Script") && <FileText size={32} className="text-pal-orange" />}
                      {product.name.includes("Guide") && <BookOpen size={32} className="text-pal-orange" />}
                      {product.name.includes("Template") && <Video size={32} className="text-pal-orange" />}
                      {!product.name.includes("Script") && !product.name.includes("Guide") && !product.name.includes("Template") && <Sparkles size={32} className="text-pal-orange" />}
                    </div>
                    
                    <h3 className="text-2xl font-display font-black text-corporate-dark mb-3">
                      {product.name}
                    </h3>
                    
                    <p className="text-corporate-gray leading-relaxed mb-6">
                      {product.description}
                    </p>
                    
                    <div className="mb-6">
                      <span className="text-3xl font-black text-pal-orange">
                        ${product.price}
                      </span>
                    </div>

                    <Button 
                      className="w-full bg-pal-orange hover:bg-pal-orange/90 text-white"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Get Access
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark text-center mb-12">
                Why Choose Our <span className="text-pal-purple">DIY Resources</span>?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pal-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={32} className="text-pal-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Instant Access</h3>
                  <p className="text-corporate-gray">
                    Download immediately after purchase. Start creating professional content right away.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-pal-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} className="text-pal-green" />
                  </div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Professional Quality</h3>
                  <p className="text-corporate-gray">
                    Industry-tested templates and guides from experienced video professionals.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-pal-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Video size={32} className="text-pal-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Affordable</h3>
                  <p className="text-corporate-gray">
                    Get professional resources without the premium production price tag.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-corporate-dark mb-6 tracking-tight">
                Need Custom <span className="text-pal-purple">Video Production</span>?
              </h3>
              <p className="text-lg xl:text-xl text-corporate-gray mb-8 max-w-4xl mx-auto font-medium leading-relaxed">
                While our DIY resources are great for getting started, sometimes you need professional help. Let's talk about full-service production.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/contact'}
                  className="px-10 py-6 bg-pal-purple hover:bg-pal-purple/90 text-white font-bold text-lg rounded-2xl"
                  size="lg"
                >
                  Get a Quote
                </Button>
                <Button
                  onClick={() => window.location.href = '/services/video-production'}
                  variant="outline"
                  className="px-10 py-6 border-2 border-pal-orange text-pal-orange hover:bg-pal-orange hover:text-white font-bold text-lg rounded-2xl"
                  size="lg"
                >
                  View Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default DIYDownloads;
