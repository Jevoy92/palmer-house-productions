// Scoring and insights system for wizard questions
export interface WizardInsight {
  id: string;
  title: string;
  description: string;
  actionItems: string[];
  category: 'quick-win' | 'strategy' | 'warning' | 'opportunity';
  relevantToAnswers: string[];
}

export interface QuestionScore {
  area: string;
  score: number;
  maxScore: number;
  insights: WizardInsight[];
}

export const calculateBusinessProfileScore = (businessProfile: string): QuestionScore => {
  const insights: WizardInsight[] = [];
  let score = 0;
  const maxScore = 100;

  switch (businessProfile) {
    case 'solo':
      score = 65;
      insights.push({
        id: 'solo-video-leverage',
        title: '🎯 Solo Founder Video Advantage',
        description: 'As a solo founder, video is your secret weapon for building trust and authority at scale.',
        actionItems: [
          'Create a compelling personal brand story video',
          'Use video testimonials to build credibility fast',
          'Leverage behind-the-scenes content to humanize your brand'
        ],
        category: 'opportunity',
        relevantToAnswers: ['solo']
      });
      break;
    case 'growing':
      score = 75;
      insights.push({
        id: 'growing-scale-content',
        title: '📈 Growth-Stage Content Strategy', 
        description: 'You\'re in the perfect position to systematize video content that scales with your growth.',
        actionItems: [
          'Document your processes in training videos',
          'Create case study videos to attract ideal clients',
          'Build a content calendar that grows with your team'
        ],
        category: 'strategy',
        relevantToAnswers: ['growing']
      });
      break;
    case 'established':
      score = 85;
      insights.push({
        id: 'established-authority',
        title: '🏢 Authority Content at Scale',
        description: 'With your proven market fit, video can cement your industry leadership position.',
        actionItems: [
          'Launch a thought leadership video series',
          'Create comprehensive educational content',
          'Develop customer success story campaigns'
        ],
        category: 'opportunity',
        relevantToAnswers: ['established']
      });
      break;
    case 'agency':
      score = 80;
      insights.push({
        id: 'agency-client-results',
        title: '🎨 Agency Differentiation Strategy',
        description: 'Video storytelling can be your biggest differentiator in winning premium clients.',
        actionItems: [
          'Showcase client transformation stories',
          'Create process demonstration videos',
          'Build case study video libraries'
        ],
        category: 'strategy',
        relevantToAnswers: ['agency']
      });
      break;
    case 'enterprise':
      score = 90;
      insights.push({
        id: 'enterprise-multi-brand',
        title: '🏭 Enterprise Video Ecosystem',
        description: 'Multi-brand video strategies require sophisticated coordination and consistent messaging.',
        actionItems: [
          'Develop brand-specific video guidelines',
          'Create scalable video production workflows',
          'Implement cross-brand content syndication'
        ],
        category: 'strategy',
        relevantToAnswers: ['enterprise']
      });
      break;
    case 'nonprofit':
      score = 70;
      insights.push({
        id: 'nonprofit-impact-storytelling',
        title: '🌟 Mission-Driven Storytelling',
        description: 'Nonprofits have the most powerful stories - video amplifies your impact exponentially.',
        actionItems: [
          'Document real impact stories with beneficiaries',
          'Create donor journey video experiences',
          'Build volunteer recruitment video campaigns'
        ],
        category: 'opportunity',
        relevantToAnswers: ['nonprofit']
      });
      break;
  }

  return {
    area: 'Business Profile',
    score,
    maxScore,
    insights
  };
};

