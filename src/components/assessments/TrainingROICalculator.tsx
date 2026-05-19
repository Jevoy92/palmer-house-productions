import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calculator, TrendingUp, Clock, DollarSign, Users, ArrowLeft, HelpCircle, Info } from "lucide-react";
import { z } from 'zod';

interface TrainingROICalculatorProps {
  onBack?: () => void;
}

// Schema validation for inputs
const calculatorInputSchema = z.object({
  employees: z.number().min(1, "Employees must be at least 1").max(10000, "Employees cannot exceed 10,000"),
  trainingHours: z.number().min(1, "Training hours must be at least 1").max(200, "Training hours cannot exceed 200 per year"),
  hourlyRate: z.number().min(1, "Hourly rate must be at least $1").max(500, "Hourly rate cannot exceed $500"),
  supportTickets: z.number().min(0, "Support tickets cannot be negative").max(5000, "Support tickets cannot exceed 5,000 per month"),
  costPerTicket: z.number().min(1, "Cost per ticket must be at least $1").max(100, "Cost per ticket cannot exceed $100")
});

type CalculatorInputs = z.infer<typeof calculatorInputSchema>;

export const TrainingROICalculator = ({ onBack }: TrainingROICalculatorProps) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    employees: 50,
    trainingHours: 40,
    hourlyRate: 25,
    supportTickets: 200,
    costPerTicket: 10
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{
    annualTrainingSavings: number;
    supportCostReduction: number;
    totalAnnualROI: number;
    paybackMonths: number;
  } | null>(null);

  const validateAndCalculate = () => {
    try {
      // Validate inputs
      const validatedInputs = calculatorInputSchema.parse(inputs);
      
      // Clear any previous errors
      setErrors({});
      
      // Calculate ROI
      const annualTrainingCosts = validatedInputs.employees * validatedInputs.trainingHours * validatedInputs.hourlyRate;
      const annualTrainingSavings = Math.round(annualTrainingCosts * 0.75); // 75% reduction assumption
      
      const annualSupportCosts = validatedInputs.supportTickets * 12 * validatedInputs.costPerTicket;
      const supportCostReduction = Math.round(annualSupportCosts * 0.60); // 60% reduction assumption
      
      const totalAnnualROI = annualTrainingSavings + supportCostReduction;
      
      // Assume $15,000 investment for video training system
      const investment = 15000;
      const paybackMonths = Math.round((investment / (totalAnnualROI / 12)) * 10) / 10;
      
      setResults({
        annualTrainingSavings,
        supportCostReduction,
        totalAnnualROI,
        paybackMonths
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        setResults(null);
      }
    }
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Auto-calculate when inputs change and are valid
  useEffect(() => {
    validateAndCalculate();
  }, [inputs]);

  return (
    <TooltipProvider>
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Training ROI Calculator</CardTitle>
            <p className="text-muted-foreground">
              See how much money your company could save with video training systems
            </p>
          </CardHeader>

        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                  Your Company Information
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Enter your company's current numbers to calculate potential savings from video training</p>
                    </TooltipContent>
                  </Tooltip>
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="employees" className="text-foreground font-medium">
                        Number of Employees
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Total employees who need training (full-time, part-time, contractors)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="employees"
                      type="number"
                      value={inputs.employees}
                      onChange={(e) => handleInputChange('employees', e.target.value)}
                      className={`mt-1 ${errors.employees ? 'border-red-500' : ''}`}
                      placeholder="50"
                    />
                    {errors.employees && (
                      <p className="text-red-500 text-sm mt-1">{errors.employees}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Example: A mid-size company might have 50-200 employees
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="trainingHours" className="text-foreground font-medium">
                        Hours of Training Per Employee (Each Year)
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Include onboarding, safety training, skills development, and compliance training. Most companies average 30-50 hours per year.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="trainingHours"
                      type="number"
                      value={inputs.trainingHours}
                      onChange={(e) => handleInputChange('trainingHours', e.target.value)}
                      className={`mt-1 ${errors.trainingHours ? 'border-red-500' : ''}`}
                      placeholder="40"
                    />
                    {errors.trainingHours && (
                      <p className="text-red-500 text-sm mt-1">{errors.trainingHours}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Typical range: 30-50 hours (includes onboarding, safety, skills training)
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="hourlyRate" className="text-foreground font-medium">
                        Average Employee Cost Per Hour ($)
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Include salary + benefits + overhead. Typically 1.5-2x base hourly wage. For $20/hour wage, total cost is usually $25-30/hour.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={inputs.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      className={`mt-1 ${errors.hourlyRate ? 'border-red-500' : ''}`}
                      placeholder="25"
                    />
                    {errors.hourlyRate && (
                      <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Include benefits & overhead (usually 1.5-2x base wage)
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="supportTickets" className="text-foreground font-medium">
                        Help Requests Per Month
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>How many times per month do employees ask for help with processes, systems, or procedures? Include IT tickets, HR questions, and training requests.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="supportTickets"
                      type="number"
                      value={inputs.supportTickets}
                      onChange={(e) => handleInputChange('supportTickets', e.target.value)}
                      className={`mt-1 ${errors.supportTickets ? 'border-red-500' : ''}`}
                      placeholder="200"
                    />
                    {errors.supportTickets && (
                      <p className="text-red-500 text-sm mt-1">{errors.supportTickets}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Include IT help, process questions, and training requests
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="costPerTicket" className="text-foreground font-medium">
                        Cost To Handle Each Request ($)
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Time spent by support staff to answer questions (usually 15-30 minutes). If staff earns $20/hour, each 15-minute response costs about $5-10.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="costPerTicket"
                      type="number"
                      value={inputs.costPerTicket}
                      onChange={(e) => handleInputChange('costPerTicket', e.target.value)}
                      className={`mt-1 ${errors.costPerTicket ? 'border-red-500' : ''}`}
                      placeholder="10"
                    />
                    {errors.costPerTicket && (
                      <p className="text-red-500 text-sm mt-1">{errors.costPerTicket}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Avg. 15-30 min response time × support staff hourly rate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Outputs Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                  Your Potential Savings
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>These calculations are based on industry averages and typical video training effectiveness</p>
                    </TooltipContent>
                  </Tooltip>
                </h3>
                {results ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Training Cost Savings</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>Video training reduces instructor time, travel costs, and repeated sessions. You save 75% of current training costs while improving consistency.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-sm text-muted-foreground">75% reduction in training delivery costs</p>
                      </div>
                      <span className="text-lg font-bold text-green-600 ml-4">
                        ${results.annualTrainingSavings.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-start p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Fewer Help Requests</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>Well-trained employees need 60% less support. Video training provides clear, repeatable answers that reduce questions and mistakes.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-sm text-muted-foreground">60% fewer support tickets and questions</p>
                      </div>
                      <span className="text-lg font-bold text-blue-600 ml-4">
                        ${results.supportCostReduction.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-start p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="font-bold">Total Money Saved Per Year</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>Your total annual savings from reduced training costs and fewer support requests. This is money you can reinvest in growing your business.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-sm text-muted-foreground">Combined training + support savings</p>
                      </div>
                      <span className="text-xl font-bold text-primary ml-4">
                        ${results.totalAnnualROI.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-start p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">Break-Even Timeline</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p>How long until your video training system pays for itself. After this period, all savings go straight to your bottom line. Based on $15,000 investment.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-sm text-muted-foreground">Time to recover $15,000 investment</p>
                      </div>
                      <span className="text-lg font-bold text-orange-600 ml-4">
                        {results.paybackMonths} months
                      </span>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">How We Calculate These Numbers</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Training Savings:</strong> Based on 75% reduction in delivery costs (industry average)</li>
                            <li>• <strong>Support Reduction:</strong> Well-trained employees ask 60% fewer questions</li>
                            <li>• <strong>Investment:</strong> Typical video training system costs $15,000 to develop</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-center py-8">
                      {Object.keys(errors).length > 0 
                        ? "Please fix the input errors to see results" 
                        : "Enter your information to calculate ROI"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assessments
              </Button>
            )}
            
            {results && (
              <Button 
                onClick={() => window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer')}
                className="ml-auto"
              >
                Schedule Consultation
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
};