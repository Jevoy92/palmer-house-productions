import { Video, Users, Handshake, TrendingUp, Compass, Share2 } from "lucide-react";

const services = [
  { icon: Video, title: "Ongoing Content Production", desc: "Monthly deliverables across every format — vertical, horizontal, long-form, short-form. Your channels never go quiet." },
  { icon: Users, title: "Full Account Management", desc: "We run your YouTube, TikTok, Instagram, and beyond — posting, optimizing, growing audience and engagement." },
  { icon: Handshake, title: "Sponsorship & Brand Deals", desc: "We pitch you to brands aligned with your identity. You approve every deal. We handle the outreach and negotiation." },
  { icon: TrendingUp, title: "Revenue Activation", desc: "YouTube Partner Program, TikTok Creator Fund, Facebook Reels bonuses, Rumble revenue share — every eligible channel gets its monetization unlocked from day one." },
  { icon: Compass, title: "Narrative Strategy", desc: "Quarterly sessions to evolve your story as your life evolves. Content that reflects who you are now, not just who you were when the money arrived." },
  { icon: Share2, title: "Distribution Coordination", desc: "Active management of licensing submissions, platform outreach, and aggregator relationships on your behalf — continuously expanding where your content earns." },
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">Managing your new public life</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
          You're not just wealthy now. You're a public figure.
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mb-12">
          Whether you want it or not, sudden wealth makes you visible. The question is whether you look like someone who built a life — or someone who got lucky and doesn't know what to do with it. We handle the full media side of that transition.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="flex gap-4 p-5 bg-card border border-border rounded-xl">
              <s.icon className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
