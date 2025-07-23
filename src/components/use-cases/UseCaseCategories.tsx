
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Award, 
  BookOpen, 
  Wrench, 
  HelpCircle, 
  Rocket,
  ArrowRight 
} from "lucide-react";

export const UseCaseCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = [
    {
      id: "training",
      title: "Team Training & SOPs",
      description: "Internal processes, onboarding, and training materials",
      icon: Users,
      gradient: "gradient-social-1",
      usage: "Internal",
      examples: ["Employee onboarding", "Process documentation", "Safety training", "Software tutorials"],
      recommendedTier: "Summit or Horizon"
    },
    {
      id: "authority",
      title: "Authority-Building Series",
      description: "Thought leadership content that establishes expertise",
      icon: Award,
      gradient: "gradient-social-2",
      usage: "External",
      examples: ["Industry insights", "CEO vlogs", "Expert interviews", "Speaking previews"],
      recommendedTier: "Summit or Horizon"
    },
    {
      id: "education",
      title: "Customer Education",
      description: "Help customers succeed with your product or service",
      icon: BookOpen,
      gradient: "gradient-social-3",
      usage: "Both",
      examples: ["Product tutorials", "Best practices", "Case studies", "Success stories"],
      recommendedTier: "Basecamp or Summit"
    },
    {
      id: "lead-gen",
      title: "Lead Gen & Ads",
      description: "Promotional videos that convert prospects into customers",
      icon: Wrench,
      gradient: "gradient-social-4",
      usage: "External",
      examples: ["Social media ads", "Landing page videos", "Email campaigns", "Retargeting content"],
      recommendedTier: "Trailhead or Basecamp"
    },
    {
      id: "faq",
      title: "FAQ Replacements",
      description: "Transform common questions into engaging video answers",
      icon: HelpCircle,
      gradient: "gradient-social-1",
      usage: "Both",
      examples: ["Common questions", "Troubleshooting", "How-to guides", "Support videos"],
      recommendedTier: "Basecamp or Summit"
    },
    {
      id: "launch",
      title: "Launch Videos",
      description: "Announce new products, services, or company updates",
      icon: Rocket,
      gradient: "gradient-social-2",
      usage: "External",
      examples: ["Product launches", "Feature announcements", "Company updates", "Event promotions"],
      recommendedTier: "Trailhead or Basecamp"
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate('/discovery-call', { 
      state: { 
        selectedUseCase: categoryId,
        source: 'use_cases' 
      } 
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            Six Strategic <span className="text-gradient-1">Categories</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium">
            Each category serves a specific business function and maps to our tier system
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-corporate-light rounded-3xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon color="white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-corporate-dark mb-2">
                  {category.title}
                </h3>
                <p className="text-corporate-gray mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="inline-block px-3 py-1 bg-white rounded-full text-sm font-medium text-corporate-gray">
                  {category.usage}
                </div>
              </div>

              {/* Examples List */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-corporate-dark mb-3">Examples:</h4>
                <ul className="space-y-2">
                  {category.examples.map((example, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className={`w-1.5 h-1.5 ${category.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                      <span className="text-sm text-corporate-gray">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Tier */}
              <div className="mb-6">
                <div className="text-sm font-bold text-corporate-dark mb-2">Recommended Tier:</div>
                <div className="text-sm text-gradient-2 font-medium">{category.recommendedTier}</div>
              </div>

              {/* CTA */}
              <button className="w-full py-3 px-6 bg-white text-corporate-dark font-medium rounded-xl hover:bg-corporate-dark hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group-hover:bg-corporate-dark group-hover:text-white">
                <span>Explore This Use Case</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
