import { Sparkles, Trophy, Crown, Gem, Zap } from 'lucide-react';

export interface AchievementTier {
  id: string;
  name: string;
  icon: typeof Sparkles;
  minCredits: number;
  maxCredits: number | null;
  color: string;
  bgColor: string;
  description: string;
}

export const ACHIEVEMENT_TIERS: AchievementTier[] = [
  {
    id: 'explorer',
    name: 'Content Explorer',
    icon: Sparkles,
    minCredits: 0,
    maxCredits: 10,
    color: 'text-pal-orange',
    bgColor: 'bg-pal-orange/10',
    description: 'Just getting started',
  },
  {
    id: 'creator',
    name: 'Content Creator',
    icon: Zap,
    minCredits: 11,
    maxCredits: 50,
    color: 'text-pal-blue',
    bgColor: 'bg-pal-blue/10',
    description: 'Building momentum',
  },
  {
    id: 'master',
    name: 'Content Master',
    icon: Trophy,
    minCredits: 51,
    maxCredits: 100,
    color: 'text-pal-green',
    bgColor: 'bg-pal-green/10',
    description: 'Mastering the craft',
  },
  {
    id: 'pro',
    name: 'Content Pro',
    icon: Gem,
    minCredits: 101,
    maxCredits: 200,
    color: 'text-pal-purple',
    bgColor: 'bg-pal-purple/10',
    description: 'Professional creator',
  },
  {
    id: 'legend',
    name: 'Content Legend',
    icon: Crown,
    minCredits: 201,
    maxCredits: null,
    color: 'text-social-pink',
    bgColor: 'bg-social-pink/10',
    description: 'Legendary status',
  },
];

export function getUserTier(creditsUsed: number): AchievementTier {
  return ACHIEVEMENT_TIERS.find(
    (tier) => creditsUsed >= tier.minCredits && (tier.maxCredits === null || creditsUsed <= tier.maxCredits)
  ) || ACHIEVEMENT_TIERS[0];
}

export function getProgressToNextTier(creditsUsed: number): {
  current: number;
  target: number;
  percentage: number;
} {
  const currentTier = getUserTier(creditsUsed);
  const currentIndex = ACHIEVEMENT_TIERS.indexOf(currentTier);
  
  if (currentIndex === ACHIEVEMENT_TIERS.length - 1) {
    // Already at max tier
    return {
      current: creditsUsed,
      target: creditsUsed,
      percentage: 100,
    };
  }
  
  const nextTier = ACHIEVEMENT_TIERS[currentIndex + 1];
  const rangeStart = currentTier.minCredits;
  const rangeEnd = nextTier.minCredits;
  const progress = creditsUsed - rangeStart;
  const range = rangeEnd - rangeStart;
  
  return {
    current: progress,
    target: range,
    percentage: Math.min((progress / range) * 100, 100),
  };
}

export function getStreak(lastActivityDates: Date[]): number {
  if (lastActivityDates.length === 0) return 0;
  
  const sortedDates = lastActivityDates.sort((a, b) => b.getTime() - a.getTime());
  let streak = 1;
  let currentDate = new Date(sortedDates[0]);
  currentDate.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if last activity was today or yesterday
  const daysDiff = Math.floor((today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDiff > 1) return 0;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    prevDate.setHours(0, 0, 0, 0);
    currDate.setHours(0, 0, 0, 0);
    
    const diff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}
