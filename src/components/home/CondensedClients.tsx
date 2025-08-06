import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CondensedClients = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechStart",
      content: "Palmer House transformed our video strategy. We went from sporadic content to a systematic approach that generated 300% more leads.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director, GrowthCorp",
      content: "The ROI on our video investment has been incredible. Professional quality without the enterprise budget.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Lisa Thompson",
      role: "Founder, InnovateLab",
      content: "Finally, video content that actually drives business results. The strategy framework is game-changing.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  const handleViewAllReviews = () => {
    window.location.href = '/reviews';
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
            <div key={index} className="bg-video-white p-6 rounded-2xl video-shadow hover:video-shadow-lg transition-all">
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-social-yellow text-social-yellow" />
                ))}
              </div>
              <p className="text-corporate-gray mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
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