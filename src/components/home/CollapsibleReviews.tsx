import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const CollapsibleReviews = () => {
  const [isOpen, setIsOpen] = useState(false);

  const featuredReview = {
    name: "Sarah Chen",
    role: "CEO, TechFlow Solutions",
    content: "Palmer House didn't just create videos for us—they created a visual language that our entire team now speaks. The authenticity they captured has transformed how our clients see us.",
    rating: 5,
    avatar: "SC"
  };

  const additionalReviews = [
    {
      name: "Marcus Rodriguez",
      role: "Founder, GreenSpace Ventures",
      content: "Working with Jevoy and his team was like having a creative partner who actually understood our mission. The videos they produced didn't just look professional—they felt like us.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Foster",
      role: "Director of Marketing, Coastal Dynamics",
      content: "The ROI on our Palmer House videos has been incredible. But beyond the numbers, they helped us find our voice in a crowded market.",
      rating: 5,
      avatar: "EF"
    },
    {
      name: "David Kim",
      role: "Co-founder, Nexus Labs",
      content: "From strategy to final delivery, Palmer House Productions exceeded every expectation. Their attention to detail and creative vision is unmatched.",
      rating: 5,
      avatar: "DK"
    }
  ];

  return (
    <section className="py-16 bg-video-white">
      <div className="max-w-6xl mx-auto px-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full group">
            <div className="flex items-center justify-between p-8 bg-corporate-light/50 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
              <div className="text-left flex-1">
                <div className="inline-block px-4 py-2 gradient-social-4 rounded-full text-white font-bold text-sm mb-4">
                  ⭐ Client Stories
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-corporate-dark mb-4">
                  What Our <span className="text-gradient-4">Clients</span> Say
                </h2>
                
                {/* Featured Review Preview */}
                <div className="bg-video-white p-6 rounded-2xl video-shadow">
                  <div className="flex mb-3">
                    {[...Array(featuredReview.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-corporate-gray text-sm leading-relaxed mb-4 line-clamp-2">
                    "{featuredReview.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-social-4 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                      {featuredReview.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-corporate-dark text-sm">{featuredReview.name}</p>
                      <p className="text-corporate-gray text-xs">{featuredReview.role}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-corporate-gray mt-4">
                  {isOpen ? "View less reviews" : `View ${additionalReviews.length} more reviews`}
                </p>
              </div>
              
              <div className="ml-6">
                {isOpen ? (
                  <ChevronUp size={32} className="text-corporate-gray group-hover:text-corporate-dark transition-colors" />
                ) : (
                  <ChevronDown size={32} className="text-corporate-gray group-hover:text-corporate-dark transition-colors" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="mt-6 p-8 bg-corporate-light/50 rounded-3xl video-shadow">
              <div className="grid md:grid-cols-2 gap-6">
                {additionalReviews.map((review, index) => (
                  <div key={index} className="bg-video-white p-6 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300">
                    <div className="flex mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-corporate-gray text-sm leading-relaxed mb-4">
                      "{review.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-social-1 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-corporate-dark text-sm">{review.name}</p>
                        <p className="text-corporate-gray text-xs">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};