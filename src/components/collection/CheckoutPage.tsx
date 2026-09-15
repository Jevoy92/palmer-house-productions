/* eslint-disable react-refresh/only-export-components -- Keep the injectable inquiry adapter beside its checkout UI and test it without network access. */
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, FileText, LoaderCircle, Mail } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  buildReceiptLines,
  cartStore,
  cartSubtotal,
  getKitSessionCount,
  kitSessionCountKey,
  receiptLineConfiguration,
  useCart,
  type CartState,
} from "@/lib/cart-store";
import { DIY_DOWNLOADS, getPackageById, MAX_PACKAGE_SESSIONS } from "@/lib/pricing-catalog";
import {
  buildHoneyBookUrl,
  generateQuoteReference,
  HONEYBOOK_LEAD_FORM_URL,
} from "@/lib/honeybook";
import { buildQuoteSnapshot, type QuoteSnapshot } from "@/lib/quote-engine";
import { createDepositCheckout } from "@/lib/stripe-checkout";
import { CollectionShell } from "./CollectionShell";
import { money } from "./controls";

type PlanDetails = { name: string; email: string; city: string; timing: string; ongoing: boolean };
type DetailErrors = Partial<Record<"name" | "email" | "city", string>>;
type InquiryQuote = Omit<QuoteSnapshot, "deposit"> & {
  legacyReview?: CartState["migrationReview"];
};
export type PlanRequest = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  source: string;
  city: string;
  timing: string;
  ongoing: boolean;
  quote: InquiryQuote;
};
export type PlanRequestResult =
  | { kind: "received" }
  | { kind: "honeybook"; url: string }
  | { kind: "email"; url: string }
  | { kind: "payment"; url: string }
  | { kind: "error"; message: string };
type SubmissionState = PlanRequestResult | { kind: "idle" | "sending" };
const CONTACT_ENDPOINT =
  (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim() ?? "";
const HAS_HONEYBOOK = (() => {
  try {
    return ["https:", "http:"].includes(new URL(HONEYBOOK_LEAD_FORM_URL).protocol);
  } catch {
    return false;
  }
})();
const EMPTY_DETAILS: PlanDetails = {
  name: "",
  email: "",
  city: "",
  timing: "Flexible",
  ongoing: false,
};
const REQUEST_ERROR =
  "We couldn’t confirm receipt. Your plan and details are still here. Please try again or open an email draft.";

export function validatePlanDetails(details: PlanDetails, requireCity = true): DetailErrors {
  const errors: DetailErrors = {};
  if (!details.name.trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()))
    errors.email = "Enter a valid email address.";
  if (requireCity && !details.city.trim()) errors.city = "Enter your filming city.";
  return errors;
}

export function planEmailUrl(request: PlanRequest): string {
  return `mailto:info@palmerhouseproductions.com?subject=${encodeURIComponent(`Video plan request · ${request.quote.reference}`)}&body=${encodeURIComponent(request.message)}`;
}

export function planHandoff(request: PlanRequest, honeyBookUrl: string): PlanRequestResult {
  if (honeyBookUrl) {
    try {
      const url = new URL(honeyBookUrl);
      if (url.protocol === "https:" || url.protocol === "http:")
        return { kind: "honeybook", url: url.toString() };
    } catch {
      /* Invalid handoffs fall back to an explicitly unsent email draft. */
    }
  }
  return { kind: "email", url: planEmailUrl(request) };
}

/** The adapter never navigates, charges, or clears the cart. Tests inject fetch. */
export async function submitPlanRequest(
  request: PlanRequest,
  options: { endpoint: string; honeyBookUrl: string; fetcher?: typeof fetch; timeoutMs?: number },
): Promise<PlanRequestResult> {
  if (options.endpoint.trim()) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 20000);
    try {
      const response = await (options.fetcher ?? fetch)(options.endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      return response.ok ? { kind: "received" } : { kind: "error", message: REQUEST_ERROR };
    } catch {
      return { kind: "error", message: REQUEST_ERROR };
    } finally {
      clearTimeout(timeout);
    }
  }
  return planHandoff(request, options.honeyBookUrl);
}

export function isDigitalOnly(items: readonly { id: string }[], pendingReviewCount = 0): boolean {
  return (
    items.length > 0 &&
    pendingReviewCount === 0 &&
    items.every((item) => DIY_DOWNLOADS.some((download) => download.id === item.id))
  );
}

