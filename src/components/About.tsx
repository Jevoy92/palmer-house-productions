
export const About = () => {
  return (
    <main>
      <section id="about" className="py-[clamp(4rem,12vw,8rem)] relative z-10">        
        <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2rem)] relative z-10">
          {/* About Section - White Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-[clamp(2rem,8vw,4rem)] video-shadow-xl mb-[clamp(3rem,8vw,3rem)]">
            <header className="text-center mb-[clamp(3rem,8vw,3rem)]">
              <div className="inline-block px-6 py-3 bg-pal-green text-white font-bold text-[clamp(1rem,2.5vw,1.125rem)] mb-[clamp(2rem,5vw,2rem)] rounded-full video-shadow">
                👋 About Us
              </div>
              <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-black mb-6 text-corporate-dark tracking-tight">
                Professional Video Production | <span className="text-pal-green">Seattle-Based Team</span>
              </h2>
              <p className="text-[clamp(1.125rem,3vw,1.25rem)] text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
                Palmer House Productions creates high-impact video content for growing businesses and established brands.
              </p>
            </header>

            <div className="max-w-5xl mx-auto mb-[clamp(4rem,10vw,4rem)]">
              <div className="bg-muted rounded-2xl p-[clamp(2rem,6vw,2rem)] video-shadow">
                <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-corporate-gray leading-relaxed mb-[clamp(2rem,5vw,2rem)] text-center">
                  Founded with a vision to help businesses tell their stories authentically, Palmer House Productions combines <span className="text-pal-green font-bold">creative expertise</span> with strategic thinking.
                </p>
                
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-[clamp(2rem,5vw,2rem)]">
                  <div className="text-center p-6 bg-white rounded-xl video-shadow">
                    <div className="text-[clamp(2rem,4vw,3rem)] mb-4 text-pal-green">✓</div>
                    <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-corporate-dark font-medium">Custom solutions</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl video-shadow">
                    <div className="text-[clamp(2rem,4vw,3rem)] mb-4 text-pal-orange">✓</div>
                    <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-corporate-dark font-medium">Strategic approach</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-xl video-shadow">
                    <div className="text-[clamp(2rem,4vw,3rem)] mb-4 text-pal-purple">✓</div>
                    <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-corporate-dark font-medium">Measurable results</p>
                  </div>
                </div>

                <div className="bg-pal-purple/10 rounded-xl p-[clamp(2rem,6vw,2rem)] border border-pal-purple/20">
                  <p className="text-[clamp(1rem,2.5vw,1.125rem)] text-corporate-gray leading-relaxed text-center">
                    We create <span className="text-pal-purple font-bold">strategic video content</span> that drives business results. Your brand deserves more than generic content—it deserves <span className="text-pal-orange font-bold">professional storytelling</span> that converts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values - White Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-[clamp(2rem,8vw,4rem)] video-shadow-xl mb-[clamp(3rem,8vw,3rem)]">
            <section className="mb-[clamp(3rem,8vw,3rem)]">
              <div className="text-center mb-[clamp(4rem,10vw,4rem)]">
                <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-black text-corporate-dark mb-6">Our Approach</h2>
                <div className="w-32 h-1 bg-pal-blue mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(2rem,5vw,2rem)]">
                <div className="group bg-muted rounded-2xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">🗺️</div>
                    <h3 className="text-2xl font-bold text-pal-purple">Uncharted Paths</h3>
                  </div>
                  <p className="text-corporate-gray leading-relaxed text-lg">
                    We go beyond the ordinary. Every project is custom-built to discover and amplify your brand's authentic voice.
                  </p>
                </div>
                
                <div className="group bg-muted rounded-2xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">🧭</div>
                    <h3 className="text-2xl font-bold text-pal-orange">True North</h3>
                  </div>
                  <p className="text-corporate-gray leading-relaxed text-lg">
                    Authenticity drives our content systems. We bring out the best in your business without changing who you are - just amplifying what makes you extraordinary.
                  </p>
                </div>
                
                <div className="group bg-muted rounded-2xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">⛰️</div>
                    <h3 className="text-2xl font-bold text-pal-green">Strategic Solutions</h3>
                  </div>
                  <p className="text-corporate-gray leading-relaxed text-lg">
                    We're here to conquer real challenges - not just create pretty visuals. Every frame serves your business goals.
                  </p>
                </div>
                
                <div className="group bg-muted rounded-2xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02]">
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
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-[clamp(2rem,8vw,4rem)] video-shadow-xl">
            <section className="text-center">
              <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-black text-corporate-dark mb-[clamp(2rem,5vw,2rem)]">Field Notes from the Founder</h2>
              <div className="relative max-w-4xl mx-auto">
                <div className="text-[clamp(3rem,8vw,6rem)] text-pal-purple/30 absolute -top-4 -left-4">"</div>
                <blockquote className="text-[clamp(1.25rem,4vw,2rem)] text-corporate-gray leading-relaxed italic mb-[clamp(2rem,5vw,2rem)] relative z-10">
                  I grew up knowing that stories could change lives—but only if told with truth, courage, and soul. Palmer House is more than a business. It's an invitation to <span className="text-pal-purple font-bold">explore boldly</span> and say what matters.
                </blockquote>
                <div className="text-[clamp(3rem,8vw,6rem)] text-pal-purple/30 absolute -bottom-8 -right-4">"</div>
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
