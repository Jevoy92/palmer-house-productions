import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PlayCircle, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Star,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  PieChart,
  ArrowLeft
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useAssessmentProgress } from "@/hooks/useAssessmentProgress";
import { ProgressResume } from "./ProgressResume";
import { EnhancedResults } from "./EnhancedResults";
import { ResultsExport } from "./ResultsExport";

interface ContentGapAnalysisEnhancedProps {
  onBack?: () => void;
}

interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: any;
  importance: 'high' | 'medium' | 'low';
  examples: string[];
  funnelStage: 'awareness' | 'consideration' | 'decision' | 'retention';
  businessTypes: string[];
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

interface Priority {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  timeline: string;
  category: string;
}

interface Milestone {
  month: number;
  title: string;
  goals: string[];
  metrics: string[];
}

interface GapAnalysisResult {
  currentContent: string[];
  missingContent: string[];
  priorityGaps: string[];
  funnelGaps: {
    awareness: string[];
    consideration: string[];
    decision: string[];
    retention: string[];
  };
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  funnelCoverage: number;
  impactScore: number;
  competitorOpportunities: string[];
  roiPredictions: {
    content: string;
    estimatedROI: string;
    timeframe: string;
  }[];
  sectionScores: Record<string, number>;
  priorities: Priority[];
  milestones: Milestone[];
}

