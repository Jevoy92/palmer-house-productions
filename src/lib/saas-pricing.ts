// SaaS Subscription Tiers and Add-ons

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number; // Monthly price in dollars
  stripePriceId?: string; // Stripe price ID for checkout
  monthlyCredits: number;
  strategySessionsPerMonth: number;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number; // One-time or monthly price
  stripePriceId?: string; // Stripe price ID for checkout
  description: string;
  category: 'tools' | 'support' | 'content' | 'credits';
  icon: string;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    stripePriceId: undefined,
    monthlyCredits: 10,
    strategySessionsPerMonth: 0,
    features: [
      'Video Series Builder only',
      '10 credits per month',
      'Preview outputs only (no downloads)',
      'Basic content calendar view',
      'Email support'
    ],
    ctaText: 'Get Started'
  },
  {
    id: 'core',
    name: 'Core',
    price: 49,
    stripePriceId: 'price_1SSygOGcAcCB6YlQQptmaRuO',
    monthlyCredits: 200,
    strategySessionsPerMonth: 1,
    isPopular: true,
    features: [
      'All AI tools unlocked',
      '200 credits per month',
      'Unlimited downloads & publishing',
      'Full content calendar & scheduling',
      'Video Series, Persona, Maximizer builders',
      '1 monthly strategy session',
      'Priority email support'
    ],
    ctaText: 'Start Core Plan'
  },
  {
    id: 'guided',
    name: 'Guided Support',
    price: 149,
    stripePriceId: 'price_1SSyh2GcAcCB6YlQQ8rNTLdm',
    monthlyCredits: 500,
    strategySessionsPerMonth: 2,
    features: [
      'Everything in Core',
      '500 credits per month',
      '2 monthly strategy sessions',
      'Advanced system builders (FAQ, Onboarding, Recruitment)',
      'Publishing calendar with automation',
      'Priority support & direct access',
      'Exclusive client benefits'
    ],
    ctaText: 'Get Guided Support'
  }
];

export const ADDONS: Addon[] = [
  {
    id: 'extra-credits-100',
    name: '100 Extra Credits',
    price: 10,
    stripePriceId: 'price_1SSyiAGcAcCB6YlQfoOV70Qs',
    description: 'Perfect for busy months when you need a little more AI power',
    category: 'credits',
    icon: 'Zap'
  },
  {
    id: 'extra-credits-500',
    name: '500 Extra Credits',
    price: 40,
    stripePriceId: 'price_1SSyirGcAcCB6YlQiNXI7ukX',
    description: 'Great value for high-volume content creators',
    category: 'credits',
    icon: 'Zap'
  },
  {
    id: 'extra-credits-1000',
    name: '1000 Extra Credits',
    price: 75,
    stripePriceId: 'price_1SSyjHGcAcCB6YlQ79WOY2hB',
    description: 'Best value for power users and agencies',
    category: 'credits',
    icon: 'Zap'
  },
  {
    id: 'strategy-session',
    name: 'Extra Strategy Session',
    price: 99,
    description: 'One additional 1-hour strategy session with our team',
    category: 'support',
    icon: 'MessageCircle'
  },
  {
    id: 'content-audit',
    name: 'Content Audit',
    price: 299,
    description: 'Comprehensive audit of your content strategy with actionable recommendations',
    category: 'content',
    icon: 'BarChart'
  }
];

export const CREDIT_COSTS = {
  videoSeriesBuilder: 10,
  personaGenerator: 8,
  contentMaximizer: 6,
  engagementResponder: 3,
  productionAssistant: 7,
  thumbnailGenerator: 4,
  musicGenerator: 5,
  scriptGenerator: 6,
  metadataWriter: 2
};
