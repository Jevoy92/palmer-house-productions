import { Button } from "@/components/ui/button";
import { ServiceType, ServiceCategory } from "./types";
import { Download, Users, Repeat, Wrench } from "lucide-react";

interface ServiceCategorySelectionProps {
  selectedCategory?: ServiceCategory;
  serviceType?: ServiceType;
  onCategorySelect: (category: ServiceCategory) => void;
  onBack: () => void;
}

export const ServiceCategorySelection = ({ serviceType, onCategorySelect, onBack }: ServiceCategorySelectionProps) => {
  // Skip category selection for consultation services
  if (serviceType === "consultation") {
    // Auto-advance for consultation
    setTimeout(() => onCategorySelect("diy-downloads" as ServiceCategory), 0);
    return null;
  }

  const categories = [
    {
      id: "diy-downloads" as ServiceCategory,
      name: "DIY Digital Downloads",
      icon: Download,
      priceRange: "$19 - $47",
      description: "Instant access to video guides, scripts, and training materials",
      features: [
        "25 DIY Reels You Can Film From Home",
        "Video Strategy Blueprint",
        "Owner/Founder Script Bundle"
      ],
      gradient: "gradient-social-1",
    },
    {
      id: "coaching" as ServiceCategory,
      name: "DIY Coaching",
      icon: Users,
      priceRange: "$2,000",
      description: "6-week intensive program to build camera confidence",
      features: [
        "Weekly live Zoom sessions",
        "8-10 founders per cohort",
        "Assignments and feedback",
        "Private Circle community",
        "Record 3-5 brand videos yourself"
      ],
      gradient: "gradient-social-2",
      highlight: true,
    },
    {
      id: "monthly-content" as ServiceCategory,
      name: "Business Video Assets",
      icon: Repeat,
      priceRange: "$3,000-$15,000",
      description: "Strategic video systems that replace repetitive operations",
      features: [
        "Process documentation videos",
        "Internal training systems", 
        "Client onboarding sequences",
        "FAQ automation videos",
        "Standard operating procedures"
      ],
      gradient: "gradient-social-3",
    },
    {
      id: "one-time-bundles" as ServiceCategory,
      name: "One-Time Bundles",
      icon: Wrench,
      priceRange: "$500 - $6,500",
      description: "Targeted solutions for specific video challenges",
      features: [
        "FAQ Buildouts (Internal/External)",
        "YouTube Visibility Engine",
        "7-Day Launch Package",
        "30 Reels in 30 Days",
        "Founder's Brand Kit"
      ],
      gradient: "gradient-social-4",
    },
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Choose Your <span className="text-gradient-1">Service Category</span>
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Select the approach that best fits your video needs and budget.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`group p-6 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 text-left relative ${
              category.highlight ? 'border-2 border-social-purple' : ''
            }`}
          >
            {category.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="gradient-social-2 text-white px-4 py-2 rounded-full text-sm font-bold video-shadow">
                  🌟 Most Popular
                </div>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className={`w-16 h-16 ${category.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <category.icon size={32} color="white" />
              </div>
              <h3 className="text-2xl font-display font-black text-corporate-dark mb-3">{category.name}</h3>
              <div className="mb-4">
                <span className="text-2xl font-black text-corporate-dark">{category.priceRange}</span>
              </div>
              <p className="text-corporate-gray text-sm">{category.description}</p>
            </div>
            
            <ul className="space-y-2">
              {category.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 ${category.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                  <span className="text-corporate-gray text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-corporate-gray text-corporate-gray hover:bg-corporate-light"
        >
          ← Back
        </Button>
      </div>
    </div>
  );
};