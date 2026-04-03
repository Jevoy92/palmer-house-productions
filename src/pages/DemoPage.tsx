import { useState } from "react";
import DemoHeader from "../components/demo/DemoHeader";
import WhatToPostTool from "../components/demo/WhatToPostTool";
import ContentEngineTool from "../components/demo/ContentEngineTool";

export default function DemoPage() {
  const [activeTool, setActiveTool] = useState<"what-to-post" | "content-engine">("what-to-post");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DemoHeader />
      <main className="pt-20 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-12 mt-8">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Live Demo — Palmer House Productions
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 font-serif">
            Dick's Content Engine
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            A system that turns your daily work into consistent, high-performing content — without your team needing to think about it.
          </p>
        </section>

        {/* Tool Tabs */}
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          <button
            onClick={() => setActiveTool("what-to-post")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTool === "what-to-post"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            🎯 What to Post Right Now
          </button>
          <button
            onClick={() => setActiveTool("content-engine")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTool === "content-engine"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            ⚙️ Content Engine Pipeline
          </button>
        </div>

        {/* Active Tool */}
        {activeTool === "what-to-post" ? <WhatToPostTool /> : <ContentEngineTool />}

        {/* Value Prop */}
        <section className="mt-20 grid sm:grid-cols-3 gap-6">
          {[
            { icon: "🧠", title: "No More Guessing", desc: "AI analyzes timing, season, and industry trends to tell you exactly what to post." },
            { icon: "📦", title: "One Input → Five Outputs", desc: "Type one sentence about your day. Get a blog, YouTube script, reel, social post, and filming plan." },
            { icon: "📈", title: "Become the Authority", desc: "Consistent, strategic content turns Dick's into THE name in restaurant equipment." },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Pricing CTA */}
        <section className="mt-16 text-center bg-card border border-border rounded-2xl p-8 sm:p-12">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold mb-2">Subscription</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-serif">$200/month</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Unlimited access to both tools. Your team never wonders what to post again. Content that actually brings in customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@palmerhouseproductions.com?subject=Dick's Content Engine — Let's Talk"
              className="inline-block px-8 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition"
            >
              Let's Talk
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
