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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-video-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all min-h-[400px] flex flex-col border border-gray-100">
              {/* Star Rating */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-process-3 text-sm">★</span>
                  ))}
                </div>
              </div>
              
              {/* Testimonial Content */}
              <div className="flex-grow mb-6">
                <p className="text-corporate-gray leading-relaxed text-sm">
                  "{testimonial.content}"
                </p>
              </div>
              
              {/* Author Information */}
              <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1494790108755-2616b612b786' : index === 1 ? '1507003211169-0a1dd7228f2d' : '1500648767791-00dcc994a43e'}?w=100&h=100&fit=crop&crop=face`} 
                    alt={testimonial.name} 
                  />
                </div>
                <div>
                  <div className="font-bold text-sm text-corporate-dark">{testimonial.name}</div>
                  <div className="text-xs text-corporate-gray">{testimonial.role}</div>
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