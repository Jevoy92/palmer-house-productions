import { useNavigate } from "react-router-dom";
import { Users, CheckCircle, Video, Camera, Clock } from "lucide-react";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Navigation } from "@/components/Navigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";
import { FAQSchema } from "@/components/seo/FAQSchema";

const GroupCoaching = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Video, text: "6 Weekly Live Sessions", description: "Interactive group calls with direct feedback" },
    { icon: Camera, text: "On-Camera Practice", description: "Structured exercises to build confidence" },
    { icon: Users, text: "Small Cohort Size", description: "Maximum 8-10 founders per group" },
    { icon: CheckCircle, text: "Assignments & Feedback", description: "Weekly challenges with personalized guidance" },
    { icon: Clock, text: "Private Circle Group", description: "Ongoing community support and resources" }
  ];

  const curriculum = [
    {
      week: 1,
      title: "Foundation & Mindset",
      topics: ["Overcoming camera anxiety", "Finding your authentic voice", "Basic setup and lighting"]
    },
    {
      week: 2,
      title: "Storytelling Structure",
      topics: ["The Palmer House Framework", "Hook, story, call-to-action", "Brand narrative development"]
    },
    {
      week: 3,
      title: "Technical Fundamentals",
      topics: ["Equipment essentials", "Audio quality basics", "Framing and composition"]
    },
    {
      week: 4,
      title: "Content Strategy",
      topics: ["Planning your first 5 videos", "Repurposing content", "Platform optimization"]
    },
    {
      week: 5,
      title: "Practice & Feedback",
      topics: ["Live recording session", "Peer feedback rounds", "Common mistake corrections"]
    },
    {
      week: 6,
      title: "Launch & Scale",
      topics: ["Publishing strategy", "Measuring success", "Building consistent habits"]
    }
  ];

  const handleBooking = () => {
    navigate('/contact', { state: { selectedService: "Camera-Ready Brand Coaching" } });
  };

  return (
    <div className="min-h-screen bg-white">
      <MetaTags 
        title="Camera-Ready Brand Group Coaching | Palmer House Video"
        description="6-week Camera-Ready Brand group coaching program. Build on-camera confidence and create your first 3-5 brand videos with expert guidance and peer support."
        keywords="group coaching, camera confidence, brand coaching, video skills training, on-camera presence, Palmer House Productions"
        ogTitle="Group Coaching | Palmer House Productions"
        ogDescription="6-week Camera-Ready Brand group coaching program. Build on-camera confidence and create your first 3-5 brand videos with expert guidance and peer support."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <FAQSchema
        faqs={[
          { question: 'How many seats per cohort?', answer: '8–10 founders to keep feedback focused and actionable.' },
          { question: 'Are sessions recorded?', answer: 'Yes — replays are available for cohort members.' },
          { question: 'What’s the outcome?', answer: 'Confidence and skill to record your first 3–5 brand videos yourself.' },
          { question: 'Do you offer 1:1?', answer: 'This program is group-based. For custom systems, book a strategy call to discuss alternatives.' },
          { question: 'When does the next cohort start?', answer: 'Rolling cohorts launch every 6 weeks. Apply to join the next one.' }
        ]}
      />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-7xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-white font-bold text-lg mb-8">
                <Users className="inline-block mr-2" size={20} />
                6-Week Group Coaching
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                The <span className="text-gradient-purple">Camera-Ready</span> Brand
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-12 max-w-4xl mx-auto">
                Transform your on-camera presence with guided group coaching. Build confidence and skill to record your first 3-5 brand videos yourself.
              </p>
            </div>

            {/* Investment Overview */}
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl text-center video-shadow-lg border-4 border-gradient-to-r from-social-purple to-social-pink mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-gray-50 p-8 rounded-2xl border-2 border-social-purple/20">
                  <div className="text-5xl font-black mb-2 text-corporate-dark">$2,000</div>
                  <div className="text-lg font-medium text-corporate-gray">One-time investment</div>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl border-2 border-social-purple/20">
                  <div className="text-3xl font-bold mb-2 text-corporate-dark">8-10 Founders</div>
                  <div className="text-lg font-medium text-corporate-gray">Max seats per cohort</div>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl border-2 border-social-purple/20">
                  <div className="text-3xl font-bold mb-2 text-corporate-dark">Weekly Zoom</div>
                  <div className="text-lg font-medium text-corporate-gray">Live sessions + feedback</div>
                </div>
              </div>
              <button
                onClick={handleBooking}
                className="px-12 py-6 bg-gradient-to-r from-social-purple to-social-pink text-white font-bold text-xl rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
              >
                Join Next Cohort
              </button>
            </div>

            {/* Features Grid */}
            <div className="mb-16">
              <h2 className="text-4xl font-display font-black text-center text-corporate-dark mb-12">
                What's Included
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 gradient-social-2 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon color="white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-3">{feature.text}</h3>
                    <p className="text-corporate-gray">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="mb-16">
              <h2 className="text-4xl font-display font-black text-center text-corporate-dark mb-12">
                6-Week Curriculum
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {curriculum.map((week) => (
                  <div key={week.week} className="bg-white p-8 rounded-2xl video-shadow">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 gradient-social-3 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold">{week.week}</span>
                      </div>
                      <h3 className="text-xl font-bold text-corporate-dark">{week.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {week.topics.map((topic, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-corporate-gray">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-3xl p-12 border border-social-purple/20">
                <h3 className="text-4xl font-display font-black text-corporate-dark mb-6">
                  Ready to Transform Your Presence?
                </h3>
                <p className="text-xl text-corporate-gray mb-8 max-w-3xl mx-auto">
                  Join a community of founders who are building authentic, camera-ready brands. Limited spots available each month.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleBooking}
                    className="px-10 py-5 bg-gradient-to-r from-social-purple to-social-pink text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300"
                  >
                    Apply for Coaching
                  </button>
                  <a
                    href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 border-2 border-social-purple text-social-purple font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300"
                  >
                    Book Strategy Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
      
    </div>
  );
};

export default GroupCoaching;