import { useState } from "react";
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
  PieChart
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useAssessmentData } from "@/hooks/useAssessmentData";
import { SmartBookingButton } from "./SmartBookingButton";

interface ContentGapAnalysisProps {
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

interface BusinessProfile {
  industry: string;
  size: string;
  primaryGoals: string[];
  currentChannels: string[];
  targetAudience: string;
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
}

export const ContentGapAnalysis = ({ onBack }: ContentGapAnalysisProps) => {
  const { saveAssessment } = useAssessmentData();
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", company: "" });
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    industry: "",
    size: "",
    primaryGoals: [],
    currentChannels: [],
    targetAudience: ""
  });
  const [showProfileForm, setShowProfileForm] = useState(true);

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
    },
    {
      id: "promotional",
      name: "Promotional Videos",
      description: "Sales and marketing focused content",
      icon: AlertTriangle,
      importance: 'medium',
      examples: ["Product launches", "Special offers", "Event promotions", "Call-to-action videos"],
      funnelStage: 'decision',
      businessTypes: ['all'],
      effort: 'medium',
      impact: 'medium'
    },
    {
      id: "recruitment",
      name: "Recruitment Content",
      description: "Attract and engage talent",
      icon: Users,
      importance: 'low',
      examples: ["Job postings", "Company culture", "Employee stories", "Office tours"],
      funnelStage: 'awareness',
      businessTypes: ['all'],
      effort: 'low',
      impact: 'low'
    }
  ];

  const analyzeGaps = (): GapAnalysisResult => {
    const currentContent = selectedContent;
    const allContentIds = contentTypes.map(type => type.id);
    const missingContent = allContentIds.filter(id => !selectedContent.includes(id));
    
    const highImportanceMissing = missingContent.filter(id => 
      contentTypes.find(type => type.id === id)?.importance === 'high'
    );
    
    const funnelCoverage = (selectedContent.length / contentTypes.length) * 100;
    
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
    
    // Calculate impact score based on missing high-impact content
    const impactScore = selectedContent.reduce((score, contentId) => {
      const content = contentTypes.find(type => type.id === contentId);
      if (content?.impact === 'high') return score + 3;
      if (content?.impact === 'medium') return score + 2;
      return score + 1;
    }, 0);
    
    let immediate: string[] = [];
    let shortTerm: string[] = [];
    let longTerm: string[] = [];

    // Priority-based recommendations
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
    
    // Add funnel-specific recommendations
    if (funnelGaps.awareness.length > 2) {
      immediate.push("Focus on awareness-stage content to attract new prospects");
    }
    if (funnelGaps.decision.length > 1) {
      shortTerm.push("Create decision-stage content to close more deals");
    }
    
    // Competitor opportunities
    const competitorOpportunities = [
      "Educational content gaps present opportunity for thought leadership",
      "Limited social proof content allows for competitive advantage",
      "Missing awareness-stage content creates market opportunity"
    ].slice(0, Math.max(1, 3 - Math.floor(funnelCoverage / 33)));
    
    // ROI predictions based on content types
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
      funnelCoverage: Math.round(funnelCoverage),
      impactScore,
      competitorOpportunities,
      roiPredictions
    };
  };

  const handleContentToggle = (contentId: string) => {
    setSelectedContent(prev => 
      prev.includes(contentId)
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
    
    trackEvent('content_gap_selection', {
      content_type: contentId,
      action: selectedContent.includes(contentId) ? 'removed' : 'added'
    });
  };

  const handleShowResults = () => {
    const results = analyzeGaps();
    
    // Save assessment to persistent storage
    saveAssessment({
      type: 'content-gap',
      score: results.funnelCoverage,
      level: results.funnelCoverage >= 75 ? 'Comprehensive Coverage' : 
             results.funnelCoverage >= 50 ? 'Good Coverage' : 
             results.funnelCoverage >= 25 ? 'Basic Coverage' : 'Limited Coverage',
      completedAt: Date.now(),
      businessContext: businessProfile,
      answers: { selectedContent },
      recommendations: [...results.recommendations.immediate, ...results.recommendations.shortTerm]
    });
    
    setShowResults(true);
    trackEvent('content_gap_analysis_completed', {
      funnel_coverage: results.funnelCoverage,
      priority_gaps: results.priorityGaps.length,
      total_selected: selectedContent.length
    });
  };

  const handleContactSubmit = () => {
    trackEvent('content_gap_contact_captured', {
      name: contactInfo.name,
      email: contactInfo.email,
      company: contactInfo.company,
      funnel_coverage: analyzeGaps().funnelCoverage
    });
    alert("Thank you! We'll send you a detailed content strategy report.");
  };

  if (showResults) {
    const results = analyzeGaps();
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-corporate-dark mb-4">
              Your Content Gap Analysis
            </CardTitle>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-4xl font-black text-gradient-1">{results.funnelCoverage}%</div>
                <div className="text-sm text-corporate-gray">Funnel Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-gradient-2">{results.priorityGaps.length}</div>
                <div className="text-sm text-corporate-gray">Priority Gaps</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-corporate-dark mb-4 flex items-center">
                  <CheckCircle className="text-social-green w-5 h-5 mr-2" />
                  Current Content
                </h3>
                <div className="space-y-2">
                  {results.currentContent.map(contentId => {
                    const content = contentTypes.find(type => type.id === contentId);
                    return (
                      <Badge key={contentId} variant="secondary" className="mr-2 mb-2">
                        {content?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-corporate-dark mb-4 flex items-center">
                  <AlertTriangle className="text-social-orange w-5 h-5 mr-2" />
                  Missing Content
                </h3>
                <div className="space-y-2">
                  {results.missingContent.map(contentId => {
                    const content = contentTypes.find(type => type.id === contentId);
                    return (
                      <Badge key={contentId} variant="outline" className="mr-2 mb-2">
                        {content?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-corporate-dark mb-4">Action Plan</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-social-pink/10 rounded-xl">
                  <h4 className="font-bold text-social-pink mb-2">Immediate (0-30 days)</h4>
                  <ul className="text-sm space-y-1">
                    {results.recommendations.immediate.map((rec, index) => (
                      <li key={index} className="text-corporate-gray">• {rec}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-social-orange/10 rounded-xl">
                  <h4 className="font-bold text-social-orange mb-2">Short-term (1-3 months)</h4>
                  <ul className="text-sm space-y-1">
                    {results.recommendations.shortTerm.map((rec, index) => (
                      <li key={index} className="text-corporate-gray">• {rec}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-social-blue/10 rounded-xl">
                  <h4 className="font-bold text-social-blue mb-2">Long-term (3+ months)</h4>
                  <ul className="text-sm space-y-1">
                    {results.recommendations.longTerm.map((rec, index) => (
                      <li key={index} className="text-corporate-gray">• {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <SmartBookingButton
                assessmentType="Content Gap Analysis"
                score={results.funnelCoverage}
                level={results.funnelCoverage >= 75 ? 'Comprehensive Coverage' : 
                       results.funnelCoverage >= 50 ? 'Good Coverage' : 
                       results.funnelCoverage >= 25 ? 'Basic Coverage' : 'Limited Coverage'}
                recommendations={[...results.recommendations.immediate, ...results.recommendations.shortTerm]}
                businessContext={businessProfile}
                onDownloadResults={() => {
                  const content = `
Content Gap Analysis Results
Funnel Coverage: ${results.funnelCoverage}%
Priority Gaps: ${results.priorityGaps.length}

Current Content:
${results.currentContent.map((contentId, i) => {
  const content = contentTypes.find(type => type.id === contentId);
  return `${i + 1}. ${content?.name}`;
}).join('\n')}

Top Recommendations:
${[...results.recommendations.immediate, ...results.recommendations.shortTerm].slice(0, 5).map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
                  `.trim();
                  
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `content-gap-analysis-${Date.now()}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                buttonText="Book Content Strategy Call"
                size="lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-corporate-dark mb-4">Content Gap Analysis</h2>
        <p className="text-corporate-gray max-w-2xl mx-auto">
          Select the types of video content you currently have to identify gaps in your content funnel
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              <div className="space-y-1">
                {contentType.examples.slice(0, 2).map((example, index) => (
                  <div key={index} className="text-xs text-corporate-gray">• {example}</div>
                ))}
              </div>
              <Badge 
                variant="secondary" 
                className={`mt-2 ${
                  contentType.importance === 'high' ? 'bg-social-pink/20 text-social-pink' :
                  contentType.importance === 'medium' ? 'bg-social-orange/20 text-social-orange' : 
                  'bg-social-blue/20 text-social-blue'
                }`}
              >
                {contentType.importance} priority
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <div className="mb-4">
          <Progress value={(selectedContent.length / contentTypes.length) * 100} className="max-w-md mx-auto h-2" />
          <p className="text-sm text-corporate-gray mt-2">
            {selectedContent.length} of {contentTypes.length} content types selected
          </p>
        </div>
        <Button
          onClick={handleShowResults}
          disabled={selectedContent.length === 0}
          className="gradient-social-1 text-white px-8 py-3 hover:scale-105 transition-all disabled:opacity-50"
        >
          Analyze Content Gaps
          <PieChart className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};