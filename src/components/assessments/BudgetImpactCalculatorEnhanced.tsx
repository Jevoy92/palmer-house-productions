import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Calculator,
  ArrowRight,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useAssessmentProgress } from "@/hooks/useAssessmentProgress";
import { ProgressResume } from "./ProgressResume";
import { EnhancedResults } from "./EnhancedResults";
import { ResultsExport } from "./ResultsExport";

interface BudgetImpactCalculatorEnhancedProps {
  onBack?: () => void;
}

interface BudgetTier {
  id: string;
  name: string;
  minBudget: number;
  maxBudget: number;
  description: string;
  expectedROI: number;
  timeToROI: string;
  videoCount: string;
  services: string[];
  outcomes: string[];
  industryMultipliers: Record<string, number>;
  timelineMonths: number;
}

interface Priority {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  timeline: string;
  category: string;
}

interface Milestone {
  month: number;
  title: string;
  goals: string[];
  metrics: string[];
}

interface CalculatorResult {
  selectedTier: BudgetTier;
  projectedROI: number;
  breakEvenTime: string;
  recommendedPath: string;
  nextSteps: string[];
  riskFactors: string[];
  confidenceLevel: number;
  monthlyMilestones: string[];
  industryBenchmark: {
    averageROI: number;
    timeToROI: number;
  };
  goalAlignment: number;
  sectionScores: Record<string, number>;
  priorities: Priority[];
  milestones: Milestone[];
}

