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
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 gradient-subtle-1 opacity-30"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <BreadcrumbNavigation />
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 text-corporate-dark tracking-tight">
              Bellevue, WA Video Production
            </h1>
            <p className="text-lg md:text-xl text-corporate-gray max-w-3xl mb-12">
              Our Bellevue studio serves the greater Seattle area—and we regularly partner with clients around the world. From discovery to delivery, we craft
              cinematic stories that drive results.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
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

            {/* Local Service Areas */}
            <div className="bg-white rounded-2xl video-shadow p-8 mb-20">
              <h2 className="text-3xl font-bold text-corporate-dark mb-6">Seattle Metro Service Area</h2>
              <p className="text-lg text-corporate-gray mb-6">
                Based in Bellevue, we serve the entire Seattle metropolitan area with both studio and on-location production services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Primary Service Areas</h3>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>Bellevue & Eastside</li>
                    <li>Seattle & Downtown</li>
                    <li>Redmond & Tech Corridor</li>
                    <li>Kirkland & Bothell</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Studio vs On-Location</h3>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>Professional studio setup</li>
                    <li>On-site at your office</li>
                    <li>Event documentation</li>
                    <li>Remote collaboration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Travel Range</h3>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>30-mile radius included</li>
                    <li>Pacific Northwest region</li>
                    <li>National projects available</li>
                    <li>Global remote support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Local Advantages */}
            <div className="bg-white rounded-2xl video-shadow p-8 mb-20">
              <h2 className="text-3xl font-bold text-corporate-dark mb-6">Why Choose Local Video Production</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-4">Local Market Knowledge</h3>
                  <p className="text-corporate-gray mb-4">
                    We understand the Seattle business landscape, from tech startups to established enterprises. This local insight helps us create content that resonates with your Pacific Northwest audience.
                  </p>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>• Familiar with local business culture</li>
                    <li>• Knowledge of regional regulations</li>
                    <li>• Understanding of tech industry needs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-4">Responsive Partnership</h3>
                  <p className="text-corporate-gray mb-4">
                    Being local means faster response times, easier collaboration, and the ability to handle last-minute changes or rush projects when needed.
                  </p>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>• Same-day consultation availability</li>
                    <li>• Quick turnaround on urgent projects</li>
                    <li>• Face-to-face planning meetings</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Process Overview */}
            <div className="bg-white rounded-2xl video-shadow p-8">
              <h2 className="text-3xl font-bold text-corporate-dark mb-6">Our Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-social-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                  <h3 className="font-bold text-corporate-dark mb-2">Discovery Call</h3>
                  <p className="text-sm text-corporate-gray">We discuss your goals, timeline, and budget to recommend the best approach.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-social-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                  <h3 className="font-bold text-corporate-dark mb-2">Strategy & Planning</h3>
                  <p className="text-sm text-corporate-gray">We develop a comprehensive plan including scripts, shot lists, and production timeline.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-social-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                  <h3 className="font-bold text-corporate-dark mb-2">Production</h3>
                  <p className="text-sm text-corporate-gray">Professional filming at our studio or your location with full crew and equipment.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-social-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                  <h3 className="font-bold text-corporate-dark mb-2">Delivery</h3>
                  <p className="text-sm text-corporate-gray">Professional editing, color correction, and delivery in all formats you need.</p>
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
