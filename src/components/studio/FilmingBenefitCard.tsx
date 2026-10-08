import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase/client";
import { filmingBenefits, FILMING_SESSION_FEE } from "@/lib/studio-model";

/** Shows a member's filming perk; Partner also sees whether this month's included session is used. */
export function FilmingBenefitCard({ workspaceId, plan, active }: { workspaceId: string; plan: string; active: boolean }) {
  const benefit = active ? filmingBenefits[plan] : undefined;
  const [used, setUsed] = useState<boolean | null>(null);
  useEffect(() => {
    if (benefit?.kind !== "included") return;
    const d = new Date();
    const month = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01`;
    void (supabase as any)
      .from("filming_benefit_redemptions")
      .select("id")
      .eq("workspace_id", workspaceId)
      .eq("period_month", month)
      .in("status", ["reserved", "redeemed"])
      .limit(1)
      .then(({ data }: { data: unknown[] | null }) => setUsed(!!data?.length));
  }, [benefit?.kind, workspaceId]);
  if (!benefit) return null;
  const detail =
    benefit.kind === "included"
      ? used === null
        ? "Checking this month's session…"
        : used
          ? "This month's included session is booked. Extra sessions this month are 50% off. Resets on the 1st."
          : `One filming session included this month ($${FILMING_SESSION_FEE} value). Not used yet.`
      : `${benefit.percent}% off every filming session — $${(FILMING_SESSION_FEE * (100 - benefit.percent)) / 100} instead of $${FILMING_SESSION_FEE}.`;
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-border bg-evergreen-soft p-5">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[.17em]">Your filming benefit</p>
        <p className="mt-2 font-bold">{detail}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Applies to the session fee when you book signed in. Editing and extra videos are priced separately.
        </p>
      </div>
      <Link to="/services/video-production" className="text-sm font-bold underline">
        Book a shoot
      </Link>
    </div>
  );
}
