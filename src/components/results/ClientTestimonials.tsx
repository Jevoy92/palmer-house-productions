
export const ClientTestimonials = () => {
  const testimonials = [
    {
      quote: "Palmer House didn't just make videos — they built our entire content strategy. Our onboarding process went from 2 weeks to 5 days.",
      author: "Sarah Chen",
      title: "CEO, TechFlow Solutions",
      industry: "SaaS",
      gradient: "gradient-social-1"
    },
    {
      quote: "The video SOPs saved us 20 hours per week in training. New hires are productive from day one now.",
      author: "Mike Rodriguez",
      title: "Operations Manager, Bella Vista Restaurant Group",
      industry: "Restaurant",
      gradient: "gradient-social-2"
    },
    {
      quote: "My LinkedIn videos generated more leads in 3 months than our entire previous year of marketing.",
      author: "Jennifer Walsh",
      title: "Real Estate Broker, Premier Properties",
      industry: "Real Estate",
      gradient: "gradient-social-3"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            What Our Clients <span className="text-gradient-1">Say</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-corporate-light rounded-3xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="text-4xl text-gradient-1 mb-4">"</div>
                <p className="text-lg text-corporate-gray leading-relaxed italic">
                  {testimonial.quote}
                </p>
              </div>
              
              <div className="flex items-center">
                <div className={`w-12 h-12 ${testimonial.gradient} rounded-full flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold text-lg">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-corporate-dark">{testimonial.author}</div>
                  <div className="text-corporate-gray text-sm">{testimonial.title}</div>
                  <div className="text-corporate-gray text-xs">{testimonial.industry}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
