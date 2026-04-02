import { Check } from "lucide-react";

const tiers = [
  {
    name: "Foundation",
    price: "$45,000",
    label: "One-time identity capture",
    badge: null,
    features: [
      "1 full shoot day",
      "1 premium cinematic hero film",
      "1 clean announcement cut",
      "8–12 short-form edits",
      "Private story capture interview",
      "Lifestyle and environmental visuals",
      "Secure delivery vault",
      "Core monetization framing",
    ],
    cta: "Start With Foundation",
  },
  {
    name: "Wealth Identity System",
    price: "$85,000",
    label: "Full production + multi-channel positioning",
    badge: "Most Selected",
    features: [
      "2 shoot days",
      "Flagship hero film + expanded cut library",
      "20–30 short-form assets",
      "Distribution-prep materials",
      "Platform-specific exports",
      "Brand deal and partnership positioning",
      "Streaming, social, and creator-economy packaging",
      "Authority, monetization, and visibility strategy",
    ],
    cta: "Build Your System",
  },
  {
    name: "Legacy Engine",
    price: "$175,000",
    priceSuffix: "/ year",
    label: "Ongoing media partnership",
    badge: "Full Partnership",
    features: [
      "4 shoot days across the year",
      "Monthly content deliverables",
      "Ongoing short-form and campaign production",
      "Dedicated account management",
      "Platform monetization setup and oversight",
      "Influencer life management support",
      "Distribution coordination and expansion",
      "Year-two renewal at reduced rate",
    ],
    cta: "Become a Partner",
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="pricing">
      <div className="max-w-6xl mx-auto">
        <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 text-center">Investment</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-center">
          Three ways to work together.
        </h2>
        <p className="text-muted-foreground text-lg mb-14 text-center">
          Every tier is structured around the same principle: the film pays for itself.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-card border rounded-2xl p-8 flex flex-col ${
                tier.badge === "Most Selected" ? "border-accent ring-1 ring-accent" : "border-border"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {tier.badge}
                </span>
              )}
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wide">{tier.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                {"priceSuffix" in tier && <span className="text-muted-foreground text-sm">{tier.priceSuffix}</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{tier.label}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${
                  tier.badge === "Most Selected"
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Payment terms:</strong> 50% upfront, balance on delivery. Full payment upfront receives 5% discount.
          </p>
          <p className="text-xs text-muted-foreground">
            Custom scoping available. Ask about add-ons, additional shoot days, and platform strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
