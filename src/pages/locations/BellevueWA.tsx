import { Navigation } from "@/components/Navigation";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Link } from "react-router-dom";

const BellevueWA = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="Bellevue Video Production Studio | Palmer House Productions"
        description="Bellevue, WA video production studio crafting cinematic brand stories. Serving Seattle metro and global clients with strategy, filming, and editing."
        keywords="Bellevue video production, Seattle video studio, corporate video Bellevue, brand storytelling Bellevue"
        ogTitle="Bellevue, WA Video Production | Palmer House Productions"
        ogDescription="Cinematic video production in Bellevue, serving Seattle and global clients."
        canonicalUrl="https://www.palmerhouseproductions.com/locations/bellevue-wa"
      />
      <StructuredData type="services" />
      <Navigation />
      <MainContent>
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <BreadcrumbNavigation />
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 text-corporate-dark tracking-tight">
              Bellevue, WA Video Production
            </h1>
            <p className="text-lg md:text-xl text-corporate-gray max-w-3xl mb-8">
              Our Bellevue studio serves the greater Seattle area—and we regularly partner with clients around the world. From discovery to delivery, we craft
              cinematic stories that drive results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-2xl video-shadow p-6">
                <h2 className="text-2xl font-bold text-corporate-dark mb-3">Services we offer</h2>
                <ul className="list-disc list-inside text-corporate-gray space-y-1">
                  <li>Corporate and brand storytelling</li>
                  <li>Social content and reels bundles</li>
                  <li>Internal training and onboarding libraries</li>
                  <li>Customer testimonials and case studies</li>
                </ul>
                <Link to="/video-packages" className="inline-block mt-4 font-semibold text-social-purple hover:underline">
                  Explore Video Packages
                </Link>
              </div>
              <div className="bg-white rounded-2xl video-shadow p-6">
                <h2 className="text-2xl font-bold text-corporate-dark mb-3">Start a project</h2>
                <p className="text-corporate-gray mb-4">Ready to talk through your goals? Book a strategy call or drop us a note.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/contact" className="px-6 py-3 gradient-social-1 text-white font-bold rounded-xl inline-block">
                    Contact Us
                  </Link>
                  <a
                    href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-social-purple text-social-purple font-bold rounded-xl inline-block"
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

export default BellevueWA;
