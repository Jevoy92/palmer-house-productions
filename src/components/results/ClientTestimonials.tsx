
export const ClientTestimonials = () => {
  const testimonials = [
    {
      quote: "Palmer House Productions is amazing! They are so professional and deliver excellent work. I'm so glad I found them and will definitely use them again.",
      author: "Isabella Johnstun",
      title: "Client",
      industry: "Business",
      gradient: "gradient-social-1"
    },
    {
      quote: "Palmer House Productions exceeded my expectations. Professional service and outstanding results that helped grow my business.",
      author: "Athan Seyler", 
      title: "Client",
      industry: "Business",
      gradient: "gradient-social-2"
    },
    {
      quote: "Working with Palmer House Productions was a great experience. They delivered quality content that made a real impact on our operations.",
      author: "Sarah Dylan Jensen",
      title: "Client", 
      industry: "Business",
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
