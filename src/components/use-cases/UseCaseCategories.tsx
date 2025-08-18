import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, MapPin, TrendingUp, Clock, DollarSign, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface CaseStudy {
  id: string;
  businessName: string;
  location: string;
  industry: string;
  businessType: string;
  packageName: string;
  price: string;
  timeline: string;
  problem: string;
  process: string[];
  results: string;
  gradient: string;
  beforeMetrics: { label: string; value: string; color: "red" }[];
  afterMetrics: { label: string; value: string; color: "green" }[];
  serviceUrl: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "brightside-pet-grooming",
    businessName: "BrightSide Pet Grooming",
    location: "Ballard, Seattle",
    industry: "Pet Services",
    businessType: "Local Service Business",
    packageName: "Starter Session",
    price: "$500",
    timeline: "1 day",
    problem: "Inconsistent social media posting, only when staff remembers. No content bank for seasonal promotions or last-minute appointments.",
    process: [
      "Film 30 minutes of grooming clips and before/after shots",
      "Create 3 one-minute social Reels with captions",
      "Develop 30-day content calendar template",
      "Provide posting schedule and best practices guide"
    ],
    results: "Could achieve 3× more local reach and 40% more weekend bookings within 30 days",
    gradient: "gradient-social-1",
    beforeMetrics: [
      { label: "Social Posts/Month", value: "2-3", color: "red" },
      { label: "Weekend Bookings", value: "60%", color: "red" },
      { label: "Content Planning", value: "None", color: "red" }
    ],
    afterMetrics: [
      { label: "Social Posts/Month", value: "15+", color: "green" },
      { label: "Weekend Bookings", value: "85%", color: "green" },
      { label: "Content Planning", value: "30-day bank", color: "green" }
    ],
    serviceUrl: "/contact?plan=starter"
  },
  {
    id: "harbor-yoga-studio",
    businessName: "Harbor Yoga Studio",
    location: "Fremont, Seattle",
    industry: "Fitness & Wellness",
    businessType: "Local Studio",
    packageName: "DIY Downloads",
    price: "$47",
    timeline: "Instant access",
    problem: "Owner wants to post daily content but runs out of ideas by week 2. Spends hours trying to think of what to film.",
    process: [
      "Download 25 DIY Reels script pack",
      "Access phone filming setup guide",
      "Use content calendar template",
      "Follow step-by-step filming instructions"
    ],
    results: "Could eliminate content planning stress and never run out of posting ideas again",
    gradient: "gradient-social-2",
    beforeMetrics: [
      { label: "Content Ideas", value: "2 weeks worth", color: "red" },
      { label: "Planning Time", value: "5+ hrs/week", color: "red" },
      { label: "Posting Consistency", value: "Sporadic", color: "red" }
    ],
    afterMetrics: [
      { label: "Content Ideas", value: "6+ months", color: "green" },
      { label: "Planning Time", value: "30 min/week", color: "green" },
      { label: "Posting Consistency", value: "Daily", color: "green" }
    ],
    serviceUrl: "/diy-downloads"
  },
  {
    id: "willow-lane-boutique",
    businessName: "Willow Lane Boutique",
    location: "Capitol Hill, Seattle",
    industry: "Retail Fashion",
    businessType: "Local Boutique",
    packageName: "DIY Coaching",
    price: "$2,000",
    timeline: "6 weeks",
    problem: "Owner films sporadically, spends hours editing, no clear brand style. Content looks unprofessional and inconsistent.",
    process: [
      "Week 1-2: Brand style and messaging development",
      "Week 3-4: On-camera confidence training",
      "Week 5-6: Content creation system implementation",
      "Live feedback sessions and brand video creation"
    ],
    results: "Could save 10+ hours/week in content prep while creating professional, on-brand videos",
    gradient: "gradient-social-3",
    beforeMetrics: [
      { label: "Video Quality", value: "Inconsistent", color: "red" },
      { label: "Editing Time", value: "8+ hrs/week", color: "red" },
      { label: "Brand Clarity", value: "Unclear", color: "red" }
    ],
    afterMetrics: [
      { label: "Video Quality", value: "Professional", color: "green" },
      { label: "Editing Time", value: "2 hrs/week", color: "green" },
      { label: "Brand Clarity", value: "Defined system", color: "green" }
    ],
    serviceUrl: "/group-coaching"
  },
  {
    id: "oakwood-landscaping",
    businessName: "Oakwood Landscaping",
    location: "Bellevue, Seattle Metro",
    industry: "Home Services",
    businessType: "Service Company",
    packageName: "Business Video Assets",
    price: "$5,000-$10,000",
    timeline: "3-4 weeks",
    problem: "Crew spends more time explaining services than doing them. Social media is outdated with poor-quality phone photos.",
    process: [
      "Monthly shoot day capturing seasonal work",
      "Create 1 hero video + 6 social Reels",
      "Professional captions and scheduling",
      "Platform-optimized thumbnails and formatting"
    ],
    results: "Could reduce sales calls by 50% and speed up booking decisions with visual portfolio",
    gradient: "gradient-social-4",
    beforeMetrics: [
      { label: "Sales Call Length", value: "45+ minutes", color: "red" },
      { label: "Booking Rate", value: "30%", color: "red" },
      { label: "Content Quality", value: "Phone photos", color: "red" }
    ],
    afterMetrics: [
      { label: "Sales Call Length", value: "20 minutes", color: "green" },
      { label: "Booking Rate", value: "65%", color: "green" },
      { label: "Content Quality", value: "Cinematic", color: "green" }
    ],
    serviceUrl: "/monthly-content"
  },
  {
    id: "summit-financial-advisors",
    businessName: "Summit Financial Advisors",
    location: "Downtown Seattle",
    industry: "Professional Services",
    businessType: "Financial Planning",
    packageName: "YouTube Visibility Engine",
    price: "$6,500",
    timeline: "One-time build",
    problem: "Website FAQ is text-heavy, no YouTube presence, low search visibility for financial planning topics.",
    process: [
      "Convert top 10 FAQs into searchable video titles",
      "Film 3 long-form educational videos (8-10 minutes)",
      "Complete SEO optimization and thumbnail design",
      "Strategy for ongoing content series"
    ],
    results: "Could dominate local search for financial planning services within 90 days",
    gradient: "gradient-social-5",
    beforeMetrics: [
      { label: "YouTube Presence", value: "None", color: "red" },
      { label: "Search Visibility", value: "Page 3+", color: "red" },
      { label: "FAQ Format", value: "Text only", color: "red" }
    ],
    afterMetrics: [
      { label: "YouTube Presence", value: "3 optimized videos", color: "green" },
      { label: "Search Visibility", value: "Top 3 results", color: "green" },
      { label: "FAQ Format", value: "Video library", color: "green" }
    ],
    serviceUrl: "/contact?plan=youtube"
  },
  {
    id: "velocity-fitness-center",
    businessName: "Velocity Fitness Center",
    location: "South Lake Union, Seattle",
    industry: "Fitness",
    businessType: "Gym/Fitness Center",
    packageName: "Internal FAQ Buildout",
    price: "$4,500",
    timeline: "One-time project",
    problem: "Front desk staff and managers spend hours daily answering the same member onboarding and equipment questions.",
    process: [
      "Identify top 15 most frequent member questions",
      "Film concise 60-90 second answer videos",
      "Create searchable internal portal system",
      "Train staff on video reference workflow"
    ],
    results: "Could free up 20+ staff hours monthly while improving member experience",
    gradient: "gradient-social-6",
    beforeMetrics: [
      { label: "Daily FAQ Time", value: "6+ hours", color: "red" },
      { label: "Member Wait Time", value: "5-10 minutes", color: "red" },
      { label: "FAQ System", value: "Verbal only", color: "red" }
    ],
    afterMetrics: [
      { label: "Daily FAQ Time", value: "2 hours", color: "green" },
      { label: "Member Wait Time", value: "1-2 minutes", color: "green" },
      { label: "FAQ System", value: "Video portal", color: "green" }
    ],
    serviceUrl: "/contact?plan=internal-faq"
  },
  {
    id: "pacific-surf-school",
    businessName: "Pacific Surf School",
    location: "Alki Beach, Seattle",
    industry: "Recreation/Tourism",
    businessType: "Adventure Sports",
    packageName: "External FAQ Buildout",
    price: "$4,500",
    timeline: "One-time project",
    problem: "Email inbox clogs with 'What's included?' and 'What to bring?' questions, especially during peak summer season.",
    process: [
      "Compile top 10 customer inquiry categories",
      "Create visual FAQ videos with beach/equipment b-roll",
      "Integrate videos into website and email automation",
      "Design mobile-friendly viewing experience"
    ],
    results: "Could cut customer inquiry volume in half during peak season while improving booking confidence",
    gradient: "gradient-social-1",
    beforeMetrics: [
      { label: "Daily Email Inquiries", value: "25-30", color: "red" },
      { label: "Booking Hesitation", value: "40%", color: "red" },
      { label: "FAQ Accessibility", value: "Email only", color: "red" }
    ],
    afterMetrics: [
      { label: "Daily Email Inquiries", value: "10-15", color: "green" },
      { label: "Booking Hesitation", value: "15%", color: "green" },
      { label: "FAQ Accessibility", value: "Video library", color: "green" }
    ],
    serviceUrl: "/contact?plan=external-faq"
  }
];

