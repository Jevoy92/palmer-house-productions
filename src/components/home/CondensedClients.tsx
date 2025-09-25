import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CondensedClients = () => {
  const testimonials = [
    {
      name: "Isabella Johnstun",
      role: "Client",
      content: "Jevoy and his team did an amazing job with pictures & videos for our wedding! He was very professional and easy to work with. The turnaround time was also fantastic - we received our photos and videos much sooner than expected. I would definitely recommend Palmer House Productions to anyone looking for high-quality video and photography services!",
      rating: 5,
      initials: "IJ",
      avatarColor: "bg-social-purple"
    },
    {
      name: "Athan Seyler",
      role: "Client",
      content: "Jevoy and the Palmer House Team were fantastic! They delivered exactly what we were looking for and more. The quality of work was exceptional and the communication throughout the process was excellent. Highly recommend!",
      rating: 5,
      initials: "AS",
      avatarColor: "bg-social-cyan"
    },
    {
      name: "Sarah Dylan Jensen",
      role: "Client",
      content: "Awesome experience from start to finish working with Jevoy and the Palmer House team. They understood our vision perfectly and delivered outstanding results. Professional, creative, and reliable!",
      rating: 5,
      initials: "SJ",
      avatarColor: "bg-social-orange"
    }
  ];

  const handleViewAllReviews = () => {
    window.location.href = '/resources/reviews';
  };

  return (
    <section className="py-24 bg-gray-50 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-pal-purple/10 border border-pal-purple/20 rounded-full text-pal-purple font-semibold text-sm mb-6">
            ⭐ Client Success
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-corporate-dark">
            Trusted by <span className="bg-gradient-to-r from-pal-green to-pal-blue bg-clip-text text-transparent">Growing Businesses</span>
          </h2>
          <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
            Join hundreds of businesses that have transformed their video strategy with Palmer House Productions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => {
            const palColors = ['pal-orange', 'pal-purple', 'pal-green'];
            const palColor = palColors[index % palColors.length];
            
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-500 hover:scale-[1.02] animate-on-scroll opacity-0 transform translate-y-10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 fill-${palColor} text-${palColor}`} />
                  ))}
                </div>
                <p className="text-corporate-gray mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-${palColor}/10 border border-${palColor}/20 flex items-center justify-center text-${palColor} font-bold`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-corporate-dark">{testimonial.name}</div>
                    <div className="text-sm text-corporate-gray">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleViewAllReviews}
            variant="outline"
            className="px-8 py-3 border-2 border-pal-blue text-pal-blue hover:bg-pal-blue hover:text-white hover:scale-105 transition-all duration-300 rounded-xl font-semibold"
          >
            View All Reviews
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};