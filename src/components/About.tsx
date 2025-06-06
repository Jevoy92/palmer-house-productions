
export const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What Makes Us Different</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're not a gig service or content mill. We're a subscription-based creative partner built for growth-minded brands.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🧭</div>
            <h3 className="text-xl font-semibold mb-3 text-amber-400">Explorer Archetype</h3>
            <p className="text-gray-400 leading-relaxed">
              Freedom, authenticity, and unfiltered creativity. We don't mass-produce — we uncover.
            </p>
          </div>
          
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-xl font-semibold mb-3 text-amber-400">Filmmaking Meets Strategy</h3>
            <p className="text-gray-400 leading-relaxed">
              We combine the cinematic with the tactical. Aesthetic brilliance that moves your business forward.
            </p>
          </div>
          
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-3 text-amber-400">Global Feel, Personal Touch</h3>
            <p className="text-gray-400 leading-relaxed">
              Based in Seattle, but our mindset goes wherever the story leads. Local legends to global brands.
            </p>
          </div>
          
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-3 text-amber-400">Rooted in Identity</h3>
            <p className="text-gray-400 leading-relaxed">
              Your voice matters more than our style. Our job is to elevate what's real.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our approach is rooted in exploration. The camera isn't just a tool — it's a compass. 
            Each shoot is a pathfinder into what makes your brand meaningful, and every edit becomes 
            a visual landmark. We're not here to turn you into someone else. We're here to shine a 
            cinematic light on what already makes you powerful.
          </p>
        </div>
      </div>
    </section>
  );
};
