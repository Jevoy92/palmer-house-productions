import { Trophy, Dumbbell, Rocket, Landmark, Scale, Eye } from "lucide-react";

const audiences = [
  { icon: Trophy, label: "Lottery winners" },
  { icon: Dumbbell, label: "Athletes with first major contracts" },
  { icon: Rocket, label: "Exited founders" },
  { icon: Landmark, label: "Inheritance recipients" },
  { icon: Scale, label: "Lawsuit recipients" },
  { icon: Eye, label: "Newly public high-net-worth individuals" },
];

export default function AudienceSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30" id="audience">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">Who this is for</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
          When money arrives faster than media discipline.
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mb-12">
          This system is built for lottery winners, athletes with first major contracts, exited founders, inheritance recipients, lawsuit recipients, and anyone whose visibility suddenly outpaced their infrastructure.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {audiences.map((a) => (
            <div key={a.label} className="bg-card border border-border rounded-xl p-5 flex items-start gap-3">
              <a.icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
