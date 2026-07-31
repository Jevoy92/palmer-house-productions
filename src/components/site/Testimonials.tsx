const testimonials = [
  {
    name: "Isabella Johnstun",
    loc: "Dick's Restaurant Supply",
    text: "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced. They took the time to understand our goals and delivered exceptional results.",
  },
  {
    name: "Athan Seyler",
    loc: "Local Guide",
    text: "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for photos is one stressor, but jumping in front of the camera to make a video is even more stressful. Jevoy has a gift of helping his clients become grounded and comfortable.",
  },
  {
    name: "Sarah Dylan Jensen",
    loc: "Local Guide",
    text: "Awesome experience from start to finish working with Jevoy. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos.",
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
          Real words from people who trusted Palmer House with the work.
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

      <a
        href="/resources/reviews"
        className="mx-auto mt-8 block w-fit rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
      >
        Read more client reviews →
      </a>
    </section>
  );
}
