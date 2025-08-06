
export const Reviews = () => {
  const reviews = [
    {
      name: "Isabella Johnstun",
      reviewCount: "2 reviews",
      timeAgo: "a week ago",
      text: "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced. They took the time to understand our goals and absolutely delivered on every promise. We felt like they took our feedback really well and took the time to make the final product better than we every imagined! I'm looking forward to working with them on future projects!",
      gradient: "gradient-social-1"
    },
    {
      name: "Athan Seyler",
      reviewCount: "Local Guide · 8 reviews",
      timeAgo: "a month ago",
      text: "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for photos is one stressor, but jumping in front of the camera to make a video is even more stressful. Jevoy has a gift of helping his clients become grounded again, making the process enjoyable and fun. Would highly recommend for anyone looking to add videos to their marketing plan as Jevoy also jumps into marketing strategy with his videos.",
      gradient: "gradient-social-2"
    },
    {
      name: "Sarah Dylan Jensen",
      reviewCount: "Local Guide · 32 reviews · 54 photos",
      timeAgo: "9 months ago",
      text: "Awesome experience from start to finish working with Jevoy. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos.",
      gradient: "gradient-social-3"
    }
  ];

  const handleViewAllReviews = () => {
    window.open('https://www.google.com/search?q=palmer+house+productions&oq=palmer+house+productions&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGD0yBggCEEUYPTIGCAMQRRhB0gEINTI0OWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x54905d5328d9caa5:0x5946127015c6ae31,1,,,,', '_blank');
  };

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
    <main>
      <section id="reviews" className="py-32 bg-video-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 gradient-social-1 rounded-full opacity-10 float-animation"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-3 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 gradient-social-2 rounded-full opacity-15 float-animation" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="text-center mb-16 px-4">
            <div className="inline-block px-4 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-6 video-shadow mobile-touch-target">
              ⭐ Client Reviews
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-black mb-6 text-corporate-dark tracking-tight">
              Client Testimonials | Palmer House Productions <span className="text-gradient-1">Reviews</span>
            </h1>
            <p className="text-base md:text-lg text-corporate-gray max-w-3xl mx-auto font-medium leading-relaxed">
              Hear from businesses who've achieved results with our video production services.
            </p>
          </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 px-4">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="group p-6 bg-corporate-light rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 mobile-touch-target"
            >
              {renderStars()}
              
              <div className="mb-6">
                <h2 className="text-xl font-display font-black text-corporate-dark mb-1">
                  {review.name}
                </h2>
                <p className="text-corporate-gray text-sm mb-1">{review.reviewCount}</p>
                <p className="text-corporate-gray text-sm">{review.timeAgo}</p>
              </div>
              
              <p className="text-corporate-gray leading-relaxed text-lg font-medium">
                "{review.text}"
              </p>
              
              {/* Google Badge */}
              <div className="mt-6 flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                <span className="text-corporate-gray text-sm font-medium">Google Review</span>
              </div>
            </div>
          ))}
        </div>
        
          {/* CTA Section */}
          <section className="text-center p-12 gradient-social-2 rounded-3xl video-shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Ready to Join Our Trail of Success?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-medium">
                See what other explorers are saying about their journey with Palmer House Productions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleViewAllReviews}
                  className="px-10 py-5 bg-video-white text-corporate-dark font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
                >
                  View All Google Reviews ⭐
                </button>
                <button 
                  onClick={handleViewAllReviews}
                  className="px-10 py-5 bg-white/20 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-corporate-dark transition-all duration-300"
                >
                  Leave a Review 📝
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};
