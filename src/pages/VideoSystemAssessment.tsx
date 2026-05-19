import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  ChartColumn,
  Mail,
  Repeat,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MetaTags } from "@/components/seo/MetaTags";
import { supabase } from "@/integrations/supabase/client";

interface Answers {
  businessType: string;
  teamSize: string;
  videoUsage: string;
  repetitionArea: string;
  goal: string;
}

interface Contact {
  name: string;
  email: string;
  company: string;
}

interface Recommendation {
  title: string;
  description: string;
}

interface Result {
  total: number;
  level: "Starter" | "Builder" | "Ready to Scale";
  levelDescription: string;
  breakdown: {
    clarity: "Strong" | "Moderate" | "Needs Work";
    consistency: "Strong" | "Moderate" | "Needs Work";
    scalability: "Strong" | "Moderate" | "Needs Work";
  };
  recommendations: Recommendation[];
}

function calculate(a: Answers): Result {
  let clarityRaw = 0;
  let consistencyRaw = 0;
  let scaleRaw = 0;

  switch (a.videoUsage) {
    case "none":
      consistencyRaw += 0;
      clarityRaw += 5;
      break;
    case "occasionally":
      consistencyRaw += 15;
      clarityRaw += 15;
      break;
    case "regularly":
      consistencyRaw += 25;
      clarityRaw += 20;
      break;
    case "structured":
      consistencyRaw += 40;
      clarityRaw += 30;
      break;
  }
  switch (a.teamSize) {
    case "just-me":
      scaleRaw += 10;
      break;
    case "2-5":
      scaleRaw += 15;
      break;
    case "6-25":
      scaleRaw += 25;
      break;
    case "26-100":
      scaleRaw += 30;
      break;
    case "100+":
      scaleRaw += 35;
      break;
  }
  if (a.goal && a.goal !== "all") clarityRaw += 15;
  else if (a.goal === "all") {
    clarityRaw += 8;
    scaleRaw += 5;
  }
  if (a.repetitionArea && a.repetitionArea !== "all") clarityRaw += 10;
  else if (a.repetitionArea === "all") {
    clarityRaw += 5;
    scaleRaw += 5;
  }
  if (a.businessType) clarityRaw += 5;

  const clarity = Math.min(Math.round((clarityRaw / 60) * 33), 33);
  const consistency = Math.min(Math.round((consistencyRaw / 40) * 33), 33);
  const scalability = Math.min(Math.round((scaleRaw / 45) * 34), 34);
  const total = clarity + consistency + scalability;

  const rank = (v: number, max: number) => {
    const r = v / max;
    if (r >= 0.7) return "Strong" as const;
    if (r >= 0.4) return "Moderate" as const;
    return "Needs Work" as const;
  };

  const breakdown = {
    clarity: rank(clarity, 33),
    consistency: rank(consistency, 33),
    scalability: rank(scalability, 34),
  };

  let level: Result["level"];
  let levelDescription: string;
  if (total <= 39) {
    level = "Starter";
    levelDescription =
      "You're relying mostly on live explanations and manual communication. A structured video system would save you hours every week and make your expertise available 24/7.";
  } else if (total <= 69) {
    level = "Builder";
    levelDescription =
      "You're already using some video, but your business still relies too heavily on repeated live explanations. With the right system, video can help you save time, improve consistency, and scale trust.";
  } else {
    level = "Ready to Scale";
    levelDescription =
      "Your business is ready for a strategic video library that saves time and compounds authority. The infrastructure is there — now it's about building a system that works while you don't.";
  }

  return {
    total,
    level,
    levelDescription,
    breakdown,
    recommendations: recommend(a.repetitionArea, a.goal),
  };
}

