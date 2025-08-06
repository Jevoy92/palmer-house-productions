
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  Megaphone, 
  Award,
  ArrowRight 
} from "lucide-react";

export const VideoNeedsQuiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const navigate = useNavigate();

  const questions = [
    {
      id: "team-training",
      title: "Team Training & SOPs",
      description: "Internal processes, onboarding, and training materials",
      icon: Users,
      gradient: "gradient-social-1",
      recommendation: "Monthly Content or One-Time Bundles"
    },
    {
      id: "social-growth",
      title: "Social Media Growth",
      description: "Instagram, TikTok, LinkedIn content that converts",
      icon: TrendingUp,
      gradient: "gradient-social-2",
      recommendation: "DIY Downloads or Group Coaching"
    },
    {
      id: "education",
      title: "Customer Education",
      description: "FAQ videos, tutorials, and how-to content",
      icon: BookOpen,
      gradient: "gradient-social-3",
      recommendation: "Group Coaching or One-Time Bundles"
    },
    {
      id: "marketing",
      title: "Marketing & Lead Gen",
      description: "Promotional videos, ads, and conversion content",
      icon: Megaphone,
      gradient: "gradient-social-4",
      recommendation: "DIY Downloads or Group Coaching"
    },
    {
      id: "authority",
      title: "Authority Building",
      description: "Thought leadership, speaking, and expertise content",
      icon: Award,
      gradient: "gradient-social-1",
      recommendation: "Monthly Content or One-Time Bundles"
    }
  ];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleGetRecommendation = () => {
    // Navigate to contact with pre-filled information
    navigate('/contact', { 
      state: { 
        quizResult: selectedAnswer,
        source: 'discovery_quiz' 
      } 
    });
  };

  return (
    <section id="video-needs-quiz" className="py-24 bg-corporate-light">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🎯 Quick Quiz
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            What Kind of Video
            <br />
            <span className="text-gradient-1">Do You Need?</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium">
            Tell us your primary goal and we'll recommend the perfect package
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {questions.map((question) => (
            <button
              key={question.id}
              onClick={() => handleAnswerSelect(question.id)}
              className={`w-full p-6 bg-white rounded-xl border-2 transition-all duration-300 text-left hover:border-corporate-dark group ${
                selectedAnswer === question.id 
                  ? 'border-corporate-dark bg-corporate-light' 
                  : 'border-corporate-light hover:bg-corporate-light/30'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${question.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <question.icon color="white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-corporate-dark mb-2 group-hover:text-gradient-1 transition-all">
                    {question.title}
                  </h3>
                  <p className="text-corporate-gray leading-relaxed">
                    {question.description}
                  </p>
                  {selectedAnswer === question.id && (
                    <div className="mt-3 text-sm text-gradient-2 font-medium">
                      → Recommended: {question.recommendation}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 mt-2">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedAnswer === question.id 
                      ? 'bg-corporate-dark border-corporate-dark' 
                      : 'border-corporate-gray group-hover:border-corporate-dark'
                  }`}>
                    {selectedAnswer === question.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <div className="text-center">
            <button
              onClick={handleGetRecommendation}
              className="px-8 py-4 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg inline-flex items-center space-x-2"
            >
              <span>Get My Recommendation</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
