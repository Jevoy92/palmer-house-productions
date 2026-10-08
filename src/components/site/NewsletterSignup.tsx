import { useEffect, useRef, useState, type FormEvent } from "react";
import { subscribeMonthlyNewsletter } from "@/lib/newsletter.functions";

export function NewsletterSignup() {
  const started = useRef(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  useEffect(() => {
    started.current = Date.now();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("consent") !== "on") {
      setMsg({ ok: false, text: "Please tick the box to agree to receive the newsletter." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const r = await subscribeMonthlyNewsletter({
        data: {
          email: String(f.get("email") || ""),
          firstName: String(f.get("firstName") || "") || undefined,
          consent: true,
          website: String(f.get("website") || ""),
          startedAt: started.current,
        },
      });
      setMsg({ ok: true, text: r.message });
      e.currentTarget?.reset();
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 max-w-sm space-y-2" aria-label="Newsletter signup">
      <p className="text-sm font-bold text-foreground">The Palmer House Letter</p>
      <p className="text-xs text-muted-foreground">One free email a month: ideas, behind-the-scenes and video tips from our team.</p>
      <div className="flex gap-2">
        <input name="firstName" placeholder="First name" maxLength={80} autoComplete="given-name" className="w-28 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
        <input name="email" type="email" required maxLength={254} placeholder="you@company.com" autoComplete="email" className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input name="consent" type="checkbox" className="mt-0.5" />
        <span>Yes, send me The Palmer House Letter. Unsubscribe anytime. See our <a href="/privacy" className="underline">Privacy Policy</a>.</span>
      </label>
      <button disabled={busy} className="rounded-lg bg-spotlight px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
        {busy ? "Joining…" : "Subscribe"}
      </button>
      {msg ? <p role="status" className={`text-xs ${msg.ok ? "text-foreground" : "text-destructive"}`}>{msg.text}</p> : null}
    </form>
  );
}
