import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const SolutionsOverview = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

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
    "Monthly video content strategy",
    "4-6 videos per month",
    "Dedicated project manager",
    "Priority scheduling",
    "Brand consistency guarantee",
    "Performance analytics",
    "Unlimited revisions"
  ];

  const projectFeatures = [
    "Complete video production",
    "Professional editing",
    "Custom graphics & animations",
    "Music & sound design",
    "Multiple format delivery",
    "2 rounds of revisions",
    "Fast turnaround"
  ];

  const faqs = [
    {
      question: "What's included in the monthly retainer?",
      answer: "Our monthly retainer includes 4-6 professionally produced videos, dedicated project management, priority scheduling, and unlimited revisions to ensure your content meets your brand standards."
    },
    {
      question: "How do one-off projects work?",
      answer: "One-off projects are perfect for specific campaigns or events. We'll work with you to understand your needs, provide a custom quote, and deliver high-quality video content on your timeline."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes! You can upgrade from one-off projects to a monthly retainer at any time. We'll work with you to find the best solution for your evolving video content needs."
    },
    {
      question: "What's the typical turnaround time?",
      answer: "Monthly retainer clients get priority scheduling with 5-7 business day turnaround. One-off projects typically take 10-14 business days depending on complexity and current workload."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-foreground">
            Flexible <span className="text-primary">plans</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect video production solution for your business. 
            Tailored plans that scale with your content needs.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4 bg-muted rounded-full p-2">
            <span className={`px-4 py-2 text-sm font-medium transition-colors ${!isAnnual ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`px-4 py-2 text-sm font-medium transition-colors ${isAnnual ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
              Yearly
              <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                Save 15%
              </span>
            </span>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Monthly Retainer Card */}
          <div className="relative bg-card border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-card-foreground mb-2">Monthly Retainer</h3>
              <p className="text-muted-foreground mb-4">
                Consistent video content with dedicated support
              </p>
              <div className="flex items-baseline">
                <span className="text-4xl font-black text-card-foreground">
                  ${isAnnual ? '2,549' : '2,999'}
                </span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              {isAnnual && (
                <p className="text-sm text-primary mt-1">
                  Billed annually • Save $5,400/year
                </p>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              {retainerFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleGetStarted}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* One-off Project Card */}
          <div className="bg-card border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-card-foreground mb-2">One-off Project</h3>
              <p className="text-muted-foreground mb-4">
                Custom video production for specific needs
              </p>
              <div className="flex items-baseline">
                <span className="text-4xl font-black text-card-foreground">$2,500</span>
                <span className="text-muted-foreground ml-2">starting</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {projectFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleGetStarted}
              className="w-full bg-secondary text-secondary-foreground py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
            >
              Get Quote
            </button>
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="bg-muted rounded-2xl p-8 mb-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Enterprise Solutions</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Need a custom solution? We work with enterprise clients to create tailored video production 
            packages that fit your specific requirements and scale.
          </p>
          <button
            onClick={handleContactSales}
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Contact Sales
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border rounded-xl p-6">
                <h4 className="text-lg font-semibold text-card-foreground mb-3">
                  {faq.question}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-primary/5 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to get started?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your business with professional video content that converts. 
            Choose your plan or contact us for a custom solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Your Project
            </button>
            <button
              onClick={handleViewAllPackages}
              className="inline-flex items-center px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
            >
              View All Packages
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};