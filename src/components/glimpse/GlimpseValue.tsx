
export const GlimpseValue = () => {
  return (
    <section className="py-32 bg-corporate-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-1 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-3 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-4 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🧭 Brand Proof
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            This Isn't Web Design.
            <br />
            It's <span className="text-gradient-3">Brand Proof</span>.
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-2xl text-corporate-gray leading-relaxed font-medium">
              Your website is supposed to <span className="text-gradient-1 font-bold">clarify what you do</span> — not confuse people.
            </p>
            <p className="text-2xl text-corporate-gray leading-relaxed font-medium">
              But most businesses wait until launch to realize something's off.
            </p>
            <div className="p-8 bg-video-white rounded-3xl video-shadow-lg">
              <h3 className="text-3xl font-display font-black text-corporate-dark mb-4">
                With The Glimpse, <span className="text-gradient-1">you don't wait</span>
              </h3>
              <p className="text-lg text-corporate-gray leading-relaxed">
                You get a visual prototype of your brand experience — one you can show to investors, embed in decks, use as a light funnel, or build content around.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="text-center p-12 gradient-social-2 rounded-3xl video-shadow-lg">
              <div className="text-6xl font-black text-white mb-4">✨</div>
              <div className="text-xl text-white font-bold mb-4">Clarity in a Bottle</div>
              <div className="text-white/90">
                And yes, it's beautiful.
              </div>
            </div>
            
            <div className="text-center p-8 bg-video-white rounded-3xl video-shadow">
              <h3 className="text-2xl font-display font-black text-corporate-dark mb-4">
                <span className="text-gradient-2">Visual prototype</span> of your brand experience
              </h3>
              <p className="text-lg text-corporate-gray">
                Show investors • Embed in decks • Light funnel • Content foundation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