function recommend(area: string, goal: string): Recommendation[] {
  const map: Record<string, Recommendation[]> = {
    sales: [
      { title: "Service Explainer Video", description: "A cinematic walkthrough of your offer that replaces the 20-minute sales pitch." },
      { title: "FAQ & Objection-Handling Set", description: "Short videos addressing your top 5 prospect objections before they ever get on a call." },
      { title: "Website Introduction Video", description: "A 60-second authority piece that builds trust the moment someone lands on your site." },
    ],
    onboarding: [
      { title: "Client Onboarding Walkthrough", description: "A step-by-step video guiding new clients through your process from day one." },
      { title: "SOP & Team Training Videos", description: "Documented processes that new hires can watch instead of shadowing for weeks." },
      { title: "Welcome & Expectation Sequence", description: "A short series that sets expectations and reduces early-stage client churn." },
    ],
    training: [
      { title: "Standard Operating Procedure Library", description: "Video-based SOPs that ensure every team member follows the same process." },
      { title: "Role-Specific Training Modules", description: "Targeted training content organized by role so people learn exactly what they need." },
      { title: "Knowledge Base Video Hub", description: "A searchable internal library that preserves institutional knowledge permanently." },
    ],
    support: [
      { title: "Customer Self-Service Videos", description: "Answer your top support questions with clear, searchable video responses." },
      { title: "Troubleshooting Walkthrough Series", description: "Step-by-step guides for common issues that reduce support ticket volume." },
      { title: "Product Update Announcements", description: "Short videos that communicate changes clearly and reduce confusion." },
    ],
    authority: [
      { title: "Founder Authority Video", description: "A cinematic piece positioning you as the go-to expert in your space." },
      { title: "Short Educational Clips", description: "Bite-sized insight videos optimized for social that build thought leadership." },
      { title: "Long-Form Evergreen Content", description: "SEO-optimized deep dives that attract organic traffic for months or years." },
    ],
  };
  if (area === "all") {
    if (goal === "sell") return map.sales;
    if (goal === "onboard") return map.onboarding;
    if (goal === "train") return map.training;
    if (goal === "authority") return map.authority;
    return map.sales;
  }
  return map[area] || map.sales;
}

function breakdownCopy(key: string, level: string): string {
  const m: Record<string, Record<string, string>> = {
    clarity: {
      Strong: "You have a clear sense of what your business needs to explain.",
      Moderate: "You know what needs to be communicated, but not all of it is documented yet.",
      "Needs Work": "Your core message isn't clearly defined — most of it still lives in your head.",
    },
    consistency: {
      Strong: "You're producing video regularly with a repeatable process.",
      Moderate: "You use video sometimes, but it's not part of a repeatable or organized system.",
      "Needs Work": "Video production is sporadic or nonexistent — there's no system in place yet.",
    },
    scalability: {
      Strong: "Your content infrastructure is built to grow with your business.",
      Moderate: "You have some structure, but scaling would require significant manual effort.",
      "Needs Work": "Too much of your communication still depends on you being present.",
    },
  };
  return m[key]?.[level] || "";
}

function whyFits(a: Answers, level: string): string {
  const team =
    a.teamSize === "just-me" ? "you're a solo operator"
      : a.teamSize === "2-5" ? "your team is small"
      : a.teamSize === "6-25" ? "your team is mid-sized"
      : a.teamSize === "26-100" ? "your team is growing fast"
      : "your organization is scaling";
  const area =
    a.repetitionArea === "sales" ? "sales conversations"
      : a.repetitionArea === "onboarding" ? "client onboarding"
      : a.repetitionArea === "training" ? "team training"
      : a.repetitionArea === "support" ? "customer support"
      : "multiple areas of your business";
  const usage =
    a.videoUsage === "none" ? "you're not yet using video"
      : a.videoUsage === "occasionally" ? "you're using video occasionally but not strategically"
      : a.videoUsage === "regularly" ? "you're using video but without a structured system"
      : "you already have a video system in place";

  if (level === "Starter") {
    return `Because ${team}, your business repeats itself most in ${area}, and ${usage}, the highest-impact move is to start with 2–3 core videos that replace your most time-consuming explanations. This isn't about launching a content strategy — it's about building your first real communication asset.`;
  }
  if (level === "Ready to Scale") {
    return `Because ${team}, your business repeats itself most in ${area}, and ${usage}, the opportunity isn't starting from scratch — it's systematizing what you already have. A structured video library will turn your scattered assets into a scalable engine that compounds authority and saves hours every week.`;
  }
  return `Because ${team}, your business repeats itself most in ${area}, and ${usage}, your best next move is to build a small, high-impact video library that handles your most repeated conversations first. This creates immediate time savings and sets the foundation for a scalable system.`;
}

function bottleneckCost(area: string): string[] {
  const m: Record<string, string[]> = {
    sales: [
      "Repeating the same sales pitch drains time from every qualified conversation.",
      "Prospects arrive confused, which lengthens your sales cycle unnecessarily.",
      "Your expertise doesn't scale — it disappears the moment you leave the room.",
    ],
    onboarding: [
      "Every new client goes through the same manual setup you could automate.",
      "Inconsistent onboarding weakens trust before the relationship even starts.",
      "Your team spends hours on repetitive walkthroughs instead of higher-value work.",
    ],
    training: [
      "New hires take longer to ramp up because knowledge lives in people's heads.",
      "Inconsistent training creates inconsistent performance across teams.",
      "Institutional knowledge walks out the door every time someone leaves.",
    ],
    support: [
      "Your team answers the same questions over and over, burning hours every week.",
      "Customers wait for responses to problems that could be solved with a video.",
      "Support costs grow linearly with your customer base instead of leveling off.",
    ],
    all: [
      "Repeating the same explanations drains time every week across your business.",
      "Inconsistent communication weakens trust in sales, onboarding, and support.",
      "Your expertise stops scaling the moment you step away.",
    ],
  };
  return m[area] || m.all;
}

