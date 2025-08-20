import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { PricingFAQ } from "./PricingFAQ";

export const SimplifiedPricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <main className="bg-background text-foreground font-sans">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-6 text-foreground">Flexible plans</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored, flexible plans designed to scale with you — whether you're just starting out or growing fast.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center mb-16">
          <span className="text-sm font-medium mr-3 text-foreground">Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="mx-2"
          />
          <span className="text-sm font-medium ml-3 text-foreground">Yearly</span>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Monthly Retainer Plan */}
          <div className="bg-muted/30 rounded-xl p-10 relative border border-border">
            <h2 className="text-3xl font-bold mb-2 text-foreground">Monthly retainer</h2>
            
            <div className="flex items-center mb-6">
              <span className="text-sm text-muted-foreground mr-2">Yearly</span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="scale-75"
              />
            </div>
            
            <p className="text-muted-foreground mb-10">
              Consistent, systemized video every month — a streamlined engine that removes posting stress, keeps messaging sharp, and builds a growing content library.
            </p>
            
            <div className="mb-10">
              <h3 className="text-sm text-muted-foreground mb-4">What's Included:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">Up to 2 shoot days/month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">Pre-production (scripting, teleprompter, planning)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">8–12 short videos (30–60s)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">1 evergreen video (3–5 min)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">FAQ/onboarding/client proof assets</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex items-end">
                <span className="text-2xl text-foreground">$</span>
                <span className="text-6xl font-bold text-foreground">
                  {isAnnual ? "2,999" : "3,749"}
                </span>
              </div>
              <p className="text-muted-foreground">
                {isAnnual ? "Billed annually (20% savings)" : "Billed monthly"}
              </p>
            </div>
            
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-full transition duration-300 w-full">
              Get started
            </button>
          </div>
          
          {/* One-off Project Plan */}
          <div className="bg-muted/30 rounded-xl p-10 relative border border-border">
            <h2 className="text-3xl font-bold mb-2 text-foreground">One off project</h2>
            
            <div className="h-5 mb-6"></div> {/* Spacer to align with other card */}
            
            <p className="text-muted-foreground mb-10">
              Clear scope, set timeline—Ideal for one-off projects that need sharp execution without the long-term commitment.
            </p>
            
            <div className="mb-10">
              <h3 className="text-sm text-muted-foreground mb-4">What's Included:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">Fixed scope, flat price</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">Clear timeline and milestones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">Custom one-off design requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="text-foreground">Great for launches, pitches, or rebrands</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="text-sm mb-2 text-muted-foreground">Starts at</p>
              <div className="flex items-end">
                <span className="text-2xl text-foreground">$</span>
                <span className="text-6xl font-bold text-foreground">3,000</span>
              </div>
            </div>
            
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-full transition duration-300 w-full">
              Book a call
            </button>
          </div>
        </div>
        
        {/* Enterprise Option */}
        <div className="text-center mb-24">
          <h3 className="text-2xl font-bold mb-3 text-foreground">Need a custom solution?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            For teams with specific requirements or larger content needs, we offer tailored enterprise packages.
          </p>
          <button className="border-2 border-foreground hover:bg-foreground hover:text-background text-foreground font-medium py-3 px-8 rounded-full transition duration-300">
            Contact sales
          </button>
        </div>
      </div>
      
      {/* FAQ Section */}
      <PricingFAQ />
      
      {/* Final CTA */}
      <div className="bg-background py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the plan that works for you and start creating amazing content today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/packages'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-full transition duration-300"
            >
              View All Packages
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="border-2 border-foreground hover:bg-foreground hover:text-background text-foreground font-medium py-3 px-8 rounded-full transition duration-300"
            >
              Talk to sales
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};