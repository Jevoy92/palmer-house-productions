import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, Clock, DollarSign, Users, ArrowLeft } from "lucide-react";
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
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Training ROI Calculator</CardTitle>
          <p className="text-muted-foreground">
            Calculate the potential return on investment for implementing video-based training systems
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Inputs</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employees" className="text-foreground font-medium">
                      Employees
                    </Label>
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
                  </div>

                  <div>
                    <Label htmlFor="trainingHours" className="text-foreground font-medium">
                      Training hours per employee (annual)
                    </Label>
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
                  </div>

                  <div>
                    <Label htmlFor="hourlyRate" className="text-foreground font-medium">
                      Average hourly rate ($)
                    </Label>
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
                  </div>

                  <div>
                    <Label htmlFor="supportTickets" className="text-foreground font-medium">
                      Support tickets per month
                    </Label>
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
                  </div>

                  <div>
                    <Label htmlFor="costPerTicket" className="text-foreground font-medium">
                      Cost per ticket ($)
                    </Label>
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
                  </div>
                </div>
              </div>
            </div>

            {/* Outputs Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Outputs</h3>
                {results ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Annual Training Savings (75%)</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        ${results.annualTrainingSavings.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Support Cost Reduction (60%)</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        ${results.supportCostReduction.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-bold">Total Annual ROI</span>
                      </div>
                      <span className="text-xl font-bold text-primary">
                        ${results.totalAnnualROI.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Payback (assumes $15,000)</span>
                      </div>
                      <span className="text-lg font-bold text-orange-600">
                        {results.paybackMonths} months
                      </span>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        Edit reductions or investment in code if needed.
                      </p>
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
                onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                className="ml-auto"
              >
                Schedule Consultation
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};