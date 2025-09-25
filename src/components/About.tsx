
export const About = () => {
  return (
    <main>
      <section id="about" className="py-16 sm:py-24 lg:py-32 relative z-10">        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* About Section - White Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
            <header className="text-center mb-12">
              <div className="inline-block px-6 py-3 bg-pal-green text-white font-bold text-lg mb-8 rounded-full video-shadow">
                👋 About Us
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight">
                Professional Video Production | <span className="text-pal-green">Seattle-Based Team</span>
              </h2>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
                Palmer House Productions creates high-impact video content for growing businesses and established brands.
              </p>
            </header>

            <div className="max-w-5xl mx-auto mb-16">
              <div className="bg-gray-50 rounded-2xl p-8 video-shadow">
                <p className="text-base md:text-lg text-corporate-gray leading-relaxed mb-8 text-center">
                  Founded with a vision to help businesses tell their stories authentically, Palmer House Productions combines <span className="text-pal-green font-bold">creative expertise</span> with strategic thinking.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-white rounded-xl video-shadow">
                    <div className="text-3xl mb-4 text-pal-green">✓</div>
                    <p className="text-base md:text-lg text-corporate-dark font-medium">Custom solutions</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl video-shadow">
                    <div className="text-3xl mb-4 text-pal-orange">✓</div>
                    <p className="text-base md:text-lg text-corporate-dark font-medium">Strategic approach</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl video-shadow">
                    <div className="text-3xl mb-4 text-pal-purple">✓</div>
                    <p className="text-base md:text-lg text-corporate-dark font-medium">Measurable results</p>
                  </div>
                </div>

                <div className="bg-pal-purple/10 rounded-xl p-8 border border-pal-purple/20">
                  <p className="text-base md:text-lg text-corporate-gray leading-relaxed text-center">
                    We create <span className="text-pal-purple font-bold">strategic video content</span> that drives business results. Your brand deserves more than generic content—it deserves <span className="text-pal-orange font-bold">professional storytelling</span> that converts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values - White Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
            <section className="mb-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-6">Our Approach</h2>
                <div className="w-32 h-1 bg-pal-blue mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group bg-gray-50 rounded-2xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">🗺️</div>
                    <h3 className="text-2xl font-bold text-pal-purple">Uncharted Paths</h3>
                  </div>
                  <p className="text-corporate-gray leading-relaxed text-lg">
                    We go beyond the ordinary. Every project is custom-built to discover and amplify your brand's authentic voice.
                  </p>
                </div>
                
                <div className="group bg-gray-50 rounded-2xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">🧭</div>
                    <h3 className="text-2xl font-bold text-pal-orange">True North</h3>
                  </div>
                  <p className="text-corporate-gray leading-relaxed text-lg">
                    Authenticity drives our content systems. We bring out the best in your business without changing who you are - just amplifying what makes you extraordinary.
                  </p>
                </div>
                
                <div className="group bg-gray-50 rounded-2xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">⛰️</div>
                    <h3 className="text-2xl font-bold text-pal-green">Strategic Solutions</h3>
                  </div>
                  <p className="text-corporate-gray leading-relaxed text-lg">
                    We're here to conquer real challenges - not just create pretty visuals. Every frame serves your business goals.
                  </p>
                </div>
                
                <div className="group bg-gray-50 rounded-2xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">🌟</div>
                    <h3 className="text-2xl font-bold text-pal-blue">Fearless Creativity</h3>
                  </div>
                  <p className="text-corporate-gray leading-relaxed text-lg">
                    We don't follow trends - we set them. Bold visuals, strong messaging, and a spark of the unexpected guide every project.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Founder Quote - White Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
            <section className="text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-8">Field Notes from the Founder</h2>
              <div className="relative max-w-4xl mx-auto">
                <div className="text-6xl text-pal-purple/30 absolute -top-4 -left-4">"</div>
                <blockquote className="text-xl md:text-2xl lg:text-3xl text-corporate-gray leading-relaxed italic mb-8 relative z-10">
                  I grew up knowing that stories could change lives—but only if told with truth, courage, and soul. Palmer House is more than a business. It's an invitation to <span className="text-pal-purple font-bold">explore boldly</span> and say what matters.
                </blockquote>
                <div className="text-6xl text-pal-purple/30 absolute -bottom-8 -right-4">"</div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-1 bg-pal-purple rounded-full"></div>
                <p className="text-pal-purple font-bold text-xl">Jevoy Palmer</p>
                <div className="w-16 h-1 bg-pal-purple rounded-full"></div>
              </div>
              <p className="text-corporate-gray text-base mt-2">Founder & Lead Creative Guide</p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};
