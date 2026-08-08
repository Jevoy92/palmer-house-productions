import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady(true);
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
    <main className="grid min-h-screen place-items-center bg-white px-4 py-12">
      <div className="w-full max-w-md rounded-[1.25rem] border border-border p-7">
        <p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
          Palmer House Studio
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-.04em]">
          {done ? "Password updated" : "Choose a new password"}
        </h1>

        {done ? (
          <>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              You are all set. Open your studio to keep going.
            </p>
            <Link
              to="/studio"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-spotlight px-5 font-bold text-white transition hover:bg-ink"
            >
              Open my studio
            </Link>
          </>
        ) : !ready ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Open this page from the reset link we emailed you. If you landed here directly, request a
            new link from the{" "}
            <Link to="/studio" className="font-bold text-spotlight underline underline-offset-4">
              sign-in page
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold">
              New password
              <input
                name="password"
                type="password"
                minLength={8}
                required
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="mt-2 min-h-12 w-full rounded-2xl border border-border px-4 text-sm outline-none focus:border-system focus:ring-2 focus:ring-system/15"
              />
            </label>
            <label className="block text-sm font-semibold">
              Confirm new password
              <input
                name="confirm"
                type="password"
                minLength={8}
                required
                autoComplete="new-password"
                placeholder="Type it again"
                className="mt-2 min-h-12 w-full rounded-2xl border border-border px-4 text-sm outline-none focus:border-system focus:ring-2 focus:ring-system/15"
              />
            </label>
            <button
              disabled={busy}
              className="min-h-12 w-full rounded-xl bg-spotlight px-5 font-bold text-white transition hover:bg-ink disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save new password"}
            </button>
          </form>
        )}

        {error ? (
          <p role="alert" className="mt-4 rounded-xl border border-reel bg-reel-soft p-4 text-sm text-reel">
            {error}
          </p>
        ) : null}
      </div>
    </main>
  );
}