export const calculateVideoUseCaseScore = (useCase: string): QuestionScore => {
  const insights: WizardInsight[] = [];
  let score = 0;
  const maxScore = 100;

  switch (useCase) {
    case 'lead-generation':
      score = 85;
      insights.push({
        id: 'lead-gen-optimization',
        title: '🎯 Lead Generation ROI Multiplier',
        description: 'Video leads convert 80% higher than text-based leads when done strategically.',
        actionItems: [
          'Create specific video landing pages for each traffic source',
          'Use video thumbnails with clear value propositions',
          'Add video testimonials on high-traffic pages'
        ],
        category: 'quick-win',
        relevantToAnswers: ['lead-generation']
      });
      break;
    case 'training':
      score = 75;
      insights.push({
        id: 'training-retention',
        title: '📚 Training Retention Booster',
        description: 'Video training improves information retention by 65% compared to text-only materials.',
        actionItems: [
          'Break complex processes into 3-5 minute video segments',
          'Add interactive elements and knowledge checks',
          'Create searchable video libraries by topic'
        ],
        category: 'strategy',
        relevantToAnswers: ['training']
      });
      break;
    case 'onboarding':
      score = 80;
      insights.push({
        id: 'onboarding-experience',
        title: '🚀 Onboarding Experience Revolution',
        description: 'Video onboarding reduces support tickets by 40% and increases customer satisfaction.',
        actionItems: [
          'Create welcome video series for new customers',
          'Build step-by-step product walkthrough videos',
          'Add personal touch with team introduction videos'
        ],
        category: 'opportunity',
        relevantToAnswers: ['onboarding']
      });
      break;
    case 'authority':
      score = 90;
      insights.push({
        id: 'authority-thought-leadership',
        title: '👑 Thought Leadership Accelerator',
        description: 'Video thought leadership generates 3x more engagement than written content.',
        actionItems: [
          'Share contrarian insights in your industry',
          'Create weekly industry trend commentary',
          'Host expert interview series'
        ],
        category: 'strategy',
        relevantToAnswers: ['authority']
      });
      break;
    case 'education':
      score = 85;
      insights.push({
        id: 'education-value-delivery',
        title: '🎓 Educational Value Engine',
        description: 'Educational video content builds long-term customer relationships and reduces churn.',
        actionItems: [
          'Create comprehensive how-to video libraries',
          'Develop beginner to advanced learning paths',
          'Add downloadable resources to complement videos'
        ],
        category: 'opportunity',
        relevantToAnswers: ['education']
      });
      break;
    case 'sales':
      score = 95;
      insights.push({
        id: 'sales-conversion-boost',
        title: '💰 Sales Conversion Supercharger',
        description: 'Sales videos increase conversion rates by 64% and shorten sales cycles.',
        actionItems: [
          'Create personalized video proposals for prospects',
          'Develop objection-handling video library',
          'Build social proof video testimonials'
        ],
        category: 'quick-win',
        relevantToAnswers: ['sales']
      });
      break;
  }

  return {
    area: 'Video Use Case',
    score,
    maxScore,
    insights
  };
};

export const calculateContentVolumeScore = (volume: string): QuestionScore => {
  const insights: WizardInsight[] = [];
  let score = 0;
  const maxScore = 100;

  switch (volume) {
    case '1-2':
      score = 60;
      insights.push({
        id: 'low-volume-quality',
        title: '💎 Quality Over Quantity Approach',
        description: 'With 1-2 videos monthly, each piece needs to be strategically planned for maximum impact.',
        actionItems: [
          'Focus on evergreen content that compounds over time',
          'Repurpose each video into 5-10 micro-content pieces',
          'Ensure every video solves a specific customer problem'
        ],
        category: 'strategy',
        relevantToAnswers: ['1-2']
      });
      break;
    case '3-4':
      score = 75;
      insights.push({
        id: 'steady-content-rhythm',
        title: '📅 Consistent Content Rhythm',
        description: '3-4 videos monthly creates steady audience engagement without overwhelming production.',
        actionItems: [
          'Develop content pillars for consistent themes',
          'Batch filming sessions for efficiency',
          'Create content series that build anticipation'
        ],
        category: 'strategy',
        relevantToAnswers: ['3-4']
      });
      break;
    case '5-8':
      score = 85;
      insights.push({
        id: 'high-impact-scaling',
        title: '⚡ High-Impact Content Scaling',
        description: '5-8 videos monthly positions you for serious market presence and audience growth.',
        actionItems: [
          'Implement content production workflows',
          'Build content calendar 3 months in advance',
          'Create mix of educational, promotional, and behind-scenes content'
        ],
        category: 'opportunity',
        relevantToAnswers: ['5-8']
      });
      break;
    case '8-plus':
      score = 95;
      insights.push({
        id: 'content-domination',
        title: '🚀 Market Domination Strategy',
        description: '8+ videos monthly puts you in content domination territory - done right, this wins markets.',
        actionItems: [
          'Build dedicated content team and processes',
          'Create multi-platform content distribution strategy',
          'Implement advanced analytics and optimization systems'
        ],
        category: 'strategy',
        relevantToAnswers: ['8-plus']
      });
      break;
  }

  return {
    area: 'Content Volume',
    score,
    maxScore,
    insights
  };
};

