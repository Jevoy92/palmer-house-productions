import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase/client";
import { filmingBenefits, FILMING_SESSION_FEE } from "@/lib/studio-model";

/** Shows a member's filming perk; Partner also sees whether this month's included session is used. */
export function FilmingBenefitCard({
  workspaceId,
  plan,
  active,
}: {
  workspaceId: string;
  plan: string;
  active: boolean;
}) {
  const benefit = active ? filmingBenefits[plan] : undefined;
  const [used, setUsed] = useState<boolean | null>(null);
  const [checkFailed, setCheckFailed] = useState(false);
  useEffect(() => {
    if (benefit?.kind !== "included") return;
    let current = true;
    setUsed(null);
    setCheckFailed(false);
    const d = new Date();
    const month = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01`;
    void supabase
      .from("filming_benefit_redemptions")
      .select("id")
      .eq("workspace_id", workspaceId)
      .eq("period_month", month)
      .in("status", ["reserved", "redeemed"])
      .limit(1)
      .then(({ data, error }) => {
        if (!current) return;
        setCheckFailed(!!error);
        if (!error) setUsed(!!data?.length);
      });
    return () => {
      current = false;
    };
  }, [benefit?.kind, workspaceId]);
  if (!benefit) return null;
  const detail =
    benefit.kind === "included"
      ? checkFailed
        ? "We couldn’t verify this month’s session. We’ll confirm it in your quote."
        : used === null
          ? "Checking this month's session…"
          : used
            ? "This month's included session is booked. One eligible session per additional project is 50% off. Resets on the 1st."
            : `One filming session included this month ($${FILMING_SESSION_FEE} value). Not used yet.`
      : `${benefit.percent}% off one filming session per project — $${(FILMING_SESSION_FEE * (100 - benefit.percent)) / 100} instead of $${FILMING_SESSION_FEE}.`;
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-border bg-evergreen-soft p-5">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[.17em]">Your filming benefit</p>
        <p className="mt-2 font-bold">{detail}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          We verify eligibility and apply the session benefit in your quote. Editing and extra
          videos are priced separately.
        </p>
      </div>
      <Link to="/services/video-production" className="text-sm font-bold underline">
        Book a shoot
      </Link>
    </div>
  );
}
