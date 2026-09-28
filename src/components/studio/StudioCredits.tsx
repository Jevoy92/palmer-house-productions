import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, CreditCard, LoaderCircle, RefreshCw } from "lucide-react";
import { getStudioCreditSummary, createStudioCreditCheckout } from "@/lib/studio-credit-server";
import {
  studioCreditOperations,
  studioCreditTopUps,
  type StudioCreditOperation,
  type StudioCreditPack,
  type StudioCreditSummary,
} from "@/lib/studio-credits";
import { useStudio } from "./StudioProvider";
import "./studio-credits.css";

type CreditState = {
  summary: StudioCreditSummary | null;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
};
const CreditContext = createContext<CreditState>({
  summary: null,
  loading: true,
  error: "",
  refresh: async () => {},
});
const useStudioCredits = () => useContext(CreditContext);

/** The server owns balances. A local animation or successful redirect never grants credit. */
export function StudioCreditsProvider({ children }: { children: ReactNode }) {
  const { session, workspace, busy, assets, campaigns, assistantMessages, customPals } =
    useStudio();
  const [summary, setSummary] = useState<StudioCreditSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const version = useRef(0);
  const accessToken = session?.access_token;
  const workspaceId = workspace?.id;
  const refresh = useCallback(async () => {
    const request = ++version.current;
    if (!accessToken || !workspaceId) return;
    try {
      const result = await getStudioCreditSummary({ data: { accessToken, workspaceId } });
      if (request !== version.current) return;
      setSummary(result);
      setError("");
    } catch (reason) {
      if (request !== version.current) return;
      setError(
        reason instanceof Error ? reason.message : "Your balance could not load. Please retry.",
      );
    } finally {
      if (request === version.current) setLoading(false);
    }
  }, [accessToken, workspaceId]);
  useEffect(() => {
    setSummary(null);
    setLoading(true);
    setError("");
    void refresh();
    const onFocus = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("studio:credits-changed", onFocus);
    const timer = window.setInterval(onFocus, 60000);
    return () => {
      // Invalidate async replies; this ref is a request counter, not a DOM ref.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      version.current++;
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("studio:credits-changed", onFocus);
    };
  }, [refresh]);
  useEffect(() => {
    const timer = window.setTimeout(() => void refresh(), 400);
    return () => window.clearTimeout(timer);
  }, [busy, assets.length, campaigns.length, assistantMessages.length, customPals.length, refresh]);
  return (
    <CreditContext.Provider value={{ summary, loading, error, refresh }}>
      {children}
    </CreditContext.Provider>
  );
}

export function StudioCreditPill() {
  const { summary, loading, error } = useStudioCredits();
  const ready = summary?.enforcement === "ready" && !error;
  return (
    <Link
      to="/studio/billing"
      className="studio-credit-pill"
      aria-label={
        ready
          ? `${summary.available.toLocaleString()} credits available. Open usage and billing`
          : "Open usage and billing"
      }
    >
      <CreditCard size={15} />
      <span>
        {loading
          ? "Usage"
          : ready
            ? `${summary.available.toLocaleString()} credits`
            : "Usage & plan"}
      </span>
      {ready && summary.available <= summary.includedAllowance * 0.2 && (
        <span className="studio-credit-dot" aria-label="Low balance" />
      )}
    </Link>
  );
}

export function StudioCreditCost({
  operation,
  compact = false,
}: {
  operation: StudioCreditOperation;
  compact?: boolean;
}) {
  const { summary } = useStudioCredits();
  const cost = studioCreditOperations[operation].credits;
  const insufficient = summary?.enforcement === "ready" && summary.available < cost;
  return (
    <p className={`studio-credit-cost ${compact ? "is-compact" : ""}`}>
      <span>
        {cost} {cost === 1 ? "credit" : "credits"}
        {operation === "chat" ? " per reply" : " for this creation"}
      </span>
      {insufficient ? (
        <Link to="/studio/billing">
          Add credits to continue <ArrowUpRight size={12} />
        </Link>
      ) : (
        !compact && <span>Reserved while working. Released if it fails.</span>
      )}
    </p>
  );
}

const dateLabel = (date: string | null) =>
  date ? new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "—";