type DigitalCheckoutData = {
  name: string;
  email: string;
  company?: string;
  reference: string;
  offerCode?: QuoteSnapshot["offerCode"];
  items: QuoteSnapshot["items"];
};
type DigitalCheckoutCreator = (input: {
  data: DigitalCheckoutData;
}) => Promise<{ ok: boolean; url?: string; code?: string }>;

/** Only an entirely digital cart may create a payment session; all other plans request a quote. */
export async function submitCheckoutRequest(
  request: PlanRequest,
  options: Parameters<typeof submitPlanRequest>[1] & { createCheckout?: DigitalCheckoutCreator },
): Promise<PlanRequestResult> {
  if (!isDigitalOnly(request.quote.items, request.quote.legacyReview?.length ?? 0))
    return submitPlanRequest(request, options);
  try {
    const response = await (options.createCheckout ?? createDepositCheckout)({
      data: {
        name: request.name,
        email: request.email,
        company: request.company || undefined,
        reference: request.quote.reference,
        offerCode: request.quote.offerCode,
        items: request.quote.items,
      },
    });
    if (!response.ok)
      return {
        kind: "error",
        message:
          response.code === "STRIPE_NOT_CONFIGURED"
            ? "Secure payment is not available right now. Your downloads and details are still here. Please try again later or contact us."
            : "We couldn’t open secure checkout. Your downloads and details are still here. Please try again.",
      };
    const url = new URL(response.url ?? "");
    if (url.protocol !== "https:") throw new Error("Invalid secure checkout URL");
    return { kind: "payment", url: url.toString() };
  } catch {
    return {
      kind: "error",
      message:
        "We couldn’t open secure checkout. Your downloads and details are still here. Please try again.",
    };
  }
}

