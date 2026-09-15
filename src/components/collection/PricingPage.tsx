import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { cartStore, useCart, getKitSessionCount, kitAddOnCountKey } from "@/lib/cart-store";
import {
  ADD_ONS,
  FINISHED_VIDEO_PRICE,
  EVERGREEN_LENGTH_PRICE,
  PAL_GROUPS,
  MAX_PACKAGE_SESSIONS,
  SESSION_PRICE,
  getPackageById,
  type PalAccent,
} from "@/lib/pricing-catalog";
import { CollectionShell } from "./CollectionShell";
import { collectionLanes } from "./CollectionPage";
import { money, Stepper } from "./controls";
import { packageEstimate } from "./package-estimate";

const ESTIMATE_EXTRA_IDS = new Set([
  "caption-pack",
  "thumbnail-set",
  "posting-plan",
  "brand-kit",
  "rush-delivery",
]);

export function PricingPage({ packageId }: { packageId?: string }) {
  const starting =
    getPackageById(packageId ?? "social-content") ?? getPackageById("social-content")!;
  const [id, setId] = useState(starting.id);
  const cart = useCart();
  const [chosenSessions, setSessions] = useState<number | undefined>();
  const [chosenCount, setCount] = useState<number | undefined>();
  const [chosenExtraIds, setExtraIds] = useState<string[] | undefined>();
  const item = getPackageById(id)!;
  const sessions =
    chosenSessions ?? (cart.selected[id] ? getKitSessionCount(cart.counts, id) : item.sessions);
  const count = chosenCount ?? cart.counts[id] ?? item.editable!.defaultCount;
  const evergreen = item.lane === "evergreen";
  const availableExtras = ADD_ONS.filter(
    (extra) =>
      extra.id !== "extra-edited-video" &&
      (!extra.applicablePals || extra.applicablePals.includes(item.lane)) &&
      (ESTIMATE_EXTRA_IDS.has(extra.id) || Boolean(cart.counts[kitAddOnCountKey(id, extra.id)])),
  );
  const extraIds =
    chosenExtraIds ??
    availableExtras
      .filter((extra) => Boolean(cart.counts[kitAddOnCountKey(id, extra.id)]))
      .map((extra) => extra.id);
  const extrasTotal = availableExtras.reduce(
    (sum, extra) => sum + (extraIds.includes(extra.id) ? extra.price : 0),
    0,
  );
  const extraSelections = Object.fromEntries(
    availableExtras.map((extra) => [extra.id, extraIds.includes(extra.id)]),
  );
  const estimate = packageEstimate(cart, item, { count, sessions, extras: extraSelections });
  const total = estimate.total;
  const toggleExtra = (extraId: string) =>
    setExtraIds(
      extraIds.includes(extraId)
        ? extraIds.filter((selected) => selected !== extraId)
        : [...extraIds, extraId],
    );
  const navigate = useNavigate();
  const choosePackage = (nextId: string) => {
    const next = getPackageById(nextId);
    if (!next) return;
    setId(next.id);
    setSessions(undefined);
    setCount(undefined);
    setExtraIds(undefined);
  };
  const chooseLane = (lane: PalAccent) => {
    const group = PAL_GROUPS.find((group) => group.id === lane)!;
    choosePackage((group.items.find((p) => p.recommended) ?? group.items[0]).id);
  };
  const add = () => {
    const projected = packageEstimate(cartStore.getSnapshot(), item, {
      count,
      sessions,
      extras: extraSelections,
    }).cart;
    cartStore.setSelected(projected.selected);
    cartStore.setCounts(projected.counts);
    void navigate({ to: "/checkout" });
  };
  const action = (
    <button className="pc-primary pc-lane-button" onClick={add}>
      Review this estimate <ArrowRight size={18} />
    </button>
  );
  return (
    <CollectionShell
      active="pricing"
      backTo="/shop"
      footer={
        <div className="pc-price-dock" data-lane={item.lane}>
          <div>
            <span>Working estimate</span>
            <strong>{money(total)}</strong>
          </div>
          {action}
        </div>
      }
    >
      <div className="pc-pricing">
        <section className="pc-price-explainer">
          <h1>Two numbers.</h1>
          <p className="pc-pricing-intro">
            A filming session plus the videos you take home.
            <br className="pc-desktop-break" /> A clear starting price.
          </p>
          <div className="pc-rates">
            <div className="pc-rate">
              <strong>{money(SESSION_PRICE)}</strong>
              <p>
                <b>per filming session</b>2 hours, on location, directed
              </p>
            </div>
            <div className="pc-rate">
              <strong>+{money(FINISHED_VIDEO_PRICE)}</strong>
              <p>
                <b>per finished video</b>edited, colored, mixed
              </p>
            </div>
            <div className="pc-rate">
              <strong>{money(EVERGREEN_LENGTH_PRICE[5])}</strong>
              <p>
                <b>Evergreen episode, 5 min</b>+
                {money(EVERGREEN_LENGTH_PRICE[10] - EVERGREEN_LENGTH_PRICE[5])} per extra 5 min
              </p>
            </div>
          </div>
        </section>
        <section
          className="pc-estimate-panel"
          data-lane={item.lane}
          aria-labelledby="estimate-title"
        >
          <div className="pc-estimate-heading">
            <h2 id="estimate-title">Your estimate</h2>
            <img src={`/packages/lanes/${item.lane}.png`} width="52" height="52" alt="" />
          </div>
          <div
            className="pc-segmented pc-lane-segments"
            role="group"
            aria-label="Estimate category"
          >
            {Object.keys(collectionLanes).map((lane) => (
              <button
                key={lane}
                aria-pressed={lane === item.lane}
                onClick={() => chooseLane(lane as PalAccent)}
              >
                {collectionLanes[lane as PalAccent].name.replace(" Pal", "")}
              </button>
            ))}
          </div>
          <label className="pc-package-select">
            Package
            <select value={id} onChange={(e) => choosePackage(e.target.value)}>
              {PAL_GROUPS.find((group) => group.id === item.lane)!.items.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          {!evergreen && (
            <div className="pc-estimate-control">
              <div>
                <strong>Filming sessions</strong>
                <small>{money(SESSION_PRICE)} each · 2 hours</small>
              </div>
              <Stepper
                label="Filming sessions"
                value={sessions}
                min={1}
                max={MAX_PACKAGE_SESSIONS}
                onChange={setSessions}
              />
            </div>
          )}
          <div className="pc-estimate-control">
            <div>
              <strong>{evergreen ? "Episode length" : "Videos you take home"}</strong>
              <small>
                {evergreen
                  ? "5-minute increments"
                  : `${money(FINISHED_VIDEO_PRICE)} per finished video`}
              </small>
            </div>
            <Stepper
              label={evergreen ? "Episode length" : "Videos"}
              value={evergreen ? 5 + count * 5 : count}
              min={evergreen ? 5 : 1}
              max={evergreen ? 15 : 20}
              onChange={(n) => setCount(evergreen ? count + (n > 5 + count * 5 ? 1 : -1) : n)}
              suffix={evergreen ? "min" : ""}
            />
          </div>
          <div
            className="pc-segmented pc-estimate-presets"
            role="group"
            aria-label={evergreen ? "Episode length presets" : "Video count presets"}
          >
            {(evergreen ? [0, 1, 2] : [4, 6, 12]).map((n) => (
              <button key={n} aria-pressed={count === n} onClick={() => setCount(n)}>
                {evergreen ? `${5 + n * 5} min` : `${n} videos`}
              </button>
            ))}
          </div>
          <details className="pc-estimate-extras">
            <summary>
              Optional extras{" "}
              <span className="pc-muted">
                {extraIds.length ? `${extraIds.length} selected` : "Only if you need them"}
              </span>
            </summary>
            <div className="pc-extra-options">
              {availableExtras.map((extra) => (
                <label className="pc-checkbox pc-extra-option" key={extra.id}>
                  <input
                    type="checkbox"
                    checked={extraIds.includes(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                  />
                  <span>
                    <strong>{extra.name}</strong>
                    <small>{extra.description}</small>
                  </span>
                  <b className="pc-extra-price">+{money(extra.price)}</b>
                </label>
              ))}
            </div>
          </details>
          <div className="pc-estimate-total">
            <span>Estimated project</span>
            <strong aria-live="polite">{money(total)}</strong>
          </div>
          <p className="pc-estimate-breakdown">
            {estimate.scope}
            {!evergreen &&
              estimate.line.qty === 1 &&
              estimate.line.cadence === "one-time" &&
              estimate.line.price === estimate.undiscounted && (
                <>
                  {" "}
                  · {money(sessions * SESSION_PRICE)} + {money(count * FINISHED_VIDEO_PRICE)}
                  {extrasTotal > 0 && <> + {money(extrasTotal)} extras</>}
                </>
              )}
          </p>
          <p className="pc-estimate-note">
            Scope, filming capacity, tax and travel are confirmed in your quote. No payment is
            collected with this request.
          </p>
          <div className="pc-desktop-pricing-action">{action}</div>
        </section>
        <section className="pc-pricing-included">
          <h2>Always included.</h2>
          <ul className="pc-included">
            {[
              "Pre-shoot planning and on-set direction",
              "Professional lighting and audio",
              "Editing, color and sound mix",
              "Your finished work and footage after final payment",
            ].map((text) => (
              <li key={text}>
                <Check size={17} />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <details>
            <summary>How payment works</summary>
            <p>
              First, we confirm your scope, location and schedule. Your final quote sets out tax,
              travel, the agreed deposit and payment terms before you pay.
            </p>
          </details>
          <Link to="/shop" className="pc-section-link">
            Explore the packages <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </CollectionShell>
  );
}