export const calculateTimelineScore = (timeline: string): QuestionScore => {
  const insights: WizardInsight[] = [];
  let score = 0;
  const maxScore = 100;

  switch (timeline) {
    case 'immediately':
      score = 95;
      insights.push({
        id: 'immediate-quick-wins',
        title: '⚡ Immediate Impact Opportunities',
        description: 'Ready to start now? Focus on quick wins that deliver results while building long-term strategy.',
        actionItems: [
          'Start with smartphone videos this week',
          'Create 3 customer testimonial videos first',
          'Set up basic video hosting and tracking'
        ],
        category: 'quick-win',
        relevantToAnswers: ['immediately']
      });
      break;
    case '1-3-months':
      score = 85;
      insights.push({
        id: 'strategic-preparation',
        title: '📋 Strategic Preparation Phase',
        description: '1-3 months gives perfect time for strategic planning and setting up sustainable systems.',
        actionItems: [
          'Develop comprehensive content strategy',
          'Set up production workflows and tools',
          'Create content calendar and approval processes'
        ],
        category: 'strategy',
        relevantToAnswers: ['1-3-months']
      });
      break;
    case '3-6-months':
      score = 70;
      insights.push({
        id: 'long-term-planning',
        title: '🗓️ Long-Term Strategic Planning',
        description: '3-6 months allows for comprehensive planning and stakeholder alignment.',
        actionItems: [
          'Conduct competitive video analysis',
          'Plan budget allocation and resource needs',
          'Develop brand video guidelines and standards'
        ],
        category: 'strategy',
        relevantToAnswers: ['3-6-months']
      });
      break;
    case 'planning':
      score = 60;
      insights.push({
        id: 'research-foundation',
        title: '🔍 Research & Foundation Building',
        description: 'Planning mode is perfect for building knowledge and making informed decisions.',
        actionItems: [
          'Analyze competitor video strategies',
          'Research your audience\'s video consumption habits',
          'Build business case for video investment'
        ],
        category: 'strategy',
        relevantToAnswers: ['planning']
      });
      break;
  }

  return {
    area: 'Timeline',
    score,
    maxScore,
    insights
  };
};

export const generateOverallRecommendations = (scores: QuestionScore[]): {
  overallScore: number;
  readinessLevel: 'high' | 'medium' | 'low';
  recommendations: string[];
  nextSteps: string[];
} => {
  const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
  const maxPossibleScore = scores.reduce((sum, score) => sum + score.maxScore, 0);
  const overallScore = Math.round((totalScore / maxPossibleScore) * 100);

  let readinessLevel: 'high' | 'medium' | 'low';
  let recommendations: string[];
  let nextSteps: string[];

  if (overallScore >= 80) {
    readinessLevel = 'high';
    recommendations = [
      'You\'re in an excellent position to launch a comprehensive video strategy',
      'Your business profile and goals align perfectly with video marketing success',
      'Consider starting with our Monthly Content System for maximum impact'
    ];
    nextSteps = [
      'Schedule a Discovery Call to map out your custom strategy',
      'Review our Monthly Content System packages',
      'Prepare your team for video content production'
    ];
  } else if (overallScore >= 60) {
    readinessLevel = 'medium';
    recommendations = [
      'You have solid foundations for video success with some areas to optimize',
      'Starting with targeted video projects would build momentum',
      'Focus on your strongest use case first, then expand'
    ];
    nextSteps = [
      'Schedule a Strategy Call to identify your best starting point',
      'Consider our One-Time Bundle packages for focused results',
      'Review our DIY Downloads for immediate guidance'
    ];
  } else {
    readinessLevel = 'low';
    recommendations = [
      'Video can still be powerful for your goals, but strategic planning is key',
      'Starting with education and small tests would be most effective',
      'Building internal capabilities first will set you up for future success'
    ];
    nextSteps = [
      'Schedule a General Consultation to explore your options',
      'Start with our DIY Downloads to build video knowledge',
      'Focus on one specific video use case to begin'
    ];
  }

  return {
    overallScore,
    readinessLevel,
    recommendations,
    nextSteps
  };
};