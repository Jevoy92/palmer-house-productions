import { MetaTags } from "@/components/seo/MetaTags";
import { StructuredData } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageTransition } from '@/components/PageTransition';
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
  LineChart
} from "lucide-react";

const ContentStrategyPage = () => {
  const { transitionTo } = usePageTransition();

  const strategySteps = [
    {
      icon: Lightbulb,
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
      title: "Why Content Strategy Matters",
      subtitle: "Content as a business asset, not marketing fluff",
      description: "Most businesses post randomly or reactively. We treat content like a system: repeatable, scalable, optimized for ROI. Our goal isn't views — it's business outcomes.",
      takeaway: "This isn't about trends — it's about building a library that works for me while I sleep."
    },
    {
      icon: Compass,
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/10',
      title: "Discovery & Diagnosis",
      subtitle: "Understand your business at its roots",
      description: "We examine your business goals, ideal client profile, current bottlenecks, and existing content. Understanding your revenue targets, service mix, and buying triggers before creating anything.",
      takeaway: "They actually understand my business before hitting record."
    },
    {
      icon: Users,
      iconColor: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-500/10',
      title: "Interest + Identity Mapping",
      subtitle: "Align your personality with content formats",
      description: "What do you enjoy talking about? Where are you most natural — teaching, storytelling, demonstrating? We match that to videos you can sustain for months, not days.",
      takeaway: "I don't have to become a TikTok star — I just need a strategy that works for me."
    },
    {
      icon: Cog,
      iconColor: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-500/10',
      title: "Content as a System",
      subtitle: "A repeatable engine, not random posts",
      description: "Core pillars of Authority, Trust, Systems, Evergreen, and Social Proof. Internal vs external content — FAQs, onboarding, training, sales tools. Every video solves a business problem.",
      takeaway: "Every piece of content solves a business problem — not just entertains."
    },
    {
      icon: MessageSquare,
      iconColor: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-500/10',
      title: "The Strategy Workshop",
      subtitle: "90-minute deep dive into your business",
      description: "Questions, worksheets, goal mapping. We identify 'Core Video Assets' that your business needs first — not what's trending. Script frameworks and brand messaging templates included.",
      takeaway: "Within one call, I know exactly what content my business actually needs."
    },
    {
      icon: Calendar,
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      title: "3-Month Content Roadmap",
      subtitle: "Timeline and execution plan",
      description: "Prioritized deliverables, video order based on ROI and urgency. Clear roles: what we do vs what you handle. Shooting calendar with review checkpoints.",
      takeaway: "This isn't random. I know what's coming and when."
    },
    {
      icon: TrendingUp,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      title: "Optimization & Iteration",
      subtitle: "Strategy that evolves as you grow",
      description: "Analytics review tracking reach, conversions, and sales impact. What videos get repurposed, extended, or retired. When to add podcasts, speaking, YouTube, or training portals.",
      takeaway: "This system grows with me — it's not a one-and-done package."
    },
    {
      icon: Wrench,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      title: "Sustained Success & Handover",
      subtitle: "Equip you to keep winning",
      description: "Video templates, scripting guides, repurposing handbook. Train your team to record updates in-house. Ongoing support options available: retainer, consulting, or full production team.",
      takeaway: "They don't leave me hanging. I get tools to keep the momentum going."
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
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

      {/* Strategy Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-blue-600 dark:text-blue-400">Strategic Framework</span>
            </h2>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
              A proven system for turning your expertise into a content library that generates 
              qualified leads and drives real business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {strategySteps.map((step, index) => (
              <Card key={index} className="border-2 hover:border-blue-500/50 transition-all hover:shadow-lg group">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-4 rounded-xl ${step.bgColor} group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                      <p className="text-sm text-foreground/70 mb-3">{step.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-foreground/90 mb-4">{step.description}</p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm italic text-blue-600 dark:text-blue-400">
                      "{step.takeaway}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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