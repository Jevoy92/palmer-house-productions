export default function Footer() {
  return (
    <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-lg font-bold mb-1">Palmer House Productions</p>
          <p className="text-sm text-muted-foreground italic">We don't speculate. We produce.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Serving the Pacific Northwest: Seattle · Bellevue · Tacoma · Portland
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h3 className="text-sm font-semibold mb-2 text-accent uppercase tracking-wide">Important Note on Distribution</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We prepare your project with professional packaging and coordinate outreach through appropriate distributors, aggregators, and industry partners. Palmer House Productions does not guarantee placement, licensing, or acceptance by Netflix, Hulu, Prime Video, or any platform. Revenue and residual income figures cited are industry data and not individual guarantees. All platform decisions rest with those third parties.
          </p>
        </div>

        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>© 2025 Palmer House Productions. All rights reserved.</p>
          <p>www.palmerhouseproductions.com</p>
        </div>
      </div>
    </footer>
  );
}