export const BudgetImpactCalculatorEnhanced = ({ onBack }: BudgetImpactCalculatorEnhancedProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [budget, setBudget] = useState([5000]);
  const [revenue, setRevenue] = useState([50000]);
  const [goals, setGoals] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [contactDetails, setContactDetails] = useState({ name: "", email: "", phone: "" });
  const [businessProfile, setBusinessProfile] = useState({
    industry: "technology",
    businessStage: "growth",
    currentMarketingSpend: 0,
    competitorActivity: "medium"
  });

  const { progress, saveProgress, clearProgress, hasProgress } = useAssessmentProgress('budget-impact');

  const totalSections = 4;
  const sections = ['Business Profile', 'Budget & Revenue', 'Goals Selection', 'Results'];

  useEffect(() => {
    if (progress) {
      setCurrentSection(progress.currentSection);
      setBudget(progress.answers?.budget || [5000]);
      setRevenue(progress.answers?.revenue || [50000]);
      setGoals(progress.answers?.goals || []);
      // Safely restore business context with proper type checking
      const savedContext = progress.businessContext || {};
      setBusinessProfile({
        industry: savedContext.industry || "technology",
        businessStage: savedContext.businessStage || "growth",
        currentMarketingSpend: savedContext.currentMarketingSpend || 0,
        competitorActivity: savedContext.competitorActivity || "medium"
      });
    }
  }, [progress]);

  const budgetTiers: BudgetTier[] = [
    {
      id: "starter",
      name: "DIY Starter",
      minBudget: 500,
      maxBudget: 2500,
      description: "Self-guided video creation with templates and training",
      expectedROI: 300,
      timeToROI: "2-3 months",
      videoCount: "5-10 videos",
      services: ["DIY Downloads", "Templates", "Basic Training"],
      outcomes: ["Improved brand awareness", "Basic social proof", "Content consistency"],
      industryMultipliers: { "technology": 1.2, "healthcare": 1.1, "retail": 1.0, "finance": 1.3 },
      timelineMonths: 6
    },
    {
      id: "guided",
      name: "Guided Growth",
      minBudget: 2500,
      maxBudget: 8000,
      description: "Group coaching with structured video strategy",
      expectedROI: 450,
      timeToROI: "3-4 months",
      videoCount: "10-20 videos",
      services: ["Group Coaching", "Strategy Sessions", "Content Planning"],
      outcomes: ["Strategic content plan", "Improved video quality", "Higher engagement"],
      industryMultipliers: { "technology": 1.3, "healthcare": 1.2, "retail": 1.1, "finance": 1.4 },
      timelineMonths: 8
    },
    {
      id: "partnership",
      name: "Content Partnership",
      minBudget: 8000,
      maxBudget: 20000,
      description: "Monthly content creation and strategy partnership",
      expectedROI: 600,
      timeToROI: "4-6 months",
      videoCount: "20-40 videos",
      services: ["Monthly Content", "Strategy Partnership", "Performance Optimization"],
      outcomes: ["Consistent content flow", "Professional quality", "Measurable growth"],
      industryMultipliers: { "technology": 1.4, "healthcare": 1.3, "retail": 1.2, "finance": 1.5 },
      timelineMonths: 10
    },
    {
      id: "enterprise",
      name: "Custom Solutions",
      minBudget: 20000,
      maxBudget: 100000,
      description: "Full-service video strategy and production",
      expectedROI: 800,
      timeToROI: "6-12 months",
      videoCount: "40+ videos",
      services: ["Custom Strategy", "Full Production", "Multi-platform Distribution"],
      outcomes: ["Market leadership", "Brand transformation", "Significant revenue growth"],
      industryMultipliers: { "technology": 1.5, "healthcare": 1.4, "retail": 1.3, "finance": 1.6 },
      timelineMonths: 12
    }
  ];

  const goalOptions = [
    "Increase brand awareness",
    "Generate more leads",
    "Improve conversion rates",
    "Enhance customer education",
    "Build thought leadership",
    "Reduce support costs",
    "Launch new products",
    "Recruit talent"
  ];

  const calculateRecommendation = (): CalculatorResult => {
    const currentBudget = budget[0];
    const monthlyRevenue = revenue[0];
    
    const selectedTier = budgetTiers.find(tier => 
      currentBudget >= tier.minBudget && currentBudget <= tier.maxBudget
    ) || budgetTiers[budgetTiers.length - 1];

    const industryMultiplier = selectedTier.industryMultipliers[businessProfile.industry] || 1.0;
    const goalWeightedROI = selectedTier.expectedROI * industryMultiplier;
    const goalAlignment = calculateGoalAlignment(goals, selectedTier);
    
    const projectedROI = Math.round((goalWeightedROI / 100) * currentBudget);
    const monthsToBreakEven = Math.ceil(currentBudget / (projectedROI / selectedTier.timelineMonths));
    
    let recommendedPath = selectedTier.name;
    if (goals.includes("Generate more leads") && goals.includes("Improve conversion rates")) {
      recommendedPath = "Conversion-focused video funnel strategy";
    } else if (goals.includes("Increase brand awareness")) {
      recommendedPath = "Brand storytelling and awareness campaign";
    } else if (goals.includes("Build thought leadership")) {
      recommendedPath = "Educational content and expert positioning";
    }

    const nextSteps = generateNextSteps(selectedTier, goals, currentBudget);
    const riskFactors = calculateRiskFactors(currentBudget, monthlyRevenue, businessProfile);
    const confidenceLevel = calculateConfidenceLevel(goalAlignment, industryMultiplier, currentBudget, monthlyRevenue);
    const monthlyMilestones = generateMonthlyMilestones(selectedTier, goals);
    
    const industryBenchmark = {
      averageROI: selectedTier.expectedROI * 0.8,
      timeToROI: selectedTier.timelineMonths + 2
    };

    // Section scores based on assessment inputs
    const sectionScores = {
      'Budget Planning': currentBudget > monthlyRevenue * 0.05 ? 85 : 50,
      'Goal Alignment': goalAlignment,
      'Industry Fit': Math.round(industryMultiplier * 70),
      'ROI Potential': Math.min(95, Math.round((projectedROI / currentBudget) * 20)),
      'Risk Assessment': riskFactors.length < 2 ? 80 : 60
    };

    // Priority actions based on tier and goals with proper interface structure
    const priorities: Priority[] = [
      {
        id: "workflow",
        title: "Establish video production workflow",
        description: "Create systematic approach to video content creation",
        impact: 'High',
        effort: selectedTier.id === 'starter' ? 'High' : 'Medium',
        timeline: "2-4 weeks",
        category: "Production"
      },
      {
        id: "strategy",
        title: "Create content calendar and strategy",
        description: "Plan strategic video content aligned with business goals",
        impact: 'High',
        effort: 'Medium',
        timeline: "1-2 weeks",
        category: "Strategy"
      },
      {
        id: "analytics",
        title: "Set up measurement and analytics",
        description: "Track video performance and optimize based on data",
        impact: 'Medium',
        effort: 'Low',
        timeline: "1 week",
        category: "Analytics"
      }
    ];

    // 6-month implementation milestones with proper interface structure
    const milestones: Milestone[] = [
      {
        month: 1,
        title: "Foundation Phase",
        goals: ["Strategy development", "Team training"],
        metrics: ["Strategy document", "Team onboarded"]
      },
      {
        month: 2,
        title: "Content Creation Phase",
        goals: ["First video series", "Brand foundation"],
        metrics: ["3-5 videos published", "Brand guidelines set"]
      },
      {
        month: 3,
        title: "Optimization Phase",
        goals: ["Content optimization", "Performance tracking"],
        metrics: ["Analytics setup", "First performance review"]
      },
      {
        month: 4,
        title: "Scale Phase",
        goals: ["Scale production", "Advanced content"],
        metrics: ["10+ videos published", "Advanced formats tested"]
      },
      {
        month: 5,
        title: "Distribution Phase",
        goals: ["Distribution optimization", "Lead generation"],
        metrics: ["Multi-platform presence", "Lead tracking active"]
      },
      {
        month: 6,
        title: "Assessment Phase",
        goals: ["ROI assessment", "Strategy refinement"],
        metrics: ["ROI analysis complete", "Strategy v2 planned"]
      }
    ];

    return {
      selectedTier,
      projectedROI,
      breakEvenTime: `${monthsToBreakEven} months`,
      recommendedPath,
      nextSteps,
      riskFactors,
      confidenceLevel,
      monthlyMilestones,
      industryBenchmark,
      goalAlignment,
      sectionScores,
      priorities,
      milestones
    };
  };
  
  const calculateGoalAlignment = (selectedGoals: string[], tier: BudgetTier): number => {
    let alignmentScore = 0;
    const goalTierMapping: Record<string, string[]> = {
      "Increase brand awareness": ["starter", "guided"],
      "Generate more leads": ["guided", "partnership"],
      "Improve conversion rates": ["partnership", "enterprise"],
      "Build thought leadership": ["guided", "partnership", "enterprise"],
      "Launch new products": ["guided", "partnership"],
      "Recruit talent": ["starter", "guided"]
    };
    
    selectedGoals.forEach(goal => {
      if (goalTierMapping[goal]?.includes(tier.id)) {
        alignmentScore += 20;
      }
    });
    
    return Math.min(100, alignmentScore);
  };
  
  const generateNextSteps = (tier: BudgetTier, goals: string[], budget: number): string[] => {
    const steps: string[] = [];
    
    if (tier.id === "starter") {
      steps.push("Schedule DIY training session", "Set up basic video workspace");
    } else if (tier.id === "guided") {
      steps.push("Join group coaching program", "Plan content calendar");
    } else if (tier.id === "partnership") {
      steps.push("Schedule strategy consultation", "Define content workflow");
    } else {
      steps.push("Custom strategy development", "Dedicated team assignment");
    }
    
    if (goals.includes("Generate more leads")) {
      steps.push("Design lead-generation video funnel");
    }
    if (goals.includes("Increase brand awareness")) {
      steps.push("Create brand story video series");
    }
    
    return steps.slice(0, 4);
  };
  
  const calculateRiskFactors = (budget: number, revenue: number, profile: any): string[] => {
    const risks: string[] = [];
    
    if (budget > revenue * 0.1) {
      risks.push("Budget represents significant investment relative to revenue");
    }
    if (profile.businessStage === "startup") {
      risks.push("Early-stage business may need time to see video ROI");
    }
    if (profile.competitorActivity === "low") {
      risks.push("Limited competitive pressure may reduce urgency");
    }
    
    return risks;
  };
  
  const calculateConfidenceLevel = (goalAlignment: number, industryMultiplier: number, budget: number, revenue: number): number => {
    let confidence = 70;
    
    confidence += goalAlignment * 0.2;
    confidence += (industryMultiplier - 1) * 20;
    
    if (budget < revenue * 0.05) confidence += 10;
    if (budget > revenue * 0.15) confidence -= 15;
    
    return Math.max(60, Math.min(95, Math.round(confidence)));
  };
  
  const generateMonthlyMilestones = (tier: BudgetTier, goals: string[]): string[] => {
    const milestones: string[] = [];
    
    if (tier.id === "starter") {
      milestones.push("Month 1: Complete setup and first video", "Month 2-3: Establish routine", "Month 4-6: Optimize based on results");
    } else if (tier.id === "guided") {
      milestones.push("Month 1-2: Strategy and planning", "Month 3-5: Content production ramp-up", "Month 6-8: Performance optimization");
    } else {
      milestones.push("Month 1-3: Foundation and planning", "Month 4-8: Scale content production", "Month 9-12: Advanced optimization");
    }
    
    return milestones;
  };

  const handleNext = () => {
    const nextSection = Math.min(currentSection + 1, totalSections - 1);
    setCurrentSection(nextSection);
    
    // Save progress
    saveProgress({
      currentSection: nextSection,
      answers: { budget, revenue, goals },
      businessContext: businessProfile
    });

    if (nextSection === totalSections - 1) {
      setShowResults(true);
      const result = calculateRecommendation();
      trackEvent('budget_calculator_completed', {
        budget: budget[0],
        revenue: revenue[0],
        goals: goals.length,
        recommended_tier: result.selectedTier.id,
        projected_roi: result.projectedROI
      });
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const handleGoalToggle = (goal: string) => {
    const newGoals = goals.includes(goal)
      ? goals.filter(g => g !== goal)
      : [...goals, goal];
    
    setGoals(newGoals);
    
    // Auto-save progress
    saveProgress({
      currentSection,
      answers: { budget, revenue, goals: newGoals },
      businessContext: businessProfile
    });
  };

  const handleResume = () => {
    // Progress is already restored in useEffect
  };

  const handleRestart = () => {
    clearProgress();
    setCurrentSection(0);
    setBudget([5000]);
    setRevenue([50000]);
    setGoals([]);
    setShowResults(false);
    setBusinessProfile({
      industry: "technology",
      businessStage: "growth",
      currentMarketingSpend: 0,
      competitorActivity: "medium"
    });
  };

  // Show resume option if there's saved progress
  if (hasProgress && currentSection === 0 && !showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ProgressResume
          assessmentType="Budget Impact Calculator"
          currentSection={progress?.currentSection || 0}
          totalSections={totalSections}
          lastSaved={progress?.timestamp || Date.now()}
          onResume={handleResume}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  if (showResults) {
    const result = calculateRecommendation();
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <Button 
          onClick={() => setShowResults(false)}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessment
        </Button>

        <EnhancedResults
          score={result.confidenceLevel}
          level={result.confidenceLevel >= 80 ? 'High Confidence' : result.confidenceLevel >= 65 ? 'Medium Confidence' : 'Conservative'}
          sectionScores={result.sectionScores}
          priorities={result.priorities}
          milestones={result.milestones}
          industryBenchmark={result.industryBenchmark.averageROI}
          confidenceScore={result.confidenceLevel}
        />

        <ResultsExport
          assessmentType="Budget Impact Calculator"
          score={result.confidenceLevel}
          level={result.confidenceLevel >= 80 ? 'High Confidence' : result.confidenceLevel >= 65 ? 'Medium Confidence' : 'Conservative'}
          recommendations={result.nextSteps}
          businessContext={{...businessProfile, budget: budget[0], revenue: revenue[0], goals}}
          onScheduleConsultation={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078320', '_blank')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Progress value={(currentSection / (totalSections - 1)) * 100} className="flex-1 mx-4" />
        <span className="text-sm text-muted-foreground">
          {currentSection + 1} of {totalSections}
        </span>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-corporate-dark mb-4">
          {sections[currentSection]}
        </h2>
        <p className="text-corporate-gray max-w-2xl mx-auto">
          {currentSection === 0 && "Tell us about your business context"}
          {currentSection === 1 && "Set your budget and revenue parameters"}
          {currentSection === 2 && "Select your primary business goals"}
          {currentSection === 3 && "Review your investment strategy"}
        </p>
      </div>

      {currentSection === 0 && (
        <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-corporate-dark mb-2">
                  Industry
                </label>
                <select
                  value={businessProfile.industry}
                  onChange={(e) => setBusinessProfile(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full p-3 border border-corporate-gray rounded-lg"
                >
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="retail">Retail</option>
                  <option value="consulting">Consulting</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-corporate-dark mb-2">
                  Business Stage
                </label>
                <select
                  value={businessProfile.businessStage}
                  onChange={(e) => setBusinessProfile(prev => ({ ...prev, businessStage: e.target.value }))}
                  className="w-full p-3 border border-corporate-gray rounded-lg"
                >
                  <option value="startup">Startup</option>
                  <option value="growth">Growth Stage</option>
                  <option value="scale">Scale Stage</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <Button
                onClick={handleNext}
                className="w-full gradient-social-1 text-white hover:scale-105 transition-all"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentSection === 1 && (
        <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-corporate-dark mb-2">
                  Video Marketing Budget: ${budget[0].toLocaleString()}
                </label>
                <Slider
                  value={budget}
                  onValueChange={(value) => {
                    setBudget(value);
                    saveProgress({
                      currentSection,
                      answers: { budget: value, revenue, goals },
                      businessContext: businessProfile
                    });
                  }}
                  max={50000}
                  min={500}
                  step={500}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-corporate-gray">
                  <span>$500</span>
                  <span>$50,000+</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-corporate-dark mb-2">
                  Monthly Revenue: ${revenue[0].toLocaleString()}
                </label>
                <Slider
                  value={revenue}
                  onValueChange={(value) => {
                    setRevenue(value);
                    saveProgress({
                      currentSection,
                      answers: { budget, revenue: value, goals },
                      businessContext: businessProfile
                    });
                  }}
                  max={500000}
                  min={1000}
                  step={1000}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-corporate-gray">
                  <span>$1,000</span>
                  <span>$500,000+</span>
                </div>
              </div>

              <div className="flex justify-between">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  className="gradient-social-1 text-white hover:scale-105 transition-all"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentSection === 2 && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {goalOptions.map((goal) => (
              <Card
                key={goal}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  goals.includes(goal)
                    ? 'ring-2 ring-corporate-dark bg-corporate-light'
                    : 'hover:bg-corporate-light/50'
                }`}
                onClick={() => handleGoalToggle(goal)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-corporate-dark font-medium">{goal}</span>
                    {goals.includes(goal) && (
                      <CheckCircle className="w-5 h-5 text-social-green" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={goals.length === 0}
              className="gradient-social-1 text-white hover:scale-105 transition-all"
            >
              Calculate Impact
              <Calculator className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
