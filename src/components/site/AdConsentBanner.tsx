import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "php-ad-consent";

function needsConsent() {
  try {
    if (localStorage.getItem(KEY)) return false;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return /^(Europe|Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe))/.test(tz);
  } catch {
    return false;
  }
}

export function AdConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(needsConsent()), []);
  if (!show) return null;

  const choose = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    if (v === "granted") (window as unknown as { __phpLoadAds?: () => void }).__phpLoadAds?.();
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Ad measurement permission"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-xl rounded-2xl border border-border bg-background p-4 shadow-lg sm:p-5"
    >
      <p className="text-sm text-foreground">
        We'd like to measure how our ads perform by sharing page visits and purchases with OpenAI.
        It's off unless you allow it.{" "}
        <Link to="/privacy" className="underline">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => choose("denied")}>
          No thanks
        </Button>
        <Button size="sm" onClick={() => choose("granted")}>
          Allow
        </Button>
      </div>
    </div>
  );
}
