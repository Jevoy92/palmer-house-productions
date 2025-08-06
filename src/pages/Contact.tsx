
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Contact Palmer House Productions | Start Your Video Project Today"
        description="Contact Palmer House Productions for professional video production services. Get a custom quote for your business video, cinematic storytelling, or content creation project."
        keywords="contact Palmer House Productions, video production quote, professional video services, business video consultation"
        ogTitle="Contact Palmer House Productions | Video Production Services"
        ogDescription="Contact us for professional video production services. Get a custom quote for your business video project."
        canonicalUrl="https://www.palmerhouseproductions.com/contact"
      />
      <StructuredData type="contact" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
                ✉️ Ready to Begin
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Start Your <span className="text-gradient-1">Video Project</span> Today
              </h1>
              <p className="text-xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium">
                Let's create something extraordinary together. Your story deserves to be told with clarity and impact.
              </p>
            </div>
            
            <Contact autoOpenWizard={false} />
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default ContactPage;
