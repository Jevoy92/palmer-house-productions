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
}

interface CalculatorResult {
  selectedTier: BudgetTier;
  projectedROI: number;
  breakEvenTime: string;
  recommendedPath: string;
  nextSteps: string[];
}

export const BudgetImpactCalculator = () => {
  const [budget, setBudget] = useState([5000]);
  const [revenue, setRevenue] = useState([50000]);
  const [goals, setGoals] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [contactDetails, setContactDetails] = useState({ name: "", email: "", phone: "" });

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
      outcomes: ["Improved brand awareness", "Basic social proof", "Content consistency"]
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
      outcomes: ["Strategic content plan", "Improved video quality", "Higher engagement"]
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
      outcomes: ["Consistent content flow", "Professional quality", "Measurable growth"]
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
      outcomes: ["Market leadership", "Brand transformation", "Significant revenue growth"]
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

    const projectedROI = Math.round((selectedTier.expectedROI / 100) * currentBudget);
    const monthsToBreakEven = Math.ceil(currentBudget / (projectedROI / 12));
    
    let recommendedPath = selectedTier.name;
    if (goals.includes("Generate more leads") && goals.includes("Improve conversion rates")) {
      recommendedPath = "Focus on conversion-driven content strategy";
    } else if (goals.includes("Increase brand awareness")) {
      recommendedPath = "Prioritize brand storytelling and social content";
    }

    const nextSteps = [
      "Schedule a strategy consultation",
      "Define clear success metrics",
      "Create content calendar",
      "Set up performance tracking"
    ];

    return {
      selectedTier,
      projectedROI,
      breakEvenTime: `${monthsToBreakEven} months`,
      recommendedPath,
      nextSteps
    };
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