import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Calculator,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface BudgetImpactCalculatorProps {
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
}

export const BudgetImpactCalculator = ({ onBack }: BudgetImpactCalculatorProps) => {
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

    // Apply industry and goal weighting to ROI calculations
    const industryMultiplier = selectedTier.industryMultipliers[businessProfile.industry] || 1.0;
    const goalWeightedROI = selectedTier.expectedROI * industryMultiplier;
    
    // Calculate goal alignment score
    const goalAlignment = calculateGoalAlignment(goals, selectedTier);
    
    const projectedROI = Math.round((goalWeightedROI / 100) * currentBudget);
    const monthsToBreakEven = Math.ceil(currentBudget / (projectedROI / selectedTier.timelineMonths));
    
    // Generate intelligent path recommendation
    let recommendedPath = selectedTier.name;
    if (goals.includes("Generate more leads") && goals.includes("Improve conversion rates")) {
      recommendedPath = "Conversion-focused video funnel strategy";
    } else if (goals.includes("Increase brand awareness")) {
      recommendedPath = "Brand storytelling and awareness campaign";
    } else if (goals.includes("Build thought leadership")) {
      recommendedPath = "Educational content and expert positioning";
    } else if (goals.includes("Launch new products")) {
      recommendedPath = "Product launch and demonstration strategy";
    }

    // Generate specific next steps based on tier and goals
    const nextSteps = generateNextSteps(selectedTier, goals, currentBudget);
    
    // Calculate risk factors
    const riskFactors = calculateRiskFactors(currentBudget, monthlyRevenue, businessProfile);
    
    // Confidence level based on multiple factors
    const confidenceLevel = calculateConfidenceLevel(goalAlignment, industryMultiplier, currentBudget, monthlyRevenue);
    
    // Monthly milestones
    const monthlyMilestones = generateMonthlyMilestones(selectedTier, goals);
    
    // Industry benchmark
    const industryBenchmark = {
      averageROI: selectedTier.expectedROI * 0.8, // Industry average is typically 80% of our projected
      timeToROI: selectedTier.timelineMonths + 2
    };

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
      goalAlignment
    };
  };
  
  const calculateGoalAlignment = (selectedGoals: string[], tier: BudgetTier): number => {
    // Score based on how well the tier aligns with selected goals
    let alignmentScore = 0;
    const goalTierMapping: Record<string, string[]> = {
      "Increase brand awareness": ["starter", "growth"],
      "Generate more leads": ["growth", "scale"],
      "Improve conversion rates": ["scale", "enterprise"],
      "Build thought leadership": ["growth", "scale", "enterprise"],
      "Launch new products": ["growth", "scale"],
      "Recruit talent": ["starter", "growth"]
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
    
    // Tier-specific steps
    if (tier.id === "starter") {
      steps.push("Schedule DIY training session", "Set up basic video workspace");
    } else if (tier.id === "growth") {
      steps.push("Join group coaching program", "Plan content calendar");
    } else if (tier.id === "scale") {
      steps.push("Schedule strategy consultation", "Define content workflow");
    } else {
      steps.push("Custom strategy development", "Dedicated team assignment");
    }
    
    // Goal-specific steps
    if (goals.includes("Generate more leads")) {
      steps.push("Design lead-generation video funnel");
    }
    if (goals.includes("Increase brand awareness")) {
      steps.push("Create brand story video series");
    }
    
    return steps.slice(0, 4); // Limit to 4 most relevant steps
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
    let confidence = 70; // Base confidence
    
    confidence += goalAlignment * 0.2; // Goal alignment impact
    confidence += (industryMultiplier - 1) * 20; // Industry favorability
    
    if (budget < revenue * 0.05) confidence += 10; // Conservative budget
    if (budget > revenue * 0.15) confidence -= 15; // Aggressive budget
    
    return Math.max(60, Math.min(95, Math.round(confidence)));
  };
  
  const generateMonthlyMilestones = (tier: BudgetTier, goals: string[]): string[] => {
    const milestones: string[] = [];
    
    if (tier.id === "starter") {
      milestones.push("Month 1: Complete setup and first video", "Month 2-3: Establish routine", "Month 4-6: Optimize based on results");
    } else if (tier.id === "growth") {
      milestones.push("Month 1-2: Strategy and planning", "Month 3-5: Content production ramp-up", "Month 6-8: Performance optimization");
    } else {
      milestones.push("Month 1-3: Foundation and planning", "Month 4-8: Scale content production", "Month 9-12: Advanced optimization");
    }
    
    return milestones;
  };

  const handleGoalToggle = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleCalculate = () => {
    setShowResults(true);
    const result = calculateRecommendation();
    trackEvent('budget_calculator_completed', {
      budget: budget[0],
      revenue: revenue[0],
      goals: goals.length,
      recommended_tier: result.selectedTier.id,
      projected_roi: result.projectedROI
    });
  };

  const handleContactSubmit = () => {
    const result = calculateRecommendation();
    trackEvent('budget_calculator_contact_captured', {
      name: contactDetails.name,
      email: contactDetails.email,
      phone: contactDetails.phone,
      budget: budget[0],
      tier: result.selectedTier.id
    });
    alert("Thank you! We'll contact you to discuss your custom video strategy.");
  };

  if (showResults) {
    const result = calculateRecommendation();
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-corporate-dark mb-4">
              Your Video Investment Strategy
            </CardTitle>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-4xl font-black text-gradient-1">${result.projectedROI.toLocaleString()}</div>
                <div className="text-sm text-corporate-gray">Projected ROI</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-gradient-2">{result.breakEvenTime}</div>
                <div className="text-sm text-corporate-gray">Break-even Time</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-corporate-dark mb-4">Recommended: {result.selectedTier.name}</h3>
              <p className="text-corporate-gray mb-4">{result.selectedTier.description}</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded-xl border border-corporate-light">
                  <h4 className="font-bold text-corporate-dark mb-2">Investment Range</h4>
                  <div className="text-2xl font-bold text-gradient-1">
                    ${result.selectedTier.minBudget.toLocaleString()} - ${result.selectedTier.maxBudget.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-corporate-light">
                  <h4 className="font-bold text-corporate-dark mb-2">Expected ROI</h4>
                  <div className="text-2xl font-bold text-gradient-2">
                    {result.selectedTier.expectedROI}%
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-corporate-light">
                  <h4 className="font-bold text-corporate-dark mb-2">Video Output</h4>
                  <div className="text-lg font-bold text-corporate-dark">
                    {result.selectedTier.videoCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-corporate-dark mb-4">Included Services</h4>
                <ul className="space-y-2">
                  {result.selectedTier.services.map((service, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="text-social-green w-5 h-5" />
                      <span className="text-corporate-gray">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-corporate-dark mb-4">Expected Outcomes</h4>
                <ul className="space-y-2">
                  {result.selectedTier.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Target className="text-social-blue w-5 h-5" />
                      <span className="text-corporate-gray">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 bg-corporate-light rounded-xl">
              <h3 className="text-lg font-bold text-corporate-dark mb-4">Ready to Get Started?</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={contactDetails.name}
                  onChange={(e) => setContactDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="px-4 py-2 border border-corporate-gray rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={contactDetails.email}
                  onChange={(e) => setContactDetails(prev => ({ ...prev, email: e.target.value }))}
                  className="px-4 py-2 border border-corporate-gray rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={contactDetails.phone}
                  onChange={(e) => setContactDetails(prev => ({ ...prev, phone: e.target.value }))}
                  className="px-4 py-2 border border-corporate-gray rounded-lg"
                />
              </div>
              <Button 
                onClick={handleContactSubmit}
                className="gradient-social-1 text-white hover:scale-105 transition-all w-full"
              >
                Schedule Strategy Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-corporate-dark mb-4">Budget vs Impact Calculator</h2>
        <p className="text-corporate-gray max-w-2xl mx-auto">
          Discover the right video investment strategy for your business goals and budget
        </p>
      </div>

      <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl text-corporate-dark">
            <DollarSign className="w-6 h-6" />
            <span>Budget & Revenue</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-corporate-dark mb-2">
                Video Marketing Budget: ${budget[0].toLocaleString()}
              </label>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={50000}
                min={500}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-corporate-gray mt-1">
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
                onValueChange={setRevenue}
                max={500000}
                min={10000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-corporate-gray mt-1">
                <span>$10K</span>
                <span>$500K+</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl text-corporate-dark">
            <Target className="w-6 h-6" />
            <span>Your Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {goalOptions.map((goal) => (
              <button
                key={goal}
                onClick={() => handleGoalToggle(goal)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  goals.includes(goal)
                    ? 'border-corporate-dark bg-corporate-light text-corporate-dark'
                    : 'border-corporate-light hover:border-corporate-gray text-corporate-gray'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{goal}</span>
                  {goals.includes(goal) && (
                    <CheckCircle className="w-4 h-4 text-social-green" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={handleCalculate}
          disabled={goals.length === 0}
          className="gradient-social-1 text-white px-8 py-3 hover:scale-105 transition-all disabled:opacity-50"
        >
          Calculate ROI & Strategy
          <Calculator className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};