export function StudioCreditPanel({ compact = false }: { compact?: boolean }) {
  const { summary, loading, error, refresh } = useStudioCredits();
  const { session, workspace } = useStudio();
  const [buying, setBuying] = useState<StudioCreditPack | null>(null);
  const [checkoutError, setCheckoutError] = useState("");
  const requestIds = useRef<Partial<Record<StudioCreditPack, string>>>({});
  const lock = useRef(false);
  const [refreshing, setRefreshing] = useState(false);
  async function reload() {
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  }
  async function buy(pack: StudioCreditPack) {
    if (lock.current || !session || !workspace) return;
    lock.current = true;
    setBuying(pack);
    setCheckoutError("");
    try {
      const requestId = (requestIds.current[pack] ||= crypto.randomUUID());
      const result = await createStudioCreditCheckout({
        data: { accessToken: session.access_token, workspaceId: workspace.id, pack, requestId },
      });
      if (!result.ok)
        throw new Error("Credit checkout is not available yet. Please contact Palmer House.");
      window.location.assign(result.url);
    } catch (reason) {
      setCheckoutError(
        reason instanceof Error
          ? reason.message
          : "Checkout could not open. No credits were purchased.",
      );
    } finally {
      lock.current = false;
      setBuying(null);
    }
  }
  if (loading && !summary)
    return (
      <section className="studio-credit-panel" aria-busy="true">
        <LoaderCircle size={20} className="animate-spin" />
        <p>Checking your Studio balance…</p>
      </section>
    );
  if (!summary || summary.enforcement !== "ready")
    return (
      <section className="studio-credit-panel">
        <h2>Your Studio credits</h2>
        <p>
          {error ||
            summary?.message ||
            "Usage is being connected to this workspace. Paid AI actions stay paused until the balance can be verified."}
        </p>
        <button className="secondary-action" onClick={() => void reload()} disabled={refreshing}>
          <RefreshCw size={15} />
          {refreshing ? "Checking…" : "Check again"}
        </button>
      </section>
    );
  const percent = Math.min(
    100,
    Math.max(
      0,
      ((summary.includedAllowance - summary.includedRemaining) /
        Math.max(1, summary.includedAllowance)) *
        100,
    ),
  );
  const low =
    summary.available <=
    Math.max(studioCreditOperations.image.credits, summary.includedAllowance * 0.2);
  return (
    <div className="studio-credit-stack">
      <section className="studio-credit-panel" aria-label="Studio credit balance">
        <div className="studio-credit-heading">
          <div>
            <p className="studio-eyebrow">Ready for your next idea</p>
            <h2>Your creative balance.</h2>
          </div>
          <button
            className="studio-icon-button"
            aria-label="Refresh credit balance"
            onClick={() => void reload()}
            disabled={refreshing}
          >
            <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
        {error && <p role="alert">{error} The last known balance is shown below.</p>}
        {summary.message && <p role="status">{summary.message}</p>}
        <div className="studio-credit-number">
          <strong>{summary.available.toLocaleString()}</strong>
          <span>credits available</span>
        </div>
        <div
          className="studio-credit-meter"
          role="progressbar"
          aria-label="Included credits used or reserved"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        <div className="studio-credit-breakdown">
          <span>
            <strong>{summary.includedRemaining.toLocaleString()}</strong> of{" "}
            {summary.includedAllowance.toLocaleString()} included left
          </span>
          <span>
            <strong>{summary.topUpRemaining.toLocaleString()}</strong> top-up credits
          </span>
        </div>
        <p className="studio-credit-note">
          {summary.status === "trialing"
            ? `Trial allowance · ends ${dateLabel(summary.renewsAt)}`
            : summary.status === "inactive"
              ? "Membership inactive. Purchased credits stay in your wallet; renew membership to use them."
              : `Included credits refresh ${dateLabel(summary.renewsAt)}, including on annual plans.`}{" "}
          {summary.reserved > 0 && `${summary.reserved} credits are reserved for work in progress.`}
        </p>
        {low && (
          <div className="studio-credit-low">
            <strong>
              {summary.available === 0
                ? "Your work is safe. Your balance is empty."
                : "A little top-up goes a long way."}
            </strong>
            <p>
              You can still browse, edit, copy, and download your saved work. Add credits or wait
              for your next allowance to create more.
            </p>
          </div>
        )}
        {compact ? (
          <Link className="studio-chat-text-link" to="/studio/billing">
            See usage and add credits <ArrowUpRight size={15} />
          </Link>
        ) : (
          <>
            <div className="studio-credit-rules">
              <span>
                <Check size={14} /> No automatic top-ups
              </span>
              <span>
                <Check size={14} /> Failed work releases its credits
              </span>
              <span>
                <Check size={14} /> Saved work stays yours
              </span>
            </div>
          </>
        )}
      </section>
      {!compact && (
        <>
          <section className="studio-credit-panel">
            <div className="studio-credit-heading">
              <div>
                <p className="studio-eyebrow">Keep the ideas coming</p>
                <h2>Add a little room.</h2>
              </div>
              <CreditCard size={24} />
            </div>
            <p>
              One-time purchases. Included credits are used first. Unused top-ups carry over and
              require an active membership to use.
            </p>
            <div className="studio-credit-packs">
              {Object.entries(studioCreditTopUps).map(([key, pack]) => (
                <article key={key}>
                  <h3>{pack.label}</h3>
                  <p className="studio-credit-pack-size">
                    {pack.credits.toLocaleString()} <span>credits</span>
                  </p>
                  <strong className="studio-credit-pack-price">${pack.priceUsd}</strong>
                  <button
                    className="primary-action"
                    disabled={
                      Boolean(buying) || !summary.canManageBilling || !summary.topUpsEnabled
                    }
                    onClick={() => void buy(key as StudioCreditPack)}
                  >
                    {buying === key ? (
                      <LoaderCircle size={15} className="animate-spin" />
                    ) : (
                      <ArrowUpRight size={15} />
                    )}
                    {buying === key
                      ? "Opening checkout…"
                      : `Buy ${pack.credits.toLocaleString()} credits`}
                  </button>
                </article>
              ))}
            </div>
            {!summary.canManageBilling ? (
              <p>Only your workspace owner or billing admin can purchase credits.</p>
            ) : !summary.topUpsEnabled ? (
              <p>Purchases will open when billing setup is complete. No payment has been taken.</p>
            ) : (
              <p className="studio-credit-note">
                Review the total in secure Stripe checkout. Credits arrive after payment is
                confirmed; returning to this page alone does not add credits.
              </p>
            )}
            {checkoutError && (
              <p className="studio-credit-error" role="alert">
                {checkoutError}
              </p>
            )}
          </section>
          <section className="studio-credit-panel">
            <h2>A clear cost before you create.</h2>
            <p>
              Credits cover the AI work. Manual edits, copies, saved-file downloads, and browsing
              are free.
            </p>
            <dl className="studio-credit-prices">
              {Object.entries(studioCreditOperations).map(([key, operation]) => (
                <div key={key}>
                  <dt>{operation.label}</dt>
                  <dd>
                    {operation.credits} {operation.credits === 1 ? "credit" : "credits"}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="studio-credit-note">
              A campaign creates written drafts and scripts. Images are created separately from each
              draft’s own context. Automatic Pal suggestions use a separate, limited allowance.
            </p>
          </section>
          <section className="studio-credit-panel">
            <h2>Recent creative work</h2>
            {summary.recent.length ? (
              <ul className="studio-credit-history">
                {summary.recent.map((item) => (
                  <li key={item.id}>
                    <span>
                      <strong>
                        {studioCreditOperations[item.operation]?.label || "Studio creation"}
                      </strong>
                      <small>
                        {dateLabel(item.createdAt)} ·{" "}
                        {item.status === "released"
                          ? "Released — not charged"
                          : item.status === "reserved"
                            ? "In progress"
                            : "Completed"}
                      </small>
                    </span>
                    <span>{item.status === "released" ? "0" : item.credits} credits</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Your first creation will appear here. We record the action and credits, without
                copying your conversation into this list.
              </p>
            )}
          </section>
          {summary.operator && (
            <section className="studio-credit-panel">
              <p className="studio-eyebrow">Palmer House operator · private</p>
              <h2>AI cost guardrail</h2>
              <p role="status">
                {summary.operator.budgetUsedUsd >= summary.operator.monthlyBudgetUsd * 0.9
                  ? "90% budget alert: review provider usage before increasing the limit."
                  : summary.operator.budgetUsedUsd >= summary.operator.monthlyBudgetUsd * 0.75
                    ? "75% of the monthly AI budget is used. Check the forecast and provider bill."
                    : summary.operator.budgetUsedUsd >= summary.operator.monthlyBudgetUsd * 0.5
                      ? "Half of the monthly AI budget is used."
                      : "Spending is below the first budget alert."}
              </p>
              <dl className="studio-credit-prices">
                <div>
                  <dt>Recorded provider cost estimate</dt>
                  <dd>${summary.operator.estimatedCostUsd.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Provider calls</dt>
                  <dd>{summary.operator.providerCalls}</dd>
                </div>
                <div>
                  <dt>Monthly global budget used / limit</dt>
                  <dd>
                    ${summary.operator.budgetUsedUsd.toFixed(2)} / $
                    {summary.operator.monthlyBudgetUsd.toFixed(2)}
                  </dd>
                </div>
              </dl>
              <p className="studio-credit-note">
                Estimates use the configured rate card; reconcile against provider invoices. This is
                AI cost, not total operating expense.
              </p>
            </section>
          )}
        </>
      )}
    </div>
  );
}
