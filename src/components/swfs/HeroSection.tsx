import { Film, DollarSign, Shield } from "lucide-react";

const stats = [
  { icon: Film, label: "Core Asset", desc: "Hero film built for reuse, licensing, and authority" },
  { icon: DollarSign, label: "Monetization", desc: "Designed for brand deals, platform revenue, and media leverage" },
  { icon: Shield, label: "Control", desc: "No tacky flex. No chaos. Just controlled public presence" },
];

export default function HeroSection() {
  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8" id="hero">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">Palmer House Productions</p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Most new millionaires look like they won the lottery.
        </h1>
        <p className="font-serif text-2xl sm:text-3xl text-accent italic mb-8">
          We make them look like they earned it.
        </p>
        <p className="max-w-3xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
          A private cinematic media system for sudden-wealth clients who need control over how they are seen, remembered, distributed, and monetized. We build flagship assets that do more than impress people once. They create long-tail visibility, licensing potential, partnership leverage, and residual income across platforms.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Book a Private Call
          </a>
          <a href="#system" className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors">
            View the System
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-6 text-left">
              <s.icon className="w-8 h-8 text-accent mb-3" />
              <h2 className="text-lg font-semibold mb-1">{s.label}</h2>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
