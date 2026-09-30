import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  expoCampaign,
  expoEventPhase,
  expoOfferLive,
  expoPhaseLabel,
  expoSavings,
  type ExpoEventPhase,
} from "@/lib/expo-campaign";
import { ExpoCountdown } from "./ExpoCountdown";
import "./expo.css";

/** Client clock for display only; SSR renders the default phase. */
export function useExpoClock() {
  const [state, setState] = useState<{ live: boolean; phase: ExpoEventPhase }>({
    live: expoCampaign.enabled,
    phase: "today",
  });
  useEffect(() => {
    const tick = () => setState({ live: expoOfferLive(), phase: expoEventPhase() });
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  return state;
}

export const studioOfferSearch = { plan: "creator" as const, interval: "month" as const };

export function ExpoBar() {
  const { live, phase } = useExpoClock();
  if (!live && phase !== "after") return null;
  return (
    <div className="expo-bar" role="region" aria-label="Small Business Expo">
      <span>Small Business Expo · Los Angeles</span>
      <span className="dot" aria-hidden>
        ·
      </span>
      <span>{expoPhaseLabel[phase]}</span>
      {live && (
        <>
          <span className="dot" aria-hidden>
            ·
          </span>
          <Link to="/expo">Studio intro: ${expoCampaign.offers.public.monthly}/mo for 3 months</Link>
          <span className="dot" aria-hidden>
            ·
          </span>
          <Link to="/expo/demo">Try the free demo</Link>
        </>
      )}
    </div>
  );
}

export function ExpoModule() {
  const { live, phase } = useExpoClock();
  if (!live) return null;
  return (
    <section className="expo-module" aria-labelledby="expo-module-title">
      <div className="expo-panel">
        <div>
          <p className="expo-eyebrow">Small Business Expo · Los Angeles</p>
          <h2 id="expo-module-title">Know what to say. Know what to create.</h2>
          <p className="expo-desc">
            Meet Palmer House at Booth 328 and explore Studio: AI creative Pals and a shared
            workspace for developing your brand, campaigns, scripts, posts, and visual ideas.
          </p>
          <p className="expo-detail">
            <span className="expo-phase">{expoPhaseLabel[phase]}</span>
          </p>
          <p className="expo-detail">September 30 · Pasadena Convention Center · Booth 328</p>
        </div>
        <div className="expo-price-card">
          <p className="expo-offer-label">Expo-week offer · live now</p>
          <p className="expo-price">
            ${expoCampaign.offers.public.monthly}
            <small>/month</small>
          </p>
          <p className="expo-terms">
            For your first 3 months. Then ${expoCampaign.regularMonthly}/month. Save $
            {expoSavings("public")} total.
          </p>
          <ExpoCountdown />
          <div className="expo-actions">
            <Link to="/studio/billing" search={studioOfferSearch} className="primary-action">
              Start Studio now
            </Link>
            <Link to="/expo" hash="booth-code" className="expo-link">
              Have a booth code?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small intro-price note for the monthly base Studio plan card. */
export function ExpoPlanNote() {
  const { live } = useExpoClock();
  if (!live) return null;
  return (
    <div className="expo-code-ok mt-4 text-sm" role="note">
      <p className="expo-offer-label">Expo-week offer</p>
      <p className="mt-1 font-bold">
        ${expoCampaign.offers.public.monthly}/month for your first 3 months, then $
        {expoCampaign.regularMonthly}/month.
      </p>
      <Link to="/expo" hash="booth-code" className="expo-link mt-1 inline-block">
        Have a booth code?
      </Link>
    </div>
  );
}
