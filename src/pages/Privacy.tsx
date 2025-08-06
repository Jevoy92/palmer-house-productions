import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Privacy Policy | Palmer House Productions Video Services"
        description="Learn how Palmer House Productions protects your privacy. Our comprehensive privacy policy covers data collection, usage, and security."
        keywords="privacy policy, data protection, Palmer House Productions, client privacy, personal information security"
        ogTitle="Privacy Policy | Palmer House Productions"
        ogDescription="Learn how Palmer House Productions protects your privacy. Our comprehensive privacy policy covers data collection, usage, and security."
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
                Privacy <span className="text-gradient-1">Policy</span>
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-3xl mx-auto">
                Your privacy matters to us. Learn how we collect, use, and protect your information when you work with Palmer House Productions.
              </p>
              <p className="text-lg text-corporate-gray mb-8 max-w-4xl mx-auto">
                <strong>Last Updated:</strong> January 2024 | This policy explains how Palmer House Productions collects, uses, and safeguards your personal information when you use our video production services, visit our website, or interact with our team.
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

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Data Security</h2>
                <p className="text-corporate-gray mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                  storage is 100% secure, so we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Data Retention</h2>
                <p className="text-corporate-gray mb-6">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
                  Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need 
                  your personal information, we will securely delete or anonymize it.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Your Rights</h2>
                <p className="text-corporate-gray mb-6">
                  You have the right to access, update, or delete your personal information. You may also opt out of receiving 
                  marketing communications from us at any time. To exercise these rights, please contact us using the 
                  information provided below.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Children's Privacy</h2>
                <p className="text-corporate-gray mb-6">
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal 
                  information from children under 13. If we become aware that we have collected personal information from 
                  a child under 13, we will take steps to delete such information from our records.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Changes to This Policy</h2>
                <p className="text-corporate-gray mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services 
                  after any changes constitutes your acceptance of the new Privacy Policy.
                </p>

                <h2 className="text-2xl font-bold text-corporate-dark mb-4">Contact Us</h2>
                <p className="text-corporate-gray">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
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

export default Privacy;