export const ContentGapAnalysisEnhanced = ({ onBack }: ContentGapAnalysisEnhancedProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", company: "" });
  const [businessProfile, setBusinessProfile] = useState({
    industry: "",
    size: "",
    primaryGoals: [],
    currentChannels: [],
    targetAudience: ""
  });

  const { progress, saveProgress, clearProgress, hasProgress } = useAssessmentProgress('content-gap');

  const totalSections = 3;
  const sections = ['Business Profile', 'Content Selection', 'Results'];

  useEffect(() => {
    if (progress) {
      setCurrentSection(progress.currentSection);
      setSelectedContent(progress.answers?.selectedContent || []);
      // Safely restore business context with proper type checking
      const savedContext = progress.businessContext || {};
      setBusinessProfile({
        industry: savedContext.industry || "",
        size: savedContext.size || "",
        primaryGoals: savedContext.primaryGoals || [],
        currentChannels: savedContext.currentChannels || [],
        targetAudience: savedContext.targetAudience || ""
      });
    }
  }, [progress]);

  const contentTypes: ContentType[] = [
    {
      id: "brand-story",
      name: "Brand Story Videos",
      description: "About us, mission, values, company culture",
      icon: Star,
      importance: 'high',
      examples: ["Company origin story", "Team introductions", "Mission & values", "Behind-the-scenes"],
      funnelStage: 'awareness',
      businessTypes: ['all'],
      effort: 'medium',
      impact: 'high'
    },
    {
      id: "product-demos",
      name: "Product Demonstrations",
      description: "Show your products/services in action",
      icon: PlayCircle,
      importance: 'high',
      examples: ["Feature walkthroughs", "Use case scenarios", "Before/after comparisons", "Live demos"],
      funnelStage: 'consideration',
      businessTypes: ['saas', 'ecommerce', 'manufacturing'],
      effort: 'medium',
      impact: 'high'
    },
    {
      id: "customer-testimonials",
      name: "Customer Testimonials",
      description: "Social proof and success stories",
      icon: Users,
      importance: 'high',
      examples: ["Video testimonials", "Case study videos", "Customer success stories", "User-generated content"],
      funnelStage: 'decision',
      businessTypes: ['all'],
      effort: 'low',
      impact: 'high'
    },
    {
      id: "educational-content",
      name: "Educational Content",
      description: "How-to guides and tutorials",
      icon: BookOpen,
      importance: 'medium',
      examples: ["Tutorial videos", "FAQ responses", "Best practices", "Industry insights"],
      funnelStage: 'awareness',
      businessTypes: ['all'],
      effort: 'medium',
      impact: 'medium'
    },
    {
      id: "thought-leadership",
      name: "Thought Leadership",
      description: "Industry expertise and insights",
      icon: TrendingUp,
      importance: 'medium',
      examples: ["Industry predictions", "Expert interviews", "Trend analysis", "Opinion pieces"],
      funnelStage: 'awareness',
      businessTypes: ['consulting', 'technology', 'finance'],
      effort: 'high',
      impact: 'medium'
    },
    {
      id: "social-proof",
      name: "Social Proof Content",
      description: "Reviews, awards, and recognition",
      icon: CheckCircle,
      importance: 'medium',
      examples: ["Award announcements", "Press coverage", "Client spotlights", "Partnership announcements"],
      funnelStage: 'decision',
      businessTypes: ['all'],
      effort: 'low',
      impact: 'medium'
    }
  ];

  const analyzeGaps = (): GapAnalysisResult => {
    const currentContent = selectedContent;
    const allContentIds = contentTypes.map(type => type.id);
    const missingContent = allContentIds.filter(id => !selectedContent.includes(id));
    
    const highImportanceMissing = missingContent.filter(id => 
      contentTypes.find(type => type.id === id)?.importance === 'high'
    );
    
    const funnelCoverage = Math.round((selectedContent.length / contentTypes.length) * 100);
    
    // Analyze funnel gaps by stage
    const funnelGaps = {
      awareness: missingContent.filter(id => 
        contentTypes.find(type => type.id === id)?.funnelStage === 'awareness'
      ),
      consideration: missingContent.filter(id => 
        contentTypes.find(type => type.id === id)?.funnelStage === 'consideration'
      ),
      decision: missingContent.filter(id => 
        contentTypes.find(type => type.id === id)?.funnelStage === 'decision'
      ),
      retention: missingContent.filter(id => 
        contentTypes.find(type => type.id === id)?.funnelStage === 'retention'
      )
    };
    
    // Calculate impact score and section scores
    const impactScore = selectedContent.reduce((score, contentId) => {
      const content = contentTypes.find(type => type.id === contentId);
      if (content?.impact === 'high') return score + 3;
      if (content?.impact === 'medium') return score + 2;
      return score + 1;
    }, 0);

    const sectionScores = {
      'Brand Foundation': selectedContent.includes('brand-story') ? 85 : 35,
      'Product Showcase': selectedContent.includes('product-demos') ? 90 : 20,
      'Social Proof': selectedContent.includes('customer-testimonials') ? 80 : 25,
      'Educational Value': selectedContent.includes('educational-content') ? 75 : 30,
      'Thought Leadership': selectedContent.includes('thought-leadership') ? 70 : 15
    };
    
    // Generate priority actions with proper interface structure
    const priorities: Priority[] = [
      {
        id: "brand-story",
        title: "Create Brand Story Video",
        description: "Establish credibility and trust with authentic brand storytelling",
        impact: 'High' as const,
        effort: 'Medium' as const,
        timeline: "2-4 weeks",
        category: "Foundation"
      },
      {
        id: "testimonials",
        title: "Collect Customer Testimonials",
        description: "Build social proof through customer success stories",
        impact: 'High' as const,
        effort: 'Low' as const,
        timeline: "1-2 weeks",
        category: "Social Proof"
      },
      {
        id: "product-demos",
        title: "Develop Product Demos",
        description: "Showcase product value through demonstrations",
        impact: 'High' as const,
        effort: 'Medium' as const,
        timeline: "3-6 weeks",
        category: "Product Marketing"
      }
    ].filter((_, index) => index < 3 - Math.floor(funnelCoverage / 33));

    // Generate 6-month milestones with proper interface structure
    const milestones: Milestone[] = [
      {
        month: 1,
        title: "Foundation Phase",
        goals: ["Complete brand story video", "Set up video workspace"],
        metrics: ["1 brand video published", "Basic equipment setup"]
      },
      {
        month: 2,
        title: "Social Proof Phase",
        goals: ["Launch testimonial collection", "Create product demo"],
        metrics: ["3 testimonials collected", "1 demo video live"]
      },
      {
        month: 3,
        title: "Content Expansion",
        goals: ["Educational content series", "Optimize based on performance"],
        metrics: ["5 educational videos", "Performance benchmarks set"]
      },
      {
        month: 4,
        title: "Authority Building",
        goals: ["Thought leadership content", "Cross-platform distribution"],
        metrics: ["2 expert interviews", "Multi-platform presence"]
      },
      {
        month: 5,
        title: "Advanced Social Proof",
        goals: ["Advanced social proof", "Content optimization"],
        metrics: ["Case study videos", "Improved engagement rates"]
      },
      {
        month: 6,
        title: "Full Funnel Coverage",
        goals: ["Full funnel content", "Performance review"],
        metrics: ["Complete content library", "ROI assessment"]
      }
    ];

    // Generate recommendations
    let immediate: string[] = [];
    let shortTerm: string[] = [];
    let longTerm: string[] = [];

    if (!selectedContent.includes('brand-story')) {
      immediate.push("Create brand story videos to establish credibility and trust");
    }
    if (!selectedContent.includes('product-demos')) {
      immediate.push("Develop product demonstration videos to showcase value");
    }
    if (!selectedContent.includes('customer-testimonials')) {
      shortTerm.push("Collect and produce customer testimonial videos for social proof");
    }
    if (!selectedContent.includes('educational-content')) {
      shortTerm.push("Build educational content library to attract prospects");
    }
    if (!selectedContent.includes('thought-leadership')) {
      longTerm.push("Establish thought leadership through expert content");
    }

    const competitorOpportunities = [
      "Educational content gaps present opportunity for thought leadership",
      "Limited social proof content allows for competitive advantage",
      "Missing awareness-stage content creates market opportunity"
    ].slice(0, Math.max(1, 3 - Math.floor(funnelCoverage / 33)));

    const roiPredictions = selectedContent.slice(0, 3).map(contentId => {
      const content = contentTypes.find(type => type.id === contentId);
      return {
        content: content?.name || '',
        estimatedROI: content?.impact === 'high' ? '300-500%' : content?.impact === 'medium' ? '200-300%' : '150-250%',
        timeframe: content?.effort === 'low' ? '1-2 months' : content?.effort === 'medium' ? '2-4 months' : '4-6 months'
      };
    });

    return {
      currentContent,
      missingContent,
      priorityGaps: highImportanceMissing,
      funnelGaps,
      recommendations: { immediate, shortTerm, longTerm },
      funnelCoverage,
      impactScore,
      competitorOpportunities,
      roiPredictions,
      sectionScores,
      priorities,
      milestones
    };
  };

  const handleNext = () => {
    const nextSection = Math.min(currentSection + 1, totalSections - 1);
    setCurrentSection(nextSection);
    
    // Save progress
    saveProgress({
      currentSection: nextSection,
      answers: { selectedContent },
      businessContext: businessProfile
    });

    if (nextSection === totalSections - 1) {
      setShowResults(true);
      trackEvent('content_gap_analysis_completed', {
        funnel_coverage: analyzeGaps().funnelCoverage,
        priority_gaps: analyzeGaps().priorityGaps.length,
        total_selected: selectedContent.length
      });
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const handleContentToggle = (contentId: string) => {
    const newSelected = selectedContent.includes(contentId)
      ? selectedContent.filter(id => id !== contentId)
      : [...selectedContent, contentId];
    
    setSelectedContent(newSelected);
    
    // Auto-save progress
    saveProgress({
      currentSection,
      answers: { selectedContent: newSelected },
      businessContext: businessProfile
    });
    
    trackEvent('content_gap_selection', {
      content_type: contentId,
      action: selectedContent.includes(contentId) ? 'removed' : 'added'
    });
  };

  const handleResume = () => {
    // Progress is already restored in useEffect
  };

  const handleRestart = () => {
    clearProgress();
    setCurrentSection(0);
    setSelectedContent([]);
    setShowResults(false);
    setBusinessProfile({
      industry: "",
      size: "",
      primaryGoals: [],
      currentChannels: [],
      targetAudience: ""
    });
  };

  // Show resume option if there's saved progress
  if (hasProgress && currentSection === 0 && !showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ProgressResume
          assessmentType="Content Gap Analysis"
          currentSection={progress?.currentSection || 0}
          totalSections={totalSections}
          lastSaved={progress?.timestamp || Date.now()}
          onResume={handleResume}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  if (showResults) {
    const results = analyzeGaps();
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <Button 
          onClick={() => setShowResults(false)}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessment
        </Button>

        <EnhancedResults
          score={results.funnelCoverage}
          level={results.funnelCoverage >= 75 ? 'Advanced' : results.funnelCoverage >= 50 ? 'Intermediate' : 'Beginner'}
          sectionScores={results.sectionScores}
          priorities={results.priorities}
          milestones={results.milestones}
          industryBenchmark={65}
          confidenceScore={85}
        />

        <ResultsExport
          assessmentType="Content Gap Analysis"
          score={results.funnelCoverage}
          level={results.funnelCoverage >= 75 ? 'Advanced' : results.funnelCoverage >= 50 ? 'Intermediate' : 'Beginner'}
          recommendations={[...results.recommendations.immediate, ...results.recommendations.shortTerm]}
          businessContext={businessProfile}
          onScheduleConsultation={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078320', '_blank')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Progress value={(currentSection / (totalSections - 1)) * 100} className="flex-1 mx-4" />
        <span className="text-sm text-muted-foreground">
          {currentSection + 1} of {totalSections}
        </span>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-corporate-dark mb-4">
          {sections[currentSection]}
        </h2>
        <p className="text-corporate-gray max-w-2xl mx-auto">
          {currentSection === 0 && "Tell us about your business to personalize your assessment"}
          {currentSection === 1 && "Select the types of video content you currently have"}
          {currentSection === 2 && "Review your content gap analysis results"}
        </p>
      </div>

      {currentSection === 0 && (
        <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-corporate-dark mb-2">
                  Industry
                </label>
                <select
                  value={businessProfile.industry}
                  onChange={(e) => setBusinessProfile(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full p-3 border border-corporate-gray rounded-lg"
                >
                  <option value="">Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="retail">Retail</option>
                  <option value="consulting">Consulting</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-corporate-dark mb-2">
                  Company Size
                </label>
                <select
                  value={businessProfile.size}
                  onChange={(e) => setBusinessProfile(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full p-3 border border-corporate-gray rounded-lg"
                >
                  <option value="">Select company size</option>
                  <option value="startup">Startup (1-10 employees)</option>
                  <option value="small">Small Business (11-50 employees)</option>
                  <option value="medium">Medium Business (51-200 employees)</option>
                  <option value="large">Large Enterprise (200+ employees)</option>
                </select>
              </div>

              <Button
                onClick={handleNext}
                disabled={!businessProfile.industry || !businessProfile.size}
                className="w-full gradient-social-1 text-white hover:scale-105 transition-all"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentSection === 1 && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentTypes.map((contentType) => (
              <Card 
                key={contentType.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedContent.includes(contentType.id)
                    ? 'ring-2 ring-corporate-dark bg-corporate-light'
                    : 'hover:bg-corporate-light/50'
                }`}
                onClick={() => handleContentToggle(contentType.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-lg">
                    <div className={`p-2 rounded-lg ${
                      contentType.importance === 'high' ? 'bg-social-pink' :
                      contentType.importance === 'medium' ? 'bg-social-orange' : 'bg-social-blue'
                    }`}>
                      <contentType.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-corporate-dark">{contentType.name}</span>
                    {selectedContent.includes(contentType.id) && (
                      <CheckCircle className="w-5 h-5 text-social-green ml-auto" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-corporate-gray text-sm mb-3">{contentType.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={contentType.importance === 'high' ? 'destructive' : 'secondary'}>
                        {contentType.importance} priority
                      </Badge>
                      <Badge variant="outline">
                        {contentType.funnelStage}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="gradient-social-1 text-white hover:scale-105 transition-all"
            >
              Analyze Content Gaps
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
