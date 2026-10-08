import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStudio } from "./StudioProvider";
import { applySignupNewsletterConsent, getNewsletterPrefs, saveNewsletterPrefs } from "@/lib/newsletter.functions";

type Prefs = Awaited<ReturnType<typeof getNewsletterPrefs>>;

/** Applies a signup-time monthly opt-in once; safe to render on every Studio load. */
export function NewsletterSignupConsent() {
  const { session } = useStudio();
  const token = session?.access_token;
  useEffect(() => {
    if (!token || !session?.user.user_metadata?.newsletter_monthly) return;
    void applySignupNewsletterConsent({ data: { accessToken: token } }).catch(() => {});
  }, [token]);
  return null;
}

export function StudioNewsletterPrefs() {
  const { session } = useStudio();
  const token = session?.access_token;
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!token) return;
    getNewsletterPrefs({ data: { accessToken: token } }).then(setPrefs).catch(() => {});
  }, [token]);
  if (!token || !prefs) return null;

  const save = async (next: { monthly: boolean; weekly: boolean }) => {
    setBusy(true);
    try {
      setPrefs(await saveNewsletterPrefs({ data: { accessToken: token, ...next } }));
      toast.success("Newsletter preferences saved.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="studio-card mb-7" aria-label="Newsletters">
      <p className="studio-eyebrow text-muted-foreground">Newsletters</p>
      <h3 className="mt-2 text-lg font-bold">What we email you</h3>
      {prefs.unsubscribedAll ? (
        <p className="mt-2 text-sm text-muted-foreground">You unsubscribed from all newsletters. Turn one on below to rejoin.</p>
      ) : null}
      <label className="mt-4 flex items-start gap-3">
        <input type="checkbox" disabled={busy} checked={prefs.monthly} onChange={(e) => save({ monthly: e.target.checked, weekly: prefs.weekly })} className="mt-1" />
        <span>
          <span className="block font-bold">The Palmer House Letter · Monthly</span>
          <span className="text-sm text-muted-foreground">Free. Ideas, behind-the-scenes and video tips from our team.</span>
        </span>
      </label>
      <label className="mt-4 flex items-start gap-3">
        <input
          type="checkbox"
          disabled={busy || (!prefs.weeklyEligible && !prefs.weekly)}
          checked={prefs.weekly}
          onChange={(e) => save({ monthly: prefs.monthly, weekly: e.target.checked })}
          className="mt-1"
        />
        <span>
          <span className="block font-bold">The Studio Brief · Weekly</span>
          <span className="text-sm text-muted-foreground">
            {prefs.weeklyEligible
              ? "For paid members. A short weekly plan for your content."
              : prefs.weekly
                ? "Paused while you don't have an active paid plan. It resumes if you rejoin."
                : "Available with an active Studio, Guided or Partner plan."}
          </span>
        </span>
      </label>
      <p className="mt-4 text-xs text-muted-foreground">Turning one off never changes the other. Sign-in and receipt emails aren't affected.</p>
    </section>
  );
}
