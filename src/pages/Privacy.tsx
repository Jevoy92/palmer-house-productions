import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { Navigation } from "@/components/Navigation";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-4xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Privacy <span className="text-gradient-1">Policy</span>
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-3xl mx-auto">
                Your privacy matters to us. Learn how we collect, use, and protect your information.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white p-8 rounded-3xl video-shadow">
                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Information We Collect</h2>
                <p className="text-corporate-gray mb-6">
                  We collect information you provide directly to us, such as when you contact us through our website, 
                  book a discovery call, or engage with our services.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">How We Use Your Information</h2>
                <p className="text-corporate-gray mb-6">
                  We use the information we collect to provide, maintain, and improve our services, communicate with you, 
                  and respond to your requests and inquiries.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Information Sharing</h2>
                <p className="text-corporate-gray mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                  except as described in this policy.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Contact Us</h2>
                <p className="text-corporate-gray">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:hello@palmerhouseproductions.com" className="text-social-purple hover:underline">
                    hello@palmerhouseproductions.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
      <EnhancedFooter />
    </div>
  );
};

export default Privacy;