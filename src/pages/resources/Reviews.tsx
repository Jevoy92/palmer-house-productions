import { Star, Quote } from "lucide-react";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Navigation } from "@/components/Navigation";

const Reviews = () => {
  // Real Google Reviews from Palmer House Productions clients
  const clientReviews = [
    {
      name: "Isabella Johnstun",
      role: "Team Member",
      company: "Dick's Restaurant Supply",
      content: "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced. They took the time to understand our goals and delivered exceptional results.",
      rating: 5,
      avatar: "IJ",
      timeAgo: "2 months ago"
    },
    {
      name: "Athan Seyler",
      role: "Client",
      company: "Local Guide",
      content: "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for photos is one stressor, but jumping in front of the camera to make a video is even more stressful. Jevoy has a gift of helping his clients become grounded and comfortable.",
      rating: 5,
      avatar: "AS",
      timeAgo: "4 months ago"
    },
    {
      name: "Chelsea Power",
      role: "Client",
      company: "",
      content: "The Palmer House Productions team is incredibly warm, patient, and skilled! I'm painfully camera-shy, and they made the experience as comfortable as it ever could've been. They encouraged me along the way, tailoring the shoot in some very creative ways to achieve a highly professional video. Highly recommend!",
      rating: 5,
      avatar: "CP",
      timeAgo: "2 months ago"
    },
    {
      name: "Rachel Delavan",
      role: "Client",
      company: "Local Guide",
      content: "Jevoy and his team did video marketing for me and my work. I don't love being in front of camera, and they made it easy, comfortable, seamless, and gave me the pointers and guidance I needed to get it done with hardly any cuts! Highly recommend them for any of your marketing needs!",
      rating: 5,
      avatar: "RD",
      timeAgo: "4 months ago"
    },
    {
      name: "Sarah Dylan Jensen",
      role: "Client",
      company: "Local Guide",
      content: "Awesome experience from start to finish working with Jevoy. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos.",
      rating: 5,
      avatar: "SJ",
      timeAgo: "a year ago"
    },
    {
      name: "Cynthia Scanlon",
      role: "Client",
      company: "",
      content: "Jevoy is amazing. He's super easy to work with. He made me very comfortable to do a shoot with. I'd highly recommend him to anyone looking for good photos for any event. We used his pics for my website and got all good compliments!",
      rating: 5,
      avatar: "CS",
      timeAgo: "2 years ago"
    },
    {
      name: "James Russell",
      role: "Client",
      company: "Local Guide",
      content: "It was my first time in a professional environment. Jevoy gave me lots of good tips through the process to make it easier. Professional, patient, and skilled team.",
      rating: 5,
      avatar: "JR",
      timeAgo: "2 months ago"
    },
    {
      name: "Quenia Tolentino",
      role: "Client",
      company: "",
      content: "I have done two photoshoots with Jevoy and the photos from both sessions turned out amazing. I love them. Besides that, he is easy to communicate and work with. I would easily work with Palmer House Productions again.",
      rating: 5,
      avatar: "QT",
      timeAgo: "11 months ago"
    },
    {
      name: "Olivia Colantonio",
      role: "Client", 
      company: "",
      content: "Jevoy is an absolute dream to work with! He has a great eye and is very knowledgeable. My photos turned out so amazing I would highly recommend him to anyone looking to book a photographer!!",
      rating: 5,
      avatar: "OC",
      timeAgo: "2 years ago"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Client Reviews & Testimonials | Palmer House Video"
        description="Authentic Palmer House client reviews. See how video content systems transformed businesses and increased ROI by 45% on average."
        keywords="Palmer House Productions reviews, client testimonials, video production results, business transformation, ROI increase"
        ogTitle="Client Reviews | Palmer House Productions"
        ogDescription="Authentic Palmer House client reviews. See how video content systems transformed businesses and increased ROI by 45% on average."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-7xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-4 rounded-full text-white font-bold text-lg mb-8">
                ⭐ Client Stories
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                What Our <span className="text-gradient-4">Clients</span> Say
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-4xl mx-auto">
                Real stories from real clients who've transformed their brands through authentic video storytelling.
              </p>
            </div>

            {/* Google Reviews Section */}
            <div>
              <h2 className="text-3xl font-display font-black text-center text-corporate-dark mb-4">
                Authentic Client Reviews
              </h2>
              <p className="text-center text-corporate-gray mb-12 max-w-2xl mx-auto">
                Real testimonials from our clients on Google Reviews
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clientReviews.map((review, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-xs text-corporate-gray">
                        {review.timeAgo}
                      </div>
                    </div>
                    <p className="text-corporate-gray leading-relaxed mb-6">
                      "{review.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-social-1 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-corporate-dark text-sm">{review.name}</p>
                        {review.company && (
                          <p className="text-corporate-gray text-xs">{review.company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Google Review CTA */}
              <div className="mt-12 text-center">
                <button
                  onClick={() => window.open('https://www.google.com/search?q=Palmer+House+Productions+reviews', '_blank')}
                  className="px-8 py-4 bg-gradient-to-r from-social-purple to-social-pink text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300"
                >
                  View All Google Reviews ⭐
                </button>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-3xl p-12 border border-social-purple/20">
                <h3 className="text-4xl font-display font-black text-corporate-dark mb-6">
                  Ready to Create Your Success Story?
                </h3>
                <p className="text-xl text-corporate-gray mb-8 max-w-3xl mx-auto">
                  Join the growing community of businesses that have transformed their brand presence through authentic video storytelling.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.href = '/contact'}
                    className="px-10 py-5 bg-gradient-to-r from-social-purple to-social-pink text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300"
                  >
                    Start Your Journey
                  </button>
                  <button
                    onClick={() => window.location.href = '/video-packages'}
                    className="px-10 py-5 border-2 border-social-purple text-social-purple font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300"
                  >
                    View Our Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default Reviews;