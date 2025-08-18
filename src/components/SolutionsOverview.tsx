import { useNavigate } from "react-router-dom";
import { Download, Users, Repeat, Wrench } from "lucide-react";
import { PRICING } from "@/lib/pricing";

export const SolutionsOverview = () => {
  const navigate = useNavigate();

  const handleViewAllSolutions = () => {
    navigate('/video-packages');
  };

  const handleCardClick = () => {
    navigate('/video-packages');
  };

  const solutions = [
    {
      category: "DIY Resources",
      description: "Start your video journey with instant downloads",
      priceRange: "Starting at $19",
      icon: Download,
      gradient: "gradient-social-1",
      items: [
        "25 DIY Reels You Can Film From Home",
        "Video Strategy Blueprint", 
        "Owner/Founder Script Bundle"
      ]
    },
    {
      category: "Business Video Assets",
      description: "Strategic video systems for operational efficiency", 
      priceRange: "$4,500 - $6,500",
      icon: Users,
      gradient: "gradient-social-2",
      items: [
        "External Business Video Assets",
        "Internal Business Video Assets",
        "YouTube Visibility Engine",
        "Founder's Brand Kit"
      ]
    },
    {
      category: "Other Video Bundles",
      description: "Specialized video solutions for specific needs",
      priceRange: "$500 - $7,500",
      icon: Repeat,
      gradient: "gradient-social-3",
      items: [
        "The Starter Session",
        "30 Reels in 30 Days",
        "Music Video Production",
        "Event & Recruitment Capsules"
      ]
    },
    {
      category: "DIY Coaching & Support",
      description: "Guided learning and hands-on coaching",
      priceRange: "$2,000",
      icon: Wrench,
      gradient: "gradient-social-4", 
      items: [
        "6-Week Camera-Ready Brand",
        "DIY coaching sessions",
        "Private Circle community",
        "Bonus pack included"
      ]
    }
  ];

  return (
    <section className="py-32 bg-corporate-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-2 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-4 rounded-full opacity-10 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 gradient-social-1 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 px-4">
          <div className="inline-block px-4 py-2 gradient-social-3 rounded-full text-white font-bold text-sm mb-6 video-shadow mobile-touch-target">
            🎯 Video Solutions
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black mb-6 text-corporate-dark tracking-tight">
            Professional Video Production Company <span className="text-gradient-1">Services</span>
          </h2>
          <p className="text-base md:text-lg text-corporate-gray max-w-3xl mx-auto font-medium leading-relaxed">
            Expert video production services and professional video solutions—from DIY resources to full production video packages.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 px-4">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div 
                key={index}
                onClick={handleCardClick}
                className="group p-6 md:p-8 bg-video-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 mobile-touch-target cursor-pointer hover:scale-105"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 ${solution.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-corporate-dark">{solution.priceRange}</div>
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-display font-black mb-3 text-corporate-dark">
                  {solution.category}
                </h3>
                <p className="text-corporate-gray leading-relaxed text-sm md:text-base font-medium mb-4">
                  {solution.description}
                </p>

                <div className="space-y-3 mb-4">
                  {solution.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-corporate-dark rounded-full mr-3"></div>
                      <span className="text-corporate-gray font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <span className="text-social-purple font-semibold text-sm group-hover:underline">
                    Click for more info →
                  </span>
                </div>
              </div>
            );
          })}
        </div>


        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={handleViewAllSolutions}
            className="px-12 py-6 gradient-social-1 text-white font-bold text-xl rounded-3xl hover:scale-105 transition-all duration-300 video-shadow-lg"
          >
            View All Solutions
          </button>
          <p className="text-corporate-gray mt-4 text-lg">
            Explore detailed packages and pricing for each solution category
          </p>
        </div>
      </div>
    </section>
  );
};