
import { useState } from "react";
import { Play } from "lucide-react";

export const ClientResultsGrid = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "internal", label: "Internal SOPs" },
    { id: "social", label: "Social Media" },
    { id: "authority", label: "Authority Building" },
    { id: "education", label: "Customer Education" },
    { id: "marketing", label: "Marketing & Ads" }
  ];

  const projects = [
    {
      id: 1,
      title: "SaaS Onboarding Series",
      category: "internal",
      industry: "SaaS",
      challenge: "New users struggled with complex platform setup",
      solution: "5-part video walkthrough series",
      result: "Faster onboarding and reduced support tickets",
      thumbnail: "🖥️",
      gradient: "gradient-social-1"
    },
    {
      id: 2,
      title: "Real Estate Authority Reels",
      category: "social",
      industry: "Real Estate",
      challenge: "Agent needed to build local market authority",
      solution: "Weekly market insight videos for Instagram",
      result: "Significant increase in qualified leads",
      thumbnail: "🏠",
      gradient: "gradient-social-2"
    },
    {
      id: 3,
      title: "Medical Practice FAQ Library",
      category: "education",
      industry: "Healthcare",
      challenge: "Patients calling with same questions repeatedly",
      solution: "Comprehensive FAQ video library",
      result: "Major reduction in routine phone calls",
      thumbnail: "⚕️",
      gradient: "gradient-social-3"
    },
    {
      id: 4,
      title: "Coaching Program Launch",
      category: "marketing",
      industry: "Coaching",
      challenge: "Launching new program to cold audience",
      solution: "3-part launch video sequence",
      result: "Completely sold out program launch",
      thumbnail: "🎯",
      gradient: "gradient-social-4"
    },
    {
      id: 5,
      title: "CEO Thought Leadership",
      category: "authority",
      industry: "B2B Services",
      challenge: "CEO needed to establish industry authority",
      solution: "Weekly LinkedIn video series",
      result: "Multiple speaking engagement requests",
      thumbnail: "👔",
      gradient: "gradient-social-1"
    },
    {
      id: 6,
      title: "Restaurant Training Videos",
      category: "internal",
      industry: "Restaurant",
      challenge: "High staff turnover, inconsistent service",
      solution: "Complete training video library",
      result: "Dramatically reduced training time",
      thumbnail: "🍽️",
      gradient: "gradient-social-2"
    }
  ];

  const filteredProjects = selectedFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  return (
    <section className="py-24 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            Before & After <span className="text-gradient-1">Stories</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium">
            Filterable showcase of real client transformations by industry
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'bg-corporate-dark text-white'
                  : 'bg-white text-corporate-gray hover:bg-corporate-light'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-3xl p-6 video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 group">
              {/* Video Thumbnail */}
              <div className={`aspect-video ${project.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">{project.thumbnail}</div>
                  <Play size={32} className="mx-auto opacity-80" />
                </div>
              </div>

              {/* Project Details */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-corporate-gray uppercase tracking-wide">
                    {project.industry}
                  </span>
                  <span className="text-xs font-medium text-gradient-1 uppercase tracking-wide">
                    {filters.find(f => f.id === project.category)?.label}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-corporate-dark mb-3">
                  {project.title}
                </h3>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-sm font-medium text-corporate-dark mb-1">Challenge:</div>
                  <div className="text-sm text-corporate-gray">{project.challenge}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-corporate-dark mb-1">Solution:</div>
                  <div className="text-sm text-corporate-gray">{project.solution}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-corporate-dark mb-1">Result:</div>
                  <div className="text-sm text-gradient-2 font-medium">{project.result}</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
