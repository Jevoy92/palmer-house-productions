
export const GlimpseWhy = () => {
  return (
    <section className="py-32 bg-video-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-5 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-2 rounded-full opacity-10 float-animation" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🎥 Why Palmer House?
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Strategy. Storytelling. <span className="text-gradient-1">Soul</span>.
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="p-8 bg-corporate-light rounded-3xl video-shadow">
              <p className="text-xl text-corporate-gray leading-relaxed font-medium">
                At Palmer House, we build <span className="text-gradient-2 font-bold">cinematic content</span> that solves business problems.
              </p>
            </div>
            
            <div className="p-8 bg-corporate-light rounded-3xl video-shadow">
              <p className="text-xl text-corporate-gray leading-relaxed font-medium">
                The Glimpse is how we help you <span className="text-gradient-3 font-bold">start strong</span> — long before we ever roll a camera.
              </p>
            </div>
            
            <div className="p-8 bg-corporate-light rounded-3xl video-shadow">
              <p className="text-xl text-corporate-gray leading-relaxed font-medium">
                We believe every brand deserves a <span className="text-gradient-1 font-bold">custom path forward</span> — not a template.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="p-12 gradient-social-4 rounded-3xl video-shadow-lg">
              <div className="text-6xl mb-6">🗺️</div>
              <h3 className="text-4xl font-display font-black text-white mb-6">
                If you're bold enough to explore,
                <br />
                <span className="text-white/90">we're ready to map it with you.</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
