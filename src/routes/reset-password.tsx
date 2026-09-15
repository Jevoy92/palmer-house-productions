import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, LoaderCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { PalFigure } from "@/components/site/PalVisuals";
import { supabase } from "@/lib/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset your password — Palmer House Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session) setReady(true);
      setChecked(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setReady(true);
        setChecked(true);
      }
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    setError("");
    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }
    setBusy(true);
    const result = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setDone(true);
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-cream px-4 py-12">
      <span
        aria-hidden="true"
        className="absolute -right-24 -top-24 size-80 rounded-full bg-system-soft"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-28 -left-24 size-80 rounded-full bg-system-soft"
      />
      <div className="relative grid w-full max-w-3xl items-center gap-6 sm:grid-cols-[minmax(0,1fr)_13rem]">
        <div className="w-full max-w-md rounded-[2rem] border border-border bg-white p-6 shadow-[0_28px_90px_-45px_rgba(31,35,40,.35)] sm:p-9">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full pr-3 text-sm font-bold text-muted-foreground transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight"
          >
            <ArrowLeft className="size-4" /> Palmer House
          </Link>
          <div className="mt-8 grid size-12 place-items-center rounded-2xl bg-system-soft text-system-text">
            {done ? <CheckCircle2 className="size-6" /> : <KeyRound className="size-6" />}
          </div>
          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[.16em] text-system">
            Palmer House Studio
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-.04em] sm:text-4xl">
            {done ? "Your password is updated." : "Choose a new password."}
          </h1>

          {done ? (
            <>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                You are all set. Open Palmer House Studio to keep building.
              </p>
              <Link
                to="/studio"
                className="mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-spotlight px-5 font-bold text-white transition hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight focus-visible:ring-offset-2"
              >
                Open Palmer House Studio <ArrowRight className="size-4" />
              </Link>
            </>
          ) : !checked ? (
            <div
              className="mt-6 flex items-center gap-3 text-base text-muted-foreground"
              role="status"
            >
              <LoaderCircle className="size-5 animate-spin text-system" />
              Checking your reset link…
            </div>
          ) : !ready ? (
            <div className="mt-5 rounded-2xl border border-system/20 bg-system-soft p-5">
              <p className="text-base leading-relaxed text-ink">
                Open this page from the reset link we emailed you. Reset links expire for your
                security.
              </p>
              <Link
                to="/studio"
                className="mt-4 inline-flex min-h-11 items-center font-bold text-system underline decoration-system/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system"
              >
                Return to Palmer House Studio sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-7 space-y-5">
              <p className="text-base leading-relaxed text-muted-foreground">
                Use at least eight characters. A longer, unique passphrase is even better.
              </p>
              <label className="block text-base font-semibold">
                New password
                <input
                  name="password"
                  type="password"
                  minLength={8}
                  required
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  aria-describedby={error ? "password-error" : undefined}
                  className="mt-2 min-h-13 w-full rounded-2xl border border-border px-4 text-base outline-none transition focus-visible:border-system focus-visible:ring-2 focus-visible:ring-system/20"
                />
              </label>
              <label className="block text-base font-semibold">
                Confirm new password
                <input
                  name="confirm"
                  type="password"
                  minLength={8}
                  required
                  autoComplete="new-password"
                  placeholder="Type it again"
                  aria-describedby={error ? "password-error" : undefined}
                  className="mt-2 min-h-13 w-full rounded-2xl border border-border px-4 text-base outline-none transition focus-visible:border-system focus-visible:ring-2 focus-visible:ring-system/20"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-spotlight px-5 font-bold text-white transition hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {busy ? "Saving…" : "Save new password"}
              </button>
            </form>
          )}

          {error ? (
            <p
              id="password-error"
              role="alert"
              className="mt-5 rounded-xl border border-reel/30 bg-reel-soft p-4 text-base font-medium text-reel"
            >
              {error}
            </p>
          ) : null}
        </div>
        <div className="hidden sm:block">
          <PalFigure
            pal="samira"
            size="sm"
            lane="system"
            className="min-h-[14rem]"
            tags={["Secure reset", "Back to the Studio"]}
          />
        </div>
      </div>
    </main>
  );
}
