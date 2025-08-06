import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Terms of Service | Palmer House Video Production"
        description="Review the terms of service for Palmer House Productions' video content systems, pricing, ownership, and business partnership agreements."
        keywords="terms of service, Palmer House Productions, video production terms, business agreement, content ownership"
        ogTitle="Terms of Service | Palmer House Productions"
        ogDescription="Review the terms of service for Palmer House Productions' video content systems, pricing, ownership, and business partnership agreements."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-4xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Terms of <span className="text-gradient-1">Service</span>
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-3xl mx-auto">
                Please read these terms carefully before using our services.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white p-8 rounded-3xl video-shadow">
                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Acceptance of Terms</h2>
                <p className="text-corporate-gray mb-6">
                  By accessing and using Palmer House Productions services, you accept and agree to be bound 
                  by the terms and provision of this agreement.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Services</h2>
                <p className="text-corporate-gray mb-6">
                  Palmer House Productions provides video production services, coaching, and digital downloads. 
                  We reserve the right to modify or discontinue services at any time.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Payment Terms</h2>
                <p className="text-corporate-gray mb-6">
                  Payment terms will be outlined in individual service agreements. All fees are non-refundable 
                  unless otherwise specified in writing.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Intellectual Property</h2>
                <p className="text-corporate-gray mb-6">
                  All content, materials, and intellectual property created by Palmer House Productions 
                  remain the property of Palmer House Productions until full payment is received, at which 
                  point ownership transfers to the client as outlined in the service agreement.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Limitation of Liability</h2>
                <p className="text-corporate-gray mb-6">
                  Palmer House Productions shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising out of or relating to the use of our services.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Governing Law</h2>
                <p className="text-corporate-gray mb-6">
                  These terms shall be governed by and construed in accordance with the laws of the 
                  State of Washington, without regard to its conflict of law provisions.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Changes to Terms</h2>
                <p className="text-corporate-gray mb-6">
                  We reserve the right to update these terms at any time. Changes will be posted on 
                  this page and will take effect immediately upon posting. Your continued use of our 
                  services constitutes acceptance of any changes.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Contact Information</h2>
                <p className="text-corporate-gray">
                  For questions about these terms, please contact us at{" "}
                  <a href="mailto:info@palmerhouseproductions.com" className="text-social-purple hover:underline">
                    info@palmerhouseproductions.com
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

export default Terms;