const faqs = [
  {
    q: "What is Palmer House Productions?",
    a: "We're a Pacific Northwest video production company that builds video systems, not just videos. We start with the business problem — slow onboarding, a message that isn't landing, low visibility — and design content that fixes it.",
  },
  {
    q: "How is your process different from hiring a videographer?",
    a: "A videographer shows up and shoots. We start with strategy, then capture multiple formats in one production day, then help you launch and optimize. You end up with a library, not a single file.",
  },
  {
    q: "What do I actually receive from one shoot day?",
    a: "From a single raw master we deliver a YouTube longform cut, roughly three Reels or TikToks, a LinkedIn teaser, and email newsletter assets — plus anything else your plan calls for.",
  },
  {
    q: "What types of video do you produce?",
    a: "Product demos, team stories, training videos, testimonials, brand stories, social content, event coverage, explainers, how-to guides, culture pieces, and behind-the-scenes.",
  },
  {
    q: "Which areas do you serve?",
    a: "We're based in the Pacific Northwest and work across Washington and Oregon — Seattle, Bellevue, Tacoma, Portland, and the greater Puget Sound region. Travel is available on request.",
  },
  {
    q: "Who do you typically work with?",
    a: "Small businesses, startups, healthcare systems, manufacturers, and government agencies — plus select events and weddings.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects run a few weeks from discovery call to final delivery, depending on scope. Clients regularly tell us the turnaround was faster than expected.",
  },
  {
    q: "How do we get started?",
    a: "Book a discovery call. We'll talk through your goals, what's getting in the way, and whether a video system is the right fix — no pressure either way.",
  },
];

export function Faq() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-[clamp(1.9rem,4.5vw,3rem)]">FAQ</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="surface-card group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                {f.q}
                <span className="text-gradient-brand text-2xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