export const UseCaseCategories = () => {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'before' | 'after'>('before');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const toggleCard = (caseStudyId: string) => {
    setExpandedCards(prev => 
      prev.includes(caseStudyId) 
        ? prev.filter(id => id !== caseStudyId)
        : [...prev, caseStudyId]
    );
  };

  const handleGetStarted = (serviceUrl: string) => {
    navigate(serviceUrl);
  };

  const expandAll = () => {
    setExpandedCards(caseStudies.map(cs => cs.id));
  };

  const collapseAll = () => {
    setExpandedCards([]);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-video-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Seven Seattle <span className="text-gradient-1">Success Stories</span>
          </h2>
          <p className="text-xl text-corporate-gray mb-8 max-w-3xl mx-auto">
            Real business scenarios from across Seattle. See the specific challenges, processes, and projected results 
            for each strategic video content system.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> These are fictional scenarios based on typical client transformations and industry best practices.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center mb-12">
            <Button 
              onClick={expandAll}
              variant="outline" 
              className="border-corporate-light hover:border-corporate-primary"
            >
              Expand All
            </Button>
            <Button 
              onClick={collapseAll}
              variant="outline"
              className="border-corporate-light hover:border-corporate-primary"
            >
              Collapse All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy) => {
            const isExpanded = expandedCards.includes(caseStudy.id);
            
            return (
              <Collapsible key={caseStudy.id} open={isExpanded} onOpenChange={() => toggleCard(caseStudy.id)}>
                <Card className="h-full border-2 border-corporate-light/30 hover:border-corporate-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${caseStudy.gradient} shadow-md flex-shrink-0`}>
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <CardTitle className="text-xl font-bold text-corporate-dark mb-1">
                              {caseStudy.businessName}
                            </CardTitle>
                            <p className="text-sm text-corporate-gray mb-2">
                              {caseStudy.location} • {caseStudy.industry}
                            </p>
                            <p className="text-corporate-gray text-sm leading-relaxed">
                              {caseStudy.problem}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {isExpanded ? 
                            <ChevronUp className="w-5 h-5 text-corporate-gray" /> : 
                            <ChevronDown className="w-5 h-5 text-corporate-gray" />
                          }
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs font-semibold mb-1">
                              {caseStudy.price}
                            </Badge>
                            <p className="text-xs text-corporate-gray">
                              {caseStudy.timeline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 space-y-6">
                      {/* Before/After Metrics Toggle */}
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <div className="bg-gray-100 rounded-lg p-1 flex">
                            <button
                              onClick={() => setViewMode('before')}
                              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                viewMode === 'before' 
                                  ? 'bg-white text-red-600 shadow-sm' 
                                  : 'text-gray-600 hover:text-gray-800'
                              }`}
                            >
                              Before
                            </button>
                            <button
                              onClick={() => setViewMode('after')}
                              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                viewMode === 'after' 
                                  ? 'bg-white text-green-600 shadow-sm' 
                                  : 'text-gray-600 hover:text-gray-800'
                              }`}
                            >
                              After
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {(viewMode === 'before' ? caseStudy.beforeMetrics : caseStudy.afterMetrics).map((metric, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                              <span className="text-sm font-medium text-corporate-dark">{metric.label}</span>
                              <div className="flex items-center gap-2">
                                {viewMode === 'before' ? (
                                  <XCircle className="w-4 h-4 text-red-500" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                                <span className={`text-sm font-semibold ${
                                  viewMode === 'before' ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {metric.value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process Steps */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-corporate-dark flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Transformation Process
                        </h4>
                        <ol className="space-y-3">
                          {caseStudy.process.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-corporate-primary text-white text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span className="text-corporate-gray text-sm leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Projected Results */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-800">Projected Results</h4>
                        </div>
                        <p className="text-green-700 text-sm leading-relaxed">
                          {caseStudy.results}
                        </p>
                      </div>

                      {/* Service Package Info */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-blue-800">{caseStudy.packageName}</h4>
                          <Badge className="bg-blue-100 text-blue-800">{caseStudy.businessType}</Badge>
                        </div>
                        <p className="text-blue-700 text-sm mb-3">
                          This scenario demonstrates our <strong>{caseStudy.packageName}</strong> approach for {caseStudy.businessType.toLowerCase()} businesses.
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-corporate-light/30">
                        <Button 
                          onClick={() => handleGetStarted(caseStudy.serviceUrl)}
                          className="w-full bg-corporate-primary hover:bg-corporate-primary/90 text-white font-semibold py-3 rounded-xl"
                        >
                          Start Your {caseStudy.packageName}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </section>
  );
};