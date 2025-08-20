
export const About = () => {
  return (
    <main>
      <section id="about" className="py-32 bg-corporate-light relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 gradient-social-1 rounded-full opacity-10 float-animation"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 gradient-social-3 rounded-full opacity-10 float-animation" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <header className="text-center mb-16">
            <div className="inline-block px-4 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-6 video-shadow mobile-touch-target">
              👋 About Us
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black mb-6 text-corporate-dark tracking-tight">
              Professional Video Production | <span className="text-gradient-1">Seattle-Based Team</span>
            </h2>
            <p className="text-base md:text-lg text-corporate-gray max-w-3xl mx-auto font-medium leading-relaxed">
              Palmer House Productions creates high-impact video content for growing businesses and established brands.
            </p>
          </header>

        <div className="max-w-7xl mx-auto mb-16">
          <div className="bg-video-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 video-shadow">
            <p className="text-base md:text-lg text-corporate-gray leading-relaxed mb-6 text-center">
              Founded with a vision to help businesses tell their stories authentically, Palmer House Productions combines <span className="text-gradient-3 font-bold">creative expertise</span> with strategic thinking.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-corporate-light/50 rounded-xl mobile-touch-target">
                <div className="text-2xl mb-2 text-gradient-1">✓</div>
                <p className="text-sm md:text-base text-corporate-dark font-medium">Custom solutions</p>
              </div>
              <div className="text-center p-4 bg-corporate-light/50 rounded-xl mobile-touch-target">
                <div className="text-2xl mb-2 text-gradient-2">✓</div>
                <p className="text-sm md:text-base text-corporate-dark font-medium">Strategic approach</p>
              </div>
              <div className="text-center p-4 bg-corporate-light/50 rounded-xl mobile-touch-target">
                <div className="text-2xl mb-2 text-gradient-3">✓</div>
                <p className="text-sm md:text-base text-corporate-dark font-medium">Measurable results</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-xl p-6 border border-social-purple/20">
              <p className="text-sm md:text-base text-corporate-gray leading-relaxed text-center">
                We create <span className="text-gradient-1 font-bold">strategic video content</span> that drives business results. Your brand deserves more than generic content—it deserves <span className="text-gradient-2 font-bold">professional storytelling</span> that converts.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-black text-corporate-dark mb-6">Our Approach</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-social-purple to-social-pink mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            <div className="group bg-video-white/80 backdrop-blur-sm rounded-3xl p-10 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🎯</div>
                <h3 className="text-2xl font-bold text-gradient-1">Custom Solutions</h3>
              </div>
              <p className="text-corporate-gray leading-relaxed text-lg">
                We go beyond the ordinary. Every project is custom-built to develop and amplify your brand's authentic voice.
              </p>
            </div>
            
            <div className="group bg-video-white/80 backdrop-blur-sm rounded-3xl p-10 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🧭</div>
                <h3 className="text-2xl font-bold text-gradient-2">True North</h3>
              </div>
              <p className="text-corporate-gray leading-relaxed text-lg">
                Authenticity drives our content systems. We bring out the best in your business without changing who you are - just amplifying what makes you extraordinary.
              </p>
            </div>
            
            <div className="group bg-video-white/80 backdrop-blur-sm rounded-3xl p-10 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">⛰️</div>
                <h3 className="text-2xl font-bold text-gradient-3">Strategic Solutions</h3>
              </div>
              <p className="text-corporate-gray leading-relaxed text-lg">
                We're here to conquer real challenges - not just create pretty visuals. Every frame serves your business goals.
              </p>
            </div>
            
            <div className="group bg-video-white/80 backdrop-blur-sm rounded-3xl p-10 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🌟</div>
                <h3 className="text-2xl font-bold text-gradient-1">Fearless Creativity</h3>
              </div>
              <p className="text-corporate-gray leading-relaxed text-lg">
                We don't follow trends - we set them. Bold visuals, strong messaging, and a spark of the unexpected drive every project.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Quote */}
        <section className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-social-purple/10 via-social-pink/5 to-social-cyan/10 rounded-3xl p-12 video-shadow-lg border border-social-purple/20">
            <h2 className="text-4xl font-display font-black text-corporate-dark mb-8">Field Notes from the Founder</h2>
            <div className="relative">
              <div className="text-6xl text-social-purple/30 absolute -top-4 -left-4">"</div>
              <blockquote className="text-2xl text-corporate-gray leading-relaxed italic mb-8 relative z-10">
                I grew up knowing that stories could change lives—but only if told with truth, courage, and soul. Palmer House is more than a business. It's an invitation to <span className="text-gradient-2 font-bold">create boldly</span> and say what matters.
              </blockquote>
              <div className="text-6xl text-social-purple/30 absolute -bottom-8 -right-4">"</div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-1 bg-gradient-to-r from-social-purple to-social-pink rounded-full"></div>
              <p className="text-gradient-1 font-bold text-xl">Jevoy Palmer</p>
              <div className="w-16 h-1 bg-gradient-to-r from-social-purple to-social-pink rounded-full"></div>
            </div>
            <p className="text-corporate-gray text-sm mt-2">Founder & Creative Director</p>
          </div>
        </section>
        </div>
      </section>
    </main>
  );
};