const slide = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const businessOptions = [
  { value: "services", label: "Services" },
  { value: "products", label: "Products" },
  { value: "both", label: "Both" },
  { value: "other", label: "Other" },
];
const teamOptions = [
  { value: "just-me", label: "Just me" },
  { value: "2-5", label: "2–5 people" },
  { value: "6-25", label: "6–25 people" },
  { value: "26-100", label: "26–100 people" },
  { value: "100+", label: "100+" },
];
const videoUsageOptions = [
  { value: "none", label: "We don't use video yet" },
  { value: "occasionally", label: "We post occasionally" },
  { value: "regularly", label: "We use video regularly, but it's inconsistent" },
  { value: "structured", label: "We already have a structured system" },
];
const repetitionOptions = [
  { value: "sales", label: "Sales conversations" },
  { value: "onboarding", label: "Client onboarding" },
  { value: "training", label: "Team training" },
  { value: "support", label: "Customer support" },
  { value: "all", label: "All of the above" },
];
const goalOptions = [
  { value: "sell", label: "Help us sell more clearly" },
  { value: "onboard", label: "Help us onboard faster" },
  { value: "train", label: "Help us train more efficiently" },
  { value: "authority", label: "Help us build authority" },
  { value: "all", label: "Help with all of the above" },
];

