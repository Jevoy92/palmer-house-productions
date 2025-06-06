
export const About = () => {
  return (
    <section id="about" className="py-20 bg-warm-beige relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-beige via-light-sand to-cream-white"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-terracotta/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-brown/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block p-1 bg-gradient-to-r from-accent-terracotta to-warm-brown rounded-full mb-6">
            <div className="bg-cream-white rounded-full px-6 py-2">
              <span className="text-accent-terracotta font-semibold text-sm uppercase tracking-wider">About Us</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-deep-charcoal leading-tight">
            An Adventure Worth Taking—<br />
            <span className="text-accent-terracotta">Because Your Brand Deserves It.</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-2xl text-warm-brown font-light leading-relaxed">
              Palmer House Productions isn't just a video company.
            </p>
            <div className="w-24 h-1 bg-accent-terracotta mx-auto rounded-full"></div>
            <p className="text-xl text-muted-gray leading-relaxed">
              We're your creative expedition partners—guiding bold brands through a tailored, unforgettable content journey that's as intentional as it is impactful.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-cream-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-warm-brown/20">
            <p className="text-lg text-muted-gray leading-relaxed mb-8 text-center">
              Rooted in the rhythm of Kingston, Jamaica and grounded in the culture of the Pacific Northwest, our story blends faith, adventure, and storytelling into one seamless offering: helping businesses show up, stand out, and stay remembered.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-light-sand/50 rounded-xl border border-warm-brown/20">
                <div className="text-3xl mb-3 text-accent-terracotta">❌</div>
                <p className="text-lg text-deep-charcoal">We don't do mass production.</p>
              </div>
              <div className="text-center p-6 bg-light-sand/50 rounded-xl border border-warm-brown/20">
                <div className="text-3xl mb-3 text-accent-terracotta">❌</div>
                <p className="text-lg text-deep-charcoal">We don't do one-offs.</p>
              </div>
              <div className="text-center p-6 bg-light-sand/50 rounded-xl border border-warm-brown/20">
                <div className="text-3xl mb-3 text-accent-terracotta">❌</div>
                <p className="text-lg text-deep-charcoal">We don't do fluff.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent-terracotta/10 to-warm-brown/10 rounded-xl p-6 border border-accent-terracotta/20">
              <p className="text-lg text-muted-gray leading-relaxed text-center">
                We create subscription-based video systems for business owners ready to move beyond the basics. You deserve more than just content. You deserve custom strategy, cinematic presence, and the confidence of knowing that every second on screen was crafted with purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Core Beliefs */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-deep-charcoal mb-4">Our Core Beliefs</h3>
            <div className="w-32 h-1 bg-accent-terracotta mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-cream-white/60 backdrop-blur-sm rounded-2xl p-8 border border-warm-brown/30 hover:border-accent-terracotta/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">⭐</div>
                <h4 className="text-2xl font-semibold text-accent-terracotta">Exclusivity</h4>
              </div>
              <p className="text-muted-gray leading-relaxed">
                You're not here for generic. Neither are we. Every package we offer is custom-built to suit your business needs—and no two clients get the same treatment.
              </p>
            </div>
            
            <div className="group bg-cream-white/60 backdrop-blur-sm rounded-2xl p-8 border border-warm-brown/30 hover:border-accent-terracotta/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🎯</div>
                <h4 className="text-2xl font-semibold text-accent-terracotta">Authenticity</h4>
              </div>
              <p className="text-muted-gray leading-relaxed">
                You won't find marketing jargon here. Just clear direction, real talk, and results that feel like you. Our process brings out the best in you without changing who you are.
              </p>
            </div>
            
            <div className="group bg-cream-white/60 backdrop-blur-sm rounded-2xl p-8 border border-warm-brown/30 hover:border-accent-terracotta/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🔧</div>
                <h4 className="text-2xl font-semibold text-accent-terracotta">Solutions-Focused</h4>
              </div>
              <p className="text-muted-gray leading-relaxed">
                We're here to solve real business problems—not just make things look pretty. Whether you need leads, loyalty, or a louder voice online, we'll build the path to get you there.
              </p>
            </div>
            
            <div className="group bg-cream-white/60 backdrop-blur-sm rounded-2xl p-8 border border-warm-brown/30 hover:border-accent-terracotta/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🎨</div>
                <h4 className="text-2xl font-semibold text-accent-terracotta">Passionately Creative</h4>
              </div>
              <p className="text-muted-gray leading-relaxed">
                Strategy is our map. Creativity is the compass. We don't follow trends—we design what your brand needs to thrive, with bold visuals, strong messaging, and a spark of the unexpected.
              </p>
            </div>
          </div>
        </div>

        {/* Why Clients Choose Us */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-deep-charcoal mb-6">Why Clients Choose Us</h3>
            <div className="space-y-4">
              <p className="text-2xl text-muted-gray">Because we don't just make videos.</p>
              <p className="text-3xl text-accent-terracotta font-bold">We build experiences.</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-light-sand/60 to-cream-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-warm-brown/30">
            <p className="text-lg text-muted-gray leading-relaxed text-center">
              Our clients often say they felt more confident than expected, had more fun than they thought possible, and were genuinely impressed with the quality and ease of our process. Whether you're a solopreneur stepping on camera for the first time, or a fast-scaling company needing monthly branded series—we create a content rhythm that fits you.
            </p>
          </div>
        </div>

        {/* Founder Quote */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-accent-terracotta/10 via-warm-brown/5 to-accent-terracotta/10 rounded-2xl p-8 md:p-12 border border-accent-terracotta/30">
            <h3 className="text-3xl font-bold text-deep-charcoal mb-8">A Note From the Founder</h3>
            <div className="relative">
              <div className="text-6xl text-accent-terracotta/30 absolute -top-4 -left-4">"</div>
              <blockquote className="text-xl text-muted-gray leading-relaxed italic mb-8 relative z-10">
                I grew up knowing that stories could change lives—but only if told with truth, style, and soul. Palmer House is more than a business. It's an invitation to show up boldly and say what matters.
              </blockquote>
              <div className="text-6xl text-accent-terracotta/30 absolute -bottom-8 -right-4">"</div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-1 bg-accent-terracotta rounded-full"></div>
              <p className="text-accent-terracotta font-semibold text-lg">Jevoy Palmer</p>
              <div className="w-16 h-1 bg-accent-terracotta rounded-full"></div>
            </div>
            <p className="text-muted-gray text-sm mt-2">Founder & Lead Creative Guide</p>
          </div>
        </div>
      </div>
    </section>
  );
};
