import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="Thank You | Palmer House Productions"
        description="Thanks for your inquiry. We'll get back to you shortly."
        ogTitle="Thank You | Palmer House Productions"
        ogDescription="Thanks for your inquiry. We'll get back to you shortly."
        canonicalUrl="https://www.palmerhouseproductions.com/thank-you"
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="py-24 bg-corporate-light">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="inline-block px-4 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-6">🎉 Success</div>
            <h1 className="text-3xl md:text-4xl font-display font-black mb-6 text-corporate-dark">Thank you for your inquiry!</h1>
            <p className="text-lg text-corporate-gray mb-8">We received your details and will reply within one business day. If this is urgent, feel free to also book a strategy call.</p>
            <a
              href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-social-purple to-social-pink text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300"
            >
              Book a Strategy Call
            </a>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default ThankYou;
