import { Film, Scissors, Smartphone, Mic, Globe, Lock } from "lucide-react";

const deliverables = [
  { icon: Film, title: "Premium Hero Film", desc: "Your flagship cinematic asset. Built to anchor your public identity, support licensing conversations, strengthen brand perception, and generate reusable value across multiple channels." },
  { icon: Scissors, title: "Announcement & Authority Cuts", desc: "Clean, controlled edits for family offices, philanthropic introductions, press opportunities, advisor relationships, and public-facing reputation management." },
  { icon: Smartphone, title: "Short-Form Revenue Assets", desc: "Vertical clips, reels, talking-head excerpts, lifestyle moments, and creator-ready edits designed for attention, monetization, sponsorship positioning, and platform growth." },
  { icon: Mic, title: "Private Story Capture Session", desc: "A guided interview process that captures your transition, values, worldview, gratitude, and future vision so your wealth is framed with intention instead of randomness." },
  { icon: Globe, title: "Distribution & Licensing Prep", desc: "Professional packaging for streaming, licensing, festival strategy, and aggregator-ready delivery. We prepare the asset stack so your content can travel further than one post and one week." },
  { icon: Lock, title: "Secure Media Vault", desc: "Organized, private, export-ready ownership of your masters, captions, cutdowns, platform variants, and archive footage so the asset keeps producing long after the shoot is over." },
];

export default function DeliverablesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30" id="system">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">What you get</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
          A cinematic identity system built to keep producing value.
        </h2>
        <p className="text-muted-foreground text-lg mb-12">
          Every deliverable is designed to work harder than a single post, a single announcement, or a single season of attention.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliverables.map((d) => (
            <div key={d.title} className="bg-card border border-border rounded-xl p-6">
              <d.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
