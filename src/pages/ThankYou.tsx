import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  useEffect(() => {
    try {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.2 } });
      setTimeout(() => confetti({ particleCount: 80, spread: 60, origin: { y: 0.3 } }), 250);
    } catch {}
  }, []);
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button asChild className="gradient-social-1 text-white min-h-[44px] px-6">
                <a
                  href="https://calendar.app.google/TjXSG2EjNF7KZzcJ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a Strategy Call"
                >
                  Book a Strategy Call
                </a>
              </Button>
              <Button asChild variant="outline" className="min-h-[44px] px-6">
                <a href="/" aria-label="Back to Home">Back to Home</a>
              </Button>
              <Button asChild variant="secondary" className="min-h-[44px] px-6">
                <a href="/video-packages" aria-label="Explore Packages">Explore Packages</a>
              </Button>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default ThankYou;
