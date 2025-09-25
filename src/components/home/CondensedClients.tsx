import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTransition } from '@/components/PageTransition';

export const CondensedClients = () => {
  const { transitionTo } = usePageTransition();
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
    transitionTo('/resources/reviews');
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* White Card Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
              ⭐ Client Success
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight leading-tight">
              Trusted by <span className="text-pal-orange">Growing Businesses</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
              Join hundreds of businesses that have transformed their video strategy with Palmer House Productions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {testimonials.map((testimonial, index) => {
              const palColors = ['bg-pal-purple', 'bg-pal-blue', 'bg-pal-orange'];
              
              return (
                <div key={index} className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                  <div className="flex space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-pal-orange text-pal-orange" />
                    ))}
                  </div>
                  <p className="text-corporate-gray mb-8 leading-relaxed text-base sm:text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-full ${palColors[index]} flex items-center justify-center text-white font-bold text-lg`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-bold text-corporate-dark text-lg">{testimonial.name}</div>
                      <div className="text-corporate-gray">{testimonial.role}</div>
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
              className="px-8 py-4 text-lg hover:scale-105 transition-all border-2 border-pal-purple text-pal-purple hover:bg-pal-purple hover:text-white"
            >
              View All Reviews
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};