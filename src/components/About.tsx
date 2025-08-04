
export const About = () => {
  return (
    <main>
      <section id="about" className="py-32 bg-corporate-light relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 gradient-social-1 rounded-full opacity-10 float-animation"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 gradient-social-3 rounded-full opacity-10 float-animation" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="text-center mb-24">
            <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
              🌍 Our Origin Story
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
              Meet Palmer House Productions | <span className="text-gradient-1">Video Production Team</span>
            </h1>
            <p className="text-2xl text-corporate-gray max-w-4xl mx-auto font-medium leading-tight">
              Palmer House Productions isn't just a video company.
              <br />
              We're your <span className="text-gradient-2 font-bold">creative expedition partners</span> - charting new territories in visual storytelling.
            </p>
          </header>

        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-video-white/80 backdrop-blur-sm rounded-3xl p-12 video-shadow">
            <p className="text-xl text-corporate-gray leading-relaxed mb-8 text-center">
              Raised where culture, rhythm, and resilience converge in Kingston, Jamaica, I've always believed stories are made to be <span className="text-gradient-3 font-bold">discovered</span> - not manufactured.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-corporate-light/50 rounded-2xl">
                <div className="text-3xl mb-3 text-gradient-1">❌</div>
                <p className="text-lg text-corporate-dark font-medium">We don't follow templates.</p>
              </div>
              <div className="text-center p-6 bg-corporate-light/50 rounded-2xl">
                <div className="text-3xl mb-3 text-gradient-2">❌</div>
                <p className="text-lg text-corporate-dark font-medium">We don't take safe routes.</p>
              </div>
              <div className="text-center p-6 bg-corporate-light/50 rounded-2xl">
                <div className="text-3xl mb-3 text-gradient-3">❌</div>
                <p className="text-lg text-corporate-dark font-medium">We don't blend in.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-2xl p-8 border border-social-purple/20">
              <p className="text-xl text-corporate-gray leading-relaxed text-center">
                We chart <span className="text-gradient-1 font-bold">new creative territory</span> with every project. You deserve more than content. You deserve a <span className="text-gradient-2 font-bold">visual identity as bold</span> as your brand's journey.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-black text-corporate-dark mb-6">Our Explorer's Code</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-social-purple to-social-pink mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-video-white/80 backdrop-blur-sm rounded-3xl p-10 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🗺️</div>
                <h3 className="text-2xl font-bold text-gradient-1">Uncharted Paths</h3>
              </div>
              <p className="text-corporate-gray leading-relaxed text-lg">
                We venture where others won't go. Every project is a unique expedition, custom-built to discover your brand's authentic voice.
              </p>
            </div>
            
            <div className="group bg-video-white/80 backdrop-blur-sm rounded-3xl p-10 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🧭</div>
                <h3 className="text-2xl font-bold text-gradient-2">True North</h3>
              </div>
              <p className="text-corporate-gray leading-relaxed text-lg">
                Authenticity is our compass. We bring out the best in you without changing who you are - just amplifying what makes you extraordinary.
              </p>
            </div>
            
            <div className="group bg-video-white/80 backdrop-blur-sm rounded-3xl p-10 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">⛰️</div>
                <h3 className="text-2xl font-bold text-gradient-3">Summit Solutions</h3>
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
                We don't follow trends - we blaze trails. Bold visuals, strong messaging, and a spark of the unexpected guide every expedition.
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
                I grew up knowing that stories could change lives—but only if told with truth, courage, and soul. Palmer House is more than a business. It's an invitation to <span className="text-gradient-2 font-bold">explore boldly</span> and say what matters.
              </blockquote>
              <div className="text-6xl text-social-purple/30 absolute -bottom-8 -right-4">"</div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-1 bg-gradient-to-r from-social-purple to-social-pink rounded-full"></div>
              <p className="text-gradient-1 font-bold text-xl">Jevoy Palmer</p>
              <div className="w-16 h-1 bg-gradient-to-r from-social-purple to-social-pink rounded-full"></div>
            </div>
            <p className="text-corporate-gray text-sm mt-2">Founder & Lead Creative Guide</p>
          </div>
        </section>
        </div>
      </section>
    </main>
  );
};
