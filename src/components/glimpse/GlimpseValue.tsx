
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
            🧭 True Value
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            This Isn't a Website.
            <br />
            It's a <span className="text-gradient-3">Compass</span>.
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-2xl text-corporate-gray leading-relaxed font-medium">
              Your brand will evolve. Your audience will shift. Your offers will change.
            </p>
            <p className="text-2xl text-corporate-gray leading-relaxed font-medium">
              You shouldn't need to rebuild everything from scratch each time.
            </p>
            <div className="p-8 bg-video-white rounded-3xl video-shadow-lg">
              <h3 className="text-3xl font-display font-black text-corporate-dark mb-4">
                The Glimpse gives you a <span className="text-gradient-1">living prototype</span>
              </h3>
              <p className="text-lg text-corporate-gray leading-relaxed">
                Something you can send to investors, embed in a pitch deck, share with partners, 
                or even use as a light funnel while you scale.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="text-center p-12 gradient-social-2 rounded-3xl video-shadow-lg">
              <div className="text-6xl font-black text-white mb-4">$2,500+</div>
              <div className="text-xl text-white font-bold mb-4">Traditional Value Per Year</div>
              <div className="text-white/90">
                Custom design + development + hosting + revisions
              </div>
            </div>
            
            <div className="text-center p-8 bg-video-white rounded-3xl video-shadow">
              <h3 className="text-2xl font-display font-black text-corporate-dark mb-4">
                A Glimpse helps you <span className="text-gradient-2">lead with clarity</span>
              </h3>
              <p className="text-lg text-corporate-gray">
                Even if you're still figuring it out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
