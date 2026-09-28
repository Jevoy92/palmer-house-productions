import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : "",
  }),
  head: () => ({
    meta: [
      { title: "Unsubscribe · Palmer House Productions" },
      { name: "description", content: "Manage email preferences for Palmer House Productions." },
      { property: "og:title", content: "Unsubscribe · Palmer House Productions" },
      { property: "og:description", content: "Manage email preferences for Palmer House Productions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Unsubscribe,
});

function Unsubscribe() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<"checking" | "ready" | "done" | "invalid" | "error">(
    "checking",
  );
  useEffect(() => {
    if (!token) return setState("invalid");
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((r) => setState(r.ok ? "ready" : "invalid"))
      .catch(() => setState("error"));
  }, [token]);
  async function confirm() {
    const r = await fetch("/email/unsubscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setState(r.ok ? "done" : "error");
  }
  return (
    <PageShell>
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-4xl font-extrabold">Email preferences</h1>
        <p className="mt-4 text-muted-foreground">
          {state === "checking" && "Checking your link…"}
          {state === "ready" && "Stop receiving these emails from Palmer House Productions?"}
          {state === "done" && "You're unsubscribed. You won't get these emails again."}
          {state === "invalid" && "This link is invalid or has already been used."}
          {state === "error" && "Something went wrong. Please try again."}
        </p>
        {state === "ready" && (
          <button
            type="button"
            onClick={() => void confirm()}
            className="mt-8 inline-flex min-h-11 items-center rounded-2xl bg-foreground px-6 font-semibold text-background"
          >
            Confirm unsubscribe
          </button>
        )}
      </section>
    </PageShell>
  );
}
