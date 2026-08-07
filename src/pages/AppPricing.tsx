import { Check, Zap, MessageCircle, BarChart, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SUBSCRIPTION_TIERS, ADDONS } from '@/lib/saas-pricing';
import { MetaTags } from '@/components/seo/MetaTags';
import { Canonical } from '@/components/seo/Canonical';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '@/lib/stripe';
import { toast } from 'sonner';
import { useState } from 'react';

const iconMap = {
  Zap,
  MessageCircle,
  BarChart,
  FileText
};

export default function AppPricing() {
  const user: { id: string; email?: string; user_metadata?: any } | null = null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectPlan = async (tierId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (tierId === 'free') {
      toast.info('You are already on the free plan');
      return;
    }

    const tier = SUBSCRIPTION_TIERS.find(t => t.id === tierId);
    if (!tier?.stripePriceId) {
      toast.error('This plan is not available yet');
      return;
    }

    setLoading(tierId);
    try {
      await createCheckoutSession({
        type: 'subscription',
        priceId: tier.stripePriceId,
        planId: tierId,
        userId: user.id,
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleSelectAddon = async (addonId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const addon = ADDONS.find(a => a.id === addonId);
    if (!addon?.stripePriceId) {
      toast.error('This add-on is not available yet');
      return;
    }

    setLoading(addonId);
    try {
      // For credit packages, use 'credits' type; for services, use 'addon' type
      const checkoutType = addon.category === 'credits' ? 'credits' : 'addon';
      
      await createCheckoutSession({
        type: checkoutType,
        priceId: addon.stripePriceId,
        planId: addonId,
        userId: user.id,
      });
    } catch (error) {
      console.error('Addon purchase error:', error);
      toast.error('Failed to purchase add-on. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <MetaTags
        title="Pricing - Content OS | Palmer House Productions"
        description="Choose the perfect plan for your video content creation needs. Start free or unlock full capabilities with Core or Guided Support tiers."
      />
      <Canonical />

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-pal-purple">Content OS</span> Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From free tools to guided support, find the perfect plan to automate and elevate your video content creation lifecycle.
          </p>
        </div>

        {/* Subscription Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <Card 
              key={tier.id} 
              className={`relative ${tier.isPopular ? 'border-pal-purple shadow-lg' : 'border-border'}`}
            >
              {tier.isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pal-purple text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">
                      ${tier.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {tier.monthlyCredits} credits/month
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-pal-purple flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleSelectPlan(tier.id)}
                  variant={tier.isPopular ? 'default' : 'outline'}
                  className="w-full"
                  disabled={loading === tier.id}
                >
                  {loading === tier.id ? 'Loading...' : tier.ctaText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add-ons Marketplace */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Extend Your <span className="text-pal-purple">Capabilities</span>
            </h2>
            <p className="text-muted-foreground">
              Add-ons available to any paid tier. Mix and match to build your perfect toolkit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADDONS.map((addon) => {
              const Icon = iconMap[addon.icon as keyof typeof iconMap];
              
              return (
                <Card key={addon.id} className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-pal-purple/10 rounded-lg">
                        <Icon className="h-5 w-5 text-pal-purple" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {addon.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{addon.name}</CardTitle>
                    <CardDescription>{addon.description}</CardDescription>
                  </CardHeader>

                  <CardFooter className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-foreground">
                      ${addon.price}
                    </div>
                    <Button
                      onClick={() => handleSelectAddon(addon.id)}
                      variant="outline"
                      size="sm"
                      disabled={loading === addon.id}
                    >
                      {loading === addon.id ? 'Loading...' : 'Add'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ / Additional Info */}
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Not sure which plan is right for you? Book a free 15-minute consultation to discuss your content needs.
          </p>
          <Button variant="default" asChild>
            <a href="https://calendar.app.google/TjXSG2EjNF7KZzcJ8" target="_blank" rel="noopener noreferrer">
              Schedule a Call
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
