
export const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            An Adventure Worth Taking—Because Your Brand Deserves It.
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Palmer House Productions isn't just a video company.
          </p>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mt-6 leading-relaxed">
            We're your creative expedition partners—guiding bold brands through a tailored, unforgettable content journey that's as intentional as it is impactful.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Rooted in the rhythm of Kingston, Jamaica and grounded in the culture of the Pacific Northwest, our story blends faith, adventure, and storytelling into one seamless offering: helping businesses show up, stand out, and stay remembered.
          </p>
          
          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">We don't do mass production.</p>
            <p className="text-lg text-gray-300 leading-relaxed">We don't do one-offs.</p>
            <p className="text-lg text-gray-300 leading-relaxed">We don't do fluff.</p>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed">
            We create subscription-based video systems for business owners ready to move beyond the basics. You deserve more than just content. You deserve custom strategy, cinematic presence, and the confidence of knowing that every second on screen was crafted with purpose.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Core Beliefs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="text-xl font-semibold mb-3 text-amber-400">Exclusivity</h4>
              <p className="text-gray-400 leading-relaxed">
                You're not here for generic. Neither are we. Every package we offer is custom-built to suit your business needs—and no two clients get the same treatment.
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold mb-3 text-amber-400">Authenticity</h4>
              <p className="text-gray-400 leading-relaxed">
                You won't find marketing jargon here. Just clear direction, real talk, and results that feel like you. Our process brings out the best in you without changing who you are.
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🔧</div>
              <h4 className="text-xl font-semibold mb-3 text-amber-400">Solutions-Focused</h4>
              <p className="text-gray-400 leading-relaxed">
                We're here to solve real business problems—not just make things look pretty. Whether you need leads, loyalty, or a louder voice online, we'll build the path to get you there.
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="text-xl font-semibold mb-3 text-amber-400">Passionately Creative</h4>
              <p className="text-gray-400 leading-relaxed">
                Strategy is our map. Creativity is the compass. We don't follow trends—we design what your brand needs to thrive, with bold visuals, strong messaging, and a spark of the unexpected.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Why Clients Choose Us</h3>
          <p className="text-xl text-gray-300 text-center mb-6">Because we don't just make videos.</p>
          <p className="text-xl text-amber-400 text-center mb-8 font-semibold">We build experiences.</p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our clients often say they felt more confident than expected, had more fun than they thought possible, and were genuinely impressed with the quality and ease of our process. Whether you're a solopreneur stepping on camera for the first time, or a fast-scaling company needing monthly branded series—we create a content rhythm that fits you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-8">A Note From the Founder</h3>
          <blockquote className="text-lg text-gray-300 leading-relaxed italic mb-6">
            "I grew up knowing that stories could change lives—but only if told with truth, style, and soul. Palmer House is more than a business. It's an invitation to show up boldly and say what matters."
          </blockquote>
          <p className="text-amber-400 font-semibold">— Jevoy Palmer, Founder & Lead Creative Guide</p>
        </div>
      </div>
    </section>
  );
};
