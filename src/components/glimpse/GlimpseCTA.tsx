
export const GlimpseCTA = () => {
  return (
    <section className="py-32 bg-corporate-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-1 rounded-full opacity-10 float-animation"></div>
        <div className="absolute top-40 right-20 w-32 h-32 gradient-social-2 rounded-full opacity-15 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 gradient-social-3 rounded-full opacity-10 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 gradient-social-4 rounded-full opacity-12 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="mb-16">
          <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            📍 Ready to Begin?
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-white tracking-tight">
            Ready to see what your brand <span className="text-gradient-1">could feel like?</span>
          </h2>
        </div>
        
        <div className="bg-video-white rounded-3xl p-12 mb-16 video-shadow-lg">
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button className="px-12 py-6 gradient-social-1 text-white font-bold text-xl rounded-3xl hover:scale-105 transition-all duration-300 video-shadow">
              Book Your Glimpse →
            </button>
            <button className="px-12 py-6 border-2 border-social-purple text-social-purple font-bold text-xl rounded-3xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow">
              Talk to Us First
            </button>
          </div>
          
          <div className="text-lg text-corporate-gray">
            <span className="font-bold">Stripe payment + Calendly booking</span> for instant access
            <br />
            or <span className="font-bold">Discovery Call</span> to explore your vision first
          </div>
        </div>
        
        <footer className="border-t border-corporate-gray pt-8">
          <p className="text-corporate-light">
            © 2024 Palmer House Productions. All rights reserved. Mapping journeys, creating glimpses.
          </p>
        </footer>
      </div>
    </section>
  );
};
