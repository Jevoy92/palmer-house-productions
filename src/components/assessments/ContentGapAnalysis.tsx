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

interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: any;
  importance: 'high' | 'medium' | 'low';
  examples: string[];
}

interface GapAnalysisResult {
  currentContent: string[];
  missingContent: string[];
  priorityGaps: string[];
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  funnelCoverage: number;
}

export const ContentGapAnalysis = () => {
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", company: "" });

  const contentTypes: ContentType[] = [
    {
      id: "brand-story",
      name: "Brand Story Videos",
      description: "About us, mission, values, company culture",
      icon: Star,
      importance: 'high',
      examples: ["Company origin story", "Team introductions", "Mission & values", "Behind-the-scenes"]
    },
    {
      id: "product-demos",
      name: "Product Demonstrations",
      description: "Show your products/services in action",
      icon: PlayCircle,
      importance: 'high',
      examples: ["Feature walkthroughs", "Use case scenarios", "Before/after comparisons", "Live demos"]
    },
    {
      id: "customer-testimonials",
      name: "Customer Testimonials",
      description: "Social proof and success stories",
      icon: Users,
      importance: 'high',
      examples: ["Video testimonials", "Case study videos", "Customer success stories", "User-generated content"]
    },
    {
      id: "educational-content",
      name: "Educational Content",
      description: "How-to guides and tutorials",
      icon: BookOpen,
      importance: 'medium',
      examples: ["Tutorial videos", "FAQ responses", "Best practices", "Industry insights"]
    },
    {
      id: "thought-leadership",
      name: "Thought Leadership",
      description: "Industry expertise and insights",
      icon: TrendingUp,
      importance: 'medium',
      examples: ["Industry predictions", "Expert interviews", "Trend analysis", "Opinion pieces"]
    },
    {
      id: "social-proof",
      name: "Social Proof Content",
      description: "Reviews, awards, and recognition",
      icon: CheckCircle,
      importance: 'medium',
      examples: ["Award announcements", "Press coverage", "Client spotlights", "Partnership announcements"]
    },
    {
      id: "promotional",
      name: "Promotional Videos",
      description: "Sales and marketing focused content",
      icon: AlertTriangle,
      importance: 'medium',
      examples: ["Product launches", "Special offers", "Event promotions", "Call-to-action videos"]
    },
    {
      id: "recruitment",
      name: "Recruitment Content",
      description: "Attract and engage talent",
      icon: Users,
      importance: 'low',
      examples: ["Job postings", "Company culture", "Employee stories", "Office tours"]
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
    
    let immediate: string[] = [];
    let shortTerm: string[] = [];
    let longTerm: string[] = [];

    if (!selectedContent.includes('brand-story')) {
      immediate.push("Create brand story videos to establish credibility");
    }
    if (!selectedContent.includes('product-demos')) {
      immediate.push("Develop product demonstration videos");
    }
    if (!selectedContent.includes('customer-testimonials')) {
      shortTerm.push("Collect and produce customer testimonial videos");
    }
    if (!selectedContent.includes('educational-content')) {
      shortTerm.push("Build educational content library");
    }
    if (!selectedContent.includes('thought-leadership')) {
      longTerm.push("Establish thought leadership through expert content");
    }

    return {
      currentContent,
      missingContent,
      priorityGaps: highImportanceMissing,
      recommendations: { immediate, shortTerm, longTerm },
      funnelCoverage: Math.round(funnelCoverage)
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
    setShowResults(true);
    const results = analyzeGaps();
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

            <div className="p-6 bg-corporate-light rounded-xl">
              <h3 className="text-lg font-bold text-corporate-dark mb-4">Get Your Detailed Content Strategy</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="px-4 py-2 border border-corporate-gray rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="px-4 py-2 border border-corporate-gray rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Company name"
                  value={contactInfo.company}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                  className="px-4 py-2 border border-corporate-gray rounded-lg"
                />
              </div>
              <Button 
                onClick={handleContactSubmit}
                className="gradient-social-1 text-white hover:scale-105 transition-all w-full"
              >
                Send My Content Strategy Report
              </Button>
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