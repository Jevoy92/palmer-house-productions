
import { Navigation } from "@/components/Navigation";

const VideoUseCasesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-24 pb-16 bg-video-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
              🎯 Strategic Applications
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
              Video as a <span className="text-gradient-1">Strategic Tool</span>
            </h1>
            <p className="text-2xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium">
              Explore how growth-stage businesses use cinematic assets to grow, train, sell, and lead.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "Team Training & SOPs",
                description: "Transform complex processes into clear, visual instructions that scale with your team.",
                gradient: "gradient-social-1"
              },
              {
                icon: "🎤",
                title: "Authority-Building Series",
                description: "Establish thought leadership with consistent, professional video content.",
                gradient: "gradient-social-2"
              },
              {
                icon: "🧭",
                title: "Customer Education",
                description: "Guide customers through your product with engaging onboarding videos.",
                gradient: "gradient-social-3"
              },
              {
                icon: "🛠",
                title: "Lead Gen & Ads",
                description: "Convert prospects with compelling video advertisements and landing pages.",
                gradient: "gradient-social-4"
              },
              {
                icon: "🗂",
                title: "FAQ Replacements",
                description: "Answer common questions with personal, video responses that build trust.",
                gradient: "gradient-social-1"
              },
              {
                icon: "🎉",
                title: "Launch Videos",
                description: "Create buzz around new products and services with cinematic announcements.",
                gradient: "gradient-social-2"
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-video-white rounded-3xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300 group">
                <div className={`w-16 h-16 ${useCase.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {useCase.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-corporate-dark mb-4">
                  {useCase.title}
                </h3>
                <p className="text-corporate-gray leading-relaxed text-lg">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-10 py-5 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg">
              See Use Cases by Tier
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoUseCasesPage;
