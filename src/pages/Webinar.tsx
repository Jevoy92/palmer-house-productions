import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, Sparkles, Zap, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";

const HONEYBOOK_URL =
  "https://palmerhouseproductions.hbportal.co/public/69a8a16a3a3449003cdfae97";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const solutions = [
  {
    icon: Target,
    title: "The Clarity Framework",
    description:
      "Pinpoint the exact videos that will save you the most time, generate the most qualified leads, and establish you as the go-to authority in your space without guessing.",
    color: "text-pal-system",
    bg: "bg-pal-system-soft",
    blob: "bg-pal-system-soft",
  },
  {
    icon: Sparkles,
    title: "The Cinematic Edge",
    description:
      "Why production quality is non-negotiable for building trust, and how you can achieve a cinematic look that makes your brand feel premium—without a Hollywood budget.",
    color: "text-pal-spotlight",
    bg: "bg-pal-spotlight-soft",
    blob: "bg-pal-spotlight-soft",
  },
  {
    icon: Zap,
    title: "The Automation Engine",
    description:
      "The simple process for using your video system to warm up leads, onboard clients, and answer prospect questions automatically—freeing you up for high-level strategy.",
    color: "text-pal-reel",
    bg: "bg-pal-reel-soft",
    blob: "bg-pal-reel-soft",
  },
  {
    icon: Repeat,
    title: "The Repurposing Goldmine",
    description:
      "How to turn one flagship video asset into a year's worth of social media content, ads, and email campaigns. Create once, distribute forever.",
    color: "text-pal-evergreen",
    bg: "bg-pal-evergreen-soft",
    blob: "bg-pal-evergreen-soft",
  },
];

const painPoints = [
  "Endless Zoom calls where you deliver the same sales pitch.",
  "Onboarding new clients by explaining the same process over and over.",
  "Answering the same questions from prospects in your DMs and email.",
];

const scrollToForm = () => {
  document
    .getElementById("webinar-form")
    ?.scrollIntoView({ behavior: "smooth" });
};

const Webinar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (
        typeof e.data === "string" &&
        (e.data.includes("thank") ||
          e.data.includes("success") ||
          e.data.includes("complete"))
      ) {
        navigate("/thank-you?type=webinar");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <MetaTags
        title="Free Training: The 5-Part Video System | Palmer House Productions"
        description="Learn the exact framework to stop repeating yourself and start building scalable authority. Free 30-minute training from Palmer House Productions."
        keywords="video system, business video automation, authority building, video marketing framework, Palmer House Productions webinar"
        ogTitle="The 5-Part Video System to Automate Your Business & Build Authority"
        ogDescription="Free training: Learn to turn your expertise into a cinematic asset that works for you 24/7."
        canonicalUrl="https://www.palmerhouseproductions.com/webinar"
      />

      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[420px] h-[420px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.p
            className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            As Seen On A Major Streaming Platform in 2025
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The 5-Part Video System to Automate Your Business &amp; Build
            Authority
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            In this free, 30-minute training, Jevoy Palmer unpacks the exact
            framework our team uses to help founders stop repeating themselves
            and start building scalable influence. Learn how to turn your
            expertise into a cinematic asset that works for you 24/7.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Button size="xl" onClick={scrollToForm} className="gap-2">
              Save My Seat <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-foreground tracking-tight mb-4"
            >
              Are You Trapped in the Repetition Cycle?
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-muted-foreground text-lg mb-8"
            >
              If you're a founder, expert, or service provider, your day is
              likely filled with repetition.
            </motion.p>
            <ul className="space-y-4">
              {painPoints.map((point, i) => (
                <motion.li
                  key={i}
                  custom={i + 2}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-foreground"
                >
                  <Repeat className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base sm:text-lg">{point}</span>
                </motion.li>
              ))}
            </ul>
            <motion.p
              custom={5}
              variants={fadeUp}
              className="text-muted-foreground mt-8 text-base sm:text-lg leading-relaxed"
            >
              Your most valuable asset—your knowledge—is trapped. It only works
              when you're personally delivering it, which puts a hard ceiling
              on your time, your income, and your impact.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-foreground tracking-tight mb-3 text-center"
            >
              Stop Making Content. Start Building Infrastructure.
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-muted-foreground text-lg mb-12 text-center max-w-2xl mx-auto"
            >
              Most businesses treat video as disposable content. High-level
              entrepreneurs treat it as permanent infrastructure. Here's what
              you'll learn:
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {solutions.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative bg-muted/30 rounded-2xl border border-border/60 p-7 sm:p-8 flex flex-col justify-between overflow-hidden hover:border-border hover:shadow-lg transition-shadow duration-300"
                >
                  <motion.div
                    className={`absolute -top-2 -right-2 w-24 h-24 pointer-events-none ${s.bg} origin-top-right`}
                    animate={{
                      borderRadius: [
                        "0 16px 0 40px",
                        "0 16px 6px 52px",
                        "0 16px 12px 44px",
                        "0 16px 0 40px",
                      ],
                      scale: [1, 1.03, 0.98, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div
                    className={`absolute -top-8 -right-8 w-32 h-32 ${s.blob} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-5`}
                      whileHover={{ scale: 1.1, rotate: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Host */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-display font-black text-foreground tracking-tight mb-6"
            >
              About Your Host, Jevoy Palmer
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6"
            >
              Jevoy Palmer is a filmmaker, entrepreneur, and creative strategist
              based in Seattle, Washington. Originally from Kingston, Jamaica,
              his journey is one of profound transformation—from overcoming
              addiction to building multiple ventures. As the founder of Palmer
              House Productions, Jevoy and our team help businesses convert
              their expertise into powerful video systems that automate
              communication and build authority. By blending cinematic
              storytelling with systems thinking, we empower founders to scale
              their impact and build a business that aligns with their life.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section id="webinar-form" className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-foreground tracking-tight mb-4"
            >
              Save My Seat
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-muted-foreground text-lg mb-8"
            >
              Register below for the free 30-minute training and start building
              your authority engine.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <iframe
                  src={HONEYBOOK_URL}
                  title="Register for The 5-Part Video System"
                  className="w-full border-0"
                  style={{ minHeight: "600px" }}
                  allow="payment"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closer */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-display font-black text-foreground mb-4">
              Ready to Automate Your Authority?
            </h2>
            <p className="text-muted-foreground mb-6">
              Stop repeating yourself. Start building a video system that
              scales.
            </p>
            <Button size="lg" onClick={scrollToForm} className="gap-2">
              Yes, I Want In <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Webinar;
