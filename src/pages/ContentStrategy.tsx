import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { usePageTransition } from '@/components/PageTransition';
import { useState } from "react";
import { 
  Target, 
  Compass,
  Users,
  Cog,
  MessageSquare,
  Calendar,
  TrendingUp,
  Wrench,
  Rocket,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Brain,
  Zap,
  LineChart,
  ChevronDown
} from "lucide-react";

const ContentStrategyPage = () => {
  const { transitionTo } = usePageTransition();
  const [openSteps, setOpenSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setOpenSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const strategySteps = [
    {
      icon: Lightbulb,
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
      title: "Content as Business Asset",
      description: "Treat content like a system: repeatable, scalable, optimized for ROI. Not views — business outcomes.",
      details: "We help you build a content infrastructure that generates predictable results. Every piece of content has a clear purpose in your sales funnel, customer journey, or brand positioning. We focus on creating systems, not one-offs—content that compounds in value over time."
    },
    {
      icon: Compass,
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/10',
      title: "Discovery & Diagnosis",
      description: "Examine business goals, ideal clients, and revenue targets before creating anything.",
      details: "Through in-depth interviews and analysis, we uncover what makes your business unique, who you serve best, and what content will actually move the needle. We map your customer journey, identify content gaps, and prioritize opportunities based on potential ROI."
    },
    {
      icon: Users,
      iconColor: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-500/10',
      title: "Interest + Identity Mapping",
      description: "Match your personality to content formats you can sustain long-term.",
      details: "Successful content requires consistency. We assess your strengths, communication style, and genuine interests to design a content approach you'll actually maintain. Whether you're better on camera, behind the mic, or in writing—we align strategy with what energizes you."
    },
    {
      icon: MessageSquare,
      iconColor: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-500/10',
      title: "Strategy Workshop",
      description: "90-minute deep dive to identify core video assets your business needs first.",
      details: "In this collaborative session, we prioritize your highest-impact content opportunities. You'll leave with a clear understanding of what to create first, how each piece serves your business, and a realistic production timeline that fits your resources and schedule."
    },
    {
      icon: Calendar,
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      title: "3-Month Roadmap",
      description: "Prioritized deliverables with clear roles and shooting calendar.",
      details: "Your custom roadmap includes specific video concepts, production dates, platform strategies, and distribution plans. We define who's responsible for what, set realistic deadlines, and build in buffer time for revisions and optimization."
    },
    {
      icon: TrendingUp,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      title: "Optimization & Growth",
      description: "Analytics review and content evolution as your business scales.",
      details: "We track performance metrics that matter to your business—not just views and likes. Regular reviews help us identify what's working, double down on winners, and pivot away from underperformers. As your business grows, your content strategy evolves with it."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Content Strategy Services | Business-Driven Video Planning | Palmer House"
        description="Build a content system that works while you sleep. Strategic video planning aligned with your business goals, personality, and long-term success."
        keywords="content strategy, video strategy, business content planning, video marketing strategy, content systems"
        ogTitle="Content Strategy Services | Palmer House Productions"
        ogDescription="Transform your business with strategic content planning that drives real results."
      />
      <StructuredData type="services" />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20">
              <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Strategic Content Planning</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build a <span className="text-blue-600 dark:text-blue-400">Content Engine</span>
              <br />
              That Works While You Sleep
            </h1>
            <p className="text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Not random posts. Not marketing fluff. A strategic content system aligned with your business goals, 
              your personality, and your long-term success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                className="group bg-blue-600 hover:bg-blue-700 text-white"
              >
                Book Your Strategy Session
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => transitionTo('/contact')}
                className="border-blue-500/50 hover:bg-blue-500/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Process - Winding Path */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Our <span className="text-blue-600 dark:text-blue-400">Strategic Framework</span>
            </h2>
            <p className="text-base text-foreground/90">
              A proven system for turning your expertise into a content library that drives results.
            </p>
          </div>

          {/* Winding Path Container */}
          <div className="relative min-h-[1400px] hidden md:block">
            {/* SVG Curved Path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 1400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--blue-500))', stopOpacity: 0.3 }} />
                  <stop offset="50%" style={{ stopColor: 'hsl(var(--purple-500))', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--blue-500))', stopOpacity: 0.3 }} />
                </linearGradient>
              </defs>
              <path
                d="M 180,80 Q 500,100 520,250 Q 540,400 250,480 Q 150,520 180,680 Q 210,840 520,920 Q 680,970 600,1120 Q 560,1200 400,1300"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>

            {/* Milestone Points */}
            {strategySteps.map((step, index) => {
              const positions = [
                { circleX: '180px', circleY: '80px', cardX: '280px', cardY: '30px' },
                { circleX: '520px', circleY: '250px', cardX: '620px', cardY: '200px' },
                { circleX: '250px', circleY: '480px', cardX: '30px', cardY: '430px' },
                { circleX: '180px', circleY: '680px', cardX: '280px', cardY: '630px' },
                { circleX: '520px', circleY: '920px', cardX: '30px', cardY: '870px' },
                { circleX: '400px', circleY: '1300px', cardX: '500px', cardY: '1250px' },
              ];

              const pos = positions[index];

              return (
                <div key={index}>
                  {/* Milestone Circle */}
                  <div 
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: pos.circleX, top: pos.circleY }}
                  >
                    <div className={`w-16 h-16 rounded-full ${step.bgColor} border-4 border-background shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform cursor-pointer`}>
                      <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                    </div>
                    <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full ${step.bgColor} border-2 border-background flex items-center justify-center`}>
                      <span className={`text-xs font-bold ${step.iconColor}`}>{index + 1}</span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div 
                    className="absolute z-10"
                    style={{ left: pos.cardX, top: pos.cardY, width: '300px' }}
                  >
                    <Collapsible open={openSteps.includes(index)} onOpenChange={() => toggleStep(index)}>
                      <Card className="border-2 hover:border-blue-500/50 transition-all hover:shadow-xl group bg-background/95 backdrop-blur">
                        <CardContent className="p-3">
                          <CollapsibleTrigger className="w-full text-left">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-bold pr-2">{step.title}</h3>
                              <ChevronDown 
                                className={`w-4 h-4 flex-shrink-0 transition-transform ${openSteps.includes(index) ? 'rotate-180' : ''}`}
                              />
                            </div>
                            <p className="text-xs text-foreground/80">{step.description}</p>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent>
                            <div className="mt-2 pt-2 border-t border-border">
                              <p className="text-xs text-foreground/70 leading-relaxed">
                                {step.details}
                              </p>
                            </div>
                          </CollapsibleContent>
                        </CardContent>
                      </Card>
                    </Collapsible>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Simple Vertical List */}
          <div className="md:hidden space-y-4">
            {strategySteps.map((step, index) => (
              <Collapsible key={index} open={openSteps.includes(index)} onOpenChange={() => toggleStep(index)}>
                <Card className="border-2 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-4">
                    <CollapsibleTrigger className="w-full text-left">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-full ${step.bgColor} border-2 border-background flex items-center justify-center flex-shrink-0`}>
                          <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base font-bold">{step.title}</h3>
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform ${openSteps.includes(index) ? 'rotate-180' : ''}`}
                            />
                          </div>
                          <p className="text-sm text-foreground/80">{step.description}</p>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="mt-3 pl-15 pt-3 border-t border-border">
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {step.details}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your <span className="text-blue-600 dark:text-blue-400">Content Strategy</span>?
              </h2>
              <p className="text-xl text-foreground/90 mb-8">
                No camera needed — just your brain, your goals, and your biggest problems. 
                Let's turn your expertise into a content system that works.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer')}
                  className="group bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Book Strategy Session
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => transitionTo('/pals')}
                  className="border-blue-500/50 hover:bg-blue-500/10"
                >
                  Meet The Pals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Supporting Benefits */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Our Strategy <span className="text-blue-600 dark:text-blue-400">Different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all hover:border-green-500/50 border-2 group">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <LineChart className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Business-First Approach</h3>
                <p className="text-foreground/90">
                  We start with your revenue goals, not trending formats. Every video has a job to do in your business.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:border-purple-500/50 border-2 group">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sustainable Systems</h3>
                <p className="text-foreground/90">
                  Build content you can maintain long-term, aligned with what you actually enjoy and excel at.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:border-orange-500/50 border-2 group">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Measurable Outcomes</h3>
                <p className="text-foreground/90">
                  Track what matters: qualified leads, conversion rates, and real ROI — not just vanity metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentStrategyPage;