import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTransition } from '@/components/PageTransition';
import React, { useState, useEffect } from "react";
import { 
  Target, 
  Compass,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Rocket,
  ArrowRight,
  Lightbulb,
  Brain,
  Zap,
  LineChart
} from "lucide-react";

const ContentStrategyPage = () => {
  const { transitionTo } = usePageTransition();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [initialState, setInitialState] = useState(true);

  useEffect(() => {
    // Set first step as active by default and remove initial state
    setInitialState(false);
  }, []);

  const handleStepClick = (index: number) => {
    setInitialState(false);
    setActiveStep(index);
  };

  const strategySteps = [
    {
      icon: Lightbulb,
      color: '#A8D08D',
      title: "Content as Business Asset",
      description: "Treat content like a system: repeatable, scalable, optimized for ROI. Not views — business outcomes.",
    },
    {
      icon: Compass,
      color: '#F4B183',
      title: "Discovery & Diagnosis",
      description: "Examine business goals, ideal clients, and revenue targets before creating anything.",
    },
    {
      icon: Users,
      color: '#B4A7D6',
      title: "Interest + Identity Mapping",
      description: "Match your personality to content formats you can sustain long-term.",
    },
    {
      icon: MessageSquare,
      color: '#A3D9E2',
      title: "Strategy Workshop",
      description: "90-minute deep dive to identify core video assets your business needs first.",
    },
    {
      icon: Calendar,
      color: '#4A86E8',
      title: "3-Month Roadmap",
      description: "Prioritized deliverables with clear roles and shooting calendar.",
    },
    {
      icon: TrendingUp,
      color: '#434343',
      title: "Optimization & Growth",
      description: "Analytics review and content evolution as your business scales.",
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

      {/* Strategy Process - Interactive Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Our <span className="text-blue-600 dark:text-blue-400">Strategic Framework</span>
            </h2>
            <p className="text-base text-foreground/90 mb-2">
              A proven system for turning your expertise into a content library that drives results.
            </p>
            <p className="text-sm text-muted-foreground hidden md:block">
              Click each step to learn more
            </p>
          </div>

          {/* Desktop Timeline with Clickable Bubbles */}
          <div className="hidden md:block relative w-full mb-8">
            {/* Wavy SVG Path */}
            <svg 
              className="w-full h-auto" 
              viewBox="0 0 1200 150" 
              preserveAspectRatio="xMidYMid meet"
              style={{ minHeight: '150px' }}
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#A8D08D', stopOpacity: 1 }} />
                  <stop offset="20%" style={{ stopColor: '#F4B183', stopOpacity: 1 }} />
                  <stop offset="40%" style={{ stopColor: '#B4A7D6', stopOpacity: 1 }} />
                  <stop offset="60%" style={{ stopColor: '#A3D9E2', stopOpacity: 1 }} />
                  <stop offset="80%" style={{ stopColor: '#4A86E8', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#434343', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path 
                d="M 50 75 Q 150 -5, 250 75 T 450 75 T 650 75 T 850 75 T 1050 75 T 1150 75" 
                stroke="url(#waveGradient)" 
                strokeWidth="6" 
                fill="none" 
                strokeLinecap="round"
              />
              
              {/* Clickable Step Bubbles */}
              {strategySteps.map((step, index) => {
                const positions = [50, 250, 450, 650, 850, 1050];
                const cx = positions[index];
                const cy = 75;
                const isActive = activeStep === index;
                
                return (
                  <g 
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className="cursor-pointer"
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 22 : 18}
                      fill="white"
                      stroke={step.color}
                      strokeWidth={isActive ? 5 : 3}
                      className="transition-all duration-300"
                      style={{
                        filter: isActive 
                          ? `drop-shadow(0 0 12px ${step.color}80)` 
                          : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 28 : 24}
                      fill="transparent"
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Step Details Card */}
            {activeStep !== null && (
              <Card className="max-w-3xl mx-auto shadow-xl border-2 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div 
                      className="text-5xl flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${strategySteps[activeStep].color}20`,
                        color: strategySteps[activeStep].color 
                      }}
                    >
                      {React.createElement(strategySteps[activeStep].icon, { className: "w-8 h-8" })}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                        STEP {String.fromCharCode(65 + activeStep)}
                      </p>
                      <h3 className="text-2xl font-bold mb-3">
                        {strategySteps[activeStep].title}
                      </h3>
                      <p className="text-base text-foreground/80 leading-relaxed">
                        {strategySteps[activeStep].description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mobile: Simple Vertical List */}
          <div className="md:hidden space-y-4">
            {strategySteps.map((step, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => setActiveStep(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.color}20`, color: step.color }}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">STEP {index + 1}</p>
                      <h3 className="text-base font-bold mb-1">{step.title}</h3>
                      <p className="text-sm text-foreground/80">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                <h3 className="text-xl font-bold mb-3">Solve Operational Bottlenecks</h3>
                <p className="text-foreground/90">
                  We don&apos;t chase viral trends—we identify where video can eliminate repetitive work, confusing onboarding, or endless customer questions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:border-purple-500/50 border-2 group">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Video as Infrastructure</h3>
                <p className="text-foreground/90">
                  Build a communication system that replaces repetitive explanations, speeds up training, and automates your most common answers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:border-orange-500/50 border-2 group">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real Business Metrics</h3>
                <p className="text-foreground/90">
                  Fewer support tickets. Faster onboarding. More booked jobs. We measure success by how much time and friction we remove from your business.
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