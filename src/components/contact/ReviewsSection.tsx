
import { Button } from "@/components/ui/button";

interface Review {
  name: string;
  reviewCount: string;
  timeAgo: string;
  text: string;
}

interface ReviewsSectionProps {
  onViewAllReviews: () => void;
}

export const ReviewsSection = ({ onViewAllReviews }: ReviewsSectionProps) => {
  const reviews: Review[] = [
    {
      name: "Isabella Johnstun",
      reviewCount: "2 reviews",
      timeAgo: "a week ago",
      text: "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced. They took the time to understand our goals and absolutely delivered on every promise. We felt like they took our feedback really well and took the time to make the final product better than we every imagined! I'm looking forward to working with them on future projects!"
    },
    {
      name: "Athan Seyler",
      reviewCount: "Local Guide · 8 reviews",
      timeAgo: "a month ago",
      text: "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for photos is one stressor, but jumping in front of the camera to make a video is even more stressful. Jevoy has a gift of helping his clients become grounded again, making the process enjoyable and fun. Would highly recommend for anyone looking to add videos to their marketing plan as Jevoy also jumps into marketing strategy with his videos."
    },
    {
      name: "Sarah Dylan Jensen",
      reviewCount: "Local Guide · 32 reviews · 54 photos",
      timeAgo: "9 months ago",
      text: "Awesome experience from start to finish working with Jevoy. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos."
    }
  ];

  const renderStars = () => {
    return (
      <div className="flex space-x-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-corporate-dark text-center mb-12">Client Reviews</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-background rounded-xl p-6 shadow-lg border border-border">
            {renderStars()}
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-corporate-dark mb-1">
                {review.name}
              </h3>
              <p className="text-corporate-gray text-sm mb-1">{review.reviewCount}</p>
              <p className="text-corporate-gray text-sm">{review.timeAgo}</p>
            </div>
            
            <p className="text-foreground leading-relaxed mb-4">
              "{review.text}"
            </p>
            
            {/* Google Badge */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-full"></div>
              <span className="text-corporate-gray text-sm font-medium">Google Review</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Reviews CTA */}
      <div className="text-center mt-8">
        <Button 
          onClick={onViewAllReviews}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
        >
          View All Google Reviews ⭐
        </Button>
      </div>
    </div>
  );
};