export function CheckoutPage({ quoteReference }: { quoteReference?: string }) {
  const cart = useCart();
  const lines = useMemo(() => buildReceiptLines(cart), [cart]);
  const subtotal = cartSubtotal(lines);
  const digitalOnly = isDigitalOnly(lines, cart.migrationReview?.length ?? 0);
  const hasPlan = lines.length > 0 || Boolean(cart.migrationReview?.length);
  const estimate = lines.length ? money(subtotal) : "Scope to confirm";
  const [step, setStep] = useState<1 | 2>(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [details, setDetails] = useState<PlanDetails>(EMPTY_DETAILS);
  const [errors, setErrors] = useState<DetailErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>({ kind: "idle" });
  const [lastRequest, setLastRequest] = useState<PlanRequest | null>(null);
  const reference = useRef(quoteReference ?? "");
  const submittedPlan = useRef("");
  const submissionLock = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const submitted = submission.kind === "received";
  const sending = submission.kind === "sending";
  const hasMonthly = lines.some((line) => line.cadence === "monthly");
  const planFingerprint = JSON.stringify({
    selected: cart.selected,
    counts: cart.counts,
    cadence: cart.cadence,
    offerCode: cart.offerCode,
    pricingBasis: cart.pricingBasis,
    migrationReview: cart.migrationReview,
  });
  useEffect(() => {
    if (submission.kind !== "idle" && submission.kind !== "sending") status.current?.focus();
  }, [submission.kind]);
  useEffect(() => {
    if (
      !sending &&
      submission.kind !== "idle" &&
      submittedPlan.current &&
      submittedPlan.current !== planFingerprint
    ) {
      setSubmission({ kind: "idle" });
      setLastRequest(null);
      submittedPlan.current = "";
      reference.current = "";
    }
  }, [planFingerprint, sending, submission.kind]);

  function goToStep(next: 1 | 2) {
    setStep(next);
    setEditingId(null);
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }
  function updateDetail<K extends keyof PlanDetails>(key: K, value: PlanDetails[K]) {
    setDetails((current) => ({ ...current, [key]: value }));
    if (key === "name" || key === "email" || key === "city")
      setErrors((current) => ({ ...current, [key]: undefined }));
    if (submission.kind !== "idle") setSubmission({ kind: "idle" });
  }
  function makeRequest(): { request: PlanRequest; honeyBookUrl: string } {
    reference.current ||= generateQuoteReference();
    const name = details.name.trim(),
      email = details.email.trim(),
      city = details.city.trim();
    const note = `Filming city: ${city}\nTiming: ${details.timing}\nOngoing support: ${details.ongoing ? "Interested; please discuss options" : "Not requested"}`;
    const snapshot = buildQuoteSnapshot({
      cart,
      reference: reference.current,
      customer: { name, email, city, timing: details.timing, note },
    });
    // An inquiry includes the estimate, never a deposit or an authorization to charge.
    const { deposit: _deposit, ...snapshotQuote } = snapshot;
    const quote: InquiryQuote = {
      ...snapshotQuote,
      ...(cart.migrationReview?.length ? { legacyReview: cart.migrationReview } : {}),
    };
    const legacyNote = cart.migrationReview?.length
      ? `Saved items needing a separate review (not included in this estimate):\n${cart.migrationReview.map((item) => `${getPackageById(item.id)?.name ?? item.id.replace(/[-_]/g, " ")} × ${item.qty}; saved configuration: ${JSON.stringify(item)}`).join("\n")}`
      : "";
    const itemSummary = lines
      .map(
        (line) =>
          `${line.name}${line.qty > 1 ? ` × ${line.qty}` : ""} — ${money(line.price * line.qty)}${line.cadence === "monthly" ? " / month" : ""}\n${receiptLineConfiguration(line)}`,
      )
      .join("\n\n");
    const message = [
      `Please review my video plan: ${reference.current}`,
      `Name: ${name}\nEmail: ${email}\n${note}`,
      itemSummary,
      ...(legacyNote ? [legacyNote] : []),
      `Estimated project: ${estimate}${hasMonthly ? " (includes recurring items listed above)" : ""}`,
      "Please confirm scope, scheduling, tax, travel, and payment terms in a quote. No payment is authorized by this request.",
    ].join("\n\n");
    const request: PlanRequest = {
      name,
      email,
      company: "",
      city,
      timing: details.timing,
      ongoing: details.ongoing,
      projectType: "Video production plan",
      message,
      source: "palmerhouseproductions.com",
      quote,
    };
    let honeyBookUrl = "";
    try {
      honeyBookUrl = buildHoneyBookUrl({
        reference: quote.reference,
        items: lines.map((line) => ({
          id: line.id,
          name: `${line.name}${line.qty > 1 ? ` × ${line.qty}` : ""}`,
          price: line.price * line.qty,
          cadence: line.cadence,
          configuration: receiptLineConfiguration(line),
        })),
        subtotal,
        tax: 0,
        total: subtotal,
        offerCode: quote.offerCode,
        cadenceMix: quote.cadenceMix,
        customer: {
          name,
          email,
          note: `${note}\n\n${legacyNote ? `${legacyNote}\n\n` : ""}Estimated amount only. Tax and travel to be confirmed.`,
        },
      });
    } catch {
      /* Keep email available if handoff configuration is invalid. */
    }
    return { request, honeyBookUrl };
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current || sending || submitted || !hasPlan) return;
    const nextErrors = validatePlanDetails(details, !digitalOnly);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`pc-${firstError}`)?.focus();
      return;
    }
    const { request, honeyBookUrl } = makeRequest();
    submittedPlan.current = planFingerprint;
    setLastRequest(request);
    setSubmission({ kind: "sending" });
    // Open external handoffs during the gesture. Neither represents a sent request.
    if (!digitalOnly && !CONTACT_ENDPOINT) {
      const handoff = planHandoff(request, honeyBookUrl);
      setSubmission(handoff);
      if (handoff.kind === "honeybook") window.open(handoff.url, "_blank", "noopener,noreferrer");
      if (handoff.kind === "email") window.location.assign(handoff.url);
      return;
    }
    submissionLock.current = true;
    try {
      if (digitalOnly)
        cartStore.rememberDigitalCheckout(request.quote.reference, request.quote.items);
      const result = await submitCheckoutRequest(request, {
        endpoint: CONTACT_ENDPOINT,
        honeyBookUrl,
      });
      setSubmission(result);
      if (result.kind === "payment") window.location.assign(result.url);
    } finally {
      submissionLock.current = false;
    }
  }
  const actionLabel = digitalOnly
    ? "Pay securely"
    : CONTACT_ENDPOINT
      ? "Request this plan"
      : HAS_HONEYBOOK
        ? "Continue to HoneyBook"
        : "Open email draft";
  const action = (className: string) => (
    <div className={className}>
      {step === 1 ? (
        <button key="review-next" type="button" className="pc-primary" onClick={() => goToStep(2)}>
          {digitalOnly ? "Next: your details" : "Next: project details"} <ArrowRight size={18} />
        </button>
      ) : (
        <button
          key="details-submit"
          type="submit"
          form="pc-project-details"
          className="pc-primary"
          disabled={sending || submitted}
        >
          {sending ? (
            <>
              <LoaderCircle size={18} className="pc-spin" />{" "}
              {digitalOnly ? "Opening secure checkout…" : "Sending request…"}
            </>
          ) : submitted ? (
            <>
              <Check size={18} /> Request received
            </>
          ) : (
            <>
              {actionLabel} <ArrowRight size={18} />
            </>
          )}
        </button>
      )}
    </div>
  );
  const migrationNote =
    cart.migrationNotice || cart.migrationReview?.length ? (
      <div className="pc-status pc-migration-note">
        <h2>Review your saved plan.</h2>
        <p>{cart.migrationNotice ?? "These saved selections need a separate scope review."}</p>
        {Boolean(cart.migrationReview?.length) && (
          <details>
            <summary>
              {cart.migrationReview!.length} saved{" "}
              {cart.migrationReview!.length === 1 ? "item needs" : "items need"} a separate review
            </summary>
            <p>
              These items remain saved. When you request a plan, we’ll include them for review. They
              are not included in the estimate.
            </p>
            <ul>
              {cart.migrationReview!.map((item, index) => (
                <li key={`${item.id}-${index}`}>
                  {getPackageById(item.id)?.name ?? item.id.replace(/[-_]/g, " ")} · Quantity{" "}
                  {item.qty}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    ) : null;
  if (!hasPlan)
    return (
      <CollectionShell active="plan" backTo="/shop">
        <section className="pc-empty pc-checkout-empty">
          <p className="pc-eyebrow">Your plan</p>
          <h1>
            {cart.migrationReview?.length
              ? "Let’s review your saved items."
              : "Your plan is empty."}
          </h1>
          {migrationNote}
          <p className="pc-muted">Choose a package and make the scope your own.</p>
          <Link to="/shop" className="pc-primary">
            Explore packages <ArrowRight size={18} />
          </Link>
        </section>
      </CollectionShell>
    );
  const receipt = (
    <>
      <div className="pc-receipt">
        <div className="pc-total">
          <strong>{digitalOnly ? "Subtotal" : "Estimated project"}</strong>
          <strong>{estimate}</strong>
        </div>
        <p>
          {digitalOnly ? (
            "Pay securely in Stripe. Review the final total before completing your purchase."
          ) : (
            <>
              Tax and travel are confirmed in your quote.
              <br />
              No payment is collected with this request.
            </>
          )}
        </p>
        {hasMonthly && (
          <p>
            Your plan includes monthly items. Recurring scope and terms will be confirmed before
            billing.
          </p>
        )}
      </div>
      <details className="pc-payment-details">
        <summary>How payment works</summary>
        <p>
          {digitalOnly
            ? "Digital products are paid in full through Stripe’s secure checkout. Your payment details are entered there."
            : "We review the plan with you and confirm the scope, schedule, and final quote. Payment instructions follow approval."}
        </p>
      </details>
    </>
  );
  return (
    <CollectionShell
      active="plan"
      backTo={digitalOnly ? "/services/diy-downloads" : "/shop"}
      footer={action("pc-checkout-mobile-action")}
    >
      <div className="pc-checkout">
        <section className="pc-checkout-main" aria-labelledby="pc-checkout-title">
          <ol className="pc-steps" aria-label="Plan request progress">
            <li aria-current={step === 1 ? "step" : undefined}>
              {step === 2 ? (
                <button type="button" onClick={() => goToStep(1)} disabled={sending}>
                  1. {digitalOnly ? "Your downloads" : "Your plan"}
                </button>
              ) : (
                <strong>1. {digitalOnly ? "Your downloads" : "Your plan"}</strong>
              )}
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current={step === 2 ? "step" : undefined}>
              {step === 2 ? (
                <strong>2. {digitalOnly ? "Your details" : "Project details"}</strong>
              ) : digitalOnly ? (
                "2. Your details"
              ) : (
                "2. Project details"
              )}
            </li>
          </ol>
          <h1 id="pc-checkout-title" ref={heading} tabIndex={-1}>
            {digitalOnly
              ? step === 1
                ? "Your downloads."
                : "Complete your purchase."
              : step === 1
                ? "Your video plan."
                : "Let’s make it your project."}
          </h1>
          <p className="pc-lead">
            {digitalOnly
              ? step === 1
                ? "Review your digital products before secure checkout."
                : "Add your contact details, then pay securely in Stripe."
              : step === 1
                ? "Review the work. We’ll confirm the details with you before payment."
                : "A few details so we can confirm the scope, timing, and final quote."}
          </p>
          {migrationNote}
          {step === 1 ? (
            <>
              <div className="pc-plan-items">
                {lines.map((line) => {
                  const pkg = getPackageById(line.id),
                    editable = line.editable,
                    editing = editingId === line.id;
                  const count = cart.counts[line.id] ?? editable?.defaultCount ?? 0,
                    sessions = pkg ? getKitSessionCount(cart.counts, line.id) : 1;
                  return (
                    <article className="pc-plan-item" key={line.id}>
                      <div className="pc-plan-item-heading">
                        {pkg ? (
                          <img
                            className="pc-plan-icon"
                            src={pkg.icon}
                            width="60"
                            height="60"
                            alt=""
                          />
                        ) : (
                          <span className="pc-plan-icon pc-download-icon" aria-hidden="true">
                            <FileText size={28} />
                          </span>
                        )}
                        <div>
                          <h2>{line.name}</h2>
                          {line.qty > 1 && <span className="pc-muted">Quantity: {line.qty}</span>}
                        </div>
                        <strong className="pc-plan-price">
                          {money(line.price * line.qty)}
                          {line.cadence === "monthly" && <small>/ month</small>}
                        </strong>
                      </div>
                      <p className="pc-plan-scope">{receiptLineConfiguration(line)}</p>
                      <div className="pc-plan-item-actions">
                        <button
                          type="button"
                          className="pc-text-button"
                          aria-expanded={editing}
                          aria-controls={`pc-edit-${line.id}`}
                          onClick={() => setEditingId(editing ? null : line.id)}
                        >
                          {editing ? "Done" : "Edit"}
                          <span className="sr-only"> {line.name}</span>
                        </button>
                        <button
                          type="button"
                          className="pc-text-button"
                          onClick={() => {
                            cartStore.changeQty(line.id, 0);
                            setEditingId(null);
                          }}
                        >
                          Remove<span className="sr-only"> {line.name}</span>
                        </button>
                      </div>
                      {editing && (
                        <div id={`pc-edit-${line.id}`} className="pc-plan-edit">
                          {pkg && pkg.lane !== "evergreen" && (
                            <label className="pc-field">
                              <span>Filming sessions</span>
                              <select
                                value={sessions}
                                onChange={(event) =>
                                  cartStore.setCount(
                                    kitSessionCountKey(line.id),
                                    Number(event.target.value),
                                  )
                                }
                              >
                                {Array.from({ length: MAX_PACKAGE_SESSIONS }, (_, i) => i + 1).map(
                                  (value) => (
                                    <option key={value} value={value}>
                                      {value} {value === 1 ? "session" : "sessions"}
                                    </option>
                                  ),
                                )}
                              </select>
                            </label>
                          )}
                          {editable && (
                            <label className="pc-field">
                              <span>
                                {pkg?.lane === "evergreen"
                                  ? "Episode length"
                                  : editable.unitLabelPlural}
                              </span>
                              <select
                                value={count}
                                onChange={(event) =>
                                  cartStore.setCount(line.id, Number(event.target.value))
                                }
                              >
                                {Array.from(
                                  {
                                    length:
                                      Math.floor((editable.max - editable.min) / editable.step) + 1,
                                  },
                                  (_, i) => editable.min + i * editable.step,
                                ).map((value) => (
                                  <option key={value} value={value}>
                                    {pkg?.lane === "evergreen"
                                      ? `${5 + value * 5} minutes`
                                      : `${value} ${value === 1 ? editable.unitLabel : editable.unitLabelPlural}`}
                                  </option>
                                ))}
                              </select>
                            </label>
                          )}
                          {(!pkg || line.qty > 1) && (
                            <label className="pc-field">
                              <span>Quantity</span>
                              <input
                                type="number"
                                inputMode="numeric"
                                min={1}
                                max={20}
                                step={1}
                                value={line.qty}
                                onChange={(event) => {
                                  const value = Number(event.target.value);
                                  if (Number.isInteger(value) && value >= 1 && value <= 20)
                                    cartStore.changeQty(line.id, value);
                                }}
                              />
                            </label>
                          )}
                          <button
                            type="button"
                            className="pc-outline"
                            onClick={() => setEditingId(null)}
                          >
                            Done editing
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
              <div className="pc-checkout-mobile-summary">{receipt}</div>
              <Link
                to={digitalOnly ? "/services/diy-downloads" : "/shop"}
                className="pc-add-package"
              >
                {digitalOnly ? "Browse more downloads" : "Add another package"}{" "}
                <ArrowRight size={18} />
              </Link>
            </>
          ) : (
            <>
              <form
                id="pc-project-details"
                className="pc-checkout-form"
                onSubmit={handleSubmit}
                noValidate
                aria-busy={sending}
              >
                <fieldset disabled={sending || submitted} className="pc-form-fields">
                  <legend className="sr-only">
                    {digitalOnly ? "Purchase contact details" : "Project contact details"}
                  </legend>
                  <p className="pc-required-note">
                    {digitalOnly
                      ? "Name and email are required."
                      : "Name, email, and filming city are required."}
                  </p>
                  {(
                    [
                      {
                        key: "name",
                        label: "Your name",
                        autoComplete: "name",
                        type: "text",
                        placeholder: "First and last name",
                      },
                      {
                        key: "email",
                        label: "Email address",
                        autoComplete: "email",
                        type: "email",
                        placeholder: "you@company.com",
                      },
                      {
                        key: "city",
                        label: "Filming city",
                        autoComplete: "address-level2",
                        type: "text",
                        placeholder: "City, state",
                      },
                    ] as const
                  )
                    .filter((field) => !digitalOnly || field.key !== "city")
                    .map((field) => (
                      <label className="pc-field" key={field.key} htmlFor={`pc-${field.key}`}>
                        <span>{field.label}</span>
                        <input
                          id={`pc-${field.key}`}
                          name={field.key}
                          type={field.type}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          required
                          maxLength={field.key === "email" ? 254 : 120}
                          value={details[field.key]}
                          onChange={(event) => updateDetail(field.key, event.target.value)}
                          aria-invalid={Boolean(errors[field.key])}
                          aria-describedby={errors[field.key] ? `pc-${field.key}-error` : undefined}
                        />
                        {errors[field.key] && (
                          <span className="pc-field-error" id={`pc-${field.key}-error`}>
                            {errors[field.key]}
                          </span>
                        )}
                      </label>
                    ))}
                  {!digitalOnly && (
                    <details className="pc-checkout-extras">
                      <summary>
                        Timing or ongoing needs <span className="pc-muted">(optional)</span>
                      </summary>
                      <label className="pc-field">
                        <span>When would you like to start?</span>
                        <select
                          name="timing"
                          value={details.timing}
                          onChange={(event) => updateDetail("timing", event.target.value)}
                        >
                          {["Flexible", "This month", "Next month", "In 2–3 months"].map(
                            (value) => (
                              <option key={value}>{value}</option>
                            ),
                          )}
                        </select>
                      </label>
                      <label className="pc-checkbox">
                        <input
                          type="checkbox"
                          name="ongoing"
                          checked={details.ongoing}
                          onChange={(event) => updateDetail("ongoing", event.target.checked)}
                        />
                        <span>
                          I’m interested in ongoing video support.
                          <small>
                            We’ll discuss the right schedule. This does not start a subscription.
                          </small>
                        </span>
                      </label>
                    </details>
                  )}
                </fieldset>
                <p className="pc-request-note">
                  {digitalOnly
                    ? "Your payment details are entered securely in Stripe. Your cart stays here until payment is confirmed."
                    : CONTACT_ENDPOINT
                      ? "We’ll review your request and follow up to confirm the details."
                      : HAS_HONEYBOOK
                        ? "Continue in HoneyBook to finish your request. It has not been sent from this page."
                        : "This opens a draft addressed to Palmer House. Nothing is sent until you review and send it."}
                </p>
              </form>
              {submission.kind !== "idle" && submission.kind !== "sending" && (
                <div
                  ref={status}
                  tabIndex={-1}
                  role={submission.kind === "error" ? "alert" : "status"}
                  className={`pc-status${submission.kind === "error" ? " pc-error" : ""}`}
                >
                  {submission.kind === "received" && (
                    <>
                      <Check size={25} />
                      <h2>Your plan request is received.</h2>
                      <p>
                        Thanks, {details.name.trim().split(/\s+/)[0]}. We’ll follow up at{" "}
                        {details.email.trim()} to confirm the scope and next steps.
                      </p>
                      <p>
                        This is a request for a quote. Your project is not booked, and no payment
                        has been taken.
                      </p>
                    </>
                  )}
                  {submission.kind === "honeybook" && (
                    <>
                      <h2>Finish your request in HoneyBook.</h2>
                      <p>
                        Your plan has not been submitted from this page. Review and send the form in
                        HoneyBook to complete your request.
                      </p>
                      <a
                        className="pc-outline"
                        href={submission.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open HoneyBook <ArrowRight size={18} />
                      </a>
                    </>
                  )}
                  {submission.kind === "email" && (
                    <>
                      <Mail size={25} />
                      <h2>Your email draft is ready.</h2>
                      <p>
                        Your email app should open with your plan. Nothing has been sent yet—review
                        the draft and send it to info@palmerhouseproductions.com.
                      </p>
                      <a className="pc-outline" href={submission.url}>
                        Open email draft <ArrowRight size={18} />
                      </a>
                    </>
                  )}
                  {submission.kind === "payment" && (
                    <>
                      <h2>Continue to secure checkout.</h2>
                      <p>
                        Finish your purchase in Stripe. Payment has not been confirmed on this page.
                      </p>
                      <a className="pc-primary" href={submission.url}>
                        Continue to Stripe <ArrowRight size={18} />
                      </a>
                    </>
                  )}
                  {submission.kind === "error" && (
                    <>
                      <h2>Let’s try that again.</h2>
                      <p>{submission.message}</p>
                      {lastRequest && !digitalOnly && (
                        <a
                          className="pc-outline"
                          href={planEmailUrl(lastRequest)}
                          onClick={() =>
                            setSubmission({ kind: "email", url: planEmailUrl(lastRequest) })
                          }
                        >
                          Open an email draft <Mail size={18} />
                        </a>
                      )}
                      {digitalOnly && (
                        <Link className="pc-text-button" to="/contact">
                          Contact Palmer House
                        </Link>
                      )}
                    </>
                  )}
                  {lastRequest && (
                    <p className="pc-reference">
                      {digitalOnly ? "Order reference" : "Plan reference"}:{" "}
                      <strong>{lastRequest.quote.reference}</strong>
                    </p>
                  )}
                </div>
              )}
              <div className="pc-checkout-mobile-summary">{receipt}</div>
            </>
          )}
        </section>
        <aside
          className="pc-checkout-summary"
          aria-label={digitalOnly ? "Order summary" : "Plan summary"}
        >
          <h2>{digitalOnly ? "Your downloads" : "Your plan"}</h2>
          <div className="pc-summary-items">
            {lines.map((line) => (
              <div key={line.id}>
                <span>
                  {line.name}
                  {line.qty > 1 ? ` × ${line.qty}` : ""}
                  <small>{receiptLineConfiguration(line)}</small>
                </span>
                <strong>
                  {money(line.price * line.qty)}
                  {line.cadence === "monthly" && <small>/ month</small>}
                </strong>
              </div>
            ))}
          </div>
          {receipt}
          {action("pc-checkout-desktop-action")}
          {step === 2 && (
            <button
              type="button"
              className="pc-text-button"
              disabled={sending}
              onClick={() => goToStep(1)}
            >
              {digitalOnly ? "Edit your downloads" : "Edit your plan"}
            </button>
          )}
        </aside>
      </div>
    </CollectionShell>
  );
}
