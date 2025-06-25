
import { useState } from "react";

interface BillingCycleProps {
  onCycleChange: (isAnnual: boolean) => void;
}

export const BillingCycle = ({ onCycleChange }: BillingCycleProps) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = (annual: boolean) => {
    setIsAnnual(annual);
    onCycleChange(annual);
  };

  return (
    <section className="py-16 bg-corporate-light/50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
          💰 Choose Your Billing
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-corporate-dark">
          Save with <span className="text-gradient-2">Annual Billing</span>
        </h2>
        <p className="text-xl text-corporate-gray mb-12 max-w-2xl mx-auto">
          Get 10% off when you commit to your video journey for a full year.
        </p>

        <div className="bg-white rounded-2xl p-8 video-shadow-lg max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => handleToggle(false)}
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                !isAnnual
                  ? 'gradient-social-1 text-white video-shadow'
                  : 'text-corporate-gray hover:text-corporate-dark'
              }`}
            >
              Monthly
            </button>
            
            <div className="text-2xl text-corporate-gray">|</div>
            
            <button
              onClick={() => handleToggle(true)}
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 relative ${
                isAnnual
                  ? 'gradient-social-2 text-white video-shadow'
                  : 'text-corporate-gray hover:text-corporate-dark'
              }`}
            >
              Annual
              {isAnnual && (
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  SAVE 10%
                </div>
              )}
            </button>
          </div>

          {isAnnual && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-green-700 font-bold text-lg mb-2">🎉 Annual Savings!</div>
              <div className="text-sm text-green-600">
                Lock in your video journey for 12 months and save 10% on all plans.
                <br />
                <span className="font-medium">Plus: Priority booking & exclusive strategy sessions</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
