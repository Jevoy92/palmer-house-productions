
export const Services = () => {
  return (
    <section id="services" className="bg-black text-white py-24 relative">
      <div className="absolute top-0 right-8 bottom-0 w-px bg-gray-800 hidden md:block">
        <div className="h-24 w-px bg-primary animate-pulse"></div>
      </div>
      <div className="container mx-auto px-6">
        <div id="services-header" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="pt-2">
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-300">Services</span>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-6 text-white">Our services are built to help founders grow smarter, move faster, and build with clarity.</h2>
            <span className="text-social-orange font-semibold group inline-flex items-center cursor-pointer hover:text-social-orange/80 transition-colors">
              See pricing
              <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>

        <div id="services-list" className="space-y-16">
          <div id="service-content-systems" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-t border-gray-800 pt-16">
            <h3 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-white">Content systems</h3>
            <ul className="space-y-4 text-lg text-white">
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>30 Reels in 30 Days</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Customer-facing FAQ videos</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Internal SOP & onboarding videos</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Evergreen YouTube strategy</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Content Calendars</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Social cutdowns (Reels, TikTok, Shorts)</span>
              </li>
            </ul>
          </div>

          <div id="service-content-strategy" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-t border-gray-800 pt-16">
            <h3 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-white">Content strategy</h3>
            <ul className="space-y-4 text-lg text-white">
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Founder Script Bundle</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Tone of voice guidelines</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Video Strategy Blueprint</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>On-Camera Confidence training</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Group Coaching: The Camera-Ready Brain</span>
              </li>
            </ul>
          </div>

          <div id="service-brand-identity" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-t border-gray-800 pt-16">
            <h3 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-white">Brand identity</h3>
            <ul className="space-y-4 text-lg text-white">
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Founder "About Me" films</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Brand story and positioning videos</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Social proof and testimonial films</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Recruitment & culture capsules</span>
              </li>
              <li className="flex items-start">
                <svg className="text-social-orange mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Event recaps</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
