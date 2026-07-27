const testimonials = [
  {
    name: "Isabella Johnstun",
    loc: "Client",
    text: "Jevoy and his team did an amazing job with pictures & videos for our wedding! He was very professional and easy to work with. The turnaround time was also fantastic — we received our photos and videos much sooner than expected. I would definitely recommend Palmer House Productions to anyone looking for high-quality video and photography services!",
  },
  {
    name: "Athan Seyler",
    loc: "Client",
    text: "Jevoy and the Palmer House Team were fantastic! They delivered exactly what we were looking for and more. The quality of work was exceptional and the communication throughout the process was excellent. Highly recommend!",
  },
  {
    name: "Sarah Dylan Jensen",
    loc: "Client",
    text: "Awesome experience from start to finish working with Jevoy and the Palmer House team. They understood our vision perfectly and delivered outstanding results. Professional, creative, and reliable!",
  },
  {
    name: "Marcus Hale",
    loc: "Operations Lead",
    text: "Our onboarding used to take weeks. The training videos they produced cut that down dramatically and new hires actually watch them.",
  },
  {
    name: "Nina Collins",
    loc: "Marketing Director",
    text: "One shoot day gave us three months of social content. That alone paid for the project.",
  },
  {
    name: "Leo Zhang",
    loc: "Founder",
    text: "They asked about our business problems before they asked about the camera package. That's the difference.",
  },
  {
    name: "Priya Raman",
    loc: "Healthcare Communications",
    text: "Clear, compliant, and genuinely warm patient education videos. Our team gets compliments on them constantly.",
  },
  {
    name: "David Whitfield",
    loc: "Manufacturing",
    text: "Complex processes explained simply. Our sales team now leads with the video instead of the spec sheet.",
  },
  {
    name: "Grace Okafor",
    loc: "Small Business Owner",
    text: "Professional from the first call to final delivery. Our reach jumped noticeably within a month.",
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-gradient-brand text-sm font-semibold uppercase tracking-widest">
          ⭐ Client Success
        </p>
        <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)]">Trusted by Growing Businesses</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join hundreds of businesses that have transformed their video strategy with Palmer House
          Productions.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="surface-card mb-5 break-inside-avoid p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-secondary text-sm font-semibold">
                {t.name.charAt(0)}
              </span>
              <figcaption>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.loc}</p>
              </figcaption>
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.text}
            </blockquote>
            <p className="mt-4 text-sm">★★★★★</p>
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <strong className="text-foreground">Hundreds</strong> of Pacific Northwest businesses served
      </p>
    </section>
  );
}
