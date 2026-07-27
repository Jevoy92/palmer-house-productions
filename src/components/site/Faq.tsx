const faqs = [
  {
    q: "What is Holo?",
    a: "Holo is your all-in-one AI marketing tool. It creates ads, social posts, and emails that sound and look like they came from your team. No templates. No generic fluff. Just brand-perfect campaigns, ready to launch.",
  },
  {
    q: "How is this AI tool for advertising different from others?",
    a: "Brand DNA is built in, it's trained on 10M+ creative assets and 19,000+ top-performing ads, and it's global-ready with 95+ languages supported.",
  },
  {
    q: "Do I need marketing or technical knowledge to use Holo?",
    a: "No. Holo was built for founders, creators, and marketers who want speed and results — not a learning curve.",
  },
  {
    q: "What kind of content can Holo generate?",
    a: "Ad creatives (static and video), social media posts, email sequences, and promotional campaigns — always aligned with your voice.",
  },
  {
    q: "Can I manage multiple brands in one account?",
    a: "Yes. Run up to 5 brands under a single Holo account, each with its own Brand DNA, workspace, and templates.",
  },
  {
    q: "Is Holo better than ChatGPT?",
    a: "General AI tools are powerful, but Holo is built for one thing: marketing. No prompt engineering, no guesswork — campaigns created, branded, and ready to launch in minutes.",
  },
  {
    q: "Do you have a free trial?",
    a: "No. Holo doesn't offer a free trial, but you're fully covered with our 14-day money-back guarantee.",
  },
  {
    q: "Does it work if I don't have a website?",
    a: "Yes. You can use any valid URL during onboarding and update your brand information later in the process.",
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
