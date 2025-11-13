// SaaS Subscription Tiers and Add-ons

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number; // Monthly price in dollars
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
  description: string;
  category: 'tools' | 'support' | 'content';
  icon: string;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    monthlyCredits: 10,
    strategySessionsPerMonth: 0,
    features: [
      'Video Series Builder only',
      '10 AI credits per month',
      'Small library storage',
      'Preview-only access',
      'No publishing or downloads',
      'Community support'
    ],
    ctaText: 'Get Started Free'
  },
  {
    id: 'core',
    name: 'Core',
    price: 97,
    monthlyCredits: 100,
    strategySessionsPerMonth: 1,
    features: [
      'Full AI tool suite access',
      '100 AI credits per month',
      'Unlimited downloads',
      '1 monthly strategy call (30 min)',
      'Basic content scheduling',
      'Core system builders',
      'Priority email support',
      'Save unlimited plans'
    ],
    isPopular: true,
    ctaText: 'Start Core Plan'
  },
  {
    id: 'guided',
    name: 'Guided Support',
    price: 297,
    monthlyCredits: 300,
    strategySessionsPerMonth: 2,
    features: [
      'Everything in Core',
      '300 AI credits per month',
      '2 monthly strategy sessions (45 min)',
      'Full publishing calendar',
      'Advanced system builders',
      'FAQ, onboarding & recruitment tools',
      'Priority support + Slack access',
      'Exclusive client benefits',
      'Quarterly content audits'
    ],
    ctaText: 'Go Guided'
  }
];

export const ADDONS: Addon[] = [
  {
    id: 'extra-credits-50',
    name: '50 Extra Credits',
    price: 19,
    description: 'One-time credit top-up for high-volume months',
    category: 'tools',
    icon: 'Zap'
  },
  {
    id: 'extra-credits-100',
    name: '100 Extra Credits',
    price: 35,
    description: 'One-time credit top-up for heavy usage',
    category: 'tools',
    icon: 'Zap'
  },
  {
    id: 'strategy-session',
    name: 'One-Time Strategy Session',
    price: 149,
    description: '60-minute personalized video strategy call',
    category: 'support',
    icon: 'MessageCircle'
  },
  {
    id: 'content-audit',
    name: 'Content Audit',
    price: 249,
    description: 'Deep-dive analysis of your existing content library',
    category: 'content',
    icon: 'BarChart'
  },
  {
    id: 'custom-templates',
    name: 'Custom Template Pack',
    price: 99,
    description: 'Industry-specific templates for your brand',
    category: 'content',
    icon: 'FileText'
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
