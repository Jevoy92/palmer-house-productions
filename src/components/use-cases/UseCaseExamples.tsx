
import { useState } from "react";
import { Play, Filter } from "lucide-react";

export const UseCaseExamples = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const useFilters = [
    { id: "all", label: "All Uses" },
    { id: "internal", label: "Internal" },
    { id: "external", label: "External" },
    { id: "both", label: "Both" }
  ];

  const industryFilters = [
    { id: "all", label: "All Industries" },
    { id: "saas", label: "SaaS" },
    { id: "coaching", label: "Coaching" },
    { id: "realestate", label: "Real Estate" },
    { id: "healthcare", label: "Healthcare" },
    { id: "restaurant", label: "Restaurant" },
    { id: "agency", label: "Agency" }
  ];

  const examples = [
    {
      id: 1,
      title: "SaaS Feature Walkthrough",
      category: "education",
      use: "both",
      industry: "saas",
      description: "Step-by-step guide showing new feature functionality",
      thumbnail: "💻",
      gradient: "gradient-social-1"
    },
    {
      id: 2,
      title: "Real Estate Market Update",
      category: "authority",
      use: "external",
      industry: "realestate",
      description: "Weekly market insights for local social media",
      thumbnail: "📊",
      gradient: "gradient-social-2"
    },
    {
      id: 3,
      title: "Restaurant Safety Training",
      category: "training",
      use: "internal",
      industry: "restaurant",
      description: "Food safety protocols for new staff",
      thumbnail: "🍽️",
      gradient: "gradient-social-3"
    },
    {
      id: 4,
      title: "Coach Program Launch",
      category: "launch",
      use: "external",
      industry: "coaching",
      description: "3-part series announcing new coaching program",
      thumbnail: "🎯",
      gradient: "gradient-social-4"
    },
    {
      id: 5,
      title: "Medical FAQ Series",
      category: "faq",
      use: "both",
      industry: "healthcare",
      description: "Common patient questions answered by doctor",
      thumbnail: "⚕️",
      gradient: "gradient-social-1"
    },
    {
      id: 6,
      title: "Agency Client Results",
      category: "lead-gen",
      use: "external",
      industry: "agency",
      description: "Case study videos for lead generation",
      thumbnail: "📈",
      gradient: "gradient-social-2"
    }
  ];

  const filteredExamples = examples.filter(example => {
    const matchesUse = selectedFilter === "all" || example.use === selectedFilter || example.use === "both";
    const matchesIndustry = selectedIndustry === "all" || example.industry === selectedIndustry;
    return matchesUse && matchesIndustry;
  });

  return (
    <section className="py-24 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-[clamp(4rem,10vw,4rem)]">
          <h2 className="text-[clamp(3rem,8vw,4rem)] font-display font-black mb-[clamp(2rem,5vw,2rem)] text-corporate-dark">
            Real-World <span className="text-gradient-1">Examples</span>
          </h2>
          <p className="text-[clamp(1.25rem,3vw,1.5rem)] text-corporate-gray max-w-3xl mx-auto font-medium">
            See how different industries leverage video for specific business outcomes
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-[clamp(3rem,8vw,3rem)]">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-corporate-gray" />
            <span className="text-corporate-gray font-medium">Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {useFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-corporate-dark text-white'
                    : 'bg-white text-corporate-gray hover:bg-corporate-light'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {industryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedIndustry(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedIndustry === filter.id
                    ? 'bg-corporate-dark text-white'
                    : 'bg-white text-corporate-gray hover:bg-corporate-light'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(2rem,5vw,2rem)]">
          {filteredExamples.map((example) => (
            <div key={example.id} className="bg-white rounded-3xl p-6 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 group">
              {/* Video Preview */}
              <div className={`aspect-video ${example.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">{example.thumbnail}</div>
                  <Play size={32} className="mx-auto opacity-80" />
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-corporate-gray uppercase tracking-wide">
                    {industryFilters.find(f => f.id === example.industry)?.label}
                  </span>
                  <span className="text-xs font-medium text-gradient-1 uppercase tracking-wide">
                    {example.use}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-corporate-dark mb-3">
                  {example.title}
                </h3>
                <p className="text-corporate-gray leading-relaxed">
                  {example.description}
                </p>
              </div>

              {/* View Button */}
              <button className="w-full py-3 px-6 bg-corporate-light text-corporate-dark font-medium rounded-xl hover:bg-corporate-dark hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                <Play size={16} />
                <span>Watch Example</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
