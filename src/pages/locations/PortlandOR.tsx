import { Navigation } from "@/components/Navigation";
import { MainContent } from "@/components/MainContent";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Link } from "react-router-dom";
import { LocationStructuredData } from "@/components/seo/LocationStructuredData";
import { FAQSchema } from "@/components/seo/FAQSchema";

const PortlandOR = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="Portland Video Production Studio | Palmer House Productions"
        description="Portland, OR video production for brands that want results. Studio and on-location shoots, editing, and strategy—serving clients globally."
        keywords="Portland video production, Oregon video studio, corporate video Portland, brand storytelling Portland"
        ogTitle="Portland, OR Video Production | Palmer House Productions"
        ogDescription="Cinematic video production in Portland, serving Oregon and global clients."
        canonicalUrl="https://www.palmerhouseproductions.com/locations/portland-or"
      />
      <StructuredData type="services" />
      <LocationStructuredData
        city="Portland"
        region="OR"
        canonicalUrl="https://www.palmerhouseproductions.com/locations/portland-or"
      />
      <FAQSchema
        faqs={[
          { question: 'Which areas around Portland do you cover?', answer: 'Metro Portland plus Beaverton, Lake Oswego, Tigard, Gresham, Salem, Bend, and the Oregon Coast. Remote collaboration is available.' },
          { question: 'Do you travel for shoots?', answer: 'Yes — local travel is included, and extended coverage across Oregon and the Pacific Northwest is available.' },
          { question: 'What types of projects fit best?', answer: 'Brand storytelling, social authority systems, internal training libraries, testimonials, and launch content.' },
          { question: 'How fast can we start?', answer: 'Immediately. Book a strategy call and we’ll align on scope, timeline, and the right content system.' },
          { question: 'Is long-form YouTube included?', answer: 'YouTube long-form is a separate ongoing plan. Social and brand assets are covered in our monthly and bundle systems.' }
        ]}
      />
      <Navigation />
      <MainContent>
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 gradient-subtle-1 opacity-30"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <BreadcrumbNavigation />
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 text-corporate-dark tracking-tight">
              Portland, OR Video Production
            </h1>
            <p className="text-lg md:text-xl text-corporate-gray max-w-3xl mb-12">
              Our Portland studio partners with local Oregon companies as well as remote-first and global teams. We build content systems—not one-off videos.
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
                <p className="text-corporate-gray mb-4">Tell us about your next shoot or system. We'll recommend the best path.</p>
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

            {/* Oregon Service Areas */}
            <div className="bg-white rounded-2xl video-shadow p-8 mb-20">
              <h2 className="text-3xl font-bold text-corporate-dark mb-6">Oregon Service Coverage</h2>
              <p className="text-lg text-corporate-gray mb-6">
                From our Portland base, we serve businesses throughout Oregon and the Pacific Northwest with comprehensive video production services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Metro Portland</h3>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>Downtown Portland</li>
                    <li>Beaverton & Tigard</li>
                    <li>Lake Oswego & Milwaukie</li>
                    <li>Gresham & East Portland</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Production Options</h3>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>Professional studio space</li>
                    <li>Corporate office filming</li>
                    <li>Outdoor location shoots</li>
                    <li>Multi-location projects</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Extended Coverage</h3>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>Salem & Mid-Valley</li>
                    <li>Bend & Central Oregon</li>
                    <li>Coastal regions</li>
                    <li>Remote collaboration</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Content Systems Focus */}
            <div className="bg-white rounded-2xl video-shadow p-8 mb-20">
              <h2 className="text-3xl font-bold text-corporate-dark mb-6">Content Systems, Not One-Offs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-4">Scalable Video Programs</h3>
                  <p className="text-corporate-gray mb-4">
                    We specialize in building sustainable content systems that grow with your business. Instead of isolated videos, we create frameworks for ongoing content production.
                  </p>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>• Monthly content production schedules</li>
                    <li>• Branded video templates and styles</li>
                    <li>• Training libraries that expand over time</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-4">Remote-First Approach</h3>
                  <p className="text-corporate-gray mb-4">
                    Working with distributed teams across time zones? We've built our processes to support seamless collaboration whether you're local or global.
                  </p>
                  <ul className="space-y-2 text-corporate-gray">
                    <li>• Cloud-based review and approval</li>
                    <li>• Flexible scheduling across time zones</li>
                    <li>• Digital-first delivery systems</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Investment & Process */}
            <div className="bg-white rounded-2xl video-shadow p-8">
              <h2 className="text-3xl font-bold text-corporate-dark mb-6">Investment & Timeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-4">Project Types</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-social-purple pl-4">
                      <h4 className="font-semibold text-corporate-dark">Single Videos</h4>
                      <p className="text-sm text-corporate-gray">Starting at $500</p>
                    </div>
                    <div className="border-l-4 border-social-purple pl-4">
                      <h4 className="font-semibold text-corporate-dark">Video Packages</h4>
                      <p className="text-sm text-corporate-gray">Starting at $2,500</p>
                    </div>
                    <div className="border-l-4 border-social-purple pl-4">
                      <h4 className="font-semibold text-corporate-dark">Business Video Assets</h4>
                      <p className="text-sm text-corporate-gray">Starting at $4,500</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-4">Timeline</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-corporate-dark">Discovery & Planning</h4>
                      <p className="text-sm text-corporate-gray">1-2 weeks</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-corporate-dark">Production</h4>
                      <p className="text-sm text-corporate-gray">1-3 days filming</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-corporate-dark">Post-Production</h4>
                      <p className="text-sm text-corporate-gray">2-4 weeks editing</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-4">What's Included</h3>
                  <ul className="space-y-2 text-sm text-corporate-gray">
                    <li>• Pre-production planning</li>
                    <li>• Professional crew & equipment</li>
                    <li>• Multiple format delivery</li>
                    <li>• Two rounds of revisions</li>
                    <li>• Cloud-based asset delivery</li>
                    <li>• Usage rights included</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default PortlandOR;