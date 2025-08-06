import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Camera, Target, Lightbulb, TrendingUp, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface VideoReadinessAuditProps {
  onBack?: () => void;
}

interface AssessmentSection {
  id: string;
  title: string;
  icon: any;
  questions: {
    id: string;
    text: string;
    points: number;
  }[];
}

interface AuditResults {
  totalScore: number;
  maxScore: number;
  percentage: number;
  readinessLevel: 'Beginner' | 'Developing' | 'Ready' | 'Advanced';
  recommendations: string[];
  suggestedServices: string[];
}

export const VideoReadinessAudit = ({ onBack }: VideoReadinessAuditProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [emailForResults, setEmailForResults] = useState("");

  const sections: AssessmentSection[] = [
    {
      id: "strategy",
      title: "Strategic Foundation",
      icon: Target,
      questions: [
        { id: "clear-goals", text: "Do you have clear video marketing goals?", points: 5 },
        { id: "target-audience", text: "Do you know your target audience's video preferences?", points: 5 },
        { id: "content-pillars", text: "Have you defined your content pillars/themes?", points: 4 },
        { id: "competitor-analysis", text: "Have you analyzed competitor video strategies?", points: 3 },
        { id: "success-metrics", text: "Do you have defined success metrics for video content?", points: 4 }
      ]
    },
    {
      id: "technical",
      title: "Technical Readiness",
      icon: Camera,
      questions: [
        { id: "equipment", text: "Do you have basic video equipment (camera, mic, lighting)?", points: 4 },
        { id: "editing-software", text: "Do you have access to video editing software?", points: 3 },
        { id: "hosting-platform", text: "Do you have a video hosting/distribution plan?", points: 4 },
        { id: "brand-assets", text: "Do you have brand assets ready (logos, templates, etc.)?", points: 3 },
        { id: "technical-skills", text: "Does your team have basic video production skills?", points: 4 }
      ]
    },
    {
      id: "content",
      title: "Content Planning",
      icon: Lightbulb,
      questions: [
        { id: "content-calendar", text: "Do you have a content calendar or planning system?", points: 4 },
        { id: "script-templates", text: "Do you have script templates or talking points?", points: 3 },
        { id: "content-repurposing", text: "Do you have a content repurposing strategy?", points: 4 },
        { id: "approval-process", text: "Do you have a clear content approval process?", points: 3 },
        { id: "content-archive", text: "Do you maintain an organized content archive?", points: 3 }
      ]
    },
    {
      id: "distribution",
      title: "Distribution & Analytics",
      icon: TrendingUp,
      questions: [
        { id: "multi-platform", text: "Do you distribute content across multiple platforms?", points: 4 },
        { id: "analytics-tracking", text: "Do you track video performance analytics?", points: 5 },
        { id: "audience-engagement", text: "Do you actively engage with video comments/feedback?", points: 3 },
        { id: "optimization", text: "Do you optimize videos based on performance data?", points: 4 },
        { id: "conversion-tracking", text: "Do you track video-to-conversion metrics?", points: 5 }
      ]
    }
  ];

  const calculateResults = (): AuditResults => {
    let totalScore = 0;
    let maxScore = 0;

    sections.forEach(section => {
      section.questions.forEach(question => {
        maxScore += question.points;
        if (answers[question.id]) {
          totalScore += question.points;
        }
      });
    });

    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let readinessLevel: AuditResults['readinessLevel'];
    let recommendations: string[];
    let suggestedServices: string[];

    if (percentage >= 80) {
      readinessLevel = 'Advanced';
      recommendations = [
        "You're ready for advanced video strategies",
        "Focus on optimization and scaling",
        "Consider premium production quality"
      ];
      suggestedServices = ["Monthly Content Partnership", "Custom Video Strategy"];
    } else if (percentage >= 60) {
      readinessLevel = 'Ready';
      recommendations = [
        "You have a solid foundation",
        "Focus on consistency and quality improvement",
        "Optimize your distribution strategy"
      ];
      suggestedServices = ["Group Coaching", "Monthly Content Partnership"];
    } else if (percentage >= 40) {
      readinessLevel = 'Developing';
      recommendations = [
        "Build your strategic foundation",
        "Invest in basic equipment and training",
        "Start with a simple content plan"
      ];
      suggestedServices = ["DIY Downloads", "Group Coaching"];
    } else {
      readinessLevel = 'Beginner';
      recommendations = [
        "Start with strategy and planning",
        "Learn basic video production skills",
        "Focus on one platform initially"
      ];
      suggestedServices = ["DIY Downloads", "Discovery Call"];
    }

    return {
      totalScore,
      maxScore,
      percentage,
      readinessLevel,
      recommendations,
      suggestedServices
    };
  };

  const handleAnswer = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    trackEvent('audit_question_answered', {
      question_id: questionId,
      section: sections[currentSection].id,
      answer: value
    });
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      handleShowResults();
    }
  };

  const handleShowResults = () => {
    const results = calculateResults();
    setShowResults(true);
    trackEvent('audit_completed', {
      score: results.totalScore,
      percentage: results.percentage,
      readiness_level: results.readinessLevel
    });
  };

  const handleEmailSubmit = () => {
    if (emailForResults) {
      trackEvent('audit_email_captured', {
        email: emailForResults,
        score: calculateResults().percentage
      });
      // Here you would typically send the results via email
      alert("Results sent to your email!");
    }
  };

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  if (showResults) {
    const results = calculateResults();
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-corporate-dark mb-4">
              Your Video Readiness Score
            </CardTitle>
            <div className="text-6xl font-black text-gradient-1 mb-4">
              {results.percentage}%
            </div>
            <div className="text-xl text-corporate-gray">
              Readiness Level: <span className="font-bold text-gradient-2">{results.readinessLevel}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-corporate-dark mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="text-social-green w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-corporate-gray">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-corporate-dark mb-4">Suggested Services</h3>
                <ul className="space-y-2">
                  {results.suggestedServices.map((service, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ArrowRight className="text-social-blue w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-corporate-gray">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-corporate-light rounded-xl">
              <h3 className="text-lg font-bold text-corporate-dark mb-4">Get Detailed Results</h3>
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email for detailed results"
                  value={emailForResults}
                  onChange={(e) => setEmailForResults(e.target.value)}
                  className="flex-1 px-4 py-2 border border-corporate-gray rounded-lg"
                />
                <Button 
                  onClick={handleEmailSubmit}
                  className="gradient-social-1 text-white hover:scale-105 transition-all"
                >
                  Send Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-corporate-dark">Video Readiness Audit</h2>
          <div className="text-sm text-corporate-gray">
            Section {currentSection + 1} of {sections.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-2xl text-corporate-dark">
            <div className="gradient-social-1 p-3 rounded-xl">
              <currentSectionData.icon className="w-6 h-6 text-white" />
            </div>
            <span>{currentSectionData.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentSectionData.questions.map((question) => (
              <div key={question.id} className="p-4 bg-white rounded-xl border border-corporate-light">
                <div className="flex items-center justify-between">
                  <span className="text-corporate-dark font-medium">{question.text}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAnswer(question.id, true)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        answers[question.id] === true
                          ? 'bg-social-green text-white'
                          : 'bg-corporate-light text-corporate-gray hover:bg-social-green hover:text-white'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Yes</span>
                    </button>
                    <button
                      onClick={() => handleAnswer(question.id, false)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        answers[question.id] === false
                          ? 'bg-corporate-gray text-white'
                          : 'bg-corporate-light text-corporate-gray hover:bg-corporate-gray hover:text-white'
                      }`}
                    >
                      <Circle className="w-4 h-4" />
                      <span>No</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNextSection}
              className="gradient-social-1 text-white px-8 py-3 hover:scale-105 transition-all"
            >
              {currentSection === sections.length - 1 ? 'Get Results' : 'Next Section'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};