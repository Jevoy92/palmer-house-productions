import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { cartStore, getKitSessionCount, useCart } from "@/lib/cart-store";
import {
  getIncluded,
  PAL_GROUPS,
  MAX_PACKAGE_SESSIONS,
  SESSION_PRICE,
  FINISHED_VIDEO_PRICE,
  EVERGREEN_LENGTH_PRICE,
  type PackageItem,
} from "@/lib/pricing-catalog";
import { CollectionShell } from "./CollectionShell";
import { PreviewMedia } from "./PreviewMedia";
import { collectionLanes } from "./CollectionPage";
import { Stepper, money } from "./controls";
import { packageEstimate } from "./package-estimate";

export function PackageDetail({
  item,
  initialCount,
}: {
  item: PackageItem;
  initialCount?: number;
}) {
  const cart = useCart();
  const [chosenCount, setChosenCount] = useState<number | undefined>(initialCount);
  const [chosenSessions, setChosenSessions] = useState<number | undefined>();
  const [announcement, setAnnouncement] = useState("");
  const count = chosenCount ?? cart.counts[item.id] ?? item.editable!.defaultCount;
  const sessions =
    chosenSessions ??
    (cart.selected[item.id] ? getKitSessionCount(cart.counts, item.id) : item.sessions);
  const evergreen = item.lane === "evergreen";
  const units = "Videos";
  const estimate = packageEstimate(cart, item, { count, sessions });
  const total = estimate.total;
  const group = PAL_GROUPS.find((group) => group.id === item.lane)!;
  const added = !!cart.selected[item.id];
  const same =
    added &&
    (cart.counts[item.id] ?? item.editable!.defaultCount) === count &&
    getKitSessionCount(cart.counts, item.id) === sessions;
  const label = same ? "Review plan" : added ? "Update plan" : "Add to plan";
  const add = () => {
    const projected = packageEstimate(cartStore.getSnapshot(), item, { count, sessions }).cart;
    cartStore.setSelected(projected.selected);
    cartStore.setCounts(projected.counts);
    setAnnouncement(
      `${item.name} ${added ? "updated in" : "added to"} your plan. ${money(total)}.`,
    );
  };
  const action = same ? (
    <Link to="/checkout" className="pc-primary pc-lane-button">
      Review plan <span>· {money(total)}</span>
      <ArrowRight size={18} />
    </Link>
  ) : (
    <button className="pc-primary pc-lane-button" onClick={add}>
      {label} <span>· {money(total)}</span>
      <ArrowRight size={18} />
    </button>
  );
  const changeCount = (n: number) =>
    setChosenCount(Math.min(item.editable!.max, Math.max(evergreen ? 0 : 1, n)));
  return (
    <CollectionShell
      active="products"
      backTo="/shop"
      detail
      footer={
        <div className="pc-detail-dock" data-lane={item.lane}>
          <Stepper
            value={evergreen ? 5 + count * 5 : count}
            min={evergreen ? 5 : 1}
            max={evergreen ? 15 : 20}
            onChange={(n) => changeCount(evergreen ? count + (n > 5 + count * 5 ? 1 : -1) : n)}
            label={evergreen ? "Episode length" : units}
            suffix={evergreen ? "min" : ""}
          />
          {action}
        </div>
      }
    >
      <article className="pc-detail" data-lane={item.lane}>
        <div className="pc-detail-visual">
          <PreviewMedia id={item.id} name={item.name} priority />
          <p className="pc-desktop-media-note">
            Fictional AI-generated concept. Your package is filmed for your business.
          </p>
        </div>
        <div className="pc-detail-content">
          <div className="pc-detail-heading">
            <div>
              <div className="pc-eyebrow">{collectionLanes[item.lane].name}</div>
              <h1>{item.name}</h1>
            </div>
            <img src={item.icon} width="72" height="72" alt="" />
          </div>
          <div className="pc-detail-price">
            <strong>{money(total)}</strong>
            <span>{estimate.scope}</span>
          </div>
          <p className="pc-description">
            {item.description} Planned, directed and delivered edited, colored and mixed.
          </p>
          <section className="pc-package-uses">
            <h2>What you can make</h2>
            <p>{item.learn.join(" · ")}</p>
          </section>
          <section className="pc-scope-panel" aria-labelledby="scope-title">
            <div className="pc-scope-heading">
              <h2 id="scope-title">
                {evergreen ? "How long is your story?" : "How much do you take home?"}
              </h2>
              <p>
                {evergreen ? (
                  <>
                    5 min · {money(EVERGREEN_LENGTH_PRICE[5])}
                    <br />+{money(EVERGREEN_LENGTH_PRICE[10] - EVERGREEN_LENGTH_PRICE[5])} per extra
                    5 min
                  </>
                ) : (
                  <>
                    {sessions} {sessions === 1 ? "session" : "sessions"} ·{" "}
                    {money(sessions * SESSION_PRICE)}
                    <br />+{money(FINISHED_VIDEO_PRICE)} per video
                  </>
                )}
              </p>
            </div>
            <div
              className="pc-segmented"
              role="group"
              aria-label={evergreen ? "Episode length presets" : `${units} presets`}
            >
              {(evergreen ? [0, 1, 2] : [4, 6, 12]).map((n) => (
                <button key={n} aria-pressed={count === n} onClick={() => changeCount(n)}>
                  {evergreen ? `${5 + n * 5} min` : n}
                </button>
              ))}
            </div>
            <div className="pc-estimate-control">
              <span>{evergreen ? "Episode length" : "Custom video count"}</span>
              <Stepper
                value={evergreen ? 5 + count * 5 : count}
                min={evergreen ? 5 : 1}
                max={evergreen ? 15 : 20}
                onChange={(n) => changeCount(evergreen ? count + (n > 5 + count * 5 ? 1 : -1) : n)}
                label={evergreen ? "Episode length" : units}
                suffix={evergreen ? "min" : ""}
              />
            </div>
            {!evergreen && (
              <details className="pc-session-disclosure">
                <summary>Need more filming time?</summary>
                <div className="pc-estimate-control">
                  <span>Filming sessions</span>
                  <Stepper
                    value={sessions}
                    min={1}
                    max={MAX_PACKAGE_SESSIONS}
                    label="Filming sessions"
                    onChange={(n) => {
                      setChosenSessions(n);
                    }}
                  />
                </div>
                <p>
                  Two hours on location per session. We’ll confirm the filming time your scope
                  needs.
                </p>
              </details>
            )}
          </section>
          <div className="pc-desktop-detail-action">{action}</div>
          <p className="pc-sr" role="status">
            {announcement}
          </p>
          <section className="pc-detail-section">
            <h2>Always included</h2>
            <ul className="pc-included">
              {getIncluded(item, group).map((text, index) => (
                <li key={text}>
                  <Check size={16} />
                  <span>
                    {!evergreen && index === 0
                      ? `${sessions} filming ${sessions === 1 ? "session" : "sessions"} · 2 hours each, on location`
                      : text}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <dl className="pc-detail-facts">
            <div>
              <dt>Format</dt>
              <dd>{item.format}</dd>
            </div>
            <div>
              <dt>Typical delivery</dt>
              <dd>{evergreen ? "3–4" : "2–3"} weeks · confirmed in quote</dd>
            </div>
            <div>
              <dt>Pal team</dt>
              <dd>{group.palName}</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>After scope approval</dd>
            </div>
          </dl>
          <Link to="/production-pricing" search={{ package: item.id }} className="pc-section-link">
            See how pricing works <ArrowRight size={18} />
          </Link>
          <p className="pc-detail-disclosure">
            Fictional AI-generated concept. Your package is filmed for your business. Final scope,
            filming capacity, tax and travel are confirmed in your quote.
          </p>
        </div>
      </article>
    </CollectionShell>
  );
}
