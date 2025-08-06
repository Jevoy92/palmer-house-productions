
import { Navigation } from "@/components/Navigation";
import { Reviews } from "@/components/Reviews";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Client Reviews & Testimonials | Palmer House Productions"
        description="Read authentic client reviews and testimonials for Palmer House Productions. See why businesses trust us for their professional video production needs."
        keywords="Palmer House Productions reviews, video production testimonials, client feedback, video production company reviews"
        ogTitle="Client Reviews & Testimonials | Palmer House Productions"
        ogDescription="Authentic client reviews and testimonials. See why businesses trust Palmer House Productions for video production."
        canonicalUrl="https://www.palmerhouseproductions.com/reviews"
      />
      <StructuredData type="about" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight text-center">
              Client <span className="text-gradient-1">Reviews & Testimonials</span>
            </h1>
          </div>
        </section>
        <Reviews />
      </MainContent>
    </div>
  );
};

export default ReviewsPage;
