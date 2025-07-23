
import { Navigation } from "@/components/Navigation";
import { GlimpseHero } from "@/components/glimpse/GlimpseHero";
import { GlimpseWhy } from "@/components/glimpse/GlimpseWhy";
import { GlimpseValue } from "@/components/glimpse/GlimpseValue";
import { GlimpseHook } from "@/components/glimpse/GlimpseHook";
import { GlimpsePricing } from "@/components/glimpse/GlimpsePricing";
import { GlimpseCTA } from "@/components/glimpse/GlimpseCTA";

const DiscoveryCallPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <GlimpseHero />
      <GlimpseWhy />
      <GlimpseValue />
      <GlimpseHook />
      <GlimpsePricing />
      <GlimpseCTA />
    </div>
  );
};

export default DiscoveryCallPage;
