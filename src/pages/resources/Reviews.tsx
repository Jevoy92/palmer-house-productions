import { Star, Quote } from "lucide-react";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Navigation } from "@/components/Navigation";

const Reviews = () => {
  const featuredReview = {
    name: "Sarah Chen",
    role: "CEO, TechFlow Solutions",
    company: "TechFlow Solutions",
    content: "Palmer House didn't just create videos for us—they created a visual language that our entire team now speaks. The authenticity they captured has transformed how our clients see us. Our conversion rates increased by 40% after implementing their video strategy.",
    rating: 5,
    avatar: "SC",
    results: ["40% increase in conversion rates", "3x more qualified leads", "50% reduction in sales cycle time"]
  };

  const clientReviews = [
    {
      name: "Marcus Rodriguez",
      role: "Founder, GreenSpace Ventures",
      company: "GreenSpace Ventures",
      content: "Working with Jevoy and his team was like having a creative partner who actually understood our mission. The videos they produced didn't just look professional—they felt like us. Our social media engagement has never been higher.",
      rating: 5,
      avatar: "MR",
      industry: "Sustainable Technology"
    },
    {
      name: "Emily Foster",
      role: "Director of Marketing, Coastal Dynamics",
      company: "Coastal Dynamics",
      content: "The ROI on our Palmer House videos has been incredible. But beyond the numbers, they helped us find our voice in a crowded market. Our brand recognition has increased significantly.",
      rating: 5,
      avatar: "EF",
      industry: "Maritime Solutions"
    },
    {
      name: "David Kim",
      role: "Co-founder, Nexus Labs",
      company: "Nexus Labs",
      content: "From strategy to final delivery, Palmer House Productions exceeded every expectation. Their attention to detail and creative vision is unmatched. We now use video as our primary marketing tool.",
      rating: 5,
      avatar: "DK",
      industry: "AI & Machine Learning"
    },
    {
      name: "Jennifer Walsh",
      role: "CEO, Wellness Collective",
      company: "Wellness Collective",
      content: "The authenticity Palmer House captured in our founder story video has been game-changing. It's opened doors we never thought possible and helped us connect with our audience on a deeper level.",
      rating: 5,
      avatar: "JW",
      industry: "Health & Wellness"
    },
    {
      name: "Alex Thompson",
      role: "Founder, Urban Gardens Co.",
      company: "Urban Gardens Co.",
      content: "Jevoy and his team understood our vision from day one. The videos they created perfectly showcase our urban farming solutions and have helped us secure major partnerships.",
      rating: 5,
      avatar: "AT",
      industry: "Urban Agriculture"
    },
    {
      name: "Sophia Martinez",
      role: "Marketing Director, CloudTech Innovations",
      company: "CloudTech Innovations",
      content: "Palmer House turned our complex tech solutions into compelling stories. Our client acquisition has doubled since launching their video campaign. The quality is exceptional.",
      rating: 5,
      avatar: "SM",
      industry: "Cloud Technology"
    }
  ];

  const stats = [
    { number: "150+", label: "Happy Clients" },
    { number: "500+", label: "Videos Produced" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "45%", label: "Average ROI Increase" }
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
                What Our <span className="text-gradient-4">Explorers</span> Say
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-4xl mx-auto">
                Real stories from real clients who've transformed their brands through authentic video storytelling.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white p-6 rounded-2xl video-shadow">
                  <div className="text-4xl font-black text-corporate-dark mb-2">{stat.number}</div>
                  <div className="text-corporate-gray font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Featured Review */}
            <div className="mb-16">
              <h2 className="text-3xl font-display font-black text-center text-corporate-dark mb-8">
                Featured Success Story
              </h2>
              <div className="bg-gradient-to-br from-social-purple/10 via-social-pink/5 to-social-cyan/10 rounded-3xl p-12 border border-social-purple/20">
                <div className="flex items-start space-x-6">
                  <Quote size={48} className="text-social-purple/30 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xl text-corporate-gray leading-relaxed mb-6 italic">
                      "{featuredReview.content}"
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-social-4 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {featuredReview.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-corporate-dark">{featuredReview.name}</p>
                          <p className="text-corporate-gray text-sm">{featuredReview.role}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(featuredReview.rating)].map((_, i) => (
                          <Star key={i} size={20} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    {featuredReview.results && (
                      <div className="mt-6 p-4 bg-white/50 rounded-2xl">
                        <h4 className="font-bold text-corporate-dark mb-3">Results:</h4>
                        <div className="grid md:grid-cols-3 gap-2">
                          {featuredReview.results.map((result, i) => (
                            <div key={i} className="text-sm text-corporate-gray">
                              ✓ {result}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* All Reviews Grid */}
            <div>
              <h2 className="text-3xl font-display font-black text-center text-corporate-dark mb-12">
                More Client Success Stories
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clientReviews.map((review, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300">
                    <div className="flex mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-corporate-gray leading-relaxed mb-6 italic">
                      "{review.content}"
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-social-1 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-corporate-dark text-sm">{review.name}</p>
                        <p className="text-corporate-gray text-xs">{review.role}</p>
                      </div>
                    </div>
                    <div className="text-xs text-social-purple font-medium bg-social-purple/10 px-3 py-1 rounded-full inline-block">
                      {review.industry}
                    </div>
                  </div>
                ))}
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
                    onClick={() => window.location.href = '/discovery-call'}
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