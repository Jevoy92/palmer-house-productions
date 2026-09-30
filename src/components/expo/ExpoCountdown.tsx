import { useEffect, useState } from "react";
import { expoCampaign } from "@/lib/expo-campaign";

/** Display-only countdown to the fixed campaign deadline. Eligibility is decided on the server. */
export function ExpoCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const t = setInterval(tick, 1000);
    const vis = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", vis);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);
  const left = now === null ? null : Math.max(0, Date.parse(expoCampaign.endsAt) - now);
  const parts =
    left === null
      ? null
      : [
          ["days", Math.floor(left / 86400000)],
          ["hrs", Math.floor(left / 3600000) % 24],
          ["min", Math.floor(left / 60000) % 60],
          ["sec", Math.floor(left / 1000) % 60],
        ];
  return (
    <div className="expo-countdown">
      <p className="expo-countdown-label">Intro offer ends in</p>
      <div className="expo-countdown-digits" aria-hidden="true">
        {(parts ?? [["days", "–"], ["hrs", "–"], ["min", "–"], ["sec", "–"]]).map(([k, v]) => (
          <span key={k as string}>
            <strong>{typeof v === "number" ? String(v).padStart(2, "0") : v}</strong>
            <small>{k}</small>
          </span>
        ))}
      </div>
      <p className="expo-countdown-deadline">Ends {expoCampaign.deadlineLabel}</p>
    </div>
  );
}
