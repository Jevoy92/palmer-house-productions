import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export const SolutionsOverview = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [monthlyRetainerIsYearly, setMonthlyRetainerIsYearly] = useState(false);

  const handleContactSales = () => {
    navigate('/contact');
  };

  const handleViewAllPackages = () => {
    navigate('/video-packages');
  };

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const retainerFeatures = [
    "Up to 2 shoot days/month",
    "Pre-production (scripting, teleprompter, planning)",
    "8–12 short videos (30–60s)",
    "1 evergreen video (3–5 min)",
    "FAQ/onboarding/client proof assets"
  ];

  const projectFeatures = [
    "Fixed scope, flat price",
    "Clear timeline and milestones", 
    "Custom one-off design requests",
    "Great for launches, pitches, or rebrands"
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will take effect at the start of your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, ACH transfers, and wire transfers for enterprise customers."
    },
    {
      question: "Is there a minimum contract period?",
      answer: "Monthly plans require a 3-month minimum commitment. One-off projects have no minimum term."
    },
    {
      question: "What happens if I need more content?",
      answer: "You can purchase additional content packages or upgrade to a higher tier plan at any time to meet your needs."
    }
  ];

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-7xl font-bold mb-6">Flexible plans</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Tailored, flexible plans designed to scale with you — whether you're just starting out or growing fast.
        </p>
      </div>

      {/* Global Billing Toggle */}
      <div className="flex justify-center items-center mb-16">
        <span className="text-sm font-medium mr-3">Monthly</span>
        <ToggleSwitch 
          checked={isAnnual} 
          onChange={setIsAnnual}
        />
        <span className="text-sm font-medium ml-3">Yearly</span>
      </div>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Monthly Retainer Plan */}
        <div className="bg-gray-100 rounded-xl p-10 relative">
          <h2 className="text-3xl font-bold mb-2">Monthly retainer</h2>
          
          <div className="flex items-center mb-6">
            <span className="text-sm text-gray-500 mr-2">Yearly</span>
            <ToggleSwitch 
              checked={monthlyRetainerIsYearly} 
              onChange={setMonthlyRetainerIsYearly}
            />
          </div>
          
          <p className="text-gray-600 mb-10">
            Consistent, systemized video every month — a streamlined engine that removes posting stress, keeps messaging sharp, and builds a growing content library.
          </p>
          
          <div className="mb-10">
            <h3 className="text-sm text-gray-500 mb-4">What's Included:</h3>
            <ul className="space-y-3">
              {retainerFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-2">◦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <div className="flex items-end">
              <span className="text-2xl">$</span>
              <span className="text-6xl font-bold">
                {monthlyRetainerIsYearly ? '2,549' : '2,999'}
              </span>
            </div>
            <p className="text-gray-600">
              {monthlyRetainerIsYearly ? 'Billed yearly (save $5,400/year)' : 'Billed monthly (3-month minimum)'}
            </p>
          </div>
          
          <button 
            onClick={handleGetStarted}
            className="bg-primary hover:bg-opacity-90 text-primary-foreground font-medium py-3 px-6 rounded-full transition duration-300"
          >
            Get started
          </button>
        </div>
        
        {/* One-off Project Plan */}
        <div className="bg-gray-100 rounded-xl p-10 relative">
          <h2 className="text-3xl font-bold mb-2">One off project</h2>
          
          <div className="h-5 mb-6"></div> {/* Spacer to align with other card */}
          
          <p className="text-gray-600 mb-10">
            Clear scope, set timeline—Ideal for one-off projects that need sharp execution without the long-term commitment.
          </p>
          
          <div className="mb-10">
            <h3 className="text-sm text-gray-500 mb-4">What's Included:</h3>
            <ul className="space-y-3">
              {projectFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-2">◦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="text-sm mb-2">Starts at</p>
            <div className="flex items-end">
              <span className="text-2xl">$</span>
              <span className="text-6xl font-bold">2500</span>
            </div>
          </div>
          
          <button 
            onClick={handleGetStarted}
            className="bg-primary hover:bg-opacity-90 text-primary-foreground font-medium py-3 px-6 rounded-full transition duration-300"
          >
            Book a call
          </button>
        </div>
      </div>
      
      {/* Enterprise Option */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold mb-3">Need a custom solution?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          For teams with specific requirements or larger content needs, we offer tailored enterprise packages.
        </p>
        <button 
          onClick={handleContactSales}
          className="border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground text-secondary font-medium py-3 px-8 rounded-full transition duration-300"
        >
          Contact sales
        </button>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Choose the plan that works for you and start creating amazing content today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={handleGetStarted}
            className="bg-primary hover:bg-opacity-90 text-primary-foreground font-medium py-3 px-8 rounded-full transition duration-300"
          >
            Get started now
          </button>
          <button 
            onClick={handleContactSales}
            className="border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground text-secondary font-medium py-3 px-8 rounded-full transition duration-300"
          >
            Talk to sales
          </button>
        </div>
      </div>
    </section>
  );
};