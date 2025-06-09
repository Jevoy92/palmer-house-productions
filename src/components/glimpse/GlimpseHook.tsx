
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
            Your Message Deserves <span className="text-gradient-2">More</span>
            <br />
            Than a Website.
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="p-8 bg-video-white rounded-3xl video-shadow">
              <h3 className="text-2xl font-display font-black text-corporate-dark mb-4">The Problem</h3>
              <p className="text-lg text-corporate-gray leading-relaxed">
                Most businesses never get to see what their brand could <span className="text-gradient-1 font-bold">feel like</span> to a customer.
                So they play it safe. Stay boxed in. Stay forgettable.
              </p>
            </div>
            
            <div className="p-8 bg-video-white rounded-3xl video-shadow">
              <h3 className="text-2xl font-display font-black text-corporate-dark mb-4">Our Solution</h3>
              <p className="text-lg text-corporate-gray leading-relaxed">
                At Palmer House, we don't just make videos. We <span className="text-gradient-2 font-bold">craft experiences</span>.
                The Glimpse is a high-touch, rapid session where we redesign your digital journey and bring it to life.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-block p-12 bg-video-white rounded-3xl video-shadow-lg">
              <div className="text-8xl mb-6">🪞</div>
              <h3 className="text-3xl font-display font-black text-corporate-dark mb-6">
                Without Code.
                <br />
                Without Commitment.
                <br />
                <span className="text-gradient-3">Without Waiting.</span>
              </h3>
              <p className="text-lg text-corporate-gray">
                See your brand vision come alive in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
