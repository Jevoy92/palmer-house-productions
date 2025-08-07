
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Award, 
  BookOpen, 
  Wrench, 
  HelpCircle, 
  Rocket,
  ArrowRight,
  ChevronDown,
  Play,
  TrendingUp,
  Clock,
  Target,
  DollarSign,
  Star
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const UseCaseCategories = () => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const categories = [
    {
      id: "training",
      title: "Team Training & SOPs",
      description: "Internal processes, onboarding, and training materials",
      icon: Users,
      gradient: "gradient-social-1",
      usage: "Internal",
      examples: ["Employee onboarding", "Process documentation", "Safety training", "Software tutorials"],
      recommendedTier: "Social Authority Kit ($3,000/month)",
      detailedInfo: {
        overview: "Transform your internal operations with professional video content that standardizes training, reduces onboarding time, and ensures consistent knowledge transfer across your organization.",
        roiMetrics: {
          trainingTimeReduction: "65%",
          knowledgeRetention: "4x higher",
          onboardingCosts: "Save $2,500 per hire",
          complianceScore: "95% improvement"
        },
        implementation: [
          "Audit existing training materials and processes",
          "Identify key knowledge gaps and pain points",
          "Script and storyboard training sequences",
          "Film comprehensive training modules",
          "Create searchable video knowledge base",
          "Deploy and track engagement metrics"
        ],
        caseStudy: {
          client: "Tech Startup (50 employees)",
          challenge: "New hires taking 3 months to become productive",
          solution: "Created 12-module onboarding video series",
          result: "Reduced onboarding time to 3 weeks, 90% employee satisfaction"
        },
        videoSpecs: {
          length: "5-15 minutes per module",
          format: "Screen recordings + talking head",
          delivery: "Private learning management system"
        }
      }
    },
    {
      id: "authority",
      title: "Authority-Building Series",
      description: "Thought leadership content that establishes expertise",
      icon: Award,
      gradient: "gradient-social-2",
      usage: "External",
      examples: ["Industry insights", "CEO vlogs", "Expert interviews", "Speaking previews"],
      recommendedTier: "Camera-Ready Brand ($2,000)",
      detailedInfo: {
        overview: "Position yourself as an industry thought leader with compelling video content that showcases expertise, builds trust, and attracts high-value opportunities.",
        roiMetrics: {
          brandRecognition: "300% increase",
          speakingOpportunities: "5x more invitations",
          inboundLeads: "250% growth",
          mediaFeatures: "15+ publications"
        },
        implementation: [
          "Define your unique expertise and positioning",
          "Develop content pillars and editorial calendar",
          "Create flagship thought leadership series",
          "Establish consistent filming schedule",
          "Optimize distribution across platforms",
          "Measure engagement and refine strategy"
        ],
        caseStudy: {
          client: "Management Consultant",
          challenge: "Struggling to differentiate in crowded market",
          solution: "Weekly CEO insights video series",
          result: "Became go-to expert, 5x speaking fees, major client wins"
        },
        videoSpecs: {
          length: "3-8 minutes per episode",
          format: "Professional talking head + B-roll",
          delivery: "LinkedIn, YouTube, company website"
        }
      }
    },
    {
      id: "education",
      title: "Customer Education",
      description: "Help customers succeed with your product or service",
      icon: BookOpen,
      gradient: "gradient-social-3",
      usage: "Both",
      examples: ["Product tutorials", "Best practices", "Case studies", "Success stories"],
      recommendedTier: "FAQ Buildout Bundle",
      detailedInfo: {
        overview: "Reduce support tickets, increase customer satisfaction, and drive product adoption with comprehensive educational video content that empowers users to succeed.",
        roiMetrics: {
          supportTickets: "40% reduction",
          customerSatisfaction: "85% improvement",
          productAdoption: "60% faster",
          churnReduction: "25% lower"
        },
        implementation: [
          "Analyze common support requests and user challenges",
          "Map customer journey and education touchpoints",
          "Create modular tutorial and help content",
          "Develop advanced use case demonstrations",
          "Build searchable video help center",
          "Track usage and iterate based on feedback"
        ],
        caseStudy: {
          client: "SaaS Platform (B2B)",
          challenge: "High support volume, low product adoption",
          solution: "Comprehensive video help center with 50+ tutorials",
          result: "Support tickets down 45%, user engagement up 70%"
        },
        videoSpecs: {
          length: "2-10 minutes per tutorial",
          format: "Screen recordings + voice-over",
          delivery: "In-app help center + YouTube"
        }
      }
    },
    {
      id: "lead-gen",
      title: "Lead Gen & Ads",
      description: "Promotional videos that convert prospects into customers",
      icon: Wrench,
      gradient: "gradient-social-4",
      usage: "External",
      examples: ["Social media ads", "Landing page videos", "Email campaigns", "Retargeting content"],
      recommendedTier: "Social Video Starter ($500)",
      detailedInfo: {
        overview: "Drive qualified leads and accelerate sales cycles with high-converting video advertisements that capture attention and compel action across all marketing channels.",
        roiMetrics: {
          conversionRate: "3.5x higher",
          costPerLead: "50% reduction",
          emailOpenRates: "200% increase",
          salesCycleLength: "30% shorter"
        },
        implementation: [
          "Define target audience and messaging strategy",
          "Create compelling hooks and value propositions",
          "Develop video ad creative variations",
          "Set up tracking and attribution systems",
          "Launch multi-platform campaign testing",
          "Optimize based on performance data"
        ],
        caseStudy: {
          client: "Professional Services Firm",
          challenge: "High cost per acquisition from traditional ads",
          solution: "Video-first social media advertising campaign",
          result: "Cost per lead reduced 60%, conversion rate tripled"
        },
        videoSpecs: {
          length: "15-60 seconds per ad",
          format: "Dynamic visuals + compelling copy",
          delivery: "Facebook, Instagram, LinkedIn, YouTube"
        }
      }
    },
    {
      id: "faq",
      title: "FAQ Replacements",
      description: "Transform common questions into engaging video answers",
      icon: HelpCircle,
      gradient: "gradient-social-1",
      usage: "Both",
      examples: ["Common questions", "Troubleshooting", "How-to guides", "Support videos"],
      recommendedTier: "FAQ Buildout Bundle",
      detailedInfo: {
        overview: "Replace static FAQ pages with engaging video answers that provide better user experience, improve SEO, and reduce support workload while building trust.",
        roiMetrics: {
          pageEngagement: "400% longer",
          supportWorkload: "35% reduction",
          seoRankings: "Top 3 positions",
          conversionLift: "45% improvement"
        },
        implementation: [
          "Audit existing FAQ content and identify gaps",
          "Prioritize questions by frequency and impact",
          "Script clear, concise video responses",
          "Film professional answer segments",
          "Organize into searchable video library",
          "Monitor performance and add new content"
        ],
        caseStudy: {
          client: "E-commerce Business",
          challenge: "High bounce rate on FAQ page, repetitive support questions",
          solution: "Video FAQ library with 25 common question answers",
          result: "Page engagement up 350%, support volume down 40%"
        },
        videoSpecs: {
          length: "30 seconds - 3 minutes per answer",
          format: "Professional presenter + screen share",
          delivery: "Website FAQ section + social media"
        }
      }
    },
    {
      id: "launch",
      title: "Launch Videos",
      description: "Announce new products, services, or company updates",
      icon: Rocket,
      gradient: "gradient-social-2",
      usage: "External",
      examples: ["Product launches", "Feature announcements", "Company updates", "Event promotions"],
      recommendedTier: "YouTube Visibility Engine",
      detailedInfo: {
        overview: "Generate maximum buzz and engagement for your launches with professionally crafted announcement videos that build anticipation and drive immediate action.",
        roiMetrics: {
          launchReach: "10x organic reach",
          preOrders: "85% increase",
          mediaPickup: "3x more coverage",
          socialShares: "500% boost"
        },
        implementation: [
          "Develop launch strategy and timeline",
          "Create teaser and announcement content",
          "Plan multi-phase video campaign",
          "Coordinate cross-platform distribution",
          "Execute launch sequence with precision",
          "Measure impact and gather feedback"
        ],
        caseStudy: {
          client: "Software Company",
          challenge: "Previous product launches went unnoticed",
          solution: "Multi-part video launch campaign with teasers, demos, and testimonials",
          result: "500% more signups than previous launch, major industry coverage"
        },
        videoSpecs: {
          length: "30 seconds - 2 minutes per piece",
          format: "High-energy montage + product demo",
          delivery: "All social platforms + press outreach"
        }
      }
    }
  ];

  const toggleCard = (categoryId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleGetStarted = (categoryId: string) => {
    navigate('/contact', { 
      state: { 
        selectedUseCase: categoryId,
        source: 'use_cases' 
      } 
    });
  };

  const expandAll = () => {
    setExpandedCards(new Set(categories.map(cat => cat.id)));
  };

  const collapseAll = () => {
    setExpandedCards(new Set());
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            Six Strategic <span className="text-gradient-1">Categories</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium mb-8">
            Each category serves a specific business function and maps to our tier system
          </p>
          
          {/* Expand/Collapse All Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={expandAll}
              className="px-4 py-2 bg-corporate-dark text-white rounded-lg hover:bg-opacity-80 transition-all duration-200 text-sm font-medium"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 border border-corporate-dark text-corporate-dark rounded-lg hover:bg-corporate-dark hover:text-white transition-all duration-200 text-sm font-medium"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Collapsible 
              key={category.id}
              open={expandedCards.has(category.id)}
              onOpenChange={() => toggleCard(category.id)}
            >
              <div className="bg-corporate-light rounded-3xl overflow-hidden video-shadow hover:video-shadow-lg transition-all duration-300 group">
                
                {/* Card Header - Always Visible */}
                <CollapsibleTrigger className="w-full p-8 text-left hover:bg-opacity-95 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${category.gradient} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          <category.icon color="white" size={24} />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.usage}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold text-corporate-dark mb-2 group-hover:text-gradient-1 transition-all duration-200">
                        {category.title}
                      </h3>
                      <p className="text-corporate-gray text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>
                      
                      {/* Quick Examples Preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.examples.slice(0, 2).map((example, index) => (
                          <span key={index} className="text-xs bg-white px-2 py-1 rounded-md text-corporate-gray">
                            {example}
                          </span>
                        ))}
                        {category.examples.length > 2 && (
                          <span className="text-xs text-corporate-gray">
                            +{category.examples.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <ChevronDown 
                      className={`ml-4 mt-2 transition-transform duration-200 text-corporate-gray ${
                        expandedCards.has(category.id) ? 'rotate-180' : ''
                      }`} 
                      size={20} 
                    />
                  </div>
                </CollapsibleTrigger>

                {/* Expandable Content */}
                <CollapsibleContent className="overflow-hidden">
                  <div className="px-8 pb-8 animate-fade-in">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid grid-cols-4 w-full mb-6">
                        <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                        <TabsTrigger value="implementation" className="text-xs">Process</TabsTrigger>
                        <TabsTrigger value="roi" className="text-xs">ROI</TabsTrigger>
                        <TabsTrigger value="case-study" className="text-xs">Case Study</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-corporate-gray leading-relaxed mb-4">
                            {category.detailedInfo.overview}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="flex items-center gap-2">
                              <Clock className="text-social-blue" size={14} />
                              <span className="text-corporate-gray">
                                {category.detailedInfo.videoSpecs.length}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Play className="text-social-green" size={14} />
                              <span className="text-corporate-gray">
                                {category.detailedInfo.videoSpecs.format}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-bold text-corporate-dark mb-2">Recommended Tier:</div>
                          <Badge className={`${category.gradient} text-white border-0`}>
                            {category.recommendedTier}
                          </Badge>
                        </div>
                      </TabsContent>

                      <TabsContent value="implementation" className="space-y-3">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-corporate-dark mb-3 text-sm">Implementation Steps:</h4>
                          <ol className="space-y-2">
                            {category.detailedInfo.implementation.map((step, index) => (
                              <li key={index} className="flex items-start gap-3 text-xs">
                                <span className={`${category.gradient} text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-medium`}>
                                  {index + 1}
                                </span>
                                <span className="text-corporate-gray leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </TabsContent>

                      <TabsContent value="roi" className="space-y-3">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-corporate-dark mb-3 text-sm flex items-center gap-2">
                            <TrendingUp size={14} />
                            Expected ROI Metrics:
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(category.detailedInfo.roiMetrics).map(([key, value]) => (
                              <div key={key} className="text-center p-2 bg-corporate-light rounded-md">
                                <div className="text-lg font-bold text-social-green">{value}</div>
                                <div className="text-xs text-corporate-gray capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="case-study" className="space-y-3">
                        <div className="bg-white p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="text-social-orange" size={14} />
                            <h4 className="font-semibold text-corporate-dark text-sm">Success Story</h4>
                          </div>
                          
                          <div className="space-y-3 text-xs">
                            <div>
                              <span className="font-medium text-corporate-dark">Client: </span>
                              <span className="text-corporate-gray">{category.detailedInfo.caseStudy.client}</span>
                            </div>
                            <div>
                              <span className="font-medium text-corporate-dark">Challenge: </span>
                              <span className="text-corporate-gray">{category.detailedInfo.caseStudy.challenge}</span>
                            </div>
                            <div>
                              <span className="font-medium text-corporate-dark">Solution: </span>
                              <span className="text-corporate-gray">{category.detailedInfo.caseStudy.solution}</span>
                            </div>
                            <div className="p-2 bg-social-green bg-opacity-10 rounded-md">
                              <span className="font-medium text-social-green">Result: </span>
                              <span className="text-corporate-dark">{category.detailedInfo.caseStudy.result}</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Call to Action */}
                    <div className="mt-6 pt-4 border-t border-white">
                      <button 
                        onClick={() => handleGetStarted(category.id)}
                        className={`w-full py-3 px-6 bg-white ${category.gradient} text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105`}
                      >
                        <Target size={16} />
                        <span>Get Started with {category.title}</span>
                      </button>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};
