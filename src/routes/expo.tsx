import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { ExpoCountdown } from "@/components/expo/ExpoCountdown";
import { ExpoCodeBox } from "@/components/expo/ExpoCodeBox";
import { studioOfferSearch, useExpoClock } from "@/components/expo/ExpoModule";
import "@/components/expo/expo.css";
import { expoCampaign, expoPhaseLabel, expoSavings, followUpPromise } from "@/lib/expo-campaign";
import { submitExpoLead } from "@/lib/expo.functions";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/expo")({
  head: () =>
    createSeo({
      title: "Small Business Expo LA — Palmer House Studio at Booth 328",
      description:
        "Meet Palmer House at Booth 328, Pasadena Convention Center, Sept 30. Start Studio at $79/month for your first 3 months.",
      pathname: "/expo",
    }),
  component: ExpoPage,
});

function ExpoPage() {
  const { live, phase } = useExpoClock();
  const [code, setCode] = useState("");
  const booth = Boolean(code);
  const offer = booth ? expoCampaign.offers.booth : expoCampaign.offers.public;
  return (
    <PageShell>
      <div className="expo-page">
        <header className="expo-hero">
          <p className="expo-eyebrow">Small Business Expo · Los Angeles</p>
          <h1>Know what to say. Know what to create.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Meet Palmer House at Booth 328 and explore Studio: AI creative Pals and a shared
            workspace for developing your brand, campaigns, scripts, posts, and visual ideas.
          </p>
          <p className="mt-4 font-bold">{expoPhaseLabel[phase]}</p>
        </header>

        {live ? (
          <section className="expo-panel" aria-label="Expo offer">
            <div className="flex flex-col gap-4">
              <p className="expo-eyebrow">{booth ? "Booth offer unlocked" : "Expo-week offer · live now"}</p>
              <p className="expo-price" style={{ color: "inherit" }}>
                ${offer.monthly}
                <small style={{ color: "inherit", opacity: 0.7 }}>/month</small>
              </p>
              <p className="text-lg">
                For your first 3 months. Then ${expoCampaign.regularMonthly}/month. Save $
                {expoSavings(booth ? "booth" : "public")} total.
              </p>
              <p className="text-sm opacity-75">
                Monthly Studio membership. Taxes, if any, are shown at checkout. Cancel any time from
                Manage billing.
              </p>
              <div className="expo-actions">
                <Link to="/studio/billing" search={studioOfferSearch} className="primary-action">
                  {booth ? "Start Studio with my offer" : "Start Studio now"}
                </Link>
                <a href="#info" className="expo-link">
                  Send me more information Friday
                </a>
              </div>
            </div>
            <div className="expo-price-card" id="booth-code">
              <ExpoCountdown />
              <ExpoCodeBox onChange={setCode} />
            </div>
          </section>
        ) : (
          <section className="expo-card">
            <h3>The expo intro offer has ended.</h3>
            <p>
              Studio is still available at our regular pricing.{" "}
              <Link to="/membership/pricing" className="underline">
                See Studio plans
              </Link>
            </p>
          </section>
        )}

        <section className="expo-grid" aria-label="What Palmer House offers">
          <div className="expo-card">
            <h3>Studio</h3>
            <p>
              Software and AI creative tools: eight Pals and one shared workspace for your brand,
              campaigns, scripts and posts. No crew filming or finished video is included.
            </p>
          </div>
          <div className="expo-card">
            <h3>Full production</h3>
            <p>Our team plans, films and edits your videos.</p>
          </div>
          <div className="expo-card">
            <h3>Planning & preparation</h3>
            <p>Strategy and pre-shoot support from our team before you film.</p>
          </div>
        </section>

        <section className="expo-grid" aria-label="Event details and follow-up">
          <div className="expo-card">
            <h3>Find us</h3>
            <p className="font-bold">{expoCampaign.event.booth}</p>
            <p>{expoCampaign.event.dateLabel}</p>
            <p>{expoCampaign.event.hoursLabel}</p>
            <p className="mt-2">{expoCampaign.event.venue}</p>
            <p>{expoCampaign.event.address}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {expoCampaign.contactEmail} · {expoCampaign.contactPhone}
            </p>
          </div>
          <LeadForm boothCode={code} />
        </section>

        <section className="expo-card text-sm text-muted-foreground" aria-label="Offer terms">
          <h3 className="text-foreground">Offer terms</h3>
          <p>
            The public rate is ${expoCampaign.offers.public.monthly}/month and the booth-code rate is
            ${expoCampaign.offers.booth.monthly}/month, each for the first 3 monthly billing periods
            of a new monthly Studio membership. Then ${expoCampaign.regularMonthly}/month. One
            introductory offer per workspace, for a first Studio membership only; the two offers
            don't combine. Not available on annual billing, Guided, Partner, credit packs or
            production. Start checkout by {expoCampaign.deadlineLabel}; each discounted checkout must
            be completed within {expoCampaign.checkoutWindowMinutes} minutes of starting. Your
            3-month rate continues after the offer closes. Normal cancellation, refund and tax terms
            apply.
          </p>
        </section>
      </div>
    </PageShell>
  );
}

function LeadForm({ boothCode }: { boothCode: string }) {
  const [state, setState] = useState<"idle" | "saving" | "done" | "error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("saving");
    try {
      await submitExpoLead({
        data: {
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          company: String(f.get("company") || ""),
          phone: String(f.get("phone") || ""),
          wantsToCreate: String(f.get("wants") || ""),
          interest: String(f.get("interest") || "") as "studio" | "production" | "planning" | "",
          boothCode,
          website: String(f.get("website") || ""),
        },
      });
      setState("done");
    } catch {
      setState("error");
    }
  }
  if (state === "done")
    return (
      <div className="expo-card" id="info" role="status">
        <h3>You're on the list.</h3>
        <p>{followUpPromise()}</p>
        <p className="mt-2">Ready now? You can start Studio today.</p>
        <p className="mt-2 font-bold">— Jevoy</p>
        <Link to="/studio/billing" search={studioOfferSearch} className="primary-action mt-4">
          Start Studio now
        </Link>
      </div>
    );
  return (
    <form className="expo-card expo-form" id="info" onSubmit={submit}>
      <h3>Send me more information</h3>
      <p className="text-sm text-muted-foreground">
        {followUpPromise()} We'll only use your details for this follow-up. No newsletter, no texts.
      </p>
      <label>
        Name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Company <span className="font-normal text-muted-foreground">(optional)</span>
        <input name="company" autoComplete="organization" />
      </label>
      <label>
        Phone <span className="font-normal text-muted-foreground">(optional)</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        I'm most interested in <span className="font-normal text-muted-foreground">(optional)</span>
        <select name="interest" defaultValue="">
          <option value="">Choose one</option>
          <option value="studio">Studio</option>
          <option value="production">Production</option>
          <option value="planning">Planning help</option>
        </select>
      </label>
      <label>
        What do you want to create? <span className="font-normal text-muted-foreground">(optional)</span>
        <textarea name="wants" rows={3} />
      </label>
      <input className="expo-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="primary-action" disabled={state === "saving"}>
        {state === "saving" ? "Saving…" : "Send me the details Friday"}
      </button>
      {state === "error" && (
        <p className="expo-code-error" role="alert">
          We couldn't save that. Please try again or email {expoCampaign.contactEmail}.
        </p>
      )}
    </form>
  );
}
