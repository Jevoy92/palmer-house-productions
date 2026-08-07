import { ArrowRight, Sparkles, Library, Zap, Target, CheckCircle2, Smartphone, Award, Users, Briefcase, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MetaTags } from "@/components/seo/MetaTags";
import { MainContent } from "@/components/MainContent";

const Memberships = () => {
  return (
    <MainContent>
      <MetaTags
        title="Memberships | Palmer House Productions"
        description="Build a Video System That Works While You Sleep. Your content, your clarity, your systems — all in one simple app."
        keywords="video membership, content system, AI video tools, video production app"
      />

      {/* Hero Section - The Promise */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-background text-foreground px-4 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build a Video System That<br />Works While You Sleep
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Your content, your clarity, your systems — all in one simple app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/dashboard">Start Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/dashboard">Explore the App</Link>
            </Button>
          </div>
          
          {/* Dashboard Hero Screenshot Placeholder */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-muted border border-border rounded-lg p-8 aspect-video flex items-center justify-center">
              <p className="text-muted-foreground">Dashboard Hero Screenshot</p>
            </div>
          </div>
        </div>
      </section>

      {/* What The App Does - The Clarity Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Your Video Library */}
            <Card className="border-border">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Library className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Your Video Library</h3>
                <p className="text-muted-foreground">
                  All your finished assets, organized and ready.
                </p>
                <div className="bg-muted border border-border rounded-lg p-4 aspect-video flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Library View Screenshot</p>
                </div>
              </CardContent>
            </Card>

            {/* AI Tools That Save Hours */}
            <Card className="border-border">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">AI Tools That Save Hours</h3>
                <p className="text-muted-foreground">
                  Scripts, ideas, thumbnails, captions — done for you.
                </p>
                <div className="bg-muted border border-border rounded-lg p-4 aspect-video flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">AI Script Builder Screenshot</p>
                </div>
              </CardContent>
            </Card>

            {/* Review & Approve in Minutes */}
            <Card className="border-border">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Review & Approve in Minutes</h3>
                <p className="text-muted-foreground">
                  Clean interface for feedback and final approvals.
                </p>
                <div className="bg-muted border border-border rounded-lg p-4 aspect-video flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Review & Approvals Screenshot</p>
                </div>
              </CardContent>
            </Card>

            {/* Your Strategy, All in One Place */}
            <Card className="border-border">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Your Strategy, All in One Place</h3>
                <p className="text-muted-foreground">
                  Roadmap, recommendations, content plan.
                </p>
                <div className="bg-muted border border-border rounded-lg p-4 aspect-video flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Strategy/Roadmap Screenshot</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section - The Transformation */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Real Results</h2>
            <p className="text-xl text-muted-foreground">What you'll achieve with the system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Saved 15 hours a month on content planning",
              "Never lost a video again",
              "Clarity on what to film next",
              "Consistent publishing without burnout",
              "Everything finally organized"
            ].map((result, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg font-medium">{result}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-background border border-border rounded-lg p-4 aspect-video flex items-center justify-center">
              <p className="text-muted-foreground">Publish Calendar Screenshot</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 aspect-video flex items-center justify-center">
              <p className="text-muted-foreground">Roadmap Screenshot</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Experience - What It Feels Like */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                No confusion.<br />
                No scattered files.<br />
                No mystery.
              </h2>
              <p className="text-xl text-muted-foreground">
                Just a clean workspace that gives you direction.
              </p>
              <Button asChild size="lg" className="mt-4">
                <Link to="/dashboard">
                  Start Building Your System
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <Smartphone className="w-64 h-96 text-muted-foreground/20 absolute inset-0 m-auto" />
                <div className="bg-muted border border-border rounded-2xl p-4 w-64 h-96 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground text-center">Mobile Dashboard Screenshot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Simple and Clean */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Simple, Fair Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card className="border-border">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground mt-2">Get started with the basics</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">✓ Video Series Builder</p>
                  <p className="text-sm text-muted-foreground">✓ Limited AI usage</p>
                  <p className="text-sm text-muted-foreground">✓ Preview-only access</p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/dashboard">Start Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Core Tier */}
            <Card className="border-primary border-2 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Core</h3>
                  <p className="text-muted-foreground mt-2">Full access to all tools</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">✓ Full AI tool suite</p>
                  <p className="text-sm text-muted-foreground">✓ Unlimited downloads</p>
                  <p className="text-sm text-muted-foreground">✓ Monthly strategy call</p>
                  <p className="text-sm text-muted-foreground">✓ Content scheduling</p>
                </div>
                <Button asChild className="w-full">
                  <Link to="/app-pricing">View Pricing</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Guided Support Tier */}
            <Card className="border-border">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Guided Support</h3>
                  <p className="text-muted-foreground mt-2">Premium guidance & tools</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">✓ Everything in Core</p>
                  <p className="text-sm text-muted-foreground">✓ 2 monthly strategy sessions</p>
                  <p className="text-sm text-muted-foreground">✓ Full publishing calendar</p>
                  <p className="text-sm text-muted-foreground">✓ Priority support</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/app-pricing">View Pricing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Credit System Visual */}
          <div className="flex justify-center mt-12">
            <Card className="border-border max-w-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <Award className="w-10 h-10 text-primary" />
                <div>
                  <p className="font-medium">24 Credits Remaining</p>
                  <p className="text-sm text-muted-foreground">Refills monthly</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/app-pricing">View Full Pricing & Add-ons</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to create, organize, and publish</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "AI Script Builder", desc: "Generate compelling scripts in seconds" },
              { name: "AI Thumbnail Generator", desc: "Eye-catching thumbnails automatically" },
              { name: "FAQ System Builder", desc: "Build comprehensive FAQ systems" },
              { name: "Social Publishing", desc: "Schedule across all platforms" },
              { name: "Brand Kit Upload", desc: "Maintain brand consistency" },
              { name: "Content Calendar", desc: "Plan months ahead with ease" }
            ].map((feature, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6 space-y-4">
                  <h4 className="text-lg font-bold">{feature.name}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  <div className="bg-muted border border-border rounded-lg p-4 h-32 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">{feature.name} Screenshot</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Trusted by Creators</h2>
            <p className="text-xl text-muted-foreground">Real stories from real users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "This app saves me every day. My content workflow is finally organized." },
              { quote: "I went from scattered chaos to a clear system in just one week." },
              { quote: "The AI tools alone are worth it. But the whole system? Game-changer." }
            ].map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-sm text-muted-foreground">Creator</div>
                  </div>
                  <p className="text-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Before/After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-muted-foreground">Before</h4>
              <div className="bg-background border border-border rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-muted-foreground text-center">Messy Google Drive<br />(Blurred Screenshot)</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-primary">After</h4>
              <div className="bg-background border border-border rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-muted-foreground text-center">Clean Library Screen<br />(Blurred Screenshot)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Who This Is For</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              For founders, creators, and businesses who want clarity — not chaos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardContent className="p-8 text-center space-y-4">
                <Rocket className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold">Founders</h3>
                <p className="text-muted-foreground">
                  Build your brand's video presence without the overwhelm
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8 text-center space-y-4">
                <Users className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold">Creators</h3>
                <p className="text-muted-foreground">
                  Stop losing content and start building a real system
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8 text-center space-y-4">
                <Briefcase className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold">Businesses</h3>
                <p className="text-muted-foreground">
                  Scale your video operations with clarity and control
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">Start Free</h2>
          <p className="text-xl md:text-2xl opacity-90">
            Your videos work harder when your system is clear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to="/dashboard">Create Your Free Account</Link>
            </Button>
          </div>
          
          {/* Floating Dashboard Peek */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-background/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-4 aspect-video flex items-center justify-center">
              <p className="text-primary-foreground/60">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>
    </MainContent>
  );
};

export default Memberships;
