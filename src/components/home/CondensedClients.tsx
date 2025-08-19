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
    <section className="py-24 bg-video-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-6 video-shadow">
            ⭐ Client Success
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-corporate-dark">
            Trusted by <span className="text-gradient-2">Growing Businesses</span>
          </h2>
          <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
            Join hundreds of businesses that have transformed their video strategy with Palmer House Productions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-video-white p-6 rounded-2xl video-shadow hover:video-shadow-lg transition-all overflow-hidden h-auto">
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-social-yellow text-social-yellow" />
                ))}
              </div>
              <p className="text-corporate-gray mb-6 leading-relaxed line-clamp-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white font-bold`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-corporate-dark">{testimonial.name}</div>
                  <div className="text-sm text-corporate-gray">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleViewAllReviews}
            variant="outline"
            className="px-8 py-3 hover:scale-105 transition-all"
          >
            View All Reviews
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};