interface RadioListProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  idPrefix: string;
}
const RadioList = ({ value, onChange, options, idPrefix }: RadioListProps) => (
  <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
    {options.map((o) => (
      <label
        key={o.value}
        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
          value === o.value
            ? "border-primary bg-primary/5"
            : "hover:border-primary/50"
        }`}
      >
        <RadioGroupItem value={o.value} id={`${idPrefix}-${o.value}`} />
        <span className="font-medium">{o.label}</span>
      </label>
    ))}
  </RadioGroup>
);

const VideoSystemAssessment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number | "results">(1);
  const [answers, setAnswers] = useState<Answers>({
    businessType: "",
    teamSize: "",
    videoUsage: "",
    repetitionArea: "",
    goal: "",
  });
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const totalSteps = 4;
  const numericStep = typeof step === "number" ? step : totalSteps;
  const progress = (numericStep / totalSteps) * 100;

  const canProceed = (s: number | "results") => {
    switch (s) {
      case 1:
        return !!answers.businessType && !!answers.teamSize;
      case 2:
        return !!answers.videoUsage && !!answers.repetitionArea;
      case 3:
        return !!answers.goal;
      case 4:
        return !!contact.email && !!contact.name;
      default:
        return false;
    }
  };

  const submit = async () => {
    if (!contact.email || !contact.name) {
      toast.error("Please enter your name and email.");
      return;
    }
    setLoading(true);
    const r = calculate(answers);
    setResult(r);
    try {
      await supabase.from("video_system_assessments" as never).insert({
        email: contact.email.trim(),
        name: contact.name.trim(),
        company: contact.company.trim() || null,
        answers,
        score: r.total,
        level: r.level,
        recommendations: r.recommendations,
        source: "website",
      } as never);
    } catch (err) {
      console.error("Failed to save assessment:", err);
    }
    setStep("results");
    setLoading(false);
  };

  const next = () => {
    if (step === 3) setStep(4);
    else if (step === 4) submit();
    else if (typeof step === "number" && step < 4) setStep(step + 1);
  };
  const back = () => {
    if (typeof step === "number" && step > 1) setStep(step - 1);
  };

  const emailPlan = () => {
    toast.success(
      "Your recommended video plan will be sent to your inbox shortly."
    );
  };

  const badgeColor = (level: string) =>
    level === "Strong"
      ? "border-green-500/30 text-green-600"
      : level === "Moderate"
      ? "border-amber-500/30 text-amber-600"
      : "border-red-500/30 text-red-600";

  return (
    <>
      <MetaTags
        title="Video System Assessment | Palmer House Productions"
        description="Discover how ready your business is for a strategic video system. Get a personalized readiness score and tailored recommendations in 2 minutes."
      />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="outline">
              <ChartColumn className="w-3 h-3 mr-1" />
              Free Assessment
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              How Ready Is Your Business for a Video System?
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Answer a few quick questions and get a personalized readiness
              score, a strategic breakdown, and tailored recommendations — all
              in under 2 minutes.
            </p>
          </div>

          {step !== "results" && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>
                  Step {numericStep} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Business Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        What best describes your business?
                      </Label>
                      <RadioList
                        value={answers.businessType}
                        onChange={(v) =>
                          setAnswers((p) => ({ ...p, businessType: v }))
                        }
                        options={businessOptions}
                        idPrefix="bt"
                      />
                    </div>
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        How large is your team?
                      </Label>
                      <RadioList
                        value={answers.teamSize}
                        onChange={(v) =>
                          setAnswers((p) => ({ ...p, teamSize: v }))
                        }
                        options={teamOptions}
                        idPrefix="ts"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-primary" />
                      Current Video Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        How are you currently using video in your business?
                      </Label>
                      <RadioList
                        value={answers.videoUsage}
                        onChange={(v) =>
                          setAnswers((p) => ({ ...p, videoUsage: v }))
                        }
                        options={videoUsageOptions}
                        idPrefix="vu"
                      />
                    </div>
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        Where do you repeat yourself the most?
                      </Label>
                      <RadioList
                        value={answers.repetitionArea}
                        onChange={(v) =>
                          setAnswers((p) => ({ ...p, repetitionArea: v }))
                        }
                        options={repetitionOptions}
                        idPrefix="ra"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Your Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label className="text-base font-semibold mb-3 block">
                      What would you most want video to solve first?
                    </Label>
                    <RadioList
                      value={answers.goal}
                      onChange={(v) =>
                        setAnswers((p) => ({ ...p, goal: v }))
                      }
                      options={goalOptions}
                      idPrefix="gl"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      Unlock Your Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Enter your email to unlock your score, your readiness
                      level, and your recommended next steps.
                    </p>
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={contact.name}
                        onChange={(e) =>
                          setContact((p) => ({ ...p, name: e.target.value }))
                        }
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={contact.email}
                        onChange={(e) =>
                          setContact((p) => ({ ...p, email: e.target.value }))
                        }
                        maxLength={255}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company (optional)</Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        value={contact.company}
                        onChange={(e) =>
                          setContact((p) => ({
                            ...p,
                            company: e.target.value,
                          }))
                        }
                        maxLength={100}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === "results" && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <Card className="text-center border-primary/20">
                  <CardContent className="pt-8 pb-8">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                      Your Video System Readiness
                    </p>
                    <div className="text-6xl font-bold text-primary mb-1">
                      {result.total}
                      <span className="text-2xl text-muted-foreground">
                        {" "}
                        / 100
                      </span>
                    </div>
                    <Badge
                      className="text-base px-4 py-1 mt-2"
                      variant={
                        result.level === "Ready to Scale"
                          ? "default"
                          : result.level === "Builder"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {result.level}
                    </Badge>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
                      {result.levelDescription}
                    </p>
                  </CardContent>
                </Card>

                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Your Score Breakdown
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(
                      [
                        { key: "clarity", label: "Clarity", icon: Target },
                        {
                          key: "consistency",
                          label: "Consistency",
                          icon: Repeat,
                        },
                        {
                          key: "scalability",
                          label: "Scalability",
                          icon: Users,
                        },
                      ] as const
                    ).map((item, i) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <Card className="h-full">
                          <CardContent className="pt-5 pb-5">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <item.icon className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold">
                                  {item.label}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={badgeColor(
                                  result.breakdown[item.key]
                                )}
                              >
                                {result.breakdown[item.key]}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {breakdownCopy(
                                item.key,
                                result.breakdown[item.key]
                              )}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Your Recommended Video Plan
                  </h2>
                  <div className="space-y-3">
                    {result.recommendations.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <Card className="hover:border-primary/30 transition-colors">
                          <CardContent className="py-5 flex gap-4 items-start">
                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                              {i + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{r.title}</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {r.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Card className="bg-muted/30 border-muted">
                  <CardContent className="py-6">
                    <h3 className="font-semibold mb-2">
                      Why this plan fits your business
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {whyFits(answers, result.level)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-destructive/20">
                  <CardContent className="py-6">
                    <h3 className="font-semibold mb-3">
                      What this bottleneck is costing you
                    </h3>
                    <ul className="space-y-2">
                      {bottleneckCost(answers.repetitionArea).map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-destructive mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center">
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => navigate("/contact")}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book a Clarity Call
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Talk through your results and get a custom roadmap.
                    </p>
                  </div>
                  <div className="text-center">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      onClick={emailPlan}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Me My Plan
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Send these recommendations to your inbox.
                    </p>
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground italic">
                  This is a starting point — not a one-size-fits-all
                  prescription. Your clarity call helps turn this into a plan
                  built around your actual business.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {step !== "results" && (
            <div className="flex justify-between mt-6">
              {typeof step === "number" && step > 1 ? (
                <Button variant="ghost" onClick={back}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button
                onClick={next}
                disabled={!canProceed(step) || loading}
              >
                {loading
                  ? "Calculating..."
                  : step === 4
                  ? "See My Results"
                  : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoSystemAssessment;
