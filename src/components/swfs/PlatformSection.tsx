const channels = [
  { category: "Streaming & Licensing", platforms: "Netflix · Apple TV+ · YouTube · Tubi · Vimeo · Roku · Rumble" },
  { category: "Social Video", platforms: "TikTok · Instagram · YouTube · Facebook · X · Snapchat" },
  { category: "Creator Economy", platforms: "YouTube · Patreon · Pinterest · Rumble" },
];

export default function PlatformSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">Platform ecosystem</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
          Built for streaming, social video, and creator-economy expansion.
        </h2>
        <p className="text-muted-foreground text-lg mb-12">
          Your hero asset is the core engine. From there, we version, adapt, package, and position your media across channels built for visibility, credibility, licensing, and recurring income.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {channels.map((c) => (
            <div key={c.category} className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">{c.category}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.platforms}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center italic">
          + faith networks, FAST channels, film festival circuits, aggregators, broadcast syndication, and 40+ additional platforms
        </p>
      </div>
    </section>
  );
}
