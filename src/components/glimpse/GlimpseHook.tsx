
export const GlimpseHook = () => {
  return (
    <section className="py-32 bg-corporate-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-3 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-1 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Your Business Has a Story.
            <br />
            Your Website Should <span className="text-gradient-2">Tell It</span>.
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="p-8 bg-video-white rounded-3xl video-shadow">
              <p className="text-lg text-corporate-gray leading-relaxed">
                Most websites feel like <span className="text-gradient-1 font-bold">generic templates</span> — because they are.
              </p>
            </div>
            
            <div className="p-8 bg-video-white rounded-3xl video-shadow">
              <p className="text-lg text-corporate-gray leading-relaxed">
                The Glimpse is a guided 1:1 session where we <span className="text-gradient-2 font-bold">reimagine your brand's digital presence</span> live on screen.
              </p>
            </div>
            
            <div className="p-8 bg-video-white rounded-3xl video-shadow">
              <p className="text-lg text-corporate-gray leading-relaxed">
                Think: a personal strategist meets product designer — <span className="text-gradient-3 font-bold">in the style of a Palmer House film</span>.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-block p-12 bg-video-white rounded-3xl video-shadow-lg">
              <div className="text-8xl mb-6">🎬</div>
              <h3 className="text-3xl font-display font-black text-corporate-dark mb-6">
                You'll walk away with a shareable, clickable prototype
              </h3>
              <p className="text-lg text-corporate-gray">
                <span className="text-gradient-1 font-bold">So good, some people use it as their actual site.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
