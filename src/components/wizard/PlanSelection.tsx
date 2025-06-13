
import { Button } from "@/components/ui/button";
import { ServiceType, PlanType } from "./types";

interface PlanSelectionProps {
  selectedPlan?: PlanType;
  serviceType?: ServiceType;
  onPlanSelect: (plan: PlanType) => void;
  onBack: () => void;
}

export const PlanSelection = ({ serviceType, onPlanSelect, onBack }: PlanSelectionProps) => {
  // Skip plan selection for consultation and glimpse services
  if (serviceType === "consultation" || serviceType === "base-glimpse" || serviceType === "full-glimpse") {
    // Auto-advance for these services
    setTimeout(() => onPlanSelect("trailhead" as PlanType), 0);
    return null;
  }

  const plans = [
    {
      id: "trailhead" as PlanType,
      name: "Trailhead",
      icon: "🥾",
      price: "$1,500",
      period: "/month",
      description: "For solo adventurers and early-stage businesses",
      features: [
        "Up to 4 minutes of premium content",
        "1 dedicated shoot day/month",
        "1x monthly strategy session",
        "Pre-shoot coaching",
        "Monthly success check-in",
        "Basic analytics & reporting"
      ],
      gradient: "gradient-social-1",
    },
    {
      id: "basecamp" as PlanType,
      name: "Basecamp",
      icon: "🏕",
      price: "$3,500",
      period: "/month",
      description: "For growing teams ready to establish stronger presence",
      features: [
        "10 minutes of content",
        "2 shoot days/month",
        "2x strategy sessions",
        "Multi-campaign content blueprint",
        "Premiere editing",
        "Enhanced analytics"
      ],
      gradient: "gradient-social-2",
      highlight: true,
    },
    {
      id: "summit" as PlanType,
      name: "Summit",
      icon: "🏔",
      price: "$7,500",
      period: "/month",
      description: "For regional brands pushing for authority and scale",
      features: [
        "25 minutes of content",
        "Flexible shoot schedule",
        "Weekly strategy sessions",
        "Cross-platform campaigns",
        "Dedicated account lead",
        "Deep-dive analytics & ROI"
      ],
      gradient: "gradient-social-3",
    },
    {
      id: "pinnacle" as PlanType,
      name: "Pinnacle",
      icon: "🌄",
      price: "$20,000",
      period: "/month",
      description: "For enterprises demanding premium content and agility",
      features: [
        "75 minutes of cinematic content",
        "Unlimited shoot days",
        "Weekly + quarterly strategy",
        "Dedicated pre-production manager",
        "Real-time analytics dashboard",
        "Platform optimization"
      ],
      gradient: "gradient-social-4",
    },
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Choose Your <span className="text-gradient-1">Monthly Plan</span>
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Select the ongoing partnership that fits your brand's growth.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => onPlanSelect(plan.id)}
            className={`group p-6 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 text-left relative ${
              plan.highlight ? 'border-2 border-social-purple' : ''
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="gradient-social-2 text-white px-4 py-2 rounded-full text-sm font-bold video-shadow">
                  🌟 Most Popular
                </div>
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className={`w-16 h-16 ${plan.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                {plan.icon}
              </div>
              <h3 className="text-2xl font-display font-black text-corporate-dark mb-3">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-black text-corporate-dark">{plan.price}</span>
                <span className="text-corporate-gray text-lg">{plan.period}</span>
              </div>
              <p className="text-corporate-gray text-sm">{plan.description}</p>
            </div>
            
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 ${plan.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                  <span className="text-corporate-gray text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-corporate-gray text-corporate-gray hover:bg-corporate-light"
        >
          ← Back
        </Button>
      </div>
    </div>
  );
};
