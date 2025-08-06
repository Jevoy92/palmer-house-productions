
import { Navigation } from "@/components/Navigation";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";

const PodcastPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
              🎙️ Audio Adventures
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
              <span className="text-gradient-1">Mind Your Bizniz</span>
            </h1>
            <p className="text-2xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium">
              Real Conversations with Real Builders
            </p>
            <p className="text-xl text-corporate-gray mb-12 max-w-3xl mx-auto">
              Behind-the-scenes convos on business, content, and what it really takes to scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Episode 1: The Content Trap",
                description: "Why most businesses fail at video content and how to avoid the common pitfalls.",
                date: "Dec 15, 2024",
                duration: "32 min"
              },
              {
                title: "Episode 2: Scaling with Story",
                description: "How cinematic storytelling transforms business growth and customer connection.",
                date: "Dec 8, 2024",
                duration: "28 min"
              },
              {
                title: "Episode 3: The Authority Blueprint",
                description: "Building thought leadership through consistent, authentic video content.",
                date: "Dec 1, 2024",
                duration: "35 min"
              }
            ].map((episode, index) => (
              <div key={index} className="bg-video-white rounded-3xl p-8 video-shadow hover:video-shadow-lg transition-all duration-300">
                <div className="gradient-social-1 w-full h-48 rounded-2xl mb-6 flex items-center justify-center">
                  <div className="text-white text-6xl">🎙️</div>
                </div>
                <h3 className="text-2xl font-display font-black text-corporate-dark mb-4">
                  {episode.title}
                </h3>
                <p className="text-corporate-gray leading-relaxed mb-4">
                  {episode.description}
                </p>
                <div className="flex justify-between items-center text-sm text-corporate-gray">
                  <span>{episode.date}</span>
                  <span>{episode.duration}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-10 py-5 gradient-social-2 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg mb-8">
              Apply to Be a Guest
            </button>
            <p className="text-corporate-gray text-lg">
              Have a story worth sharing? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
      </MainContent>
    </div>
  );
};

export default PodcastPage;
