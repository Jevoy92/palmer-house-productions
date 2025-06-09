
import { Navigation } from "@/components/Navigation";
import { GlimpseHero } from "@/components/glimpse/GlimpseHero";
import { GlimpseHook } from "@/components/glimpse/GlimpseHook";
import { GlimpsePricing } from "@/components/glimpse/GlimpsePricing";
import { GlimpseValue } from "@/components/glimpse/GlimpseValue";
import { GlimpseWhy } from "@/components/glimpse/GlimpseWhy";
import { GlimpseCTA } from "@/components/glimpse/GlimpseCTA";

const Glimpse = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <GlimpseHero />
      <GlimpseHook />
      <GlimpsePricing />
      <GlimpseValue />
      <GlimpseWhy />
      <GlimpseCTA />
    </div>
  );
};

export default Glimpse;
