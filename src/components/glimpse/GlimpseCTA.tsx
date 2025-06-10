
import { GlimpseContactForm } from "./GlimpseContactForm";

export const GlimpseCTA = () => {
  const handleDiscoveryCall = () => {
    window.open('https://calendly.com/palmerhouseproductions-info/discovery-call', '_blank');
  };

  return (
    <section className="py-32 bg-corporate-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-1 rounded-full opacity-10 float-animation"></div>
        <div className="absolute top-40 right-20 w-32 h-32 gradient-social-2 rounded-full opacity-15 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 gradient-social-3 rounded-full opacity-10 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 gradient-social-4 rounded-full opacity-12 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-white tracking-tight">
            Your Audience Is Waiting for the
            <br />
            <span className="text-gradient-1">Best Version of You</span>.
          </h2>
          <p className="text-2xl text-white/80 mb-8">Let's Show Them.</p>
        </div>
        
        <div className="mb-16">
          <GlimpseContactForm />
        </div>
        
        <div className="text-center mb-8">
          <div className="inline-block px-8 py-4 bg-video-white/10 rounded-2xl border border-white/20">
            <p className="text-white/80 text-lg">
              <span className="font-bold">Prefer to talk first?</span>
              <br />
              <button 
                onClick={handleDiscoveryCall}
                className="text-gradient-1 font-bold hover:underline mt-2"
              >
                Schedule a Discovery Call →
              </button>
            </p>
          </div>
        </div>
        
        <div className="mb-8 p-8 bg-video-white/10 rounded-2xl border border-white/20">
          <h3 className="text-2xl font-display font-black text-white mb-4">A Palmer House Production</h3>
          <p className="text-white/80 text-lg leading-relaxed">
            The Glimpse is an immersive brand clarity session brought to you by Palmer House Productions — where story, style, and strategy meet.
          </p>
          <p className="text-white/60 italic mt-4">
            "We don't build websites. We reveal what's possible."
          </p>
        </div>
        
        <footer className="border-t border-white/20 pt-8">
          <div className="text-center space-y-2">
            <p className="text-white/80 font-medium">
              📧 information@palmerhouseproductions.com | 📞 425-738-7312
            </p>
            <p className="text-white/60">
              © 2024 Palmer House Productions. All rights reserved. Mapping journeys, creating glimpses.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};
