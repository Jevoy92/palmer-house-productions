import { useNavigate } from "react-router-dom";
import { Download, Users, Repeat, Wrench } from "lucide-react";
import { PRICING } from "@/lib/pricing";

export const SolutionsOverview = () => {
  const navigate = useNavigate();

  const handleViewAllSolutions = () => {
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
        "Owner/Founder Script Bundle",
        "On-Camera Confidence Mini Course"
      ]
    },
    {
      category: "Hands-On Coaching",
      description: "6-week group program for camera confidence", 
      priceRange: "$2,000",
      icon: Users,
      gradient: "gradient-social-2",
      items: [
        "Camera-Ready Brand Coaching",
        "8-10 founders per cohort",
        "Weekly Zoom sessions",
        "Private Circle group"
      ]
    },
    {
      category: "Done-With-You Content",
      description: "Monthly content system with consistent delivery",
      priceRange: "$3,000/month",
      icon: Repeat,
      gradient: "gradient-social-3",
      items: [
        "1 Hero/Founder video monthly",
        "6 Social Reels monthly",
        "Client voice videos",
        "Platform optimization"
      ]
    },
    {
      category: "Done-For-You Solutions",
      description: "Complete one-time video bundles",
      priceRange: "$500 - $6,500",
      icon: Wrench,
      gradient: "gradient-social-4", 
      items: [
        "FAQ Buildouts",
        "YouTube Visibility Engine",
        "Founder's Brand Kit",
        "30 Reels in 30 Days"
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
            Professional Video Services for <span className="text-gradient-1">Growing Businesses</span>
          </h2>
          <p className="text-base md:text-lg text-corporate-gray max-w-3xl mx-auto font-medium leading-relaxed">
            From DIY resources to full production—choose the solution that fits your business needs and budget.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 px-4">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div 
                key={index}
                className="group p-6 md:p-8 bg-video-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 mobile-touch-target"
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

                <div className="space-y-3">
                  {solution.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-corporate-dark rounded-full mr-3"></div>
                      <span className="text-corporate-gray font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Progression */}
        <div className="text-center mb-12 px-4">
          <div className="inline-block px-4 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-6 video-shadow mobile-touch-target">
            📈 Growth Path
          </div>
          <h3 className="text-xl md:text-2xl font-display font-black mb-6 text-corporate-dark">
            Scale at <span className="text-gradient-2">Your Pace</span>
          </h3>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="w-20 h-20 gradient-social-1 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-corporate-dark mb-2">Start</h4>
                <p className="text-corporate-gray text-sm">DIY Resources</p>
              </div>
              
              <div className="hidden md:block text-6xl text-corporate-gray">→</div>
              <div className="md:hidden text-6xl text-corporate-gray">↓</div>
              
              <div className="text-center">
                <div className="w-20 h-20 gradient-social-2 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-corporate-dark mb-2">Learn</h4>
                <p className="text-corporate-gray text-sm">Group Coaching</p>
              </div>
              
              <div className="hidden md:block text-6xl text-corporate-gray">→</div>
              <div className="md:hidden text-6xl text-corporate-gray">↓</div>
              
              <div className="text-center">
                <div className="w-20 h-20 gradient-social-3 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Repeat size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-corporate-dark mb-2">Scale</h4>
                <p className="text-corporate-gray text-sm">Monthly System</p>
              </div>
              
              <div className="hidden md:block text-6xl text-corporate-gray">→</div>
              <div className="md:hidden text-6xl text-corporate-gray">↓</div>
              
              <div className="text-center">
                <div className="w-20 h-20 gradient-social-4 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-corporate-dark mb-2">Solve</h4>
                <p className="text-corporate-gray text-sm">Custom Bundles</p>
              </div>
            </div>
          </div>
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