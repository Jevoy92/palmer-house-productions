import reelPalImage from '@/assets/pals/reel-pal.png';
import systemPalImage from '@/assets/pals/system-pal.png';
import evergreenPalImage from '@/assets/pals/evergreen-pal.png';
import spotlightPalImage from '@/assets/pals/spotlight-pal.png';

export interface Pal {
  id: string;
  name: string;
  tagline: string;
  description: string;
  character: string;
  strengths: string[];
  services: {
    primary: string[];
    secondary: string[];
  };
  packages: string[];
  ctaText: string;
  ctaUrl: string;
  gradient: string;
  personality: string[];
}

export const PALS_DATA: Pal[] = [
  {
    id: 'reel',
    name: 'Reel Pal',
    tagline: 'Your Short-Form Content Champion',
    description: 'Master of bite-sized brilliance, turning your ideas into scroll-stopping social content that converts.',
    character: reelPalImage,
    strengths: [
      'Social Media Optimization',
      'Quick Turnaround Content',
      'DIY-Friendly Solutions',
      'Mobile-First Approach'
    ],
    services: {
      primary: ['Short-form social content', 'DIY content kits', 'Starter Sessions'],
      secondary: ['Instagram Reels', 'TikTok videos', 'YouTube Shorts', 'LinkedIn clips']
    },
    packages: ['Social Media Bundle', 'DIY Content Kit', 'Starter Session'],
    ctaText: 'Start Creating Reels',
    ctaUrl: '/video-packages?focus=social',
    gradient: 'from-orange-400 to-pink-500',
    personality: ['energetic', 'trendy', 'accessible', 'fun']
  },
  {
    id: 'system',
    name: 'System Pal',
    tagline: 'Your Backend Video Architect',
    description: 'The organizational genius who builds scalable video systems that train, onboard, and inform your team automatically.',
    character: systemPalImage,
    strengths: [
      'Process Automation',
      'Training Systems',
      'Knowledge Management',
      'Scalable Solutions'
    ],
    services: {
      primary: ['Training video systems', 'Onboarding sequences', 'FAQ buildouts'],
      secondary: ['Employee training', 'Process documentation', 'Knowledge bases', 'Internal communications']
    },
    packages: ['Training System Bundle', 'Onboarding Package', 'FAQ Video Series'],
    ctaText: 'Build Your System',
    ctaUrl: '/video-packages?focus=training',
    gradient: 'from-blue-500 to-cyan-500',
    personality: ['systematic', 'reliable', 'efficient', 'strategic']
  },
  {
    id: 'evergreen',
    name: 'Evergreen Pal',
    tagline: 'Your Long-Term Authority Builder',
    description: 'The strategic thinker who creates content that compounds over time, building your authority and driving consistent results.',
    character: evergreenPalImage,
    strengths: [
      'SEO Optimization',
      'Long-term Strategy',
      'Authority Building',
      'Consistent Growth'
    ],
    services: {
      primary: ['YouTube channel engines', 'Authority content series', 'Monthly content plans'],
      secondary: ['Thought leadership videos', 'Educational series', 'Industry insights', 'Expert interviews']
    },
    packages: ['YouTube Engine', 'Authority Series', 'Monthly Content Plan'],
    ctaText: 'Grow Your Authority',
    ctaUrl: '/video-packages?focus=authority',
    gradient: 'from-green-500 to-emerald-600',
    personality: ['wise', 'patient', 'strategic', 'growth-focused']
  },
  {
    id: 'spotlight',
    name: 'Spotlight Pal',
    tagline: 'Your Cinematic Storyteller',
    description: 'The visionary who crafts premium brand stories that captivate audiences and elevate your brand to cinematic heights.',
    character: spotlightPalImage,
    strengths: [
      'Cinematic Production',
      'Brand Storytelling',
      'High-End Aesthetics',
      'Emotional Impact'
    ],
    services: {
      primary: ['Cinematic brand stories', 'Music videos', 'Commercial production'],
      secondary: ['Hero content', 'Brand documentaries', 'Product showcases', 'Corporate films']
    },
    packages: ['Cinematic Brand Story', 'Commercial Production', 'Premium Hero Content'],
    ctaText: 'Create Your Spotlight',
    ctaUrl: '/video-packages?focus=cinematic',
    gradient: 'from-purple-600 to-pink-600',
    personality: ['artistic', 'premium', 'visionary', 'impactful']
  }
];

export const getPalById = (id: string): Pal | undefined => {
  return PALS_DATA.find(pal => pal.id === id);
};

export const getPalRecommendation = (needs: string[]): Pal => {
  // Simple recommendation logic based on keywords
  const keywords = needs.join(' ').toLowerCase();
  
  if (keywords.includes('social') || keywords.includes('quick') || keywords.includes('reels')) {
    return PALS_DATA[0]; // Reel Pal
  }
  
  if (keywords.includes('training') || keywords.includes('onboard') || keywords.includes('system')) {
    return PALS_DATA[1]; // System Pal
  }
  
  if (keywords.includes('authority') || keywords.includes('youtube') || keywords.includes('long-term')) {
    return PALS_DATA[2]; // Evergreen Pal
  }
  
  if (keywords.includes('cinematic') || keywords.includes('brand') || keywords.includes('premium')) {
    return PALS_DATA[3]; // Spotlight Pal
  }
  
  // Default to Reel Pal for beginners
  return PALS_DATA[0];
};