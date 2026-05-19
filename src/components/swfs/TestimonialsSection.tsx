import { Quote } from "lucide-react";

const testimonials = [
  { text: "Jevoy and his team did an amazing job with pictures & videos for our wedding! He was very professional and easy to work with. The turnaround time was also fantastic — we received our photos and videos much sooner than expected. I would definitely recommend Palmer House Productions to anyone looking for high-quality video and photography services!", author: "Isabella Johnstun" },
  { text: "Jevoy and the Palmer House Team were fantastic! They delivered exactly what we were looking for and more. The quality of work was exceptional and the communication throughout the process was excellent. Highly recommend!", author: "Athan Seyler" },
  { text: "Awesome experience from start to finish working with Jevoy and the Palmer House team. They understood our vision perfectly and delivered outstanding results. Professional, creative, and reliable!", author: "Sarah Dylan Jensen" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        {/* Founder Quote */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Quote className="w-10 h-10 text-accent mx-auto mb-6 opacity-60" />
          <blockquote className="font-serif text-2xl sm:text-3xl italic leading-relaxed mb-6 text-foreground">
            "I grew up knowing that stories could change lives — but only if told with truth, courage, and soul."
          </blockquote>
          <p className="text-accent font-semibold">Jevoy Palmer</p>
          <p className="text-sm text-muted-foreground">Filmmaker & Strategist — Founder, Palmer House Productions</p>
        </div>

        {/* Client testimonials */}
        <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-8 text-center">The Standard</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.text}"</p>
              <p className="text-sm font-semibold text-foreground">— {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
