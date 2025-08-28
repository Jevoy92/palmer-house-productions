import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Clock, 
  Target, 
  TrendingUp,
  Calendar,
  Lightbulb,
  CheckSquare,
  Download,
  PlayCircle,
  BarChart3,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: any;
  difficulty: 'easy' | 'medium' | 'advanced';
  timeToImplement: string;
  impact: 'low' | 'medium' | 'high';
  resourceType: 'template' | 'guide' | 'video' | 'system';
}

interface OverwhelmSymptom {
  id: string;
  title: string;
  description: string;
  icon: any;
  severity: number;
  solutions: string[];
}

export const ContentOverwhelmHub = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [emailForSolutions, setEmailForSolutions] = useState('');
  const [showPersonalizedPlan, setShowPersonalizedPlan] = useState(false);

  const overwhelmSymptoms: OverwhelmSymptom[] = [
    {
      id: 'no-strategy',
      title: 'No Clear Content Strategy',
      description: 'Creating content randomly without a cohesive plan or direction',
      icon: Target,
      severity: 9,
      solutions: ['content-strategy-template', 'planning-system', 'goal-setting-guide']
    },
    {
      id: 'idea-paralysis',
      title: 'Idea Generation Paralysis',
      description: 'Struggling to consistently come up with fresh, engaging content ideas',
      icon: Brain,
      severity: 8,
      solutions: ['idea-bank-system', 'content-pillars-guide', 'trending-topics-tracker']
    },
    {
      id: 'time-management',
      title: 'Time Management Crisis',
      description: 'Content creation taking too long, affecting other business priorities',
      icon: Clock,
      severity: 8,
      solutions: ['batch-creation-guide', 'time-blocking-template', 'efficiency-framework']
    },
    {
      id: 'quality-inconsistency',
      title: 'Quality Inconsistency',
      description: 'Video quality varies dramatically, creating unprofessional brand image',
      icon: BarChart3,
      severity: 7,
      solutions: ['quality-checklist', 'brand-guidelines', 'production-standards']
    },
    {
      id: 'platform-confusion',
      title: 'Multi-Platform Confusion',
      description: 'Overwhelmed by managing content across multiple social platforms',
      icon: TrendingUp,
      severity: 7,
      solutions: ['platform-strategy-guide', 'content-adaptation-system', 'scheduling-framework']
    },
    {
      id: 'performance-anxiety',
      title: 'Performance Tracking Anxiety',
      description: 'Either not tracking metrics or overwhelmed by data without actionable insights',
      icon: AlertTriangle,
      severity: 6,
      solutions: ['metrics-dashboard', 'performance-guide', 'optimization-playbook']
    }
  ];

  const solutions: Solution[] = [
    {
      id: 'content-strategy-template',
      title: 'Complete Content Strategy Template',
      description: 'Fill-in-the-blank template to create your comprehensive video content strategy',
      icon: Target,
      difficulty: 'easy',
      timeToImplement: '2-3 hours',
      impact: 'high',
      resourceType: 'template'
    },
    {
      id: 'idea-bank-system',
      title: 'Never-Ending Idea Bank System',
      description: 'Systematic approach to generate and organize 100+ content ideas',
      icon: Lightbulb,
      difficulty: 'medium',
      timeToImplement: '4-6 hours',
      impact: 'high',
      resourceType: 'system'
    },
    {
      id: 'batch-creation-guide',
      title: 'Batch Creation Mastery Guide',
      description: 'Create a month of content in one day with our proven batch system',
      icon: Calendar,
      difficulty: 'medium',
      timeToImplement: '1 day setup',
      impact: 'high',
      resourceType: 'guide'
    },
    {
      id: 'quality-checklist',
      title: 'Professional Quality Checklist',
      description: 'Ensure every video meets professional standards with this comprehensive checklist',
      icon: CheckSquare,
      difficulty: 'easy',
      timeToImplement: '30 minutes',
      impact: 'medium',
      resourceType: 'template'
    },
    {
      id: 'platform-strategy-guide',
      title: 'Multi-Platform Strategy Guide',
      description: 'Master content adaptation across all major social platforms',
      icon: TrendingUp,
      difficulty: 'advanced',
      timeToImplement: '1 week',
      impact: 'high',
      resourceType: 'guide'
    },
    {
      id: 'metrics-dashboard',
      title: 'Performance Metrics Dashboard',
      description: 'Track what matters with our simple but comprehensive metrics template',
      icon: BarChart3,
      difficulty: 'medium',
      timeToImplement: '2 hours',
      impact: 'medium',
      resourceType: 'template'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-social-green/20 text-social-green';
      case 'medium': return 'bg-social-orange/20 text-social-orange';
      case 'advanced': return 'bg-social-purple/20 text-social-purple';
      default: return 'bg-corporate-light text-corporate-gray';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-social-green';
      case 'medium': return 'text-social-orange';
      case 'low': return 'text-corporate-gray';
      default: return 'text-corporate-gray';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'template': return Download;
      case 'guide': return Download;
      case 'video': return PlayCircle;
      case 'system': return CheckSquare;
      default: return Download;
    }
  };

  const calculateOverwhelmScore = () => {
    if (selectedSymptoms.length === 0) return 0;
    const totalSeverity = selectedSymptoms.reduce((sum, symptomId) => {
      const symptom = overwhelmSymptoms.find(s => s.id === symptomId);
      return sum + (symptom?.severity || 0);
    }, 0);
    return Math.round((totalSeverity / (selectedSymptoms.length * 10)) * 100);
  };

  const getRecommendedSolutions = () => {
    const allSolutionIds = new Set<string>();
    selectedSymptoms.forEach(symptomId => {
      const symptom = overwhelmSymptoms.find(s => s.id === symptomId);
      symptom?.solutions.forEach(solutionId => allSolutionIds.add(solutionId));
    });
    return solutions.filter(solution => allSolutionIds.has(solution.id));
  };

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleGeneratePlan = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one overwhelm symptom');
      return;
    }
    if (!emailForSolutions) {
      alert('Please enter your email to receive your personalized plan');
      return;
    }
    
    setShowPersonalizedPlan(true);
    trackEvent('content_overwhelm_plan_generated', {
      symptoms_count: selectedSymptoms.length,
      overwhelm_score: calculateOverwhelmScore(),
      email: emailForSolutions
    });
  };

  const handleSolutionAccess = (solutionId: string) => {
    trackEvent('content_overwhelm_solution_accessed', {
      solution_id: solutionId,
      email: emailForSolutions
    });
    alert('Solution sent to your email!');
  };

  const overwhelmScore = calculateOverwhelmScore();
  const recommendedSolutions = getRecommendedSolutions();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
          🧠 Content Overwhelm Solutions
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
          Escape Your
          <br />
          <span className="text-gradient-2">Content Overwhelm</span>
        </h1>
        <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium mb-12">
          Stop feeling paralyzed by content creation. Get our proven systems to streamline 
          your video strategy, save time, and create consistently engaging content.
        </p>
        
        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-black text-gradient-2">3,500+</div>
            <div className="text-sm text-corporate-gray">Business Owners Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-gradient-1">75%</div>
            <div className="text-sm text-corporate-gray">Time Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-gradient-3">30 Days</div>
            <div className="text-sm text-corporate-gray">To Results</div>
          </div>
        </div>
      </section>

      {/* Overwhelm Assessment */}
      <section className="mb-16">
        <Card className="bg-gradient-to-br from-social-orange/10 to-social-yellow/10 border-0 video-shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-corporate-dark text-center mb-8">
              Content Overwhelm Assessment
            </CardTitle>
            <p className="text-corporate-gray text-center">
              Select the symptoms that resonate with your current content challenges
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {overwhelmSymptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => handleSymptomToggle(symptom.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'border-corporate-dark bg-corporate-light'
                      : 'border-corporate-light hover:border-corporate-gray bg-white'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${selectedSymptoms.includes(symptom.id) ? 'gradient-social-2' : 'bg-corporate-light'}`}>
                      <symptom.icon className={`w-6 h-6 ${selectedSymptoms.includes(symptom.id) ? 'text-white' : 'text-corporate-gray'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-corporate-dark mb-2">{symptom.title}</h3>
                      <p className="text-sm text-corporate-gray">{symptom.description}</p>
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-corporate-gray">Severity:</span>
                          <Progress value={symptom.severity * 10} className="h-2 w-20" />
                          <span className="text-xs font-bold text-corporate-dark">{symptom.severity}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {selectedSymptoms.length > 0 && (
              <div className="text-center p-6 bg-white rounded-xl border border-corporate-light">
                <div className="mb-4">
                  <div className="text-2xl font-black text-gradient-2 mb-2">
                    {overwhelmScore}% Overwhelm Score
                  </div>
                  <Progress value={overwhelmScore} className="max-w-xs mx-auto h-3" />
                </div>
                
                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email for personalized solutions"
                    value={emailForSolutions}
                    onChange={(e) => setEmailForSolutions(e.target.value)}
                    className="w-full max-w-md px-4 py-3 border border-corporate-gray rounded-lg"
                  />
                </div>
                
                <Button 
                  onClick={handleGeneratePlan}
                  className="gradient-social-2 text-white px-8 py-3 hover:scale-105 transition-all"
                >
                  Generate My Overwhelm Solution Plan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Personalized Solutions */}
      {showPersonalizedPlan && (
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-corporate-dark text-center mb-4">
                Your Personalized Solution Plan
              </CardTitle>
              <div className="text-center">
                <Badge className="gradient-social-2 text-white text-lg px-4 py-2">
                  {recommendedSolutions.length} Solutions Recommended
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedSolutions.map((solution) => {
                  const ResourceIcon = getResourceIcon(solution.resourceType);
                  return (
                    <Card key={solution.id} className="bg-white border border-corporate-light hover:scale-105 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="gradient-social-2 p-3 rounded-xl">
                            <ResourceIcon className="w-6 h-6 text-white" />
                          </div>
                          <Badge className={getDifficultyColor(solution.difficulty)}>
                            {solution.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-corporate-dark">
                          {solution.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-corporate-gray mb-4 text-sm">
                          {solution.description}
                        </p>
                        
                        <div className="space-y-2 mb-6 text-sm">
                          <div className="flex justify-between">
                            <span className="text-corporate-gray">Time to implement:</span>
                            <span className="font-medium text-corporate-dark">{solution.timeToImplement}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-corporate-gray">Impact:</span>
                            <span className={`font-bold ${getImpactColor(solution.impact)}`}>
                              {solution.impact.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handleSolutionAccess(solution.id)}
                          className="w-full gradient-social-2 text-white hover:scale-105 transition-all"
                        >
                          Get Solution
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Framework Overview */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-corporate-dark mb-4">
            Our Overwhelm-Proof Framework
          </h2>
          <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
            A systematic approach to eliminate content overwhelm and create sustainable video marketing
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-xl border border-corporate-light">
            <div className="w-16 h-16 gradient-social-1 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-corporate-dark mb-2">1. Strategic Clarity</h3>
            <p className="text-corporate-gray">
              Define clear goals and content pillars to eliminate random creation
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl border border-corporate-light">
            <div className="w-16 h-16 gradient-social-2 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-corporate-dark mb-2">2. Batch Systems</h3>
            <p className="text-corporate-gray">
              Create multiple pieces of content in focused batch sessions
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl border border-corporate-light">
            <div className="w-16 h-16 gradient-social-3 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-corporate-dark mb-2">3. Quality Standards</h3>
            <p className="text-corporate-gray">
              Consistent quality through templates and checklists
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl border border-corporate-light">
            <div className="w-16 h-16 gradient-social-4 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-corporate-dark mb-2">4. Smart Metrics</h3>
            <p className="text-corporate-gray">
              Track only what matters for continuous improvement
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <Card className="bg-gradient-to-br from-corporate-dark to-corporate-gray text-white border-0 video-shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Eliminate Content Overwhelm Forever?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join our comprehensive program and get the systems, templates, and support you need to create content confidently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('/video-packages', '_blank')}
              className="bg-white text-corporate-dark px-8 py-3 hover:scale-105 transition-all"
            >
              Get Complete System
            </Button>
            <Button 
              onClick={() => window.open('/discovery-call', '_blank')}
              variant="outline"
              className="border-white text-white px-8 py-3 hover:bg-white hover:text-corporate-dark transition-all"
            >
              Schedule Consultation
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};